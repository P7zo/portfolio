import { useCallback, useEffect, useState } from 'react'
import './admin.css'

const TOKEN_KEY = 'portfolio-admin-token'

function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj)
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) throw new Error('بيانات الدخول غير صحيحة')
      const { token } = await res.json()
      localStorage.setItem(TOKEN_KEY, token)
      onLogin(token)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="adm-login">
      <form className="adm-login__box" onSubmit={submit}>
        <h1>لوحة التحكم</h1>
        <p className="adm-muted">سجّل الدخول لإدارة الموقع</p>
        <label className="adm-field">
          <span>البريد الإلكتروني</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
        </label>
        <label className="adm-field">
          <span>كلمة المرور</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        </label>
        {error && <p className="adm-error">{error}</p>}
        <button className="adm-btn adm-btn--primary" disabled={busy}>
          {busy ? '...' : 'دخول'}
        </button>
      </form>
    </div>
  )
}

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [d, setD] = useState(null)
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((json) => setD(json))
      .catch(() => setStatus('تعذّر تحميل البيانات'))
  }, [])

  const set = useCallback((path, value) => {
    setD((prev) => {
      const next = structuredClone(prev)
      const keys = path.split('.')
      let o = next
      for (let i = 0; i < keys.length - 1; i++) o = o[keys[i]]
      o[keys[keys.length - 1]] = value
      return next
    })
  }, [])

  const mutate = useCallback((fn) => {
    setD((prev) => {
      const next = structuredClone(prev)
      fn(next)
      return next
    })
  }, [])

  const uploadImage = useCallback(
    async (file) => {
      const fd = new FormData()
      fd.append('image', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      })
      if (res.status === 401) {
        logout()
        throw new Error('انتهت الجلسة')
      }
      if (!res.ok) throw new Error('فشل رفع الصورة')
      const { url } = await res.json()
      return url
    },
    [token],
  )

  const save = async () => {
    setBusy(true)
    setStatus('')
    try {
      const res = await fetch('/api/data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(d),
      })
      if (res.status === 401) return logout()
      if (!res.ok) throw new Error('فشل الحفظ')
      setStatus('تم الحفظ بنجاح')
      setTimeout(() => setStatus(''), 2500)
    } catch (err) {
      setStatus(err.message)
    } finally {
      setBusy(false)
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  if (!token) return <Login onLogin={setToken} />
  if (!d) return <div className="adm-loading">جارِ التحميل…</div>

  // --- reusable field renderers ---
  const Text = ({ label, path, type = 'text', dir }) => (
    <label className="adm-field">
      <span>{label}</span>
      <input type={type} dir={dir} value={getPath(d, path) ?? ''} onChange={(e) => set(path, e.target.value)} />
    </label>
  )
  const Area = ({ label, path, rows = 3, dir }) => (
    <label className="adm-field">
      <span>{label}</span>
      <textarea rows={rows} dir={dir} value={getPath(d, path) ?? ''} onChange={(e) => set(path, e.target.value)} />
    </label>
  )
  // textarea bound to an array (one item per line)
  const ListArea = ({ label, path, rows = 5, dir }) => (
    <label className="adm-field">
      <span>{label} <em className="adm-hint">(كل سطر عنصر)</em></span>
      <textarea
        rows={rows}
        dir={dir}
        value={(getPath(d, path) || []).join('\n')}
        onChange={(e) => set(path, e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
      />
    </label>
  )
  const ImageField = ({ label, path }) => {
    const url = getPath(d, path)
    return (
      <div className="adm-field">
        <span>{label}</span>
        <div className="adm-img-row">
          {url ? <img className="adm-thumb" src={url} alt="" /> : <div className="adm-thumb adm-thumb--empty">لا صورة</div>}
          <label className="adm-btn adm-file">
            رفع صورة
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={async (e) => {
                const f = e.target.files[0]
                if (!f) return
                try { set(path, await uploadImage(f)) } catch (err) { setStatus(err.message) }
                e.target.value = ''
              }}
            />
          </label>
        </div>
      </div>
    )
  }

  const addProject = () => {
    const id = 'project-' + Math.random().toString(36).slice(2, 7)
    mutate((n) => {
      n.projects.push({
        id,
        hidden: false,
        logo: '',
        images: [],
        ar: { client: '', role: 'مدير مشروع', summary: '', whatWeDid: [] },
        en: { client: '', role: 'Project Manager', summary: '', whatWeDid: [] },
      })
    })
  }

  return (
    <div className="adm">
      <header className="adm-top">
        <h1>لوحة تحكم الموقع</h1>
        <div className="adm-top__actions">
          <a className="adm-btn" href="/" target="_blank" rel="noreferrer">عرض الموقع</a>
          <button className="adm-btn" onClick={logout}>خروج</button>
          <button className="adm-btn adm-btn--primary" onClick={save} disabled={busy}>
            {busy ? 'يحفظ…' : 'حفظ كل التغييرات'}
          </button>
        </div>
      </header>
      {status && <div className="adm-status">{status}</div>}

      <div className="adm-body">
        <section className="adm-card">
          <h2>الهيرو</h2>
          <ImageField label="صورة عوض (PNG شفاف)" path="heroImage" />
          <div className="adm-grid2">
            <Text label="الاسم (عربي)" path="content.ar.hero.name" dir="rtl" />
            <Text label="Name (EN)" path="content.en.hero.name" dir="ltr" />
            <Text label="المسمى (عربي)" path="content.ar.hero.title" dir="rtl" />
            <Text label="Title (EN)" path="content.en.hero.title" dir="ltr" />
            <Text label="الموقع (عربي)" path="content.ar.hero.location" dir="rtl" />
            <Text label="Location (EN)" path="content.en.hero.location" dir="ltr" />
            <Area label="النبذة المختصرة (عربي)" path="content.ar.hero.bio" dir="rtl" />
            <Area label="Short bio (EN)" path="content.en.hero.bio" dir="ltr" />
          </div>
        </section>

        <section className="adm-card">
          <h2>النبذة والتعليم</h2>
          <div className="adm-grid2">
            <Area label="النبذة (عربي)" path="content.ar.about.body" rows={5} dir="rtl" />
            <Area label="About (EN)" path="content.en.about.body" rows={5} dir="ltr" />
            <Text label="الشهادة (عربي)" path="content.ar.about.education" dir="rtl" />
            <Text label="Degree (EN)" path="content.en.about.education" dir="ltr" />
            <Text label="الجامعة (عربي)" path="content.ar.about.university" dir="rtl" />
            <Text label="University (EN)" path="content.en.about.university" dir="ltr" />
          </div>
        </section>

        <section className="adm-card">
          <h2>الخبرة</h2>
          <div className="adm-grid2">
            <Text label="المنصب الحالي (عربي)" path="content.ar.experience.currentRole" dir="rtl" />
            <Text label="Current role (EN)" path="content.en.experience.currentRole" dir="ltr" />
            <Text label="الشركة (عربي)" path="content.ar.experience.currentCompany" dir="rtl" />
            <Text label="Company (EN)" path="content.en.experience.currentCompany" dir="ltr" />
            <Area label="مقدمة الخبرة (عربي)" path="content.ar.experience.intro" dir="rtl" />
            <Area label="Experience intro (EN)" path="content.en.experience.intro" dir="ltr" />
          </div>
        </section>

        <section className="adm-card">
          <div className="adm-card__head">
            <h2>المشاريع</h2>
            <button className="adm-btn adm-btn--primary" onClick={addProject}>+ مشروع جديد</button>
          </div>
          {d.projects.map((p, i) => (
            <div className="adm-project" key={p.id}>
              <div className="adm-project__bar">
                <strong>{p.ar.client || p.en.client || p.id}</strong>
                <span className="adm-project__link">الرابط: /#{p.id}</span>
                <label className="adm-check">
                  <input type="checkbox" checked={!!p.hidden} onChange={(e) => set(`projects.${i}.hidden`, e.target.checked)} />
                  مخفي من الموقع
                </label>
                <button className="adm-btn adm-btn--danger" onClick={() => mutate((n) => n.projects.splice(i, 1))}>حذف</button>
              </div>

              <ImageField label="لوقو الجهة" path={`projects.${i}.logo`} />

              <div className="adm-grid2">
                <Text label="اسم الجهة (عربي)" path={`projects.${i}.ar.client`} dir="rtl" />
                <Text label="Client (EN)" path={`projects.${i}.en.client`} dir="ltr" />
                <Text label="الدور (عربي)" path={`projects.${i}.ar.role`} dir="rtl" />
                <Text label="Role (EN)" path={`projects.${i}.en.role`} dir="ltr" />
                <Area label="وصف مختصر (عربي)" path={`projects.${i}.ar.summary`} dir="rtl" />
                <Area label="Summary (EN)" path={`projects.${i}.en.summary`} dir="ltr" />
                <ListArea label="ما أنجزناه (عربي)" path={`projects.${i}.ar.whatWeDid`} dir="rtl" />
                <ListArea label="What we did (EN)" path={`projects.${i}.en.whatWeDid`} dir="ltr" />
              </div>

              <div className="adm-field">
                <span>صور المشروع</span>
                <div className="adm-gallery">
                  {(p.images || []).map((src, gi) => (
                    <div className="adm-shot" key={src + gi}>
                      <img src={src} alt="" />
                      <button className="adm-shot__x" onClick={() => mutate((n) => n.projects[i].images.splice(gi, 1))}>×</button>
                    </div>
                  ))}
                  <label className="adm-btn adm-file adm-shot-add">
                    + صورة
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={async (e) => {
                        const f = e.target.files[0]
                        if (!f) return
                        try {
                          const url = await uploadImage(f)
                          mutate((n) => n.projects[i].images.push(url))
                        } catch (err) { setStatus(err.message) }
                        e.target.value = ''
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="adm-card">
          <h2>المهارات</h2>
          <div className="adm-grid2">
            <ListArea label="المهارات (عربي)" path="content.ar.skills.items" dir="rtl" />
            <ListArea label="Skills (EN)" path="content.en.skills.items" dir="ltr" />
          </div>
        </section>

        <section className="adm-card">
          <h2>التواصل</h2>
          <div className="adm-grid2">
            <Text label="البريد الإلكتروني" path="contactInfo.email" type="email" dir="ltr" />
            <Text label="الهاتف" path="contactInfo.phone" dir="ltr" />
            <Text label="رابط لينكدإن" path="contactInfo.linkedin" dir="ltr" />
          </div>
        </section>
      </div>

      <footer className="adm-foot">
        <button className="adm-btn adm-btn--primary adm-btn--big" onClick={save} disabled={busy}>
          {busy ? 'يحفظ…' : 'حفظ كل التغييرات'}
        </button>
      </footer>
    </div>
  )
}
