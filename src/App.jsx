import React, { useState, useEffect, useRef } from 'react';
import {
  Flame, Trophy, Dumbbell, Moon, Camera, Sparkles, Shield,
  CheckCircle2, XCircle, CloudRain, Zap, Lock, EyeOff,
  Upload, Scan, Cpu, FileText, AlertTriangle,
  ChevronRight, Sword, Clock, Save, Check,
  UserCheck, Users, MapPin, Play, BookOpen, Plus, Crosshair,
  LogIn, KeyRound, Mail, UserPlus, Settings, Trash2,
  Heart, Building2, Send, RotateCcw, Image as ImageIcon
} from 'lucide-react';

// ============================================================================
// ESTILOS INTEGRADOS (LEGENDARY GACHA RPG HUD + NEON BLUE & GOLD LIGHTING)
// ============================================================================
const SYSTEM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800;900&family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&display=swap');

  :root {
    --bg-void: #03050c;
    --bg-panel: rgba(9, 14, 28, 0.94);
    --cyan-glow: #00f0ff;
    --gold-rank: #fbbf24;
    --gold-deep: #b45309;
    --crimson-vein: #be123c;
    --emerald-ok: #10b981;
    --rose-love: #fb7185;
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
      radial-gradient(circle at 18% 12%, rgba(0, 240, 255, 0.14) 0%, transparent 45%),
      radial-gradient(circle at 82% 85%, rgba(251, 191, 36, 0.12) 0%, transparent 48%),
      linear-gradient(180deg, #02040a 0%, #070c1b 100%);
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
    max-width: 980px;
    margin: 0 auto;
    padding: 14px 12px 96px;
  }

  .sys-window {
    background: var(--bg-panel);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(0, 240, 255, 0.28);
    box-shadow:
      0 10px 34px rgba(0, 0, 0, 0.8),
      inset 0 0 24px rgba(0, 240, 255, 0.06);
    border-radius: 14px;
    position: relative;
    overflow: hidden;
  }

  .sys-window::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold-rank), var(--cyan-glow), transparent);
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
    background: linear-gradient(135deg, #92400e 0%, #fbbf24 100%);
    color: #090d16;
    box-shadow: 0 0 18px rgba(251, 191, 36, 0.42);
  }

  .sys-btn-love {
    background: linear-gradient(135deg, #9f1239 0%, #fb7185 100%);
    color: #fff;
    box-shadow: 0 0 16px rgba(251, 113, 133, 0.35);
  }

  .sys-btn-ghost {
    background: rgba(15, 23, 42, 0.88);
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
    background: rgba(4, 6, 12, 0.92);
    border: 1px solid rgba(251, 191, 36, 0.32);
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
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.22);
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
    grid-template-columns: repeat(5, 1fr);
    gap: 7px;
    margin-bottom: 16px;
  }

  .nav-tab {
    background: rgba(11, 16, 32, 0.88);
    border: 1px solid rgba(56, 189, 248, 0.22);
    border-radius: 11px;
    padding: 9px 4px;
    color: var(--text-dim);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }

  .nav-tab.active {
    background: linear-gradient(180deg, rgba(251, 191, 36, 0.28) 0%, rgba(15, 23, 42, 0.96) 100%);
    border-color: #fbbf24;
    color: #fff;
    box-shadow: 0 0 18px rgba(251, 191, 36, 0.38), inset 0 0 12px rgba(251, 191, 36, 0.16);
  }

  .progress-track {
    width: 100%;
    height: 8px;
    background: rgba(4, 6, 12, 0.95);
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
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
    box-shadow: 0 0 24px rgba(251, 191, 36, 0.42);
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

  .gacha-card-outer {
    position: relative;
    border-radius: 20px;
    padding: 3px;
    background: linear-gradient(135deg, #00f0ff 0%, #2563eb 35%, #fbbf24 70%, #f59e0b 100%);
    box-shadow:
      0 0 30px rgba(0, 240, 255, 0.36),
      0 0 38px rgba(251, 191, 36, 0.28),
      0 18px 42px rgba(0, 0, 0, 0.92);
  }

  .gacha-card-inner {
    background: radial-gradient(circle at 50% 30%, #0d1734 0%, #040711 100%);
    border-radius: 17px;
    padding: 12px;
    position: relative;
    overflow: hidden;
  }

  .gacha-corner-tl, .gacha-corner-tr, .gacha-corner-bl, .gacha-corner-br {
    position: absolute;
    width: 18px;
    height: 18px;
    pointer-events: none;
    z-index: 4;
  }
  .gacha-corner-tl { top: 6px; left: 6px; border-top: 2px solid #fbbf24; border-left: 2px solid #fbbf24; }
  .gacha-corner-tr { top: 6px; right: 6px; border-top: 2px solid #00f0ff; border-right: 2px solid #00f0ff; }
  .gacha-corner-bl { bottom: 6px; left: 6px; border-bottom: 2px solid #00f0ff; border-left: 2px solid #00f0ff; }
  .gacha-corner-br { bottom: 6px; right: 6px; border-bottom: 2px solid #fbbf24; border-right: 2px solid #fbbf24; }

  @keyframes gachaAuraPulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.85; transform: scale(1.02); }
  }
  .gacha-aura-overlay {
    animation: gachaAuraPulse 4s ease-in-out infinite;
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
// UTILIDAD DE SEGURIDAD DE CREDENCIALES (HASH LOCAL SHA-256)
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
// DATOS DEL SISTEMA: RANGOS, GRADOS DE CAZADOR Y CLASES
// ============================================================================
const RANKS = [
  { name: 'Tierra', tier: 0, color: '#92400e' },
  { name: 'Madera', tier: 1, color: '#4d7c0f' },
  { name: 'Piedra', tier: 2, color: '#64748b' },
  { name: 'Carbón', tier: 3, color: '#94a3b8' },
  { name: 'Hierro', tier: 4, color: '#cbd5e1' },
  { name: 'Bronce', tier: 5, color: '#c2410c' },
  { name: 'Plata', tier: 6, color: '#e2e8f0' },
  { name: 'Oro', tier: 7, color: '#fbbf24' },
  { name: 'Platino', tier: 8, color: '#2dd4bf' },
  { name: 'Esmeralda', tier: 9, color: '#10b981' },
  { name: 'Diamante', tier: 10, color: '#38bdf8' },
  { name: 'Especialista', tier: 11, color: '#a855f7' },
  { name: 'Maestro', tier: 12, color: '#e879f9' },
  { name: 'Jefe Maestro', tier: 13, color: '#f43f5e' },
  { name: 'Challenger', tier: 14, color: '#fbbf24' },
];

const HUNTER_GRADE_STANDARDS = [
  { grade: 'F', minComposite: 0.0, benchReq: 0.0, squatReq: 0.0, deadliftReq: 0.0, desc: 'Iniciado' },
  { grade: 'E', minComposite: 0.70, benchReq: 0.65, squatReq: 0.85, deadliftReq: 1.00, desc: 'Novato consolidado' },
  { grade: 'D', minComposite: 0.90, benchReq: 0.80, squatReq: 1.05, deadliftReq: 1.25, desc: 'Base atlética funcional' },
  { grade: 'C', minComposite: 1.12, benchReq: 1.00, squatReq: 1.25, deadliftReq: 1.50, desc: 'Intermedio sólido' },
  { grade: 'B', minComposite: 1.32, benchReq: 1.15, squatReq: 1.50, deadliftReq: 1.75, desc: 'Atlético avanzado' },
  { grade: 'A', minComposite: 1.55, benchReq: 1.34, squatReq: 1.75, deadliftReq: 2.05, desc: 'Élite regional' },
  { grade: 'S', minComposite: 1.80, benchReq: 1.55, squatReq: 2.00, deadliftReq: 2.35, desc: 'Maestría biomecánica' },
  { grade: 'SS', minComposite: 2.05, benchReq: 1.75, squatReq: 2.25, deadliftReq: 2.60, desc: 'Competidor nacional' },
  { grade: 'SSS', minComposite: 2.28, benchReq: 1.95, squatReq: 2.50, deadliftReq: 2.85, desc: 'Portento físico' },
  { grade: 'EX', minComposite: 2.50, benchReq: 2.15, squatReq: 2.75, deadliftReq: 3.10, desc: 'Cúspide humana absoluta' },
];

const CLASS_ARCHETYPES = [
  { base: 'Centinela', weaponType: 'sword', passiveTitle: 'Muralla Inquebrantable', passiveRule: 'Reduce a la mitad el desgaste y otorga +40 de defensa base.' },
  { base: 'Espadachín', weaponType: 'sword', passiveTitle: 'Filo del Duelo Implacable', passiveRule: 'Aumenta +18% el daño crítico.' },
  { base: 'Lancero', weaponType: 'spear', passiveTitle: 'Impulso de la Lanza Perforadora', passiveRule: 'Convierte tu fuerza en penetración de armadura.' },
  { base: 'Artista Marcial', weaponType: 'gauntlets', passiveTitle: 'Flujo de los Cien Golpes', passiveRule: 'Multiplica velocidad y otorga +15% EXP extra.' },
  { base: 'Berserker', weaponType: 'greatsword', passiveTitle: 'Furia de Sangre Indomable', passiveRule: 'Escala tu ataque bruto con Peso Muerto.' },
  { base: 'Asesino Sombrío', weaponType: 'daggers', passiveTitle: 'Paso Fantasma del Abismo', passiveRule: 'Otorga ventaja táctica en duelos PvP.' },
  { base: 'Monje Astral', weaponType: 'staff', passiveTitle: 'Armonía del Núcleo Interior', passiveRule: 'Duplica recuperación con sueño óptimo.' },
  { base: 'Invocador Rúnico', weaponType: 'staff', passiveTitle: 'Sello de los Antiguos', passiveRule: 'Potencia reliquias y equipos.' },
  { base: 'Cazador de Abismos', weaponType: 'spear', passiveTitle: 'Instinto de Depredador Alfa', passiveRule: 'Inflige +24% daño contra monstruos.' },
  { base: 'Duelista', weaponType: 'sword', passiveTitle: 'Estocada de Precisión', passiveRule: 'Cada racha suma puntos de combate.' },
  { base: 'Alquimista Bélico', weaponType: 'sword', passiveTitle: 'Transmutación Metabólica', passiveRule: 'Convierte entrenamientos en EXP.' },
  { base: 'Soberano', weaponType: 'greatsword', passiveTitle: 'Autoridad del Trono', passiveRule: 'Aumenta prosperidad de ciudad y afinidad.' },
];

const CLASS_AFFINITIES = [
  { name: 'Infinito', accent: '#00f0ff', resonance: 'Resonancia Sin Límites: Escala +5 puntos por nivel.' },
  { name: 'de Ceniza', accent: '#f97316', resonance: 'Resonancia Ígnea: +12% Poder con racha activa.' },
  { name: 'Carmesí', accent: '#e11d48', resonance: 'Resonancia Vital: +15% eficiencia en cargas.' },
  { name: 'Celestial', accent: '#38bdf8', resonance: 'Resonancia Astral: +15% EXP en misiones.' },
  { name: 'del Vacío', accent: '#a855f7', resonance: 'Resonancia Abisal: +18% daño contra jefes.' },
  { name: 'de Obsidiana', accent: '#94a3b8', resonance: 'Resonancia Férrea: +35 Defensa.' },
  { name: 'de Tormenta', accent: '#00f0ff', resonance: 'Resonancia Eléctrica: +14% velocidad PvP.' },
  { name: 'del Eclipse', accent: '#fbbf24', resonance: 'Resonancia Dual: Equilibra ataque y defensa.' },
  { name: 'Astral', accent: '#818cf8', resonance: 'Resonancia Estelar: Mejora recompensas.' },
  { name: 'Espectral', accent: '#2dd4bf', resonance: 'Resonancia Etérea: Reduce fatiga.' },
  { name: 'de Acero Pálido', accent: '#cbd5e1', resonance: 'Resonancia Metálica: Escala con peso.' },
  { name: 'del Crepúsculo', accent: '#fb7185', resonance: 'Resonancia Crepuscular: +15% afinidad.' },
  { name: 'Primordial', accent: '#fbbf24', resonance: 'Resonancia Ancestral: +20% pasiva.' },
  { name: 'de Sangre Real', accent: '#be123c', resonance: 'Resonancia Dinástica: +25 LP por victoria.' },
];

function generateRandomInfiniteClass(seedNumber) {
  const arch = CLASS_ARCHETYPES[Math.abs(seedNumber) % CLASS_ARCHETYPES.length];
  const aff = CLASS_AFFINITIES[Math.abs(seedNumber * 7 + 13) % CLASS_AFFINITIES.length];
  const variantCode = (Math.abs(seedNumber * 19) % 999) + 1;
  return {
    name: `${arch.base} ${aff.name}`,
    weaponType: arch.weaponType,
    accentColor: aff.accent,
    variantCode,
    passiveName: `${arch.passiveTitle} (${aff.name})`,
    passiveDesc: `${arch.passiveRule} ${aff.resonance}`,
    desc: `Arquetipo ${arch.base} con afinidad ${aff.name} (Linaje #${variantCode}).`
  };
}

function getInfiniteClassEvolution(baseClassName, level) {
  const safeBase = baseClassName || 'Centinela Infinito';
  if (level < 5) return { stage: 1, title: `${safeBase} Iniciado [Rango I]`, bonus: '+5% Poder Base', nextLvl: 5 };
  if (level < 12) return { stage: 2, title: `${safeBase} Veterano [Rango II]`, bonus: '+15% Poder & Pasiva', nextLvl: 12 };
  if (level < 25) return { stage: 3, title: `Maestro ${safeBase} [Rango III]`, bonus: '+30% Maestría', nextLvl: 25 };
  if (level < 45) return { stage: 4, title: `Gran ${safeBase} Trascendente [Rango IV]`, bonus: '+55% Soberanía', nextLvl: 45 };
  if (level < 75) return { stage: 5, title: `Monarca ${safeBase} [Rango V]`, bonus: '+90% Dominio Astral', nextLvl: 75 };
  const ascensionTier = Math.floor((level - 75) / 25) + 1;
  return {
    stage: 5 + ascensionTier,
    title: `Deidad ${safeBase} [Ascensión ∞-${ascensionTier}]`,
    bonus: `+${90 + ascensionTier * 35}% Poder Infinito`,
    nextLvl: 75 + ascensionTier * 25
  };
}

const DAILY_REWARD_POOL = [
  { id: 'skill_slash', type: 'Habilidad', name: 'Tajo de Acero Templado', power: 35, desc: 'Golpe preciso que escala con Press Banca.' },
  { id: 'gear_cloak', type: 'Equipamiento', name: 'Capa Real Carmesí', power: 25, desc: 'Manto de batalla que eleva resistencia.' },
  { id: 'skill_titan', type: 'Habilidad', name: 'Postura del Titán Inamovible', power: 50, desc: 'Escudo neural que escala con Sentadilla.' },
  { id: 'gear_blade', type: 'Equipamiento', name: 'Hoja Runificada de Santuario', power: 65, desc: 'Arma forjada de alto rango.' },
];

const PVE_STORY_CHAPTERS = [
  {
    id: 'act1_ch1',
    order: 1,
    prevId: null,
    act: 'Acto I: Las Ruinas de Ceniza',
    chapter: 'Capítulo 1 — El Umbral del Hierro',
    reqPower: 60,
    enemy: 'Centinela Oxidado de la Grieta',
    lore: 'Tras despertar como Cazador desde cero, cruzas el puente y rescatas a Lyra, fundando tu Ciudad 2D.',
    rewardType: 'Habilidad Especial',
    rewardName: 'Voluntad de Hierro (+20 DEF)',
    unlockCharacterId: 'lyra',
    expReward: 120,
    lpReward: 35
  },
  {
    id: 'act1_ch2',
    order: 2,
    prevId: 'act1_ch1',
    act: 'Acto I: Las Ruinas de Ceniza',
    chapter: 'Capítulo 2 — El Bosque de los Ecos',
    reqPower: 160,
    enemy: 'Acechador Sombrío de Fenrir',
    lore: 'Kaelen se une a patrullar los alrededores de tu ciudad.',
    rewardType: 'Equipamiento de Historia',
    rewardName: 'Brazaletes del Lobo Plateado (+35 ATQ)',
    unlockCharacterId: 'kaelen',
    expReward: 180,
    lpReward: 45
  },
  {
    id: 'act2_ch1',
    order: 3,
    prevId: 'act1_ch2',
    act: 'Acto II: La Ciudadela Carmesí',
    chapter: 'Capítulo 3 — La Guardia del Bastión',
    reqPower: 280,
    enemy: 'Comandante Valkiria Caída',
    lore: 'Seraphina jura lealtad y se instala en la plaza.',
    rewardType: 'Habilidad Especial',
    rewardName: 'Estocada Relámpago Carmesí (+55 ATQ)',
    unlockCharacterId: 'seraphina',
    expReward: 260,
    lpReward: 60
  },
  {
    id: 'act2_ch2',
    order: 4,
    prevId: 'act2_ch1',
    act: 'Acto II: La Ciudadela Carmesí',
    chapter: 'Capítulo 4 — El Altar del Eclipse',
    reqPower: 420,
    enemy: 'Archidemonio Revenant Malakor',
    lore: 'Conoces a Isolde, oráculo de las estrellas.',
    rewardType: 'Reliquia Única de Historia',
    rewardName: 'Espadón Eclipse del Monarca (+90 ATQ)',
    unlockCharacterId: 'isolde',
    expReward: 380,
    lpReward: 80
  }
];

const STORY_CHARACTERS = [
  {
    id: 'lyra',
    name: 'Lyra Ignis',
    role: 'Maestra Herrera Rúnica',
    unlockChapter: 'act1_ch1',
    unlockLabel: 'Capítulo 1',
    hairColor: '#e11d48',
    outfitColor: '#450a0a',
    trimColor: '#d4af37',
    glowColor: '#f97316',
    mapX: 115,
    mapY: 165,
    intro: '¡Por fin llegas! Estaba templando acero en la forja.'
  },
  {
    id: 'kaelen',
    name: 'Kaelen Vane',
    role: 'Explorador de las Sombras',
    unlockChapter: 'act1_ch2',
    unlockLabel: 'Capítulo 2',
    hairColor: '#94a3b8',
    outfitColor: '#0f172a',
    trimColor: '#38bdf8',
    glowColor: '#00f0ff',
    mapX: 375,
    mapY: 155,
    intro: 'Vengo de patrullar los bosques que rodean la muralla.'
  },
  {
    id: 'seraphina',
    name: 'Seraphina Aurelia',
    role: 'Comandante Valkiria',
    unlockChapter: 'act2_ch1',
    unlockLabel: 'Capítulo 3',
    hairColor: '#facc15',
    outfitColor: '#1e293b',
    trimColor: '#d4af37',
    glowColor: '#fde047',
    mapX: 250,
    mapY: 182,
    intro: 'Mi espada protege este asentamiento.'
  },
  {
    id: 'isolde',
    name: 'Isolde Noctis',
    role: 'Oráculo Astral del Eclipse',
    unlockChapter: 'act2_ch2',
    unlockLabel: 'Capítulo 4',
    hairColor: '#6d28d9',
    outfitColor: '#1e1b4b',
    trimColor: '#c084fc',
    glowColor: '#a855f7',
    mapX: 435,
    mapY: 175,
    intro: 'Las estrellas brillan distinto desde que superaste tus marcas.'
  }
];

const CITY_BUILDINGS_CATALOG = [
  { id: 'forge', name: 'Forja de Acero Real', bonus: '+15 Poder de Equipo.' },
  { id: 'tavern', name: 'Taberna del Crepúsculo', bonus: '+3 Afinidad extra en citas.' },
  { id: 'dojo', name: 'Arena de Entrenamiento', bonus: '+20 Poder de Clase.' },
  { id: 'observatory', name: 'Observatorio Astral', bonus: 'Amplifica tu Habilidad Pasiva.' },
  { id: 'garden', name: 'Jardín de los Juramentos', bonus: 'Lugar para citas románticas.' },
];

const HOME_EQUIPMENT_OPTIONS = [
  'Mancuernas ajustables',
  'Barra de dominadas',
  'Bandas elásticas',
  'Kettlebell / Pesa rusa',
  'Banco plano / inclinable',
  'Barra recta y discos'
];

const ZERO_LIFTS = {
  'Press Banca': { weight: 0, reps: 0, date: 'Sin registrar' },
  'Sentadilla Trasera': { weight: 0, reps: 0, date: 'Sin registrar' },
  'Peso Muerto Convencional': { weight: 0, reps: 0, date: 'Sin registrar' },
  'Press Militar': { weight: 0, reps: 0, date: 'Sin registrar' },
  'Remo con Barra': { weight: 0, reps: 0, date: 'Sin registrar' },
  'Dominadas Lastradas (Total)': { weight: 0, reps: 0, date: 'Sin registrar' },
};

const ZERO_SLEEP_LOG = [
  { day: 'Lun', hours: 0 },
  { day: 'Mar', hours: 0 },
  { day: 'Mié', hours: 0 },
  { day: 'Jue', hours: 0 },
  { day: 'Vie', hours: 0 },
  { day: 'Sáb', hours: 0 },
  { day: 'Dom', hours: 0 },
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
  if (!weight || weight <= 0 || !reps || reps <= 0) return 0;
  if (reps <= 1) return Math.round(weight);
  return Math.round(weight * (1 + reps / 30));
}

function getEffectiveExercise1RM(exName, weight, reps, bodyWeight) {
  const w = Number(weight) || 0;
  const r = Number(reps) || 0;
  if (w <= 0 || r <= 0) return 0;
  const bw = Math.max(40, Number(bodyWeight) || 75);
  if (exName.toLowerCase().includes('dominada') && w < bw * 0.75) {
    return calcEpley1RM(bw + w, r);
  }
  return calcEpley1RM(w, r);
}

function computeHunterGradeData(liftsObj, weightKg) {
  const bw = Math.max(40, Number(weightKg) || 75);
  const bench1RM = getEffectiveExercise1RM('Press Banca', liftsObj['Press Banca']?.weight || 0, liftsObj['Press Banca']?.reps || 0, bw);
  const squat1RM = getEffectiveExercise1RM('Sentadilla Trasera', liftsObj['Sentadilla Trasera']?.weight || 0, liftsObj['Sentadilla Trasera']?.reps || 0, bw);
  const deadlift1RM = getEffectiveExercise1RM('Peso Muerto Convencional', liftsObj['Peso Muerto Convencional']?.weight || 0, liftsObj['Peso Muerto Convencional']?.reps || 0, bw);

  const benchRatio = bench1RM / bw;
  const squatRatio = squat1RM / bw;
  const deadliftRatio = deadlift1RM / bw;
  const compositeRelStrength = (benchRatio + squatRatio + deadliftRatio) / 3;

  let currentIdx = 0;
  for (let i = HUNTER_GRADE_STANDARDS.length - 1; i >= 1; i--) {
    const std = HUNTER_GRADE_STANDARDS[i];
    if (
      bench1RM >= Math.round(std.benchReq * bw) &&
      squat1RM >= Math.round(std.squatReq * bw) &&
      deadlift1RM >= Math.round(std.deadliftReq * bw)
    ) {
      currentIdx = i;
      break;
    }
  }

  return {
    bw,
    bench1RM,
    squat1RM,
    deadlift1RM,
    compositeRelStrength,
    currentIdx,
    currentStd: HUNTER_GRADE_STANDARDS[currentIdx],
    nextStd: HUNTER_GRADE_STANDARDS[Math.min(HUNTER_GRADE_STANDARDS.length - 1, currentIdx + 1)],
  };
}

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

function getRelationshipLabel(affection) {
  if (affection >= 100) return { label: 'Pareja Jurada ♥', color: '#fb7185' };
  if (affection >= 70) return { label: 'Interés Romántico ♥', color: '#f472b6' };
  if (affection >= 40) return { label: 'Confidente Cercano', color: '#fde047' };
  if (affection >= 15) return { label: 'Aliado de Armas', color: '#00f0ff' };
  return { label: 'Conocido', color: '#94a3b8' };
}

function generateCharacterAIReply(char, userMsg, memoryList, context) {
  const lower = userMsg.toLowerCase();
  const { hunterName, hunterGrade, bench1RM, squat1RM, deadlift1RM, streak, cityName, clearedCount, affection, clsName } = context;
  const isRomantic = affection >= 70;

  if (lower.includes('entren') || lower.includes('pesa') || lower.includes('fuerza') || lower.includes('banca') || lower.includes('sentadilla')) {
    return isRomantic
      ? `${hunterName}, sé cuánto te esfuerzas... Todos en ${cityName} hablan de tus ${bench1RM} kg en Banca. Verte alcanzar el Grado ${hunterGrade} me hace sentir orgullosa.`
      : `Los rumores en ${cityName} son ciertos: levantar ${bench1RM} kg en Banca como ${clsName} no es fácil. Tu Grado de Cazador ${hunterGrade} impone respeto.`;
  }
  if (lower.includes('amor') || lower.includes('cita') || lower.includes('quiero') || lower.includes('beso')) {
    if (affection >= 70) return `Mi corazón ya te pertenece, ${hunterName}... Siempre estaré a tu lado.`;
    return `Me tomas por sorpresa... Aprecio mucho cada momento que compartimos en ${cityName}.`;
  }
  return isRomantic
    ? `Me alegra tanto que vinieras a verme a ${cityName}, ${hunterName}.`
    : `Bienvenido de nuevo a mi puesto en ${cityName}, ${hunterName}.`;
}

// ============================================================================
// COMPONENTE DE ILUSTRACIÓN ESTILIZADA (REEMPLAZO GEOMÉTRICO POR FOTOS DE ALTA CALIDAD)
// ============================================================================
function JrpgFantasyPortrait({
  hunterClass,
  hunterGrade,
  level,
  classEvolution,
  gender,
  onToggleGender,
  passiveClassBonus,
  customGachaArt,
  onUploadGachaArt
}) {
  const isFemale = gender === 'female';

  // Rutas directas a tus ilustraciones de alta calidad en public/
  const defaultImages = isFemale
    ? ['/1000272221.jpg', '/avatar-female.jpg']
    : ['/1000272220.jpg', '/avatar-male.jpg'];

  const uploadedSrc = customGachaArt?.[gender] || null;
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    setImgIndex(0);
  }, [gender]);

  const activeImageSrc = uploadedSrc || defaultImages[imgIndex];
  const starCount = Math.min(6, Math.max(4, 3 + classEvolution.stage));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div className="gacha-card-outer">
        <div className="gacha-card-inner">
          <div className="gacha-corner-tl" />
          <div className="gacha-corner-tr" />
          <div className="gacha-corner-bl" />
          <div className="gacha-corner-br" />

          {/* BARRA SUPERIOR DE LA TARJETA */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '10px',
            position: 'relative',
            zIndex: 5
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="sys-badge" style={{
                background: 'linear-gradient(90deg, rgba(251,191,36,0.24), rgba(0,240,255,0.16))',
                color: '#fde047',
                border: '1px solid rgba(251, 191, 36, 0.75)',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '10px'
              }}>
                NV. {level} • ETAPA {classEvolution.stage}
              </span>
              <span style={{ color: '#fbbf24', fontSize: '11px', letterSpacing: '1px' }}>
                {'★'.repeat(starCount)}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label
                className="sys-btn"
                title="Cargar otra ilustración de base"
                style={{
                  padding: '5px 10px',
                  fontSize: '9px',
                  background: 'rgba(251, 191, 36, 0.16)',
                  border: '1px solid rgba(251, 191, 36, 0.65)',
                  color: '#fde047',
                  borderRadius: '999px',
                  cursor: 'pointer'
                }}
              >
                <ImageIcon size={11} color="#fbbf24" /> BASE GACHA
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => onUploadGachaArt && onUploadGachaArt(e, gender)}
                />
              </label>

              <button
                type="button"
                onClick={onToggleGender}
                className="sys-btn"
                style={{
                  padding: '5px 11px',
                  fontSize: '10px',
                  background: 'rgba(0, 240, 255, 0.16)',
                  border: '1px solid rgba(0, 240, 255, 0.6)',
                  color: '#e0f2fe',
                  borderRadius: '999px'
                }}
              >
                <UserCheck size={12} color="#00f0ff" /> {isFemale ? 'FEMENINO' : 'MASCULINO'}
              </button>
            </div>
          </div>

          {/* CONTENEDOR DE LA IMAGEN (ESTILIZADA, SIN FORMAS GEOMÉTRICAS RÍGIDAS) */}
          <div style={{
            borderRadius: '13px',
            overflow: 'hidden',
            position: 'relative',
            border: '1.5px solid rgba(251, 191, 36, 0.55)',
            boxShadow: 'inset 0 0 28px rgba(0, 240, 255, 0.25)',
            background: '#03050c'
          }}>
            <img
              src={activeImageSrc}
              alt="Avatar Legendary Gacha Estilizado"
              onError={() => {
                if (!uploadedSrc && imgIndex < defaultImages.length - 1) {
                  setImgIndex(prev => prev + 1);
                }
              }}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '520px',
                display: 'block',
                objectFit: 'cover',
                objectPosition: 'center top'
              }}
            />

            <div
              className="gacha-aura-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 'radial-gradient(circle at 50% 20%, rgba(0,240,255,0.12) 0%, transparent 60%)'
              }}
            />

            {/* PLACA INFERIOR FLOTANTE */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(0deg, rgba(3,5,12,0.98) 0%, rgba(3,5,12,0.85) 70%, transparent 100%)',
              padding: '34px 14px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '10px'
            }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  fontSize: '9px',
                  fontFamily: 'Orbitron, sans-serif',
                  color: '#00f0ff',
                  letterSpacing: '0.16em',
                  marginBottom: '2px'
                }}>
                  LEGENDARY AWAKENED CLASS
                </div>
                <div className="font-souls" style={{
                  fontSize: '15px',
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '0.07em',
                  textShadow: '0 2px 14px rgba(251, 191, 36, 0.6)'
                }}>
                  {classEvolution.title.toUpperCase()}
                </div>
                <div style={{ fontSize: '11px', color: '#fde047', fontWeight: 700, marginTop: '2px' }}>
                  {classEvolution.bonus}
                </div>
              </div>

              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(251,191,36,0.28) 0%, rgba(4,7,18,0.96) 76%)',
                border: '2px solid #fbbf24',
                boxShadow: '0 0 18px rgba(0, 240, 255, 0.5), inset 0 0 10px rgba(251, 191, 36, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{ fontSize: '7px', color: '#00f0ff', fontWeight: 800 }}>GRADO</span>
                <span className="font-hud" style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff', lineHeight: 1.1 }}>
                  {hunterGrade}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PANEL DE PASIVA DE CLASE */}
      <div className="sys-window" style={{ padding: '16px', borderColor: 'rgba(251, 191, 36, 0.45)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '10px'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #fbbf24)' }} />
          <h2 className="font-souls" style={{ fontSize: '13px', color: '#fde047', fontWeight: 800, textAlign: 'center' }}>
            PASIVA ÚNICA DE CLASE
          </h2>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #fbbf24, transparent)' }} />
        </div>

        <div style={{
          padding: '12px',
          borderRadius: '10px',
          background: 'radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.12) 0%, rgba(5, 9, 20, 0.94) 80%)',
          border: '1px solid rgba(0, 240, 255, 0.45)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span className="sys-badge" style={{ background: 'rgba(0, 240, 255, 0.14)', color: '#7dd3fc' }}>
              SÍNCRONO ACTIVO
            </span>
            <span className="sys-badge" style={{ background: 'rgba(251, 191, 36, 0.18)', color: '#fde047' }}>
              +{passiveClassBonus} PWR
            </span>
          </div>

          <div className="font-souls" style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff', textAlign: 'center', marginBottom: '4px' }}>
            {(hunterClass?.cls?.passiveName || 'Muralla Inquebrantable').toUpperCase()}
          </div>
          <p style={{ fontSize: '12px', color: '#cbd5e1', textAlign: 'center', fontStyle: 'italic', lineHeight: 1.4 }}>
            {hunterClass?.cls?.passiveDesc || 'Reduce a la mitad el desgaste y otorga +40 de defensa base.'}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VISOR DE NOVELA VISUAL (PERSONAJES)
// ============================================================================
function VisualNovelCharacterPortrait({ char, affectionLabel, affectionColor, affectionPoints }) {
  return (
    <div style={{
      borderRadius: '14px',
      overflow: 'hidden',
      border: '1.5px solid #fb7185',
      boxShadow: '0 0 24px rgba(251, 113, 133, 0.25)',
      background: '#060914',
      position: 'relative',
      minHeight: '330px'
    }}>
      <svg viewBox="0 0 300 340" width="100%" height="100%" style={{ display: 'block' }}>
        <defs>
          <radialGradient id={`vnCosmic_${char.id}`} cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#3b0764" />
            <stop offset="55%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#060914" />
          </radialGradient>
        </defs>
        <rect width="300" height="340" fill={`url(#vnCosmic_${char.id})`} />
        <circle cx="150" cy="145" r="115" fill={char.glowColor || '#fb7185'} opacity="0.16" />
        <path d="M102 86 C86 155, 88 225, 98 285 L202 285 C212 225, 214 155, 198 86 Z" fill={char.hairColor} />
        <path d="M106 152 L194 152 L212 300 L88 300 Z" fill={char.outfitColor} stroke={char.trimColor} strokeWidth="2" />
        <polygon points="150,194 160,208 150,222 140,208" fill={char.glowColor || '#fb7185'} opacity="0.85" />
      </svg>

      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(0deg, rgba(4,6,12,0.97) 0%, rgba(4,6,12,0.8) 75%, transparent 100%)',
        padding: '18px 12px 10px'
      }}>
        <div className="font-souls" style={{ fontSize: '16px', fontWeight: 900, color: '#fff' }}>{char.name}</div>
        <div style={{ fontSize: '11px', color: '#fda4af' }}>{char.role}</div>
        <div style={{ marginTop: '5px' }}>
          <span className="sys-badge" style={{ background: 'rgba(251,113,133,0.2)', color: affectionColor, border: `1px solid ${affectionColor}` }}>
            {affectionLabel} ({affectionPoints} pts)
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAPA 2D INTERACTIVO
// ============================================================================
function City2DWorldMap({ cityName, builtBuildings, unlockedCharacters, selectedCharId, onSelectCharacter }) {
  return (
    <div style={{
      borderRadius: '12px',
      overflow: 'hidden',
      border: '2px solid rgba(251, 191, 36, 0.5)',
      background: '#060a14',
      marginBottom: '14px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute', top: '8px', left: '10px', right: '10px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2, pointerEvents: 'none'
      }}>
        <span className="sys-badge" style={{ background: 'rgba(4,6,12,0.85)', color: '#fde047', border: '1px solid #fbbf24' }}>
          MAPA 2D • {cityName.toUpperCase()}
        </span>
        <span className="sys-badge" style={{ background: 'rgba(4,6,12,0.85)', color: '#00f0ff', border: '1px solid #00f0ff' }}>
          ALIADOS: {unlockedCharacters.length}
        </span>
      </div>

      <svg viewBox="0 0 540 230" width="100%" height="230" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="citySky2d" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#090d1e" />
            <stop offset="65%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
        </defs>
        <rect width="540" height="230" fill="url(#citySky2d)" />
        <rect x="0" y="142" width="540" height="88" fill="#142318" />
        <rect x="0" y="168" width="540" height="26" fill="#334155" />
        <rect x="232" y="92" width="76" height="54" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
        <text x="270" y="58" textAnchor="middle" fill="#fde047" fontSize="9" fontWeight="bold">AYUNTAMIENTO</text>

        {unlockedCharacters.map((char) => (
          <g key={char.id} style={{ cursor: 'pointer' }} onClick={() => onSelectCharacter(char.id)}>
            <circle cx={char.mapX} cy={char.mapY - 28} r="10" fill="#090d16" stroke="#fbbf24" strokeWidth="1.5" />
            <text x={char.mapX} y={char.mapY - 25} textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="bold">!</text>
            <rect x={char.mapX - 8} y={char.mapY - 6} width="16" height="18" rx="4" fill={char.outfitColor} />
          </g>
        ))}
      </svg>
    </div>
  );
}

// ============================================================================
// MODAL DE ANIMACIÓN DE EJERCICIOS
// ============================================================================
function ExerciseAnimationModal({ exercise, onClose }) {
  if (!exercise) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9998,
      background: 'rgba(3, 5, 10, 0.88)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'
    }}>
      <div className="sys-window" style={{ maxWidth: '420px', width: '100%', padding: '20px', textAlign: 'center' }}>
        <h3 className="font-souls" style={{ fontSize: '18px', color: '#fff', marginBottom: '10px' }}>{exercise.name}</h3>
        <p style={{ fontSize: '12px', color: '#fbbf24', marginBottom: '14px' }}>{exercise.sets} • {exercise.focus}</p>
        <p style={{ fontSize: '13px', color: '#e2e8f0', background: 'rgba(4,6,12,0.85)', padding: '10px', borderRadius: '9px', marginBottom: '14px' }}>
          <strong>Clave biomecánica:</strong> {exercise.cue}
        </p>
        <button className="sys-btn sys-btn-gold" style={{ width: '100%' }} onClick={onClose}>CERRAR</button>
      </div>
    </div>
  );
}

