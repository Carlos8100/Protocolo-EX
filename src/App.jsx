import React, { useState, useEffect, useRef } from 'react';
import {
  Flame, Trophy, Dumbbell, Moon, User, Camera, Sparkles, Shield,
  CheckCircle2, XCircle, CloudRain, Zap, Award, Lock, EyeOff,
  Upload, Scan, Cpu, FileText, AlertTriangle, Calendar, RefreshCw,
  ChevronRight, Sword, Heart, Activity, BarChart3, Clock, Check
} from 'lucide-react';

// ============================================================================
// ESTILOS INTEGRADOS (HOLOGRAPHIC ANIME SYSTEM HUD - 100% AUTOCONTENIDO)
// ============================================================================
const SYSTEM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&display=swap');

  :root {
    --bg-void: #050814;
    --bg-panel: rgba(12, 20, 42, 0.85);
    --bg-panel-solid: #0c142a;
    --cyan-glow: #00f0ff;
    --blue-core: #2563eb;
    --gold-rank: #fbbf24;
    --purple-myth: #a855f7;
    --emerald-ok: #10b981;
    --crimson-alert: #f43f5e;
    --text-main: #f1f5f9;
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
      radial-gradient(circle at 15% 15%, rgba(0, 240, 255, 0.12) 0%, transparent 40%),
      radial-gradient(circle at 85% 80%, rgba(168, 85, 247, 0.14) 0%, transparent 45%),
      linear-gradient(180deg, #050814 0%, #091128 100%);
    color: var(--text-main);
    font-family: 'Rajdhani', -apple-system, BlinkMacSystemFont, sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .font-hud {
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 0.06em;
  }

  .sys-container {
    max-width: 960px;
    margin: 0 auto;
    padding: 16px 14px 90px;
  }

  .sys-window {
    background: var(--bg-panel);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(0, 240, 255, 0.32);
    box-shadow:
      0 0 24px rgba(0, 240, 255, 0.08),
      inset 0 0 20px rgba(0, 240, 255, 0.04);
    border-radius: 16px;
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

  .sys-window-gold {
    border-color: rgba(251, 191, 36, 0.45);
    box-shadow: 0 0 28px rgba(251, 191, 36, 0.12);
  }

  .sys-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 18px;
    border-radius: 10px;
    font-family: 'Orbitron', sans-serif;
    font-size: 12px;
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
    background: linear-gradient(135deg, #0284c7 0%, #00f0ff 100%);
    color: #030712;
    box-shadow: 0 0 18px rgba(0, 240, 255, 0.4);
  }

  .sys-btn-gold {
    background: linear-gradient(135deg, #d97706 0%, #fbbf24 100%);
    color: #030712;
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.45);
  }

  .sys-btn-ghost {
    background: rgba(15, 23, 42, 0.8);
    border-color: rgba(148, 163, 184, 0.3);
    color: var(--text-main);
  }

  .sys-btn-danger {
    background: rgba(244, 63, 94, 0.15);
    border-color: rgba(244, 63, 94, 0.5);
    color: #fda4af;
  }

  .sys-btn-success {
    background: rgba(16, 185, 129, 0.18);
    border-color: rgba(16, 185, 129, 0.6);
    color: #6ee7b7;
  }

  .sys-input, .sys-select, .sys-textarea {
    width: 100%;
    background: rgba(5, 8, 20, 0.85);
    border: 1px solid rgba(0, 240, 255, 0.28);
    border-radius: 10px;
    padding: 11px 14px;
    color: #fff;
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

  .nav-tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 18px;
  }

  @media (min-width: 720px) {
    .nav-tabs {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  .nav-tab {
    background: rgba(12, 20, 42, 0.7);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 12px;
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
    background: linear-gradient(180deg, rgba(0, 240, 255, 0.18) 0%, rgba(12, 20, 42, 0.95) 100%);
    border-color: var(--cyan-glow);
    color: #fff;
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.25);
  }

  .progress-track {
    width: 100%;
    height: 10px;
    background: rgba(5, 8, 20, 0.9);
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
    background: rgba(5, 12, 30, 0.96);
    border: 1px solid var(--cyan-glow);
    box-shadow: 0 0 25px rgba(0, 240, 255, 0.45);
    padding: 12px 20px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 14px;
    color: #fff;
    max-width: 92vw;
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translate(-50%, -20px); }
    to { opacity: 1; transform: translate(-50%, 0); }
  }

  @keyframes pulseGlow {
    0%, 100% { filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.5)); }
    50% { filter: drop-shadow(0 0 14px rgba(251, 191, 36, 0.75)); }
  }

  .animate-pulse-glow {
    animation: pulseGlow 3s infinite ease-in-out;
  }
`;

// ============================================================================
// DATOS DEL SISTEMA: 15 RANGOS x 6 DIVISIONES, GRADOS F->EX Y RAZAS/CLASES
// ============================================================================
const RANKS = [
  { name: 'Tierra', tier: 0, color: '#a16207', armorColor: '#78350f', trimColor: '#d97706', weaponTier: 1 },
  { name: 'Madera', tier: 1, color: '#65a30d', armorColor: '#3f6212', trimColor: '#84cc16', weaponTier: 1 },
  { name: 'Piedra', tier: 2, color: '#64748b', armorColor: '#334155', trimColor: '#94a3b8', weaponTier: 1 },
  { name: 'Carbón', tier: 3, color: '#374151', armorColor: '#1f2937', trimColor: '#6b7280', weaponTier: 2 },
  { name: 'Hierro', tier: 4, color: '#9ca3af', armorColor: '#4b5563', trimColor: '#e5e7eb', weaponTier: 2 },
  { name: 'Bronce', tier: 5, color: '#ea580c', armorColor: '#9a3412', trimColor: '#fb923c', weaponTier: 2 },
  { name: 'Plata', tier: 6, color: '#cbd5e1', armorColor: '#475569', trimColor: '#f8fafc', weaponTier: 3 },
  { name: 'Oro', tier: 7, color: '#eab308', armorColor: '#854d0e', trimColor: '#fde047', weaponTier: 3 },
  { name: 'Platino', tier: 8, color: '#14b8a6', armorColor: '#115e59', trimColor: '#5eead4', weaponTier: 3 },
  { name: 'Esmeralda', tier: 9, color: '#10b981', armorColor: '#065f46', trimColor: '#6ee7b7', weaponTier: 4 },
  { name: 'Diamante', tier: 10, color: '#38bdf8', armorColor: '#075985', trimColor: '#7dd3fc', weaponTier: 4 },
  { name: 'Especialista', tier: 11, color: '#8b5cf6', armorColor: '#4c1d95', trimColor: '#c4b5fd', weaponTier: 4 },
  { name: 'Maestro', tier: 12, color: '#d946ef', armorColor: '#701a75', trimColor: '#f0abfc', weaponTier: 5 },
  { name: 'Jefe Maestro', tier: 13, color: '#f43f5e', armorColor: '#881337', trimColor: '#fda4af', weaponTier: 5 },
  { name: 'Challenger', tier: 14, color: '#fbbf24', armorColor: '#1e1b4b', trimColor: '#00f0ff', weaponTier: 5 },
];

const PHYSICAL_GRADES = ['F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS', 'EX'];

const RACES_POOL = [
  { id: 'saiyan', name: 'Guerrero Saiyajin', trait: 'Zenkai: +15% progresión tras superar fallos', hairStyle: 'spiky', hairColor: '#111827', skin: '#f1c29b', horns: false, ears: 'human', halo: false },
  { id: 'demon', name: 'Señor Demoníaco Carmesí', trait: 'Furia Abisal: Potencia máxima en cargas pesadas', hairStyle: 'wild', hairColor: '#e11d48', skin: '#e2b49a', horns: true, ears: 'pointed', halo: false },
  { id: 'valkyrie', name: 'Heroína Astral / Valkiria', trait: 'Gracia Estelar: Recuperación acelerada', hairStyle: 'twin', hairColor: '#fde047', skin: '#ffe0bd', horns: false, ears: 'human', halo: true },
  { id: 'beastkin', name: 'Semi-Humano Berserker (Tanuki/Lobo)', trait: 'Instinto Salvaje: Agilidad y resistencia explosiva', hairStyle: 'medium', hairColor: '#92400e', skin: '#f5cba7', horns: false, ears: 'beast', halo: false },
  { id: 'celestial', name: 'Inmortal Celestial', trait: 'Cuerpo de Jade: Densidad muscular superior', hairStyle: 'long', hairColor: '#e0f2fe', skin: '#fad7b8', horns: false, ears: 'pointed', halo: true },
  { id: 'human_awakened', name: 'Humano Despertado (Monarca)', trait: 'Voluntad Inquebrantable: Sin límite de rango', hairStyle: 'messy', hairColor: '#0f172a', skin: '#eab68c', horns: false, ears: 'human', halo: false },
];

const CLASSES_POOL = [
  { id: 'martial_artist', name: 'Artista Marcial de Puño Dragón', weapon: 'gauntlets', desc: 'Combate cuerpo a cuerpo puro con guanteletes reforzados.' },
  { id: 'sword_saint', name: 'Espadachín Espiritual', weapon: 'sword', desc: 'Precisión letal y control total de la postura.' },
  { id: 'dragon_lancer', name: 'Lancero Celestial', weapon: 'spear', desc: 'Alcance implacable y potencia explosiva en tren inferior.' },
  { id: 'staff_monk', name: 'Monje del Bastón Sagrado', weapon: 'staff', desc: 'Equilibrio absoluto, movilidad y resistencia funcional.' },
  { id: 'titan_vanguard', name: 'Vanguardia Titán', weapon: 'greatsword', desc: 'Fuerza bruta imparable capaz de levantar toneladas.' },
];

const MOTIVATIONAL_QUOTES = [
  '«El dolor de hoy es el rango EX de mañana. ¡No te detengas, Cazador!»',
  '«Cada repetición que otros abandonan es un peldaño hacia Challenger 1.»',
  '«Tu cuerpo es el único templo y la única armadura que llevarás toda tu vida.»',
  '«El Sistema no regala rangos: los forja con tu disciplina diaria.»',
];

function getRankFromLP(lp) {
  const safeLP = Math.max(0, Math.min(8999, lp));
  const totalDivisions = Math.floor(safeLP / 100); // 0 to 89
  const rankIndex = Math.min(14, Math.floor(totalDivisions / 6));
  const divInRank = 6 - (totalDivisions % 6); // 6 down to 1
  const currentDivLP = safeLP % 100;
  return {
    ...RANKS[rankIndex],
    division: divInRank,
    label: `${RANKS[rankIndex].name} ${divInRank}`,
    currentDivLP,
    totalLP: safeLP,
  };
}

// ============================================================================
// COMPONENTE AVATAR ANIME 2D EVOLUTIVO (CEL-SHADING LIMPIO SIN AURA DE KI)
// ============================================================================
function AnimeHunterAvatar({ hunterClass, rankInfo, physicalGrade }) {
  const gradeIdx = PHYSICAL_GRADES.indexOf(physicalGrade); // 0 (F) to 9 (EX)
  const tier = rankInfo.tier; // 0 (Tierra) to 14 (Challenger)

  // Escala muscular según grado físico (F -> EX) y rango
  const shoulderW = 34 + gradeIdx * 1.6 + tier * 0.4;
  const chestW = 24 + gradeIdx * 1.1;
  const waistW = 16 + gradeIdx * 0.45;
  const armThick = 8.5 + gradeIdx * 0.65;
  const legThick = 10.5 + gradeIdx * 0.65;

  const race = hunterClass?.race || RACES_POOL[5];
  const cls = hunterClass?.cls || CLASSES_POOL[0];
  const weaponTier = rankInfo.weaponTier || 1;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'radial-gradient(circle at 50% 35%, rgba(0,240,255,0.14) 0%, rgba(5,8,20,0.95) 75%)',
      border: `1px solid ${rankInfo.color}`,
      borderRadius: '16px',
      padding: '16px 12px',
      position: 'relative'
    }}>
      {/* Etiqueta de Clase y Rango */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '8px' }}>
        <span className="sys-badge" style={{ background: 'rgba(0,240,255,0.15)', color: '#00f0ff', border: '1px solid rgba(0,240,255,0.4)' }}>
          {race.name}
        </span>
        <span className="sys-badge" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.4)' }}>
          FÍSICO {physicalGrade}
        </span>
      </div>

      {/* SVG ANIME 2D CEL-SHADING (SIN AURA DE KI) */}
      <svg viewBox="0 0 240 310" width="215" height="275" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="armorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={rankInfo.trimColor} />
            <stop offset="55%" stopColor={rankInfo.armorColor} />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={race.skin} />
            <stop offset="75%" stopColor={race.skin} />
            <stop offset="100%" stopColor="#c68b63" />
          </linearGradient>
          <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor={rankInfo.trimColor} />
            <stop offset="100%" stopColor={rankInfo.color} />
          </linearGradient>
        </defs>

        {/* Plataforma Holográfica de Base */}
        <ellipse cx="120" cy="292" rx="68" ry="11" fill="rgba(0, 240, 255, 0.12)" stroke={rankInfo.color} strokeWidth="1.5" />
        <ellipse cx="120" cy="292" rx="46" ry="6" fill="none" stroke="rgba(255,255,255,0.25)" strokeDasharray="4 4" />

        {/* Halo Celestial si la raza lo posee */}
        {race.halo && (
          <ellipse cx="120" cy="22" rx="22" ry="5" fill="none" stroke="#fde047" strokeWidth="2.5" />
        )}

        {/* ARMA DE CLASE (EVOLUCIONA CON EL RANGO) */}
        {cls.weapon === 'sword' && (
          <g transform="translate(174, 82) rotate(14)">
            <rect x="-3" y="95" width="6" height="26" rx="2" fill="#1e293b" stroke="#94a3b8" />
            <rect x="-14" y="91" width="28" height="6" rx="2" fill={rankInfo.trimColor} />
            <polygon points={`0,${15 - weaponTier * 6} -${5 + weaponTier},91 ${5 + weaponTier},91`} fill="url(#bladeGrad)" stroke="#0f172a" strokeWidth="1.2" />
          </g>
        )}

        {cls.weapon === 'greatsword' && (
          <g transform="translate(178, 70) rotate(16)">
            <rect x="-4" y="110" width="8" height="32" rx="2" fill="#0f172a" stroke={rankInfo.trimColor} />
            <polygon points="-20,104 20,104 14,112 -14,112" fill={rankInfo.trimColor} />
            <polygon points={`0,${5 - weaponTier * 5} -${11 + weaponTier * 1.5},104 ${11 + weaponTier * 1.5},104`} fill="url(#bladeGrad)" stroke="#0f172a" strokeWidth="1.5" />
          </g>
        )}

        {cls.weapon === 'spear' && (
          <g transform="translate(178, 35) rotate(8)">
            <rect x="-2.5" y="45" width="5" height="215" fill="#475569" stroke="#0f172a" />
            <polygon points={`0,${10 - weaponTier * 4} -${7 + weaponTier},48 ${7 + weaponTier},48`} fill="url(#bladeGrad)" stroke="#0f172a" strokeWidth="1.2" />
          </g>
        )}

        {cls.weapon === 'staff' && (
          <g transform="translate(176, 42) rotate(7)">
            <rect x="-3.5" y="25" width="7" height="230" rx="3" fill="#78350f" stroke="#fbbf24" strokeWidth="1.2" />
            <circle cx="0" cy="22" r={5 + weaponTier} fill={rankInfo.trimColor} stroke="#fff" strokeWidth="1.2" />
          </g>
        )}

        {/* PIERNAS Y BOTAS DE COMBATE */}
        <path
          d={`M ${120 - waistW * 0.7} 166 L ${106 - legThick * 0.5} 230 L ${102 - legThick * 0.4} 285 L ${106 + legThick * 0.6} 285 L ${118} 230 L ${120} 178 Z`}
          fill="#111827"
          stroke="#050814"
          strokeWidth="1.5"
        />
        <path
          d={`M ${120 + waistW * 0.7} 166 L ${134 + legThick * 0.5} 230 L ${138 + legThick * 0.4} 285 L ${134 - legThick * 0.6} 285 L ${122} 230 L ${120} 178 Z`}
          fill="#111827"
          stroke="#050814"
          strokeWidth="1.5"
        />
        {/* Grebas / Botas blindadas según rango */}
        <path d={`M ${101 - legThick * 0.4} 242 L ${106 + legThick * 0.6} 242 L ${107 + legThick * 0.6} 288 L ${97 - legThick * 0.4} 288 Z`} fill="url(#armorGrad)" stroke="#050814" strokeWidth="1.4" />
        <path d={`M ${139 + legThick * 0.4} 242 L ${134 - legThick * 0.6} 242 L ${133 - legThick * 0.6} 288 L ${143 + legThick * 0.4} 288 Z`} fill="url(#armorGrad)" stroke="#050814" strokeWidth="1.4" />

        {/* TORSO ANATÓMICO Y ARMADURA EVOLUTIVA */}
        <path
          d={`M ${120 - shoulderW} 94 Q 120 88 ${120 + shoulderW} 94 L ${120 + chestW} 134 L ${120 + waistW} 170 L ${120 - waistW} 170 L ${120 - chestW} 134 Z`}
          fill={tier >= 4 ? 'url(#armorGrad)' : 'url(#skinGrad)'}
          stroke="#050814"
          strokeWidth="1.8"
        />
        {/* Detalles de pectorales / placas del pecho */}
        <path
          d={`M ${120 - chestW * 0.85} 106 Q 120 116 120 124 Q 120 116 ${120 + chestW * 0.85} 106`}
          fill="none"
          stroke={tier >= 4 ? rankInfo.trimColor : '#b57b52'}
          strokeWidth="1.8"
        />
        {/* Cinturón de Rango */}
        <rect x={120 - waistW} y="162" width={waistW * 2} height="9" rx="2" fill={rankInfo.trimColor} stroke="#050814" strokeWidth="1.3" />

        {/* HOMBRERAS (APARECEN DESDE RANGO BRONCE / PLATA) */}
        {tier >= 5 && (
          <>
            <path d={`M ${120 - shoulderW - 6} 92 Q ${120 - shoulderW + 6} 80 ${120 - shoulderW + 18} 96 L ${120 - shoulderW - 2} 112 Z`} fill="url(#armorGrad)" stroke={rankInfo.trimColor} strokeWidth="1.5" />
            <path d={`M ${120 + shoulderW + 6} 92 Q ${120 + shoulderW - 6} 80 ${120 + shoulderW - 18} 96 L ${120 + shoulderW + 2} 112 Z`} fill="url(#armorGrad)" stroke={rankInfo.trimColor} strokeWidth="1.5" />
          </>
        )}

        {/* BRAZOS CON VOLUMEN MUSCULAR */}
        <path
          d={`M ${120 - shoulderW + 2} 96 Q ${120 - shoulderW - armThick} 122 ${120 - shoulderW - armThick * 0.5} 145 L ${120 - shoulderW + 4} 172 L ${120 - shoulderW + 13} 170 L ${120 - shoulderW + 10} 142 Q ${120 - shoulderW + 12} 120 ${120 - shoulderW + 12} 104 Z`}
          fill="url(#skinGrad)"
          stroke="#050814"
          strokeWidth="1.5"
        />
        <path
          d={`M ${120 + shoulderW - 2} 96 Q ${120 + shoulderW + armThick} 122 ${120 + shoulderW + armThick * 0.5} 145 L ${120 + shoulderW - 4} 172 L ${120 + shoulderW - 13} 170 L ${120 + shoulderW - 10} 142 Q ${120 + shoulderW - 12} 120 ${120 + shoulderW - 12} 104 Z`}
          fill="url(#skinGrad)"
          stroke="#050814"
          strokeWidth="1.5"
        />

        {/* Guanteletes (más robustos si es Artista Marcial o rango alto) */}
        <rect x={120 - shoulderW - 1} y="152" width="14" height="22" rx="3" fill={cls.weapon === 'gauntlets' ? rankInfo.trimColor : rankInfo.armorColor} stroke="#050814" strokeWidth="1.4" />
        <rect x={120 + shoulderW - 13} y="152" width="14" height="22" rx="3" fill={cls.weapon === 'gauntlets' ? rankInfo.trimColor : rankInfo.armorColor} stroke="#050814" strokeWidth="1.4" />

        {/* CUELLO Y CABEZA ANIME ESTILIZADA */}
        <rect x="112" y="76" width="16" height="16" rx="4" fill="url(#skinGrad)" stroke="#050814" strokeWidth="1.4" />

        {/* Orejas de Bestia si la raza es Semi-Humana */}
        {race.ears === 'beast' && (
          <>
            <polygon points="98,46 92,24 110,38" fill={race.hairColor} stroke="#050814" strokeWidth="1.4" />
            <polygon points="142,46 148,24 130,38" fill={race.hairColor} stroke="#050814" strokeWidth="1.4" />
          </>
        )}

        {/* Cuernos Demoníacos si la raza es Demonio */}
        {race.horns && (
          <>
            <path d="M 102 44 Q 88 30 95 16 Q 104 28 108 40 Z" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="1.3" />
            <path d="M 138 44 Q 152 30 145 16 Q 136 28 132 40 Z" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="1.3" />
          </>
        )}

        {/* Rostro Anime (mentón afilado) */}
        <polygon points="101,44 139,44 137,68 120,81 103,68" fill="url(#skinGrad)" stroke="#050814" strokeWidth="1.6" />

        {/* Ojos Anime Expresivos con Brillo */}
        <polygon points="106,56 116,58 115,63 107,62" fill="#ffffff" stroke="#050814" strokeWidth="1" />
        <circle cx="112" cy="60" r="2.3" fill={rankInfo.color} />
        <circle cx="111" cy="59" r="0.9" fill="#ffffff" />

        <polygon points="134,56 124,58 125,63 133,62" fill="#ffffff" stroke="#050814" strokeWidth="1" />
        <circle cx="128" cy="60" r="2.3" fill={rankInfo.color} />
        <circle cx="127" cy="59" r="0.9" fill="#ffffff" />

        {/* Cejas determinadas y expresión */}
        <line x1="105" y1="53" x2="117" y2="56" stroke="#050814" strokeWidth="2" strokeLinecap="round" />
        <line x1="135" y1="53" x2="123" y2="56" stroke="#050814" strokeWidth="2" strokeLinecap="round" />
        <path d="M 115 71 Q 120 74 125 70" fill="none" stroke="#050814" strokeWidth="1.6" strokeLinecap="round" />

        {/* Cabello Anime */}
        {race.hairStyle === 'spiky' && (
          <polygon
            points="97,52 90,34 103,38 106,18 118,32 126,14 133,33 148,26 142,48 138,44 120,41 102,44"
            fill={race.hairColor}
            stroke="#050814"
            strokeWidth="1.6"
          />
        )}
        {race.hairStyle !== 'spiky' && (
          <path
            d="M 97 56 Q 96 26 120 24 Q 144 26 143 56 L 138 45 L 128 50 L 120 42 L 112 50 L 102 45 Z"
            fill={race.hairColor}
            stroke="#050814"
            strokeWidth="1.6"
          />
        )}
      </svg>

      {/* Pie de tarjeta del Avatar */}
      <div style={{ textAlign: 'center', marginTop: '6px' }}>
        <div className="font-hud" style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
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
  // Inyectar CSS autocontenido al montar
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = SYSTEM_CSS;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  // Estado persistente en localStorage
  const [awakened, setAwakened] = useState(() => localStorage.getItem('pex_awakened') === 'true');
  const [surveyStep, setSurveyStep] = useState(1);

  // Datos de la encuesta inicial única
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('pex_profile');
    return saved ? JSON.parse(saved) : {
      hunterName: 'CAZADOR_01',
      goal: 'Hipertrofia y Estética',
      environment: 'Gimnasio y Casa',
      experienceMonths: 8,
      age: 22,
      weightKg: 75,
      heightCm: 176,
      benchKg: 80,
      squatKg: 110,
      deadliftKg: 140,
      pushupsMax: 30,
      photoScanned: false,
      censoredPreview: null,
    };
  });

  // Clase asignada aleatoriamente por el Sistema (no elegible manualmente)
  const [hunterClass, setHunterClass] = useState(() => {
    const saved = localStorage.getItem('pex_class');
    return saved ? JSON.parse(saved) : null;
  });

  // Progreso competitivo, retos, sueño y evaluaciones
  const [lp, setLp] = useState(() => Number(localStorage.getItem('pex_lp') || 1840)); // Piedra 1 / Carbón
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('pex_streak') || 5));
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

  // Fuerza F -> EX
  const [liftInput, setLiftInput] = useState({ weight: 85, reps: 5, exercise: 'Press Banca' });

  // Bóveda Física Trimestral (90 días)
  const [daysUntilEval, setDaysUntilEval] = useState(64);
  const [physicalGrade, setPhysicalGrade] = useState('B');
  const [vaultPhotos, setVaultPhotos] = useState({ front: null, back: null });
  const [yearlyRecap] = useState([
    { quarter: 'Q1 (Inicio)', grade: 'D', weight: '71 kg', note: 'Despertar del Sistema. Base estructural.' },
    { quarter: 'Q2 (3 Meses)', grade: 'C', weight: '73.5 kg', note: '+18% fuerza en básicos y mejora postural.' },
    { quarter: 'Q3 (Actual)', grade: 'B', weight: '75 kg', note: 'Definición escapular y densidad muscular.' },
  ]);

  // Rutinas y Escáner
  const [routineEnv, setRoutineEnv] = useState('Gimnasio');
  const [customRoutineText, setCustomRoutineText] = useState('');
  const [scanReport, setScanReport] = useState(null);

  // Sueño semanal (49 - 63h recomendado)
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

  // Guardar estado automáticamente
  useEffect(() => {
    localStorage.setItem('pex_awakened', String(awakened));
    localStorage.setItem('pex_profile', JSON.stringify(profile));
    if (hunterClass) localStorage.setItem('pex_class', JSON.stringify(hunterClass));
    localStorage.setItem('pex_lp', String(lp));
    localStorage.setItem('pex_streak', String(streak));
  }, [awakened, profile, hunterClass, lp, streak]);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3600);
  };

  // Procesador de foto con censura facial automática en Canvas
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

        // Censura biométrica automática sobre la zona superior (rostro)
        ctx.fillStyle = '#050814';
        ctx.fillRect(65, 12, 110, 58);
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(65, 12, 110, 58);
        ctx.fillStyle = '#00f0ff';
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

  // Algoritmo de Asignación Aleatoria Ponderada de Clase y Raza
  const awakenHunter = () => {
    const seed =
      Number(profile.weightKg) * 7 +
      Number(profile.heightCm) * 3 +
      Number(profile.benchKg || profile.pushupsMax) * 11 +
      Math.floor(Math.random() * 997);

    const chosenRace = RACES_POOL[seed % RACES_POOL.length];
    const chosenCls = CLASSES_POOL[(seed * 3 + Math.floor(Math.random() * 5)) % CLASSES_POOL.length];

    // LP inicial calibrado según experiencia y fuerza declarada
    const baseLP = Math.min(2400, 300 + Number(profile.experienceMonths) * 65 + Number(profile.benchKg) * 4);
    const assigned = { race: chosenRace, cls: chosenCls, assignedAt: new Date().toLocaleDateString() };

    setHunterClass(assigned);
    setLp(baseLP);
    setAwakened(true);
    triggerToast(`¡DESPERTAR COMPLETADO! Clase asignada: ${chosenRace.name} - ${chosenCls.name}`);
  };

  const rankInfo = getRankFromLP(lp);
  const totalSleep = sleepLog.reduce((acc, d) => acc + d.hours, 0);
  const sleepOptimal = totalSleep >= 49 && totalSleep <= 63;

  // Cálculos científicos de Fuerza (Epley 1RM + Relativa)
  const est1RM = Math.round(liftInput.weight * (1 + liftInput.reps / 30));
  const relRatio = (est1RM / Math.max(40, Number(profile.weightKg))).toFixed(2);
  const getStrengthGrade = (ratio) => {
    const r = Number(ratio);
    if (r >= 2.6) return 'EX';
    if (r >= 2.3) return 'SSS';
    if (r >= 2.05) return 'SS';
    if (r >= 1.8) return 'S';
    if (r >= 1.55) return 'A';
    if (r >= 1.3) return 'B';
    if (r >= 1.05) return 'C';
    if (r >= 0.85) return 'D';
    if (r >= 0.65) return 'E';
    return 'F';
  };
  const strengthGrade = getStrengthGrade(relRatio);

  // ==========================================================================
  // PANTALLA 1: ENCUESTA ÚNICA DE DESPERTAR (SOLO PRIMERA VEZ)
  // ==========================================================================
  if (!awakened) {
    return (
      <div className="sys-container" style={{ maxWidth: '560px', paddingTop: '28px' }}>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        {toast && (
          <div className="toast-alert">
            <Sparkles size={18} color="#00f0ff" />
            <span>{toast}</span>
          </div>
        )}

        <div className="sys-window" style={{ padding: '24px 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span className="sys-badge" style={{ background: 'rgba(0,240,255,0.15)', color: '#00f0ff', border: '1px solid #00f0ff' }}>
              [ALERTA DEL SISTEMA // DIAGNÓSTICO ÚNICO]
            </span>
            <h1 className="font-hud" style={{ fontSize: '24px', marginTop: '10px', color: '#fff' }}>
              PROTOCOLO EX
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
              Paso {surveyStep} de 4 — Calibración biométrica del aspirante
            </p>
            <div className="progress-track" style={{ marginTop: '12px' }}>
              <div className="progress-fill" style={{ width: `${surveyStep * 25}%`, background: 'linear-gradient(90deg, #00f0ff, #fbbf24)' }} />
            </div>
          </div>

          {surveyStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>NOMBRE CLAVE DEL CAZADOR</label>
                <input
                  className="sys-input"
                  value={profile.hunterName}
                  onChange={(e) => setProfile({ ...profile, hunterName: e.target.value.toUpperCase() })}
                  placeholder="Ej. SUNG_JINWOO"
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>OBJETIVO PRINCIPAL</label>
                <select
                  className="sys-select"
                  value={profile.goal}
                  onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                >
                  <option>Hipertrofia y Estética</option>
                  <option>Fuerza Máxima (Powerlifting)</option>
                  <option>Definición y Recomposición</option>
                  <option>Resistencia y Calistenia</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>ENTORNO DE ENTRENAMIENTO</label>
                <select
                  className="sys-select"
                  value={profile.environment}
                  onChange={(e) => setProfile({ ...profile, environment: e.target.value })}
                >
                  <option>Gimnasio Completo</option>
                  <option>Entrenamiento en Casa</option>
                  <option>Gimnasio y Casa (Híbrido)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>TIEMPO ENTRENANDO (MESES)</label>
                <input
                  type="number"
                  className="sys-input"
                  value={profile.experienceMonths}
                  onChange={(e) => setProfile({ ...profile, experienceMonths: e.target.value })}
                />
              </div>
              <button className="sys-btn sys-btn-primary" style={{ marginTop: '8px' }} onClick={() => setSurveyStep(2)}>
                SIGUIENTE FASE <ChevronRight size={16} />
              </button>
            </div>
          )}

          {surveyStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>EDAD (AÑOS)</label>
                  <input type="number" className="sys-input" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>PESO CORPORAL (KG)</label>
                  <input type="number" className="sys-input" value={profile.weightKg} onChange={(e) => setProfile({ ...profile, weightKg: e.target.value })} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>ALTURA (CM)</label>
                <input type="number" className="sys-input" value={profile.heightCm} onChange={(e) => setProfile({ ...profile, heightCm: e.target.value })} />
              </div>

              {profile.environment !== 'Entrenamiento en Casa' ? (
                <div className="grid-2">
                  <div>
                    <label style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>PRESS BANCA (KG)</label>
                    <input type="number" className="sys-input" value={profile.benchKg} onChange={(e) => setProfile({ ...profile, benchKg: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>SENTADILLA / P. MUERTO (KG)</label>
                    <input type="number" className="sys-input" value={profile.squatKg} onChange={(e) => setProfile({ ...profile, squatKg: e.target.value })} />
                  </div>
                </div>
              ) : (
                <div>
                  <label style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>MÁXIMO DE FLEXIONES SEGUIDAS (CASA)</label>
                  <input type="number" className="sys-input" value={profile.pushupsMax} onChange={(e) => setProfile({ ...profile, pushupsMax: e.target.value })} />
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button className="sys-btn sys-btn-ghost" onClick={() => setSurveyStep(1)}>ATRÁS</button>
                <button className="sys-btn sys-btn-primary" style={{ flex: 1 }} onClick={() => setSurveyStep(3)}>
                  ESCANEO CORPORAL <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {surveyStep === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#cbd5e1' }}>
                Subí una foto de cuerpo completo para calcular tu biotipo y asignar tu <strong>Clase y Raza aleatoria</strong>. El Sistema censura tu rostro automáticamente antes de procesarla.
              </p>

              <label style={{
                border: '2px dashed rgba(0,240,255,0.45)',
                borderRadius: '14px',
                padding: '22px 14px',
                cursor: 'pointer',
                background: 'rgba(0,240,255,0.05)'
              }}>
                <Camera size={32} color="#00f0ff" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontWeight: 700, color: '#fff' }}>SELECCIONAR FOTO DE CUERPO COMPLETO</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Censura facial local instantánea</div>
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleSecurePhotoUpload(e, 'onboarding')} />
              </label>

              {profile.censoredPreview && (
                <div style={{ margin: '0 auto' }}>
                  <img src={profile.censoredPreview} alt="Escaneo seguro" style={{ width: '130px', borderRadius: '10px', border: '1px solid #00f0ff' }} />
                  <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>✓ Biometría verificada y protegida</div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button className="sys-btn sys-btn-ghost" onClick={() => setSurveyStep(2)}>ATRÁS</button>
                <button className="sys-btn sys-btn-primary" style={{ flex: 1 }} onClick={() => setSurveyStep(4)}>
                  CONTINUAR AL DESPERTAR <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {surveyStep === 4 && (
            <div style={{ textAlign: 'center', padding: '14px 4px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <Shield size={54} color="#fbbf24" className="animate-pulse-glow" style={{ margin: '0 auto' }} />
              <h2 className="font-hud" style={{ fontSize: '21px', color: '#fbbf24', lineHeight: 1.3 }}>
                ¿ESTÁS LISTO PARA CONVERTIRTE EN CAZADOR?
              </h2>
              <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5 }}>
                Una vez aceptes, el Sistema te otorgará una <strong>Raza y Clase aleatoria</strong> acorde a tus atributos reales. No podrás cambiarla: solo hacerla evolucionar desde <strong>Tierra 6</strong> hasta <strong>Challenger 1</strong>.
              </p>
              <button className="sys-btn sys-btn-gold" style={{ padding: '16px', fontSize: '14px' }} onClick={awakenHunter}>
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
          <Zap size={18} color="#fbbf24" />
          <span>{toast}</span>
        </div>
      )}

      {/* CABECERA HOLOGRÁFICA DE ESTADO */}
      <div className="sys-window" style={{ padding: '18px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="sys-badge" style={{ background: 'rgba(0,240,255,0.16)', color: '#00f0ff', border: '1px solid #00f0ff' }}>
                SISTEMA ACTIVO
              </span>
              <span className="sys-badge" style={{ background: 'rgba(249,115,22,0.2)', color: '#fdba74', border: '1px solid #f97316' }}>
                <Flame size={13} /> RACHA {streak} DÍAS
              </span>
            </div>
            <h1 className="font-hud" style={{ fontSize: '22px', marginTop: '6px', color: '#fff' }}>
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

        {/* Barra de Progreso de División (1 a 6) */}
        <div className="progress-track" style={{ marginTop: '12px' }}>
          <div
            className="progress-fill"
            style={{
              width: `${rankInfo.currentDivLP}%`,
              background: `linear-gradient(90deg, ${rankInfo.color}, #00f0ff)`
            }}
          />
        </div>

        {/* Banner Motivacional Dinámico */}
        <div style={{
          marginTop: '12px',
          padding: '8px 12px',
          borderRadius: '8px',
          background: 'rgba(0, 240, 255, 0.06)',
          borderLeft: '3px solid #00f0ff',
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
          <Trophy size={18} color="#fbbf24" />
          <span>Retos & Rangos</span>
        </button>
        <button className={`nav-tab ${activeTab === 'avatar' ? 'active' : ''}`} onClick={() => setActiveTab('avatar')}>
          <Sword size={18} color="#00f0ff" />
          <span>Clase & Avatar</span>
        </button>
        <button className={`nav-tab ${activeTab === 'strength' ? 'active' : ''}`} onClick={() => setActiveTab('strength')}>
          <Dumbbell size={18} color="#f43f5e" />
          <span>Fuerza F→EX</span>
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
            <h2 className="font-hud" style={{ fontSize: '15px', color: '#00f0ff', marginBottom: '12px' }}>
              MISIONES DIARIAS DECLARADAS
            </h2>

            {/* Agregar reto declarado */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                className="sys-input"
                placeholder="Declarar reto de hoy (ej. Sentadilla 4x6 con 120 kg)..."
                value={newQuestTitle}
                onChange={(e) => setNewQuestTitle(e.target.value)}
              />
              <button
                className="sys-btn sys-btn-primary"
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

            {/* Lista de misiones */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quests.map((q) => (
                <div
                  key={q.id}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: 'rgba(5, 8, 20, 0.75)',
                    border: `1px solid ${q.status === 'completed' ? '#10b981' : q.status === 'failed' ? '#f43f5e' : 'rgba(148,163,184,0.25)'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: '#fff' }}>{q.title}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>Entorno: {q.env} • Recompensa: +{q.lp} LP</div>
                    </div>
                    <span className="sys-badge" style={{
                      background: q.status === 'completed' ? 'rgba(16,185,129,0.2)' : q.status === 'failed' ? 'rgba(244,63,94,0.2)' : 'rgba(251,191,36,0.15)',
                      color: q.status === 'completed' ? '#6ee7b7' : q.status === 'failed' ? '#fda4af' : '#fbbf24'
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
                          setQuests(quests.map((item) => item.id === q.id ? { ...item, status: 'completed' } : item));
                          setLp((prev) => prev + q.lp);
                          setStreak((s) => s + 1);
                          triggerToast(`¡MISIÓN CUMPLIDA! +${q.lp} LP obtenidos.`);
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

            {/* Modal inline de Justificación de Imprevisto */}
            {justifyModalId && (
              <div style={{
                marginTop: '14px',
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(14, 116, 144, 0.25)',
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

          {/* Cola de Retoma Próxima Semana + Simulador de Ascenso */}
          <div className="grid-2">
            <div className="sys-window" style={{ padding: '16px' }}>
              <h3 className="font-hud" style={{ fontSize: '13px', color: '#f43f5e', marginBottom: '10px' }}>
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
              <h3 className="font-hud" style={{ fontSize: '13px', color: '#fbbf24', marginBottom: '10px' }}>
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
          MÓDULO 2: AVATAR ANIME 2D EVOLUTIVO Y CLASE ALEATORIA
         ==================================================================== */}
      {activeTab === 'avatar' && (
        <div className="grid-2">
          <AnimeHunterAvatar hunterClass={hunterClass} rankInfo={rankInfo} physicalGrade={physicalGrade} />

          <div className="sys-window" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 className="font-hud" style={{ fontSize: '15px', color: '#00f0ff' }}>
              FICHA DE CAZADOR Y EVOLUCIÓN
            </h2>
            <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>
              Tu clase fue sellada por el Sistema tras analizar tu foto y tus marcas reales. No puede elegirse manualmente, pero tu avatar gana masa muscular, armadura y armas legendarias conforme ascendés de rango.
            </p>

            <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(5,8,20,0.8)', border: '1px solid rgba(0,240,255,0.2)' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>RAZA ASIGNADA</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>{hunterClass?.race?.name}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>CLASE DE COMBATE</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#fbbf24' }}>{hunterClass?.cls?.name}</div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px' }}>{hunterClass?.cls?.desc}</div>
            </div>

            <div>
              <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>PREVISUALIZAR EVOLUCIÓN DE GRADO FÍSICO (F → EX)</label>
              <select
                className="sys-select"
                value={physicalGrade}
                onChange={(e) => setPhysicalGrade(e.target.value)}
                style={{ marginTop: '6px' }}
              >
                {PHYSICAL_GRADES.map((g) => (
                  <option key={g} value={g}>Grado Físico {g}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 3: CLASIFICACIÓN CIENTÍFICA DE FUERZA ABSOLUTA Y RELATIVA
         ==================================================================== */}
      {activeTab === 'strength' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '15px', color: '#f43f5e', marginBottom: '12px' }}>
            ANÁLISIS BIOMECÁNICO DE FUERZA (GRADOS F A EX)
          </h2>
          <div className="grid-2" style={{ marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#94a3b8' }}>EJERCICIO BASE</label>
              <select className="sys-select" value={liftInput.exercise} onChange={(e) => setLiftInput({ ...liftInput, exercise: e.target.value })}>
                <option>Press Banca</option>
                <option>Sentadilla Trasera</option>
                <option>Peso Muerto Convencional</option>
                <option>Dominadas Lastradas (Peso Corp. + Lastre)</option>
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#94a3b8' }}>CARGA (KG)</label>
                <input type="number" className="sys-input" value={liftInput.weight} onChange={(e) => setLiftInput({ ...liftInput, weight: Number(e.target.value) })} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#94a3b8' }}>REPS</label>
                <input type="number" className="sys-input" value={liftInput.reps} onChange={(e) => setLiftInput({ ...liftInput, reps: Number(e.target.value) })} />
              </div>
            </div>
          </div>

          <div className="grid-2">
            <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(5,8,20,0.85)', border: '1px solid #f43f5e' }}>
              <div style={{ fontSize: '12px', color: '#fda4af' }}>FUERZA ABSOLUTA (1RM ESTIMADO EPLEY)</div>
              <div className="font-hud" style={{ fontSize: '28px', fontWeight: 900, color: '#fff', margin: '4px 0' }}>
                {est1RM} KG
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                Rango Absoluto: <strong style={{ color: '#fbbf24' }}>GRADO {est1RM >= 180 ? 'EX' : est1RM >= 140 ? 'S' : est1RM >= 100 ? 'B' : 'D'}</strong>
              </div>
            </div>

            <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(5,8,20,0.85)', border: '1px solid #00f0ff' }}>
              <div style={{ fontSize: '12px', color: '#7dd3fc' }}>FUERZA RELATIVA ({profile.weightKg} KG CORPORAL)</div>
              <div className="font-hud" style={{ fontSize: '28px', fontWeight: 900, color: '#00f0ff', margin: '4px 0' }}>
                {relRatio}x BW
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                Clasificación Científica: <strong style={{ color: '#00f0ff' }}>GRADO {strengthGrade}</strong>
              </div>
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
              <h2 className="font-hud" style={{ fontSize: '15px', color: '#a855f7' }}>
                BÓVEDA FÍSICA CIFRADA (RENOVACIÓN CADA 3 MESES)
              </h2>
              <span className="sys-badge" style={{ background: 'rgba(168,85,247,0.2)', color: '#d8b4fe', border: '1px solid #a855f7' }}>
                PRÓXIMA REVISIÓN EN {daysUntilEval} DÍAS
              </span>
            </div>

            <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '14px' }}>
              Subí fotos de frente y espalda. El algoritmo censura tu cara localmente en tu navegador y cifra las imágenes para evitar filtraciones o hackeos.
            </p>

            <div className="grid-2">
              {['front', 'back'].map((side) => (
                <div key={side} style={{ padding: '14px', borderRadius: '12px', background: 'rgba(5,8,20,0.85)', border: '1px dashed rgba(168,85,247,0.5)', textAlign: 'center' }}>
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

          {/* Recap Anual */}
          <div className="sys-window sys-window-gold" style={{ padding: '18px' }}>
            <h3 className="font-hud" style={{ fontSize: '14px', color: '#fbbf24', marginBottom: '10px' }}>
              RECOPILACIÓN ANUAL DE EVOLUCIÓN (Q1 → Q4)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {yearlyRecap.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '10px', background: 'rgba(5,8,20,0.75)' }}>
                  <div>
                    <strong style={{ color: '#fff' }}>{item.quarter}</strong> — <span style={{ color: '#94a3b8', fontSize: '13px' }}>{item.note}</span>
                  </div>
                  <span className="sys-badge" style={{ background: 'rgba(251,191,36,0.2)', color: '#fbbf24' }}>
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
              {routineEnv === 'Gimnasio' && (
                <>
                  <div style={{ padding: '10px', background: 'rgba(5,8,20,0.8)', borderRadius: '8px' }}>• <strong>Press Inclinado con Mancuernas:</strong> 3x8-10 (RIR 1-2, tensión en haz clavicular)</div>
                  <div style={{ padding: '10px', background: 'rgba(5,8,20,0.8)', borderRadius: '8px' }}>• <strong>Remo en Máquina con Apoyo Pecho:</strong> 3x10 (retracción escapular sin fatiga lumbar)</div>
                  <div style={{ padding: '10px', background: 'rgba(5,8,20,0.8)', borderRadius: '8px' }}>• <strong>Sentadilla Hack / Jaca:</strong> 3x8 (máxima flexión de rodilla controlada)</div>
                </>
              )}
              {routineEnv !== 'Gimnasio' && (
                <>
                  <div style={{ padding: '10px', background: 'rgba(5,8,20,0.8)', borderRadius: '8px' }}>• <strong>Flexiones en Déficit / Declinadas:</strong> 4x12-15 (pausa de 2s abajo)</div>
                  <div style={{ padding: '10px', background: 'rgba(5,8,20,0.8)', borderRadius: '8px' }}>• <strong>Sentadilla Búlgara Unilateral:</strong> 3x10 por pierna (alto estímulo glúteo/cuádriceps)</div>
                  <div style={{ padding: '10px', background: 'rgba(5,8,20,0.8)', borderRadius: '8px' }}>• <strong>Remo Invertido bajo Mesa / Barra:</strong> 4x12 (control excéntrico 3s)</div>
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
                <p style={{ marginTop: '4px', color: '#fbbf24' }}>Ajuste sugerido: {scanReport.fix}</p>
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
            <h2 className="font-hud" style={{ fontSize: '15px', color: '#38bdf8' }}>
              RECUPERACIÓN NEURAL Y ACUMULACIÓN DE SUEÑO
            </h2>
            <span className="sys-badge" style={{
              background: sleepOptimal ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)',
              color: sleepOptimal ? '#6ee7b7' : '#fda4af',
              border: `1px solid ${sleepOptimal ? '#10b981' : '#f43f5e'}`
            }}>
              ACUMULADO: {totalSleep}H / META CIENTÍFICA: 49–63H
            </span>
          </div>

          {!sleepOptimal && (
            <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(244,63,94,0.15)', border: '1px solid #f43f5e', marginBottom: '14px', fontSize: '13px', color: '#fecdd3' }}>
              <AlertTriangle size={15} style={{ display: 'inline', marginRight: '6px' }} />
              <strong>Deuda de sueño detectada:</strong> Dormir menos de 49 horas semanales reduce la síntesis proteica y la fuerza máxima hasta un 12%.
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '16px', textAlign: 'center' }}>
            {sleepLog.map((d, i) => (
              <div key={i} style={{ padding: '10px 4px', borderRadius: '10px', background: 'rgba(5,8,20,0.85)', border: '1px solid rgba(56,189,248,0.3)' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{d.day}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: d.hours >= 7 ? '#38bdf8' : '#f43f5e', marginTop: '4px' }}>
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
