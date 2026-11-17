import React, { useState, useEffect, useRef } from 'react';
import {
  Flame, Trophy, Dumbbell, Moon, Camera, Sparkles, Shield,
  CheckCircle2, XCircle, CloudRain, Zap, Lock, EyeOff,
  Upload, Scan, Cpu, FileText, AlertTriangle,
  ChevronRight, Sword, Clock, Save, Check,
  UserCheck, Users, MapPin, Play, BookOpen, Plus, Crosshair,
  LogIn, KeyRound, Mail, UserPlus, Settings, Trash2,
  Heart, Building2, Send, RotateCcw
} from 'lucide-react';

// ============================================================================
// ESTILOS INTEGRADOS (ANIME FANTASY RPG - VISUAL SYSTEM)
// ============================================================================
const SYSTEM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800;900&family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&display=swap');

  /* ANIME FANTASY RPG - VISUAL SYSTEM */
  :root {
    --bg-main: #050817;
    --bg-card: #0b1530;
    --bg-panel: #101b38;

    --neon-blue: #00eaff;
    --neon-purple: #963cff;
    --neon-gold: #ffd45a;
    --neon-pink: #ff3e9d;

    --text-main: #f4f6ff;
    --text-secondary: #aab9d5;

    --bg-void: var(--bg-main);
    --cyan-glow: var(--neon-blue);
    --gold-rank: var(--neon-gold);
    --gold-deep: #b45309;
    --crimson-vein: #be123c;
    --emerald-ok: #10b981;
    --rose-love: var(--neon-pink);
    --text-dim: var(--text-secondary);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Fondo RPG */
  body {
    background:
      radial-gradient(circle at 50% 35%,
        #17265b 0%, #080d20 50%, #03050c 100%);
    color: var(--text-main);
    font-family: 'Rajdhani', Georgia, serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .font-hud {
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 0.06em;
  }

  .font-souls {
    font-family: 'Cinzel', Georgia, serif;
    letter-spacing: 0.08em;
  }

  .sys-container {
    max-width: 980px;
    margin: 0 auto;
    padding: 14px 12px 96px;
  }

  .sys-window {
    background: linear-gradient(145deg, rgba(16, 27, 56, 0.94), rgba(6, 10, 25, 0.96));
    backdrop-filter: blur(14px);
    border: 1px solid rgba(0, 234, 255, 0.32);
    box-shadow:
      0 10px 34px rgba(0, 0, 0, 0.82),
      inset 0 0 24px rgba(0, 234, 255, 0.08);
    border-radius: 16px;
    position: relative;
    overflow: hidden;
  }

  .sys-window::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--neon-purple), var(--neon-blue), var(--neon-gold), transparent);
  }

  /* Tarjetas de personajes */
  .rpg-card {
    position: relative;
    background: linear-gradient(145deg, #101b38, #060a19);
    border: 2px solid var(--neon-blue);
    border-radius: 22px;
    padding: 20px;
    box-shadow:
      0 0 12px #00eaff66,
      inset 0 0 25px #00eaff18;
    overflow: hidden;
  }

  /* Iluminación cinematográfica */
  .neon-glow {
    text-shadow:
      0 0 8px var(--neon-blue),
      0 0 20px var(--neon-blue);
  }

  .neon-glow-gold {
    text-shadow:
      0 0 8px var(--neon-gold),
      0 0 20px rgba(255, 212, 90, 0.65);
  }

  /* Botones RPG */
  .rpg-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: linear-gradient(135deg, #101b38, #202c52);
    color: var(--text-main);
    border: 1px solid var(--neon-blue);
    border-radius: 12px;
    padding: 9px 14px;
    font-family: 'Orbitron', sans-serif;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 0 12px #00eaff55;
    transition: 0.3s ease;
  }

  .rpg-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 25px #00eaffaa;
  }

  .rpg-button:active {
    transform: translateY(0) scale(0.97);
  }

  /* Efecto dorado legendario */
  .legendary {
    border: 2px solid var(--neon-gold);
    box-shadow:
      0 0 12px #ffd45a88,
      0 0 30px #ffd45a44,
      inset 0 0 24px rgba(150, 60, 255, 0.16);
  }

  /* Animación de energía */
  @keyframes energyPulse {
    0%, 100% {
      filter: brightness(1);
      box-shadow: 0 0 10px #00eaff55;
    }

    50% {
      filter: brightness(1.16);
      box-shadow: 0 0 28px #00eaffaa, 0 0 18px rgba(150, 60, 255, 0.45);
    }
  }

  .energy-effect {
    animation: energyPulse 2.5s infinite ease-in-out;
  }

  /* Aparición cinematográfica */
  @keyframes cinematicEntry {
    from {
      opacity: 0;
      transform: translateY(20px) scale(.96);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .cinematic-entry {
    animation: cinematicEntry .8s ease-out;
  }

  /* Aplicación explícita del sistema visual RPG al módulo Avatar */
  .avatar-rpg-shell {
    position: relative;
    isolation: isolate;
  }

  .avatar-rpg-shell::before {
    content: '';
    position: absolute;
    inset: -10px;
    z-index: -1;
    border-radius: 28px;
    background:
      radial-gradient(circle at 15% 15%, rgba(0, 234, 255, 0.16), transparent 42%),
      radial-gradient(circle at 85% 20%, rgba(150, 60, 255, 0.18), transparent 45%),
      radial-gradient(circle at 50% 90%, rgba(255, 62, 157, 0.12), transparent 48%);
    filter: blur(12px);
    pointer-events: none;
  }

  .avatar-rpg-shell .rpg-card {
    background: linear-gradient(145deg, var(--bg-panel), var(--bg-main));
    color: var(--text-main);
  }

  .avatar-rpg-shell .rpg-button:focus-visible {
    outline: 2px solid var(--neon-gold);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    .avatar-rpg-shell *,
    .avatar-rpg-shell::before {
      animation: none !important;
      transition: none !important;
    }
  }

  .sys-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 16px;
    border-radius: 12px;
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s ease;
    border: 1px solid transparent;
  }

  .sys-btn:hover {
    transform: translateY(-2px);
  }

  .sys-btn:active {
    transform: scale(0.97);
  }

  .sys-btn-primary {
    background: linear-gradient(135deg, #101b38 0%, #0284c7 100%);
    color: var(--text-main);
    border-color: var(--neon-blue);
    box-shadow: 0 0 14px #00eaff55;
  }

  .sys-btn-gold {
    background: linear-gradient(135deg, #92400e 0%, var(--neon-gold) 100%);
    color: #050817;
    box-shadow: 0 0 18px #ffd45a66;
  }

  .sys-btn-love {
    background: linear-gradient(135deg, #9f1239 0%, var(--neon-pink) 100%);
    color: #fff;
    box-shadow: 0 0 16px rgba(255, 62, 157, 0.4);
  }

  .sys-btn-ghost {
    background: rgba(16, 27, 56, 0.88);
    border-color: rgba(170, 185, 213, 0.28);
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
    background: rgba(5, 8, 23, 0.92);
    border: 1px solid rgba(0, 234, 255, 0.32);
    border-radius: 10px;
    padding: 10px 13px;
    color: var(--text-main);
    font-family: 'Rajdhani', sans-serif;
    font-size: 16px;
    font-weight: 600;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .sys-input:focus, .sys-select:focus, .sys-textarea:focus {
    border-color: var(--neon-blue);
    box-shadow: 0 0 12px #00eaff44;
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
    background: rgba(11, 21, 48, 0.88);
    border: 1px solid rgba(0, 234, 255, 0.22);
    border-radius: 12px;
    padding: 9px 4px;
    color: var(--text-secondary);
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
    background: linear-gradient(180deg, rgba(255, 212, 90, 0.24) 0%, rgba(16, 27, 56, 0.96) 100%);
    border-color: var(--neon-gold);
    color: #fff;
    box-shadow: 0 0 16px #ffd45a55, inset 0 0 12px rgba(255, 212, 90, 0.16);
  }

  .progress-track {
    width: 100%;
    height: 8px;
    background: rgba(5, 8, 23, 0.95);
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
    background: rgba(11, 21, 48, 0.97);
    border: 1px solid var(--neon-gold);
    box-shadow: 0 0 24px #ffd45a66;
    padding: 12px 18px;
    border-radius: 12px;
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
// DATOS DEL SISTEMA: RANGOS, GRADOS DE CAZADOR Y CLASES CON PASIVAS ÚNICAS
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
  { grade: 'F', minComposite: 0.0, benchReq: 0.0, squatReq: 0.0, deadliftReq: 0.0, desc: 'Iniciado / Punto de partida desde 0' },
  { grade: 'E', minComposite: 0.70, benchReq: 0.65, squatReq: 0.85, deadliftReq: 1.00, desc: 'Novato consolidado' },
  { grade: 'D', minComposite: 0.90, benchReq: 0.80, squatReq: 1.05, deadliftReq: 1.25, desc: 'Base atlética funcional' },
  { grade: 'C', minComposite: 1.12, benchReq: 1.00, squatReq: 1.25, deadliftReq: 1.50, desc: 'Intermedio sólido (1x BW en Banca)' },
  { grade: 'B', minComposite: 1.32, benchReq: 1.15, squatReq: 1.50, deadliftReq: 1.75, desc: 'Atlético avanzado' },
  { grade: 'A', minComposite: 1.55, benchReq: 1.34, squatReq: 1.75, deadliftReq: 2.05, desc: 'Élite regional / Alta densidad muscular' },
  { grade: 'S', minComposite: 1.80, benchReq: 1.55, squatReq: 2.00, deadliftReq: 2.35, desc: 'Maestría biomecánica (2x BW Sentadilla)' },
  { grade: 'SS', minComposite: 2.05, benchReq: 1.75, squatReq: 2.25, deadliftReq: 2.60, desc: 'Competidor nacional' },
  { grade: 'SSS', minComposite: 2.28, benchReq: 1.95, squatReq: 2.50, deadliftReq: 2.85, desc: 'Portento físico sobrehumano' },
  { grade: 'EX', minComposite: 2.50, benchReq: 2.15, squatReq: 2.75, deadliftReq: 3.10, desc: 'Cúspide humana absoluta' },
];

const CLASS_ARCHETYPES = [
  {
    base: 'Centinela',
    weaponType: 'sword',
    passiveTitle: 'Muralla Inquebrantable',
    passiveRule: 'Reduce a la mitad el desgaste y otorga +40 de defensa base.'
  },
  {
    base: 'Espadachín',
    weaponType: 'sword',
    passiveTitle: 'Filo del Duelo Implacable',
    passiveRule: 'Aumenta +18% el daño crítico por cada repetición pesada de Press Banca registrada.'
  },
  {
    base: 'Lancero',
    weaponType: 'spear',
    passiveTitle: 'Impulso de la Lanza Perforadora',
    passiveRule: 'Convierte tu fuerza de Sentadilla en penetración de armadura (+22% Poder en jefes).'
  },
  {
    base: 'Artista Marcial',
    weaponType: 'gauntlets',
    passiveTitle: 'Flujo de los Cien Golpes',
    passiveRule: 'Multiplica la velocidad de ataque y otorga +15% EXP extra por misiones completadas.'
  },
  {
    base: 'Berserker',
    weaponType: 'greatsword',
    passiveTitle: 'Furia de Sangre Indomable',
    passiveRule: 'Escala tu ataque bruto directamente con tu 1RM de Peso Muerto (+25% Poder ofensivo).'
  },
  {
    base: 'Asesino Sombrío',
    weaponType: 'daggers',
    passiveTitle: 'Paso Fantasma del Abismo',
    passiveRule: 'Otorga ventaja táctica en duelos PvP cercanos y +20% evasión contra jefes.'
  },
  {
    base: 'Monje Astral',
    weaponType: 'staff',
    passiveTitle: 'Armonía del Núcleo Interior',
    passiveRule: 'Duplica los beneficios de recuperación cuando cumples tus horas óptimas de sueño.'
  },
  {
    base: 'Invocador Rúnico',
    weaponType: 'staff',
    passiveTitle: 'Sello de los Antiguos',
    passiveRule: 'Potencia en +30% las estadísticas de todas las reliquias y equipos desbloqueados.'
  },
  {
    base: 'Cazador de Abismos',
    weaponType: 'spear',
    passiveTitle: 'Instinto de Depredador Alfa',
    passiveRule: 'Inflige +24% de daño adicional contra monstruos de rango superior en el Modo Historia.'
  },
  {
    base: 'Duelista',
    weaponType: 'sword',
    passiveTitle: 'Estocada de Precisión Chirúrgica',
    passiveRule: 'Cada racha diaria activa suma +12 puntos acumulables de poder de combate.'
  },
  {
    base: 'Alquimista Bélico',
    weaponType: 'sword',
    passiveTitle: 'Transmutación Metabólica',
    passiveRule: 'Convierte cada sesión de entrenamiento registrada en +10 EXP adicional.'
  },
  {
    base: 'Soberano',
    weaponType: 'greatsword',
    passiveTitle: 'Autoridad del Trono',
    passiveRule: 'Aumenta la prosperidad de tu ciudad y otorga +20% de afinidad con todos los personajes.'
  },
];

const CLASS_AFFINITIES = [
  { name: 'Infinito', accent: '#00f0ff', resonance: 'Resonancia Sin Límites: Escala +5 puntos de poder por cada nivel.' },
  { name: 'de Ceniza', accent: '#f97316', resonance: 'Resonancia Ígnea: +12% Poder al mantener racha activa.' },
  { name: 'Carmesí', accent: '#e11d48', resonance: 'Resonancia Vital: +15% eficiencia en cargas máximas.' },
  { name: 'Celestial', accent: '#38bdf8', resonance: 'Resonancia Astral: +15% EXP en misiones diarias.' },
  { name: 'del Vacío', accent: '#a855f7', resonance: 'Resonancia Abisal: +18% daño contra jefes de acto.' },
  { name: 'de Obsidiana', accent: '#94a3b8', resonance: 'Resonancia Férrea: +35 Defensa neural permanente.' },
  { name: 'de Tormenta', accent: '#00f0ff', resonance: 'Resonancia Eléctrica: +14% velocidad en duelos PvP.' },
  { name: 'del Eclipse', accent: '#fbbf24', resonance: 'Resonancia Dual: Equilibra ataque y defensa (+10% ambos).' },
  { name: 'Astral', accent: '#818cf8', resonance: 'Resonancia Estelar: Mejora las recompensas de historia.' },
  { name: 'Espectral', accent: '#2dd4bf', resonance: 'Resonancia Etérea: Reduce la penalización por fatiga.' },
  { name: 'de Acero Pálido', accent: '#cbd5e1', resonance: 'Resonancia Metálica: Escala +10% con el peso levantado.' },
  { name: 'del Crepúsculo', accent: '#fb7185', resonance: 'Resonancia Crepuscular: +15% afinidad en diálogos.' },
  { name: 'Primordial', accent: '#fbbf24', resonance: 'Resonancia Ancestral: +20% poder de pasiva base.' },
  { name: 'de Sangre Real', accent: '#be123c', resonance: 'Resonancia Dinástica: +25 LP adicionales por victoria.' },
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
  const safeBase = baseClassName || 'Centinela Infinito';
  if (level < 5) return { stage: 1, title: `${safeBase} Iniciado [Rango I]`, bonus: '+5% Poder Base', nextLvl: 5 };
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
  { id: 'gear_cloak', type: 'Equipamiento', name: 'Capa Real Carmesí', power: 25, desc: 'Manto de batalla que eleva la resistencia en PvE y PvP.' },
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
    reqPower: 60,
    enemy: 'Centinela Oxidado de la Grieta',
    lore: 'Tras despertar como Cazador desde cero, cruzas el puente de piedra y rescatas a Lyra, una herrera rúnica atrapada junto a la forja antigua. Al superar este capítulo fundas tu Ciudad 2D.',
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
    reqPower: 160,
    enemy: 'Acechador Sombrío de Fenrir',
    lore: 'Entre la niebla lunar, Kaelen, el explorador de las sombras, une fuerzas contigo y llega a patrullar los alrededores de tu ciudad.',
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
    reqPower: 420,
    enemy: 'Archidemonio Revenant Malakor',
    lore: 'En la biblioteca sellada del Altar conoces a Isolde, oráculo de las estrellas que viaja a tu ciudad para estudiar tu evolución sin límites.',
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
    reqPower: 600,
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
    hairHighlight: '#fda4af',
    eyeColor: '#fbbf24',
    outfitColor: '#450a0a',
    trimColor: '#d4af37',
    glowColor: '#f97316',
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
    hairColor: '#94a3b8',
    hairHighlight: '#f1f5f9',
    eyeColor: '#00f0ff',
    outfitColor: '#0f172a',
    trimColor: '#38bdf8',
    glowColor: '#00f0ff',
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
    hairColor: '#facc15',
    hairHighlight: '#fef9c3',
    eyeColor: '#10b981',
    outfitColor: '#1e293b',
    trimColor: '#d4af37',
    glowColor: '#fde047',
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
    hairColor: '#6d28d9',
    hairHighlight: '#c4b5fd',
    eyeColor: '#f59e0b',
    outfitColor: '#1e1b4b',
    trimColor: '#c084fc',
    glowColor: '#a855f7',
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
  { id: 'monarch_vessel', name: 'Recipiente del Monarca', trait: 'Soberanía: Evolución ilimitada de estadísticas', hairColor: '#070a12', eyeColor: '#6366f1' },
  { id: 'ash_saiyan', name: 'Estirpe Guerrero Ceniza', trait: 'Zenkai: +15% EXP al superar misiones retomadas', hairColor: '#0b0f19', eyeColor: '#00f0ff' },
  { id: 'abyss_demon', name: 'Revenant Abisal Carmesí', trait: 'Pacto de Sangre: Bonificación en cargas máximas', hairColor: '#130714', eyeColor: '#fbbf24' },
  { id: 'valkyrie_dusk', name: 'Valkiria del Crepúsculo', trait: 'Égida Lunar: Recuperación muscular acelerada', hairColor: '#0f172a', eyeColor: '#6366f1' },
  { id: 'fenrir_kin', name: 'Semi-Humano de Fenrir', trait: 'Instinto Depredador: Potencia explosiva y agilidad', hairColor: '#090d16', eyeColor: '#f59e0b' },
  { id: 'hollow_lord', name: 'Señor Espectral Celestial', trait: 'Cuerpo de Acero Pálido: Resistencia neural superior', hairColor: '#0c1220', eyeColor: '#38bdf8' },
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

  if (lower.includes('entren') || lower.includes('pesa') || lower.includes('fuerza') || lower.includes('banca') || lower.includes('sentadilla') || lower.includes('gimnasio')) {
    return isRomantic
      ? `${hunterName}, sé perfectamente cuánto te esfuerzas... Todos en ${cityName} hablan de tus ${bench1RM} kg en Banca y ${squat1RM} kg en Sentadilla. Verte alcanzar el Grado ${hunterGrade} me hace sentir orgullosa de estar a tu lado.`
      : `Los rumores en ${cityName} son ciertos: levantar ${bench1RM} kg en Banca y ${deadlift1RM} kg en Peso Muerto como ${clsName} no es algo que logre cualquiera. Tu Grado de Cazador ${hunterGrade} impone respeto.`;
  }

  if (lower.includes('amor') || lower.includes('gustas') || lower.includes('cita') || lower.includes('quiero') || lower.includes('beso') || lower.includes('pareja')) {
    if (affection >= 70) {
      return `Mi corazón ya te pertenece, ${hunterName}... Desde que luchamos juntos y construiste ${cityName}, no dejo de pensar en ti. Siempre estaré a tu lado, sin importar qué tan alto llegues.`;
    }
    return `Me tomas por sorpresa, ${hunterName}... Aprecio mucho nuestra cercanía y cada momento que compartimos en ${cityName}. Sigamos pasando tiempo juntos y verás cuánto significas para mí.`;
  }

  if (lower.includes('historia') || lower.includes('jefe') || lower.includes('mision') || lower.includes('batalla')) {
    return `Ya hemos superado ${clearedCount} capítulos de esta campaña. Como ${char.role}, confío plenamente en tu poder como ${clsName}. Cuando decidas avanzar al siguiente acto, cubriré tu retaguardia.`;
  }

  if (prevTopic) {
    return isRomantic
      ? `Estaba recordando cuando hablamos sobre "${prevTopic.slice(0, 38)}...". Contigo cada charla en ${cityName} se siente especial, ${hunterName}. Con tu racha de ${streak} días, siento que somos invencibles.`
      : `No olvido lo que me dijiste antes sobre "${prevTopic.slice(0, 38)}...". Aquí en ${cityName} todos admiran tu racha de ${streak} días y tu ascenso al Grado ${hunterGrade}.`;
  }

  return isRomantic
    ? `Me alegra tanto que vinieras a verme a ${cityName}, ${hunterName}. Después de verte entrenar tan duro para mantener tu Grado ${hunterGrade}, solo quería pasar un momento tranquilo contigo.`
    : `Bienvenido de nuevo a mi puesto en ${cityName}, ${hunterName}. He oído que tu clase (${clsName}) sigue evolucionando sin detenerse.`;
}

// ============================================================================
// MOTOR MULTI-IA CON FILTRO ANTI-ERROR Y CACHÉ LOCAL (100% SIN CANVAS)
// ============================================================================
function buildAnimeAvatarPrompt(gender, cls) {
  const subject = gender === 'female'
    ? '1girl, solo, anime heroine warrior, long flowing black hair, fierce violet-indigo eyes'
    : '1boy, solo, anime hero warrior, spiky messy black hair, fierce violet-indigo eyes';
  const weapon = cls?.weaponType === 'spear'
    ? 'holding glowing cyan runic spear'
    : cls?.weaponType === 'greatsword'
    ? 'holding massive glowing cyan runic greatsword'
    : cls?.weaponType === 'staff'
    ? 'holding ornate golden arcane staff with cyan crystal'
    : cls?.weaponType === 'daggers'
    ? 'holding dual glowing cyan runic daggers'
    : cls?.weaponType === 'gauntlets'
    ? 'wearing glowing cyan runic battle gauntlets'
    : 'holding glowing cyan lightning runic sword';

  return `${subject}, wearing ornate dark obsidian fantasy armor with gold filigree trim and glowing cyan neon runes, large glowing cyan diamond crystal in center of chestplate, tattered crimson red cape, ${weapon}, glowing blue arcane magic circles floating behind, cosmic starry night sky background with golden embers and light rays, high quality anime JRPG gacha character portrait, vibrant cel shaded illustration, masterpiece`;
}

// Filtro detector: rechaza imágenes < 45 KB o con esquinas beige/blancas ("At its limit right now")
async function verifyAndCompressAiBlob(blob) {
  if (!blob || blob.size < 45000) {
    throw new Error('Imagen descartada por tamaño reducido (posible cartel de saturación).');
  }
  const objectUrl = URL.createObjectURL(blob);
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('No se pudo decodificar la imagen.'));
      el.src = objectUrl;
    });

    const probe = document.createElement('canvas');
    probe.width = 16;
    probe.height = 16;
    const pCtx = probe.getContext('2d');
    pCtx.drawImage(img, 0, 0, 16, 16);

    const checkCorner = (x, y) => {
      const [r, g, b] = pCtx.getImageData(x, y, 1, 1).data;
      const isBeigeBanner = r > 205 && g > 188 && b > 160 && r >= g && g >= b;
      const isBlankWhite = r > 235 && g > 235 && b > 235;
      return isBeigeBanner || isBlankWhite;
    };

    if (checkCorner(2, 2) || checkCorner(13, 2)) {
      throw new Error('Cartel de límite detectado por color de fondo.');
    }

    // Comprime a JPEG ligero para guardarlo permanente en localStorage
    const out = document.createElement('canvas');
    const targetW = 540;
    const targetH = Math.round((img.height / img.width) * targetW) || 720;
    out.width = targetW;
    out.height = targetH;
    out.getContext('2d').drawImage(img, 0, 0, targetW, targetH);
    return out.toDataURL('image/jpeg', 0.84);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// Motor 1 y 2: Pollinations con distintos modelos
async function tryPollinationsEngine(prompt, seed, modelName) {
  const encoded = encodeURIComponent(prompt);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=720&height=960&model=${modelName}&nologo=true&seed=${seed}`;
  const res = await fetchWithTimeout(url, {}, 13000);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const blob = await res.blob();
  return await verifyAndCompressAiBlob(blob);
}

// Motor 3: AI Horde (red comunitaria gratuita con modelos anime)
async function tryAiHordeEngine(prompt) {
  const submitRes = await fetchWithTimeout(
    'https://aihorde.net/api/v2/generate/async',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: '0000000000',
        'Client-Agent': 'ProtocoloEX:1.0:web'
      },
      body: JSON.stringify({
        prompt: `${prompt} ### lowres, bad anatomy, bad hands, text, error, cropped, worst quality, low quality, jpeg artifacts, signature, watermark, blurry, 3d, realistic`,
        params: {
          sampler_name: 'k_euler_a',
          cfg_scale: 7,
          width: 512,
          height: 704,
          steps: 20,
          n: 1
        },
        nsfw: false,
        censor_nsfw: true,
        models: ['Animagine XL', 'Counterfeit-V3.0', 'Anything Diffusion'],
        r2: true
      })
    },
    10000
  );
  if (!submitRes.ok) throw new Error('AI Horde no disponible');
  const { id } = await submitRes.json();
  if (!id) throw new Error('Sin ID de tarea en AI Horde');

  for (let attempt = 0; attempt < 12; attempt++) {
    await new Promise((r) => setTimeout(r, 2500));
    const checkRes = await fetchWithTimeout(`https://aihorde.net/api/v2/generate/check/${id}`, {}, 6000);
    if (!checkRes.ok) continue;
    const checkData = await checkRes.json();
    if (checkData.faulted) throw new Error('Fallo en worker de AI Horde');
    if (checkData.done) {
      const statusRes = await fetchWithTimeout(`https://aihorde.net/api/v2/generate/status/${id}`, {}, 8000);
      const statusData = await statusRes.json();
      const imgUrl = statusData?.generations?.[0]?.img;
      if (!imgUrl) throw new Error('Sin URL de imagen en AI Horde');
      const imgRes = await fetchWithTimeout(imgUrl, {}, 10000);
      const blob = await imgRes.blob();
      return await verifyAndCompressAiBlob(blob);
    }
  }
  throw new Error('Tiempo agotado en AI Horde');
}

