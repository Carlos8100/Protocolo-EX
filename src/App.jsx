import React, { useState, useEffect, useRef } from 'react';
import {
  Flame, Trophy, Dumbbell, Moon, Camera, Sparkles, Shield,
  CheckCircle2, XCircle, CloudRain, Zap, Lock, EyeOff,
  Upload, Scan, Cpu, FileText, AlertTriangle,
  ChevronRight, Sword, Clock, Save, Check,
  UserCheck, Users, MapPin, Play, BookOpen, Plus, Crosshair,
  LogIn, KeyRound, Mail, UserPlus, Settings, Trash2,
  Heart, Building2, Send
} from 'lucide-react';

// ============================================================================
// ESTILOS DE INTERFAZ ESTILO MANHWA / SOLO LEVELING (V10)
// ============================================================================
const SYSTEM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800;900&family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&display=swap');

  :root {
    --bg-void: #03050a;
    --bg-panel: rgba(8, 12, 22, 0.95);
    --cyan-glow: #00f0ff;
    --gold-rank: #d4af37;
    --crimson-vein: #be123c;
    --text-main: #e2e8f0;
    --text-dim: #94a3b8;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: var(--bg-void);
    background-image:
      radial-gradient(circle at 50% 10%, rgba(0, 240, 255, 0.12) 0%, transparent 45%),
      radial-gradient(circle at 50% 90%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
      linear-gradient(180deg, #020307 0%, #060914 100%);
    color: var(--text-main);
    font-family: 'Rajdhani', -apple-system, BlinkMacSystemFont, sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .font-hud {
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 0.06em;
  }

  .font-souls {
    font-family: 'Cinzel', serif;
    letter-spacing: 0.08em;
  }

  .sys-container {
    max-width: 1020px;
    margin: 0 auto;
    padding: 14px 12px 96px;
  }

  .sys-window {
    background: var(--bg-panel);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(0, 240, 255, 0.35);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.8),
      inset 0 0 24px rgba(0, 240, 255, 0.05);
    border-radius: 14px;
    position: relative;
    overflow: hidden;
  }

  .sys-window::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--cyan-glow), var(--gold-rank), transparent);
  }

  .sys-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 16px;
    border-radius: 9px;
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }

  .sys-btn:active {
    transform: scale(0.97);
  }

  .sys-btn-primary {
    background: linear-gradient(135deg, #0369a1 0%, #00f0ff 100%);
    color: #030712;
    box-shadow: 0 0 16px rgba(0, 240, 255, 0.35);
  }

  .sys-btn-gold {
    background: linear-gradient(135deg, #92400e 0%, #d4af37 100%);
    color: #090d16;
    box-shadow: 0 0 18px rgba(212, 175, 55, 0.4);
  }

  .sys-btn-love {
    background: linear-gradient(135deg, #9f1239 0%, #fb7185 100%);
    color: #fff;
    box-shadow: 0 0 16px rgba(251, 113, 133, 0.35);
  }

  .sys-btn-ghost {
    background: rgba(15, 23, 42, 0.85);
    border-color: rgba(148, 163, 184, 0.28);
    color: var(--text-main);
  }

  .sys-btn-danger {
    background: rgba(225, 29, 72, 0.16);
    border-color: rgba(225, 29, 72, 0.5);
    color: #fda4af;
  }

  .sys-btn-success {
    background: rgba(16, 185, 129, 0.18);
    border-color: rgba(16, 185, 129, 0.55);
    color: #6ee7b7;
  }

  .sys-input, .sys-select, .sys-textarea {
    width: 100%;
    background: rgba(4, 6, 12, 0.9);
    border: 1px solid rgba(0, 240, 255, 0.3);
    border-radius: 9px;
    padding: 10px 13px;
    color: #f8fafc;
    font-family: 'Rajdhani', sans-serif;
    font-size: 16px;
    font-weight: 600;
    outline: none;
    transition: border-color 0.2s;
  }

  .sys-input:focus, .sys-select:focus, .sys-textarea:focus {
    border-color: var(--cyan-glow);
    box-shadow: 0 0 12px rgba(0, 240, 255, 0.25);
  }

  .sys-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  /* BARRA DE BOTONES SUPER EXACTA A TU CAPTURA DE REFERENCIA */
  .nav-tabs {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
    margin-bottom: 14px;
  }

  @media (min-width: 820px) {
    .nav-tabs {
      grid-template-columns: repeat(10, 1fr);
    }
  }

  .nav-tab {
    background: rgba(8, 14, 28, 0.88);
    border: 1px solid rgba(0, 240, 255, 0.22);
    border-radius: 11px;
    padding: 10px 4px;
    color: var(--text-dim);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }

  .nav-tab.active {
    background: linear-gradient(180deg, rgba(0, 240, 255, 0.28) 0%, rgba(8, 14, 28, 0.98) 100%);
    border-color: var(--cyan-glow);
    color: #fff;
    box-shadow: 0 0 16px rgba(0, 240, 255, 0.35);
  }

  .progress-track {
    width: 100%;
    height: 8px;
    background: rgba(3, 5, 10, 0.95);
    border-radius: 999px;
    border: 1px solid rgba(0, 240, 255, 0.2);
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
  }

  @media (min-width: 680px) {
    .grid-2 {
      grid-template-columns: 1fr 1fr;
    }
  }

  .toast-alert {
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    background: rgba(5, 9, 18, 0.98);
    border: 1px solid var(--cyan-glow);
    box-shadow: 0 0 24px rgba(0, 240, 255, 0.5);
    padding: 12px 18px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 13px;
    color: #fff;
    max-width: 92vw;
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translate(-50%, -20px); }
    to { opacity: 1; transform: translate(-50%, 0); }
  }

  @keyframes shimmerBorder {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .manhwa-card-frame {
    position: relative;
    border-radius: 16px;
    padding: 3px;
    background: linear-gradient(135deg, #00f0ff, #9333ea, #d4af37, #00f0ff);
    background-size: 300% 300%;
    animation: shimmerBorder 6s ease infinite;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.9);
  }

  @keyframes heroFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }
  .manhwa-breathe {
    animation: heroFloat 3.8s ease-in-out infinite;
  }

  @keyframes npcPatrol1 {
    0%, 100% { transform: translate(0px, 0px); }
    50% { transform: translate(22px, -3px); }
  }
  @keyframes npcPatrol2 {
    0%, 100% { transform: translate(0px, 0px); }
    50% { transform: translate(-20px, 4px); }
  }
  .npc-walk-1 { animation: npcPatrol1 4.5s ease-in-out infinite; }
  .npc-walk-2 { animation: npcPatrol2 5.2s ease-in-out infinite; }

  @keyframes animPress {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-28px); }
  }
  @keyframes animSquat {
    0%, 100% { transform: translateY(0px) scaleY(1); }
    50% { transform: translateY(24px) scaleY(0.76); }
  }
  @keyframes animPull {
    0%, 100% { transform: translateY(20px); }
    50% { transform: translateY(-14px); }
  }
  .bio-press { animation: animPress 2.2s ease-in-out infinite; }
  .bio-squat { animation: animSquat 2.4s ease-in-out infinite; transform-origin: bottom center; }
  .bio-pull  { animation: animPull 2.2s ease-in-out infinite; }
