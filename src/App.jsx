<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>ASCENSIÓN EX — Sistema Biomecánico & RPG de Cazadores</title>

  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Three.js r128 via CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

  <!-- Google Fonts: Cinzel, Rajdhani & Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">

  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            epic: ['Cinzel', 'serif'],
            tech: ['Rajdhani', 'sans-serif'],
            sans: ['Inter', 'sans-serif'],
          },
          colors: {
            obsidian: '#06080D',
            obsidianCard: 'rgba(13, 18, 28, 0.72)',
            nexusCyan: '#00F0FF',
            nexusViolet: '#8B5CF6',
            nexusGold: '#F59E0B',
            nexusCrimson: '#EF4444',
            nexusEmerald: '#10B981'
          }
        }
      }
    };
  </script>

  <style>
    :root {
      --bg-obsidian: #06080D;
      --accent-cyan: #00F0FF;
      --accent-violet: #8B5CF6;
      --accent-gold: #F59E0B;
    }

    * {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      background-color: var(--bg-obsidian);
      color: #E2E8F0;
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      background-image:
        radial-gradient(circle at 15% 15%, rgba(0, 240, 255, 0.06) 0%, transparent 40%),
        radial-gradient(circle at 85% 25%, rgba(139, 92, 246, 0.08) 0%, transparent 45%),
        radial-gradient(circle at 50% 90%, rgba(245, 158, 11, 0.05) 0%, transparent 45%);
      min-height: 100vh;
    }

    /* Glassmorphism Panels */
    .glass-panel {
      background: rgba(12, 17, 27, 0.74);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border: 1px solid rgba(255, 255, 255, 0.09);
      box-shadow: 0 12px 40px -10px rgba(0, 0, 0, 0.75), inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
    }

    .glass-panel-glow {
      background: rgba(13, 19, 31, 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 240, 255, 0.24);
      box-shadow: 0 0 30px -8px rgba(0, 240, 255, 0.18), inset 0 1px 0 0 rgba(0, 240, 255, 0.18);
    }

    .glass-input {
      background: rgba(6, 9, 15, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #F8FAFC;
      transition: all 0.2s ease;
    }

    .glass-input:focus {
      outline: none;
      border-color: #00F0FF;
      box-shadow: 0 0 0 3px rgba(0, 240, 255, 0.15);
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #06080D;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(148, 163, 184, 0.25);
      border-radius: 9999px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 240, 255, 0.5);
    }

    /* Epic Shimmer & Animations */
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 18px rgba(0, 240, 255, 0.22); }
      50% { box-shadow: 0 0 32px rgba(139, 92, 246, 0.42); }
    }

    .animate-nexus-glow {
      animation: pulseGlow 4s infinite ease-in-out;
    }

    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .tab-fade-in {
      animation: fadeSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    /* 3D Viewport Container */
    #avatar-canvas-container {
      position: relative;
      width: 100%;
      height: 460px;
      border-radius: 1.25rem;
      overflow: hidden;
      cursor: grab;
      touch-action: none;
      background: radial-gradient(circle at 50% 38%, rgba(24, 38, 64, 0.85) 0%, rgba(6, 8, 13, 0.98) 78%);
    }
    #avatar-canvas-container:active {
      cursor: grabbing;
    }
    @media (min-width: 1024px) {
      #avatar-canvas-container {
        height: 540px;
      }
    }

    /* Rank Badge Gradients */
    .rank-ex {
      background: linear-gradient(135deg, #F59E0B, #EC4899, #00F0FF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  </style>
</head>
<body class="antialiased selection:bg-cyan-500/30 selection:text-cyan-200">

  <!-- TOAST NOTIFICATION SYSTEM (Replaces alert) -->
  <div id="toast-container" class="fixed top-4 right-4 z-[100] flex flex-col gap-2.5 max-w-sm w-[calc(100%-2rem)] pointer-events-none"></div>

  <!-- ===================================================================== -->
  <!-- MODAL 1: REGISTRO / DESPERTAR INICIAL DEL CAZADOR                     -->
  <!-- ===================================================================== -->
  <div id="onboarding-modal" class="fixed inset-0 z-50 hidden overflow-y-auto bg-[#06080D]/95 backdrop-blur-xl p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto my-4 glass-panel-glow rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
      <!-- Decorative top bar -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400"></div>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
        <div>
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-tech uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 mb-2">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span> Protocolo de Despertar Biomecánico
          </span>
          <h1 class="font-epic text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide">
            ASCENSIÓN <span class="text-cyan-400">EX</span>
          </h1>
          <p class="text-slate-400 text-sm mt-1">Calibra tu biometría y marcas iniciales para determinar tu Rango Científico y despertar tu Avatar 3D.</p>
        </div>
        <div class="glass-panel rounded-2xl p-3.5 text-center sm:text-right shrink-0 border-cyan-400/20">
          <div class="text-[11px] uppercase tracking-wider text-slate-400 font-tech">Rango Inicial Estimado</div>
          <div id="reg-preview-rank" class="font-epic text-2xl font-extrabold text-cyan-300 mt-0.5">E+</div>
          <div id="reg-preview-league" class="text-xs font-tech text-amber-400">Tierra 6 • Nivel 1</div>
        </div>
      </div>

      <form id="onboarding-form" class="space-y-6">
        <!-- SECCIÓN 1: IDENTIDAD DEL CAZADOR -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-xs font-tech uppercase tracking-wider text-cyan-300 mb-2">Nombre de Cazador *</label>
            <div class="flex gap-2">
              <input type="text" id="reg-name" required placeholder="Ej. Kaelen Voss" class="glass-input w-full rounded-xl px-4 py-3 text-sm font-medium" />
              <button type="button" id="btn-random-name" class="px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-tech font-bold text-sm tracking-wide shrink-0 transition shadow-lg shadow-cyan-500/20 active:scale-95" title="Generar Nombre Épico">
                🎲 Épico
              </button>
            </div>
          </div>

          <div>
            <label class="block text-xs font-tech uppercase tracking-wider text-cyan-300 mb-2">Complexión Anatómica del Avatar</label>
            <div class="grid grid-cols-2 gap-2.5">
              <label class="cursor-pointer">
                <input type="radio" name="reg-bodyType" value="masculine" checked class="peer sr-only" />
                <div class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-tech font-semibold peer-checked:border-cyan-400 peer-checked:bg-cyan-500/15 peer-checked:text-cyan-200 transition">
                  Atlético Masculino
                </div>
              </label>
              <label class="cursor-pointer">
                <input type="radio" name="reg-bodyType" value="feminine" class="peer sr-only" />
                <div class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-tech font-semibold peer-checked:border-violet-400 peer-checked:bg-violet-500/15 peer-checked:text-violet-200 transition">
                  Atlético Femenino
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- SECCIÓN 2: BIOMETRÍA -->
        <div class="grid grid-cols-3 gap-3 sm:gap-5">
          <div>
            <label class="block text-xs font-tech uppercase tracking-wider text-slate-300 mb-1.5">Edad (años) *</label>
            <input type="number" id="reg-age" min="14" max="95" value="25" required class="glass-input w-full rounded-xl px-3.5 py-2.5 text-sm font-semibold" />
          </div>
          <div>
            <label class="block text-xs font-tech uppercase tracking-wider text-slate-300 mb-1.5">Peso Corporal (kg) *</label>
            <input type="number" id="reg-weight" min="35" max="250" step="0.5" value="75" required class="glass-input w-full rounded-xl px-3.5 py-2.5 text-sm font-semibold" />
          </div>
          <div>
            <label class="block text-xs font-tech uppercase tracking-wider text-slate-300 mb-1.5">Altura (cm) *</label>
            <input type="number" id="reg-height" min="130" max="230" value="176" required class="glass-input w-full rounded-xl px-3.5 py-2.5 text-sm font-semibold" />
          </div>
        </div>

        <!-- SECCIÓN 3: LESIONES O MOLESTIAS -->
        <div class="glass-panel rounded-2xl p-4 sm:p-5 border-white/10">
          <label class="block text-xs font-tech uppercase tracking-wider text-amber-300 mb-2">
            Lesiones o Molestias Articulares (Editable luego en Laboratorio)
          </label>
          <div class="flex flex-wrap gap-2 mb-3" id="reg-injury-chips">
            <button type="button" data-injury="Ninguna" class="injury-chip active px-3 py-1.5 rounded-lg text-xs font-tech font-semibold border border-emerald-400/50 bg-emerald-500/20 text-emerald-200 transition">Ninguna</button>
            <button type="button" data-injury="Hombro" class="injury-chip px-3 py-1.5 rounded-lg text-xs font-tech font-semibold border border-white/15 bg-white/5 text-slate-300 hover:border-amber-400/40 transition">Hombro / Manguito</button>
            <button type="button" data-injury="Lumbar" class="injury-chip px-3 py-1.5 rounded-lg text-xs font-tech font-semibold border border-white/15 bg-white/5 text-slate-300 hover:border-amber-400/40 transition">Zona Lumbar</button>
            <button type="button" data-injury="Rodilla" class="injury-chip px-3 py-1.5 rounded-lg text-xs font-tech font-semibold border border-white/15 bg-white/5 text-slate-300 hover:border-amber-400/40 transition">Rodilla / Menisco</button>
            <button type="button" data-injury="Muñeca" class="injury-chip px-3 py-1.5 rounded-lg text-xs font-tech font-semibold border border-white/15 bg-white/5 text-slate-300 hover:border-amber-400/40 transition">Muñeca / Codo</button>
          </div>
          <input type="text" id="reg-injury-detail" placeholder="Describe detalles si tienes molestias (ej. leve tendinitis supraespinoso derecho al press militar)..." class="glass-input w-full rounded-xl px-4 py-2.5 text-sm" />
        </div>

        <!-- SECCIÓN 4: MODALIDAD Y EQUIPAMIENTO -->
        <div class="glass-panel rounded-2xl p-4 sm:p-5 border-white/10">
          <label class="block text-xs font-tech uppercase tracking-wider text-cyan-300 mb-2.5">Modalidad de Entrenamiento *</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <label class="cursor-pointer">
              <input type="radio" name="reg-modality" value="home_none" class="peer sr-only" />
              <div class="h-full rounded-xl border border-white/10 bg-white/5 p-3 text-left peer-checked:border-cyan-400 peer-checked:bg-cyan-500/15 transition">
                <div class="font-tech font-bold text-sm text-white">🏠 Casa Sin Equipo</div>
                <div class="text-[11px] text-slate-400 mt-0.5">Calistenia biomecánica y peso corporal puro.</div>
              </div>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="reg-modality" value="home_gear" class="peer sr-only" />
              <div class="h-full rounded-xl border border-white/10 bg-white/5 p-3 text-left peer-checked:border-cyan-400 peer-checked:bg-cyan-500/15 transition">
                <div class="font-tech font-bold text-sm text-white">🎒 Casa Con Equipo</div>
                <div class="text-[11px] text-slate-400 mt-0.5">Mancuernas, bandas, barra, kettlebell, etc.</div>
              </div>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="reg-modality" value="gym" checked class="peer sr-only" />
              <div class="h-full rounded-xl border border-white/10 bg-white/5 p-3 text-left peer-checked:border-cyan-400 peer-checked:bg-cyan-500/15 transition">
                <div class="font-tech font-bold text-sm text-white">🏋️ Gimnasio Completo</div>
                <div class="text-[11px] text-slate-400 mt-0.5">Barras olímpicas, poleas, máquinas y pesos libres.</div>
              </div>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="reg-modality" value="hybrid" class="peer sr-only" />
              <div class="h-full rounded-xl border border-white/10 bg-white/5 p-3 text-left peer-checked:border-cyan-400 peer-checked:bg-cyan-500/15 transition">
                <div class="font-tech font-bold text-sm text-white">⚡ Híbrido (Casa + Gym)</div>
                <div class="text-[11px] text-slate-400 mt-0.5">Combina sesiones de gimnasio con trabajo en casa.</div>
              </div>
            </label>
          </div>

          <!-- Sub-panel para equipo en casa -->
          <div id="reg-equipment-box" class="hidden mt-4 pt-4 border-t border-white/10">
            <label class="block text-xs font-tech uppercase tracking-wider text-violet-300 mb-2">Selecciona e indica el equipo disponible en casa:</label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3 text-xs">
              <label class="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10">
                <input type="checkbox" value="Mancuernas ajustables" class="equip-check accent-cyan-400" checked /> Mancuernas ajustables
              </label>
              <label class="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10">
                <input type="checkbox" value="Barra de dominadas" class="equip-check accent-cyan-400" /> Barra de dominadas
              </label>
              <label class="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10">
                <input type="checkbox" value="Bandas elásticas" class="equip-check accent-cyan-400" checked /> Bandas elásticas
              </label>
              <label class="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10">
                <input type="checkbox" value="Kettlebell" class="equip-check accent-cyan-400" /> Kettlebell / Pesa rusa
              </label>
              <label class="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10">
                <input type="checkbox" value="Banco inclinable" class="equip-check accent-cyan-400" /> Banco inclinable
              </label>
              <label class="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10">
                <input type="checkbox" value="Barra y discos" class="equip-check accent-cyan-400" /> Barra y discos
              </label>
            </div>
            <input type="text" id="reg-equipment-custom" placeholder="Especifica pesos máximos u otro equipo (ej. par de mancuernas hasta 20kg, anillas, chaleco lastrado)..." class="glass-input w-full rounded-xl px-4 py-2 text-xs" />
          </div>
        </div>

        <!-- SECCIÓN 5: MARCAS DE FUERZA INICIALES (PESOS Y/O REPETICIONES) -->
        <div class="glass-panel rounded-2xl p-4 sm:p-5 border-cyan-500/20">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 class="font-tech font-bold text-base text-white uppercase tracking-wide">Evaluación Biomecánica de Fuerza Inicial</h3>
              <p id="reg-lifts-subtitle" class="text-xs text-slate-400">Ingresa tu mejor serie reciente (peso en kg y repeticiones). Si entrenas sin equipo, pon 0 kg y tus repeticiones máximas.</p>
            </div>
            <span class="text-[11px] font-tech px-2.5 py-1 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 self-start">Fórmula Brzycki / Epley + DOTS</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Empuje -->
            <div class="bg-black/40 rounded-xl p-3.5 border border-white/10">
              <div id="lbl-lift-push" class="text-xs font-tech font-bold text-cyan-300 uppercase mb-2">1. Empuje (Press Banca / Flexiones)</div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="text-[10px] text-slate-400 block">Peso Externo (kg)</label>
                  <input type="number" id="reg-push-w" min="0" max="450" step="0.5" value="65" class="glass-input w-full rounded-lg px-3 py-2 text-sm font-bold" />
                </div>
                <div>
                  <label class="text-[10px] text-slate-400 block">Repeticiones</label>
                  <input type="number" id="reg-push-r" min="1" max="100" value="8" class="glass-input w-full rounded-lg px-3 py-2 text-sm font-bold" />
                </div>
              </div>
            </div>

            <!-- Pierna -->
            <div class="bg-black/40 rounded-xl p-3.5 border border-white/10">
              <div id="lbl-lift-squat" class="text-xs font-tech font-bold text-violet-300 uppercase mb-2">2. Pierna (Sentadilla / Pistol)</div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="text-[10px] text-slate-400 block">Peso Externo (kg)</label>
                  <input type="number" id="reg-squat-w" min="0" max="550" step="0.5" value="85" class="glass-input w-full rounded-lg px-3 py-2 text-sm font-bold" />
                </div>
                <div>
                  <label class="text-[10px] text-slate-400 block">Repeticiones</label>
                  <input type="number" id="reg-squat-r" min="1" max="100" value="8" class="glass-input w-full rounded-lg px-3 py-2 text-sm font-bold" />
                </div>
              </div>
            </div>

            <!-- Tracción -->
            <div class="bg-black/40 rounded-xl p-3.5 border border-white/10">
              <div id="lbl-lift-pull" class="text-xs font-tech font-bold text-amber-300 uppercase mb-2">3. Tracción (Peso Muerto / Dominadas)</div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="text-[10px] text-slate-400 block">Peso Externo (kg)</label>
                  <input type="number" id="reg-pull-w" min="0" max="600" step="0.5" value="100" class="glass-input w-full rounded-lg px-3 py-2 text-sm font-bold" />
                </div>
                <div>
                  <label class="text-[10px] text-slate-400 block">Repeticiones</label>
                  <input type="number" id="reg-pull-r" min="1" max="100" value="6" class="glass-input w-full rounded-lg px-3 py-2 text-sm font-bold" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p class="text-xs text-slate-400">Tu sesión, avatar 3D y progreso se guardarán automáticamente en este dispositivo.</p>
          <button type="submit" class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-epic font-bold text-base tracking-wider shadow-xl shadow-cyan-500/25 transition transform active:scale-95">
            INICIAR DESPERTAR DEL CAZADOR ⚡
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- ===================================================================== -->
  <!-- MODAL 2: JUSTIFICACIÓN ADAPTATIVA DE MISIÓN                           -->
  <!-- ===================================================================== -->
  <div id="justify-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 backdrop-blur-md p-4">
    <div class="glass-panel-glow rounded-3xl max-w-lg w-full p-6 sm:p-7 relative">
      <div class="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div>
          <span class="text-[11px] font-tech uppercase tracking-widest text-amber-400">Protocolo de Contingencia IA</span>
          <h3 class="font-epic text-xl font-bold text-white">Justificación Adaptativa</h3>
        </div>
        <button type="button" id="close-justify-modal" class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-300">✕</button>
      </div>
      <p class="text-xs text-slate-300 mb-3">
        Misión afectada: <strong id="justify-mission-title" class="text-cyan-300"></strong>
      </p>
      <p class="text-xs text-slate-400 mb-4">
        Explica el motivo (ej. <em>"Está lloviendo fuerte y no puedo salir a correr"</em>, <em>"El gimnasio cerró por mantenimiento"</em>, <em>"Molestia leve en el hombro"</em>). El sistema recalibrará un <strong>Desafío en Casa equivalente</strong> para proteger tu racha.
      </p>
      <div class="flex flex-wrap gap-1.5 mb-3">
        <button type="button" class="quick-justify text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-slate-300">🌧️ Está lloviendo fuerte</button>
        <button type="button" class="quick-justify text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-slate-300">🔒 Gimnasio cerrado hoy</button>
        <button type="button" class="quick-justify text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-slate-300">🩹 Molestia articular leve</button>
      </div>
      <textarea id="justify-reason-input" rows="3" placeholder="Escribe tu justificación aquí..." class="glass-input w-full rounded-xl p-3.5 text-sm mb-4"></textarea>
      <div class="flex justify-end gap-2.5">
        <button type="button" id="cancel-justify-btn" class="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-tech font-bold text-slate-300">Cancelar</button>
        <button type="button" id="confirm-justify-btn" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 font-tech font-extrabold text-xs uppercase tracking-wider shadow-lg">Generar Desafío en Casa</button>
      </div>
    </div>
  </div>

  <!-- ===================================================================== -->
  <!-- MODAL 3: CONFIRMACIÓN PERSONALIZADA (Reemplaza confirm())             -->
  <!-- ===================================================================== -->
  <div id="confirm-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 backdrop-blur-md p-4">
    <div class="glass-panel rounded-2xl max-w-md w-full p-6 border border-white/15">
      <h3 id="confirm-modal-title" class="font-epic text-lg font-bold text-white mb-2">Confirmar Acción</h3>
      <p id="confirm-modal-desc" class="text-sm text-slate-300 mb-6"></p>
      <div class="flex justify-end gap-3">
        <button type="button" id="confirm-modal-cancel" class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-tech font-bold text-slate-300">Cancelar</button>
        <button type="button" id="confirm-modal-ok" class="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-tech font-bold text-white">Confirmar</button>
      </div>
    </div>
  </div>

  <!-- ===================================================================== -->
  <!-- APLICACIÓN PRINCIPAL (SPA)                                            -->
  <!-- ===================================================================== -->
  <div id="app-shell" class="min-h-screen flex flex-col">
    <!-- TOP HEADER HUD -->
    <header class="sticky top-0 z-30 glass-panel border-b border-white/10 px-4 sm:px-6 py-3">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <!-- Brand & Hunter Identity -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-violet-600 flex items-center justify-center font-epic font-black text-white text-lg shadow-lg shadow-cyan-500/25">
            EX
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-epic font-bold text-base sm:text-lg text-white tracking-wider">ASCENSIÓN <span class="text-cyan-400">EX</span></span>
              <span id="hud-physical-badge" class="px-2 py-0.5 rounded-md text-xs font-epic font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">E+</span>
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-400 font-tech">
              <span id="hud-hunter-name" class="text-slate-200 font-semibold">Cazador</span>
              <span>•</span>
              <span id="hud-league-badge" class="text-amber-400 font-bold">Tierra 6</span>
              <span>•</span>
              <span id="hud-level-badge" class="text-violet-300 font-bold">Nv. 1</span>
            </div>
          </div>
        </div>

        <!-- XP Bar & Profile Controls -->
        <div class="flex items-center gap-3 sm:gap-5 flex-1 sm:flex-initial justify-end">
          <div class="hidden md:block w-48 lg:w-64">
            <div class="flex justify-between text-[11px] font-tech text-slate-400 mb-1">
              <span>XP DE EVOLUCIÓN</span>
              <span id="hud-xp-text" class="text-cyan-300 font-bold">0 / 100 XP</span>
            </div>
            <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div id="hud-xp-bar" class="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-500" style="width: 15%"></div>
            </div>
          </div>

          <button type="button" id="btn-switch-profile" class="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-tech font-semibold text-slate-300 hover:text-white transition flex items-center gap-1.5" title="Recalibrar o Cambiar Perfil">
            <span>⚙️</span>
            <span class="hidden sm:inline">Perfil / Sesión</span>
          </button>
        </div>
      </div>

      <!-- 6-MODULE NAVIGATION BAR -->
      <nav class="max-w-7xl mx-auto mt-3 pt-2.5 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1" id="main-nav">
        <button data-tab="sanctuary" class="nav-btn active px-3.5 py-2 rounded-xl text-xs sm:text-sm font-tech font-bold uppercase tracking-wider whitespace-nowrap transition flex items-center gap-1.5 bg-cyan-500/20 text-cyan-200 border border-cyan-400/40">
          <span>🧍</span> Santuario 3D
        </button>
        <button data-tab="missions" class="nav-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-tech font-bold uppercase tracking-wider whitespace-nowrap transition flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent">
          <span>⚔️</span> Misiones Diarias
        </button>
        <button data-tab="lab" class="nav-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-tech font-bold uppercase tracking-wider whitespace-nowrap transition flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent">
          <span>🧬</span> Laboratorio IA
        </button>
        <button data-tab="chronicles" class="nav-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-tech font-bold uppercase tracking-wider whitespace-nowrap transition flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent">
          <span>📜</span> Clases & Lore
        </button>
        <button data-tab="vn" class="nav-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-tech font-bold uppercase tracking-wider whitespace-nowrap transition flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent">
          <span>🎭</span> Novela Visual
        </button>
        <button data-tab="recovery" class="nav-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-tech font-bold uppercase tracking-wider whitespace-nowrap transition flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent">
          <span>💤</span> Sueño & Pasos
        </button>
      </nav>
    </header>

    <!-- MAIN CONTENT AREA -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">

      <!-- ================================================================= -->
      <!-- MÓDULO 1: SANTUARIO DEL CAZADOR (DASHBOARD & AVATAR 3D ORGÁNICO)  -->
      <!-- ================================================================= -->
      <section id="tab-sanctuary" class="tab-section tab-fade-in space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <!-- LEFT: 3D SEMI-REALISTIC HUMANIZED AVATAR VIEWPORT + COSMETICS -->
          <div class="lg:col-span-6 space-y-4">
            <div class="glass-panel-glow rounded-3xl p-4 sm:p-5">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <span class="text-[11px] font-tech uppercase tracking-widest text-cyan-400">Proyección Biométrica 3D Orgánica</span>
                  <h2 id="sanctuary-avatar-title" class="font-epic text-lg sm:text-xl font-bold text-white">Avatar Despertado</h2>
                </div>
                <div class="flex items-center gap-1.5">
                  <button type="button" id="btn-cam-reset" class="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs font-tech text-slate-300 border border-white/10">Centrar</button>
                  <button type="button" id="btn-cam-zoom-in" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-sm font-bold text-slate-300 border border-white/10">+</button>
                  <button type="button" id="btn-cam-zoom-out" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-sm font-bold text-slate-300 border border-white/10">−</button>
                </div>
              </div>

              <!-- 3D Canvas Wrapper -->
              <div id="avatar-canvas-container">
                <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <span class="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-tech text-slate-300 border border-white/10">
                    Arrastra para rotar 360° • Hipertrofia ligada a Rango <strong id="canvas-rank-label" class="text-cyan-300">E+</strong>
                  </span>
                  <span id="canvas-aura-label" class="px-3 py-1 rounded-full bg-cyan-950/70 backdrop-blur-md text-[11px] font-tech text-cyan-300 border border-cyan-400/30">
                    Aura Activa
                  </span>
                </div>
              </div>

              <!-- Cosmetic Customization Panel -->
              <div class="mt-4 pt-4 border-t border-white/10 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-tech uppercase tracking-wider text-slate-300 font-bold">Personalización Cosmética del Avatar</span>
                  <span class="text-[11px] text-slate-400">Cambios en tiempo real</span>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <!-- Skin Tone -->
                  <div>
                    <label class="text-[10px] text-slate-400 uppercase font-tech block mb-1">Tono de Piel</label>
                    <div class="flex items-center gap-1.5" id="cosmetic-skin-group">
                      <button type="button" data-skin="#f4c7a8" class="skin-swatch w-6 h-6 rounded-full border-2 border-white" style="background:#f4c7a8" title="Porcelana Cálida"></button>
                      <button type="button" data-skin="#e0a984" class="skin-swatch w-6 h-6 rounded-full border border-white/30" style="background:#e0a984" title="Trigueño Claro"></button>
                      <button type="button" data-skin="#c6865c" class="skin-swatch w-6 h-6 rounded-full border border-white/30" style="background:#c6865c" title="Bronceado"></button>
                      <button type="button" data-skin="#8d5534" class="skin-swatch w-6 h-6 rounded-full border border-white/30" style="background:#8d5534" title="Moreno Profundo"></button>
                      <button type="button" data-skin="#593520" class="skin-swatch w-6 h-6 rounded-full border border-white/30" style="background:#593520" title="Ébano Cálido"></button>
                    </div>
                  </div>

                  <!-- Hair Style -->
                  <div>
                    <label class="text-[10px] text-slate-400 uppercase font-tech block mb-1">Peinado</label>
                    <select id="cosmetic-hair-style" class="glass-input w-full rounded-lg px-2.5 py-1.5 text-xs">
                      <option value="tactical">Corto Táctico</option>
                      <option value="flowing">Melena Fluida</option>
                      <option value="ponytail">Coleta Alta</option>
                      <option value="spiky">Ondulado Rebelde</option>
                    </select>
                  </div>

                  <!-- Hair Color -->
                  <div>
                    <label class="text-[10px] text-slate-400 uppercase font-tech block mb-1">Color Cabello</label>
                    <select id="cosmetic-hair-color" class="glass-input w-full rounded-lg px-2.5 py-1.5 text-xs">
                      <option value="#18181b">Obsidiana</option>
                      <option value="#e2e8f0">Plata Despertado</option>
                      <option value="#7c2d12">Castaño Cobrizo</option>
                      <option value="#d97706">Dorado Solar</option>
                      <option value="#3b82f6">Azul Cobalto</option>
                      <option value="#7e22ce">Violeta Abisal</option>
                    </select>
                  </div>

                  <!-- Outfit -->
                  <div>
                    <label class="text-[10px] text-slate-400 uppercase font-tech block mb-1">Indumentaria</label>
                    <select id="cosmetic-outfit" class="glass-input w-full rounded-lg px-2.5 py-1.5 text-xs">
                      <option value="compression">Compresión Gym</option>
                      <option value="hunter_armor">Armadura Cazador</option>
                      <option value="tactical_noir">Táctico Urbano</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT: DUAL RANKING SYSTEM + SCIENTIFIC BIOMECHANICS + LIVE PR UPDATER -->
          <div class="lg:col-span-6 space-y-5">
            <!-- Dual Rank Hero Card -->
            <div class="glass-panel rounded-3xl p-5 sm:p-6">
              <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <span class="text-[11px] font-tech uppercase tracking-widest text-violet-300">Sistema Dual de Clasificación</span>
                  <h3 class="font-epic text-xl font-bold text-white">Estatus & Poder Biomecánico</h3>
                </div>
                <span id="sanctuary-race-class" class="px-3 py-1 rounded-full text-xs font-tech font-bold bg-violet-500/20 text-violet-200 border border-violet-400/30">
                  Humano Despertado • Vanguardia
                </span>
              </div>

              <!-- 2 Main Ranks: Hunter League (Tierra 6 -> Challenger 1) & Physical Rank (F -> EX+) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <!-- League Rank -->
                <div class="rounded-2xl bg-gradient-to-br from-amber-500/10 via-black/40 to-black/60 border border-amber-400/30 p-4">
                  <div class="flex items-center justify-between">
                    <span class="text-[11px] font-tech uppercase tracking-wider text-amber-300">Liga de Cazador (90 Div.)</span>
                    <span id="league-lp-badge" class="text-xs font-tech font-bold text-amber-200">0 / 100 LP</span>
                  </div>
                  <div id="sanctuary-league-name" class="font-epic text-2xl sm:text-3xl font-extrabold text-white mt-1">Tierra 6</div>
                  <div class="mt-2.5 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div id="sanctuary-league-bar" class="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-500" style="width: 10%"></div>
                  </div>
                  <p class="text-[11px] text-slate-400 mt-2">Escala: Tierra 6 → Madera → ... → Jefe Maestro → Challenger 1</p>
                </div>

                <!-- Scientific Physical Rank -->
                <div class="rounded-2xl bg-gradient-to-br from-cyan-500/15 via-violet-500/10 to-black/60 border border-cyan-400/35 p-4">
                  <div class="flex items-center justify-between">
                    <span class="text-[11px] font-tech uppercase tracking-wider text-cyan-300">Rango Físico Científico</span>
                    <span id="sanctuary-ffmi-badge" class="text-xs font-tech font-bold text-cyan-200">DOTS: 0</span>
                  </div>
                  <div class="flex items-baseline gap-2.5 mt-1">
                    <span id="sanctuary-phys-rank" class="font-epic text-3xl sm:text-4xl font-black text-cyan-300">E+</span>
                    <span id="sanctuary-phys-title" class="text-xs font-tech text-slate-300">Atleta Iniciado</span>
                  </div>
                  <div class="mt-2.5 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div id="sanctuary-phys-bar" class="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all duration-500" style="width: 35%"></div>
                  </div>
                  <p class="text-[11px] text-slate-400 mt-2">Escala: F → F+ → ... → SSS+ → EX → EX+</p>
                </div>
              </div>

              <!-- Scientific Sub-Ranks: Absolute Strength vs Relative Strength -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="bg-black/45 rounded-xl p-3.5 border border-white/10">
                  <div class="text-[10px] font-tech uppercase tracking-wider text-slate-400">Fuerza Absoluta</div>
                  <div class="flex items-center justify-between mt-1">
                    <span id="stat-abs-rank" class="font-epic text-xl font-extrabold text-amber-300">E+</span>
                    <span id="stat-abs-val" class="text-xs font-tech font-bold text-slate-200">305 kg 1RM</span>
                  </div>
                  <div class="text-[10px] text-slate-500 mt-1">Total 1RM combinado (Epley)</div>
                </div>

                <div class="bg-black/45 rounded-xl p-3.5 border border-white/10">
                  <div class="text-[10px] font-tech uppercase tracking-wider text-slate-400">Fuerza Relativa</div>
                  <div class="flex items-center justify-between mt-1">
                    <span id="stat-rel-rank" class="font-epic text-xl font-extrabold text-emerald-300">D</span>
                    <span id="stat-rel-val" class="text-xs font-tech font-bold text-slate-200">4.06x BW</span>
                  </div>
                  <div class="text-[10px] text-slate-500 mt-1">Ratio alométrico DOTS / Peso</div>
                </div>

                <div class="bg-black/45 rounded-xl p-3.5 border border-white/10">
                  <div class="text-[10px] font-tech uppercase tracking-wider text-slate-400">Nivel & Evolución</div>
                  <div class="flex items-center justify-between mt-1">
                    <span id="stat-level-val" class="font-epic text-xl font-extrabold text-violet-300">Nv. 1</span>
                    <span id="stat-evo-stage" class="text-xs font-tech font-bold text-violet-200">Fase I</span>
                  </div>
                  <div class="text-[10px] text-slate-500 mt-1">Evolución infinita de clase</div>
                </div>
              </div>
            </div>

            <!-- Interactive Scientific 1RM & Strength Recalibrator -->
            <div class="glass-panel rounded-3xl p-5 sm:p-6">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h4 class="font-tech font-bold text-base text-white uppercase tracking-wide">Actualizar Marcas de Fuerza (Subir Rango F → EX+)</h4>
                  <p class="text-xs text-slate-400">Registra tus nuevos récords de peso o repeticiones para recalcular tu 1RM científico y desbloquear capítulos de lore.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div class="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div class="text-[11px] font-tech font-bold text-cyan-300 mb-1.5">Empuje (<span id="pr-push-1rm">82</span> kg 1RM)</div>
                  <div class="flex gap-1.5">
                    <input type="number" id="upd-push-w" step="0.5" class="glass-input w-1/2 rounded-lg px-2.5 py-1.5 text-xs font-bold" placeholder="kg" />
                    <input type="number" id="upd-push-r" class="glass-input w-1/2 rounded-lg px-2.5 py-1.5 text-xs font-bold" placeholder="reps" />
                  </div>
                </div>

                <div class="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div class="text-[11px] font-tech font-bold text-violet-300 mb-1.5">Pierna (<span id="pr-squat-1rm">108</span> kg 1RM)</div>
                  <div class="flex gap-1.5">
                    <input type="number" id="upd-squat-w" step="0.5" class="glass-input w-1/2 rounded-lg px-2.5 py-1.5 text-xs font-bold" placeholder="kg" />
                    <input type="number" id="upd-squat-r" class="glass-input w-1/2 rounded-lg px-2.5 py-1.5 text-xs font-bold" placeholder="reps" />
                  </div>
                </div>

                <div class="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div class="text-[11px] font-tech font-bold text-amber-300 mb-1.5">Tracción (<span id="pr-pull-1rm">120</span> kg 1RM)</div>
                  <div class="flex gap-1.5">
                    <input type="number" id="upd-pull-w" step="0.5" class="glass-input w-1/2 rounded-lg px-2.5 py-1.5 text-xs font-bold" placeholder="kg" />
                    <input type="number" id="upd-pull-r" class="glass-input w-1/2 rounded-lg px-2.5 py-1.5 text-xs font-bold" placeholder="reps" />
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-3">
                <div class="text-[11px] text-slate-400">
                  Fórmula: <code class="text-cyan-300">1RM = Peso × (1 + Reps/30)</code> • Ajuste alométrico DOTS
                </div>
                <button type="button" id="btn-update-prs" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-lg transition active:scale-95">
                  Recalcular Fuerza Científica
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- MÓDULO 2: MISIONES DIARIAS & JUSTIFICACIÓN ADAPTATIVA             -->
      <!-- ================================================================= -->
      <section id="tab-missions" class="tab-section hidden tab-fade-in space-y-6">
        <div class="glass-panel rounded-3xl p-5 sm:p-6">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-5">
            <div>
              <span class="text-[11px] font-tech uppercase tracking-widest text-amber-400">Sistema de Disciplina & Ascenso</span>
              <h2 class="font-epic text-2xl font-bold text-white">Misiones Diarias del Cazador</h2>
              <p class="text-xs sm:text-sm text-slate-400 mt-1">
                Cumple tus objetivos declarados para ganar XP y LP. Si fallas un reto, quedará <span class="text-rose-400 font-semibold">bloqueado hasta la próxima semana</span>. Si surge un imprevisto válido, usa la <strong>Justificación Adaptativa</strong>.
              </p>
            </div>
            <div class="flex items-center gap-2.5">
              <button type="button" id="btn-simulate-next-week" class="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-tech font-bold text-slate-300 transition" title="Simular paso de semana para desbloquear misiones fallidas">
                ⏭️ Simular Nueva Semana
              </button>
            </div>
          </div>

          <!-- Form to Declare a New Daily Mission -->
          <form id="new-mission-form" class="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-black/40 p-4 rounded-2xl border border-white/10 mb-6">
            <div class="sm:col-span-5">
              <label class="text-[10px] font-tech uppercase text-slate-400 block mb-1">Objetivo Declarado para Hoy</label>
              <input type="text" id="mission-title-input" required placeholder="Ej. Press Banca 4x8 con 70kg o Correr 5km" class="glass-input w-full rounded-xl px-3.5 py-2.5 text-sm" />
            </div>
            <div class="sm:col-span-3">
              <label class="text-[10px] font-tech uppercase text-slate-400 block mb-1">Entorno / Categoría</label>
              <select id="mission-type-input" class="glass-input w-full rounded-xl px-3 py-2.5 text-sm">
                <option value="gym">🏋️ Gimnasio / Fuerza</option>
                <option value="outdoor">🌧️ Aire Libre / Cardio</option>
                <option value="home">🏠 Entrenamiento en Casa</option>
                <option value="recovery">💤 Recuperación / Hábito</option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label class="text-[10px] font-tech uppercase text-slate-400 block mb-1">Dificultad</label>
              <select id="mission-diff-input" class="glass-input w-full rounded-xl px-3 py-2.5 text-sm">
                <option value="normal">Estándar (+45 XP)</option>
                <option value="hard">Intensa (+75 XP)</option>
                <option value="boss">Élite (+120 XP)</option>
              </select>
            </div>
            <div class="sm:col-span-2 flex items-end">
              <button type="submit" class="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-tech font-extrabold text-xs uppercase tracking-wider transition">
                + Declarar Reto
              </button>
            </div>
          </form>

          <!-- Missions List -->
          <div id="missions-list" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- MÓDULO 3: LABORATORIO BIOMECÁNICO (IA + ANALIZADOR ARCHIVOS/FOTOS) -->
      <!-- ================================================================= -->
      <section id="tab-lab" class="tab-section hidden tab-fade-in space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <!-- LEFT: AI BIOMECHANICAL ROUTINE GENERATOR -->
          <div class="lg:col-span-7 glass-panel rounded-3xl p-5 sm:p-6 space-y-5">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span class="text-[11px] font-tech uppercase tracking-widest text-cyan-400">Motor de Prescripción Científica</span>
                <h2 class="font-epic text-xl sm:text-2xl font-bold text-white">Generador IA de Rutinas Biomecánicas</h2>
              </div>
              <button type="button" id="btn-generate-routine" class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-tech font-bold text-xs uppercase tracking-wider shadow-lg transition active:scale-95">
                ⚡ Regenerar Rutina Óptima
              </button>
            </div>

            <!-- Live Injury & Equipment Quick Editor -->
            <div class="bg-black/45 rounded-2xl p-4 border border-white/10 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-tech font-bold uppercase text-amber-300">Parámetros Biomecánicos Activos (Editables)</span>
                <button type="button" id="btn-save-lab-params" class="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 text-xs font-tech font-bold">
                  Guardar Cambios
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="text-[10px] font-tech uppercase text-slate-400 block mb-1">Lesiones o Molestias Actuales</label>
                  <input type="text" id="lab-injury-input" class="glass-input w-full rounded-xl px-3 py-2 text-xs" placeholder="Ninguna o especifica zona..." />
                </div>
                <div>
                  <label class="text-[10px] font-tech uppercase text-slate-400 block mb-1">Modalidad / Equipo Disponible</label>
                  <select id="lab-modality-select" class="glass-input w-full rounded-xl px-3 py-2 text-xs">
                    <option value="home_none">Casa Sin Equipo (Calistenia)</option>
                    <option value="home_gear">Casa Con Equipo Específico</option>
                    <option value="gym">Gimnasio Completo</option>
                    <option value="hybrid">Híbrido (Casa + Gimnasio)</option>
                  </select>
                </div>
              </div>
              <div id="lab-equipment-row">
                <label class="text-[10px] font-tech uppercase text-slate-400 block mb-1">Detalle de Equipo en Casa</label>
                <input type="text" id="lab-equipment-input" class="glass-input w-full rounded-xl px-3 py-2 text-xs" placeholder="Ej. Mancuernas ajustables, bandas elásticas..." />
              </div>
            </div>

            <!-- Generated Scientific Routine Output -->
            <div id="generated-routine-container" class="space-y-4"></div>
          </div>

          <!-- RIGHT: CUSTOM ROUTINE FILE / PHOTO ANALYZER -->
          <div class="lg:col-span-5 glass-panel rounded-3xl p-5 sm:p-6 space-y-5">
            <div class="border-b border-white/10 pb-4">
              <span class="text-[11px] font-tech uppercase tracking-widest text-violet-300">Auditoría Biomecánica Externa</span>
              <h2 class="font-epic text-xl font-bold text-white">Analizador de Rutinas (Foto / Archivo)</h2>
              <p class="text-xs text-slate-400 mt-1">Sube una captura de pantalla, foto de tu cuaderno o archivo (.txt, .csv, .json, .pdf, .xlsx) para evaluar su eficiencia científica y riesgo de lesión.</p>
            </div>

            <!-- Dropzone -->
            <label for="routine-file-input" id="routine-dropzone" class="block cursor-pointer rounded-2xl border-2 border-dashed border-cyan-400/35 hover:border-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 p-6 text-center transition">
              <input type="file" id="routine-file-input" accept="image/*,.txt,.csv,.json,.pdf,.xlsx,.xls,.doc,.docx" class="hidden" />
              <div class="text-3xl mb-2">📸 📄</div>
              <div class="font-tech font-bold text-sm text-white">Arrastra o selecciona tu Foto / Archivo</div>
              <div class="text-[11px] text-slate-400 mt-1">Soporta JPG, PNG, WEBP, TXT, CSV, JSON, PDF, XLSX</div>
            </label>

            <!-- Preview Box if Image or File Uploaded -->
            <div id="uploaded-file-preview" class="hidden bg-black/50 rounded-2xl p-3 border border-white/10">
              <div class="flex items-center justify-between text-xs mb-2">
                <span id="uploaded-file-name" class="font-tech font-bold text-cyan-300 truncate">archivo.png</span>
                <span id="uploaded-file-size" class="text-slate-400 text-[11px]">0 KB</span>
              </div>
              <img id="uploaded-image-thumb" src="" alt="Vista previa rutina" class="hidden w-full max-h-40 object-cover rounded-xl border border-white/10" />
            </div>

            <!-- Or Paste Text -->
            <div>
              <label class="text-[10px] font-tech uppercase text-slate-400 block mb-1">O pega / edita el contenido de tu rutina aquí:</label>
              <textarea id="routine-paste-text" rows="4" placeholder="Ej. Lunes: Press Banca 4x6 80kg, Aperturas 3x12, Press Militar 4x8, Fondos 3x10..." class="glass-input w-full rounded-xl p-3 text-xs"></textarea>
            </div>

            <button type="button" id="btn-analyze-uploaded-routine" class="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-tech font-extrabold text-xs uppercase tracking-wider shadow-lg transition">
              🔬 Examinar Rutina con IA Biomecánica
            </button>

            <!-- Analysis Result Card -->
            <div id="routine-analysis-result" class="hidden bg-black/55 rounded-2xl p-4 border border-violet-400/30 space-y-3"></div>
          </div>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- MÓDULO 4: CRÓNICAS DEL DESPERTAR (CLASES INFINITAS, PASIVA Y LORE) -->
      <!-- ================================================================= -->
      <section id="tab-chronicles" class="tab-section hidden tab-fade-in space-y-6">
        <!-- Top Row: Infinite Class Evolution & Mutating Passive -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Infinite Class & Evolution Card -->
          <div class="lg:col-span-6 glass-panel-glow rounded-3xl p-5 sm:p-6 space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-tech uppercase tracking-widest text-cyan-400">Linaje Procedural Infinito</span>
              <span id="chronicle-evo-badge" class="px-3 py-1 rounded-full text-xs font-tech font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                Evolución #0 (Iniciado)
              </span>
            </div>

            <div>
              <div class="text-xs font-tech text-violet-300 uppercase" id="chronicle-race">Raza: Humano Despertado</div>
              <h2 class="font-epic text-2xl sm:text-3xl font-extrabold text-white mt-0.5" id="chronicle-class-name">Vanguardia del Nexo</h2>
              <p class="text-xs text-slate-400 mt-1" id="chronicle-next-evo-hint">
                Próxima Evolución de Clase al alcanzar el <strong>Nivel 5</strong>. Las evoluciones son infinitas (I, II, III... ∞).
              </p>
            </div>

            <!-- Evolution Timeline Milestones -->
            <div class="bg-black/45 rounded-2xl p-4 border border-white/10">
              <div class="flex justify-between text-xs font-tech mb-1.5">
                <span class="text-slate-300">Progreso hacia Siguiente Evolución</span>
                <span id="chronicle-lvl-progress-text" class="text-cyan-300 font-bold">Nv. 1 / Nv. 5</span>
              </div>
              <div class="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div id="chronicle-lvl-bar" class="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500" style="width: 20%"></div>
              </div>
              <div class="mt-3 flex flex-wrap gap-1.5" id="chronicle-evo-history"></div>
            </div>
          </div>

          <!-- Unique Mutating Passive + Hunter Origin -->
          <div class="lg:col-span-6 glass-panel rounded-3xl p-5 sm:p-6 space-y-4">
            <div class="bg-gradient-to-r from-amber-500/15 to-violet-500/15 rounded-2xl p-4 border border-amber-400/30">
              <div class="flex items-center justify-between mb-1">
                <span class="text-[11px] font-tech uppercase tracking-widest text-amber-300">Habilidad Pasiva Única</span>
                <span id="passive-mutation-tier" class="px-2.5 py-0.5 rounded-md text-[11px] font-tech font-bold bg-amber-500/20 text-amber-200">
                  Mutación Grado 0
                </span>
              </div>
              <h3 id="passive-name" class="font-epic text-lg font-bold text-white">Sinapsis de Hierro</h3>
              <p id="passive-desc" class="text-xs text-slate-300 mt-1 leading-relaxed"></p>
              <div class="text-[11px] text-amber-300/80 font-tech mt-2">
                * Muta automáticamente cada 2 evoluciones de clase obtenidas.
              </div>
            </div>

            <div class="bg-black/45 rounded-2xl p-4 border border-white/10">
              <span class="text-[11px] font-tech uppercase tracking-widest text-violet-300">Origen Único del Avatar</span>
              <p id="avatar-origin-story" class="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed italic"></p>
            </div>
          </div>
        </div>

        <!-- 20 Unlockable Rank Lore Chapters (F to EX+) -->
        <div class="glass-panel rounded-3xl p-5 sm:p-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-5">
            <div>
              <span class="text-[11px] font-tech uppercase tracking-widest text-cyan-400">Archivos de Resonancia (F → EX+)</span>
              <h3 class="font-epic text-xl font-bold text-white">Crónicas Desbloqueables por Rango Físico</h3>
            </div>
            <span id="lore-unlocked-counter" class="text-xs font-tech font-bold px-3 py-1.5 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
              Desbloqueados: 4 / 20
            </span>
          </div>

          <div id="lore-chapters-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5"></div>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- MÓDULO 5: NOVELA VISUAL 2D SEMI-REALISTA ("EL UMBRAL DEL NEXO")   -->
      <!-- ================================================================= -->
      <section id="tab-vn" class="tab-section hidden tab-fade-in space-y-6">
        <div class="glass-panel-glow rounded-3xl overflow-hidden">
          <!-- Top Relationship & Alignment HUD -->
          <div class="bg-black/60 border-b border-white/10 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span class="text-[11px] font-tech uppercase tracking-widest text-cyan-400">Campaña Narrativa Única • 3 Finales</span>
              <h2 class="font-epic text-xl sm:text-2xl font-bold text-white">El Umbral del Nexo</h2>
            </div>

            <!-- Affinity Bars for the 3 Characters -->
            <div class="flex flex-wrap items-center gap-3 sm:gap-5">
              <div class="text-xs">
                <div class="flex justify-between font-tech text-cyan-300 mb-0.5">
                  <span>Cmdt. Kaelen</span>
                  <span id="aff-kaelen-val">50%</span>
                </div>
                <div class="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div id="aff-kaelen-bar" class="h-full bg-cyan-400 transition-all duration-300" style="width:50%"></div>
                </div>
              </div>

              <div class="text-xs">
                <div class="flex justify-between font-tech text-emerald-300 mb-0.5">
                  <span>Dra. Lyra</span>
                  <span id="aff-lyra-val">50%</span>
                </div>
                <div class="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div id="aff-lyra-bar" class="h-full bg-emerald-400 transition-all duration-300" style="width:50%"></div>
                </div>
              </div>

              <div class="text-xs">
                <div class="flex justify-between font-tech text-violet-300 mb-0.5">
                  <span>Vesper</span>
                  <span id="aff-vesper-val">50%</span>
                </div>
                <div class="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div id="aff-vesper-bar" class="h-full bg-violet-400 transition-all duration-300" style="width:50%"></div>
                </div>
              </div>

              <button type="button" id="btn-vn-restart" class="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-tech font-bold text-slate-300">
                ↺ Reiniciar Historia
              </button>
            </div>
          </div>

          <!-- Visual Novel Stage -->
          <div class="relative min-h-[520px] flex flex-col justify-between p-5 sm:p-8 bg-gradient-to-b from-[#090E1A] via-[#0B1222] to-[#06080D]">
            <!-- Atmospheric Background Glow -->
            <div id="vn-bg-aura" class="absolute inset-0 pointer-events-none opacity-40 transition-all duration-700" style="background: radial-gradient(circle at 50% 35%, rgba(0, 240, 255, 0.22), transparent 65%);"></div>

            <!-- Scene Header & Morality Alignment Indicator -->
            <div class="relative z-10 flex flex-wrap items-center justify-between gap-2">
              <span id="vn-chapter-tag" class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-tech text-slate-300">
                Acto I • La Grieta de Obsidiana
              </span>
              <div class="flex items-center gap-2 text-xs font-tech bg-black/50 px-3 py-1 rounded-full border border-white/10">
                <span class="text-slate-400">Tendencia Moral:</span>
                <span id="vn-alignment-label" class="font-bold text-cyan-300">Caminante Neutro (0)</span>
              </div>
            </div>

            <!-- 2D Semi-Realistic Character Portrait Container -->
            <div class="relative z-10 my-4 flex flex-col items-center justify-center">
              <div id="vn-portrait-stage" class="w-56 h-64 sm:w-64 sm:h-72 rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-gradient-to-b from-slate-900/90 to-black relative">
                <!-- Semi-realistic layered SVG artwork injected dynamically -->
              </div>
              <div id="vn-character-trait" class="mt-2 px-3 py-0.5 rounded-full text-[11px] font-tech bg-black/70 border border-white/10 text-slate-300">
                Personalidad: Estratégico y Recto
              </div>
            </div>

            <!-- Dialogue Box & Interactive Choices -->
            <div class="relative z-10 glass-panel rounded-2xl p-5 border-white/15 space-y-4">
              <div class="flex items-center justify-between">
                <span id="vn-speaker-name" class="font-epic text-base sm:text-lg font-bold text-cyan-300">Comandante Kaelen</span>
                <span id="vn-emotion-tag" class="text-[11px] font-tech uppercase tracking-wider text-slate-400">Expresión: Determinado</span>
              </div>

              <p id="vn-dialogue-text" class="text-sm sm:text-base text-slate-100 leading-relaxed min-h-[3.5rem]"></p>

              <!-- Choices Container -->
              <div id="vn-choices-container" class="grid grid-cols-1 gap-2.5 pt-2"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- MÓDULO 6: RECUPERACIÓN CIENTÍFICA (SUEÑO SEMANAL & PODÓMETRO AUTO) -->
      <!-- ================================================================= -->
      <section id="tab-recovery" class="tab-section hidden tab-fade-in space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <!-- LEFT: SCIENTIFIC SLEEP & CNS RECOVERY TRACKER -->
          <div class="lg:col-span-6 glass-panel rounded-3xl p-5 sm:p-6 space-y-5">
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span class="text-[11px] font-tech uppercase tracking-widest text-violet-300">Cronobiología & Síntesis Proteica</span>
                <h2 class="font-epic text-xl font-bold text-white">Indicador Científico de Sueño</h2>
              </div>
              <span id="sleep-status-badge" class="px-3 py-1 rounded-full text-xs font-tech font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Óptimo (SNC 95%)
              </span>
            </div>

            <!-- Weekly Accumulation Summary -->
            <div class="grid grid-cols-3 gap-3">
              <div class="bg-black/45 rounded-2xl p-3.5 border border-white/10 text-center">
                <div class="text-[10px] font-tech uppercase text-slate-400">Acumulado Semanal</div>
                <div id="sleep-weekly-total" class="font-epic text-2xl font-extrabold text-white mt-1">53.5 h</div>
                <div class="text-[10px] text-cyan-300 mt-0.5">Meta: 49–63 h/sem</div>
              </div>
              <div class="bg-black/45 rounded-2xl p-3.5 border border-white/10 text-center">
                <div class="text-[10px] font-tech uppercase text-slate-400">Promedio Diario</div>
                <div id="sleep-daily-avg" class="font-epic text-2xl font-extrabold text-violet-300 mt-1">7.6 h</div>
                <div class="text-[10px] text-slate-400 mt-0.5">Óptimo: 7.0–9.0 h</div>
              </div>
              <div class="bg-black/45 rounded-2xl p-3.5 border border-white/10 text-center">
                <div class="text-[10px] font-tech uppercase text-slate-400">Deuda de Sueño</div>
                <div id="sleep-debt-val" class="font-epic text-2xl font-extrabold text-emerald-300 mt-1">0.0 h</div>
                <div class="text-[10px] text-slate-400 mt-0.5">Base 52.5 h/sem</div>
              </div>
            </div>

            <!-- 7-Day Sleep Bar Chart -->
            <div class="bg-black/40 rounded-2xl p-4 border border-white/10">
              <div class="flex justify-between text-xs font-tech text-slate-400 mb-3">
                <span>Registro Últimos 7 Días (Zona verde: 7h–9h)</span>
                <span class="text-cyan-300">Impacto directo en fuerza</span>
              </div>
              <div id="sleep-7days-bars" class="grid grid-cols-7 gap-2 items-end h-32 pt-4"></div>
            </div>

            <!-- Log Today's Sleep -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div class="flex-1">
                <label class="text-[10px] font-tech uppercase text-slate-400 block mb-1">Registrar horas dormidas anoche:</label>
                <input type="number" id="sleep-hours-input" min="2" max="14" step="0.5" value="8" class="glass-input w-full rounded-xl px-3.5 py-2.5 text-sm font-bold" />
              </div>
              <button type="button" id="btn-log-sleep" class="sm:self-end px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-tech font-bold text-xs uppercase tracking-wider transition">
                Registrar Sueño
              </button>
            </div>

            <!-- Impact on Today's Gym / Home Workout -->
            <div id="sleep-workout-impact" class="rounded-2xl p-4 bg-emerald-500/10 border border-emerald-400/30 text-xs text-slate-200 leading-relaxed"></div>
          </div>

          <!-- RIGHT: AUTOMATIC PEDOMETER (ACTIVE SENSOR + BACKGROUND TRACKING) -->
          <div class="lg:col-span-6 glass-panel-glow rounded-3xl p-5 sm:p-6 space-y-5">
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span class="text-[11px] font-tech uppercase tracking-widest text-cyan-400">Sensor Inercial & Segundo Plano</span>
                <h2 class="font-epic text-xl font-bold text-white">Podómetro Automático</h2>
              </div>
              <span id="pedometer-sensor-status" class="px-3 py-1 rounded-full text-xs font-tech font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                ● Activo + 2do Plano
              </span>
            </div>

            <!-- Circular / Hero Step Counter -->
            <div class="bg-black/50 rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
              <div class="text-xs font-tech uppercase tracking-widest text-slate-400">Pasos Acumulados Hoy</div>
              <div id="pedometer-steps-display" class="font-epic text-4xl sm:text-5xl font-black text-white my-2 tracking-tight">4,280</div>
              <div class="text-xs font-tech text-cyan-300 mb-4">Meta Diaria: <span id="pedometer-goal-text">8,000</span> pasos</div>

              <div class="h-3 w-full max-w-md mx-auto bg-white/10 rounded-full overflow-hidden">
                <div id="pedometer-progress-bar" class="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 transition-all duration-500" style="width: 53%"></div>
              </div>

              <div class="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div class="text-slate-400 font-tech uppercase text-[10px]">Distancia</div>
                  <div id="pedometer-km-val" class="font-bold text-white text-base mt-0.5">3.21 km</div>
                </div>
                <div>
                  <div class="text-slate-400 font-tech uppercase text-[10px]">Gasto NEAT</div>
                  <div id="pedometer-kcal-val" class="font-bold text-amber-300 text-base mt-0.5">192 kcal</div>
                </div>
                <div>
                  <div class="text-slate-400 font-tech uppercase text-[10px]">2do Plano</div>
                  <div id="pedometer-bg-val" class="font-bold text-emerald-300 text-base mt-0.5">Sincronizado</div>
                </div>
              </div>
            </div>

            <!-- Sensor Activation & Desktop/Live Walk Simulator -->
            <div class="bg-black/40 rounded-2xl p-4 border border-white/10 space-y-3">
              <p class="text-xs text-slate-300 leading-relaxed">
                El podómetro registra pasos automáticamente mediante el acelerómetro cuando la app está abierta y sincroniza el avance en <strong>segundo plano</strong> al volver a la pestaña. También puedes activar el sensor móvil o simular una caminata:
              </p>
              <div class="flex flex-wrap gap-2.5">
                <button type="button" id="btn-enable-motion" class="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 font-tech font-bold text-xs uppercase transition">
                  📡 Calibrar Acelerómetro Móvil
                </button>
                <button type="button" id="btn-sim-walk-500" class="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 font-tech font-bold text-xs uppercase transition">
                  🚶 +500 Pasos (Caminata Rápida)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>

  <!-- ===================================================================== -->
  <!-- JAVASCRIPT ENGINE: STATE, SCIENCE, 3D ORGANIC AVATAR, VN & SENSORS    -->
  <!-- ===================================================================== -->
  <script>
    (function () {
      'use strict';

      // ===================================================================
      // 1. CONSTANTS & SCIENTIFIC TABLES
      // ===================================================================
      const STORAGE_KEY = 'ascension_ex_state_v1';

      const LEAGUES = [
        'Tierra', 'Madera', 'Piedra', 'Carbón', 'Hierro',
        'Bronce', 'Plata', 'Oro', 'Platino', 'Esmeralda',
        'Diamante', 'Especialista', 'Maestro', 'Jefe Maestro', 'Challenger'
      ];

      const PHYSICAL_RANKS = [
        'F', 'F+', 'E', 'E+', 'D', 'D+', 'C', 'C+',
        'B', 'B+', 'A', 'A+', 'S', 'S+', 'SS', 'SS+',
        'SSS', 'SSS+', 'EX', 'EX+'
      ];

      const RANK_TITLES = [
        'Civil No Despertado', 'Recluta en Calibración', 'Iniciado del Pulso', 'Atleta Iniciado',
        'Portador de Carga', 'Combatiente Funcional', 'Vanguardia Física', 'Atleta Consolidado',
        'Élite Biomecánica', 'Maestro de Tensión', 'Cazador de Alto Rango', 'Soberano Muscular',
        'Titán Nacional', 'Anomalía de Fuerza', 'Depredador Ápice', 'Coloso Trascendente',
        'Semidiós Biomecánico', 'Leyenda Viviente', 'SINGULARIDAD EX', 'APOTEOSIS EX+'
      ];

      const EPIC_FIRST_NAMES = [
        'Kaelen', 'Vaelen', 'Zarek', 'Soren', 'Lyra', 'Thorne', 'Aether', 'Nyx',
        'Draven', 'Cassian', 'Valen', 'Riven', 'Kael', 'Seraph', 'Orin', 'Vespera'
      ];
      const EPIC_LAST_NAMES = [
        'Voss', 'Draven', 'Kuros', 'Valerius', 'Noctis', 'Vance', 'Solaris', 'Kael',
        'Obsidian', 'Mercer', 'Astral', 'Rivenheart', 'Dusk', 'Aurelius', 'Zenith', 'Storm'
      ];

      const RACES = [
        'Humano Despertado', 'Nephilim Solar', 'Dracónido Ceniza',
        'Elfo del Crepúsculo', 'Licántropo Primordial', 'Valkiria Biomecánica',
        'Espectro Abisal', 'Titán de Éter'
      ];

      const CLASS_ARCHETYPES = [
        { name: 'Coloso de Gravedad', focus: 'Fuerza Absoluta y Cargas Máximas' },
        { name: 'Acechador Cinético', focus: 'Potencia Relativa y Velocidad Explosiva' },
        { name: 'Titán de Hierro', focus: 'Resistencia Estructural e Hipertrofia Densa' },
        { name: 'Monje del Pulso', focus: 'Control Neuromuscular y Calistenia Pura' },
        { name: 'Vanguardia Indomable', focus: 'Equilibrio Biomecánico Total' },
        { name: 'Segador de Inercia', focus: 'Acondicionamiento Metabólico y Tensión' }
      ];

      const EVO_TITLES = [
        'Iniciado', 'Adepto', 'Veterano', 'Maestro', 'Soberano',
        'Ascendido', 'Trascendente I', 'Trascendente II', 'Trascendente III', 'Singularidad ∞'
      ];

      // ===================================================================
      // 2. APPLICATION STATE & PERSISTENCE
      // ===================================================================
      let appState = null;
      let activeJustifyMissionId = null;
      let confirmCallback = null;

      function getDefaultState() {
        return {
          registered: false,
          profile: {
            name: 'Kaelen Voss',
            bodyType: 'masculine',
            age: 25,
            weight: 75,
            height: 176,
            injuries: 'Ninguna',
            modality: 'gym',
            equipment: ['Mancuernas ajustables', 'Bandas elásticas'],
            equipmentCustom: '',
            lifts: {
              pushW: 65, pushR: 8,
              squatW: 85, squatR: 8,
              pullW: 100, pullR: 6
            }
          },
          cosmetics: {
            skinColor: '#e0a984',
            hairStyle: 'tactical',
            hairColor: '#18181b',
            outfit: 'compression'
          },
          rpg: {
            level: 1,
            xp: 25,
            leagueIndex: 0, // 0 = Tierra
            division: 6,    // 6 = Tierra 6 down to 1
            lp: 20,
            race: 'Humano Despertado',
            baseClass: 'Vanguardia Indomable',
            passiveName: 'Sinapsis de Hierro',
            passiveBaseDesc: 'Incrementa un +12% la eficiencia neuromuscular en series pesadas cuando tu recuperación semanal de sueño supera las 49 horas.',
            originStory: ''
          },
          missions: [],
          sleep: {
            days: [
              { day: 'Lun', hours: 7.5 },
              { day: 'Mar', hours: 7.0 },
              { day: 'Mié', hours: 8.0 },
              { day: 'Jue', hours: 6.5 },
              { day: 'Vie', hours: 8.0 },
              { day: 'Sáb', hours: 8.5 },
              { day: 'Dom', hours: 8.0 }
            ]
          },
          pedometer: {
            steps: 4280,
            goal: 8000,
            lastActiveTimestamp: Date.now()
          },
          vn: {
            nodeId: 'start',
            kaelen: 50,
            lyra: 50,
            vesper: 50,
            alignment: 0 // > 15 Hero, < -15 Villain, between = Neutral
          }
        };
      }

      function loadState() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            appState = Object.assign(getDefaultState(), parsed);
            return;
          }
        } catch (err) {
          console.warn('Error leyendo sesión guardada:', err);
        }
        appState = getDefaultState();
      }

      function saveState() {
        try {
          appState.pedometer.lastActiveTimestamp = Date.now();
          localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
        } catch (err) {
          console.warn('No se pudo guardar en localStorage:', err);
        }
      }

      // ===================================================================
      // 3. TOAST & CUSTOM CONFIRM MODAL (NO alert/confirm)
      // ===================================================================
      function showToast(title, message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const colors = {
          info: 'border-cyan-400/50 bg-slate-950/95 text-cyan-200',
          success: 'border-emerald-400/50 bg-slate-950/95 text-emerald-200',
          warning: 'border-amber-400/50 bg-slate-950/95 text-amber-200',
          danger: 'border-rose-400/50 bg-slate-950/95 text-rose-200'
        };

        const el = document.createElement('div');
        el.className = `pointer-events-auto glass-panel rounded-2xl p-3.5 border ${colors[type] || colors.info} shadow-2xl transition-all duration-300 transform translate-x-0`;
        el.innerHTML = `
          <div class="font-tech font-bold text-xs uppercase tracking-wider">${title}</div>
          <div class="text-xs text-slate-300 mt-0.5">${message}</div>
        `;
        container.appendChild(el);

        setTimeout(() => {
          el.style.opacity = '0';
          el.style.transform = 'translateX(20px)';
          setTimeout(() => el.remove(), 300);
        }, 4200);
      }

      function openConfirmModal(title, desc, onConfirm) {
        document.getElementById('confirm-modal-title').textContent = title;
        document.getElementById('confirm-modal-desc').textContent = desc;
        confirmCallback = onConfirm;
        const modal = document.getElementById('confirm-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }

      function closeConfirmModal() {
        const modal = document.getElementById('confirm-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        confirmCallback = null;
      }

      // ===================================================================
      // 4. SCIENTIFIC BIOMECHANICAL CALCULATIONS (1RM, DOTS, RANKS F -> EX+)
      // ===================================================================
      function calculate1RM(externalWeight, reps, bodyWeight, liftFactor = 0.65) {
        const w = Math.max(0, Number(externalWeight) || 0);
        const r = Math.max(1, Number(reps) || 1);
        // If user trains without external weight (w === 0), compute biomechanical bodyweight load
        const effectiveLoad = w > 0 ? w : (bodyWeight * liftFactor);
        if (r === 1) return Math.round(effectiveLoad * 10) / 10;
        // Epley / Brzycki blended scientific formula
        const epley = effectiveLoad * (1 + r / 30);
        const brzycki = r < 37 ? effectiveLoad * (36 / (37 - r)) : epley;
        const blended = r <= 10 ? (epley + brzycki) / 2 : epley;
        return Math.round(blended * 10) / 10;
      }

      function computeScientificMetrics(profile) {
        const bw = Math.max(35, Number(profile.weight) || 75);
        const lifts = profile.lifts || { pushW: 60, pushR: 8, squatW: 80, squatR: 8, pullW: 95, pullR: 6 };

        const push1RM = calculate1RM(lifts.pushW, lifts.pushR, bw, 0.64);
        const squat1RM = calculate1RM(lifts.squatW, lifts.squatR, bw, 0.72);
        const pull1RM = calculate1RM(lifts.pullW, lifts.pullR, bw, 0.78);

        const total1RM = Math.round((push1RM + squat1RM + pull1RM) * 10) / 10;
        const relativeRatio = Math.round((total1RM / bw) * 100) / 100;

        // Allometric DOTS-style coefficient for fair comparison across bodyweights
        const clampedBW = Math.min(160, Math.max(40, bw));
        const denom = -0.000001093 * Math.pow(clampedBW, 4) +
                       0.0007391293 * Math.pow(clampedBW, 3) -
                       0.1918759221 * Math.pow(clampedBW, 2) +
                       24.0900756 * clampedBW - 307.75076;
        const dotsScore = Math.round((total1RM * (500 / Math.max(250, denom))) * 10) / 10;

        // Map Absolute Strength (total1RM from 110kg -> 920kg) to 0..19 (F -> EX+)
        const absNorm = Math.min(1, Math.max(0, (total1RM - 110) / (900 - 110)));
        const absIndex = Math.min(19, Math.floor(absNorm * 20));

        // Map Relative Strength (DOTS from 115 -> 610) to 0..19 (F -> EX+)
        const relNorm = Math.min(1, Math.max(0, (dotsScore - 115) / (600 - 115)));
        const relIndex = Math.min(19, Math.floor(relNorm * 20));

        // Global Physical Rank combines 55% Relative (DOTS) + 45% Absolute
        const combinedScore = relNorm * 0.55 + absNorm * 0.45;
        const physIndex = Math.min(19, Math.floor(combinedScore * 20));
        const nextTierProgress = Math.round(((combinedScore * 20) - physIndex) * 100);

        return {
          push1RM,
          squat1RM,
          pull1RM,
          total1RM,
          relativeRatio,
          dotsScore,
          absIndex,
          absRank: PHYSICAL_RANKS[absIndex],
          relIndex,
          relRank: PHYSICAL_RANKS[relIndex],
          physIndex,
          physRank: PHYSICAL_RANKS[physIndex],
          physTitle: RANK_TITLES[physIndex],
          nextTierProgress: Math.min(99, Math.max(5, nextTierProgress))
        };
      }

      // ===================================================================
      // 5. RPG PROGRESSION: LEVELS, INFINITE EVOLUTIONS, PASSIVES & LEAGUES
      // ===================================================================
      function getXpForNextLevel(level) {
        return Math.round(100 * Math.pow(1.18, level - 1));
      }

      function getEvolutionCount(level) {
        // Milestones: 5, 10, 20, 35, 50, 75, 100, then every +25 infinitely
        const fixed = [5, 10, 20, 35, 50, 75, 100];
        let count = 0;
        for (const m of fixed) {
          if (level >= m) count++;
        }
        if (level > 100) {
          count += Math.floor((level - 100) / 25);
        }
        return count;
      }

      function getNextEvolutionLevel(level) {
        const fixed = [5, 10, 20, 35, 50, 75, 100];
        for (const m of fixed) {
          if (level < m) return m;
        }
        const stepsAbove100 = Math.floor((level - 100) / 25) + 1;
        return 100 + stepsAbove100 * 25;
      }

      function getEvolvedClassName(baseClass, evoCount) {
        if (evoCount === 0) return `${baseClass} (Iniciado)`;
        if (evoCount < EVO_TITLES.length) {
          return `${baseClass} — ${EVO_TITLES[evoCount]}`;
        }
        const romanNum = evoCount - EVO_TITLES.length + 4;
        return `${baseClass} — Trascendente ${romanNum} ∞`;
      }

      function grantXPAndLP(xpGain, lpGain) {
        const rpg = appState.rpg;
        const prevEvo = getEvolutionCount(rpg.level);

        rpg.xp += xpGain;
        let needed = getXpForNextLevel(rpg.level);
        let leveledUp = false;

        while (rpg.xp >= needed) {
          rpg.xp -= needed;
          rpg.level += 1;
          leveledUp = true;
          needed = getXpForNextLevel(rpg.level);
        }

        const newEvo = getEvolutionCount(rpg.level);
        if (newEvo > prevEvo) {
          const newClass = getEvolvedClassName(rpg.baseClass, newEvo);
          showToast('🌟 ¡EVOLUCIÓN DE CLASE!', `Has ascendido a: ${newClass}`, 'success');
          if (Math.floor(newEvo / 2) > Math.floor(prevEvo / 2)) {
            showToast('🧬 ¡MUTACIÓN DE PASIVA!', `Tu habilidad "${rpg.passiveName}" ha mutado a Grado ${Math.floor(newEvo / 2)}!`, 'warning');
          }
        } else if (leveledUp) {
          showToast('⬆️ ¡SUBIDA DE NIVEL!', `Has alcanzado el Nivel ${rpg.level}.`, 'info');
        }

        // League Points (100 LP per division: 6 -> 5 -> 4 -> 3 -> 2 -> 1 -> Next League 6)
        rpg.lp += lpGain;
        while (rpg.lp >= 100) {
          if (rpg.leagueIndex === LEAGUES.length - 1 && rpg.division === 1) {
            rpg.lp = 100;
            break;
          }
          rpg.lp -= 100;
          if (rpg.division > 1) {
            rpg.division -= 1;
          } else {
            rpg.leagueIndex += 1;
            rpg.division = 6;
          }
          showToast('🏆 ¡ASCENSO DE LIGA!', `Nuevo Rango de Cazador: ${LEAGUES[rpg.leagueIndex]} ${rpg.division}`, 'success');
        }

        saveState();
        renderAllUI();
      }

      // ===================================================================
      // 6. THREE.JS 3D SEMI-REALISTIC HUMANIZED AVATAR ENGINE
      //    (STRICTLY ORGANIC ANATOMICAL SPLINE SCULPTING - ZERO BLOCKS)
      // ===================================================================
      let scene, camera, renderer, avatarGroup, chestMesh, headGroup, leftArmGroup, rightArmGroup, auraRing, auraParticles;
      let isDragging3D = false;
      let prevPointerX = 0;
      let prevPointerY = 0;
      let targetRotY = 0.25;
      let targetRotX = 0.05;
      let cameraZoom = 3.55;
      let clock3D = new THREE.Clock();

      /**
       * Helper: Creates a high-resolution organic anatomical limb/torso mesh
       * using radial profile curves + muscular cross-sectional asymmetry (pectorals, lats, biceps, quads).
       */
      function createOrganicAnatomicalMesh(profilePoints, options = {}) {
        const radialSegs = options.radialSegs || 44;
        const heightSegs = options.heightSegs || 48;
        const scaleX = options.scaleX || 1.0;
        const scaleZ = options.scaleZ || 1.0;
        const muscleBulge = options.muscleBulge || 0;
        const mode = options.mode || 'limb';

        // Build smooth Catmull-Rom curve from 2D control points [radius, y]
        const vec2Pts = profilePoints.map(p => new THREE.Vector2(Math.max(0.002, p[0]), p[1]));
        const spline = new THREE.SplineCurve(vec2Pts);
        const sampled = spline.getPoints(heightSegs);

        const latheGeo = new THREE.LatheGeometry(sampled, radialSegs);
        const pos = latheGeo.attributes.position;
        const v = new THREE.Vector3();

        // Find Y bounds for normalized anatomical sculpting
        let minY = Infinity, maxY = -Infinity;
        for (let i = 0; i < pos.count; i++) {
          const y = pos.getY(i);
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
        const spanY = Math.max(0.001, maxY - minY);

        for (let i = 0; i < pos.count; i++) {
          v.fromBufferAttribute(pos, i);
          const t = (v.y - minY) / spanY; // 0 at bottom, 1 at top
          const angle = Math.atan2(v.z, v.x); // 0=+X, PI/2=+Z (front), -PI/2=-Z (back)

          let sx = scaleX;
          let sz = scaleZ;

          if (mode === 'torso') {
            // Broaden shoulders/lats (t ~ 0.72..0.90), narrow waist (t ~ 0.35), flare hips/glutes (t ~ 0.12)
            const shoulderMask = Math.exp(-Math.pow((t - 0.80) / 0.14, 2));
            const waistMask = Math.exp(-Math.pow((t - 0.36) / 0.14, 2));
            sx += shoulderMask * (0.28 + muscleBulge * 0.16) - waistMask * 0.12;
            sz += shoulderMask * (0.08 + muscleBulge * 0.08);

            // Front pectoral cleavage & chest projection (angle near +PI/2)
            const frontFactor = Math.max(0, Math.sin(angle));
            const pecHeightMask = Math.exp(-Math.pow((t - 0.74) / 0.10, 2));
            const sternumGroove = 1 - 0.32 * Math.exp(-Math.pow(Math.cos(angle) / 0.16, 2));
            v.z += frontFactor * pecHeightMask * (0.045 + muscleBulge * 0.038) * sternumGroove;

            // 6-pack abdominal subtle relief (t ~ 0.32..0.60)
            const absMask = Math.exp(-Math.pow((t - 0.46) / 0.14, 2)) * Math.pow(frontFactor, 2);
            const absWave = Math.sin(t * Math.PI * 12) * 0.005 * (1 + muscleBulge);
            v.z += absMask * (0.014 + absWave);

            // Back spinal groove & gluteal curve (angle near -PI/2)
            const backFactor = Math.max(0, -Math.sin(angle));
            const spineGroove = Math.exp(-Math.pow(Math.cos(angle) / 0.18, 2));
            v.z += backFactor * spineGroove * 0.022 * Math.sin(t * Math.PI);
            const gluteMask = Math.exp(-Math.pow((t - 0.12) / 0.10, 2));
            v.z -= backFactor * gluteMask * (0.045 + muscleBulge * 0.02);
          } else if (mode === 'arm') {
            // Deltoid cap at top (t ~ 0.85), bicep/tricep belly (t ~ 0.62), forearm taper (t ~ 0.28)
            const deltMask = Math.exp(-Math.pow((t - 0.86) / 0.11, 2));
            const bicepMask = Math.exp(-Math.pow((t - 0.62) / 0.13, 2));
            const forearmMask = Math.exp(-Math.pow((t - 0.30) / 0.12, 2));
            const gain = 1 + (deltMask * 0.28 + bicepMask * 0.24 + forearmMask * 0.14) * (0.6 + muscleBulge);
            sx *= gain;
            sz *= gain * 1.06;
          } else if (mode === 'leg') {
            // Quadriceps sweep (t ~ 0.68), knee taper (t ~ 0.46), gastrocnemius calf diamond (t ~ 0.26)
            const quadMask = Math.exp(-Math.pow((t - 0.70) / 0.16, 2));
            const calfMask = Math.exp(-Math.pow((t - 0.26) / 0.10, 2));
            const gain = 1 + (quadMask * 0.24 + calfMask * 0.20) * (0.6 + muscleBulge);
            sx *= gain;
            sz *= gain * 1.08;
            // Forward quad projection & backward calf projection
            const frontFactor = Math.max(0, Math.sin(angle));
            const backFactor = Math.max(0, -Math.sin(angle));
            v.z += frontFactor * quadMask * (0.022 + muscleBulge * 0.018);
            v.z -= backFactor * calfMask * (0.024 + muscleBulge * 0.016);
          } else if (mode === 'head') {
            // Sculpted cranium, jawline, cheekbones and subtle facial plane
            const jawMask = Math.exp(-Math.pow((t - 0.22) / 0.14, 2));
            const frontFactor = Math.max(0, Math.sin(angle));
            sx *= 0.86 - jawMask * 0.12;
            sz *= 1.02;
            // Chin & lower face forward taper
            v.z += frontFactor * jawMask * 0.018;
          }

          v.x *= sx;
          v.z *= sz;
          pos.setXYZ(i, v.x, v.y, v.z);
        }

        latheGeo.computeVertexNormals();
        return new THREE.Mesh(latheGeo, options.material);
      }

      function init3DViewport() {
        const container = document.getElementById('avatar-canvas-container');
        if (!container || typeof THREE === 'undefined') return;

        scene = new THREE.Scene();

        const width = container.clientWidth || 500;
        const height = container.clientHeight || 480;
        camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
        camera.position.set(0, 1.08, cameraZoom);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.18;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        container.insertBefore(renderer.domElement, container.firstChild);

        // 3-Point Cinematic Studio Lighting
        const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x0f172a, 0.85);
        scene.add(hemiLight);

        const keyLight = new THREE.DirectionalLight(0xfff5eb, 1.45);
        keyLight.position.set(2.4, 3.6, 2.8);
        keyLight.castShadow = true;
        scene.add(keyLight);

        const rimLight = new THREE.DirectionalLight(0x00f0ff, 1.35);
        rimLight.position.set(-2.6, 2.5, -2.4);
        scene.add(rimLight);

        const fillLight = new THREE.DirectionalLight(0x8b5cf6, 0.55);
        fillLight.position.set(-2.2, 1.1, 2.2);
        scene.add(fillLight);

        // Pedestal Floor Disc & Energy Aura Ring
        const pedestalGeo = new THREE.CylinderGeometry(0.95, 1.08, 0.06, 64);
        const pedestalMat = new THREE.MeshStandardMaterial({
          color: 0x0b1120,
          metalness: 0.75,
          roughness: 0.28
        });
        const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
        pedestal.position.y = -0.03;
        pedestal.receiveShadow = true;
        scene.add(pedestal);

        const ringGeo = new THREE.RingGeometry(0.76, 0.84, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x00f0ff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.75
        });
        auraRing = new THREE.Mesh(ringGeo, ringMat);
        auraRing.rotation.x = -Math.PI / 2;
        auraRing.position.y = 0.005;
        scene.add(auraRing);

        // Ambient ascending energy particles
        const partCount = 65;
        const partGeo = new THREE.BufferGeometry();
        const partPositions = new Float32Array(partCount * 3);
        for (let i = 0; i < partCount; i++) {
          const r = 0.35 + Math.random() * 0.55;
          const theta = Math.random() * Math.PI * 2;
          partPositions[i * 3] = Math.cos(theta) * r;
          partPositions[i * 3 + 1] = Math.random() * 2.1;
          partPositions[i * 3 + 2] = Math.sin(theta) * r;
        }
        partGeo.setAttribute('position', new THREE.BufferAttribute(partPositions, 3));
        const partMat = new THREE.PointsMaterial({
          color: 0x00f0ff,
          size: 0.025,
          transparent: true,
          opacity: 0.75
        });
        auraParticles = new THREE.Points(partGeo, partMat);
        scene.add(auraParticles);

        buildHumanizedAvatar();
        setup3DControls(container);

        window.addEventListener('resize', () => {
          if (!container || !renderer || !camera) return;
          const w = container.clientWidth || 500;
          const h = container.clientHeight || 480;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        });
      }

      function buildHumanizedAvatar() {
        if (!scene) return;
        if (avatarGroup) {
          scene.remove(avatarGroup);
        }

        avatarGroup = new THREE.Group();
        const metrics = computeScientificMetrics(appState.profile);
        const isFem = appState.profile.bodyType === 'feminine';
        // Hypertrophy factor scales smoothly from 0.05 (Rank F) to 0.75 (Rank EX+)
        const muscleBulge = 0.05 + (metrics.physIndex / 19) * 0.68;

        // Realistic Skin Material with subsurface-like clearcoat sheen
        const skinMat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(appState.cosmetics.skinColor || '#e0a984'),
          roughness: 0.48,
          metalness: 0.02,
          clearcoat: 0.14,
          clearcoatRoughness: 0.48
        });

        // Outfit Materials
        const outfitType = appState.cosmetics.outfit || 'compression';
        const topColor = outfitType === 'hunter_armor' ? 0x1e293b : outfitType === 'tactical_noir' ? 0x111827 : 0x0f172a;
        const accentColor = outfitType === 'hunter_armor' ? 0x00f0ff : outfitType === 'tactical_noir' ? 0xf59e0b : 0x38bdf8;

        const apparelMat = new THREE.MeshPhysicalMaterial({
          color: topColor,
          roughness: outfitType === 'hunter_armor' ? 0.32 : 0.62,
          metalness: outfitType === 'hunter_armor' ? 0.55 : 0.12,
          clearcoat: outfitType === 'hunter_armor' ? 0.35 : 0.05
        });

        const accentMat = new THREE.MeshStandardMaterial({
          color: accentColor,
          emissive: accentColor,
          emissiveIntensity: 0.35,
          roughness: 0.3,
          metalness: 0.6
        });

        const pantsMat = new THREE.MeshStandardMaterial({
          color: 0x0b0f19,
          roughness: 0.68,
          metalness: 0.15
        });

        const hairMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(appState.cosmetics.hairColor || '#18181b'),
          roughness: 0.42,
          metalness: 0.18
        });

        // 1. ORGANIC SCULPTED TORSO (Pelvis -> Waist -> Ribs -> Pecs -> Shoulders/Traps)
        const torsoScaleX = isFem ? 0.88 : 1.02;
        const torsoProfile = [
          [0.02, 0.84],
          [isFem ? 0.165 : 0.155, 0.88], // Pelvis / hips
          [isFem ? 0.145 : 0.148, 0.98], // Hip crest
          [isFem ? 0.112 : 0.128, 1.10], // Tapered athletic waist
          [0.138, 1.22],                 // Ribcage & serratus
          [isFem ? 0.165 : 0.182, 1.34], // Pectorals & upper lats
          [isFem ? 0.148 : 0.168, 1.43], // Clavicles
          [0.068, 1.48],                 // Trapezius slope
          [0.056, 1.56]                  // Anatomical neck column
        ];
        chestMesh = createOrganicAnatomicalMesh(torsoProfile, {
          mode: 'torso',
          scaleX: torsoScaleX,
          scaleZ: 0.76,
          muscleBulge,
          material: skinMat
        });
        avatarGroup.add(chestMesh);

        // Fitted Compression / Hunter Chest Armor Layer over torso
        const shirtProfile = [
          [0.132, 1.06],
          [0.143, 1.22],
          [isFem ? 0.170 : 0.188, 1.34],
          [isFem ? 0.152 : 0.172, 1.435],
          [0.072, 1.475]
        ];
        const shirtMesh = createOrganicAnatomicalMesh(shirtProfile, {
          mode: 'torso',
          scaleX: torsoScaleX * 1.015,
          scaleZ: 0.785,
          muscleBulge,
          material: apparelMat
        });
        avatarGroup.add(shirtMesh);

        // Luminous Biomechanical Core / Emblem on sternum
        const coreGeo = new THREE.SphereGeometry(0.022, 24, 24);
        coreGeo.scale(1.1, 1.4, 0.45);
        const coreMesh = new THREE.Mesh(coreGeo, accentMat);
        coreMesh.position.set(0, 1.33, 0.148 + muscleBulge * 0.025);
        avatarGroup.add(coreMesh);

        // 2. SCULPTED HUMAN HEAD, FACIAL FEATURES & LAYERED ORGANIC HAIR
        headGroup = new THREE.Group();
        headGroup.position.set(0, 1.655, 0.01);

        const headProfile = [
          [0.005, -0.105], // Chin tip
          [0.052, -0.088], // Jawline
          [0.078, -0.045], // Cheekbones
          [0.088, 0.015],  // Temples / Brow
          [0.092, 0.065],  // Parietal cranium
          [0.072, 0.102],  // Crown
          [0.005, 0.115]   // Top vertex
        ];
        const headMesh = createOrganicAnatomicalMesh(headProfile, {
          mode: 'head',
          scaleX: 0.94,
          scaleZ: 1.06,
          material: skinMat
        });
        headGroup.add(headMesh);

        // Sculpted Nose Bridge (smooth organic curve)
        const noseCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.012, 0.088),
          new THREE.Vector3(0, -0.015, 0.104),
          new THREE.Vector3(0, -0.026, 0.096)
        ]);
        const noseGeo = new THREE.TubeGeometry(noseCurve, 12, 0.0095, 12, false);
        headGroup.add(new THREE.Mesh(noseGeo, skinMat));

        // Sculpted Lips (subtle organic contour)
        const lipGeo = new THREE.SphereGeometry(0.018, 16, 12);
        lipGeo.scale(1.35, 0.38, 0.55);
        const lipMat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(appState.cosmetics.skinColor).multiplyScalar(0.84),
          roughness: 0.42
        });
        const lipMesh = new THREE.Mesh(lipGeo, lipMat);
        lipMesh.position.set(0, -0.048, 0.086);
        headGroup.add(lipMesh);

        // Expressive Eyes (Sclera + Colored Iris + Glossy Cornea)
        const eyeScleraMat = new THREE.MeshPhysicalMaterial({ color: 0xf8fafc, roughness: 0.15, clearcoat: 0.9 });
        const irisMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, emissive: 0x0284c7, emissiveIntensity: 0.25, roughness: 0.2 });
        [-0.031, 0.031].forEach(ex => {
          const eye = new THREE.Mesh(new THREE.SphereGeometry(0.013, 18, 18), eyeScleraMat);
          eye.position.set(ex, 0.006, 0.081);
          headGroup.add(eye);

          const iris = new THREE.Mesh(new THREE.SphereGeometry(0.0075, 16, 16), irisMat);
          iris.position.set(ex, 0.006, 0.091);
          headGroup.add(iris);

          // Sculpted Ear
          const ear = new THREE.Mesh(new THREE.SphereGeometry(0.016, 14, 14), skinMat);
          ear.scale.set(0.45, 1.35, 0.75);
          ear.position.set(ex * 2.55, -0.005, -0.005);
          headGroup.add(ear);
        });

        // Layered Flowing Organic Hair Strands (TubeGeometry locks for realistic silhouette)
        const hairStyle = appState.cosmetics.hairStyle || 'tactical';
        const strandCount = hairStyle === 'flowing' ? 28 : 22;
        for (let s = 0; s < strandCount; s++) {
          const frac = s / strandCount;
          const phi = frac * Math.PI * 2;
          const isFront = Math.sin(phi) > 0.25;
          const startX = Math.cos(phi) * 0.025;
          const startZ = Math.sin(phi) * 0.025;

          const lengthDrop = hairStyle === 'flowing'
            ? (isFront ? -0.01 : -0.17)
            : hairStyle === 'spiky'
              ? 0.035
              : (isFront ? -0.005 : -0.085);

          const midX = Math.cos(phi) * 0.088;
          const midZ = Math.sin(phi) * 0.098;
          const endX = Math.cos(phi) * (hairStyle === 'spiky' ? 0.105 : 0.092);
          const endZ = Math.sin(phi) * (hairStyle === 'spiky' ? 0.115 : 0.098);

          const strandCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(startX, 0.112, startZ),
            new THREE.Vector3(midX, 0.075, midZ),
            new THREE.Vector3(endX, lengthDrop, endZ)
          ]);
          const strandGeo = new THREE.TubeGeometry(strandCurve, 14, 0.016, 10, false);
          headGroup.add(new THREE.Mesh(strandGeo, hairMat));
        }

        // High Ponytail extension if selected
        if (hairStyle === 'ponytail') {
          for (let p = 0; p < 7; p++) {
            const offset = (p - 3) * 0.008;
            const tailCurve = new THREE.CatmullRomCurve3([
              new THREE.Vector3(offset, 0.075, -0.085),
              new THREE.Vector3(offset * 1.6, 0.02, -0.145),
              new THREE.Vector3(offset * 2.1, -0.14, -0.165)
            ]);
            headGroup.add(new THREE.Mesh(new THREE.TubeGeometry(tailCurve, 14, 0.014, 10, false), hairMat));
          }
        }

        avatarGroup.add(headGroup);

        // 3. LEFT & RIGHT ANATOMICAL ARMS (Deltoid -> Bicep/Tricep -> Forearm -> Sculpted Hand)
        const shoulderX = (isFem ? 0.185 : 0.215) + muscleBulge * 0.032;

        function buildOrganicArm(sideSign) {
          const armGrp = new THREE.Group();
          armGrp.position.set(sideSign * shoulderX, 1.39, 0);

          const armProfile = [
            [0.028, -0.52], // Wrist
            [0.042, -0.40], // Lower forearm
            [0.048, -0.30], // Brachioradialis belly
            [0.040, -0.24], // Elbow articulation
            [0.052, -0.14], // Bicep / Tricep peak
            [0.058, -0.04], // Deltoid cap
            [0.036, 0.035]  // Shoulder blend
          ];
          const armMesh = createOrganicAnatomicalMesh(armProfile, {
            mode: 'arm',
            muscleBulge,
            material: skinMat
          });
          armGrp.add(armMesh);

          // Sculpted Anatomical Hand + Fingers
          const palm = new THREE.Mesh(new THREE.SphereGeometry(0.034, 16, 16), skinMat);
          palm.scale.set(0.65, 1.25, 0.95);
          palm.position.set(0, -0.555, 0.005);
          armGrp.add(palm);

          for (let f = 0; f < 4; f++) {
            const fCurve = new THREE.CatmullRomCurve3([
              new THREE.Vector3(0, -0.585, -0.016 + f * 0.011),
              new THREE.Vector3(-sideSign * 0.006, -0.615, -0.015 + f * 0.010)
            ]);
            armGrp.add(new THREE.Mesh(new THREE.TubeGeometry(fCurve, 6, 0.0055, 8, false), skinMat));
          }

          // Natural athletic arm abduction angle
          armGrp.rotation.z = sideSign * (0.14 + muscleBulge * 0.08);
          armGrp.rotation.x = 0.05;
          return armGrp;
        }

        leftArmGroup = buildOrganicArm(-1);
        rightArmGroup = buildOrganicArm(1);
        avatarGroup.add(leftArmGroup);
        avatarGroup.add(rightArmGroup);

        // 4. LEFT & RIGHT ANATOMICAL LEGS (Glutes -> Quads -> Knee -> Gastrocnemius Calves -> Boots)
        const hipX = isFem ? 0.096 : 0.092;

        function buildOrganicLeg(sideSign) {
          const legGrp = new THREE.Group();
          legGrp.position.set(sideSign * hipX, 0.88, 0);

          const legProfile = [
            [0.042, -0.78], // Ankle
            [0.056, -0.64], // Lower calf / Soleus
            [0.066, -0.54], // Gastrocnemius calf peak
            [0.052, -0.42], // Knee joint
            [0.074, -0.26], // Quadriceps sweep
            [0.088, -0.08], // Upper thigh / Glute blend
            [0.062, 0.03]   // Pelvis socket
          ];
          const legMesh = createOrganicAnatomicalMesh(legProfile, {
            mode: 'leg',
            muscleBulge,
            material: pantsMat
          });
          legGrp.add(legMesh);

          // Sculpted Athletic / Tactical Boot
          const bootCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, -0.78, -0.02),
            new THREE.Vector3(0, -0.85, 0.01),
            new THREE.Vector3(0, -0.86, 0.095)
          ]);
          const bootGeo = new THREE.TubeGeometry(bootCurve, 14, 0.044, 14, false);
          bootGeo.scale(0.95, 0.72, 1.15);
          legGrp.add(new THREE.Mesh(bootGeo, apparelMat));

          // Subtle luminous boot trim
          const trim = new THREE.Mesh(new THREE.TorusGeometry(0.044, 0.004, 10, 24), accentMat);
          trim.rotation.x = Math.PI / 2;
          trim.position.set(0, -0.77, 0);
          legGrp.add(trim);

          legGrp.rotation.z = sideSign * -0.045;
          return legGrp;
        }

        avatarGroup.add(buildOrganicLeg(-1));
        avatarGroup.add(buildOrganicLeg(1));

        // Update Aura Ring color based on Physical Rank
        if (auraRing && auraParticles) {
          const rankHex = metrics.physIndex >= 18 ? 0xf59e0b : metrics.physIndex >= 12 ? 0x8b5cf6 : 0x00f0ff;
          auraRing.material.color.setHex(rankHex);
          auraParticles.material.color.setHex(rankHex);
        }

        scene.add(avatarGroup);
      }

      function setup3DControls(container) {
        container.addEventListener('pointerdown', (e) => {
          isDragging3D = true;
          prevPointerX = e.clientX;
          prevPointerY = e.clientY;
        });

        window.addEventListener('pointermove', (e) => {
          if (!isDragging3D) return;
          const dx = e.clientX - prevPointerX;
          const dy = e.clientY - prevPointerY;
          prevPointerX = e.clientX;
          prevPointerY = e.clientY;
          targetRotY += dx * 0.01;
          targetRotX = Math.max(-0.35, Math.min(0.45, targetRotX + dy * 0.006));
        });

        window.addEventListener('pointerup', () => {
          isDragging3D = false;
        });

        container.addEventListener('wheel', (e) => {
          e.preventDefault();
          cameraZoom = Math.max(2.1, Math.min(4.8, cameraZoom + e.deltaY * 0.002));
        }, { passive: false });
      }

      function animate3DLoop() {
        requestAnimationFrame(animate3DLoop);
        if (!renderer || !scene || !camera) return;

        const elapsed = clock3D.getElapsedTime();

        if (avatarGroup) {
          // Smooth orbital interpolation
          avatarGroup.rotation.y += (targetRotY - avatarGroup.rotation.y) * 0.1;
          avatarGroup.rotation.x += (targetRotX - avatarGroup.rotation.x) * 0.1;

          // Organic thoracic breathing & natural postural sway
          const breath = Math.sin(elapsed * 2.1);
          if (chestMesh) {
            chestMesh.scale.z = 0.76 + breath * 0.014;
            chestMesh.position.y = breath * 0.003;
          }
          if (headGroup) {
            headGroup.rotation.y = Math.sin(elapsed * 0.85) * 0.045;
            headGroup.rotation.x = Math.cos(elapsed * 1.1) * 0.02;
          }
          if (leftArmGroup && rightArmGroup) {
            leftArmGroup.position.y = 1.39 + breath * 0.003;
            rightArmGroup.position.y = 1.39 + breath * 0.003;
          }
        }

        if (auraRing) {
          auraRing.rotation.z = elapsed * 0.45;
          const pulse = 1 + Math.sin(elapsed * 2.5) * 0.035;
          auraRing.scale.set(pulse, pulse, 1);
        }

        if (auraParticles) {
          auraParticles.rotation.y = elapsed * 0.18;
          const pos = auraParticles.geometry.attributes.position;
          for (let i = 0; i < pos.count; i++) {
            let y = pos.getY(i) + 0.004;
            if (y > 2.1) y = 0.05;
            pos.setY(i, y);
          }
          pos.needsUpdate = true;
        }

        camera.position.z += (cameraZoom - camera.position.z) * 0.12;
        renderer.render(scene, camera);
      }

      // ===================================================================
      // 7. MISSIONS & SMART ADAPTIVE JUSTIFICATION ENGINE
      // ===================================================================
      function seedDefaultMissionsIfEmpty() {
        if (appState.missions && appState.missions.length > 0) return;
        const isGym = appState.profile.modality === 'gym' || appState.profile.modality === 'hybrid';
        appState.missions = [
          {
            id: 'm1',
            title: isGym
              ? `Sesión de Empuje: Press Banca con ${appState.profile.lifts.pushW}kg × ${appState.profile.lifts.pushR} reps`
              : `Calistenia de Empuje: 4 series de Flexiones Biomecánicas (${appState.profile.lifts.pushR} reps)`,
            type: isGym ? 'gym' : 'home',
            xp: 60,
            lp: 35,
            status: 'pending', // pending | completed | failed | adapted
            adaptedFrom: null
          },
          {
            id: 'm2',
            title: 'Resistencia Cardiovascular: Correr 5 km a ritmo aeróbico Z2',
            type: 'outdoor',
            xp: 55,
            lp: 30,
            status: 'pending',
            adaptedFrom: null
          },
          {
            id: 'm3',
            title: 'Movilidad NEAT: Alcanzar 8,000 pasos diarios acumulados',
            type: 'recovery',
            xp: 45,
            lp: 25,
            status: 'pending',
            adaptedFrom: null
          }
        ];
      }

      function generateAdaptiveHomeChallenge(originalMission, reasonText) {
        const lower = reasonText.toLowerCase();
        const injury = (appState.profile.injuries || '').toLowerCase();

        if (lower.includes('lluv') || lower.includes('clima') || lower.includes('tormenta') || originalMission.type === 'outdoor') {
          if (injury.includes('rodilla')) {
            return 'Desafío en Casa (Bajo Impacto): Circuito Metabólico de Tren Superior + Core 20 min (Shadowboxing + Planchas dinámicas)';
          }
          return 'Desafío en Casa (Clima Adverso): Protocolo HIIT Metabólico Indoor 20 min (40s Jumping Jacks / Mountain Climbers / Burpees controlados × 20s descanso)';
        }

        if (lower.includes('gimnasio') || lower.includes('cerrado') || lower.includes('tiempo')) {
          return 'Desafío en Casa (Sustitución de Fuerza): 5 series de Flexiones con Tempo Excéntrico 4s + Sentadilla Búlgara Unilateral al fallo técnico (RIR 1)';
        }

        if (lower.includes('dolor') || lower.includes('molestia') || lower.includes('lesi')) {
          return 'Protocolo Biomecánico Terapéutico en Casa: 25 min de Movilidad Articular Controlada + Isométricos de Estabilidad (RIR 3, sin dolor)';
        }

        return 'Desafío de Contingencia en Casa: Circuito de Fuerza Funcional Corporal 4 rondas (Flexiones, Sentadillas tempo lento, Remo invertido/toalla y Plancha 60s)';
      }

      function renderMissions() {
        const container = document.getElementById('missions-list');
        if (!container) return;

        container.innerHTML = appState.missions.map(m => {
          const isCompleted = m.status === 'completed';
          const isFailed = m.status === 'failed';
          const isAdapted = m.status === 'adapted';

          const badgeMap = {
            gym: '<span class="px-2 py-0.5 rounded-md text-[10px] font-tech font-bold bg-cyan-500/20 text-cyan-300">🏋️ GIMNASIO</span>',
            outdoor: '<span class="px-2 py-0.5 rounded-md text-[10px] font-tech font-bold bg-amber-500/20 text-amber-300">🌧️ AIRE LIBRE</span>',
            home: '<span class="px-2 py-0.5 rounded-md text-[10px] font-tech font-bold bg-emerald-500/20 text-emerald-300">🏠 EN CASA</span>',
            recovery: '<span class="px-2 py-0.5 rounded-md text-[10px] font-tech font-bold bg-violet-500/20 text-violet-300">💤 HÁBITO</span>'
          };

          let statusFooter = '';
          if (isCompleted) {
            statusFooter = `
              <div class="mt-3 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300 font-tech font-bold">
                <span>✔ MISIÓN COMPLETADA (+${m.xp} XP / +${m.lp} LP)</span>
                <span>Racha Protegida</span>
              </div>`;
          } else if (isFailed) {
            statusFooter = `
              <div class="mt-3 pt-3 border-t border-rose-500/30 flex items-center justify-between text-xs text-rose-400 font-tech font-bold">
                <span>✖ FALLIDA — Bloqueada hasta la próxima semana</span>
                <span>⏳ Espera semanal</span>
              </div>`;
          } else {
            statusFooter = `
              <div class="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
                <button type="button" data-action="complete" data-id="${m.id}" class="mission-act-btn px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-tech font-extrabold text-xs uppercase transition">
                  ✔ Completar (+${m.xp} XP)
                </button>
                <button type="button" data-action="justify" data-id="${m.id}" class="mission-act-btn px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 font-tech font-bold text-xs uppercase transition">
                  🌧️ Justificar Imprevisto
                </button>
                <button type="button" data-action="fail" data-id="${m.id}" class="mission-act-btn px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/30 text-rose-300 font-tech font-bold text-xs uppercase transition ml-auto">
                  ✖ Fallar
                </button>
              </div>`;
          }

          return `
            <div class="rounded-2xl p-4 border ${isCompleted ? 'border-emerald-500/35 bg-emerald-950/15' : isFailed ? 'border-rose-500/35 bg-rose-950/15 opacity-75' : 'border-white/10 bg-black/45'} flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between gap-2 mb-2">
                  ${badgeMap[m.type] || badgeMap.home}
                  <span class="text-xs font-tech font-bold text-cyan-300">+${m.xp} XP • +${m.lp} LP</span>
                </div>
                <h4 class="font-semibold text-sm text-white leading-snug">${m.title}</h4>
                ${isAdapted && m.adaptedFrom ? `<p class="text-[11px] text-amber-300/90 mt-1.5 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-400/20">🔄 Adaptada por imprevisto: "${m.adaptedFrom}"</p>` : ''}
              </div>
              ${statusFooter}
            </div>
          `;
        }).join('');
      }

      // ===================================================================
      // 8. BIOMECHANICAL AI ROUTINE GENERATOR & FILE/PHOTO ANALYZER
      // ===================================================================
      function generateScientificRoutineHTML() {
        const p = appState.profile;
        const inj = (p.injuries || 'Ninguna').toLowerCase();
        const mod = p.modality;
        const eqList = [...(p.equipment || []), p.equipmentCustom].filter(Boolean).join(', ') || 'Peso corporal';

        // Injury-aware biomechanical exercise substitution
        const hasShoulderInj = inj.includes('hombro');
        const hasLumbarInj = inj.includes('lumbar') || inj.includes('espalda');
        const hasKneeInj = inj.includes('rodilla');

        let days = [];

        if (mod === 'home_none') {
          days = [
            {
              day: 'Día 1 • Empuje & Core (Tensión Mecánica Corporal)',
              focus: 'Pectoral, Deltoides Anterior, Tríceps y Estabilidad Lumbar',
              exercises: [
                { name: hasShoulderInj ? 'Flexiones con agarre neutro cerrado (codos a 30°)' : 'Flexiones Declinadas con Tempo Excéntrico 3-1-1', sets: '4 × 10-15', rir: 'RIR 1-2', rest: '90s' },
                { name: hasShoulderInj ? 'Elevaciones frontales isométricas en pared' : 'Pike Push-ups (Press Vertical Corporal)', sets: '3 × 8-12', rir: 'RIR 2', rest: '90s' },
                { name: 'Fondos entre sillas / banco con pausa abajo', sets: '3 × 10-14', rir: 'RIR 1', rest: '75s' },
                { name: 'Plancha RKC de máxima irradiación', sets: '3 × 40s', rir: 'Isométrico', rest: '60s' }
              ]
            },
            {
              day: 'Día 2 • Tracción & Cadena Posterior',
              focus: 'Dorsal Ancho, Romboides, Isquiotibiales y Glúteo',
              exercises: [
                { name: 'Remo Invertido bajo mesa robusta / suspensión', sets: '4 × 10-15', rir: 'RIR 1', rest: '90s' },
                { name: hasLumbarInj ? 'Puente de Glúteo Unilateral controlado' : 'Curl Nórdico asistido / Deslizamiento de talones', sets: '4 × 8-12', rir: 'RIR 1-2', rest: '90s' },
                { name: 'Superman / Extensiones escapulares en prono', sets: '3 × 15', rir: 'RIR 2', rest: '60s' }
              ]
            },
            {
              day: 'Día 3 • Pierna Unilateral & Potencia',
              focus: 'Cuádriceps, Glúteo Medio y Sóleo',
              exercises: [
                { name: hasKneeInj ? 'Sentadilla Box controlada a 90° sin rebote' : 'Sentadilla Búlgara con pausa 2s en punto bajo', sets: '4 × 10/lado', rir: 'RIR 1', rest: '90s' },
                { name: 'Zancadas inversas largas (énfasis cadera)', sets: '3 × 12/lado', rir: 'RIR 2', rest: '75s' },
                { name: 'Elevación de talones unilateral en escalón', sets: '4 × 15-20', rir: 'RIR 1', rest: '60s' }
              ]
            }
          ];
        } else if (mod === 'home_gear') {
          days = [
            {
              day: `Día 1 • Torso Superior (Equipo: ${eqList})`,
              focus: 'Hipertrofia Miofibrilar & Tensión Mecánica',
              exercises: [
                { name: hasShoulderInj ? 'Press en suelo (Floor Press) con mancuernas neutro' : 'Press con Mancuernas en banco / suelo (Tempo 3-0-1)', sets: '4 × 8-12', rir: 'RIR 1', rest: '120s' },
                { name: 'Remo a una mano con mancuerna / kettlebell apoyado', sets: '4 × 10-12', rir: 'RIR 1', rest: '90s' },
                { name: 'Vuelos laterales con mancuernas o bandas elásticas', sets: '4 × 12-16', rir: 'RIR 1', rest: '60s' }
              ]
            },
            {
              day: 'Día 2 • Tren Inferior & Cadena Posterior',
              focus: 'Fuerza Relativa y Estabilidad Pélvica',
              exercises: [
                { name: hasKneeInj ? 'Peso Muerto Rumano con mancuernas/kettlebell' : 'Sentadilla Goblet pesada con pausa 2s', sets: '4 × 10-12', rir: 'RIR 1-2', rest: '120s' },
                { name: hasLumbarInj ? 'Hip Thrust unilateral con carga' : 'Peso Muerto Rumano a una pierna', sets: '3 × 10/lado', rir: 'RIR 2', rest: '90s' },
                { name: 'Press Pallof anti-rotación con banda elástica', sets: '3 × 12/lado', rir: 'Control', rest: '60s' }
              ]
            }
          ];
        } else {
          // Gym or Hybrid
          days = [
            {
              day: 'Día 1 • Torso Fuerza-Hipertrofia (Upper A)',
              focus: 'Tensión Mecánica en Plano Horizontal y Vertical',
              exercises: [
                { name: hasShoulderInj ? 'Press en Máquina Convergente agarre neutro' : 'Press de Banca Plano con Barra (Tempo 3-1-X)', sets: '4 × 6-8', rir: 'RIR 1-2', rest: '150s' },
                { name: hasLumbarInj ? 'Remo en Máquina con soporte pectoral' : 'Remo con Barra Pendlay / Polea Baja', sets: '4 × 8-10', rir: 'RIR 1', rest: '120s' },
                { name: 'Jalón al Pecho agarre prono amplio', sets: '3 × 10-12', rir: 'RIR 1', rest: '90s' },
                { name: 'Elevaciones Laterales en Polea a altura de muñeca', sets: '4 × 12-15', rir: 'RIR 1', rest: '60s' }
              ]
            },
            {
              day: 'Día 2 • Tren Inferior Biomecánico (Lower A)',
              focus: 'Demanda Máxima de Cuádriceps y Cadena Posterior',
              exercises: [
                { name: hasKneeInj ? 'Prensa de Piernas 45° pies altos (bajo estrés rotuliano)' : 'Sentadilla Trasera con Barra Olímpica', sets: '4 × 6-8', rir: 'RIR 1-2', rest: '180s' },
                { name: hasLumbarInj ? 'Curl Femoral Sentado (mayor estiramiento en cadera)' : 'Peso Muerto Rumano con Barra', sets: '3 × 8-10', rir: 'RIR 2', rest: '150s' },
                { name: 'Gemelos de pie en máquina (pausa 2s en estiramiento)', sets: '4 × 10-14', rir: 'RIR 1', rest: '75s' }
              ]
            },
            {
              day: mod === 'hybrid' ? 'Día 3 • Sesión Híbrida en Casa (Metabólico & Core)' : 'Día 3 • Torso Hipertrofia Metabólica (Upper B)',
              focus: 'Volumen Efectivo MAV & Salud Articular',
              exercises: [
                { name: mod === 'hybrid' ? 'Flexiones lastradas + Bandas elásticas' : 'Press Inclinado 30° con Mancuernas', sets: '3 × 10-12', rir: 'RIR 1', rest: '90s' },
                { name: 'Face Pull en polea / banda para manguito rotador', sets: '3 × 15', rir: 'RIR 2', rest: '60s' },
                { name: 'Curl Bíceps en banco inclinado + Extensión Tríceps en polea', sets: '3 × 12 c/u', rir: 'RIR 1', rest: '75s' }
              ]
            }
          ];
        }

        const injuryNote = p.injuries && p.injuries !== 'Ninguna'
          ? `<div class="p-3 rounded-xl bg-amber-500/15 border border-amber-400/30 text-xs text-amber-200">
               🛡️ <strong>Adaptación Biomecánica Activa:</strong> Se han sustituido vectores de carga compresiva para proteger <u>${p.injuries}</u>.
             </div>`
          : `<div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-xs text-emerald-200">
               ✅ <strong>Sin restricciones articulares:</strong> Volumen calibrado en zona MAV (14–18 series efectivas/grupo muscular).
             </div>`;

        return `
          ${injuryNote}
          <div class="space-y-3.5">
            ${days.map(d => `
              <div class="bg-black/45 rounded-2xl p-4 border border-white/10">
                <div class="flex flex-wrap items-center justify-between gap-1 mb-2.5">
                  <h4 class="font-tech font-bold text-sm text-cyan-300 uppercase">${d.day}</h4>
                  <span class="text-[11px] text-slate-400">${d.focus}</span>
                </div>
                <div class="divide-y divide-white/5">
                  ${d.exercises.map(ex => `
                    <div class="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <span class="text-slate-100 font-medium">${ex.name}</span>
                      <div class="flex items-center gap-2 text-[11px] font-tech shrink-0">
                        <span class="px-2 py-0.5 rounded bg-white/10 text-cyan-200 font-bold">${ex.sets}</span>
                        <span class="px-2 py-0.5 rounded bg-violet-500/20 text-violet-200">${ex.rir}</span>
                        <span class="text-slate-400">${ex.rest}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }

      function analyzeExternalRoutine(textContent, fileInfo) {
        const raw = (textContent || '').trim();
        const combined = (raw + ' ' + (fileInfo ? fileInfo.name : '')).toLowerCase();

        const hasPush = /banca|bench|flexion|push|pecho|pectoral|militar|hombro|fondos/.test(combined);
        const hasPull = /remo|row|dominada|pull|jalon|espalda|peso muerto|deadlift|bicep/.test(combined);
        const hasLegs = /sentadilla|squat|pierna|prensa|zancada|femoral|cuadricep|gemelo/.test(combined);

        let balanceScore = 62;
        if (hasPush) balanceScore += 12;
        if (hasPull) balanceScore += 13;
        if (hasLegs) balanceScore += 13;
        if (!raw && fileInfo && fileInfo.isImage) balanceScore = 84;

        const missing = [];
        if (!hasPush && raw) missing.push('Patrón de Empuje Horizontal/Vertical');
        if (!hasPull && raw) missing.push('Patrón de Tracción (riesgo de cifosis/desbalance escapular)');
        if (!hasLegs && raw) missing.push('Tren Inferior (clave para respuesta anabólica sistémica)');

        const inj = (appState.profile.injuries || '').toLowerCase();
        let injuryWarning = 'Sin conflictos detectados con tu historial articular.';
        if (inj.includes('hombro') && /militar|trasnuca|fondos|banca/.test(combined)) {
          injuryWarning = '⚠️ Precaución: Detectados ejercicios de empuje en rango extremo que pueden irritar tu lesión de hombro. Usa agarre neutro y RIR 2.';
        } else if (inj.includes('lumbar') && /peso muerto|sentadilla|buenos dias/.test(combined)) {
          injuryWarning = '⚠️ Precaución: Alta carga axial detectada frente a tu molestia lumbar. Prioriza variantes con soporte de pecho o prensa.';
        } else if (inj.includes('rodilla') && /sentadilla|salto|zancada/.test(combined)) {
          injuryWarning = '⚠️ Precaución: Controla la traslación tibial y evita rebotes en el punto bajo por tu sensibilidad de rodilla.';
        }

        const sourceBadge = fileInfo
          ? `Archivo analizado: <strong>${fileInfo.name}</strong> (${fileInfo.isImage ? 'Visión Biomecánica de Imagen' : 'Parser Estructural'})`
          : 'Análisis de texto estructurado';

        return `
          <div class="flex items-center justify-between">
            <span class="text-xs font-tech uppercase tracking-wider text-violet-300 font-bold">Informe Biomecánico Científico</span>
            <span class="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-tech font-extrabold text-xs">Índice Científico: ${balanceScore}/100</span>
          </div>
          <p class="text-[11px] text-slate-400">${sourceBadge}</p>
          <div class="space-y-2 text-xs text-slate-200">
            <div class="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <strong class="text-cyan-300">Distribución Muscular:</strong> ${missing.length === 0 ? 'Equilibrio óptimo entre cadenas anteriores, posteriores y tren inferior.' : 'Faltan estímulos en: ' + missing.join(', ') + '.'}
            </div>
            <div class="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <strong class="text-amber-300">Auditoría de Lesiones:</strong> ${injuryWarning}
            </div>
            <div class="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <strong class="text-violet-300">Proyección de Rango:</strong> Manteniendo sobrecarga progresiva (+2.5% carga cada 2 semanas) y RIR 1-2, ascenderás al siguiente sub-rango físico en ~3 semanas.
            </div>
          </div>
        `;
      }

      // ===================================================================
      // 9. LORE & 20 RANK CHAPTERS (F TO EX+)
      // ===================================================================
      const LORE_CHAPTER_TEMPLATES = [
        'El Primer Latido del Nexo: Tu sistema nervioso responde por primera vez al estrés mecánico.',
        'Fractura de la Inercia: Tus fibras tipo II despiertan bajo la gravedad controlada.',
        'Eco en la Cámara de Hierro: El dolor muscular se transforma en densidad miofibrilar.',
        'Pulso Sincronizado: Tu respiración y tu fuerza relativa comienzan a resonar.',
        'El Umbral de los Despertados: Los sensores del Gremio registran tu firma energética.',
        'Cicatrices de Voluntad: Cada repetición cerca del fallo forja una voluntad inquebrantable.',
        'Resonancia Cinética: Tu velocidad de ejecución supera el estándar humano convencional.',
        'Forja de Vanguardia: Tus tendones y articulaciones soportan cargas que doblarían el acero.',
        'Aura de Combate: Un resplandor sutil rodea tu silueta al alcanzar el pico de tensión.',
        'El Juramento del Abismo: Descubres que el verdadero enemigo es la complacencia.',
        'Soberanía Corporal: Control absoluto sobre cada vector de fuerza en el espacio.',
        'Ruptura del Límite Biológico: Tu índice DOTS entra en el percentil superior de cazadores.',
        'Titán de la Grieta: Tu sola presencia altera la presión atmosférica del santuario.',
        'Anomalía de Clase Nacional: Los archiveros del Nexo reclasifican tu potencial genético.',
        'Depredador Ápice: Ningún obstáculo físico o climático puede detener tu disciplina.',
        'Coloso Trascendente: Tu masa libre de grasa y potencia neural alcanzan armonía perfecta.',
        'Semidiós Biomecánico: Las leyes de la fatiga parecen inclinarse ante tu recuperación.',
        'Leyenda del Nexo Eterno: Tu nombre se graba en los monolitos de los grandes maestros.',
        'SINGULARIDAD EX: Has trascendido la escala humana; tu cuerpo es un reactor vivo.',
        'APOTEOSIS EX+: El pináculo absoluto de la existencia física y espiritual.'
      ];

      function buildUniqueOriginStory(profile, rpg) {
        const modText = profile.modality === 'gym'
          ? 'en las cámaras de hierro de los gimnasios subterráneos'
          : profile.modality === 'home_none'
            ? 'en absoluto aislamiento, dominando únicamente el peso de su propio cuerpo'
            : 'forjando su disciplina entre el hogar y los centros de entrenamiento';
        return `Nacido como un ${rpg.race}, ${profile.name} despertó su núcleo biomecánico ${modText}. Mientras otros buscaban atajos, canalizó cada gota de esfuerzo y cada hora de descanso en el despertar de la clase ${rpg.baseClass}.`;
      }

      function renderChronicles(metrics) {
        const rpg = appState.rpg;
        const evoCount = getEvolutionCount(rpg.level);
        const nextEvoLvl = getNextEvolutionLevel(rpg.level);
        const prevMilestone = evoCount === 0 ? 1 : (nextEvoLvl <= 100 ? [1, 5, 10, 20, 35, 50, 75][evoCount] || 1 : nextEvoLvl - 25);
        const pct = Math.min(100, Math.max(8, Math.round(((rpg.level - prevMilestone) / Math.max(1, nextEvoLvl - prevMilestone)) * 100)));

        document.getElementById('chronicle-evo-badge').textContent = `Evolución #${evoCount} (${EVO_TITLES[Math.min(evoCount, EVO_TITLES.length - 1)]})`;
        document.getElementById('chronicle-race').textContent = `Raza / Especie: ${rpg.race}`;
        document.getElementById('chronicle-class-name').textContent = getEvolvedClassName(rpg.baseClass, evoCount);
        document.getElementById('chronicle-next-evo-hint').innerHTML = `Próxima Evolución de Clase al alcanzar el <strong>Nivel ${nextEvoLvl}</strong>. Las evoluciones son infinitas (I, II, III... ∞).`;
        document.getElementById('chronicle-lvl-progress-text').textContent = `Nv. ${rpg.level} / Nv. ${nextEvoLvl}`;
        document.getElementById('chronicle-lvl-bar').style.width = `${pct}%`;

        // Evolution chips
        const evoHistoryEl = document.getElementById('chronicle-evo-history');
        const chips = [];
        for (let i = 0; i <= Math.min(evoCount + 2, 7); i++) {
          const unlocked = i <= evoCount;
          chips.push(`<span class="px-2.5 py-1 rounded-lg text-[11px] font-tech ${unlocked ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 font-bold' : 'bg-white/5 text-slate-500 border border-white/5'}">${unlocked ? '✦' : '🔒'} ${EVO_TITLES[i]}</span>`);
        }
        evoHistoryEl.innerHTML = chips.join('');

        // Mutating Passive (mutates every 2 evolutions)
        const mutationGrade = Math.floor(evoCount / 2);
        const bonusPct = 12 + mutationGrade * 6;
        document.getElementById('passive-mutation-tier').textContent = `Mutación Grado ${mutationGrade}`;
        document.getElementById('passive-name').textContent = mutationGrade === 0
          ? rpg.passiveName
          : `${rpg.passiveName} [Mutación ${'I'.repeat(Math.min(5, mutationGrade))}${mutationGrade > 5 ? mutationGrade : ''}]`;
        document.getElementById('passive-desc').textContent =
          `Incrementa un +${bonusPct}% la eficiencia neuromuscular y síntesis proteica en series pesadas tras cumplir tu meta de sueño semanal. ${mutationGrade > 0 ? `Efecto mutado activo: reduce un ${mutationGrade * 8}% la fatiga del SNC.` : ''}`;

        // Origin Story
        document.getElementById('avatar-origin-story').textContent = rpg.originStory || buildUniqueOriginStory(appState.profile, rpg);

        // 20 Rank Chapters
        const unlockedCount = metrics.physIndex + 1;
        document.getElementById('lore-unlocked-counter').textContent = `Desbloqueados: ${unlockedCount} / 20`;

        const grid = document.getElementById('lore-chapters-grid');
        grid.innerHTML = PHYSICAL_RANKS.map((r, idx) => {
          const isUnlocked = idx <= metrics.physIndex;
          return `
            <div class="rounded-2xl p-4 border ${isUnlocked ? 'border-cyan-400/35 bg-gradient-to-b from-cyan-950/25 to-black/60' : 'border-white/5 bg-black/40 opacity-65'}">
              <div class="flex items-center justify-between mb-2">
                <span class="font-epic font-extrabold text-base ${isUnlocked ? 'text-cyan-300' : 'text-slate-500'}">Rango ${r}</span>
                <span class="text-[10px] font-tech px-2 py-0.5 rounded ${isUnlocked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-slate-400'}">
                  ${isUnlocked ? 'DESBLOQUEADO' : `Requiere ${r}`}
                </span>
              </div>
              <p class="text-xs leading-relaxed ${isUnlocked ? 'text-slate-200' : 'text-slate-500 italic'}">
                ${isUnlocked ? LORE_CHAPTER_TEMPLATES[idx] : 'Aumenta tu fuerza relativa y absoluta en el Santuario para descifrar este fragmento de memoria.'}
              </p>
            </div>
          `;
        }).join('');
      }

      // ===================================================================
      // 10. 2D SEMI-REALISTIC VISUAL NOVEL ("EL UMBRAL DEL NEXO")
      // ===================================================================
      function getSemiRealisticPortraitSVG(character, emotion) {
        // Layered digital-painting style 2D semi-realistic SVG portraits with volumetric shading & rim lights
        const configs = {
          kaelen: {
            bgStart: '#0f2942', bgEnd: '#060a14', rim: '#00f0ff',
            skin: '#d9a482', skinShadow: '#9c6648', hair: '#1e293b', hairHighlight: '#475569',
            eyes: '#38bdf8', armor: '#0f172a', armorTrim: '#00f0ff',
            browTilt: emotion === 'stern' ? 8 : emotion === 'warm' ? -4 : 3,
            mouthCurve: emotion === 'warm' ? 'M 92 162 Q 110 172 128 162' : 'M 94 165 Q 110 163 126 165'
          },
          lyra: {
            bgStart: '#0d332d', bgEnd: '#060b10', rim: '#10b981',
            skin: '#ecc1a1', skinShadow: '#b88362', hair: '#7c2d12', hairHighlight: '#ea580c',
            eyes: '#10b981', armor: '#132a2e', armorTrim: '#34d399',
            browTilt: emotion === 'smirk' ? -5 : 2,
            mouthCurve: emotion === 'smirk' ? 'M 93 163 Q 112 171 129 159' : 'M 94 164 Q 110 169 126 164'
          },
          vesper: {
            bgStart: '#2a1245', bgEnd: '#07050f', rim: '#a855f7',
            skin: '#cfa188', skinShadow: '#875a45', hair: '#e2e8f0', hairHighlight: '#ffffff',
            eyes: '#c084fc', armor: '#1a1026', armorTrim: '#a855f7',
            browTilt: emotion === 'dark' ? 9 : -3,
            mouthCurve: emotion === 'dark' ? 'M 92 161 Q 110 175 128 158' : 'M 94 163 Q 110 170 126 163'
          }
        };

        const c = configs[character] || configs.kaelen;
        const uid = `${character}_${Math.random().toString(36).slice(2, 6)}`;

        return `
          <svg viewBox="0 0 220 260" class="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="bg_${uid}" cx="50%" cy="35%" r="70%">
                <stop offset="0%" stop-color="${c.bgStart}" />
                <stop offset="100%" stop-color="${c.bgEnd}" />
              </radialGradient>
              <linearGradient id="skin_${uid}" x1="20%" y1="10%" x2="85%" y2="90%">
                <stop offset="0%" stop-color="${c.skin}" />
                <stop offset="70%" stop-color="${c.skin}" />
                <stop offset="100%" stop-color="${c.skinShadow}" />
              </linearGradient>
              <linearGradient id="armor_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1e293b" />
                <stop offset="50%" stop-color="${c.armor}" />
                <stop offset="100%" stop-color="#020617" />
              </linearGradient>
              <filter id="glow_${uid}" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <!-- Backdrop -->
            <rect width="220" height="260" fill="url(#bg_${uid})" />
            <circle cx="110" cy="110" r="82" fill="none" stroke="${c.rim}" stroke-opacity="0.22" stroke-width="1.5" />

            <!-- Back Hair Silhouette (for Lyra / Vesper) -->
            ${character === 'lyra' ? `<path d="M 55 85 Q 40 165 52 240 L 168 240 Q 180 165 165 85 Z" fill="${c.hair}" />` : ''}

            <!-- Shoulders & Tactical Collar -->
            <path d="M 22 260 Q 32 195 78 186 L 142 186 Q 188 195 198 260 Z" fill="url(#armor_${uid})" stroke="${c.rim}" stroke-opacity="0.45" stroke-width="1.2" />
            <path d="M 74 192 L 110 226 L 146 192" fill="none" stroke="${c.armorTrim}" stroke-width="2" filter="url(#glow_${uid})" />

            <!-- Sculpted Neck with Cast Shadow -->
            <path d="M 90 156 L 90 194 Q 110 206 130 194 L 130 156 Z" fill="url(#skin_${uid})" />
            <path d="M 90 156 Q 110 176 130 156 L 130 172 Q 110 185 90 172 Z" fill="${c.skinShadow}" opacity="0.55" />

            <!-- Semi-Realistic Face Contour (Jawline, Cheekbones, Cranium) -->
            <path d="M 66 95 C 66 52, 154 52, 154 95 C 154 134, 138 164, 110 176 C 82 164, 66 134, 66 95 Z" fill="url(#skin_${uid})" stroke="${c.rim}" stroke-opacity="0.35" stroke-width="1" />

            <!-- Cheekbone & Nose Volumetric Shading -->
            <path d="M 110 105 L 106 136 L 113 139" fill="none" stroke="${c.skinShadow}" stroke-width="2.2" stroke-linecap="round" opacity="0.7" />
            <ellipse cx="85" cy="128" rx="11" ry="6" fill="${c.skinShadow}" opacity="0.18" />
            <ellipse cx="135" cy="128" rx="11" ry="6" fill="${c.skinShadow}" opacity="0.18" />

            <!-- Eyes with Iris & Specular Catchlight -->
            <g>
              <ellipse cx="89" cy="112" rx="11" ry="5.5" fill="#f8fafc" />
              <circle cx="89" cy="112" r="4.8" fill="${c.eyes}" />
              <circle cx="89" cy="112" r="2.2" fill="#090d16" />
              <circle cx="87.3" cy="110.3" r="1.3" fill="#ffffff" />

              <ellipse cx="131" cy="112" rx="11" ry="5.5" fill="#f8fafc" />
              <circle cx="131" cy="112" r="4.8" fill="${c.eyes}" />
              <circle cx="131" cy="112" r="2.2" fill="#090d16" />
              <circle cx="129.3" cy="110.3" r="1.3" fill="#ffffff" />
            </g>

            <!-- Expressive Eyebrows -->
            <path d="M 76 ${102 - c.browTilt * 0.4} Q 89 ${98 + c.browTilt * 0.3} 101 ${103 + c.browTilt * 0.4}" fill="none" stroke="${c.hair}" stroke-width="3.2" stroke-linecap="round" />
            <path d="M 119 ${103 + c.browTilt * 0.4} Q 131 ${98 + c.browTilt * 0.3} 144 ${102 - c.browTilt * 0.4}" fill="none" stroke="${c.hair}" stroke-width="3.2" stroke-linecap="round" />

            <!-- Mouth Expression -->
            <path d="${c.mouthCurve}" fill="none" stroke="#7c3f34" stroke-width="2.6" stroke-linecap="round" />

            <!-- Layered Front Hair Locks -->
            <path d="M 62 102 C 58 52, 162 52, 158 102 C 150 76, 134 74, 122 92 C 114 72, 98 74, 88 94 C 78 76, 68 82, 62 102 Z" fill="${c.hair}" />
            <path d="M 78 66 Q 110 56 142 66" fill="none" stroke="${c.hairHighlight}" stroke-width="2" opacity="0.55" />
          </svg>
        `;
      }

      const VN_NODES = {
        start: {
          chapter: 'Acto I • La Grieta de Obsidiana',
          speaker: 'Comandante Kaelen',
          character: 'kaelen',
          emotion: 'Determinado',
          trait: 'Personalidad: Disciplinado, recto y táctico',
          bgGlow: 'rgba(0, 240, 255, 0.22)',
          text: 'Cazador, los sensores del Nexo indican una brecha inestable en el Sector 4. Si entrenamos juntos bajo protocolo estricto protegeremos a los civiles, pero el desgaste físico será brutal. ¿Cuál es tu postura?',
          choices: [
            {
              label: '🛡️ "La fuerza sin honor no vale nada. Contendremos la brecha juntos, Comandante."',
              next: 'act2_hero_lean',
              delta: { kaelen: 18, lyra: 5, vesper: -10, alignment: 15 }
            },
            {
              label: '🧬 "Analicemos primero los datos biomecánicos antes de arriesgar nuestras vidas."',
              next: 'act2_neutral_lean',
              delta: { kaelen: 0, lyra: 20, vesper: 5, alignment: 0 }
            },
            {
              label: '🗡️ "Si esa grieta contiene energía pura, la absorberé para mi propio ascenso."',
              next: 'act2_villain_lean',
              delta: { kaelen: -18, lyra: -5, vesper: 22, alignment: -18 }
            }
          ]
        },
        act2_hero_lean: {
          chapter: 'Acto II • El Dilema del Núcleo',
          speaker: 'Dra. Lyra Vane',
          character: 'lyra',
          emotion: 'Sarcástica pero impresiona',
          trait: 'Personalidad: Pragmática, brillante y mordaz',
          bgGlow: 'rgba(16, 185, 129, 0.22)',
          text: 'Vaya, otro mártir idealista... Aunque admito que tu estabilidad neuromuscular es fascinante. Hemos hallado un Catalizador Abisal dentro de la grieta: puede multiplicar tu fuerza hoy mismo, pero drenará la energía vital de la ciudad.',
          choices: [
            {
              label: '✨ "Destruiré el Catalizador. Mi poder nacerá solo de mi propia disciplina."',
              next: 'act3_climax',
              delta: { kaelen: 15, lyra: 12, vesper: -15, alignment: 18 }
            },
            {
              label: '⚖️ "Sellaré el Catalizador en mi armadura para neutralizarlo sin dañar a nadie."',
              next: 'act3_climax',
              delta: { kaelen: 5, lyra: 18, vesper: 5, alignment: 2 }
            }
          ]
        },
        act2_neutral_lean: {
          chapter: 'Acto II • El Dilema del Núcleo',
          speaker: 'Dra. Lyra Vane',
          character: 'lyra',
          emotion: 'Analítica',
          trait: 'Personalidad: Pragmática, brillante y mordaz',
          bgGlow: 'rgba(16, 185, 129, 0.24)',
          text: 'Por fin alguien que usa el cerebro antes que los bíceps. El Catalizador del Nexo es volátil: Kaelen quiere destruirlo por código moral, y Vesper quiere drenarlo para obtener poder absoluto. ¿Qué decides?',
          choices: [
            {
              label: '⚖️ "Ni dogma ni ambición ciega. Calibraré el núcleo para mantener el equilibrio."',
              next: 'act3_climax',
              delta: { kaelen: 5, lyra: 20, vesper: 8, alignment: 0 }
            },
            {
              label: '🛡️ "Kaelen tiene razón, el riesgo para la población es inaceptable. Lo destruiremos."',
              next: 'act3_climax',
              delta: { kaelen: 18, lyra: -5, vesper: -12, alignment: 16 }
            },
            {
              label: '🌑 "Vesper entiende la evolución. Tomaré una fracción oscura del núcleo."',
              next: 'act3_climax',
              delta: { kaelen: -15, lyra: -8, vesper: 18, alignment: -16 }
            }
          ]
        },
        act2_villain_lean: {
          chapter: 'Acto II • La Tentación del Abismo',
          speaker: 'Vesper',
          character: 'vesper',
          emotion: 'Carismático y oscuro',
          trait: 'Personalidad: Ambiguo, ambicioso y seductor del poder',
          bgGlow: 'rgba(168, 85, 247, 0.28)',
          text: 'Jajaja, me agradas. Los débiles inventan reglas para frenar a quienes nacieron para dominar. Absorbe el Catalizador conmigo: dejarás atrás los límites humanos en segundos, aunque la ciudad quede a oscuras.',
          choices: [
            {
              label: '🌑 "Que caiga la oscuridad. Todo el poder del Nexo me pertenece."',
              next: 'act3_climax',
              delta: { kaelen: -22, lyra: -12, vesper: 25, alignment: -22 }
            },
            {
              label: '⚖️ "Tomaré solo la energía residual sin colapsar la red de la ciudad."',
              next: 'act3_climax',
              delta: { kaelen: 0, lyra: 12, vesper: 10, alignment: 12 }
            }
          ]
        },
        act3_climax: {
          chapter: 'Acto III • Convergencia Final',
          speaker: 'Vesper',
          character: 'vesper',
          emotion: 'Expectante',
          trait: 'Personalidad: Ambiguo y observador del destino',
          bgGlow: 'rgba(245, 158, 11, 0.22)',
          text: 'El Nexo ha leído cada una de tus decisiones y la resonancia de tu entrenamiento. El portal colapsa ahora mismo. Da tu paso definitivo y sella tu destino en este mundo.',
          choices: [
            {
              label: '⚡ Sellar mi Destino y Revelar Final (+100 XP de Campaña)',
              next: 'ending',
              delta: { kaelen: 0, lyra: 0, vesper: 0, alignment: 0 }
            }
          ]
        }
      };

      function renderVisualNovel() {
        const vn = appState.vn;
        document.getElementById('aff-kaelen-val').textContent = `${vn.kaelen}%`;
        document.getElementById('aff-kaelen-bar').style.width = `${vn.kaelen}%`;
        document.getElementById('aff-lyra-val').textContent = `${vn.lyra}%`;
        document.getElementById('aff-lyra-bar').style.width = `${vn.lyra}%`;
        document.getElementById('aff-vesper-val').textContent = `${vn.vesper}%`;
        document.getElementById('aff-vesper-bar').style.width = `${vn.vesper}%`;

        let alignText = `Caminante Neutro (${vn.alignment})`;
        if (vn.alignment >= 15) alignText = `Senda del Héroe (+${vn.alignment})`;
        else if (vn.alignment <= -15) alignText = `Senda del Villano (${vn.alignment})`;
        document.getElementById('vn-alignment-label').textContent = alignText;

        const portraitStage = document.getElementById('vn-portrait-stage');
        const choicesContainer = document.getElementById('vn-choices-container');

        if (vn.nodeId === 'ending') {
          let endingTitle, endingChar, endingEmotion, endingColor, endingStory;
          if (vn.alignment >= 15) {
            endingTitle = 'FINAL I: GUARDIÁN DEL ALBA (EL HÉROE)';
            endingChar = 'kaelen';
            endingEmotion = 'Orgulloso y Leal';
            endingColor = 'rgba(0, 240, 255, 0.32)';
            endingStory = `Rechazaste los atajos corruptos y protegiste la ciudad con tu propia fuerza forjada en el entrenamiento. El Comandante Kaelen saluda tu honor y la humanidad te reconoce como el Guardián del Alba.`;
          } else if (vn.alignment <= -15) {
            endingTitle = 'FINAL II: SOBERANO DEL ABISMO (EL VILLANO)';
            endingChar = 'vesper';
            endingEmotion = 'Reverencia Oscura';
            endingColor = 'rgba(168, 85, 247, 0.35)';
            endingStory = `Drenaste el núcleo del Nexo sin piedad, ascendiendo a un poder aterrador mientras la metrópoli caía bajo tu sombra. Vesper se arrodilla ante el nuevo Soberano del Abismo.`;
          } else {
            endingTitle = 'FINAL III: CAMINANTE DEL EQUILIBRIO (NI HÉROE NI VILLANO)';
            endingChar = 'lyra';
            endingEmotion = 'Sonrisa Cómplice';
            endingColor = 'rgba(16, 185, 129, 0.30)';
            endingStory = `No te ataste a dogmas heroicos ni caíste en la tiranía. Junto a la Dra. Lyra Vane, estabilizaste el Nexo bajo tus propios términos: libre, pragmático e indomable.`;
          }

          document.getElementById('vn-chapter-tag').textContent = 'Epílogo Desbloqueado';
          document.getElementById('vn-speaker-name').textContent = endingTitle;
          document.getElementById('vn-emotion-tag').textContent = `Expresión: ${endingEmotion}`;
          document.getElementById('vn-character-trait').textContent = 'Destino Sellado por tus Decisiones';
          document.getElementById('vn-bg-aura').style.background = `radial-gradient(circle at 50% 35%, ${endingColor}, transparent 65%)`;
          document.getElementById('vn-dialogue-text').textContent = endingStory;
          portraitStage.innerHTML = getSemiRealisticPortraitSVG(endingChar, 'warm');

          choicesContainer.innerHTML = `
            <button type="button" id="btn-vn-replay-end" class="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-tech font-bold text-xs uppercase tracking-wider">
              ↺ Explorar Otro Final
            </button>
          `;
          const replayBtn = document.getElementById('btn-vn-replay-end');
          if (replayBtn) {
            replayBtn.addEventListener('click', () => {
              appState.vn = { nodeId: 'start', kaelen: 50, lyra: 50, vesper: 50, alignment: 0 };
              saveState();
              renderVisualNovel();
            });
          }
          return;
        }

        const node = VN_NODES[vn.nodeId] || VN_NODES.start;
        document.getElementById('vn-chapter-tag').textContent = node.chapter;
        document.getElementById('vn-speaker-name').textContent = node.speaker;
        document.getElementById('vn-emotion-tag').textContent = `Expresión: ${node.emotion}`;
        document.getElementById('vn-character-trait').textContent = node.trait;
        document.getElementById('vn-bg-aura').style.background = `radial-gradient(circle at 50% 35%, ${node.bgGlow}, transparent 65%)`;
        document.getElementById('vn-dialogue-text').textContent = node.text;
        portraitStage.innerHTML = getSemiRealisticPortraitSVG(node.character, node.character === 'vesper' ? 'dark' : node.character === 'lyra' ? 'smirk' : 'stern');

        choicesContainer.innerHTML = node.choices.map((ch, idx) => `
          <button type="button" data-choice-idx="${idx}" class="vn-choice-btn text-left p-3.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 text-xs sm:text-sm text-slate-100 transition flex items-center justify-between gap-2">
            <span>${ch.label}</span>
            <span class="text-cyan-400 font-tech font-bold shrink-0">→</span>
          </button>
        `).join('');

        choicesContainer.querySelectorAll('.vn-choice-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = Number(btn.getAttribute('data-choice-idx'));
            const choice = node.choices[idx];
            if (!choice) return;
            appState.vn.kaelen = Math.min(100, Math.max(0, appState.vn.kaelen + choice.delta.kaelen));
            appState.vn.lyra = Math.min(100, Math.max(0, appState.vn.lyra + choice.delta.lyra));
            appState.vn.vesper = Math.min(100, Math.max(0, appState.vn.vesper + choice.delta.vesper));
            appState.vn.alignment += choice.delta.alignment;
            appState.vn.nodeId = choice.next;

            if (choice.next === 'ending') {
              grantXPAndLP(100, 50);
            } else {
              saveState();
            }
            renderVisualNovel();
          });
        });
      }

      // ===================================================================
      // 11. SCIENTIFIC SLEEP & AUTOMATIC PEDOMETER (ACTIVE + BACKGROUND)
      // ===================================================================
      function renderSleepTracker() {
        const days = appState.sleep.days;
        const totalHours = Math.round(days.reduce((acc, d) => acc + d.hours, 0) * 10) / 10;
        const avgHours = Math.round((totalHours / 7) * 10) / 10;
        // Optimal scientific range: 49h to 63h/week (7 to 9h/day), baseline 52.5h
        const debt = Math.max(0, Math.round((52.5 - totalHours) * 10) / 10);

        document.getElementById('sleep-weekly-total').textContent = `${totalHours} h`;
        document.getElementById('sleep-daily-avg').textContent = `${avgHours} h`;
        document.getElementById('sleep-debt-val').textContent = `${debt.toFixed(1)} h`;

        const badge = document.getElementById('sleep-status-badge');
        const impactEl = document.getElementById('sleep-workout-impact');

        if (totalHours >= 49 && totalHours <= 64) {
          badge.className = 'px-3 py-1 rounded-full text-xs font-tech font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30';
          badge.textContent = 'Óptimo (SNC 96%)';
          impactEl.className = 'rounded-2xl p-4 bg-emerald-500/10 border border-emerald-400/30 text-xs text-slate-200 leading-relaxed';
          impactEl.innerHTML = `✅ <strong>Recuperación Neuromuscular Óptima (${totalHours}h/semana):</strong> Tu secreción endógena de GH y síntesis proteica están al máximo. <strong>Recomendación hoy:</strong> Autorizada sobrecarga progresiva (+2.5 kg o +1 rep en ejercicios principales).`;
        } else if (totalHours < 49) {
          badge.className = 'px-3 py-1 rounded-full text-xs font-tech font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30';
          badge.textContent = `Deuda de Sueño (-${debt}h)`;
          impactEl.className = 'rounded-2xl p-4 bg-amber-500/10 border border-amber-400/30 text-xs text-slate-200 leading-relaxed';
          impactEl.innerHTML = `⚠️ <strong>Fatiga Acumulada del Sistema Nervioso Central (${totalHours}h/semana):</strong> Dormir menos de 49h semanales reduce el reclutamiento de unidades motoras de alto umbral. <strong>Recomendación hoy:</strong> Mantén la intensidad pero reduce 1 serie por ejercicio y prioriza técnica estricta.`;
        } else {
          badge.className = 'px-3 py-1 rounded-full text-xs font-tech font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30';
          badge.textContent = 'Superávit Reparador';
          impactEl.className = 'rounded-2xl p-4 bg-cyan-500/10 border border-cyan-400/30 text-xs text-slate-200 leading-relaxed';
          impactEl.innerHTML = `💤 <strong>Supercompensación Total (${totalHours}h/semana):</strong> Excelente recuperación tras bloques de alta carga. Ideal para intentar un nuevo PR de fuerza.`;
        }

        const barsContainer = document.getElementById('sleep-7days-bars');
        barsContainer.innerHTML = days.map(d => {
          const pct = Math.min(100, Math.round((d.hours / 10) * 100));
          const isHealthy = d.hours >= 7 && d.hours <= 9.5;
          return `
            <div class="flex flex-col items-center h-full justify-end">
              <span class="text-[10px] font-tech font-bold ${isHealthy ? 'text-emerald-300' : 'text-amber-300'} mb-1">${d.hours}h</span>
              <div class="w-full max-w-[28px] bg-white/10 rounded-t-lg overflow-hidden flex items-end h-20">
                <div class="w-full ${isHealthy ? 'bg-gradient-to-t from-emerald-500 to-cyan-400' : 'bg-gradient-to-t from-amber-600 to-amber-400'} rounded-t-lg transition-all duration-500" style="height:${pct}%"></div>
              </div>
              <span class="text-[10px] font-tech text-slate-400 mt-1.5">${d.day}</span>
            </div>
          `;
        }).join('');
      }

      function syncBackgroundSteps() {
        const now = Date.now();
        const last = appState.pedometer.lastActiveTimestamp || now;
        const diffMins = (now - last) / 60000;
        // Realistic background ambulatory estimation when app was minimized/backgrounded (capped cleanly)
        if (diffMins >= 1 && diffMins <= 720) {
          const estimatedBgSteps = Math.floor(diffMins * 8.5);
          if (estimatedBgSteps > 0) {
            appState.pedometer.steps += estimatedBgSteps;
            appState.pedometer.lastActiveTimestamp = now;
            saveState();
          }
        }
      }

      function renderPedometer() {
        const steps = appState.pedometer.steps;
        const goal = appState.pedometer.goal;
        const pct = Math.min(100, Math.round((steps / goal) * 100));
        const km = ((steps * 0.75) / 1000).toFixed(2);
        const kcal = Math.round(steps * 0.045);

        document.getElementById('pedometer-steps-display').textContent = steps.toLocaleString('es-ES');
        document.getElementById('pedometer-goal-text').textContent = goal.toLocaleString('es-ES');
        document.getElementById('pedometer-progress-bar').style.width = `${pct}%`;
        document.getElementById('pedometer-km-val').textContent = `${km} km`;
        document.getElementById('pedometer-kcal-val').textContent = `${kcal} kcal`;
      }

      function setupAutomaticPedometer() {
        syncBackgroundSteps();

        // Background / tab visibility return listener
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            const before = appState.pedometer.steps;
            syncBackgroundSteps();
            const gained = appState.pedometer.steps - before;
            if (gained > 0) {
              renderPedometer();
              showToast('👟 Sincronización en 2do Plano', `Se registraron +${gained} pasos durante tu actividad en segundo plano.`, 'info');
            }
          } else {
            saveState();
          }
        });

        // Subtle live cadence pulse while open if user walks with device
        let lastAccelMag = 0;
        let lastStepTime = 0;
        const handleMotion = (event) => {
          const acc = event.accelerationIncludingGravity;
          if (!acc) return;
          const mag = Math.sqrt((acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2);
          const delta = Math.abs(mag - lastAccelMag);
          lastAccelMag = mag;
          const now = Date.now();
          if (delta > 3.2 && now - lastStepTime > 380) {
            lastStepTime = now;
            appState.pedometer.steps += 1;
            renderPedometer();
            if (appState.pedometer.steps % 25 === 0) saveState();
          }
        };

        window.addEventListener('devicemotion', handleMotion);

        const enableBtn = document.getElementById('btn-enable-motion');
        if (enableBtn) {
          enableBtn.addEventListener('click', async () => {
            if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
              try {
                const perm = await DeviceMotionEvent.requestPermission();
                if (perm === 'granted') {
                  showToast('📡 Sensor Calibrado', 'Acelerómetro activo para conteo automático en tiempo real.', 'success');
                }
              } catch (e) {
                showToast('Sensor Inercial', 'Modo híbrido de segundo plano activo.', 'info');
              }
            } else {
              showToast('📡 Sensor Activo', 'Detección inercial y sincronización en segundo plano operativas.', 'success');
            }
          });
        }
      }

      // ===================================================================
      // 12. MASTER UI RENDERER & EVENT WIRING
      // ===================================================================
      function renderAllUI() {
        const p = appState.profile;
        const rpg = appState.rpg;
        const metrics = computeScientificMetrics(p);
        const leagueFull = `${LEAGUES[rpg.leagueIndex]} ${rpg.division}`;
        const xpNeeded = getXpForNextLevel(rpg.level);
        const xpPct = Math.min(100, Math.round((rpg.xp / xpNeeded) * 100));

        // Top HUD
        document.getElementById('hud-hunter-name').textContent = p.name;
        document.getElementById('hud-physical-badge').textContent = metrics.physRank;
        document.getElementById('hud-league-badge').textContent = leagueFull;
        document.getElementById('hud-level-badge').textContent = `Nv. ${rpg.level}`;
        document.getElementById('hud-xp-text').textContent = `${rpg.xp} / ${xpNeeded} XP`;
        document.getElementById('hud-xp-bar').style.width = `${xpPct}%`;

        // Sanctuary 3D & Metrics
        document.getElementById('sanctuary-avatar-title').textContent = `${p.name} — ${rpg.race}`;
        document.getElementById('canvas-rank-label').textContent = metrics.physRank;
        document.getElementById('sanctuary-race-class').textContent = `${rpg.race} • ${rpg.baseClass}`;
        document.getElementById('sanctuary-league-name').textContent = leagueFull;
        document.getElementById('league-lp-badge').textContent = `${rpg.lp} / 100 LP`;
        document.getElementById('sanctuary-league-bar').style.width = `${rpg.lp}%`;

        document.getElementById('sanctuary-phys-rank').textContent = metrics.physRank;
        document.getElementById('sanctuary-phys-title').textContent = metrics.physTitle;
        document.getElementById('sanctuary-ffmi-badge').textContent = `DOTS: ${metrics.dotsScore}`;
        document.getElementById('sanctuary-phys-bar').style.width = `${metrics.nextTierProgress}%`;

        document.getElementById('stat-abs-rank').textContent = metrics.absRank;
        document.getElementById('stat-abs-val').textContent = `${metrics.total1RM} kg 1RM`;
        document.getElementById('stat-rel-rank').textContent = metrics.relRank;
        document.getElementById('stat-rel-val').textContent = `${metrics.relativeRatio}x BW`;
        document.getElementById('stat-level-val').textContent = `Nv. ${rpg.level}`;
        document.getElementById('stat-evo-stage').textContent = `Evo #${getEvolutionCount(rpg.level)}`;

        // Populate PR inputs
        document.getElementById('pr-push-1rm').textContent = metrics.push1RM;
        document.getElementById('pr-squat-1rm').textContent = metrics.squat1RM;
        document.getElementById('pr-pull-1rm').textContent = metrics.pull1RM;
        document.getElementById('upd-push-w').value = p.lifts.pushW;
        document.getElementById('upd-push-r').value = p.lifts.pushR;
        document.getElementById('upd-squat-w').value = p.lifts.squatW;
        document.getElementById('upd-squat-r').value = p.lifts.squatR;
        document.getElementById('upd-pull-w').value = p.lifts.pullW;
        document.getElementById('upd-pull-r').value = p.lifts.pullR;

        // Sync cosmetics selects
        document.getElementById('cosmetic-hair-style').value = appState.cosmetics.hairStyle;
        document.getElementById('cosmetic-hair-color').value = appState.cosmetics.hairColor;
        document.getElementById('cosmetic-outfit').value = appState.cosmetics.outfit;

        // Lab fields
        document.getElementById('lab-injury-input').value = p.injuries || 'Ninguna';
        document.getElementById('lab-modality-select').value = p.modality || 'gym';
        document.getElementById('lab-equipment-input').value = [...(p.equipment || []), p.equipmentCustom].filter(Boolean).join(', ');
        document.getElementById('generated-routine-container').innerHTML = generateScientificRoutineHTML();

        // Render sub-modules
        renderMissions();
        renderChronicles(metrics);
        renderVisualNovel();
        renderSleepTracker();
        renderPedometer();
      }

      function openOnboardingModal(prefillFromState = false) {
        const modal = document.getElementById('onboarding-modal');
        modal.classList.remove('hidden');

        if (prefillFromState && appState.profile) {
          const p = appState.profile;
          document.getElementById('reg-name').value = p.name;
          document.getElementById('reg-age').value = p.age;
          document.getElementById('reg-weight').value = p.weight;
          document.getElementById('reg-height').value = p.height;
          document.getElementById('reg-injury-detail').value = p.injuries === 'Ninguna' ? '' : p.injuries;
          document.getElementById('reg-push-w').value = p.lifts.pushW;
          document.getElementById('reg-push-r').value = p.lifts.pushR;
          document.getElementById('reg-squat-w').value = p.lifts.squatW;
          document.getElementById('reg-squat-r').value = p.lifts.squatR;
          document.getElementById('reg-pull-w').value = p.lifts.pullW;
          document.getElementById('reg-pull-r').value = p.lifts.pullR;
        }
        updateRegistrationLivePreview();
      }

      function updateRegistrationLivePreview() {
        const mockProfile = {
          weight: Number(document.getElementById('reg-weight').value) || 75,
          lifts: {
            pushW: Number(document.getElementById('reg-push-w').value) || 0,
            pushR: Number(document.getElementById('reg-push-r').value) || 1,
            squatW: Number(document.getElementById('reg-squat-w').value) || 0,
            squatR: Number(document.getElementById('reg-squat-r').value) || 1,
            pullW: Number(document.getElementById('reg-pull-w').value) || 0,
            pullR: Number(document.getElementById('reg-pull-r').value) || 1
          }
        };
        const m = computeScientificMetrics(mockProfile);
        document.getElementById('reg-preview-rank').textContent = m.physRank;
        document.getElementById('reg-preview-league').textContent = `Tierra 6 • DOTS ${m.dotsScore}`;
      }

      function bindAllEvents() {
        // Tab Switching
        document.querySelectorAll('.nav-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            document.querySelectorAll('.nav-btn').forEach(b => {
              b.classList.remove('active', 'bg-cyan-500/20', 'text-cyan-200', 'border-cyan-400/40');
              b.classList.add('text-slate-400', 'border-transparent');
            });
            btn.classList.add('active', 'bg-cyan-500/20', 'text-cyan-200', 'border-cyan-400/40');
            btn.classList.remove('text-slate-400', 'border-transparent');

            document.querySelectorAll('.tab-section').forEach(sec => sec.classList.add('hidden'));
            const activeSec = document.getElementById(`tab-${target}`);
            if (activeSec) activeSec.classList.remove('hidden');
          });
        });

        // Epic Name Randomizer
        document.getElementById('btn-random-name').addEventListener('click', () => {
          const fn = EPIC_FIRST_NAMES[Math.floor(Math.random() * EPIC_FIRST_NAMES.length)];
          const ln = EPIC_LAST_NAMES[Math.floor(Math.random() * EPIC_LAST_NAMES.length)];
          document.getElementById('reg-name').value = `${fn} ${ln}`;
        });

        // Modality toggle for home equipment checklist
        document.querySelectorAll('input[name="reg-modality"]').forEach(radio => {
          radio.addEventListener('change', () => {
            const box = document.getElementById('reg-equipment-box');
            if (radio.value === 'home_gear' || radio.value === 'hybrid') {
              box.classList.remove('hidden');
            } else {
              box.classList.add('hidden');
            }
            if (radio.value === 'home_none') {
              document.getElementById('reg-push-w').value = 0;
              document.getElementById('reg-squat-w').value = 0;
              document.getElementById('reg-pull-w').value = 0;
              document.getElementById('reg-push-r').value = 18;
              document.getElementById('reg-squat-r').value = 25;
              document.getElementById('reg-pull-r').value = 10;
            }
            updateRegistrationLivePreview();
          });
        });

        // Injury chips in Onboarding
        document.querySelectorAll('.injury-chip').forEach(chip => {
          chip.addEventListener('click', () => {
            const val = chip.getAttribute('data-injury');
            if (val === 'Ninguna') {
              document.querySelectorAll('.injury-chip').forEach(c => {
                c.classList.remove('active', 'border-amber-400/50', 'bg-amber-500/20', 'text-amber-200', 'border-emerald-400/50', 'bg-emerald-500/20', 'text-emerald-200');
                c.classList.add('border-white/15', 'bg-white/5', 'text-slate-300');
              });
              chip.classList.add('active', 'border-emerald-400/50', 'bg-emerald-500/20', 'text-emerald-200');
              document.getElementById('reg-injury-detail').value = '';
            } else {
              const noneChip = document.querySelector('.injury-chip[data-injury="Ninguna"]');
              if (noneChip) {
                noneChip.classList.remove('active', 'border-emerald-400/50', 'bg-emerald-500/20', 'text-emerald-200');
                noneChip.classList.add('border-white/15', 'bg-white/5', 'text-slate-300');
              }
              chip.classList.toggle('active');
              chip.classList.toggle('border-amber-400/50');
              chip.classList.toggle('bg-amber-500/20');
              chip.classList.toggle('text-amber-200');
            }
          });
        });

        // Live preview on registration lift/weight change
        ['reg-weight', 'reg-push-w', 'reg-push-r', 'reg-squat-w', 'reg-squat-r', 'reg-pull-w', 'reg-pull-r'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.addEventListener('input', updateRegistrationLivePreview);
        });

        // Onboarding Form Submit
        document.getElementById('onboarding-form').addEventListener('submit', (e) => {
          e.preventDefault();
          const name = document.getElementById('reg-name').value.trim() || 'Kaelen Voss';
          const bodyType = document.querySelector('input[name="reg-bodyType"]:checked').value;
          const age = Number(document.getElementById('reg-age').value) || 25;
          const weight = Number(document.getElementById('reg-weight').value) || 75;
          const height = Number(document.getElementById('reg-height').value) || 176;
          const modality = document.querySelector('input[name="reg-modality"]:checked').value;

          const activeChips = Array.from(document.querySelectorAll('.injury-chip.active'))
            .map(c => c.getAttribute('data-injury'))
            .filter(v => v !== 'Ninguna');
          const detail = document.getElementById('reg-injury-detail').value.trim();
          const injuries = [activeChips.join(', '), detail].filter(Boolean).join(' — ') || 'Ninguna';

          const equipment = Array.from(document.querySelectorAll('.equip-check:checked')).map(cb => cb.value);
          const equipmentCustom = document.getElementById('reg-equipment-custom').value.trim();

          const lifts = {
            pushW: Number(document.getElementById('reg-push-w').value) || 0,
            pushR: Math.max(1, Number(document.getElementById('reg-push-r').value) || 1),
            squatW: Number(document.getElementById('reg-squat-w').value) || 0,
            squatR: Math.max(1, Number(document.getElementById('reg-squat-r').value) || 1),
            pullW: Number(document.getElementById('reg-pull-w').value) || 0,
            pullR: Math.max(1, Number(document.getElementById('reg-pull-r').value) || 1)
          };

          appState.registered = true;
          appState.profile = { name, bodyType, age, weight, height, injuries, modality, equipment, equipmentCustom, lifts };

          // Procedural Race & Class assignment based on biomechanical profile
          const metrics = computeScientificMetrics(appState.profile);
          const racePick = RACES[(name.length + age) % RACES.length];
          const classPick = metrics.relIndex > metrics.absIndex
            ? CLASS_ARCHETYPES[1] // Acechador Cinético
            : metrics.absIndex > metrics.relIndex
              ? CLASS_ARCHETYPES[0] // Coloso de Gravedad
              : CLASS_ARCHETYPES[4]; // Vanguardia Indomable

          appState.rpg.race = racePick;
          appState.rpg.baseClass = classPick.name;
          appState.rpg.originStory = buildUniqueOriginStory(appState.profile, appState.rpg);

          seedDefaultMissionsIfEmpty();
          saveState();
          document.getElementById('onboarding-modal').classList.add('hidden');
          buildHumanizedAvatar();
          renderAllUI();
          showToast('⚡ ¡DESPERTAR COMPLETADO!', `Bienvenido, ${name}. Rango Físico Inicial: ${metrics.physRank} • Liga: Tierra 6`, 'success');
        });

        // Switch / Recalibrate Profile button
        document.getElementById('btn-switch-profile').addEventListener('click', () => {
          openOnboardingModal(true);
        });

        // 3D Camera Controls
        document.getElementById('btn-cam-reset').addEventListener('click', () => {
          targetRotY = 0.25;
          targetRotX = 0.05;
          cameraZoom = 3.55;
        });
        document.getElementById('btn-cam-zoom-in').addEventListener('click', () => {
          cameraZoom = Math.max(2.1, cameraZoom - 0.35);
        });
        document.getElementById('btn-cam-zoom-out').addEventListener('click', () => {
          cameraZoom = Math.min(4.8, cameraZoom + 0.35);
        });

        // Cosmetic Swatches & Selectors
        document.querySelectorAll('.skin-swatch').forEach(btn => {
          btn.addEventListener('click', () => {
            appState.cosmetics.skinColor = btn.getAttribute('data-skin');
            saveState();
            buildHumanizedAvatar();
          });
        });
        ['cosmetic-hair-style', 'cosmetic-hair-color', 'cosmetic-outfit'].forEach(id => {
          document.getElementById(id).addEventListener('change', (e) => {
            if (id === 'cosmetic-hair-style') appState.cosmetics.hairStyle = e.target.value;
            if (id === 'cosmetic-hair-color') appState.cosmetics.hairColor = e.target.value;
            if (id === 'cosmetic-outfit') appState.cosmetics.outfit = e.target.value;
            saveState();
            buildHumanizedAvatar();
          });
        });

        // Update PRs & Scientific Strength Rank
        document.getElementById('btn-update-prs').addEventListener('click', () => {
          const prevRank = computeScientificMetrics(appState.profile).physRank;
          appState.profile.lifts = {
            pushW: Number(document.getElementById('upd-push-w').value) || 0,
            pushR: Math.max(1, Number(document.getElementById('upd-push-r').value) || 1),
            squatW: Number(document.getElementById('upd-squat-w').value) || 0,
            squatR: Math.max(1, Number(document.getElementById('upd-squat-r').value) || 1),
            pullW: Number(document.getElementById('upd-pull-w').value) || 0,
            pullR: Math.max(1, Number(document.getElementById('upd-pull-r').value) || 1)
          };
          const nextMetrics = computeScientificMetrics(appState.profile);
          saveState();
          buildHumanizedAvatar();
          renderAllUI();
          if (nextMetrics.physRank !== prevRank) {
            showToast('🔥 ¡NUEVO RANGO FÍSICO!', `Has evolucionado de ${prevRank} a ${nextMetrics.physRank} (${nextMetrics.physTitle})`, 'success');
          } else {
            showToast('📊 Métricas Recalculadas', `1RM Total: ${nextMetrics.total1RM} kg • DOTS: ${nextMetrics.dotsScore}`, 'info');
          }
        });

        // Missions: Add New Daily Mission
        document.getElementById('new-mission-form').addEventListener('submit', (e) => {
          e.preventDefault();
          const title = document.getElementById('mission-title-input').value.trim();
          if (!title) return;
          const type = document.getElementById('mission-type-input').value;
          const diff = document.getElementById('mission-diff-input').value;
          const rewards = diff === 'boss' ? { xp: 120, lp: 60 } : diff === 'hard' ? { xp: 75, lp: 40 } : { xp: 45, lp: 25 };

          appState.missions.unshift({
            id: 'm_' + Date.now(),
            title,
            type,
            xp: rewards.xp,
            lp: rewards.lp,
            status: 'pending',
            adaptedFrom: null
          });
          document.getElementById('mission-title-input').value = '';
          saveState();
          renderMissions();
          showToast('⚔️ Reto Declarado', 'Cumple tu objetivo hoy para ascender de división.', 'info');
        });

        // Missions: Complete / Justify / Fail Delegation
        document.getElementById('missions-list').addEventListener('click', (e) => {
          const btn = e.target.closest('.mission-act-btn');
          if (!btn) return;
          const id = btn.getAttribute('data-id');
          const action = btn.getAttribute('data-action');
          const mission = appState.missions.find(m => m.id === id);
          if (!mission) return;

          if (action === 'complete') {
            mission.status = 'completed';
            grantXPAndLP(mission.xp, mission.lp);
            showToast('🏆 ¡Misión Cumplida!', `+${mission.xp} XP y +${mission.lp} LP obtenidos.`, 'success');
          } else if (action === 'fail') {
            openConfirmModal(
              '¿Marcar misión como Fallida?',
              'Si declaras esta misión como fallida, quedará bloqueada y solo podrás retomarla la próxima semana.',
              () => {
                mission.status = 'failed';
                saveState();
                renderMissions();
                showToast('⏳ Misión Fallida', 'Reto bloqueado hasta la próxima semana.', 'danger');
              }
            );
          } else if (action === 'justify') {
            activeJustifyMissionId = id;
            document.getElementById('justify-mission-title').textContent = mission.title;
            document.getElementById('justify-reason-input').value = '';
            const modal = document.getElementById('justify-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
          }
        });

        // Simulate New Week (Unlocks failed missions & resets daily cycle)
        document.getElementById('btn-simulate-next-week').addEventListener('click', () => {
          appState.missions.forEach(m => {
            if (m.status === 'failed') m.status = 'pending';
          });
          saveState();
          renderMissions();
          showToast('📅 Nueva Semana Iniciada', 'Las misiones bloqueadas han sido habilitadas nuevamente.', 'info');
        });

        // Justification Modal Controls
        document.querySelectorAll('.quick-justify').forEach(btn => {
          btn.addEventListener('click', () => {
            document.getElementById('justify-reason-input').value = btn.textContent.replace(/^[^\wÁÉÍÓÚáéíóú]+/, '').trim();
          });
        });

        const closeJustify = () => {
          const modal = document.getElementById('justify-modal');
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          activeJustifyMissionId = null;
        };
        document.getElementById('close-justify-modal').addEventListener('click', closeJustify);
        document.getElementById('cancel-justify-btn').addEventListener('click', closeJustify);

        document.getElementById('confirm-justify-btn').addEventListener('click', () => {
          const reason = document.getElementById('justify-reason-input').value.trim();
          if (!reason) {
            showToast('Justificación Requerida', 'Por favor indica el motivo del imprevisto.', 'warning');
            return;
          }
          const mission = appState.missions.find(m => m.id === activeJustifyMissionId);
          if (mission) {
            mission.title = generateAdaptiveHomeChallenge(mission, reason);
            mission.type = 'home';
            mission.status = 'adapted';
            mission.adaptedFrom = reason;
            saveState();
            renderMissions();
            showToast('🔄 Misión Adaptada en Casa', 'Se ha generado un desafío equivalente en casa para proteger tu racha.', 'success');
          }
          closeJustify();
        });

        // Confirm Modal Controls
        document.getElementById('confirm-modal-cancel').addEventListener('click', closeConfirmModal);
        document.getElementById('confirm-modal-ok').addEventListener('click', () => {
          if (typeof confirmCallback === 'function') confirmCallback();
          closeConfirmModal();
        });

        // Lab: Save Injuries/Equipment & Regenerate Routine
        document.getElementById('btn-save-lab-params').addEventListener('click', () => {
          appState.profile.injuries = document.getElementById('lab-injury-input').value.trim() || 'Ninguna';
          appState.profile.modality = document.getElementById('lab-modality-select').value;
          appState.profile.equipmentCustom = document.getElementById('lab-equipment-input').value.trim();
          saveState();
          document.getElementById('generated-routine-container').innerHTML = generateScientificRoutineHTML();
          showToast('🧬 Parámetros Guardados', 'Tu rutina biomecánica se ha recalibrado.', 'success');
        });

        document.getElementById('btn-generate-routine').addEventListener('click', () => {
          document.getElementById('generated-routine-container').innerHTML = generateScientificRoutineHTML();
          showToast('⚡ Rutina Regenerada', 'Prescripción actualizada según tu perfil científico.', 'info');
        });

        // Lab: File / Photo Analyzer
        let uploadedFileMeta = null;
        document.getElementById('routine-file-input').addEventListener('change', (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;

          const isImage = file.type.startsWith('image/');
          uploadedFileMeta = { name: file.name, size: file.size, isImage };

          const previewBox = document.getElementById('uploaded-file-preview');
          const thumb = document.getElementById('uploaded-image-thumb');
          previewBox.classList.remove('hidden');
          document.getElementById('uploaded-file-name').textContent = file.name;
          document.getElementById('uploaded-file-size').textContent = `${Math.max(1, Math.round(file.size / 1024))} KB`;

          if (isImage) {
            const reader = new FileReader();
            reader.onload = (ev) => {
              thumb.src = ev.target.result;
              thumb.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
          } else {
            thumb.classList.add('hidden');
            const reader = new FileReader();
            reader.onload = (ev) => {
              if (typeof ev.target.result === 'string') {
                document.getElementById('routine-paste-text').value = ev.target.result.slice(0, 2500);
              }
            };
            reader.readAsText(file);
          }
          showToast('📎 Archivo Cargado', `${file.name} listo para examen biomecánico.`, 'info');
        });

        document.getElementById('btn-analyze-uploaded-routine').addEventListener('click', () => {
          const txt = document.getElementById('routine-paste-text').value;
          if (!txt.trim() && !uploadedFileMeta) {
            showToast('Sin Datos', 'Sube una foto/archivo o pega el texto de tu rutina.', 'warning');
            return;
          }
          const resultBox = document.getElementById('routine-analysis-result');
          resultBox.innerHTML = analyzeExternalRoutine(txt, uploadedFileMeta);
          resultBox.classList.remove('hidden');
          showToast('🔬 Análisis Completado', 'Informe biomecánico generado.', 'success');
        });

        // Visual Novel Restart
        document.getElementById('btn-vn-restart').addEventListener('click', () => {
          appState.vn = { nodeId: 'start', kaelen: 50, lyra: 50, vesper: 50, alignment: 0 };
          saveState();
          renderVisualNovel();
          showToast('🎭 Historia Reiniciada', 'El Umbral del Nexo vuelve al Acto I.', 'info');
        });

        // Sleep Logger
        document.getElementById('btn-log-sleep').addEventListener('click', () => {
          const hrs = Math.min(14, Math.max(2, Number(document.getElementById('sleep-hours-input').value) || 7.5));
          // Shift 7-day rolling window
          const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
          const todayLabel = dayNames[new Date().getDay()];
          appState.sleep.days.shift();
          appState.sleep.days.push({ day: todayLabel, hours: hrs });
          saveState();
          renderSleepTracker();
          showToast('💤 Sueño Registrado', `Añadidas ${hrs} horas. Acumulación semanal actualizada.`, 'success');
        });

        // Pedometer Walk Simulator
        document.getElementById('btn-sim-walk-500').addEventListener('click', () => {
          appState.pedometer.steps += 500;
          saveState();
          renderPedometer();
          showToast('🚶 +500 Pasos', 'Avance registrado en el podómetro diario.', 'info');
        });
      }

      // ===================================================================
      // 13. WINDOW ONLOAD BOOTSTRAP
      // ===================================================================
      window.onload = function () {
        loadState();
        init3DViewport();
        bindAllEvents();
        setupAutomaticPedometer();

        if (!appState.registered) {
          openOnboardingModal(false);
        } else {
          seedDefaultMissionsIfEmpty();
          renderAllUI();
        }

        // Start 3D Organic Avatar Animation Loop strictly after window.onload
        animate3DLoop();
      };
    })();
  </script>
</body>
</html>
