import express from 'express'
import multer from 'multer'
import jwt from 'jsonwebtoken'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defaultData } from '../src/data/content.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

// --- config ---
const PORT = process.env.PORT || 3001
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, 'data')
const UPLOAD_DIR = path.join(DATA_DIR, 'uploads')
const DATA_FILE = path.join(DATA_DIR, 'data.json')
const DIST_DIR = path.join(ROOT, 'dist')

// Single access code (no email). Falls back to ADMIN_PASSWORD for compatibility.
const ADMIN_CODE = process.env.ADMIN_CODE || process.env.ADMIN_PASSWORD || 'change-me'
const JWT_SECRET = process.env.JWT_SECRET || 'dev-insecure-secret-change-me'

// --- storage ---
fs.mkdirSync(UPLOAD_DIR, { recursive: true })

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
    }
  } catch (e) {
    console.error('Failed to read data file, reseeding:', e.message)
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2))
  return JSON.parse(JSON.stringify(defaultData))
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

let data = loadData()

// --- app ---
const app = express()
app.use(express.json({ limit: '2mb' }))

// auth middleware
function auth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'unauthorized' })
  try {
    jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'invalid token' })
  }
}

// image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg'
    const safe = Math.random().toString(36).slice(2) + '-' + Date.now() + ext
    cb(null, safe)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, /^image\//.test(file.mimetype)),
})

// --- API ---
app.post('/api/login', (req, res) => {
  const { code } = req.body || {}
  if (code && code === ADMIN_CODE) {
    const token = jwt.sign({ sub: 'admin' }, JWT_SECRET, { expiresIn: '7d' })
    return res.json({ token })
  }
  res.status(401).json({ error: 'invalid code' })
})

app.get('/api/content', (req, res) => {
  res.json(data)
})

app.put('/api/data', auth, (req, res) => {
  const body = req.body
  if (!body || !body.content || !Array.isArray(body.projects)) {
    return res.status(400).json({ error: 'invalid payload' })
  }
  data = body
  saveData(data)
  res.json({ ok: true })
})

app.post('/api/upload', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'no file' })
  res.json({ url: `/uploads/${req.file.filename}` })
})

// uploaded images (persistent volume)
app.use('/uploads', express.static(UPLOAD_DIR))

// built client
app.use(express.static(DIST_DIR))
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server on :${PORT}  (data: ${DATA_DIR})`)
})
