import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ===================== ESTILOS (ANIME FANTASY RPG) ===================== */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap');
:root{--bg-main:#050817;--bg-card:#0b1530;--bg-panel:#101b38;--neon-blue:#00eaff;--neon-purple:#963cff;--neon-gold:#ffd45a;--neon-pink:#ff3e9d;--text-main:#f4f6ff;--text-secondary:#aab9d5}
*{box-sizing:border-box;margin:0;padding:0}
body{background:radial-gradient(circle at 50% 35%,#17265b 0%,#080d20 50%,#03050c 100%);color:var(--text-main);font-family:'Rajdhani',Georgia,serif;min-height:100vh}
.wrap{max-width:720px;margin:0 auto;padding:14px 12px 80px}
.title{font-family:'Cinzel',Georgia,serif;letter-spacing:.08em}
.rpg-card{position:relative;background:linear-gradient(145deg,#101b38,#060a19);border:2px solid var(--neon-blue);border-radius:22px;padding:20px;box-shadow:0 0 12px #00eaff66,inset 0 0 25px #00eaff18;overflow:hidden;margin-bottom:14px}
.neon-glow{text-shadow:0 0 8px var(--neon-blue),0 0 20px var(--neon-blue)}
.rpg-button{background:linear-gradient(135deg,#101b38,#202c52);color:#fff;border:1px solid var(--neon-blue);border-radius:12px;padding:12px 18px;box-shadow:0 0 12px #00eaff55;transition:.3s ease;cursor:pointer;font:700 14px 'Rajdhani',sans-serif}
.rpg-button:hover{transform:translateY(-3px);box-shadow:0 0 25px #00eaffaa}
.rpg-button.gold{border-color:var(--neon-gold);box-shadow:0 0 12px #ffd45a55}
.rpg-button.red{border-color:#e11d48;color:#fda4af}
.legendary{border:2px solid var(--neon-gold);box-shadow:0 0 12px #ffd45a88,0 0 30px #ffd45a44}
@keyframes energyPulse{0%,100%{filter:brightness(1);box-shadow:0 0 10px #00eaff55}50%{filter:brightness(1.16);box-shadow:0 0 28px #00eaffaa}}
.energy-effect{animation:energyPulse 2.5s infinite ease-in-out}
@keyframes cinematicEntry{from{opacity:0;transform:translateY(20px) scale(.96)}to{opacity:1;transform:none}}
.cinematic-entry{animation:cinematicEntry .8s ease-out}
.in{width:100%;background:rgba(5,8,23,.92);border:1px solid rgba(0,234,255,.32);border-radius:10px;padding:10px 12px;color:#fff;font:600 16px 'Rajdhani',sans-serif;outline:none}
.in:focus{border-color:var(--neon-blue);box-shadow:0 0 12px #00eaff44}
label{display:block;font-size:12px;font-weight:700;color:var(--neon-gold);margin:10px 0 4px}
.tabs{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:14px}
.tab{background:rgba(11,21,48,.9);border:1px solid rgba(0,234,255,.22);border-radius:12px;padding:9px 2px;color:var(--text-secondary);font:700 12px 'Rajdhani',sans-serif;cursor:pointer}
.tab.on{border-color:var(--neon-gold);color:#fff;box-shadow:0 0 14px #ffd45a55}
.bar{height:8px;background:#050817;border-radius:99px;border:1px solid #ffffff1f;overflow:hidden;margin:4px 0 10px}
.fill{height:100%;transition:width .5s}
.row{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}
.item{padding:12px;border-radius:10px;background:rgba(4,6,12,.85);border:1px solid rgba(148,163,184,.25);margin-top:8px}
.badge{display:inline-block;padding:3px 10px;border-radius:99px;font-size:11px;font-weight:700;border:1px solid var(--neon-gold);color:var(--neon-gold)}
.dim{color:var(--text-secondary);font-size:13px}
.err{padding:10px;border-radius:8px;background:#e11d4829;border:1px solid #e11d48;color:#fda4af;font-size:13px;margin-top:10px}
.toast{position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:99;background:#0b1530f7;border:1px solid var(--neon-gold);padding:12px 18px;border-radius:12px;font-weight:700;font-size:14px;max-width:92vw;box-shadow:0 0 24px #ffd45a66}
`;

/* ===================== UTILIDADES Y ARREGLOS ===================== */
const toHex = (b) => Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, '0')).join('');

async function hashPassword(pw, saltHex = null) {
  if (!window.crypto?.subtle) throw new Error('Tu navegador no soporta cifrado seguro (usá https o localhost).');
  const salt = saltHex ? Uint8Array.from(saltHex.match(/.{2}/g).map((h) => parseInt(h, 16))) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 150000, hash: 'SHA-256' }, key, 256);
  return { hash: toHex(bits), salt: toHex(salt) };
}

const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const daysBetween = (a, b) => Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);

function advanceStreak(s, today = dayKey()) {
  const { streak = 0, lastDay = null } = s || {};
  if (lastDay === today) return { streak, lastDay };
  if (lastDay && daysBetween(lastDay, today) === 1) return { streak: streak + 1, lastDay: today };
  return { streak: 1, lastDay: today };
}
function expireStreak(s, today = dayKey()) {
  const { streak = 0, lastDay = null } = s || {};
  return lastDay && daysBetween(lastDay, today) > 1 ? { streak: 0, lastDay } : { streak, lastDay };
}

const MAX_REWARDS_DAY = 5;
function claimQuestReward(q, log, today = dayKey()) {
  const l = log?.day === today ? log : { day: today, rewarded: 0 };
  if (l.rewarded >= MAX_REWARDS_DAY) return { ok: false, log: l };
  const k = q.env === 'Declarado' ? 0.4 : 1;
  return { ok: true, lp: Math.round(q.lp * k), exp: Math.round(q.exp * k), log: { day: today, rewarded: l.rewarded + 1 } };
}

function liftReward(name, prev, now1, liftLog, today = dayKey()) {
  const gain = Math.max(0, now1 - prev);
  if (gain > 0) return { exp: 35 + gain * 10, lp: 15 + gain * 4, liftLog: { ...liftLog, [name]: today } };
  if (liftLog?.[name] !== today) return { exp: 10, lp: 4, liftLog: { ...liftLog, [name]: today } };
  return { exp: 0, lp: 0, liftLog };
}

const ZERO_SLEEP = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => ({ day, hours: 0 }));
function weekStartKey(d = new Date()) {
  const c = new Date(d);
  c.setDate(c.getDate() - ((c.getDay() + 6) % 7));
  return dayKey(c);
}
function currentSleep(s) {
  return s?.weekStart === weekStartKey() ? s.log : ZERO_SLEEP;
}
function recordSleepToday(s, hours) {
  const idx = (new Date().getDay() + 6) % 7;
  const safe = Math.min(16, Math.max(0, Number(hours) || 0));
  return { weekStart: weekStartKey(), log: currentSleep(s).map((d, i) => (i === idx ? { ...d, hours: safe } : d)) };
}

const num = (v, fb) => (v !== '' && Number.isFinite(Number(v)) ? Number(v) : fb);

function useToast(ms = 4600) {
  const [toast, setToast] = useState(null);
  const t = useRef(null);
  const show = useCallback((m) => { clearTimeout(t.current); setToast(m); t.current = setTimeout(() => setToast(null), ms); }, [ms]);
  useEffect(() => () => clearTimeout(t.current), []);
  return [toast, show];
}

/* ===================== DATOS DEL JUEGO ===================== */
const RANKS = ['Tierra', 'Madera', 'Piedra', 'Carbón', 'Hierro', 'Bronce', 'Plata', 'Oro', 'Platino', 'Esmeralda', 'Diamante', 'Especialista', 'Maestro', 'Jefe Maestro', 'Challenger'];
function getRank(lp) {
  const s = Math.max(0, Math.min(8999, lp));
  const d = Math.floor(s / 100);
  return { label: `${RANKS[Math.min(14, Math.floor(d / 6))]} ${6 - (d % 6)}`, divLP: s % 100 };
}

// [grado, banca, sentadilla, peso muerto] como múltiplos del peso corporal
const GRADES = [['F', 0, 0, 0], ['E', .65, .85, 1], ['D', .8, 1.05, 1.25], ['C', 1, 1.25, 1.5], ['B', 1.15, 1.5, 1.75], ['A', 1.34, 1.75, 2.05], ['S', 1.55, 2, 2.35], ['SS', 1.75, 2.25, 2.6], ['SSS', 1.95, 2.5, 2.85], ['EX', 2.15, 2.75, 3.1]];

const epley = (w, r) => (!w || w <= 0 || !r || r <= 0 ? 0 : r <= 1 ? Math.round(w) : Math.round(w * (1 + r / 30)));
const eff1RM = (name, w, r, bw) => {
  w = Number(w) || 0; r = Number(r) || 0;
  if (w <= 0 || r <= 0) return 0;
  return name.toLowerCase().includes('dominada') && w < bw * 0.75 ? epley(bw + w, r) : epley(w, r);
};

function computeGrade(lifts, weightKg) {
  const bw = Math.max(40, Number(weightKg) || 75);
  const b = eff1RM('Press Banca', lifts['Press Banca']?.weight, lifts['Press Banca']?.reps, bw);
  const s = eff1RM('Sentadilla Trasera', lifts['Sentadilla Trasera']?.weight, lifts['Sentadilla Trasera']?.reps, bw);
  const d = eff1RM('Peso Muerto Convencional', lifts['Peso Muerto Convencional']?.weight, lifts['Peso Muerto Convencional']?.reps, bw);
  let idx = 0;
  for (let i = GRADES.length - 1; i >= 1; i--) {
    if (b >= Math.round(GRADES[i][1] * bw) && s >= Math.round(GRADES[i][2] * bw) && d >= Math.round(GRADES[i][3] * bw)) { idx = i; break; }
  }
  const next = GRADES[Math.min(GRADES.length - 1, idx + 1)];
  return { bw, b, s, d, grade: GRADES[idx][0], idx, next, nextKg: [Math.round(next[1] * bw), Math.round(next[2] * bw), Math.round(next[3] * bw)] };
}

const ARCHETYPES = [
  ['Centinela', 'Muralla Inquebrantable', 'Reduce a la mitad el desgaste y suma defensa base.'],
  ['Espadachín', 'Filo del Duelo Implacable', 'Más daño crítico con cada marca de Press Banca.'],
  ['Berserker', 'Furia de Sangre Indomable', 'Tu ataque escala con tu Peso Muerto.'],
  ['Asesino Sombrío', 'Paso Fantasma del Abismo', 'Más evasión contra jefes.'],
  ['Monje Astral', 'Armonía del Núcleo Interior', 'Recuperás más si cumplís tus horas de sueño.'],
  ['Soberano', 'Autoridad del Trono', 'Todas tus recompensas rinden un poco más.'],
];
const AFFINITIES = ['Infinito', 'de Ceniza', 'Carmesí', 'Celestial', 'del Vacío', 'de Tormenta'];

function randomClass(seed) {
  const a = ARCHETYPES[Math.abs(seed) % ARCHETYPES.length];
  const f = AFFINITIES[Math.abs(seed * 7 + 13) % AFFINITIES.length];
  return { name: `${a[0]} ${f}`, passiveName: `${a[1]} (${f})`, passiveDesc: a[2] };
}

function classEvolution(name, level) {
  const n = name || 'Centinela Infinito';
  if (level < 5) return { stage: 1, title: `${n} Iniciado`, next: 5 };
  if (level < 12) return { stage: 2, title: `${n} Veterano`, next: 12 };
  if (level < 25) return { stage: 3, title: `Maestro ${n}`, next: 25 };
  if (level < 45) return { stage: 4, title: `Gran ${n} Trascendente`, next: 45 };
  if (level < 75) return { stage: 5, title: `Monarca ${n}`, next: 75 };
  return { stage: 6, title: `Deidad Bélica ${n}`, next: level + 25 };
}

const DEFAULT_QUESTS = () => [
  { id: 1, title: 'Completar tu sesión de entrenamiento de hoy', env: 'Entreno', lp: 45, exp: 100, status: 'pending' },
  { id: 2, title: 'Registrar una marca en la pestaña Cargas', env: 'Sistema', lp: 35, exp: 60, status: 'pending' },
  { id: 3, title: 'Dormir al menos 7.5 horas esta noche', env: 'Recuperación', lp: 25, exp: 50, status: 'pending' },
];
const ZERO_LIFTS = Object.fromEntries(['Press Banca', 'Sentadilla Trasera', 'Peso Muerto Convencional', 'Press Militar', 'Remo con Barra', 'Dominadas Lastradas (Total)'].map((k) => [k, { weight: 0, reps: 0, date: 'Sin registrar' }]));

const USERS_KEY = 'pex_users_v13';
const SESSION_KEY = 'pex_session_v13';
const DATA_KEY = (email) => `pex_data_v13_${email}`;

/* ===================== LOGIN / REGISTRO ===================== */
function AuthPortal({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [tag, setTag] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const mail = email.trim().toLowerCase();
    if (!mail || pw.length < 6) return setError('Ingresá un usuario y una contraseña de al menos 6 caracteres.');
    setBusy(true);
    try {
      const db = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
      if (mode === 'register') {
        if (db[mail]) throw new Error('Ese usuario ya existe. Probá "Iniciar sesión".');
        const { hash, salt } = await hashPassword(pw);
        db[mail] = { email: mail, passHash: hash, salt, hunterName: (tag.trim() || mail.split('@')[0]).toUpperCase(), createdAt: new Date().toISOString() };
        localStorage.setItem(USERS_KEY, JSON.stringify(db));
        onAuth(db[mail]);
      } else {
        const acc = db[mail];
        if (!acc) throw new Error('Cuenta no encontrada. Creá una primero.');
        const { hash } = await hashPassword(pw, acc.salt);
        if (hash !== acc.passHash) throw new Error('Contraseña incorrecta.');
        onAuth(acc);
      }
    } catch (err) {
      setError(err.message || 'Error al verificar los datos.');
    }
    setBusy(false);
  };

  return (
    <div className="wrap" style={{ maxWidth: 460, paddingTop: 40 }}>
      <div className="rpg-card legendary cinematic-entry">
        <div style={{ textAlign: 'center' }}>
          <h1 className="title neon-glow" style={{ fontSize: 28 }}>PROTOCOLO EX</h1>
          <p className="dim">Tu progreso se guarda en este dispositivo.</p>
        </div>
        <div className="row" style={{ margin: '16px 0 4px' }}>
          <button type="button" className={`rpg-button ${mode === 'login' ? 'gold' : ''}`} style={{ flex: 1 }} onClick={() => { setMode('login'); setError(''); }}>Iniciar sesión</button>
          <button type="button" className={`rpg-button ${mode === 'register' ? 'gold' : ''}`} style={{ flex: 1 }} onClick={() => { setMode('register'); setError(''); }}>Crear cuenta</button>
        </div>
        <form onSubmit={submit}>
          {mode === 'register' && (<><label>NOMBRE CLAVE DE CAZADOR</label><input className="in" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Ej: AKIRA" /></>)}
          <label>CORREO O USUARIO</label>
          <input className="in" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          <label>CONTRASEÑA</label>
          <input className="in" type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
          {error && <div className="err">{error}</div>}
          <button type="submit" className="rpg-button gold" style={{ width: '100%', marginTop: 16 }} disabled={busy}>
            {busy ? 'Verificando…' : mode === 'login' ? 'Entrar' : 'Registrarme'}
          </button>
        </form>
        <p className="dim" style={{ marginTop: 12 }}>Aviso: es una cuenta local, no sincroniza entre dispositivos. Si borrás los datos del navegador, se pierde.</p>
      </div>
    </div>
  );
}

/* ===================== APP PRINCIPAL ===================== */
export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const email = localStorage.getItem(SESSION_KEY);
      const db = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
      return email && db[email] ? db[email] : null;
    } catch { return null; }
  });

  useEffect(() => {
    const tag = document.createElement('style');
    tag.innerHTML = CSS;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  const login = (acc) => { localStorage.setItem(SESSION_KEY, acc.email); setUser(acc); };
  const logout = () => { localStorage.removeItem(SESSION_KEY); setUser(null); };
  const deleteAccount = () => {
    const db = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    delete db[user.email];
    localStorage.setItem(USERS_KEY, JSON.stringify(db));
    localStorage.removeItem(DATA_KEY(user.email));
    logout();
  };

  if (!user) return <AuthPortal onAuth={login} />;
  return <Workspace key={user.email} user={user} onLogout={logout} onDelete={deleteAccount} />;
}

function freshData(user) {
  return {
    awakened: false,
    profile: { hunterName: user.hunterName || 'CAZADOR', gender: 'male', weightKg: 75, benchKg: 0, squatKg: 0, deadliftKg: 0 },
    cls: null, lifts: ZERO_LIFTS, lp: 0, exp: 0,
    streak: { streak: 0, lastDay: null }, dailyLog: { day: '', rewarded: 0 }, liftLog: {},
    quests: DEFAULT_QUESTS(), questDay: dayKey(), sleep: { weekStart: weekStartKey(), log: ZERO_SLEEP },
  };
}

function Workspace({ user, onLogout, onDelete }) {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(DATA_KEY(user.email));
      const d = raw ? { ...freshData(user), ...JSON.parse(raw) } : freshData(user);
      d.streak = expireStreak(d.streak);
      if (d.questDay !== dayKey()) { d.quests = DEFAULT_QUESTS(); d.questDay = dayKey(); }
      return d;
    } catch { return freshData(user); }
  });
  const [tab, setTab] = useState('avatar');
  const [toast, notify] = useToast();
  const [newQuest, setNewQuest] = useState('');
  const [exName, setExName] = useState('Press Banca');
  const [wIn, setWIn] = useState(0);
  const [rIn, setRIn] = useState(0);
  const [sleepIn, setSleepIn] = useState(0);
  const [confirmText, setConfirmText] = useState('');
  const [form, setForm] = useState({ ...data.profile });

  useEffect(() => {
    try { localStorage.setItem(DATA_KEY(user.email), JSON.stringify(data)); }
    catch { notify('No se pudo guardar: el almacenamiento del navegador está lleno.'); }
  }, [data, user.email, notify]);

  const patch = (p) => setData((d) => ({ ...d, ...p }));
  const { profile, lifts, lp, exp, streak, quests, cls } = data;
  const level = Math.floor(exp / 100) + 1;
  const g = computeGrade(lifts, profile.weightKg);
  const evo = classEvolution(cls?.name, level);
  const rank = getRank(lp);
  const sleepLog = currentSleep(data.sleep);
  const totalSleep = sleepLog.reduce((a, d) => a + d.hours, 0);
  const power = Math.round((g.b + g.s + g.d) * 0.45 + level * 14 + 30 + (level - 1) * 6);

  const addRewards = (addExp, addLp, extra = {}) => {
    const before = Math.floor(exp / 100) + 1;
    const after = Math.floor((exp + addExp) / 100) + 1;
    patch({ exp: exp + addExp, lp: lp + addLp, ...extra });
    if (after > before) notify(`¡SUBISTE DE NIVEL! Nv. ${before} → Nv. ${after}`);
  };

  const awaken = () => {
    const p = { ...profile, weightKg: Math.max(30, num(form.weightKg, 75)), benchKg: Math.max(0, num(form.benchKg, 0)), squatKg: Math.max(0, num(form.squatKg, 0)), deadliftKg: Math.max(0, num(form.deadliftKg, 0)), hunterName: (form.hunterName || 'CAZADOR').toUpperCase(), gender: form.gender };
    const mk = (w) => ({ weight: w, reps: w > 0 ? 5 : 0, date: w > 0 ? 'Despertar' : 'Sin registrar' });
    const l = { ...ZERO_LIFTS, 'Press Banca': mk(p.benchKg), 'Sentadilla Trasera': mk(p.squatKg), 'Peso Muerto Convencional': mk(p.deadliftKg) };
    const seed = Math.floor(p.weightKg * 17 + Math.random() * 9973);
    patch({ profile: p, lifts: l, cls: randomClass(seed), awakened: true });
    notify('¡DESPERTAR COMPLETO! Empezás desde nivel 1.');
  };

  const completeQuest = (q) => {
    const r = claimQuestReward(q, data.dailyLog);
    const quests2 = quests.map((x) => (x.id === q.id ? { ...x, status: 'completed' } : x));
    if (!r.ok) { patch({ quests: quests2 }); return notify('Misión registrada, pero llegaste al límite diario de recompensas.'); }
    const prevStreak = streak.streak;
    const st = advanceStreak(streak);
    addRewards(r.exp, r.lp, { quests: quests2, streak: st, dailyLog: r.log });
    notify(`¡MISIÓN CUMPLIDA! +${r.exp} EXP +${r.lp} LP${st.streak > prevStreak ? ` • Racha ${st.streak} día(s)` : ''}`);
  };

  const saveLift = () => {
    const w = Math.max(0, num(wIn, 0)), r = Math.max(0, num(rIn, 0));
    if (w <= 0 || r <= 0) return notify('Ingresá un peso y repeticiones mayores a 0.');
    const prev = eff1RM(exName, lifts[exName]?.weight, lifts[exName]?.reps, g.bw);
    const now1 = eff1RM(exName, w, r, g.bw);
    const rw = liftReward(exName, prev, now1, data.liftLog);
    const newLifts = { ...lifts, [exName]: { weight: w, reps: r, date: new Date().toLocaleDateString() } };
    const newGrade = computeGrade(newLifts, profile.weightKg).grade;
    addRewards(rw.exp, rw.lp, { lifts: newLifts, liftLog: rw.liftLog });
    if (newGrade !== g.grade && computeGrade(newLifts, profile.weightKg).idx > g.idx) notify(`¡ASCENSO A GRADO ${newGrade}!`);
    else notify(rw.exp > 0 ? `${exName}: 1RM ${now1} kg • +${rw.exp} EXP +${rw.lp} LP` : `${exName} guardado (ya cobraste la base de hoy).`);
  };

  const resetAll = () => {
    setData({ ...freshData(user), profile, awakened: true, cls, lifts: ZERO_LIFTS });
    setWIn(0); setRIn(0);
    notify('Progreso reiniciado a 0.');
  };

  /* ---------- ONBOARDING ---------- */
  if (!data.awakened) {
    const f = (k, v) => setForm({ ...form, [k]: v });
    return (
      <div className="wrap" style={{ paddingTop: 30 }}>
        {toast && <div className="toast">{toast}</div>}
        <div className="rpg-card legendary cinematic-entry">
          <h1 className="title neon-glow" style={{ fontSize: 24, textAlign: 'center' }}>DESPERTAR DEL CAZADOR</h1>
          <p className="dim" style={{ textAlign: 'center' }}>Todo empieza en nivel 1, racha 0 y 0 LP. Las marcas son opcionales.</p>
          <label>NOMBRE CLAVE</label>
          <input className="in" value={form.hunterName} onChange={(e) => f('hunterName', e.target.value.toUpperCase())} />
          <label>GÉNERO DEL AVATAR</label>
          <select className="in" value={form.gender} onChange={(e) => f('gender', e.target.value)}>
            <option value="male">Masculino</option><option value="female">Femenino</option>
          </select>
          <label>PESO CORPORAL (KG)</label>
          <input type="number" className="in" value={form.weightKg} onChange={(e) => f('weightKg', e.target.value)} />
          <label>PRESS BANCA, 5 REPS (KG)</label>
          <input type="number" className="in" value={form.benchKg} onChange={(e) => f('benchKg', e.target.value)} />
          <label>SENTADILLA, 5 REPS (KG)</label>
          <input type="number" className="in" value={form.squatKg} onChange={(e) => f('squatKg', e.target.value)} />
          <label>PESO MUERTO, 5 REPS (KG)</label>
          <input type="number" className="in" value={form.deadliftKg} onChange={(e) => f('deadliftKg', e.target.value)} />
          <button className="rpg-button gold" style={{ width: '100%', marginTop: 18 }} onClick={awaken}>COMENZAR DESDE 0</button>
        </div>
      </div>
    );
  }

  /* ---------- INTERFAZ PRINCIPAL ---------- */
  const TABS = [['avatar', 'Clase'], ['quests', 'Misiones'], ['lifts', 'Cargas'], ['sleep', `Sueño`], ['settings', 'Ajustes']];
  const evoPct = Math.min(100, Math.round((exp % 100)));

  return (
    <div className="wrap">
      {toast && <div className="toast">{toast}</div>}

      <div className="rpg-card legendary cinematic-entry">
        <div className="row">
          <div>
            <span className="badge">NV. {level}</span> <span className="badge">GRADO {g.grade}</span> <span className="badge">RACHA {streak.streak}D</span> <span className="badge">PODER {power}</span>
            <h1 className="title neon-glow" style={{ fontSize: 22, marginTop: 8 }}>{profile.hunterName}</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="title" style={{ color: 'var(--neon-gold)', fontSize: 18 }}>{rank.label.toUpperCase()}</div>
            <div className="dim">{lp} LP</div>
          </div>
        </div>
        <div className="dim" style={{ marginTop: 10 }}>Rango: {rank.divLP}/100 LP</div>
        <div className="bar"><div className="fill" style={{ width: `${rank.divLP}%`, background: 'linear-gradient(90deg,#b45309,#ffd45a)' }} /></div>
        <div className="dim">EXP de nivel: {evoPct}/100</div>
        <div className="bar"><div className="fill" style={{ width: `${evoPct}%`, background: 'linear-gradient(90deg,#0284c7,#00eaff)' }} /></div>
      </div>

      <div className="tabs">
        {TABS.map(([id, label]) => (
          <button key={id} className={`tab ${tab === id ? 'on' : ''}`} onClick={() => setTab(id)}>{id === 'sleep' ? `Sueño ${totalSleep}h` : label}</button>
        ))}
      </div>

      {tab === 'avatar' && (
        <div className="rpg-card energy-effect cinematic-entry" style={{ borderColor: 'var(--neon-purple)' }}>
          <div className="dim">ETAPA {evo.stage} • Siguiente evolución en nivel {evo.next}</div>
          <h2 className="title neon-glow" style={{ fontSize: 20, margin: '6px 0' }}>{evo.title.toUpperCase()}</h2>
          <div className="item">
            <span className="badge" style={{ borderColor: 'var(--neon-purple)', color: '#e9d5ff' }}>PASIVA ÚNICA</span>
            <div className="title" style={{ fontSize: 16, marginTop: 8 }}>{cls?.passiveName}</div>
            <p className="dim" style={{ marginTop: 4 }}>{cls?.passiveDesc}</p>
          </div>
          <div className="item">
            <div style={{ fontWeight: 700 }}>1RM estimado: Banca {g.b} kg • Sentadilla {g.s} kg • Peso Muerto {g.d} kg</div>
            {g.grade !== 'EX' ? (
              <p className="dim" style={{ marginTop: 4 }}>Para el Grado {g.next[0]} necesitás: Banca {g.nextKg[0]} kg • Sentadilla {g.nextKg[1]} kg • Peso Muerto {g.nextKg[2]} kg</p>
            ) : (<p className="dim">¡Llegaste al Grado EX!</p>)}
          </div>
        </div>
      )}

      {tab === 'quests' && (
        <div className="rpg-card cinematic-entry">
          <h2 className="title" style={{ fontSize: 16, color: 'var(--neon-gold)' }}>MISIONES DE HOY</h2>
          <p className="dim">La racha sube una vez por día. Máximo {MAX_REWARDS_DAY} recompensas diarias; las misiones propias dan 40%.</p>
          <div className="row" style={{ margin: '12px 0', flexWrap: 'nowrap' }}>
            <input className="in" placeholder="Declarar misión propia…" value={newQuest} onChange={(e) => setNewQuest(e.target.value)} />
            <button className="rpg-button gold" onClick={() => {
              if (!newQuest.trim()) return;
              patch({ quests: [{ id: Date.now(), title: newQuest.trim(), env: 'Declarado', lp: 45, exp: 95, status: 'pending' }, ...quests] });
              setNewQuest('');
            }}>Agregar</button>
          </div>
          {quests.map((q) => (
            <div key={q.id} className="item" style={{ borderColor: q.status === 'completed' ? '#10b981' : q.status === 'failed' ? '#e11d48' : undefined }}>
              <div style={{ fontWeight: 700 }}>{q.title}</div>
              <div className="dim">+{q.lp} LP • +{q.exp} EXP • {q.status === 'completed' ? 'Cumplida' : q.status === 'failed' ? 'Fallida' : 'En curso'}</div>
              {q.status === 'pending' && (
                <div className="row" style={{ marginTop: 8, justifyContent: 'flex-start' }}>
                  <button className="rpg-button" onClick={() => completeQuest(q)}>Logrado</button>
                  <button className="rpg-button red" onClick={() => patch({ quests: quests.map((x) => (x.id === q.id ? { ...x, status: 'failed' } : x)) })}>No logrado</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'lifts' && (
        <div className="rpg-card cinematic-entry">
          <h2 className="title" style={{ fontSize: 16, color: '#fb7185' }}>REGISTRO DE CARGAS</h2>
          <p className="dim">Solo cobrás recompensa fuerte si superás tu marca anterior.</p>
          <label>EJERCICIO</label>
          <select className="in" value={exName} onChange={(e) => { setExName(e.target.value); setWIn(lifts[e.target.value]?.weight || 0); setRIn(lifts[e.target.value]?.reps || 0); }}>
            {Object.keys(lifts).map((k) => <option key={k}>{k}</option>)}
          </select>
          <div className="row" style={{ flexWrap: 'nowrap' }}>
            <div style={{ flex: 1 }}><label>CARGA (KG)</label><input type="number" className="in" value={wIn} onChange={(e) => setWIn(e.target.value)} /></div>
            <div style={{ flex: 1 }}><label>REPS</label><input type="number" className="in" value={rIn} onChange={(e) => setRIn(e.target.value)} /></div>
          </div>
          <p className="dim" style={{ marginTop: 8 }}>1RM estimado: <b style={{ color: 'var(--neon-blue)' }}>{eff1RM(exName, wIn, rIn, g.bw)} kg</b></p>
          <button className="rpg-button gold" style={{ width: '100%', marginTop: 10 }} onClick={saveLift}>Guardar marca</button>
          {Object.entries(lifts).map(([k, v]) => (
            <div key={k} className="item row">
              <div><b>{k}</b><div className="dim">{v.weight} kg × {v.reps} • {v.date}</div></div>
              <b style={{ color: 'var(--neon-blue)' }}>{eff1RM(k, v.weight, v.reps, g.bw)} kg</b>
            </div>
          ))}
        </div>
      )}

      {tab === 'sleep' && (
        <div className="rpg-card cinematic-entry">
          <h2 className="title" style={{ fontSize: 16, color: '#38bdf8' }}>SUEÑO SEMANAL</h2>
          <p className="dim">Total: {totalSleep} h • Meta orientativa: 49–63 h por semana. Se reinicia cada lunes.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6, margin: '12px 0', textAlign: 'center' }}>
            {sleepLog.map((d) => (<div key={d.day} className="item" style={{ padding: 8, marginTop: 0 }}><div className="dim">{d.day}</div><b>{d.hours}h</b></div>))}
          </div>
          <div className="row" style={{ flexWrap: 'nowrap' }}>
            <input type="number" step="0.5" className="in" style={{ maxWidth: 120 }} value={sleepIn} onChange={(e) => setSleepIn(e.target.value)} />
            <button className="rpg-button" onClick={() => { patch({ sleep: recordSleepToday(data.sleep, sleepIn) }); notify(`Sueño de hoy: ${sleepIn} h`); }}>Registrar sueño de hoy</button>
          </div>
        </div>
      )}

      {tab === 'settings' && (
        <>
          <div className="rpg-card cinematic-entry">
            <h2 className="title" style={{ fontSize: 16, color: 'var(--neon-blue)' }}>AJUSTES</h2>
            <label>NOMBRE DE CAZADOR</label>
            <input className="in" value={profile.hunterName} onChange={(e) => patch({ profile: { ...profile, hunterName: e.target.value.toUpperCase() } })} />
            <label>PESO CORPORAL (KG)</label>
            <input type="number" className="in" value={profile.weightKg} onChange={(e) => patch({ profile: { ...profile, weightKg: e.target.value === '' ? '' : Number(e.target.value) } })} />
            <p className="dim" style={{ marginTop: 10 }}>Cuenta: {user.email}</p>
            <div className="row" style={{ marginTop: 10, justifyContent: 'flex-start' }}>
              <button className="rpg-button" onClick={onLogout}>Cerrar sesión</button>
              <button className="rpg-button gold" onClick={resetAll}>Reiniciar progreso a 0</button>
            </div>
          </div>
          <div className="rpg-card" style={{ borderColor: '#e11d48' }}>
            <h3 className="title" style={{ fontSize: 15, color: '#fb7185' }}>ZONA DE PELIGRO</h3>
            <p className="dim">Borra tu cuenta y todos tus datos de este dispositivo. Escribí BORRAR para confirmar.</p>
            <div className="row" style={{ marginTop: 8, flexWrap: 'nowrap' }}>
              <input className="in" value={confirmText} onChange={(e) => setConfirmText(e.target.value.toUpperCase())} placeholder="BORRAR" />
              <button className="rpg-button red" onClick={() => (confirmText === 'BORRAR' ? onDelete() : notify('Escribí BORRAR en mayúsculas.'))}>Eliminar cuenta</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
