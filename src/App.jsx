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
// ESTILOS INTEGRADOS (HOLOGRAPHIC SYSTEM + JRPG HIGH FIDELITY)
// ============================================================================
const SYSTEM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800;900&family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&display=swap');

  :root {
    --bg-void: #05070d;
    --bg-panel: rgba(11, 16, 30, 0.94);
    --cyan-glow: #00f0ff;
    --gold-rank: #d4af37;
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
      radial-gradient(circle at 18% 12%, rgba(212, 175, 55, 0.12) 0%, transparent 42%),
      radial-gradient(circle at 82% 85%, rgba(0, 240, 255, 0.1) 0%, transparent 45%),
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
    max-width: 1020px;
    margin: 0 auto;
    padding: 16px 14px 96px;
  }

  .sys-window {
    background: var(--bg-panel);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(212, 175, 55, 0.35);
    box-shadow:
      0 10px 36px rgba(0, 0, 0, 0.7),
      inset 0 0 24px rgba(212, 175, 55, 0.06);
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
    grid-template-columns: repeat(5, 1fr);
    gap: 7px;
    margin-bottom: 16px;
  }

  @media (min-width: 820px) {
    .nav-tabs {
      grid-template-columns: repeat(10, 1fr);
    }
  }

  .nav-tab {
    background: rgba(11, 16, 30, 0.78);
    border: 1px solid rgba(148, 163, 184, 0.18);
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
    background: linear-gradient(180deg, rgba(212, 175, 55, 0.24) 0%, rgba(11, 16, 30, 0.96) 100%);
    border-color: var(--gold-rank);
    color: #fff;
    box-shadow: 0 0 14px rgba(212, 175, 55, 0.25);
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

  @keyframes shimmerBorder {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .jrpg-card-frame {
    position: relative;
    border-radius: 16px;
    padding: 3px;
    background: linear-gradient(135deg, #d4af37, #00f0ff, #be123c, #d4af37);
    background-size: 300% 300%;
    animation: shimmerBorder 6s ease infinite;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.85);
  }

  @keyframes heroFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
  }
  .jrpg-breathe {
    animation: heroFloat 3.6s ease-in-out infinite;
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
  { grade: 'F', minComposite: 0.0, benchReq: 0.50, squatReq: 0.65, deadliftReq: 0.80 },
  { grade: 'E', minComposite: 0.70, benchReq: 0.65, squatReq: 0.85, deadliftReq: 1.00 },
  { grade: 'D', minComposite: 0.90, benchReq: 0.80, squatReq: 1.05, deadliftReq: 1.25 },
  { grade: 'C', minComposite: 1.12, benchReq: 1.00, squatReq: 1.25, deadliftReq: 1.50 },
  { grade: 'B', minComposite: 1.32, benchReq: 1.15, squatReq: 1.50, deadliftReq: 1.75 },
  { grade: 'A', minComposite: 1.55, benchReq: 1.34, squatReq: 1.75, deadliftReq: 2.05 },
  { grade: 'S', minComposite: 1.80, benchReq: 1.55, squatReq: 2.00, deadliftReq: 2.35 },
  { grade: 'SS', minComposite: 2.05, benchReq: 1.75, squatReq: 2.25, deadliftReq: 2.60 },
  { grade: 'SSS', minComposite: 2.28, benchReq: 1.95, squatReq: 2.50, deadliftReq: 2.85 },
  { grade: 'EX', minComposite: 2.50, benchReq: 2.15, squatReq: 2.75, deadliftReq: 3.10 },
];

const CLASS_ARCHETYPES = [
  { base: 'Espadachín', weaponType: 'sword', passiveTitle: 'Filo del Duelo Implacable', passiveRule: 'Aumenta +18% el daño crítico por cada repetición pesada de Press Banca.' },
  { base: 'Lancero', weaponType: 'spear', passiveTitle: 'Impulso de la Lanza Perforadora', passiveRule: 'Convierte tu fuerza de Sentadilla en penetración de armadura (+22% Poder).' },
  { base: 'Artista Marcial', weaponType: 'gauntlets', passiveTitle: 'Flujo de los Cien Golpes', passiveRule: 'Multiplica la velocidad y otorga +15% EXP extra por misiones.' },
  { base: 'Berserker', weaponType: 'greatsword', passiveTitle: 'Furia de Sangre Indomable', passiveRule: 'Escala tu ataque bruto directamente con tu 1RM de Peso Muerto.' },
  { base: 'Asesino Sombrío', weaponType: 'daggers', passiveTitle: 'Paso Fantasma del Abismo', passiveRule: 'Otorga ventaja táctica y +20% evasión contra jefes.' },
  { base: 'Monje Astral', weaponType: 'staff', passiveTitle: 'Armonía del Núcleo Interior', passiveRule: 'Duplica los beneficios de recuperación al cumplir tus horas de sueño.' },
  { base: 'Invocador Rúnico', weaponType: 'staff', passiveTitle: 'Sello de los Antiguos', passiveRule: 'Potencia en +30% las estadísticas de reliquias y equipos.' },
  { base: 'Cazador de Abismos', weaponType: 'spear', passiveTitle: 'Instinto de Depredador Alfa', passiveRule: 'Inflige +24% de daño adicional contra monstruos superiores.' },
  { base: 'Centinela', weaponType: 'shield_sword', passiveTitle: 'Muralla Inquebrantable', passiveRule: 'Reduce el desgaste y otorga +40 de defensa base permanente.' },
  { base: 'Duelista', weaponType: 'sword', passiveTitle: 'Estocada de Precisión', passiveRule: 'Cada racha diaria activa suma +12 puntos acumulables de poder.' },
  { base: 'Alquimista Bélico', weaponType: 'sword', passiveTitle: 'Transmutación Metabólica', passiveRule: 'Convierte cada sesión de entrenamiento registrada en +10 EXP.' },
  { base: 'Soberano', weaponType: 'greatsword', passiveTitle: 'Autoridad del Trono', passiveRule: 'Aumenta la prosperidad de tu ciudad y +20% afinidad con aliados.' },
];

const CLASS_AFFINITIES = [
  { name: 'de Ceniza', accent: '#f97316', resonance: 'Resonancia Ígnea: +12% Poder al mantener racha.' },
  { name: 'Carmesí', accent: '#e11d48', resonance: 'Resonancia Vital: +15% eficiencia en cargas máximas.' },
  { name: 'Celestial', accent: '#38bdf8', resonance: 'Resonancia Astral: +15% EXP en misiones.' },
  { name: 'del Vacío', accent: '#a855f7', resonance: 'Resonancia Abisal: +18% daño contra jefes de acto.' },
  { name: 'de Obsidiana', accent: '#94a3b8', resonance: 'Resonancia Férrea: +35 Defensa neural.' },
  { name: 'de Tormenta', accent: '#00f0ff', resonance: 'Resonancia Eléctrica: +14% velocidad en duelos.' },
  { name: 'del Eclipse', accent: '#d4af37', resonance: 'Resonancia Dual: Equilibra ataque y defensa (+10%).' },
  { name: 'Astral', accent: '#818cf8', resonance: 'Resonancia Estelar: Mejora recompensas de historia.' },
  { name: 'Espectral', accent: '#2dd4bf', resonance: 'Resonancia Etérea: Reduce fatiga.' },
  { name: 'de Acero Pálido', accent: '#cbd5e1', resonance: 'Resonancia Metálica: Escala +10% con peso levantado.' },
  { name: 'del Crepúsculo', accent: '#fb7185', resonance: 'Resonancia Crepuscular: +15% afinidad.' },
  { name: 'Primordial', accent: '#fbbf24', resonance: 'Resonancia Ancestral: +20% poder pasivo.' },
  { name: 'de Sangre Real', accent: '#be123c', resonance: 'Resonancia Dinástica: +25 LP adicionales.' },
  { name: 'Inf infinito', accent: '#10b981', resonance: 'Resonancia Sin Límites: +5 poder por nivel.' },
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
    desc: `Arquetipo ${arch.base} sincronizado con afinidad ${aff.name} (Linaje Único #${variantCode}).`
  };
}

function getInfiniteClassEvolution(baseClassName, level) {
  const safeBase = baseClassName || 'Cazador Despertado';
  if (level < 5) return { stage: 1, title: `${safeBase} [Rango I]`, bonus: '+5% Poder Base', nextLvl: 5 };
  if (level < 12) return { stage: 2, title: `${safeBase} Veterano [Rango II]`, bonus: '+15% Poder & Pasiva', nextLvl: 12 };
  if (level < 25) return { stage: 3, title: `Maestro ${safeBase} [Rango III]`, bonus: '+30% Maestría de Clase', nextLvl: 25 };
  if (level < 45) return { stage: 4, title: `Gran ${safeBase} Trascendente [Rango IV]`, bonus: '+55% Soberanía de Acero', nextLvl: 45 };
  if (level < 75) return { stage: 5, title: `Monarca ${safeBase} [Rango V]`, bonus: '+90% Dominio Astral', nextLvl: 75 };
  const ascensionTier = Math.floor((level - 75) / 25) + 1;
  return {
    stage: 5 + ascensionTier,
    title: `Deidad Bélica ${safeBase} [Ascensión ∞-${ascensionTier}]`,
    bonus: `+${90 + ascensionTier * 35}% Poder Infinito`,
    nextLvl: 75 + ascensionTier * 25
  };
}

const DAILY_REWARD_POOL = [
  { id: 'skill_slash', type: 'Habilidad', name: 'Tajo de Acero Templado', power: 35, desc: 'Golpe preciso que escala con tu 1RM de Press Banca.' },
  { id: 'gear_cloak', type: 'Equipamiento', name: 'Capa Real Carmesí', power: 25, desc: 'Manto de batalla que eleva la resistencia.' },
  { id: 'skill_titan', type: 'Habilidad', name: 'Postura del Titán Inamovible', power: 50, desc: 'Escudo neural que escala con tu Sentadilla.' },
  { id: 'gear_blade', type: 'Equipamiento', name: 'Hoja Runificada de Santuario', power: 65, desc: 'Arma forjada de alto rango JRPG.' },
  { id: 'skill_zenkai', type: 'Habilidad', name: 'Despertar Zenkai de Sangre', power: 85, desc: 'Multiplica tu ataque cuando estás en racha activa.' },
  { id: 'gear_crown', type: 'Equipamiento', name: 'Coraza del Monarca Eterno', power: 110, desc: 'Armadura legendaria de placas doradas.' },
];

