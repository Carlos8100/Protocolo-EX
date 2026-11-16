import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Shield,
  Flame,
  Trophy,
  Activity,
  Dumbbell,
  Moon,
  User,
  Lock,
  Upload,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Cpu,
  BarChart3,
  Calendar,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  EyeOff,
  Sliders,
  Zap,
  Target,
  Award,
  FileText,
  Clock,
  HeartPulse,
  Layers,
  Check,
  Plus,
  Trash2,
  Info,
  ArrowRight,
  Menu,
  X,
  CloudRain,
  Scan,
  ShieldCheck
} from 'lucide-react';

/**
 * ============================================================================
 * PROTOCOLO EX // SYSTEM FITNESS
 * Plataforma HUD/RPG de Alto Rendimiento y Ciencia Biomecánica
 * ============================================================================
 */

// 1. DEFINICIÓN DE LOS 15 RANGOS COMPETITIVOS (6 divisiones cada uno: 6 -> 1)
const COMPETITIVE_RANKS = [
  { id: 'tierra', name: 'Tierra', color: '#926C4D', glow: 'rgba(146, 108, 77, 0.45)', badgeBg: 'from-amber-950/80 to-stone-900', tierGroup: 'Iniciado' },
  { id: 'madera', name: 'Madera', color: '#B47B44', glow: 'rgba(180, 123, 68, 0.45)', badgeBg: 'from-amber-900/70 to-neutral-900', tierGroup: 'Iniciado' },
  { id: 'piedra', name: 'Piedra', color: '#94A3B8', glow: 'rgba(148, 163, 184, 0.45)', badgeBg: 'from-slate-800/80 to-zinc-900', tierGroup: 'Iniciado' },
  { id: 'carbon', name: 'Carbón', color: '#64748B', glow: 'rgba(100, 116, 139, 0.5)', badgeBg: 'from-zinc-800/90 to-black', tierGroup: 'Forja' },
  { id: 'hierro', name: 'Hierro', color: '#CBD5E1', glow: 'rgba(203, 213, 225, 0.5)', badgeBg: 'from-slate-700/70 to-slate-950', tierGroup: 'Forja' },
  { id: 'bronce', name: 'Bronce', color: '#D97706', glow: 'rgba(217, 119, 6, 0.5)', badgeBg: 'from-orange-900/70 to-stone-950', tierGroup: 'Forja' },
  { id: 'plata', name: 'Plata', color: '#E2E8F0', glow: 'rgba(226, 232, 240, 0.55)', badgeBg: 'from-slate-600/60 to-slate-950', tierGroup: 'Competitivo' },
  { id: 'oro', name: 'Oro', color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.6)', badgeBg: 'from-yellow-700/60 to-amber-950', tierGroup: 'Competitivo' },
  { id: 'platino', name: 'Platino', color: '#2DD4BF', glow: 'rgba(45, 212, 191, 0.6)', badgeBg: 'from-teal-800/60 to-slate-950', tierGroup: 'Competitivo' },
  { id: 'esmeralda', name: 'Esmeralda', color: '#10B981', glow: 'rgba(16, 185, 129, 0.65)', badgeBg: 'from-emerald-800/70 to-slate-950', tierGroup: 'Élite' },
  { id: 'diamante', name: 'Diamante', color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.7)', badgeBg: 'from-sky-700/70 to-indigo-950', tierGroup: 'Élite' },
  { id: 'especialista', name: 'Especialista', color: '#818CF8', glow: 'rgba(129, 140, 248, 0.7)', badgeBg: 'from-indigo-800/70 to-slate-950', tierGroup: 'Élite' },
  { id: 'maestro', name: 'Maestro', color: '#A855F7', glow: 'rgba(168, 85, 247, 0.75)', badgeBg: 'from-purple-800/75 to-slate-950', tierGroup: 'Soberano' },
  { id: 'jefe_maestro', name: 'Jefe Maestro', color: '#EC4899', glow: 'rgba(236, 72, 153, 0.8)', badgeBg: 'from-fuchsia-900/80 to-slate-950', tierGroup: 'Soberano' },
  { id: 'challenger', name: 'Challenger', color: '#00F0FF', glow: 'rgba(0, 240, 255, 0.9)', badgeBg: 'from-cyan-700/70 via-purple-900/70 to-amber-700/60', tierGroup: 'Cúspide' }
];

// 2. ESCALA CIENTÍFICA F A EX (Para Fuerza Absoluta, Relativa y Evaluación Física)
const SCIENTIFIC_GRADES = [
  { grade: 'F', label: 'Base Inicial', color: '#64748B', bg: 'bg-slate-800/80 border-slate-600 text-slate-300', desc: 'Adaptación neuromuscular inicial y aprendizaje motor.' },
  { grade: 'E', label: 'Novato Activo', color: '#94A3B8', bg: 'bg-zinc-800/80 border-zinc-500 text-zinc-200', desc: 'Coordinación intermuscular básica consolidada.' },
  { grade: 'D', label: 'Intermedio Inicial', color: '#22C55E', bg: 'bg-green-950/80 border-green-500/60 text-green-300', desc: 'Reclutamiento eficiente en patrones multiarticulares.' },
  { grade: 'C', label: 'Intermedio Sólido', color: '#10B981', bg: 'bg-emerald-950/80 border-emerald-400/70 text-emerald-300', desc: 'Hipertrofia funcional visible y control excéntrico.' },
  { grade: 'B', label: 'Avanzado', color: '#06B6D4', bg: 'bg-cyan-950/80 border-cyan-400/70 text-cyan-300', desc: 'Alta densidad miofibrilar y eficiencia biomecánica.' },
  { grade: 'A', label: 'Atleta Avanzado', color: '#3B82F6', bg: 'bg-blue-950/80 border-blue-400/80 text-blue-300', desc: 'Producción de fuerza y simetría muscular superior.' },
  { grade: 'S', label: 'Élite Regional', color: '#A855F7', bg: 'bg-purple-950/80 border-purple-400/80 text-purple-300', desc: 'Tasa de desarrollo de fuerza (RFD) de alto nivel.' },
  { grade: 'SS', label: 'Élite Nacional', color: '#D946EF', bg: 'bg-fuchsia-950/80 border-fuchsia-400/80 text-fuchsia-300', desc: 'Optimización extrema de palancas y composición corporal.' },
  { grade: 'SSS', label: 'Clase Mundial', color: '#F59E0B', bg: 'bg-amber-950/80 border-amber-400/90 text-amber-300', desc: 'Límite fisiológico natural y reclutamiento máximo.' },
  { grade: 'EX', label: 'Anomalía Biomecánica', color: '#00F0FF', bg: 'bg-gradient-to-r from-cyan-950 via-purple-950 to-amber-950 border-cyan-300 text-cyan-200', desc: 'Nivel sobrehumano. Referente absoluto del Sistema.' }
];

// 3. CONTINGENCIAS INTELIGENTES ANTE IMPREVISTOS
const CONTINGENCY_PRESETS = [
  {
    id: 'lluvia',
    label: 'Está lloviendo / Clima adverso',
    icon: '🌧️',
    title: 'Protocolo Indoor HIIT & Potencia Reactiva (Casa)',
    detail: '5 rondas: 45s Burpees explosivos + 45s Sentadillas con salto + 45s Mountain Climbers + 45s Plancha dinámica (30s descanso entre rondas).',
    lpBonus: 30
  },
  {
    id: 'gym_cerrado',
    label: 'Gimnasio cerrado / Sin acceso a máquinas',
    icon: '🔒',
    title: 'Protocolo Biomecánico Calisténico de Alta Tensión (Casa)',
    detail: '4 series al fallo técnico (RIR 1): Sentadilla Búlgara con pausa 3s + Flexiones en déficit profundo + Remo invertido bajo mesa + Elevaciones de talón unilaterales.',
    lpBonus: 35
  },
  {
    id: 'poco_tiempo',
    label: 'Poco tiempo disponible (< 25 min)',
    icon: '⏱️',
    title: 'Protocolo Myo-Reps / Densidad Metabólica Express',
    detail: 'Bloque de 20 min: 1 serie de activación (15 reps) + 4 mini-series de 5 reps con 15s de descanso en patrones de empuje, tracción y dominancia de rodilla.',
    lpBonus: 25
  },
  {
    id: 'fatiga_articular',
    label: 'Molestia articular / Fatiga acumulada',
    icon: '🧬',
    title: 'Protocolo Isométrico Analgésico & Movilidad Activa',
    detail: '3 rondas: Isometría de sentadilla 45s (60° flexión) + Dead Hang 40s + Puente glúteo unilateral 15 reps + Flujo torácico controlado.',
    lpBonus: 25
  }
];