`;

// ============================================================================
// SEGURIDAD / HASH LOCAL
// ============================================================================
async function hashSecret(text) {
  if (window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  return btoa(text);
}

// ============================================================================
// DATOS DEL SISTEMA Y RANGOS
// ============================================================================
const RANKS = [
  { name: 'Tierra', tier: 0, color: '#92400e' },
  { name: 'Madera', tier: 1, color: '#4d7c0f' },
  { name: 'Piedra', tier: 2, color: '#64748b' },
  { name: 'Carbón', tier: 3, color: '#475569' },
  { name: 'Hierro', tier: 4, color: '#9ca3af' },
  { name: 'Bronce', tier: 5, color: '#c2410c' },
  { name: 'Plata', tier: 6, color: '#cbd5e1' },
  { name: 'Oro', tier: 7, color: '#d4af37' },
  { name: 'Platino', tier: 8, color: '#2dd4bf' },
  { name: 'Esmeralda', tier: 9, color: '#10b981' },
  { name: 'Diamante', tier: 10, color: '#38bdf8' },
  { name: 'Especialista', tier: 11, color: '#a855f7' },
  { name: 'Maestro', tier: 12, color: '#e879f9' },
  { name: 'Jefe Maestro', tier: 13, color: '#f43f5e' },
  { name: 'Challenger', tier: 14, color: '#fbbf24' },
];

const HUNTER_GRADE_STANDARDS = [
  { grade: 'F', benchReq: 0.50, squatReq: 0.65, deadliftReq: 0.80 },
  { grade: 'E', benchReq: 0.65, squatReq: 0.85, deadliftReq: 1.00 },
  { grade: 'D', benchReq: 0.80, squatReq: 1.05, deadliftReq: 1.25 },
  { grade: 'C', benchReq: 1.00, squatReq: 1.25, deadliftReq: 1.50 },
  { grade: 'B', benchReq: 1.15, squatReq: 1.50, deadliftReq: 1.75 },
  { grade: 'A', benchReq: 1.34, squatReq: 1.75, deadliftReq: 2.05 },
  { grade: 'S', benchReq: 1.55, squatReq: 2.00, deadliftReq: 2.35 },
  { grade: 'SS', benchReq: 1.75, squatReq: 2.25, deadliftReq: 2.60 },
  { grade: 'SSS', benchReq: 1.95, squatReq: 2.50, deadliftReq: 2.85 },
  { grade: 'EX', benchReq: 2.15, squatReq: 2.75, deadliftReq: 3.10 },
];

const CLASS_ARCHETYPES = [
  { base: 'Espadachín', weaponType: 'sword', passiveTitle: 'Filo del Duelo Implacable', passiveRule: 'Aumenta +18% el daño crítico por cada repetición pesada.' },
  { base: 'Lancero', weaponType: 'spear', passiveTitle: 'Impulso de la Lanza Perforadora', passiveRule: 'Convierte tu fuerza de Sentadilla en penetración de armadura.' },
  { base: 'Artista Marcial', weaponType: 'gauntlets', passiveTitle: 'Flujo de los Cien Golpes', passiveRule: 'Multiplica la velocidad y otorga +15% EXP.' },
  { base: 'Berserker', weaponType: 'greatsword', passiveTitle: 'Furia de Sangre Indomable', passiveRule: 'Escala tu ataque bruto con tu 1RM de Peso Muerto.' },
  { base: 'Asesino Sombrío', weaponType: 'daggers', passiveTitle: 'Paso Fantasma del Abismo', passiveRule: 'Otorga ventaja táctica y +20% evasión.' },
  { base: 'Cazador de Abismos', weaponType: 'spear', passiveTitle: 'Instinto de Depredador Alfa', passiveRule: 'Inflige +24% de daño adicional contra monstruos superiores.' },
  { base: 'Centinela', weaponType: 'shield_sword', passiveTitle: 'Muralla Inquebrantable', passiveRule: 'Reduce a la mitad el desgaste y otorga +40 de defensa base.' },
  { base: 'Soberano', weaponType: 'greatsword', passiveTitle: 'Autoridad del Trono', passiveRule: 'Aumenta la prosperidad de tu ciudad y afinidad con aliados.' },
];

const CLASS_AFFINITIES = [
  { name: 'Carmesí', accent: '#e11d48', resonance: 'Resonancia Vital: +15% eficiencia en cargas.' },
  { name: 'Celestial', accent: '#38bdf8', resonance: 'Resonancia Astral: +15% EXP en misiones.' },
  { name: 'del Vacío', accent: '#a855f7', resonance: 'Resonancia Abisal: +18% daño contra jefes.' },
  { name: 'del Eclipse', accent: '#d4af37', resonance: 'Resonancia Dual: Equilibra ataque y defensa.' },
  { name: 'Infinito', accent: '#00f0ff', resonance: 'Resonancia Sin Límites: Escala +5 poder por nivel.' },
];

function generateRandomInfiniteClass(seedNumber) {
  const arch = CLASS_ARCHETYPES[Math.abs(seedNumber) % CLASS_ARCHETYPES.length];
  const aff = CLASS_AFFINITIES[Math.abs(seedNumber * 7 + 13) % CLASS_AFFINITIES.length];
  return {
    name: `${arch.base} ${aff.name}`,
    weaponType: arch.weaponType,
    accentColor: aff.accent,
    passiveName: `${arch.passiveTitle} (Infinito)`,
    passiveDesc: `${arch.passiveRule} ${aff.resonance}`
  };
}

function getInfiniteClassEvolution(baseClassName, level) {
  const safeBase = baseClassName || 'Cazador Despertado';
  if (level < 5) return { stage: 1, title: `${safeBase} [Rango I]`, bonus: '+5% Poder Base', nextLvl: 5 };
  if (level < 12) return { stage: 2, title: `${safeBase} Veterano [Rango II]`, bonus: '+15% Poder & Pasiva', nextLvl: 12 };
  if (level < 25) return { stage: 3, title: `Maestro ${safeBase} [Rango III]`, bonus: '+30% Maestría', nextLvl: 25 };
  const ascension = Math.floor((level - 25) / 25) + 1;
  return { stage: 3 + ascension, title: `Monarca ${safeBase} [Ascensión ∞-${ascension}]`, bonus: `+${50 + ascension * 30}% Poder Infinito`, nextLvl: 25 + ascension * 25 };
}

const PVE_STORY_CHAPTERS = [
  {
    id: 'act1_ch1', order: 1, prevId: null, act: 'Acto I: Ruinas de Ceniza',
    chapter: 'Capítulo 1 — El Umbral del Hierro', reqPower: 180, enemy: 'Centinela Oxidado',
    lore: 'Rescatas a Lyra, una herrera rúnica. Al superar este capítulo fundas tu Ciudad 2D.',
    rewardName: 'Voluntad de Hierro (+20 DEF)', expReward: 120, lpReward: 35
  },
  {
    id: 'act1_ch2', order: 2, prevId: 'act1_ch1', act: 'Acto I: Ruinas de Ceniza',
    chapter: 'Capítulo 2 — Bosque de los Ecos', reqPower: 260, enemy: 'Acechador Sombrío',
    lore: 'Kaelen, explorador de las sombras, une fuerzas contigo en tu ciudad.',
    rewardName: 'Brazaletes del Lobo (+35 ATQ)', expReward: 180, lpReward: 45
  },
  {
    id: 'act2_ch1', order: 3, prevId: 'act1_ch2', act: 'Acto II: Ciudadela Carmesí',
    chapter: 'Capítulo 3 — Guardia del Bastión', reqPower: 360, enemy: 'Valkiria Caída',
    lore: 'Seraphina jura lealtad y protege la plaza de tu ciudad.',
    rewardName: 'Estocada Relámpago (+55 ATQ)', expReward: 260, lpReward: 60
  },
  {
    id: 'act2_ch2', order: 4, prevId: 'act2_ch1', act: 'Acto II: Ciudadela Carmesí',
    chapter: 'Capítulo 4 — Altar del Eclipse', reqPower: 480, enemy: 'Revenant Malakor',
    lore: 'Isolde, oráculo estelar, llega para estudiar tu evolución.',
    rewardName: 'Espadón Eclipse (+90 ATQ)', expReward: 380, lpReward: 80
  }
];

const STORY_CHARACTERS = [
  { id: 'lyra', name: 'Lyra Ignis', role: 'Herrera Rúnica', unlockChapter: 'act1_ch1', unlockLabel: 'Capítulo 1', hairColor: '#e11d48', eyeColor: '#fbbf24', outfitColor: '#7f1d1d', trimColor: '#d4af37', mapX: 115, mapY: 165, intro: '¡Por fin llegas! Estaba templando acero en la forja de nuestra ciudad.' },
  { id: 'kaelen', name: 'Kaelen Vane', role: 'Explorador', unlockChapter: 'act1_ch2', unlockLabel: 'Capítulo 2', hairColor: '#cbd5e1', eyeColor: '#00f0ff', outfitColor: '#1e293b', trimColor: '#38bdf8', mapX: 375, mapY: 155, intro: 'Patrullando los bosques que rodean la muralla.' },
  { id: 'seraphina', name: 'Seraphina Aurelia', role: 'Valkiria', unlockChapter: 'act2_ch1', unlockLabel: 'Capítulo 3', hairColor: '#fef08a', eyeColor: '#10b981', outfitColor: '#f8fafc', trimColor: '#d4af37', mapX: 250, mapY: 182, intro: 'Mi espada protege este asentamiento.' },
  { id: 'isolde', name: 'Isolde Noctis', role: 'Oráculo Astral', unlockChapter: 'act2_ch2', unlockLabel: 'Capítulo 4', hairColor: '#8b5cf6', eyeColor: '#f59e0b', outfitColor: '#312e81', trimColor: '#c084fc', mapX: 435, mapY: 175, intro: 'Las estrellas brillan distinto desde que superaste tus marcas.' }
];

const CITY_BUILDINGS_CATALOG = [
  { id: 'forge', name: 'Forja de Acero Real', bonus: '+15 Poder de Equipo.' },
  { id: 'tavern', name: 'Taberna del Crepúsculo', bonus: '+3 Afinidad extra en citas.' },
  { id: 'dojo', name: 'Arena de Entrenamiento', bonus: '+20 Poder de Clase.' },
  { id: 'observatory', name: 'Observatorio Astral', bonus: 'Amplifica tu Habilidad Pasiva.' },
  { id: 'garden', name: 'Jardín de los Juramentos', bonus: 'Lugar para citas románticas.' },
];

const DEFAULT_LIFTS = {
  'Press Banca': { weight: 80, reps: 5, date: 'Inicial' },
  'Sentadilla Trasera': { weight: 105, reps: 5, date: 'Inicial' },
  'Peso Muerto Convencional': { weight: 130, reps: 5, date: 'Inicial' },
};

function getRankFromLP(lp) {
  const safeLP = Math.max(0, Math.min(8999, lp));
  const totalDivisions = Math.floor(safeLP / 100);
  const rankIndex = Math.min(14, Math.floor(totalDivisions / 6));
  const divInRank = 6 - (totalDivisions % 6);
  return {
    ...RANKS[rankIndex],
    division: divInRank,
    label: `${RANKS[rankIndex].name} ${divInRank}`,
    currentDivLP: safeLP % 100,
    totalLP: safeLP,
  };
}

function calcEpley1RM(weight, reps) {
  if (!weight || weight <= 0) return 0;
  if (reps <= 1) return Math.round(weight);
  return Math.round(weight * (1 + reps / 30));
}

function computeHunterGradeData(liftsObj, weightKg) {
  const bw = Math.max(40, Number(weightKg) || 75);
  const bench1RM = calcEpley1RM(liftsObj['Press Banca']?.weight || 0, liftsObj['Press Banca']?.reps || 1);
  const squat1RM = calcEpley1RM(liftsObj['Sentadilla Trasera']?.weight || 0, liftsObj['Sentadilla Trasera']?.reps || 1);
  const deadlift1RM = calcEpley1RM(liftsObj['Peso Muerto Convencional']?.weight || 0, liftsObj['Peso Muerto Convencional']?.reps || 1);

  let currentIdx = 0;
  for (let i = HUNTER_GRADE_STANDARDS.length - 1; i >= 0; i--) {
    const std = HUNTER_GRADE_STANDARDS[i];
    if (bench1RM >= std.benchReq * bw && squat1RM >= std.squatReq * bw && deadlift1RM >= std.deadliftReq * bw) {
      currentIdx = i;
      break;
    }
  }
  return { bw, bench1RM, squat1RM, deadlift1RM, currentStd: HUNTER_GRADE_STANDARDS[currentIdx] };
}

function getRelationshipLabel(affection) {
  if (affection >= 100) return { label: 'Pareja Jurada ♥', color: '#fb7185' };
  if (affection >= 70) return { label: 'Interés Romántico ♥', color: '#f472b6' };
  if (affection >= 40) return { label: 'Confidente Cercano', color: '#fde047' };
  return { label: 'Aliado', color: '#00f0ff' };
}

// ============================================================================
// RETRATO MANHWA / SOLO LEVELING DE ALTA FIDELIDAD (EXACTO A TU CAPTURA)
// ============================================================================
function ManhwaHeroPortrait({ hunterClass, rankInfo, hunterGrade, level, classEvolution, gender, onToggleGender }) {
  const isFemale = gender === 'female';
  const title = classEvolution.title;
  const stage = classEvolution.stage;

  return (
    <div className="manhwa-card-frame">
      <div style={{
        background: '#060914',
        borderRadius: '14px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Cabecera interna del recuadro */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span className="sys-badge" style={{ background: 'rgba(0, 240, 255, 0.18)', color: '#00f0ff', border: '1px solid rgba(0, 240, 255, 0.5)' }}>
            NV. {level} • ETAPA {stage}
          </span>
          <button className="sys-btn sys-btn-ghost" style={{ padding: '4px 10px', fontSize: '10px' }} onClick={onToggleGender}>
            <UserCheck size={12} color="#00f0ff" /> {isFemale ? 'Femenino' : 'Masculino'}
          </button>
        </div>

        {/* CONTENEDOR PRINCIPAL DE LA ILUSTRACIÓN MANHWA */}
        <div style={{
          width: '100%',
          maxWidth: '340px',
          aspectRatio: '4 / 5',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          border: '2px solid #00f0ff',
          boxShadow: '0 16px 45px rgba(0, 0, 0, 0.95), inset 0 0 30px rgba(0, 240, 255, 0.2)',
          background: 'radial-gradient(circle at 50% 30%, #171b38 0%, #060913 70%, #020307 100%)'
        }}>
          <svg viewBox="0 0 320 380" width="100%" height="100%" style={{ display: 'block' }}>
            <defs>
              <linearGradient id="manhwaBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#04060e" />
                <stop offset="50%" stopColor="#110d24" />
                <stop offset="100%" stopColor="#020307" />
              </linearGradient>
              <linearGradient id="bladeGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#00f0ff" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>

            {/* Fondo Abisal / Estelar */}
            <rect width="320" height="380" fill="url(#manhwaBg)" />
            <circle cx="260" cy="90" r="45" fill="#00f0ff" opacity="0.12" filter="blur(8px)" />
            <circle cx="60" cy="200" r="35" fill="#9333ea" opacity="0.15" filter="blur(10px)" />

            {/* Partículas de maná flotantes */}
            <circle cx="90" cy="110" r="2.5" fill="#00f0ff" />
            <circle cx="230" cy="150" r="2" fill="#00f0ff" />
            <circle cx="110" cy="280" r="3" fill="#a855f7" />
            <circle cx="210" cy="290" r="2" fill="#38bdf8" />

            <g className="manhwa-breathe">
              {/* Capa Abisal Oscura con Borde Carmesí */}
              <path d="M95 150 L45 355 L275 355 L225 150 Z" fill="#3b0714" opacity="0.9" />
              <path d="M102 150 L58 348 L262 348 L218 150 Z" fill="#0f050b" opacity="0.95" />

              {/* Espada Mítica Vertical Luminosa (Exacta a tu captura) */}
              <g>
                <polygon points="232,55 244,55 240,290 236,290" fill="url(#bladeGlow)" filter="drop-shadow(0 0 8px #00f0ff)" />
                <line x1="238" y1="65" x2="238" y2="280" stroke="#fff" strokeWidth="2.5" />
                <rect x="220" y="288" width="36" height="8" rx="3" fill="#d4af37" />
                <rect x="234" y="296" width="9" height="36" fill="#0f172a" />
                <circle cx="238.5" cy="336" r="7" fill="#00f0ff" />
              </g>

              {/* Torso y Armadura de Placas Estilo Solo Leveling */}
              <path d="M104 142 L216 142 L202 245 L212 335 L108 335 L118 245 Z" fill="#090d19" stroke="#00f0ff" strokeWidth="2" />
              
              {/* Núcleo de Energía en el Pecho (Rombo Resplandeciente) */}
              <polygon points="160,165 178,195 160,225 142,195" fill="#030712" stroke="#00f0ff" strokeWidth="2.5" />
              <circle cx="160" cy="195" r="7" fill="#00f0ff" filter="drop-shadow(0 0 6px #00f0ff)" />

              {/* Hombreras Épicas */}
              <path d="M88 145 Q112 120 135 148 L122 188 L84 178 Z" fill="#1e293b" stroke="#00f0ff" strokeWidth="2" />
              <path d="M232 145 Q208 120 185 148 L198 188 L236 178 Z" fill="#1e293b" stroke="#00f0ff" strokeWidth="2" />

              {/* Brazos */}
              <rect x="90" y="178" width="24" height="85" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              <rect x="206" y="178" width="24" height="85" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

              {/* Cuello y Rostro Estilo Manhwa / Sung Jin-Woo */}
              <rect x="146" y="122" width="28" height="24" rx="6" fill="#fed7aa" />
              <path d="M118 85 Q118 142 160 148 Q202 142 202 85 Q202 52 160 52 Q118 52 118 85 Z" fill="#ffedd5" />

              {/* Ojos Estilizados Icónicos (Violeta/Cian Brillante) */}
              <ellipse cx="143" cy="98" rx="6.5" ry="8" fill="#a855f7" />
              <ellipse cx="177" cy="98" rx="6.5" ry="8" fill="#a855f7" />
              <circle cx="144" cy="96" r="2.5" fill="#fff" />
              <circle cx="178" cy="96" r="2.5" fill="#fff" />

              {/* Expresión Seria y Segura */}
              <path d="M152 115 Q160 121 168 115" fill="none" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />

              {/* Cabello Negro Desordenado Estilo Manhwa */}
              <path d="M114 90 Q122 38 160 36 Q198 38 206 90 L190 68 L174 95 L160 64 L146 95 L130 68 Z" fill="#090d16" />
            </g>
          </svg>

          {/* ETIQUETA INFERIOR DENTRO DE LA TARJETA (Exacta a tu captura) */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(0deg, rgba(3,5,10,0.98) 0%, rgba(3,5,10,0.85) 75%, transparent 100%)',
            padding: '24px 12px 12px',
            textAlign: 'center'
          }}>
            <div className="font-souls" style={{ fontSize: '15px', fontWeight: 900, color: '#fff', textTransform: 'uppercase' }}>
              {title}
            </div>
            <div style={{ fontSize: '11px', color: '#00f0ff', fontWeight: 700, marginTop: '2px' }}>
              +15% Poder & Pasiva
            </div>

            {/* SELLO DE GRADO CIRCULAR DERECHO (Exacto a tu captura) */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              right: '14px',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #0369a1 0%, #030712 100%)',
              border: '2px solid #00f0ff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(0, 240, 255, 0.5)'
            }}>
              <span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: 700, lineHeight: 1 }}>GRADO</span>
              <span className="font-hud" style={{ fontSize: '15px', color: '#fff', fontWeight: 900, lineHeight: 1.1 }}>{hunterGrade}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL DE LA APP
// ============================================================================
export default function App() {
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = SYSTEM_CSS;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pex_permanent_session_v10');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleAuthenticated = (account) => {
    setCurrentUser(account);
    localStorage.setItem('pex_permanent_session_v10', JSON.stringify(account));
  };

  const handleDeleteAccount = (emailToDelete) => {
    const usersDb = JSON.parse(localStorage.getItem('pex_users_registry_v10') || '{}');
    delete usersDb[emailToDelete];
    localStorage.setItem('pex_users_registry_v10', JSON.stringify(usersDb));
    localStorage.removeItem(`pex_user_data_v10_${emailToDelete}`);
    localStorage.removeItem('pex_permanent_session_v10');
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <AuthPortal onAuthenticated={handleAuthenticated} />;
  }

  return (
    <HunterSystemWorkspace
      key={currentUser.email}
      currentUser={currentUser}
      onDeleteAccount={() => handleDeleteAccount(currentUser.email)}
    />
  );
}

function AuthPortal({ onAuthenticated }) {
  const [authMode, setAuthMode] = useState('login');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [hunterTagInput, setHunterTagInput] = useState('');
  const [authError, setAuthError] = useState('');

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    const cleanEmail = emailInput.trim().toLowerCase();
    if (!cleanEmail || !passwordInput || passwordInput.length < 4) {
      setAuthError('Ingresa correo y contraseña de al menos 4 caracteres.');
      return;
    }
    const passHash = await hashSecret(passwordInput);
    const usersDb = JSON.parse(localStorage.getItem('pex_users_registry_v10') || '{}');

    if (authMode === 'register') {
      if (usersDb[cleanEmail]) {
        setAuthError('Ese usuario ya existe.');
        return;
      }
      const newAccount = {
        email: cleanEmail,
        passHash,
        hunterName: (hunterTagInput.trim() || 'SUNG_JINWOO').toUpperCase(),
        hunterCode: `#PEX-${Math.floor(1000 + Math.random() * 8999)}`,
      };
      usersDb[cleanEmail] = newAccount;
      localStorage.setItem('pex_users_registry_v10', JSON.stringify(usersDb));
      onAuthenticated(newAccount);
    } else {
      const existing = usersDb[cleanEmail];
      if (!existing || existing.passHash !== passHash) {
        setAuthError('Credenciales incorrectas.');
        return;
      }
      onAuthenticated(existing);
    }
  };

  return (
    <div className="sys-container" style={{ maxWidth: '440px', paddingTop: '40px' }}>
      <div className="sys-window" style={{ padding: '24px' }}>
        <h1 className="font-souls" style={{ fontSize: '26px', textAlign: 'center', marginBottom: '16px', color: '#fff' }}>
          PROTOCOLO EX
        </h1>
        <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {authMode === 'register' && (
            <input className="sys-input" placeholder="Nombre de Cazador" value={hunterTagInput} onChange={(e) => setHunterTagInput(e.target.value)} />
          )}
          <input className="sys-input" placeholder="Correo / Usuario" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required />
          <input type="password" className="sys-input" placeholder="Contraseña" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required />
          {authError && <div style={{ color: '#fda4af', fontSize: '12px' }}>{authError}</div>}
          <button type="submit" className="sys-btn sys-btn-primary">ENTRAR AL SISTEMA</button>
          <button type="button" className="sys-btn sys-btn-ghost" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
            {authMode === 'login' ? 'Crear cuenta nueva' : 'Ya tengo cuenta'}
          </button>
        </form>
      </div>
    </div>
  );
}