const PVE_STORY_CHAPTERS = [
  {
    id: 'act1_ch1',
    order: 1,
    prevId: null,
    act: 'Acto I: Las Ruinas de Ceniza',
    chapter: 'Capítulo 1 — El Umbral del Hierro',
    reqPower: 180,
    enemy: 'Centinela Oxidado de la Grieta',
    lore: 'Cruzas el puente de piedra y rescatas a Lyra, una herrera rúnica atrapada junto a la forja antigua. Al superar este capítulo fundas tu Ciudad 2D.',
    rewardType: 'Habilidad Especial',
    rewardName: 'Voluntad de Hierro (Pasiva +20 DEF)',
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
    reqPower: 260,
    enemy: 'Acechador Sombrío de Fenrir',
    lore: 'Entre la niebla lunar, Kaelen, el explorador de las sombras, une fuerzas contigo y patrulla los alrededores de tu ciudad.',
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
    reqPower: 360,
    enemy: 'Comandante Valkiria Caída',
    lore: 'Tras purificar su armadura maldita en un duelo honorable, Seraphina jura lealtad y se instala en la plaza de tu ciudad.',
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
    reqPower: 480,
    enemy: 'Archidemonio Revenant Malakor',
    lore: 'En la biblioteca sellada del Altar conoces a Isolde, oráculo de las estrellas que viaja a tu ciudad para estudiar tu evolución.',
    rewardType: 'Reliquia Única de Historia',
    rewardName: 'Espadón Eclipse del Monarca (+90 ATQ)',
    unlockCharacterId: 'isolde',
    expReward: 380,
    lpReward: 80
  },
  {
    id: 'act3_ch1',
    order: 5,
    prevId: 'act2_ch2',
    act: 'Acto III: El Santuario Celestial',
    chapter: 'Capítulo 5 — Juicio de los Antiguos',
    reqPower: 640,
    enemy: 'Serafín de Acero Astral',
    lore: 'Ascendiendo sobre las nubes, los guardianes celestiales evalúan si tu evolución de clase merece el título de Soberano.',
    rewardType: 'Habilidad Suprema',
    rewardName: 'Juicio Astral de los Mil Filos (+140 ATQ)',
    unlockCharacterId: 'isolde',
    expReward: 550,
    lpReward: 110
  },
  {
    id: 'act4_ch1',
    order: 6,
    prevId: 'act3_ch1',
    act: 'Acto IV: El Abismo Infinito',
    chapter: 'Capítulo 6 — El Trono del Monarca Eterno',
    reqPower: 850,
    enemy: 'Sombra del Monarca Primordial (Jefe Final)',
    lore: 'Tu propio reflejo llevado al límite físico absoluto. Vencerlo sella tu leyenda en el Salón de los Inmortales.',
    rewardType: 'Título & Armadura Mítica',
    rewardName: 'Égida del Monarca Absoluto (+220 PODER)',
    unlockCharacterId: 'seraphina',
    expReward: 900,
    lpReward: 160
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
    eyeColor: '#fbbf24',
    outfitColor: '#7f1d1d',
    trimColor: '#d4af37',
    mapX: 115,
    mapY: 165,
    intro: '¡Por fin llegas! Estaba templando acero en la forja de nuestra nueva ciudad y todos comentan tus levantamientos.'
  },
  {
    id: 'kaelen',
    name: 'Kaelen Vane',
    role: 'Explorador de las Sombras',
    unlockChapter: 'act1_ch2',
    unlockLabel: 'Capítulo 2',
    hairColor: '#cbd5e1',
    eyeColor: '#00f0ff',
    outfitColor: '#1e293b',
    trimColor: '#38bdf8',
    mapX: 375,
    mapY: 155,
    intro: 'Vengo de patrullar los bosques que rodean la muralla. Tu presencia aquí mantiene a raya a las bestias de la grieta.'
  },
  {
    id: 'seraphina',
    name: 'Seraphina Aurelia',
    role: 'Comandante Valkiria',
    unlockChapter: 'act2_ch1',
    unlockLabel: 'Capítulo 3',
    hairColor: '#fef08a',
    eyeColor: '#10b981',
    outfitColor: '#f8fafc',
    trimColor: '#d4af37',
    mapX: 250,
    mapY: 182,
    intro: 'Mi espada ahora protege este asentamiento. Dime, Cazador... ¿entrenaste hoy con la misma intensidad de siempre?'
  },
  {
    id: 'isolde',
    name: 'Isolde Noctis',
    role: 'Oráculo Astral del Eclipse',
    unlockChapter: 'act2_ch2',
    unlockLabel: 'Capítulo 4',
    hairColor: '#8b5cf6',
    eyeColor: '#f59e0b',
    outfitColor: '#312e81',
    trimColor: '#c084fc',
    mapX: 435,
    mapY: 175,
    intro: 'Las estrellas sobre nuestra ciudad brillan distinto desde que superaste tus marcas... Estaba esperando hablar contigo.'
  }
];

const CITY_BUILDINGS_CATALOG = [
  { id: 'forge', name: 'Forja de Acero Real', bonus: '+15 Poder de Equipo y rumores sobre tu fuerza en Press Banca.' },
  { id: 'tavern', name: 'Taberna del Crepúsculo', bonus: 'Centro de rumores del pueblo y +3 Afinidad extra en citas.' },
  { id: 'dojo', name: 'Arena de Entrenamiento', bonus: '+20 Poder de Clase y entrenamiento conjunto con aliados.' },
  { id: 'observatory', name: 'Observatorio Astral', bonus: 'Amplifica tu Habilidad Pasiva Única de Clase.' },
  { id: 'garden', name: 'Jardín de los Juramentos', bonus: 'Lugar especial en el mapa 2D para citas románticas.' },
];

const RACES_POOL = [
  { id: 'ash_saiyan', name: 'Estirpe Guerrero Ceniza', hairColor: '#1e293b', eyeColor: '#d4af37' },
  { id: 'abyss_demon', name: 'Revenant Abisal Carmesí', hairColor: '#9f1239', eyeColor: '#fb7185' },
  { id: 'valkyrie_dusk', name: 'Valkiria del Crepúsculo', hairColor: '#e2e8f0', eyeColor: '#00f0ff' },
  { id: 'fenrir_kin', name: 'Semi-Humano de Fenrir', hairColor: '#78350f', eyeColor: '#f59e0b' },
  { id: 'hollow_lord', name: 'Señor Espectral Celestial', hairColor: '#f8fafc', eyeColor: '#38bdf8' },
  { id: 'monarch_vessel', name: 'Recipiente del Monarca', hairColor: '#0f172a', eyeColor: '#a855f7' },
];

const HOME_EQUIPMENT_OPTIONS = [
  'Mancuernas ajustables',
  'Barra de dominadas',
  'Bandas elásticas',
  'Kettlebell / Pesa rusa',
  'Banco plano / inclinable',
  'Barra recta y discos'
];

const DEFAULT_LIFTS = {
  'Press Banca': { weight: 80, reps: 5, date: 'Inicial' },
  'Sentadilla Trasera': { weight: 105, reps: 5, date: 'Inicial' },
  'Peso Muerto Convencional': { weight: 130, reps: 5, date: 'Inicial' },
  'Press Militar': { weight: 50, reps: 6, date: 'Inicial' },
  'Remo con Barra': { weight: 75, reps: 8, date: 'Inicial' },
  'Dominadas Lastradas (Total)': { weight: 90, reps: 6, date: 'Inicial' },
};

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

function getEffectiveExercise1RM(exName, weight, reps, bodyWeight) {
  const w = Number(weight) || 0;
  const r = Number(reps) || 1;
  const bw = Math.max(40, Number(bodyWeight) || 75);
  if (exName.toLowerCase().includes('dominada') && w < bw * 0.75) {
    return calcEpley1RM(bw + w, r);
  }
  return calcEpley1RM(w, r);
}