// 4. BASE DE DATOS DE RUTINAS CIENTÍFICAS Y BIOMECÁNICA
const BIOMECHANICAL_ROUTINES = {
  gimnasio: {
    hipertrofia: {
      focus: 'Tensión Mecánica en Estiramiento + Estabilidad Externa',
      rationale: 'Prioriza ejercicios con perfil de resistencia descendente o carga máxima en longitud muscular larga, maximizando el reclutamiento de unidades motoras de alto umbral (principio de Henneman) con fatiga sistémica controlada.',
      days: [
        {
          day: 'Día 1: Torso A (Énfasis Estiramiento & Plano Frontal)',
          exercises: [
            { name: 'Press Inclinado con Mancuernas (30°)', sets: '3x8-10', rir: 'RIR 1', rest: '2.5 min', tempo: '3-1-1-0', biomech: 'Máxima elongación de fibras claviculares del pectoral mayor sin bloqueo escapular.' },
            { name: 'Jalón al Pecho Agarre Neutro Estrecho', sets: '3x10-12', rir: 'RIR 1', rest: '2 min', tempo: '2-1-1-1', biomech: 'Alinea el brazo de momento en el plano sagital para maximizar el dorsal ancho.' },
            { name: 'Elevaciones Laterales en Polea (altura muñeca)', sets: '4x12-15', rir: 'RIR 0-1', rest: '90 s', tempo: '2-0-1-1', biomech: 'Tensión continua en los primeros 30° de abducción donde la mancuerna pierde torque.' },
            { name: 'Extensión de Tríceps sobre la Cabeza en Polea', sets: '3x10-12', rir: 'RIR 1', rest: '90 s', tempo: '3-1-1-0', biomech: 'Aprovecha la hipertrofia mediada por estiramiento de la cabeza larga del tríceps.' }
          ]
        },
        {
          day: 'Día 2: Pierna A (Dominancia de Rodilla & Cadena Posterior)',
          exercises: [
            { name: 'Sentadilla Hack o Sentadilla con Talones Elevados', sets: '3x8-10', rir: 'RIR 1-2', rest: '3 min', tempo: '3-1-1-0', biomech: 'Maximiza la dorsiflexión y el momento flexor de rodilla para el cuádriceps.' },
            { name: 'Peso Muerto Rumano (RDL) con Barra', sets: '3x8-10', rir: 'RIR 1-2', rest: '3 min', tempo: '3-1-1-0', biomech: 'Carga los isquiosurales en posición alargada con bisagra de cadera pura.' },
            { name: 'Curl Femoral Sentado', sets: '3x10-12', rir: 'RIR 0-1', rest: '2 min', tempo: '2-1-1-1', biomech: 'Flexión de cadera previa que pre-estira el bíceps femoral, superior al curl tumbado.' },
            { name: 'Elevación de Talones de Pie (Pausa abajo)', sets: '4x12-15', rir: 'RIR 0', rest: '90 s', tempo: '2-2-1-0', biomech: 'Elimina el rebote del tendón de Aquiles para aislar el gastrocnemio.' }
          ]
        },
        {
          day: 'Día 3: Torso B (Tracción Horizontal & Estabilidad Escapular)',
          exercises: [
            { name: 'Remo en Máquina con Apoyo al Pecho', sets: '3x8-10', rir: 'RIR 1', rest: '2.5 min', tempo: '2-1-1-1', biomech: 'Elimina la fatiga lumbar del erector espinal permitiendo llevar trapecio y romboides al fallo.' },
            { name: 'Press Plano en Máquina Convergente', sets: '3x10-12', rir: 'RIR 1', rest: '2 min', tempo: '3-0-1-0', biomech: 'Convergencia hacia la línea media que respeta la función aductora del pectoral.' },
            { name: 'Curl Predicador Unilateral con Mancuerna', sets: '3x10-12', rir: 'RIR 0-1', rest: '90 s', tempo: '3-1-1-0', biomech: 'Pico de torque máximo en el inicio de la flexión de codo con hombro en flexión.' },
            { name: 'Face Pull en Polea Alta con Rotación Externa', sets: '3x15', rir: 'RIR 2', rest: '90 s', tempo: '2-1-1-1', biomech: 'Fortalece infraespinoso, redondo menor y deltoides posterior.' }
          ]
        }
      ]
    },
    fuerza: {
      focus: 'Especificidad Neuromuscular + Tasa de Desarrollo de Fuerza (RFD)',
      rationale: 'Optimiza la coordinación intramuscular y la rigidez tendinosa mediante cargas del 82%-92% del 1RM con descanso completo para resíntesis de fosfocreatina (ATP-PCr).',
      days: [
        {
          day: 'Día 1: Fuerza Neural Sentadilla & Empuje Vertical',
          exercises: [
            { name: 'Sentadilla Trasera Barra Alta/Baja (Competición)', sets: '4x4-5', rir: 'RIR 2', rest: '4 min', tempo: '2-1-X-0', biomech: 'Fase concéntrica explosiva (X) para maximizar reclutamiento sincrónico.' },
            { name: 'Press Militar Estricto de Pie con Barra', sets: '4x5-6', rir: 'RIR 1-2', rest: '3 min', tempo: '2-0-X-0', biomech: 'Transmisión de fuerza a través de cadena cinética cerrada y anti-extensión del core.' },
            { name: 'Sentadilla Frontal con Pausa (2s)', sets: '3x5', rir: 'RIR 2', rest: '3 min', tempo: '3-2-X-0', biomech: 'Disipa energía elástica en el punto de estancamiento (sticking point).' }
          ]
        },
        {
          day: 'Día 2: Fuerza Neural Press Banca & Tracción Pesada',
          exercises: [
            { name: 'Press de Banca Plano con Pausa Táctil (1s)', sets: '4x4-5', rir: 'RIR 2', rest: '4 min', tempo: '2-1-X-0', biomech: 'Mejora la estabilidad escapular y potencia de salida desde el pecho.' },
            { name: 'Dominadas Lastradas Pronas/Neutras', sets: '4x5-6', rir: 'RIR 1-2', rest: '3 min', tempo: '2-0-X-1', biomech: 'Sobrecarga vertical pura para dorsal ancho y flexores de codo.' },
            { name: 'Remo Pendlay Estricto desde el Suelo', sets: '3x6', rir: 'RIR 2', rest: '2.5 min', tempo: '1-0-X-0', biomech: 'Desarrolla aceleración concéntrica desde posición muerta.' }
          ]
        },
        {
          day: 'Día 3: Fuerza Neural Peso Muerto & Potencia',
          exercises: [
            { name: 'Peso Muerto Convencional / Sumo', sets: '4x3-4', rir: 'RIR 2', rest: '4.5 min', tempo: '2-1-X-0', biomech: 'Generación máxima de torque extensor de cadera y rigidez torácica.' },
            { name: 'Press Banca Agarre Cerrado', sets: '3x6', rir: 'RIR 1-2', rest: '3 min', tempo: '2-1-X-0', biomech: 'Refuerza el bloqueo final (lockout) mediante tríceps y deltoides anterior.' },
            { name: 'Hip Thrust Pesado con Barra', sets: '3x6-8', rir: 'RIR 1', rest: '2.5 min', tempo: '2-1-1-0', biomech: 'Máximo momento de fuerza en extensión terminal de cadera.' }
          ]
        }
      ]
    },
    recomposicion: {
      focus: 'Gasto Energético Alto + Preservación de Masa Magra',
      rationale: 'Combina bloques de fuerza básica para retener masa muscular en déficit calórico moderado con superseries antagonistas que elevan el EPOC sin comprometer la técnica.',
      days: [
        {
          day: 'Día 1: Full Body Metabólico A (Antagonistas)',
          exercises: [
            { name: 'Superserie: Prensa Inclinada + Curl Femoral', sets: '3x10+12', rir: 'RIR 1', rest: '2 min', tempo: '3-0-1-0', biomech: 'Inhibición recíproca que mejora la recuperación entre agonista y antagonista.' },
            { name: 'Superserie: Press Banca Mancuernas + Remo Polea Baja', sets: '3x10+12', rir: 'RIR 1', rest: '2 min', tempo: '2-1-1-0', biomech: 'Equilibrio exacto 1:1 entre empuje horizontal y tracción.' },
            { name: 'Farmer Walk (Paseo del Granjero Pesado)', sets: '4x35m', rir: 'RIR 1', rest: '90 s', tempo: 'Controlado', biomech: 'Estabilidad lateral de cadera (glúteo medio), trapecio y agarre.' }
          ]
        },
        {
          day: 'Día 2: Full Body Metabólico B (Cadena Posterior & Core)',
          exercises: [
            { name: 'Peso Muerto con Barra Hexagonal / Mancuernas', sets: '3x8-10', rir: 'RIR 1-2', rest: '2.5 min', tempo: '2-1-1-0', biomech: 'Centro de masa alineado que reduce el cizallamiento lumbar.' },
            { name: 'Jalón Prono + Fondos Asistidos/Paralelas', sets: '3x10+10', rir: 'RIR 1', rest: '2 min', tempo: '2-1-1-0', biomech: 'Trabajo vertical completo con alta demanda metabólica.' },
            { name: 'Pallof Press en Polea + Crunch Declinado', sets: '3x12/lado', rir: 'RIR 1', rest: '60 s', tempo: '2-2-1-0', biomech: 'Anti-rotación del oblicuo interno/externo y flexión espinal.' }
          ]
        }
      ]
    }
  },
  casa: {
    hipertrofia: {
      focus: 'Manipulación de Palancas + Tiempo Bajo Tensión (TUT)',
      rationale: 'Al no contar con cargas externas masivas, se alargan los brazos de momento y se usan ejercicios unilaterales y déficits para alcanzar el fallo mecánico entre 8 y 18 repeticiones.',
      days: [
        {
          day: 'Día 1: Empuje & Pierna Anterior (Palancas Largas)',
          exercises: [
            { name: 'Sentadilla Búlgara con Elevación de Talón', sets: '4x10-14/lado', rir: 'RIR 0-1', rest: '2 min', tempo: '3-1-1-0', biomech: 'Duplica la carga relativa sobre un solo miembro inferior sin necesidad de barra.' },
            { name: 'Flexiones en Déficit (manos sobre libros/soportes)', sets: '4x12-18', rir: 'RIR 0-1', rest: '2 min', tempo: '3-1-1-0', biomech: 'Aumenta el rango de abducción horizontal para estirar el pectoral mayor.' },
            { name: 'Flexiones en Pica (Pike Push-Ups elevadas)', sets: '3x8-12', rir: 'RIR 1', rest: '2 min', tempo: '3-1-1-0', biomech: 'Simula el ángulo de un press militar para deltoides anterior y medio.' },
            { name: 'Extensión de Tríceps en Suelo / Mesa (Bodyweight Skullcrusher)', sets: '3x12-15', rir: 'RIR 0', rest: '90 s', tempo: '3-1-1-0', biomech: 'Aislamiento puro de extensión de codo con peso corporal.' }
          ]
        },
        {
          day: 'Día 2: Tracción & Cadena Posterior Unilateral',
          exercises: [
            { name: 'Remo Invertido Bajo Mesa / Barra Baja (pies elevados)', sets: '4x10-15', rir: 'RIR 0-1', rest: '2 min', tempo: '2-1-1-1', biomech: 'Retracción escapular completa bajo vector horizontal.' },
            { name: 'Curl Nórdico Excéntrico / Deslizamiento Femoral en Suelo', sets: '4x8-12', rir: 'RIR 1', rest: '2 min', tempo: '4-0-1-0', biomech: 'Sobrecarga excéntrica máxima en isquiosurales, clave para prevenir desgarros.' },
            { name: 'Peso Muerto Unilateral (B-Stance RDL con mochila/mancuerna)', sets: '3x12/lado', rir: 'RIR 1', rest: '90 s', tempo: '3-1-1-0', biomech: 'Estabilidad pélvica anti-rotacional y estiramiento de cadena posterior.' },
            { name: 'Elevación de Talón Unilateral en Escalón', sets: '4x15-20/lado', rir: 'RIR 0', rest: '60 s', tempo: '2-2-1-0', biomech: 'Déficit plantar completo para hipertrofia de tríceps sural.' }
          ]
        }
      ]
    },
    fuerza: {
      focus: 'Progresiones Gimnásticas + Isometrías Máximas',
      rationale: 'Incrementa la tensión neural mediante progresiones unilaterales avanzadas y contracciones isométricas de máxima intención (MVIC).',
      days: [
        {
          day: 'Día 1: Potencia Unilateral & Empuje Avanzado',
          exercises: [
            { name: 'Pistol Squat Asistida o Sentadilla Camarón (Shrimp Squat)', sets: '4x5-6/lado', rir: 'RIR 1-2', rest: '3 min', tempo: '3-1-X-0', biomech: 'Demanda máxima de torque extensor de rodilla y estabilidad de tobillo.' },
            { name: 'Flexiones Arqueras o Pseudo-Planche Push-Ups', sets: '4x6-8', rir: 'RIR 1', rest: '3 min', tempo: '2-1-X-0', biomech: 'Desplaza el centro de gravedad hacia adelante aumentando la carga en deltoides y pecho.' },
            { name: 'Sentadilla Isométrica contra Pared (Wall Sit Unilateral)', sets: '3x35s/lado', rir: 'RIR 1', rest: '2 min', tempo: 'Isométrico', biomech: 'Reclutamiento neural sostenido sin impacto articular.' }
          ]
        },
        {
          day: 'Día 2: Tracción Unilateral & Bisagra Explosiva',
          exercises: [
            { name: 'Remo Arquero Unilateral / Dominadas en Marco o Barra', sets: '4x6-8', rir: 'RIR 1', rest: '3 min', tempo: '2-1-X-1', biomech: 'Sobrecarga asimétrica de dorsal ancho y bíceps braquial.' },
            { name: 'Puente Glúteo Unilateral Explosivo con Pausa Alta', sets: '4x8/lado', rir: 'RIR 1', rest: '2 min', tempo: '2-2-X-0', biomech: 'Potencia de extensión de cadera en ángulo de máxima activación glútea.' },
            { name: 'Plancha RKC (Contracción Máxima Total)', sets: '3x30s', rir: 'RIR 1', rest: '90 s', tempo: 'Isométrico', biomech: 'Co-contracción simultánea de recto abdominal, glúteos y dorsales.' }
          ]
        }
      ]
    },
    recomposicion: {
      focus: 'Acondicionamiento Metabólico + Densidad Muscular en Casa',
      rationale: 'Maximiza la oxidación lipídica y la capacidad cardiovascular preservando tejido contráctil mediante circuitos biomecánicos de cuerpo completo.',
      days: [
        {
          day: 'Día 1: Circuito Bio-Metabólico Total',
          exercises: [
            { name: 'Zancadas Reversas Alternas + Flexiones Explosivas', sets: '4x12/lado + 12', rir: 'RIR 1', rest: '90 s', tempo: '2-0-1-0', biomech: 'Transición rápida tren inferior-superior que dispara el gasto cardíaco.' },
            { name: 'Remo Invertido + Mountain Climbers Controlados', sets: '4x12 + 30s', rir: 'RIR 1', rest: '90 s', tempo: '2-0-1-0', biomech: 'Tracción postural combinada con flexión dinámica de cadera.' }
          ]
        }
      ]
    }
  },
  hibrido: {
    hipertrofia: {
      focus: 'Cargas Pesadas en Gimnasio + Volumen de Detalle en Casa',
      rationale: 'Aprovecha el equipamiento pesado del gimnasio para los movimientos compuestos principales y utiliza días en casa para acumular volumen metabólico de recuperación rápida.',
      days: [
        {
          day: 'Día 1 (GIMNASIO): Compuestos Pesados Torso/Pierna',
          exercises: [
            { name: 'Sentadilla Trasera o Prensa Pesada', sets: '3x6-8', rir: 'RIR 1-2', rest: '3 min', tempo: '3-1-1-0', biomech: 'Carga axial/mecánica imposible de replicar fácilmente en casa.' },
            { name: 'Press de Banca Inclinado con Barra', sets: '3x6-8', rir: 'RIR 1-2', rest: '3 min', tempo: '3-1-1-0', biomech: 'Sobrecarga progresiva lineal de alta precisión.' },
            { name: 'Jalón al Pecho / Dominadas Lastradas', sets: '3x8-10', rir: 'RIR 1', rest: '2.5 min', tempo: '2-1-1-1', biomech: 'Tracción vertical con resistencia estable.' }
          ]
        },
        {
          day: 'Día 2 (CASA): Bomba Metabólica, Hombros, Brazos & Core',
          exercises: [
            { name: 'Elevaciones Laterales con Banda/Mancuerna + Pike Push-Ups', sets: '4x15 + 10', rir: 'RIR 0', rest: '90 s', tempo: '2-0-1-1', biomech: 'Acumulación de volumen efectivo en deltoides sin fatiga sistémica.' },
            { name: 'Sentadilla Búlgara + Flexiones en Déficit', sets: '3x12/lado + 15', rir: 'RIR 1', rest: '2 min', tempo: '3-0-1-0', biomech: 'Estímulo unilateral de alta frecuencia semanal.' }
          ]
        }
      ]
    },
    fuerza: {
      focus: 'Días Primarios en Gym + Potencia/Movilidad en Casa',
      rationale: 'Concentra el 100% de los levantamientos con barra en el gimnasio y usa las sesiones en casa para potencia pliométrica, estabilidad de core y prevención de lesiones.',
      days: [
        {
          day: 'Día 1 (GIMNASIO): Los 3 Grandes (SBD Neural)',
          exercises: [
            { name: 'Sentadilla + Press de Banca + Peso Muerto (Esquema Top Set)', sets: '3x4 cada uno', rir: 'RIR 2', rest: '4 min', tempo: '2-1-X-0', biomech: 'Sinergia neuromuscular de alta intensidad en una sola sesión.' }
          ]
        },
        {
          day: 'Día 2 (CASA): Potencia Reactiva & Estabilidad Escapular',
          exercises: [
            { name: 'Saltos al Cajón / Squat Jumps + Flexiones Pliométricas', sets: '4x6 + 6', rir: 'RIR 2', rest: '2 min', tempo: 'Explosivo', biomech: 'Mejora la curva fuerza-velocidad y el ciclo estiramiento-acortamiento.' }
          ]
        }
      ]
    },
    recomposicion: {
      focus: 'Fuerza en Gym + Cardio/Circuitos en Casa',
      rationale: 'Mantiene la fuerza máxima en sala de pesas mientras maximiza el gasto calórico semanal desde casa sin traslados extra.',
      days: [
        {
          day: 'Día 1 (GIMNASIO): Full Body Tensión Mecánica',
          exercises: [
            { name: 'Peso Muerto Rumano + Press Plano + Remo con Barra', sets: '3x8 cada uno', rir: 'RIR 1-2', rest: '2.5 min', tempo: '2-1-1-0', biomech: 'Preserva masa muscular en los principales grupos motores.' }
          ]
        },
        {
          day: 'Día 2 (CASA): Acondicionamiento HIIT & Core',
          exercises: [
            { name: 'Burpees Técnicos + Zancadas + Plancha Dinámica', sets: '5 rondas x 40s', rir: 'RIR 1', rest: '40 s', tempo: 'Fluido', biomech: 'Eleva el VO2 y la densidad energética semanal.' }
          ]
        }
      ]
    }
  }
};

// ============================================================================
// FUNCIONES CIENTÍFICAS DE CÁLCULO Y EVALUACIÓN
// ============================================================================

/**
 * Calcula el rango competitivo exacto (15 rangos x 6 divisiones = 90 niveles)
 * Cada nivel equivale a 100 LP (0 a 8999+ LP).
 */
function getCompetitiveRankInfo(totalLP) {
  const clampedLP = Math.max(0, Math.min(8999, Math.round(totalLP)));
  const totalTierIndex = Math.floor(clampedLP / 100); // 0 a 89
  const rankIndex = Math.min(14, Math.floor(totalTierIndex / 6)); // 0 a 14
  const division = 6 - (totalTierIndex % 6); // 6 (más baja) a 1 (más alta)
  const divisionLP = clampedLP % 100;
  const rankObj = COMPETITIVE_RANKS[rankIndex];

  return {
    totalLP: clampedLP,
    totalTierIndex,
    rankIndex,
    rank: rankObj,
    division,
    divisionLP,
    fullTitle: `${rankObj.name} ${division}`,
    isMaxRank: rankIndex === 14 && division === 1
  };
}

/**
 * Calcula 1RM científico (híbrido Brzycki/Epley) y clasifica en escala F a EX
 */
