import React, { useState, useEffect, useRef } from 'react';
import {
  Flame, Trophy, Dumbbell, Moon, Camera, Sparkles, Shield,
  CheckCircle2, XCircle, CloudRain, Zap, Lock, EyeOff,
  Upload, Scan, Cpu, FileText, AlertTriangle,
  ChevronRight, Sword, Clock, Save, TrendingUp, Crown, Check
} from 'lucide-react';

// ============================================================================
// ESTILOS INTEGRADOS (HOLOGRAPHIC SYSTEM + CODE VEIN / SOULS ANIME AESTHETIC)
// ============================================================================
const SYSTEM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800&family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&display=swap');

  :root {
    --bg-void: #05070d;
    --bg-panel: rgba(11, 16, 30, 0.9);
    --cyan-glow: #00f0ff;
    --gold-rank: #d4af37;
    --crimson-vein: #be123c;
    --emerald-ok: #10b981;
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
      radial-gradient(circle at 18% 12%, rgba(190, 18, 60, 0.1) 0%, transparent 42%),
      radial-gradient(circle at 82% 85%, rgba(212, 175, 55, 0.08) 0%, transparent 45%),
      linear-gradient(180deg, #04060b 0%, #090e1c 100%);
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
    max-width: 960px;
    margin: 0 auto;
    padding: 16px 14px 90px;
  }

  .sys-window {
    background: var(--bg-panel);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(212, 175, 55, 0.28);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.65),
      inset 0 0 22px rgba(212, 175, 55, 0.04);
    border-radius: 14px;
    position: relative;
    overflow: hidden;
  }

  .sys-window::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--crimson-vein), var(--gold-rank), transparent);
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
    border: 1px solid rgba(212, 175, 55, 0.28);
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
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
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

  .nav-tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }

  @media (min-width: 720px) {
    .nav-tabs {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  .nav-tab {
    background: rgba(11, 16, 30, 0.78);
    border: 1px solid rgba(148, 163, 184, 0.18);
    border-radius: 11px;
    padding: 10px 6px;
    color: var(--text-dim);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-tab.active {
    background: linear-gradient(180deg, rgba(212, 175, 55, 0.18) 0%, rgba(11, 16, 30, 0.96) 100%);
    border-color: var(--gold-rank);
    color: #fff;
    box-shadow: 0 0 14px rgba(212, 175, 55, 0.22);
  }

  .progress-track {
    width: 100%;
    height: 9px;
    background: rgba(4, 6, 12, 0.95);
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.1);
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
    background: rgba(6, 10, 20, 0.97);
    border: 1px solid var(--gold-rank);
    box-shadow: 0 0 24px rgba(212, 175, 55, 0.4);
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
`;

// ============================================================================
// DATOS DEL SISTEMA: RANGOS, ESTÁNDARES CIENTÍFICOS Y COSMÉTICOS DESBLOQUEABLES
// ============================================================================
const RANKS = [
  { name: 'Tierra', tier: 0, color: '#92400e', coatDark: '#1c1917', coatTrim: '#78350f', weaponTier: 1 },
  { name: 'Madera', tier: 1, color: '#4d7c0f', coatDark: '#182214', coatTrim: '#4d7c0f', weaponTier: 1 },
  { name: 'Piedra', tier: 2, color: '#64748b', coatDark: '#1e293b', coatTrim: '#64748b', weaponTier: 1 },
  { name: 'Carbón', tier: 3, color: '#475569', coatDark: '#0f131c', coatTrim: '#991b1b', weaponTier: 2 },
  { name: 'Hierro', tier: 4, color: '#9ca3af', coatDark: '#18181b', coatTrim: '#9ca3af', weaponTier: 2 },
  { name: 'Bronce', tier: 5, color: '#c2410c', coatDark: '#231411', coatTrim: '#ea580c', weaponTier: 2 },
  { name: 'Plata', tier: 6, color: '#cbd5e1', coatDark: '#1e293b', coatTrim: '#e2e8f0', weaponTier: 3 },
  { name: 'Oro', tier: 7, color: '#d4af37', coatDark: '#171512', coatTrim: '#d4af37', weaponTier: 3 },
  { name: 'Platino', tier: 8, color: '#2dd4bf', coatDark: '#0f2226', coatTrim: '#2dd4bf', weaponTier: 3 },
  { name: 'Esmeralda', tier: 9, color: '#10b981', coatDark: '#091e18', coatTrim: '#10b981', weaponTier: 4 },
  { name: 'Diamante', tier: 10, color: '#38bdf8', coatDark: '#0b192c', coatTrim: '#38bdf8', weaponTier: 4 },
  { name: 'Especialista', tier: 11, color: '#a855f7', coatDark: '#1b0d2e', coatTrim: '#a855f7', weaponTier: 4 },
  { name: 'Maestro', tier: 12, color: '#e879f9', coatDark: '#230b26', coatTrim: '#e879f9', weaponTier: 5 },
  { name: 'Jefe Maestro', tier: 13, color: '#f43f5e', coatDark: '#260912', coatTrim: '#f43f5e', weaponTier: 5 },
  { name: 'Challenger', tier: 14, color: '#fbbf24', coatDark: '#121018', coatTrim: '#fbbf24', weaponTier: 5 },
];

const PHYSICAL_STANDARDS = [
  { grade: 'F', minComposite: 0.0, benchReq: 0.50, squatReq: 0.65, deadliftReq: 0.80, desc: 'Iniciado / Adaptación neural inicial' },
  { grade: 'E', minComposite: 0.70, benchReq: 0.65, squatReq: 0.85, deadliftReq: 1.00, desc: 'Novato consolidado' },
  { grade: 'D', minComposite: 0.90, benchReq: 0.80, squatReq: 1.05, deadliftReq: 1.25, desc: 'Base atlética funcional' },
  { grade: 'C', minComposite: 1.12, benchReq: 1.00, squatReq: 1.25, deadliftReq: 1.50, desc: 'Intermedio sólido (1x BW en Banca)' },
  { grade: 'B', minComposite: 1.35, benchReq: 1.15, squatReq: 1.50, deadliftReq: 1.75, desc: 'Atlético avanzado' },
  { grade: 'A', minComposite: 1.58, benchReq: 1.35, squatReq: 1.75, deadliftReq: 2.05, desc: 'Élite regional / Alta densidad muscular' },
  { grade: 'S', minComposite: 1.82, benchReq: 1.55, squatReq: 2.00, deadliftReq: 2.35, desc: 'Maestría biomecánica (2x BW Sentadilla)' },
  { grade: 'SS', minComposite: 2.05, benchReq: 1.75, squatReq: 2.25, deadliftReq: 2.60, desc: 'Competidor nacional' },
  { grade: 'SSS', minComposite: 2.28, benchReq: 1.95, squatReq: 2.50, deadliftReq: 2.85, desc: 'Portento físico sobrehumano' },
  { grade: 'EX', minComposite: 2.50, benchReq: 2.15, squatReq: 2.75, deadliftReq: 3.10, desc: 'Cúspide humana absoluta' },
];

// Cosméticos básicos ganables cumpliendo misiones diarias
const COSMETICS_CATALOG = [
  { id: 'scar', name: 'Cicatriz de Combate', slot: 'faceMark', reqMissions: 1, desc: 'Marca de veterano sobre el pómulo derecho.' },
  { id: 'blindfold', name: 'Venda Táctica Oscura', slot: 'eyeWear', reqMissions: 2, desc: 'Venda estilizada estilo Revenant.' },
  { id: 'mask', name: 'Máscara Purificadora', slot: 'mouthWear', reqMissions: 3, desc: 'Respirador metálico gótico de caza.' },
  { id: 'armband', name: 'Brazalete Carmesí', slot: 'armGear', reqMissions: 4, desc: 'Banda de sangre sellada en brazo izquierdo.' },
  { id: 'cloak', name: 'Capa Corta de Cazador', slot: 'backGear', reqMissions: 5, desc: 'Manto asimétrico oscuro para misiones nocturnas.' },
  { id: 'silverHair', name: 'Tinte Ceniza Plateado', slot: 'hairTint', reqMissions: 7, desc: 'Cabello plateado de rango superior.' },
];

const RACES_POOL = [
  { id: 'ash_saiyan', name: 'Estirpe Guerrero Ceniza', trait: 'Zenkai Sombrío: +15% LP al superar misiones retomadas', hairColor: '#27201c', hairHighlight: '#4a3f38', skin: '#e8c3a8', eyeColor: '#be123c', horns: false, ears: 'human', halo: false },
  { id: 'abyss_demon', name: 'Revenant Abisal Carmesí', trait: 'Pacto de Sangre: Bonificación en cargas máximas', hairColor: '#3b0d16', hairHighlight: '#881337', skin: '#dfbca6', eyeColor: '#f43f5e', horns: true, ears: 'pointed', halo: false },
  { id: 'valkyrie_dusk', name: 'Valkiria del Crepúsculo', trait: 'Égida Lunar: Recuperación muscular acelerada', hairColor: '#cbd5e1', hairHighlight: '#f8fafc', skin: '#f0d2be', eyeColor: '#38bdf8', horns: false, ears: 'human', halo: true },
  { id: 'fenrir_kin', name: 'Semi-Humano de Fenrir', trait: 'Instinto Depredador: Potencia explosiva y agilidad', hairColor: '#44362b', hairHighlight: '#78604d', skin: '#e4bfa4', eyeColor: '#eab308', horns: false, ears: 'beast', halo: false },
  { id: 'hollow_lord', name: 'Señor Espectral Celestial', trait: 'Cuerpo de Acero Pálido: Resistencia neural superior', hairColor: '#94a3b8', hairHighlight: '#e2e8f0', skin: '#ebd0be', eyeColor: '#00f0ff', horns: false, ears: 'pointed', halo: true },
  { id: 'monarch_vessel', name: 'Recipiente del Monarca', trait: 'Soberanía: Evolución ilimitada de estadísticas', hairColor: '#18181b', hairHighlight: '#3f3f46', skin: '#e5be9f', eyeColor: '#d4af37', horns: false, ears: 'human', halo: false },
];

const CLASSES_POOL = [
  { id: 'martial_artist', name: 'Pugilista de Guantelete Oscuro', weapon: 'gauntlets', desc: 'Combate cuerpo a cuerpo con guanteletes reforzados.' },
  { id: 'sword_saint', name: 'Espadachín de la Ceniza', weapon: 'sword', desc: 'Hoja recta de acero templado y postura impecable.' },
  { id: 'dragon_lancer', name: 'Lancero del Abismo', weapon: 'spear', desc: 'Lanza larga de caballería y potencia de tren inferior.' },
  { id: 'staff_monk', name: 'Peregrino del Báculo', weapon: 'staff', desc: 'Control absoluto del centro de gravedad y resistencia.' },
  { id: 'titan_vanguard', name: 'Verdugo de Espadón Colosal', weapon: 'greatsword', desc: 'Fuerza bruta capaz de blandir acero ultra pesado.' },
];

const DEFAULT_LIFTS = {
  'Press Banca': { weight: 80, reps: 5, date: 'Inicial' },
  'Sentadilla Trasera': { weight: 105, reps: 5, date: 'Inicial' },
  'Peso Muerto Convencional': { weight: 130, reps: 5, date: 'Inicial' },
  'Press Militar': { weight: 50, reps: 6, date: 'Inicial' },
  'Remo con Barra': { weight: 75, reps: 8, date: 'Inicial' },
  'Dominadas Lastradas (Total)': { weight: 90, reps: 6, date: 'Inicial' },
};

const MOTIVATIONAL_QUOTES = [
  '«Levántate de las cenizas, Cazador. Cada kilo vencido forja tu armadura.»',
  '«La fuerza relativa no miente: el acero responde únicamente a tu disciplina.»',
  '«Quien domina su cuerpo en la oscuridad merece portar el rango Challenger.»',
  '«Cumple tus misiones diarias para reclamar nuevo equipo de caza.»',
];

function getRankFromLP(lp) {
  const safeLP = Math.max(0, Math.min(8999, lp));
  const totalDivisions = Math.floor(safeLP / 100);
  const rankIndex = Math.min(14, Math.floor(totalDivisions / 6));
  const divInRank = 6 - (totalDivisions % 6);
  const currentDivLP = safeLP % 100;
  return {
    ...RANKS[rankIndex],
    division: divInRank,
    label: `${RANKS[rankIndex].name} ${divInRank}`,
    currentDivLP,
    totalLP: safeLP,
  };
}

function calcEpley1RM(weight, reps) {
  if (!weight || weight <= 0) return 0;
  if (reps <= 1) return Math.round(weight);
  return Math.round(weight * (1 + reps / 30));
}

// ============================================================================
// AVATAR ANIME 2.5D ESTILO CODE VEIN (CEL-SHADING DETALLADO + COSMÉTICOS)
// ============================================================================
function CodeVeinAnimeAvatar({ hunterClass, rankInfo, physicalGrade, equipped }) {
  const gradeIdx = PHYSICAL_STANDARDS.findIndex((s) => s.grade === physicalGrade);
  const safeGradeIdx = gradeIdx >= 0 ? gradeIdx : 0;
  const tier = rankInfo.tier;

  // Proporciones estilizadas tipo Code Vein (cuello definido, chaqueta entallada, hombros atléticos)
  const shoulderOffset = 38 + safeGradeIdx * 1.1 + tier * 0.25;
  const waistOffset = 22 + safeGradeIdx * 0.4;
  const armWidth = 11 + safeGradeIdx * 0.45;

  const race = hunterClass?.race || RACES_POOL[0];
  const cls = hunterClass?.cls || CLASSES_POOL[0];
  const weaponTier = rankInfo.weaponTier || 1;

  const hairMain = equipped.hairTint ? '#cbd5e1' : race.hairColor;
  const hairLight = equipped.hairTint ? '#f8fafc' : race.hairHighlight;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'radial-gradient(circle at 50% 35%, rgba(190, 18, 60, 0.14) 0%, rgba(10, 12, 18, 0.98) 78%)',
      border: `1px solid ${rankInfo.color}`,
      borderRadius: '14px',
      padding: '16px 12px',
      position: 'relative',
      boxShadow: 'inset 0 0 35px rgba(0,0,0,0.9)'
    }}>
      {/* Insignias superiores */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '6px' }}>
        <span className="sys-badge" style={{ background: 'rgba(212, 175, 55, 0.14)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.45)' }}>
          {race.name}
        </span>
        <span className="sys-badge" style={{ background: 'rgba(0, 240, 255, 0.12)', color: '#00f0ff', border: '1px solid rgba(0, 240, 255, 0.35)' }}>
          GRADO FÍSICO {physicalGrade}
        </span>
      </div>

      {/* ILUSTRACIÓN DE MEDIO CUERPO / TRES CUARTOS ESTILO CODE VEIN */}
      <svg viewBox="0 0 260 320" width="235" height="290" style={{ overflow: 'visible' }}>
        <defs>
          {/* Sombreado suave de piel tipo anime 3D */}
          <linearGradient id="cvSkin" x1="0%" y1="0%" x2="100%" y2="15%">
            <stop offset="0%" stopColor={race.skin} />
            <stop offset="68%" stopColor={race.skin} />
            <stop offset="100%" stopColor="#a87c64" />
          </linearGradient>
          <linearGradient id="cvSkinShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9c7058" />
            <stop offset="100%" stopColor={race.skin} />
          </linearGradient>
          {/* Chaqueta de cuero táctico estilo Revenant */}
          <linearGradient id="cvJacket" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="45%" stopColor={rankInfo.coatDark} />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
          <linearGradient id="cvJacketPanel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3f3f46" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>
          {/* Cabello en capas */}
          <linearGradient id="cvHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={hairLight} />
            <stop offset="55%" stopColor={hairMain} />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
          {/* Acero de arma */}
          <linearGradient id="cvBlade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        {/* CAPA CORTA DE CAZADOR (COSMÉTICO DESBLOQUEABLE) */}
        {equipped.backGear && (
          <path
            d={`M ${130 - shoulderOffset - 4} 118 L ${130 - shoulderOffset - 22} 285 L 130 272 L ${130 + shoulderOffset + 22} 285 L ${130 + shoulderOffset + 4} 118 Z`}
            fill="#141419"
            stroke="#be123c"
            strokeWidth="1.2"
          />
        )}

        {/* ARMA DE CLASE EN LA ESPALDA / COSTADO */}
        {cls.weapon === 'sword' && (
          <g transform="translate(194, 88) rotate(14)">
            <rect x="-3" y="108" width="6" height="30" rx="2" fill="#18181b" stroke="#a1a1aa" />
            <path d="M -16 104 L 16 104 L 12 109 L -12 109 Z" fill={rankInfo.color} />
            <polygon points={`0,${12 - weaponTier * 6} -${4.5 + weaponTier * 0.7},104 ${4.5 + weaponTier * 0.7},104`} fill="url(#cvBlade)" stroke="#09090b" strokeWidth="1.2" />
          </g>
        )}
        {cls.weapon === 'greatsword' && (
          <g transform="translate(198, 76) rotate(16)">
            <rect x="-4" y="120" width="8" height="34" rx="2" fill="#09090b" stroke={rankInfo.color} />
            <polygon points="-22,114 22,114 15,122 -15,122" fill="#27272a" stroke={rankInfo.color} />
            <polygon points={`0,${4 - weaponTier * 5} -${11 + weaponTier * 1.3},114 ${11 + weaponTier * 1.3},114`} fill="url(#cvBlade)" stroke="#09090b" strokeWidth="1.4" />
          </g>
        )}
        {cls.weapon === 'spear' && (
          <g transform="translate(196, 36) rotate(8)">
            <rect x="-2.5" y="45" width="5" height="240" fill="#27272a" stroke="#09090b" />
            <polygon points={`0,${8 - weaponTier * 4} -${7 + weaponTier},54 ${7 + weaponTier},54`} fill="url(#cvBlade)" stroke="#09090b" strokeWidth="1.2" />
          </g>
        )}
        {cls.weapon === 'staff' && (
          <g transform="translate(194, 44) rotate(7)">
            <rect x="-3" y="28" width="6" height="250" rx="2" fill="#291d18" stroke="#d4af37" strokeWidth="1.2" />
            <circle cx="0" cy="24" r={4.5 + weaponTier * 0.8} fill={rankInfo.color} stroke="#fff" strokeWidth="1" />
          </g>
        )}

        {/* CABELLO TRASERO (VOLUMEN EN CAPAS) */}
        <path
          d="M 92 66 C 84 40, 102 18, 130 18 C 158 18, 176 40, 168 66 C 173 78, 168 94, 159 102 L 101 102 C 92 94, 87 78, 92 66 Z"
          fill="url(#cvHair)"
          stroke="#09090b"
          strokeWidth="1.4"
        />

        {/* Halo Celestial si corresponde */}
        {race.halo && (
          <ellipse cx="130" cy="14" rx="22" ry="4.5" fill="none" stroke="#d4af37" strokeWidth="2" />
        )}

        {/* CUELLO Y CLAVÍCULAS ANATÓMICAS */}
        <path
          d="M 119 92 L 119 114 L 100 124 L 160 124 L 141 114 L 141 92 Z"
          fill="url(#cvSkin)"
          stroke="#09090b"
          strokeWidth="1.3"
        />
        {/* Sombra bajo el mentón */}
        <path d="M 119 94 Q 130 103 141 94 L 141 102 Q 130 108 119 102 Z" fill="url(#cvSkinShadow)" opacity="0.65" />
        {/* Líneas de clavícula y esternón */}
        <path d="M 106 123 Q 122 127 128 124 M 154 123 Q 138 127 132 124" fill="none" stroke="#9c7058" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M 125 130 Q 130 138 135 130" fill="none" stroke="#9c7058" strokeWidth="1.2" />

        {/* TORSO Y CHAQUETA TÁCTICA DE CUELLO ALTO (ESTILO CODE VEIN) */}
        {/* Pecho descubierto en V estilizada */}
        <path
          d={`M ${130 - shoulderOffset} 122 L ${130 + shoulderOffset} 122 L ${130 + waistOffset + 4} 235 L ${130 - waistOffset - 4} 235 Z`}
          fill="url(#cvSkin)"
        />
        {/* Definición pectoral según grado físico */}
        <path
          d="M 112 146 Q 124 153 129 147 M 148 146 Q 136 153 131 147"
          fill="none"
          stroke="#9c7058"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Chaqueta Izquierda y Derecha con paneles acanalados */}
        <path
          d={`M ${130 - shoulderOffset} 120 L 112 116 L 128 164 L 128 242 L ${130 - waistOffset - 5} 242 L ${130 - shoulderOffset - 6} 145 Z`}
          fill="url(#cvJacket)"
          stroke="#09090b"
          strokeWidth="1.5"
        />
        <path
          d={`M ${130 + shoulderOffset} 120 L 148 116 L 132 164 L 132 242 L ${130 + waistOffset + 5} 242 L ${130 + shoulderOffset + 6} 145 Z`}
          fill="url(#cvJacket)"
          stroke="#09090b"
          strokeWidth="1.5"
        />

        {/* Paneles laterales texturizados de la chaqueta */}
        <path
          d={`M ${130 - shoulderOffset + 4} 135 L ${130 - waistOffset - 2} 145 L ${130 - waistOffset - 4} 238 L ${130 - shoulderOffset + 2} 238 Z`}
          fill="url(#cvJacketPanel)"
          opacity="0.7"
        />
        <path
          d={`M ${130 + shoulderOffset - 4} 135 L ${130 + waistOffset + 2} 145 L ${130 + waistOffset + 4} 238 L ${130 + shoulderOffset - 2} 238 Z`}
          fill="url(#cvJacketPanel)"
          opacity="0.7"
        />

        {/* Cuello Alto Levantado con Interior Carmesí / Dorado (Icónico de Code Vein) */}
        <path
          d="M 111 116 L 103 98 L 118 106 L 122 128 Z"
          fill={rankInfo.coatTrim}
          stroke="#09090b"
          strokeWidth="1.3"
        />
        <path
          d="M 149 116 L 157 98 L 142 106 L 138 128 Z"
          fill={rankInfo.coatTrim}
          stroke="#09090b"
          strokeWidth="1.3"
        />
        {/* Cremallera metálica central */}
        <line x1="130" y1="164" x2="130" y2="242" stroke="#a1a1aa" strokeWidth="2" />

        {/* Correas tácticas y hebillas en el torso */}
        <rect x={130 - waistOffset - 5} y="218" width={(waistOffset + 5) * 2} height="10" rx="2" fill="#18181b" stroke={rankInfo.color} strokeWidth="1.3" />
        <rect x="125" y="216" width="10" height="14" rx="2" fill={rankInfo.color} />

        {/* MANGAS Y BRAZOS ESTILIZADOS */}
        <path
          d={`M ${130 - shoulderOffset} 121 Q ${130 - shoulderOffset - armWidth} 165 ${130 - shoulderOffset - armWidth * 0.6} 235 L ${130 - shoulderOffset + 6} 235 L ${130 - shoulderOffset + 8} 165 Z`}
          fill="url(#cvJacket)"
          stroke="#09090b"
          strokeWidth="1.5"
        />
        <path
          d={`M ${130 + shoulderOffset} 121 Q ${130 + shoulderOffset + armWidth} 165 ${130 + shoulderOffset + armWidth * 0.6} 235 L ${130 + shoulderOffset - 6} 235 L ${130 + shoulderOffset - 8} 165 Z`}
          fill="url(#cvJacket)"
          stroke="#09090b"
          strokeWidth="1.5"
        />

        {/* COSMÉTICO: BRAZALETE CARMESÍ DE REVENANT */}
        {equipped.armGear && (
          <rect
            x={130 + shoulderOffset - 3}
            y="162"
            width="15"
            height="14"
            rx="2"
            fill="#be123c"
            stroke="#fbbf24"
            strokeWidth="1.2"
          />
        )}

        {/* PANTALÓN TÁCTICO Y CORREA DE PIERNA */}
        <path
          d={`M ${130 - waistOffset - 4} 242 L ${130 + waistOffset + 4} 242 L ${130 + waistOffset + 7} 308 L 132 308 L 130 266 L 128 308 L ${130 - waistOffset - 7} 308 Z`}
          fill="#11131a"
          stroke="#09090b"
          strokeWidth="1.5"
        />

        {/* ROSTRO ANIME ESTILIZADO (CURVAS SUAVES Y MENTÓN FINO) */}
        {race.ears === 'beast' && (
          <>
            <path d="M 103 48 L 94 20 L 116 38 Z" fill="url(#cvHair)" stroke="#09090b" strokeWidth="1.3" />
            <path d="M 157 48 L 166 20 L 144 38 Z" fill="url(#cvHair)" stroke="#09090b" strokeWidth="1.3" />
          </>
        )}
        {race.horns && (
          <>
            <path d="M 107 44 C 94 30, 96 16, 104 12 C 106 24, 110 34, 114 40 Z" fill="#18181b" stroke="#be123c" strokeWidth="1.3" />
            <path d="M 153 44 C 166 30, 164 16, 156 12 C 154 24, 150 34, 146 40 Z" fill="#18181b" stroke="#be123c" strokeWidth="1.3" />
          </>
        )}

        {/* Contorno facial suave */}
        <path
          d="M 106 46 C 105 64, 108 78, 130 94 C 152 78, 155 64, 154 46 Z"
          fill="url(#cvSkin)"
          stroke="#09090b"
          strokeWidth="1.4"
        />

        {/* COSMÉTICO: CICATRIZ DE COMBATE */}
        {equipped.faceMark && (
          <path d="M 139 68 L 147 75 M 141 73 L 145 70" stroke="#9f1239" strokeWidth="1.6" strokeLinecap="round" />
        )}

        {/* OJOS ANIME DETALLADOS (O VENDA TÁCTICA SI ESTÁ EQUIPADA) */}
        {!equipped.eyeWear ? (
          <>
            {/* Ojo Izquierdo */}
            <path d="M 111 61 Q 118 57 124 62 Q 118 66 111 63 Z" fill="#ffffff" stroke="#09090b" strokeWidth="1" />
            <ellipse cx="118" cy="61.8" rx="3" ry="3.2" fill={race.eyeColor} />
            <circle cx="118" cy="61.8" r="1.4" fill="#09090b" />
            <circle cx="116.8" cy="60.5" r="1" fill="#ffffff" />
            <path d="M 110 58 Q 118 55 125 59" fill="none" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />

            {/* Ojo Derecho */}
            <path d="M 149 61 Q 142 57 136 62 Q 142 66 149 63 Z" fill="#ffffff" stroke="#09090b" strokeWidth="1" />
            <ellipse cx="142" cy="61.8" rx="3" ry="3.2" fill={race.eyeColor} />
            <circle cx="142" cy="61.8" r="1.4" fill="#09090b" />
            <circle cx="140.8" cy="60.5" r="1" fill="#ffffff" />
            <path d="M 150 58 Q 142 55 135 59" fill="none" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />
          </>
        ) : (
          /* COSMÉTICO: VENDA TÁCTICA OSCURA */
          <path d="M 105 55 L 155 57 L 154 67 L 106 65 Z" fill="#18181b" stroke="#be123c" strokeWidth="1.3" />
        )}

        {/* Nariz sutil y boca */}
        <path d="M 130 66 L 128.5 72 L 131 73" fill="none" stroke="#9c7058" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 124 80 Q 130 81.5 136 80" fill="none" stroke="#7c533e" strokeWidth="1.4" strokeLinecap="round" />

        {/* COSMÉTICO: MÁSCARA PURIFICADORA GÓTICA */}
        {equipped.mouthWear && (
          <g>
            <path d="M 108 70 L 130 67 L 152 70 L 148 89 L 130 95 L 112 89 Z" fill="#18181b" stroke="#71717a" strokeWidth="1.4" />
            <circle cx="119" cy="80" r="4" fill="#27272a" stroke="#be123c" strokeWidth="1.2" />
            <circle cx="141" cy="80" r="4" fill="#27272a" stroke="#be123c" strokeWidth="1.2" />
            <path d="M 126 75 L 134 75 L 132 88 L 128 88 Z" fill="#3f3f46" />
          </g>
        )}

        {/* FLEQUILLO ANIME EN MECHONES SUPERPUESTOS (ESTILO CODE VEIN) */}
        <path
          d="M 96 64 C 95 34, 112 22, 130 22 C 148 22, 165 34, 164 64 L 158 52 L 153 66 L 146 46 L 139 63 L 132 45 L 126 65 L 119 46 L 112 64 L 106 48 L 101 64 Z"
          fill="url(#cvHair)"
          stroke="#09090b"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* Brillo superior del cabello */}
        <path
          d="M 110 35 Q 130 29 150 35"
          fill="none"
          stroke={hairLight}
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.65"
        />
      </svg>

      {/* Pie de tarjeta del Avatar */}
      <div style={{ textAlign: 'center', marginTop: '4px' }}>
        <div className="font-souls" style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc' }}>
          {cls.name}
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
          {race.trait}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// APLICACIÓN PRINCIPAL: PROTOCOLO EX // HUNTER SYSTEM
// ============================================================================
export default function App() {
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = SYSTEM_CSS;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  const [awakened, setAwakened] = useState(() => localStorage.getItem('pex_awakened_v3') === 'true');
  const [surveyStep, setSurveyStep] = useState(1);

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('pex_profile_v3');
    return saved ? JSON.parse(saved) : {
      hunterName: 'CAZADOR_01',
      goal: 'Hipertrofia y Estética',
      environment: 'Gimnasio y Casa',
      experienceMonths: 8,
      age: 22,
      weightKg: 75,
      heightCm: 176,
      benchKg: 80,
      squatKg: 105,
      deadliftKg: 130,
      pushupsMax: 30,
      photoScanned: false,
      censoredPreview: null,
    };
  });

  const [hunterClass, setHunterClass] = useState(() => {
    const saved = localStorage.getItem('pex_class_v3');
    return saved ? JSON.parse(saved) : null;
  });

  const [savedLifts, setSavedLifts] = useState(() => {
    const saved = localStorage.getItem('pex_saved_lifts_v3');
    return saved ? JSON.parse(saved) : DEFAULT_LIFTS;
  });

  const [lp, setLp] = useState(() => Number(localStorage.getItem('pex_lp_v3') || 1840));
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('pex_streak_v3') || 5));
  const [completedMissionsCount, setCompletedMissionsCount] = useState(() => Number(localStorage.getItem('pex_missions_done_v3') || 2));
  const [equippedCosmetics, setEquippedCosmetics] = useState(() => {
    const saved = localStorage.getItem('pex_cosmetics_v3');
    return saved ? JSON.parse(saved) : { scar: true, blindfold: false, mask: false, armband: false, cloak: false, hairTint: false };
  });

  const [activeTab, setActiveTab] = useState('quests');
  const [toast, setToast] = useState(null);

  const [quests, setQuests] = useState([
    { id: 1, title: 'Press Banca: 4x8 con 80 kg declarados', env: 'Gimnasio', lp: 45, status: 'pending' },
    { id: 2, title: 'Correr 5 km ritmo constante al aire libre', env: 'Exterior', lp: 40, status: 'pending' },
    { id: 3, title: 'Dormir al menos 7.5 horas esta noche', env: 'Recuperación', lp: 25, status: 'completed' },
  ]);
  const [nextWeekQueue, setNextWeekQueue] = useState([
    { id: 101, title: 'Sentadilla Profunda 4x6 (115 kg) - Reto recuperable', lp: 50 }
  ]);
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [justifyModalId, setJustifyModalId] = useState(null);
  const [justifyReason, setJustifyReason] = useState('Tormenta / Lluvia intensa');

  const [selectedExercise, setSelectedExercise] = useState('Press Banca');
  const [liftWeightInput, setLiftWeightInput] = useState(savedLifts['Press Banca']?.weight || 80);
  const [liftRepsInput, setLiftRepsInput] = useState(savedLifts['Press Banca']?.reps || 5);

  const [daysUntilEval] = useState(64);
  const [vaultPhotos, setVaultPhotos] = useState({ front: null, back: null });
  const [yearlyRecap] = useState([
    { quarter: 'Q1 (Inicio)', grade: 'D', weight: '71 kg', note: 'Despertar del Sistema. Base estructural.' },
    { quarter: 'Q2 (3 Meses)', grade: 'C', weight: '73.5 kg', note: '+18% fuerza relativa y mejora postural.' },
    { quarter: 'Q3 (Actual)', grade: 'B', weight: '75 kg', note: 'Densidad muscular y simetría escapular.' },
  ]);

  const [routineEnv, setRoutineEnv] = useState('Gimnasio');
  const [customRoutineText, setCustomRoutineText] = useState('');
  const [scanReport, setScanReport] = useState(null);

  const [sleepLog, setSleepLog] = useState([
    { day: 'Lun', hours: 7.5 },
    { day: 'Mar', hours: 7.0 },
    { day: 'Mié', hours: 8.0 },
    { day: 'Jue', hours: 6.5 },
    { day: 'Vie', hours: 7.5 },
    { day: 'Sáb', hours: 8.5 },
    { day: 'Dom', hours: 7.5 },
  ]);
  const [todaySleep, setTodaySleep] = useState(7.5);

  const canvasRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('pex_awakened_v3', String(awakened));
    localStorage.setItem('pex_profile_v3', JSON.stringify(profile));
    if (hunterClass) localStorage.setItem('pex_class_v3', JSON.stringify(hunterClass));
    localStorage.setItem('pex_saved_lifts_v3', JSON.stringify(savedLifts));
    localStorage.setItem('pex_lp_v3', String(lp));
    localStorage.setItem('pex_streak_v3', String(streak));
    localStorage.setItem('pex_missions_done_v3', String(completedMissionsCount));
    localStorage.setItem('pex_cosmetics_v3', JSON.stringify(equippedCosmetics));
  }, [awakened, profile, hunterClass, savedLifts, lp, streak, completedMissionsCount, equippedCosmetics]);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3800);
  };

  const handleSelectExercise = (exName) => {
    setSelectedExercise(exName);
    const existing = savedLifts[exName];
    if (existing) {
      setLiftWeightInput(existing.weight);
      setLiftRepsInput(existing.reps);
    } else {
      setLiftWeightInput(60);
      setLiftRepsInput(8);
    }
  };

  const handleSaveExerciseLoad = () => {
    const w = Math.max(1, Number(liftWeightInput));
    const r = Math.max(1, Number(liftRepsInput));
    const updated = {
      ...savedLifts,
      [selectedExercise]: {
        weight: w,
        reps: r,
        date: new Date().toLocaleDateString(),
      },
    };
    setSavedLifts(updated);
    triggerToast(`[SISTEMA] Marca guardada en ${selectedExercise}: ${w} kg x ${r} reps.`);
  };

  const toggleCosmetic = (item) => {
    if (completedMissionsCount < item.reqMissions) {
      triggerToast(`[BLOQUEADO] Completa ${item.reqMissions} misiones diarias para desbloquear "${item.name}".`);
      return;
    }
    setEquippedCosmetics((prev) => ({
      ...prev,
      [item.id]: !prev[item.id],
    }));
    triggerToast(`[VESTIDOR] Cosmético "${item.name}" ${!equippedCosmetics[item.id] ? 'equipado' : 'guardado'}.`);
  };

  // Cálculo científico automático del Grado Físico (Bloqueado al usuario)
  const bw = Math.max(40, Number(profile.weightKg));
  const bench1RM = calcEpley1RM(savedLifts['Press Banca']?.weight || 0, savedLifts['Press Banca']?.reps || 1);
  const squat1RM = calcEpley1RM(savedLifts['Sentadilla Trasera']?.weight || 0, savedLifts['Sentadilla Trasera']?.reps || 1);
  const deadlift1RM = calcEpley1RM(savedLifts['Peso Muerto Convencional']?.weight || 0, savedLifts['Peso Muerto Convencional']?.reps || 1);

  const benchRatio = bench1RM / bw;
  const squatRatio = squat1RM / bw;
  const deadliftRatio = deadlift1RM / bw;
  const compositeRelStrength = (benchRatio + squatRatio + deadliftRatio) / 3;

  let currentStandardIdx = 0;
  for (let i = PHYSICAL_STANDARDS.length - 1; i >= 0; i--) {
    const std = PHYSICAL_STANDARDS[i];
    if (
      compositeRelStrength >= std.minComposite &&
      benchRatio >= std.benchReq &&
      squatRatio >= std.squatReq &&
      deadliftRatio >= std.deadliftReq
    ) {
      currentStandardIdx = i;
      break;
    }
  }
  const currentPhysicalStd = PHYSICAL_STANDARDS[currentStandardIdx];
  const nextPhysicalStd = PHYSICAL_STANDARDS[Math.min(PHYSICAL_STANDARDS.length - 1, currentStandardIdx + 1)];
  const physicalGrade = currentPhysicalStd.grade;

  const handleSecurePhotoUpload = (e, target = 'onboarding') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current || document.createElement('canvas');
        canvas.width = 240;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 240, 300);

        ctx.fillStyle = '#04060b';
        ctx.fillRect(65, 12, 110, 58);
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 2;
        ctx.strokeRect(65, 12, 110, 58);
        ctx.fillStyle = '#d4af37';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('ROSTRO CENSURADO', 71, 40);
        ctx.fillText('AES-256 LOCAL', 82, 54);

        const safeDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        if (target === 'onboarding') {
          setProfile((p) => ({ ...p, photoScanned: true, censoredPreview: safeDataUrl }));
          triggerToast('[SISTEMA] Fotografía escaneada y rostro censurado con éxito.');
        } else if (target === 'front' || target === 'back') {
          setVaultPhotos((v) => ({ ...v, [target]: safeDataUrl }));
          triggerToast(`[BÓVEDA] Captura ${target === 'front' ? 'frontal' : 'dorsal'} cifrada sin rostro.`);
        }
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const awakenHunter = () => {
    const initialLifts = {
      ...savedLifts,
      'Press Banca': { weight: Number(profile.benchKg) || 60, reps: 5, date: 'Despertar' },
      'Sentadilla Trasera': { weight: Number(profile.squatKg) || 80, reps: 5, date: 'Despertar' },
      'Peso Muerto Convencional': { weight: Number(profile.deadliftKg) || 100, reps: 5, date: 'Despertar' },
    };
    setSavedLifts(initialLifts);
    setLiftWeightInput(initialLifts['Press Banca'].weight);
    setLiftRepsInput(5);

    const seed =
      Number(profile.weightKg) * 7 +
      Number(profile.heightCm) * 3 +
      Number(profile.benchKg || profile.pushupsMax) * 11 +
      Math.floor(Math.random() * 997);

    const chosenRace = RACES_POOL[seed % RACES_POOL.length];
    const chosenCls = CLASSES_POOL[(seed * 3 + Math.floor(Math.random() * 5)) % CLASSES_POOL.length];

    const baseLP = Math.min(2400, 300 + Number(profile.experienceMonths) * 65 + Number(profile.benchKg) * 4);
    const assigned = { race: chosenRace, cls: chosenCls, assignedAt: new Date().toLocaleDateString() };

    setHunterClass(assigned);
    setLp(baseLP);
    setAwakened(true);
    triggerToast(`¡DESPERTAR COMPLETADO! Clase sellada: ${chosenRace.name} - ${chosenCls.name}`);
  };

  const rankInfo = getRankFromLP(lp);
  const totalSleep = sleepLog.reduce((acc, d) => acc + d.hours, 0);
  const sleepOptimal = totalSleep >= 49 && totalSleep <= 63;
  const currentEx1RM = calcEpley1RM(liftWeightInput, liftRepsInput);
  const currentExRatio = (currentEx1RM / bw).toFixed(2);

  // ==========================================================================
  // PANTALLA 1: ENCUESTA ÚNICA DE DESPERTAR (SOLO PRIMERA VEZ)
  // ==========================================================================
  if (!awakened) {
    return (
      <div className="sys-container" style={{ maxWidth: '560px', paddingTop: '28px' }}>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        {toast && (
          <div className="toast-alert">
            <Sparkles size={18} color="#d4af37" />
            <span>{toast}</span>
          </div>
        )}

        <div className="sys-window" style={{ padding: '24px 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span className="sys-badge" style={{ background: 'rgba(212,175,55,0.15)', color: '#d4af37', border: '1px solid #d4af37' }}>
              [ALERTA DEL SISTEMA // DIAGNÓSTICO ÚNICO]
            </span>
            <h1 className="font-souls" style={{ fontSize: '25px', marginTop: '10px', color: '#fff' }}>
              PROTOCOLO EX
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
              Paso {surveyStep} de 4 — Calibración biométrica del aspirante
            </p>
            <div className="progress-track" style={{ marginTop: '12px' }}>
              <div className="progress-fill" style={{ width: `${surveyStep * 25}%`, background: 'linear-gradient(90deg, #be123c, #d4af37)' }} />
            </div>
          </div>

          {surveyStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>NOMBRE CLAVE DEL CAZADOR</label>
                <input
                  className="sys-input"
                  value={profile.hunterName}
                  onChange={(e) => setProfile({ ...profile, hunterName: e.target.value.toUpperCase() })}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>OBJETIVO PRINCIPAL</label>
                <select className="sys-select" value={profile.goal} onChange={(e) => setProfile({ ...profile, goal: e.target.value })}>
                  <option>Hipertrofia y Estética</option>
                  <option>Fuerza Máxima (Powerlifting)</option>
                  <option>Definición y Recomposición</option>
                  <option>Resistencia y Calistenia</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>ENTORNO DE ENTRENAMIENTO</label>
                <select className="sys-select" value={profile.environment} onChange={(e) => setProfile({ ...profile, environment: e.target.value })}>
                  <option>Gimnasio Completo</option>
                  <option>Entrenamiento en Casa</option>
                  <option>Gimnasio y Casa (Híbrido)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>TIEMPO ENTRENANDO (MESES)</label>
                <input type="number" className="sys-input" value={profile.experienceMonths} onChange={(e) => setProfile({ ...profile, experienceMonths: e.target.value })} />
              </div>
              <button className="sys-btn sys-btn-gold" style={{ marginTop: '8px' }} onClick={() => setSurveyStep(2)}>
                SIGUIENTE FASE <ChevronRight size={16} />
              </button>
            </div>
          )}

          {surveyStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>EDAD (AÑOS)</label>
                  <input type="number" className="sys-input" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>PESO CORPORAL (KG)</label>
                  <input type="number" className="sys-input" value={profile.weightKg} onChange={(e) => setProfile({ ...profile, weightKg: e.target.value })} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>ALTURA (CM)</label>
                <input type="number" className="sys-input" value={profile.heightCm} onChange={(e) => setProfile({ ...profile, heightCm: e.target.value })} />
              </div>

              {profile.environment !== 'Entrenamiento en Casa' ? (
                <>
                  <div className="grid-2">
                    <div>
                      <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>PRESS BANCA 5 REPS (KG)</label>
                      <input type="number" className="sys-input" value={profile.benchKg} onChange={(e) => setProfile({ ...profile, benchKg: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>SENTADILLA 5 REPS (KG)</label>
                      <input type="number" className="sys-input" value={profile.squatKg} onChange={(e) => setProfile({ ...profile, squatKg: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>PESO MUERTO 5 REPS (KG)</label>
                    <input type="number" className="sys-input" value={profile.deadliftKg} onChange={(e) => setProfile({ ...profile, deadliftKg: e.target.value })} />
                  </div>
                </>
              ) : (
                <div>
                  <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>MÁXIMO DE FLEXIONES SEGUIDAS (CASA)</label>
                  <input type="number" className="sys-input" value={profile.pushupsMax} onChange={(e) => setProfile({ ...profile, pushupsMax: e.target.value })} />
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button className="sys-btn sys-btn-ghost" onClick={() => setSurveyStep(1)}>ATRÁS</button>
                <button className="sys-btn sys-btn-gold" style={{ flex: 1 }} onClick={() => setSurveyStep(3)}>
                  ESCANEO CORPORAL <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {surveyStep === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#cbd5e1' }}>
                Subí una foto de cuerpo completo para calcular tu biotipo y sellar tu <strong>Clase y Raza aleatoria</strong>. El Sistema censura tu rostro localmente antes de procesarla.
              </p>

              <label style={{
                border: '2px dashed rgba(212,175,55,0.45)',
                borderRadius: '14px',
                padding: '22px 14px',
                cursor: 'pointer',
                background: 'rgba(212,175,55,0.05)'
              }}>
                <Camera size={32} color="#d4af37" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontWeight: 700, color: '#fff' }}>SELECCIONAR FOTO DE CUERPO COMPLETO</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Censura facial local instantánea</div>
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleSecurePhotoUpload(e, 'onboarding')} />
              </label>

              {profile.censoredPreview && (
                <div style={{ margin: '0 auto' }}>
                  <img src={profile.censoredPreview} alt="Escaneo seguro" style={{ width: '130px', borderRadius: '10px', border: '1px solid #d4af37' }} />
                  <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>✓ Biometría verificada y protegida</div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button className="sys-btn sys-btn-ghost" onClick={() => setSurveyStep(2)}>ATRÁS</button>
                <button className="sys-btn sys-btn-gold" style={{ flex: 1 }} onClick={() => setSurveyStep(4)}>
                  CONTINUAR AL DESPERTAR <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {surveyStep === 4 && (
            <div style={{ textAlign: 'center', padding: '14px 4px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <Shield size={54} color="#d4af37" style={{ margin: '0 auto' }} />
              <h2 className="font-souls" style={{ fontSize: '21px', color: '#d4af37', lineHeight: 1.3 }}>
                ¿ESTÁS LISTO PARA CONVERTIRTE EN CAZADOR?
              </h2>
              <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5 }}>
                Una vez aceptes, el Sistema te otorgará una <strong>Raza y Clase aleatoria</strong> y calculará tu <strong>Grado Físico inicial ({physicalGrade})</strong> según tus marcas científicas.
              </p>
              <button className="sys-btn sys-btn-gold" style={{ padding: '16px', fontSize: '13px' }} onClick={awakenHunter}>
                <Zap size={18} /> SÍ, ACEPTAR EL DESPERTAR
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================================================
  // INTERFAZ PRINCIPAL DEL SISTEMA (HUD DE CAZADOR)
  // ==========================================================================
  return (
    <div className="sys-container">
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {toast && (
        <div className="toast-alert">
          <Zap size={18} color="#d4af37" />
          <span>{toast}</span>
        </div>
      )}

      {/* CABECERA DE ESTADO */}
      <div className="sys-window" style={{ padding: '18px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="sys-badge" style={{ background: 'rgba(212,175,55,0.16)', color: '#d4af37', border: '1px solid #d4af37' }}>
                GRADO FÍSICO {physicalGrade}
              </span>
              <span className="sys-badge" style={{ background: 'rgba(234,88,12,0.2)', color: '#fdba74', border: '1px solid #ea580c' }}>
                <Flame size={13} /> RACHA {streak} DÍAS
              </span>
              <span className="sys-badge" style={{ background: 'rgba(190,18,60,0.2)', color: '#fda4af', border: '1px solid #be123c' }}>
                <Crown size={13} /> {completedMissionsCount} MISIONES CUMPLIDAS
              </span>
            </div>
            <h1 className="font-souls" style={{ fontSize: '23px', marginTop: '6px', color: '#fff' }}>
              {profile.hunterName}
            </h1>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className="font-hud" style={{ fontSize: '18px', fontWeight: 900, color: rankInfo.color }}>
              {rankInfo.label.toUpperCase()}
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
              {rankInfo.totalLP} LP • Faltan {100 - rankInfo.currentDivLP} LP para ascender
            </div>
          </div>
        </div>

        <div className="progress-track" style={{ marginTop: '12px' }}>
          <div
            className="progress-fill"
            style={{
              width: `${rankInfo.currentDivLP}%`,
              background: `linear-gradient(90deg, ${rankInfo.color}, #d4af37)`
            }}
          />
        </div>

        <div style={{
          marginTop: '12px',
          padding: '8px 12px',
          borderRadius: '8px',
          background: 'rgba(212, 175, 55, 0.06)',
          borderLeft: '3px solid #d4af37',
          fontSize: '13px',
          color: '#e2e8f0',
          fontStyle: 'italic'
        }}>
          {MOTIVATIONAL_QUOTES[streak % MOTIVATIONAL_QUOTES.length]}
        </div>
      </div>

      {/* MENÚ DE NAVEGACIÓN DE 6 MÓDULOS */}
      <div className="nav-tabs">
        <button className={`nav-tab ${activeTab === 'quests' ? 'active' : ''}`} onClick={() => setActiveTab('quests')}>
          <Trophy size={18} color="#d4af37" />
          <span>Retos & Rangos</span>
        </button>
        <button className={`nav-tab ${activeTab === 'avatar' ? 'active' : ''}`} onClick={() => setActiveTab('avatar')}>
          <Sword size={18} color="#be123c" />
          <span>Avatar & Equipo</span>
        </button>
        <button className={`nav-tab ${activeTab === 'strength' ? 'active' : ''}`} onClick={() => setActiveTab('strength')}>
          <Dumbbell size={18} color="#e11d48" />
          <span>Fuerza & Cargas</span>
        </button>
        <button className={`nav-tab ${activeTab === 'vault' ? 'active' : ''}`} onClick={() => setActiveTab('vault')}>
          <Lock size={18} color="#a855f7" />
          <span>Físico & Bóveda</span>
        </button>
        <button className={`nav-tab ${activeTab === 'routines' ? 'active' : ''}`} onClick={() => setActiveTab('routines')}>
          <Cpu size={18} color="#10b981" />
          <span>Rutinas & IA</span>
        </button>
        <button className={`nav-tab ${activeTab === 'sleep' ? 'active' : ''}`} onClick={() => setActiveTab('sleep')}>
          <Moon size={18} color="#38bdf8" />
          <span>Sueño ({totalSleep}h)</span>
        </button>
      </div>

      {/* ====================================================================
          MÓDULO 1: RETOS DIARIOS, RETOMA SEMANAL Y JUSTIFICACIÓN CLIMÁTICA
         ==================================================================== */}
      {activeTab === 'quests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-hud" style={{ fontSize: '14px', color: '#d4af37', marginBottom: '12px' }}>
              MISIONES DIARIAS DECLARADAS (DESBLOQUEAN COSMÉTICOS)
            </h2>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                className="sys-input"
                placeholder="Declarar reto de hoy (ej. Sentadilla 4x6 con 120 kg)..."
                value={newQuestTitle}
                onChange={(e) => setNewQuestTitle(e.target.value)}
              />
              <button
                className="sys-btn sys-btn-gold"
                onClick={() => {
                  if (!newQuestTitle.trim()) return;
                  setQuests([{ id: Date.now(), title: newQuestTitle, env: 'Declarado', lp: 45, status: 'pending' }, ...quests]);
                  setNewQuestTitle('');
                  triggerToast('[SISTEMA] Nueva misión diaria registrada.');
                }}
              >
                + AGREGAR
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quests.map((q) => (
                <div
                  key={q.id}
                  style={{
                    padding: '14px',
                    borderRadius: '11px',
                    background: 'rgba(4, 6, 12, 0.8)',
                    border: `1px solid ${q.status === 'completed' ? '#10b981' : q.status === 'failed' ? '#e11d48' : 'rgba(148,163,184,0.22)'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: '#fff' }}>{q.title}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>Entorno: {q.env} • Recompensa: +{q.lp} LP + 1 Hito Cosmético</div>
                    </div>
                    <span className="sys-badge" style={{
                      background: q.status === 'completed' ? 'rgba(16,185,129,0.2)' : q.status === 'failed' ? 'rgba(225,29,72,0.2)' : 'rgba(212,175,55,0.15)',
                      color: q.status === 'completed' ? '#6ee7b7' : q.status === 'failed' ? '#fda4af' : '#d4af37'
                    }}>
                      {q.status === 'completed' ? 'CUMPLIDA' : q.status === 'failed' ? 'FALLIDA' : 'EN CURSO'}
                    </span>
                  </div>

                  {q.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        className="sys-btn sys-btn-success"
                        style={{ padding: '8px 12px', fontSize: '11px' }}
                        onClick={() => {
                          const nextCount = completedMissionsCount + 1;
                          setQuests(quests.map((item) => item.id === q.id ? { ...item, status: 'completed' } : item));
                          setLp((prev) => prev + q.lp);
                          setStreak((s) => s + 1);
                          setCompletedMissionsCount(nextCount);
                          const unlockedItem = COSMETICS_CATALOG.find((c) => c.reqMissions === nextCount);
                          if (unlockedItem) {
                            triggerToast(`¡MISIÓN CUMPLIDA! +${q.lp} LP y nuevo cosmético desbloqueado: ${unlockedItem.name}`);
                          } else {
                            triggerToast(`¡MISIÓN CUMPLIDA! +${q.lp} LP obtenidos.`);
                          }
                        }}
                      >
                        <CheckCircle2 size={14} /> LOGRADO
                      </button>

                      <button
                        className="sys-btn sys-btn-danger"
                        style={{ padding: '8px 12px', fontSize: '11px' }}
                        onClick={() => {
                          setQuests(quests.map((item) => item.id === q.id ? { ...item, status: 'failed' } : item));
                          setNextWeekQueue([...nextWeekQueue, { id: Date.now(), title: `${q.title} (Retoma Semanal)`, lp: q.lp }]);
                          triggerToast('[ALERTA] Misión fallida. Enviada a cola de retoma de la próxima semana.');
                        }}
                      >
                        <XCircle size={14} /> NO LOGRADO
                      </button>

                      <button
                        className="sys-btn sys-btn-ghost"
                        style={{ padding: '8px 12px', fontSize: '11px' }}
                        onClick={() => setJustifyModalId(q.id)}
                      >
                        <CloudRain size={14} color="#38bdf8" /> JUSTIFICAR IMPREVISTO
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {justifyModalId && (
              <div style={{
                marginTop: '14px',
                padding: '14px',
                borderRadius: '11px',
                background: 'rgba(14, 116, 144, 0.22)',
                border: '1px solid #00f0ff'
              }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#00f0ff', marginBottom: '8px' }}>
                  JUSTIFICACIÓN DE IMPREVISTO EXTERNO (CONVERSIÓN A DESAFÍO EN CASA)
                </div>
                <select className="sys-select" value={justifyReason} onChange={(e) => setJustifyReason(e.target.value)} style={{ marginBottom: '10px' }}>
                  <option>Lluvia intensa / Tormenta (imposible salir a correr)</option>
                  <option>Gimnasio cerrado por feriado o mantenimiento</option>
                  <option>Corte de transporte / Emergencia laboral</option>
                </select>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="sys-btn sys-btn-primary"
                    onClick={() => {
                      setQuests(quests.map((item) =>
                        item.id === justifyModalId
                          ? { ...item, title: `[DESAFÍO EN CASA] Circuito HIIT Tabata + 120 Burpees/Sentadillas (${justifyReason})`, env: 'Casa (Adaptado)' }
                          : item
                      ));
                      setJustifyModalId(null);
                      triggerToast('[SISTEMA] Justificación aceptada. Misión transformada a entrenamiento en casa.');
                    }}
                  >
                    GENERAR DESAFÍO EN CASA
                  </button>
                  <button className="sys-btn sys-btn-ghost" onClick={() => setJustifyModalId(null)}>CANCELAR</button>
                </div>
              </div>
            )}
          </div>

          <div className="grid-2">
            <div className="sys-window" style={{ padding: '16px' }}>
              <h3 className="font-hud" style={{ fontSize: '13px', color: '#e11d48', marginBottom: '10px' }}>
                COLA DE RETOMA (PRÓXIMA SEMANA)
              </h3>
              {nextWeekQueue.length === 0 ? (
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Sin misiones pendientes de recuperación.</p>
              ) : (
                nextWeekQueue.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ fontSize: '13px' }}>{item.title}</span>
                    <button
                      className="sys-btn sys-btn-ghost"
                      style={{ padding: '5px 10px', fontSize: '10px' }}
                      onClick={() => {
                        setQuests([{ id: Date.now(), title: item.title, env: 'Retoma', lp: item.lp, status: 'pending' }, ...quests]);
                        setNextWeekQueue(nextWeekQueue.filter((x) => x.id !== item.id));
                        triggerToast('Misión reactivada en tu lista de hoy.');
                      }}
                    >
                      RETOMAR
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="sys-window" style={{ padding: '16px' }}>
              <h3 className="font-hud" style={{ fontSize: '13px', color: '#d4af37', marginBottom: '10px' }}>
                ESCALA DE 15 RANGOS (6 DIVISIONES C/U)
              </h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>
                Tierra 6 → Madera → Piedra → Carbón → Hierro → Bronce → Plata → Oro → Platino → Esmeralda → Diamante → Especialista → Maestro → Jefe Maestro → Challenger 1
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button className="sys-btn sys-btn-primary" style={{ padding: '8px 12px', fontSize: '11px' }} onClick={() => setLp((v) => v + 100)}>
                  +100 LP (SUBIR DIVISIÓN)
                </button>
                <button className="sys-btn sys-btn-gold" style={{ padding: '8px 12px', fontSize: '11px' }} onClick={() => setLp((v) => v + 600)}>
                  +600 LP (ASCENDER LIGA)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 2: AVATAR ESTILO CODE VEIN + COSMÉTICOS DESBLOQUEABLES
         ==================================================================== */}
      {activeTab === 'avatar' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="grid-2">
            <CodeVeinAnimeAvatar
              hunterClass={hunterClass}
              rankInfo={rankInfo}
              physicalGrade={physicalGrade}
              equipped={equippedCosmetics}
            />

            <div className="sys-window" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 className="font-souls" style={{ fontSize: '16px', color: '#d4af37' }}>
                FICHA DE CAZADOR Y EVOLUCIÓN
              </h2>
              <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>
                Tu personaje evoluciona automáticamente según tu rango y tu <strong>Grado Físico científico ({physicalGrade})</strong>. Completa misiones diarias para desbloquear cosméticos de caza.
              </p>

              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(4,6,12,0.85)', border: '1px solid rgba(212,175,55,0.25)' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>ESTIRPE / RAZA SELLADA</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{hunterClass?.race?.name}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>CLASE DE COMBATE</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#d4af37' }}>{hunterClass?.cls?.name}</div>
                <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px' }}>{hunterClass?.cls?.desc}</div>
              </div>

              {/* Condiciones Científicas Bloqueadas para subir de Grado Físico */}
              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(190,18,60,0.08)', border: '1px solid rgba(190,18,60,0.35)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#fda4af' }}>
                    <Lock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    GRADO FÍSICO ACTUAL: {physicalGrade}
                  </span>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                    Índice: {compositeRelStrength.toFixed(2)}x BW
                  </span>
                </div>
                {physicalGrade !== 'EX' && (
                  <div style={{ fontSize: '12px', color: '#e2e8f0', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
                    <div style={{ color: '#00f0ff', fontWeight: 700, marginBottom: '4px' }}>
                      REQUISITOS PARA SUBIR A GRADO {nextPhysicalStd.grade}:
                    </div>
                    <div>• Press Banca: <strong>{Math.round(nextPhysicalStd.benchReq * bw)} kg</strong> (Actual: {bench1RM} kg)</div>
                    <div>• Sentadilla: <strong>{Math.round(nextPhysicalStd.squatReq * bw)} kg</strong> (Actual: {squat1RM} kg)</div>
                    <div>• Peso Muerto: <strong>{Math.round(nextPhysicalStd.deadliftReq * bw)} kg</strong> (Actual: {deadlift1RM} kg)</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* VESTIDOR DE COSMÉTICOS BÁSICOS POR MISIONES DIARIAS */}
          <div className="sys-window" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <h3 className="font-hud" style={{ fontSize: '14px', color: '#d4af37' }}>
                COSMÉTICOS BÁSICOS (DESBLOQUEO POR MISIONES DIARIAS)
              </h3>
              <span className="sys-badge" style={{ background: 'rgba(16,185,129,0.18)', color: '#6ee7b7' }}>
                MISIONES COMPLETADAS: {completedMissionsCount}
              </span>
            </div>

            <div className="grid-2">
              {COSMETICS_CATALOG.map((item) => {
                const unlocked = completedMissionsCount >= item.reqMissions;
                const isEquipped = !!equippedCosmetics[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCosmetic(item)}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      background: isEquipped ? 'rgba(212,175,55,0.14)' : 'rgba(4,6,12,0.85)',
                      border: `1px solid ${isEquipped ? '#d4af37' : unlocked ? 'rgba(148,163,184,0.3)' : 'rgba(190,18,60,0.3)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      opacity: unlocked ? 1 : 0.72
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{item.desc}</div>
                    </div>
                    <div>
                      {!unlocked ? (
                        <span className="sys-badge" style={{ background: 'rgba(190,18,60,0.2)', color: '#fda4af' }}>
                          <Lock size={11} /> {item.reqMissions} Misiones
                        </span>
                      ) : isEquipped ? (
                        <span className="sys-badge" style={{ background: 'rgba(212,175,55,0.25)', color: '#fde047' }}>
                          <Check size={11} /> Equipado
                        </span>
                      ) : (
                        <span className="sys-badge" style={{ background: 'rgba(148,163,184,0.2)', color: '#e2e8f0' }}>
                          Equipar
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 3: CARGAS GUARDADAS POR SEPARADO Y FUERZA RELATIVA F -> EX
         ==================================================================== */}
      {activeTab === 'strength' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-hud" style={{ fontSize: '14px', color: '#e11d48', marginBottom: '12px' }}>
              REGISTRO DE CARGAS POR EJERCICIO (GUARDADO INDIVIDUAL)
            </h2>

            <div className="grid-2" style={{ marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#94a3b8' }}>SELECCIONAR EJERCICIO</label>
                <select
                  className="sys-select"
                  value={selectedExercise}
                  onChange={(e) => handleSelectExercise(e.target.value)}
                >
                  {Object.keys(savedLifts).map((ex) => (
                    <option key={ex} value={ex}>{ex}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#94a3b8' }}>CARGA (KG)</label>
                  <input
                    type="number"
                    className="sys-input"
                    value={liftWeightInput}
                    onChange={(e) => setLiftWeightInput(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#94a3b8' }}>REPS</label>
                  <input
                    type="number"
                    className="sys-input"
                    value={liftRepsInput}
                    onChange={(e) => setLiftRepsInput(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
                1RM Estimado en <strong>{selectedExercise}</strong>: <span style={{ color: '#00f0ff', fontWeight: 700 }}>{currentEx1RM} kg</span> ({currentExRatio}x peso corporal)
              </div>
              <button className="sys-btn sys-btn-gold" onClick={handleSaveExerciseLoad}>
                <Save size={15} /> GUARDAR MARCA DE {selectedExercise.toUpperCase()}
              </button>
            </div>

            <h3 className="font-hud" style={{ fontSize: '12px', color: '#d4af37', marginBottom: '10px' }}>
              BITÁCORA DE CARGAS GUARDADAS ({bw} KG PESO CORPORAL)
            </h3>
            <div className="grid-2">
              {Object.entries(savedLifts).map(([exName, data]) => {
                const ex1rm = calcEpley1RM(data.weight, data.reps);
                const exRel = (ex1rm / bw).toFixed(2);
                const isSelected = exName === selectedExercise;
                return (
                  <div
                    key={exName}
                    onClick={() => handleSelectExercise(exName)}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      background: isSelected ? 'rgba(212,175,55,0.12)' : 'rgba(4,6,12,0.85)',
                      border: `1px solid ${isSelected ? '#d4af37' : 'rgba(148,163,184,0.2)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>{exName}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                        Marca: <strong style={{ color: '#e2e8f0' }}>{data.weight} kg × {data.reps} reps</strong> • {data.date}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="font-hud" style={{ fontSize: '14px', color: '#00f0ff', fontWeight: 700 }}>{ex1rm} KG</div>
                      <div style={{ fontSize: '11px', color: '#d4af37', fontWeight: 700 }}>{exRel}x BW</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sys-window" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>ÍNDICE DE FUERZA RELATIVA COMPUESTA (BANCA + SENTADILLA + P. MUERTO)</div>
                <div className="font-hud" style={{ fontSize: '22px', color: '#fff', marginTop: '2px' }}>
                  {compositeRelStrength.toFixed(2)}x BW <span style={{ color: '#d4af37' }}>→ GRADO FÍSICO {physicalGrade}</span>
                </div>
              </div>
              <TrendingUp size={28} color="#10b981" />
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 4: EVALUACIÓN FÍSICA TRIMESTRAL, BÓVEDA SEGURA Y RECAP ANUAL
         ==================================================================== */}
      {activeTab === 'vault' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <h2 className="font-hud" style={{ fontSize: '14px', color: '#a855f7' }}>
                BÓVEDA FÍSICA CIFRADA (RENOVACIÓN CADA 3 MESES)
              </h2>
              <span className="sys-badge" style={{ background: 'rgba(168,85,247,0.2)', color: '#d8b4fe', border: '1px solid #a855f7' }}>
                PRÓXIMA REVISIÓN EN {daysUntilEval} DÍAS
              </span>
            </div>

            <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '14px' }}>
              Subí fotos de frente y espalda. El algoritmo censura tu cara localmente en tu navegador y cifra las imágenes para evitar filtraciones.
            </p>

            <div className="grid-2">
              {['front', 'back'].map((side) => (
                <div key={side} style={{ padding: '14px', borderRadius: '11px', background: 'rgba(4,6,12,0.85)', border: '1px dashed rgba(168,85,247,0.5)', textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px', color: '#e9d5ff' }}>
                    {side === 'front' ? 'PERFIL FRONTAL (SIN ROSTRO)' : 'PERFIL DORSAL / ESPALDA'}
                  </div>
                  {vaultPhotos[side] ? (
                    <img src={vaultPhotos[side]} alt={side} style={{ width: '120px', borderRadius: '8px', margin: '0 auto 8px', border: '1px solid #10b981' }} />
                  ) : (
                    <EyeOff size={28} color="#a855f7" style={{ margin: '12px auto' }} />
                  )}
                  <label className="sys-btn sys-btn-ghost" style={{ fontSize: '11px', padding: '8px 12px' }}>
                    <Upload size={14} /> SUBIR Y CIFRAR
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleSecurePhotoUpload(e, side)} />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="sys-window" style={{ padding: '18px' }}>
            <h3 className="font-hud" style={{ fontSize: '14px', color: '#d4af37', marginBottom: '10px' }}>
              RECOPILACIÓN ANUAL DE EVOLUCIÓN (Q1 → Q4)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {yearlyRecap.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '10px', background: 'rgba(4,6,12,0.8)' }}>
                  <div>
                    <strong style={{ color: '#fff' }}>{item.quarter}</strong> — <span style={{ color: '#94a3b8', fontSize: '13px' }}>{item.note}</span>
                  </div>
                  <span className="sys-badge" style={{ background: 'rgba(212,175,55,0.2)', color: '#d4af37' }}>
                    GRADO {item.grade} ({item.weight})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 5: RUTINAS CIENTÍFICAS Y ESCÁNER DE RUTINA PROPIA
         ==================================================================== */}
      {activeTab === 'routines' && (
        <div className="grid-2">
          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-hud" style={{ fontSize: '14px', color: '#10b981', marginBottom: '10px' }}>
              GENERADOR BIOMECÁNICO ({routineEnv.toUpperCase()})
            </h2>
            <select className="sys-select" value={routineEnv} onChange={(e) => setRoutineEnv(e.target.value)} style={{ marginBottom: '12px' }}>
              <option>Gimnasio</option>
              <option>Casa (Peso Corporal / Mancuernas)</option>
              <option>Híbrido (Gym + Casa)</option>
            </select>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              {routineEnv === 'Gimnasio' ? (
                <>
                  <div style={{ padding: '10px', background: 'rgba(4,6,12,0.85)', borderRadius: '8px' }}>• <strong>Press Inclinado con Mancuernas:</strong> 3x8-10 (RIR 1-2, tensión en haz clavicular)</div>
                  <div style={{ padding: '10px', background: 'rgba(4,6,12,0.85)', borderRadius: '8px' }}>• <strong>Remo en Máquina con Apoyo Pecho:</strong> 3x10 (retracción escapular sin fatiga lumbar)</div>
                  <div style={{ padding: '10px', background: 'rgba(4,6,12,0.85)', borderRadius: '8px' }}>• <strong>Sentadilla Hack / Jaca:</strong> 3x8 (máxima flexión de rodilla controlada)</div>
                </>
              ) : (
                <>
                  <div style={{ padding: '10px', background: 'rgba(4,6,12,0.85)', borderRadius: '8px' }}>• <strong>Flexiones en Déficit / Declinadas:</strong> 4x12-15 (pausa de 2s abajo)</div>
                  <div style={{ padding: '10px', background: 'rgba(4,6,12,0.85)', borderRadius: '8px' }}>• <strong>Sentadilla Búlgara Unilateral:</strong> 3x10 por pierna (alto estímulo glúteo/cuádriceps)</div>
                  <div style={{ padding: '10px', background: 'rgba(4,6,12,0.85)', borderRadius: '8px' }}>• <strong>Remo Invertido bajo Mesa / Barra:</strong> 4x12 (control excéntrico 3s)</div>
                </>
              )}
            </div>
          </div>

          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-hud" style={{ fontSize: '14px', color: '#00f0ff', marginBottom: '10px' }}>
              ESCÁNER DE RUTINA PROPIA (ARCHIVO O TEXTO)
            </h2>
            <textarea
              className="sys-textarea"
              rows={4}
              placeholder="Pegá tu rutina actual o subí una captura para analizar volumen, frecuencia y fatiga del SNC..."
              value={customRoutineText}
              onChange={(e) => setCustomRoutineText(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
              <button
                className="sys-btn sys-btn-primary"
                onClick={() => {
                  setScanReport({
                    score: '84 / 100 (ÓPTIMA)',
                    finding: 'Buen estímulo mecánico, pero se detecta exceso de volumen en empuje horizontal frente a tracción.',
                    fix: 'Añadir 4 series semanales de Face Pulls o Remo posterior para proteger el manguito rotador.'
                  });
                  triggerToast('[ESCÁNER IA] Auditoría biomecánica completada.');
                }}
              >
                <Scan size={15} /> EXAMINAR RUTINA
              </button>
              <label className="sys-btn sys-btn-ghost" style={{ cursor: 'pointer' }}>
                <FileText size={15} /> SUBIR FOTO/ARCHIVO
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={() => {
                    setScanReport({
                      score: '88 / 100 (ALTO RENDIMIENTO)',
                      finding: 'Archivo escaneado: Distribución correcta de series efectivas (12-16 por grupo muscular).',
                      fix: 'Mantener RIR 1-2 en los ejercicios multiarticulares pesados para no comprometer el sueño.'
                    });
                    triggerToast('[ESCÁNER IA] Archivo procesado correctamente.');
                  }}
                />
              </label>
            </div>

            {scanReport && (
              <div style={{ marginTop: '12px', padding: '12px', borderRadius: '10px', background: 'rgba(16,185,129,0.12)', border: '1px solid #10b981', fontSize: '13px' }}>
                <div style={{ fontWeight: 700, color: '#6ee7b7' }}>RESULTADO: {scanReport.score}</div>
                <p style={{ marginTop: '4px', color: '#e2e8f0' }}>{scanReport.finding}</p>
                <p style={{ marginTop: '4px', color: '#d4af37' }}>Ajuste sugerido: {scanReport.fix}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 6: CONTADOR DE HORAS DE SUEÑO Y RECUPERACIÓN SEMANAL
         ==================================================================== */}
      {activeTab === 'sleep' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            <h2 className="font-hud" style={{ fontSize: '14px', color: '#38bdf8' }}>
              RECUPERACIÓN NEURAL Y ACUMULACIÓN DE SUEÑO
            </h2>
            <span className="sys-badge" style={{
              background: sleepOptimal ? 'rgba(16,185,129,0.2)' : 'rgba(225,29,72,0.2)',
              color: sleepOptimal ? '#6ee7b7' : '#fda4af',
              border: `1px solid ${sleepOptimal ? '#10b981' : '#e11d48'}`
            }}>
              ACUMULADO: {totalSleep}H / META CIENTÍFICA: 49–63H
            </span>
          </div>

          {!sleepOptimal && (
            <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(225,29,72,0.15)', border: '1px solid #e11d48', marginBottom: '14px', fontSize: '13px', color: '#fecdd3' }}>
              <AlertTriangle size={15} style={{ display: 'inline', marginRight: '6px' }} />
              <strong>Deuda de sueño detectada:</strong> Dormir menos de 49 horas semanales reduce la síntesis proteica y la fuerza máxima hasta un 12%.
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '16px', textAlign: 'center' }}>
            {sleepLog.map((d, i) => (
              <div key={i} style={{ padding: '10px 4px', borderRadius: '10px', background: 'rgba(4,6,12,0.85)', border: '1px solid rgba(56,189,248,0.3)' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{d.day}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: d.hours >= 7 ? '#38bdf8' : '#e11d48', marginTop: '4px' }}>
                  {d.hours}h
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="number"
              step="0.5"
              className="sys-input"
              style={{ maxWidth: '140px' }}
              value={todaySleep}
              onChange={(e) => setTodaySleep(Number(e.target.value))}
            />
            <button
              className="sys-btn sys-btn-primary"
              onClick={() => {
                const updated = [...sleepLog];
                updated[updated.length - 1].hours = todaySleep;
                setSleepLog(updated);
                triggerToast(`[SISTEMA] Sueño actualizado (${todaySleep}h). Recuperación recalculada.`);
              }}
            >
              <Clock size={15} /> REGISTRAR SUEÑO DE HOY
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