// ============================================================================
// PORTAL DE AUTENTICACIÓN
// ============================================================================
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
      setAuthError('Ingresa un correo y contraseña válidos (mín. 4 caracteres).');
      return;
    }
    const passHash = await hashSecret(passwordInput);
    const usersDb = JSON.parse(localStorage.getItem('pex_users_registry_v12') || '{}');

    if (authMode === 'register') {
      if (usersDb[cleanEmail]) {
        setAuthError('Ese usuario ya existe. Cambia a Iniciar Sesión.');
        return;
      }
      const newAccount = {
        email: cleanEmail,
        passHash,
        hunterName: (hunterTagInput.trim() || cleanEmail.split('@')[0] || 'CAZADOR').toUpperCase(),
        hunterCode: `#PEX-${Math.floor(1000 + Math.random() * 8999)}`
      };
      usersDb[cleanEmail] = newAccount;
      localStorage.setItem('pex_users_registry_v12', JSON.stringify(usersDb));
      onAuthenticated(newAccount);
    } else {
      const existing = usersDb[cleanEmail];
      if (!existing || existing.passHash !== passHash) {
        setAuthError('Credenciales incorrectas o cuenta no registrada.');
        return;
      }
      onAuthenticated(existing);
    }
  };

  return (
    <div className="sys-container" style={{ maxWidth: '460px', paddingTop: '44px' }}>
      <div className="sys-window" style={{ padding: '26px 22px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span className="sys-badge" style={{ background: 'rgba(0,240,255,0.14)', color: '#00f0ff', border: '1px solid #00f0ff' }}>
            [SISTEMA DE IDENTIDAD PERMANENTE]
          </span>
          <h1 className="font-souls" style={{ fontSize: '27px', marginTop: '10px', color: '#fff' }}>PROTOCOLO EX</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '18px' }}>
          <button
            type="button"
            className={`sys-btn ${authMode === 'login' ? 'sys-btn-gold' : 'sys-btn-ghost'}`}
            onClick={() => { setAuthMode('login'); setAuthError(''); }}
          >
            <LogIn size={14} /> ENTRAR
          </button>
          <button
            type="button"
            className={`sys-btn ${authMode === 'register' ? 'sys-btn-gold' : 'sys-btn-ghost'}`}
            onClick={() => { setAuthMode('register'); setAuthError(''); }}
          >
            <UserPlus size={14} /> REGISTRO
          </button>
        </div>

        <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {authMode === 'register' && (
            <div>
              <label style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 700 }}>NOMBRE CLAVE</label>
              <input className="sys-input" placeholder="Ej: AKIRA" value={hunterTagInput} onChange={(e) => setHunterTagInput(e.target.value)} />
            </div>
          )}
          <div>
            <label style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 700 }}>CORREO O USUARIO</label>
            <input type="text" className="sys-input" placeholder="cazador@protocolo.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 700 }}>CONTRASEÑA</label>
            <input type="password" className="sys-input" placeholder="••••••••" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required />
          </div>
          {authError && <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(225,29,72,0.16)', border: '1px solid #e11d48', fontSize: '12px', color: '#fda4af' }}>{authError}</div>}
          <button type="submit" className="sys-btn sys-btn-primary" style={{ padding: '14px', fontSize: '12px' }}>
            <Zap size={16} /> {authMode === 'login' ? 'ACCEDER AL SISTEMA' : 'CREAR CUENTA Y EMPEZAR'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// APP PRINCIPAL
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
      const saved = localStorage.getItem('pex_permanent_session_v12');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleAuthenticated = (account) => {
    setCurrentUser(account);
    localStorage.setItem('pex_permanent_session_v12', JSON.stringify(account));
  };

  const handleDeleteAccount = () => {
    const usersDb = JSON.parse(localStorage.getItem('pex_users_registry_v12'] || '{}');
    delete usersDb[currentUser.email];
    localStorage.setItem('pex_users_registry_v12', JSON.stringify(usersDb));
    localStorage.removeItem(`pex_user_data_v12_${currentUser.email}`);
    localStorage.removeItem('pex_permanent_session_v12');
    setCurrentUser(null);
  };

  if (!currentUser) return <AuthPortal onAuthenticated={handleAuthenticated} />;

  return <HunterSystemWorkspace key={currentUser.email} currentUser={currentUser} onDeleteAccount={handleDeleteAccount} />;
}

// ============================================================================
// ESPACIO DE TRABAJO
// ============================================================================
function HunterSystemWorkspace({ currentUser, onDeleteAccount }) {
  const storageKey = `pex_user_data_v12_${currentUser.email}`;
  const loadUserState = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const initialData = loadUserState();
  const [awakened, setAwakened] = useState(() => initialData?.awakened === true);
  const [surveyStep, setSurveyStep] = useState(1);

  const [profile, setProfile] = useState(() => initialData?.profile || {
    hunterName: currentUser.hunterName || 'CAZADOR_01',
    hunterCode: currentUser.hunterCode || '#PEX-1000',
    gender: 'male',
    goal: 'Hipertrofia y Estética',
    routineDurationMonths: 2,
    daysPerWeek: 4,
    injuries: 'Ninguna',
    equipmentMode: 'all_gym',
    ownedHomeEquipment: [],
    experienceMonths: 0,
    age: 22,
    weightKg: 75,
    heightCm: 176,
    benchKg: 0,
    squatKg: 0,
    deadliftKg: 0,
    pushupsMax: 0,
    censoredPreview: null,
  });

  const [customGachaArt, setCustomGachaArt] = useState(() => initialData?.customGachaArt || { male: null, female: null });
  const [hunterClass, setHunterClass] = useState(() => initialData?.hunterClass || null);
  const [savedLifts, setSavedLifts] = useState(() => initialData?.savedLifts || ZERO_LIFTS);

  const [lp, setLp] = useState(() => initialData?.lp ?? 0);
  const [exp, setExp] = useState(() => initialData?.exp ?? 0);
  const [streak, setStreak] = useState(() => initialData?.streak ?? 0);

  const [unlockedInventory, setUnlockedInventory] = useState(() => initialData?.unlockedInventory || []);
  const [completedChapters, setCompletedChapters] = useState(() => initialData?.completedChapters || []);
  const [pveBattleLog, setPveBattleLog] = useState(null);

  const [cityName, setCityName] = useState(() => initialData?.cityName || 'Bastión de Ceniza');
  const [builtBuildings, setBuiltBuildings] = useState(() => initialData?.builtBuildings || []);
  const [selectedCharId, setSelectedCharId] = useState('lyra');
  const [characterStates, setCharacterStates] = useState(() => initialData?.characterStates || {
    lyra: { affection: 0, memories: [], lastReply: STORY_CHARACTERS[0].intro },
    kaelen: { affection: 0, memories: [], lastReply: STORY_CHARACTERS[1].intro },
    seraphina: { affection: 0, memories: [], lastReply: STORY_CHARACTERS[2].intro },
    isolde: { affection: 0, memories: [], lastReply: STORY_CHARACTERS[3].intro },
  });
  const [chatInput, setChatInput] = useState('');
  const [confirmDeleteText, setConfirmDeleteText] = useState('');

  const [userCoords] = useState({ lat: -34.0981, lon: -59.0286, label: 'Zárate, Buenos Aires' });
  const [friends, setFriends] = useState(() => initialData?.friends || []);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendCode, setNewFriendCode] = useState('');
  const [newFriendDistKm, setNewFriendDistKm] = useState(5);
  const [pvpLog, setPvpLog] = useState(null);

  const [activeTab, setActiveTab] = useState('avatar');
  const [toast, setToast] = useState(null);
  const [animModalEx, setAnimModalEx] = useState(null);

  const [quests, setQuests] = useState(() => initialData?.quests || [
    { id: 1, title: 'Completar primera sesión de entrenamiento', env: 'Entreno', lp: 45, exp: 100, status: 'pending' },
    { id: 2, title: 'Registrar tus marcas base en Cargas', env: 'Sistema', lp: 35, exp: 60, status: 'pending' },
  ]);
  const [nextWeekQueue, setNextWeekQueue] = useState(() => initialData?.nextWeekQueue || []);
  const [newQuestTitle, setNewQuestTitle] = useState('');

  const [selectedExercise, setSelectedExercise] = useState('Press Banca');
  const [liftWeightInput, setLiftWeightInput] = useState(0);
  const [liftRepsInput, setLiftRepsInput] = useState(0);

  const [sleepLog, setSleepLog] = useState(() => initialData?.sleepLog || ZERO_SLEEP_LOG);
  const [todaySleep, setTodaySleep] = useState(0);
  const canvasRef = useRef(null);

  const gradeData = computeHunterGradeData(savedLifts, profile.weightKg);
  const hunterGrade = gradeData.currentStd.grade;
  const cityUnlocked = completedChapters.includes('act1_ch1');

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        awakened, profile, customGachaArt, hunterClass, savedLifts, lp, exp, streak,
        unlockedInventory, completedChapters, cityName, builtBuildings, characterStates,
        friends, quests, nextWeekQueue, sleepLog
      }));
    } catch {}
  }, [awakened, profile, customGachaArt, hunterClass, savedLifts, lp, exp, streak, unlockedInventory, completedChapters, cityName, builtBuildings, characterStates, friends, quests, nextWeekQueue, sleepLog, storageKey]);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4500);
  };

  const handleUploadGachaArt = (e, targetGender) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        const scale = Math.min(1, 720 / img.width);
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, c.width, c.height);
        const compressedUrl = c.toDataURL('image/jpeg', 0.9);
        setCustomGachaArt((prev) => ({ ...prev, [targetGender]: compressedUrl }));
        triggerToast(`¡Base Gacha ${targetGender === 'female' ? 'Femenina' : 'Masculina'} actualizada con éxito!`);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const awakenHunter = () => {
    const seed = Number(profile.weightKg) * 17 + Number(profile.heightCm) * 11 + Math.floor(Math.random() * 9973);
    const chosenRace = { name: 'Recipiente del Monarca', trait: 'Evolución ilimitada' };
    const chosenCls = generateRandomInfiniteClass(seed);
    setHunterClass({ race: chosenRace, cls: chosenCls, assignedAt: new Date().toLocaleDateString() });
    setAwakened(true);
    setActiveTab('avatar');
    triggerToast(`¡DESPERTAR EXITOSO! Clase: ${chosenCls.name}`);
  };

  const level = Math.max(1, Math.floor(exp / 100) + 1);
  const expInLevel = exp % 100;
  const classEvolution = getInfiniteClassEvolution(hunterClass?.cls?.name, level);
  const passiveClassBonus = 30 + (level - 1) * 6;
  const gearBonusPower = unlockedInventory.reduce((acc, item) => acc + (item.power || 0), 0);
  const hunterCombatPower = Math.round((gradeData.bench1RM + gradeData.squat1RM + gradeData.deadlift1RM) * 0.45 + level * 14 + gearBonusPower + passiveClassBonus);
  const rankInfo = getRankFromLP(lp);
  const totalSleep = sleepLog.reduce((acc, d) => acc + d.hours, 0);

  const activeChar = STORY_CHARACTERS.find((c) => c.id === selectedCharId) || STORY_CHARACTERS[0];
  const activeCharState = characterStates[activeChar.id] || { affection: 0, memories: [], lastReply: activeChar.intro };
  const activeRel = getRelationshipLabel(activeCharState.affection);

  const handleSendVisualNovelMessage = (customText = null, affGain = 4) => {
    const textToSend = (customText || chatInput).trim();
    if (!textToSend) return;
    const aiReply = generateCharacterAIReply(activeChar, textToSend, activeCharState.memories, {
      hunterName: profile.hunterName, hunterGrade, bench1RM: gradeData.bench1RM, streak, cityName, affection: activeCharState.affection, clsName: hunterClass?.cls?.name || 'Centinela'
    });
    setCharacterStates({
      ...characterStates,
      [activeChar.id]: {
        affection: Math.min(120, activeCharState.affection + affGain),
        memories: [...activeCharState.memories.slice(-4), textToSend],
        lastReply: aiReply
      }
    });
    if (!customText) setChatInput('');
  };

  if (!awakened) {
    return (
      <div className="sys-container" style={{ maxWidth: '540px', paddingTop: '24px' }}>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        {toast && <div className="toast-alert"><Sparkles size={18} color="#fbbf24" /><span>{toast}</span></div>}
        <div className="sys-window" style={{ padding: '24px 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span className="sys-badge" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid #fbbf24' }}>PROTOCOLO EX // DESPERTAR</span>
            <h1 className="font-souls" style={{ fontSize: '24px', marginTop: '10px', color: '#fff' }}>CALIBRACIÓN INICIAL</h1>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>Paso {surveyStep} de 3</p>
          </div>

          {surveyStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>NOMBRE CLAVE</label>
                <input className="sys-input" value={profile.hunterName} onChange={(e) => setProfile({ ...profile, hunterName: e.target.value.toUpperCase() })} />
              </div>
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>GÉNERO DE AVATAR</label>
                  <select className="sys-select" value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })}>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>PESO (KG)</label>
                  <input type="number" className="sys-input" value={profile.weightKg} onChange={(e) => setProfile({ ...profile, weightKg: Number(e.target.value) })} />
                </div>
              </div>
              <button className="sys-btn sys-btn-gold" onClick={() => setSurveyStep(2)}>SIGUIENTE <ChevronRight size={16} /></button>
            </div>
          )}

          {surveyStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>PRESS BANCA 5 REPS (KG)</label>
                  <input type="number" className="sys-input" value={profile.benchKg} onChange={(e) => setProfile({ ...profile, benchKg: Number(e.target.value) })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>SENTADILLA 5 REPS (KG)</label>
                  <input type="number" className="sys-input" value={profile.squatKg} onChange={(e) => setProfile({ ...profile, squatKg: Number(e.target.value) })} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>PESO MUERTO 5 REPS (KG)</label>
                <input type="number" className="sys-input" value={profile.deadliftKg} onChange={(e) => setProfile({ ...profile, deadliftKg: Number(e.target.value) })} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="sys-btn sys-btn-ghost" onClick={() => setSurveyStep(1)}>ATRÁS</button>
                <button className="sys-btn sys-btn-gold" style={{ flex: 1 }} onClick={() => setSurveyStep(3)}>FINALIZAR <ChevronRight size={16} /></button>
              </div>
            </div>
          )}

          {surveyStep === 3 && (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Shield size={48} color="#fbbf24" style={{ margin: '0 auto' }} />
              <h2 className="font-souls" style={{ fontSize: '18px', color: '#fbbf24' }}>LISTO PARA DESPERTAR</h2>
              <button className="sys-btn sys-btn-gold" style={{ padding: '14px' }} onClick={awakenHunter}>
                <Zap size={18} /> INICIAR SISTEMA
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="sys-container">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <ExerciseAnimationModal exercise={animModalEx} onClose={() => setAnimModalEx(null)} />
      {toast && <div className="toast-alert"><Zap size={18} color="#fbbf24" /><span>{toast}</span></div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px', marginBottom: '10px', borderRadius: '10px', background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(16,185,129,0.3)', fontSize: '11px' }}>
        <span style={{ color: '#10b981', fontWeight: 700 }}>● SESIÓN ACTIVA: {currentUser.email}</span>
        <span style={{ color: '#94a3b8' }}>Guardado automático</span>
      </div>

      <div className="sys-window" style={{ padding: '16px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span className="sys-badge" style={{ background: 'rgba(0,240,255,0.16)', color: '#00f0ff', border: '1px solid #00f0ff' }}>NIVEL {level}</span>
              <span className="sys-badge" style={{ background: 'rgba(251,191,36,0.16)', color: '#fbbf24', border: '1px solid #fbbf24' }}>GRADO: {hunterGrade}</span>
              <span className="sys-badge" style={{ background: 'rgba(234,88,12,0.2)', color: '#fdba74', border: '1px solid #ea580c' }}><Flame size={13} /> {streak}D</span>
            </div>
            <h1 className="font-souls" style={{ fontSize: '20px', marginTop: '6px', color: '#fff' }}>{profile.hunterName}</h1>
            <div style={{ fontSize: '12px', color: '#fde047', fontWeight: 700 }}>{classEvolution.title}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="font-hud" style={{ fontSize: '16px', fontWeight: 900, color: rankInfo.color }}>{rankInfo.label.toUpperCase()}</div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{rankInfo.totalLP} LP • EXP: {expInLevel}/100</div>
          </div>
        </div>
      </div>

      <div className="nav-tabs">
        <button className={`nav-tab ${activeTab === 'quests' ? 'active' : ''}`} onClick={() => setActiveTab('quests')}><Trophy size={16} color="#fbbf24" /><span>Misiones</span></button>
        <button className={`nav-tab ${activeTab === 'routines' ? 'active' : ''}`} onClick={() => setActiveTab('routines')}><Cpu size={16} color="#10b981" /><span>Rutina</span></button>
        <button className={`nav-tab ${activeTab === 'avatar' ? 'active' : ''}`} onClick={() => setActiveTab('avatar')}><Sword size={16} color="#00f0ff" /><span>Avatar</span></button>
        <button className={`nav-tab ${activeTab === 'pve' ? 'active' : ''}`} onClick={() => setActiveTab('pve')}><BookOpen size={16} color="#f59e0b" /><span>Historia</span></button>
        <button className={`nav-tab ${activeTab === 'city_vn' ? 'active' : ''}`} onClick={() => { if (!cityUnlocked) triggerToast('Completa el Cap. 1 de Historia.'); setActiveTab('city_vn'); }}>
          {cityUnlocked ? <Heart size={16} color="#fb7185" /> : <Lock size={16} color="#94a3b8" />}<span>Ciudad</span>
        </button>
        <button className={`nav-tab ${activeTab === 'pvp' ? 'active' : ''}`} onClick={() => setActiveTab('pvp')}><Users size={16} color="#f43f5e" /><span>PvP</span></button>
        <button className={`nav-tab ${activeTab === 'strength' ? 'active' : ''}`} onClick={() => setActiveTab('strength')}><Dumbbell size={16} color="#e11d48" /><span>Cargas</span></button>
        <button className={`nav-tab ${activeTab === 'vault' ? 'active' : ''}`} onClick={() => setActiveTab('vault')}><Lock size={16} color="#a855f7" /><span>Bóveda</span></button>
        <button className={`nav-tab ${activeTab === 'sleep' ? 'active' : ''}`} onClick={() => setActiveTab('sleep')}><Moon size={16} color="#38bdf8" /><span>Sueño</span></button>
        <button className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}><Settings size={16} color="#94a3b8" /><span>Ajustes</span></button>
      </div>

      {activeTab === 'avatar' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ maxWidth: '480px', width: '100%', margin: '0 auto' }}>
            <JrpgFantasyPortrait
              hunterClass={hunterClass}
              hunterGrade={hunterGrade}
              level={level}
              classEvolution={classEvolution}
              gender={profile.gender}
              onToggleGender={() => setProfile({ ...profile, gender: profile.gender === 'female' ? 'male' : 'female' })}
              passiveClassBonus={passiveClassBonus}
              customGachaArt={customGachaArt}
              onUploadGachaArt={handleUploadGachaArt}
            />
          </div>
        </div>
      )}

      {activeTab === 'quests' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#fbbf24', marginBottom: '12px' }}>MISIONES DIARIAS</h2>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            <input className="sys-input" placeholder="Nueva misión..." value={newQuestTitle} onChange={(e) => setNewQuestTitle(e.target.value)} />
            <button className="sys-btn sys-btn-gold" onClick={() => { if (!newQuestTitle) return; setQuests([{ id: Date.now(), title: newQuestTitle, lp: 40, exp: 80, status: 'pending' }, ...quests]); setNewQuestTitle(''); }}>+</button>
          </div>
          {quests.map((q) => (
            <div key={q.id} style={{ padding: '12px', borderRadius: '10px', background: 'rgba(4,6,12,0.85)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#fff' }}>{q.title}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Recompensa: +{q.lp} LP • +{q.exp} EXP</div>
              </div>
              {q.status === 'pending' ? (
                <button className="sys-btn sys-btn-success" style={{ padding: '6px 10px', fontSize: '10px' }} onClick={() => {
                  setQuests(quests.map(item => item.id === q.id ? { ...item, status: 'completed' } : item));
                  setLp(l => l + q.lp); setExp(e => e + q.exp); setStreak(s => s + 1);
                  triggerToast('¡Misión cumplida! +EXP y Racha.');
                }}>LOGRADO</button>
              ) : <span className="sys-badge" style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7' }}>LISTO</span>}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'routines' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#10b981', marginBottom: '10px' }}>RUTINA PERSONALIZADA</h2>
          <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '12px' }}>Bloque de {profile.routineDurationMonths} mes(es) — {profile.daysPerWeek} días/sem.</p>
          {[
            { name: 'Press Banca Plano / Inclinado', sets: '4x6-8', focus: 'Empuje', cue: 'Retracción escapular firme.' },
            { name: 'Sentadilla Trasera con Barra', sets: '4x6-8', focus: 'Piernas', cue: 'Bracing abdominal fuerte.' },
            { name: 'Dominadas / Remo con Barra', sets: '4x8-10', focus: 'Espalda', cue: 'Control excéntrico de 3s.' }
          ].map((ex, i) => (
            <div key={i} style={{ padding: '12px', borderRadius: '10px', background: 'rgba(4,6,12,0.85)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#fff' }}>{ex.name}</div>
                <div style={{ fontSize: '11px', color: '#fbbf24' }}>{ex.sets} • {ex.focus}</div>
              </div>
              <button className="sys-btn sys-btn-primary" style={{ padding: '6px 10px', fontSize: '10px' }} onClick={() => setAnimModalEx(ex)}>VER TÉCNICA</button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'pve' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-souls" style={{ fontSize: '16px', color: '#f59e0b', marginBottom: '12px' }}>HISTORIA PVE</h2>
          {PVE_STORY_CHAPTERS.map((ch) => {
            const cleared = completedChapters.includes(ch.id);
            const prevCleared = ch.prevId === null || completedChapters.includes(ch.prevId);
            return (
              <div key={ch.id} style={{ padding: '12px', borderRadius: '10px', background: 'rgba(4,6,12,0.85)', marginBottom: '10px', opacity: prevCleared ? 1 : 0.6 }}>
                <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700 }}>{ch.act}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '2px 0' }}>{ch.chapter}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{ch.lore}</div>
                {!cleared && (
                  <button disabled={!prevCleared} className="sys-btn sys-btn-gold" style={{ marginTop: '8px', padding: '6px 12px', fontSize: '10px' }} onClick={() => {
                    setCompletedChapters([...completedChapters, ch.id]);
                    setExp(e => e + ch.expReward); setLp(l => l + ch.lpReward);
                    triggerToast(`¡Capítulo superado! +${ch.expReward} EXP`);
                  }}>INICIAR COMBATE</button>
                )}
                {cleared && <span className="sys-badge" style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7', marginTop: '6px' }}>✓ COMPLETADO</span>}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'city_vn' && cityUnlocked && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-souls" style={{ fontSize: '15px', color: '#fbbf24', marginBottom: '10px' }}><Building2 size={15} /> CIUDAD: {cityName.toUpperCase()}</h2>
            <City2DWorldMap cityName={cityName} builtBuildings={builtBuildings} unlockedCharacters={STORY_CHARACTERS.filter(c => completedChapters.includes(c.unlockChapter))} selectedCharId={activeChar.id} onSelectCharacter={setSelectedCharId} />
          </div>
          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-souls" style={{ fontSize: '15px', color: '#fb7185', marginBottom: '10px' }}><Heart size={15} /> NOVELA VISUAL</h2>
            <div className="grid-2">
              <VisualNovelCharacterPortrait char={activeChar} affectionLabel={activeRel.label} affectionColor={activeRel.color} affectionPoints={activeCharState.affection} />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(4,6,12,0.9)', border: '1px solid rgba(251,113,133,0.4)' }}>
                  <p style={{ fontSize: '13px', color: '#f8fafc', fontStyle: 'italic' }}>«{activeCharState.lastReply}»</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input className="sys-input" placeholder="Hablar con el personaje..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendVisualNovelMessage()} />
                  <button className="sys-btn sys-btn-primary" onClick={() => handleSendVisualNovelMessage()}><Send size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pvp' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#f43f5e', marginBottom: '10px' }}>ARENA PVP (RADIO 30 KM)</h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>Ubicación GPS: {userCoords.label} • Tu código: <strong style={{ color: '#fbbf24' }}>{profile.hunterCode}</strong></p>
          {friends.length === 0 ? <p style={{ fontSize: '13px', color: '#94a3b8' }}>No hay amigos registrados todavía.</p> : null}
        </div>
      )}

      {activeTab === 'strength' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#e11d48', marginBottom: '12px' }}>REGISTRO DE CARGAS</h2>
          <div className="grid-2" style={{ marginBottom: '12px' }}>
            <select className="sys-select" value={selectedExercise} onChange={(e) => setSelectedExercise(e.target.value)}>
              {Object.keys(savedLifts).map(ex => <option key={ex} value={ex}>{ex}</option>)}
            </select>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <input type="number" className="sys-input" placeholder="Kg" value={liftWeightInput} onChange={(e) => setLiftWeightInput(Number(e.target.value))} />
              <input type="number" className="sys-input" placeholder="Reps" value={liftRepsInput} onChange={(e) => setLiftRepsInput(Number(e.target.value))} />
            </div>
          </div>
          <button className="sys-btn sys-btn-gold" onClick={() => {
            if (liftWeightInput <= 0 || liftRepsInput <= 0) return;
            const updated = { ...savedLifts, [selectedExercise]: { weight: liftWeightInput, reps: liftRepsInput, date: new Date().toLocaleDateString() } };
            setSavedLifts(updated);
            setExp(e => e + 40); setLp(l => l + 20);
            triggerToast(`Marca guardada en ${selectedExercise}! +40 EXP`);
          }}><Save size={14} /> GUARDAR MARCA</button>
        </div>
      )}

      {activeTab === 'vault' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#a855f7', marginBottom: '10px' }}>BÓVEDA FÍSICA CIFRADA</h2>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>Tus fotos se guardan con censura facial local automática para revisión trimestral.</p>
        </div>
      )}

      {activeTab === 'sleep' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#38bdf8', marginBottom: '10px' }}>REGISTRO DE SUEÑO ({totalSleep}h acumuladas)</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input type="number" step="0.5" className="sys-input" style={{ maxWidth: '120px' }} value={todaySleep} onChange={(e) => setTodaySleep(Number(e.target.value))} />
            <button className="sys-btn sys-btn-primary" onClick={() => {
              const updated = [...sleepLog];
              updated[updated.length - 1].hours = todaySleep;
              setSleepLog(updated);
              triggerToast('Sueño registrado.');
            }}><Clock size={14} /> GUARDAR HORAS</button>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#00f0ff', marginBottom: '10px' }}>AJUSTES Y CUENTA</h2>
          <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '14px' }}>Usuario activo: <strong>{currentUser.email}</strong></p>
          <button className="sys-btn sys-btn-danger" onClick={handleDeleteAccount}><Trash2 size={14} /> ELIMINAR CUENTA DEFINITIVAMENTE</button>
        </div>
      )}
    </div>
  );
}
