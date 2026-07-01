import { useCallback, useEffect, useState } from 'react'
import './admin.css'

const TOKEN_KEY = 'portfolio-admin-token'

const DEFAULT_THEME = {
  accent: '#c19a4e',
  dark: { bg: '#15161a', card: '#212329', text: '#e6e7ea' },
  light: { bg: '#f4f4f2', card: '#ffffff', text: '#1c1d20' },
}

function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj)
}

/* -------------------------------------------------------------------------
   Field components are declared at MODULE level (not inside Admin) so their
   identity is stable between renders — otherwise every keystroke remounts the
   input and it loses focus after one character.
   ------------------------------------------------------------------------- */

function TextField({ label, path, d, set, type = 'text', dir }) {
  return (
    <label className="adm-field">
      <span>{label}</span>
      <input type={type} dir={dir} value={getPath(d, path) ?? ''} onChange={(e) => set(path, e.target.value)} />
    </label>
  )
}

function ColorField({ label, path, d, set }) {
  const val = getPath(d, path) || '#000000'
  return (
    <label className="adm-field">
      <span>{label}</span>
      <div className="adm-color-row">
        <input type="color" value={val} onChange={(e) => set(path, e.target.value)} />
        <input type="text" dir="ltr" value={val} onChange={(e) => set(path, e.target.value)} />
      </div>
    </label>
  )
}

// Bilingual text field with auto-translate (mirror) on blur + manual buttons.
function Pair({ labelAr, labelEn, pathAr, pathEn, d, set, translate, multiline, rows = 3 }) {
  const ar = getPath(d, pathAr) ?? ''
  const en = getPath(d, pathEn) ?? ''
  const [busy, setBusy] = useState('')

  const run = async (from) => {
    const src = from === 'ar' ? ar : en
    if (!src.trim()) return
    setBusy(from)
    try {
      const out = await translate(src, from, from === 'ar' ? 'en' : 'ar')
      if (out) set(from === 'ar' ? pathEn : pathAr, out)
    } finally {
      setBusy('')
    }
  }

  const Tag = multiline ? 'textarea' : 'input'
  return (
    <div className="adm-pair">
      <label className="adm-field">
        <span>
          {labelAr}
          <button type="button" className="adm-mini" onClick={() => run('ar')} disabled={!!busy}>
            {busy === 'ar' ? '…' : 'ترجم ←'}
          </button>
        </span>
        <Tag dir="rtl" rows={multiline ? rows : undefined} value={ar}
          onChange={(e) => set(pathAr, e.target.value)}
          onBlur={() => { if (!en.trim()) run('ar') }} />
      </label>
      <label className="adm-field">
        <span>
          {labelEn}
          <button type="button" className="adm-mini" onClick={() => run('en')} disabled={!!busy}>
            {busy === 'en' ? '…' : '→ ترجم'}
          </button>
        </span>
        <Tag dir="ltr" rows={multiline ? rows : undefined} value={en}
          onChange={(e) => set(pathEn, e.target.value)}
          onBlur={() => { if (!ar.trim()) run('en') }} />
      </label>
    </div>
  )
}

// Bilingual list (one item per line) with a per-direction translate button.
function ListPair({ labelAr, labelEn, pathAr, pathEn, d, set, translate, rows = 5 }) {
  const arArr = getPath(d, pathAr) || []
  const enArr = getPath(d, pathEn) || []
  const [busy, setBusy] = useState('')
  const toArr = (v) => v.split('\n').map((s) => s.trim()).filter(Boolean)

  const run = async (from) => {
    const src = from === 'ar' ? arArr : enArr
    if (!src.length) return
    setBusy(from)
    try {
      const out = await Promise.all(src.map((line) => translate(line, from, from === 'ar' ? 'en' : 'ar')))
      set(from === 'ar' ? pathEn : pathAr, out.filter(Boolean))
    } finally {
      setBusy('')
    }
  }

  return (
    <div className="adm-pair">
      <label className="adm-field">
        <span>
          {labelAr} <em className="adm-hint">(سطر لكل عنصر)</em>
          <button type="button" className="adm-mini" onClick={() => run('ar')} disabled={!!busy}>
            {busy === 'ar' ? '…' : 'ترجم ←'}
          </button>
        </span>
        <textarea dir="rtl" rows={rows} value={arArr.join('\n')} onChange={(e) => set(pathAr, toArr(e.target.value))} />
      </label>
      <label className="adm-field">
        <span>
          {labelEn}
          <button type="button" className="adm-mini" onClick={() => run('en')} disabled={!!busy}>
            {busy === 'en' ? '…' : '→ ترجم'}
          </button>
        </span>
        <textarea dir="ltr" rows={rows} value={enArr.join('\n')} onChange={(e) => set(pathEn, toArr(e.target.value))} />
      </label>
    </div>
  )
}