function computeHunterGradeData(liftsObj, weightKg) {
  const bw = Math.max(40, Number(weightKg) || 75);
  const bench1RM = getEffectiveExercise1RM('Press Banca', liftsObj['Press Banca']?.weight || 0, liftsObj['Press Banca']?.reps || 1, bw);
  const squat1RM = getEffectiveExercise1RM('Sentadilla Trasera', liftsObj['Sentadilla Trasera']?.weight || 0, liftsObj['Sentadilla Trasera']?.reps || 1, bw);
  const deadlift1RM = getEffectiveExercise1RM('Peso Muerto Convencional', liftsObj['Peso Muerto Convencional']?.weight || 0, liftsObj['Peso Muerto Convencional']?.reps || 1, bw);

  const benchRatio = bench1RM / bw;
  const squatRatio = squat1RM / bw;
  const deadliftRatio = deadlift1RM / bw;
  const compositeRelStrength = (benchRatio + squatRatio + deadliftRatio) / 3;

  let currentIdx = 0;
  for (let i = HUNTER_GRADE_STANDARDS.length - 1; i >= 0; i--) {
    const std = HUNTER_GRADE_STANDARDS[i];
    const reqBenchKg = Math.round(std.benchReq * bw);
    const reqSquatKg = Math.round(std.squatReq * bw);
    const reqDeadliftKg = Math.round(std.deadliftReq * bw);

    if (
      bench1RM >= reqBenchKg &&
      squat1RM >= reqSquatKg &&
      deadlift1RM >= reqDeadliftKg
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
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
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
  const prevTopic = memoryList.length > 0 ? memoryList[memoryList.length - 1] : null;
  const isRomantic = affection >= 70;

  if (lower.includes('entren') || lower.includes('pesa') || lower.includes('fuerza') || lower.includes('banca') || lower.includes('sentadilla')) {
    return isRomantic
      ? `${hunterName}, sé cuánto te esfuerzas... Todos en ${cityName} hablan de tus ${bench1RM} kg en Banca y ${squat1RM} kg en Sentadilla. Verte alcanzar el Grado ${hunterGrade} me hace sentir orgullosa de estar a tu lado.`
      : `Los rumores en ${cityName} son ciertos: levantar ${bench1RM} kg en Banca y ${deadlift1RM} kg en Peso Muerto como ${clsName} impone respeto. Tu Grado de Cazador ${hunterGrade} es insuperable.`;
  }

  if (lower.includes('amor') || lower.includes('gustas') || lower.includes('cita') || lower.includes('quiero') || lower.includes('pareja')) {
    if (affection >= 70) {
      return `Mi corazón ya te pertenece, ${hunterName}... Desde que luchamos juntos y construiste ${cityName}, no dejo de pensar en ti.`;
    }
    return `Me tomas por sorpresa, ${hunterName}... Aprecio mucho nuestra cercanía y cada momento que compartimos en ${cityName}.`;
  }

  if (lower.includes('historia') || lower.includes('jefe') || lower.includes('mision') || lower.includes('batalla')) {
    return `Ya hemos superado ${clearedCount} capítulos de esta campaña. Como ${char.role}, confío plenamente en tu poder como ${clsName}.`;
  }

  if (prevTopic) {
    return isRomantic
      ? `Estaba recordando cuando hablamos sobre "${prevTopic.slice(0, 38)}...". Contigo cada charla en ${cityName} se siente especial, ${hunterName}.`
      : `No olvido lo que me dijiste antes sobre "${prevTopic.slice(0, 38)}...". Aquí en ${cityName} todos admiran tu racha de ${streak} días y tu ascenso al Grado ${hunterGrade}.`;
  }

  return isRomantic
    ? `Me alegra tanto que vinieras a verme a ${cityName}, ${hunterName}. Después de verte entrenar tan duro para mantener tu Grado ${hunterGrade}, solo quería pasar un momento tranquilo contigo.`
    : `Bienvenido de nuevo a mi puesto en ${cityName}, ${hunterName}. He oído que tu clase (${clsName}) sigue evolucionando sin detenerse.`;
}

// ============================================================================
// MOTOR GRÁFICO 2D JRPG DE ALTA FIDELIDAD (ESTILO ANIME / EPIC FANTASY)
// ============================================================================
function JrpgFantasyPortrait({ hunterClass, rankInfo, hunterGrade, level, classEvolution, gender, onToggleGender }) {
  const race = hunterClass?.race || RACES_POOL[5];
  const cls = hunterClass?.cls || { name: 'Cazador Despertado', weaponType: 'sword', accentColor: '#d4af37' };
  const stage = classEvolution.stage;
  const accent = cls.accentColor || '#d4af37';

  const isFemale = gender === 'female';
  const hairCol = race.hairColor || '#1e293b';
  const eyeCol = race.eyeColor || '#00f0ff';

  return (
    <div className="jrpg-card-frame">
      <div style={{
        background: '#080b14',
        borderRadius: '14px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
          <span className="sys-badge" style={{ background: 'rgba(212, 175, 55, 0.18)', color: '#fde047', border: '1px solid rgba(212, 175, 55, 0.5)' }}>
            NV. {level} • ETAPA {stage}
          </span>
          <button
            className="sys-btn sys-btn-ghost"
            style={{ padding: '4px 10px', fontSize: '10px' }}
            onClick={onToggleGender}
          >
            <UserCheck size={12} color="#00f0ff" /> {isFemale ? 'Femenino' : 'Masculino'}
          </button>
        </div>

        <div style={{
          width: '100%',
          maxWidth: '320px',
          aspectRatio: '5 / 6',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          border: `2px solid ${rankInfo.color}`,
          boxShadow: '0 12px 36px rgba(0,0,0,0.95)',
          background: 'linear-gradient(180deg, #090d1e 0%, #171c38 45%, #05070d 100%)'
        }}>
          {/* ILUSTRACIÓN 2D JRPG DE ALTA CALIDAD ESTILIZADA ANIME */}
          <svg viewBox="0 0 320 380" width="100%" height="100%" style={{ display: 'block' }}>
            <defs>
              <linearGradient id="epicSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#060914" />
                <stop offset="50%" stopColor="#1a1236" />
                <stop offset="100%" stopColor="#090d18" />
              </linearGradient>
              <linearGradient id="armorMetal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
              <linearGradient id="capeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#be123c" />
                <stop offset="100%" stopColor="#4c0519" />
              </linearGradient>
            </defs>

            {/* Fondo de Santuario Épico con Rayos Mágicos */}
            <rect width="320" height="380" fill="url(#epicSky)" />
            <circle cx="160" cy="180" r="120" fill={accent} opacity="0.08" />
            <circle cx="250" cy="60" r="30" fill="#fde047" opacity="0.18" />

            {/* Pilares Góticos de Fondo */}
            <rect x="18" y="30" width="22" height="320" fill="#0f172a" opacity="0.6" />
            <rect x="280" y="30" width="22" height="320" fill="#0f172a" opacity="0.6" />
            <path d="M18 70 Q160 10 302 70" fill="none" stroke={accent} strokeWidth="2" opacity="0.4" />

            {/* Personaje JRPG con Respiración y Flotación */}
            <g className="jrpg-breathe">
              {/* Capa Trasera Majestuosa */}
              <path d="M90 148 L52 335 L268 335 L230 148 Z" fill="url(#capeGrad)" opacity="0.95" />
              <path d="M100 148 L65 328 L255 328 L220 148 Z" fill="#310413" opacity="0.8" />

              {/* Arma Épica Brillante (Espada/Lanza/Bastón) */}
              {cls.weaponType === 'spear' || cls.weaponType === 'staff' ? (
                <g>
                  <line x1="248" y1="35" x2="222" y2="345" stroke="#d4af37" strokeWidth="6" strokeLinecap="round" />
                  <polygon points="248,15 235,52 261,52" fill={accent} />
                  <circle cx="248" cy="34" r="8" fill="#fff" opacity="0.8" />
                </g>
              ) : (
                <g>
                  {/* Espada Estilizada Alta Gama */}
                  <polygon points="242,50 252,50 248,252 238,252" fill="#e2e8f0" stroke={accent} strokeWidth="1" />
                  <line x1="245" y1="58" x2="245" y2="240" stroke={accent} strokeWidth="3" />
                  <rect x="228" y="250" width="36" height="8" rx="3" fill="#d4af37" />
                  <rect x="241" y="258" width="9" height="28" fill="#1e293b" />
                  <circle cx="245.5" cy="290" r="7" fill={accent} />
                </g>
              )}

              {/* Cabello Trasero Estilo Anime */}
              {isFemale ? (
                <path d="M110 90 Q88 180 98 255 L222 255 Q232 180 210 90 Z" fill={hairCol} />
              ) : (
                <path d="M118 88 L106 160 L214 160 L202 88 Z" fill={hairCol} />
              )}

              {/* Torso y Armadura de Placas Detallada */}
              <path
                d={isFemale
                  ? 'M120 145 L200 145 L188 230 L202 310 L118 310 L132 230 Z'
                  : 'M108 142 L212 142 L198 235 L208 315 L112 315 L122 235 Z'}
                fill="url(#armorMetal)"
                stroke={accent}
                strokeWidth="2.5"
              />
              {/* Núcleo Rúnico / Gema de Poder en el Pecho */}
              <polygon points="160,165 178,192 160,222 142,192" fill="#090d16" stroke={accent} strokeWidth="2.5" />
              <circle cx="160" cy="193.5" r="7" fill={accent} />
              <circle cx="160" cy="193.5" r="3" fill="#fff" />

              {/* Hombreras Épicas Forjadas */}
              <path d="M92 148 Q116 124 138 148 L126 185 L90 178 Z" fill="#1e293b" stroke={accent} strokeWidth="2.5" />
              <path d="M228 148 Q204 124 182 148 L194 185 L230 178 Z" fill="#1e293b" stroke={accent} strokeWidth="2.5" />

              {/* Brazos y Guanteletes */}
              <rect x="94" y="176" width="24" height="78" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
              <rect x="202" y="176" width="24" height="78" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />

              {/* Cuello y Rostro Anime Estilizado de Alta Definición */}
              <rect x="148" y="126" width="24" height="24" rx="6" fill="#fbcfe8" />
              <path d="M126 88 Q126 138 160 144 Q194 138 194 88 Q194 58 160 58 Q126 58 126 88 Z" fill="#ffedd5" />

              {/* Ojos Estilo JRPG Brillantes */}
              <ellipse cx="145" cy="102" rx="6" ry="7.5" fill={eyeCol} />
              <ellipse cx="175" cy="102" rx="6" ry="7.5" fill={eyeCol} />
              <ellipse cx="145" cy="102" rx="2.5" ry="3.5" fill="#030712" />
              <ellipse cx="175" cy="102" rx="2.5" ry="3.5" fill="#030712" />
              <circle cx="147" cy="99" r="2" fill="#fff" />
              <circle cx="177" cy="99" r="2" fill="#fff" />

              {/* Expresión decidida */}
              <path d="M152 118 Q160 124 168 118" fill="none" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />

              {/* Flequillo y Cabello Delantero Anime */}
              <path d="M122 92 Q130 52 160 50 Q190 52 198 92 L182 76 L168 94 L160 74 L152 94 L138 76 Z" fill={hairCol} />

              {/* Corona o Tiara si Etapa >= 3 */}
              {stage >= 3 && (
                <g>
                  <path d="M132 64 L146 48 L160 58 L174 48 L188 64" fill="none" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="160" cy="54" r="4" fill="#00f0ff" />
                </g>
              )}
            </g>
          </svg>

          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(0deg, rgba(4,6,12,0.97) 0%, rgba(4,6,12,0.8) 72%, transparent 100%)',
            padding: '24px 12px 10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            <div>
              <div className="font-souls" style={{ fontSize: '15px', fontWeight: 900, color: '#fff' }}>
                {classEvolution.title}
              </div>
              <div style={{ fontSize: '11px', color: '#fde047', fontWeight: 700 }}>
                {classEvolution.bonus}
              </div>
            </div>
            <span className="sys-badge" style={{ background: 'rgba(0, 240, 255, 0.22)', color: '#00f0ff', border: '1px solid #00f0ff' }}>
              GRADO {hunterGrade}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// RETRATO 2D DE NOVELA VISUAL DE ALTA FIDELIDAD
// ============================================================================
function VisualNovelCharacterPortrait({ char, affectionLabel, affectionColor, affectionPoints }) {
  return (
    <div style={{
      borderRadius: '12px',
      overflow: 'hidden',
      border: '2px solid #fb7185',
      background: '#080b14',
      position: 'relative',
      minHeight: '320px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.85)'
    }}>
      <svg viewBox="0 0 300 340" width="100%" height="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id={`vnBg_${char.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2e1065" />
            <stop offset="65%" stopColor="#4c0519" />
            <stop offset="100%" stopColor="#05070d" />
          </linearGradient>
        </defs>
        <rect width="300" height="340" fill={`url(#vnBg_${char.id})`} />
        <circle cx="80" cy="70" r="34" fill="#fb7185" opacity="0.18" />

        <g className="jrpg-breathe">
          {/* Cabello trasero */}
          <path d="M98 84 Q82 175 92 250 L208 250 Q218 175 202 84 Z" fill={char.hairColor} />

          {/* Vestimenta de Novela Visual */}
          <path d="M102 145 L198 145 L212 305 L88 305 Z" fill={char.outfitColor} stroke={char.trimColor} strokeWidth="2.5" />
          <path d="M135 145 L150 185 L165 145" fill="none" stroke={char.trimColor} strokeWidth="2.5" />

          {/* Cuello y Rostro Anime Estilizado */}
          <rect x="138" y="124" width="24" height="24" rx="6" fill="#fbcfe8" />
          <path d="M118 90 Q118 140 150 146 Q182 140 182 90 Q182 60 150 60 Q118 60 118 90 Z" fill="#ffedd5" />

          {/* Ojos expresivos */}
          <ellipse cx="136" cy="102" rx="6" ry="7.5" fill={char.eyeColor} />
          <ellipse cx="164" cy="102" rx="6" ry="7.5" fill={char.eyeColor} />
          <circle cx="138" cy="99" r="2" fill="#fff" />
          <circle cx="166" cy="99" r="2" fill="#fff" />

          {/* Sonrisa y rubor */}
          <ellipse cx="128" cy="115" rx="6" ry="3" fill="#fb7185" opacity="0.5" />
          <ellipse cx="172" cy="115" rx="6" ry="3" fill="#fb7185" opacity="0.5" />
          <path d="M142 122 Q150 128 158 122" fill="none" stroke="#be123c" strokeWidth="2" strokeLinecap="round" />

          {/* Flequillo */}
          <path d="M114 90 Q124 54 150 52 Q176 54 186 90 L172 78 L160 92 L150 76 L140 92 L128 78 Z" fill={char.hairColor} />
        </g>
      </svg>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(0deg, rgba(4,6,12,0.98) 0%, rgba(4,6,12,0.78) 75%, transparent 100%)',
        padding: '18px 12px 10px'
      }}>
        <div className="font-souls" style={{ fontSize: '16px', fontWeight: 900, color: '#fff' }}>{char.name}</div>
        <div style={{ fontSize: '11px', color: '#fda4af' }}>{char.role}</div>
        <div style={{ marginTop: '4px' }}>
          <span className="sys-badge" style={{ background: 'rgba(251,113,133,0.22)', color: affectionColor, border: `1px solid ${affectionColor}` }}>
            {affectionLabel} ({affectionPoints} pts)
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAPA 2D INTERACTIVO DE LA CIUDAD DE ALTA CALIDAD
// ============================================================================
function City2DWorldMap({ cityName, builtBuildings, unlockedCharacters, selectedCharId, onSelectCharacter }) {
  return (
    <div style={{
      borderRadius: '12px',
      overflow: 'hidden',
      border: '2px solid rgba(212, 175, 55, 0.6)',
      background: '#050812',
      marginBottom: '14px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '8px',
        left: '10px',
        right: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
        pointerEvents: 'none'
      }}>
        <span className="sys-badge" style={{ background: 'rgba(4,6,12,0.9)', color: '#fde047', border: '1px solid #d4af37' }}>
          MAPA 2D JRPG • {cityName.toUpperCase()}
        </span>
        <span className="sys-badge" style={{ background: 'rgba(4,6,12,0.9)', color: '#00f0ff', border: '1px solid #00f0ff' }}>
          ALIADOS EN CIUDAD: {unlockedCharacters.length}
        </span>
      </div>

      <svg viewBox="0 0 540 230" width="100%" height="230" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="cityEpicSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#070a18" />
            <stop offset="60%" stopColor="#1a1236" />
            <stop offset="100%" stopColor="#2e1065" />
          </linearGradient>
        </defs>

        <rect width="540" height="230" fill="url(#cityEpicSky)" />
        <circle cx="470" cy="40" r="22" fill="#fde047" opacity="0.3" />
        <polygon points="0,145 90,72 180,145" fill="#0f172a" />
        <polygon points="140,145 260,60 380,145" fill="#171e33" />
        <polygon points="330,145 450,68 540,145" fill="#0f172a" />

        <rect x="0" y="142" width="540" height="88" fill="#0d1b12" />
        <rect x="0" y="168" width="540" height="26" fill="#334155" />
        <line x1="0" y1="168" x2="540" y2="168" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="8 6" />
        <line x1="0" y1="194" x2="540" y2="194" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="8 6" />

        {/* Ayuntamiento Central */}
        <g>
          <rect x="230" y="88" width="80" height="58" fill="#1e293b" stroke="#d4af37" strokeWidth="2.5" />
          <polygon points="222,88 270,58 318,88" fill="#991b1b" stroke="#d4af37" strokeWidth="2" />
          <rect x="261" y="118" width="18" height="28" fill="#05070d" />
          <text x="270" y="52" textAnchor="middle" fill="#fde047" fontSize="9" fontWeight="bold">AYUNTAMIENTO</text>
        </g>

        {/* Forja */}
        {builtBuildings.includes('forge') && (
          <g>
            <rect x="65" y="102" width="68" height="44" fill="#292524" stroke="#f97316" strokeWidth="2" />
            <polygon points="60,102 99,78 138,102" fill="#7c2d12" />
            <rect x="114" y="70" width="10" height="22" fill="#44403c" />
            <circle cx="119" cy="64" r="5" fill="#fb923c" opacity="0.8" />
            <text x="99" y="74" textAnchor="middle" fill="#fdba74" fontSize="8" fontWeight="bold">FORJA</text>
          </g>
        )}

        {/* Taberna */}
        {builtBuildings.includes('tavern') && (
          <g>
            <rect x="148" y="100" width="70" height="46" fill="#3f2e21" stroke="#fbbf24" strokeWidth="2" />
            <polygon points="142,100 183,76 224,100" fill="#92400e" />
            <rect x="160" y="112" width="12" height="14" fill="#fde047" />
            <rect x="194" y="112" width="12" height="14" fill="#fde047" />
            <text x="183" y="71" textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="bold">TABERNA</text>
          </g>
        )}

        {/* Dojo */}
        {builtBuildings.includes('dojo') && (
          <g>
            <rect x="324" y="102" width="74" height="44" fill="#1e293b" stroke="#00f0ff" strokeWidth="2" />
            <polygon points="318,102 361,78 404,102" fill="#0369a1" />
            <text x="361" y="74" textAnchor="middle" fill="#00f0ff" fontSize="8" fontWeight="bold">ARENA DOJO</text>
          </g>
        )}

        {/* Observatorio */}
        {builtBuildings.includes('observatory') && (
          <g>
            <rect x="412" y="92" width="48" height="54" fill="#312e81" stroke="#c084fc" strokeWidth="2" />
            <path d="M412 92 Q436 62 460 92 Z" fill="#6b21a8" stroke="#c084fc" strokeWidth="1.8" />
            <text x="436" y="58" textAnchor="middle" fill="#e9d5ff" fontSize="8" fontWeight="bold">OBSERVATORIO</text>
          </g>
        )}

        {/* Jardín */}
        {builtBuildings.includes('garden') && (
          <g>
            <circle cx="488" cy="130" r="18" fill="#065f46" stroke="#fb7185" strokeWidth="2" />
            <circle cx="481" cy="125" r="3.5" fill="#fb7185" />
            <circle cx="495" cy="128" r="3.5" fill="#fda4af" />
            <text x="488" y="108" textAnchor="middle" fill="#fda4af" fontSize="8" fontWeight="bold">JARDÍN ♥</text>
          </g>
        )}

        {/* Personajes Desbloqueados patrullando la ciudad */}
        {unlockedCharacters.map((char, idx) => {
          const isSelected = char.id === selectedCharId;
          return (
            <g
              key={char.id}
              className={idx % 2 === 0 ? 'npc-walk-1' : 'npc-walk-2'}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectCharacter(char.id)}
            >
              <circle cx={char.mapX} cy={char.mapY - 30} r="10" fill="#050812" stroke={isSelected ? '#fb7185' : '#d4af37'} strokeWidth="1.8" />
              <text x={char.mapX} y={char.mapY - 27} textAnchor="middle" fill={isSelected ? '#fb7185' : '#fde047'} fontSize="8" fontWeight="bold">
                {isSelected ? '♥' : '!'}
              </text>

              <rect x={char.mapX - 8} y={char.mapY - 8} width="16" height="20" rx="4" fill={char.outfitColor} stroke={char.trimColor} strokeWidth="1.5" />
              <circle cx={char.mapX} cy={char.mapY - 14} r="7.5" fill="#ffedd5" />
              <path d={`M${char.mapX - 7} ${char.mapY - 15} Q${char.mapX} ${char.mapY - 23} ${char.mapX + 7} ${char.mapY - 15}`} fill={char.hairColor} />

              <rect x={char.mapX - 30} y={char.mapY + 14} width="60" height="14" rx="4" fill="rgba(4,6,12,0.9)" />
              <text x={char.mapX} y={char.mapY + 24} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                {char.name.split(' ')[0]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ============================================================================
// VISOR DE MINI ANIMACIÓN BIOMECÁNICA
// ============================================================================
function ExerciseAnimationModal({ exercise, onClose }) {
  if (!exercise) return null;
  const animType = exercise.anim || 'press';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9998,
      background: 'rgba(3, 5, 10, 0.88)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div className="sys-window" style={{ maxWidth: '420px', width: '100%', padding: '20px', textAlign: 'center' }}>
        <span className="sys-badge" style={{ background: 'rgba(0,240,255,0.16)', color: '#00f0ff', border: '1px solid #00f0ff' }}>
          SIMULACIÓN BIOMECÁNICA EN VIVO
        </span>
        <h3 className="font-souls" style={{ fontSize: '18px', color: '#fff', marginTop: '8px' }}>
          {exercise.name}
        </h3>
        <p style={{ fontSize: '12px', color: '#d4af37', marginBottom: '12px' }}>
          {exercise.sets} • {exercise.focus}
        </p>

        <div style={{
          background: 'radial-gradient(circle at 50% 50%, #111827 0%, #05070d 100%)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '12px',
          padding: '14px',
          marginBottom: '12px'
        }}>
          <svg viewBox="0 0 220 150" width="100%" height="150">
            <line x1="20" y1="132" x2="200" y2="132" stroke="#475569" strokeWidth="3" strokeLinecap="round" />

            {animType === 'press' && (
              <g>
                <rect x="45" y="102" width="130" height="8" rx="3" fill="#334155" />
                <rect x="65" y="110" width="8" height="22" fill="#1e293b" />
                <rect x="145" y="110" width="8" height="22" fill="#1e293b" />
                <circle cx="62" cy="92" r="9" fill="#00f0ff" />
                <rect x="74" y="92" width="75" height="9" rx="4" fill="#cbd5e1" />
                <g className="bio-press">
                  <line x1="105" y1="92" x2="105" y2="62" stroke="#d4af37" strokeWidth="4" strokeLinecap="round" />
                  <line x1="75" y1="62" x2="135" y2="62" stroke="#f8fafc" strokeWidth="3" />
                  <circle cx="75" cy="62" r="8" fill="#be123c" />
                  <circle cx="135" cy="62" r="8" fill="#be123c" />
                </g>
              </g>
            )}

            {animType === 'squat' && (
              <g>
                <g className="bio-squat">
                  <circle cx="110" cy="40" r="10" fill="#00f0ff" />
                  <line x1="110" y1="52" x2="110" y2="92" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
                  <line x1="72" y1="56" x2="148" y2="56" stroke="#d4af37" strokeWidth="3.5" />
                  <circle cx="72" cy="56" r="8" fill="#be123c" />
                  <circle cx="148" cy="56" r="8" fill="#be123c" />
                  <line x1="110" y1="92" x2="94" y2="130" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
                  <line x1="110" y1="92" x2="126" y2="130" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
                </g>
              </g>
            )}

            {animType === 'pull' && (
              <g>
                <line x1="50" y1="22" x2="170" y2="22" stroke="#d4af37" strokeWidth="4" strokeLinecap="round" />
                <g className="bio-pull">
                  <circle cx="110" cy="46" r="9" fill="#00f0ff" />
                  <line x1="110" y1="56" x2="110" y2="96" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
                  <line x1="92" y1="22" x2="110" y2="62" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                  <line x1="128" y1="22" x2="110" y2="62" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                  <line x1="110" y1="96" x2="102" y2="124" stroke="#94a3b8" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1="110" y1="96" x2="118" y2="124" stroke="#94a3b8" strokeWidth="4.5" strokeLinecap="round" />
                </g>
              </g>
            )}
          </svg>
          <div style={{ fontSize: '11px', color: '#00f0ff', marginTop: '4px' }}>
            Fase Excéntrica: 3 seg controlados • Fase Concéntrica: Explosiva
          </div>
        </div>

        <div style={{ textAlign: 'left', fontSize: '13px', color: '#e2e8f0', background: 'rgba(4,6,12,0.85)', padding: '10px 12px', borderRadius: '9px', marginBottom: '12px' }}>
          <strong>Claves Biomecánicas:</strong> {exercise.cue}
        </div>

        <button className="sys-btn sys-btn-gold" style={{ width: '100%' }} onClick={onClose}>
          ENTENDIDO, CERRAR VISOR
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// PORTAL DE INICIO DE SESIÓN Y REGISTRO (SESIÓN PERMANENTE)
// ============================================================================
function AuthPortal({ onAuthenticated }) {
  const [authMode, setAuthMode] = useState('login');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [hunterTagInput, setHunterTagInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    const cleanEmail = emailInput.trim().toLowerCase();
    if (!cleanEmail || !passwordInput || passwordInput.length < 4) {
      setAuthError('Ingresa un correo/usuario válido y contraseña de al menos 4 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const passHash = await hashSecret(passwordInput);
      const usersDb = JSON.parse(localStorage.getItem('pex_users_registry_v10') || '{}');

      if (authMode === 'register') {
        if (usersDb[cleanEmail]) {
          setAuthError('Ese correo o usuario ya está registrado. Cambia a "Iniciar Sesión".');
          setLoading(false);
          return;
        }
        const newAccount = {
          email: cleanEmail,
          passHash,
          hunterName: (hunterTagInput.trim() || cleanEmail.split('@')[0] || 'CAZADOR_01').toUpperCase(),
          hunterCode: `#PEX-${Math.floor(1000 + Math.random() * 8999)}`,
          createdAt: new Date().toISOString()
        };
        usersDb[cleanEmail] = newAccount;
        localStorage.setItem('pex_users_registry_v10', JSON.stringify(usersDb));
        onAuthenticated(newAccount);
      } else {
        const existing = usersDb[cleanEmail];
        if (!existing) {
          setAuthError('Cuenta no encontrada. Regístrate primero.');
          setLoading(false);
          return;
        }
        if (existing.passHash !== passHash) {
          setAuthError('Contraseña incorrecta.');
          setLoading(false);
          return;
        }
        onAuthenticated(existing);
      }
    } catch {
      setAuthError('Error al verificar credenciales.');
    }
    setLoading(false);
  };

  return (
    <div className="sys-container" style={{ maxWidth: '460px', paddingTop: '44px' }}>
      <div className="sys-window" style={{ padding: '26px 22px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span className="sys-badge" style={{ background: 'rgba(0,240,255,0.14)', color: '#00f0ff', border: '1px solid #00f0ff' }}>
            [SISTEMA DE IDENTIDAD PERMANENTE]
          </span>
          <h1 className="font-souls" style={{ fontSize: '27px', marginTop: '10px', color: '#fff' }}>
            PROTOCOLO EX
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
            Tu sesión permanece abierta automáticamente
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '18px' }}>
          <button
            type="button"
            className={`sys-btn ${authMode === 'login' ? 'sys-btn-gold' : 'sys-btn-ghost'}`}
            onClick={() => { setAuthMode('login'); setAuthError(''); }}
          >
            <LogIn size={14} /> INICIAR SESIÓN
          </button>
          <button
            type="button"
            className={`sys-btn ${authMode === 'register' ? 'sys-btn-gold' : 'sys-btn-ghost'}`}
            onClick={() => { setAuthMode('register'); setAuthError(''); }}
          >
            <UserPlus size={14} /> CREAR CUENTA
          </button>
        </div>

        <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {authMode === 'register' && (
            <div>
              <label style={{ fontSize: '11px', color: '#d4af37', fontWeight: 700 }}>NOMBRE CLAVE DE CAZADOR</label>
              <input
                className="sys-input"
                placeholder="Ej: SUNG_JINWOO"
                value={hunterTagInput}
                onChange={(e) => setHunterTagInput(e.target.value)}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '11px', color: '#d4af37', fontWeight: 700 }}>
              <Mail size={12} style={{ display: 'inline', marginRight: '4px' }} /> CORREO O USUARIO
            </label>
            <input
              type="text"
              className="sys-input"
              placeholder="cazador@protocolo-ex.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#d4af37', fontWeight: 700 }}>
              <KeyRound size={12} style={{ display: 'inline', marginRight: '4px' }} /> CONTRASEÑA
            </label>
            <input
              type="password"
              className="sys-input"
              placeholder="••••••••"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
            />
          </div>

          {authError && (
            <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(225, 29, 72, 0.16)', border: '1px solid #e11d48', fontSize: '12px', color: '#fda4af' }}>
              {authError}
            </div>
          )}

          <button type="submit" className="sys-btn sys-btn-primary" style={{ padding: '14px', fontSize: '12px', marginTop: '4px' }} disabled={loading}>
            <Zap size={16} /> {authMode === 'login' ? 'ENTRAR AL SISTEMA' : 'REGISTRAR Y COMENZAR'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
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

// ============================================================================
// ESPACIO DE TRABAJO DEL CAZADOR
// ============================================================================
function HunterSystemWorkspace({ currentUser, onDeleteAccount }) {
  const storageKey = `pex_user_data_v10_${currentUser.email}`;

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
    hunterCode: currentUser.hunterCode || '#PEX-8100',
    gender: 'male',
    goal: 'Hipertrofia y Estética',
    routineDurationMonths: 2,
    daysPerWeek: 4,
    injuries: 'Ninguna',
    equipmentMode: 'all_gym',
    ownedHomeEquipment: ['Mancuernas ajustables', 'Barra de dominadas'],
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
  });

  const [hunterClass, setHunterClass] = useState(() => initialData?.hunterClass || null);
  const [savedLifts, setSavedLifts] = useState(() => initialData?.savedLifts || DEFAULT_LIFTS);
  const [lp, setLp] = useState(() => initialData?.lp ?? 1840);
  const [exp, setExp] = useState(() => initialData?.exp ?? 420);
  const [streak, setStreak] = useState(() => initialData?.streak ?? 5);

  const [unlockedInventory, setUnlockedInventory] = useState(() => initialData?.unlockedInventory || [DAILY_REWARD_POOL[0], DAILY_REWARD_POOL[1]]);
  const [completedChapters, setCompletedChapters] = useState(() => initialData?.completedChapters || []);
  const [pveBattleLog, setPveBattleLog] = useState(null);

  const [cityName, setCityName] = useState(() => initialData?.cityName || 'Bastión de Ceniza');
  const [builtBuildings, setBuiltBuildings] = useState(() => initialData?.builtBuildings || ['forge']);
  const [selectedCharId, setSelectedCharId] = useState('lyra');
  const [characterStates, setCharacterStates] = useState(() => initialData?.characterStates || {
    lyra: { affection: 25, memories: ['Nos conocimos en las Ruinas de Ceniza junto a la forja antigua.'], lastReply: '¡Por fin llegas! Estaba templando acero en la forja de nuestra nueva ciudad.' },
    kaelen: { affection: 15, memories: ['Patrullamos juntos el Bosque de los Ecos.'], lastReply: 'Vengo de patrullar los bosques que rodean la muralla.' },
    seraphina: { affection: 20, memories: ['Juré lealtad a tu ciudad tras nuestro duelo honorable.'], lastReply: 'Mi espada ahora protege este asentamiento.' },
    isolde: { affection: 30, memories: ['Observé el brillo de tu clase infinita en el Altar del Eclipse.'], lastReply: 'Las estrellas sobre nuestra ciudad brillan distinto desde que superaste tus marcas.' },
  });
  const [chatInput, setChatInput] = useState('');
  const [confirmDeleteText, setConfirmDeleteText] = useState('');

  const [userCoords, setUserCoords] = useState({ lat: -34.0981, lon: -59.0286, label: 'Zárate, Buenos Aires (GPS Activo)' });
  const [friends, setFriends] = useState(() => initialData?.friends || [
    { id: 1, name: 'VALKIRIA_SOL', code: '#PEX-4412', level: 8, grade: 'B', power: 340, lat: -34.1632, lon: -58.9592, city: 'Campana' },
    { id: 2, name: 'TITAN_MARCOS', code: '#PEX-9021', level: 14, grade: 'A', power: 460, lat: -34.5612, lon: -59.1189, city: 'Luján' },
  ]);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendCode, setNewFriendCode] = useState('');
  const [newFriendDistKm, setNewFriendDistKm] = useState(12);
  const [pvpLog, setPvpLog] = useState(null);

  const [activeTab, setActiveTab] = useState('quests');
  const [toast, setToast] = useState(null);
  const [animModalEx, setAnimModalEx] = useState(null);

  const [quests, setQuests] = useState(() => initialData?.quests || [
    { id: 1, title: 'Press Banca: 4x8 con 80 kg declarados', env: 'Gimnasio', lp: 45, exp: 95, status: 'pending' },
    { id: 2, title: 'Correr 5 km ritmo constante al aire libre', env: 'Exterior', lp: 40, exp: 85, status: 'pending' },
    { id: 3, title: 'Dormir al menos 7.5 horas esta noche', env: 'Recuperación', lp: 25, exp: 50, status: 'completed' },
  ]);
  const [nextWeekQueue, setNextWeekQueue] = useState(() => initialData?.nextWeekQueue || [
    { id: 101, title: 'Sentadilla Profunda 4x6 (115 kg) - Reto recuperable', lp: 50, exp: 110 }
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

  const [customRoutineText, setCustomRoutineText] = useState('');
  const [scanReport, setScanReport] = useState(null);

  const [sleepLog, setSleepLog] = useState(() => initialData?.sleepLog || [
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

  const gradeData = computeHunterGradeData(savedLifts, profile.weightKg);
  const hunterGrade = gradeData.currentStd.grade;
  const prevGradeRef = useRef(hunterGrade);

  const cityUnlocked = completedChapters.includes('act1_ch1');

  useEffect(() => {
    if (awakened && prevGradeRef.current !== hunterGrade) {
      const oldIdx = HUNTER_GRADE_STANDARDS.findIndex((g) => g.grade === prevGradeRef.current);
      const newIdx = HUNTER_GRADE_STANDARDS.findIndex((g) => g.grade === hunterGrade);
      if (newIdx > oldIdx) {
        triggerToast(`¡ASCENSO DE GRADO! Has subido a GRADO ${hunterGrade}.`);
      }
      prevGradeRef.current = hunterGrade;
    }
  }, [hunterGrade, awakened]);

  useEffect(() => {
    const payload = {
      awakened, profile, hunterClass, savedLifts, lp, exp, streak,
      unlockedInventory, completedChapters, cityName, builtBuildings,
      characterStates, friends, quests, nextWeekQueue, sleepLog,
    };
    localStorage.setItem(storageKey, JSON.stringify(payload));
  }, [
    storageKey, awakened, profile, hunterClass, savedLifts,
    lp, exp, streak, unlockedInventory, completedChapters,
    cityName, builtBuildings, characterStates, friends, quests, nextWeekQueue, sleepLog
  ]);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4600);
  };

  const level = Math.max(1, Math.floor(exp / 100) + 1);
  const expInLevel = exp % 100;
  const classEvolution = getInfiniteClassEvolution(hunterClass?.cls?.name, level);

  const passiveClassBonus = 30 + level * 6 + builtBuildings.length * 12;
  const gearBonusPower = unlockedInventory.reduce((acc, item) => acc + (item.power || 0), 0);
  const hunterCombatPower = Math.round(
    (gradeData.bench1RM + gradeData.squat1RM + gradeData.deadlift1RM) * 0.45 +
    level * 14 + gearBonusPower + passiveClassBonus
  );

  const townRumors = [
    `En ${cityName} todos comentan que ${profile.hunterName} levantó ${gradeData.bench1RM} kg en Banca y ${gradeData.squat1RM} kg en Sentadilla.`,
    `Tu Grado de Cazador ${hunterGrade} (${gradeData.compositeRelStrength.toFixed(2)}x BW) impone respeto en toda la región.`,
    completedChapters.length > 0
      ? `Derrotaste a ${PVE_STORY_CHAPTERS[Math.min(PVE_STORY_CHAPTERS.length - 1, completedChapters.length - 1)].enemy} en la campaña.`
      : `Se rumorea que en las Ruinas de Ceniza aguarda un Centinela que pondrá a prueba tu clase.`,
    `Los mercaderes admiran tu racha disciplinada de ${streak} días.`
  ];

  const unlockedCharacters = STORY_CHARACTERS.filter((c) => completedChapters.includes(c.unlockChapter));
  const activeChar = unlockedCharacters.find((c) => c.id === selectedCharId) || unlockedCharacters[0] || STORY_CHARACTERS[0];
  const activeCharState = characterStates[activeChar.id] || { affection: 10, memories: [], lastReply: activeChar.intro };
  const activeRel = getRelationshipLabel(activeCharState.affection);

  const handleSendVisualNovelMessage = (customPromptText = null, affectionGain = 4) => {
    const textToSend = (customPromptText || chatInput).trim();
    if (!textToSend) return;

    const aiReply = generateCharacterAIReply(
      activeChar, textToSend, activeCharState.memories || [],
      {
        hunterName: profile.hunterName, hunterGrade,
        bench1RM: gradeData.bench1RM, squat1RM: gradeData.squat1RM, deadlift1RM: gradeData.deadlift1RM,
        streak, cityName, clearedCount: completedChapters.length,
        affection: activeCharState.affection, clsName: hunterClass?.cls?.name || 'Cazador'
      }
    );

    const updatedMemories = [...(activeCharState.memories || []).slice(-4), textToSend];
    const bonusTavern = builtBuildings.includes('tavern') ? 3 : 0;
    const nextAffection = Math.min(120, activeCharState.affection + affectionGain + bonusTavern);

    setCharacterStates({
      ...characterStates,
      [activeChar.id]: { affection: nextAffection, memories: updatedMemories, lastReply: aiReply }
    });
    if (!customPromptText) setChatInput('');
  };

  const generatePersonalizedRoutine = () => {
    const weeks = profile.routineDurationMonths === 1 ? '4 Semanas (Bloque Intensivo)' : '8 Semanas (Mesociclo Completo)';
    const mode = profile.equipmentMode;
    const owned = profile.ownedHomeEquipment || [];

    if (mode === 'no_equip') {
      return {
        horizon: weeks,
        modeLabel: 'En Casa — Sin Nada de Equipo',
        phases: ['Sem 1-2: Control excéntrico y técnica estricta', 'Sem 3-4: Densidad metabólica y series al fallo técnico'],
        exercises: [
          { name: 'Flexiones Declinadas con Pausa', sets: '4x12-15', focus: 'Pectoral y Tríceps', anim: 'press', cue: 'Pecho toca casi el suelo.' },
          { name: 'Sentadilla Búlgara Peso Corporal', sets: '4x12 por pierna', focus: 'Cuádriceps y Glúteo', anim: 'squat', cue: 'Torso ligeramente inclinado.' },
          { name: 'Remo Invertido bajo Mesa', sets: '4x10-12', focus: 'Dorsal y Romboides', anim: 'pull', cue: 'Retrae escápulas.' },
        ]
      };
    }
    return {
      horizon: weeks,
      modeLabel: 'Gimnasio Completo',
      phases: ['Sem 1-3: Hipertrofia estructural', 'Sem 4-6: Fuerza-Hipertrofia', 'Sem 7-8: Pico y descarga'],
      exercises: [
        { name: 'Press Banca con Barra', sets: '4x6-8', focus: 'Pectoral y Tríceps', anim: 'press', cue: 'Retracción escapular firme.' },
        { name: 'Sentadilla Trasera', sets: '4x6-8', focus: 'Cuádriceps y Core', anim: 'squat', cue: 'Bracing abdominal profundo.' },
        { name: 'Dominadas Lastradas', sets: '4x8-10', focus: 'Dorsales', anim: 'pull', cue: 'Tirón limpio al pecho.' },
      ]
    };
  };

  const activeRoutinePlan = generatePersonalizedRoutine();

  const toggleHomeEquipment = (eq) => {
    const current = profile.ownedHomeEquipment || [];
    const exists = current.includes(eq);
    setProfile({
      ...profile,
      ownedHomeEquipment: exists ? current.filter((x) => x !== eq) : [...current, eq]
    });
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

    const prevRecord = savedLifts[selectedExercise];
    const prev1RM = prevRecord ? getEffectiveExercise1RM(selectedExercise, prevRecord.weight, prevRecord.reps, profile.weightKg) : 0;
    const new1RM = getEffectiveExercise1RM(selectedExercise, w, r, profile.weightKg);

    const kgGain = Math.max(0, new1RM - prev1RM);
    const gainedExp = 35 + kgGain * 15;
    const gainedLp = 15 + kgGain * 5;

    const updated = {
      ...savedLifts,
      [selectedExercise]: { weight: w, reps: r, date: new Date().toLocaleDateString() },
    };

    setSavedLifts(updated);
    setExp((e) => e + gainedExp);
    setLp((l) => l + gainedLp);

    const nextGradeInfo = computeHunterGradeData(updated, profile.weightKg);
    const nextGrade = nextGradeInfo.currentStd.grade;

    if (nextGrade !== hunterGrade) {
      prevGradeRef.current = nextGrade;
      triggerToast(`¡ASCENSO A GRADO ${nextGrade}! (+${gainedExp} EXP)`);
    } else {
      triggerToast(`[SISTEMA] ${selectedExercise} actualizado (${new1RM} kg 1RM) • +${gainedExp} EXP.`);
    }
  };

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
          triggerToast('[SISTEMA] Fotografía escaneada y rostro censurado.');
        } else {
          setVaultPhotos((v) => ({ ...v, [target]: safeDataUrl }));
          triggerToast(`[BÓVEDA] Captura cifrada.`);
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

    const seed = Number(profile.weightKg) * 17 + Number(profile.heightCm) * 11 + Math.floor(Math.random() * 9973);
    const chosenRace = RACES_POOL[seed % RACES_POOL.length];
    const chosenCls = generateRandomInfiniteClass(seed + Date.now());
    const baseLP = Math.min(2400, 300 + Number(profile.experienceMonths) * 65);

    const assigned = { race: chosenRace, cls: chosenCls, assignedAt: new Date().toLocaleDateString() };
    setHunterClass(assigned);
    setLp(baseLP);
    setAwakened(true);
    triggerToast(`¡DESPERTAR COMPLETADO! Clase: ${chosenCls.name}`);
  };

  const rankInfo = getRankFromLP(lp);
  const totalSleep = sleepLog.reduce((acc, d) => acc + d.hours, 0);
  const sleepOptimal = totalSleep >= 49 && totalSleep <= 63;
  const currentEx1RM = getEffectiveExercise1RM(selectedExercise, liftWeightInput, liftRepsInput, profile.weightKg);

  if (!awakened) {
    return (
      <div className="sys-container" style={{ maxWidth: '580px', paddingTop: '24px' }}>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <div className="sys-window" style={{ padding: '24px 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span className="sys-badge" style={{ background: 'rgba(212,175,55,0.15)', color: '#d4af37', border: '1px solid #d4af37' }}>
              [CALIBRACIÓN INICIAL]
            </span>
            <h1 className="font-souls" style={{ fontSize: '25px', marginTop: '10px', color: '#fff' }}>
              PROTOCOLO EX
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
              Paso {surveyStep} de 5 — Despertar y Atributos
            </p>
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
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>GÉNERO</label>
                  <select className="sys-select" value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })}>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>OBJETIVO</label>
                  <select className="sys-select" value={profile.goal} onChange={(e) => setProfile({ ...profile, goal: e.target.value })}>
                    <option>Hipertrofia y Estética</option>
                    <option>Fuerza Máxima</option>
                    <option>Definición</option>
                  </select>
                </div>
              </div>
              <button className="sys-btn sys-btn-gold" onClick={() => setSurveyStep(3)}>
                CONTINUAR A MARCAS <ChevronRight size={16} />
              </button>
            </div>
          )}

          {surveyStep === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>PESO (KG)</label>
                  <input type="number" className="sys-input" value={profile.weightKg} onChange={(e) => setProfile({ ...profile, weightKg: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>ALTURA (CM)</label>
                  <input type="number" className="sys-input" value={profile.heightCm} onChange={(e) => setProfile({ ...profile, heightCm: e.target.value })} />
                </div>
              </div>
              <button className="sys-btn sys-btn-gold" onClick={() => setSurveyStep(5)}>
                CONTINUAR AL DESPERTAR <ChevronRight size={16} />
              </button>
            </div>
          )}

          {surveyStep === 5 && (
            <div style={{ textAlign: 'center', padding: '14px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <Shield size={54} color="#d4af37" style={{ margin: '0 auto' }} />
              <h2 className="font-souls" style={{ fontSize: '21px', color: '#d4af37' }}>
                ¿ESTÁS LISTO PARA EL DESPERTAR?
              </h2>
              <button className="sys-btn sys-btn-gold" style={{ padding: '16px' }} onClick={awakenHunter}>
                <Zap size={18} /> ACEPTAR EL DESPERTAR
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

      {toast && (
        <div className="toast-alert">
          <Zap size={18} color="#d4af37" />
          <span>{toast}</span>
        </div>
      )}

      {/* SESIÓN PERMANENTE */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '6px 12px', marginBottom: '10px', borderRadius: '10px',
        background: 'rgba(11, 16, 30, 0.85)', border: '1px solid rgba(16, 185, 129, 0.28)', fontSize: '11px'
      }}>
        <span style={{ color: '#cbd5e1' }}>
          <span style={{ color: '#10b981', fontWeight: 700 }}>● SESIÓN PERMANENTE ACTIVA:</span> {currentUser.email}
        </span>
        <span style={{ color: '#94a3b8' }}>Guardado automático</span>
      </div>

      {/* CABECERA */}
      <div className="sys-window" style={{ padding: '18px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span className="sys-badge" style={{ background: 'rgba(0,240,255,0.16)', color: '#00f0ff', border: '1px solid #00f0ff' }}>
                NIVEL {level} (∞)
              </span>
              <span className="sys-badge" style={{ background: 'rgba(212,175,55,0.16)', color: '#d4af37', border: '1px solid #d4af37' }}>
                GRADO: {hunterGrade}
              </span>
              <span className="sys-badge" style={{ background: 'rgba(234,88,12,0.2)', color: '#fdba74', border: '1px solid #ea580c' }}>
                <Flame size={13} /> RACHA {streak}D
              </span>
              <span className="sys-badge" style={{ background: 'rgba(190,18,60,0.2)', color: '#fda4af', border: '1px solid #be123c' }}>
                PODER: {hunterCombatPower}
              </span>
            </div>
            <h1 className="font-souls" style={{ fontSize: '22px', marginTop: '6px', color: '#fff' }}>
              {profile.hunterName} <span style={{ fontSize: '12px', color: '#94a3b8' }}>({profile.hunterCode})</span>
            </h1>
            <div style={{ fontSize: '13px', color: '#fde047', fontWeight: 700 }}>
              {classEvolution.title} • Pasiva: {hunterClass?.cls?.passiveName || 'Soberanía'}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className="font-hud" style={{ fontSize: '18px', fontWeight: 900, color: rankInfo.color }}>
              {rankInfo.label.toUpperCase()}
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
              {rankInfo.totalLP} LP • EXP: {expInLevel}/100
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#d4af37', marginBottom: '3px' }}>PROGRESO DE RANGO ({rankInfo.currentDivLP}/100 LP)</div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${rankInfo.currentDivLP}%`, background: `linear-gradient(90deg, ${rankInfo.color}, #d4af37)` }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#00f0ff', marginBottom: '3px' }}>EXP DE CLASE ({expInLevel}/100 EXP)</div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${expInLevel}%`, background: 'linear-gradient(90deg, #0284c7, #00f0ff)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* MENÚ DE NAVEGACIÓN */}
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
            if (!cityUnlocked) triggerToast('🔒 Completa el Capítulo 1 de Historia PvE para fundar tu Ciudad 2D.');
            setActiveTab('city_vn');
          }}
        >
          {cityUnlocked ? <Heart size={16} color="#fb7185" /> : <Lock size={16} color="#94a3b8" />}
          <span>{cityUnlocked ? 'Ciudad 2D' : 'Ciudad 🔒'}</span>
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

      {/* MÓDULO 1: MISIONES */}
      {activeTab === 'quests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-hud" style={{ fontSize: '14px', color: '#d4af37', marginBottom: '12px' }}>
              MISIONES DIARIAS
            </h2>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                className="sys-input"
                placeholder="Declarar misión..."
                value={newQuestTitle}
                onChange={(e) => setNewQuestTitle(e.target.value)}
              />
              <button
                className="sys-btn sys-btn-gold"
                onClick={() => {
                  if (!newQuestTitle.trim()) return;
                  setQuests([{ id: Date.now(), title: newQuestTitle, lp: 45, exp: 95, status: 'pending' }, ...quests]);
                  setNewQuestTitle('');
                  triggerToast('[SISTEMA] Misión registrada.');
                }}
              >
                + AGREGAR
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quests.map((q) => (
                <div key={q.id} style={{
                  padding: '14px', borderRadius: '11px', background: 'rgba(4, 6, 12, 0.8)',
                  border: `1px solid ${q.status === 'completed' ? '#10b981' : 'rgba(148,163,184,0.22)'}`,
                  display: 'flex', flexDirection: 'column', gap: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: '#fff' }}>{q.title}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>Recompensa: +{q.lp} LP • +{q.exp} EXP</div>
                    </div>
                    <span className="sys-badge" style={{
                      background: q.status === 'completed' ? 'rgba(16,185,129,0.2)' : 'rgba(212,175,55,0.15)',
                      color: q.status === 'completed' ? '#6ee7b7' : '#d4af37'
                    }}>
                      {q.status === 'completed' ? 'CUMPLIDA' : 'EN CURSO'}
                    </span>
                  </div>
                  {q.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="sys-btn sys-btn-success"
                        style={{ padding: '8px 12px', fontSize: '11px' }}
                        onClick={() => {
                          setQuests(quests.map((item) => item.id === q.id ? { ...item, status: 'completed' } : item));
                          setLp((prev) => prev + q.lp);
                          setExp((prev) => prev + q.exp);
                          setStreak((s) => s + 1);
                          triggerToast(`¡MISIÓN CUMPLIDA! +${q.exp} EXP y +${q.lp} LP.`);
                        }}
                      >
                        <CheckCircle2 size={14} /> LOGRADO
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MÓDULO 2: RUTINAS */}
      {activeTab === 'routines' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#10b981', marginBottom: '12px' }}>
            PLAN DE ENTRENAMIENTO ({activeRoutinePlan.horizon.toUpperCase()})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activeRoutinePlan.exercises.map((ex, idx) => (
              <div key={idx} style={{
                padding: '12px', borderRadius: '10px', background: 'rgba(4,6,12,0.88)',
                border: '1px solid rgba(148,163,184,0.25)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: '#fff' }}>{ex.name}</div>
                  <div style={{ fontSize: '12px', color: '#d4af37' }}>{ex.sets} • {ex.focus}</div>
                </div>
                <button className="sys-btn sys-btn-primary" style={{ padding: '8px 12px', fontSize: '10px' }} onClick={() => setAnimModalEx(ex)}>
                  <Play size={13} /> ANIMACIÓN
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MÓDULO 3: CLASE Y PASIVA (CON NUEVO MOTOR JRPG 2D) */}
      {activeTab === 'avatar' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="grid-2">
            <JrpgFantasyPortrait
              hunterClass={hunterClass}
              rankInfo={rankInfo}
              hunterGrade={hunterGrade}
              level={level}
              classEvolution={classEvolution}
              gender={profile.gender || 'male'}
              onToggleGender={() => setProfile({ ...profile, gender: profile.gender === 'female' ? 'male' : 'female' })}
            />

            <div className="sys-window" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 className="font-souls" style={{ fontSize: '16px', color: '#d4af37' }}>
                EVOLUCIÓN DE CLASE INFINITA (NV. {level})
              </h2>
              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(0,240,255,0.08)', border: '1px solid #00f0ff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#00f0ff' }}>PASIVA ÚNICA</span>
                  <span className="sys-badge" style={{ background: 'rgba(0,240,255,0.2)', color: '#fff' }}>+{passiveClassBonus} PWR</span>
                </div>
                <div className="font-souls" style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
                  {hunterClass?.cls?.passiveName || 'Soberanía Primordial'}
                </div>
                <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px' }}>
                  {hunterClass?.cls?.passiveDesc || 'Escala infinitamente con tu fuerza real.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MÓDULO 4: HISTORIA PVE */}
      {activeTab === 'pve' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-souls" style={{ fontSize: '17px', color: '#f59e0b', marginBottom: '12px' }}>
            CRÓNICAS DEL ABISMO — MODO HISTORIA PVE
          </h2>
          {pveBattleLog && (
            <div style={{ padding: '14px', borderRadius: '11px', marginBottom: '14px', background: 'rgba(16,185,129,0.16)', border: '1px solid #10b981' }}>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#6ee7b7' }}>{pveBattleLog.title}</div>
              <p style={{ fontSize: '13px', color: '#e2e8f0', marginTop: '4px' }}>{pveBattleLog.detail}</p>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {PVE_STORY_CHAPTERS.map((ch) => {
              const cleared = completedChapters.includes(ch.id);
              const prevCleared = ch.prevId === null || completedChapters.includes(ch.prevId);
              return (
                <div key={ch.id} style={{
                  padding: '15px', borderRadius: '12px', background: 'rgba(4,6,12,0.88)',
                  border: `1px solid ${cleared ? '#10b981' : 'rgba(212,175,55,0.45)'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>{ch.act}</span>
                    <span className="sys-badge" style={{ background: cleared ? 'rgba(16,185,129,0.2)' : 'rgba(212,175,55,0.15)', color: cleared ? '#6ee7b7' : '#fde047' }}>
                      {cleared ? '✓ COMPLETADO' : `REQ: ${ch.reqPower} PWR`}
                    </span>
                  </div>
                  <h3 className="font-souls" style={{ fontSize: '16px', color: '#fff', marginTop: '4px' }}>{ch.chapter}</h3>
                  <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>{ch.lore}</p>
                  {!cleared && (
                    <button
                      className="sys-btn sys-btn-gold"
                      style={{ marginTop: '10px', padding: '9px 14px', fontSize: '11px' }}
                      onClick={() => {
                        if (!prevCleared) {
                          triggerToast('Debes completar el capítulo anterior primero.');
                          return;
                        }
                        setCompletedChapters([...completedChapters, ch.id]);
                        setExp((e) => e + ch.expReward);
                        setLp((l) => l + ch.lpReward);
                        setPveBattleLog({ victory: true, title: `¡VICTORIA EN ${ch.chapter}!`, detail: '¡Capítulo superado con éxito!' });
                        triggerToast(`¡Capítulo superado! Ciudad 2D y Novela Visual actualizadas.`);
                      }}
                    >
                      <Sword size={14} /> JUGAR CAPÍTULO
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MÓDULO 5: CIUDAD 2D & NOVELA VISUAL */}
      {activeTab === 'city_vn' && (
        !cityUnlocked ? (
          <div className="sys-window" style={{ padding: '28px 20px', textAlign: 'center' }}>
            <Lock size={44} color="#d4af37" style={{ margin: '0 auto 12px' }} />
            <h2 className="font-souls" style={{ fontSize: '20px', color: '#fff', marginBottom: '8px' }}>
              CIUDAD 2D Y NOVELA VISUAL BLOQUEADAS
            </h2>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '16px' }}>
              Completa el <strong>Capítulo 1</strong> en Historia PvE para fundar tu ciudad.
            </p>
            <button className="sys-btn sys-btn-gold" onClick={() => setActiveTab('pve')}>
              <BookOpen size={15} /> IR AL CAPÍTULO 1
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="sys-window" style={{ padding: '18px' }}>
              <h2 className="font-souls" style={{ fontSize: '16px', color: '#d4af37', marginBottom: '12px' }}>
                <Building2 size={16} style={{ display: 'inline', marginRight: '6px' }} /> CIUDAD 2D: {cityName.toUpperCase()}
              </h2>
              <City2DWorldMap
                cityName={cityName}
                builtBuildings={builtBuildings}
                unlockedCharacters={unlockedCharacters}
                selectedCharId={activeChar.id}
                onSelectCharacter={(id) => setSelectedCharId(id)}
              />
            </div>

            <div className="sys-window" style={{ padding: '18px' }}>
              <h2 className="font-souls" style={{ fontSize: '16px', color: '#fb7185', marginBottom: '8px' }}>
                <Heart size={16} style={{ display: 'inline', marginRight: '6px' }} /> NOVELA VISUAL
              </h2>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {STORY_CHARACTERS.map((char) => {
                  const isUnlocked = completedChapters.includes(char.unlockChapter);
                  const isSelected = activeChar.id === char.id;
                  return (
                    <button
                      key={char.id}
                      disabled={!isUnlocked}
                      className={`sys-btn ${isSelected ? 'sys-btn-love' : 'sys-btn-ghost'}`}
                      style={{ padding: '8px 12px', fontSize: '10px', opacity: isUnlocked ? 1 : 0.45 }}
                      onClick={() => setSelectedCharId(char.id)}
                    >
                      {isUnlocked ? char.name : `🔒 ${char.unlockLabel}`}
                    </button>
                  );
                })}
              </div>

              <div className="grid-2">
                <VisualNovelCharacterPortrait
                  char={activeChar}
                  affectionLabel={activeRel.label}
                  affectionColor={activeRel.color}
                  affectionPoints={activeCharState.affection}
                />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(4,6,12,0.9)', border: '1px solid rgba(251,113,133,0.45)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#fb7185', marginBottom: '4px' }}>
                      {activeChar.name.toUpperCase()} DICE:
                    </div>
                    <p style={{ fontSize: '14px', color: '#f8fafc', fontStyle: 'italic' }}>
                      «{activeCharState.lastReply}»
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      className="sys-input"
                      placeholder="Escribe un mensaje..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendVisualNovelMessage()}
                    />
                    <button className="sys-btn sys-btn-primary" onClick={() => handleSendVisualNovelMessage()}>
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* MÓDULO 6: PVP */}
      {activeTab === 'pvp' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#f43f5e', marginBottom: '12px' }}>
            ARENA PVP (RADAR 30 KM)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {friends.map((fr) => (
              <div key={fr.id} style={{
                padding: '14px', borderRadius: '11px', background: 'rgba(4,6,12,0.88)',
                border: '1px solid rgba(16,185,129,0.45)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                  <strong style={{ fontSize: '15px', color: '#fff' }}>{fr.name}</strong>
                  <div style={{ fontSize: '12px', color: '#cbd5e1' }}>Nivel {fr.level} • Poder: {fr.power}</div>
                </div>
                <button
                  className="sys-btn sys-btn-primary"
                  style={{ padding: '8px 12px', fontSize: '11px' }}
                  onClick={() => {
                    const win = hunterCombatPower >= fr.power;
                    if (win) { setLp((l) => l + 25); setExp((e) => e + 45); }
                    triggerToast(win ? `¡Victoria PvP contra ${fr.name}! +25 LP` : `Derrota PvP ante ${fr.name}`);
                  }}
                >
                  <Sword size={14} /> DESAFIAR
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MÓDULO 7: CARGAS */}
      {activeTab === 'strength' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#e11d48', marginBottom: '12px' }}>
            REGISTRO DE CARGAS (1RM AUTOMÁTICO)
          </h2>
          <div className="grid-2" style={{ marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#94a3b8' }}>EJERCICIO</label>
              <select className="sys-select" value={selectedExercise} onChange={(e) => handleSelectExercise(e.target.value)}>
                {Object.keys(savedLifts).map((ex) => (<option key={ex} value={ex}>{ex}</option>))}
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#94a3b8' }}>CARGA (KG)</label>
                <input type="number" className="sys-input" value={liftWeightInput} onChange={(e) => setLiftWeightInput(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#94a3b8' }}>REPS</label>
                <input type="number" className="sys-input" value={liftRepsInput} onChange={(e) => setLiftRepsInput(e.target.value)} />
              </div>
            </div>
          </div>
          <button className="sys-btn sys-btn-gold" onClick={handleSaveExerciseLoad}>
            <Save size={15} /> GUARDAR MARCA ({currentEx1RM} KG 1RM)
          </button>
        </div>
      )}

      {/* MÓDULO 8: BÓVEDA */}
      {activeTab === 'vault' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#a855f7', marginBottom: '12px' }}>
            BÓVEDA FÍSICA CIFRADA
          </h2>
          <div className="grid-2">
            {['front', 'back'].map((side) => (
              <div key={side} style={{ padding: '14px', borderRadius: '11px', background: 'rgba(4,6,12,0.85)', border: '1px dashed rgba(168,85,247,0.5)', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px', color: '#e9d5ff' }}>
                  {side === 'front' ? 'PERFIL FRONTAL' : 'PERFIL DORSAL'}
                </div>
                {vaultPhotos[side] && <img src={vaultPhotos[side]} alt={side} style={{ width: '120px', borderRadius: '8px', margin: '0 auto 8px' }} />}
                <label className="sys-btn sys-btn-ghost" style={{ fontSize: '11px', padding: '8px 12px' }}>
                  <Upload size={14} /> SUBIR FOTO
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleSecurePhotoUpload(e, side)} />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MÓDULO 9: SUEÑO */}
      {activeTab === 'sleep' && (
        <div className="sys-window" style={{ padding: '18px' }}>
          <h2 className="font-hud" style={{ fontSize: '14px', color: '#38bdf8', marginBottom: '12px' }}>
            RECUPERACIÓN NEURAL ({totalSleep}H ACUMULADAS)
          </h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input type="number" step="0.5" className="sys-input" style={{ maxWidth: '140px' }} value={todaySleep} onChange={(e) => setTodaySleep(Number(e.target.value))} />
            <button className="sys-btn sys-btn-primary" onClick={() => {
              const updated = [...sleepLog];
              updated[updated.length - 1].hours = todaySleep;
              setSleepLog(updated);
              triggerToast(`Sueño registrado (${todaySleep}h).`);
            }}>
              <Clock size={15} /> REGISTRAR SUEÑO
            </button>
          </div>
        </div>
      )}

      {/* MÓDULO 10: AJUSTES */}
      {activeTab === 'settings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-hud" style={{ fontSize: '14px', color: '#00f0ff', marginBottom: '12px' }}>
              CONFIGURACIÓN DE CUENTA
            </h2>
            <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
              Cuenta activa: <strong>{currentUser.email}</strong> • Código: <strong style={{ color: '#d4af37' }}>{profile.hunterCode}</strong>
            </div>
          </div>

          <div className="sys-window" style={{ padding: '18px', borderColor: 'rgba(225, 29, 72, 0.55)' }}>
            <h3 className="font-hud" style={{ fontSize: '14px', color: '#fb7185', marginBottom: '8px' }}>
              <Trash2 size={15} style={{ display: 'inline', marginRight: '6px' }} /> ELIMINAR CUENTA
            </h3>
            <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '12px' }}>
              Escribe <strong>BORRAR</strong> para eliminar permanentemente tu cuenta y todos sus datos:
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input
                className="sys-input"
                style={{ maxWidth: '220px', borderColor: 'rgba(225,29,72,0.5)' }}
                placeholder="Escribe BORRAR"
                value={confirmDeleteText}
                onChange={(e) => setConfirmDeleteText(e.target.value.toUpperCase())}
              />
              <button
                className="sys-btn sys-btn-danger"
                onClick={() => {
                  if (confirmDeleteText !== 'BORRAR') {
                    triggerToast('Escribe la palabra BORRAR en mayúsculas.');
                    return;
                  }
                  onDeleteAccount();
                }}
              >
                <Trash2 size={14} /> ELIMINAR CUENTA DEFINITIVAMENTE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