function calculateStrengthAnalysis(bodyWeight, lifts) {
  const bw = Math.max(35, Number(bodyWeight) || 75);

  const calc1RM = (weight, reps) => {
    const w = Math.max(0, Number(weight) || 0);
    const r = Math.max(1, Math.min(20, Number(reps) || 1));
    if (w === 0) return 0;
    if (r === 1) return w;
    // Brzycki es más precisa debajo de 10 reps; Epley por encima
    if (r <= 10) {
      return Math.round(w * (36 / (37 - r)));
    }
    return Math.round(w * (1 + r / 30));
  };

  const squat1RM = calc1RM(lifts.squat.weight, lifts.squat.reps);
  const bench1RM = calc1RM(lifts.bench.weight, lifts.bench.reps);
  const deadlift1RM = calc1RM(lifts.deadlift.weight, lifts.deadlift.reps);
  const ohp1RM = calc1RM(lifts.ohp.weight, lifts.ohp.reps);

  // Total Powerlifting + Militar
  const sbdTotal = squat1RM + bench1RM + deadlift1RM;
  const grandTotal = sbdTotal + ohp1RM;

  // Coeficiente DOTS científico simplificado (estándar moderno de fuerza absoluta ajustada)
  const dotsDenominator =
    -307.75076 +
    24.0900756 * bw -
    0.1918759221 * Math.pow(bw, 2) +
    0.0007391293 * Math.pow(bw, 3) -
    0.000001093 * Math.pow(bw, 4);
  const dotsScore = dotsDenominator > 0 ? Math.round((sbdTotal * 500) / dotsDenominator) : 0;

  // Ratio relativo combinado (Total SBD / Peso Corporal)
  const relativeRatio = Number((sbdTotal / bw).toFixed(2));

  // Clasificar Fuerza Absoluta (basada en Total SBD + DOTS)
  const getAbsoluteGradeIndex = (total, dots) => {
    const composite = total * 0.65 + dots * 0.55;
    if (composite < 160) return 0; // F
    if (composite < 230) return 1; // E
    if (composite < 300) return 2; // D
    if (composite < 375) return 3; // C
    if (composite < 450) return 4; // B
    if (composite < 530) return 5; // A
    if (composite < 615) return 6; // S
    if (composite < 700) return 7; // SS
    if (composite < 790) return 8; // SSS
    return 9; // EX
  };

  // Clasificar Fuerza Relativa (basada en múltiplos de Peso Corporal)
  const getRelativeGradeIndex = (ratio) => {
    if (ratio < 1.8) return 0; // F
    if (ratio < 2.5) return 1; // E
    if (ratio < 3.2) return 2; // D
    if (ratio < 3.9) return 3; // C
    if (ratio < 4.6) return 4; // B
    if (ratio < 5.3) return 5; // A
    if (ratio < 6.0) return 6; // S
    if (ratio < 6.7) return 7; // SS
    if (ratio < 7.4) return 8; // SSS
    return 9; // EX
  };

  const gradeLiftRatio = (ratio, thresholds) => {
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (ratio >= thresholds[i]) return SCIENTIFIC_GRADES[i];
    }
    return SCIENTIFIC_GRADES[0];
  };

  const squatRatio = Number((squat1RM / bw).toFixed(2));
  const benchRatio = Number((bench1RM / bw).toFixed(2));
  const deadliftRatio = Number((deadlift1RM / bw).toFixed(2));
  const ohpRatio = Number((ohp1RM / bw).toFixed(2));

  const exercises = [
    {
      key: 'squat',
      name: 'Sentadilla Trasera',
      oneRM: squat1RM,
      ratio: squatRatio,
      targetNext: 2.0,
      grade: gradeLiftRatio(squatRatio, [0, 0.75, 1.0, 1.25, 1.5, 1.8, 2.1, 2.4, 2.7, 3.0]),
      biomech: 'Evalúa torque extensor de rodilla y cadera bajo carga axial. Ratio ≥ 1.75x BW indica alta eficiencia neural.'
    },
    {
      key: 'bench',
      name: 'Press de Banca',
      oneRM: bench1RM,
      ratio: benchRatio,
      targetNext: 1.5,
      grade: gradeLiftRatio(benchRatio, [0, 0.55, 0.75, 0.95, 1.15, 1.35, 1.55, 1.75, 1.95, 2.15]),
      biomech: 'Mide potencia de empuje horizontal (pectoral mayor, deltoides anterior, tríceps) y estabilidad escapular.'
    },
    {
      key: 'deadlift',
      name: 'Peso Muerto',
      oneRM: deadlift1RM,
      ratio: deadliftRatio,
      targetNext: 2.5,
      grade: gradeLiftRatio(deadliftRatio, [0, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4, 2.7, 3.0, 3.3]),
      biomech: 'Indicador supremo de cadena posterior (glúteo mayor, isquiosurales, erectores) y fuerza de agarre.'
    },
    {
      key: 'ohp',
      name: 'Press Militar Estricto',
      oneRM: ohp1RM,
      ratio: ohpRatio,
      targetNext: 1.0,
      grade: gradeLiftRatio(ohpRatio, [0, 0.35, 0.5, 0.65, 0.78, 0.9, 1.02, 1.15, 1.28, 1.4]),
      biomech: 'Evalúa estabilidad del manguito rotador, deltoides y rigidez del core sin impulso de piernas.'
    }
  ];

  return {
    sbdTotal,
    grandTotal,
    dotsScore,
    relativeRatio,
    absoluteGrade: SCIENTIFIC_GRADES[getAbsoluteGradeIndex(sbdTotal, dotsScore)],
    relativeGrade: SCIENTIFIC_GRADES[getRelativeGradeIndex(relativeRatio)],
    exercises
  };
}

/**
 * Analizador científico de rutina propia (texto o archivo subido)
 */
function analyzeCustomRoutine(routineText, progressStatus) {
  const text = (routineText || '').toLowerCase();

  // Detección heurística de patrones musculares
  const pushHits = (text.match(/banca|press|flexion|push|fondos|aperturas|elevacion|lateral|tricep|extension/g) || []).length;
  const pullHits = (text.match(/remo|jalon|dominada|pull|curl|bicep|face|peso muerto|deadlift/g) || []).length;
  const legHits = (text.match(/sentadilla|squat|prensa|zancada|bulgara|femoral|cuadricep|gemelo|talon|hip thrust|gluteo/g) || []).length;
  const coreHits = (text.match(/plancha|plank|crunch|abdom|pallof|rueda/g) || []).length;

  const estPushSets = Math.max(4, pushHits * 4);
  const estPullSets = Math.max(3, pullHits * 4);
  const estLegSets = Math.max(4, legHits * 4);
  const estCoreSets = Math.max(2, coreHits * 3);

  const pushPullRatio = estPullSets > 0 ? Number((estPushSets / estPullSets).toFixed(2)) : 2.0;

  const findings = [];
  const recommendations = [];

  if (pushPullRatio > 1.35) {
    findings.push({
      type: 'warning',
      title: `Desbalance Empuje / Tracción (${pushPullRatio}:1)`,
      detail: 'Exceso de volumen de empuje anterior respecto a tracción posterior. Riesgo de antepulsión de hombros y pinzamiento subacromial.'
    });
    recommendations.push('Añadir 4-6 series semanales de tracción horizontal (remo con apoyo) y rotación externa (Face Pulls).');
  } else {
    findings.push({
      type: 'good',
      title: `Equilibrio Empuje / Tracción Óptimo (${pushPullRatio}:1)`,
      detail: 'Buena proporción biomecánica entre cadena anterior y cintura escapular.'
    });
  }

  if (estLegSets < 10) {
    findings.push({
      type: 'warning',
      title: 'Sub-volumen en Tren Inferior (< 10 series efectivas/sem)',
      detail: 'El volumen detectado para cuádriceps e isquiosurales está por debajo del Volumen Mínimo Adaptativo (MAV).'
    });
    recommendations.push('Incluir al menos 1 patrón de dominancia de rodilla (Sentadilla/Hack) y 1 bisagra de cadera (RDL/Curl Femoral) 2 veces por semana.');
  } else {
    findings.push({
      type: 'good',
      title: 'Estímulo de Tren Inferior Adecuado',
      detail: 'Distribución correcta entre cadena anterior y posterior.'
    });
  }

  let cnsFatigue = 'Moderada (Óptima)';
  if (progressStatus === 'estancado') {
    cnsFatigue = 'Alta (Posible saturación de MRV)';
    findings.push({
      type: 'alert',
      title: 'Diagnóstico de Estancamiento (> 3 semanas)',
      detail: 'La acumulación de fatiga periférica y del SNC está enmascarando tus adaptaciones de fuerza.'
    });
    recommendations.push('Aplicar una semana de descarga (Deload): reducir series al 50% manteniendo la carga, o trabajar a RIR 2-3 durante 2 semanas.');
  } else if (progressStatus === 'fatiga') {
    cnsFatigue = 'Crítica (Sobrecarga Articular/Neural)';
    findings.push({
      type: 'alert',
      title: 'Alerta de Fatiga Sistémica / Dolor Articular',
      detail: 'Frecuencia excesiva cerca del fallo absoluto (RIR 0) en movimientos multiarticulares pesados.'
    });
    recommendations.push('Sustituir variantes con barra libre fatigantes por máquinas convergentes o poleas durante 2 semanas y priorizar 8h de sueño.');
  } else {
    recommendations.push('Mantener sobrecarga progresiva doble: cuando completes el rango máximo de repeticiones con RIR 1, sube +2.5 kg.');
  }

  return {
    volumeByGroup: [
      { label: 'Empuje (Pecho/Hombro/Tríceps)', sets: estPushSets, target: '12-18 series', color: '#00F0FF' },
      { label: 'Tracción (Espalda/Bíceps)', sets: estPullSets, target: '14-20 series', color: '#A855F7' },
      { label: 'Tren Inferior (Cuádriceps/Femoral)', sets: estLegSets, target: '12-18 series', color: '#10B981' },
      { label: 'Core & Estabilidad', sets: estCoreSets, target: '6-10 series', color: '#F59E0B' }
    ],
    pushPullRatio,
    cnsFatigue,
    findings,
    recommendations
  };
}

/**
 * Calcula métricas fisiológicas del sueño semanal (objetivo científico: 49h - 63h)
 */
function calculateSleepMetrics(sleepHoursArray) {
  const totalHours = Number(sleepHoursArray.reduce((acc, val) => acc + Number(val || 0), 0).toFixed(1));
  const avgHours = Number((totalHours / 7).toFixed(1));
  const minRecommended = 49; // 7h x 7 días
  const maxRecommended = 63; // 9h x 7 días

  let status = 'optimal';
  let recoveryScore = 95;
  let proteinSynthesis = '100% (Óptima)';
  let cnsReadiness = 'Alto Rendimiento';
  let failureRisk = 'Bajo (8%)';
  let advisory = 'Tu arquitectura del sueño (fases REM y sueño profundo N3) optimiza la secreción de GH y testosterona endógena. Estás listo para retos pesados.';

  if (totalHours < 42) {
    status = 'critical';
    recoveryScore = Math.max(25, Math.round((totalHours / 49) * 75));
    proteinSynthesis = '68% (-32% degradación acelerada)';
    cnsReadiness = 'Déficit Neural Severo';
    failureRisk = 'Alto (64%)';
    advisory = 'ALERTA FISIOLÓGICA: Déficit severo de sueño (< 6h/noche). Aumenta el cortisol y cae la síntesis proteica miofibrilar. Reduce cargas un 15-20% hoy o usa un Desafío de Contingencia.';
  } else if (totalHours < minRecommended) {
    status = 'warning';
    recoveryScore = Math.round((totalHours / 49) * 88);
    proteinSynthesis = '84% (Subóptima)';
    cnsReadiness = 'Recuperación Parcial';
    failureRisk = 'Moderado (35%)';
    advisory = 'Deuda de sueño leve acumulada (< 49h semanales). Evita llegar al fallo muscular absoluto (RIR 0) en ejercicios compuestos hoy.';
  } else if (totalHours > maxRecommended) {
    status = 'excess';
    recoveryScore = 90;
    proteinSynthesis = '96% (Alta)';
    cnsReadiness = 'Completamente Recuperado';
    failureRisk = 'Bajo (12%)';
    advisory = 'Superávit de descanso (> 63h). Asegura activación neuromuscular dinámica (calentamiento prolongado) antes de levantar pesado.';
  }

  return {
    totalHours,
    avgHours,
    minRecommended,
    maxRecommended,
    status,
    recoveryScore,
    proteinSynthesis,
    cnsReadiness,
    failureRisk,
    advisory
  };
}

// ============================================================================
// COMPONENTES VISUALES SVG PERSONALIZADOS (EMBLEMAS & AVATAR)
// ============================================================================

/**
 * Emblema geométrico futurista que evoluciona visualmente con el rango actual
 */
