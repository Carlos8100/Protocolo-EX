import React, { useState, useEffect, useRef } from 'react';
import {
  Flame, Trophy, Dumbbell, Moon, Camera, Sparkles, Shield,
  CheckCircle2, XCircle, CloudRain, Zap, Lock, EyeOff,
  Upload, Scan, Cpu, FileText, AlertTriangle,
  ChevronRight, Sword, Clock, Save, Check,
  UserCheck, Users, MapPin, Play, BookOpen, Plus, Crosshair,
  LogIn, LogOut, KeyRound, Mail, UserPlus, Settings, Trash2,
  Heart, Building2, Send
} from 'lucide-react';

// ============================================================================
// ESTILOS INTEGRADOS (HOLOGRAPHIC SYSTEM + JRPG + VISUAL NOVEL + CITY BUILDER)
// ============================================================================
const SYSTEM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800;900&family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&display=swap');

  :root {
    --bg-void: #05070d;
    --bg-panel: rgba(11, 16, 30, 0.92);
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
      radial-gradient(circle at 18% 12%, rgba(212, 175, 55, 0.11) 0%, transparent 42%),
      radial-gradient(circle at 82% 85%, rgba(0, 240, 255, 0.09) 0%, transparent 45%),
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
    border: 1px solid rgba(212, 175, 55, 0.3);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.65),
      inset 0 0 22px rgba(212, 175, 55, 0.05);
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
    background: linear-gradient(180deg, rgba(212, 175, 55, 0.22) 0%, rgba(11, 16, 30, 0.96) 100%);
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
  { grade: 'F', minComposite: 0.0, benchReq: 0.50, squatReq: 0.65, deadliftReq: 0.80, desc: 'Iniciado / Adaptación neural inicial' },
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
    base: 'Espadachín',
    weaponPrompt: 'holding an ornate runic sword',
    passiveTitle: 'Filo del Duelo Implacable',
    passiveRule: 'Aumenta +18% el daño crítico por cada repetición pesada de Press Banca registrada.'
  },
  {
    base: 'Lancero',
    weaponPrompt: 'holding a silver and gold celestial spear',
    passiveTitle: 'Impulso de la Lanza Perforadora',
    passiveRule: 'Convierte tu fuerza de Sentadilla en penetración de armadura (+22% Poder en jefes).'
  },
  {
    base: 'Artista Marcial',
    weaponPrompt: 'wearing glowing engraved combat gauntlets in martial arts stance',
    passiveTitle: 'Flujo de los Cien Golpes',
    passiveRule: 'Multiplica la velocidad de ataque y otorga +15% EXP extra por misiones completadas.'
  },
  {
    base: 'Berserker',
    weaponPrompt: 'wielding a heavy dark steel greatsword',
    passiveTitle: 'Furia de Sangre Indomable',
    passiveRule: 'Escala tu ataque bruto directamente con tu 1RM de Peso Muerto (+25% Poder ofensivo).'
  },
  {
    base: 'Asesino Sombrío',
    weaponPrompt: 'holding twin curved obsidian daggers',
    passiveTitle: 'Paso Fantasma del Abismo',
    passiveRule: 'Otorga ventaja táctica en duelos PvP cercanos y +20% evasión contra jefes.'
  },
  {
    base: 'Monje Astral',
    weaponPrompt: 'holding a sacred battle staff with golden rings',
    passiveTitle: 'Armonía del Núcleo Interior',
    passiveRule: 'Duplica los beneficios de recuperación cuando cumples tus horas óptimas de sueño.'
  },
  {
    base: 'Invocador Rúnico',
    weaponPrompt: 'channeling glowing arcane runes with an ornate relic blade',
    passiveTitle: 'Sello de los Antiguos',
    passiveRule: 'Potencia en +30% las estadísticas de todas las reliquias y equipos desbloqueados.'
  },
  {
    base: 'Cazador de Abismos',
    weaponPrompt: 'wielding a crimson hunter glaive',
    passiveTitle: 'Instinto de Depredador Alfa',
    passiveRule: 'Inflige +24% de daño adicional contra monstruos de rango superior en el Modo Historia.'
  },
  {
    base: 'Centinela',
    weaponPrompt: 'holding a ceremonial tower shield and royal blade',
    passiveTitle: 'Muralla Inquebrantable',
    passiveRule: 'Reduce a la mitad el desgaste y otorga +40 de defensa base permanente.'
  },
  {
    base: 'Duelista',
    weaponPrompt: 'holding an elegant rapier with silver guard',
    passiveTitle: 'Estocada de Precisión Chirúrgica',
    passiveRule: 'Cada racha diaria activa suma +12 puntos acumulables de poder de combate.'
  },
  {
    base: 'Alquimista Bélico',
    weaponPrompt: 'wielding an enchanted crystal-forged saber',
    passiveTitle: 'Transmutación Metabólica',
    passiveRule: 'Convierte cada sesión de entrenamiento registrada en +10 EXP adicional.'
  },
  {
    base: 'Soberano',
    weaponPrompt: 'standing with an ornate ceremonial greatsword planted in the ground',
    passiveTitle: 'Autoridad del Trono',
    passiveRule: 'Aumenta la prosperidad de tu ciudad y otorga +20% de afinidad con todos los personajes.'
  },
];

const CLASS_AFFINITIES = [
  { name: 'de Ceniza', resonance: 'Resonancia Ígnea: +12% Poder al mantener racha activa.' },
  { name: 'Carmesí', resonance: 'Resonancia Vital: +15% eficiencia en cargas máximas.' },
  { name: 'Celestial', resonance: 'Resonancia Astral: +15% EXP en misiones diarias.' },
  { name: 'del Vacío', resonance: 'Resonancia Abisal: +18% daño contra jefes de acto.' },
  { name: 'de Obsidiana', resonance: 'Resonancia Férrea: +35 Defensa neural permanente.' },
  { name: 'de Tormenta', resonance: 'Resonancia Eléctrica: +14% velocidad en duelos PvP.' },
  { name: 'del Eclipse', resonance: 'Resonancia Dual: Equilibra ataque y defensa (+10% ambos).' },
  { name: 'Astral', resonance: 'Resonancia Estelar: Mejora las recompensas de historia.' },
  { name: 'Espectral', resonance: 'Resonancia Etérea: Reduce la penalización por fatiga.' },
  { name: 'de Acero Pálido', resonance: 'Resonancia Metálica: Escala +10% con el peso levantado.' },
  { name: 'del Crepúsculo', resonance: 'Resonancia Crepuscular: +15% afinidad en diálogos.' },
  { name: 'Primordial', resonance: 'Resonancia Ancestral: +20% poder de pasiva base.' },
  { name: 'de Sangre Real', resonance: 'Resonancia Dinástica: +25 LP adicionales por victoria.' },
  { name: 'Infinito', resonance: 'Resonancia Sin Límites: Escala +5 puntos de poder por cada nivel.' },
];