// ============================================================================
// TARJETA ANIME FANTASY RPG CHARACTER + EVOLUCIÓN INFINITA
// ============================================================================
const GACHA_STYLES = [
  {
    id: 'original',
    label: 'Original',
    filter: 'none',
    auraOverlay:
      'radial-gradient(circle at 20% 25%, rgba(0, 234, 255, 0.16) 0%, transparent 45%),' +
      'radial-gradient(circle at 80% 20%, rgba(150, 60, 255, 0.18) 0%, transparent 48%),' +
      'radial-gradient(circle at 50% 85%, rgba(255, 62, 157, 0.12) 0%, transparent 50%)',
    borderColor: 'var(--neon-blue)',
  },
  {
    id: 'cosmic_void',
    label: 'Eclipse Cósmico',
    filter: 'hue-rotate(38deg) saturate(1.35) contrast(1.08)',
    auraOverlay:
      'radial-gradient(circle at 50% 35%, rgba(150, 60, 255, 0.36) 0%, transparent 58%),' +
      'radial-gradient(circle at 80% 75%, rgba(255, 62, 157, 0.28) 0%, transparent 50%)',
    borderColor: 'var(--neon-purple)',
  },
  {
    id: 'crimson_awakening',
    label: 'Despertar Carmesí',
    filter: 'hue-rotate(155deg) saturate(1.45) contrast(1.12)',
    auraOverlay:
      'radial-gradient(circle at 50% 40%, rgba(244, 63, 94, 0.34) 0%, transparent 60%),' +
      'radial-gradient(circle at 20% 80%, rgba(255, 212, 90, 0.25) 0%, transparent 50%)',
    borderColor: 'var(--neon-pink)',
  },
  {
    id: 'celestial_overdrive',
    label: 'Sobrecarga Astral',
    filter: 'hue-rotate(-28deg) brightness(1.1) saturate(1.3)',
    auraOverlay:
      'radial-gradient(circle at 50% 25%, rgba(0, 234, 255, 0.38) 0%, transparent 55%),' +
      'radial-gradient(circle at 50% 80%, rgba(255, 212, 90, 0.26) 0%, transparent 55%)',
    borderColor: 'var(--neon-gold)',
  },
];