function RankEmblemSVG({ rankIndex, color, size = 72 }) {
  const tierLevel = Math.floor(rankIndex / 3); // 0 a 4 (5 niveles de complejidad visual)
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg select-none">
      <defs>
        <radialGradient id={`rankGlow-${rankIndex}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill={`url(#rankGlow-${rankIndex})`} />
      {/* Anillo exterior */}
      <polygon
        points="50,6 88,28 88,72 50,94 12,72 12,28"
        fill="rgba(10,14,26,0.9)"
        stroke={color}
        strokeWidth="2.5"
      />
      {/* Alas laterales para rangos altos */}
      {tierLevel >= 2 && (
        <>
          <path d="M12,35 L2,22 L12,50 Z" fill={color} opacity="0.85" />
          <path d="M88,35 L98,22 L88,50 Z" fill={color} opacity="0.85" />
        </>
      )}
      {tierLevel >= 3 && (
        <>
          <path d="M12,55 L0,65 L12,70 Z" fill={color} opacity="0.65" />
          <path d="M88,55 L100,65 L88,70 Z" fill={color} opacity="0.65" />
        </>
      )}
      {/* Núcleo geométrico interior */}
      <polygon
        points="50,18 76,34 76,66 50,82 24,66 24,34"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray={tierLevel >= 1 ? 'none' : '4 3'}
        opacity="0.8"
      />
      {/* Cristal central */}
      <polygon
        points="50,27 65,50 50,73 35,50"
        fill={color}
        opacity="0.25"
        stroke={color}
        strokeWidth="2"
      />
      {/* Corona superior en Maestro / Jefe Maestro / Challenger */}
      {tierLevel >= 4 && (
        <polygon points="36,12 43,3 50,10 57,3 64,12" fill={color} />
      )}
      <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Avatar Interactivo Personalizable SVG con Cosméticos y Aura de Rango
 */
function PlayerAvatarSVG({ avatar, rankColor, physicalGrade }) {
  const skinColors = {
    claro: '#F5D0B5',
    trigueno: '#DCA882',
    bronceado: '#B97A56',
    moreno: '#8D5538',
    oscuro: '#5C3824',
    cyber: '#94A3B8'
  };

  const buildScale = {
    atletico: { shoulder: 34, waist: 18, arm: 9 },
    mesomorfo: { shoulder: 40, waist: 20, arm: 12 },
    powerlifter: { shoulder: 45, waist: 26, arm: 14 },
    titan: { shoulder: 48, waist: 21, arm: 15 }
  };

  const cardBackgrounds = {
    laboratorio: 'from-slate-950 via-cyan-950/40 to-slate-950',
    matriz: 'from-zinc-950 via-purple-950/40 to-zinc-950',
    obsidiana: 'from-black via-neutral-900 to-black',
    dorado: 'from-stone-950 via-amber-950/45 to-stone-950'
  };

  const auraColors = {
    rango: rankColor,
    cian: '#00F0FF',
    violeta: '#A855F7',
    esmeralda: '#10B981',
    dorado: '#F59E0B'
  };

  const skin = skinColors[avatar.skin] || skinColors.trigueno;
  const dims = buildScale[avatar.build] || buildScale.mesomorfo;
  const activeAura = auraColors[avatar.aura] || rankColor;
  const isFemale = avatar.gender === 'femenino';

  const shoulderW = isFemale ? dims.shoulder - 5 : dims.shoulder;
  const waistW = isFemale ? dims.waist - 3 : dims.waist;
  const armW = isFemale ? dims.arm - 2 : dims.arm;

  return (
    <div className={`relative w-full h-72 rounded-2xl border border-slate-700/80 bg-gradient-to-b ${cardBackgrounds[avatar.bg] || cardBackgrounds.laboratorio} overflow-hidden flex items-center justify-center shadow-2xl`}>
      {/* Rejilla HUD de fondo */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, ${activeAura}33 1px, transparent 1px), linear-gradient(to bottom, ${activeAura}33 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Aura Energética Radial */}
      <div
        className="absolute w-52 h-52 rounded-full blur-2xl animate-pulse"
        style={{ backgroundColor: activeAura, opacity: 0.28 }}
      />

      {/* Etiqueta HUD Superior */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase">
        <span className="px-2 py-0.5 rounded bg-black/70 border border-slate-700 text-slate-300">
          BIO-ID // {avatar.build.toUpperCase()}
        </span>
        <span
          className="px-2 py-0.5 rounded bg-black/80 border font-bold"
          style={{ borderColor: activeAura, color: activeAura }}
        >
          FÍSICO: {physicalGrade}
        </span>
      </div>

      {/* Personaje SVG */}
      <svg viewBox="0 0 200 240" className="w-56 h-64 relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
        {/* Círculo de plataforma holográfica */}
        <ellipse cx="100" cy="218" rx="64" ry="12" fill="none" stroke={activeAura} strokeWidth="2" opacity="0.7" />
        <ellipse cx="100" cy="218" rx="45" ry="7" fill={activeAura} opacity="0.18" />

        {/* Cabello trasero si es largo */}
        {avatar.hair === 'largo' && (
          <path d="M78,46 Q72,85 76,105 L124,105 Q128,85 122,46 Z" fill="#1E1B2E" />
        )}

        {/* Piernas / Pantalón Deportivo Técnico */}
        <path
          d={`M${100 - waistW + 2},138 L${100 - waistW - 3},212 L${95},212 L99,155 L101,155 L105,212 L${100 + waistW + 3},212 L${100 + waistW - 2},138 Z`}
          fill="#111827"
          stroke="#334155"
          strokeWidth="1.5"
        />
        {/* Líneas neón en pantalón */}
        <line x1={100 - waistW} y1="145" x2={100 - waistW - 2} y2="205" stroke={activeAura} strokeWidth="1.5" opacity="0.7" />
        <line x1={100 + waistW} y1="145" x2={100 + waistW + 2} y2="205" stroke={activeAura} strokeWidth="1.5" opacity="0.7" />

        {/* Brazos */}
        <rect
          x={100 - shoulderW - armW + 2}
          y="74"
          width={armW}
          height="64"
          rx={armW / 2}
          fill={avatar.top === 'hoodie' ? '#1E293B' : skin}
        />
        <rect
          x={100 + shoulderW - 2}
          y="74"
          width={armW}
          height="64"
          rx={armW / 2}
          fill={avatar.top === 'hoodie' ? '#1E293B' : skin}
        />

        {/* Cosmético: Muñequeras Neón */}
        {avatar.wristWraps && (
          <>
            <rect x={100 - shoulderW - armW + 1} y="122" width={armW + 2} height="9" rx="2" fill={activeAura} />
            <rect x={100 + shoulderW - 3} y="122" width={armW + 2} height="9" rx="2" fill={activeAura} />
          </>
        )}

        {/* Torso base */}
        <polygon
          points={`${100 - shoulderW},72 ${100 + shoulderW},72 ${100 + waistW},140 ${100 - waistW},140`}
          fill={skin}
        />

        {/* Definición pectoral/abdominal si está sin remera o compresión */}
        {(avatar.top === 'sin_remera' || avatar.top === 'compresion') && (
          <g opacity="0.35" stroke="#0F172A" strokeWidth="1.3" fill="none">
            <path d={`M${100 - shoulderW * 0.55},92 Q100,98 ${100 + shoulderW * 0.55},92`} />
            <line x1="100" y1="95" x2="100" y2="132" />
            <line x1="91" y1="107" x2="109" y2="107" />
            <line x1="91" y1="118" x2="109" y2="118" />
          </g>
        )}

        {/* Ropa Superior (Cosméticos) */}
        {avatar.top === 'compresion' && (
          <polygon
            points={`${100 - shoulderW - 1},71 ${100 + shoulderW + 1},71 ${100 + waistW + 1},140 ${100 - waistW - 1},140`}
            fill="#0F172A"
            stroke={activeAura}
            strokeWidth="1.5"
          />
        )}
        {avatar.top === 'musculosa' && (
          <polygon
            points={`${100 - shoulderW * 0.65},71 ${100 + shoulderW * 0.65},71 ${100 + waistW + 1},140 ${100 - waistW - 1},140`}
            fill="#1E293B"
            stroke={activeAura}
            strokeWidth="1.4"
          />
        )}
        {avatar.top === 'hoodie' && (
          <>
            <polygon
              points={`${100 - shoulderW - 3},70 ${100 + shoulderW + 3},70 ${100 + waistW + 4},142 ${100 - waistW - 4},142`}
              fill="#1E293B"
              stroke="#475569"
              strokeWidth="1.5"
            />
            <line x1="100" y1="72" x2="100" y2="142" stroke={activeAura} strokeWidth="1.8" />
          </>
        )}

        {/* Cosmético: Cinturón de Levantamiento (Powerlifting Belt) */}
        {avatar.belt && (
          <g>
            <rect
              x={100 - waistW - 2}
              y="125"
              width={(waistW + 2) * 2}
              height="13"
              rx="3"
              fill="#090D16"
              stroke="#F59E0B"
              strokeWidth="1.8"
            />
            <rect x="93" y="126" width="14" height="11" rx="2" fill="#F59E0B" />
          </g>
        )}

        {/* Cuello y Cabeza */}
        <rect x="92" y="57" width="16" height="16" rx="4" fill={skin} />
        <ellipse cx="100" cy="43" rx="17" ry="20" fill={skin} />

        {/* Estilos de Cabello */}
        {avatar.hair === 'corto' && (
          <path d="M83,38 Q84,20 100,20 Q116,20 117,38 Q110,29 100,29 Q90,29 83,38 Z" fill="#18181B" />
        )}
        {avatar.hair === 'fade' && (
          <path d="M84,34 Q86,17 100,17 Q114,17 116,34 L112,26 L88,26 Z" fill="#09090B" />
        )}
        {avatar.hair === 'largo' && (
          <path d="M82,42 Q82,19 100,19 Q118,19 118,42 Q112,28 100,28 Q88,28 82,42 Z" fill="#1E1B2E" />
        )}
        {avatar.hair === 'spikes' && (
          <polygon points="82,36 86,16 94,25 100,12 106,25 114,16 118,36 108,28 92,28" fill="#1E1B4B" stroke={activeAura} strokeWidth="0.8" />
        )}

        {/* Ojos o Visor Táctico HUD */}
        {avatar.visor ? (
          <g>
            <rect x="84" y="37" width="32" height="9" rx="3" fill="#020617" stroke={activeAura} strokeWidth="1.6" />
            <line x1="88" y1="41.5" x2="112" y2="41.5" stroke={activeAura} strokeWidth="2" />
          </g>
        ) : (
          <g fill="#0F172A">
            <circle cx="93" cy="42" r="2.2" />
            <circle cx="107" cy="42" r="2.2" />
          </g>
        )}
      </svg>

      {/* Pie de tarjeta */}
      <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-slate-400">
        <span>EQUIPO: {avatar.belt ? 'BELT+ ' : ''}{avatar.wristWraps ? 'WRAPS+ ' : ''}{avatar.visor ? 'HUD' : 'STD'}</span>
        <span className="text-cyan-400">SYNC 100%</span>
      </div>
    </div>
  );
}

/**
 * Procesador Canvas con Filtro Automático de Privacidad Facial (Recorte/Pixelado Superior)
 */
function PrivacyPhotoVaultCard({ sideLabel, imageDataUrl, onUploadImage, onGenerateSample }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 280;
    const height = 340;
    canvas.width = width;
    canvas.height = height;

    if (!imageDataUrl) {
      // Estado vacío técnico
      ctx.fillStyle = '#070B14';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.fillStyle = '#64748B';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`SIN CAPTURA ${sideLabel.toUpperCase()}`, width / 2, height / 2 - 10);
      ctx.fillStyle = '#00F0FF';
      ctx.font = '10px monospace';
      ctx.fillText('FILTRO FACIAL AUTOMÁTICO ACTIVO', width / 2, height / 2 + 12);
      return;
    }

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, width, height);
      // Dibujar imagen escalada manteniendo proporción
      const scale = Math.max(width / img.width, height / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const offsetX = (width - drawW) / 2;
      const offsetY = (height - drawH) / 2;
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

      // FILTRO AUTOMÁTICO DE PRIVACIDAD FACIAL (24% superior pixelado + banda opaca AES-256)
      const headHeight = Math.round(height * 0.24);
      const pixelSize = 14;
      for (let py = 0; py < headHeight; py += pixelSize) {
        for (let px = 0; px < width; px += pixelSize) {
          const sample = ctx.getImageData(Math.min(width - 1, px + 4), Math.min(height - 1, py + 4), 1, 1).data;
          ctx.fillStyle = `rgb(${sample[0]}, ${sample[1]}, ${sample[2]})`;
          ctx.fillRect(px, py, pixelSize, pixelSize);
        }
      }

      // Banda de censura biométrica superior
      ctx.fillStyle = 'rgba(4, 7, 15, 0.88)';
      ctx.fillRect(0, 0, width, headHeight);
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, headHeight);
      ctx.lineTo(width, headHeight);
      ctx.stroke();

      ctx.fillStyle = '#00F0FF';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ROSTRO REDACTADO // ZERO-FACE ID', width / 2, headHeight / 2 - 4);
      ctx.fillStyle = '#10B981';
      ctx.font = '9px monospace';
      ctx.fillText('METADATOS EXIF ELIMINADOS • AES-256', width / 2, headHeight / 2 + 12);
    };
    img.src = imageDataUrl;
  }, [imageDataUrl, sideLabel]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        onUploadImage(ev.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
          {sideLabel}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
          <EyeOff className="w-3 h-3" /> Privacidad Activa
        </span>
      </div>

      <div className="relative rounded-lg overflow-hidden border border-slate-700/80 shadow-inner mb-3">
        <canvas ref={canvasRef} className="block max-w-full h-auto" />
      </div>

      <div className="w-full grid grid-cols-2 gap-2">
        <label className="cursor-pointer flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/50 text-cyan-300 text-xs font-semibold transition">
          <Upload className="w-3.5 h-3.5" />
          Subir Foto
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
        <button
          type="button"
          onClick={onGenerateSample}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-semibold transition"
        >
          <Scan className="w-3.5 h-3.5 text-purple-400" />
          Escáner Demo
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// APLICACIÓN PRINCIPAL: PROTOCOLO EX // SYSTEM FITNESS
// ============================================================================

export default function App() {
  // Navegación principal (6 módulos)
  const [activeTab, setActiveTab] = useState('comando');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Notificaciones HUD (Toasts) y Modal de Ascenso/Descenso
  const [toast, setToast] = useState(null);
  const [rankBanner, setRankBanner] = useState(null);

  // --------------------------------------------------------------------------
  // ESTADO GLOBAL 1: SISTEMA DE RANGOS (15 RANGOS x 6 DIVISIONES) Y RETOS DIARIOS
  // --------------------------------------------------------------------------
  // 420 LP = Hierro 2 (Tierra=0..599, Madera=600..1199, Piedra=1200..1799, Carbón=1800..2399, Hierro=2400..2999 -> 2840 LP = Hierro 2)
  const [totalLP, setTotalLP] = useState(2845);
  const [streak, setStreak] = useState(6);

  const [dailyChallenges, setDailyChallenges] = useState([
    {
      id: 'ch-1',
      title: 'Gimnasio: Sentadilla 130kg 4x6 + Press Banca 90kg 4x8',
      category: 'Gimnasio',
      lpReward: 40,
      status: 'active', // 'active' | 'completed' | 'contingency'
      contingencyNote: ''
    },
    {
      id: 'ch-2',
      title: 'Salir a correr 5 km ritmo umbral (4:45/km)',
      category: 'Cardio Exterior',
      lpReward: 35,
      status: 'active',
      contingencyNote: ''
    }
  ]);

  const [nextWeekPending, setNextWeekPending] = useState([
    {
      id: 'fail-prev-1',
      title: 'Peso Muerto 165kg 3x5 (Fallo por fatiga acumulada)',
      category: 'Gimnasio',
      lpReward: 45,
      failedDate: 'Semana Anterior'
    }
  ]);

  // Formulario de nuevo reto
  const [newChallengeTitle, setNewChallengeTitle] = useState('');
  const [newChallengeCategory, setNewChallengeCategory] = useState('Gimnasio');
  const [newChallengeLP, setNewChallengeLP] = useState(35);

  // Modal de Justificación de Imprevisto
  const [contingencyTarget, setContingencyTarget] = useState(null);
  const [selectedPresetId, setSelectedPresetId] = useState('lluvia');
  const [customJustificationNote, setCustomJustificationNote] = useState('');

  // --------------------------------------------------------------------------
  // ESTADO GLOBAL 2: FUERZA ABSOLUTA Y RELATIVA (ESCALA F A EX)
  // --------------------------------------------------------------------------
  const [bodyWeight, setBodyWeight] = useState(78);
  const [lifts, setLifts] = useState({
    squat: { weight: 135, reps: 5 },
    bench: { weight: 95, reps: 6 },
    deadlift: { weight: 165, reps: 4 },
    ohp: { weight: 62.5, reps: 5 }
  });

  // --------------------------------------------------------------------------
  // ESTADO GLOBAL 3: EVALUACIÓN FÍSICA TRIMESTRAL, BÓVEDA Y RECAP ANUAL
  // --------------------------------------------------------------------------
  const [daysUntilRenewal, setDaysUntilRenewal] = useState(64); // Contador 90 días
  const [frontPhoto, setFrontPhoto] = useState(null);
  const [backPhoto, setBackPhoto] = useState(null);
  const [visualSymmetryScore, setVisualSymmetryScore] = useState(72); // 0-100 -> mapea a F..EX
  const [quarterlyHistory, setQuarterlyHistory] = useState([
    { quarter: 'Q1', label: 'Trimestre 1 (Base)', grade: 'D', bodyfat: '18.5%', note: 'Inicio de recomposición y control motor.' },
    { quarter: 'Q2', label: 'Trimestre 2 (Progreso)', grade: 'C', bodyfat: '15.8%', note: 'Aumento de densidad dorsal y hombro lateral.' },
    { quarter: 'Q3', label: 'Trimestre 3 (Actual)', grade: 'B', bodyfat: '13.4%', note: 'V-taper marcado y separación abdominal.' },
    { quarter: 'Q4', label: 'Trimestre 4 (Proyección)', grade: 'A', bodyfat: '11.5%', note: 'Pendiente de renovación trimestral.' }
  ]);
  const [showAnnualRecap, setShowAnnualRecap] = useState(false);

  // --------------------------------------------------------------------------
  // ESTADO GLOBAL 4: RUTINAS CIENTÍFICAS Y ESCÁNER DE RUTINA PROPIA
  // --------------------------------------------------------------------------
  const [routineEnv, setRoutineEnv] = useState('gimnasio');
  const [routineGoal, setRoutineGoal] = useState('hipertrofia');
  const [routineDaysPerWeek, setRoutineDaysPerWeek] = useState(4);

  const [customRoutineText, setCustomRoutineText] = useState(
    'Lunes: Press banca 4x8, Press inclinado mancuernas 4x10, Aperturas 3x12, Elevaciones laterales 4x15, Extensión tríceps 3x12.\nMiércoles: Jalón al pecho 4x10, Remo barra 3x8, Curl bíceps 4x12.\nViernes: Sentadilla 3x8, Curl femoral 3x12, Plancha 3x45s.'
  );
  const [customProgressStatus, setCustomProgressStatus] = useState('estancado');
  const [uploadedFileName, setUploadedFileName] = useState('');

  // --------------------------------------------------------------------------
  // ESTADO GLOBAL 5: CONTADOR DE SUEÑO Y RECUPERACIÓN SEMANAL
  // --------------------------------------------------------------------------
  const [sleepDays, setSleepDays] = useState([7.5, 7.0, 6.5, 8.0, 7.5, 8.5, 7.0]); // Total: 52.0h (Óptimo)
  const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // --------------------------------------------------------------------------
  // ESTADO GLOBAL 6: AVATAR PERSONALIZABLE Y COSMÉTICOS
  // --------------------------------------------------------------------------
  const [playerName, setPlayerName] = useState('HUNTER_01');
  const [avatar, setAvatar] = useState({
    gender: 'masculino',
    build: 'mesomorfo',
    skin: 'trigueno',
    hair: 'fade',
    top: 'compresion',
    belt: true,
    wristWraps: true,
    visor: true,
    aura: 'rango',
    bg: 'laboratorio'
  });

  // --------------------------------------------------------------------------
  // CÁLCULOS DERIVADOS CONECTADOS EN TIEMPO REAL
  // --------------------------------------------------------------------------
  const rankInfo = useMemo(() => getCompetitiveRankInfo(totalLP), [totalLP]);
  const strengthMetrics = useMemo(() => calculateStrengthAnalysis(bodyWeight, lifts), [bodyWeight, lifts]);
  const sleepMetrics = useMemo(() => calculateSleepMetrics(sleepDays), [sleepDays]);
  const routineAudit = useMemo(
    () => analyzeCustomRoutine(customRoutineText, customProgressStatus),
    [customRoutineText, customProgressStatus]
  );

  // Rango físico derivado de Q3 (actual)
  const currentPhysicalGrade = useMemo(() => {
    const q3 = quarterlyHistory.find((q) => q.quarter === 'Q3');
    return SCIENTIFIC_GRADES.find((g) => g.grade === (q3?.grade || 'B')) || SCIENTIFIC_GRADES[4];
  }, [quarterlyHistory]);

  // Helper de notificación HUD sin usar alert()
  const triggerToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev && Date.now() - prev.id >= 3600 ? null : prev));
    }, 3800);
  };

  // Modificador de LP con detección automática de ascenso/descenso de división o rango
  const modifyLP = (delta, reason = '') => {
    const prevInfo = getCompetitiveRankInfo(totalLP);
    const nextLP = Math.max(0, Math.min(8999, totalLP + delta));
    const nextInfo = getCompetitiveRankInfo(nextLP);

    setTotalLP(nextLP);

    if (nextInfo.totalTierIndex > prevInfo.totalTierIndex) {
      setRankBanner({
        type: 'promotion',
        from: prevInfo.fullTitle,
        to: nextInfo.fullTitle,
        color: nextInfo.rank.color
      });
    } else if (nextInfo.totalTierIndex < prevInfo.totalTierIndex) {
      setRankBanner({
        type: 'demotion',
        from: prevInfo.fullTitle,
        to: nextInfo.fullTitle,
        color: '#EF4444'
      });
    } else if (reason) {
      triggerToast(`${reason} (${delta >= 0 ? `+${delta}` : delta} LP)`, delta >= 0 ? 'success' : 'warning');
    }
  };

  // Acciones de Retos Diarios
  const handleAddChallenge = (e) => {
    e.preventDefault();
    if (!newChallengeTitle.trim()) return;
    const item = {
      id: `ch-${Date.now()}`,
      title: newChallengeTitle.trim(),
      category: newChallengeCategory,
      lpReward: Number(newChallengeLP) || 35,
      status: 'active',
      contingencyNote: ''
    };
    setDailyChallenges((prev) => [item, ...prev]);
    setNewChallengeTitle('');
    triggerToast('Nuevo reto diario declarado en el Sistema.', 'info');
  };

  const handleCompleteChallenge = (challenge) => {
    if (challenge.status === 'completed') return;
    setDailyChallenges((prev) =>
      prev.map((c) => (c.id === challenge.id ? { ...c, status: 'completed' } : c))
    );
    setStreak((s) => s + 1);
    modifyLP(challenge.lpReward, `Reto completado: ${challenge.title}`);
  };

  const handleFailChallenge = (challenge) => {
    setDailyChallenges((prev) => prev.filter((c) => c.id !== challenge.id));
    setNextWeekPending((prev) => [
      {
        id: `fail-${Date.now()}`,
        title: challenge.title,
        category: challenge.category,
        lpReward: challenge.lpReward,
        failedDate: 'Hoy (Mover a Próxima Semana)'
      },
      ...prev
    ]);
    setStreak(0);
    modifyLP(-20, 'Reto fallido. Enviado a cola de recuperación semanal.');
  };

  const handleConfirmContingency = () => {
    if (!contingencyTarget) return;
    const preset = CONTINGENCY_PRESETS.find((p) => p.id === selectedPresetId) || CONTINGENCY_PRESETS[0];

    setDailyChallenges((prev) =>
      prev.map((c) =>
        c.id === contingencyTarget.id
          ? {
              ...c,
              title: `${preset.title}`,
              category: 'Contingencia Casa',
              lpReward: preset.lpBonus,
              status: 'contingency',
              contingencyNote: `${preset.detail}${customJustificationNote ? ` | Nota: ${customJustificationNote}` : ''}`
            }
          : c
      )
    );

    setContingencyTarget(null);
    setCustomJustificationNote('');
    triggerToast('Desafío de Contingencia en Casa generado. ¡Racha protegida!', 'success');
  };

  const handleRetakePendingChallenge = (pendingItem) => {
    setNextWeekPending((prev) => prev.filter((p) => p.id !== pendingItem.id));
    setDailyChallenges((prev) => [
      {
        id: `retake-${Date.now()}`,
        title: `[RETOMADO] ${pendingItem.title}`,
        category: pendingItem.category,
        lpReward: pendingItem.lpReward + 10, // Bonus de redención
        status: 'active',
        contingencyNote: ''
      },
      ...prev
    ]);
    triggerToast('Reto retomado para la nueva semana (+10 LP bonus de redención).', 'info');
  };

  // Generador de imagen de muestra anatómica para la Bóveda Segura
  const generateSyntheticScan = (side) => {
    const c = document.createElement('canvas');
    c.width = 280;
    c.height = 340;
    const ctx = c.getContext('2d');

    ctx.fillStyle = '#0B1324';
    ctx.fillRect(0, 0, 280, 340);

    // Silueta atlética renderizada
    ctx.fillStyle = '#1E293B';
    ctx.beginPath();
    ctx.arc(140, 48, 24, 0, Math.PI * 2); // Cabeza (será redactada automáticamente)
    ctx.fill();

    // Torso V-taper
    const grad = ctx.createLinearGradient(80, 85, 200, 220);
    grad.addColorStop(0, '#00F0FF');
    grad.addColorStop(1, '#A855F7');
    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.moveTo(82, 92);
    ctx.lineTo(198, 92);
    ctx.lineTo(172, 210);
    ctx.lineTo(108, 210);
    ctx.closePath();
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#00F0FF';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Marcas de escaneo muscular
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`SCAN BIOMÉTRICO ${side.toUpperCase()}`, 140, 150);
    ctx.fillStyle = '#10B981';
    ctx.fillText('SIMETRÍA: 94.2% | DENSIDAD: ALTA', 140, 172);

    const url = c.toDataURL('image/png');
    if (side === 'Frente') setFrontPhoto(url);
    else setBackPhoto(url);
    triggerToast(`Escáner ${side} procesado con filtro facial automático.`, 'success');
  };

  // Enviar sesión generada directamente a Retos Diarios
  const sendRoutineDayToChallenges = (dayObj) => {
    const summary = dayObj.exercises.map((ex) => `${ex.name} (${ex.sets})`).join(' + ');
    setDailyChallenges((prev) => [
      {
        id: `rut-${Date.now()}`,
        title: `${dayObj.day}: ${summary}`,
        category: routineEnv === 'casa' ? 'Casa' : 'Gimnasio',
        lpReward: 45,
        status: 'active',
        contingencyNote: ''
      },
      ...prev
    ]);
    setActiveTab('comando');
    triggerToast('Sesión enviada a tus Retos Diarios Declarados.', 'success');
  };

  // Ítems de navegación
  const navItems = [
    { id: 'comando', label: 'Comando & Retos', icon: Shield, badge: rankInfo.fullTitle },
    { id: 'fuerza', label: 'Fuerza Científica', icon: Dumbbell, badge: `${strengthMetrics.relativeGrade.grade}/${strengthMetrics.absoluteGrade.grade}` },
    { id: 'fisico', label: 'Evaluación & Bóveda', icon: Lock, badge: `Físico ${currentPhysicalGrade.grade}` },
    { id: 'rutinas', label: 'Rutinas & Escáner', icon: Cpu, badge: 'Biomecánica' },
    { id: 'sueno', label: 'Sueño & Recuperación', icon: Moon, badge: `${sleepMetrics.totalHours}h` },
    { id: 'avatar', label: 'Avatar & Cosméticos', icon: User, badge: 'HUD' }
  ];

  const activeRoutine = BIOMECHANICAL_ROUTINES[routineEnv]?.[routineGoal] || BIOMECHANICAL_ROUTINES.gimnasio.hipertrofia;

  return (
    <div className="min-h-screen bg-[#05070E] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* ====================================================================
          BARRA SUPERIOR HUD PERSISTENTE
         ==================================================================== */}
      <header className="sticky top-0 z-40 bg-[#070B16]/95 backdrop-blur-md border-b border-slate-800/90 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Logo y Título del Sistema */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px] shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <div className="w-full h-full bg-[#070B16] rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-black tracking-wider uppercase bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent">
                    PROTOCOLO EX
                  </h1>
                  <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                    SYSTEM FITNESS v4.2
                  </span>
                </div>
                <p className="text-[11px] font-mono text-slate-400">
                  OPERADOR: <span className="text-slate-200 font-semibold">{playerName}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Indicadores Globales HUD */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
            {/* Rango Competitivo Actual */}
            <div
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg border bg-slate-900/90"
              style={{ borderColor: rankInfo.rank.color }}
            >
              <Trophy className="w-3.5 h-3.5" style={{ color: rankInfo.rank.color }} />
              <div className="text-xs font-mono">
                <span className="text-slate-400 hidden md:inline">RANGO: </span>
                <span className="font-bold" style={{ color: rankInfo.rank.color }}>
                  {rankInfo.fullTitle}
                </span>
              </div>
            </div>

            {/* Rango Físico */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-purple-500/40 bg-purple-950/30 text-xs font-mono">
              <span className="text-slate-400">FÍSICO:</span>
              <span className="font-bold text-purple-300">{currentPhysicalGrade.grade}</span>
            </div>

            {/* Rango Fuerza Relativa */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-cyan-500/40 bg-cyan-950/30 text-xs font-mono">
              <span className="text-slate-400">FUERZA REL:</span>
              <span className="font-bold text-cyan-300">{strengthMetrics.relativeGrade.grade}</span>
            </div>

            {/* Estado Sueño */}
            <button
              type="button"
              onClick={() => setActiveTab('sueno')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition ${
                sleepMetrics.status === 'critical'
                  ? 'border-red-500/70 bg-red-950/50 text-red-300 animate-pulse'
                  : sleepMetrics.status === 'warning'
                  ? 'border-amber-500/60 bg-amber-950/40 text-amber-300'
                  : 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{sleepMetrics.totalHours}h/sem</span>
            </button>

            {/* Racha */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{streak}d</span>
            </div>
          </div>
        </div>

        {/* Barra de Navegación de los 6 Módulos */}
        <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block border-t border-slate-800/80 bg-[#060913]`}>
          <div className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between lg:justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/80 text-white shadow-[0_0_15px_rgba(0,240,255,0.18)]'
                      : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* ALERTA FISIOLÓGICA GLOBAL SI HAY DEUDA DE SUEÑO */}
      {sleepMetrics.status !== 'optimal' && sleepMetrics.status !== 'excess' && (
        <div className="bg-gradient-to-r from-red-950/80 via-amber-950/70 to-red-950/80 border-b border-amber-500/40 px-4 py-2">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>MODIFICADOR DE SUEÑO ACTIVO ({sleepMetrics.totalHours}h / 49-63h rec.):</strong>{' '}
                {sleepMetrics.advisory}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('sueno')}
              className="shrink-0 px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 font-mono text-[11px]"
            >
              Ajustar Sueño →
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          CONTENIDO PRINCIPAL DE MÓDULOS
         ==================================================================== */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* ==================================================================
            MÓDULO 1: PANEL DE COMANDO Y RETOS DIARIOS
           ================================================================== */}
        {activeTab === 'comando' && (
          <div className="space-y-6">
            {/* Fila Superior: Tarjeta de Rango Competitivo (15 Rangos x 6 Divisiones) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Panel de Rango Actual */}
              <div
                className={`lg:col-span-7 rounded-2xl border p-6 bg-gradient-to-br ${rankInfo.rank.badgeBg} relative overflow-hidden shadow-2xl`}
                style={{ borderColor: rankInfo.rank.color }}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
                  <RankEmblemSVG rankIndex={rankInfo.rankIndex} color={rankInfo.rank.color} size={96} />

                  <div className="flex-1 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-black/60 border border-slate-700 text-[11px] font-mono text-slate-300 mb-2">
                      <span>LIGA: {rankInfo.rank.tierGroup.toUpperCase()}</span>
                      <span>•</span>
                      <span>DIVISIÓN {rankInfo.division} DE 6</span>
                    </div>

                    <h2
                      className="text-3xl sm:text-4xl font-black tracking-tight uppercase"
                      style={{ color: rankInfo.rank.color, textShadow: `0 0 24px ${rankInfo.rank.glow}` }}
                    >
                      {rankInfo.fullTitle}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Puntos de Liga Totales: <strong className="font-mono text-white">{rankInfo.totalLP} LP</strong>{' '}
                      <span className="text-slate-400">
                        ({rankInfo.isMaxRank ? 'Cúspide del Sistema alcanzada' : `${100 - rankInfo.divisionLP} LP para siguiente división`})
                      </span>
                    </p>

                    {/* Barra de progreso de división (0 a 100 LP) */}
                    <div className="mt-4">
                      <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                        <span>PROGRESO DE DIVISIÓN</span>
                        <span>{rankInfo.isMaxRank ? '100 / 100 LP (MAX)' : `${rankInfo.divisionLP} / 100 LP`}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-black/70 border border-slate-700/80 overflow-hidden p-0.5">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${rankInfo.isMaxRank ? 100 : rankInfo.divisionLP}%`,
                            backgroundColor: rankInfo.rank.color,
                            boxShadow: `0 0 12px ${rankInfo.rank.color}`
                          }}
                        />
                      </div>
                    </div>

                    {/* Controles de Prueba Rápida de Ascenso/Descenso */}
                    <div className="mt-5 pt-4 border-t border-white/10">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Simulador de Puntos de Rango (Prueba Rápida):
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        <button
                          type="button"
                          onClick={() => modifyLP(35, 'Simulación: Reto cumplido')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold transition"
                        >
                          +35 LP
                        </button>
                        <button
                          type="button"
                          onClick={() => modifyLP(100, 'Simulación: Ascenso de división')}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold transition"
                        >
                          +100 LP (Subir Div.)
                        </button>
                        <button
                          type="button"
                          onClick={() => modifyLP(-35, 'Simulación: Penalización')}
                          className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 text-xs font-mono font-bold transition"
                        >
                          -35 LP
                        </button>
                        <button
                          type="button"
                          onClick={() => modifyLP(-100, 'Simulación: Descenso de división')}
                          className="px-3 py-1.5 rounded-lg bg-rose-900/40 hover:bg-rose-900/60 border border-rose-500/50 text-rose-300 text-xs font-mono font-bold transition"
                        >
                          -100 LP (Bajar Div.)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mapa de la Escala de 15 Rangos (Tierra 6 -> Challenger 1) */}
              <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#090D1A] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                      Jerarquía del Sistema (15 Rangos × 6 Div.)
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">Tierra 6 → Challenger 1</span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-1.5 max-h-56 overflow-y-auto pr-1">
                    {COMPETITIVE_RANKS.map((r, idx) => {
                      const isCurrent = idx === rankInfo.rankIndex;
                      const isUnlocked = idx <= rankInfo.rankIndex;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => {
                            // Permite saltar directamente al rango para inspeccionarlo
                            setTotalLP(idx * 600 + 250);
                            triggerToast(`Vista previa calibrada en ${r.name} 4`, 'info');
                          }}
                          className={`px-2 py-1.5 rounded-lg border text-left transition flex items-center justify-between ${
                            isCurrent
                              ? 'bg-slate-800/90 shadow-md scale-[1.02]'
                              : isUnlocked
                              ? 'bg-slate-900/70 border-slate-800 opacity-90 hover:opacity-100'
                              : 'bg-slate-950/60 border-slate-900 opacity-50 hover:opacity-80'
                          }`}
                          style={{ borderColor: isCurrent ? r.color : undefined }}
                        >
                          <span className="text-[11px] font-bold truncate" style={{ color: r.color }}>
                            {idx + 1}. {r.name}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-mono px-1 rounded bg-black/70 text-white">
                              D{rankInfo.division}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Click en cualquier rango para calibrar vista</span>
                  <span className="font-mono text-cyan-400">90 DIVISIONES TOTALES</span>
                </div>
              </div>
            </div>

            {/* Fila Inferior: Gestor de Retos Diarios Declarados + Cola de Próxima Semana */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Columna Izquierda: Retos Diarios Activos */}
              <div className="lg:col-span-8 space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-[#090D1A] p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Target className="w-5 h-5 text-cyan-400" />
                        Retos Diarios Declarados al Sistema
                      </h3>
                      <p className="text-xs text-slate-400">
                        Declara tus pesos o metas del día. Si surge un imprevisto, justifícalo para activar un desafío en casa.
                      </p>
                    </div>
                  </div>

                  {/* Formulario para Declarar Nuevo Reto */}
                  <form onSubmit={handleAddChallenge} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 mb-5 p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                    <input
                      type="text"
                      value={newChallengeTitle}
                      onChange={(e) => setNewChallengeTitle(e.target.value)}
                      placeholder="Ej. Gym: Sentadilla 140kg 4x6 + Press Banca 95kg 4x8..."
                      className="sm:col-span-6 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <select
                      value={newChallengeCategory}
                      onChange={(e) => setNewChallengeCategory(e.target.value)}
                      className="sm:col-span-3 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Gimnasio">Gimnasio</option>
                      <option value="Cardio Exterior">Cardio Exterior</option>
                      <option value="Casa">Casa</option>
                      <option value="Movilidad">Movilidad</option>
                    </select>
                    <button
                      type="submit"
                      className="sm:col-span-3 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition shadow-lg"
                    >
                      <Plus className="w-4 h-4" /> Declarar Reto
                    </button>
                  </form>

                  {/* Lista de Retos Declarados */}
                  <div className="space-y-3">
                    {dailyChallenges.length === 0 ? (
                      <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl text-xs text-slate-500">
                        No hay retos activos hoy. Declara tu próximo objetivo arriba.
                      </div>
                    ) : (
                      dailyChallenges.map((ch) => (
                        <div
                          key={ch.id}
                          className={`p-4 rounded-xl border transition ${
                            ch.status === 'completed'
                              ? 'bg-emerald-950/20 border-emerald-500/40'
                              : ch.status === 'contingency'
                              ? 'bg-purple-950/25 border-purple-500/50'
                              : 'bg-slate-900/70 border-slate-800'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                                  {ch.category}
                                </span>
                                <span className="text-[11px] font-mono font-bold text-amber-400">
                                  +{ch.lpReward} LP
                                </span>
                                {ch.status === 'completed' && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                    ✓ COMPLETADO
                                  </span>
                                )}
                                {ch.status === 'contingency' && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                                    ⚡ CONTINGENCIA EN CASA ACTIVA
                                  </span>
                                )}
                              </div>
                              <h4 className="text-sm font-bold text-white">{ch.title}</h4>
                              {ch.contingencyNote && (
                                <p className="text-xs text-purple-200/90 bg-purple-950/40 p-2 rounded-lg border border-purple-500/30 mt-1">
                                  {ch.contingencyNote}
                                </p>
                              )}
                            </div>

                            {/* Botones de Acción por Reto */}
                            {ch.status !== 'completed' && (
                              <div className="flex flex-wrap items-center gap-2 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleCompleteChallenge(ch)}
                                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/60 text-emerald-300 text-xs font-bold transition"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Completado (+{ch.lpReward} LP)
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleFailChallenge(ch)}
                                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/50 text-red-300 text-xs font-bold transition"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  No logrado
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setContingencyTarget(ch)}
                                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/50 text-amber-300 text-xs font-bold transition"
                                >
                                  <CloudRain className="w-3.5 h-3.5" />
                                  Justificar Imprevisto
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Retos Fallidos (Retomar la Próxima Semana) */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-red-900/50 bg-[#0B0912] p-5 h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="w-4 h-4 text-red-400" />
                    <h3 className="text-sm font-bold text-red-300 uppercase tracking-wide">
                      Retomar Próxima Semana
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    Los retos marcados como <span className="text-red-400 font-semibold">FALLIDOS</span> quedan bloqueados aquí hasta el reinicio semanal para su revancha.
                  </p>

                  <div className="space-y-3">
                    {nextWeekPending.length === 0 ? (
                      <div className="p-6 rounded-xl border border-slate-800/80 text-center text-xs text-slate-500">
                        Sin retos fallidos pendientes. ¡Disciplina impecable!
                      </div>
                    ) : (
                      nextWeekPending.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/40 space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 font-bold">
                              FALLIDO • {item.failedDate}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">
                              +{item.lpReward + 10} LP Revancha
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-200">{item.title}</p>
                          <button
                            type="button"
                            onClick={() => handleRetakePendingChallenge(item)}
                            className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/50 text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Simular Nueva Semana: Retomar
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            MÓDULO 2: FUERZA ABSOLUTA Y RELATIVA (CIENCIA BIOMECÁNICA F A EX)
           ================================================================== */}
        {activeTab === 'fuerza' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Panel de Entrada de Marcas y Peso Corporal */}
              <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#090D1A] p-5 space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-cyan-400" />
                    Laboratorio de Fuerza Biomecánica
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Cálculo de 1RM estimado (fórmula híbrida Brzycki/Epley) y coeficiente científico DOTS.
                  </p>
                </div>

                {/* Peso Corporal */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <label className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                    <span>PESO CORPORAL DEL ATLETA</span>
                    <span className="text-cyan-400 font-bold">{bodyWeight} kg</span>
                  </label>
                  <input
                    type="range"
                    min="40"
                    max="150"
                    step="0.5"
                    value={bodyWeight}
                    onChange={(e) => setBodyWeight(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Inputs de los 4 Levantamientos */}
                <div className="space-y-3">
                  {[
                    { key: 'squat', label: 'Sentadilla Trasera (Squat)' },
                    { key: 'bench', label: 'Press de Banca (Bench Press)' },
                    { key: 'deadlift', label: 'Peso Muerto (Deadlift)' },
                    { key: 'ohp', label: 'Press Militar Estricto (OHP)' }
                  ].map((item) => (
                    <div key={item.key} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-200">{item.label}</span>
                        <span className="text-[11px] font-mono text-cyan-300">
                          1RM Est.:{' '}
                          <strong>
                            {strengthMetrics.exercises.find((e) => e.key === item.key)?.oneRM} kg
                          </strong>
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 mb-1">PESO (KG)</label>
                          <input
                            type="number"
                            min="0"
                            max="500"
                            step="2.5"
                            value={lifts[item.key].weight}
                            onChange={(e) =>
                              setLifts((prev) => ({
                                ...prev,
                                [item.key]: { ...prev[item.key], weight: Number(e.target.value) }
                              }))
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 mb-1">REPETICIONES</label>
                          <input
                            type="number"
                            min="1"
                            max="20"
                            value={lifts[item.key].reps}
                            onChange={(e) =>
                              setLifts((prev) => ({
                                ...prev,
                                [item.key]: { ...prev[item.key], reps: Number(e.target.value) }
                              }))
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel de Resultados Científicos: Fuerza Absoluta vs Relativa */}
              <div className="lg:col-span-7 space-y-5">
                {/* Dos Tarjetas Principales de Rango (F a EX) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Fuerza Absoluta */}
                  <div className="rounded-2xl border border-purple-500/50 bg-gradient-to-br from-purple-950/40 to-slate-950 p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300">
                          CLASIFICACIÓN NEURAL TOTAL
                        </span>
                        <h3 className="text-base font-bold text-white">Fuerza Absoluta</h3>
                      </div>
                      <div
                        className={`px-3.5 py-1.5 rounded-xl border text-2xl font-black font-mono ${strengthMetrics.absoluteGrade.bg}`}
                      >
                        {strengthMetrics.absoluteGrade.grade}
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-purple-200 mb-2">
                      {strengthMetrics.absoluteGrade.label}
                    </p>
                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-black/50 border border-slate-800 text-xs font-mono mb-2">
                      <div>
                        <span className="text-slate-400 block text-[10px]">TOTAL SBD</span>
                        <span className="text-white font-bold">{strengthMetrics.sbdTotal} kg</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">ÍNDICE DOTS</span>
                        <span className="text-purple-300 font-bold">{strengthMetrics.dotsScore} pts</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400">{strengthMetrics.absoluteGrade.desc}</p>
                  </div>

                  {/* Fuerza Relativa */}
                  <div className="rounded-2xl border border-cyan-500/50 bg-gradient-to-br from-cyan-950/40 to-slate-950 p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300">
                          EFICIENCIA PESO / POTENCIA
                        </span>
                        <h3 className="text-base font-bold text-white">Fuerza Relativa</h3>
                      </div>
                      <div
                        className={`px-3.5 py-1.5 rounded-xl border text-2xl font-black font-mono ${strengthMetrics.relativeGrade.bg}`}
                      >
                        {strengthMetrics.relativeGrade.grade}
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-cyan-200 mb-2">
                      {strengthMetrics.relativeGrade.label}
                    </p>
                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-black/50 border border-slate-800 text-xs font-mono mb-2">
                      <div>
                        <span className="text-slate-400 block text-[10px]">RATIO TOTAL/BW</span>
                        <span className="text-white font-bold">{strengthMetrics.relativeRatio}x BW</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">TOTAL 4 LIFTS</span>
                        <span className="text-cyan-300 font-bold">{strengthMetrics.grandTotal} kg</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400">{strengthMetrics.relativeGrade.desc}</p>
                  </div>
                </div>

                {/* Desglose Biomecánico por Ejercicio */}
                <div className="rounded-2xl border border-slate-800 bg-[#090D1A] p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Perfil Biomecánico por Patrón Motor
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">Escala: F → EX</span>
                  </div>

                  <div className="space-y-3.5">
                    {strengthMetrics.exercises.map((ex) => {
                      const pct = Math.min(100, Math.round((ex.ratio / (ex.targetNext * 1.4)) * 100));
                      return (
                        <div key={ex.key} className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded border text-xs font-black font-mono ${ex.grade.bg}`}
                              >
                                {ex.grade.grade}
                              </span>
                              <span className="text-xs font-bold text-white">{ex.name}</span>
                            </div>
                            <div className="text-xs font-mono">
                              <span className="text-cyan-300 font-bold">{ex.oneRM} kg</span>
                              <span className="text-slate-500 mx-1.5">|</span>
                              <span className="text-amber-300 font-bold">{ex.ratio}x BW</span>
                            </div>
                          </div>

                          {/* Barra comparativa */}
                          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden mb-2">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>

                          <p className="text-[11px] text-slate-400 leading-relaxed">{ex.biomech}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            MÓDULO 3: EVALUACIÓN FÍSICA TRIMESTRAL, BÓVEDA SEGURA Y RECAP ANUAL
           ================================================================== */}
        {activeTab === 'fisico' && (
          <div className="space-y-6">
            {/* Encabezado de Estado Trimestral y Contador Regresivo de 90 Días */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-900 via-[#090E1C] to-purple-950/30 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400">
                      AUDITORÍA MORFOLÓGICA TRIMESTRAL
                    </span>
                    <span className={`px-3 py-1 rounded-lg border text-sm font-black font-mono ${currentPhysicalGrade.bg}`}>
                      RANGO FÍSICO: {currentPhysicalGrade.grade}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-1">{currentPhysicalGrade.label}</h2>
                  <p className="text-xs text-slate-400 mb-4">{currentPhysicalGrade.desc}</p>

                  {/* Contador Regresivo 3 Meses (90 días) */}
                  <div className="p-4 rounded-xl bg-black/70 border border-slate-800 mb-4">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        RENOVACIÓN OBLIGATORIA (CICLO 90 DÍAS)
                      </span>
                      <span className="text-amber-300 font-bold">{daysUntilRenewal} DÍAS RESTANTES</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden mb-3">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 transition-all"
                        style={{ width: `${Math.round(((90 - daysUntilRenewal) / 90) * 100)}%` }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setDaysUntilRenewal((d) => Math.max(0, d - 15))}
                        className="flex-1 py-1.5 px-2 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-200 transition"
                      >
                        Avanzar 15 días
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDaysUntilRenewal(90);
                          triggerToast('Ciclo trimestral renovado por 90 días.', 'success');
                        }}
                        className="flex-1 py-1.5 px-2 rounded bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-[11px] font-mono text-cyan-300 transition"
                      >
                        Renovar Hoy (90d)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Indicador de Seguridad AES-256 */}
                <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-500/40 flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-emerald-300">
                      Bóveda Privada Cifrada (AES-256 / Zero-Face ID)
                    </p>
                    <p className="text-slate-300/90 text-[11px] mt-0.5">
                      Tus capturas de frente y espalda se procesan localmente en memoria con recorte/pixelado automático del rostro y eliminación de metadatos EXIF. Nunca se suben a servidores públicos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Módulo de Carga Segura (Frente y Espalda con Redacción Facial Automática) */}
              <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#090D1A] p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      Escáner Corporal Seguro (Frente & Espalda Sin Rostro)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Sube tus fotos o usa el escáner demo; el sistema censura automáticamente el área facial.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <PrivacyPhotoVaultCard
                    sideLabel="Vista Frontal"
                    imageDataUrl={frontPhoto}
                    onUploadImage={(url) => {
                      setFrontPhoto(url);
                      triggerToast('Foto frontal cifrada y rostro redactado.', 'success');
                    }}
                    onGenerateSample={() => generateSyntheticScan('Frente')}
                  />
                  <PrivacyPhotoVaultCard
                    sideLabel="Vista Dorsal (Espalda)"
                    imageDataUrl={backPhoto}
                    onUploadImage={(url) => {
                      setBackPhoto(url);
                      triggerToast('Foto dorsal cifrada y rostro redactado.', 'success');
                    }}
                    onGenerateSample={() => generateSyntheticScan('Espalda')}
                  />
                </div>

                {/* Calibrador de Evaluación Visual Trimestral */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="w-full sm:w-2/3">
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-400">ÍNDICE DE DEFINICIÓN & SIMETRÍA VISUAL</span>
                      <span className="text-cyan-300 font-bold">
                        {visualSymmetryScore}/100 → Rango {SCIENTIFIC_GRADES[Math.min(9, Math.floor(visualSymmetryScore / 10))].grade}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="99"
                      value={visualSymmetryScore}
                      onChange={(e) => setVisualSymmetryScore(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newGrade = SCIENTIFIC_GRADES[Math.min(9, Math.floor(visualSymmetryScore / 10))].grade;
                      setQuarterlyHistory((prev) =>
                        prev.map((q) => (q.quarter === 'Q3' ? { ...q, grade: newGrade } : q))
                      );
                      setDaysUntilRenewal(90);
                      triggerToast(`Evaluación trimestral guardada en Bóveda. Nuevo Rango Físico: ${newGrade}`, 'success');
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs transition shrink-0"
                  >
                    Registrar Evaluación
                  </button>
                </div>
              </div>
            </div>

            {/* Línea de Tiempo de Recap Anual (Q1, Q2, Q3, Q4) */}
            <div className="rounded-2xl border border-slate-800 bg-[#090D1A] p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-400" />
                    Evolución Trimestral y Recap Anual (Q1 → Q4)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Comparativa histórica de los 4 trimestres del año para verificar tu transformación física real.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAnnualRecap(!showAnnualRecap)}
                  className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/60 text-amber-200 text-xs font-bold flex items-center gap-2 transition"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {showAnnualRecap ? 'Ocultar Resumen Anual' : 'Desbloquear Recap Anual Comparativo'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quarterlyHistory.map((q, i) => {
                  const gradeObj = SCIENTIFIC_GRADES.find((g) => g.grade === q.grade) || SCIENTIFIC_GRADES[2];
                  return (
                    <div
                      key={q.quarter}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-mono font-bold text-slate-400">{q.label}</span>
                        <span className={`px-2.5 py-0.5 rounded border text-sm font-black font-mono ${gradeObj.bg}`}>
                          {q.grade}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-cyan-300 mb-1">Grasa Est.: {q.bodyfat}</div>
                      <p className="text-xs text-slate-400">{q.note}</p>
                      {i < 3 && (
                        <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-emerald-400">
                          ✓ VERIFICADO EN BÓVEDA
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Resumen Desplegable de Recap Anual */}
              {showAnnualRecap && (
                <div className="mt-5 p-5 rounded-xl bg-gradient-to-r from-cyan-950/50 via-purple-950/50 to-amber-950/40 border border-amber-400/50">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                        INFORME ANUAL CONSOLIDADO // PROTOCOLO EX
                      </span>
                      <h4 className="text-lg font-black text-white mt-0.5">
                        Progresión Anual: Rango D → Rango {quarterlyHistory[3].grade} (+4 Saltos de Grado)
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Reducción estimada de tejido adiposo del <strong>-7.0%</strong> con ganancia neta de masa libre de grasa y mejora sostenida en simetría dorsal y cintura escapular.
                      </p>
                    </div>
                    <div className="flex gap-3 shrink-0 font-mono text-xs">
                      <div className="p-3 rounded-lg bg-black/60 border border-slate-700 text-center">
                        <span className="block text-slate-400 text-[10px]">INICIO Q1</span>
                        <span className="text-lg font-black text-green-400">D</span>
                      </div>
                      <div className="flex items-center text-amber-400 font-bold">→</div>
                      <div className="p-3 rounded-lg bg-black/60 border border-amber-400/60 text-center">
                        <span className="block text-slate-400 text-[10px]">CIERRE Q4</span>
                        <span className="text-lg font-black text-amber-300">{quarterlyHistory[3].grade}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================
            MÓDULO 4: RUTINAS CIENTÍFICAS Y ESCÁNER DE RUTINA PROPIA
           ================================================================== */}
        {activeTab === 'rutinas' && (
          <div className="space-y-6">
            {/* Sección A: Generador Basado en Biomecánica */}
            <div className="rounded-2xl border border-slate-800 bg-[#090D1A] p-5 space-y-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    Generador de Rutinas Basadas en Biomecánica
                  </h2>
                  <p className="text-xs text-slate-400">
                    Programación estructurada según perfil de resistencia, longitud muscular bajo carga y gestión de fatiga.
                  </p>
                </div>

                {/* Selectores de Entorno, Objetivo y Días */}
                <div className="flex flex-wrap gap-2">
                  <select
                    value={routineEnv}
                    onChange={(e) => setRoutineEnv(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-950 border border-cyan-500/40 text-xs font-semibold text-cyan-200 focus:outline-none"
                  >
                    <option value="gimnasio">Entorno: Gimnasio</option>
                    <option value="casa">Entorno: Casa</option>
                    <option value="hibrido">Entorno: Híbrido (Casa + Gym)</option>
                  </select>

                  <select
                    value={routineGoal}
                    onChange={(e) => setRoutineGoal(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-950 border border-purple-500/40 text-xs font-semibold text-purple-200 focus:outline-none"
                  >
                    <option value="hipertrofia">Objetivo: Hipertrofia</option>
                    <option value="fuerza">Objetivo: Fuerza Máxima</option>
                    <option value="recomposicion">Objetivo: Recomposición</option>
                  </select>

                  <select
                    value={routineDaysPerWeek}
                    onChange={(e) => setRoutineDaysPerWeek(Number(e.target.value))}
                    className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200 focus:outline-none"
                  >
                    <option value={3}>3 días / semana</option>
                    <option value={4}>4 días / semana</option>
                    <option value={5}>5 días / semana</option>
                    <option value={6}>6 días / semana</option>
                  </select>
                </div>
              </div>

              {/* Fundamento Científico del Protocolo Seleccionado */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-purple-950/30 border border-cyan-500/30">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                    ENFOQUE: {activeRoutine.focus}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Frecuencia configurada: {routineDaysPerWeek} días/sem (Rotación Ondulante)
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{activeRoutine.rationale}</p>
              </div>

              {/* Bloques de Entrenamiento */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activeRoutine.days.map((dayBlock, dIdx) => (
                  <div key={dIdx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800">
                        <h3 className="text-sm font-bold text-white">{dayBlock.day}</h3>
                        <button
                          type="button"
                          onClick={() => sendRoutineDayToChallenges(dayBlock)}
                          className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/50 text-cyan-300 text-[11px] font-bold transition shrink-0"
                        >
                          + Enviar a Retos
                        </button>
                      </div>

                      <div className="space-y-3">
                        {dayBlock.exercises.map((ex, eIdx) => (
                          <div key={eIdx} className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80">
                            <div className="flex flex-wrap justify-between items-center gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-100">{ex.name}</span>
                              <span className="text-[11px] font-mono text-emerald-300 font-bold">
                                {ex.sets} • {ex.rir}
                              </span>
                            </div>
                            <div className="flex gap-3 text-[10px] font-mono text-slate-400 mb-1.5">
                              <span>Descanso: {ex.rest}</span>
                              <span>Tempo: {ex.tempo}</span>
                            </div>
                            <p className="text-[11px] text-cyan-200/80">
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

            {/* Sección B: Escáner y Auditor Científico de Rutina Propia */}
            <div className="rounded-2xl border border-purple-500/40 bg-[#090D1A] p-5">
              <div className="mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  Escáner y Auditor Biomecánico de Rutina Propia
                </h3>
                <p className="text-xs text-slate-400">
                  Pega tu planilla actual o sube un archivo/foto de tu rutina junto con tus resultados para detectar desbalances, volumen semanal y fatiga del SNC.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Input de Rutina y Estado de Progreso */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <label className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-200 text-xs font-bold transition">
                      <Upload className="w-3.5 h-3.5" />
                      Subir Archivo / Foto de Planilla
                      <input
                        type="file"
                        accept=".txt,.csv,.md,image/*"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          setUploadedFileName(f.name);
                          if (f.type.startsWith('text/')) {
                            const r = new FileReader();
                            r.onload = (ev) => setCustomRoutineText(String(ev.target?.result || ''));
                            r.readAsText(f);
                          } else {
                            setCustomRoutineText(
                              `[OCR PLANILLA: ${f.name}]\nDía 1: Press Banca 4x8, Press Inclinado 4x10, Aperturas 4x12, Tríceps Polea 4x15\nDía 2: Jalón Pecho 3x10, Curl Bíceps 4x12\nDía 3: Sentadilla 3x8, Prensa 3x10`
                            );
                          }
                          triggerToast(`Planilla "${f.name}" escaneada por el motor biomecánico.`, 'success');
                        }}
                        className="hidden"
                      />
                    </label>
                    {uploadedFileName && (
                      <span className="text-[11px] font-mono text-emerald-400 truncate max-w-[160px]">
                        ✓ {uploadedFileName}
                      </span>
                    )}
                  </div>

                  <textarea
                    rows={6}
                    value={customRoutineText}
                    onChange={(e) => setCustomRoutineText(e.target.value)}
                    placeholder="Escribe o pega aquí los ejercicios, series y repeticiones de tu rutina actual..."
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-400"
                  />

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      ¿CUÁLES SON TUS RESULTADOS ACTUALES CON ESTA RUTINA?
                    </label>
                    <select
                      value={customProgressStatus}
                      onChange={(e) => setCustomProgressStatus(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-purple-400 focus:outline-none"
                    >
                      <option value="progresando">Progresando bien en cargas y medidas</option>
                      <option value="estancado">Estancado sin subir pesos hace +3 semanas</option>
                      <option value="fatiga">Fatiga extrema / Molestias articulares</option>
                    </select>
                  </div>
                </div>

                {/* Diagnóstico Científico en Tiempo Real */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Barras de Volumen Semanal por Grupo */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono font-bold text-slate-300">
                        VOLUMEN SEMANAL ESTIMADO POR PATRÓN
                      </span>
                      <span className="text-[11px] font-mono text-purple-300">
                        Fatiga SNC: {routineAudit.cnsFatigue}
                      </span>
                    </div>

                    {routineAudit.volumeByGroup.map((grp) => (
                      <div key={grp.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-300">{grp.label}</span>
                          <span className="font-mono text-slate-400">
                            <strong className="text-white">{grp.sets} series</strong> (Óptimo: {grp.target})
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min(100, (grp.sets / 22) * 100)}%`,
                              backgroundColor: grp.color
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Hallazgos y Recomendaciones */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {routineAudit.findings.map((f, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs ${
                          f.type === 'alert'
                            ? 'bg-red-950/30 border-red-500/50 text-red-200'
                            : f.type === 'warning'
                            ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                            : 'bg-emerald-950/25 border-emerald-500/40 text-emerald-200'
                        }`}
                      >
                        <p className="font-bold mb-1">{f.title}</p>
                        <p className="text-[11px] opacity-90">{f.detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-cyan-950/25 border border-cyan-500/40 text-xs">
                    <p className="font-bold text-cyan-300 mb-1">Ajustes Científicos Recomendados:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                      {routineAudit.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            MÓDULO 5: CONTADOR DE SUEÑO Y RECUPERACIÓN SEMANAL
           ================================================================== */}
        {activeTab === 'sueno' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Registro Diario Lunes a Domingo */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#090D1A] p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Moon className="w-5 h-5 text-cyan-400" />
                    Registro Diario de Sueño y Arquitectura Circadiana
                  </h2>
                  <p className="text-xs text-slate-400">
                    Objetivo científico recomendado: <strong>49 a 63 horas semanales</strong> (7.0 a 9.0h por noche).
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSleepDays([7.5, 8.0, 7.5, 8.0, 7.5, 8.5, 8.0])}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono"
                  >
                    Simular Óptimo (55h)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSleepDays([5.5, 5.0, 6.0, 5.5, 5.0, 6.5, 5.5])}
                    className="px-2.5 py-1 rounded-lg bg-red-500/15 border border-red-500/40 text-red-300 text-[11px] font-mono"
                  >
                    Simular Déficit (39h)
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {dayNames.map((dayName, idx) => {
                  const hrs = sleepDays[idx];
                  const isLow = hrs < 7;
                  return (
                    <div
                      key={dayName}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
                    >
                      <div className="w-24 shrink-0">
                        <span className="text-xs font-bold text-slate-200 block">{dayName}</span>
                        <span className={`text-[10px] font-mono ${isLow ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {isLow ? 'Déficit leve' : 'Fase REM OK'}
                        </span>
                      </div>

                      <input
                        type="range"
                        min="3"
                        max="12"
                        step="0.5"
                        value={hrs}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setSleepDays((prev) => prev.map((d, i) => (i === idx ? val : d)));
                        }}
                        className="flex-1 accent-cyan-400 cursor-pointer"
                      />

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            setSleepDays((prev) =>
                              prev.map((d, i) => (i === idx ? Math.max(3, d - 0.5) : d))
                            )
                          }
                          className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-mono text-xs font-bold text-cyan-300">
                          {hrs.toFixed(1)}h
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setSleepDays((prev) =>
                              prev.map((d, i) => (i === idx ? Math.min(12, d + 0.5) : d))
                            )
                          }
                          className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Panel de Acumulación Semanal y Modificador Fisiológico */}
            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-2xl border border-slate-800 bg-[#090D1A] p-5 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                  ACUMULACIÓN SEMANAL DE DESCANSO
                </span>

                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-4xl font-black font-mono text-white">{sleepMetrics.totalHours}h</span>
                    <span className="text-xs text-slate-400 ml-2">
                      (Promedio: {sleepMetrics.avgHours}h / noche)
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
                      sleepMetrics.status === 'critical'
                        ? 'bg-red-950/60 border-red-500 text-red-300'
                        : sleepMetrics.status === 'warning'
                        ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                        : 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                    }`}
                  >
                    RECUPERACIÓN: {sleepMetrics.recoveryScore}%
                  </span>
                </div>

                {/* Barra visual comparada contra 49h - 63h */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>0h</span>
                    <span className="text-emerald-400">Zona Óptima: 49h – 63h</span>
                    <span>70h+</span>
                  </div>
                  <div className="w-full h-4 rounded-full bg-slate-950 border border-slate-800 relative overflow-hidden">
                    {/* Marcador de zona óptima 49h a 63h sobre escala de 70h */}
                    <div
                      className="absolute top-0 bottom-0 bg-emerald-500/20 border-x border-emerald-400/50"
                      style={{ left: '70%', width: '20%' }}
                    />
                    <div
                      className={`h-full transition-all duration-500 ${
                        sleepMetrics.status === 'critical'
                          ? 'bg-red-500'
                          : sleepMetrics.status === 'warning'
                          ? 'bg-amber-400'
                          : 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                      }`}
                      style={{ width: `${Math.min(100, (sleepMetrics.totalHours / 70) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Impacto en Rendimiento Físico */}
                <div className="space-y-2.5 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Síntesis Proteica Miofibrilar:</span>
                    <span className="font-mono font-bold text-slate-200">{sleepMetrics.proteinSynthesis}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Disponibilidad del SNC:</span>
                    <span className="font-mono font-bold text-cyan-300">{sleepMetrics.cnsReadiness}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Riesgo de Fallo en Retos Pesados:</span>
                    <span className="font-mono font-bold text-amber-300">{sleepMetrics.failureRisk}</span>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    sleepMetrics.status === 'critical'
                      ? 'bg-red-950/30 border-red-500/50 text-red-200'
                      : sleepMetrics.status === 'warning'
                      ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                      : 'bg-emerald-950/25 border-emerald-500/40 text-emerald-200'
                  }`}
                >
                  <HeartPulse className="w-4 h-4 inline mr-1.5 mb-0.5" />
                  {sleepMetrics.advisory}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            MÓDULO 6: AVATAR PERSONALIZABLE Y COSMÉTICOS
           ================================================================== */}
        {activeTab === 'avatar' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Tarjeta de Visualización en Vivo del Avatar */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#090D1A] p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    IDENTIDAD DEL JUGADOR // HUD
                  </span>
                  <span
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/70 border"
                    style={{ borderColor: rankInfo.rank.color, color: rankInfo.rank.color }}
                  >
                    {rankInfo.fullTitle}
                  </span>
                </div>

                <PlayerAvatarSVG
                  avatar={avatar}
                  rankColor={rankInfo.rank.color}
                  physicalGrade={currentPhysicalGrade.grade}
                />
              </div>

              {/* Alias del Jugador */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <label className="block text-[10px] font-mono text-slate-400 mb-1">
                  NOMBRE CLAVE DEL OPERADOR
                </label>
                <input
                  type="text"
                  maxLength={18}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Panel de Personalización de Rasgos y Cosméticos */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#090D1A] p-5 space-y-5">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-purple-400" />
                  Personalización de Avatar y Equipamiento Cosmético
                </h2>
                <p className="text-xs text-slate-400">
                  Configura tu silueta biomecánica, vestimenta técnica y aura vinculada a tu rango competitivo.
                </p>
              </div>

              {/* Rasgos Físicos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="block text-[11px] font-mono text-slate-400">SILUETA</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'masculino', label: 'Masculino' },
                      { id: 'femenino', label: 'Femenino' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setAvatar((a) => ({ ...a, gender: g.id }))}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold transition ${
                          avatar.gender === g.id
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="block text-[11px] font-mono text-slate-400">COMPLEXIÓN FÍSICA</label>
                  <select
                    value={avatar.build}
                    onChange={(e) => setAvatar((a) => ({ ...a, build: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
                  >
                    <option value="atletico">Atlético / Calisténico</option>
                    <option value="mesomorfo">Mesomorfo / Estético</option>
                    <option value="powerlifter">Powerlifter / Fuerza Bruta</option>
                    <option value="titan">Titán / Hipertrofia Élite</option>
                  </select>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="block text-[11px] font-mono text-slate-400">TONO DE PIEL</label>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { id: 'claro', hex: '#F5D0B5' },
                      { id: 'trigueno', hex: '#DCA882' },
                      { id: 'bronceado', hex: '#B97A56' },
                      { id: 'moreno', hex: '#8D5538' },
                      { id: 'oscuro', hex: '#5C3824' },
                      { id: 'cyber', hex: '#94A3B8' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setAvatar((a) => ({ ...a, skin: s.id }))}
                        className={`w-7 h-7 rounded-full border-2 transition ${
                          avatar.skin === s.id ? 'border-cyan-400 scale-110' : 'border-slate-700'
                        }`}
                        style={{ backgroundColor: s.hex }}
                        title={s.id}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="block text-[11px] font-mono text-slate-400">ESTILO DE CABELLO</label>
                  <select
                    value={avatar.hair}
                    onChange={(e) => setAvatar((a) => ({ ...a, hair: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
                  >
                    <option value="fade">Fade Moderno</option>
                    <option value="corto">Corto Táctico</option>
                    <option value="largo">Largo / Coleta</option>
                    <option value="spikes">Cyber-Spikes</option>
                    <option value="rapado">Rapado / Militar</option>
                  </select>
                </div>
              </div>

              {/* Cosméticos y Equipamiento */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                  Indumentaria Técnica & Accesorios
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'compresion', label: 'Compresión' },
                    { id: 'musculosa', label: 'Musculosa' },
                    { id: 'hoodie', label: 'Buzo Técnico' },
                    { id: 'sin_remera', label: 'Modo Física' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAvatar((a) => ({ ...a, top: item.id }))}
                      className={`py-2 px-2.5 rounded-lg border text-xs font-semibold transition ${
                        avatar.top === item.id
                          ? 'bg-purple-500/20 border-purple-400 text-purple-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Toggles de Accesorios */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { key: 'belt', label: 'Cinturón Powerlifting' },
                    { key: 'wristWraps', label: 'Muñequeras Neón' },
                    { key: 'visor', label: 'Visor Táctico HUD' }
                  ].map((acc) => (
                    <button
                      key={acc.key}
                      type="button"
                      onClick={() => setAvatar((a) => ({ ...a, [acc.key]: !a[acc.key] }))}
                      className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-between transition ${
                        avatar[acc.key]
                          ? 'bg-cyan-500/15 border-cyan-400/70 text-cyan-200'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      <span>{acc.label}</span>
                      <span className="font-mono text-[10px]">{avatar[acc.key] ? 'ON' : 'OFF'}</span>
                    </button>
                  ))}
                </div>

                {/* Aura y Fondo de Tarjeta */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">AURA ENERGÉTICA</label>
                    <select
                      value={avatar.aura}
                      onChange={(e) => setAvatar((a) => ({ ...a, aura: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    >
                      <option value="rango">Vinculada al Rango Actual ({rankInfo.rank.name})</option>
                      <option value="cian">Cian Eléctrico</option>
                      <option value="violeta">Violeta Soberano</option>
                      <option value="esmeralda">Verde Esmeralda</option>
                      <option value="dorado">Dorado Challenger</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">FONDO DE TARJETA</label>
                    <select
                      value={avatar.bg}
                      onChange={(e) => setAvatar((a) => ({ ...a, bg: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    >
                      <option value="laboratorio">Laboratorio Biomecánico</option>
                      <option value="matriz">Matriz Violeta HUD</option>
                      <option value="obsidiana">Eclipse Obsidiana</option>
                      <option value="dorado">Santuario Dorado</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ====================================================================
          MODAL DE JUSTIFICACIÓN DE IMPREVISTO -> DESAFÍO EN CASA
         ==================================================================== */}
      {contingencyTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl border border-amber-500/60 bg-[#0A0E1A] p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                  PROTOCOLO DE CONTINGENCIA // PROTECCIÓN DE RACHA
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">Justificar Imprevisto</h3>
              </div>
              <button
                type="button"
                onClick={() => setContingencyTarget(null)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Reto original: <strong className="text-white">{contingencyTarget.title}</strong>. Selecciona el motivo y el Sistema generará una alternativa equivalente en casa:
            </p>

            <div className="space-y-2">
              {CONTINGENCY_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedPresetId(preset.id)}
                  className={`w-full p-3 rounded-xl border text-left transition ${
                    selectedPresetId === preset.id
                      ? 'bg-amber-500/15 border-amber-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>
                      {preset.icon} {preset.label}
                    </span>
                    <span className="font-mono text-amber-300">+{preset.lpBonus} LP</span>
                  </div>
                  <p className="text-[11px] text-cyan-300 font-semibold">{preset.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{preset.detail}</p>
                </button>
              ))}
            </div>

            <input
              type="text"
              value={customJustificationNote}
              onChange={(e) => setCustomJustificationNote(e.target.value)}
              placeholder="Nota adicional opcional (ej. Tormenta eléctrica en mi zona)..."
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setContingencyTarget(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmContingency}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black transition"
              >
                Activar Desafío en Casa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL ANIMADO DE ASCENSO / DESCENSO DE RANGO O DIVISIÓN
         ==================================================================== */}
      {rankBanner && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className="w-full max-w-md rounded-2xl border-2 bg-[#080B14] p-6 text-center shadow-2xl space-y-4"
            style={{ borderColor: rankBanner.color, boxShadow: `0 0 40px ${rankBanner.color}55` }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-slate-700 text-xs font-mono uppercase tracking-widest">
              {rankBanner.type === 'promotion' ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ChevronUp className="w-4 h-4" /> ASCENSO DE SISTEMA
                </span>
              ) : (
                <span className="text-red-400 font-bold flex items-center gap-1">
                  <ChevronDown className="w-4 h-4" /> DESCENSO DE DIVISIÓN
                </span>
              )}
            </div>

            <div className="flex justify-center">
              <RankEmblemSVG rankIndex={rankInfo.rankIndex} color={rankBanner.color} size={88} />
            </div>

            <div>
              <p className="text-xs font-mono text-slate-400">
                {rankBanner.from} →
              </p>
              <h3
                className="text-3xl font-black uppercase tracking-wide mt-1"
                style={{ color: rankBanner.color }}
              >
                {rankBanner.to}
              </h3>
            </div>

            <p className="text-xs text-slate-300">
              {rankBanner.type === 'promotion'
                ? 'Tu disciplina biomecánica y cumplimiento diario han elevado tu clasificación en el Sistema.'
                : 'Se ha registrado una caída de puntos de liga. Completa tus retos declarados para recuperar tu división.'}
            </p>

            <button
              type="button"
              onClick={() => setRankBanner(null)}
              className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 transition"
              style={{ backgroundColor: rankBanner.color }}
            >
              Continuar en el Sistema
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          NOTIFICACIÓN HUD FLOTANTE (TOAST)
         ==================================================================== */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm px-4 py-3 rounded-xl bg-[#0B1120]/95 border border-cyan-500/60 shadow-2xl flex items-center gap-2.5 text-xs text-slate-100 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}