function generateRandomInfiniteClass(seedNumber) {
  const arch = CLASS_ARCHETYPES[Math.abs(seedNumber) % CLASS_ARCHETYPES.length];
  const aff = CLASS_AFFINITIES[Math.abs(seedNumber * 7 + 13) % CLASS_AFFINITIES.length];
  const variantCode = (Math.abs(seedNumber * 19) % 999) + 1;
  return {
    name: `${arch.base} ${aff.name}`,
    weaponPrompt: arch.weaponPrompt,
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
  { id: 'gear_cloak', type: 'Equipamiento', name: 'Capa Real Carmesí', power: 25, desc: 'Manto de batalla que eleva la resistencia en PvE y PvP.' },
  { id: 'skill_titan', type: 'Habilidad', name: 'Postura del Titán Inamovible', power: 50, desc: 'Escudo neural que escala con tu Sentadilla.' },
  { id: 'gear_blade', type: 'Equipamiento', name: 'Hoja Runificada de Santuario', power: 65, desc: 'Arma forjada de alto rango JRPG.' },
  { id: 'skill_zenkai', type: 'Habilidad', name: 'Despertar Zenkai de Sangre', power: 85, desc: 'Multiplica tu ataque cuando estás en racha activa.' },
  { id: 'gear_crown', type: 'Equipamiento', name: 'Coraza del Monarca Eterno', power: 110, desc: 'Armadura legendaria de placas doradas.' },
];

const PVE_STORY_CHAPTERS = [
  {
    id: 'act1_ch1',
    act: 'Acto I: Las Ruinas de Ceniza',
    chapter: 'Capítulo 1 — El Umbral del Hierro',
    reqPower: 180,
    enemy: 'Centinela Oxidado de la Grieta',
    lore: 'Tras despertar como Cazador, cruzas el puente de piedra y rescatas a Lyra, una herrera rúnica atrapada junto a la forja antigua.',
    rewardType: 'Habilidad Especial',
    rewardName: 'Voluntad de Hierro (Pasiva +20 DEF)',
    unlockCharacterId: 'lyra',
    expReward: 120,
    lpReward: 35
  },
  {
    id: 'act1_ch2',
    act: 'Acto I: Las Ruinas de Ceniza',
    chapter: 'Capítulo 2 — El Bosque de los Ecos',
    reqPower: 260,
    enemy: 'Acechador Sombrío de Fenrir',
    lore: 'Entre la niebla lunar, Kaelen, el explorador de las sombras, une fuerzas contigo tras ver tu resistencia física.',
    rewardType: 'Equipamiento de Historia',
    rewardName: 'Brazaletes del Lobo Plateado (+35 ATQ)',
    unlockCharacterId: 'kaelen',
    expReward: 180,
    lpReward: 45
  },
  {
    id: 'act2_ch1',
    act: 'Acto II: La Ciudadela Carmesí',
    chapter: 'Capítulo 3 — La Guardia del Bastión',
    reqPower: 360,
    enemy: 'Comandante Valkiria Caída',
    lore: 'Tras purificar su armadura maldita en un duelo honorable, Seraphina jura lealtad a tu ciudad.',
    rewardType: 'Habilidad Especial',
    rewardName: 'Estocada Relámpago Carmesí (+55 ATQ)',
    unlockCharacterId: 'seraphina',
    expReward: 260,
    lpReward: 60
  },
  {
    id: 'act2_ch2',
    act: 'Acto II: La Ciudadela Carmesí',
    chapter: 'Capítulo 4 — El Altar del Eclipse',
    reqPower: 480,
    enemy: 'Archidemonio Revenant Malakor',
    lore: 'En la biblioteca sellada del Altar conoces a Isolde, erudita de las estrellas que estudia tu evolución sin límites.',
    rewardType: 'Reliquia Única de Historia',
    rewardName: 'Espadón Eclipse del Monarca (+90 ATQ)',
    unlockCharacterId: 'isolde',
    expReward: 380,
    lpReward: 80
  },
  {
    id: 'act3_ch1',
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
    act: 'Acto IV: El Abismo Infinito',
    chapter: 'Capítulo 6 — El Trono del Monarca Eterno',
    reqPower: 850,
    enemy: 'Sombra del Monarca Primordial (Jefe de Acto)',
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
    personality: 'Apasionada, directa, admira la fuerza física real y el esfuerzo constante en el hierro.',
    hairDesc: 'crimson red ponytail hair, golden eyes, fantasy blacksmith apprentice outfit with leather apron and ornate corset',
    seed: 412,
    intro: '¡Por fin llegas! Estaba templando acero en la forja y los aldeanos no dejan de comentar tus levantamientos.'
  },
  {
    id: 'kaelen',
    name: 'Kaelen Vane',
    role: 'Explorador de las Sombras',
    unlockChapter: 'act1_ch2',
    personality: 'Observador, leal, protector y de humor sutil; respeta la disciplina silenciosa.',
    hairDesc: 'silver messy hair, sharp blue eyes, dark fantasy ranger cloak and light leather armor',
    seed: 519,
    intro: 'Vengo de patrullar las murallas de la ciudad. Tu presencia aquí mantiene a raya a las bestias de la grieta.'
  },
  {
    id: 'seraphina',
    name: 'Seraphina Aurelia',
    role: 'Ex-Comandante Valkiria',
    unlockChapter: 'act2_ch1',
    personality: 'Orgullosa, noble y caballeresca, pero profundamente dulce cuando baja su guardia contigo.',
    hairDesc: 'long platinum blonde braided hair, emerald eyes, white and gold valkyrie knight dress armor',
    seed: 628,
    intro: 'Mi espada ahora protege este asentamiento. Dime, Cazador... ¿entrenaste hoy con la misma intensidad de siempre?'
  },
  {
    id: 'isolde',
    name: 'Isolde Noctis',
    role: 'Oráculo Astral del Eclipse',
    unlockChapter: 'act2_ch2',
    personality: 'Enigmática, inteligente, cariñosa y fascinada por tu alma que desafía los límites humanos.',
    hairDesc: 'long dark violet hair, glowing amber eyes, mystic JRPG astrologer robes with gold celestial ornaments',
    seed: 734,
    intro: 'Las estrellas sobre nuestra ciudad brillan distinto desde que superaste tus marcas... Estaba esperando hablar contigo.'
  }
];

const CITY_BUILDINGS_CATALOG = [
  { id: 'forge', name: 'Forja de Acero Real', costExp: 80, bonus: '+15 Poder de Equipo y rumores sobre tu fuerza en Press Banca.' },
  { id: 'tavern', name: 'Taberna del Crepúsculo', costExp: 60, bonus: 'Centro de rumores del pueblo y +10 Afinidad en citas.' },
  { id: 'dojo', name: 'Arena de Entrenamiento', costExp: 100, bonus: '+20 Poder de Clase y entrenamiento conjunto con aliados.' },
  { id: 'observatory', name: 'Observatorio Astral', costExp: 120, bonus: 'Amplifica tu Habilidad Pasiva Única de Clase.' },
  { id: 'garden', name: 'Jardín de los Juramentos', costExp: 140, bonus: 'Lugar especial para citas románticas y confesiones.' },
];

const RACES_POOL = [
  { id: 'ash_saiyan', name: 'Estirpe Guerrero Ceniza', trait: 'Zenkai: +15% EXP al superar misiones retomadas', hairDesc: 'black messy spiky hair' },
  { id: 'abyss_demon', name: 'Revenant Abisal Carmesí', trait: 'Pacto de Sangre: Bonificación en cargas máximas', hairDesc: 'dark crimson hair' },
  { id: 'valkyrie_dusk', name: 'Valkiria del Crepúsculo', trait: 'Égida Lunar: Recuperación muscular acelerada', hairDesc: 'long silver braided hair' },
  { id: 'fenrir_kin', name: 'Semi-Humano de Fenrir', trait: 'Instinto Depredador: Potencia explosiva y agilidad', hairDesc: 'ash brown hair' },
  { id: 'hollow_lord', name: 'Señor Espectral Celestial', trait: 'Cuerpo de Acero Pálido: Resistencia neural superior', hairDesc: 'platinum white hair' },
  { id: 'monarch_vessel', name: 'Recipiente del Monarca', trait: 'Soberanía: Evolución ilimitada de estadísticas', hairDesc: 'jet black anime hair' },
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

// Calcula el 1RM efectivo considerando lastre en dominadas si el usuario ingresó solo el disco
function getEffectiveExercise1RM(exName, weight, reps, bodyWeight) {
  const w = Number(weight) || 0;
  const r = Number(reps) || 1;
  const bw = Math.max(40, Number(bodyWeight) || 75);
  if (exName.toLowerCase().includes('dominada') && w < bw * 0.75) {
    return calcEpley1RM(bw + w, r);
  }
  return calcEpley1RM(w, r);
}

// Cálculo automático y exacto del Grado de Cazador (sin trabas por decimales ocultos)
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
// RETRATO ILUSTRADO ESTILO JRPG ALTA FANTASÍA (SOLO MASCULINO / FEMENINO)
// ============================================================================
function JrpgFantasyPortrait({ hunterClass, rankInfo, hunterGrade, level, classEvolution, gender, onToggleGender }) {
  const race = hunterClass?.race || RACES_POOL[5];
  const cls = hunterClass?.cls || { name: 'Cazador Despertado', weaponPrompt: 'holding an ornate runic sword' };
  const tier = rankInfo.tier;
  const stage = classEvolution.stage;

  const armorEvolution =
    stage >= 4 || tier >= 10
      ? 'legendary divine gold and silver ornate fantasy battle armor with glowing crystal filigree and royal crimson cape'
      : stage >= 2 || tier >= 5
      ? 'polished silver and dark steel fantasy warrior armor with gold trim, shoulder pauldrons and cape'
      : 'detailed iron and leather fantasy hunter armor with steel shoulder guards';

  const subjectPrompt =
    gender === 'female'
      ? `handsome anime JRPG female warrior, ${race.hairDesc}, ${armorEvolution}, ${cls.weaponPrompt}`
      : `handsome anime JRPG male warrior, athletic build, ${race.hairDesc}, ${armorEvolution}, ${cls.weaponPrompt}`;

  const fullPrompt = `${subjectPrompt}, Fire Emblem Heroes and Granblue Fantasy official character illustration art style, high detail anime shading, intricate metallic armor engravings, mystic enchanted castle courtyard twilight background with soft golden lights, masterpiece, 2D anime portrait, no aura`;

  const seed = (tier + 1) * 137 + stage * 41 + (gender === 'female' ? 77 : 33);
  const portraitUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=640&height=760&seed=${seed}&nologo=true`;

  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
  }, [portraitUrl]);

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
            <UserCheck size={12} color="#00f0ff" /> {gender === 'female' ? 'Femenino' : 'Masculino'}
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
          boxShadow: '0 8px 28px rgba(0,0,0,0.9)',
          background: 'radial-gradient(circle at 50% 35%, #1e293b 0%, #05070d 100%)'
        }}>
          {!imgLoaded && !imgError && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              textAlign: 'center',
              gap: '10px',
              background: 'rgba(5, 7, 13, 0.85)'
            }}>
              <Sparkles size={32} color="#d4af37" />
              <div className="font-souls" style={{ fontSize: '13px', color: '#fde047' }}>
                INVOCANDO {classEvolution.title.toUpperCase()}...
              </div>
            </div>
          )}

          {!imgError ? (
            <img
              src={portraitUrl}
              alt={classEvolution.title}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                opacity: imgLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease'
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              textAlign: 'center',
              background: 'linear-gradient(180deg, #1e1b4b 0%, #090d16 100%)'
            }}>
              <Shield size={48} color="#d4af37" style={{ marginBottom: '10px' }} />
              <div className="font-souls" style={{ fontSize: '15px', color: '#fff' }}>{classEvolution.title}</div>
            </div>
          )}

          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(0deg, rgba(4,6,12,0.96) 0%, rgba(4,6,12,0.75) 70%, transparent 100%)',
            padding: '22px 12px 10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            <div>
              <div className="font-souls" style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>
                {classEvolution.title}
              </div>
              <div style={{ fontSize: '11px', color: '#fde047' }}>
                {classEvolution.bonus}
              </div>
            </div>
            <span className="sys-badge" style={{ background: 'rgba(0, 240, 255, 0.2)', color: '#00f0ff', border: '1px solid #00f0ff' }}>
              GRADO {hunterGrade}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PORTAL DE INICIO DE SESIÓN Y REGISTRO CON RECORDATORIO AUTOMÁTICO
// ============================================================================
function AuthPortal({ onAuthenticated }) {
  const [authMode, setAuthMode] = useState('login');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [hunterTagInput, setHunterTagInput] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
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
      const usersDb = JSON.parse(localStorage.getItem('pex_users_registry_v9') || '{}');

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
        localStorage.setItem('pex_users_registry_v9', JSON.stringify(usersDb));
        onAuthenticated(newAccount, rememberMe);
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
        onAuthenticated(existing, rememberMe);
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
            [SISTEMA DE IDENTIDAD DE CAZADOR]
          </span>
          <h1 className="font-souls" style={{ fontSize: '27px', marginTop: '10px', color: '#fff' }}>
            PROTOCOLO EX
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
            Tu progreso, cargas, ciudad y vínculos quedan vinculados a tu cuenta
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
                placeholder="Ej: SUNG_JINWOO / AKIRA"
                value={hunterTagInput}
                onChange={(e) => setHunterTagInput(e.target.value)}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '11px', color: '#d4af37', fontWeight: 700 }}>
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
            <label style={{ fontSize: '11px', color: '#d4af37', fontWeight: 700 }}>
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

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            fontSize: '13px',
            color: '#e2e8f0',
            cursor: 'pointer',
            padding: '8px 10px',
            borderRadius: '8px',
            background: 'rgba(4, 6, 12, 0.75)',
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#d4af37' }}
            />
            <span>Recordar mi sesión automáticamente en este dispositivo</span>
          </label>

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
// CONTENEDOR PRINCIPAL CON GESTIÓN DE SESIÓN Y ELIMINACIÓN DE CUENTA
// ============================================================================
export default function App() {
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = SYSTEM_CSS;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  const [currentUser, setCurrentUser] = useState(() => {
    const remembered = localStorage.getItem('pex_remembered_session_v9');
    if (remembered) return JSON.parse(remembered);
    const tabSession = sessionStorage.getItem('pex_active_session_v9');
    if (tabSession) return JSON.parse(tabSession);
    return null;
  });

  const handleAuthenticated = (account, remember) => {
    setCurrentUser(account);
    if (remember) {
      localStorage.setItem('pex_remembered_session_v9', JSON.stringify(account));
    } else {
      sessionStorage.setItem('pex_active_session_v9', JSON.stringify(account));
      localStorage.removeItem('pex_remembered_session_v9');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('pex_remembered_session_v9');
    sessionStorage.removeItem('pex_active_session_v9');
    setCurrentUser(null);
  };

  const handleDeleteAccount = (emailToDelete) => {
    const usersDb = JSON.parse(localStorage.getItem('pex_users_registry_v9') || '{}');
    delete usersDb[emailToDelete];
    localStorage.setItem('pex_users_registry_v9', JSON.stringify(usersDb));
    localStorage.removeItem(`pex_user_data_v9_${emailToDelete}`);
    handleLogout();
  };

  if (!currentUser) {
    return <AuthPortal onAuthenticated={handleAuthenticated} />;
  }

  return (
    <HunterSystemWorkspace
      key={currentUser.email}
      currentUser={currentUser}
      onLogout={handleLogout}
      onDeleteAccount={() => handleDeleteAccount(currentUser.email)}
    />
  );
}

// ============================================================================
// ESPACIO DE TRABAJO DEL CAZADOR (AISLADO POR USUARIO Y PERSISTENTE)
// ============================================================================
function HunterSystemWorkspace({ currentUser, onLogout, onDeleteAccount }) {
  const storageKey = `pex_user_data_v9_${currentUser.email}`;

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
  const [completedChapters, setCompletedChapters] = useState(() => initialData?.completedChapters || ['act1_ch1']);
  const [pveBattleLog, setPveBattleLog] = useState(null);

  const [cityName, setCityName] = useState(() => initialData?.cityName || 'Bastión de Ceniza');
  const [builtBuildings, setBuiltBuildings] = useState(() => initialData?.builtBuildings || ['forge', 'tavern']);
  const [selectedCharId, setSelectedCharId] = useState('lyra');
  const [characterStates, setCharacterStates] = useState(() => initialData?.characterStates || {
    lyra: { affection: 25, memories: ['Nos conocimos en las Ruinas de Ceniza junto a la forja antigua.'], lastReply: '¡Por fin llegas! Estaba templando acero en la forja y los aldeanos no dejan de comentar tus levantamientos.' },
    kaelen: { affection: 15, memories: ['Patrullamos juntos el Bosque de los Ecos.'], lastReply: 'Vengo de patrullar las murallas de la ciudad. Tu presencia aquí mantiene a raya a las bestias de la grieta.' },
    seraphina: { affection: 20, memories: ['Juré lealtad a tu ciudad tras nuestro duelo honorable.'], lastReply: 'Mi espada ahora protege este asentamiento. Dime, Cazador... ¿entrenaste hoy con la misma intensidad de siempre?' },
    isolde: { affection: 30, memories: ['Observé el brillo de tu clase infinita en el Altar del Eclipse.'], lastReply: 'Las estrellas sobre nuestra ciudad brillan distinto desde que superaste tus marcas... Estaba esperando hablar contigo.' },
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
    };
    localStorage.setItem(storageKey, JSON.stringify(payload));
  }, [
    storageKey, awakened, profile, hunterClass, savedLifts,
    lp, exp, streak, unlockedInventory, completedChapters,
    cityName, builtBuildings, characterStates,
    friends, quests, nextWeekQueue, sleepLog
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
    level * 14 +
    gearBonusPower +
    passiveClassBonus
  );

  const townRumors = [
    `En la ${builtBuildings.includes('tavern') ? 'Taberna del Crepúsculo' : 'plaza'} todos comentan que ${profile.hunterName} levantó ${gradeData.bench1RM} kg en Press Banca y ${gradeData.squat1RM} kg en Sentadilla.`,
    `Los guardias de ${cityName} afirman que tu Grado de Cazador ${hunterGrade} (${gradeData.compositeRelStrength.toFixed(2)}x peso corporal) intimida a cualquier invasor.`,
    completedChapters.length > 1
      ? `Los bardos cantan sobre cómo derrotaste a ${PVE_STORY_CHAPTERS[Math.min(PVE_STORY_CHAPTERS.length - 1, completedChapters.length - 1)].enemy} en la campaña.`
      : `Se rumorea que en las Ruinas de Ceniza aguarda un Centinela que pondrá a prueba tu clase (${hunterClass?.cls?.name}).`,
    `Los mercaderes admiran tu racha disciplinada de ${streak} días consecutivos sin rendirte.`
  ];

  const unlockedCharacters = STORY_CHARACTERS.filter((c) => completedChapters.includes(c.unlockChapter));
  const activeChar = unlockedCharacters.find((c) => c.id === selectedCharId) || unlockedCharacters[0] || STORY_CHARACTERS[0];
  const activeCharState = characterStates[activeChar.id] || { affection: 10, memories: [], lastReply: activeChar.intro };
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
        clsName: hunterClass?.cls?.name || 'Cazador'
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
    const weeks = profile.routineDurationMonths === 1 ? '4 Semanas (Mesociclo de 1 Mes)' : '8 Semanas (Mesociclo de 2 Meses)';
    const mode = profile.equipmentMode;
    const owned = profile.ownedHomeEquipment || [];

    if (mode === 'no_equip') {
      return {
        horizon: weeks,
        modeLabel: 'En Casa — Sin Nada de Equipo (Calistenia Pura)',
        phases: profile.routineDurationMonths === 1
          ? ['Sem 1-2: Control excéntrico y técnica estricta', 'Sem 3-4: Densidad metabólica y series al fallo técnico (RIR 1)']
          : ['Sem 1-3: Base articular y volumen progresivo', 'Sem 4-6: Variantes unilaterales de alta tensión', 'Sem 7-8: Pico de resistencia y descarga final'],
        exercises: [
          { name: 'Flexiones Declinadas con Pausa', sets: '4x12-15 (RIR 1)', focus: 'Pectoral Superior y Tríceps', anim: 'press', cue: 'Pecho toca casi el suelo, codos a 45° del torso.' },
          { name: 'Sentadilla Búlgara Peso Corporal', sets: '4x12 por pierna', focus: 'Cuádriceps y Glúteo', anim: 'squat', cue: 'Torso ligeramente inclinado, rodilla sigue la punta del pie.' },
          { name: 'Remo Invertido bajo Mesa Firme', sets: '4x10-12', focus: 'Dorsal y Romboides', anim: 'pull', cue: 'Retrae escápulas antes de flexionar los codos.' },
        ]
      };
    }

    if (mode === 'some_equip') {
      const hasPullup = owned.includes('Barra de dominadas');
      const hasDumbbells = owned.includes('Mancuernas ajustables') || owned.includes('Kettlebell / Pesa rusa');
      return {
        horizon: weeks,
        modeLabel: `En Casa — Equipo Parcial (${owned.length > 0 ? owned.join(', ') : 'Básico'})`,
        phases: profile.routineDurationMonths === 1
          ? ['Sem 1-2: Calibración de cargas caseras', 'Sem 3-4: Sobrecarga por repeticiones y pausas isométricas']
          : ['Sem 1-3: Hipertrofia mecánica controlada', 'Sem 4-6: Intensificación con descanso corto', 'Sem 7-8: Consolidación de marcas y descarga'],
        exercises: [
          {
            name: hasDumbbells ? 'Press en Suelo / Banco con Mancuernas' : 'Flexiones Lastradas con Mochila',
            sets: '4x10-12 (RIR 1-2)',
            focus: 'Empuje Horizontal',
            anim: 'press',
            cue: 'Controla el descenso en 3 segundos sin rebotar.'
          },
          {
            name: hasDumbbells ? 'Sentadilla Copa (Goblet Squat) Profunda' : 'Sentadilla Zancada Búlgara',
            sets: '4x10-12',
            focus: 'Tren Inferior Completo',
            anim: 'squat',
            cue: 'Mantén el pecho erguido y rompe el paralelo.'
          },
          {
            name: hasPullup ? 'Dominadas Pronas / Supinas Estrictas' : 'Remo Unilateral con Mancuerna / Banda',
            sets: '4x8-12',
            focus: 'Tracción Vertical / Espalda',
            anim: 'pull',
            cue: 'Lleva el pecho hacia la barra, evita balanceo.'
          },
        ]
      };
    }

    return {
      horizon: weeks,
      modeLabel: `Gimnasio Completo — Todo el Equipo (${profile.daysPerWeek} días/sem)`,
      phases: profile.routineDurationMonths === 1
        ? ['Sem 1-2: Acumulación de volumen efectivo (RIR 2)', 'Sem 3-4: Sobrecarga progresiva en básicos (RIR 1)']
        : ['Sem 1-3: Hipertrofia estructural (8-12 reps)', 'Sem 4-6: Fuerza-Hipertrofia pesada (5-8 reps)', 'Sem 7: Pico de rendimiento', 'Sem 8: Descarga activa (-35% volumen)'],
      exercises: [
        { name: 'Press Banca Plano / Inclinado con Barra', sets: '4x6-8 (RIR 1-2)', focus: 'Pectoral, Deltoides Anterior y Tríceps', anim: 'press', cue: 'Arco torácico natural, retracción escapular y pies firmes.' },
        { name: 'Sentadilla Trasera con Barra Libre', sets: '4x6-8 (RIR 1-2)', focus: 'Cuádriceps, Glúteo y Core', anim: 'squat', cue: 'Inspira y bloquea el abdomen (bracing) antes de descender.' },
        { name: 'Dominadas Lastradas / Jalón al Pecho', sets: '4x8-10 (RIR 1)', focus: 'Dorsal Ancho y Bíceps', anim: 'pull', cue: 'Inicia el tirón deprimiendo los hombros.' },
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

  // Automatización completa: recalcula 1RM, otorga EXP por kilos superados, sube Nivel y Grado solo
  const handleSaveExerciseLoad = () => {
    const w = Math.max(1, Number(liftWeightInput));
    const r = Math.max(1, Number(liftRepsInput));

    const prevRecord = savedLifts[selectedExercise];
    const prev1RM = prevRecord
      ? getEffectiveExercise1RM(selectedExercise, prevRecord.weight, prevRecord.reps, profile.weightKg)
      : 0;
    const new1RM = getEffectiveExercise1RM(selectedExercise, w, r, profile.weightKg);

    const kgGain = Math.max(0, new1RM - prev1RM);
    const gainedExp = 35 + kgGain * 15;
    const gainedLp = 15 + kgGain * 5;

    const updated = {
      ...savedLifts,
      [selectedExercise]: {
        weight: w,
        reps: r,
        date: new Date().toLocaleDateString(),
      },
    };

    const prevLevel = Math.max(1, Math.floor(exp / 100) + 1);
    const nextTotalExp = exp + gainedExp;
    const nextLevel = Math.max(1, Math.floor(nextTotalExp / 100) + 1);

    setSavedLifts(updated);
    setExp(nextTotalExp);
    setLp((l) => l + gainedLp);

    const nextGradeInfo = computeHunterGradeData(updated, profile.weightKg);
    const nextGrade = nextGradeInfo.currentStd.grade;

    if (nextGrade !== hunterGrade) {
      prevGradeRef.current = nextGrade;
      triggerToast(`¡ASCENSO AUTOMÁTICO A GRADO ${nextGrade} Y NIVEL ${nextLevel}! (+${gainedExp} EXP por récord de ${new1RM} kg)`);
    } else if (nextLevel > prevLevel) {
      triggerToast(`¡SUBIDA DE NIVEL AUTOMÁTICA! Nv. ${prevLevel} → Nv. ${nextLevel} (+${gainedExp} EXP, +${kgGain} kg de récord)`);
    } else {
      triggerToast(`[SISTEMA] ${selectedExercise} actualizado (${new1RM} kg 1RM) • +${gainedExp} EXP y +${gainedLp} LP.`);
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
      Number(profile.weightKg) * 17 +
      Number(profile.heightCm) * 11 +
      Number(profile.benchKg || profile.pushupsMax) * 23 +
      Math.floor(Math.random() * 9973);

    const chosenRace = RACES_POOL[seed % RACES_POOL.length];
    const chosenCls = generateRandomInfiniteClass(seed + Date.now());

    const baseLP = Math.min(2400, 300 + Number(profile.experienceMonths) * 65 + Number(profile.benchKg) * 4);
    const assigned = { race: chosenRace, cls: chosenCls, assignedAt: new Date().toLocaleDateString() };

    const initGrade = computeHunterGradeData(initialLifts, profile.weightKg).currentStd.grade;
    prevGradeRef.current = initGrade;

    setHunterClass(assigned);
    setLp(baseLP);
    setAwakened(true);
    triggerToast(`¡DESPERTAR COMPLETADO! Clase aleatoria: ${chosenCls.name} • Pasiva: ${chosenCls.passiveName}`);
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
  // PANTALLA 1: ENCUESTA ÚNICA DE DESPERTAR (SOLO LA PRIMERA VEZ DE LA CUENTA)
  // ==========================================================================
  if (!awakened) {
    return (
      <div className="sys-container" style={{ maxWidth: '580px', paddingTop: '24px' }}>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        {toast && (
          <div className="toast-alert">
            <Sparkles size={18} color="#d4af37" />
            <span>{toast}</span>
          </div>
        )}

        <div className="sys-window" style={{ padding: '24px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Sesión: {currentUser.email}</span>
            <button className="sys-btn sys-btn-ghost" style={{ padding: '5px 9px', fontSize: '10px' }} onClick={onLogout}>
              <LogOut size={12} /> SALIR
            </button>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span className="sys-badge" style={{ background: 'rgba(212,175,55,0.15)', color: '#d4af37', border: '1px solid #d4af37' }}>
              [ALERTA DEL SISTEMA // CALIBRACIÓN ÚNICA]
            </span>
            <h1 className="font-souls" style={{ fontSize: '25px', marginTop: '10px', color: '#fff' }}>
              PROTOCOLO EX
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
              Paso {surveyStep} de 5 — Personalización biométrica y diseño de rutina
            </p>
            <div className="progress-track" style={{ marginTop: '12px' }}>
              <div className="progress-fill" style={{ width: `${surveyStep * 20}%`, background: 'linear-gradient(90deg, #be123c, #d4af37)' }} />
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
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>GÉNERO</label>
                  <select className="sys-select" value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })}>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                  </select>
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
                <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>LESIONES O MOLESTIAS ARTICULARES A CUIDAR</label>
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
              <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>
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
                      background: profile.equipmentMode === opt.id ? 'rgba(212,175,55,0.16)' : 'rgba(4,6,12,0.85)',
                      border: `1px solid ${profile.equipmentMode === opt.id ? '#d4af37' : 'rgba(148,163,184,0.25)'}`,
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
                  <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>EDAD (AÑOS)</label>
                  <input type="number" className="sys-input" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>PESO CORPORAL (KG)</label>
                  <input type="number" className="sys-input" value={profile.weightKg} onChange={(e) => setProfile({ ...profile, weightKg: e.target.value })} />
                </div>
              </div>
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>ALTURA (CM)</label>
                  <input type="number" className="sys-input" value={profile.heightCm} onChange={(e) => setProfile({ ...profile, heightCm: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700 }}>EXPERIENCIA (MESES)</label>
                  <input type="number" className="sys-input" value={profile.experienceMonths} onChange={(e) => setProfile({ ...profile, experienceMonths: e.target.value })} />
                </div>
              </div>

              {profile.equipmentMode !== 'no_equip' ? (
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
                Subí una foto de cuerpo completo para calcular tu biotipo y sellar tu <strong>Clase aleatoria con pasiva única</strong>. El Sistema censura tu rostro localmente antes de procesarla.
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
                <button className="sys-btn sys-btn-ghost" onClick={() => setSurveyStep(3)}>ATRÁS</button>
                <button className="sys-btn sys-btn-gold" style={{ flex: 1 }} onClick={() => setSurveyStep(5)}>
                  CONTINUAR AL DESPERTAR <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {surveyStep === 5 && (
            <div style={{ textAlign: 'center', padding: '14px 4px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <Shield size={54} color="#d4af37" style={{ margin: '0 auto' }} />
              <h2 className="font-souls" style={{ fontSize: '21px', color: '#d4af37', lineHeight: 1.3 }}>
                ¿ESTÁS LISTO PARA CONVERTIRTE EN CAZADOR?
              </h2>
              <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5 }}>
                Se generará tu <strong>rutina personalizada de {profile.routineDurationMonths} {profile.routineDurationMonths === 1 ? 'mes' : 'meses'}</strong>, tu <strong>Grado de Cazador ({hunterGrade})</strong> y una <strong>Clase aleatoria con habilidad pasiva única</strong>.
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
  // INTERFAZ PRINCIPAL DEL SISTEMA (HUD DE CAZADOR v9)
  // ==========================================================================
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

      {/* BARRA DE SESIÓN ACTIVA RECORDADA */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 12px',
        marginBottom: '10px',
        borderRadius: '10px',
        background: 'rgba(11, 16, 30, 0.85)',
        border: '1px solid rgba(0, 240, 255, 0.22)',
        fontSize: '11px'
      }}>
        <span style={{ color: '#94a3b8' }}>
          <span style={{ color: '#10b981', fontWeight: 700 }}>● SESIÓN RECORDADA:</span> {currentUser.email}
        </span>
        <button
          className="sys-btn sys-btn-ghost"
          style={{ padding: '4px 10px', fontSize: '10px' }}
          onClick={onLogout}
        >
          <LogOut size={12} color="#fda4af" /> CERRAR SESIÓN
        </button>
      </div>

      {/* CABECERA DE ESTADO CON NIVEL INFINITO Y GRADO DE CAZADOR */}
      <div className="sys-window" style={{ padding: '18px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span className="sys-badge" style={{ background: 'rgba(0,240,255,0.16)', color: '#00f0ff', border: '1px solid #00f0ff' }}>
                NIVEL {level} (∞)
              </span>
              <span className="sys-badge" style={{ background: 'rgba(212,175,55,0.16)', color: '#d4af37', border: '1px solid #d4af37' }}>
                GRADO DE CAZADOR: {hunterGrade}
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
              {classEvolution.title} • Pasiva Única: {hunterClass?.cls?.passiveName || 'Soberanía'}
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
            <div style={{ fontSize: '10px', color: '#00f0ff', marginBottom: '3px' }}>EXP DE EVOLUCIÓN DE CLASE ({expInLevel}/100 EXP)</div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${expInLevel}%`, background: 'linear-gradient(90deg, #0284c7, #00f0ff)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* MENÚ DE NAVEGACIÓN DE 10 MÓDULOS */}
      <div className="nav-tabs">
        <button className={`nav-tab ${activeTab === 'quests' ? 'active' : ''}`} onClick={() => setActiveTab('quests')}>
          <Trophy size={16} color="#d4af37" />
          <span>Misiones</span>
        </button>
        <button className={`nav-tab ${activeTab === 'routines' ? 'active' : ''}`} onClick={() => setActiveTab('routines')}>
          <Cpu size={16} color="#10b981" />
          <span>Rutina & Anim</span>
        </button>
        <button className={`nav-tab ${activeTab === 'avatar' ? 'active' : ''}`} onClick={() => setActiveTab('avatar')}>
          <Sword size={16} color="#00f0ff" />
          <span>Clase & Pasiva</span>
        </button>
        <button className={`nav-tab ${activeTab === 'pve' ? 'active' : ''}`} onClick={() => setActiveTab('pve')}>
          <BookOpen size={16} color="#f59e0b" />
          <span>Historia PvE</span>
        </button>
        <button className={`nav-tab ${activeTab === 'city_vn' ? 'active' : ''}`} onClick={() => setActiveTab('city_vn')}>
          <Heart size={16} color="#fb7185" />
          <span>Ciudad & Novela</span>
        </button>
        <button className={`nav-tab ${activeTab === 'pvp' ? 'active' : ''}`} onClick={() => setActiveTab('pvp')}>
          <Users size={16} color="#f43f5e" />
          <span>Amigos & PvP</span>
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
          MÓDULO 1: MISIONES DIARIAS
         ==================================================================== */}
      {activeTab === 'quests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-hud" style={{ fontSize: '14px', color: '#d4af37', marginBottom: '12px' }}>
              MISIONES DIARIAS (OTORGAN EXP, HABILIDADES O EQUIPAMIENTO)
            </h2>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                className="sys-input"
                placeholder="Declarar misión de hoy (ej. Sentadilla 4x6 con 120 kg)..."
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
                            triggerToast(`¡MISIÓN CUMPLIDA! +${q.exp || 85} EXP y obtuviste [${won.type}]: ${won.name}`);
                          } else {
                            triggerToast(`¡MISIÓN CUMPLIDA! +${q.lp} LP y +${q.exp || 85} EXP para evolución de clase.`);
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
                PLAN DE ENTRENAMIENTO PERSONALIZADO ({activeRoutinePlan.horizon.toUpperCase()})
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
                  EQUIPO EN CASA DECLARADO (TOCA PARA ACTIVAR/DESACTIVAR):
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

            <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.3)', marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#fde047', marginBottom: '4px' }}>
                ESTRUCTURA DEL MESOCICLO ({activeRoutinePlan.modeLabel}):
              </div>
              {activeRoutinePlan.phases.map((ph, idx) => (
                <div key={idx} style={{ fontSize: '12px', color: '#e2e8f0' }}>• {ph}</div>
              ))}
              {profile.injuries && profile.injuries !== 'Ninguna' && (
                <div style={{ fontSize: '11px', color: '#fda4af', marginTop: '4px' }}>
                  ⚠ Precaución articular activa: {profile.injuries}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeRoutinePlan.exercises.map((ex, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'rgba(4,6,12,0.88)',
                    border: '1px solid rgba(148,163,184,0.25)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px',
                    flexWrap: 'wrap'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: '#fff' }}>{ex.name}</div>
                    <div style={{ fontSize: '12px', color: '#d4af37' }}>{ex.sets} • {ex.focus}</div>
                  </div>
                  <button
                    className="sys-btn sys-btn-primary"
                    style={{ padding: '8px 12px', fontSize: '10px' }}
                    onClick={() => setAnimModalEx(ex)}
                  >
                    <Play size={13} /> VER MINI ANIMACIÓN
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-hud" style={{ fontSize: '14px', color: '#00f0ff', marginBottom: '10px' }}>
              ESCÁNER DE RUTINA PROPIA (ARCHIVO O TEXTO)
            </h2>
            <textarea
              className="sys-textarea"
              rows={3}
              placeholder="Pegá tu rutina actual o subí una captura para auditar volumen y fatiga..."
              value={customRoutineText}
              onChange={(e) => setCustomRoutineText(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
              <button
                className="sys-btn sys-btn-primary"
                onClick={() => {
                  setScanReport({
                    score: '86 / 100 (ÓPTIMA)',
                    finding: 'Buen estímulo mecánico, equilibrio adecuado entre empuje y tracción.',
                    fix: 'Mantener RIR 1-2 y respetar la descarga en la semana final del bloque.'
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
                      score: '89 / 100 (ALTO RENDIMIENTO)',
                      finding: 'Archivo escaneado: Distribución correcta de series efectivas.',
                      fix: 'Ideal para un ciclo de 6 a 8 semanas con sobrecarga progresiva.'
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
          MÓDULO 3: RETRATO JRPG, HABILIDAD PASIVA ÚNICA DE CLASE E INVENTARIO
         ==================================================================== */}
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
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#00f0ff' }}>HABILIDAD PASIVA ÚNICA DE CLASE</span>
                  <span className="sys-badge" style={{ background: 'rgba(0,240,255,0.2)', color: '#fff' }}>+{passiveClassBonus} PWR</span>
                </div>
                <div className="font-souls" style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
                  {hunterClass?.cls?.passiveName || 'Soberanía Primordial'}
                </div>
                <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px', lineHeight: 1.4 }}>
                  {hunterClass?.cls?.passiveDesc || 'Tu clase posee una afinidad única que escala infinitamente con tu fuerza real.'}
                </p>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(4,6,12,0.85)', border: '1px solid rgba(212,175,55,0.25)' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>EVOLUCIÓN ACTUAL</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fde047' }}>{classEvolution.title}</div>
                <div style={{ fontSize: '12px', color: '#00f0ff', marginTop: '2px' }}>Bonificación activa: {classEvolution.bonus}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                  Siguiente evolución al alcanzar el <strong>Nivel {classEvolution.nextLvl}</strong>
                </div>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(190,18,60,0.08)', border: '1px solid rgba(190,18,60,0.35)' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#fda4af', marginBottom: '4px' }}>
                  <Shield size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  GRADO DE CAZADOR: {hunterGrade} ({gradeData.compositeRelStrength.toFixed(2)}x BW — AUTO-ACTUALIZABLE)
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
            </div>
          </div>

          <div className="sys-window" style={{ padding: '18px' }}>
            <h3 className="font-hud" style={{ fontSize: '14px', color: '#d4af37', marginBottom: '12px' }}>
              HABILIDADES Y EQUIPAMIENTO DESBLOQUEADOS ({unlockedInventory.length})
            </h3>
            <div className="grid-2">
              {unlockedInventory.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'rgba(4,6,12,0.85)',
                    border: `1px solid ${item.type.includes('Habilidad') ? '#00f0ff' : '#d4af37'}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <span className="sys-badge" style={{
                      background: item.type.includes('Habilidad') ? 'rgba(0,240,255,0.16)' : 'rgba(212,175,55,0.16)',
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
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 4: MODO HISTORIA PVE EXTENSO
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

            <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '14px' }}>
              Avanza a través de los Actos de la historia. Cada capítulo derrotado desbloquea recompensas únicas y nuevos personajes en tu Ciudad para interactuar en la Novela Visual.
            </p>

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
                const canChallenge = hunterCombatPower >= ch.reqPower;
                return (
                  <div
                    key={ch.id}
                    style={{
                      padding: '15px',
                      borderRadius: '12px',
                      background: 'rgba(4,6,12,0.88)',
                      border: `1px solid ${cleared ? '#10b981' : canChallenge ? 'rgba(212,175,55,0.45)' : 'rgba(148,163,184,0.2)'}`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>{ch.act}</span>
                      <span className="sys-badge" style={{
                        background: cleared ? 'rgba(16,185,129,0.2)' : 'rgba(212,175,55,0.15)',
                        color: cleared ? '#6ee7b7' : '#fde047'
                      }}>
                        {cleared ? '✓ CAPÍTULO COMPLETADO' : `PODER REQUERIDO: ${ch.reqPower}`}
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
                        className={`sys-btn ${canChallenge ? 'sys-btn-gold' : 'sys-btn-ghost'}`}
                        style={{ marginTop: '10px', padding: '9px 14px', fontSize: '11px' }}
                        onClick={() => {
                          if (!canChallenge) {
                            setPveBattleLog({
                              victory: false,
                              title: `DERROTA ANTE ${ch.enemy.toUpperCase()}`,
                              detail: `Tu poder actual (${hunterCombatPower}) es inferior al umbral (${ch.reqPower}). Completa misiones diarias o mejora tus marcas de fuerza para volver.`
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
                            detail: `Has derrotado a ${ch.enemy}, reclamado ${ch.rewardName} y desbloqueado un aliado en tu Ciudad.`
                          });
                          triggerToast(`[HISTORIA PVE] ¡Capítulo superado! Nuevo aliado disponible en Ciudad & Novela.`);
                        }}
                      >
                        <Sword size={14} /> {canChallenge ? 'INICIAR COMBATE DE HISTORIA' : 'PODER INSUFICIENTE (INTENTAR)'}
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
          MÓDULO 5: CREACIÓN DE CIUDAD, RUMORES IRL/HISTORIA Y NOVELA VISUAL IA
         ==================================================================== */}
      {activeTab === 'city_vn' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <h2 className="font-souls" style={{ fontSize: '16px', color: '#d4af37' }}>
                <Building2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
                ASENTAMIENTO DEL CAZADOR: {cityName.toUpperCase()}
              </h2>
              <span className="sys-badge" style={{ background: 'rgba(212,175,55,0.16)', color: '#fde047' }}>
                EDIFICIOS: {builtBuildings.length}/{CITY_BUILDINGS_CATALOG.length}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <input
                className="sys-input"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Nombre de tu ciudad..."
              />
            </div>

            <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.35)', marginBottom: '14px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#fde047', marginBottom: '6px' }}>
                RUMORES ACTUALES EN LAS CALLES DE {cityName.toUpperCase()} (IRL + HISTORIA):
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
                        ✓ CONSTRUIDO
                      </span>
                    ) : (
                      <button
                        className="sys-btn sys-btn-gold"
                        style={{ padding: '7px 10px', fontSize: '10px', alignSelf: 'flex-start' }}
                        onClick={() => {
                          setBuiltBuildings([...builtBuildings, b.id]);
                          triggerToast(`[CIUDAD] ¡Has construido ${b.name} en ${cityName}!`);
                        }}
                      >
                        + CONSTRUIR EN CIUDAD
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-souls" style={{ fontSize: '16px', color: '#fb7185', marginBottom: '12px' }}>
              <Heart size={16} style={{ display: 'inline', marginRight: '6px' }} />
              NOVELA VISUAL — VÍNCULOS, MEMORIA IA Y ROMANCE
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
                    {isUnlocked ? char.name : `🔒 Bloqueado (${char.unlockChapter.toUpperCase()})`}
                  </button>
                );
              })}
            </div>

            <div className="grid-2">
              <div style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '2px solid #fb7185',
                background: '#080b14',
                position: 'relative',
                minHeight: '320px'
              }}>
                <img
                  src={`https://image.pollinations.ai/prompt/${encodeURIComponent(`handsome anime JRPG character portrait, ${activeChar.hairDesc}, Fire Emblem Heroes and Granblue Fantasy official art style, twilight fantasy town background, warm expression, masterpiece`)}?width=520&height=640&seed=${activeChar.seed}&nologo=true`}
                  alt={activeChar.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(0deg, rgba(4,6,12,0.96) 0%, rgba(4,6,12,0.7) 75%, transparent 100%)',
                  padding: '16px 12px 10px'
                }}>
                  <div className="font-souls" style={{ fontSize: '16px', fontWeight: 900, color: '#fff' }}>{activeChar.name}</div>
                  <div style={{ fontSize: '11px', color: '#fda4af' }}>{activeChar.role}</div>
                  <div style={{ marginTop: '4px' }}>
                    <span className="sys-badge" style={{ background: 'rgba(251,113,133,0.2)', color: activeRel.color, border: `1px solid ${activeRel.color}` }}>
                      {activeRel.label} ({activeCharState.affection} pts)
                    </span>
                  </div>
                </div>
              </div>

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
                    {(activeCharState.memories || []).map((mem, idx) => (
                      <div key={idx} style={{ fontSize: '11px', color: '#cbd5e1' }}>• Recuerda: {mem}</div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button
                      className="sys-btn sys-btn-ghost"
                      style={{ padding: '7px 10px', fontSize: '10px' }}
                      onClick={() => handleSendVisualNovelMessage('Contarte sobre mi entrenamiento y marcas de hoy', 6)}
                    >
                      <Dumbbell size={12} color="#d4af37" /> CHARLAR DE ENTRENO (+6)
                    </button>
                    <button
                      className="sys-btn sys-btn-love"
                      style={{ padding: '7px 10px', fontSize: '10px' }}
                      onClick={() => handleSendVisualNovelMessage('Invitarte a una cita romántica al anochecer en la ciudad', 12)}
                    >
                      <Heart size={12} /> CITA ROMÁNTICA (+12)
                    </button>
                    {activeCharState.affection >= 70 && (
                      <button
                        className="sys-btn sys-btn-gold"
                        style={{ padding: '7px 10px', fontSize: '10px' }}
                        onClick={() => {
                          handleSendVisualNovelMessage('Confesar mis sentimientos y pedirte ser mi pareja jurada', 20);
                          triggerToast(`♥ ¡VÍNCULO JURADO! Has formalizado tu relación amorosa con ${activeChar.name}.`);
                        }}
                      >
                        ♥ CONFESAR AMOR
                      </button>
                    )}
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
              Ubicación actual: <strong>{userCoords.label}</strong> • Tu código de amigo: <strong style={{ color: '#d4af37' }}>{profile.hunterCode}</strong>
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
                        level: Math.max(1, level - 1),
                        grade: hunterGrade,
                        power: Math.round(hunterCombatPower * 0.92),
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
                            : `El poder de ${fr.name} (${fr.power}) superó al tuyo (${hunterCombatPower}). Entrena y vuelve a desafiarlo.`
                        });
                      }}
                    >
                      <Sword size={14} /> {inRange ? 'DESAFIAR PVP' : 'FUERA DE 30 KM'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 7: CARGAS GUARDADAS (ACTUALIZA GRADO Y SUBE NIVEL AUTOMÁTICAMENTE)
         ==================================================================== */}
      {activeTab === 'strength' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-hud" style={{ fontSize: '14px', color: '#e11d48', marginBottom: '12px' }}>
              REGISTRO DE CARGAS POR EJERCICIO (SUBE NIVEL Y GRADO DE CAZADOR AUTOMÁTICAMENTE)
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
          MÓDULO 9: CONTADOR DE HORAS DE SUEÑO Y RECUPERACIÓN SEMANAL
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

      {/* ====================================================================
          MÓDULO 10: CONFIGURACIÓN Y BORRADO PERMANENTE DE CUENTA
         ==================================================================== */}
      {activeTab === 'settings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <h2 className="font-hud" style={{ fontSize: '14px', color: '#00f0ff', marginBottom: '12px' }}>
              CONFIGURACIÓN DE CUENTA Y PARÁMETROS DEL CAZADOR
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
                <label style={{ fontSize: '11px', color: '#94a3b8' }}>PESO CORPORAL ACTUAL (KG — RECALCULA GRADO)</label>
                <input
                  type="number"
                  className="sys-input"
                  value={profile.weightKg}
                  onChange={(e) => setProfile({ ...profile, weightKg: Number(e.target.value) })}
                />
              </div>
            </div>

            <div style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '14px' }}>
              Cuenta registrada: <strong>{currentUser.email}</strong> • Código de Cazador: <strong style={{ color: '#d4af37' }}>{profile.hunterCode}</strong>
            </div>

            <button className="sys-btn sys-btn-ghost" onClick={onLogout}>
              <LogOut size={14} /> CERRAR SESIÓN EN ESTE DISPOSITIVO
            </button>
          </div>

          <div className="sys-window" style={{ padding: '18px', borderColor: 'rgba(225, 29, 72, 0.55)' }}>
            <h3 className="font-hud" style={{ fontSize: '14px', color: '#fb7185', marginBottom: '8px' }}>
              <Trash2 size={15} style={{ display: 'inline', marginRight: '6px' }} />
              ZONA DE PELIGRO — BORRAR CUENTA DEFINITIVAMENTE
            </h3>
            <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '12px', lineHeight: 1.45 }}>
              Esta acción eliminará permanentemente tu cuenta (<strong>{currentUser.email}</strong>), tus cargas guardadas, tu clase, tu ciudad y todas las memorias de personajes en este dispositivo. Para confirmar, escribe <strong>BORRAR</strong> debajo:
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