function ImageField({ label, path, d, set, uploadImage, onError }) {
  const url = getPath(d, path)
  return (
    <div className="adm-field">
      <span>{label}</span>
      <div className="adm-img-row">
        {url ? <img className="adm-thumb" src={url} alt="" /> : <div className="adm-thumb adm-thumb--empty">لا صورة</div>}
        <label className="adm-btn adm-file">
          رفع صورة
          <input type="file" accept="image/*" hidden onChange={async (e) => {
            const f = e.target.files[0]
            if (!f) return
            try { set(path, await uploadImage(f)) } catch (err) { onError(err.message) }
            e.target.value = ''
          }} />
        </label>
      </div>
    </div>
  )
}

function Login({ onLogin }) {
  const [code, setCode] = useState('')
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
        body: JSON.stringify({ code }),
      })
      if (!res.ok) throw new Error('الرمز غير صحيح')
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
        <p className="adm-muted">أدخل رمز الدخول لإدارة الموقع</p>
        <label className="adm-field">
          <span>رمز الدخول</span>
          <input type="password" value={code} onChange={(e) => setCode(e.target.value)} autoComplete="current-password" autoFocus required />
        </label>
        {error && <p className="adm-error">{error}</p>}
        <button className="adm-btn adm-btn--primary" disabled={busy}>{busy ? '...' : 'دخول'}</button>
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
      .then((json) => {
        if (!json.theme) json.theme = structuredClone(DEFAULT_THEME)
        if (!json.contactInfo.extraMethods) json.contactInfo.extraMethods = []
        setD(json)
      })
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

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }, [])

  const uploadImage = useCallback(async (file) => {
    const fd = new FormData()
    fd.append('image', file)
    const res = await fetch('/api/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd })
    if (res.status === 401) { logout(); throw new Error('انتهت الجلسة') }
    if (!res.ok) throw new Error('فشل رفع الصورة')
    const { url } = await res.json()
    return url
  }, [token, logout])

  const translate = useCallback(async (text, source, target) => {
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text, source, target }),
      })
      if (res.status === 401) { logout(); return '' }
      if (!res.ok) return ''
      const j = await res.json()
      return j.text || ''
    } catch {
      return ''
    }
  }, [token, logout])

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

  if (!token) return <Login onLogin={setToken} />
  if (!d) return <div className="adm-loading">جارِ التحميل…</div>

  const P = { d, set, translate } // shared props for Pair / ListPair
  const addProject = () => mutate((n) => {
    n.projects.push({
      id: 'project-' + Math.random().toString(36).slice(2, 7),
      hidden: false, logo: '', images: [],
      ar: { client: '', role: 'مدير مشروع', summary: '', whatWeDid: [] },
      en: { client: '', role: 'Project Manager', summary: '', whatWeDid: [] },
    })
  })
  const addMethod = () => mutate((n) => {
    n.contactInfo.extraMethods = n.contactInfo.extraMethods || []
    n.contactInfo.extraMethods.push({ id: 'm' + Math.random().toString(36).slice(2, 7), labelAr: '', labelEn: '', value: '', href: '' })
  })

  return (
    <div className="adm">
      <header className="adm-top">
        <h1>لوحة تحكم الموقع</h1>
        <div className="adm-top__actions">
          <a className="adm-btn" href="/" target="_blank" rel="noreferrer">عرض الموقع</a>
          <button className="adm-btn" onClick={logout}>خروج</button>
          <button className="adm-btn adm-btn--primary" onClick={save} disabled={busy}>{busy ? 'يحفظ…' : 'حفظ كل التغييرات'}</button>
        </div>
      </header>
      {status && <div className="adm-status">{status}</div>}

      <div className="adm-body">
        <section className="adm-card">
          <h2>الألوان الرئيسية</h2>
          <p className="adm-muted adm-note">اللون الأساسي يظهر في العناوين الصغيرة، اسم الهيرو، وأيقونات التواصل.</p>
          <div className="adm-grid3">
            <ColorField label="اللون الأساسي" path="theme.accent" d={d} set={set} />
          </div>
          <h3 className="adm-sub">الوضع الداكن</h3>
          <div className="adm-grid3">
            <ColorField label="الخلفية" path="theme.dark.bg" d={d} set={set} />
            <ColorField label="البطاقات" path="theme.dark.card" d={d} set={set} />
            <ColorField label="النص" path="theme.dark.text" d={d} set={set} />
          </div>
          <h3 className="adm-sub">الوضع الفاتح</h3>
          <div className="adm-grid3">
            <ColorField label="الخلفية" path="theme.light.bg" d={d} set={set} />
            <ColorField label="البطاقات" path="theme.light.card" d={d} set={set} />
            <ColorField label="النص" path="theme.light.text" d={d} set={set} />
          </div>
        </section>

        <section className="adm-card">
          <h2>الهيرو</h2>
          <ImageField label="صورة عوض (PNG شفاف)" path="heroImage" d={d} set={set} uploadImage={uploadImage} onError={setStatus} />
          <Pair labelAr="الاسم (عربي)" labelEn="Name (EN)" pathAr="content.ar.hero.name" pathEn="content.en.hero.name" {...P} />
          <Pair labelAr="المسمى (عربي)" labelEn="Title (EN)" pathAr="content.ar.hero.title" pathEn="content.en.hero.title" {...P} />
          <Pair labelAr="الموقع (عربي)" labelEn="Location (EN)" pathAr="content.ar.hero.location" pathEn="content.en.hero.location" {...P} />
          <Pair labelAr="النبذة المختصرة (عربي)" labelEn="Short bio (EN)" pathAr="content.ar.hero.bio" pathEn="content.en.hero.bio" multiline {...P} />
        </section>

        <section className="adm-card">
          <h2>النبذة والتعليم</h2>
          <Pair labelAr="النبذة (عربي)" labelEn="About (EN)" pathAr="content.ar.about.body" pathEn="content.en.about.body" multiline rows={5} {...P} />
          <Pair labelAr="الشهادة (عربي)" labelEn="Degree (EN)" pathAr="content.ar.about.education" pathEn="content.en.about.education" {...P} />
          <Pair labelAr="الجامعة (عربي)" labelEn="University (EN)" pathAr="content.ar.about.university" pathEn="content.en.about.university" {...P} />
        </section>

        <section className="adm-card">
          <h2>الخبرة</h2>
          <Pair labelAr="المنصب الحالي (عربي)" labelEn="Current role (EN)" pathAr="content.ar.experience.currentRole" pathEn="content.en.experience.currentRole" {...P} />
          <Pair labelAr="الشركة (عربي)" labelEn="Company (EN)" pathAr="content.ar.experience.currentCompany" pathEn="content.en.experience.currentCompany" {...P} />
          <Pair labelAr="مقدمة الخبرة (عربي)" labelEn="Experience intro (EN)" pathAr="content.ar.experience.intro" pathEn="content.en.experience.intro" multiline {...P} />
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

              <ImageField label="لوقو الجهة" path={`projects.${i}.logo`} d={d} set={set} uploadImage={uploadImage} onError={setStatus} />

              <Pair labelAr="اسم الجهة (عربي)" labelEn="Client (EN)" pathAr={`projects.${i}.ar.client`} pathEn={`projects.${i}.en.client`} {...P} />
              <Pair labelAr="الدور (عربي)" labelEn="Role (EN)" pathAr={`projects.${i}.ar.role`} pathEn={`projects.${i}.en.role`} {...P} />
              <Pair labelAr="وصف مختصر (عربي)" labelEn="Summary (EN)" pathAr={`projects.${i}.ar.summary`} pathEn={`projects.${i}.en.summary`} multiline {...P} />
              <ListPair labelAr="ما أنجزناه (عربي)" labelEn="What we did (EN)" pathAr={`projects.${i}.ar.whatWeDid`} pathEn={`projects.${i}.en.whatWeDid`} {...P} />

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
                    <input type="file" accept="image/*" hidden onChange={async (e) => {
                      const f = e.target.files[0]
                      if (!f) return
                      try { const url = await uploadImage(f); mutate((n) => n.projects[i].images.push(url)) } catch (err) { setStatus(err.message) }
                      e.target.value = ''
                    }} />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="adm-card">
          <h2>المهارات</h2>
          <ListPair labelAr="المهارات (عربي)" labelEn="Skills (EN)" pathAr="content.ar.skills.items" pathEn="content.en.skills.items" {...P} />
        </section>

        <section className="adm-card">
          <div className="adm-card__head">
            <h2>التواصل</h2>
            <button className="adm-btn adm-btn--primary" onClick={addMethod}>+ طريقة تواصل</button>
          </div>
          <div className="adm-grid3">
            <TextField label="البريد الإلكتروني" path="contactInfo.email" type="email" d={d} set={set} dir="ltr" />
            <TextField label="الهاتف" path="contactInfo.phone" d={d} set={set} dir="ltr" />
            <TextField label="رابط لينكدإن" path="contactInfo.linkedin" d={d} set={set} dir="ltr" />
          </div>

          {(d.contactInfo.extraMethods || []).map((m, i) => (
            <div className="adm-method" key={m.id}>
              <div className="adm-project__bar">
                <strong>{m.labelAr || m.labelEn || 'طريقة تواصل'}</strong>
                <button className="adm-btn adm-btn--danger" onClick={() => mutate((n) => n.contactInfo.extraMethods.splice(i, 1))}>حذف</button>
              </div>
              <Pair labelAr="الاسم (عربي)" labelEn="Label (EN)" pathAr={`contactInfo.extraMethods.${i}.labelAr`} pathEn={`contactInfo.extraMethods.${i}.labelEn`} {...P} />
              <div className="adm-grid2">
                <TextField label="القيمة (تظهر للزائر)" path={`contactInfo.extraMethods.${i}.value`} d={d} set={set} dir="ltr" />
                <TextField label="الرابط (اختياري، مثل https://... أو mailto: أو tel:)" path={`contactInfo.extraMethods.${i}.href`} d={d} set={set} dir="ltr" />
              </div>
            </div>
          ))}
        </section>
      </div>

      <footer className="adm-foot">
        <button className="adm-btn adm-btn--primary adm-btn--big" onClick={save} disabled={busy}>{busy ? 'يحفظ…' : 'حفظ كل التغييرات'}</button>
      </footer>
    </div>
  )
}