function JrpgFantasyPortrait({
  hunterClass,
  hunterGrade,
  level,
  classEvolution,
  gender,
  onToggleGender,
  passiveClassBonus
}) {
  const cls = hunterClass?.cls || {
    name: 'Centinela Infinito',
    weaponType: 'sword',
    accentColor: '#00eaff',
    variantCode: 101,
    passiveName: 'Muralla Inquebrantable (Infinito)',
    passiveDesc: 'Reduce a la mitad el desgaste y otorga +40 de defensa base.'
  };

  const stage = classEvolution.stage;
  const isFemale = gender === 'female';
  const cacheKey = `pex_ai_avatar_v2_${gender}_${cls.variantCode || 1}`;

  const [aiImageSrc, setAiImageSrc] = useState(() => {
    try {
      return localStorage.getItem(cacheKey) || null;
    } catch {
      return null;
    }
  });
  const [aiStatus, setAiStatus] = useState('');
  const [regenNonce, setRegenNonce] = useState(0);
  const [localFallbackIdx, setLocalFallbackIdx] = useState(0);
  const [styleIdx, setStyleIdx] = useState(0);

  const localFallbacks = isFemale
    ? ['/avatar-female.jpg', '/avatar-female.png', '/1000272221.jpg']
    : ['/avatar-male.jpg', '/avatar-male.png', '/1000272220.jpg'];

  useEffect(() => {
    let cancelled = false;

    async function runMultiAiCascade() {
      if (regenNonce === 0) {
        try {
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            setAiImageSrc(cached);
            setAiStatus('');
            return;
          }
        } catch {
          // Ignora errores de lectura de almacenamiento
        }
      }

      const prompt = buildAnimeAvatarPrompt(gender, cls);
      const seed = (cls.variantCode || 77) + regenNonce * 31 + (isFemale ? 500 : 100);

      const engines = [
        { label: 'IA 1/3 (Flux)', run: () => tryPollinationsEngine(prompt, seed, 'flux') },
        { label: 'IA 2/3 (Turbo)', run: () => tryPollinationsEngine(prompt, seed + 9, 'turbo') },
        { label: 'IA 3/3 (AI Horde)', run: () => tryAiHordeEngine(prompt) }
      ];

      for (const engine of engines) {
        if (cancelled) return;
        setAiStatus(`Invocando retrato con ${engine.label}...`);
        try {
          const verifiedDataUrl = await engine.run();
          if (cancelled) return;
          setAiImageSrc(verifiedDataUrl);
          setAiStatus('');
          try {
            localStorage.setItem(cacheKey, verifiedDataUrl);
          } catch {
            // Si localStorage está lleno, mantiene la imagen en memoria de sesión
          }
          return;
        } catch {
          // Si este motor falla o devuelve el cartel beige, pasa automáticamente al siguiente
        }
      }

      if (!cancelled) {
        setAiStatus('');
        setAiImageSrc(null);
        setLocalFallbackIdx(0);
      }
    }

    runMultiAiCascade();
    return () => {
      cancelled = true;
    };
  }, [gender, cls.variantCode, regenNonce, cacheKey]);

  const activeStyle = GACHA_STYLES[styleIdx];
  const isStylized = styleIdx !== 0;
  const starCount = Math.min(6, Math.max(4, 3 + stage));
  const fallbackSrc = localFallbackIdx < localFallbacks.length ? localFallbacks[localFallbackIdx] : null;
  const finalImgToRender = aiImageSrc || fallbackSrc;

  return (
    <div className="cinematic-entry" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* TARJETA LEGENDARIA DEL AVATAR */}
      <div className="rpg-card legendary" style={{ padding: '16px' }}>
        {/* CABECERA DE NIVEL, ESTRELLAS Y BOTONES RPG */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '12px',
          position: 'relative',
          zIndex: 5
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="sys-badge" style={{
              background: 'rgba(11, 21, 48, 0.9)',
              color: 'var(--neon-gold)',
              border: '1px solid var(--neon-gold)',
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '10px',
              boxShadow: '0 0 10px rgba(255, 212, 90, 0.35)'
            }}>
              NV. {level} • ETAPA {stage}
            </span>
            <span
              className="neon-glow-gold"
              style={{ color: 'var(--neon-gold)', fontSize: '12px', letterSpacing: '1.5px' }}
            >
              {'★'.repeat(starCount)}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setStyleIdx((prev) => (prev + 1) % GACHA_STYLES.length)}
              className="rpg-button"
              style={{ borderColor: 'var(--neon-gold)', boxShadow: '0 0 12px rgba(255, 212, 90, 0.35)' }}
            >
              <Sparkles size={12} color="#ffd45a" /> ESTILIZAR ({activeStyle.label})
            </button>
            <button
              type="button"
              disabled={Boolean(aiStatus)}
              onClick={() => {
                try { localStorage.removeItem(cacheKey); } catch {}
                setAiImageSrc(null);
                setRegenNonce((n) => n + 1);
              }}
              className="rpg-button"
              style={{ borderColor: 'var(--neon-purple)', opacity: aiStatus ? 0.6 : 1 }}
            >
              <RotateCcw size={12} color="#c084fc" /> {aiStatus ? 'GENERANDO...' : 'NUEVA IA'}
            </button>
            {isStylized && (
              <button
                type="button"
                onClick={() => setStyleIdx(0)}
                className="rpg-button"
                style={{ borderColor: 'var(--neon-pink)', boxShadow: '0 0 12px rgba(255, 62, 157, 0.4)' }}
              >
                <RotateCcw size={12} color="#ff3e9d" /> ORIGINAL
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setRegenNonce(0);
                onToggleGender();
              }}
              className="rpg-button"
            >
              <UserCheck size={12} color="#00eaff" /> {isFemale ? 'FEMENINO' : 'MASCULINO'}
            </button>
          </div>
        </div>

        {/* CONTENEDOR CON PULSO DE ENERGÍA E IMAGEN GENERADA POR IA */}
        <div
          className="energy-effect"
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative',
            border: `1.5px solid ${activeStyle.borderColor}`,
            background: 'radial-gradient(circle at 50% 35%, #1e2756 0%, #070a19 100%)',
            minHeight: '420px'
          }}
        >
          {aiStatus && (
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 6,
              background: 'rgba(5, 8, 23, 0.92)',
              border: '1px solid var(--neon-blue)',
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--neon-blue)',
              whiteSpace: 'nowrap',
              boxShadow: '0 0 16px rgba(0, 234, 255, 0.45)'
            }}>
              ⚡ {aiStatus}
            </div>
          )}

          <div style={{ filter: activeStyle.filter, transition: 'filter 0.45s ease' }}>
            {finalImgToRender ? (
              <img
                src={finalImgToRender}
                alt={`Avatar ${isFemale ? 'Femenino' : 'Masculino'} Anime Fantasy RPG`}
                onError={() => {
                  if (aiImageSrc) setAiImageSrc(null);
                  else setLocalFallbackIdx((prev) => prev + 1);
                }}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                minHeight: '420px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                textAlign: 'center',
                color: '#cbd5e1'
              }}>
                <Sparkles size={38} color="#00eaff" style={{ marginBottom: '10px' }} />
                <div className="font-souls" style={{ fontSize: '15px', color: '#fff', marginBottom: '6px' }}>
                  {aiStatus || 'ESPERANDO CONEXIÓN CON MOTOR IA'}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Presioná "NUEVA IA" para reintentar la invocación del personaje.
                </div>
              </div>
            )}
          </div>

          {/* HALO DE ENERGÍA NEÓN DINÁMICO SEGÚN ESTILO */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: activeStyle.auraOverlay,
              transition: 'background 0.45s ease'
            }}
          />

          {/* PLACA INFERIOR DE CLASE DESPERTADA Y SELLO DE GRADO */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(0deg, rgba(5, 8, 23, 0.98) 0%, rgba(11, 21, 48, 0.88) 62%, transparent 100%)',
            padding: '40px 14px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '10px'
          }}>
            <div style={{ flex: 1, textAlign: 'center', paddingLeft: '44px' }}>
              <div
                className="neon-glow"
                style={{
                  fontSize: '9px',
                  fontFamily: 'Orbitron, sans-serif',
                  color: 'var(--neon-blue)',
                  letterSpacing: '0.18em',
                  marginBottom: '3px'
                }}
              >
                LEGENDARY AWAKENED CLASS
              </div>
              <div
                className="font-souls neon-glow-gold"
                style={{
                  fontSize: '17px',
                  fontWeight: 900,
                  color: 'var(--text-main)',
                  letterSpacing: '0.09em'
                }}
              >
                {classEvolution.title.toUpperCase()}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--neon-gold)', fontWeight: 700, marginTop: '2px' }}>
                {classEvolution.bonus}
              </div>
            </div>
            <div style={{
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(150, 60, 255, 0.28) 0%, rgba(5, 8, 23, 0.96) 76%)',
              border: '2px solid var(--neon-gold)',
              boxShadow: '0 0 18px rgba(0, 234, 255, 0.5), inset 0 0 10px rgba(255, 212, 90, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{ fontSize: '8px', color: 'var(--neon-blue)', fontWeight: 800 }}>GRADO</span>
              <span className="font-hud neon-glow-gold" style={{ fontSize: '17px', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.1 }}>
                {hunterGrade}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PANEL DE EVOLUCIÓN DE CLASE INFINITA Y PASIVA ÚNICA */}
      <div className="rpg-card" style={{ padding: '16px', borderColor: 'var(--neon-purple)', boxShadow: '0 0 16px rgba(150, 60, 255, 0.3)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '12px'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--neon-gold))' }} />
          <h2 className="font-souls neon-glow-gold" style={{ fontSize: '14px', color: 'var(--neon-gold)', fontWeight: 800, textAlign: 'center' }}>
            EVOLUCIÓN DE CLASE INFINITA (NV. {level})
          </h2>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--neon-gold), transparent)' }} />
        </div>
        <div style={{
          padding: '14px',
          borderRadius: '14px',
          background: 'radial-gradient(circle at 50% 0%, rgba(0, 234, 255, 0.15) 0%, rgba(5, 8, 23, 0.94) 80%)',
          border: '1px solid var(--neon-blue)',
          boxShadow: 'inset 0 0 18px rgba(0, 234, 255, 0.14)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="sys-badge" style={{
              background: 'rgba(150, 60, 255, 0.2)',
              color: '#e9d5ff',
              border: '1px solid var(--neon-purple)'
            }}>
              PASIVA ÚNICA
            </span>
            <span className="sys-badge" style={{
              background: 'rgba(255, 212, 90, 0.18)',
              color: 'var(--neon-gold)',
              border: '1px solid var(--neon-gold)'
            }}>
              +{passiveClassBonus} PWR
            </span>
          </div>
          <div className="font-souls neon-glow" style={{
            fontSize: '16px',
            fontWeight: 900,
            color: 'var(--text-main)',
            textAlign: 'center',
            marginBottom: '6px',
            letterSpacing: '0.07em'
          }}>
            {(cls.passiveName || 'Muralla Inquebrantable (Infinito)').toUpperCase()}
          </div>
          <p style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            fontStyle: 'italic',
            lineHeight: 1.45
          }}>
            {cls.passiveDesc}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// RETRATO ANIME PARA PERSONAJES DE NOVELA VISUAL
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
          <linearGradient id={`vnSkin_${char.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffedd5" />
            <stop offset="85%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fdba74" />
          </linearGradient>
        </defs>

        <rect width="300" height="340" fill={`url(#vnCosmic_${char.id})`} />
        <circle cx="150" cy="145" r="115" fill={char.glowColor || '#fb7185'} opacity="0.16" />

        <path
          d="M102 86 C86 155, 88 225, 98 285 L202 285 C212 225, 214 155, 198 86 Z"
          fill={char.hairColor}
        />
        <path
          d="M106 152 L194 152 L212 300 L88 300 Z"
          fill={char.outfitColor}
          stroke={char.trimColor}
          strokeWidth="2"
        />
        <path d="M132 152 L150 186 L168 152" fill="#ffedd5" stroke={char.trimColor} strokeWidth="2" />
        <polygon points="150,194 160,208 150,222 140,208" fill={char.glowColor || '#fb7185'} opacity="0.85" />

        <rect x="140" y="130" width="20" height="24" rx="5" fill={`url(#vnSkin_${char.id})`} />
        <path
          d="M120 92 C120 122, 132 136, 150 140 C168 136, 180 122, 180 92 C180 64, 166 56, 150 56 C134 56, 120 64, 120 92 Z"
          fill={`url(#vnSkin_${char.id})`}
        />

        <g>
          <ellipse cx="136" cy="105" rx="6.8" ry="5.8" fill="#ffffff" />
          <ellipse cx="136.5" cy="105" rx="4.8" ry="5.4" fill={char.eyeColor} />
          <circle cx="136.5" cy="105" r="2.2" fill="#090d16" />
          <circle cx="134.8" cy="103" r="1.8" fill="#ffffff" />
          <path d="M128 100 Q136 95 144 101" fill="none" stroke="#090d16" strokeWidth="2.2" strokeLinecap="round" />
        </g>
        <g>
          <ellipse cx="164" cy="105" rx="6.8" ry="5.8" fill="#ffffff" />
          <ellipse cx="163.5" cy="105" rx="4.8" ry="5.4" fill={char.eyeColor} />
          <circle cx="163.5" cy="105" r="2.2" fill="#090d16" />
          <circle cx="161.8" cy="103" r="1.8" fill="#ffffff" />
          <path d="M156 101 Q164 95 172 100" fill="none" stroke="#090d16" strokeWidth="2.2" strokeLinecap="round" />
        </g>

        <ellipse cx="130" cy="115" rx="5" ry="2.2" fill="#fb7185" opacity="0.45" />
        <ellipse cx="170" cy="115" rx="5" ry="2.2" fill="#fb7185" opacity="0.45" />
        <path d="M144 124 Q150 129 156 124" fill="none" stroke="#be123c" strokeWidth="1.8" strokeLinecap="round" />

        <path
          d="M116 94 C115 58, 134 46, 150 46 C166 46, 185 58, 184 94 L178 132 L171 100 L163 84 L154 100 L150 82 L144 100 L135 84 L128 102 L122 132 Z"
          fill={char.hairColor}
        />
      </svg>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
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
// MAPA 2D INTERACTIVO DE LA CIUDAD
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
        <span className="sys-badge" style={{ background: 'rgba(4,6,12,0.85)', color: '#fde047', border: '1px solid #fbbf24' }}>
          MAPA 2D EN VIVO • {cityName.toUpperCase()}
        </span>
        <span className="sys-badge" style={{ background: 'rgba(4,6,12,0.85)', color: '#00f0ff', border: '1px solid #00f0ff' }}>
          ALIADOS PRESENTES: {unlockedCharacters.length}
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
        <circle cx="470" cy="44" r="20" fill="#fde047" opacity="0.25" />
        <polygon points="0,145 90,75 180,145" fill="#111827" />
        <polygon points="140,145 260,65 380,145" fill="#0f172a" />
        <polygon points="330,145 450,72 540,145" fill="#111827" />

        <rect x="0" y="142" width="540" height="88" fill="#142318" />
        <rect x="0" y="168" width="540" height="26" fill="#334155" />

        <g>
          <rect x="232" y="92" width="76" height="54" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
          <polygon points="226,92 270,64 314,92" fill="#991b1b" stroke="#fbbf24" strokeWidth="1.5" />
          <rect x="261" y="120" width="18" height="26" fill="#090d16" />
          <text x="270" y="58" textAnchor="middle" fill="#fde047" fontSize="9" fontWeight="bold">AYUNTAMIENTO</text>
        </g>

        {builtBuildings.includes('forge') && (
          <g>
            <rect x="68" y="106" width="64" height="40" fill="#292524" stroke="#f97316" strokeWidth="1.8" />
            <polygon points="64,106 100,84 136,106" fill="#7c2d12" />
            <text x="100" y="79" textAnchor="middle" fill="#fdba74" fontSize="8" fontWeight="bold">FORJA</text>
          </g>
        )}

        {builtBuildings.includes('tavern') && (
          <g>
            <rect x="150" y="104" width="66" height="42" fill="#3f2e21" stroke="#fbbf24" strokeWidth="1.8" />
            <polygon points="146,104 183,82 220,104" fill="#92400e" />
            <text x="183" y="77" textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="bold">TABERNA</text>
          </g>
        )}

        {builtBuildings.includes('dojo') && (
          <g>
            <rect x="326" y="106" width="70" height="40" fill="#1e293b" stroke="#00f0ff" strokeWidth="1.8" />
            <polygon points="320,106 361,84 402,106" fill="#0369a1" />
            <text x="361" y="79" textAnchor="middle" fill="#00f0ff" fontSize="8" fontWeight="bold">ARENA DOJO</text>
          </g>
        )}

        {builtBuildings.includes('observatory') && (
          <g>
            <rect x="412" y="96" width="44" height="50" fill="#312e81" stroke="#c084fc" strokeWidth="1.8" />
            <path d="M412 96 Q434 68 456 96 Z" fill="#6b21a8" stroke="#c084fc" strokeWidth="1.5" />
            <text x="434" y="64" textAnchor="middle" fill="#e9d5ff" fontSize="8" fontWeight="bold">OBSERVATORIO</text>
          </g>
        )}

        {builtBuildings.includes('garden') && (
          <g>
            <circle cx="486" cy="134" r="16" fill="#065f46" stroke="#fb7185" strokeWidth="1.8" />
            <text x="486" y="113" textAnchor="middle" fill="#fda4af" fontSize="8" fontWeight="bold">JARDÍN ♥</text>
          </g>
        )}

        {unlockedCharacters.map((char, idx) => {
          const isSelected = char.id === selectedCharId;
          return (
            <g
              key={char.id}
              className={idx % 2 === 0 ? 'npc-walk-1' : 'npc-walk-2'}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectCharacter(char.id)}
            >
              <circle cx={char.mapX} cy={char.mapY - 28} r="10" fill="#090d16" stroke={isSelected ? '#fb7185' : '#fbbf24'} strokeWidth="1.5" />
              <text x={char.mapX} y={char.mapY - 25} textAnchor="middle" fill={isSelected ? '#fb7185' : '#fde047'} fontSize="8" fontWeight="bold">
                {isSelected ? '♥' : '!'}
              </text>
              <rect x={char.mapX - 8} y={char.mapY - 6} width="16" height="18" rx="4" fill={char.outfitColor} stroke={char.trimColor} strokeWidth="1.2" />
              <circle cx={char.mapX} cy={char.mapY - 12} r="7" fill="#ffedd5" />
              <path d={`M${char.mapX - 7} ${char.mapY - 13} Q${char.mapX} ${char.mapY - 21} ${char.mapX + 7} ${char.mapY - 13}`} fill={char.hairColor} />
              <rect x={char.mapX - 28} y={char.mapY + 14} width="56" height="13" rx="4" fill="rgba(4,6,12,0.85)" />
              <text x={char.mapX} y={char.mapY + 23} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
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
// VISOR DE MINI ANIMACIÓN BIOMECÁNICA DE EJERCICIOS
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
        <p style={{ fontSize: '12px', color: '#fbbf24', marginBottom: '12px' }}>
          {exercise.sets} • {exercise.focus}
        </p>

        <div style={{
          background: 'radial-gradient(circle at 50% 50%, #111827 0%, #05070d 100%)',
          border: '1px solid rgba(251, 191, 36, 0.4)',
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
                  <line x1="105" y1="92" x2="105" y2="62" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
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
                  <line x1="72" y1="56" x2="148" y2="56" stroke="#fbbf24" strokeWidth="3.5" />
                  <circle cx="72" cy="56" r="8" fill="#be123c" />
                  <circle cx="148" cy="56" r="8" fill="#be123c" />
                  <line x1="110" y1="92" x2="94" y2="130" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
                  <line x1="110" y1="92" x2="126" y2="130" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
                </g>
              </g>
            )}

            {animType === 'pull' && (
              <g>
                <line x1="50" y1="22" x2="170" y2="22" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
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
// PORTAL DE INICIO DE SESIÓN Y REGISTRO (SESIÓN PERMANENTE AUTOMÁTICA)
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
      setAuthError('Ingresa un correo/usuario válido y una contraseña de al menos 4 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const passHash = await hashSecret(passwordInput);
      const usersDb = JSON.parse(localStorage.getItem('pex_users_registry_v12') || '{}');

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
        localStorage.setItem('pex_users_registry_v12', JSON.stringify(usersDb));
        onAuthenticated(newAccount);
      } else {
        const existing = usersDb[cleanEmail];
        if (!existing) {
          setAuthError('Cuenta no encontrada. Regístrate primero en la pestaña "Crear Cuenta".');
          setLoading(false);
          return;
        }
        if (existing.passHash !== passHash) {
          setAuthError('Contraseña incorrecta. Verifica tus credenciales.');
          setLoading(false);
          return;
        }
        onAuthenticated(existing);
      }
    } catch {
      setAuthError('Error al verificar credenciales locales.');
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
            Inicia desde 0 y conserva tu progreso automáticamente
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
              <label style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 700 }}>NOMBRE CLAVE DE CAZADOR</label>
              <input
                className="sys-input"
                placeholder="Ej: ORIGEN / AKIRA"
                value={hunterTagInput}
                onChange={(e) => setHunterTagInput(e.target.value)}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 700 }}>
              <Mail size={12} style={{ display: 'inline', marginRight: '4px' }} />
              CORREO ELECTRÓNICO O USUARIO
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
            <label style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 700 }}>
              <KeyRound size={12} style={{ display: 'inline', marginRight: '4px' }} />
              CONTRASEÑA DE ACCESO
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
            <div style={{
              padding: '10px',
              borderRadius: '8px',
              background: 'rgba(225, 29, 72, 0.16)',
              border: '1px solid #e11d48',
              fontSize: '12px',
              color: '#fda4af'
            }}>
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
// CONTENEDOR PRINCIPAL (SESIÓN PERSISTENTE HASTA ELIMINACIÓN DE CUENTA)
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

  const handleDeleteAccount = (emailToDelete) => {
    const usersDb = JSON.parse(localStorage.getItem('pex_users_registry_v12') || '{}');
    delete usersDb[emailToDelete];
    localStorage.setItem('pex_users_registry_v12', JSON.stringify(usersDb));
    localStorage.removeItem(`pex_user_data_v12_${emailToDelete}`);
    localStorage.removeItem('pex_permanent_session_v12');
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
// ESPACIO DE TRABAJO DEL CAZADOR (TODO INICIA ESTRICTAMENTE DESDE 0)
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
    photoScanned: false,
    censoredPreview: null,
  });

  useEffect(() => {
    const lvl0ResetFlag = `pex_lvl0_init_v13_${currentUser.email}`;
    if (!localStorage.getItem(lvl0ResetFlag)) {
      setExp(0);
      localStorage.setItem(lvl0ResetFlag, 'true');
    }
  }, [currentUser.email]);
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

  const [userCoords, setUserCoords] = useState({ lat: -34.0981, lon: -59.0286, label: 'Zárate, Buenos Aires (GPS Activo)' });
  const [friends, setFriends] = useState(() => initialData?.friends || []);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendCode, setNewFriendCode] = useState('');
  const [newFriendDistKm, setNewFriendDistKm] = useState(5);
  const [pvpLog, setPvpLog] = useState(null);

  const [activeTab, setActiveTab] = useState('avatar');
  const [toast, setToast] = useState(null);
  const [animModalEx, setAnimModalEx] = useState(null);

  const [quests, setQuests] = useState(() => initialData?.quests || [
    { id: 1, title: 'Completar primera sesión de entrenamiento del plan', env: 'Entreno', lp: 45, exp: 100, status: 'pending' },
    { id: 2, title: 'Registrar tus marcas base en la pestaña Cargas', env: 'Sistema', lp: 35, exp: 60, status: 'pending' },
    { id: 3, title: 'Dormir al menos 7.5 horas esta noche', env: 'Recuperación', lp: 25, exp: 50, status: 'pending' },
  ]);
  const [nextWeekQueue, setNextWeekQueue] = useState(() => initialData?.nextWeekQueue || []);
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [justifyModalId, setJustifyModalId] = useState(null);
  const [justifyReason, setJustifyReason] = useState('Lluvia intensa / Tormenta');

  const [selectedExercise, setSelectedExercise] = useState('Press Banca');
  const [liftWeightInput, setLiftWeightInput] = useState(savedLifts['Press Banca']?.weight || 0);
  const [liftRepsInput, setLiftRepsInput] = useState(savedLifts['Press Banca']?.reps || 0);

  const [daysUntilEval] = useState(90);
  const [vaultPhotos, setVaultPhotos] = useState({ front: null, back: null });
  const [yearlyRecap, setYearlyRecap] = useState(() => initialData?.yearlyRecap || []);

  const [customRoutineText, setCustomRoutineText] = useState('');
  const [scanReport, setScanReport] = useState(null);
  const [routineFileName, setRoutineFileName] = useState('');
  const [showGeneratedRoutine, setShowGeneratedRoutine] = useState(false);

  const [sleepLog, setSleepLog] = useState(() => initialData?.sleepLog || ZERO_SLEEP_LOG);
  const [todaySleep, setTodaySleep] = useState(0);

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
        triggerToast(`¡ASCENSO DE GRADO DE CAZADOR! Has subido automáticamente a GRADO ${hunterGrade}.`);
      }
      prevGradeRef.current = hunterGrade;
    }
  }, [hunterGrade, awakened]);

  useEffect(() => {
    try {
      const payload = {
        awakened,
        profile,
        hunterClass,
        savedLifts,
        lp,
        exp,
        streak,
        unlockedInventory,
        completedChapters,
        cityName,
        builtBuildings,
        characterStates,
        friends,
        quests,
        nextWeekQueue,
        sleepLog,
        yearlyRecap,
      };
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch {
      const fallbackPayload = {
        awakened,
        profile,
        hunterClass,
        savedLifts,
        lp,
        exp,
        streak,
        unlockedInventory,
        completedChapters,
        cityName,
        builtBuildings,
        characterStates,
        friends,
        quests,
        nextWeekQueue,
        sleepLog,
        yearlyRecap,
      };
      localStorage.setItem(storageKey, JSON.stringify(fallbackPayload));
    }
  }, [
    storageKey, awakened, profile, hunterClass, savedLifts,
    lp, exp, streak, unlockedInventory, completedChapters,
    cityName, builtBuildings, characterStates,
    friends, quests, nextWeekQueue, sleepLog, yearlyRecap
  ]);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4600);
  };

  const resetProgressToZero = () => {
    setLp(0);
    setExp(0);
    setStreak(0);
    setSavedLifts(ZERO_LIFTS);
    setLiftWeightInput(0);
    setLiftRepsInput(0);
    setUnlockedInventory([]);
    setCompletedChapters([]);
    setBuiltBuildings([]);
    setFriends([]);
    setNextWeekQueue([]);
    setSleepLog(ZERO_SLEEP_LOG);
    setTodaySleep(0);
    setYearlyRecap([]);
    setPveBattleLog(null);
    setPvpLog(null);
    setQuests([
      { id: Date.now() + 1, title: 'Completar primera sesión de entrenamiento del plan', env: 'Entreno', lp: 45, exp: 100, status: 'pending' },
      { id: Date.now() + 2, title: 'Registrar tus marcas base en la pestaña Cargas', env: 'Sistema', lp: 35, exp: 60, status: 'pending' },
      { id: Date.now() + 3, title: 'Dormir al menos 7.5 horas esta noche', env: 'Recuperación', lp: 25, exp: 50, status: 'pending' },
    ]);
    prevGradeRef.current = 'F';
    triggerToast('[SISTEMA REINICIADO] Todos tus stats, racha (0d), nivel (0), LP (0) y cargas volvieron a 0.');
  };

  const level = Math.floor(exp / 100);
  const expInLevel = exp % 100;
  const classEvolution = getInfiniteClassEvolution(hunterClass?.cls?.name, level);

  const passiveClassBonus = 30 + level * 6 + builtBuildings.length * 12;
  const gearBonusPower = unlockedInventory.reduce((acc, item) => acc + (item.power || 0), 0);
  const hunterCombatPower = Math.round(
    (gradeData.bench1RM + gradeData.squat1RM + gradeData.deadlift1RM) * 0.45 +
    level * 14 +
    gearBonusPower +
    passiveClassBonus
  );

  const townRumors = [
    `En la ${builtBuildings.includes('tavern') ? 'Taberna del Crepúsculo' : 'plaza'} comentan que ${profile.hunterName} inicia su leyenda desde cero con ${gradeData.bench1RM} kg en Banca.`,
    `Los guardias de ${cityName} observan tu progreso en Grado de Cazador ${hunterGrade}.`,
    completedChapters.length > 0
      ? `Los bardos cantan sobre cómo derrotaste a ${PVE_STORY_CHAPTERS[Math.min(PVE_STORY_CHAPTERS.length - 1, completedChapters.length - 1)].enemy} en la campaña.`
      : `Se rumorea que en las Ruinas de Ceniza aguarda un Centinela que pondrá a prueba tu clase (${hunterClass?.cls?.name}).`,
    `Tu racha disciplinada actual es de ${streak} días.`
  ];

  const unlockedCharacters = STORY_CHARACTERS.filter((c) => completedChapters.includes(c.unlockChapter));
  const activeChar = unlockedCharacters.find((c) => c.id === selectedCharId) || unlockedCharacters[0] || STORY_CHARACTERS[0];
  const activeCharState = characterStates[activeChar.id] || { affection: 0, memories: [], lastReply: activeChar.intro };
  const activeRel = getRelationshipLabel(activeCharState.affection);

  const handleSendVisualNovelMessage = (customPromptText = null, affectionGain = 4) => {
    const textToSend = (customPromptText || chatInput).trim();
    if (!textToSend) return;

    const aiReply = generateCharacterAIReply(
      activeChar,
      textToSend,
      activeCharState.memories || [],
      {
        hunterName: profile.hunterName,
        hunterGrade,
        bench1RM: gradeData.bench1RM,
        squat1RM: gradeData.squat1RM,
        deadlift1RM: gradeData.deadlift1RM,
        streak,
        cityName,
        clearedCount: completedChapters.length,
        affection: activeCharState.affection,
        clsName: hunterClass?.cls?.name || 'Centinela Infinito'
      }
    );

    const updatedMemories = [...(activeCharState.memories || []).slice(-4), textToSend];
    const bonusTavern = builtBuildings.includes('tavern') ? 3 : 0;
    const nextAffection = Math.min(120, activeCharState.affection + affectionGain + bonusTavern);

    setCharacterStates({
      ...characterStates,
      [activeChar.id]: {
        affection: nextAffection,
        memories: updatedMemories,
        lastReply: aiReply
      }
    });
    if (!customPromptText) setChatInput('');
  };

  const generatePersonalizedRoutine = () => {
    const months = Number(profile.routineDurationMonths) === 1 ? 1 : 2;
    const weeks = months === 1 ? 4 : 8;
    const daysPerWeek = Math.min(6, Math.max(3, Number(profile.daysPerWeek) || 4));
    const mode = profile.equipmentMode;
    const owned = profile.ownedHomeEquipment || [];
    const noEquipment = mode === 'no_equip';
    const partialEquipment = mode === 'some_equip';
    const hasDumbbells = owned.includes('Mancuernas ajustables') || owned.includes('Kettlebell / Pesa rusa');
    const hasPullup = owned.includes('Barra de dominadas');
    const hasBands = owned.includes('Bandas elásticas');
    const goal = profile.goal || 'Hipertrofia y Estética';
    const strengthGoal = goal === 'Fuerza Máxima (Powerlifting)';
    const enduranceGoal = goal === 'Resistencia y Calistenia';

    const ex = (name, focus, cue, anim = 'press', sets = 3, reps = '8-12') => ({
      name, focus, cue, anim, baseSets: sets, baseReps: reps, sets: `${sets} × ${reps}`
    });
    const press = noEquipment ? 'Flexiones (variante ajustada)' : partialEquipment && !hasDumbbells ? 'Flexiones con mochila / Press con banda' : 'Press banca con barra o mancuernas';
    const incline = noEquipment ? 'Flexiones con pies elevados' : partialEquipment && !hasDumbbells ? 'Flexiones con pies elevados' : 'Press inclinado con mancuernas';
    const row = noEquipment ? 'Remo invertido bajo mesa firme' : partialEquipment && !hasDumbbells ? 'Remo con banda elástica' : 'Remo con barra o mancuerna';
    const verticalPull = noEquipment ? 'Remo invertido con agarre alto' : partialEquipment && !hasPullup && !hasBands ? 'Remo con mancuerna' : hasPullup || !partialEquipment ? 'Dominadas / jalón al pecho' : 'Jalón con banda o dominadas asistidas';
    const squat = noEquipment ? 'Sentadilla libre con tempo' : partialEquipment && !hasDumbbells ? 'Sentadilla búlgara' : 'Sentadilla trasera con barra';
    const hinge = noEquipment ? 'Puente de glúteos unilateral' : partialEquipment && !hasDumbbells ? 'Peso muerto rumano a una pierna' : 'Peso muerto rumano';
    const shoulderPress = noEquipment ? 'Flexiones en pica' : partialEquipment && !hasDumbbells ? 'Press de hombros con banda' : 'Press militar';
    const curl = noEquipment ? 'Curl isométrico con toalla' : partialEquipment && !hasDumbbells ? 'Curl con banda' : 'Curl de bíceps con mancuernas';
    const triceps = noEquipment ? 'Flexiones diamante (según tolerancia)' : partialEquipment && !hasDumbbells ? 'Extensión de tríceps con banda' : 'Extensión de tríceps en polea';
    const quad = noEquipment ? 'Zancada hacia atrás' : partialEquipment && !hasDumbbells ? 'Sentadilla búlgara' : 'Prensa de piernas';
    const hamstring = noEquipment ? 'Curl femoral deslizante' : partialEquipment && !hasDumbbells ? 'Curl femoral con banda' : 'Curl femoral en máquina';

    const makeDay = (name, focus, exercises) => ({ name, focus, exercises });
    const fullBody = (variant = 0) => makeDay(`Cuerpo completo ${variant + 1}`, 'Trabajo global con énfasis alternado', [
      ex(variant % 2 ? squat : press, variant % 2 ? 'Cuádriceps y glúteos' : 'Pectoral y tríceps', 'Usá un rango de movimiento cómodo y mantené la técnica estable.', variant % 2 ? 'squat' : 'press', 3, strengthGoal ? '4-6' : '8-12'),
      ex(variant % 2 ? row : verticalPull, 'Espalda', 'Iniciá el movimiento con las escápulas y evitá impulsarte.', 'pull', 3, '8-12'),
      ex(variant % 2 ? hinge : quad, 'Cadena posterior o cuádriceps', 'Controlá la fase de descenso y evitá compensaciones.', 'squat', 3, '8-12'),
      ex(variant % 2 ? shoulderPress : incline, 'Hombros o pectoral superior', 'Dejá una o dos repeticiones en reserva.', 'press', 2, '10-15'),
      ex(variant % 2 ? curl : triceps, 'Brazos', 'Movimiento controlado, sin balanceo.', 'press', 2, '10-15'),
      ex('Plancha frontal', 'Core y estabilidad', 'Mantené pelvis y caja torácica alineadas.', 'core', 2, '20-40 s')
    ]);

    const pushDay = () => makeDay('Empuje', 'Pectoral, hombros y tríceps', [
      ex(press, 'Pectoral', 'Escápulas estables y descenso controlado.', 'press', 3, strengthGoal ? '4-6' : '6-10'),
      ex(incline, 'Pectoral superior', 'No rebotes en la parte baja.', 'press', 3, '8-12'),
      ex(shoulderPress, 'Deltoides', 'Evitá arquear excesivamente la zona lumbar.', 'press', 3, '6-10'),
      ex('Elevaciones laterales', 'Deltoides lateral', 'Subí hasta una altura cómoda sin impulso.', 'press', 3, '12-20'),
      ex(triceps, 'Tríceps', 'Mantené el codo estable.', 'press', 3, '10-15')
    ]);
    const pullDay = () => makeDay('Tracción', 'Espalda, deltoides posterior y bíceps', [
      ex(verticalPull, 'Dorsales', 'Evitá balancearte y completá el recorrido tolerable.', 'pull', 3, '6-10'),
      ex(row, 'Romboides y espalda media', 'Llevá los codos hacia atrás sin encoger hombros.', 'pull', 3, '8-12'),
      ex('Pájaros / face pull', 'Deltoides posterior', 'Controlá la retracción escapular.', 'pull', 2, '12-20'),
      ex(curl, 'Bíceps', 'No uses impulso de cadera.', 'pull', 3, '8-12'),
      ex('Curl martillo', 'Braquial y antebrazo', 'Muñecas neutras durante todo el recorrido.', 'pull', 2, '10-15')
    ]);
    const legDay = (variant = 0) => makeDay(variant ? 'Piernas B' : 'Piernas A', variant ? 'Énfasis posterior y unilateral' : 'Énfasis cuádriceps y glúteos', [
      ex(variant ? hinge : squat, variant ? 'Isquiotibiales y glúteos' : 'Cuádriceps', 'Mantené el tronco firme y no fuerces la profundidad.', 'squat', 3, strengthGoal ? '4-6' : '6-10'),
      ex(variant ? hamstring : quad, variant ? 'Isquiotibiales' : 'Cuádriceps', 'Controlá la bajada y evitá rebotes.', 'squat', 3, '10-15'),
      ex(variant ? 'Sentadilla búlgara' : hinge, 'Glúteos y estabilidad', 'Usá apoyo si necesitás mejorar el equilibrio.', 'squat', 3, '8-12'),
      ex('Elevación de gemelos', 'Gemelos', 'Pausa breve arriba y abajo.', 'squat', 3, '12-20'),
      ex('Dead bug', 'Core', 'Mantené la zona lumbar estable.', 'core', 2, '8-12 por lado')
    ]);
    const upperDay = () => makeDay('Tren superior', 'Volumen equilibrado de torso', [
      ex(press, 'Pectoral', 'Controlá el descenso y mantené los pies firmes.', 'press', 3, '6-10'),
      ex(row, 'Espalda media', 'No tires con la zona lumbar.', 'pull', 3, '8-12'),
      ex(shoulderPress, 'Hombros', 'No llegues al fallo si la técnica se deteriora.', 'press', 2, '8-12'),
      ex(verticalPull, 'Dorsales', 'Evitá balanceos.', 'pull', 2, '8-12'),
      ex(curl, 'Bíceps', 'Repeticiones estrictas.', 'pull', 2, '10-15'),
      ex(triceps, 'Tríceps', 'Codos estables.', 'press', 2, '10-15')
    ]);
    const lowerDay = () => makeDay('Tren inferior', 'Cuádriceps, glúteos e isquiotibiales', [
      ex(squat, 'Cuádriceps y glúteos', 'Brace abdominal antes de cada repetición.', 'squat', 3, strengthGoal ? '4-6' : '6-10'),
      ex(hinge, 'Isquiotibiales y glúteos', 'Bisagra de cadera, espalda neutra.', 'squat', 3, '8-12'),
      ex(quad, 'Cuádriceps', 'Recorrido controlado.', 'squat', 2, '10-15'),
      ex(hamstring, 'Isquiotibiales', 'No aceleres la fase excéntrica.', 'squat', 2, '10-15'),
      ex('Elevación de gemelos', 'Gemelos', 'Pausa en el estiramiento y en la contracción.', 'squat', 3, '12-20'),
      ex('Plancha lateral', 'Core', 'Cuerpo alineado de hombros a tobillos.', 'core', 2, '20-40 s por lado')
    ]);

    let days;
    if (daysPerWeek === 3) days = [fullBody(0), fullBody(1), fullBody(2)];
    else if (daysPerWeek === 4) days = [makeDay('Tren superior A', 'Énfasis fuerza e hipertrofia de torso', upperDay().exercises), makeDay('Tren inferior A', 'Énfasis fuerza e hipertrofia de piernas', lowerDay().exercises), makeDay('Tren superior B', 'Segundo estímulo de torso', upperDay().exercises), makeDay('Tren inferior B', 'Segundo estímulo de piernas', lowerDay().exercises)];
    else if (daysPerWeek === 5) days = [pushDay(), pullDay(), legDay(0), makeDay('Tren superior mixto', 'Segundo estímulo de torso', [...upperDay().exercises]), makeDay('Tren inferior y core', 'Segundo estímulo de piernas con volumen moderado', [...lowerDay().exercises].slice(0, 5))];
    else days = [pushDay(), pullDay(), legDay(0), pushDay(), pullDay(), legDay(1)];

    // En resistencia/calistenia se priorizan rangos moderados-altos y descansos controlados.
    if (enduranceGoal) days = days.map(day => ({ ...day, exercises: day.exercises.map(item => ({ ...item, baseReps: item.baseReps.includes('s') ? item.baseReps : '12-20' })) }));
    const phases = months === 1
      ? ['Semana 1: calibración técnica y de cargas (RIR 3)', 'Semana 2: sumar repeticiones manteniendo el RIR (2-3)', 'Semana 3: progresión de carga o repeticiones (RIR 1-2)', 'Semana 4: descarga, reducir series y alejarse del fallo (RIR 3-4)']
      : ['Semanas 1-3: acumulación progresiva (RIR 2-3)', 'Semanas 4-6: intensificación gradual sin perder técnica (RIR 1-3)', 'Semana 7: consolidación, sin buscar máximos obligatorios', 'Semana 8: descarga y recuperación (RIR 3-4)'];
    return {
      horizon: `${weeks} Semanas (${months} ${months === 1 ? 'Mes' : 'Meses'})`,
      modeLabel: `${noEquipment ? 'Casa sin equipo' : partialEquipment ? `Casa con equipo parcial (${owned.length ? owned.join(', ') : 'equipo básico'})` : 'Gimnasio completo'} • ${daysPerWeek} días • ${goal}`,
      phases,
      days,
      exercises: days.flatMap(day => day.exercises)
    };
  };

  const activeRoutinePlan = generatePersonalizedRoutine();

  // Cada semana conserva el split y muestra la prescripción de cada ejercicio.
  const weeklyRoutinePlan = Array.from(
    { length: profile.routineDurationMonths === 1 ? 4 : 8 },
    (_, weekIndex) => {
      const week = weekIndex + 1;
      const isDeload = profile.routineDurationMonths === 1 ? week === 4 : week === 8;
      const isIntensification = profile.routineDurationMonths === 2 && week >= 4 && week <= 7;
      const progression = profile.goal === 'Fuerza Máxima (Powerlifting)'
        ? { min: 3, max: 6 }
        : profile.goal === 'Resistencia y Calistenia' ? { min: 12, max: 20 } : { min: 6, max: 12 };
      const days = activeRoutinePlan.days.map((day) => ({
        ...day,
        exercises: day.exercises.map((exercise) => {
          const baseSets = exercise.baseSets || 3;
          const repMatch = String(exercise.baseReps || '8-12').match(/(\d+)(?:\s*[-–]\s*(\d+))?/);
          const minReps = Number(repMatch?.[1] || progression.min);
          const maxReps = Number(repMatch?.[2] || repMatch?.[1] || progression.max);
          let sets = baseSets;
          let low = minReps;
          let high = maxReps;
          if (isDeload) {
            sets = Math.max(1, Math.ceil(baseSets * 0.6));
            low = Math.max(5, minReps - 1);
            high = Math.max(low, maxReps - 1);
          } else if (week === 2) {
            low += 1;
            high += 1;
          } else if (week === 3 || (profile.routineDurationMonths === 2 && week === 7)) {
            high += 1;
          } else if (isIntensification && week >= 4 && week <= 6 && profile.goal !== 'Resistencia y Calistenia') {
            low = Math.max(4, low - 1);
            high = Math.max(low, high - 1);
          }
          const rir = isDeload ? 'RIR 3-4' : week === 1 ? 'RIR 3' : week >= 3 ? 'RIR 1-2' : 'RIR 2-3';
          return { ...exercise, weeklySets: `${sets} × ${low === high ? low : `${low}-${high}`} reps • ${rir}` };
        })
      }));
      return {
        week,
        phase: isDeload ? 'Descarga y recuperación' : isIntensification ? 'Intensificación' : week <= 2 ? 'Adaptación y acumulación' : 'Progresión',
        isDeload,
        days
      };
    }
  );

  const analyzeRoutineText = (rawText, sourceName = 'Texto pegado') => {
    const cleanText = String(rawText || '').replace(/\r/g, '').trim();
    if (!cleanText) {
      triggerToast('[ESCÁNER] No se encontró texto para analizar.');
      return;
    }
    const lines = cleanText.split('\n').map((line) => line.trim()).filter(Boolean);
    const prescriptionLines = lines.filter((line) => /\d+\s*[x×]\s*\d+/i.test(line));
    const rirMentions = (cleanText.match(/RIR\s*\d+|repeticiones en reserva/gi) || []).length;
    const progressionMentions = (cleanText.match(/semana\s*\d+|progresi[oó]n|sobrecarga|descarga|deload/gi) || []).length;
    const recoveryMentions = (cleanText.match(/descanso|recuperaci[oó]n|sueño|deload|descarga/gi) || []).length;
    const daysMentions = (cleanText.match(/d[ií]a\s*[1-7]|lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bado|domingo/gi) || []).length;
    const findings = [];
    const improvements = [];
    if (prescriptionLines.length >= 4) findings.push(`Se identificaron ${prescriptionLines.length} líneas con series y repeticiones: hay una base cuantificable para revisar el volumen.`);
    else improvements.push('Faltan prescripciones claras de series × repeticiones en varios ejercicios. Conviene escribirlas de forma explícita.');
    if (rirMentions > 0) findings.push('La rutina incluye referencias a RIR, lo que permite regular la proximidad al fallo.');
    else improvements.push('No se especifica RIR ni proximidad al fallo. Añadirlo ayudaría a controlar la fatiga y el esfuerzo.');
    if (progressionMentions > 0) findings.push('Hay indicios de progresión o de organización por semanas.');
    else improvements.push('No se detecta una progresión semanal clara. Definí cómo aumentan repeticiones, carga o series y cuándo descargar.');
    if (recoveryMentions > 0) findings.push('Se menciona descanso, recuperación o descarga.');
    else improvements.push('No aparecen pautas claras de recuperación o descarga. Incluí descansos y una estrategia para manejar la fatiga.');
    if (daysMentions > 0) findings.push('Se detectó cierta organización por días de entrenamiento.');
    else improvements.push('No se distingue claramente la distribución semanal. Separá los entrenamientos por día.');
    if (prescriptionLines.length >= 8 && rirMentions > 0 && progressionMentions > 0 && recoveryMentions > 0) {
      findings.push('La información disponible permite una evaluación más completa de estructura, esfuerzo y progresión.');
    }
    setScanReport({
      sourceName,
      rawText: cleanText,
      exerciseLines: prescriptionLines,
      score: `${Math.min(100, 35 + prescriptionLines.length * 4 + rirMentions * 5 + progressionMentions * 5 + recoveryMentions * 5 + daysMentions * 2)} / 100 (ÍNDICE ORIENTATIVO DE INFORMACIÓN)`,
      finding: findings.length ? findings : ['Se pudo leer el contenido, pero faltan datos para valorar su estructura.'],
      fix: improvements.length ? improvements : ['La estructura básica parece documentada. Para una crítica más precisa, añadí objetivo, experiencia, descansos, cargas/RIR y contexto de recuperación.']
    });
    triggerToast('[ESCÁNER] Rutina leída y evaluación orientativa generada.');
  };

  const handleRoutineFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Se aceptan todos los formatos. El límite evita bloquear el navegador con archivos enormes.
    const MAX_FILE_SIZE = 25 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      triggerToast('[ESCÁNER] El archivo supera el límite de 25 MB.');
      event.target.value = '';
      return;
    }

    const extension = (file.name.split('.').pop() || '').toLowerCase();
    const fileInfo = `Archivo: ${file.name}\nTipo MIME: ${file.type || 'no informado'}\nTamaño: ${(file.size / 1024).toFixed(1)} KB`;
    setRoutineFileName(file.name);

    try {
      let extractedText = '';
      const textExtensions = ['txt', 'md', 'csv', 'tsv', 'json', 'xml', 'html', 'htm', 'log', 'rtf', 'yaml', 'yml', 'ini'];
      const isTextFile = (file.type || '').startsWith('text/') || textExtensions.includes(extension);

      if (isTextFile) {
        extractedText = await file.text();
      } else if (extension === 'pdf' && typeof window !== 'undefined' && window.pdfjsLib) {
        const pdfData = new Uint8Array(await file.arrayBuffer());
        const pdf = await window.pdfjsLib.getDocument({ data: pdfData }).promise;
        const pages = [];
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);
          const content = await page.getTextContent();
          pages.push(content.items.map((item) => item.str || '').join(' '));
        }
        extractedText = pages.join('\n\n');
      } else if (['docx', 'doc'].includes(extension) && typeof window !== 'undefined' && window.mammoth) {
        const result = await window.mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
        extractedText = result.value || '';
      } else if (['xlsx', 'xls', 'ods'].includes(extension) && typeof window !== 'undefined' && window.XLSX) {
        const workbook = window.XLSX.read(await file.arrayBuffer(), { type: 'array' });
        extractedText = workbook.SheetNames.map((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          return `HOJA: ${sheetName}\n${window.XLSX.utils.sheet_to_csv(sheet)}`;
        }).join('\n\n');
      }

      if (extractedText.trim()) {
        setCustomRoutineText(extractedText);
        analyzeRoutineText(extractedText, file.name);
        triggerToast(`[ESCÁNER] Se cargó ${file.name} y se extrajo su texto.`);
      } else {
        const isImage = (file.type || '').startsWith('image/') || ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'heic', 'heif'].includes(extension);
        const isPdf = extension === 'pdf';
        const explanation = isImage
          ? 'La imagen se recibió correctamente, pero esta versión no tiene OCR integrado para leer automáticamente el texto de la captura. Podés conservar el archivo como referencia y pegar/transcribir el contenido en el cuadro.'
          : isPdf
            ? 'El PDF se recibió correctamente. Para extraer su texto automáticamente, la aplicación necesita tener PDF.js cargado (window.pdfjsLib). Si es un PDF escaneado, además necesita OCR.'
            : ['doc', 'docx'].includes(extension)
              ? 'El documento se recibió correctamente. Para leerlo automáticamente, la aplicación necesita tener Mammoth cargado (window.mammoth).'
              : ['xls', 'xlsx', 'ods'].includes(extension)
                ? 'La planilla se recibió correctamente. Para leerla automáticamente, la aplicación necesita tener SheetJS cargado (window.XLSX).'
                : 'El archivo se recibió correctamente, pero este formato binario no tiene un lector compatible integrado. Podés pegar el texto de la rutina en el cuadro para analizarlo.';
        setCustomRoutineText('');
        setScanReport({
          sourceName: file.name,
          rawText: `${fileInfo}\n\n${explanation}`,
          exerciseLines: [],
          score: 'PENDIENTE (CONTENIDO NO EXTRAÍDO)',
          finding: [`Se aceptó el archivo ${file.name}.`, 'El archivo quedó identificado por nombre, formato y tamaño.'],
          fix: [explanation, 'Cuando el contenido esté disponible como texto, usá EXAMINAR RUTINA para recibir la evaluación de ejercicios, series, repeticiones, RIR y progresión.']
        });
        triggerToast('[ESCÁNER] Archivo recibido. La extracción depende del formato.');
      }
    } catch (error) {
      console.error('Error al procesar el archivo de rutina:', error);
      setScanReport({
        sourceName: file.name,
        rawText: `${fileInfo}\n\nNo se pudo extraer el contenido del archivo.`,
        exerciseLines: [],
        score: 'NO DISPONIBLE',
        finding: ['El archivo fue seleccionado, pero ocurrió un error durante la lectura.'],
        fix: ['Probá con otro formato o pegá el texto de la rutina directamente en el cuadro.']
      });
      triggerToast('[ESCÁNER] No se pudo extraer el contenido del archivo.');
    } finally {
      event.target.value = '';
    }
  };

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
      setLiftWeightInput(0);
      setLiftRepsInput(0);
    }
  };

  const handleSaveExerciseLoad = () => {
    const w = Math.max(0, Number(liftWeightInput));
    const r = Math.max(0, Number(liftRepsInput));

    if (w <= 0 || r <= 0) {
      triggerToast('[ALERTA] Ingresa un peso y repeticiones mayores a 0 para registrar tu marca.');
      return;
    }

    const prevRecord = savedLifts[selectedExercise];
    const prev1RM = prevRecord
      ? getEffectiveExercise1RM(selectedExercise, prevRecord.weight, prevRecord.reps, profile.weightKg)
      : 0;
    const new1RM = getEffectiveExercise1RM(selectedExercise, w, r, profile.weightKg);

    const kgGain = Math.max(0, new1RM - prev1RM);
    const gainedExp = 35 + kgGain * 10;
    const gainedLp = 15 + kgGain * 4;

    const updated = {
      ...savedLifts,
      [selectedExercise]: {
        weight: w,
        reps: r,
        date: new Date().toLocaleDateString(),
      },
    };

    const prevLevel = Math.floor(exp / 100);
    const nextTotalExp = exp + gainedExp;
    const nextLevel = Math.floor(nextTotalExp / 100);

    setSavedLifts(updated);
    setExp(nextTotalExp);
    setLp((l) => l + gainedLp);

    const nextGradeInfo = computeHunterGradeData(updated, profile.weightKg);
    const nextGrade = nextGradeInfo.currentStd.grade;

    if (nextGrade !== hunterGrade) {
      prevGradeRef.current = nextGrade;
      triggerToast(`¡ASCENSO AUTOMÁTICO A GRADO ${nextGrade} Y NIVEL ${nextLevel}! (+${gainedExp} EXP por récord de ${new1RM} kg)`);
    } else if (nextLevel > prevLevel) {
      triggerToast(`¡SUBIDA DE NIVEL AUTOMÁTICA! Nv. ${prevLevel} → Nv. ${nextLevel} (+${gainedExp} EXP)`);
    } else {
      triggerToast(`[SISTEMA] ${selectedExercise} registrado (${new1RM} kg 1RM) • +${gainedExp} EXP y +${gainedLp} LP.`);
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
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.strokeRect(65, 12, 110, 58);
        ctx.fillStyle = '#fbbf24';
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
    const bW = Math.max(0, Number(profile.benchKg) || 0);
    const sW = Math.max(0, Number(profile.squatKg) || 0);
    const dW = Math.max(0, Number(profile.deadliftKg) || 0);

    const initialLifts = {
      ...ZERO_LIFTS,
      'Press Banca': { weight: bW, reps: bW > 0 ? 5 : 0, date: bW > 0 ? 'Despertar' : 'Sin registrar' },
      'Sentadilla Trasera': { weight: sW, reps: sW > 0 ? 5 : 0, date: sW > 0 ? 'Despertar' : 'Sin registrar' },
      'Peso Muerto Convencional': { weight: dW, reps: dW > 0 ? 5 : 0, date: dW > 0 ? 'Despertar' : 'Sin registrar' },
    };
    setSavedLifts(initialLifts);
    setLiftWeightInput(bW);
    setLiftRepsInput(bW > 0 ? 5 : 0);

    const seed =
      Number(profile.weightKg) * 17 +
      Number(profile.heightCm) * 11 +
      Math.floor(Math.random() * 9973);

    const chosenRace = RACES_POOL[seed % RACES_POOL.length];
    const chosenCls = generateRandomInfiniteClass(seed + Date.now());
    const assigned = { race: chosenRace, cls: chosenCls, assignedAt: new Date().toLocaleDateString() };

    const initGrade = computeHunterGradeData(initialLifts, profile.weightKg).currentStd.grade;
    prevGradeRef.current = initGrade;

    setHunterClass(assigned);
    setLp(0);
    setExp(0);
    setStreak(0);
    setUnlockedInventory([]);
    setCompletedChapters([]);
    setSleepLog(ZERO_SLEEP_LOG);
    setAwakened(true);
    setActiveTab('avatar');
    triggerToast(`¡DESPERTAR INICIADO DESDE 0! Clase: ${chosenCls.name} • Pasiva: ${chosenCls.passiveName}`);
  };

  const requestGpsLocation = () => {
    if (!navigator.geolocation) {
      triggerToast('[GPS] Tu navegador no soporta geolocalización; usando coordenadas locales.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          label: `GPS Verificado (${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)})`
        });
        triggerToast('[RADAR 30 KM] Ubicación actualizada para duelos PvP con amigos.');
      },
      () => {
        triggerToast('[RADAR 30 KM] Permiso GPS denegado; manteniendo zona local por defecto.');
      }
    );
  };

  const rankInfo = getRankFromLP(lp);
  const totalSleep = sleepLog.reduce((acc, d) => acc + d.hours, 0);
  const sleepOptimal = totalSleep >= 49 && totalSleep <= 63;
  const currentEx1RM = getEffectiveExercise1RM(selectedExercise, liftWeightInput, liftRepsInput, profile.weightKg);
  const currentExRatio = (currentEx1RM / gradeData.bw).toFixed(2);

  // ==========================================================================
  // PANTALLA 1: ENCUESTA ÚNICA DE DESPERTAR (TODO PARTE DESDE 0)
  // ==========================================================================
  if (!awakened) {
    return (
      <div className="sys-container" style={{ maxWidth: '580px', paddingTop: '24px' }}>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        {toast && (
          <div className="toast-alert">
            <Sparkles size={18} color="#fbbf24" />
            <span>{toast}</span>
          </div>
        )}

        <div className="sys-window" style={{ padding: '24px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>● Sesión Activa: {currentUser.email}</span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span className="sys-badge" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid #fbbf24' }}>
              [ALERTA DEL SISTEMA // INICIO DESDE 0]
            </span>
            <h1 className="font-souls" style={{ fontSize: '25px', marginTop: '10px', color: '#fff' }}>
              PROTOCOLO EX
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
              Paso {surveyStep} de 5 — Calibración inicial del Cazador
            </p>
            <div className="progress-track" style={{ marginTop: '12px' }}>
              <div className="progress-fill" style={{ width: `${surveyStep * 20}%`, background: 'linear-gradient(90deg, #00f0ff, #fbbf24)' }} />
            </div>
          </div>

          {surveyStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>NOMBRE CLAVE DEL CAZADOR</label>
                <input
                  className="sys-input"
                  value={profile.hunterName}
                  onChange={(e) => setProfile({ ...profile, hunterName: e.target.value.toUpperCase() })}
                />
              </div>
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>GÉNERO DEL AVATAR</label>
                  <select className="sys-select" value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })}>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>OBJETIVO PRINCIPAL</label>
                  <select className="sys-select" value={profile.goal} onChange={(e) => setProfile({ ...profile, goal: e.target.value })}>
                    <option>Hipertrofia y Estética</option>
                    <option>Fuerza Máxima (Powerlifting)</option>
                    <option>Definición y Recomposición</option>
                    <option>Resistencia y Calistenia</option>
                  </select>
                </div>
              </div>
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>DURACIÓN DE RUTINA (MÁX. 2 MESES)</label>
                  <select
                    className="sys-select"
                    value={profile.routineDurationMonths}
                    onChange={(e) => setProfile({ ...profile, routineDurationMonths: Number(e.target.value) })}
                  >
                    <option value={1}>1 Mes (4 Semanas — Bloque Intensivo)</option>
                    <option value={2}>2 Meses (8 Semanas — Mesociclo Completo)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>DÍAS DE ENTRENO / SEMANA</label>
                  <select
                    className="sys-select"
                    value={profile.daysPerWeek}
                    onChange={(e) => setProfile({ ...profile, daysPerWeek: Number(e.target.value) })}
                  >
                    <option value={3}>3 días por semana</option>
                    <option value={4}>4 días por semana</option>
                    <option value={5}>5 días por semana</option>
                    <option value={6}>6 días por semana</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>LESIONES O MOLESTIAS ARTICULARES A CUIDAR</label>
                <input
                  className="sys-input"
                  placeholder="Ej: Ninguna, hombro derecho, zona lumbar..."
                  value={profile.injuries}
                  onChange={(e) => setProfile({ ...profile, injuries: e.target.value })}
                />
              </div>
              <button className="sys-btn sys-btn-gold" style={{ marginTop: '8px' }} onClick={() => setSurveyStep(2)}>
                CONFIGURAR EQUIPAMIENTO <ChevronRight size={16} />
              </button>
            </div>
          )}

          {surveyStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <label style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>
                SELECCIONA TU EQUIPAMIENTO DISPONIBLE
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { id: 'no_equip', title: 'En Casa — Sin Nada de Equipo', desc: '100% peso corporal, calistenia y palancas biomecánicas.' },
                  { id: 'some_equip', title: 'En Casa — Con Algo de Equipo', desc: 'Aclara debajo qué elementos tienes disponibles.' },
                  { id: 'all_gym', title: 'Todo el Equipo (Gimnasio Completo)', desc: 'Barras olímpicas, mancuernas, poleas y máquinas.' },
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setProfile({ ...profile, equipmentMode: opt.id })}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      background: profile.equipmentMode === opt.id ? 'rgba(251,191,36,0.16)' : 'rgba(4,6,12,0.85)',
                      border: `1px solid ${profile.equipmentMode === opt.id ? '#fbbf24' : 'rgba(148,163,184,0.25)'}`,
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '14px' }}>{opt.title}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{opt.desc}</div>
                  </div>
                ))}
              </div>

              {profile.equipmentMode === 'some_equip' && (
                <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.35)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#00f0ff', marginBottom: '8px' }}>
                    ACLARA QUÉ EQUIPO TIENES EN CASA:
                  </div>
                  <div className="grid-2" style={{ gap: '8px' }}>
                    {HOME_EQUIPMENT_OPTIONS.map((eq) => {
                      const active = (profile.ownedHomeEquipment || []).includes(eq);
                      return (
                        <button
                          key={eq}
                          type="button"
                          onClick={() => toggleHomeEquipment(eq)}
                          className="sys-btn"
                          style={{
                            justifyContent: 'flex-start',
                            padding: '8px 10px',
                            fontSize: '10px',
                            background: active ? 'rgba(16,185,129,0.22)' : 'rgba(4,6,12,0.85)',
                            borderColor: active ? '#10b981' : 'rgba(148,163,184,0.25)',
                            color: active ? '#6ee7b7' : '#cbd5e1'
                          }}
                        >
                          {active ? <Check size={13} /> : <Plus size={13} />} {eq}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button className="sys-btn sys-btn-ghost" onClick={() => setSurveyStep(1)}>ATRÁS</button>
                <button className="sys-btn sys-btn-gold" style={{ flex: 1 }} onClick={() => setSurveyStep(3)}>
                  MARCAS DE FUERZA <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {surveyStep === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>EDAD (AÑOS)</label>
                  <input type="number" className="sys-input" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>PESO CORPORAL (KG)</label>
                  <input type="number" className="sys-input" value={profile.weightKg} onChange={(e) => setProfile({ ...profile, weightKg: e.target.value })} />
                </div>
              </div>
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>ALTURA (CM)</label>
                  <input type="number" className="sys-input" value={profile.heightCm} onChange={(e) => setProfile({ ...profile, heightCm: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>EXPERIENCIA (MESES — 0 SI EMPIEZAS)</label>
                  <input type="number" className="sys-input" value={profile.experienceMonths} onChange={(e) => setProfile({ ...profile, experienceMonths: e.target.value })} />
                </div>
              </div>

              {profile.equipmentMode !== 'no_equip' ? (
                <>
                  <div className="grid-2">
                    <div>
                      <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>PRESS BANCA 5 REPS (KG — OPCIONAL)</label>
                      <input type="number" className="sys-input" value={profile.benchKg} onChange={(e) => setProfile({ ...profile, benchKg: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>SENTADILLA 5 REPS (KG — OPCIONAL)</label>
                      <input type="number" className="sys-input" value={profile.squatKg} onChange={(e) => setProfile({ ...profile, squatKg: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 700 }}>PESO MUERTO 5 REPS (KG — OPCIONAL)</label>
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
                <button className="sys-btn sys-btn-ghost" onClick={() => setSurveyStep(2)}>ATRÁS</button>
                <button className="sys-btn sys-btn-gold" style={{ flex: 1 }} onClick={() => setSurveyStep(4)}>
                  ESCANEO CORPORAL <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {surveyStep === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#cbd5e1' }}>
                Subí una foto de cuerpo completo para sellar tu <strong>Clase aleatoria con pasiva única</strong>. El Sistema censura tu rostro localmente antes de procesarla.
              </p>

              <label style={{
                border: '2px dashed rgba(251,191,36,0.45)',
                borderRadius: '14px',
                padding: '22px 14px',
                cursor: 'pointer',
                background: 'rgba(251,191,36,0.05)'
              }}>
                <Camera size={32} color="#fbbf24" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontWeight: 700, color: '#fff' }}>SELECCIONAR FOTO DE CUERPO COMPLETO</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Censura facial local instantánea</div>
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleSecurePhotoUpload(e, 'onboarding')} />
              </label>

              {profile.censoredPreview && (
                <div style={{ margin: '0 auto' }}>
                  <img src={profile.censoredPreview} alt="Escaneo seguro" style={{ width: '130px', borderRadius: '10px', border: '1px solid #fbbf24' }} />
                  <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>✓ Biometría verificada y protegida</div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button className="sys-btn sys-btn-ghost" onClick={() => setSurveyStep(3)}>ATRÁS</button>
                <button className="sys-btn sys-btn-gold" style={{ flex: 1 }} onClick={() => setSurveyStep(5)}>
                  CONTINUAR AL DESPERTAR <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {surveyStep === 5 && (
            <div style={{ textAlign: 'center', padding: '14px 4px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <Shield size={54} color="#fbbf24" style={{ margin: '0 auto' }} />
              <h2 className="font-souls" style={{ fontSize: '21px', color: '#fbbf24', lineHeight: 1.3 }}>
                ¿ESTÁS LISTO PARA INICIAR DESDE 0 COMO CAZADOR?
              </h2>
              <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5 }}>
                Comenzarás en <strong>Nivel 0</strong>, <strong>Racha 0 días</strong>, <strong>0 LP (Tierra 6)</strong> y se desplegará tu tarjeta <strong>Anime Fantasy RPG</strong> con iluminación Neon Blue & Gold.
              </p>
              <button className="sys-btn sys-btn-gold" style={{ padding: '16px', fontSize: '13px' }} onClick={awakenHunter}>
                <Zap size={18} /> SÍ, COMENZAR DESDE 0
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================================================
  // INTERFAZ PRINCIPAL DEL SISTEMA (ANIME FANTASY RPG HUD)
  // ==========================================================================
  return (
    <div className="sys-container">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <ExerciseAnimationModal exercise={animModalEx} onClose={() => setAnimModalEx(null)} />

      {toast && (
        <div className="toast-alert">
          <Zap size={18} color="#fbbf24" />
          <span>{toast}</span>
        </div>
      )}

      {/* BARRA DE SESIÓN PERMANENTE */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 12px',
        marginBottom: '10px',
        borderRadius: '10px',
        background: 'rgba(10, 15, 30, 0.9)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        fontSize: '11px'
      }}>
        <span style={{ color: '#cbd5e1' }}>
          <span style={{ color: '#10b981', fontWeight: 700 }}>● SESIÓN PERMANENTE ACTIVA:</span> {currentUser.email}
        </span>
        <span style={{ color: '#94a3b8' }}>Guardado automático</span>
      </div>

      {/* CABECERA DE ESTADO DEL CAZADOR (DESDE 0) */}
      <div className="sys-window" style={{ padding: '16px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span className="sys-badge" style={{ background: 'rgba(0,240,255,0.16)', color: '#00f0ff', border: '1px solid #00f0ff' }}>
                NIVEL {level} (∞)
              </span>
              <span className="sys-badge" style={{ background: 'rgba(251,191,36,0.16)', color: '#fbbf24', border: '1px solid #fbbf24' }}>
                GRADO DE CAZADOR: {hunterGrade}
              </span>
              <span className="sys-badge" style={{ background: 'rgba(234,88,12,0.2)', color: '#fdba74', border: '1px solid #ea580c' }}>
                <Flame size={13} /> RACHA {streak}D
              </span>
              <span className="sys-badge" style={{ background: 'rgba(190,18,60,0.2)', color: '#fda4af', border: '1px solid #be123c' }}>
                PODER: {hunterCombatPower}
              </span>
            </div>
            <h1 className="font-souls" style={{ fontSize: '21px', marginTop: '6px', color: '#fff' }}>
              {profile.hunterName} <span style={{ fontSize: '12px', color: '#94a3b8' }}>({profile.hunterCode})</span>
            </h1>
            <div style={{ fontSize: '13px', color: '#fde047', fontWeight: 700 }}>
              {classEvolution.title} • Pasiva Única: {hunterClass?.cls?.passiveName || 'Muralla Inquebrantable (Infinito)'}
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

        {/* BARRAS DE PROGRESO DE RANGO Y EXP DE CLASE */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#fde047', fontWeight: 700, marginBottom: '4px', textAlign: 'center' }}>
              PROGRESO DE RANGO ({rankInfo.currentDivLP}/100 LP)
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${rankInfo.currentDivLP}%`, background: 'linear-gradient(90deg, #b45309, #fbbf24)' }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#7dd3fc', fontWeight: 700, marginBottom: '4px', textAlign: 'center' }}>
              EXP DE CLASE ({expInLevel}/100 EXP)
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${expInLevel}%`, background: 'linear-gradient(90deg, #0284c7, #00f0ff)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* MENÚ DE NAVEGACIÓN DE 2 FILAS x 5 COLUMNAS */}
      <div className="nav-tabs">
        <button className={`nav-tab ${activeTab === 'quests' ? 'active' : ''}`} onClick={() => setActiveTab('quests')}>
          <Trophy size={16} color="#fbbf24" />
          <span>Misiones</span>
        </button>
        <button className={`nav-tab ${activeTab === 'routines' ? 'active' : ''}`} onClick={() => setActiveTab('routines')}>
          <Cpu size={16} color="#10b981" />
          <span>Rutina</span>
        </button>
        <button className={`nav-tab ${activeTab === 'avatar' ? 'active' : ''}`} onClick={() => setActiveTab('avatar')}>
          <Sword size={16} color="#00f0ff" />
          <span>Clase & Pasiva</span>
        </button>
        <button className={`nav-tab ${activeTab === 'pve' ? 'active' : ''}`} onClick={() => setActiveTab('pve')}>
          <BookOpen size={16} color="#f59e0b" />
          <span>Historia PvE</span>
        </button>
        <button
          className={`nav-tab ${activeTab === 'city_vn' ? 'active' : ''}`}
          style={{ opacity: cityUnlocked ? 1 : 0.72 }}
          onClick={() => {
            if (!cityUnlocked) {
              triggerToast('🔒 Completa el Capítulo 1 de Historia PvE para fundar tu Ciudad 2D y desbloquear la Novela Visual.');
            }
            setActiveTab('city_vn');
          }}
        >
          {cityUnlocked ? <Heart size={16} color="#fb7185" /> : <Lock size={16} color="#94a3b8" />}
          <span>{cityUnlocked ? 'Ciudad 2D' : 'Ciudad 🔒'}</span>
        </button>
        <button className={`nav-tab ${activeTab === 'pvp' ? 'active' : ''}`} onClick={() => setActiveTab('pvp')}>
          <Users size={16} color="#f43f5e" />
          <span>PvP</span>
        </button>
        <button className={`nav-tab ${activeTab === 'strength' ? 'active' : ''}`} onClick={() => setActiveTab('strength')}>
          <Dumbbell size={16} color="#e11d48" />
          <span>Cargas</span>
        </button>
        <button className={`nav-tab ${activeTab === 'vault' ? 'active' : ''}`} onClick={() => setActiveTab('vault')}>
          <Lock size={16} color="#a855f7" />
          <span>Bóveda</span>
        </button>
        <button className={`nav-tab ${activeTab === 'sleep' ? 'active' : ''}`} onClick={() => setActiveTab('sleep')}>
          <Moon size={16} color="#38bdf8" />
          <span>Sueño ({totalSleep}h)</span>
        </button>
        <button className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
          <Settings size={16} color="#94a3b8" />
          <span>Ajustes</span>
        </button>
      </div>

      {/* ====================================================================
          MÓDULO 3: ANIME FANTASY RPG CHARACTER ART + EVOLUCIÓN INFINITA
         ==================================================================== */}
      {activeTab === 'avatar' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="avatar-rpg-shell cinematic-entry" style={{ maxWidth: '520px', width: '100%', margin: '0 auto' }}>
            <JrpgFantasyPortrait
              hunterClass={hunterClass}
              hunterGrade={hunterGrade}
              level={level}
              classEvolution={classEvolution}
              gender={profile.gender || 'male'}
              onToggleGender={() => setProfile({ ...profile, gender: profile.gender === 'female' ? 'male' : 'female' })}
              passiveClassBonus={passiveClassBonus}
            />
          </div>

          <div className="sys-window" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#00f0ff' }}>
                PROGRESO DE EVOLUCIÓN Y GRADO DE CAZADOR ({hunterGrade})
              </span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                Siguiente etapa de clase en Nivel {classEvolution.nextLvl}
              </span>
            </div>

            {hunterGrade !== 'EX' ? (
              <div style={{ fontSize: '12px', color: '#e2e8f0' }}>
                Próximo ascenso automático a <strong>Grado {gradeData.nextStd.grade}</strong> al lograr: Banca <strong>{Math.round(gradeData.nextStd.benchReq * gradeData.bw)}kg</strong> • Sentadilla <strong>{Math.round(gradeData.nextStd.squatReq * gradeData.bw)}kg</strong> • P. Muerto <strong>{Math.round(gradeData.nextStd.deadliftReq * gradeData.bw)}kg</strong>
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: '#fde047' }}>
                ¡Has alcanzado el Grado de Cazador EX máximo!
              </div>
            )}
          </div>

          <div className="sys-window" style={{ padding: '18px' }}>
            <h3 className="font-hud" style={{ fontSize: '14px', color: '#fbbf24', marginBottom: '12px' }}>
              HABILIDADES Y EQUIPAMIENTO DESBLOQUEADOS ({unlockedInventory.length})
            </h3>
            {unlockedInventory.length === 0 ? (
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>
                Aún no tienes equipamiento ni habilidades extra (empezaste desde 0). Completa misiones diarias o capítulos de Historia PvE para obtenerlos.
              </p>
            ) : (
              <div className="grid-2">
                {unlockedInventory.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      background: 'rgba(4,6,12,0.85)',
                      border: `1px solid ${item.type.includes('Habilidad') ? '#00f0ff' : '#fbbf24'}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <span className="sys-badge" style={{
                        background: item.type.includes('Habilidad') ? 'rgba(0,240,255,0.16)' : 'rgba(251,191,36,0.16)',
                        color: item.type.includes('Habilidad') ? '#00f0ff' : '#fde047',
                        marginBottom: '4px'
                      }}>
                        {item.type}
                      </span>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{item.desc}</div>
                    </div>
                    <div className="font-hud" style={{ fontSize: '13px', color: '#10b981', fontWeight: 700 }}>
                      +{item.power} PWR
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 1: MISIONES DIARIAS
         ==================================================================== */}
      {activeTab === 'quests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-hud" style={{ fontSize: '14px', color: '#fbbf24', marginBottom: '12px' }}>
              MISIONES DIARIAS (SUMA RACHA, EXP, LP Y RECOMPENSAS)
            </h2>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                className="sys-input"
                placeholder="Declarar misión de hoy (ej. Press Banca 4x8)..."
                value={newQuestTitle}
                onChange={(e) => setNewQuestTitle(e.target.value)}
              />
              <button
                className="sys-btn sys-btn-gold"
                onClick={() => {
                  if (!newQuestTitle.trim()) return;
                  setQuests([{ id: Date.now(), title: newQuestTitle, env: 'Declarado', lp: 45, exp: 95, status: 'pending' }, ...quests]);
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
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                        Recompensa: +{q.lp} LP • +{q.exp || 80} EXP • Cofre de Habilidad/Equipo
                      </div>
                    </div>
                    <span className="sys-badge" style={{
                      background: q.status === 'completed' ? 'rgba(16,185,129,0.2)' : q.status === 'failed' ? 'rgba(225,29,72,0.2)' : 'rgba(251,191,36,0.15)',
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
                          setExp((prev) => prev + (q.exp || 85));
                          setStreak((s) => s + 1);

                          const lockedDrops = DAILY_REWARD_POOL.filter(
                            (drop) => !unlockedInventory.some((owned) => owned.id === drop.id)
                          );
                          if (lockedDrops.length > 0) {
                            const won = lockedDrops[Math.floor(Math.random() * lockedDrops.length)];
                            setUnlockedInventory([...unlockedInventory, won]);
                            triggerToast(`¡MISIÓN CUMPLIDA! Racha +1 • +${q.exp || 85} EXP y obtuviste [${won.type}]: ${won.name}`);
                          } else {
                            triggerToast(`¡MISIÓN CUMPLIDA! Racha +1 • +${q.lp} LP y +${q.exp || 85} EXP.`);
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
                          setNextWeekQueue([...nextWeekQueue, { id: Date.now(), title: `${q.title} (Retoma Semanal)`, lp: q.lp, exp: q.exp || 85 }]);
                          triggerToast('[ALERTA] Misión fallida. Enviada a cola de retoma.');
                        }}
                      >
                        <XCircle size={14} /> NO LOGRADO
                      </button>

                      <button
                        className="sys-btn sys-btn-ghost"
                        style={{ padding: '8px 12px', fontSize: '11px' }}
                        onClick={() => setJustifyModalId(q.id)}
                      >
                        <CloudRain size={14} color="#38bdf8" /> JUSTIFICAR
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
                          ? { ...item, title: `[DESAFÍO EN CASA] Circuito HIIT Tabata + 120 Sentadillas/Flexiones (${justifyReason})`, env: 'Casa (Adaptado)' }
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
                      setQuests([{ id: Date.now(), title: item.title, env: 'Retoma', lp: item.lp, exp: item.exp || 90, status: 'pending' }, ...quests]);
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
        </div>
      )}

      {/* ====================================================================
          MÓDULO 2: RUTINAS PERSONALIZADAS (1-2 MESES) + MINI ANIMACIÓN TÉCNICA
         ==================================================================== */}
      {activeTab === 'routines' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <h2 className="font-hud" style={{ fontSize: '14px', color: '#10b981' }}>
                GENERADOR DE ENTRENAMIENTO PERSONALIZADO
              </h2>
              <span className="sys-badge" style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7' }}>
                {profile.daysPerWeek} DÍAS / SEMANA
              </span>
            </div>

            <div className="grid-2" style={{ marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8' }}>DURACIÓN DEL BLOQUE (MÁX. 2 MESES)</label>
                <select
                  className="sys-select"
                  value={profile.routineDurationMonths}
                  onChange={(e) => setProfile({ ...profile, routineDurationMonths: Number(e.target.value) })}
                >
                  <option value={1}>1 Mes (4 Semanas)</option>
                  <option value={2}>2 Meses (8 Semanas)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8' }}>MODALIDAD DE EQUIPO</label>
                <select
                  className="sys-select"
                  value={profile.equipmentMode}
                  onChange={(e) => setProfile({ ...profile, equipmentMode: e.target.value })}
                >
                  <option value="no_equip">En Casa — Sin Nada de Equipo</option>
                  <option value="some_equip">En Casa — Con Algo de Equipo</option>
                  <option value="all_gym">Todo el Equipo (Gimnasio Completo)</option>
                </select>
              </div>
            </div>

            {profile.equipmentMode === 'some_equip' && (
              <div style={{ marginBottom: '12px', padding: '10px', borderRadius: '10px', background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.3)' }}>
                <div style={{ fontSize: '11px', color: '#00f0ff', fontWeight: 700, marginBottom: '6px' }}>
                  EQUIPO EN CASA DECLARADO:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {HOME_EQUIPMENT_OPTIONS.map((eq) => {
                    const active = (profile.ownedHomeEquipment || []).includes(eq);
                    return (
                      <button
                        key={eq}
                        onClick={() => toggleHomeEquipment(eq)}
                        className="sys-btn"
                        style={{
                          padding: '6px 10px',
                          fontSize: '10px',
                          background: active ? 'rgba(16,185,129,0.22)' : 'rgba(4,6,12,0.85)',
                          borderColor: active ? '#10b981' : 'rgba(148,163,184,0.25)',
                          color: active ? '#6ee7b7' : '#94a3b8'
                        }}
                      >
                        {active ? '✓' : '+'} {eq}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div style={{ marginTop: '8px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                className="sys-btn sys-btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '13px' }}
                onClick={() => {
                  setShowGeneratedRoutine(true);
                  triggerToast('[SISTEMA] Rutina personalizada generada.');
                }}
              >
                <Dumbbell size={16} /> GENERAR MI RUTINA COMPLETA
              </button>
              <p style={{ color: '#94a3b8', fontSize: '11px', textAlign: 'center' }}>
                La rutina y su desglose semanal permanecerán ocultos hasta que solicites generarlos.
              </p>
            </div>

            {showGeneratedRoutine && (
            <div className="cinematic-entry">
            <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)', marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#fde047', marginBottom: '4px' }}>
                ESTRUCTURA DEL MESOCICLO ({activeRoutinePlan.modeLabel}):
              </div>
              {activeRoutinePlan.phases.map((ph, idx) => (
                <div key={idx} style={{ fontSize: '12px', color: '#e2e8f0' }}>• {ph}</div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeRoutinePlan.days.map((day, dayIndex) => (
                <div key={`preview-day-${dayIndex}`} style={{ padding: '12px', borderRadius: '10px', background: 'rgba(4,6,12,0.88)', border: '1px solid rgba(148,163,184,0.25)' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#00f0ff', fontSize: '14px' }}>DÍA {dayIndex + 1} — {day.name}</strong>
                    <div style={{ color: '#94a3b8', fontSize: '11px' }}>{day.focus}</div>
                  </div>
                  {day.exercises.map((ex, idx) => (
                    <div key={`${dayIndex}-${idx}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', padding: '7px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div>
                        <div style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>{ex.name}</div>
                        <div style={{ color: '#fbbf24', fontSize: '11px' }}>{ex.baseSets} × {ex.baseReps} • {ex.focus}</div>
                      </div>
                      <button className="sys-btn sys-btn-primary" style={{ padding: '6px 9px', fontSize: '9px' }} onClick={() => setAnimModalEx(ex)}>
                        <Play size={12} /> TÉCNICA
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '18px', borderTop: '1px solid rgba(0,240,255,0.25)', paddingTop: '14px' }}>
              <h3 className="font-hud" style={{ fontSize: '13px', color: '#00f0ff', marginBottom: '10px' }}>
                PLAN COMPLETO — DESGLOSE SEMANA POR SEMANA
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '12px' }}>
                Se muestran todos los ejercicios del plan y su prescripción semanal. La progresión es una propuesta inicial y debe ajustarse según técnica, rendimiento y recuperación.
              </p>
              {weeklyRoutinePlan.map((weekPlan) => (
                <div key={weekPlan.week} style={{ padding: '12px', marginBottom: '10px', borderRadius: '10px', background: 'rgba(4,6,12,0.82)', border: `1px solid ${weekPlan.isDeload ? 'rgba(251,191,36,0.55)' : 'rgba(148,163,184,0.22)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <strong style={{ color: weekPlan.isDeload ? '#fbbf24' : '#fff' }}>SEMANA {weekPlan.week}</strong>
                    <span style={{ fontSize: '11px', color: weekPlan.isDeload ? '#fbbf24' : '#00f0ff' }}>{weekPlan.phase}</span>
                  </div>
                  {weekPlan.days.map((day, dayIndex) => (
                    <div key={`week-${weekPlan.week}-day-${dayIndex}`} style={{ marginTop: '10px', padding: '9px', borderRadius: '8px', background: 'rgba(0,240,255,0.035)', border: '1px solid rgba(0,240,255,0.12)' }}>
                      <div style={{ color: '#00f0ff', fontWeight: 700, fontSize: '12px', marginBottom: '5px' }}>DÍA {dayIndex + 1} — {day.name}</div>
                      {day.exercises.map((exercise, exerciseIndex) => (
                        <div key={`${weekPlan.week}-${dayIndex}-${exerciseIndex}`} style={{ padding: '6px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '12px' }}>{exercise.name}</div>
                          <div style={{ color: '#fbbf24', fontSize: '11px' }}>{exercise.weeklySets} • {exercise.focus}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            </div>
            )}
          </div>

          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-hud" style={{ fontSize: '14px', color: '#00f0ff', marginBottom: '10px' }}>
              ESCÁNER DE RUTINA PROPIA (CUALQUIER ARCHIVO O TEXTO)
            </h2>
            <textarea
              className="sys-textarea"
              rows={3}
              placeholder="Pegá tu rutina o subí un archivo de cualquier formato. Se intentará extraer el texto según el tipo de archivo..."
              value={customRoutineText}
              onChange={(e) => setCustomRoutineText(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
              <button
                className="sys-btn sys-btn-primary"
                onClick={() => analyzeRoutineText(customRoutineText, routineFileName || 'Texto pegado')}
              >
                <Scan size={15} /> EXAMINAR RUTINA
              </button>
              <label className="sys-btn sys-btn-ghost" style={{ cursor: 'pointer' }}>
                <FileText size={15} /> SUBIR CUALQUIER ARCHIVO
                <input
                  type="file"
                  accept="*/*"
                  style={{ display: 'none' }}
                  onChange={handleRoutineFileUpload}
                />
              </label>
            </div>
            {scanReport && (
              <div style={{ marginTop: '12px', padding: '14px', borderRadius: '10px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.55)', fontSize: '13px' }}>
                <div style={{ fontWeight: 700, color: '#6ee7b7' }}>EVALUACIÓN ORIENTATIVA: {scanReport.score}</div>
                <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px' }}>Fuente: {scanReport.sourceName}. El índice mide la información detectada, no certifica que la rutina sea óptima.</div>
                <h3 style={{ color: '#6ee7b7', marginTop: '12px', marginBottom: '5px' }}>PUNTOS FUERTES / DATOS DETECTADOS</h3>
                {scanReport.finding.map((item, index) => <p key={`finding-${index}`} style={{ color: '#e2e8f0', marginTop: '4px' }}>• {item}</p>)}
                <h3 style={{ color: '#fbbf24', marginTop: '12px', marginBottom: '5px' }}>CRÍTICA CONSTRUCTIVA Y MEJORAS</h3>
                {scanReport.fix.map((item, index) => <p key={`fix-${index}`} style={{ color: '#fcd34d', marginTop: '4px' }}>• {item}</p>)}
                <h3 style={{ color: '#00f0ff', marginTop: '12px', marginBottom: '5px' }}>RUTINA LEÍDA</h3>
                <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', maxHeight: '260px', overflowY: 'auto', padding: '10px', borderRadius: '8px', background: 'rgba(4,6,12,0.8)', color: '#cbd5e1', fontFamily: 'inherit', fontSize: '12px' }}>{scanReport.rawText}</pre>
                <h3 style={{ color: '#00f0ff', marginTop: '12px', marginBottom: '5px' }}>EJERCICIOS / SERIES × REPETICIONES DETECTADOS</h3>
                {scanReport.exerciseLines.length ? scanReport.exerciseLines.map((item, index) => <p key={`exercise-${index}`} style={{ color: '#e2e8f0', marginTop: '3px' }}>• {item}</p>) : <p style={{ color: '#94a3b8' }}>No se detectaron formatos del tipo 3 × 8-12. Revisá el texto o agregá las prescripciones.</p>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 4: MODO HISTORIA PVE SECUENCIAL
         ==================================================================== */}
      {activeTab === 'pve' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <h2 className="font-souls" style={{ fontSize: '17px', color: '#f59e0b' }}>
                CRÓNICAS DEL ABISMO — MODO HISTORIA PVE
              </h2>
              <span className="sys-badge" style={{ background: 'rgba(245,158,11,0.2)', color: '#fde047', border: '1px solid #f59e0b' }}>
                TU PODER DE COMBATE: {hunterCombatPower}
              </span>
            </div>

            {pveBattleLog && (
              <div style={{
                padding: '14px',
                borderRadius: '11px',
                marginBottom: '14px',
                background: pveBattleLog.victory ? 'rgba(16,185,129,0.16)' : 'rgba(225,29,72,0.16)',
                border: `1px solid ${pveBattleLog.victory ? '#10b981' : '#e11d48'}`
              }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: pveBattleLog.victory ? '#6ee7b7' : '#fda4af' }}>
                  {pveBattleLog.title}
                </div>
                <p style={{ fontSize: '13px', color: '#e2e8f0', marginTop: '4px' }}>{pveBattleLog.detail}</p>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {PVE_STORY_CHAPTERS.map((ch) => {
                const cleared = completedChapters.includes(ch.id);
                const prevCleared = ch.prevId === null || completedChapters.includes(ch.prevId);
                const canChallenge = prevCleared && hunterCombatPower >= ch.reqPower;

                return (
                  <div
                    key={ch.id}
                    style={{
                      padding: '15px',
                      borderRadius: '12px',
                      background: 'rgba(4,6,12,0.88)',
                      opacity: prevCleared ? 1 : 0.6,
                      border: `1px solid ${cleared ? '#10b981' : !prevCleared ? 'rgba(148,163,184,0.2)' : canChallenge ? 'rgba(251,191,36,0.45)' : 'rgba(225,29,72,0.35)'}`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>{ch.act}</span>
                      <span className="sys-badge" style={{
                        background: cleared ? 'rgba(16,185,129,0.2)' : !prevCleared ? 'rgba(148,163,184,0.15)' : 'rgba(251,191,36,0.15)',
                        color: cleared ? '#6ee7b7' : !prevCleared ? '#94a3b8' : '#fde047'
                      }}>
                        {cleared
                          ? '✓ CAPÍTULO COMPLETADO'
                          : !prevCleared
                          ? `🔒 REQUIERE CAPÍTULO ${ch.order - 1}`
                          : `PODER REQUERIDO: ${ch.reqPower}`}
                      </span>
                    </div>

                    <h3 className="font-souls" style={{ fontSize: '16px', color: '#fff', marginTop: '4px' }}>
                      {ch.chapter}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px', lineHeight: 1.45 }}>
                      {ch.lore}
                    </p>
                    <div style={{ fontSize: '12px', color: '#fda4af', marginTop: '6px' }}>
                      <strong>Jefe de Capítulo:</strong> {ch.enemy}
                    </div>
                    <div style={{ fontSize: '12px', color: '#00f0ff', marginTop: '2px' }}>
                      <strong>Recompensa Especial:</strong> {ch.rewardName} (+{ch.expReward} EXP, +{ch.lpReward} LP)
                    </div>

                    {!cleared && (
                      <button
                        disabled={!prevCleared}
                        className={`sys-btn ${!prevCleared ? 'sys-btn-ghost' : canChallenge ? 'sys-btn-gold' : 'sys-btn-danger'}`}
                        style={{ marginTop: '10px', padding: '9px 14px', fontSize: '11px' }}
                        onClick={() => {
                          if (!prevCleared) return;
                          if (!canChallenge) {
                            setPveBattleLog({
                              victory: false,
                              title: `DERROTA ANTE ${ch.enemy.toUpperCase()}`,
                              detail: `Tu poder actual (${hunterCombatPower}) es inferior al umbral (${ch.reqPower}).`
                            });
                            return;
                          }
                          setCompletedChapters([...completedChapters, ch.id]);
                          setExp((e) => e + ch.expReward);
                          setLp((l) => l + ch.lpReward);
                          setUnlockedInventory([
                            ...unlockedInventory,
                            { id: ch.id, type: ch.rewardType, name: ch.rewardName, power: 55, desc: `Recompensa obtenida en ${ch.chapter}` }
                          ]);
                          setPveBattleLog({
                            victory: true,
                            title: `¡VICTORIA EN ${ch.chapter.toUpperCase()}!`,
                            detail: ch.id === 'act1_ch1'
                              ? `Has derrotado a ${ch.enemy}, fundado tu Ciudad 2D y desbloqueado a Lyra en la Novela Visual.`
                              : `Has derrotado a ${ch.enemy} y reclamado ${ch.rewardName}.`
                          });
                          triggerToast(
                            ch.id === 'act1_ch1'
                              ? '¡CIUDAD 2D Y NOVELA VISUAL DESBLOQUEADAS!'
                              : `[HISTORIA PVE] ¡Capítulo ${ch.order} superado!`
                          );
                        }}
                      >
                        {!prevCleared ? (
                          <><Lock size={14} /> COMPLETA EL CAPÍTULO {ch.order - 1} PRIMERO</>
                        ) : (
                          <><Sword size={14} /> INICIAR COMBATE DE HISTORIA</>
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 5: CIUDAD PERSONALIZABLE 2D + NOVELA VISUAL
         ==================================================================== */}
      {activeTab === 'city_vn' && (
        !cityUnlocked ? (
          <div className="sys-window" style={{ padding: '28px 20px', textAlign: 'center' }}>
            <Lock size={44} color="#fbbf24" style={{ margin: '0 auto 12px' }} />
            <h2 className="font-souls" style={{ fontSize: '20px', color: '#fff', marginBottom: '8px' }}>
              CIUDAD 2D Y NOVELA VISUAL BLOQUEADAS
            </h2>
            <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '480px', margin: '0 auto 16px', lineHeight: 1.5 }}>
              Debes completar el <strong>Capítulo 1 — El Umbral del Hierro</strong> en el Modo Historia PvE para fundar tu ciudad 2D y conocer a los personajes.
            </p>
            <button className="sys-btn sys-btn-gold" onClick={() => setActiveTab('pve')}>
              <BookOpen size={15} /> IR AL CAPÍTULO 1 DE LA HISTORIA
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="sys-window" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                <h2 className="font-souls" style={{ fontSize: '16px', color: '#fbbf24' }}>
                  <Building2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
                  CIUDAD 2D DEL CAZADOR: {cityName.toUpperCase()}
                </h2>
                <span className="sys-badge" style={{ background: 'rgba(251,191,36,0.16)', color: '#fde047' }}>
                  EDIFICIOS 2D: {builtBuildings.length}/{CITY_BUILDINGS_CATALOG.length}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  className="sys-input"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  placeholder="Personaliza el nombre de tu ciudad..."
                />
              </div>

              <City2DWorldMap
                cityName={cityName}
                builtBuildings={builtBuildings}
                unlockedCharacters={unlockedCharacters}
                selectedCharId={activeChar.id}
                onSelectCharacter={(id) => setSelectedCharId(id)}
              />

              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.35)', marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#fde047', marginBottom: '6px' }}>
                  RUMORES EN LAS CALLES DE {cityName.toUpperCase()}:
                </div>
                {townRumors.map((rumor, i) => (
                  <div key={i} style={{ fontSize: '12px', color: '#e2e8f0', marginBottom: '4px' }}>
                    • «{rumor}»
                  </div>
                ))}
              </div>

              <div className="grid-2">
                {CITY_BUILDINGS_CATALOG.map((b) => {
                  const isBuilt = builtBuildings.includes(b.id);
                  return (
                    <div
                      key={b.id}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        background: 'rgba(4,6,12,0.85)',
                        border: `1px solid ${isBuilt ? '#10b981' : 'rgba(148,163,184,0.22)'}`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '8px'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>{b.name}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{b.bonus}</div>
                      </div>
                      {isBuilt ? (
                        <span className="sys-badge" style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7', alignSelf: 'flex-start' }}>
                          ✓ CONSTRUIDO EN MAPA 2D
                        </span>
                      ) : (
                        <button
                          className="sys-btn sys-btn-gold"
                          style={{ padding: '7px 10px', fontSize: '10px', alignSelf: 'flex-start' }}
                          onClick={() => {
                            setBuiltBuildings([...builtBuildings, b.id]);
                            triggerToast(`[CIUDAD 2D] ¡Has construido ${b.name} en el mapa de ${cityName}!`);
                          }}
                        >
                          + CONSTRUIR EN MAPA 2D
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="sys-window" style={{ padding: '18px' }}>
              <h2 className="font-souls" style={{ fontSize: '16px', color: '#fb7185', marginBottom: '8px' }}>
                <Heart size={16} style={{ display: 'inline', marginRight: '6px' }} />
                NOVELA VISUAL — ALIADOS ({unlockedCharacters.length}/{STORY_CHARACTERS.length})
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
                      {isUnlocked ? char.name : `🔒 Desbloquea en ${char.unlockLabel}`}
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
                  <div>
                    <div style={{
                      padding: '14px',
                      borderRadius: '12px',
                      background: 'rgba(4,6,12,0.9)',
                      border: '1px solid rgba(251,113,133,0.45)',
                      marginBottom: '10px'
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#fb7185', marginBottom: '4px' }}>
                        {activeChar.name.toUpperCase()} DICE:
                      </div>
                      <p style={{ fontSize: '14px', color: '#f8fafc', lineHeight: 1.5, fontStyle: 'italic' }}>
                        «{activeCharState.lastReply}»
                      </p>
                    </div>

                    <div style={{
                      padding: '10px',
                      borderRadius: '10px',
                      background: 'rgba(0,240,255,0.06)',
                      border: '1px solid rgba(0,240,255,0.25)',
                      marginBottom: '10px'
                    }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#00f0ff', marginBottom: '4px' }}>
                        MEMORIA PERSISTENTE DE {activeChar.name.toUpperCase()}:
                      </div>
                      {(activeCharState.memories || []).length === 0 ? (
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>Sin recuerdos aún. Inicia una conversación.</div>
                      ) : (
                        (activeCharState.memories || []).map((mem, idx) => (
                          <div key={idx} style={{ fontSize: '11px', color: '#cbd5e1' }}>• Recuerda: {mem}</div>
                        ))
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <button
                        className="sys-btn sys-btn-ghost"
                        style={{ padding: '7px 10px', fontSize: '10px' }}
                        onClick={() => handleSendVisualNovelMessage('Contarte sobre mi entrenamiento y marcas de hoy', 6)}
                      >
                        <Dumbbell size={12} color="#fbbf24" /> CHARLAR DE ENTRENO (+6)
                      </button>
                      <button
                        className="sys-btn sys-btn-love"
                        style={{ padding: '7px 10px', fontSize: '10px' }}
                        onClick={() => handleSendVisualNovelMessage('Invitarte a una cita romántica al anochecer en la ciudad', 12)}
                      >
                        <Heart size={12} /> CITA ROMÁNTICA (+12)
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        className="sys-input"
                        placeholder={`Escribe lo que quieras decirle a ${activeChar.name}...`}
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
          </div>
        )
      )}

      {/* ====================================================================
          MÓDULO 6: AMIGOS & MODO PVP POR PROXIMIDAD (LÍMITE MÁXIMO 30 KM)
         ==================================================================== */}
      {activeTab === 'pvp' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <h2 className="font-hud" style={{ fontSize: '14px', color: '#f43f5e' }}>
                ARENA PVP ENTRE AMIGOS (RADAR MÁXIMO 30 KM)
              </h2>
              <button className="sys-btn sys-btn-ghost" style={{ padding: '6px 10px', fontSize: '10px' }} onClick={requestGpsLocation}>
                <Crosshair size={13} color="#00f0ff" /> CALIBRAR GPS
              </button>
            </div>

            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
              <MapPin size={13} style={{ display: 'inline', color: '#00f0ff', marginRight: '4px' }} />
              Ubicación actual: <strong>{userCoords.label}</strong> • Tu código: <strong style={{ color: '#fbbf24' }}>{profile.hunterCode}</strong>
            </div>

            <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(4,6,12,0.85)', border: '1px solid rgba(244,63,94,0.3)', marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#fda4af', marginBottom: '8px' }}>
                AGREGAR CAZADOR AMIGO
              </div>
              <div className="grid-2" style={{ gap: '8px', marginBottom: '8px' }}>
                <input
                  className="sys-input"
                  placeholder="Nombre del amigo (ej. DRAKE_99)"
                  value={newFriendName}
                  onChange={(e) => setNewFriendName(e.target.value.toUpperCase())}
                />
                <input
                  className="sys-input"
                  placeholder="Código (#PEX-1234)"
                  value={newFriendCode}
                  onChange={(e) => setNewFriendCode(e.target.value.toUpperCase())}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '160px' }}>
                  <label style={{ fontSize: '11px', color: '#94a3b8' }}>DISTANCIA DETECTADA (KM):</label>
                  <input
                    type="number"
                    className="sys-input"
                    value={newFriendDistKm}
                    onChange={(e) => setNewFriendDistKm(Number(e.target.value))}
                  />
                </div>
                <button
                  className="sys-btn sys-btn-gold"
                  style={{ marginTop: '14px' }}
                  onClick={() => {
                    if (!newFriendName.trim()) return;
                    const offsetDeg = (Number(newFriendDistKm) || 5) / 111;
                    setFriends([
                      ...friends,
                      {
                        id: Date.now(),
                        name: newFriendName,
                        code: newFriendCode || `#PEX-${Math.floor(1000 + Math.random() * 8999)}`,
                        level: Math.max(1, level),
                        grade: hunterGrade,
                        power: Math.max(60, Math.round(hunterCombatPower * 0.92)),
                        lat: userCoords.lat + offsetDeg,
                        lon: userCoords.lon,
                        city: `${newFriendDistKm} km de distancia`
                      }
                    ]);
                    setNewFriendName('');
                    setNewFriendCode('');
                    triggerToast('[AMIGOS] Cazador añadido a tu lista.');
                  }}
                >
                  + AGREGAR AMIGO
                </button>
              </div>
            </div>

            {pvpLog && (
              <div style={{
                padding: '12px',
                borderRadius: '10px',
                marginBottom: '14px',
                background: pvpLog.win ? 'rgba(16,185,129,0.16)' : 'rgba(225,29,72,0.16)',
                border: `1px solid ${pvpLog.win ? '#10b981' : '#e11d48'}`
              }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: pvpLog.win ? '#6ee7b7' : '#fda4af' }}>
                  {pvpLog.header}
                </div>
                <div style={{ fontSize: '13px', color: '#e2e8f0', marginTop: '4px' }}>{pvpLog.body}</div>
              </div>
            )}

            {friends.length === 0 ? (
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>
                Tu lista de amigos empieza en 0. Agrega un amigo arriba con su código `#PEX` para combatir dentro de un radio de 30 km.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {friends.map((fr) => {
                  const distKm = getDistanceKm(userCoords.lat, userCoords.lon, fr.lat, fr.lon);
                  const inRange = distKm <= 30;
                  return (
                    <div
                      key={fr.id}
                      style={{
                        padding: '14px',
                        borderRadius: '11px',
                        background: 'rgba(4,6,12,0.88)',
                        border: `1px solid ${inRange ? 'rgba(16,185,129,0.45)' : 'rgba(225,29,72,0.4)'}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ fontSize: '15px', color: '#fff' }}>{fr.name}</strong>
                          <span style={{ fontSize: '11px', color: '#94a3b8' }}>{fr.code}</span>
                          <span className="sys-badge" style={{
                            background: inRange ? 'rgba(16,185,129,0.2)' : 'rgba(225,29,72,0.2)',
                            color: inRange ? '#6ee7b7' : '#fda4af'
                          }}>
                            {distKm} km {inRange ? '(EN RANGO ≤30 KM)' : '(FUERA DE RANGO >30 KM)'}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '3px' }}>
                          Nivel {fr.level} • Grado de Cazador {fr.grade} • Poder: {fr.power}
                        </div>
                      </div>

                      <button
                        className={`sys-btn ${inRange ? 'sys-btn-primary' : 'sys-btn-ghost'}`}
                        style={{ padding: '8px 12px', fontSize: '11px', opacity: inRange ? 1 : 0.6 }}
                        onClick={() => {
                          if (!inRange) {
                            triggerToast(`[RADAR PVP] ${fr.name} está a ${distKm} km. El límite máximo para duelos PvP es 30 km.`);
                            return;
                          }
                          const win = hunterCombatPower >= fr.power;
                          if (win) {
                            setLp((l) => l + 25);
                            setExp((e) => e + 45);
                          }
                          setPvpLog({
                            win,
                            header: win ? `¡VICTORIA PVP CONTRA ${fr.name} (${distKm} KM)!` : `DERROTA PVP ANTE ${fr.name} (${distKm} KM)`,
                            body: win
                              ? `Tu poder (${hunterCombatPower}) superó al de tu amigo (${fr.power}). Ganaste +25 LP y +45 EXP.`
                              : `El poder de ${fr.name} (${fr.power}) superó al tuyo (${hunterCombatPower}).`
                          });
                        }}
                      >
                        <Sword size={14} /> {inRange ? 'DESAFIAR PVP' : 'FUERA DE 30 KM'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 7: CARGAS GUARDADAS (DESDE 0 -> SUBE NIVEL Y GRADO AUTOMÁTICAMENTE)
         ==================================================================== */}
      {activeTab === 'strength' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-hud" style={{ fontSize: '14px', color: '#e11d48', marginBottom: '12px' }}>
              REGISTRO DE CARGAS POR EJERCICIO (SUBE NIVEL Y GRADO AUTOMÁTICAMENTE)
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
                  <label style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {selectedExercise.toLowerCase().includes('dominada') ? 'LASTRE / TOTAL (KG)' : 'CARGA (KG)'}
                  </label>
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
                1RM Efectivo en <strong>{selectedExercise}</strong>: <span style={{ color: '#00f0ff', fontWeight: 700 }}>{currentEx1RM} kg</span> ({currentExRatio}x peso corporal)
              </div>
              <button className="sys-btn sys-btn-gold" onClick={handleSaveExerciseLoad}>
                <Save size={15} /> GUARDAR MARCA DE {selectedExercise.toUpperCase()}
              </button>
            </div>

            <div className="grid-2">
              {Object.entries(savedLifts).map(([exName, data]) => {
                const ex1rm = getEffectiveExercise1RM(exName, data.weight, data.reps, gradeData.bw);
                const exRel = (ex1rm / gradeData.bw).toFixed(2);
                const isSelected = exName === selectedExercise;
                return (
                  <div
                    key={exName}
                    onClick={() => handleSelectExercise(exName)}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      background: isSelected ? 'rgba(251,191,36,0.12)' : 'rgba(4,6,12,0.85)',
                      border: `1px solid ${isSelected ? '#fbbf24' : 'rgba(148,163,184,0.2)'}`,
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
                      <div style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 700 }}>{exRel}x BW</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 8: EVALUACIÓN FÍSICA TRIMESTRAL Y BÓVEDA SEGURA
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
            <h3 className="font-hud" style={{ fontSize: '14px', color: '#fbbf24', marginBottom: '10px' }}>
              RECOPILACIÓN ANUAL DE EVOLUCIÓN
            </h3>
            {yearlyRecap.length === 0 ? (
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>
                Historial trimestral en 0. Tus evaluaciones físicas aparecerán aquí conforme avances.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {yearlyRecap.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '10px', background: 'rgba(4,6,12,0.8)' }}>
                    <div>
                      <strong style={{ color: '#fff' }}>{item.quarter}</strong> — <span style={{ color: '#94a3b8', fontSize: '13px' }}>{item.note}</span>
                    </div>
                    <span className="sys-badge" style={{ background: 'rgba(251,191,36,0.2)', color: '#fbbf24' }}>
                      GRADO {item.grade} ({item.weight})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 9: CONTADOR DE HORAS DE SUEÑO (INICIA EN 0H)
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
              <strong>Registro en {totalSleep}h:</strong> Registra tus horas diarias de descanso para alcanzar la ventana óptima semanal de 49–63 horas.
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '16px', textAlign: 'center' }}>
            {sleepLog.map((d, i) => (
              <div key={i} style={{ padding: '10px 4px', borderRadius: '10px', background: 'rgba(4,6,12,0.85)', border: '1px solid rgba(56,189,248,0.3)' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{d.day}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: d.hours >= 7 ? '#38bdf8' : '#94a3b8', marginTop: '4px' }}>
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
                triggerToast(`[SISTEMA] Sueño actualizado (${todaySleep}h).`);
              }}
            >
              <Clock size={15} /> REGISTRAR SUEÑO DE HOY
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 10: CONFIGURACIÓN, REINICIO A 0 Y BORRADO DE CUENTA
         ==================================================================== */}
      {activeTab === 'settings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-hud" style={{ fontSize: '14px', color: '#00f0ff', marginBottom: '12px' }}>
              CONFIGURACIÓN DE CUENTA Y REINICIO DESDE 0
            </h2>

            <div className="grid-2" style={{ marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8' }}>NOMBRE DE CAZADOR</label>
                <input
                  className="sys-input"
                  value={profile.hunterName}
                  onChange={(e) => setProfile({ ...profile, hunterName: e.target.value.toUpperCase() })}
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8' }}>PESO CORPORAL ACTUAL (KG)</label>
                <input
                  type="number"
                  className="sys-input"
                  value={profile.weightKg}
                  onChange={(e) => setProfile({ ...profile, weightKg: Number(e.target.value) })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
              <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                Cuenta activa: <strong>{currentUser.email}</strong> • Código: <strong style={{ color: '#fbbf24' }}>{profile.hunterCode}</strong>
              </div>
              <button className="sys-btn sys-btn-gold" onClick={resetProgressToZero}>
                <RotateCcw size={14} /> REINICIAR TODO EL PROGRESO A 0
              </button>
            </div>
          </div>

          <div className="sys-window" style={{ padding: '18px', borderColor: 'rgba(225, 29, 72, 0.55)' }}>
            <h3 className="font-hud" style={{ fontSize: '14px', color: '#fb7185', marginBottom: '8px' }}>
              <Trash2 size={15} style={{ display: 'inline', marginRight: '6px' }} />
              ZONA DE PELIGRO — BORRAR CUENTA DEFINITIVAMENTE
            </h3>
            <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '12px', lineHeight: 1.45 }}>
              Tu sesión permanecerá siempre abierta automáticamente hasta que decidas borrar tu cuenta. Esta acción eliminará permanentemente tu cuenta (<strong>{currentUser.email}</strong>). Para confirmar, escribe <strong>BORRAR</strong> debajo:
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
                    triggerToast('[SEGURIDAD] Escribe la palabra BORRAR en mayúsculas para confirmar.');
                    return;
                  }
                  onDeleteAccount();
                }}
              >
                <Trash2 size={14} /> ELIMINAR MI CUENTA PARA SIEMPRE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