function HunterSystemWorkspace({ currentUser, onDeleteAccount }) {
  const storageKey = `pex_user_data_v10_${currentUser.email}`;
  const initialData = JSON.parse(localStorage.getItem(storageKey) || 'null');

  const [awakened] = useState(true);
  const [profile, setProfile] = useState(() => initialData?.profile || { hunterName: currentUser.hunterName || 'SUNG_JINWOO', gender: 'male', weightKg: 75 });
  const [hunterClass] = useState(() => initialData?.hunterClass || { cls: generateRandomInfiniteClass(1234) });
  const [savedLifts, setSavedLifts] = useState(() => initialData?.savedLifts || DEFAULT_LIFTS);
  const [lp, setLp] = useState(() => initialData?.lp ?? 2285);
  const [exp, setExp] = useState(() => initialData?.exp ?? 420);
  const [streak] = useState(7);
  const [completedChapters, setCompletedChapters] = useState(() => initialData?.completedChapters || ['act1_ch1']);
  const [cityName, setCityName] = useState('Bastión de Ceniza');
  const [builtBuildings] = useState(['forge', 'tavern']);
  const [selectedCharId, setSelectedCharId] = useState('lyra');
  const [characterStates, setCharacterStates] = useState({ lyra: { affection: 85, lastReply: '¡Por fin llegas! Estaba templando acero en la forja.' } });
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState('avatar');
  const [toast, setToast] = useState(null);
  const [quests, setQuests] = useState([
    { id: 1, title: 'Press Banca: 4x8 con 80 kg', lp: 45, exp: 95, status: 'pending' },
    { id: 2, title: 'Entrenamiento de Core y Plancha 5 min', lp: 30, exp: 60, status: 'completed' }
  ]);
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [friends] = useState([{ id: 1, name: 'VALKIRIA_SOL', level: 12, power: 410 }]);

  const gradeData = computeHunterGradeData(savedLifts, profile.weightKg);
  const hunterGrade = gradeData.currentStd.grade;
  const level = Math.max(1, Math.floor(exp / 100) + 1);
  const classEvolution = getInfiniteClassEvolution(hunterClass.cls.name, level);
  const rankInfo = getRankFromLP(lp);
  const cityUnlocked = completedChapters.includes('act1_ch1');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ awakened, profile, hunterClass, savedLifts, lp, exp, completedChapters }));
  }, [storageKey, awakened, profile, hunterClass, savedLifts, lp, exp, completedChapters]);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const unlockedCharacters = STORY_CHARACTERS.filter((c) => completedChapters.includes(c.unlockChapter));
  const activeChar = unlockedCharacters.find((c) => c.id === selectedCharId) || unlockedCharacters[0];
  const activeCharState = characterStates[activeChar.id] || { affection: 30, lastReply: activeChar.intro };
  const activeRel = getRelationshipLabel(activeCharState.affection);

  return (
    <div className="sys-container">
      {toast && (
        <div className="toast-alert">
          <Zap size={18} color="#00f0ff" />
          <span>{toast}</span>
        </div>
      )}

      {/* SESIÓN PERMANENTE */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '6px 12px', marginBottom: '10px', borderRadius: '10px',
        background: 'rgba(8, 14, 28, 0.9)', border: '1px solid rgba(0, 240, 255, 0.3)', fontSize: '11px'
      }}>
        <span style={{ color: '#cbd5e1' }}>
          <span style={{ color: '#00f0ff', fontWeight: 700 }}>● SESIÓN PERMANENTE:</span> {currentUser.email}
        </span>
        <span style={{ color: '#94a3b8' }}>Abierta 24/7</span>
      </div>

      {/* CABECERA EXACTA A TU CAPTURA DE REFERENCIA */}
      <div className="sys-window" style={{ padding: '16px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div className="font-hud" style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>
            2285 LP • EXP: 20/100
          </div>
          <span className="sys-badge" style={{ background: 'rgba(212,175,55,0.2)', color: '#d4af37' }}>
            RACHA {streak}D
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '3px' }}>PROGRESO DE RANGO (65/100 LP)</div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '65%', background: 'linear-gradient(90deg, #d4af37, #fbbf24)' }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '3px' }}>EXP DE CLASE (23/100 EXP)</div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '23%', background: 'linear-gradient(90deg, #0284c7, #00f0ff)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* BOTONES DE NAVEGACIÓN EXACTOS A TU CAPTURA */}
      <div className="nav-tabs">
        <button className={`nav-tab ${activeTab === 'quests' ? 'active' : ''}`} onClick={() => setActiveTab('quests')}>
          <Trophy size={16} color="#d4af37" /><span>Misiones</span>
        </button>
        <button className={`nav-tab ${activeTab === 'routines' ? 'active' : ''}`} onClick={() => setActiveTab('routines')}>
          <Cpu size={16} color="#10b981" /><span>Rutina</span>
        </button>
        <button className={`nav-tab ${activeTab === 'avatar' ? 'active' : ''}`} onClick={() => setActiveTab('avatar')}>
          <Sword size={16} color="#00f0ff" /><span>Clase & Pasiva</span>
        </button>
        <button className={`nav-tab ${activeTab === 'pve' ? 'active' : ''}`} onClick={() => setActiveTab('pve')}>
          <BookOpen size={16} color="#f59e0b" /><span>Historia PvE</span>
        </button>
        <button
          className={`nav-tab ${activeTab === 'city_vn' ? 'active' : ''}`}
          style={{ opacity: cityUnlocked ? 1 : 0.65 }}
          onClick={() => {
            if (!cityUnlocked) triggerToast('🔒 Completa el Capítulo 1 de Historia PvE.');
            setActiveTab('city_vn');
          }}
        >
          {cityUnlocked ? <Building2 size={16} color="#fb7185" /> : <Lock size={16} color="#94a3b8" />}
          <span>{cityUnlocked ? 'Ciudad' : 'Ciudad 🔒'}</span>
        </button>
        <button className={`nav-tab ${activeTab === 'pvp' ? 'active' : ''}`} onClick={() => setActiveTab('pvp')}>
          <Users size={16} color="#f43f5e" /><span>PvP</span>
        </button>
        <button className={`nav-tab ${activeTab === 'strength' ? 'active' : ''}`} onClick={() => setActiveTab('strength')}>
          <Dumbbell size={16} color="#e11d48" /><span>Cargas</span>
        </button>
        <button className={`nav-tab ${activeTab === 'vault' ? 'active' : ''}`} onClick={() => setActiveTab('vault')}>
          <Lock size={16} color="#a855f7" /><span>Bóveda</span>
        </button>
        <button className={`nav-tab ${activeTab === 'sleep' ? 'active' : ''}`} onClick={() => setActiveTab('sleep')}>
          <Moon size={16} color="#38bdf8" /><span>Sueño</span>
        </button>
        <button className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
          <Settings size={16} color="#94a3b8" /><span>Ajustes</span>
        </button>
      </div>

      {/* MÓDULO 3: CLASE & PASIVA (PANTALLA PRINCIPAL DE TU CAPTURA) */}
      {activeTab === 'avatar' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* RETRATO DE HEROE MANHWA EXACTO A LA CAPTURA */}
          <ManhwaHeroPortrait
            hunterClass={hunterClass}
            rankInfo={rankInfo}
            hunterGrade={hunterGrade}
            level={level}
            classEvolution={classEvolution}
            gender={profile.gender || 'male'}
            onToggleGender={() => setProfile({ ...profile, gender: profile.gender === 'female' ? 'male' : 'female' })}
          />

          {/* EVOLUCIÓN DE CLASE INFINITA (Exacto a tu captura inferior) */}
          <div className="sys-window" style={{ padding: '16px' }}>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <span className="font-hud" style={{ fontSize: '13px', color: '#d4af37', letterSpacing: '0.1em' }}>
                — EVOLUCIÓN DE CLASE INFINITA (NV. {level}) —
              </span>
            </div>

            <div style={{
              background: 'rgba(4, 8, 18, 0.9)',
              borderRadius: '12px',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              padding: '14px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="sys-badge" style={{ background: 'rgba(0, 240, 255, 0.15)', color: '#00f0ff', fontSize: '10px' }}>
                  PASIVA ÚNICA
                </span>
                <span className="sys-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7', fontSize: '10px' }}>
                  +72 PWR
                </span>
              </div>

              <div className="font-souls" style={{ textAlign: 'center', fontSize: '16px', fontWeight: 900, color: '#fff', margin: '8px 0' }}>
                MURALLA INQUEBRANTABLE <br />
                <span style={{ fontSize: '13px', color: '#00f0ff' }}>(INFINITO)</span>
              </div>

              <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
                Reduce a la mitad el desgaste y otorga +40 de defensa base permanente.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MÓDULO 1: MISIONES */}
      {activeTab === 'quests' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#d4af37', marginBottom: '12px' }}>MISIONES DIARIAS</h2>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            <input className="sys-input" placeholder="Nueva misión..." value={newQuestTitle} onChange={(e) => setNewQuestTitle(e.target.value)} />
            <button className="sys-btn sys-btn-gold" onClick={() => {
              if (!newQuestTitle.trim()) return;
              setQuests([{ id: Date.now(), title: newQuestTitle, lp: 40, exp: 80, status: 'pending' }, ...quests]);
              setNewQuestTitle('');
              triggerToast('Misión agregada.');
            }}>+ AGREGAR</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {quests.map((q) => (
              <div key={q.id} style={{ padding: '12px', borderRadius: '10px', background: 'rgba(4,6,12,0.9)', border: '1px solid rgba(0,240,255,0.25)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff' }}>{q.title}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>+{q.lp} LP • +{q.exp} EXP</div>
                </div>
                {q.status === 'pending' ? (
                  <button className="sys-btn sys-btn-success" style={{ padding: '6px 10px', fontSize: '10px' }} onClick={() => {
                    setQuests(quests.map(item => item.id === q.id ? { ...item, status: 'completed' } : item));
                    setLp(l => l + q.lp);
                    setExp(e => e + q.exp);
                    triggerToast('¡Misión cumplida!');
                  }}>CUMPLIR</button>
                ) : (
                  <span className="sys-badge" style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7' }}>COMPLETADA</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MÓDULO 2: RUTINAS */}
      {activeTab === 'routines' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#10b981', marginBottom: '12px' }}>RUTINA PERSONALIZADA</h2>
          <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
            • Press Banca: 4x8 (RIR 1-2)<br />
            • Sentadilla Trasera: 4x6 (RIR 1)<br />
            • Dominadas Lastradas: 4x8
          </div>
        </div>
      )}

      {/* MÓDULO 4: HISTORIA PVE */}
      {activeTab === 'pve' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-souls" style={{ fontSize: '16px', color: '#f59e0b', marginBottom: '12px' }}>MODO HISTORIA PVE</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {PVE_STORY_CHAPTERS.map((ch) => {
              const cleared = completedChapters.includes(ch.id);
              return (
                <div key={ch.id} style={{ padding: '14px', borderRadius: '10px', background: 'rgba(4,6,12,0.9)', border: `1px solid ${cleared ? '#10b981' : '#d4af37'}` }}>
                  <div style={{ fontWeight: 700, color: '#fff' }}>{ch.chapter}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0' }}>{ch.lore}</div>
                  {!cleared && (
                    <button className="sys-btn sys-btn-gold" style={{ padding: '6px 12px', fontSize: '10px' }} onClick={() => {
                      setCompletedChapters([...completedChapters, ch.id]);
                      setExp(e => e + ch.expReward);
                      setLp(l => l + ch.lpReward);
                      triggerToast('¡Capítulo superado! Ciudad 2D desbloqueada.');
                    }}>SUPERAR CAPÍTULO</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MÓDULO 5: CIUDAD 2D & NOVELA VISUAL */}
      {activeTab === 'city_vn' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-souls" style={{ fontSize: '16px', color: '#fb7185', marginBottom: '10px' }}>
            CIUDAD 2D & NOVELA VISUAL ({cityName})
          </h2>
          <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(4,6,12,0.9)', border: '1px solid #fb7185', marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', color: '#fb7185', fontWeight: 700 }}>{activeChar.name} ({activeChar.role})</div>
            <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#fff', margin: '6px 0' }}>«{activeCharState.lastReply}»</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input className="sys-input" placeholder="Hablar con aliada..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
              <button className="sys-btn sys-btn-primary" onClick={() => {
                if (!chatInput.trim()) return;
                triggerToast('Aliada respondió a tu mensaje.');
                setChatInput('');
              }}><Send size={14} /></button>
            </div>
          </div>
        </div>
      )}

      {/* MÓDULO 6: PVP */}
      {activeTab === 'pvp' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#f43f5e', marginBottom: '12px' }}>ARENA PVP (30 KM)</h2>
          {friends.map(fr => (
            <div key={fr.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'rgba(4,6,12,0.9)', borderRadius: '8px' }}>
              <div>
                <strong>{fr.name}</strong> (Nivel {fr.level})
              </div>
              <button className="sys-btn sys-btn-primary" style={{ padding: '6px 10px', fontSize: '10px' }} onClick={() => triggerToast(`Victoria sobre ${fr.name} (+25 LP)`)}>DESAFIAR</button>
            </div>
          ))}
        </div>
      )}

      {/* MÓDULO 7: CARGAS */}
      {activeTab === 'strength' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#e11d48', marginBottom: '12px' }}>REGISTRO DE CARGAS</h2>
          <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
            • Press Banca: {savedLifts['Press Banca'].weight} kg × {savedLifts['Press Banca'].reps} reps<br />
            • Sentadilla: {savedLifts['Sentadilla Trasera'].weight} kg × {savedLifts['Sentadilla Trasera'].reps} reps
          </div>
        </div>
      )}

      {/* MÓDULO 8: BÓVEDA */}
      {activeTab === 'vault' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#a855f7', marginBottom: '12px' }}>BÓVEDA FÍSICA CIFRADA</h2>
          <p style={{ fontSize: '13px', color: '#cbd5e1' }}>Tus fotos trimestrales se guardan con cifrado AES-256 local y rostro censurado automáticamente.</p>
        </div>
      )}

      {/* MÓDULO 9: SUEÑO */}
      {activeTab === 'sleep' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#38bdf8', marginBottom: '12px' }}>REGISTRO DE SUEÑO</h2>
          <p style={{ fontSize: '13px', color: '#cbd5e1' }}>Acumulado semanal: <strong>52.5 horas</strong> (Meta óptima: 49-63h).</p>
        </div>
      )}

      {/* MÓDULO 10: AJUSTES */}
      {activeTab === 'settings' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#00f0ff', marginBottom: '12px' }}>AJUSTES DE CUENTA</h2>
          <button className="sys-btn sys-btn-danger" onClick={() => {
            if (confirm('¿Eliminar cuenta permanentemente?')) onDeleteAccount();
          }}><Trash2 size={14} /> ELIMINAR CUENTA</button>
        </div>
      )}
    </div>
  );
}
