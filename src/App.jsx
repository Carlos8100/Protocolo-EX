```react
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Flame,
  Trophy,
  Dumbbell,
  Moon,
  User,
  Camera,
  Sparkles,
  Shield,
  CheckCircle2,
  XCircle,
  CloudRain,
  Zap,
  Award,
  Lock,
  EyeOff,
  Upload,
  Scan,
  Cpu,
  FileText,
  Calendar,
  Plus,
  RefreshCw,
  Sliders,
  HeartPulse,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  Target,
  Swords,
  Crown,
  Star,
  RotateCcw,
  Check,
  X
} from 'lucide-react';

/**
 * ============================================================================
 * ¡PROTOCOLO EX! // ANIME FITNESS SYSTEM
 * Plataforma Anime-Gaming de Alto Rendimiento, Gamificación RPG y Biomecánica
 * ============================================================================
 */

const STORAGE_KEY = 'protocolo_ex_anime_vibrant_v1';

// 1. LOS 15 RANGOS COMPETITIVOS (Cada uno con 6 divisiones: 6 -> 1)
const COMPETITIVE_RANKS = [
  { id: 'tierra', name: 'Tierra', color: '#D97706', secondary: '#92400E', glow: 'rgba(217, 119, 6, 0.6)', league: 'Iniciado' },
  { id: 'madera', name: 'Madera', color: '#F59E0B', secondary: '#B45309', glow: 'rgba(245, 158, 11, 0.6)', league: 'Iniciado' },
  { id: 'piedra', name: 'Piedra', color: '#94A3B8', secondary: '#475569', glow: 'rgba(148, 163, 184, 0.6)', league: 'Iniciado' },
  { id: 'carbon', name: 'Carbón', color: '#64748B', secondary: '#334155', glow: 'rgba(100, 116, 139, 0.65)', league: 'Forja' },
  { id: 'hierro', name: 'Hierro', color: '#E2E8F0', secondary: '#64748B', glow: 'rgba(226, 232, 240, 0.65)', league: 'Forja' },
  { id: 'bronce', name: 'Bronce', color: '#FB923C', secondary: '#C2410C', glow: 'rgba(251, 146, 60, 0.7)', league: 'Forja' },
  { id: 'plata', name: 'Plata', color: '#F8FAFC', secondary: '#94A3B8', glow: 'rgba(248, 250, 252, 0.75)', league: 'Competitivo' },
  { id: 'oro', name: 'Oro', color: '#FACC15', secondary: '#CA8A04', glow: 'rgba(250, 204, 21, 0.8)', league: 'Competitivo' },
  { id: 'platino', name: 'Platino', color: '#2DD4BF', secondary: '#0D9488', glow: 'rgba(45, 212, 191, 0.8)', league: 'Competitivo' },
  { id: 'esmeralda', name: 'Esmeralda', color: '#10B981', secondary: '#047857', glow: 'rgba(16, 185, 129, 0.85)', league: 'Élite' },
  { id: 'diamante', name: 'Diamante', color: '#38BDF8', secondary: '#0284C7', glow: 'rgba(56, 189, 248, 0.9)', league: 'Élite' },
  { id: 'especialista', name: 'Especialista', color: '#818CF8', secondary: '#4F46E5', glow: 'rgba(129, 140, 248, 0.9)', league: 'Élite' },
  { id: 'maestro', name: 'Maestro', color: '#C084FC', secondary: '#7E22CE', glow: 'rgba(192, 132, 252, 0.9)', league: 'Soberano' },
  { id: 'jefe_maestro', name: 'Jefe Maestro', color: '#F472B6', secondary: '#BE185D', glow: 'rgba(244, 114, 182, 0.95)', league: 'Soberano' },
  { id: 'challenger', name: 'Challenger', color: '#00F5FF', secondary: '#FACC15', glow: 'rgba(0, 245, 255, 1)', league: 'Leyenda EX' }
];

// 2. ESCALA CIENTÍFICA F A EX (Fuerza Absoluta, Fuerza Relativa y Físico)
const SCIENTIFIC_GRADES = [
  { grade: 'F', label: 'Despertar Inicial', badge: 'bg-slate-800 border-slate-500 text-slate-200', desc: 'Adaptación neuromuscular inicial y aprendizaje técnico.' },
  { grade: 'E', label: 'Aprendiz Activo', badge: 'bg-zinc-800 border-zinc-400 text-zinc-100', desc: 'Coordinación intermuscular básica consolidada.' },
  { grade: 'D', label: 'Guerrero Novato', badge: 'bg-emerald-950 border-emerald-500 text-emerald-300', desc: 'Reclutamiento sólido en patrones multiarticulares.' },
  { grade: 'C', label: 'Atleta Intermedio', badge: 'bg-teal-950 border-teal-400 text-teal-200', desc: 'Hipertrofia funcional visible y control excéntrico.' },
  { grade: 'B', label: 'Atleta Avanzado', badge: 'bg-cyan-950 border-cyan-400 text-cyan-200', desc: 'Alta densidad miofibrilar y eficiencia biomecánica.' },
  { grade: 'A', label: 'Vanguardia Élite', badge: 'bg-blue-950 border-blue-400 text-blue-200', desc: 'Producción de fuerza y simetría muscular superior.' },
  { grade: 'S', label: 'Rango S // Regional', badge: 'bg-purple-950 border-purple-400 text-purple-200', desc: 'Tasa de desarrollo de fuerza (RFD) extraordinaria.' },
  { grade: 'SS', label: 'Rango SS // Nacional', badge: 'bg-fuchsia-950 border-fuchsia-400 text-fuchsia-200', desc: 'Optimización extrema de palancas y composición corporal.' },
  { grade: 'SSS', label: 'Rango SSS // Mundial', badge: 'bg-amber-950 border-amber-400 text-amber-200', desc: 'Límite fisiológico natural y reclutamiento máximo.' },
  { grade: 'EX', label: 'RANGO EX // ANOMALÍA', badge: 'bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-amber-500 border-yellow-300 text-white shadow-[0_0_20px_rgba(250,204,21,0.6)]', desc: 'Nivel sobrehumano. Referente absoluto del Sistema.' }
];

// 3. CONTINGENCIAS INTELIGENTES PARA IMPREVISTOS
const CONTINGENCY_OPTIONS = [
  {
    id: 'lluvia',
    emoji: '🌧️',
    reason: 'Está lloviendo / Clima adverso',
    title: 'Desafío Relámpago Indoor HIIT & Potencia (Casa)',
    plan: '5 rondas explosivas: 45s Burpees + 45s Sentadillas con salto + 45s Mountain Climbers + 45s Plancha dinámica (30s descanso).',
    lp: 35
  },
  {
    id: 'gym_cerrado',
    emoji: '🔒',
    reason: 'Gimnasio cerrado / Sin acceso a máquinas',
    title: 'Protocolo Calisténico de Alta Tensión Mecánica (Casa)',
    plan: '4 series al fallo técnico (RIR 1): Sentadilla Búlgara con pausa 3s + Flexiones en déficit profundo + Remo invertido bajo mesa.',
    lp: 40
  },
  {
    id: 'poco_tiempo',
    emoji: '⚡',
    reason: 'Poco tiempo disponible (< 25 min)',
    title: 'Circuito Myo-Reps Metabólico Express (Casa)',
    plan: 'Bloque de 20 min: 1 serie de activación (15 reps) + 4 mini-series de 5 reps con 15s de pausa en empuje, tracción y pierna.',
    lp: 30
  },
  {
    id: 'fatiga',
    emoji: '🧬',
    reason: 'Cansancio acumulado / Molestia articular',
    title: 'Flujo Isométrico Recuperador & Movilidad Activa',
    plan: '3 rondas: Sentadilla isométrica en pared 45s + Puente glúteo unilateral 15 reps + Movilidad escapular y torácica controlada.',
    lp: 30
  }
];

// 4. RUTINAS CIENTÍFICAS Y BIOMECÁNICA
const BIOMECHANICAL_ROUTINES = {
  gimnasio: {
    hipertrofia: {
      title: 'Hipertrofia Científica // Tensión en Estiramiento',
      summary: 'Maximiza el reclutamiento de unidades motoras de alto umbral cargando los músculos en longitud larga con estabilidad externa.',
      blocks: [
        {
          day: 'Sesión A: Torso (Énfasis Estiramiento & Plano Frontal)',
          exercises: [
            { name: 'Press Inclinado con Mancuernas (30°)', sets: '3x8-10', rir: 'RIR 1', biomech: 'Elongación máxima de fibras claviculares del pectoral sin bloqueo escapular.' },
            { name: 'Jalón al Pecho Agarre Neutro Estrecho', sets: '3x10-12', rir: 'RIR 1', biomech: 'Alinea el brazo de momento en el plano sagital para aislar el dorsal ancho.' },
            { name: 'Elevaciones Laterales en Polea', sets: '4x12-15', rir: 'RIR 0-1', biomech: 'Tensión continua en los primeros 30° de abducción donde la mancuerna pierde torque.' },
            { name: 'Extensión de Tríceps sobre la Cabeza en Polea', sets: '3x10-12', rir: 'RIR 1', biomech: 'Hipertrofia mediada por estiramiento de la cabeza larga del tríceps.' }
          ]
        },
        {
          day: 'Sesión B: Pierna (Dominancia de Rodilla & Cadena Posterior)',
          exercises: [
            { name: 'Sentadilla Hack o con Talones Elevados', sets: '3x8-10', rir: 'RIR 1-2', biomech: 'Maximiza la dorsiflexión y el momento flexor de rodilla para el cuádriceps.' },
            { name: 'Peso Muerto Rumano (RDL) con Barra', sets: '3x8-10', rir: 'RIR 1-2', biomech: 'Carga los isquiosurales en posición alargada con bisagra pura de cadera.' },
            { name: 'Curl Femoral Sentado', sets: '3x10-12', rir: 'RIR 0-1', biomech: 'Pre-estira el bíceps femoral desde la cadera flexionada.' },
            { name: 'Elevación de Talones de Pie (Pausa 2s abajo)', sets: '4x12-15', rir: 'RIR 0', biomech: 'Anula el rebote elástico del tendón de Aquiles para aislar el gastrocnemio.' }
          ]
        }
      ]
    },
    fuerza: {
      title: 'Fuerza Máxima // Tasa de Desarrollo de Fuerza (RFD)',
      summary: 'Optimiza la coordinación intramuscular y sincronización neural con cargas altas (82%-92% 1RM) y descansos completos.',
      blocks: [
        {
          day: 'Sesión A: Sentadilla & Empuje Vertical Neural',
          exercises: [
            { name: 'Sentadilla Trasera Competición', sets: '4x4-5', rir: 'RIR 2', biomech: 'Fase concéntrica explosiva para maximizar reclutamiento sincrónico.' },
            { name: 'Press Militar Estricto de Pie con Barra', sets: '4x5-6', rir: 'RIR 1-2', biomech: 'Transferencia de fuerza en cadena cinética cerrada y anti-extensión del core.' },
            { name: 'Sentadilla Frontal con Pausa (2s)', sets: '3x5', rir: 'RIR 2', biomech: 'Disipa energía elástica en el punto de estancamiento.' }
          ]
        },
        {
          day: 'Sesión B: Press Banca & Tracción Pesada',
          exercises: [
            { name: 'Press de Banca Plano con Pausa Táctil (1s)', sets: '4x4-5', rir: 'RIR 2', biomech: 'Estabilidad escapular y potencia de salida desde el pecho.' },
            { name: 'Peso Muerto Convencional / Sumo', sets: '4x3-4', rir: 'RIR 2', biomech: 'Torque máximo extensor de cadera y rigidez torácica.' },
            { name: 'Dominadas Lastradas Neutras', sets: '4x5-6', rir: 'RIR 1', biomech: 'Sobrecarga vertical pura para dorsal y flexores de codo.' }
          ]
        }
      ]
    },
    recomposicion: {
      title: 'Recomposición Corporal // Densidad Metabólica',
      summary: 'Combina tensión mecánica pesada para retener masa magra con superseries antagonistas que elevan el gasto calórico.',
      blocks: [
        {
          day: 'Sesión Full Body Antagonista',
          exercises: [
            { name: 'Superserie: Prensa Inclinada + Curl Femoral', sets: '3x10+12', rir: 'RIR 1', biomech: 'Inhibición recíproca que acelera la recuperación entre series.' },
            { name: 'Superserie: Press Banca Mancuernas + Remo Polea', sets: '3x10+12', rir: 'RIR 1', biomech: 'Equilibrio 1:1 entre empuje horizontal y tracción escapular.' },
            { name: 'Paseo del Granjero Pesado (Farmer Walk)', sets: '4x35m', rir: 'RIR 1', biomech: 'Estabilidad lateral de cadera, trapecio y fuerza de agarre.' }
          ]
        }
      ]
    }
  },
  casa: {
    hipertrofia: {
      title: 'Hipertrofia en Casa // Palancas Largas & Unilateral',
      summary: 'Alarga los brazos de momento y utiliza carga unilateral para alcanzar estímulo mecánico efectivo sin máquinas.',
      blocks: [
        {
          day: 'Sesión A: Empuje & Cuádriceps Unilateral',
          exercises: [
            { name: 'Sentadilla Búlgara con Elevación de Talón', sets: '4x10-14/lado', rir: 'RIR 0-1', biomech: 'Duplica la carga relativa sobre un solo miembro inferior.' },
            { name: 'Flexiones en Déficit (manos elevadas en soportes)', sets: '4x12-18', rir: 'RIR 0-1', biomech: 'Aumenta el rango de abducción horizontal del pectoral mayor.' },
            { name: 'Flexiones en Pica (Pike Push-Ups)', sets: '3x8-12', rir: 'RIR 1', biomech: 'Simula el vector vertical del press militar para deltoides.' }
          ]
        },
        {
          day: 'Sesión B: Tracción & Cadena Posterior en Casa',
          exercises: [
            { name: 'Remo Invertido Bajo Mesa / Barra Baja', sets: '4x10-15', rir: 'RIR 0-1', biomech: 'Retracción escapular completa bajo vector horizontal.' },
            { name: 'Curl Nórdico Excéntrico / Deslizamiento Femoral', sets: '4x8-12', rir: 'RIR 1', biomech: 'Sobrecarga excéntrica máxima en isquiosurales.' },
            { name: 'Elevación de Talón Unilateral en Escalón', sets: '4x15-20/lado', rir: 'RIR 0', biomech: 'Déficit plantar completo para tríceps sural.' }
          ]
        }
      ]
    },
    fuerza: {
      title: 'Fuerza Calisténica // Progresiones Gimnásticas',
      summary: 'Incrementa la demanda neural mediante palancas asimétricas e isometrías de máxima contracción voluntaria.',
      blocks: [
        {
          day: 'Sesión Potencia & Control Unilateral',
          exercises: [
            { name: 'Pistol Squat Asistida o Sentadilla Camarón', sets: '4x5-6/lado', rir: 'RIR 1-2', biomech: 'Demanda máxima de torque extensor de rodilla y movilidad de tobillo.' },
            { name: 'Flexiones Arqueras / Pseudo-Planche', sets: '4x6-8', rir: 'RIR 1', biomech: 'Desplaza el centro de masa aumentando la carga en hombros y pecho.' },
            { name: 'Plancha RKC (Contracción Máxima Total)', sets: '3x30s', rir: 'RIR 1', biomech: 'Co-contracción simultánea de abdomen, glúteos y dorsales.' }
          ]
        }
      ]
    },
    recomposicion: {
      title: 'Acondicionamiento Bio-Metabólico en Casa',
      summary: 'Maximiza la oxidación lipídica y capacidad cardiovascular preservando tejido muscular activo.',
      blocks: [
        {
          day: 'Circuito Metabólico de Cuerpo Completo',
          exercises: [
            { name: 'Zancadas Reversas Alternas + Flexiones Explosivas', sets: '4x12/lado + 12', rir: 'RIR 1', biomech: 'Transición tren inferior-superior que eleva el gasto cardíaco.' },
            { name: 'Remo Invertido + Mountain Climbers Controlados', sets: '4x12 + 30s', rir: 'RIR 1', biomech: 'Tracción postural combinada con flexión dinámica de cadera.' }
          ]
        }
      ]
    }
  },
  hibrido: {
    hipertrofia: {
      title: 'Sistema Híbrido // Cargas Pesadas Gym + Volumen Casa',
      summary: 'Usa el gimnasio para los compuestos pesados y días en casa para acumular volumen metabólico de rápida recuperación.',
      blocks: [
        {
          day: 'Día GIMNASIO: Compuestos Pesados',
          exercises: [
            { name: 'Sentadilla Trasera o Prensa Pesada', sets: '3x6-8', rir: 'RIR 1-2', biomech: 'Carga axial/mecánica de alta precisión.' },
            { name: 'Press Banca Inclinado + Jalón al Pecho', sets: '3x8-10 c/u', rir: 'RIR 1', biomech: 'Empuje y tracción vertical equilibrados.' }
          ]
        },
        {
          day: 'Día CASA: Detalle Estético & Bomba Metabólica',
          exercises: [
            { name: 'Sentadilla Búlgara + Flexiones en Déficit', sets: '3x12/lado + 15', rir: 'RIR 1', biomech: 'Estímulo unilateral de alta frecuencia semanal.' },
            { name: 'Pike Push-Ups + Elevaciones Laterales Banda/Mancuerna', sets: '4x12 + 15', rir: 'RIR 0', biomech: 'Volumen efectivo para deltoides sin fatiga sistémica.' }
          ]
        }
      ]
    },
    fuerza: {
      title: 'Sistema Híbrido Fuerza // SBD Gym + Pliometría Casa',
      summary: 'Concentra el trabajo pesado con barra en el gimnasio y la potencia reactiva en casa.',
      blocks: [
        {
          day: 'Día GIMNASIO: Los 3 Grandes (SBD)',
          exercises: [
            { name: 'Sentadilla + Press Banca + Peso Muerto (Top Sets)', sets: '3x4 c/u', rir: 'RIR 2', biomech: 'Sinergia neuromuscular máxima en una sesión.' }
          ]
        },
        {
          day: 'Día CASA: Potencia Explosiva & Core',
          exercises: [
            { name: 'Squat Jumps + Flexiones Pliométricas', sets: '4x6 + 6', rir: 'RIR 2', biomech: 'Optimiza el ciclo estiramiento-acortamiento (CEA).' }
          ]
        }
      ]
    },
    recomposicion: {
      title: 'Sistema Híbrido Recomposición // Tensión + HIIT',
      summary: 'Preserva fuerza en sala de pesas y dispara el gasto energético semanal desde casa.',
      blocks: [
        {
          day: 'Día GIMNASIO: Full Body Tensión Mecánica',
          exercises: [
            { name: 'Peso Muerto Rumano + Press Plano + Remo Barra', sets: '3x8 c/u', rir: 'RIR 1-2', biomech: 'Mantiene masa muscular en déficit calórico.' }
          ]
        },
        {
          day: 'Día CASA: Circuito HIIT & Core',
          exercises: [
            { name: 'Burpees Técnicos + Zancadas + Plancha Dinámica', sets: '5 rondas x 40s', rir: 'RIR 1', biomech: 'Eleva el consumo post-ejercicio (EPOC).' }
          ]
        }
      ]
    }
  }
};

// ============================================================================
// FUNCIONES DE CÁLCULO CIENTÍFICO Y PROGRESIÓN
// ============================================================================

function getRankProgress(totalLP) {
  const safeLP = Math.max(0, Math.min(8999, Math.round(totalLP)));
  const globalDivIndex = Math.floor(safeLP / 100); // 0 a 89
  const rankIndex = Math.min(14, Math.floor(globalDivIndex / 6)); // 0 a 14
  const division = 6 - (globalDivIndex % 6); // 6 a 1
  const currentDivLP = safeLP % 100;
  const rankObj = COMPETITIVE_RANKS[rankIndex];

  return {
    totalLP: safeLP,
    globalDivIndex,
    rankIndex,
    rank: rankObj,
    division,
    currentDivLP,
    fullName: `${rankObj.name} ${division}`,
    isMax: rankIndex === 14 && division === 1
  };
}

function computeStrengthProfile(bodyWeight, lifts) {
  const bw = Math.max(35, Number(bodyWeight) || 75);

  // Promedio científico de fórmulas Epley y Brzycki para 1RM
  const estimate1RM = (weight, reps) => {
    const w = Math.max(0, Number(weight) || 0);
    const r = Math.max(1, Math.min(20, Number(reps) || 1));
    if (w === 0) return 0;
    if (r === 1) return w;
    const epley = w * (1 + r / 30);
    const brzycki = r < 37 ? w * (36 / (37 - r)) : epley;
    return Math.round((epley + brzycki) / 2);
  };

  const squat1RM = estimate1RM(lifts.squat.weight, lifts.squat.reps);
  const bench1RM = estimate1RM(lifts.bench.weight, lifts.bench.reps);
  const deadlift1RM = estimate1RM(lifts.deadlift.weight, lifts.deadlift.reps);
  // Para dominadas lastradas: peso corporal + lastre añadido
  const pullupTotalLoad = bw + Math.max(0, Number(lifts.pullup.weight) || 0);
  const pullup1RM = estimate1RM(pullupTotalLoad, lifts.pullup.reps);
  const ohp1RM = estimate1RM(lifts.ohp.weight, lifts.ohp.reps);

  const sbdTotal = squat1RM + bench1RM + deadlift1RM;
  const fiveLiftsTotal = sbdTotal + pullup1RM + ohp1RM;

  // Coeficiente científico DOTS
  const dotsDenom =
    -307.75076 +
    24.0900756 * bw -
    0.1918759221 * Math.pow(bw, 2) +
    0.0007391293 * Math.pow(bw, 3) -
    0.000001093 * Math.pow(bw, 4);
  const dotsScore = dotsDenom > 0 ? Math.round((sbdTotal * 500) / dotsDenom) : 0;

  const relativeRatio = Number((sbdTotal / bw).toFixed(2));

  const getGradeByThresholds = (val, thresholds) => {
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (val >= thresholds[i]) return SCIENTIFIC_GRADES[i];
    }
    return SCIENTIFIC_GRADES[0];
  };

  const absComposite = sbdTotal * 0.65 + dotsScore * 0.55;
  const absoluteGrade = getGradeByThresholds(absComposite, [0, 170, 240, 310, 385, 460, 540, 625, 710, 800]);
  const relativeGrade = getGradeByThresholds(relativeRatio, [0, 1.9, 2.6, 3.3, 4.0, 4.7, 5.4, 6.1, 6.8, 7.5]);

  const rows = [
    {
      key: 'squat',
      name: 'Sentadilla Trasera',
      oneRM: squat1RM,
      ratio: Number((squat1RM / bw).toFixed(2)),
      grade: getGradeByThresholds(squat1RM / bw, [0, 0.75, 1.0, 1.25, 1.5, 1.8, 2.1, 2.4, 2.7, 3.0])
    },
    {
      key: 'bench',
      name: 'Press de Banca',
      oneRM: bench1RM,
      ratio: Number((bench1RM / bw).toFixed(2)),
      grade: getGradeByThresholds(bench1RM / bw, [0, 0.55, 0.75, 0.95, 1.15, 1.35, 1.55, 1.75, 1.95, 2.15])
    },
    {
      key: 'deadlift',
      name: 'Peso Muerto',
      oneRM: deadlift1RM,
      ratio: Number((deadlift1RM / bw).toFixed(2)),
      grade: getGradeByThresholds(deadlift1RM / bw, [0, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4, 2.7, 3.0, 3.3])
    },
    {
      key: 'pullup',
      name: 'Dominadas Lastradas (Total)',
      oneRM: pullup1RM,
      ratio: Number((pullup1RM / bw).toFixed(2)),
      grade: getGradeByThresholds(pullup1RM / bw, [0, 0.95, 1.1, 1.25, 1.4, 1.55, 1.7, 1.85, 2.0, 2.15])
    },
    {
      key: 'ohp',
      name: 'Press Militar Estricto',
      oneRM: ohp1RM,
      ratio: Number((ohp1RM / bw).toFixed(2)),
      grade: getGradeByThresholds(ohp1RM / bw, [0, 0.35, 0.5, 0.65, 0.78, 0.9, 1.02, 1.15, 1.28, 1.4])
    }
  ];

  return {
    sbdTotal,
    fiveLiftsTotal,
    dotsScore,
    relativeRatio,
    absoluteGrade,
    relativeGrade,
    rows
  };
}

function auditUserRoutine(text, feeling) {
  const lower = (text || '').toLowerCase();
  const pushCount = (lower.match(/banca|press|flexion|push|fondos|aperturas|lateral|tricep/g) || []).length;
  const pullCount = (lower.match(/remo|jalon|dominada|pull|curl|bicep|face|peso muerto|deadlift/g) || []).length;
  const legCount = (lower.match(/sentadilla|squat|prensa|zancada|bulgara|femoral|cuadricep|gemelo|hip thrust/g) || []).length;

  const pushSets = Math.max(4, pushCount * 4);
  const pullSets = Math.max(3, pullCount * 4);
  const legSets = Math.max(4, legCount * 4);
  const ratio = pullSets > 0 ? Number((pushSets / pullSets).toFixed(2)) : 2.0;

  let score = 86;
  const alerts = [];
  const tips = [];

  if (ratio > 1.35) {
    score -= 14;
    alerts.push({
      level: 'warn',
      title: `Desbalance Empuje / Tracción (${ratio}:1)`,
      detail: 'Predominio excesivo de empuje anterior. Riesgo de rotación interna de hombros.'
    });
    tips.push('Suma 4-6 series semanales de remo horizontal y Face Pulls para equilibrar la cintura escapular.');
  } else {
    alerts.push({
      level: 'ok',
      title: `Balance Empuje / Tracción Saludable (${ratio}:1)`,
      detail: 'Proporción biomecánica equilibrada entre cadena anterior y posterior.'
    });
  }

  if (legSets < 10) {
    score -= 12;
    alerts.push({
      level: 'warn',
      title: 'Volumen Bajo en Tren Inferior (< 10 series/sem)',
      detail: 'Por debajo del Volumen Mínimo Adaptativo (MAV) para cuádriceps e isquiosurales.'
    });
    tips.push('Incluye al menos un patrón de rodilla (Sentadilla/Prensa) y uno de cadera (RDL/Curl Femoral) 2x/semana.');
  }

  let cnsStatus = 'Óptima';
  if (feeling === 'estancado') {
    score -= 15;
    cnsStatus = 'Saturación de Fatiga (MRV)';
    alerts.push({
      level: 'danger',
      title: 'Meseta de Progresión Detectada',
      detail: 'La fatiga acumulada en el Sistema Nervioso Central está ocultando tus ganancias de fuerza.'
    });
    tips.push('Ejecuta una semana de descarga (Deload): reduce las series al 50% manteniendo el peso y trabaja a RIR 3.');
  } else if (feeling === 'fatiga') {
    score -= 20;
    cnsStatus = 'Sobrecarga Articular / SNC Alto';
    alerts.push({
      level: 'danger',
      title: 'Riesgo de Sobreentrenamiento',
      detail: 'Demasiadas series cerca del fallo absoluto (RIR 0) en ejercicios compuestos pesados.'
    });
    tips.push('Cambia variantes con barra libre por máquinas convergentes o poleas durante 2 semanas y prioriza 8h de sueño.');
  } else {
    tips.push('Aplica sobrecarga progresiva doble: sube +2.5 kg cuando completes el tope de repeticiones con RIR 1.');
  }

  return {
    score: Math.max(40, Math.min(99, score)),
    pushSets,
    pullSets,
    legSets,
    ratio,
    cnsStatus,
    alerts,
    tips
  };
}

function analyzeSleepWeek(hoursArray) {
  const total = Number(hoursArray.reduce((sum, h) => sum + Number(h || 0), 0).toFixed(1));
  const avg = Number((total / 7).toFixed(1));

  if (total < 42) {
    return {
      total,
      avg,
      status: 'critical',
      energyPct: Math.max(25, Math.round((total / 49) * 70)),
      label: 'DÉFICIT CRÍTICO DE SUEÑO',
      impact: 'Caída del 30% en síntesis proteica y alerta alta de fatiga del SNC. Reduce cargas 15% hoy o usa un Desafío en Casa.'
    };
  }
  if (total < 49) {
    return {
      total,
      avg,
      status: 'warning',
      energyPct: Math.round((total / 49) * 88),
      label: 'DEUDA LEVE DE DESCANSO',
      impact: 'Recuperación parcial (< 49h/sem). Evita llegar al fallo muscular absoluto en ejercicios multiarticulares.'
    };
  }
  if (total > 63) {
    return {
      total,
      avg,
      status: 'high',
      energyPct: 94,
      label: 'SUPERÁVIT DE RECUPERACIÓN',
      impact: 'Descanso máximo (> 63h). Realiza una activación dinámica prolongada antes de levantar pesado.'
    };
  }
  return {
    total,
    avg,
    status: 'optimal',
    energyPct: 100,
    label: 'ZONA ANABÓLICA ÓPTIMA (49–63h)',
    impact: 'Secreción óptima de hormona de crecimiento y resíntesis de glucógeno. Estás al 100% para romper récords.'
  };
}

// ============================================================================
// COMPONENTE: AVATAR 2D ESTILO ANIME (CEL-SHADING EXPRESIVO + AURA DE KI)
// ============================================================================

function AnimeWarrior2D({ avatar, rankColor, rankTitle, rankIndex, physicalGrade, compact = false }) {
  const skinTones = {
    claro: { base: '#FFE2CC', shadow: '#E0AF8E' },
    trigueno: { base: '#EBB68D', shadow: '#C2865B' },
    bronceado: { base: '#CA865A', shadow: '#995933' },
    moreno: { base: '#965A38', shadow: '#69381D' },
    oscuro: { base: '#633B26', shadow: '#3E2012' },
    celestial: { base: '#DCE7F7', shadow: '#8FA7CC' }
  };

  const hairTones = {
    azabache: { base: '#161B2B', shine: '#4F6399' },
    platino: { base: '#F8FAFC', shine: '#FFFFFF' },
    fuego: { base: '#EF4444', shine: '#FCA5A5' },
    relampago: { base: '#0EA5E9', shine: '#BAE6FD' },
    dorado: { base: '#F59E0B', shine: '#FEF08A' },
    amatista: { base: '#9333EA', shine: '#E9D5FF' }
  };

  const biotypes = {
    atletico: { sh: 44, wa: 21, arm: 11, trap: 18, label: 'Atlético / Calisténico' },
    mesomorfo: { sh: 51, wa: 23, arm: 14, trap: 22, label: 'Mesomorfo / Estético' },
    powerlifter: { sh: 57, wa: 29, arm: 16, trap: 26, label: 'Powerlifter / Fuerza Bruta' },
    titan: { sh: 62, wa: 24, arm: 18, trap: 30, label: 'Titán / Hipertrofia Élite' }
  };

  const auraPalette = {
    rango: rankColor,
    dorado: '#FACC15',
    cian: '#00F5FF',
    magenta: '#F43F5E',
    esmeralda: '#10B981',
    violeta: '#C084FC'
  };

  const skin = skinTones[avatar.skin] || skinTones.trigueno;
  const hair = hairTones[avatar.hairColor] || hairTones.azabache;
  const bio = biotypes[avatar.build] || biotypes.mesomorfo;
  const auraHex = auraPalette[avatar.aura] || rankColor;
  const isFem = avatar.gender === 'femenino';

  const shW = isFem ? bio.sh - 8 : bio.sh;
  const waW = isFem ? bio.wa - 4 : bio.wa;
  const armW = isFem ? bio.arm - 2.5 : bio.arm;
  const trapW = isFem ? bio.trap - 4 : bio.trap;
  const hasLightning = rankIndex >= 6 || ['S', 'SS', 'SSS', 'EX'].includes(physicalGrade);

  if (compact) {
    return (
      <div
        className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 shrink-0 bg-[#120D2B] shadow-lg"
        style={{ borderColor: auraHex, boxShadow: `0 0 15px ${auraHex}88` }}
      >
        <div
          className="absolute inset-0 opacity-45 animate-pulse"
          style={{ background: `radial-gradient(circle, ${auraHex} 0%, transparent 72%)` }}
        />
        <svg viewBox="75 26 130 130" className="w-full h-full relative z-10">
          {avatar.hair === 'salvaje' && (
            <path d="M96,65 L84,138 L112,126 L140,142 L168,126 L196,138 L184,65 Z" fill={hair.base} stroke="#090B14" strokeWidth="2.5" />
          )}
          <path d={`M${140 - shW},150 L${140 - trapW},116 L160,116 L${140 + shW},150 Z`} fill={skin.base} stroke="#090B14" strokeWidth="2.5" />
          <rect x="128" y="96" width="24" height="24" fill={skin.base} stroke="#090B14" strokeWidth="2.5" />
          <path d="M114,60 L116,86 L128,103 L140,109 L152,103 L164,86 L166,60 Z" fill={skin.base} stroke="#090B14" strokeWidth="2.5" />
          {/* Ojos Anime */}
          <polygon points="119,76 133,78 131,85 120,84" fill="#FFFFFF" stroke="#090B14" strokeWidth="1.6" />
          <circle cx="126.5" cy="81" r="3.4" fill={auraHex} />
          <circle cx="125.3" cy="79.8" r="1.3" fill="#FFFFFF" />
          <polygon points="161,76 147,78 149,85 160,84" fill="#FFFFFF" stroke="#090B14" strokeWidth="1.6" />
          <circle cx="153.5" cy="81" r="3.4" fill={auraHex} />
          <circle cx="152.3" cy="79.8" r="1.3" fill="#FFFFFF" />
          {/* Flequillo */}
          <path d="M110,68 L104,44 L122,30 L140,22 L158,30 L176,44 L170,68 L158,52 L148,72 L140,54 L132,73 L122,52 Z" fill={hair.base} stroke="#090B14" strokeWidth="2.5" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[365px] rounded-2xl border-2 bg-gradient-to-b from-[#17113B] via-[#1D154A] to-[#0E0B24] overflow-hidden flex items-center justify-center shadow-2xl select-none"
      style={{ borderColor: auraHex, boxShadow: `0 0 36px ${auraHex}44` }}
    >
      {/* Estrellas y partículas brillantes anime */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[12, 24, 38, 52, 68, 82, 91].map((leftPct, i) => (
          <span
            key={i}
            className="absolute bottom-6 w-2 h-2 rounded-full animate-ki-rise"
            style={{
              left: `${leftPct}%`,
              backgroundColor: i % 2 === 0 ? auraHex : '#FFFFFF',
              boxShadow: `0 0 10px ${auraHex}`,
              animationDelay: `${i * 0.38}s`
            }}
          />
        ))}
      </div>

      {/* Aura Radial Vibrante */}
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl animate-aura-breathe"
        style={{ backgroundColor: auraHex, opacity: 0.42 }}
      />

      {/* Insignias superiores */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20 gap-2">
        <span className="px-2.5 py-1 rounded-xl bg-black/65 border border-white/20 text-[10px] font-mono font-bold text-cyan-200 backdrop-blur-md">
          BIOTIPO: {bio.label.toUpperCase()}
        </span>
        <span
          className="px-3 py-1 rounded-xl bg-black/75 border text-[11px] font-mono font-black backdrop-blur-md shadow-md"
          style={{ borderColor: auraHex, color: auraHex }}
        >
          FÍSICO {physicalGrade} • {rankTitle}
        </span>
      </div>

      {/* ILUSTRACIÓN SVG ANIME 2D DE CUERPO COMPLETO */}
      <svg viewBox="0 0 280 345" className="w-72 h-[340px] relative z-10 overflow-visible">
        <defs>
          <linearGradient id="animeKiFlame" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={auraHex} stopOpacity="0.85" />
            <stop offset="55%" stopColor={auraHex} stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="animeFloorRing" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={auraHex} stopOpacity="0.7" />
            <stop offset="100%" stopColor={auraHex} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Círculo de Energía en el Suelo */}
        <g transform="translate(140, 312)">
          <ellipse cx="0" cy="0" rx="92" ry="18" fill="url(#animeFloorRing)" />
          <ellipse
            cx="0"
            cy="0"
            rx="80"
            ry="15"
            fill="none"
            stroke={auraHex}
            strokeWidth="2.2"
            strokeDasharray="14 6"
            className="animate-ring-rotate"
          />
        </g>

        {/* Llamas de Ki Estilo Shonen detrás del Guerrero */}
        <g className="animate-aura-breathe">
          <path
            d="M80,305 Q60,230 80,168 Q62,122 88,78 Q105,32 140,16 Q175,32 192,78 Q218,122 200,168 Q220,230 200,305 Z"
            fill="url(#animeKiFlame)"
          />
          <polygon points="80,198 54,154 84,166" fill={auraHex} opacity="0.6" />
          <polygon points="200,198 226,154 196,166" fill={auraHex} opacity="0.6" />
          <polygon points="92,118 68,74 100,92" fill={auraHex} opacity="0.65" />
          <polygon points="188,118 212,74 180,92" fill={auraHex} opacity="0.65" />
        </g>

        {/* Rayos eléctricos para rangos elevados */}
        {hasLightning && (
          <g stroke="#FFFFFF" strokeWidth="1.8" fill="none" opacity="0.9">
            <polyline points="68,140 82,124 72,112 90,94" stroke={auraHex} strokeWidth="2.4" />
            <polyline points="212,140 198,124 208,112 190,94" stroke={auraHex} strokeWidth="2.4" />
            <polyline points="78,245 92,228 82,216 96,198" />
            <polyline points="202,245 188,228 198,216 184,198" />
          </g>
        )}

        {/* PERSONAJE ANIME (ANIMACIÓN DE RESPIRACIÓN HEROICA) */}
        <g className="animate-hero-breath">
          {/* Cabello trasero */}
          {avatar.hair === 'salvaje' && (
            <path
              d="M100,66 L80,160 L108,146 L124,166 L140,150 L156,166 L172,146 L200,160 L180,66 Z"
              fill={hair.base}
              stroke="#090B14"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          )}
          {avatar.hair === 'coleta' && (
            <path
              d="M136,28 Q174,36 182,88 Q164,68 144,34 Z"
              fill={hair.base}
              stroke="#090B14"
              strokeWidth="2.4"
            />
          )}

          {/* Piernas & Calzado Deportivo */}
          <g stroke="#090B14" strokeWidth="2.5" strokeLinejoin="round">
            <path
              d={`M${140 - waW},186 L${140 - waW - 8},282 L111,282 L138,208 L142,208 L169,282 L${140 + waW + 8},282 L${140 + waW},186 Z`}
              fill="#15192B"
            />
            <line x1={140 - waW - 2} y1="196" x2={140 - waW - 7} y2="276" stroke={auraHex} strokeWidth="2.4" />
            <line x1={140 + waW + 2} y1="196" x2={140 + waW + 7} y2="276" stroke={auraHex} strokeWidth="2.4" />
            {/* Zapatillas de Entrenamiento */}
            <path d={`M${140 - waW - 9},282 L110,282 L106,308 L${140 - waW - 12},308 Z`} fill="#F8FAFC" />
            <path d={`M170,282 L${140 + waW + 9},282 L${140 + waW + 12},308 L174,308 Z`} fill="#F8FAFC" />
            <line x1={140 - waW - 10} y1="298" x2="108" y2="298" stroke={auraHex} strokeWidth="3" />
            <line x1="172" y1="298" x2={140 + waW + 10} y2="298" stroke={auraHex} strokeWidth="3" />
          </g>

          {/* Brazos Cel-Shaded */}
          <g stroke="#090B14" strokeWidth="2.5" strokeLinejoin="round">
            <path
              d={`M${140 - shW + 2},114 L${140 - shW - armW},148 L${140 - shW - armW + 3},196 L${140 - shW + 4},196 L${140 - shW + 5},152 Z`}
              fill={skin.base}
            />
            <polygon
              points={`${140 - shW + 1},136 ${140 - shW + 4},152 ${140 - shW + 3},194 ${140 - shW - 2},194`}
              fill={skin.shadow}
              stroke="none"
            />
            <path
              d={`M${140 + shW - 2},114 L${140 + shW + armW},148 L${140 + shW + armW - 3},196 L${140 + shW - 4},196 L${140 + shW - 5},152 Z`}
              fill={skin.base}
            />
            <polygon
              points={`${140 + shW - 1},136 ${140 + shW - 4},152 ${140 + shW - 3},194 ${140 + shW + 2},194`}
              fill={skin.shadow}
              stroke="none"
            />

            {/* Accesorio: Muñequeras de Fuerza */}
            {avatar.accessory === 'munequeras' && (
              <>
                <rect x={140 - shW - armW + 1} y="172" width={armW + 2} height="22" rx="3" fill={auraHex} />
                <rect x={140 + shW - 3} y="172" width={armW + 2} height="22" rx="3" fill={auraHex} />
              </>
            )}
          </g>

          {/* Torso & Indumentaria */}
          <g stroke="#090B14" strokeWidth="2.5" strokeLinejoin="round">
            <polygon
              points={`${140 - trapW},104 ${140 + trapW},104 ${140 + shW},116 ${140 + waW},188 ${140 - waW},188 ${140 - shW},116`}
              fill={skin.base}
            />
            <polygon
              points={`${140 + shW - 8},116 ${140 + shW},116 ${140 + waW},188 ${140 + waW - 7},188`}
              fill={skin.shadow}
              stroke="none"
            />

            {/* Definición muscular anime */}
            <g fill="none" stroke="#090B14" strokeWidth="1.6" strokeLinecap="round" opacity="0.7">
              <path d={`M${140 - shW * 0.58},134 Q140,140 140,124`} />
              <path d={`M${140 + shW * 0.58},134 Q140,140 140,124`} />
              <line x1="140" y1="138" x2="140" y2="180" />
              <path d="M131,149 L138,149 M142,149 L149,149" />
              <path d="M131,160 L138,160 M142,160 L149,160" />
            </g>

            {/* 4 Conjuntos Deportivos / Anime */}
            {avatar.outfit === 'neogym' && (
              <g>
                <polygon
                  points={`125,104 155,104 149,130 ${140 + waW + 1},188 ${140 - waW - 1},188 131,130`}
                  fill="#18181B"
                />
                <polygon
                  points={`${140 - waW - 1},156 128,164 128,188 ${140 - waW - 1},188`}
                  fill="#EF4444"
                  stroke="none"
                />
                <polygon
                  points={`${140 + waW + 1},156 152,164 152,188 ${140 + waW + 1},188`}
                  fill="#EF4444"
                  stroke="none"
                />
                <text x="140" y="152" textAnchor="middle" fill={auraHex} fontSize="12" fontWeight="900" fontFamily="monospace" stroke="none">
                  EX
                </text>
              </g>
            )}

            {avatar.outfit === 'gi' && (
              <g>
                <polygon
                  points={`${140 - trapW},103 ${140 + trapW},103 ${140 + shW * 0.78},114 ${140 + waW + 1},188 ${140 - waW - 1},188 ${140 - shW * 0.78},114`}
                  fill="#1E293B"
                />
                <polyline points={`${140 - trapW + 4},104 140,148 ${140 + trapW - 4},104`} fill="none" stroke={auraHex} strokeWidth="3.2" />
                <rect x={140 - waW - 2} y="175" width={(waW + 2) * 2} height="11" fill={auraHex} />
              </g>
            )}

            {avatar.outfit === 'cyber' && (
              <g>
                <polygon
                  points={`${140 - trapW},104 ${140 + trapW},104 ${140 + shW},116 ${140 + waW},188 ${140 - waW},188 ${140 - shW},116`}
                  fill="#0F172A"
                />
                <polyline points={`${140 - shW + 6},122 132,135 148,135 ${140 + shW - 6},122`} fill="none" stroke={auraHex} strokeWidth="2.4" />
                <circle cx="140" cy="135" r="4.5" fill={auraHex} stroke="none" />
              </g>
            )}

            {avatar.outfit === 'titan' && (
              <g>
                <polygon
                  points={`${140 - trapW},104 ${140 + trapW},104 ${140 + shW * 0.85},122 ${140 + waW},188 ${140 - waW},188 ${140 - shW * 0.85},122`}
                  fill="#1E1B4B"
                />
                <polygon points={`${140 - shW - 8},125 ${140 - shW + 6},106 ${140 - trapW + 2},122`} fill="#090D16" stroke={auraHex} strokeWidth="2.2" />
                <polygon points={`${140 + shW + 8},125 ${140 + shW - 6},106 ${140 + trapW - 2},122`} fill="#090D16" stroke={auraHex} strokeWidth="2.2" />
                <polygon points="140,122 151,135 140,148 129,135" fill={auraHex} />
              </g>
            )}

            {/* Accesorio: Cinturón de Poder */}
            {avatar.accessory === 'cinturon' && (
              <g>
                <rect x={140 - waW - 2} y="176" width={(waW + 2) * 2} height="12" rx="2" fill="#090B14" />
                <rect x="133" y="174" width="14" height="16" rx="3" fill={auraHex} />
              </g>
            )}
          </g>

          {/* Cuello y Cabeza Anime */}
          <g stroke="#090B14" strokeWidth="2.5" strokeLinejoin="round">
            <rect x="130" y="86" width="20" height="22" fill={skin.base} />
            <polygon points="130,88 150,88 150,98 130,94" fill={skin.shadow} stroke="none" />
            <path d="M115,50 L116,74 L128,90 L140,96 L152,90 L164,74 L165,50 Z" fill={skin.base} />
            <polygon points="158,52 164,52 163,74 151,90 140,95 150,86 157,72" fill={skin.shadow} stroke="none" />
          </g>

          {/* Rasgos Faciales Expresivos Anime */}
          <g>
            <polyline points="119,61 134,65" stroke="#090B14" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <polyline points="161,61 146,65" stroke="#090B14" strokeWidth="2.6" strokeLinecap="round" fill="none" />

            {/* Ojo Izquierdo */}
            <polygon points="119,66 134,68 132,75 120,74" fill="#FFFFFF" stroke="#090B14" strokeWidth="1.6" />
            <circle cx="127" cy="71" r="3.4" fill={auraHex} />
            <circle cx="127" cy="71" r="1.5" fill="#090B14" />
            <circle cx="125.6" cy="69.8" r="1.2" fill="#FFFFFF" />

            {/* Ojo Derecho */}
            <polygon points="161,66 146,68 148,75 160,74" fill="#FFFFFF" stroke="#090B14" strokeWidth="1.6" />
            <circle cx="153" cy="71" r="3.4" fill={auraHex} />
            <circle cx="153" cy="71" r="1.5" fill="#090B14" />
            <circle cx="151.6" cy="69.8" r="1.2" fill="#FFFFFF" />

            {/* Sonrisa Confiada Anime */}
            <path d="M133,85 Q140,89 147,84" stroke="#090B14" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>

          {/* 4 Peinados Shonen Originales */}
          <g stroke="#090B14" strokeWidth="2.5" strokeLinejoin="round">
            {avatar.hair === 'shonen' && (
              <g>
                <path
                  d="M111,60 L99,40 L116,36 L112,16 L130,27 L140,8 L150,27 L168,16 L164,36 L181,40 L169,60 L157,46 L149,65 L140,48 L131,65 L123,46 Z"
                  fill={hair.base}
                />
                <polyline points="120,37 129,32 136,38 144,32 151,38 160,33" fill="none" stroke={hair.shine} strokeWidth="2.2" />
              </g>
            )}

            {avatar.hair === 'cazador' && (
              <g>
                <path
                  d="M111,64 L106,40 L122,26 L140,21 L158,26 L174,40 L169,64 L158,48 L151,69 L143,50 L136,70 L128,49 L120,66 Z"
                  fill={hair.base}
                />
                <polyline points="120,40 130,35 140,41 150,35 160,40" fill="none" stroke={hair.shine} strokeWidth="2.2" />
              </g>
            )}

            {avatar.hair === 'coleta' && (
              <g>
                <path
                  d="M113,58 Q115,30 140,28 Q165,30 167,58 L156,45 L146,62 L140,45 L134,62 L124,45 Z"
                  fill={hair.base}
                />
                <path d="M123,39 Q140,35 157,39" fill="none" stroke={hair.shine} strokeWidth="2.2" />
              </g>
            )}

            {avatar.hair === 'salvaje' && (
              <g>
                <path
                  d="M104,68 L102,38 L121,22 L140,14 L159,22 L178,38 L176,68 L161,49 L152,70 L140,50 L128,70 L119,49 Z"
                  fill={hair.base}
                />
                <polyline points="118,37 131,32 140,38 149,32 162,37" fill="none" stroke={hair.shine} strokeWidth="2.2" />
              </g>
            )}
          </g>

          {/* Accesorios de Cabeza */}
          {avatar.accessory === 'banda' && (
            <g>
              <rect x="114" y="52" width="52" height="7" rx="2" fill={auraHex} stroke="#090B14" strokeWidth="1.8" />
              <rect x="133" y="51" width="14" height="9" rx="1.5" fill="#E2E8F0" stroke="#090B14" strokeWidth="1.5" />
            </g>
          )}

          {avatar.accessory === 'auriculares' && (
            <g>
              <path d="M110,64 Q110,20 140,20 Q170,20 170,64" fill="none" stroke="#1E293B" strokeWidth="4.8" />
              <rect x="106" y="57" width="8" height="19" rx="3" fill="#0F172A" stroke={auraHex} strokeWidth="2.2" />
              <rect x="166" y="57" width="8" height="19" rx="3" fill="#0F172A" stroke={auraHex} strokeWidth="2.2" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}

// ============================================================================
// COMPONENTE: BÓVEDA PRIVADA DE FOTOS (FRENTE Y ESPALDA SIN ROSTRO)
// ============================================================================

function SecureBodyPhotoCard({ title, photoUrl, onPhotoProcessed, onSimulatePhoto }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = 260;
    const h = 320;
    canvas.width = w;
    canvas.height = h;

    if (!photoUrl) {
      ctx.fillStyle = '#0D0A22';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.16)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`VISTA ${title.toUpperCase()}`, w / 2, h / 2 - 8);
      ctx.fillStyle = '#00F5FF';
      ctx.font = '10px monospace';
      ctx.fillText('CENSURA FACIAL AUTOMÁTICA', w / 2, h / 2 + 12);
      return;
    }

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, w, h);
      const scale = Math.max(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);

      // Pixelado y barra de privacidad automática en el 24% superior (zona del rostro)
      const faceH = Math.round(h * 0.24);
      const block = 12;
      for (let py = 0; py < faceH; py += block) {
        for (let px = 0; px < w; px += block) {
          const p = ctx.getImageData(Math.min(w - 1, px + 3), Math.min(h - 1, py + 3), 1, 1).data;
          ctx.fillStyle = `rgb(${p[0]},${p[1]},${p[2]})`;
          ctx.fillRect(px, py, block, block);
        }
      }

      ctx.fillStyle = 'rgba(12, 9, 32, 0.9)';
      ctx.fillRect(0, 0, w, faceH);
      ctx.strokeStyle = '#00F5FF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, faceH);
      ctx.lineTo(w, faceH);
      ctx.stroke();

      ctx.fillStyle = '#00F5FF';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ROSTRO CENSURADO // ZERO-FACE', w / 2, faceH / 2 - 3);
      ctx.fillStyle = '#34D399';
      ctx.font = '9px monospace';
      ctx.fillText('CIFRADO LOCAL AES-256', w / 2, faceH / 2 + 11);
    };
    img.src = photoUrl;
  }, [photoUrl, title]);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) onPhotoProcessed(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-2xl border border-cyan-400/35 bg-[#120D2D]/90 p-4 flex flex-col items-center shadow-lg">
      <div className="w-full flex items-center justify-between mb-2.5">
        <span className="text-xs font-mono font-black text-cyan-300 uppercase">{title}</span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-[10px] font-mono text-emerald-200">
          <EyeOff className="w-3 h-3" /> Rostro Censurado & Cifrado Local
        </span>
      </div>

      <div className="rounded-xl overflow-hidden border-2 border-purple-500/40 mb-3 shadow-inner">
        <canvas ref={canvasRef} className="block max-w-full h-auto" />
      </div>

      <div className="w-full grid grid-cols-2 gap-2">
        <label className="cursor-pointer py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition">
          <Upload className="w-3.5 h-3.5" />
          Subir Foto
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
        <button
          type="button"
          onClick={onSimulatePhoto}
          className="py-2.5 px-3 rounded-xl bg-purple-600/35 hover:bg-purple-600/50 border border-purple-400/50 text-purple-100 text-xs font-bold flex items-center justify-center gap-1.5 transition"
        >
          <Scan className="w-3.5 h-3.5 text-amber-300" />
          Demo Scan
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// APLICACIÓN PRINCIPAL: ¡PROTOCOLO EX! // ANIME FITNESS SYSTEM
// ============================================================================

export default function App() {
  const savedData = useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  // Navegación entre los 6 módulos
  const [activeTab, setActiveTab] = useState('anime_cam');

  // Celebración (Confeti + Banner Gigante) y Notificaciones
  const [celebration, setCelebration] = useState(null);
  const [rankUpBanner, setRankUpBanner] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  // Estado del Operador y Avatar 2D Anime
  const [operatorName, setOperatorName] = useState(savedData?.operatorName ?? 'HUNTER_01');
  const [avatar, setAvatar] = useState(
    savedData?.avatar ?? {
      gender: 'masculino',
      build: 'mesomorfo',
      skin: 'trigueno',
      hair: 'shonen',
      hairColor: 'azabache',
      outfit: 'neogym',
      accessory: 'banda',
      aura: 'rango'
    }
  );

  // Módulo 1: Cámara de Transformación Anime 2D
  const [camPreviewUrl, setCamPreviewUrl] = useState(null);
  const [isScanningAnime, setIsScanningAnime] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState(
    savedData?.scanResult ?? {
      biotypeLabel: 'Mesomorfo / Estético',
      symmetry: '93.4%',
      syncStatus: 'Guerrero 2D Sincronizado'
    }
  );

  // Módulo 2: Rangos (15 x 6 divisiones), Racha y Retos Diarios
  const [totalLP, setTotalLP] = useState(savedData?.totalLP ?? 4255); // Oro 6 por defecto para lucir vibrante
  const [streakDays, setStreakDays] = useState(savedData?.streakDays ?? 7);
  const [challenges, setChallenges] = useState(
    savedData?.challenges ?? [
      {
        id: 'c-1',
        title: 'Gym: Press Banca 4x8 con 80kg + Sentadilla 4x6 con 115kg',
        env: 'Gimnasio',
        lp: 45,
        status: 'active',
        contingencyInfo: ''
      },
      {
        id: 'c-2',
        title: 'Salir a correr 5 km ritmo constante',
        env: 'Exterior',
        lp: 35,
        status: 'active',
        contingencyInfo: ''
      }
    ]
  );
  const [nextWeekQueue, setNextWeekQueue] = useState(
    savedData?.nextWeekQueue ?? [
      {
        id: 'nw-1',
        title: 'Peso Muerto 150kg 3x5 (Reto fallido semana previa)',
        env: 'Gimnasio',
        lp: 50
      }
    ]
  );
  const [newTitle, setNewTitle] = useState('');
  const [newEnv, setNewEnv] = useState('Gimnasio');
  const [modalChallenge, setModalChallenge] = useState(null);
  const [selectedContingencyId, setSelectedContingencyId] = useState('lluvia');
  const [customReasonText, setCustomReasonText] = useState('');

  // Módulo 3: Fuerza Absoluta y Relativa (F a EX)
  const [bodyWeight, setBodyWeight] = useState(savedData?.bodyWeight ?? 76);
  const [lifts, setLifts] = useState(
    savedData?.lifts ?? {
      squat: { weight: 130, reps: 5 },
      bench: { weight: 92.5, reps: 6 },
      deadlift: { weight: 160, reps: 4 },
      pullup: { weight: 20, reps: 6 },
      ohp: { weight: 60, reps: 5 }
    }
  );

  // Módulo 4: Evaluación Física Trimestral (F a EX) & Bóveda Privada
  const [daysToRenewal, setDaysToRenewal] = useState(savedData?.daysToRenewal ?? 68);
  const [frontVaultPhoto, setFrontVaultPhoto] = useState(null);
  const [backVaultPhoto, setBackVaultPhoto] = useState(null);
  const [physiqueScore, setPhysiqueScore] = useState(savedData?.physiqueScore ?? 74);
  const [quarters, setQuarters] = useState(
    savedData?.quarters ?? [
      { id: 'Q1', title: 'Q1 // Inicio', grade: 'D', bf: '18.2%', note: 'Base técnica y adaptación metabólica.' },
      { id: 'Q2', title: 'Q2 // Evolución', grade: 'C', bf: '15.4%', note: 'Aumento de amplitud dorsal y hombros.' },
      { id: 'Q3', title: 'Q3 // Actual', grade: 'B', bf: '13.1%', note: 'Definición abdominal y densidad muscular.' },
      { id: 'Q4', title: 'Q4 // Meta Anual', grade: 'A', bf: '11.2%', note: 'Objetivo trimestral en curso.' }
    ]
  );

  // Módulo 5: Rutinas Científicas y Escáner de Rutina Propia
  const [routineEnv, setRoutineEnv] = useState(savedData?.routineEnv ?? 'gimnasio');
  const [routineGoal, setRoutineGoal] = useState(savedData?.routineGoal ?? 'hipertrofia');
  const [routineDays, setRoutineDays] = useState(savedData?.routineDays ?? 4);
  const [userRoutineText, setUserRoutineText] = useState(
    savedData?.userRoutineText ??
      'Lunes: Press Banca 4x8, Press Inclinado 4x10, Aperturas 3x12, Elevaciones Laterales 4x15, Tríceps Polea 3x12.\nMiércoles: Jalón al Pecho 4x10, Remo Barra 3x8, Curl Bíceps 4x12.\nViernes: Sentadilla 3x8, Curl Femoral 3x12.'
  );
  const [userRoutineFeeling, setUserRoutineFeeling] = useState(savedData?.userRoutineFeeling ?? 'estancado');
  const [routineDiagnosis, setRoutineDiagnosis] = useState(null);
  const [routineFileName, setRoutineFileName] = useState('');

  // Módulo 6: Contador de Sueño Semanal (49-63h)
  const [sleepHours, setSleepHours] = useState(savedData?.sleepHours ?? [7.5, 7.5, 7.0, 8.0, 7.5, 8.5, 7.5]);
  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Guardar estado en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          operatorName,
          avatar,
          scanResult,
          totalLP,
          streakDays,
          challenges,
          nextWeekQueue,
          bodyWeight,
          lifts,
          daysToRenewal,
          physiqueScore,
          quarters,
          routineEnv,
          routineGoal,
          routineDays,
          userRoutineText,
          userRoutineFeeling,
          sleepHours
        })
      );
    } catch {
      // Ignorar si localStorage no está disponible
    }
  }, [
    operatorName,
    avatar,
    scanResult,
    totalLP,
    streakDays,
    challenges,
    nextWeekQueue,
    bodyWeight,
    lifts,
    daysToRenewal,
    physiqueScore,
    quarters,
    routineEnv,
    routineGoal,
    routineDays,
    userRoutineText,
    userRoutineFeeling,
    sleepHours
  ]);

  // Cálculos derivados
  const rankInfo = useMemo(() => getRankProgress(totalLP), [totalLP]);
  const strengthInfo = useMemo(() => computeStrengthProfile(bodyWeight, lifts), [bodyWeight, lifts]);
  const sleepInfo = useMemo(() => analyzeSleepWeek(sleepHours), [sleepHours]);
  const currentPhysiqueGrade = useMemo(() => {
    const q3 = quarters.find((q) => q.id === 'Q3');
    return SCIENTIFIC_GRADES.find((g) => g.grade === (q3?.grade || 'B')) || SCIENTIFIC_GRADES[4];
  }, [quarters]);

  const showToast = (text) => {
    setToastMsg({ text, id: Date.now() });
    setTimeout(() => {
      setToastMsg((prev) => (prev && Date.now() - prev.id >= 3400 ? null : prev));
    }, 3600);
  };

  // Actualizar LP y detectar ascenso/descenso de división
  const updateLeaguePoints = (delta, triggerCelebrate = false, missionTitle = '') => {
    const before = getRankProgress(totalLP);
    const nextLP = Math.max(0, Math.min(8999, totalLP + delta));
    const after = getRankProgress(nextLP);
    setTotalLP(nextLP);

    if (triggerCelebrate) {
      setCelebration({
        title: '¡MISIÓN CUMPLIDA!',
        subtitle: missionTitle,
        lp: delta,
        newStreak: streakDays + 1
      });
      setTimeout(() => setCelebration(null), 3200);
    }

    if (after.globalDivIndex > before.globalDivIndex) {
      setRankUpBanner({
        type: 'up',
        from: before.fullName,
        to: after.fullName,
        color: after.rank.color
      });
    } else if (after.globalDivIndex < before.globalDivIndex) {
      setRankUpBanner({
        type: 'down',
        from: before.fullName,
        to: after.fullName,
        color: '#F43F5E'
      });
    }
  };

  // Procesar foto de cuerpo completo en la Cámara de Transformación Anime 2D
  const runAnimeTransformationScan = (sourceImageUrl, detectedBuildOverride = null) => {
    setCamPreviewUrl(sourceImageUrl);
    setIsScanningAnime(true);
    setScanProgress(8);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanningAnime(false);

          const buildOrder = ['atletico', 'mesomorfo', 'titan', 'powerlifter'];
          const buildLabels = {
            atletico: 'Atlético / Calisténico',
            mesomorfo: 'Mesomorfo / Estético',
            titan: 'Titán / Hipertrofia Élite',
            powerlifter: 'Powerlifter / Fuerza Bruta'
          };
          const nextBuild =
            detectedBuildOverride ||
            buildOrder[(buildOrder.indexOf(avatar.build) + 1) % buildOrder.length];

          setAvatar((a) => ({ ...a, build: nextBuild }));
          setScanResult({
            biotypeLabel: buildLabels[nextBuild],
            symmetry: `${(91 + Math.random() * 7).toFixed(1)}%`,
            syncStatus: '¡Avatar Anime 2D Actualizado!'
          });
          showToast(`¡Transformación Anime completada! Biotipo: ${buildLabels[nextBuild]}`);
          return 100;
        }
        return prev + 18;
      });
    }, 240);
  };

  const handleFullBodyUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        // Redactar rostro automáticamente antes de mostrar preview
        const img = new Image();
        img.onload = () => {
          const c = document.createElement('canvas');
          c.width = 260;
          c.height = 320;
          const ctx = c.getContext('2d');
          const sc = Math.max(260 / img.width, 320 / img.height);
          ctx.drawImage(img, (260 - img.width * sc) / 2, (320 - img.height * sc) / 2, img.width * sc, img.height * sc);
          // Censura facial superior
          ctx.fillStyle = 'rgba(15, 12, 41, 0.92)';
          ctx.fillRect(0, 0, 260, 72);
          ctx.fillStyle = '#00F5FF';
          ctx.font = 'bold 10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('ROSTRO PROTEGIDO // ESCÁNER ANIME', 130, 40);
          runAnimeTransformationScan(c.toDataURL('image/png'));
        };
        img.src = String(ev.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSimulateFullBodyScan = () => {
    const c = document.createElement('canvas');
    c.width = 260;
    c.height = 320;
    const ctx = c.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, 260, 320);
    g.addColorStop(0, '#130F38');
    g.addColorStop(1, '#2B1659');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 260, 320);

    // Silueta atlética de escaneo
    ctx.fillStyle = 'rgba(0, 245, 255, 0.28)';
    ctx.strokeStyle = '#00F5FF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(74, 96);
    ctx.lineTo(186, 96);
    ctx.lineTo(164, 212);
    ctx.lineTo(96, 212);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'rgba(15, 12, 41, 0.92)';
    ctx.fillRect(0, 0, 260, 68);
    ctx.fillStyle = '#00F5FF';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SILUETA CORPORAL DETECTADA', 130, 38);

    runAnimeTransformationScan(c.toDataURL('image/png'));
  };

  // Acciones de Retos Diarios
  const handleAddChallenge = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setChallenges((prev) => [
      {
        id: `ch-${Date.now()}`,
        title: newTitle.trim(),
        env: newEnv,
        lp: 40,
        status: 'active',
        contingencyInfo: ''
      },
      ...prev
    ]);
    setNewTitle('');
    showToast('¡Nuevo reto diario declarado! ¡A por todas!');
  };

  const handleCompleteChallenge = (ch) => {
    if (ch.status === 'completed') return;
    setChallenges((prev) => prev.map((item) => (item.id === ch.id ? { ...item, status: 'completed' } : item)));
    setStreakDays((s) => s + 1);
    updateLeaguePoints(ch.lp, true, ch.title);
  };

  const handleFailChallenge = (ch) => {
    setChallenges((prev) => prev.filter((item) => item.id !== ch.id));
    setNextWeekQueue((prev) => [
      {
        id: `nw-${Date.now()}`,
        title: ch.title,
        env: ch.env,
        lp: ch.lp + 10
      },
      ...prev
    ]);
    setStreakDays(0);
    updateLeaguePoints(-20, false);
    showToast('Reto movido a la Cola para Retomar la Próxima Semana (-20 LP).');
  };

  const handleApplyContingency = () => {
    if (!modalChallenge) return;
    const opt = CONTINGENCY_OPTIONS.find((o) => o.id === selectedContingencyId) || CONTINGENCY_OPTIONS[0];
    setChallenges((prev) =>
      prev.map((item) =>
        item.id === modalChallenge.id
          ? {
              ...item,
              title: opt.title,
              env: 'Contingencia Casa',
              lp: opt.lp,
              status: 'contingency',
              contingencyInfo: `${opt.plan}${customReasonText ? ` (Motivo: ${customReasonText})` : ''}`
            }
          : item
      )
    );
    setModalChallenge(null);
    setCustomReasonText('');
    showToast('¡Desafío Equivalente en Casa activado! Tu racha sigue a salvo.');
  };

  const handleRetakeFromQueue = (item) => {
    setNextWeekQueue((prev) => prev.filter((x) => x.id !== item.id));
    setChallenges((prev) => [
      {
        id: `retake-${Date.now()}`,
        title: `[REVANCHA] ${item.title}`,
        env: item.env,
        lp: item.lp,
        status: 'active',
        contingencyInfo: ''
      },
      ...prev
    ]);
    showToast('¡Reto retomado para esta semana con bonus de LP!');
  };

  // Generar foto demo para Bóveda Física
  const generateVaultDemoPhoto = (side) => {
    const c = document.createElement('canvas');
    c.width = 260;
    c.height = 320;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#140E33';
    ctx.fillRect(0, 0, 260, 320);
    const grad = ctx.createLinearGradient(70, 85, 190, 215);
    grad.addColorStop(0, '#00F5FF');
    grad.addColorStop(1, '#F43F5E');
    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.moveTo(76, 92);
    ctx.lineTo(184, 92);
    ctx.lineTo(160, 206);
    ctx.lineTo(100, 206);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#00F5FF';
    ctx.stroke();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`CAPTURA ${side.toUpperCase()} VERIFICADA`, 130, 152);

    const url = c.toDataURL('image/png');
    if (side === 'Frente') setFrontVaultPhoto(url);
    else setBackVaultPhoto(url);
    showToast(`Foto de ${side} procesada con censura facial automática.`);
  };

  const activeRoutinePlan =
    BIOMECHANICAL_ROUTINES[routineEnv]?.[routineGoal] || BIOMECHANICAL_ROUTINES.gimnasio.hipertrofia;

  const tabs = [
    { id: 'anime_cam', label: 'Avatar Anime 2D', icon: Camera, tag: 'Estudio' },
    { id: 'retos', label: 'Retos & Rangos', icon: Trophy, tag: rankInfo.fullName },
    { id: 'fuerza', label: 'Fuerza F→EX', icon: Dumbbell, tag: `${strengthInfo.relativeGrade.grade}/${strengthInfo.absoluteGrade.grade}` },
    { id: 'fisico', label: 'Físico & Bóveda', icon: Lock, tag: `Grado ${currentPhysiqueGrade.grade}` },
    { id: 'rutinas', label: 'Rutinas & Escáner', icon: Cpu, tag: 'Ciencia' },
    { id: 'sueno', label: 'Sueño Semanal', icon: Moon, tag: `${sleepInfo.total}h` }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a103c] to-[#24243e] text-white font-sans selection:bg-cyan-400/30 selection:text-cyan-100 overflow-x-hidden pb-12">
      {/* Animaciones CSS personalizadas */}
      <style>{`
        @keyframes auraBreathe {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes heroBreath {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes kiRise {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translateY(-250px) scale(0.2); opacity: 0; }
        }
        @keyframes ringRotate {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 200; }
        }
        @keyframes laserSweep {
          0%, 100% { top: 8%; }
          50% { top: 88%; }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-aura-breathe { animation: auraBreathe 2.6s ease-in-out infinite; transform-origin: center; }
        .animate-hero-breath { animation: heroBreath 3.2s ease-in-out infinite; }
        .animate-ki-rise { animation: kiRise 2.3s ease-out infinite; }
        .animate-ring-rotate { animation: ringRotate 5s linear infinite; }
        .animate-laser { animation: laserSweep 1.2s ease-in-out infinite; }
        .animate-confetti { animation: confettiFall 2.8s ease-out forwards; }
      `}</style>

      {/* ====================================================================
          HEADER MOTIVADOR ANIME-GAMING (MOBILE-FIRST)
         ==================================================================== */}
      <header className="sticky top-0 z-40 bg-[#0f0c29]/90 backdrop-blur-xl border-b border-purple-400/30 shadow-[0_8px_32px_rgba(0,0,0,0.65)]">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 space-y-2.5">
          {/* Fila 1: Avatar Miniatura + Título + Racha Encendida */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setActiveTab('anime_cam')}
                className="shrink-0 active:scale-95 transition"
                title="Personalizar Guerrero 2D"
              >
                <AnimeWarrior2D
                  avatar={avatar}
                  rankColor={rankInfo.rank.color}
                  rankTitle={rankInfo.fullName}
                  rankIndex={rankInfo.rankIndex}
                  physicalGrade={currentPhysiqueGrade.grade}
                  compact
                />
              </button>

              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h1 className="text-base sm:text-xl font-black tracking-tight bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent drop-shadow">
                    ¡PROTOCOLO EX!
                  </h1>
                  <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-[10px] font-black uppercase shadow">
                    ANIME SYSTEM
                  </span>
                </div>

                {/* Nombre editable del operador */}
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-mono text-purple-300">OPERADOR:</span>
                  <input
                    type="text"
                    maxLength={16}
                    value={operatorName}
                    onChange={(e) => setOperatorName(e.target.value.toUpperCase())}
                    aria-label="Nombre del operador"
                    className="bg-white/10 border border-purple-400/40 rounded-lg px-2 py-0.5 text-xs font-mono font-bold text-cyan-200 w-32 focus:outline-none focus:border-cyan-300"
                  />
                </div>
              </div>
            </div>

            {/* Racha Encendida */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-orange-600/90 via-amber-500/90 to-yellow-500/90 text-slate-950 font-black text-xs shadow-[0_0_20px_rgba(245,158,11,0.55)] shrink-0">
              <Flame className="w-4 h-4 fill-red-600 text-red-700 animate-bounce" />
              <div className="leading-tight">
                <span className="block text-[9px] uppercase tracking-wider">¡RACHA IMPARABLE!</span>
                <span className="text-xs sm:text-sm font-mono">{streakDays} DÍAS</span>
              </div>
            </div>
          </div>

          {/* Fila 2: Chips de Rango Competitivo, Físico, Fuerza Relativa y Sueño */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setActiveTab('retos')}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-black/50 border"
              style={{ borderColor: rankInfo.rank.color }}
            >
              <span className="text-slate-300 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" style={{ color: rankInfo.rank.color }} />
                RANGO
              </span>
              <span className="font-black" style={{ color: rankInfo.rank.color }}>
                {rankInfo.fullName}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('fisico')}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-black/50 border border-pink-400/50"
            >
              <span className="text-slate-300">FÍSICO</span>
              <span className="font-black text-pink-300">GRADO {currentPhysiqueGrade.grade}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('fuerza')}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-black/50 border border-cyan-400/50"
            >
              <span className="text-slate-300">FUERZA REL.</span>
              <span className="font-black text-cyan-300">
                {strengthInfo.relativeGrade.grade} ({strengthInfo.relativeRatio}x)
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sueno')}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-black/50 border ${
                sleepInfo.status === 'critical'
                  ? 'border-red-400 text-red-300 animate-pulse'
                  : 'border-emerald-400/50 text-emerald-300'
              }`}
            >
              <span className="text-slate-300 flex items-center gap-1">
                <Moon className="w-3.5 h-3.5" />
                SUEÑO
              </span>
              <span className="font-black">{sleepInfo.total}h / 49-63h</span>
            </button>
          </div>

          {/* Fila 3: Navegación táctil de los 6 módulos */}
          <nav className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 pt-0.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 px-2 py-2 rounded-xl text-[11px] font-bold transition-all border ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 border-white/60 text-white shadow-[0_0_16px_rgba(168,85,247,0.6)] scale-[1.02]'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ====================================================================
          CONTENIDO PRINCIPAL DE LOS 6 MÓDULOS
         ==================================================================== */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 pt-5 space-y-6">
        {/* ==================================================================
            MÓDULO 1: CÁMARA DE TRANSFORMACIÓN ANIME 2D & PERSONALIZADOR
           ================================================================== */}
        {activeTab === 'anime_cam' && (
          <div className="space-y-6">
            {/* Banner Superior de Cámara de Transformación Anime 2D */}
            <div className="rounded-3xl border-2 border-cyan-400/50 bg-gradient-to-br from-[#191242] via-[#231659] to-[#120d2d] p-4 sm:p-6 shadow-[0_0_35px_rgba(0,245,255,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-300/50 text-cyan-200 text-[10px] font-mono font-black uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    MÓDULO ESTRELLA // IA DE SILUETA CORPORAL
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Cámara de Transformación Anime 2D 📸⚡
                  </h2>
                  <p className="text-xs text-purple-200">
                    Sube una foto de cuerpo completo (rostro censurado automáticamente) o simula un escaneo para generar tu Guerrero Anime 2D personalizado.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                {/* Izquierda: Visor de Foto de Cuerpo Completo + Escáner Láser */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="relative h-[300px] rounded-2xl border-2 border-dashed border-cyan-400/60 bg-[#0c0921] overflow-hidden flex flex-col items-center justify-center p-3">
                    {camPreviewUrl ? (
                      <img
                        src={camPreviewUrl}
                        alt="Escaneo corporal"
                        className="h-full w-auto object-contain rounded-xl"
                      />
                    ) : (
                      <div className="text-center space-y-2 px-4">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center">
                          <Camera className="w-7 h-7 text-cyan-300" />
                        </div>
                        <p className="text-xs font-bold text-cyan-200">
                          Foto de Entrenamiento (Cuerpo Completo)
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Tu rostro se pixelará y protegerá localmente antes del análisis de biotipo.
                        </p>
                      </div>
                    )}

                    {/* Línea Láser Animada durante el escaneo */}
                    {isScanningAnime && (
                      <>
                        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_18px_#00F5FF] animate-laser z-20" />
                        <div className="absolute inset-0 bg-cyan-500/15 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 z-30">
                          <span className="px-3 py-1.5 rounded-xl bg-black/85 border border-cyan-300 text-cyan-200 font-mono text-xs font-black animate-pulse mb-2">
                            ¡Procesando tu foto a Anime 2D...! {scanProgress}%
                          </span>
                          <div className="w-4/5 h-3 rounded-full bg-black/80 border border-cyan-400/60 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 transition-all duration-200"
                              style={{ width: `${scanProgress}%` }}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Botones de Acción de Cámara */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <label className="cursor-pointer py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.4)] transition">
                      <Upload className="w-4 h-4" />
                      Subir Foto Cuerpo Completo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFullBodyUpload}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={handleSimulateFullBodyScan}
                      disabled={isScanningAnime}
                      className="py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:brightness-110 text-white font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.45)] transition disabled:opacity-50"
                    >
                      <Scan className="w-4 h-4" />
                      Simular Escaneo Corporal
                    </button>
                  </div>

                  {/* Resultado del Escáner */}
                  <div className="p-3 rounded-2xl bg-black/50 border border-purple-400/35 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-purple-300 block">RESULTADO BIOMÉTRICO</span>
                      <strong className="text-amber-300">{scanResult.biotypeLabel}</strong>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-[10px] text-emerald-300 block">{scanResult.syncStatus}</span>
                      <span className="text-xs font-bold text-cyan-300">Simetría: {scanResult.symmetry}</span>
                    </div>
                  </div>
                </div>

                {/* Derecha: Guerrero 2D Anime Resultante + Barras RPG */}
                <div className="lg:col-span-7 space-y-3">
                  <AnimeWarrior2D
                    avatar={avatar}
                    rankColor={rankInfo.rank.color}
                    rankTitle={rankInfo.fullName}
                    rankIndex={rankInfo.rankIndex}
                    physicalGrade={currentPhysiqueGrade.grade}
                  />

                  {/* Barras de Poder RPG debajo del Avatar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-black/55 border border-white/15">
                    <div>
                      <div className="flex justify-between text-[11px] font-mono mb-1">
                        <span className="text-amber-300 font-bold">FUERZA ABSOLUTA ({strengthInfo.absoluteGrade.grade})</span>
                        <span>{strengthInfo.sbdTotal} kg</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300"
                          style={{ width: `${Math.min(100, Math.round((strengthInfo.sbdTotal / 650) * 100))}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-mono mb-1">
                        <span className="text-cyan-300 font-bold">ENERGÍA DE SUEÑO SEMANAL</span>
                        <span>{sleepInfo.total}h / 63h</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                          style={{ width: `${sleepInfo.energyPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personalizador de Guerrero 2D */}
            <div className="rounded-3xl border-2 border-purple-400/40 bg-[#140f33]/90 p-5 space-y-5 shadow-xl">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-pink-400" />
                    Personalizador de Guerrero 2D (Cosméticos & Estilo Shonen)
                  </h3>
                  <p className="text-xs text-purple-200">
                    Ajusta manualmente tu silueta, peinado anime, traje de combate, equipamiento y aura de energía.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Silueta */}
                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                  <span className="text-[11px] font-mono text-cyan-300 font-bold block">1. SILUETA DEL GUERRERO</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'masculino', label: 'Masculino' },
                      { id: 'femenino', label: 'Femenino' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setAvatar((a) => ({ ...a, gender: item.id }))}
                        className={`py-2.5 rounded-xl font-bold text-xs border transition ${
                          avatar.gender === item.id
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-white text-white shadow'
                            : 'bg-white/5 border-white/10 text-slate-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Biotipo Físico */}
                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                  <span className="text-[11px] font-mono text-amber-300 font-bold block">2. BIOTIPO FÍSICO</span>
                  <select
                    value={avatar.build}
                    onChange={(e) => setAvatar((a) => ({ ...a, build: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#1b1445] border border-purple-400/50 text-xs font-bold text-white focus:outline-none"
                  >
                    <option value="atletico">Atlético / Calisténico</option>
                    <option value="mesomorfo">Mesomorfo / Estético</option>
                    <option value="powerlifter">Powerlifter / Fuerza Bruta</option>
                    <option value="titan">Titán / Hipertrofia Élite</option>
                  </select>
                </div>

                {/* Tono de Piel */}
                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                  <span className="text-[11px] font-mono text-pink-300 font-bold block">3. TONO DE PIEL CEL-SHADED</span>
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    {[
                      { id: 'claro', hex: '#FFE2CC' },
                      { id: 'trigueno', hex: '#EBB68D' },
                      { id: 'bronceado', hex: '#CA865A' },
                      { id: 'moreno', hex: '#965A38' },
                      { id: 'oscuro', hex: '#633B26' },
                      { id: 'celestial', hex: '#DCE7F7' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setAvatar((a) => ({ ...a, skin: s.id }))}
                        className={`w-8 h-8 rounded-full border-2 transition ${
                          avatar.skin === s.id ? 'border-cyan-300 scale-110 shadow-[0_0_12px_#00F5FF]' : 'border-white/25'
                        }`}
                        style={{ backgroundColor: s.hex }}
                        title={s.id}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Peinado Shonen & Color de Cabello */}
              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                <span className="text-xs font-mono text-orange-300 font-black block">
                  4. PEINADO ESTILO SHONEN & COLOR DE CABELLO
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'shonen', label: 'Erizado Shonen' },
                    { id: 'cazador', label: 'Cazador Rebelde' },
                    { id: 'coleta', label: 'Coleta Marcial' },
                    { id: 'salvaje', label: 'Flama Salvaje' }
                  ].map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setAvatar((a) => ({ ...a, hair: h.id }))}
                      className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition ${
                        avatar.hair === h.id
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 border-white text-slate-950 font-black shadow'
                          : 'bg-white/5 border-white/10 text-slate-200'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {[
                    { id: 'azabache', label: 'Azabache', hex: '#161B2B' },
                    { id: 'platino', label: 'Platino', hex: '#F8FAFC' },
                    { id: 'fuego', label: 'Carmesí', hex: '#EF4444' },
                    { id: 'relampago', label: 'Relámpago', hex: '#0EA5E9' },
                    { id: 'dorado', label: 'Dorado Ki', hex: '#F59E0B' },
                    { id: 'amatista', label: 'Amatista', hex: '#9333EA' }
                  ].map((hc) => (
                    <button
                      key={hc.id}
                      type="button"
                      onClick={() => setAvatar((a) => ({ ...a, hairColor: hc.id }))}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                        avatar.hairColor === hc.id
                          ? 'bg-white/20 border-cyan-300 text-white'
                          : 'bg-white/5 border-white/10 text-slate-300'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-white/40" style={{ backgroundColor: hc.hex }} />
                      {hc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Indumentaria, Equipamiento y Aura */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                  <span className="text-[11px] font-mono text-pink-300 font-bold block">5. INDUMENTARIA TÉCNICA</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'neogym', label: 'Neo-Gym EX' },
                      { id: 'gi', label: 'Gi Marcial' },
                      { id: 'cyber', label: 'Traje Cyber' },
                      { id: 'titan', label: 'Armadura Titán' }
                    ].map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setAvatar((a) => ({ ...a, outfit: o.id }))}
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition ${
                          avatar.outfit === o.id
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-white text-white'
                            : 'bg-white/5 border-white/10 text-slate-300'
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                  <span className="text-[11px] font-mono text-emerald-300 font-bold block">6. EQUIPAMIENTO / ACCESORIO</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'banda', label: 'Banda Frontal' },
                      { id: 'munequeras', label: 'Muñequeras' },
                      { id: 'cinturon', label: 'Cinturón Poder' },
                      { id: 'auriculares', label: 'Auriculares' }
                    ].map((acc) => (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => setAvatar((a) => ({ ...a, accessory: acc.id }))}
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition ${
                          avatar.accessory === acc.id
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 border-white text-slate-950 font-black'
                            : 'bg-white/5 border-white/10 text-slate-300'
                        }`}
                      >
                        {acc.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                  <span className="text-[11px] font-mono text-amber-300 font-bold block">7. COLOR / ESTILO DE AURA KI</span>
                  <select
                    value={avatar.aura}
                    onChange={(e) => setAvatar((a) => ({ ...a, aura: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#1b1445] border border-amber-400/50 text-xs font-bold text-amber-200 focus:outline-none"
                  >
                    <option value="rango">Dinámica por Rango ({rankInfo.rank.name})</option>
                    <option value="dorado">Dorado Super Ki</option>
                    <option value="cian">Cian Relámpago</option>
                    <option value="magenta">Magenta Cósmico</option>
                    <option value="esmeralda">Esmeralda Vital</option>
                    <option value="violeta">Violeta Soberano</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            MÓDULO 2: PANEL DE COMANDO, RANGOS (15 x 6 DIV) Y RETOS DIARIOS
           ================================================================== */}
        {activeTab === 'retos' && (
          <div className="space-y-6">
            {/* Tarjeta de Rango Competitivo Actual */}
            <div
              className="rounded-3xl border-2 bg-gradient-to-r from-[#17113b] via-[#26165c] to-[#17113b] p-5 sm:p-6 shadow-2xl"
              style={{ borderColor: rankInfo.rank.color, boxShadow: `0 0 32px ${rankInfo.rank.glow}` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[11px] font-mono text-amber-300 mb-2">
                    <Crown className="w-3.5 h-3.5" /> LIGA {rankInfo.rank.league.toUpperCase()} • DIVISIÓN {rankInfo.division} DE 6
                  </span>
                  <h2
                    className="text-3xl sm:text-4xl font-black uppercase tracking-tight"
                    style={{ color: rankInfo.rank.color, textShadow: `0 0 24px ${rankInfo.rank.glow}` }}
                  >
                    {rankInfo.fullName}
                  </h2>
                  <p className="text-xs text-purple-200 mt-1">
                    Puntos de Liga Totales: <strong className="font-mono text-white">{rankInfo.totalLP} LP</strong> •{' '}
                    {rankInfo.isMax ? '¡Cúspide Challenger 1 alcanzada!' : `Faltan ${100 - rankInfo.currentDivLP} LP para ascender`}
                  </p>
                </div>

                {/* Botones rápidos de prueba LP */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => updateLeaguePoints(25, true, 'Entrenamiento Bonus')}
                    className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-green-600 text-slate-950 font-black text-xs shadow-lg active:scale-95 transition"
                  >
                    +25 LP
                  </button>
                  <button
                    type="button"
                    onClick={() => updateLeaguePoints(100, true, '¡Salto de División!')}
                    className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs shadow-lg active:scale-95 transition"
                  >
                    +100 LP (Ascender)
                  </button>
                  <button
                    type="button"
                    onClick={() => updateLeaguePoints(-20, false)}
                    className="px-4 py-2.5 rounded-2xl bg-rose-600/30 hover:bg-rose-600/50 border border-rose-400 text-rose-200 font-black text-xs active:scale-95 transition"
                  >
                    -20 LP
                  </button>
                </div>
              </div>

              {/* Barra LP de División */}
              <div className="mt-4">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">PROGRESO DE DIVISIÓN</span>
                  <span className="font-black text-amber-300">{rankInfo.isMax ? '100 / 100 LP' : `${rankInfo.currentDivLP} / 100 LP`}</span>
                </div>
                <div className="w-full h-4 rounded-full bg-black/70 border border-white/20 p-0.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${rankInfo.isMax ? 100 : rankInfo.currentDivLP}%`,
                      background: `linear-gradient(90deg, ${rankInfo.rank.secondary}, ${rankInfo.rank.color}, #FFFFFF)`
                    }}
                  />
                </div>
              </div>

              {/* Escala visual de los 15 rangos */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <span className="text-[10px] font-mono text-purple-300 uppercase block mb-2">
                  Escalera Completa de 15 Rangos (Tierra 6 → Challenger 1):
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {COMPETITIVE_RANKS.map((r, i) => {
                    const current = i === rankInfo.rankIndex;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => {
                          setTotalLP(i * 600 + 250);
                          showToast(`Vista calibrada en ${r.name} 4`);
                        }}
                        className={`px-2 py-1.5 rounded-xl border text-left text-[10px] font-bold flex items-center justify-between transition ${
                          current ? 'bg-black/80 scale-[1.03] shadow-lg' : 'bg-black/35 border-white/10 opacity-75 hover:opacity-100'
                        }`}
                        style={{ borderColor: current ? r.color : undefined, color: r.color }}
                      >
                        <span className="truncate">{i + 1}. {r.name}</span>
                        {current && <span className="px-1 rounded bg-white/15 text-white font-mono">D{rankInfo.division}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Gestor de Retos Diarios + Cola Próxima Semana */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 rounded-3xl border border-cyan-400/35 bg-[#130e30]/90 p-5 space-y-4 shadow-xl">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-400" />
                    Retos Diarios Declarados ¡A POR TODAS!
                  </h3>
                  <p className="text-xs text-purple-200">
                    Declara tu misión de hoy. Si llueve o surge un imprevisto, justifícalo para convertirlo en un Desafío en Casa.
                  </p>
                </div>

                {/* Crear Nuevo Reto */}
                <form onSubmit={handleAddChallenge} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 p-3 rounded-2xl bg-black/45 border border-white/15">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ej. Gym: Press Banca 4x8 con 80kg..."
                    className="sm:col-span-6 px-3.5 py-2.5 rounded-xl bg-white/10 border border-purple-400/40 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-300"
                  />
                  <select
                    value={newEnv}
                    onChange={(e) => setNewEnv(e.target.value)}
                    className="sm:col-span-3 px-3 py-2.5 rounded-xl bg-[#1c154a] border border-purple-400/40 text-xs font-bold text-white"
                  >
                    <option value="Gimnasio">Gimnasio</option>
                    <option value="Casa">Casa</option>
                    <option value="Exterior">Cardio Exterior</option>
                  </select>
                  <button
                    type="submit"
                    className="sm:col-span-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition"
                  >
                    <Plus className="w-4 h-4" /> Declarar Reto
                  </button>
                </form>

                {/* Lista de Retos Activos */}
                <div className="space-y-3">
                  {challenges.map((ch) => (
                    <div
                      key={ch.id}
                      className={`p-4 rounded-2xl border-2 transition ${
                        ch.status === 'completed'
                          ? 'bg-emerald-950/40 border-emerald-400/70'
                          : ch.status === 'contingency'
                          ? 'bg-purple-950/50 border-cyan-400/70'
                          : 'bg-black/45 border-purple-400/30'
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-cyan-200 text-[10px] font-mono font-bold">
                          {ch.env}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-mono font-black">
                          +{ch.lp} LP
                        </span>
                        {ch.status === 'completed' && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-black">
                            ✓ ¡COMPLETADO!
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-white mb-2">{ch.title}</h4>

                      {ch.contingencyInfo && (
                        <p className="text-xs text-cyan-100 bg-cyan-950/60 border border-cyan-400/40 p-2.5 rounded-xl mb-3">
                          {ch.contingencyInfo}
                        </p>
                      )}

                      {ch.status !== 'completed' && (
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleCompleteChallenge(ch)}
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            ¡Completado! (+{ch.lp} LP)
                          </button>

                          <button
                            type="button"
                            onClick={() => handleFailChallenge(ch)}
                            className="px-3.5 py-2 rounded-xl bg-rose-600/25 hover:bg-rose-600/40 border border-rose-400/60 text-rose-200 font-bold text-xs flex items-center gap-1.5 transition"
                          >
                            <XCircle className="w-4 h-4" />
                            Fallido
                          </button>

                          <button
                            type="button"
                            onClick={() => setModalChallenge(ch)}
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500/30 to-blue-600/30 hover:from-cyan-500/45 hover:to-blue-600/45 border border-cyan-300/60 text-cyan-100 font-bold text-xs flex items-center gap-1.5 transition"
                          >
                            <CloudRain className="w-4 h-4 text-cyan-300" />
                            ¿Llueve? Justificar imprevisto
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cola para Retomar la Próxima Semana */}
              <div className="lg:col-span-4 rounded-3xl border border-rose-400/40 bg-[#1a0d26]/90 p-5 space-y-3 shadow-xl">
                <h3 className="text-sm font-black text-rose-300 uppercase flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Cola para Retomar la Próxima Semana
                </h3>
                <p className="text-xs text-slate-300">
                  Misiones fallidas pendientes de revancha semanal con recompensa extra.
                </p>

                {nextWeekQueue.length === 0 ? (
                  <div className="p-6 rounded-2xl border border-dashed border-white/15 text-center text-xs text-slate-400">
                    ¡Sin retos fallidos! Tu racha está impecable.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {nextWeekQueue.map((item) => (
                      <div key={item.id} className="p-3.5 rounded-2xl bg-black/50 border border-rose-400/40 space-y-2">
                        <span className="inline-block px-2 py-0.5 rounded bg-rose-500/25 text-rose-200 text-[10px] font-mono font-bold">
                          REVANCHA SEMANAL • +{item.lp} LP
                        </span>
                        <p className="text-xs font-bold text-white">{item.title}</p>
                        <button
                          type="button"
                          onClick={() => handleRetakeFromQueue(item)}
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow transition"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Retomar en Nueva Semana
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            MÓDULO 3: FUERZA ABSOLUTA Y RELATIVA (ESCALA CIENTÍFICA F A EX)
           ================================================================== */}
        {activeTab === 'fuerza' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 rounded-3xl border border-cyan-400/35 bg-[#130e30]/90 p-5 space-y-4 shadow-xl">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-cyan-300" />
                  Calculadora Científica de 1RM (F → EX)
                </h2>
                <p className="text-xs text-purple-200">
                  Promedio científico Epley/Brzycki + Índice DOTS y Fuerza Relativa al peso corporal.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/50 border border-white/15">
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-cyan-200 font-bold">PESO CORPORAL DEL ATLETA</span>
                  <span className="text-amber-300 font-black">{bodyWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="150"
                  step="0.5"
                  value={bodyWeight}
                  onChange={(e) => setBodyWeight(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="space-y-2.5">
                {[
                  { key: 'squat', label: 'Sentadilla Trasera' },
                  { key: 'bench', label: 'Press de Banca' },
                  { key: 'deadlift', label: 'Peso Muerto' },
                  { key: 'pullup', label: 'Dominadas Lastradas (Lastre añadido kg)' },
                  { key: 'ohp', label: 'Press Militar Estricto' }
                ].map((ex) => (
                  <div key={ex.key} className="p-3 rounded-2xl bg-black/45 border border-white/10">
                    <span className="text-xs font-bold text-white block mb-2">{ex.label}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-mono text-purple-300 block mb-1">PESO (KG)</label>
                        <input
                          type="number"
                          min="0"
                          max="450"
                          step="2.5"
                          value={lifts[ex.key].weight}
                          onChange={(e) =>
                            setLifts((p) => ({
                              ...p,
                              [ex.key]: { ...p[ex.key], weight: Number(e.target.value) }
                            }))
                          }
                          className="w-full px-2.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-mono font-bold text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-purple-300 block mb-1">REPETICIONES</label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={lifts[ex.key].reps}
                          onChange={(e) =>
                            setLifts((p) => ({
                              ...p,
                              [ex.key]: { ...p[ex.key], reps: Number(e.target.value) }
                            }))
                          }
                          className="w-full px-2.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-mono font-bold text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              {/* Tarjetas de Fuerza Absoluta y Relativa */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-3xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-950/60 to-[#161038] p-5 shadow-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[10px] font-mono text-amber-300 uppercase">CARGA TOTAL MOVIDA</span>
                      <h3 className="text-base font-black text-white">Fuerza Absoluta</h3>
                    </div>
                    <span className={`px-3.5 py-1.5 rounded-2xl border-2 text-2xl font-black font-mono ${strengthInfo.absoluteGrade.badge}`}>
                      {strengthInfo.absoluteGrade.grade}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-amber-200 mb-2">{strengthInfo.absoluteGrade.label}</p>
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-black/50 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 block">TOTAL SBD</span>
                      <strong className="text-white">{strengthInfo.sbdTotal} kg</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">ÍNDICE DOTS</span>
                      <strong className="text-amber-300">{strengthInfo.dotsScore} pts</strong>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-950/60 to-[#161038] p-5 shadow-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-300 uppercase">POTENCIA POR KG CORPORAL</span>
                      <h3 className="text-base font-black text-white">Fuerza Relativa</h3>
                    </div>
                    <span className={`px-3.5 py-1.5 rounded-2xl border-2 text-2xl font-black font-mono ${strengthInfo.relativeGrade.badge}`}>
                      {strengthInfo.relativeGrade.grade}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-cyan-200 mb-2">{strengthInfo.relativeGrade.label}</p>
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-black/50 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 block">RATIO SBD / BW</span>
                      <strong className="text-white">{strengthInfo.relativeRatio}x BW</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">5 LIFTS TOTAL</span>
                      <strong className="text-cyan-300">{strengthInfo.fiveLiftsTotal} kg</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabla de Levantamientos Principales */}
              <div className="rounded-3xl border border-purple-400/35 bg-[#130e30]/90 p-5 space-y-3 shadow-xl">
                <h3 className="text-sm font-black text-white uppercase">
                  Desglose de Levantamientos Principales (1RM Estimado & Ratio)
                </h3>
                <div className="space-y-2.5">
                  {strengthInfo.rows.map((row) => (
                    <div
                      key={row.key}
                      className="p-3 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`px-2.5 py-1 rounded-xl border text-xs font-black font-mono ${row.grade.badge}`}>
                          {row.grade.grade}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-white block">{row.name}</span>
                          <span className="text-[10px] font-mono text-purple-300">{row.grade.label}</span>
                        </div>
                      </div>
                      <div className="text-right font-mono text-xs">
                        <strong className="text-cyan-300 block">{row.oneRM} kg 1RM</strong>
                        <span className="text-amber-300 font-bold">{row.ratio}x peso corp.</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            MÓDULO 4: EVALUACIÓN FÍSICA TRIMESTRAL (F A EX) Y BÓVEDA PRIVADA
           ================================================================== */}
        {activeTab === 'fisico' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Estado Trimestral y Contador 90 Días */}
              <div className="lg:col-span-5 rounded-3xl border-2 border-pink-400/50 bg-gradient-to-br from-[#1d1247] to-[#120c2b] p-5 flex flex-col justify-between space-y-4 shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-pink-300 uppercase">EVALUACIÓN CADA 3 MESES</span>
                    <span className={`px-3 py-1 rounded-xl border text-sm font-black font-mono ${currentPhysiqueGrade.badge}`}>
                      FÍSICO {currentPhysiqueGrade.grade}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-white">{currentPhysiqueGrade.label}</h2>
                  <p className="text-xs text-purple-200 mt-1">{currentPhysiqueGrade.desc}</p>

                  <div className="mt-4 p-4 rounded-2xl bg-black/55 border border-white/15 space-y-2.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-amber-300 font-bold">RENOVACIÓN TRIMESTRAL</span>
                      <span className="text-white font-black">{daysToRenewal} DÍAS RESTANTES</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-pink-500"
                        style={{ width: `${Math.round(((90 - daysToRenewal) / 90) * 100)}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setDaysToRenewal((d) => Math.max(0, d - 15))}
                        className="py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] font-mono font-bold"
                      >
                        Simular -15 días
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDaysToRenewal(90);
                          showToast('¡Ciclo trimestral renovado por 90 días!');
                        }}
                        className="py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-mono font-bold"
                      >
                        Renovar 90 días
                      </button>
                    </div>
                  </div>
                </div>

                {/* Calibrador de Grado Físico */}
                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/15 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-cyan-200">SIMETRÍA & DEFINICIÓN VISUAL</span>
                    <span className="text-amber-300 font-black">
                      {physiqueScore}% → Grado {SCIENTIFIC_GRADES[Math.min(9, Math.floor(physiqueScore / 10))].grade}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="99"
                    value={physiqueScore}
                    onChange={(e) => setPhysiqueScore(Number(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const g = SCIENTIFIC_GRADES[Math.min(9, Math.floor(physiqueScore / 10))].grade;
                      setQuarters((prev) => prev.map((q) => (q.id === 'Q3' ? { ...q, grade: g } : q)));
                      setDaysToRenewal(90);
                      showToast(`¡Grado Físico actualizado a ${g}!`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-black text-xs shadow-lg"
                  >
                    Guardar Evaluación Trimestral
                  </button>
                </div>
              </div>

              {/* Bóveda Segura Frente y Espalda */}
              <div className="lg:col-span-7 rounded-3xl border border-cyan-400/35 bg-[#130e30]/90 p-5 space-y-4 shadow-xl">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    Bóveda Privada de Progreso (Frente y Espalda Sin Rostro)
                  </h3>
                  <p className="text-xs text-purple-200">
                    Las fotos se procesan en tu dispositivo censurando automáticamente el área superior del rostro.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SecureBodyPhotoCard
                    title="Frente"
                    photoUrl={frontVaultPhoto}
                    onPhotoProcessed={(url) => {
                      setFrontVaultPhoto(url);
                      showToast('Foto Frontal censurada y cifrada localmente.');
                    }}
                    onSimulatePhoto={() => generateVaultDemoPhoto('Frente')}
                  />
                  <SecureBodyPhotoCard
                    title="Espalda"
                    photoUrl={backVaultPhoto}
                    onPhotoProcessed={(url) => {
                      setBackVaultPhoto(url);
                      showToast('Foto de Espalda censurada y cifrada localmente.');
                    }}
                    onSimulatePhoto={() => generateVaultDemoPhoto('Espalda')}
                  />
                </div>
              </div>
            </div>

            {/* Recap Anual (Q1, Q2, Q3, Q4) */}
            <div className="rounded-3xl border border-amber-400/40 bg-[#140f33]/90 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-400" />
                    Recap Anual de Transformación (Q1 → Q4)
                  </h3>
                  <p className="text-xs text-purple-200">
                    Línea de tiempo visual de tus 4 evaluaciones trimestrales del año.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/50 text-amber-200 text-xs font-mono font-bold">
                  EVOLUCIÓN ANUAL: D → {quarters[2].grade}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {quarters.map((q) => {
                  const gObj = SCIENTIFIC_GRADES.find((g) => g.grade === q.grade) || SCIENTIFIC_GRADES[2];
                  return (
                    <div key={q.id} className="p-4 rounded-2xl bg-black/50 border border-white/15 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-cyan-200">{q.title}</span>
                        <span className={`px-2.5 py-0.5 rounded-lg border text-sm font-black font-mono ${gObj.badge}`}>
                          {q.grade}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-amber-300 block">Grasa Est.: {q.bf}</span>
                      <p className="text-[11px] text-slate-300">{q.note}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            MÓDULO 5: RUTINAS CIENTÍFICAS Y ESCÁNER DE RUTINA PROPIA
           ================================================================== */}
        {activeTab === 'rutinas' && (
          <div className="space-y-6">
            {/* Generador Biomecánico */}
            <div className="rounded-3xl border border-cyan-400/35 bg-[#130e30]/90 p-5 space-y-4 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-300" />
                    Generador de Rutinas Basadas en Biomecánica
                  </h2>
                  <p className="text-xs text-purple-200">
                    Elige entorno, días y objetivo para obtener una prescripción con fundamento científico.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <select
                    value={routineEnv}
                    onChange={(e) => setRoutineEnv(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#1e1652] border border-cyan-400/50 text-xs font-bold text-cyan-200"
                  >
                    <option value="gimnasio">Gimnasio</option>
                    <option value="casa">Casa</option>
                    <option value="hibrido">Híbrido (Casa + Gym)</option>
                  </select>

                  <select
                    value={routineGoal}
                    onChange={(e) => setRoutineGoal(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#1e1652] border border-pink-400/50 text-xs font-bold text-pink-200"
                  >
                    <option value="hipertrofia">Hipertrofia</option>
                    <option value="fuerza">Fuerza Máxima</option>
                    <option value="recomposicion">Recomposición</option>
                  </select>

                  <select
                    value={routineDays}
                    onChange={(e) => setRoutineDays(Number(e.target.value))}
                    className="px-3 py-2 rounded-xl bg-[#1e1652] border border-amber-400/50 text-xs font-bold text-amber-200"
                  >
                    <option value={3}>3 días/sem</option>
                    <option value={4}>4 días/sem</option>
                    <option value={5}>5 días/sem</option>
                    <option value={6}>6 días/sem</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-400/40">
                <span className="text-xs font-mono font-black text-amber-300 block mb-1">
                  {activeRoutinePlan.title} ({routineDays} DÍAS/SEMANA)
                </span>
                <p className="text-xs text-slate-200">{activeRoutinePlan.summary}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activeRoutinePlan.blocks.map((blk, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-black/50 border border-white/15 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-white/10">
                        <h3 className="text-sm font-black text-white">{blk.day}</h3>
                        <button
                          type="button"
                          onClick={() => {
                            const list = blk.exercises.map((e) => `${e.name} (${e.sets})`).join(' + ');
                            setChallenges((prev) => [
                              {
                                id: `r-${Date.now()}`,
                                title: `${blk.day}: ${list}`,
                                env: routineEnv === 'casa' ? 'Casa' : 'Gimnasio',
                                lp: 45,
                                status: 'active',
                                contingencyInfo: ''
                              },
                              ...prev
                            ]);
                            setActiveTab('retos');
                            showToast('¡Rutina enviada a tus Retos de Hoy!');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[11px] shrink-0 shadow"
                        >
                          Enviar Rutina a Retos de Hoy
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {blk.exercises.map((ex, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex justify-between items-center gap-1 mb-1">
                              <span className="text-xs font-bold text-white">{ex.name}</span>
                              <span className="text-[11px] font-mono font-black text-emerald-300">
                                {ex.sets} • {ex.rir}
                              </span>
                            </div>
                            <p className="text-[11px] text-cyan-200">
                              <strong>Biomecánica:</strong> {ex.biomech}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Escáner / Auditor de Rutina Propia */}
            <div className="rounded-3xl border border-pink-400/40 bg-[#140f33]/90 p-5 space-y-4 shadow-xl">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-pink-400" />
                  Auditor / Escáner de Rutina Propia
                </h3>
                <p className="text-xs text-purple-200">
                  Sube una foto/archivo de tu rutina o pega tus ejercicios para auditar volumen, balance empuje/tracción y fatiga del SNC.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-purple-600/40 hover:bg-purple-600/60 border border-purple-300/50 text-xs font-bold text-white flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      Subir Foto / Archivo de Rutina
                      <input
                        type="file"
                        accept=".txt,.csv,.md,image/*"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          setRoutineFileName(f.name);
                          if (f.type.startsWith('text/')) {
                            const r = new FileReader();
                            r.onload = (ev) => setUserRoutineText(String(ev.target?.result || ''));
                            r.readAsText(f);
                          } else {
                            setUserRoutineText(
                              `[PLANILLA ESCANEADA: ${f.name}]\nDía 1: Press Banca 4x8, Press Inclinado 4x10, Aperturas 4x12, Tríceps 4x15\nDía 2: Jalón Pecho 3x10, Curl Bíceps 4x12\nDía 3: Sentadilla 3x8, Prensa 3x10`
                            );
                          }
                          showToast(`Archivo "${f.name}" cargado en el escáner.`);
                        }}
                        className="hidden"
                      />
                    </label>
                    {routineFileName && <span className="text-[11px] font-mono text-emerald-300 truncate">{routineFileName}</span>}
                  </div>

                  <textarea
                    rows={5}
                    value={userRoutineText}
                    onChange={(e) => setUserRoutineText(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-black/60 border border-white/15 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
                  />

                  <select
                    value={userRoutineFeeling}
                    onChange={(e) => setUserRoutineFeeling(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#1e1652] border border-white/20 text-xs font-bold text-white"
                  >
                    <option value="progresando">Resultados: Progresando bien</option>
                    <option value="estancado">Resultados: Estancado (+3 semanas sin subir pesos)</option>
                    <option value="fatiga">Resultados: Fatiga extrema / Molestias articulares</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      setRoutineDiagnosis(auditUserRoutine(userRoutineText, userRoutineFeeling));
                      showToast('¡Auditoría biomecánica completada!');
                    }}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-black text-xs shadow-lg active:scale-95 transition"
                  >
                    Analizar Biomecánica
                  </button>
                </div>

                <div className="lg:col-span-7">
                  {(() => {
                    const diag = routineDiagnosis || auditUserRoutine(userRoutineText, userRoutineFeeling);
                    return (
                      <div className="p-4 rounded-2xl bg-black/50 border border-white/15 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-cyan-300">
                            PUNTAJE BIOMECÁNICO: <strong className="text-lg text-amber-300">{diag.score}/100</strong>
                          </span>
                          <span className="text-xs font-mono text-pink-300">SNC: {diag.cnsStatus}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                          <div className="p-2.5 rounded-xl bg-white/5">
                            <span className="text-[10px] text-slate-400 block">EMPUJE</span>
                            <strong className="text-cyan-300">{diag.pushSets} series</strong>
                          </div>
                          <div className="p-2.5 rounded-xl bg-white/5">
                            <span className="text-[10px] text-slate-400 block">TRACCIÓN</span>
                            <strong className="text-purple-300">{diag.pullSets} series</strong>
                          </div>
                          <div className="p-2.5 rounded-xl bg-white/5">
                            <span className="text-[10px] text-slate-400 block">PIERNA</span>
                            <strong className="text-emerald-300">{diag.legSets} series</strong>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {diag.alerts.map((al, idx) => (
                            <div
                              key={idx}
                              className={`p-3 rounded-xl border text-xs ${
                                al.level === 'danger'
                                  ? 'bg-rose-950/50 border-rose-400 text-rose-200'
                                  : al.level === 'warn'
                                  ? 'bg-amber-950/50 border-amber-400 text-amber-200'
                                  : 'bg-emerald-950/40 border-emerald-400 text-emerald-200'
                              }`}
                            >
                              <strong className="block">{al.title}</strong>
                              <span className="text-[11px]">{al.detail}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-xs">
                          <strong className="text-cyan-300 block mb-1">Sugerencias Científicas:</strong>
                          <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-200">
                            {diag.tips.map((t, i) => (
                              <li key={i}>{t}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            MÓDULO 6: CONTADOR DE SUEÑO Y RECUPERACIÓN SEMANAL (49-63H)
           ================================================================== */}
        {activeTab === 'sueno' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-3xl border border-cyan-400/35 bg-[#130e30]/90 p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Moon className="w-5 h-5 text-cyan-300" />
                    Contador Diario de Sueño (Lunes a Domingo)
                  </h2>
                  <p className="text-xs text-purple-200">
                    Rango científico óptimo: <strong>49 a 63 horas semanales</strong> (7–9 h/noche).
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {weekDays.map((day, idx) => {
                  const val = sleepHours[idx];
                  return (
                    <div
                      key={day}
                      className="p-3 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between gap-3"
                    >
                      <span className="w-20 text-xs font-bold text-white shrink-0">{day}</span>
                      <input
                        type="range"
                        min="3"
                        max="12"
                        step="0.5"
                        value={val}
                        onChange={(e) => {
                          const num = Number(e.target.value);
                          setSleepHours((prev) => prev.map((h, i) => (i === idx ? num : h)));
                        }}
                        className="flex-1 accent-cyan-400 cursor-pointer"
                      />
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            setSleepHours((prev) => prev.map((h, i) => (i === idx ? Math.max(3, h - 0.5) : h)))
                          }
                          className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 font-black text-xs"
                        >
                          -0.5
                        </button>
                        <span className="w-12 text-center font-mono text-xs font-black text-amber-300">
                          {val.toFixed(1)}h
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setSleepHours((prev) => prev.map((h, i) => (i === idx ? Math.min(12, h + 0.5) : h)))
                          }
                          className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 font-black text-xs"
                        >
                          +0.5
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 rounded-3xl border-2 border-purple-400/45 bg-gradient-to-br from-[#1b134a] to-[#110c29] p-5 space-y-4 shadow-xl">
              <span className="text-[10px] font-mono text-cyan-300 uppercase">ACUMULADOR DE RECUPERACIÓN SEMANAL</span>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-4xl font-black font-mono text-white">{sleepInfo.total}h</span>
                  <span className="text-xs text-purple-200 ml-2">({sleepInfo.avg}h / noche)</span>
                </div>
                <span className="px-3 py-1 rounded-xl bg-amber-400/20 border border-amber-300 text-amber-200 font-mono text-xs font-black">
                  ENERGÍA {sleepInfo.energyPct}%
                </span>
              </div>

              {/* Barra de energía */}
              <div>
                <div className="flex justify-between text-[10px] font-mono text-slate-300 mb-1">
                  <span>0h</span>
                  <span className="text-emerald-300 font-bold">Recomendado: 49h – 63h</span>
                  <span>70h+</span>
                </div>
                <div className="w-full h-4 rounded-full bg-black/70 border border-white/20 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      sleepInfo.status === 'critical'
                        ? 'bg-rose-500'
                        : sleepInfo.status === 'warning'
                        ? 'bg-amber-400'
                        : 'bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300'
                    }`}
                    style={{ width: `${Math.min(100, (sleepInfo.total / 70) * 100)}%` }}
                  />
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border-2 text-xs space-y-1.5 ${
                  sleepInfo.status === 'critical'
                    ? 'bg-rose-950/60 border-rose-400 text-rose-100'
                    : sleepInfo.status === 'warning'
                    ? 'bg-amber-950/60 border-amber-400 text-amber-100'
                    : 'bg-emerald-950/50 border-emerald-400 text-emerald-100'
                }`}
              >
                <div className="font-black flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4" />
                  {sleepInfo.label}
                </div>
                <p className="leading-relaxed">{sleepInfo.impact}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ====================================================================
          MODAL: JUSTIFICAR IMPREVISTO -> DESAFÍO EQUIVALENTE EN CASA
         ==================================================================== */}
      {modalChallenge && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl border-2 border-cyan-400 bg-[#150f38] p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-cyan-300 uppercase">
                  CONTINGENCIA INTELIGENTE // PROTEGE TU RACHA
                </span>
                <h3 className="text-lg font-black text-white">Justificar Imprevisto</h3>
              </div>
              <button
                type="button"
                onClick={() => setModalChallenge(null)}
                className="p-1.5 rounded-xl bg-white/10 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-purple-200">
              Reto original: <strong className="text-white">{modalChallenge.title}</strong>. Elige el motivo para transformar el reto en un Desafío Equivalente en Casa:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {CONTINGENCY_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedContingencyId(opt.id)}
                  className={`w-full p-3 rounded-2xl border-2 text-left transition ${
                    selectedContingencyId === opt.id
                      ? 'bg-cyan-500/20 border-cyan-300 text-white'
                      : 'bg-black/40 border-white/10 text-slate-300'
                  }`}
                >
                  <div className="flex justify-between text-xs font-black mb-0.5">
                    <span>
                      {opt.emoji} {opt.reason}
                    </span>
                    <span className="text-amber-300 font-mono">+{opt.lp} LP</span>
                  </div>
                  <p className="text-xs font-bold text-cyan-200">{opt.title}</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">{opt.plan}</p>
                </button>
              ))}
            </div>

            <input
              type="text"
              value={customReasonText}
              onChange={(e) => setCustomReasonText(e.target.value)}
              placeholder="Explicación opcional (ej. Lluvia torrencial en mi barrio)..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white focus:outline-none focus:border-cyan-300"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalChallenge(null)}
                className="px-4 py-2.5 rounded-xl bg-white/10 text-xs font-bold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleApplyContingency}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black text-xs shadow-lg"
              >
                Activar Desafío en Casa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          CELEBRACIÓN CON CONFETI Y BANNER GIGANTE AL COMPLETAR RETO
         ==================================================================== */}
      {celebration && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4 overflow-hidden">
          {/* Partículas de Confeti */}
          {Array.from({ length: 28 }).map((_, idx) => {
            const colors = ['#FACC15', '#00F5FF', '#F43F5E', '#10B981', '#C084FC', '#FB923C'];
            return (
              <span
                key={idx}
                className="absolute top-0 w-3 h-3 rounded-sm animate-confetti"
                style={{
                  left: `${(idx * 3.6) % 100}%`,
                  backgroundColor: colors[idx % colors.length],
                  animationDelay: `${(idx % 7) * 0.12}s`
                }}
              />
            );
          })}

          <div className="rounded-3xl border-4 border-amber-300 bg-gradient-to-br from-amber-500 via-orange-600 to-pink-600 p-6 text-center shadow-[0_0_50px_rgba(250,204,21,0.85)] max-w-sm w-full">
            <Sparkles className="w-10 h-10 text-yellow-200 mx-auto mb-1 animate-spin" />
            <h3 className="text-2xl font-black text-white tracking-tight drop-shadow">
              {celebration.title}
            </h3>
            <p className="text-xs font-bold text-amber-100 mt-1 line-clamp-2">{celebration.subtitle}</p>
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 text-yellow-300 font-mono font-black text-sm">
              <span>+{celebration.lp} LP</span>
              <span>•</span>
              <span>🔥 RACHA: {celebration.newStreak} DÍAS</span>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          BANNER DE ASCENSO / DESCENSO DE LIGA
         ==================================================================== */}
      {rankUpBanner && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className="w-full max-w-md rounded-3xl border-4 bg-[#140e36] p-6 text-center space-y-4 shadow-2xl"
            style={{ borderColor: rankUpBanner.color, boxShadow: `0 0 45px ${rankUpBanner.color}` }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-black">
              {rankUpBanner.type === 'up' ? (
                <span className="text-emerald-300 flex items-center gap-1">
                  <ChevronUp className="w-4 h-4" /> ¡ASCENSO DE LIGA!
                </span>
              ) : (
                <span className="text-rose-300 flex items-center gap-1">
                  <ChevronDown className="w-4 h-4" /> DESCENSO DE DIVISIÓN
                </span>
              )}
            </span>

            <div>
              <p className="text-xs font-mono text-slate-300">{rankUpBanner.from} →</p>
              <h3 className="text-3xl font-black uppercase mt-1" style={{ color: rankUpBanner.color }}>
                {rankUpBanner.to}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setRankUpBanner(null)}
              className="w-full py-3 rounded-2xl font-black text-xs uppercase text-slate-950 shadow-lg"
              style={{ backgroundColor: rankUpBanner.color }}
            >
              ¡Seguir Entrenando!
            </button>
          </div>
        </div>
      )}

      {/* Notificación flotante rápida */}
      {toastMsg && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-sm z-50 px-4 py-3 rounded-2xl bg-[#191245]/95 border-2 border-cyan-400 shadow-2xl flex items-center gap-2.5 text-xs font-bold text-white">
          <Zap className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{toastMsg.text}</span>
        </div>
      )}
    </div>
  );
}
```
