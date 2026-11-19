import React, { useState, useEffect, useRef } from 'react';
import {
  Flame, Trophy, Dumbbell, Moon, Camera, Sparkles, Shield,
  CheckCircle2, XCircle, CloudRain, Zap, Lock, EyeOff,
  Upload, Scan, Cpu, FileText, AlertTriangle,
  ChevronRight, Sword, Clock, Save, Check,
  UserCheck, Users, MapPin, Play, BookOpen, Plus, Crosshair,
  LogIn, KeyRound, Mail, UserPlus, Settings, Trash2,
  Heart, Building2, Send, RotateCcw,
  Pause, Navigation, Activity,
  Footprints, MessageSquareText, Ban, ShieldAlert,
  Menu, X, Palette, Gem, Crown, Star, Award, Compass, Download,
  Box, Layers, Eye, ScrollText
} from 'lucide-react';
import { computeHunter3DDna, extractPhotoDnaFromDataUrl } from './utils/avatarDna';
import { Real3DHunterCanvas, VisualNovel3DPortrait } from './components/StylizedAvatars3D';

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
    --neon-primary-rgb: 0, 234, 255;
    --neon-secondary-rgb: 150, 60, 255;
    --neon-accent-rgb: 255, 212, 90;

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
    border: 1px solid rgba(var(--neon-primary-rgb), 0.32);
    box-shadow:
      0 10px 34px rgba(0, 0, 0, 0.82),
      inset 0 0 24px rgba(var(--neon-primary-rgb), 0.08);
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
      0 0 12px rgba(var(--neon-primary-rgb), 0.4),
      inset 0 0 25px rgba(var(--neon-primary-rgb), 0.1);
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
      0 0 20px rgba(var(--neon-accent-rgb), 0.65);
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
    box-shadow: 0 0 12px rgba(var(--neon-primary-rgb), 0.34);
    transition: 0.3s ease;
  }

  .rpg-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 25px rgba(var(--neon-primary-rgb), 0.68);
  }

  .rpg-button:active {
    transform: translateY(0) scale(0.97);
  }

  /* Efecto dorado legendario */
  .legendary {
    border: 2px solid var(--neon-gold);
    box-shadow:
      0 0 12px rgba(var(--neon-accent-rgb), 0.54),
      0 0 30px rgba(var(--neon-accent-rgb), 0.28),
      inset 0 0 24px rgba(var(--neon-secondary-rgb), 0.16);
  }

  /* Animación de energía */
  @keyframes energyPulse {
    0%, 100% {
      filter: brightness(1);
      box-shadow: 0 0 10px rgba(var(--neon-primary-rgb), 0.34);
    }

    50% {
      filter: brightness(1.16);
      box-shadow: 0 0 28px rgba(var(--neon-primary-rgb), 0.68), 0 0 18px rgba(var(--neon-secondary-rgb), 0.45);
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
      radial-gradient(circle at 15% 15%, rgba(var(--neon-primary-rgb), 0.16), transparent 42%),
      radial-gradient(circle at 85% 20%, rgba(var(--neon-secondary-rgb), 0.18), transparent 45%),
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
    box-shadow: 0 0 14px rgba(var(--neon-primary-rgb), 0.34);
  }

  .sys-btn-gold {
    background: linear-gradient(135deg, #92400e 0%, var(--neon-gold) 100%);
    color: #050817;
    box-shadow: 0 0 18px rgba(var(--neon-accent-rgb), 0.4);
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
    border: 1px solid rgba(var(--neon-primary-rgb), 0.32);
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
    box-shadow: 0 0 12px rgba(var(--neon-primary-rgb), 0.28);
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

  .hud-nav-steps-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 16px;
    align-items: stretch;
  }
  @media (min-width: 860px) {
    .hud-nav-steps-layout {
      grid-template-columns: 1.45fr 1fr;
    }
  }
  .hud-nav-steps-layout .nav-tabs {
    margin-bottom: 0;
  }

  .nav-tabs {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 7px;
    margin-bottom: 16px;
  }

  .nav-tab {
    background: rgba(11, 21, 48, 0.88);
    border: 1px solid rgba(var(--neon-primary-rgb), 0.22);
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
    background: linear-gradient(180deg, rgba(var(--neon-accent-rgb), 0.24) 0%, rgba(16, 27, 56, 0.96) 100%);
    border-color: var(--neon-gold);
    color: #fff;
    box-shadow: 0 0 16px rgba(var(--neon-accent-rgb), 0.34), inset 0 0 12px rgba(var(--neon-accent-rgb), 0.16);
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
    box-shadow: 0 0 24px rgba(var(--neon-accent-rgb), 0.4);
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

  /* ==========================================================================
     NUEVA INTERFAZ EQUILIBRADA (PANTALLA PRINCIPAL LIMPIA + MENÚ LATERAL)
     ========================================================================== */
  .pex-home-shell {
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .pex-topbar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 54px;
    padding: 4px 56px;
    margin-bottom: 4px;
  }

  .pex-menu-trigger {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 52px;
    height: 50px;
    border-radius: 12px;
    background: linear-gradient(160deg, rgba(16, 27, 56, 0.95), rgba(6, 11, 28, 0.98));
    border: 1.5px solid var(--neon-blue);
    box-shadow:
      0 0 14px rgba(var(--neon-primary-rgb), 0.35),
      inset 0 0 12px rgba(var(--neon-primary-rgb), 0.14);
    color: var(--text-main);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    z-index: 20;
  }

  .pex-menu-trigger:hover {
    transform: translateY(-50%) scale(1.04);
    box-shadow:
      0 0 22px rgba(var(--neon-primary-rgb), 0.6),
      inset 0 0 14px rgba(var(--neon-primary-rgb), 0.22);
  }

  .pex-menu-trigger span {
    font-family: 'Orbitron', sans-serif;
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--neon-blue);
  }

  .pex-drawer-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(3, 5, 14, 0.74);
    backdrop-filter: blur(8px);
    z-index: 900;
    animation: fadeInBackdrop 0.22s ease;
  }

  @keyframes fadeInBackdrop {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .pex-drawer-panel {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: min(315px, 85vw);
    background: linear-gradient(165deg, rgba(12, 20, 44, 0.98) 0%, rgba(5, 8, 22, 0.99) 100%);
    border-right: 1.5px solid rgba(var(--neon-primary-rgb), 0.45);
    box-shadow: 12px 0 40px rgba(0, 0, 0, 0.88), 0 0 24px rgba(var(--neon-primary-rgb), 0.2);
    z-index: 910;
    display: flex;
    flex-direction: column;
    padding: 18px 14px;
    overflow-y: auto;
    animation: slideInDrawer 0.24s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes slideInDrawer {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  .pex-drawer-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 11px 12px;
    border-radius: 12px;
    background: rgba(16, 27, 56, 0.55);
    border: 1px solid rgba(var(--neon-primary-rgb), 0.16);
    color: var(--text-main);
    font-family: 'Rajdhani', sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s ease;
    text-align: left;
  }

  .pex-drawer-item:hover {
    background: rgba(var(--neon-primary-rgb), 0.12);
    border-color: rgba(var(--neon-primary-rgb), 0.45);
    transform: translateX(3px);
  }

  .pex-drawer-item.active {
    background: linear-gradient(90deg, rgba(var(--neon-primary-rgb), 0.22), rgba(var(--neon-secondary-rgb), 0.16));
    border-color: var(--neon-blue);
    box-shadow: 0 0 14px rgba(var(--neon-primary-rgb), 0.25);
    color: #fff;
  }

  .pex-ornate-panel {
    position: relative;
    background: linear-gradient(165deg, rgba(15, 25, 52, 0.9) 0%, rgba(6, 10, 24, 0.95) 100%);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(var(--neon-primary-rgb), 0.34);
    border-radius: 18px;
    padding: 16px;
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.78),
      inset 0 0 24px rgba(var(--neon-primary-rgb), 0.07);
  }

  .pex-ornate-panel::before,
  .pex-ornate-panel::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-color: var(--neon-gold);
    border-style: solid;
    pointer-events: none;
    opacity: 0.85;
  }

  .pex-ornate-panel::before {
    top: 5px;
    left: 5px;
    border-width: 2px 0 0 2px;
    border-top-left-radius: 8px;
  }

  .pex-ornate-panel::after {
    top: 5px;
    right: 5px;
    border-width: 2px 2px 0 0;
    border-top-right-radius: 8px;
  }
  .pex-ornate-frame {
    position: relative;
    background: linear-gradient(160deg, rgba(13, 22, 48, 0.95) 0%, rgba(5, 8, 22, 0.98) 100%);
    border: 1.5px solid rgba(var(--neon-accent-rgb), 0.45);
    border-radius: 18px;
    box-shadow:
      0 14px 36px rgba(0, 0, 0, 0.85),
      inset 0 0 28px rgba(var(--neon-primary-rgb), 0.08);
    overflow: hidden;
  }
  .pex-tactical-card {
    background: linear-gradient(155deg, rgba(18, 30, 64, 0.96) 0%, rgba(7, 11, 28, 0.98) 100%);
    border: 1.5px solid rgba(var(--neon-primary-rgb), 0.42);
    border-radius: 14px;
    padding: 12px;
    text-align: left;
    color: var(--text-main);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  .pex-tactical-card:hover:not(:disabled) {
    transform: translateY(-4px);
    border-color: var(--neon-gold);
    box-shadow: 0 8px 22px rgba(var(--neon-accent-rgb), 0.3), inset 0 0 14px rgba(var(--neon-primary-rgb), 0.14);
  }
  .pex-tactical-card:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  @keyframes torchFlicker {
    0%, 100% { opacity: 0.75; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.14); }
  }
  .pex-torch-glow {
    animation: torchFlicker 2.1s ease-in-out infinite;
  }

  .pex-ribbon-badge {
    background: linear-gradient(90deg, rgba(8, 14, 34, 0.95) 0%, rgba(20, 32, 66, 0.96) 50%, rgba(8, 14, 34, 0.95) 100%);
    border: 1px solid rgba(var(--neon-primary-rgb), 0.48);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.75), inset 0 0 10px rgba(var(--neon-primary-rgb), 0.14);
    padding: 5px 18px;
    border-radius: 8px;
    text-align: center;
    position: relative;
  }

  .pex-equip-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 9px;
  }

  .pex-equip-slot {
    aspect-ratio: 1 / 1;
    border-radius: 12px;
    background: linear-gradient(145deg, rgba(16, 26, 52, 0.92), rgba(7, 11, 25, 0.98));
    border: 1.5px solid rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.75);
  }

  .pex-equip-slot:hover {
    transform: translateY(-2px) scale(1.04);
  }

  .pex-equip-slot.unlocked {
    border-color: var(--slot-border, var(--neon-blue));
    box-shadow:
      0 0 12px var(--slot-glow, rgba(var(--neon-primary-rgb), 0.35)),
      inset 0 0 12px var(--slot-inner, rgba(var(--neon-primary-rgb), 0.16));
  }

  .pex-equip-slot.selected {
    transform: scale(1.06);
    outline: 2px solid var(--neon-gold);
    outline-offset: 2px;
  }

  .pex-quest-checkbox {
    width: 22px;
    height: 22px;
    border-radius: 6px;
    border: 1.5px solid rgba(var(--neon-primary-rgb), 0.45);
    background: rgba(6, 11, 26, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  .pex-quest-checkbox.checked {
    border-color: var(--neon-blue);
    background: rgba(var(--neon-primary-rgb), 0.22);
    box-shadow: 0 0 10px rgba(var(--neon-primary-rgb), 0.45);
  }
  /* Animaciones y marco ornamental del Avatar Anime Fantasy RPG */
  @keyframes arcaneSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes arcaneCounterSpin {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  @keyframes avatarBreathe {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-4px) scale(1.012); }
  }
  @keyframes emberFloat {
    0%, 100% { transform: translateY(0px); opacity: 0.45; }
    50% { transform: translateY(-10px); opacity: 0.95; }
  }
  .pex-arcane-ring-cw {
    transform-origin: 210px 175px;
    animation: arcaneSpin 28s linear infinite;
  }
  .pex-arcane-ring-ccw {
    transform-origin: 210px 175px;
    animation: arcaneCounterSpin 20s linear infinite;
  }
  .pex-avatar-hero-float {
    animation: avatarBreathe 4.2s ease-in-out infinite;
  }
  .pex-ember-pulse {
    animation: emberFloat 3.4s ease-in-out infinite;
  }
  .pex-avatar-corner-tl,
  .pex-avatar-corner-tr,
  .pex-avatar-corner-bl,
  .pex-avatar-corner-br {
    position: absolute;
    width: 22px;
    height: 22px;
    border-color: var(--neon-gold);
    border-style: solid;
    pointer-events: none;
    z-index: 6;
    opacity: 0.9;
    filter: drop-shadow(0 0 6px rgba(var(--neon-accent-rgb), 0.55));
  }
  .pex-avatar-corner-tl {
    top: 8px;
    left: 8px;
    border-width: 2.5px 0 0 2.5px;
    border-top-left-radius: 10px;
  }
  .pex-avatar-corner-tr {
    top: 8px;
    right: 8px;
    border-width: 2.5px 2.5px 0 0;
    border-top-right-radius: 10px;
  }
  .pex-avatar-corner-bl {
    bottom: 24px;
    left: 8px;
    border-width: 0 0 2.5px 2.5px;
    border-bottom-left-radius: 10px;
  }
  .pex-avatar-corner-br {
    bottom: 24px;
    right: 8px;
    border-width: 0 2.5px 2.5px 0;
    border-bottom-right-radius: 10px;
  }
  @keyframes orbit3dSlow {
    from { transform: rotateX(72deg) rotateZ(0deg); }
    to { transform: rotateX(72deg) rotateZ(360deg); }
  }
  @keyframes orbit3dReverse {
    from { transform: rotateX(64deg) rotateY(18deg) rotateZ(360deg); }
    to { transform: rotateX(64deg) rotateY(18deg) rotateZ(0deg); }
  }
  .pex-3d-pedestal-cw {
    animation: orbit3dSlow 16s linear infinite;
  }
  .pex-3d-pedestal-ccw {
    animation: orbit3dReverse 12s linear infinite;
  }
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

function generateRandomInfiniteClass(seedNumber, preferredRaceId = null) {
  const arch = CLASS_ARCHETYPES[Math.abs(seedNumber) % CLASS_ARCHETYPES.length];
  const aff = CLASS_AFFINITIES[Math.abs(seedNumber * 7 + 13) % CLASS_AFFINITIES.length];
  const race =
    RACES_POOL.find((r) => r.id === preferredRaceId) ||
    RACES_POOL[Math.abs(seedNumber * 3 + 5) % RACES_POOL.length];
  const variantCode = (Math.abs(seedNumber * 19) % 999) + 1;
  return {
    race,
    cls: {
      name: `${arch.base} ${aff.name}`,
      baseArchetype: arch.base,
      affinityName: aff.name,
      weaponType: arch.weaponType,
      accentColor: aff.accent,
      variantCode,
      passiveName: `${arch.passiveTitle} (${aff.name})`,
      passiveDesc: `${arch.passiveRule} ${aff.resonance}`,
      desc: `Arquetipo ${arch.base} sincronizado con afinidad ${aff.name} (Linaje Único #${variantCode}).`
    }
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
    bossHp: 170,
    bossAtk: 24,
    lore: 'Con tu ciudadela recién fundada y Lyra y Kaelen a tu lado, aseguras el puente antiguo frente al coloso de hierro para abrir las rutas comerciales.',
    vnScenes: [
      { speaker: 'Lyra Ignis', role: 'Maestra Herrera Rúnica', accent: '#f97316', text: 'Si despejamos este puente, podré extraer mineral rúnico puro para templar tu equipo en la forja.' },
      { speaker: 'Centinela Oxidado de la Grieta', role: 'Guardián del Umbral', accent: '#f43f5e', text: '«INTRUSO DETECTADO. SOLO QUIEN DEMUESTRE VOLUNTAD DE ACERO CRUZARÁ EL UMBRAL.»' },
    ],
    vnChoices: [
      { label: '⚔️ Postura Ofensiva (+20% Daño de Cartas)', buffType: 'atk', value: 0.20 },
      { label: '🛡️ Guardia Rúnica (+55 Escudo Inicial)', buffType: 'shield', value: 55 },
      { label: '⚡ Concentración (+25 Recurso Inicial)', buffType: 'resource', value: 25 },
    ],
    rewardType: 'Habilidad Especial',
    rewardName: 'Voluntad de Hierro (+25 DEF)',
    expReward: 120,
    lpReward: 35,
  },
  {
    id: 'act1_ch2',
    order: 2,
    prevId: 'act1_ch1',
    act: 'Acto I: Las Ruinas de Ceniza',
    chapter: 'Capítulo 2 — El Bosque de los Ecos',
    reqPower: 150,
    enemy: 'Acechador Sombrío de Fenrir',
    bossHp: 270,
    bossAtk: 34,
    lore: 'Kaelen rastrea a la bestia alfa que amenaza las murallas exteriores de tu asentamiento bajo la niebla lunar.',
    vnScenes: [
      { speaker: 'Kaelen Vane', role: 'Explorador de las Sombras', accent: '#00eaff', text: 'La manada rodea el perímetro. Si abatimos al Acechador Alfa, el bosque quedará bajo nuestro control.' },
    ],
    vnChoices: [
      { label: '🐺 Emboscada con Kaelen (+25% Daño)', buffType: 'atk', value: 0.25 },
      { label: '🛡️ Manto de Niebla (+75 Escudo)', buffType: 'shield', value: 75 },
      { label: '⚡ Flujo Lunar (+30 Recurso)', buffType: 'resource', value: 30 },
    ],
    rewardType: 'Equipamiento de Historia',
    rewardName: 'Brazaletes del Lobo Plateado (+40 ATQ)',
    expReward: 180,
    lpReward: 45,
  },
  {
    id: 'act2_ch1',
    order: 3,
    prevId: 'act1_ch2',
    act: 'Acto II: La Ciudadela Carmesí',
    chapter: 'Capítulo 3 — La Guardia del Bastión',
    reqPower: 270,
    enemy: 'Comandante Valkiria Caída',
    bossHp: 390,
    bossAtk: 44,
    lore: 'Purifica la armadura maldita de Seraphina en un duelo honorable para reclutarla como comandante de tu guardia.',
    vnScenes: [
      { speaker: 'Seraphina Aurelia', role: 'Comandante de la Ciudadela', accent: '#fbbf24', text: '¡Cruza tu acero conmigo y rompe este sello maldito!' },
    ],
    vnChoices: [
      { label: '⚔️ Duelo Honorable (+25% Daño)', buffType: 'atk', value: 0.25 },
      { label: '🛡️ Égida del Bastión (+100 Escudo)', buffType: 'shield', value: 100 },
      { label: '⚡ Sobrecarga Vital (+35 Recurso)', buffType: 'resource', value: 35 },
    ],
    rewardType: 'Habilidad Especial',
    rewardName: 'Estocada Relámpago Carmesí (+55 ATQ)',
    unlockCharacterId: 'seraphina',
    expReward: 250,
    lpReward: 55,
  },
  {
    id: 'act2_ch2',
    order: 4,
    prevId: 'act2_ch1',
    act: 'Acto II: La Ciudadela Carmesí',
    chapter: 'Capítulo 4 — El Altar del Eclipse',
    reqPower: 400,
    enemy: 'Archidemonio Malakor',
    bossHp: 530,
    bossAtk: 56,
    lore: 'Rescata a Isolde Noctis de la biblioteca sellada del Eclipse y desbloquea los secretos astrales.',
    vnScenes: [
      { speaker: 'Isolde Noctis', role: 'Oráculo Astral', accent: '#c084fc', text: 'Las constelaciones convergieron esperando tu fuerza. ¡Sellemos a Malakor!' },
    ],
    vnChoices: [
      { label: '🔮 Sello Astral (+30% Daño)', buffType: 'atk', value: 0.30 },
      { label: '🛡️ Barrera Estelar (+130 Escudo)', buffType: 'shield', value: 130 },
      { label: '⚡ Convergencia Cósmica (+40 Recurso)', buffType: 'resource', value: 40 },
    ],
    rewardType: 'Reliquia Única',
    rewardName: 'Espadón Eclipse del Monarca (+85 ATQ)',
    unlockCharacterId: 'isolde',
    expReward: 340,
    lpReward: 70,
  },
  {
    id: 'act3_ch1',
    order: 5,
    prevId: 'act2_ch2',
    act: 'Acto III: Los Laboratorios de Sangre',
    chapter: 'Capítulo 5 — El Crisol Alquímico',
    reqPower: 550,
    enemy: 'Quimera de Acero Vivo',
    bossHp: 690,
    bossAtk: 68,
    lore: 'Vaelen Thorne solicita tu ayuda para contener un experimento alquímico descontrolado y unirse a tu consejo.',
    vnScenes: [
      { speaker: 'Vaelen Thorne', role: 'Alquimista Carmesí', accent: '#34d399', text: 'Mis tónicos potenciarán tu metabolismo si logras derribar su coraza.' },
    ],
    vnChoices: [
      { label: '🧪 Catalizador Ígneo (+30% Daño)', buffType: 'atk', value: 0.30 },
      { label: '🛡️ Piel de Mercurio (+155 Escudo)', buffType: 'shield', value: 155 },
      { label: '⚡ Elixir Neural (+45 Recurso)', buffType: 'resource', value: 45 },
    ],
    rewardType: 'Reliquia Alquímica',
    rewardName: 'Cáliz de Transmutación (+105 PODER)',
    unlockCharacterId: 'vaelen',
    expReward: 430,
    lpReward: 85,
  },
  {
    id: 'act3_ch2',
    order: 6,
    prevId: 'act3_ch1',
    act: 'Acto III: El Santuario Celestial',
    chapter: 'Capítulo 6 — Juicio de los Antiguos',
    reqPower: 720,
    enemy: 'Serafín de Acero Astral',
    bossHp: 860,
    bossAtk: 80,
    lore: 'Los guardianes celestiales evalúan si tu disciplina física merece la corona de Soberano.',
    vnScenes: [
      { speaker: 'Serafín de Acero Astral', role: 'Juez Celestial', accent: '#38bdf8', text: '«DEMUESTRA QUE TU VOLUNTAD ES MÁS PESADA QUE EL HIERRO.»' },
    ],
    vnChoices: [
      { label: '⚔️ Determinación Suprema (+32% Daño)', buffType: 'atk', value: 0.32 },
      { label: '🛡️ Armadura Celestial (+180 Escudo)', buffType: 'shield', value: 180 },
      { label: '⚡ Despertar Sin Límites (+45 Recurso)', buffType: 'resource', value: 45 },
    ],
    rewardType: 'Habilidad Suprema',
    rewardName: 'Juicio Astral de los Mil Filos (+135 ATQ)',
    expReward: 540,
    lpReward: 100,
  },
  {
    id: 'act4_ch1',
    order: 7,
    prevId: 'act3_ch2',
    act: 'Acto IV: Las Profundidades Abisales',
    chapter: 'Capítulo 7 — La Grieta del Silencio',
    reqPower: 920,
    enemy: 'Leviatán de Obsidiana',
    bossHp: 1060,
    bossAtk: 94,
    lore: 'En las profundidades abisales rescatas a Nyx Shadowweaver, maestra del sigilo dimensional.',
    vnScenes: [
      { speaker: 'Nyx Shadowweaver', role: 'Cazadora del Abismo', accent: '#a855f7', text: 'No mires directamente al núcleo del Leviatán; golpea cuando exponga sus escamas.' },
    ],
    vnChoices: [
      { label: '🗡️ Corte Dimensional (+35% Daño)', buffType: 'atk', value: 0.35 },
      { label: '🛡️ Velo de Sombras (+210 Escudo)', buffType: 'shield', value: 210 },
      { label: '⚡ Sifón Abisal (+50 Recurso)', buffType: 'resource', value: 50 },
    ],
    rewardType: 'Equipamiento Mítico',
    rewardName: 'Dagas Gemelas del Vacío (+160 ATQ)',
    unlockCharacterId: 'nyx',
    expReward: 680,
    lpReward: 120,
  },
  {
    id: 'act5_ch1',
    order: 8,
    prevId: 'act4_ch1',
    act: 'Acto V: La Guerra de los Monarcas',
    chapter: 'Capítulo 8 — El Bastión Glacial',
    reqPower: 1180,
    enemy: 'Titán de Escarcha Kronos',
    bossHp: 1320,
    bossAtk: 110,
    lore: 'Freya Frostborne sella una alianza eterna contigo tras liberar la fortaleza helada del norte.',
    vnScenes: [
      { speaker: 'Freya Frostborne', role: 'Guardiana Glacial', accent: '#38bdf8', text: 'El hielo eterno solo cede ante el fuego de un verdadero Monarca.' },
    ],
    vnChoices: [
      { label: '❄️ Furia Boreal (+38% Daño)', buffType: 'atk', value: 0.38 },
      { label: '🛡️ Muralla de Glaciar (+250 Escudo)', buffType: 'shield', value: 250 },
      { label: '⚡ Calma Absoluta (+55 Recurso)', buffType: 'resource', value: 55 },
    ],
    rewardType: 'Reliquia Glacial',
    rewardName: 'Corazón del Invierno Eterno (+190 PODER)',
    unlockCharacterId: 'freya',
    expReward: 850,
    lpReward: 145,
  },
  {
    id: 'act6_ch1',
    order: 9,
    prevId: 'act5_ch1',
    act: 'Acto VI: El Trono del Monarca Eterno',
    chapter: 'Capítulo 9 — Sombra del Monarca Primordial',
    reqPower: 1500,
    enemy: 'Sombra del Monarca Primordial (Jefe Final)',
    bossHp: 1680,
    bossAtk: 130,
    lore: 'Tu propio reflejo llevado al límite físico absoluto. Vencerlo sella tu leyenda en el Salón de los Inmortales.',
    vnScenes: [
      { speaker: 'Sombra del Monarca Primordial', role: 'Tu Reflejo Absoluto', accent: '#ffd45a', text: '«SOY CADA REPETICIÓN QUE NO HICISTE Y CADA LÍMITE QUE SUPERASTE. DEMUESTRA TU SOBERANÍA.»' },
    ],
    vnChoices: [
      { label: '👑 Voluntad del Monarca (+40% Daño)', buffType: 'atk', value: 0.40 },
      { label: '🛡️ Trono Inquebrantable (+300 Escudo)', buffType: 'shield', value: 300 },
      { label: '⚡ Trascendencia Total (+60 Recurso)', buffType: 'resource', value: 60 },
    ],
    rewardType: 'Título & Armadura Mítica',
    rewardName: 'Égida del Monarca Absoluto (+260 PODER)',
    expReward: 1200,
    lpReward: 200,
  },
];

const STORY_CHARACTERS = [
  {
    id: 'lyra',
    name: 'Lyra Ignis',
    role: 'Maestra Herrera Rúnica',
    unlockedByDefault: true,
    unlockChapter: 'act1_ch1',
    unlockLabel: 'Disponible desde Nivel 0',
    hairColor: '#e11d48',
    eyeColor: '#fbbf24',
    outfitColor: '#450a0a',
    trimColor: '#d4af37',
    glowColor: '#f97316',
    mapX: 115,
    mapY: 165,
    intro: '¡Bienvenido a tu ciudadela! La forja ya está encendida esperando tus próximas marcas de fuerza.',
  },
  {
    id: 'kaelen',
    name: 'Kaelen Vane',
    role: 'Explorador de las Sombras',
    unlockedByDefault: true,
    unlockChapter: 'act1_ch1',
    unlockLabel: 'Disponible desde Nivel 0',
    hairColor: '#94a3b8',
    eyeColor: '#00f0ff',
    outfitColor: '#0f172a',
    trimColor: '#38bdf8',
    glowColor: '#00eaff',
    mapX: 375,
    mapY: 155,
    intro: 'He asegurado el perímetro de la ciudad. Cuando quieras explorar las Ruinas o charlar, aquí me tienes.',
  },
  {
    id: 'seraphina',
    name: 'Seraphina Aurelia',
    role: 'Comandante Valkiria',
    unlockedByDefault: false,
    unlockChapter: 'act2_ch1',
    unlockLabel: 'Capítulo 3',
    hairColor: '#facc15',
    eyeColor: '#10b981',
    outfitColor: '#1e293b',
    trimColor: '#d4af37',
    glowColor: '#fde047',
    mapX: 250,
    mapY: 182,
    intro: 'Mi lanza protege tu bastión. Dime, Cazador... ¿superaste tus límites hoy?',
  },
  {
    id: 'isolde',
    name: 'Isolde Noctis',
    role: 'Oráculo Astral del Eclipse',
    unlockedByDefault: false,
    unlockChapter: 'act2_ch2',
    unlockLabel: 'Capítulo 4',
    hairColor: '#6d28d9',
    eyeColor: '#f59e0b',
    outfitColor: '#1e1b4b',
    trimColor: '#c084fc',
    glowColor: '#a855f7',
    mapX: 435,
    mapY: 175,
    intro: 'Las estrellas sobre nuestra ciudad brillan distinto desde que empezaste tu ascenso.',
  },
  {
    id: 'vaelen',
    name: 'Vaelen Thorne',
    role: 'Alquimista & Estratega Carmesí',
    unlockedByDefault: false,
    unlockChapter: 'act3_ch1',
    unlockLabel: 'Capítulo 5',
    hairColor: '#065f46',
    eyeColor: '#34d399',
    outfitColor: '#022c22',
    trimColor: '#fbbf24',
    glowColor: '#10b981',
    mapX: 185,
    mapY: 192,
    intro: 'Analicé tu recuperación muscular y tus horas de sueño. Con mis elixires llegarás aún más lejos.',
  },
  {
    id: 'nyx',
    name: 'Nyx Shadowweaver',
    role: 'Cazadora del Abismo',
    unlockedByDefault: false,
    unlockChapter: 'act4_ch1',
    unlockLabel: 'Capítulo 7',
    hairColor: '#312e81',
    eyeColor: '#e879f9',
    outfitColor: '#090d16',
    trimColor: '#a855f7',
    glowColor: '#c084fc',
    mapX: 315,
    mapY: 190,
    intro: 'Las sombras de esta ciudad son tranquilas gracias a tu disciplina.',
  },
  {
    id: 'freya',
    name: 'Freya Frostborne',
    role: 'Guardiana Glacial del Norte',
    unlockedByDefault: false,
    unlockChapter: 'act5_ch1',
    unlockLabel: 'Capítulo 8',
    hairColor: '#e0f2fe',
    eyeColor: '#38bdf8',
    outfitColor: '#0c4a6e',
    trimColor: '#bae6fd',
    glowColor: '#38bdf8',
    mapX: 475,
    mapY: 186,
    intro: 'El frío templa el cuerpo tanto como el hierro. Entrenemos juntos cuando estés listo.',
  },
];

const CITY_BUILDINGS_CATALOG = [
  { id: 'forge', name: 'Forja de Acero Real', bonus: '+15 Poder de Equipo y rumores sobre tu fuerza en Press Banca.' },
  { id: 'tavern', name: 'Taberna del Crepúsculo', bonus: 'Centro de rumores del pueblo y +3 Afinidad extra en citas.' },
  { id: 'dojo', name: 'Arena de Entrenamiento', bonus: '+20 Poder de Clase y entrenamiento conjunto con aliados.' },
  { id: 'observatory', name: 'Observatorio Astral', bonus: 'Amplifica tu Habilidad Pasiva Única de Clase.' },
  { id: 'garden', name: 'Jardín de los Juramentos', bonus: 'Santuario especial para citas románticas (+5 Afinidad).' },
  { id: 'infirmary', name: 'Enfermería Alquímica', bonus: 'Potencia los bonos de recuperación por sueño óptimo.' },
  { id: 'library', name: 'Biblioteca de Tácticas', bonus: '+15 EXP adicional al completar capítulos de Historia PvE.' },
  { id: 'citadel_wall', name: 'Muralla del Soberano', bonus: '+25 Defensa Base en duelos PvP y jefes de acto.' },
];

const RACES_POOL = [
  { id: 'monarch_vessel', name: 'Recipiente del Monarca', trait: 'Soberanía: Evolución ilimitada de estadísticas', hairColor: '#070a12', eyeColor: '#6366f1', auraColor: '#00eaff', originSeed: 'un relicario sellado bajo las ruinas antiguas donde dormía la corona sin heredero' },
  { id: 'ash_saiyan', name: 'Estirpe Guerrero Ceniza', trait: 'Zenkai: +15% EXP al superar misiones retomadas', hairColor: '#0b0f19', eyeColor: '#00f0ff', auraColor: '#f97316', originSeed: 'las fraguas volcánicas de la frontera, donde cada caída templa el espíritu como acero vivo' },
  { id: 'abyss_demon', name: 'Revenant Abisal Carmesí', trait: 'Pacto de Sangre: Bonificación en cargas máximas', hairColor: '#130714', eyeColor: '#fbbf24', auraColor: '#e11d48', originSeed: 'el umbral de la primera Grieta Carmesí, tras sobrevivir a una sobrecarga de mana abisal' },
  { id: 'valkyrie_dusk', name: 'Valkiria del Crepúsculo', trait: 'Égida Lunar: Recuperación muscular acelerada', hairColor: '#0f172a', eyeColor: '#6366f1', auraColor: '#c084fc', originSeed: 'los bastiones suspendidos entre el día y la noche, jurando proteger la última llama humana' },
  { id: 'fenrir_kin', name: 'Semi-Humano de Fenrir', trait: 'Instinto Depredador: Potencia explosiva y agilidad', hairColor: '#090d16', eyeColor: '#f59e0b', auraColor: '#38bdf8', originSeed: 'los bosques helados del norte, guiado por el pulso primitivo de la manada plateada' },
  { id: 'hollow_lord', name: 'Señor Espectral Celestial', trait: 'Cuerpo de Acero Pálido: Resistencia neural superior', hairColor: '#0c1220', eyeColor: '#38bdf8', auraColor: '#ffd45a', originSeed: 'el santuario silencioso de los obeliscos blancos, forjando una voluntad inquebrantable' },
];
function generateHunterOriginAndDestinyLore({
  hunterName,
  gender,
  race,
  cls,
  classEvolution,
  hunterGrade,
  gradeData,
  cityName,
  level,
  streak,
  completedChaptersCount
}) {
  const safeName = hunterName || 'CAZADOR_01';
  const isFemale = gender === 'female';
  const articleHero = isFemale ? 'la cazadora' : 'el cazador';
  const titleHero = isFemale ? 'portadora' : 'portador';
  const raceObj = race || RACES_POOL[0];
  const className = cls?.name || 'Centinela Infinito';
  const weaponLabelMap = {
    sword: 'una hoja rúnica equilibrada',
    greatsword: 'un mandoble colosal de hierro oscuro',
    spear: 'una lanza perforadora de runas',
    staff: 'un báculo arcano de resonancia',
    daggers: 'dos dagas gemelas del abismo',
    gauntlets: 'guanteletes de impacto cinético'
  };
  const weaponDesc = weaponLabelMap[cls?.weaponType] || 'un arma rúnica vinculada a su alma';
  const originSeed = raceObj.originSeed || 'las ruinas olvidadas del primer despertar';
  const originTitle = `Crónica del Despertar — Linaje ${raceObj.name}`;
  const originText =
    `Antes de alzar su nombre en ${cityName || 'Bastión de Ceniza'}, ${safeName} despertó en ${originSeed}. ` +
    `Allí, su sangre de ${raceObj.name} respondió al llamado del Sistema, manifestando la senda de ${className} ` +
    `y empuñando ${weaponDesc}. Partiendo estrictamente desde cero, ${articleHero} juró forjar cada punto de poder ` +
    `con disciplina real, transformando cada repetición, cada kilómetro recorrido y cada noche de recuperación en energía vital.`;
  const grade = hunterGrade || 'F';
  const isMyth = ['F', 'E', 'D'].includes(grade);
  const isLegend = ['C', 'B', 'A'].includes(grade);
  if (isMyth) {
    return {
      originTitle,
      originText,
      destinyTier: 'MITO',
      destinyBadge: `MITO FRAGMENTADO • GRADO ${grade}`,
      destinyAccent: '#38bdf8',
      destinyTitle: 'El Susurro del Iniciado sin Límites',
      destinyText:
        `En las tabernas y forjas de ${cityName || 'Bastión de Ceniza'} circula un mito antiguo sobre ${articleHero} de estirpe ${raceObj.name} ` +
        `que comenzó sin fuerza prestada y cuyo núcleo (${cls?.passiveName || 'Pasiva Única'}) aún está despertando. ` +
        `Dicen los viejos exploradores que cuando sus marcas de fuerza superen el umbral del Grado C, este rumor dejará de ser un mito ` +
        `para grabarse como leyenda viva. (Nivel ${level} • Racha actual: ${streak} días).`,
      tierStep: 1
    };
  }
  if (isLegend) {
    return {
      originTitle,
      originText,
      destinyTier: 'LEYENDA',
      destinyBadge: `LEYENDA EN ASCENSO • GRADO ${grade}`,
      destinyAccent: '#fbbf24',
      destinyTitle: `La Gesta de ${safeName}, ${classEvolution.title}`,
      destinyText:
        `Las crónicas de ${cityName || 'Bastión de Ceniza'} ya cantan las hazañas de ${safeName}, ${titleHero} del linaje ${raceObj.name}. ` +
        `Con marcas verificadas de ${gradeData?.bench1RM || 0} kg en Banca, ${gradeData?.squat1RM || 0} kg en Sentadilla y ` +
        `${gradeData?.deadlift1RM || 0} kg en Peso Muerto, su presencia impone respeto en toda la ciudadela. ` +
        `Habiendo superado ${completedChaptersCount || 0} capítulos de campaña, su leyenda crece hacia el umbral mítico del Grado S.`,
      tierStep: 2
    };
  }
  return {
    originTitle,
    originText,
    destinyTier: 'PROFECÍA',
    destinyBadge: `PROFECÍA CUMPLIDA • GRADO ${grade}`,
    destinyAccent: '#ff3e9d',
    destinyTitle: `El Augurio del Monarca Eterno (${classEvolution.title})`,
    destinyText:
      `Grabada en los obeliscos del Observatorio Astral, la profecía de los Antiguos anunciaba el ascenso de un Soberano de sangre ` +
      `${raceObj.name} capaz de trascender los límites humanos. Hoy ${safeName} encarna ese augurio absoluto en Grado ${grade}: ` +
      `su dominio de ${className} y su poder combativo convierten cada paso en un decreto celestial sobre ${cityName || 'Bastión de Ceniza'} y el Abismo.`,
    tierStep: 3
  };
}

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
  const rawLP = Math.max(0, Number(lp) || 0);
  const safeLP = Math.min(8999, rawLP);
  const totalDivisions = Math.floor(safeLP / 100);
  const rankIndex = Math.min(14, Math.floor(totalDivisions / 6));
  const divInRank = 6 - (totalDivisions % 6);
  const currentDivLP = rawLP >= 9000 ? 100 : safeLP % 100;
  const currentRank = RANKS[rankIndex];
  const rankStartLP = rankIndex * 600;
  const rankEndLP = rankStartLP + 599;
  const lpInCurrentRank = rawLP >= 9000 ? 600 : safeLP - rankStartLP;
  const rankProgressPct = Math.min(100, Math.round((lpInCurrentRank / 600) * 100));
  const isMaxChallenger = rankIndex === 14 && divInRank === 1 && rawLP >= 9000;
  const lpToNextLayer = isMaxChallenger ? 0 : 100 - (safeLP % 100);
  const nextLayerTargetLP = isMaxChallenger ? 9000 : safeLP + lpToNextLayer;
  const nextLayerLabel = isMaxChallenger
    ? 'Challenger • Capa 1 (Cúspide Máxima)'
    : divInRank > 1
    ? `${currentRank.name} • Capa ${divInRank - 1}`
    : rankIndex < 14
    ? `${RANKS[rankIndex + 1].name} • Capa 6`
    : 'Challenger • Capa 1 (Cúspide Máxima)';
  const nextRank = rankIndex < 14 ? RANKS[rankIndex + 1] : null;
  const nextRankRequiredLP = nextRank ? (rankIndex + 1) * 600 : 9000;
  const lpToNextRank = nextRank ? Math.max(0, nextRankRequiredLP - rawLP) : 0;
  const layers = [6, 5, 4, 3, 2, 1].map((layerNum) => {
    const layerOffset = 6 - layerNum;
    const minLP = rankStartLP + layerOffset * 100;
    const maxLP = minLP + 99;
    const isCompleted = rawLP > maxLP;
    const isCurrent = !isCompleted && rawLP >= minLP;
    const lpInLayer = isCompleted ? 100 : isCurrent ? currentDivLP : 0;
    const lpMissing = isCompleted ? 0 : isCurrent ? lpToNextLayer : minLP - rawLP;
    return {
      layerNum,
      title: layerNum === 6 ? 'Capa 6 (Acceso)' : layerNum === 1 ? 'Capa 1 (Cúspide)' : `Capa ${layerNum}`,
      minLP,
      maxLP,
      status: isCompleted ? 'completed' : isCurrent ? 'current' : 'locked',
      lpInLayer,
      lpMissing
    };
  });
  return {
    ...currentRank,
    rankIndex,
    division: divInRank,
    label: `${currentRank.name} • Capa ${divInRank}`,
    shortLabel: `${currentRank.name} ${divInRank}`,
    currentDivLP,
    totalLP: rawLP,
    rankStartLP,
    rankEndLP,
    lpInCurrentRank,
    rankProgressPct,
    lpToNextLayer,
    nextLayerTargetLP,
    nextLayerLabel,
    nextRank,
    nextRankRequiredLP,
    lpToNextRank,
    layers,
  };
}
function getClassResourceProfile(clsObj, level = 0) {
  const base = String(clsObj?.baseArchetype || clsObj?.name || '').toLowerCase();
  const aff = String(clsObj?.affinityName || '').toLowerCase();
  const isArcane =
    base.includes('monje') ||
    base.includes('invocador') ||
    base.includes('alquimista') ||
    base.includes('soberano') ||
    aff.includes('celestial') ||
    aff.includes('vacío') ||
    aff.includes('astral') ||
    aff.includes('espectral') ||
    aff.includes('eclipse');
  if (isArcane) {
    return {
      type: 'mana',
      name: 'Maná Arcano',
      shortName: 'MANÁ',
      color: '#38bdf8',
      glow: 'rgba(56, 189, 248, 0.45)',
      max: 100 + Math.min(60, level * 3),
      regenPerTurn: 28,
      archetypeLabel: 'Clase Mágica / Arcana',
      mechanicNote: 'Alta reserva mágica (+28 Maná/turno) y hechizos arcanos de gran impacto.'
    };
  }
  return {
    type: 'stamina',
    name: 'Energía / Estamina',
    shortName: 'ESTAMINA',
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.45)',
    max: 100,
    regenPerTurn: 38,
    archetypeLabel: 'Clase Física / Marcial',
    mechanicNote: 'Regeneración explosiva (+38 Estamina/turno) para encadenar múltiples golpes tácticos.'
  };
}
function buildHunterTacticalDeck({ clsObj, gradeData, hunterCombatPower, unlockedInventory = [], atkMultiplier = 1 }) {
  const mult = Math.max(0.5, Number(atkMultiplier) || 1);
  const benchDmg = Math.max(24, Math.round((22 + (gradeData?.bench1RM || 0) * 0.35 + hunterCombatPower * 0.14) * mult));
  const deadliftDmg = Math.max(38, Math.round((34 + (gradeData?.deadlift1RM || 0) * 0.32 + hunterCombatPower * 0.22) * mult));
  const squatShield = Math.max(26, Math.round(24 + (gradeData?.squat1RM || 0) * 0.36 + hunterCombatPower * 0.12));
  const ultimateDmg = Math.max(54, Math.round((48 + hunterCombatPower * 0.32) * mult));
  const baseCards = [
    {
      id: 'card_bench_strike',
      name: 'Tajo de Acero (Banca)',
      kind: 'Ataque',
      cost: 20,
      damage: benchDmg,
      shield: 0,
      heal: 0,
      resourceGain: 0,
      drainEnemyResource: 0,
      accent: '#f43f5e',
      desc: `Inflige ${benchDmg} daño físico escalado con tu Press Banca (${gradeData?.bench1RM || 0} kg).`
    },
    {
      id: 'card_squat_bastion',
      name: 'Muralla del Titán (Sentadilla)',
      kind: 'Defensa',
      cost: 20,
      damage: 0,
      shield: squatShield,
      heal: 8,
      resourceGain: 0,
      drainEnemyResource: 0,
      accent: '#00eaff',
      desc: `Otorga +${squatShield} Escudo y +8 HP escalado con Sentadilla (${gradeData?.squat1RM || 0} kg).`
    },
    {
      id: 'card_deadlift_crush',
      name: 'Impacto Sísmico (Peso Muerto)',
      kind: 'Pesado',
      cost: 35,
      damage: deadliftDmg,
      shield: 0,
      heal: 0,
      resourceGain: 0,
      drainEnemyResource: 12,
      accent: '#f97316',
      desc: `Inflige ${deadliftDmg} daño perforante y drena 12 pts de recurso rival.`
    },
    {
      id: 'card_focus_flow',
      name: 'Canalización Táctica',
      kind: 'Recurso',
      cost: 0,
      damage: 10,
      shield: 12,
      heal: 14,
      resourceGain: 30,
      drainEnemyResource: 0,
      accent: '#10b981',
      desc: 'Recupera +30 de recurso, +14 HP, +12 Escudo e inflige 10 daño.'
    },
    {
      id: 'card_class_ultimate',
      name: clsObj?.passiveName || 'Arte Definitivo de Clase',
      kind: 'Definitiva',
      cost: 50,
      damage: ultimateDmg,
      shield: Math.round(squatShield * 0.6),
      heal: 0,
      resourceGain: 0,
      drainEnemyResource: 15,
      accent: '#ffd45a',
      desc: `Desata ${ultimateDmg} daño de clase + ${Math.round(squatShield * 0.6)} Escudo.`
    }
  ];
  const relicCards = (unlockedInventory || []).slice(0, 3).map((item, idx) => {
    const relicDmg = Math.max(28, Math.round((24 + (item.power || 30) * 0.55) * mult));
    return {
      id: `card_relic_${item.id || idx}`,
      name: item.name,
      kind: item.type || 'Reliquia',
      cost: 25,
      damage: relicDmg,
      shield: Math.round((item.power || 20) * 0.35),
      heal: 0,
      resourceGain: 0,
      drainEnemyResource: 0,
      accent: '#a855f7',
      desc: `Carta de equipo: ${relicDmg} daño + ${Math.round((item.power || 20) * 0.35)} Escudo.`
    };
  });
  return [...baseCards, ...relicCards];
}
function drawTacticalHand(deck, count = 4) {
  const pool = [...deck];
  const hand = [];
  while (hand.length < count && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    hand.push({ ...pool[idx], instanceId: `${pool[idx].id}_${Date.now()}_${hand.length}_${Math.random()}` });
    pool.splice(idx, 1);
  }
  return hand;
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

function getPreciseDistanceKm(lat1, lon1, lat2, lon2) {
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
  return R * c;
}

function getLocalDateISO(dateObj = new Date()) {
  return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
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

async function fetchWithTimeout(url, options = {}, timeoutMs = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// (Los componentes estilizados 3D y cálculo de ADN se importan desde ./components/StylizedAvatars3D y ./utils/avatarDna)

function JrpgFantasyPortrait({
  hunterClass,
  hunterGrade,
  gradeData = {},
  level = 0,
  streak = 0,
  cityName = 'Bastión de Ceniza',
  completedChaptersCount = 0,
  profile = {},
  classEvolution,
  gender,
  onToggleGender,
  onUploadPhotoForAvatar,
  passiveClassBonus,
  unlockedInventory = [],
  neonTheme
}) {
  const race =
    hunterClass?.race ||
    RACES_POOL.find((r) => r.id === profile?.preferredRaceId) ||
    RACES_POOL[0];
  const cls = hunterClass?.cls || {
    name: 'Centinela Infinito',
    weaponType: 'sword',
    accentColor: '#00eaff',
    variantCode: 101,
    passiveName: 'Muralla Inquebrantable',
    passiveDesc: 'Reduce a la mitad el desgaste y otorga +40 de defensa base.'
  };
  const stage = classEvolution?.stage || 1;
  const isFemale = gender === 'female';
  const [showPassiveDetails, setShowPassiveDetails] = useState(false);
  const [loreSubTab, setLoreSubTab] = useState('origin');
  const activeDna = computeHunter3DDna({ profile, hunterClass, unlockedInventory, level, streak, neonTheme });
  const loreData = generateHunterOriginAndDestinyLore({
    hunterName: profile?.hunterName,
    gender,
    race,
    cls,
    classEvolution,
    hunterGrade,
    gradeData,
    cityName,
    level,
    streak,
    completedChaptersCount
  });
  return (
    <div className="cinematic-entry" style={{ position: 'relative', paddingBottom: '12px' }}>
      <div
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          background: 'radial-gradient(circle at 50% 42%, rgba(var(--neon-secondary-rgb), 0.28) 0%, rgba(var(--neon-primary-rgb), 0.14) 40%, rgba(5, 8, 23, 0.98) 80%)',
          border: '1.5px solid rgba(var(--neon-primary-rgb), 0.38)',
          boxShadow: '0 14px 36px rgba(0, 0, 0, 0.85), inset 0 0 36px rgba(var(--neon-secondary-rgb), 0.18)',
        }}
      >
        <div style={{ position: 'absolute', inset: '14px 24px 32px', border: '1px solid rgba(var(--neon-primary-rgb), 0.34)', borderRadius: '12px', pointerEvents: 'none', zIndex: 5 }} />
        <div className="pex-avatar-corner-tl" />
        <div className="pex-avatar-corner-tr" />
        <div className="pex-avatar-corner-bl" />
        <div className="pex-avatar-corner-br" />
        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 8, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ background: 'rgba(6, 11, 28, 0.9)', border: '1px solid rgba(var(--neon-accent-rgb), 0.55)', borderRadius: '999px', padding: '4px 10px', fontSize: '10px', fontFamily: 'Orbitron, sans-serif', fontWeight: 800, color: 'var(--neon-gold)' }}>
            GRADO {hunterGrade} • ETAPA {stage}
          </div>
          <div style={{ background: 'rgba(6, 11, 28, 0.88)', border: `1px solid ${race.auraColor || '#00eaff'}`, borderRadius: '999px', padding: '3px 9px', fontSize: '9.5px', fontWeight: 700, color: '#e2e8f0' }}>
            {race.name}
          </div>
        </div>
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 8, display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '64%' }}>
          {onUploadPhotoForAvatar && (
            <label
              style={{
                background: 'rgba(6, 11, 28, 0.9)', border: '1px solid rgba(16, 185, 129, 0.65)',
                color: '#6ee7b7', borderRadius: '999px', padding: '4px 8px', fontSize: '9.5px',
                fontFamily: 'Orbitron, sans-serif', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer'
              }}
              title="Adaptar colores y estilo del avatar 3D desde una foto"
            >
              <Camera size={11} /> FOTO 3D
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={onUploadPhotoForAvatar} />
            </label>
          )}
          <button
            type="button"
            onClick={onToggleGender}
            style={{
              background: 'rgba(6, 11, 28, 0.9)', border: '1px solid rgba(var(--neon-primary-rgb), 0.55)',
              color: 'var(--neon-blue)', borderRadius: '999px', padding: '4px 8px', fontSize: '9.5px',
              fontFamily: 'Orbitron, sans-serif', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer'
            }}
          >
            <UserCheck size={11} /> {isFemale ? 'FEM' : 'MASC'}
          </button>
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Real3DHunterCanvas
            profile={profile}
            hunterClass={hunterClass}
            unlockedInventory={unlockedInventory}
            level={level}
            streak={streak}
            stage={stage}
            hunterGrade={hunterGrade}
            neonTheme={neonTheme}
          />
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '105px', zIndex: 4, pointerEvents: 'none', background: 'linear-gradient(180deg, transparent 0%, rgba(5, 8, 23, 0.85) 60%, #050817 100%)' }} />
      </div>
      {/* CINTAS DE CLASE Y PASIVA ÚNICA */}
      <div
        onClick={() => setShowPassiveDetails((prev) => !prev)}
        style={{ position: 'relative', zIndex: 7, marginTop: '-34px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', cursor: 'pointer', padding: '0 12px' }}
      >
        <div className="pex-ribbon-badge" style={{ minWidth: '235px', maxWidth: '94%' }}>
          <span className="font-hud" style={{ fontSize: '11px', fontWeight: 800, color: 'var(--neon-gold)', letterSpacing: '0.09em' }}>
            CLASE: {classEvolution.title.toUpperCase()}
          </span>
        </div>
        <div className="pex-ribbon-badge" style={{ minWidth: '265px', maxWidth: '96%', borderColor: 'rgba(var(--neon-secondary-rgb), 0.55)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)' }}>
            <strong style={{ color: 'var(--neon-blue)' }}>PASIVA:</strong> {cls.passiveName}
          </span>
        </div>
        {showPassiveDetails && (
          <div style={{ marginTop: '6px', width: '100%', padding: '12px 14px', borderRadius: '12px', background: 'rgba(11, 21, 48, 0.95)', border: '1px solid rgba(var(--neon-primary-rgb), 0.35)', textAlign: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <div style={{ color: 'var(--neon-gold)', fontWeight: 700, marginBottom: '4px' }}>
              Bono Pasivo Activo: +{passiveClassBonus} PWR • {classEvolution.bonus}
            </div>
            <div>{cls.passiveDesc}</div>
          </div>
        )}
        {activeDna.photoAdapted && (
          <div
            style={{
              marginTop: '6px',
              width: '100%',
              padding: '8px 12px',
              borderRadius: '11px',
              background: 'rgba(6, 15, 34, 0.92)',
              border: '1px solid rgba(16, 185, 129, 0.42)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px',
              fontSize: '11px',
              color: '#cbd5e1',
              cursor: 'default',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span style={{ color: '#6ee7b7', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Camera size={12} /> Avatar sincronizado con tu foto {activeDna.silhouetteTag ? `(${activeDna.silhouetteTag})` : ''}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              {[
                { label: 'Piel', hex: activeDna.skinTone },
                { label: 'Pelo', hex: activeDna.hairColor },
                { label: 'Coraza', hex: activeDna.armorColor },
                { label: 'Aura', hex: activeDna.auraColor },
              ].map((sw) => (
                <span key={sw.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: sw.hex, border: '1px solid rgba(255,255,255,0.45)', display: 'inline-block' }} />
                  {sw.label}
                </span>
              ))}
            </span>
          </div>
        )}
      </div>
      {/* TARJETA DE HISTORIA DE ORIGEN Y PROFECÍA / LEYENDA / MITO EVOLUTIVO */}
      <div
        className="pex-ornate-panel"
        style={{ marginTop: '12px', padding: '14px', borderColor: loreData.destinyAccent }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
          <span className="sys-badge" style={{ background: 'rgba(5,8,23,0.9)', color: loreData.destinyAccent, border: `1px solid ${loreData.destinyAccent}` }}>
            <ScrollText size={12} /> {loreData.destinyBadge}
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              type="button"
              onClick={() => setLoreSubTab('origin')}
              style={{
                padding: '4px 10px', borderRadius: '8px', fontSize: '10px', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, cursor: 'pointer',
                background: loreSubTab === 'origin' ? 'rgba(0,234,255,0.22)' : 'rgba(5,8,23,0.8)',
                border: `1px solid ${loreSubTab === 'origin' ? '#00eaff' : 'rgba(148,163,184,0.3)'}`,
                color: loreSubTab === 'origin' ? '#fff' : '#94a3b8'
              }}
            >
              ORIGEN
            </button>
            <button
              type="button"
              onClick={() => setLoreSubTab('destiny')}
              style={{
                padding: '4px 10px', borderRadius: '8px', fontSize: '10px', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, cursor: 'pointer',
                background: loreSubTab === 'destiny' ? 'rgba(255,212,90,0.22)' : 'rgba(5,8,23,0.8)',
                border: `1px solid ${loreSubTab === 'destiny' ? '#ffd45a' : 'rgba(148,163,184,0.3)'}`,
                color: loreSubTab === 'destiny' ? '#fde047' : '#94a3b8'
              }}
            >
              {loreData.destinyTier}
            </button>
          </div>
        </div>
        {loreSubTab === 'origin' ? (
          <div>
            <div className="font-souls" style={{ fontSize: '14px', fontWeight: 800, color: '#00eaff', marginBottom: '5px' }}>
              {loreData.originTitle}
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#e2e8f0' }}>
              {loreData.originText}
            </p>
            <div style={{ marginTop: '8px', fontSize: '11px', color: '#94a3b8' }}>
              Rasgo Racial Activo: <strong style={{ color: '#ffd45a' }}>{race.trait}</strong>
            </div>
          </div>
        ) : (
          <div>
            <div className="font-souls" style={{ fontSize: '14px', fontWeight: 800, color: loreData.destinyAccent, marginBottom: '5px' }}>
              {loreData.destinyTitle}
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#e2e8f0' }}>
              {loreData.destinyText}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginTop: '10px', textAlign: 'center' }}>
              {[
                { step: 1, label: 'MITO (F–D)', color: '#38bdf8' },
                { step: 2, label: 'LEYENDA (C–A)', color: '#fbbf24' },
                { step: 3, label: 'PROFECÍA (S–EX)', color: '#ff3e9d' }
              ].map((t) => {
                const active = loreData.tierStep >= t.step;
                return (
                  <div
                    key={t.step}
                    style={{
                      padding: '5px 4px', borderRadius: '7px', fontSize: '9.5px', fontWeight: 800,
                      background: active ? 'rgba(15,23,42,0.95)' : 'rgba(5,8,23,0.6)',
                      border: `1px solid ${active ? t.color : 'rgba(148,163,184,0.2)'}`,
                      color: active ? t.color : '#64748b'
                    }}
                  >
                    {active ? '✦ ' : ''}{t.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// (VisualNovel3DPortrait y VisualNovelAlly3DMesh importados desde ./components/StylizedAvatars3D)

// ============================================================================
// MAPA 2D INTERACTIVO DE LA CIUDAD
// ============================================================================
function City2DWorldMap({ cityName, builtBuildings, unlockedCharacters, selectedCharId, onSelectCharacter }) {
  const [selectedLandmark, setSelectedLandmark] = useState(null);
  const landmarksInfo = {
    hall: { title: 'Ayuntamiento del Soberano', detail: 'Sede central de gobierno, rango y gestión de tu ciudadela.' },
    forge: { title: 'Forja de Acero Real', detail: '+15 Poder de Equipo. Lyra templa armas rúnicas aquí.' },
    tavern: { title: 'Taberna del Crepúsculo', detail: '+3 Afinidad extra en citas y centro de rumores.' },
    dojo: { title: 'Arena Dojo de Entrenamiento', detail: '+20 Poder de Clase y prácticas de combate.' },
    observatory: { title: 'Observatorio Astral', detail: 'Amplifica tu Pasiva Única de Clase y lee las estrellas.' },
    garden: { title: 'Jardín de los Juramentos ♥', detail: 'Santuario floral iluminado para encuentros románticos.' },
  };
  return (
    <div
      className="pex-ornate-frame"
      style={{
        marginBottom: '14px',
        padding: '0',
      }}
    >
      <span className="pex-avatar-corner-tl" />
      <span className="pex-avatar-corner-tr" />
      <span className="pex-avatar-corner-bl" style={{ bottom: '8px' }} />
      <span className="pex-avatar-corner-br" style={{ bottom: '8px' }} />
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '14px',
        right: '14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 4,
        pointerEvents: 'none',
        flexWrap: 'wrap',
        gap: '6px'
      }}>
        <span className="sys-badge" style={{ background: 'rgba(5,8,23,0.9)', color: '#ffd45a', border: '1px solid rgba(255,212,90,0.65)', boxShadow: '0 0 12px rgba(255,212,90,0.25)' }}>
          ✦ CIUDADELA 2D • {cityName.toUpperCase()}
        </span>
        <span className="sys-badge" style={{ background: 'rgba(5,8,23,0.9)', color: '#00eaff', border: '1px solid rgba(0,234,255,0.65)' }}>
          ALIADOS EN PLAZA: {unlockedCharacters.length}/{STORY_CHARACTERS.length}
        </span>
      </div>
      <svg viewBox="0 0 540 250" width="100%" height="250" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="citySky2d" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#040714" />
            <stop offset="50%" stopColor="#12183b" />
            <stop offset="100%" stopColor="#261c4e" />
          </linearGradient>
          <radialGradient id="moonHalo2d" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd45a" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#963cff" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#040714" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ground2d" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f1f1c" />
            <stop offset="100%" stopColor="#070d14" />
          </linearGradient>
          <linearGradient id="road2d" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>
        <rect width="540" height="250" fill="url(#citySky2d)" />
        <circle cx="468" cy="48" r="46" fill="url(#moonHalo2d)" />
        <circle cx="468" cy="48" r="16" fill="#fef08a" opacity="0.88" />
        <circle cx="474" cy="44" r="14" fill="#12183b" />
        {[
          [48, 34, 1.6], [92, 52, 1.2], [148, 28, 1.8], [204, 46, 1.3],
          [320, 32, 1.7], [385, 55, 1.2], [512, 26, 1.5], [30, 72, 1.1]
        ].map(([sx, sy, sr], idx) => (
          <circle key={idx} cx={sx} cy={sy} r={sr} fill="#e0f2fe" opacity="0.8" />
        ))}
        <polyline points="148,28 204,46 248,30" fill="none" stroke="#00eaff" strokeWidth="0.6" strokeOpacity="0.3" strokeDasharray="3 3" />
        <polygon points="0,152 85,78 175,152" fill="#0b1124" />
        <polygon points="130,152 265,64 395,152" fill="#090e1f" />
        <polygon points="325,152 448,74 540,152" fill="#0b1124" />
        <rect x="0" y="140" width="540" height="12" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
        {Array.from({ length: 18 }, (_, i) => (
          <rect key={i} x={i * 30 + 4} y="135" width="16" height="6" fill="#334155" stroke="#ffd45a" strokeWidth="0.4" />
        ))}
        <rect x="0" y="150" width="540" height="100" fill="url(#ground2d)" />
        <rect x="0" y="176" width="540" height="30" fill="url(#road2d)" stroke="#475569" strokeWidth="1" />
        <line x1="0" y1="191" x2="540" y2="191" stroke="#00eaff" strokeWidth="1" strokeDasharray="8 10" strokeOpacity="0.45" />
        {[52, 195, 345, 505].map((lx, idx) => (
          <g key={idx}>
            <line x1={lx} y1="158" x2={lx} y2="177" stroke="#94a3b8" strokeWidth="2" />
            <circle cx={lx} cy="156" r="4" fill="#00eaff" className="pex-torch-glow" />
            <circle cx={lx} cy="156" r="10" fill="#00eaff" opacity="0.22" />
          </g>
        ))}
        <g style={{ cursor: 'pointer' }} onClick={() => setSelectedLandmark(landmarksInfo.hall)}>
          <rect x="230" y="96" width="80" height="56" rx="3" fill="#162038" stroke="#ffd45a" strokeWidth="2" />
          <polygon points="222,96 270,64 318,96" fill="#7f1d1d" stroke="#ffd45a" strokeWidth="1.6" />
          <polygon points="262,64 270,48 278,64" fill="#ffd45a" />
          <rect x="260" y="122" width="20" height="30" rx="2" fill="#050817" stroke="#ffd45a" strokeWidth="1" />
          <rect x="240" y="106" width="12" height="12" fill="#38bdf8" opacity="0.7" />
          <rect x="288" y="106" width="12" height="12" fill="#38bdf8" opacity="0.7" />
          <rect x="226" y="42" width="88" height="14" rx="4" fill="rgba(5,8,23,0.88)" stroke="#ffd45a" strokeWidth="0.8" />
          <text x="270" y="52" textAnchor="middle" fill="#ffd45a" fontSize="8" fontWeight="bold">AYUNTAMIENTO</text>
        </g>
        {builtBuildings.includes('forge') && (
          <g style={{ cursor: 'pointer' }} onClick={() => setSelectedLandmark(landmarksInfo.forge)}>
            <rect x="64" y="110" width="68" height="42" rx="3" fill="#292524" stroke="#f97316" strokeWidth="1.8" />
            <polygon points="58,110 98,86 138,110" fill="#9a3412" stroke="#fdba74" strokeWidth="1.2" />
            <rect x="114" y="76" width="10" height="22" fill="#44403c" />
            <circle cx="119" cy="70" r="5" fill="#fb923c" className="pex-torch-glow" />
            <text x="98" y="81" textAnchor="middle" fill="#fdba74" fontSize="8" fontWeight="bold">FORJA</text>
          </g>
        )}
        {builtBuildings.includes('tavern') && (
          <g style={{ cursor: 'pointer' }} onClick={() => setSelectedLandmark(landmarksInfo.tavern)}>
            <rect x="148" y="108" width="68" height="44" rx="3" fill="#3b2618" stroke="#fbbf24" strokeWidth="1.8" />
            <polygon points="142,108 182,84 222,108" fill="#92400e" stroke="#fde047" strokeWidth="1.2" />
            <circle cx="182" cy="124" r="6" fill="#fbbf24" opacity="0.85" />
            <text x="182" y="79" textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="bold">TABERNA</text>
          </g>
        )}
        {builtBuildings.includes('dojo') && (
          <g style={{ cursor: 'pointer' }} onClick={() => setSelectedLandmark(landmarksInfo.dojo)}>
            <rect x="324" y="110" width="72" height="42" rx="3" fill="#13263a" stroke="#00eaff" strokeWidth="1.8" />
            <polygon points="318,110 360,86 402,110" fill="#0369a1" stroke="#7dd3fc" strokeWidth="1.2" />
            <text x="360" y="81" textAnchor="middle" fill="#00eaff" fontSize="8" fontWeight="bold">ARENA DOJO</text>
          </g>
        )}
        {builtBuildings.includes('observatory') && (
          <g style={{ cursor: 'pointer' }} onClick={() => setSelectedLandmark(landmarksInfo.observatory)}>
            <rect x="410" y="98" width="46" height="54" rx="3" fill="#2e1065" stroke="#c084fc" strokeWidth="1.8" />
            <path d="M410 98 Q433 68 456 98 Z" fill="#6b21a8" stroke="#e9d5ff" strokeWidth="1.4" />
            <line x1="433" y1="74" x2="452" y2="52" stroke="#c084fc" strokeWidth="1.5" strokeOpacity="0.6" />
            <text x="433" y="64" textAnchor="middle" fill="#e9d5ff" fontSize="8" fontWeight="bold">OBSERVATORIO</text>
          </g>
        )}
        {builtBuildings.includes('garden') && (
          <g style={{ cursor: 'pointer' }} onClick={() => setSelectedLandmark(landmarksInfo.garden)}>
            <circle cx="490" cy="136" r="18" fill="#064e3b" stroke="#ff3e9d" strokeWidth="1.8" />
            <circle cx="485" cy="131" r="4" fill="#fda4af" />
            <circle cx="495" cy="134" r="3.5" fill="#f472b6" />
            <text x="490" y="113" textAnchor="middle" fill="#fda4af" fontSize="8" fontWeight="bold">JARDÍN ♥</text>
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
              <ellipse cx={char.mapX} cy={char.mapY + 24} rx="12" ry="4" fill="rgba(0,0,0,0.55)" />
              <circle cx={char.mapX} cy={char.mapY - 26} r="10" fill="#050817" stroke={isSelected ? '#ff3e9d' : '#ffd45a'} strokeWidth="1.6" />
              <text x={char.mapX} y={char.mapY - 23} textAnchor="middle" fill={isSelected ? '#ff3e9d' : '#ffd45a'} fontSize="8.5" fontWeight="bold">
                {isSelected ? '♥' : '!'}
              </text>
              <rect x={char.mapX - 9} y={char.mapY - 4} width="18" height="20" rx="5" fill={char.outfitColor} stroke={char.trimColor} strokeWidth="1.4" />
              <circle cx={char.mapX} cy={char.mapY - 11} r="7.5" fill="#ffedd5" />
              <path d={`M${char.mapX - 7.5} ${char.mapY - 12} Q${char.mapX} ${char.mapY - 21} ${char.mapX + 7.5} ${char.mapY - 12}`} fill={char.hairColor} />
              <rect x={char.mapX - 30} y={char.mapY + 18} width="60" height="14" rx="4" fill="rgba(5,8,23,0.92)" stroke={isSelected ? '#ff3e9d' : 'rgba(0,234,255,0.4)'} strokeWidth="0.8" />
              <text x={char.mapX} y={char.mapY + 27.5} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                {char.name.split(' ')[0]}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{
        padding: '9px 14px',
        background: 'rgba(5, 8, 23, 0.94)',
        borderTop: '1px solid rgba(255, 212, 90, 0.25)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '6px',
        fontSize: '12px'
      }}>
        <span style={{ color: '#cbd5e1' }}>
          {selectedLandmark
            ? <><strong style={{ color: '#ffd45a' }}>{selectedLandmark.title}:</strong> {selectedLandmark.detail}</>
            : 'Toca cualquier edificio o aliado en el mapa 2D para inspeccionarlo.'}
        </span>
        {selectedLandmark && (
          <button
            type="button"
            onClick={() => setSelectedLandmark(null)}
            style={{ background: 'transparent', border: 'none', color: '#00eaff', fontSize: '11px', cursor: 'pointer', fontWeight: 700 }}
          >
            Cerrar
          </button>
        )}
      </div>
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
  const [regPhotoPreview, setRegPhotoPreview] = useState(null);
  const [regPhotoDna, setRegPhotoDna] = useState(null);
  const [photoStatusMsg, setPhotoStatusMsg] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterPhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoStatusMsg('Analizando paleta y rasgos localmente...');
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const rawDataUrl = String(ev.target?.result || '');
      if (!rawDataUrl) return;
      try {
        const { photoDna, safePreviewUrl } = await extractPhotoDnaFromDataUrl(rawDataUrl, {
          gender: 'male',
          applyPrivacyVisor: true,
        });
        setRegPhotoDna(photoDna);
        setRegPhotoPreview(safePreviewUrl);
        setPhotoStatusMsg(`Avatar adaptado (${photoDna.silhouetteTag})`);
      } catch {
        setPhotoStatusMsg('No se pudo procesar esta imagen. Prueba otra foto.');
      }
    };
    reader.readAsDataURL(file);
  };

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
          initialPhotoDna: regPhotoDna || null,
          initialPhotoPreview: regPhotoPreview || null,
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
            <>
              <div>
                <label style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 700 }}>NOMBRE CLAVE DE CAZADOR</label>
                <input
                  className="sys-input"
                  placeholder="Ej: ORIGEN / AKIRA"
                  value={hunterTagInput}
                  onChange={(e) => setHunterTagInput(e.target.value)}
                />
              </div>

              <div
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px dashed rgba(0, 234, 255, 0.45)',
                  background: 'rgba(0, 234, 255, 0.05)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#00eaff', fontWeight: 700 }}>
                      FOTO PARA ADAPTAR TU AVATAR 3D (OPCIONAL)
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      Extrae piel, cabello, armadura y aura en tu dispositivo.
                    </div>
                  </div>
                  <label
                    className="sys-btn sys-btn-ghost"
                    style={{ padding: '7px 10px', fontSize: '10px', cursor: 'pointer' }}
                  >
                    <Camera size={13} color="#00eaff" /> {regPhotoPreview ? 'CAMBIAR FOTO' : 'SUBIR FOTO'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleRegisterPhotoSelect} />
                  </label>
                </div>

                {regPhotoPreview && regPhotoDna && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(148,163,184,0.2)' }}>
                    <img
                      src={regPhotoPreview}
                      alt="Vista previa de avatar"
                      style={{ width: '54px', height: '54px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #00eaff' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11px', color: '#6ee7b7', fontWeight: 700 }}>{photoStatusMsg}</div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px', fontSize: '10px', color: '#cbd5e1' }}>
                        {[
                          { k: 'Piel', hex: regPhotoDna.skinTone },
                          { k: 'Pelo', hex: regPhotoDna.hairColor },
                          { k: 'Coraza', hex: regPhotoDna.armorColor },
                          { k: 'Aura', hex: regPhotoDna.auraColor },
                        ].map((s) => (
                          <span key={s.k} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: s.hex, border: '1px solid #fff', display: 'inline-block' }} />
                            {s.k}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {!regPhotoPreview && photoStatusMsg && (
                  <div style={{ fontSize: '11px', color: '#fbbf24', marginTop: '6px' }}>{photoStatusMsg}</div>
                )}
              </div>
            </>
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

// ============================================================================
// EXPLORADOR SEMANAL DE RUTINAS — CALENDARIO, HISTORIAL Y MISIONES FIELES AL PLAN
// ============================================================================
function extractRoutineDaysFromText(rawText) {
  const lines = String(rawText || '').replace(/\r/g, '').split('\n').map((x) => x.trim()).filter(Boolean);
  if (!lines.length) return [];
  const groups = [];
  let current = null;
  const headingRe = /^(?:[-*#\s]*)?(?:d[ií]a|day)\s*(\d{1,2})\s*[-:.)–—]?\s*(.*)$/i;
  lines.forEach((line) => {
    const match = line.match(headingRe);
    if (match) {
      current = { id: `uploaded-day-${match[1]}`, name: `Día ${match[1]}${match[2] ? ` — ${match[2]}` : ''}`, focus: match[2] || 'Rutina importada', exercises: [] };
      groups.push(current);
      return;
    }
    if (!current) {
      current = { id: 'uploaded-day-1', name: 'Rutina importada', focus: 'Contenido del archivo', exercises: [] };
      groups.push(current);
    }
    if (/^(descanso|rest day|día libre)/i.test(line)) {
      current.isRest = true;
      current.focus = line;
      return;
    }
    if (/^(semana\s+\d+|mesociclo|fase\s+\d+)/i.test(line)) return;
    current.exercises.push({ name: line.replace(/^[-*•]\s*/, ''), prescription: '' });
  });
  return groups.filter((day) => day.isRest || day.exercises.length);
}

function RoutineDayExplorer({
  generatedDays, weeklyRoutinePlan, routineText, logs, setLogs, onCreateMission, onCompleteTodayTraining, scopeKey = 'routine'
}) {
  const todayISO = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();
  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const parsedDays = extractRoutineDaysFromText(routineText);
  const sourceDays = generatedDays?.length ? generatedDays : parsedDays;
  const weekData = weeklyRoutinePlan?.find((w) => Number(w.week) === Number(selectedWeek)) || weeklyRoutinePlan?.[0];
  const weekDays = weekData?.days?.length ? weekData.days : sourceDays;
  const dateObj = new Date(`${selectedDate}T12:00:00`);
  const mondayIndex = (dateObj.getDay() + 6) % 7;
  const defaultSessionIndex = mondayIndex < weekDays.length ? mondayIndex : -1;
  const dateKey = `${scopeKey}-${selectedDate}-w${selectedWeek}`;
  const dayLog = logs[dateKey] || {};
  const selectedSessionIndex = Number.isInteger(dayLog._sessionIndex) ? dayLog._sessionIndex : defaultSessionIndex;
  const selectedDay = selectedSessionIndex >= 0 ? (weekDays[selectedSessionIndex] || null) : null;
  const isToday = selectedDate === todayISO;
  const isPast = selectedDate < todayISO;
  const exercises = (selectedDay?.exercises || []).map((ex, idx) => ({
    ...ex,
    name: ex.name || `Ejercicio ${idx + 1}`,
    prescription: ex.weeklySets || `${ex.baseSets || ''} × ${ex.baseReps || ''} ${ex.focus || ''}`.trim()
  }));
  const completedCount = exercises.filter((_, idx) => dayLog[idx]?.completed).length;
  const progress = exercises.length ? Math.round((completedCount / exercises.length) * 100) : 0;
  const changeLog = (idx, patch) => setLogs((prev) => ({
    ...prev,
    [dateKey]: {
      ...(prev[dateKey] || {}),
      [idx]: { ...(prev[dateKey]?.[idx] || {}), ...patch }
    }
  }));
  const shiftDate = (amount) => {
    const next = new Date(`${selectedDate}T12:00:00`);
    next.setDate(next.getDate() + amount);
    setSelectedDate(`${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-${String(next.getDate()).padStart(2, '0')}`);
  };
  const weekStart = new Date(`${selectedDate}T12:00:00`);
  weekStart.setDate(weekStart.getDate() - mondayIndex);
  const weekLabels = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

  return (
    <div className="sys-window" style={{ padding: '16px', marginTop: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <h3 className="font-hud" style={{ color: '#00f0ff', fontSize: '13px' }}>AGENDA DE ENTRENAMIENTO — DÍA A DÍA</h3>
        <span className="sys-badge" style={{ background: 'rgba(0,240,255,.12)', color: '#67e8f9' }}>
          {isToday ? 'HOY' : isPast ? 'HISTORIAL' : 'PROGRAMADO'}
        </span>
      </div>
      <p style={{ color: '#94a3b8', fontSize: '11px', margin: '6px 0 12px' }}>
        Elegí cualquier fecha para consultar el plan, revisar lo registrado o anticipar una sesión. Los días de descanso se respetan.
      </p>
      {weeklyRoutinePlan?.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '10px', marginBottom: '4px' }}>SEMANA DEL MESOCICLO</label>
          <select className="sys-select" value={selectedWeek} onChange={(e) => setSelectedWeek(Number(e.target.value))}>
            {weeklyRoutinePlan.map((w) => <option key={w.week} value={w.week}>Semana {w.week} — {w.phase}</option>)}
          </select>
        </div>
      )}
      <div style={{ display: 'flex', gap: '7px', alignItems: 'center', marginBottom: '10px' }}>
        <button type="button" className="sys-btn sys-btn-ghost" onClick={() => shiftDate(-7)}>‹ Semana anterior</button>
        <input aria-label="Elegir fecha" type="date" className="sys-input" value={selectedDate} onChange={(e) => e.target.value && setSelectedDate(e.target.value)} />
        <button type="button" className="sys-btn sys-btn-ghost" onClick={() => shiftDate(7)}>Semana siguiente ›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: '5px', marginBottom: '14px' }}>
        {weekLabels.map((label, idx) => {
          const d = new Date(weekStart);
          d.setDate(weekStart.getDate() + idx);
          const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
          const active = iso === selectedDate;
          const stripKey = `${scopeKey}-${iso}-w${selectedWeek}`;
          const assignedIndex = Number.isInteger(logs[stripKey]?._sessionIndex) ? logs[stripKey]._sessionIndex : (idx < weekDays.length ? idx : -1);
          const hasTraining = assignedIndex >= 0 && !!weekDays[assignedIndex] && !weekDays[assignedIndex]?.isRest;
          return (
            <button key={label} type="button" onClick={() => setSelectedDate(iso)}
              style={{ padding: '8px 2px', borderRadius: '8px', border: `1px solid ${active ? '#fbbf24' : hasTraining ? 'rgba(0,240,255,.4)' : 'rgba(148,163,184,.2)'}`, background: active ? 'rgba(251,191,36,.18)' : 'rgba(4,6,12,.8)', color: active ? '#fde68a' : '#cbd5e1', cursor: 'pointer', minWidth: 0 }}>
              <div style={{ fontSize: '9px', fontWeight: 800 }}>{label}</div>
              <div style={{ fontSize: '13px', fontWeight: 800 }}>{d.getDate()}</div>
              <div style={{ fontSize: '8px', color: hasTraining ? '#67e8f9' : '#94a3b8' }}>{hasTraining ? 'ENTRENO' : 'DESC.'}</div>
            </button>
          );
        })}
      </div>
      <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(4,6,12,.85)', border: '1px solid rgba(0,240,255,.28)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: '#fbbf24', fontSize: '10px', fontWeight: 800 }}>{selectedDate} · {isToday ? 'DÍA ACTUAL' : isPast ? 'DÍA ANTERIOR' : 'DÍA FUTURO'}</div>
            <h4 style={{ color: '#fff', fontSize: '15px', marginTop: '3px' }}>{selectedDay?.name || (weekDays.length ? 'Día de recuperación' : 'Rutina todavía no disponible')}</h4>
            {selectedDay?.focus && <div style={{ color: '#94a3b8', fontSize: '11px' }}>{selectedDay.focus}</div>}
          </div>
          {exercises.length > 0 && <span className="sys-badge" style={{ color: '#6ee7b7', background: 'rgba(16,185,129,.12)' }}>{completedCount}/{exercises.length} EJERCICIOS</span>}
        </div>
        <div style={{ marginTop: '10px' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '10px', marginBottom: '4px' }}>SESIÓN ASIGNADA A ESTA FECHA</label>
          <select className="sys-select" value={selectedSessionIndex} onChange={(e) => setLogs((prev) => ({
            ...prev,
            [dateKey]: { ...(prev[dateKey] || {}), _sessionIndex: Number(e.target.value) }
          }))}>
            <option value={-1}>Descanso / sin sesión</option>
            {weekDays.map((day, idx) => <option key={`session-${idx}`} value={idx}>Día {idx + 1} — {day.name}</option>)}
          </select>
        </div>
        {exercises.length > 0 ? (
          <>
            <div className="progress-track" style={{ margin: '10px 0 12px' }}><div className="progress-fill" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#00eaff,#10b981)' }} /></div>
            {exercises.map((ex, idx) => {
              const entry = dayLog[idx] || {};
              return (
                <div key={`${dateKey}-${idx}`} style={{ padding: '10px 0', borderTop: '1px solid rgba(255,255,255,.07)' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <input type="checkbox" checked={!!entry.completed} onChange={(e) => changeLog(idx, { completed: e.target.checked })} aria-label={`Completar ${ex.name}`} style={{ marginTop: '4px', accentColor: '#10b981' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: entry.completed ? '#6ee7b7' : '#fff', fontWeight: 800, fontSize: '13px', textDecoration: entry.completed ? 'line-through' : 'none' }}>{ex.name}</div>
                      <div style={{ color: '#fbbf24', fontSize: '11px' }}>{ex.prescription || ex.focus || 'Prescripción según rutina original'}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '7px' }}>
                        <input className="sys-input" value={entry.weight ?? ''} onChange={(e) => changeLog(idx, { weight: e.target.value })} placeholder="Peso usado (kg)" />
                        <input className="sys-input" value={entry.reps ?? ''} onChange={(e) => changeLog(idx, { reps: e.target.value })} placeholder="Reps realizadas" />
                      </div>
                      <input className="sys-input" style={{ marginTop: '6px' }} value={entry.notes ?? ''} onChange={(e) => changeLog(idx, { notes: e.target.value })} placeholder="Notas: RIR, técnica, sensaciones..." />
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
              {onCompleteTodayTraining && (
                <button
                  type="button"
                  className="sys-btn sys-btn-success"
                  style={{ flex: 1 }}
                  onClick={onCompleteTodayTraining}
                >
                  <CheckCircle2 size={14} /> COMPLETAR &quot;ENTRENAR HOY&quot; (+100 EXP)
                </button>
              )}
              <button
                type="button"
                className="sys-btn sys-btn-gold"
                style={{ flex: 1 }}
                onClick={() => onCreateMission({
                  title: `Entrenamiento ${selectedDay.name} (${selectedDate})`,
                  date: selectedDate,
                  detail: exercises.map((x) => x.name).join(' · ')
                })}
              >
                <Sword size={14} /> CREAR MISIÓN CON ESTE ENTRENAMIENTO
              </button>
            </div>
          </>
        ) : (
          <div style={{ color: '#94a3b8', fontSize: '12px', padding: '12px 0' }}>
            {selectedDay?.isRest ? 'Día de descanso indicado por la rutina. No se agregan ejercicios ni desafíos físicos extra.' : weekDays.length ? 'Este día queda libre según la distribución semanal. Usalo para descanso y recuperación.' : 'Generá una rutina o cargá un archivo que contenga encabezados como “Día 1”, “Día 2”, etc. para habilitar el calendario.'}
          </div>
        )}
        <div style={{ color: '#64748b', fontSize: '10px', marginTop: '10px' }}>
          El registro se guarda por fecha y semana. Podés volver a días anteriores o abrir fechas futuras sin alterar el plan base.
        </div>
      </div>
    </div>
  );
}

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
// MÓDULO DE MOVIMIENTO & CARDIO GPS (PASOS, CARRERA Y BICICLETA)
// ============================================================================
function MovementTrackerModule({
  profile,
  activityLogs,
  setActivityLogs,
  tracker,
  onStartTracker,
  onPauseTracker,
  onDiscardTracker,
  onChangeMode,
  onAwardProgress,
}) {
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualMode, setManualMode] = useState('walk');
  const [manualSteps, setManualSteps] = useState('');
  const [manualKm, setManualKm] = useState('');
  const [manualMinutes, setManualMinutes] = useState('');

  const todayKey = getLocalDateISO();
  const todayData = activityLogs[todayKey] || {
    steps: 0,
    walkRunKm: 0,
    bikeKm: 0,
    calories: 0,
    sessions: [],
    stepGoalClaimed: false,
    bikeGoalClaimed: false,
  };

  const STEP_GOAL = 8000;
  const DISTANCE_GOAL_KM = 10;

  const totalTodayKm = Number(((todayData.walkRunKm || 0) + (todayData.bikeKm || 0)).toFixed(2));
  const stepProgressPct = Math.min(100, Math.round(((todayData.steps || 0) / STEP_GOAL) * 100));
  const distProgressPct = Math.min(100, Math.round((totalTodayKm / DISTANCE_GOAL_KM) * 100));

  const formatElapsed = (sec) => {
    const mins = Math.floor(sec / 60);
    const remSec = sec % 60;
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) {
      return `${hrs}:${String(mins % 60).padStart(2, '0')}:${String(remSec).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(remSec).padStart(2, '0')}`;
  };

  const estimateCalories = (mode, steps, km, elapsedSec) => {
    const weight = Number(profile.weightKg) || 75;
    const hours = Math.max(
      elapsedSec / 3600,
      km > 0 ? km / (mode === 'bike' ? 18 : mode === 'run' ? 9.5 : 5) : steps / 6500
    );
    const met = mode === 'bike' ? 7.5 : mode === 'run' ? 8.8 : 3.8;
    return Math.max(1, Math.round(met * weight * hours));
  };

  const commitActivityRecord = ({ mode, steps, distanceKm, elapsedSec, sourceLabel }) => {
    const cleanSteps = mode === 'bike' ? 0 : Math.max(0, Math.round(steps));
    const cleanKm = Math.max(0, Number(distanceKm.toFixed(2)));
    if (cleanSteps === 0 && cleanKm === 0) return;

    const kcal = estimateCalories(mode, cleanSteps, cleanKm, elapsedSec);
    const prevDay = activityLogs[todayKey] || {
      steps: 0,
      walkRunKm: 0,
      bikeKm: 0,
      calories: 0,
      sessions: [],
      stepGoalClaimed: false,
      bikeGoalClaimed: false,
    };

    const nextSteps = (prevDay.steps || 0) + cleanSteps;
    const nextWalkRunKm = Number(((prevDay.walkRunKm || 0) + (mode !== 'bike' ? cleanKm : 0)).toFixed(2));
    const nextBikeKm = Number(((prevDay.bikeKm || 0) + (mode === 'bike' ? cleanKm : 0)).toFixed(2));
    const nextTotalKm = Number((nextWalkRunKm + nextBikeKm).toFixed(2));

    const stepExp = Math.floor(cleanSteps / 1000) * 10;
    const stepLp = Math.floor(cleanSteps / 1000) * 5;
    const kmExp = Math.floor(cleanKm * 12);
    const kmLp = Math.floor(cleanKm * 6);

    let gainedExp = Math.max(5, mode === 'bike' ? kmExp : Math.max(stepExp, kmExp));
    let gainedLp = Math.max(3, mode === 'bike' ? kmLp : Math.max(stepLp, kmLp));

    let claimedStepBonus = Boolean(prevDay.stepGoalClaimed);
    let claimedDistBonus = Boolean(prevDay.bikeGoalClaimed);
    const bonusNotes = [];

    if (!claimedStepBonus && nextSteps >= STEP_GOAL) {
      claimedStepBonus = true;
      gainedExp += 40;
      gainedLp += 20;
      bonusNotes.push('Meta 8.000 pasos (+40 EXP / +20 LP)');
    }
    if (!claimedDistBonus && nextTotalKm >= DISTANCE_GOAL_KM) {
      claimedDistBonus = true;
      gainedExp += 50;
      gainedLp += 25;
      bonusNotes.push('Meta 10 km diarios (+50 EXP / +25 LP)');
    }

    const modeNames = { walk: 'Caminata', run: 'Carrera', bike: 'Bicicleta' };
    const newSession = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode,
      modeLabel: modeNames[mode] || 'Actividad',
      steps: cleanSteps,
      distanceKm: cleanKm,
      durationSec: elapsedSec,
      calories: kcal,
      source: sourceLabel,
      exp: gainedExp,
      lp: gainedLp,
    };

    setActivityLogs({
      ...activityLogs,
      [todayKey]: {
        steps: nextSteps,
        walkRunKm: nextWalkRunKm,
        bikeKm: nextBikeKm,
        calories: (prevDay.calories || 0) + kcal,
        sessions: [newSession, ...(prevDay.sessions || [])].slice(0, 25),
        stepGoalClaimed: claimedStepBonus,
        bikeGoalClaimed: claimedDistBonus,
      },
    });

    const summaryStr =
      mode === 'bike'
        ? `${cleanKm.toFixed(2)} km en bici`
        : `${cleanSteps.toLocaleString()} pasos (${cleanKm.toFixed(2)} km)`;

    onAwardProgress(
      gainedExp,
      gainedLp,
      `[MOVIMIENTO GUARDADO] ${summaryStr} • +${gainedExp} EXP y +${gainedLp} LP${bonusNotes.length ? ` • ¡${bonusNotes.join(' + ')}!` : ''}`
    );
  };

  const handleFinishLiveSession = () => {
    if (tracker.sessionSteps === 0 && tracker.sessionDistanceKm < 0.01) {
      onDiscardTracker('No se registró desplazamiento suficiente para guardar la sesión.');
      return;
    }
    commitActivityRecord({
      mode: tracker.mode,
      steps: tracker.sessionSteps,
      distanceKm: tracker.sessionDistanceKm,
      elapsedSec: tracker.elapsedSec,
      sourceLabel: tracker.hasAccelerometer ? 'GPS + Acelerómetro' : 'GPS Satelital',
    });
    onDiscardTracker(null);
  };

  const handleSaveManual = () => {
    const stepsVal = manualMode === 'bike' ? 0 : Math.max(0, Number(manualSteps) || 0);
    const heightM = (Number(profile.heightCm) || 176) / 100;
    const strideM = manualMode === 'run' ? heightM * 0.65 : heightM * 0.415;
    const rawKm = Math.max(0, Number(manualKm) || 0);
    const derivedKm = rawKm > 0 ? rawKm : Number(((stepsVal * strideM) / 1000).toFixed(2));
    const derivedSteps =
      manualMode === 'bike'
        ? 0
        : stepsVal > 0
        ? stepsVal
        : Math.round((derivedKm * 1000) / strideM);
    const mins = Math.max(1, Number(manualMinutes) || 15);

    if (derivedSteps === 0 && derivedKm === 0) return;

    commitActivityRecord({
      mode: manualMode,
      steps: derivedSteps,
      distanceKm: derivedKm,
      elapsedSec: mins * 60,
      sourceLabel: 'Registro Manual',
    });
    setManualSteps('');
    setManualKm('');
    setManualMinutes('');
    setShowManualForm(false);
  };

  const recentDates = Object.keys(activityLogs).sort().reverse().slice(0, 5);

  return (
    <div className="sys-window" style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="#00f0ff" />
          <h3 className="font-hud" style={{ fontSize: '13px', color: '#00f0ff' }}>
            RASTREADOR DE PASOS & GPS (A PIE / BICICLETA)
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span
            className="sys-badge"
            style={{
              background: tracker.isRunning ? 'rgba(16,185,129,0.2)' : 'rgba(148,163,184,0.14)',
              color: tracker.isRunning ? '#6ee7b7' : '#94a3b8',
              border: `1px solid ${tracker.isRunning ? '#10b981' : 'rgba(148,163,184,0.3)'}`,
            }}
          >
            {tracker.isRunning ? '● RASTREO ACTIVO' : tracker.elapsedSec > 0 ? '❚❚ EN PAUSA' : 'LISTO'}
          </span>
          {tracker.wakeLockActive && (
            <span className="sys-badge" style={{ background: 'rgba(251,191,36,0.15)', color: '#fde047', border: '1px solid #fbbf24' }}>
              PANTALLA ACTIVA
            </span>
          )}
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: '14px' }}>
        <div style={{ padding: '10px 12px', borderRadius: '12px', background: 'rgba(5,8,23,0.85)', border: '1px solid rgba(0,234,255,0.22)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span style={{ color: '#7dd3fc', fontWeight: 700 }}>
              PASOS HOY: {(todayData.steps || 0).toLocaleString()} / {STEP_GOAL.toLocaleString()}
            </span>
            <span style={{ color: todayData.stepGoalClaimed ? '#10b981' : '#fbbf24', fontWeight: 700 }}>
              {todayData.stepGoalClaimed ? '✓ META +40 EXP' : '+40 EXP / +20 LP'}
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${stepProgressPct}%`, background: 'linear-gradient(90deg, #0284c7, #00f0ff)' }} />
          </div>
        </div>

        <div style={{ padding: '10px 12px', borderRadius: '12px', background: 'rgba(5,8,23,0.85)', border: '1px solid rgba(255,212,90,0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span style={{ color: '#fde047', fontWeight: 700 }}>
              DISTANCIA HOY: {totalTodayKm.toFixed(2)} / {DISTANCE_GOAL_KM} KM
            </span>
            <span style={{ color: todayData.bikeGoalClaimed ? '#10b981' : '#fbbf24', fontWeight: 700 }}>
              {todayData.bikeGoalClaimed ? '✓ META +50 EXP' : '+50 EXP / +25 LP'}
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${distProgressPct}%`, background: 'linear-gradient(90deg, #b45309, #fbbf24)' }} />
          </div>
          <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>
            A pie: {(todayData.walkRunKm || 0).toFixed(2)} km • Bici: {(todayData.bikeKm || 0).toFixed(2)} km • ~{todayData.calories || 0} kcal
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
        {[
          { id: 'walk', label: 'Caminar', sub: 'Pasos + GPS' },
          { id: 'run', label: 'Correr', sub: 'Zancada + GPS' },
          { id: 'bike', label: 'Bicicleta', sub: 'Km GPS' },
        ].map((item) => {
          const selected = tracker.mode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              disabled={tracker.isRunning}
              onClick={() => onChangeMode(item.id)}
              style={{
                padding: '9px 6px',
                borderRadius: '10px',
                cursor: tracker.isRunning ? 'not-allowed' : 'pointer',
                background: selected
                  ? 'linear-gradient(135deg, rgba(0,234,255,0.22), rgba(16,27,56,0.96))'
                  : 'rgba(5,8,23,0.8)',
                border: `1px solid ${selected ? '#00f0ff' : 'rgba(170,185,213,0.22)'}`,
                color: selected ? '#fff' : '#94a3b8',
                opacity: tracker.isRunning && !selected ? 0.5 : 1,
                textAlign: 'center',
              }}
            >
              <div className="font-hud" style={{ fontSize: '11px', fontWeight: 700, color: selected ? '#00f0ff' : '#cbd5e1' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8' }}>{item.sub}</div>
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          padding: '12px',
          borderRadius: '12px',
          background: 'rgba(4,7,18,0.92)',
          border: '1px solid rgba(0,234,255,0.25)',
          marginBottom: '12px',
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>
            {tracker.mode === 'bike' ? 'VELOCIDAD' : 'PASOS SESIÓN'}
          </div>
          <div className="font-hud" style={{ fontSize: '20px', fontWeight: 900, color: '#00f0ff' }}>
            {tracker.mode === 'bike'
              ? `${tracker.speedKmh.toFixed(1)} km/h`
              : tracker.sessionSteps.toLocaleString()}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>DISTANCIA</div>
          <div className="font-hud" style={{ fontSize: '20px', fontWeight: 900, color: '#fbbf24' }}>
            {tracker.sessionDistanceKm.toFixed(2)} km
          </div>
        </div>

        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>TIEMPO</div>
          <div className="font-hud" style={{ fontSize: '20px', fontWeight: 900, color: '#f4f6ff' }}>
            {formatElapsed(tracker.elapsedSec)}
          </div>
        </div>
      </div>

      <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
        <span>
          <Navigation size={12} style={{ display: 'inline', marginRight: '4px', color: '#00f0ff' }} />
          GPS: <strong style={{ color: '#e2e8f0' }}>{tracker.gpsStatus}</strong>
        </span>
        <span>
          Sensor: <strong style={{ color: '#e2e8f0' }}>{tracker.hasAccelerometer ? 'Acelerómetro + GPS' : `Híbrido GPS (Altura ${profile.heightCm || 176} cm)`}</strong>
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {!tracker.isRunning ? (
          <button type="button" className="sys-btn sys-btn-primary" style={{ flex: 1 }} onClick={onStartTracker}>
            <Play size={15} /> {tracker.elapsedSec > 0 ? 'REANUDAR' : 'INICIAR'}
          </button>
        ) : (
          <button type="button" className="sys-btn sys-btn-gold" style={{ flex: 1 }} onClick={onPauseTracker}>
            <Pause size={15} /> PAUSAR
          </button>
        )}

        {(tracker.elapsedSec > 0 || tracker.sessionSteps > 0 || tracker.sessionDistanceKm > 0) && (
          <>
            <button type="button" className="sys-btn sys-btn-success" onClick={handleFinishLiveSession}>
              <CheckCircle2 size={15} /> GUARDAR SESIÓN
            </button>
            <button type="button" className="sys-btn sys-btn-danger" onClick={() => onDiscardTracker('Sesión descartada.')}>
              <RotateCcw size={15} />
            </button>
          </>
        )}

        <button type="button" className="sys-btn sys-btn-ghost" onClick={() => setShowManualForm(!showManualForm)}>
          <Plus size={15} /> MANUAL
        </button>
      </div>

      {showManualForm && (
        <div style={{ marginTop: '12px', padding: '12px', borderRadius: '12px', background: 'rgba(5,8,23,0.92)', border: '1px solid rgba(251,191,36,0.35)' }}>
          <div style={{ fontSize: '11px', color: '#fde047', fontWeight: 700, marginBottom: '8px' }}>
            CARGA MANUAL (CINTA DE CORRER, BICI FIJA O SIN GPS)
          </div>
          <div className="grid-2" style={{ marginBottom: '8px' }}>
            <select className="sys-select" value={manualMode} onChange={(e) => setManualMode(e.target.value)}>
              <option value="walk">Caminata (Pasos / Km)</option>
              <option value="run">Carrera / Trote (Pasos / Km)</option>
              <option value="bike">Bicicleta / Bici Fija (Km)</option>
            </select>
            <input
              type="number"
              className="sys-input"
              placeholder="Duración (minutos)"
              value={manualMinutes}
              onChange={(e) => setManualMinutes(e.target.value)}
            />
          </div>
          <div className="grid-2" style={{ marginBottom: '8px' }}>
            {manualMode !== 'bike' && (
              <input
                type="number"
                className="sys-input"
                placeholder="Pasos realizados (ej. 5000)"
                value={manualSteps}
                onChange={(e) => setManualSteps(e.target.value)}
              />
            )}
            <input
              type="number"
              step="0.1"
              className="sys-input"
              placeholder="Distancia en km (ej. 4.5)"
              value={manualKm}
              onChange={(e) => setManualKm(e.target.value)}
            />
          </div>
          <button type="button" className="sys-btn sys-btn-gold" style={{ width: '100%' }} onClick={handleSaveManual}>
            <Save size={15} /> REGISTRAR Y SUMAR EXP / LP
          </button>
        </div>
      )}

      {todayData.sessions?.length > 0 && (
        <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, marginBottom: '6px' }}>
            SESIONES DE HOY ({todayData.sessions.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {todayData.sessions.slice(0, 4).map((s) => (
              <div
                key={s.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  background: 'rgba(5,8,23,0.75)',
                }}
              >
                <span style={{ color: '#e2e8f0' }}>
                  <strong>{s.modeLabel}</strong> ({s.time}) •{' '}
                  {s.mode === 'bike'
                    ? `${s.distanceKm.toFixed(2)} km`
                    : `${s.steps.toLocaleString()} pasos (${s.distanceKm.toFixed(2)} km)`}
                </span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>
                  +{s.exp} EXP • +{s.lp} LP
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {recentDates.length > 1 && (
        <div style={{ marginTop: '8px', fontSize: '11px', color: '#94a3b8' }}>
          Días registrados: {recentDates.map((d) => `${d.slice(5)} (${(activityLogs[d]?.steps || 0).toLocaleString()} pasos / ${((activityLogs[d]?.walkRunKm || 0) + (activityLogs[d]?.bikeKm || 0)).toFixed(1)} km)`).join(' • ')}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// UTILIDADES DE RUTINA LIMPIA, JUSTIFICACIÓN LIBRE Y ANULACIÓN (CUPO 12/12)
// ============================================================================
const CANCELLATION_MAX_QUOTA = 12;

export function procesarRutinaImportada(textoRutina, misionesActuales = []) {
  const lineas = String(textoRutina || '')
    .replace(/\r/g, '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  // Ejercicios estructurados únicamente para la pestaña Rutina
  const ejerciciosParaTabRutina = lineas.map((linea, idx) => ({
    id: `ej-${Date.now()}-${idx}`,
    detalle: linea,
    completado: false,
  }));

  // En Misiones crea únicamente la misión diaria limpia "Entrenar hoy"
  const hoy = getLocalDateISO();
  const yaExisteMisionHoy = misionesActuales.some(
    (m) =>
      (m.isDaily || m.tipo === 'diaria') &&
      m.title === 'Entrenar hoy' &&
      (m.dailyDate === hoy || m.fecha === hoy)
  );

  const misionesActualizadas = yaExisteMisionHoy
    ? misionesActuales
    : [
        {
          id: `mision-entrenar-${hoy}`,
          title: 'Entrenar hoy',
          env: 'Rutina diaria',
          lp: 50,
          exp: 100,
          status: 'pending',
          isDaily: true,
          tipo: 'diaria',
          origin: 'daily',
          dailyDate: hoy,
        },
        ...misionesActuales.filter(
          (q) => !(q.isDaily && (q.title === 'Entrenar hoy' || q.env === 'Rutina diaria' || q.id === 1))
        ),
      ];

  return { ejerciciosParaTabRutina, misionesActualizadas };
}

export function generarConsejoTactico(motivoTexto, tituloMision = 'Entrenar hoy') {
  const clean = String(motivoTexto || '').trim();
  const texto = clean
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (!clean) {
    return {
      category: 'ESCRIBÍ TU MOTIVO',
      badgeColor: '#38bdf8',
      advice:
        'Describí libremente qué te impide cumplir hoy (poco tiempo, facultad/trabajo, cansancio, gimnasio cerrado, molestia física) para recibir una recomendación táctica.',
    };
  }
  if (/(tiempo|trabajo|laburo|facu|estudi|curs|parcial|examen|reunion|ocupad|tarde|hora)/.test(texto)) {
    return {
      category: 'FALTA DE TIEMPO / AGENDA',
      badgeColor: '#fbbf24',
      advice:
        'Protocolo Express: Reemplazá la sesión completa por un bloque de 20–25 minutos en superseries (ej. 3 series pesadas del ejercicio principal + 1 accesorio con 45s de descanso). Mantenés el estímulo neural sin sacrificar tu agenda y reprogramamos el resto en la Cola de Retoma.',
    };
  }
  if (/(cansad|fatig|sueno|dorm|agotad|energia|estres|exhaust)/.test(texto)) {
    return {
      category: 'DESCARGA TÁCTICA / FATIGA',
      badgeColor: '#a855f7',
      advice:
        'Descarga Táctica: Tu sistema nervioso necesita recuperación. Hoy priorizá 7.5 a 8 horas de sueño, hidratación con electrolitos y 15 minutos de movilidad suave. Retomá las cargas pesadas mañana al 100%.',
    };
  }
  if (/(gimnasio|gym|cerrado|feriado|lluvia|tormenta|transporte|colectivo|auto|tren|clima)/.test(texto)) {
    return {
      category: 'ADAPTACIÓN DE ENTORNO',
      badgeColor: '#00f0ff',
      advice:
        'Adaptación de Entorno: Ejecutá una sesión de mantenimiento en casa (4 rondas al fallo técnico de flexiones, sentadillas búlgaras con mochila cargada y plancha abdominal) para no cortar la racha diaria.',
    };
  }
  if (/(dolor|molestia|lesion|contractura|enferm|fiebre|gripe|malestar)/.test(texto)) {
    return {
      category: 'PROTOCOLO DE PRESERVACIÓN',
      badgeColor: '#f43f5e',
      advice:
        'Protocolo de Preservación: Frenar a tiempo evita semanas de inactividad. No fuerces la zona afectada; limitate a caminar suave si te sentís bien y reajustá los pesos un 10% al volver.',
    };
  }
  return {
    category: 'REPROGRAMACIÓN INTELIGENTE',
    badgeColor: '#10b981',
    advice: `Registro asimilado para "${tituloMision}". Dividí el objetivo pendiente en un micro-bloque de 15 minutos mañana a primera hora y sumalo a tu Cola de Retoma para recuperar el progreso sin perder consistencia.`,
  };
}

function normalizeQuestList(rawList) {
  if (!Array.isArray(rawList)) return [];
  return rawList.map((q, idx) => {
    const isDailyQuest =
      q.tipo === 'diaria' || (q.isDaily === true && q.tipo !== 'usuario' && q.tipo !== 'solicitada');
    const resolvedTipo = isDailyQuest
      ? 'diaria'
      : q.tipo === 'solicitada' || q.origin === 'solicitada'
      ? 'solicitada'
      : 'usuario';
    return {
      ...q,
      isDaily: isDailyQuest,
      tipo: resolvedTipo,
      origin: isDailyQuest ? 'daily' : resolvedTipo,
      createdAt: q.createdAt || Date.now() - idx * 1000,
    };
  });
}

function parseRoutineExercisesAndLoads(rawText) {
  const lines = String(rawText || '')
    .replace(/\r/g, '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  let currentDay = 'Bloque General';
  const items = [];
  const headerRegex =
    /^(d[ií]a\s*\d+|semana\s*\d+|lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bado|domingo|bloque|hoja:|upper|lower|push|pull|legs|full\s*body|torso|pierna)/i;
  const exerciseRegex =
    /(\d+\s*[x×]\s*\d+|series|reps|repeticiones|\d+(?:[.,]\d+)?\s*(?:kg|lbs?|%\s*1rm)|rir\s*\d+|rpe\s*\d+|press|sentadilla|peso muerto|remo|dominada|curl|extensi[oó]n|plancha|fondos|zancada|b[uú]lgara|elevaci[oó]n|jal[oó]n|prensa|hip\s*thrust|aperturas|face\s*pull)/i;

  lines.forEach((line, idx) => {
    const cleanLine = line.replace(/^[-•*\d.)]+\s*/, '').trim();
    if (!cleanLine) return;
    if (
      headerRegex.test(cleanLine) &&
      !/\d+\s*[x×]\s*\d+/i.test(cleanLine) &&
      !/\d+\s*(?:kg|lbs?)/i.test(cleanLine)
    ) {
      currentDay = cleanLine.replace(/^hoja:\s*/i, '').trim();
      return;
    }
    if (!exerciseRegex.test(cleanLine)) return;

    const setsRepsMatch = cleanLine.match(/(\d+\s*[x×]\s*\d+(?:\s*[-–]\s*\d+)?(?:\s*(?:reps?|seg|s))?)/i);
    const loadMatch = cleanLine.match(/(@?\s*\d+(?:[.,]\d+)?\s*(?:kg|lbs?|%\s*1rm))/i);
    const rirMatch = cleanLine.match(/(RIR\s*\d+(?:\s*[-–]\s*\d+)?|RPE\s*\d+(?:[.,]\d+)?)/i);

    let namePart = cleanLine;
    if (setsRepsMatch) namePart = namePart.replace(setsRepsMatch[0], ' ');
    if (loadMatch) namePart = namePart.replace(loadMatch[0], ' ');
    if (rirMatch) namePart = namePart.replace(rirMatch[0], ' ');
    namePart = namePart
      .replace(/[|•@:]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/^[-–—\s]+|[-–—\s]+$/g, '')
      .trim();
    if (!namePart || namePart.length < 2) namePart = cleanLine.slice(0, 48);

    const numericKgMatch = loadMatch ? loadMatch[0].match(/(\d+(?:[.,]\d+)?)\s*kg/i) : null;
    items.push({
      id: `rut_item_${idx}_${namePart.slice(0, 12)}`,
      day: currentDay,
      name: namePart,
      prescription: setsRepsMatch ? setsRepsMatch[1].replace(/\s+/g, ' ') : 'Según rutina',
      load: loadMatch ? loadMatch[1].replace(/^@\s*/, '').trim() : 'Sin carga fija',
      loadKg: numericKgMatch ? Number(numericKgMatch[1].replace(',', '.')) : null,
      notes: rirMatch ? rirMatch[1].toUpperCase() : '',
    });
  });
  return items;
}

function getCurrentWeekDaysSteps(activityLogs) {
  const LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const now = new Date();
  const todayIso = getLocalDateISO(now);
  const jsDay = now.getDay();
  const diffToMonday = jsDay === 0 ? -6 : 1 - jsDay;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);

  return LABELS.map((label, idx) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + idx);
    const iso = getLocalDateISO(d);
    const steps = Number(activityLogs?.[iso]?.steps || 0);
    return { label, iso, steps, isToday: iso === todayIso };
  });
}

function normalizeSleepLogs(rawSleepLogs, legacySleepArray) {
  const normalized = {};
  if (rawSleepLogs && typeof rawSleepLogs === 'object' && !Array.isArray(rawSleepLogs)) {
    Object.entries(rawSleepLogs).forEach(([iso, entry]) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return;
      const hrs = typeof entry === 'number' ? entry : Number(entry?.hours);
      if (Number.isFinite(hrs) && hrs > 0) {
        normalized[iso] = {
          hours: Number(hrs.toFixed(1)),
          note: typeof entry === 'object' && entry?.note ? String(entry.note) : '',
          updatedAt: typeof entry === 'object' && entry?.updatedAt ? String(entry.updatedAt) : '',
        };
      }
    });
  }
  if (Object.keys(normalized).length === 0 && Array.isArray(legacySleepArray)) {
    const now = new Date();
    const jsDay = now.getDay();
    const diffToMonday = jsDay === 0 ? -6 : 1 - jsDay;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);
    legacySleepArray.forEach((item, idx) => {
      const hrs = Number(item?.hours) || 0;
      if (hrs > 0 && idx < 7) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + idx);
        normalized[getLocalDateISO(d)] = {
          hours: Number(hrs.toFixed(1)),
          note: '',
          updatedAt: '',
        };
      }
    });
  }
  return normalized;
}

function getCurrentWeekSleepDays(sleepLogs) {
  const LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const FULL_LABELS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const now = new Date();
  const todayIso = getLocalDateISO(now);
  const jsDay = now.getDay();
  const diffToMonday = jsDay === 0 ? -6 : 1 - jsDay;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);
  return LABELS.map((label, idx) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + idx);
    const iso = getLocalDateISO(d);
    const rec = sleepLogs?.[iso];
    const hours = rec ? Number(Number(rec.hours || 0).toFixed(1)) : 0;
    return {
      label,
      fullLabel: FULL_LABELS[idx],
      iso,
      dayNum: d.getDate(),
      shortDate: `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`,
      hours,
      note: rec?.note || '',
      updatedAt: rec?.updatedAt || '',
      isToday: iso === todayIso,
    };
  });
}

function formatSleepDateLabel(isoDate) {
  if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return isoDate || '';
  const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const d = new Date(`${isoDate}T12:00:00`);
  const dayName = DAY_NAMES[d.getDay()] || '';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dayName} ${dd}/${mm}/${yyyy}`;
}

function IntegratedStepCounterPanel({
  todaySteps,
  stepGoal,
  onChangeStepGoal,
  stepGoalClaimed,
  walkRunKm,
  activityLogs,
  onQuickAddSteps,
  onResetTodaySteps,
  onOpenFullTracker,
}) {
  const [inputPasos, setInputPasos] = useState('');
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(String(stepGoal || 8000));

  const safeGoal = Math.max(1000, Number(stepGoal) || 8000);
  const safeSteps = Math.max(0, Number(todaySteps) || 0);
  const pct = Math.min(100, Math.round((safeSteps / safeGoal) * 100));
  const weekDays = getCurrentWeekDaysSteps(activityLogs);

  return (
    <div
      className="sys-window"
      style={{
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '10px',
        border: '1px solid rgba(0, 234, 255, 0.36)',
        background: 'linear-gradient(155deg, rgba(11, 21, 48, 0.96), rgba(5, 8, 23, 0.98))',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Footprints size={16} color="#00f0ff" />
          <span className="font-hud" style={{ fontSize: '11px', fontWeight: 800, color: '#00f0ff', letterSpacing: '0.05em' }}>
            DESPLAZAMIENTO Y CONTEO DE PASOS
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <button
            type="button"
            onClick={() => {
              setGoalInput(String(safeGoal));
              setEditingGoal(!editingGoal);
            }}
            style={{
              background: 'rgba(251, 191, 36, 0.14)',
              border: '1px solid rgba(251, 191, 36, 0.45)',
              color: '#fde047',
              borderRadius: '999px',
              padding: '2px 8px',
              fontSize: '10px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Meta: {safeGoal.toLocaleString('es-AR')}
          </button>
          <button
            type="button"
            onClick={onOpenFullTracker}
            style={{
              background: 'rgba(0, 234, 255, 0.12)',
              border: '1px solid rgba(0, 234, 255, 0.4)',
              color: '#67e8f9',
              borderRadius: '999px',
              padding: '2px 8px',
              fontSize: '10px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            GPS / Bici
          </button>
          <button
            type="button"
            title="Reiniciar pasos de hoy"
            onClick={onResetTodaySteps}
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(148, 163, 184, 0.35)',
              color: '#94a3b8',
              borderRadius: '8px',
              padding: '3px 6px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {editingGoal && (
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <input
            type="number"
            min="1000"
            step="500"
            className="sys-input"
            style={{ padding: '5px 8px', fontSize: '12px' }}
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
          />
          <button
            type="button"
            className="sys-btn sys-btn-gold"
            style={{ padding: '6px 10px', fontSize: '10px' }}
            onClick={() => {
              onChangeStepGoal(Math.max(1000, Number(goalInput) || 8000));
              setEditingGoal(false);
            }}
          >
            OK
          </button>
        </div>
      )}

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '6px' }}>
          <span
            className="sys-badge"
            style={{
              background: pct >= 100 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0, 234, 255, 0.14)',
              color: pct >= 100 ? '#6ee7b7' : '#67e8f9',
              border: `1px solid ${pct >= 100 ? '#10b981' : 'rgba(0, 234, 255, 0.45)'}`,
              fontSize: '10px',
            }}
          >
            HOY: {safeSteps.toLocaleString('es-AR')} / META: {safeGoal.toLocaleString('es-AR')} PASOS ({pct}%)
          </span>
          <span style={{ fontSize: '10px', fontWeight: 700, color: stepGoalClaimed || safeSteps >= safeGoal ? '#10b981' : '#fbbf24' }}>
            {stepGoalClaimed || safeSteps >= safeGoal ? '✓ META CUMPLIDA' : `${Number(walkRunKm || 0).toFixed(1)} km • +40 EXP`}
          </span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${pct}%`,
              background: pct >= 100 ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #0284c7, #00f0ff)',
            }}
          />
        </div>
      </div>

      {/* Mini tarjetas semanales (Lun a Dom) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
        {weekDays.map((d) => (
          <div
            key={d.iso}
            style={{
              padding: '6px 2px',
              borderRadius: '9px',
              background: d.isToday ? 'rgba(0, 234, 255, 0.14)' : 'rgba(4, 6, 12, 0.85)',
              border: `1px solid ${d.isToday ? '#00f0ff' : 'rgba(56, 189, 248, 0.22)'}`,
            }}
          >
            <div style={{ fontSize: '10px', color: d.isToday ? '#67e8f9' : '#94a3b8', fontWeight: 700 }}>{d.label}</div>
            <div style={{ fontSize: '11.5px', fontWeight: 800, color: d.steps >= safeGoal ? '#10b981' : '#f8fafc', marginTop: '2px' }}>
              {d.steps >= 1000 ? `${(d.steps / 1000).toFixed(1)}k` : d.steps}
            </div>
          </div>
        ))}
      </div>

      {/* Botones de carga rápida */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
        {[500, 1000, 2500, 5000].map((inc) => (
          <button
            key={inc}
            type="button"
            onClick={() => onQuickAddSteps(inc)}
            style={{
              padding: '6px 4px',
              borderRadius: '8px',
              background: 'rgba(0, 234, 255, 0.12)',
              border: '1px solid rgba(0, 234, 255, 0.35)',
              color: '#e0f2fe',
              fontSize: '10.5px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            +{inc.toLocaleString('es-AR')}
          </button>
        ))}
      </div>

      {/* Input manual directo + botón SUMAR PASOS */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <input
          type="number"
          min="1"
          className="sys-input"
          style={{ padding: '6px 10px', fontSize: '12px', flex: 1 }}
          placeholder="Ej: 1500"
          value={inputPasos}
          onChange={(e) => setInputPasos(e.target.value)}
        />
        <button
          type="button"
          className="sys-btn sys-btn-primary"
          style={{ padding: '7px 12px', fontSize: '10px', flexShrink: 0 }}
          onClick={() => {
            const val = Math.max(0, Math.round(Number(inputPasos) || 0));
            if (val > 0) {
              onQuickAddSteps(val);
              setInputPasos('');
            }
          }}
        >
          <Plus size={13} /> SUMAR PASOS
        </button>
      </div>
    </div>
  );
}
// ============================================================================
// SISTEMA DE ENTRENAMIENTO DIARIO GUIADO (CHECKLISTS EN TIEMPO REAL — FASE 3)
// ============================================================================
function DailyGuidedWorkoutChecklist({
  days = [],
  routineDayLogs = {},
  setRoutineDayLogs,
  onOpenTechModal,
  onCompleteTodaySession,
  triggerToast,
}) {
  const todayISO = getLocalDateISO();
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [restSecondsLeft, setRestSecondsLeft] = useState(0);
  const [restTotalSec, setRestTotalSec] = useState(90);

  useEffect(() => {
    if (restSecondsLeft <= 0) return;
    const id = setInterval(() => {
      setRestSecondsLeft((prev) => {
        if (prev <= 1) {
          triggerToast('⏱️ ¡Descanso finalizado! Listo para la siguiente serie.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [restSecondsLeft, triggerToast]);

  if (!days || days.length === 0) return null;

  const safeIdx = Math.min(selectedDayIdx, days.length - 1);
  const currentDay = days[safeIdx];
  const logKey = `${todayISO}_day_${safeIdx}`;
  const dayState = routineDayLogs[logKey] || { setsDone: {}, weights: {}, sessionCompleted: false };

  const totalSetsCount = currentDay.exercises.reduce((acc, ex) => acc + (Number(ex.baseSets) || 3), 0);
  const completedSetsCount = Object.values(dayState.setsDone || {}).filter(Boolean).length;
  const progressPct = totalSetsCount > 0 ? Math.min(100, Math.round((completedSetsCount / totalSetsCount) * 100)) : 0;

  const toggleSet = (exIdx, setIdx) => {
    const key = `${exIdx}_${setIdx}`;
    const nextVal = !dayState.setsDone?.[key];
    const nextSetsDone = { ...(dayState.setsDone || {}), [key]: nextVal };
    setRoutineDayLogs((prev) => ({
      ...prev,
      [logKey]: {
        ...dayState,
        setsDone: nextSetsDone,
      },
    }));
    if (nextVal) {
      setRestSecondsLeft(restTotalSec);
    }
  };

  const updateExerciseWeight = (exIdx, kgValue) => {
    setRoutineDayLogs((prev) => ({
      ...prev,
      [logKey]: {
        ...dayState,
        weights: { ...(dayState.weights || {}), [exIdx]: kgValue },
      },
    }));
  };

  const handleFinishGuidedWorkout = () => {
    setRoutineDayLogs((prev) => ({
      ...prev,
      [logKey]: { ...dayState, sessionCompleted: true },
    }));
    onCompleteTodaySession();
  };

  return (
    <div className="pex-ornate-panel" style={{ borderColor: 'var(--neon-blue)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
        <div>
          <span className="sys-badge" style={{ background: 'rgba(0,234,255,0.16)', color: '#00eaff', border: '1px solid #00eaff' }}>
            ENTRENAMIENTO DIARIO GUIADO EN VIVO
          </span>
          <h3 className="font-hud" style={{ fontSize: '14px', color: '#fff', marginTop: '5px' }}>
            {currentDay.name} • {todayISO}
          </h3>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="font-hud" style={{ fontSize: '14px', fontWeight: 900, color: progressPct === 100 ? '#10b981' : '#ffd45a' }}>
            {progressPct}% COMPLETADO
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>
            {completedSetsCount}/{totalSetsCount} series registradas
          </div>
        </div>
      </div>

      {/* Selector de Día de la Rutina */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
        {days.map((d, idx) => (
          <button
            key={`guided_day_${idx}`}
            type="button"
            className={`sys-btn ${safeIdx === idx ? 'sys-btn-primary' : 'sys-btn-ghost'}`}
            style={{ padding: '6px 10px', fontSize: '10px' }}
            onClick={() => setSelectedDayIdx(idx)}
          >
            DÍA {idx + 1}: {d.name}
          </button>
        ))}
      </div>

      {/* Barra de progreso en tiempo real */}
      <div className="progress-track" style={{ height: '10px', marginBottom: '12px' }}>
        <div
          className="progress-fill"
          style={{
            width: `${Math.max(3, progressPct)}%`,
            background: progressPct === 100
              ? 'linear-gradient(90deg, #059669, #10b981)'
              : 'linear-gradient(90deg, var(--neon-blue), var(--neon-gold))',
          }}
        />
      </div>

      {/* Temporizador de Descanso entre Series */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '9px 12px',
          borderRadius: '10px',
          background: 'rgba(5, 8, 23, 0.9)',
          border: `1px solid ${restSecondsLeft > 0 ? '#ffd45a' : 'rgba(148,163,184,0.25)'}`,
          marginBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={15} color={restSecondsLeft > 0 ? '#ffd45a' : '#00eaff'} />
          <span className="font-hud" style={{ fontSize: '12px', color: restSecondsLeft > 0 ? '#ffd45a' : '#cbd5e1' }}>
            {restSecondsLeft > 0
              ? `DESCANSO ACTIVO: ${Math.floor(restSecondsLeft / 60)}:${String(restSecondsLeft % 60).padStart(2, '0')}`
              : `DESCANSO AUTOMÁTICO: ${restTotalSec}s`}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          {[60, 90, 120, 180].map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => {
                setRestTotalSec(sec);
                setRestSecondsLeft(sec);
              }}
              style={{
                padding: '4px 8px',
                borderRadius: '7px',
                fontSize: '10px',
                fontFamily: 'Orbitron, sans-serif',
                background: restTotalSec === sec ? 'rgba(0,234,255,0.2)' : 'rgba(15,23,42,0.8)',
                border: `1px solid ${restTotalSec === sec ? '#00eaff' : 'rgba(148,163,184,0.25)'}`,
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              {sec}s
            </button>
          ))}
          {restSecondsLeft > 0 && (
            <button
              type="button"
              onClick={() => setRestSecondsLeft(0)}
              style={{
                padding: '4px 8px',
                borderRadius: '7px',
                fontSize: '10px',
                background: 'rgba(244,63,94,0.2)',
                border: '1px solid #f43f5e',
                color: '#fda4af',
                cursor: 'pointer',
              }}
            >
              Saltar
            </button>
          )}
        </div>
      </div>

      {/* Lista de Ejercicios con Checkboxes por Serie y Carga en KG */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {currentDay.exercises.map((ex, exIdx) => {
          const setsNum = Number(ex.baseSets) || 3;
          const allDone = Array.from({ length: setsNum }).every((_, sIdx) => dayState.setsDone?.[`${exIdx}_${sIdx}`]);
          return (
            <div
              key={`guided_ex_${exIdx}`}
              style={{
                padding: '12px',
                borderRadius: '11px',
                background: allDone ? 'rgba(16,185,129,0.1)' : 'rgba(4,6,12,0.88)',
                border: `1px solid ${allDone ? '#10b981' : 'rgba(148,163,184,0.25)'}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '13.5px', color: allDone ? '#6ee7b7' : '#fff' }}>
                    {allDone ? '✓ ' : ''}{ex.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#fbbf24' }}>
                    {setsNum} × {ex.baseReps} • {ex.focus}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="number"
                    placeholder="kg"
                    value={dayState.weights?.[exIdx] || ''}
                    onChange={(e) => updateExerciseWeight(exIdx, e.target.value)}
                    className="sys-input"
                    style={{ width: '68px', padding: '5px 8px', fontSize: '11px', textAlign: 'center' }}
                  />
                  <button
                    type="button"
                    className="sys-btn sys-btn-ghost"
                    style={{ padding: '5px 8px', fontSize: '9.5px' }}
                    onClick={() => onOpenTechModal(ex)}
                  >
                    <Play size={11} /> Guía
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '9px' }}>
                {Array.from({ length: setsNum }).map((_, sIdx) => {
                  const checked = Boolean(dayState.setsDone?.[`${exIdx}_${sIdx}`]);
                  return (
                    <button
                      key={`set_${exIdx}_${sIdx}`}
                      type="button"
                      onClick={() => toggleSet(exIdx, sIdx)}
                      style={{
                        padding: '6px 11px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: checked ? 'rgba(16,185,129,0.24)' : 'rgba(15,23,42,0.9)',
                        border: `1px solid ${checked ? '#10b981' : 'rgba(148,163,184,0.3)'}`,
                        color: checked ? '#6ee7b7' : '#cbd5e1',
                      }}
                    >
                      {checked ? <CheckCircle2 size={13} /> : <span style={{ width: '11px', height: '11px', borderRadius: '50%', border: '1.5px solid #64748b', display: 'inline-block' }} />}
                      Serie {sIdx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        disabled={dayState.sessionCompleted}
        className={`sys-btn ${dayState.sessionCompleted ? 'sys-btn-ghost' : 'sys-btn-gold'}`}
        style={{ width: '100%', justifyContent: 'center', marginTop: '14px', padding: '13px' }}
        onClick={handleFinishGuidedWorkout}
      >
        <Trophy size={16} />
        {dayState.sessionCompleted
          ? '✓ ENTRENAMIENTO DIARIO COMPLETADO Y REGISTRADO'
          : `COMPLETAR ENTRENAMIENTO DE HOY (${progressPct}%)`}
      </button>
    </div>
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
    photoScanned: Boolean(currentUser.initialPhotoPreview || currentUser.initialPhotoDna),
    censoredPreview: currentUser.initialPhotoPreview || null,
    photoDna: currentUser.initialPhotoDna || null,
    usePhotoAdaptation: true,
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
  const [activeStoryEncounter, setActiveStoryEncounter] = useState(null);
  const [activePvpDuel, setActivePvpDuel] = useState(null);
  const [showAllRanksLadder, setShowAllRanksLadder] = useState(false);

  const [cityName, setCityName] = useState(() => initialData?.cityName || 'Bastión de Ceniza');
  const [builtBuildings, setBuiltBuildings] = useState(() => initialData?.builtBuildings || []);
  const [selectedCharId, setSelectedCharId] = useState('lyra');
  const [characterStates, setCharacterStates] = useState(() => initialData?.characterStates || {
    lyra: { affection: 0, memories: [], lastReply: STORY_CHARACTERS[0].intro },
    kaelen: { affection: 0, memories: [], lastReply: STORY_CHARACTERS[1].intro },
    seraphina: { affection: 0, memories: [], lastReply: STORY_CHARACTERS[2].intro },
    isolde: { affection: 0, memories: [], lastReply: STORY_CHARACTERS[3].intro },
    vaelen: { affection: 0, memories: [], lastReply: STORY_CHARACTERS[4].intro },
    nyx: { affection: 0, memories: [], lastReply: STORY_CHARACTERS[5].intro },
    freya: { affection: 0, memories: [], lastReply: STORY_CHARACTERS[6].intro },
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSlotIdx, setSelectedSlotIdx] = useState(0);
  const [toast, setToast] = useState(null);
  const [animModalEx, setAnimModalEx] = useState(null);

  const [neonTheme, setNeonTheme] = useState(() => {
    if (initialData?.neonTheme) return initialData.neonTheme;
    try {
      const rawTheme = localStorage.getItem(`pex_neon_theme_v1_${currentUser.email}`);
      if (rawTheme) return JSON.parse(rawTheme);
    } catch {}
    return {
      primary: '#00eaff',
      secondary: '#963cff',
      accent: '#ffd45a',
    };
  });
  // Limpieza única: cachés del avatar 2D / retrato IA (imágenes base64 obsoletas que ocupaban el almacenamiento local)
  useEffect(() => {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('pex_ai_avatar_v5_linked_') || key.startsWith('pex_2d_avatar_v1_')) localStorage.removeItem(key);
      });
    } catch {}
  }, []);

  useEffect(() => {
    const hexToRgb = (hex) => {
      const clean = (hex || '#00eaff').replace('#', '');
      const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
      const num = parseInt(full, 16);
      if (Number.isNaN(num)) return '0, 234, 255';
      return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
    };

    const root = document.documentElement.style;
    root.setProperty('--neon-blue', neonTheme.primary || '#00eaff');
    root.setProperty('--cyan-glow', neonTheme.primary || '#00eaff');
    root.setProperty('--neon-purple', neonTheme.secondary || '#963cff');
    root.setProperty('--neon-gold', neonTheme.accent || '#ffd45a');
    root.setProperty('--gold-rank', neonTheme.accent || '#ffd45a');
    root.setProperty('--neon-primary-rgb', hexToRgb(neonTheme.primary || '#00eaff'));
    root.setProperty('--neon-secondary-rgb', hexToRgb(neonTheme.secondary || '#963cff'));
    root.setProperty('--neon-accent-rgb', hexToRgb(neonTheme.accent || '#ffd45a'));

    try {
      localStorage.setItem(`pex_neon_theme_v1_${currentUser.email}`, JSON.stringify(neonTheme));
    } catch {}
  }, [neonTheme, currentUser.email]);

  const [quests, setQuests] = useState(() =>
    initialData?.quests
      ? normalizeQuestList(initialData.quests)
      : [
          {
            id: 1,
            title: 'Entrenar hoy',
            env: 'Rutina diaria',
            lp: 50,
            exp: 100,
            status: 'pending',
            isDaily: true,
            origin: 'daily',
            dailyDate: getLocalDateISO(),
          },
          {
            id: 2,
            title: 'Registrar tus marcas base en la pestaña Cargas',
            env: 'Sistema',
            lp: 35,
            exp: 60,
            status: 'pending',
            isDaily: true,
            origin: 'daily',
          },
          {
            id: 3,
            title: 'Dormir al menos 7.5 horas esta noche',
            env: 'Recuperación',
            lp: 25,
            exp: 50,
            status: 'pending',
            isDaily: true,
            origin: 'daily',
          },
        ]
  );
  const [nextWeekQueue, setNextWeekQueue] = useState(() => initialData?.nextWeekQueue || []);
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [justifyModalId, setJustifyModalId] = useState(null);
  const [justifyReason, setJustifyReason] = useState('');
  const [justificationHistory, setJustificationHistory] = useState(() => initialData?.justificationHistory || []);
  const [cancellationsRemaining, setCancellationsRemaining] = useState(() => {
    if (typeof initialData?.cancellationsRemaining === 'number') return initialData.cancellationsRemaining;
    try {
      const rawQuota = localStorage.getItem(`pex_cancel_quota_v1_${currentUser.email}`);
      if (rawQuota !== null) return Math.max(0, Math.min(CANCELLATION_MAX_QUOTA, Number(rawQuota)));
    } catch {}
    return CANCELLATION_MAX_QUOTA;
  });
  const [nowTimestamp, setNowTimestamp] = useState(() => Date.now());
  const [savedRoutineAnalysis, setSavedRoutineAnalysis] = useState(() => {
    if (initialData?.savedRoutineAnalysis) return initialData.savedRoutineAnalysis;
    try {
      const rawSaved = localStorage.getItem(`pex_routine_analysis_v1_${currentUser.email}`);
      return rawSaved ? JSON.parse(rawSaved) : null;
    } catch {
      return null;
    }
  });
  const [dailyStepGoal, setDailyStepGoal] = useState(() => {
    if (typeof initialData?.dailyStepGoal === 'number') return initialData.dailyStepGoal;
    try {
      const rawStepsMeta = localStorage.getItem(`pex_steps_meta_v1_${currentUser.email}`);
      if (rawStepsMeta) {
        const parsed = JSON.parse(rawStepsMeta);
        if (parsed?.dailyStepGoal) return Number(parsed.dailyStepGoal);
      }
    } catch {}
    return 8000;
  });

  useEffect(() => {
    const timer = setInterval(() => setNowTimestamp(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  const [selectedExercise, setSelectedExercise] = useState('Press Banca');
  const [liftWeightInput, setLiftWeightInput] = useState(savedLifts['Press Banca']?.weight || 0);
  const [liftRepsInput, setLiftRepsInput] = useState(savedLifts['Press Banca']?.reps || 0);

  const [daysUntilEval] = useState(90);
  const [vaultPhotos, setVaultPhotos] = useState({ front: null, back: null });
  const [yearlyRecap, setYearlyRecap] = useState(() => initialData?.yearlyRecap || []);

  const [customRoutineText, setCustomRoutineText] = useState('');
  const [scanReport, setScanReport] = useState(null);
  const [routineFileName, setRoutineFileName] = useState('');
  const [routineLoadingMsg, setRoutineLoadingMsg] = useState('');
  const [interactiveRoutineDoc, setInteractiveRoutineDoc] = useState(null);
  const [showGeneratedRoutine, setShowGeneratedRoutine] = useState(false);
  const [routineDayLogs, setRoutineDayLogs] = useState(() => initialData?.routineDayLogs || {});

  const [sleepLogs, setSleepLogs] = useState(() =>
    normalizeSleepLogs(initialData?.sleepLogs, initialData?.sleepLog)
  );
  const [selectedSleepDate, setSelectedSleepDate] = useState(() => getLocalDateISO());
  const [sleepHoursInput, setSleepHoursInput] = useState(() => {
    const initialMap = normalizeSleepLogs(initialData?.sleepLogs, initialData?.sleepLog);
    const todayRec = initialMap[getLocalDateISO()];
    return todayRec ? String(todayRec.hours) : '';
  });
  const [sleepNoteInput, setSleepNoteInput] = useState(() => {
    const initialMap = normalizeSleepLogs(initialData?.sleepLogs, initialData?.sleepLog);
    const todayRec = initialMap[getLocalDateISO()];
    return todayRec?.note || '';
  });

  const [activityLogs, setActivityLogs] = useState(() => initialData?.activityLogs || {});
  const [tracker, setTracker] = useState({
    isRunning: false,
    mode: 'walk',
    sessionSteps: 0,
    sessionDistanceKm: 0,
    speedKmh: 0,
    elapsedSec: 0,
    gpsStatus: 'En espera',
    hasAccelerometer: false,
    wakeLockActive: false,
  });

  const lastGpsPointRef = useRef(null);
  const wakeLockRef = useRef(null);
  const lastStepTimestampRef = useRef(0);
  const gravityEstimateRef = useRef(9.81);
  const hasAccelRef = useRef(false);

  useEffect(() => {
    if (!tracker.isRunning) {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
      setTracker((prev) => (prev.wakeLockActive ? { ...prev, wakeLockActive: false } : prev));
      return;
    }

    const intervalId = setInterval(() => {
      setTracker((prev) => ({ ...prev, elapsedSec: prev.elapsedSec + 1 }));
    }, 1000);

    if ('wakeLock' in navigator && !wakeLockRef.current) {
      navigator.wakeLock
        .request('screen')
        .then((sentinel) => {
          wakeLockRef.current = sentinel;
          setTracker((prev) => ({ ...prev, wakeLockActive: true }));
        })
        .catch(() => {});
    }

    return () => clearInterval(intervalId);
  }, [tracker.isRunning]);

  useEffect(() => {
    if (!tracker.isRunning) return;

    let watchId = null;
    if (navigator.geolocation) {
      setTracker((prev) => ({ ...prev, gpsStatus: 'Buscando satélite...' }));
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude, accuracy, speed } = pos.coords;
          if (accuracy && accuracy > 45) {
            setTracker((prev) => ({ ...prev, gpsStatus: `Señal débil (±${Math.round(accuracy)}m)` }));
            return;
          }

          setUserCoords({
            lat: latitude,
            lon: longitude,
            label: `GPS Activo (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
          });

          const prevPt = lastGpsPointRef.current;
          const nowMs = Date.now();
          let deltaKm = 0;

          if (prevPt) {
            const rawDist = getPreciseDistanceKm(prevPt.lat, prevPt.lon, latitude, longitude);
            const dtHours = Math.max((nowMs - prevPt.time) / 3600000, 1 / 3600);
            const impliedSpeed = rawDist / dtHours;
            if (rawDist >= 0.004 && impliedSpeed <= 65) {
              deltaKm = rawDist;
              lastGpsPointRef.current = { lat: latitude, lon: longitude, time: nowMs };
            }
          } else {
            lastGpsPointRef.current = { lat: latitude, lon: longitude, time: nowMs };
          }

          setTracker((prev) => {
            const heightM = (Number(profile.heightCm) || 176) / 100;
            const strideM = prev.mode === 'run' ? heightM * 0.65 : heightM * 0.415;
            const gpsEstimatedSteps =
              prev.mode !== 'bike' && !hasAccelRef.current && deltaKm > 0
                ? Math.round((deltaKm * 1000) / strideM)
                : 0;
            const liveSpeed =
              typeof speed === 'number' && speed >= 0
                ? Number((speed * 3.6).toFixed(1))
                : deltaKm > 0 && prevPt
                ? Number((deltaKm / Math.max((nowMs - prevPt.time) / 3600000, 1 / 3600)).toFixed(1))
                : 0;

            return {
              ...prev,
              gpsStatus: `Conectado (±${Math.round(accuracy || 10)}m)`,
              sessionDistanceKm: prev.sessionDistanceKm + deltaKm,
              sessionSteps: prev.sessionSteps + gpsEstimatedSteps,
              speedKmh: liveSpeed,
            };
          });
        },
        () => {
          setTracker((prev) => ({ ...prev, gpsStatus: 'GPS no disponible (usando sensor/manual)' }));
        },
        { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 }
      );
    }

    const handleDeviceMotion = (event) => {
      if (tracker.mode === 'bike') return;
      const acc =
        event.acceleration && event.acceleration.x !== null
          ? event.acceleration
          : event.accelerationIncludingGravity;
      if (!acc) return;

      const mag = Math.sqrt((acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2);
      let dynamicDelta = mag;
      if (!event.acceleration || event.acceleration.x === null) {
        gravityEstimateRef.current = 0.9 * gravityEstimateRef.current + 0.1 * mag;
        dynamicDelta = Math.abs(mag - gravityEstimateRef.current);
      }

      const threshold = tracker.mode === 'run' ? 2.6 : 1.65;
      const minGapMs = tracker.mode === 'run' ? 190 : 280;
      const now = Date.now();

      if (dynamicDelta > threshold && now - lastStepTimestampRef.current > minGapMs) {
        lastStepTimestampRef.current = now;
        if (!hasAccelRef.current) {
          hasAccelRef.current = true;
        }
        setTracker((prev) => ({
          ...prev,
          hasAccelerometer: true,
          sessionSteps: prev.sessionSteps + 1,
        }));
      }
    };

    window.addEventListener('devicemotion', handleDeviceMotion);
    return () => {
      if (watchId !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, [tracker.isRunning, tracker.mode, profile.heightCm]);

  const handleStartTracker = async () => {
    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      try {
        await DeviceMotionEvent.requestPermission();
      } catch {
        // Continúa con respaldo GPS si el usuario rechaza el acelerómetro
      }
    }
    lastGpsPointRef.current = null;
    setTracker((prev) => ({ ...prev, isRunning: true }));
    triggerToast('[SISTEMA GPS] Rastreo de actividad iniciado.');
  };

  const handlePauseTracker = () => {
    lastGpsPointRef.current = null;
    setTracker((prev) => ({ ...prev, isRunning: false, speedKmh: 0 }));
    triggerToast('[SISTEMA GPS] Sesión en pausa.');
  };

  const handleDiscardTracker = (msg) => {
    lastGpsPointRef.current = null;
    hasAccelRef.current = false;
    setTracker((prev) => ({
      ...prev,
      isRunning: false,
      sessionSteps: 0,
      sessionDistanceKm: 0,
      speedKmh: 0,
      elapsedSec: 0,
      gpsStatus: 'En espera',
      hasAccelerometer: false,
    }));
    if (msg) triggerToast(msg);
  };


  const gradeData = computeHunterGradeData(savedLifts, profile.weightKg);
  const hunterGrade = gradeData.currentStd.grade;
  const prevGradeRef = useRef(hunterGrade);

  // Ciudad disponible desde Nivel 0 / desde el Despertar
  const cityUnlocked = true;

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
        justificationHistory,
        cancellationsRemaining,
        savedRoutineAnalysis,
        dailyStepGoal,
        sleepLogs,
        sleepLog: getCurrentWeekSleepDays(sleepLogs).map(({ label, hours }) => ({ day: label, hours })),
        yearlyRecap,
        routineDayLogs,
        activityLogs,
        neonTheme,
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
        justificationHistory,
        cancellationsRemaining,
        savedRoutineAnalysis,
        dailyStepGoal,
        sleepLogs,
        sleepLog: getCurrentWeekSleepDays(sleepLogs).map(({ label, hours }) => ({ day: label, hours })),
        yearlyRecap,
        routineDayLogs,
        activityLogs,
        neonTheme,
      };
      localStorage.setItem(storageKey, JSON.stringify(fallbackPayload));
    }
    try {
      localStorage.setItem(`pex_cancel_quota_v1_${currentUser.email}`, String(cancellationsRemaining));
      localStorage.setItem(`pex_steps_meta_v1_${currentUser.email}`, JSON.stringify({ dailyStepGoal }));
      if (savedRoutineAnalysis) {
        localStorage.setItem(`pex_routine_analysis_v1_${currentUser.email}`, JSON.stringify(savedRoutineAnalysis));
      } else {
        localStorage.removeItem(`pex_routine_analysis_v1_${currentUser.email}`);
      }
    } catch {}
  }, [
    storageKey, currentUser.email, awakened, profile, hunterClass, savedLifts,
    lp, exp, streak, unlockedInventory, completedChapters,
    cityName, builtBuildings, characterStates,
    friends, quests, nextWeekQueue, justificationHistory, cancellationsRemaining,
    savedRoutineAnalysis, dailyStepGoal, sleepLogs, yearlyRecap, routineDayLogs, activityLogs, neonTheme
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
    setSleepLogs({});
    setSelectedSleepDate(getLocalDateISO());
    setSleepHoursInput('');
    setSleepNoteInput('');
    setActivityLogs({});
    handleDiscardTracker(null);
    setYearlyRecap([]);
    setPveBattleLog(null);
    setPvpLog(null);
    setQuests([
      { id: Date.now() + 1, title: 'Entrenar hoy', env: 'Rutina diaria', lp: 50, exp: 100, status: 'pending', isDaily: true, origin: 'daily', dailyDate: getLocalDateISO() },
      { id: Date.now() + 2, title: 'Registrar tus marcas base en la pestaña Cargas', env: 'Sistema', lp: 35, exp: 60, status: 'pending', isDaily: true, origin: 'daily' },
      { id: Date.now() + 3, title: 'Dormir al menos 7.5 horas esta noche', env: 'Recuperación', lp: 25, exp: 50, status: 'pending', isDaily: true, origin: 'daily' },
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

  // Lyra y Kaelen desbloqueados desde Nivel 0; el resto se desbloquea avanzando en Historia PvE
  const unlockedCharacters = STORY_CHARACTERS.filter(
    (c) => c.unlockedByDefault || completedChapters.includes(c.unlockChapter)
  );
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

  const loadBrowserScript = (src) => {
    if (typeof window === 'undefined') return Promise.reject(new Error('Sin entorno navegador'));
    window.__pexScriptsCache = window.__pexScriptsCache || {};
    if (window.__pexScriptsCache[src]) return window.__pexScriptsCache[src];
    window.__pexScriptsCache[src] = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing && existing.dataset.loaded === 'true') {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => {
        script.dataset.loaded = 'true';
        resolve();
      };
      script.onerror = () => {
        delete window.__pexScriptsCache[src];
        reject(new Error(`No se pudo cargar el lector externo: ${src}`));
      };
      document.head.appendChild(script);
    });
    return window.__pexScriptsCache[src];
  };

  const parseDelimitedRows = (raw, delimiter = ',') => {
    const rows = [];
    let currentRow = [];
    let currentVal = '';
    let inQuotes = false;
    for (let i = 0; i < raw.length; i += 1) {
      const ch = raw[i];
      const next = raw[i + 1];
      if (ch === '"') {
        if (inQuotes && next === '"') {
          currentVal += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === delimiter && !inQuotes) {
        currentRow.push(currentVal.trim());
        currentVal = '';
      } else if ((ch === '\n' || (ch === '\r' && next === '\n')) && !inQuotes) {
        if (ch === '\r') i += 1;
        currentRow.push(currentVal.trim());
        if (currentRow.some((cell) => cell !== '')) rows.push(currentRow);
        currentRow = [];
        currentVal = '';
      } else if (ch !== '\r') {
        currentVal += ch;
      }
    }
    currentRow.push(currentVal.trim());
    if (currentRow.some((cell) => cell !== '')) rows.push(currentRow);
    const maxCols = Math.max(3, ...rows.map((r) => r.length));
    return rows.map((r) => {
      const padded = [...r];
      while (padded.length < maxCols) padded.push('');
      return padded;
    });
  };

  const stripRtfContent = (rtf) => {
    return String(rtf || '')
      .replace(/\{\\(?:fonttbl|colortbl|stylesheet|info|pict|object)[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/gi, ' ')
      .replace(/\\par[d]?\b/gi, '\n')
      .replace(/\\line\b/gi, '\n')
      .replace(/\\tab\b/gi, '\t')
      .replace(/\\'([0-9a-fA-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/\\[a-z]+-?\d* ?/gi, '')
      .replace(/[{}]/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  const buildInteractiveDocLines = (rawText) => {
    const rawLines = String(rawText || '')
      .replace(/\r/g, '')
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    return rawLines.map((text, idx) => {
      const isHeader = /^(d[ií]a\s*\d+|semana\s*\d+|lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bado|domingo|bloque|rutina|hoja:|m[oó]dulo|fase)/i.test(text);
      const isExercise = /\d+\s*[x×]\s*\d+|series|reps|repeticiones|kg|rir|rpe|press|sentadilla|peso muerto|remo|dominada|curl|extensi[oó]n|plancha|fondos|zancada/i.test(text);
      return {
        id: `line_${Date.now()}_${idx}`,
        text,
        completed: false,
        isHeader,
        isExercise
      };
    });
  };

  const serializeSheetsToText = (sheets) => {
    return (sheets || [])
      .map((sh) => {
        const body = (sh.rows || [])
          .filter((r) => r.some((c) => String(c || '').trim() !== ''))
          .map((r) => r.map((c) => String(c || '').trim()).filter(Boolean).join(' | '))
          .join('\n');
        return `HOJA: ${sh.name}\n${body}`;
      })
      .join('\n\n')
      .trim();
  };

  const evaluateRoutineContent = (rawText, sourceName = 'Texto pegado') => {
    const cleanText = String(rawText || '').replace(/\r/g, '').trim();
    if (!cleanText) return null;

    const lines = cleanText.split('\n').map((line) => line.trim()).filter(Boolean);
    const prescriptionLines = lines.filter((line) => /\d+\s*[x×]\s*\d+/i.test(line));
    const rirMentions = (cleanText.match(/RIR\s*\d+|RPE\s*\d+|repeticiones en reserva|al fallo/gi) || []).length;
    const loadMentions = (cleanText.match(/\d+(?:[.,]\d+)?\s*(?:kg|lbs?|%\s*1rm)/gi) || []).length;
    const progressionMentions = (cleanText.match(/semana\s*\d+|progresi[oó]n|sobrecarga|descarga|deload|bloque/gi) || []).length;
    const recoveryMentions = (cleanText.match(/descanso|recuperaci[oó]n|sueño|deload|descarga|\d+\s*(?:seg|min)/gi) || []).length;
    const daysMentions = (cleanText.match(/d[ií]a\s*[1-7]|lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bado|domingo|upper|lower|push|pull|legs|full\s*body/gi) || []).length;

    const findings = [];
    const improvements = [];

    if (prescriptionLines.length >= 4) {
      findings.push(`Se identificaron ${prescriptionLines.length} prescripciones de series × repeticiones: el volumen semanal es cuantificable.`);
    } else {
      improvements.push('Faltan prescripciones explícitas de series × repeticiones (ej. 3 × 8-12) en varios ejercicios. Editá las filas o líneas arriba para completarlas.');
    }

    if (rirMentions > 0) {
      findings.push(`Incluye ${rirMentions} referencia(s) a esfuerzo interno (RIR/RPE), clave para controlar la fatiga neural.`);
    } else {
      improvements.push('No se especifica RIR ni proximidad al fallo. Añadí RIR 1-3 en ejercicios compuestos para regular la intensidad.');
    }

    if (loadMentions > 0) {
      findings.push(`Registra ${loadMentions} mención(es) de carga o porcentaje (%1RM / kg), facilitando la sobrecarga progresiva.`);
    } else {
      improvements.push('No figuran cargas objetivo en kg ni %1RM. Agregar una columna o nota de peso te permitirá medir el progreso real.');
    }

    if (progressionMentions > 0) {
      findings.push('Contiene estructura por semanas, bloques o criterios de progresión/descarga.');
    } else {
      improvements.push('No se observa un esquema de progresión semanal ni semana de descarga (deload). Definí cómo subirán repeticiones o kilos.');
    }

    if (recoveryMentions > 0) {
      findings.push('Contempla tiempos de descanso entre series o pautas de recuperación.');
    } else {
      improvements.push('Faltan tiempos de descanso entre series (ej. 2-3 min en básicos, 60-90 seg en accesorios).');
    }

    if (daysMentions > 0) {
      findings.push('Presenta distribución organizada por días de entrenamiento o grupos musculares.');
    } else {
      improvements.push('No se distingue una división clara por días (Día 1, Día 2, Lunes, etc.). Agrupá los ejercicios por sesión.');
    }

    const scoreNum = Math.min(
      100,
      30 +
        prescriptionLines.length * 4 +
        rirMentions * 6 +
        loadMentions * 4 +
        progressionMentions * 6 +
        recoveryMentions * 5 +
        daysMentions * 3
    );

    return {
      sourceName,
      rawText: cleanText,
      exerciseLines: prescriptionLines,
      scoreNum,
      score: `${scoreNum} / 100 (ÍNDICE ORIENTATIVO DE ESTRUCTURA)`,
      finding: findings.length ? findings : ['Contenido leído correctamente, aunque aún posee pocos datos técnicos estructurados.'],
      fix: improvements.length
        ? improvements
        : ['¡Excelente estructura! La rutina contempla volumen, esfuerzo (RIR), cargas, descansos y progresión semanal.']
    };
  };

  const applyAnalyzedRoutineToTabs = (combinedText, sourceName) => {
    const parsedItems = parseRoutineExercisesAndLoads(combinedText);
    setSavedRoutineAnalysis({
      sourceName,
      updatedAt: new Date().toLocaleString(),
      items: parsedItems,
      totalExercises: parsedItems.length,
    });

    setQuests((prev) => procesarRutinaImportada(combinedText, prev).misionesActualizadas);
  };

  const syncInteractiveSpreadsheet = (nextSheets, sourceName, nextActiveSheetIdx = 0, nextCheckedRows = {}) => {
    const combinedText = serializeSheetsToText(nextSheets);
    setCustomRoutineText(combinedText);
    setInteractiveRoutineDoc({
      fileName: sourceName,
      fileType: 'spreadsheet',
      sheets: nextSheets,
      activeSheetIdx: Math.min(nextActiveSheetIdx, Math.max(0, nextSheets.length - 1)),
      checkedRows: nextCheckedRows,
      editMode: 'interactive',
    });
    const report = evaluateRoutineContent(combinedText, sourceName);
    if (report) setScanReport(report);
    applyAnalyzedRoutineToTabs(combinedText, sourceName);
  };

  const syncInteractiveDocumentLines = (nextDocLines, sourceName, editMode = 'interactive') => {
    const combinedText = nextDocLines.map((l) => l.text).join('\n');
    setCustomRoutineText(combinedText);
    setInteractiveRoutineDoc({
      fileName: sourceName,
      fileType: 'document',
      docLines: nextDocLines,
      editMode,
    });
    const report = evaluateRoutineContent(combinedText, sourceName);
    if (report) setScanReport(report);
    applyAnalyzedRoutineToTabs(combinedText, sourceName);
  };

  const analyzeRoutineText = (rawText, sourceName = 'Texto pegado') => {
    const cleanText = String(rawText || '').replace(/\r/g, '').trim();
    if (!cleanText) {
      triggerToast('[ESCÁNER] No se encontró texto para analizar.');
      return;
    }
    const docLines = buildInteractiveDocLines(cleanText);
    syncInteractiveDocumentLines(docLines, sourceName, 'interactive');
    triggerToast('[RUTINA & MISIONES] Ejercicios y cargas guardados en Rutina; tarjeta diaria "Entrenar hoy" lista en Misiones.');
  };

  const handleRoutineFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const MAX_FILE_SIZE = 30 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      triggerToast('[ESCÁNER] El archivo supera el límite de 30 MB.');
      event.target.value = '';
      return;
    }

    const extension = (file.name.split('.').pop() || '').toLowerCase();
    setRoutineFileName(file.name);
    setRoutineLoadingMsg(`Procesando "${file.name}"...`);

    try {
      // 1. PLANILLAS DE CÁLCULO (EXCEL .xlsx/.xls, .ods, .csv, .tsv)
      if (['csv', 'tsv'].includes(extension)) {
        const rawCsv = await file.text();
        const delimiter = extension === 'tsv' ? '\t' : (rawCsv.includes(';') && !rawCsv.includes(',') ? ';' : ',');
        const rows = parseDelimitedRows(rawCsv, delimiter);
        const safeRows = rows.length ? rows : [['Ejercicio', 'Series × Reps', 'Peso / RIR', 'Notas']];
        syncInteractiveSpreadsheet([{ name: file.name, rows: safeRows }], file.name, 0, {});
        setRoutineLoadingMsg('');
        triggerToast(`[EXCEL / CSV] Planilla "${file.name}" cargada en tabla interactiva.`);
        event.target.value = '';
        return;
      }

      if (['xlsx', 'xls', 'ods', 'numbers'].includes(extension)) {
        if (!window.XLSX) {
          setRoutineLoadingMsg('Cargando motor lector de Excel y planillas...');
          await loadBrowserScript('https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js');
        }
        const buffer = await file.arrayBuffer();
        const workbook = window.XLSX.read(buffer, { type: 'array' });
        const sheets = workbook.SheetNames.map((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          const aoa = window.XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
          const cleanRows = aoa
            .map((r) => (Array.isArray(r) ? r.map((cell) => String(cell ?? '').trim()) : [String(r ?? '').trim()]))
            .filter((r) => r.some((c) => c !== ''));
          const maxCols = Math.max(3, ...cleanRows.map((r) => r.length));
          const normalized = (cleanRows.length ? cleanRows : [['Ejercicio', 'Series × Reps', 'Peso / RIR']]).map((r) => {
            const copy = [...r];
            while (copy.length < maxCols) copy.push('');
            return copy;
          });
          return { name: sheetName, rows: normalized };
        });

        if (sheets.length > 0) {
          syncInteractiveSpreadsheet(sheets, file.name, 0, {});
          setRoutineLoadingMsg('');
          triggerToast(`[EXCEL] "${file.name}" (${sheets.length} hoja/s) listo para editar e interactuar.`);
          event.target.value = '';
          return;
        }
      }

      // 2. DOCUMENTOS PDF (.pdf)
      if (extension === 'pdf' || file.type === 'application/pdf') {
        if (!window.pdfjsLib) {
          setRoutineLoadingMsg('Cargando motor lector de PDF...');
          await loadBrowserScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js');
        }
        if (window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
        const pdfData = new Uint8Array(await file.arrayBuffer());
        const pdf = await window.pdfjsLib.getDocument({ data: pdfData }).promise;
        const pageTexts = [];
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();
          const lineBuckets = new Map();
          content.items.forEach((item) => {
            const str = String(item.str || '').trim();
            if (!str) return;
            const yKey = Math.round((item.transform?.[5] || 0) / 5);
            if (!lineBuckets.has(yKey)) lineBuckets.set(yKey, []);
            lineBuckets.get(yKey).push({ x: item.transform?.[4] || 0, str });
          });
          const sortedY = Array.from(lineBuckets.keys()).sort((a, b) => b - a);
          const lines = sortedY.map((y) =>
            lineBuckets
              .get(y)
              .sort((a, b) => a.x - b.x)
              .map((entry) => entry.str)
              .join(' ')
          );
          pageTexts.push(lines.join('\n'));
        }
        const pdfText = pageTexts.join('\n\n').trim();
        if (pdfText) {
          const docLines = buildInteractiveDocLines(pdfText);
          syncInteractiveDocumentLines(docLines, file.name, 'interactive');
          setRoutineLoadingMsg('');
          triggerToast(`[PDF] "${file.name}" (${pdf.numPages} pág.) convertido a rutina interactiva.`);
          event.target.value = '';
          return;
        }
      }

      // 3. DOCUMENTOS WORD Y TEXTO ENRIQUECIDO (.docx, .doc, .odt, .rtf)
      if (['docx', 'doc'].includes(extension)) {
        let wordText = '';
        try {
          if (!window.mammoth) {
            setRoutineLoadingMsg('Cargando motor lector de documentos Word...');
            await loadBrowserScript('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.8.0/mammoth.browser.min.js');
          }
          const result = await window.mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
          wordText = String(result.value || '').trim();
        } catch {
          const rawBuf = new Uint8Array(await file.arrayBuffer());
          const decoded = new TextDecoder('latin1').decode(rawBuf);
          const matches = decoded.match(/[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,;:×x()\-/]{12,}/g) || [];
          wordText = matches.join('\n').trim();
        }
        if (wordText) {
          const docLines = buildInteractiveDocLines(wordText);
          syncInteractiveDocumentLines(docLines, file.name, 'interactive');
          setRoutineLoadingMsg('');
          triggerToast(`[DOCUMENTO WORD] "${file.name}" cargado en modo interactivo.`);
          event.target.value = '';
          return;
        }
      }

      if (extension === 'odt') {
        if (!window.JSZip) {
          setRoutineLoadingMsg('Cargando motor lector de OpenDocument (.odt)...');
          await loadBrowserScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
        }
        const zip = await window.JSZip.loadAsync(await file.arrayBuffer());
        const xmlFile = zip.file('content.xml');
        if (xmlFile) {
          const xmlStr = await xmlFile.async('string');
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlStr, 'application/xml');
          const paragraphs = Array.from(xmlDoc.getElementsByTagName('*'))
            .filter((el) => el.localName === 'p' || el.localName === 'h')
            .map((el) => el.textContent.trim())
            .filter(Boolean);
          const odtText = paragraphs.join('\n');
          if (odtText) {
            syncInteractiveDocumentLines(buildInteractiveDocLines(odtText), file.name, 'interactive');
            setRoutineLoadingMsg('');
            triggerToast(`[ODT] Documento "${file.name}" cargado en modo interactivo.`);
            event.target.value = '';
            return;
          }
        }
      }

      if (extension === 'rtf') {
        const rawRtf = await file.text();
        const plainRtf = stripRtfContent(rawRtf);
        if (plainRtf) {
          syncInteractiveDocumentLines(buildInteractiveDocLines(plainRtf), file.name, 'interactive');
          setRoutineLoadingMsg('');
          triggerToast(`[RTF] Documento "${file.name}" cargado en modo interactivo.`);
          event.target.value = '';
          return;
        }
      }

      // 4. CUALQUIER OTRO ARCHIVO DE TEXTO, MARKDOWN, HTML, JSON, XML, ETC.
      const fallbackText = await file.text();
      let cleanFallback = fallbackText;
      if (['html', 'htm', 'xml'].includes(extension)) {
        const docParsed = new DOMParser().parseFromString(fallbackText, 'text/html');
        cleanFallback = docParsed.body?.innerText || docParsed.body?.textContent || fallbackText;
      }
      if (cleanFallback && cleanFallback.trim()) {
        syncInteractiveDocumentLines(buildInteractiveDocLines(cleanFallback), file.name, 'interactive');
        setRoutineLoadingMsg('');
        triggerToast(`[ARCHIVO] "${file.name}" cargado en modo interactivo.`);
      } else {
        setRoutineLoadingMsg('');
        triggerToast('[ESCÁNER] No se detectó texto legible en el archivo. Podés pegarlo o escribirlo directamente.');
      }
    } catch (error) {
      console.error('Error al procesar archivo:', error);
      setRoutineLoadingMsg('');
      triggerToast(`[ESCÁNER] Error al leer "${file.name}". Verificá que no esté protegido con contraseña.`);
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
    reader.onload = async (ev) => {
      const safeDataUrl = String(ev.target?.result || '');
      if (!safeDataUrl) return;
      if (target === 'onboarding' || target === 'avatar_sync') {
        try {
          const { photoDna, safePreviewUrl } = await extractPhotoDnaFromDataUrl(safeDataUrl, {
            gender: profile.gender || 'male',
            applyPrivacyVisor: true,
          });
          setProfile((p) => ({
            ...p,
            photoScanned: true,
            censoredPreview: safePreviewUrl,
            photoDna,
            usePhotoAdaptation: true,
            avatar3d:
              target === 'avatar_sync'
                ? { ...(p.avatar3d || {}), hairColor: '', armorColor: '', eyeColor: '', hairStyle: '' }
                : p.avatar3d,
          }));
          triggerToast(`[SISTEMA] Avatar 3D adaptado a tu fotografía (${photoDna.silhouetteTag}).`);
        } catch {
          setProfile((p) => ({ ...p, photoScanned: true, censoredPreview: safeDataUrl }));
          triggerToast('[SISTEMA] Fotografía escaneada y protegida con escudo local AES-256.');
        }
      } else if (target === 'front' || target === 'back') {
        setVaultPhotos((v) => ({ ...v, [target]: safeDataUrl }));
        triggerToast(`[BÓVEDA] Captura ${target === 'front' ? 'frontal' : 'dorsal'} cifrada sin rostro.`);
      }
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

    const generatedClass = generateRandomInfiniteClass(seed + Date.now(), profile.preferredRaceId || null);
    const chosenRace = generatedClass.race;
    const chosenCls = generatedClass.cls;
    const assigned = { race: chosenRace, cls: chosenCls, assignedAt: new Date().toLocaleDateString() };

    const initGrade = computeHunterGradeData(initialLifts, profile.weightKg).currentStd.grade;
    prevGradeRef.current = initGrade;

    setHunterClass(assigned);
    setLp(0);
    setExp(0);
    setStreak(0);
    setUnlockedInventory([]);
    setCompletedChapters([]);
    setSleepLogs({});
    setSelectedSleepDate(getLocalDateISO());
    setSleepHoursInput('');
    setSleepNoteInput('');
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
  const weekSleepDays = getCurrentWeekSleepDays(sleepLogs);
  const totalSleep = Number(
    weekSleepDays.reduce((acc, d) => acc + (Number(d.hours) || 0), 0).toFixed(1)
  );
  const loggedSleepDaysCount = weekSleepDays.filter((d) => d.hours > 0).length;
  const avgSleepPerNight = loggedSleepDaysCount > 0 ? Number((totalSleep / loggedSleepDaysCount).toFixed(1)) : 0;
  const optimalSleepDaysCount = weekSleepDays.filter((d) => d.hours >= 7 && d.hours <= 9).length;
  const sleepOptimal = totalSleep >= 49 && totalSleep <= 63;

  const handleSelectSleepDate = (isoDate) => {
    if (!isoDate) return;
    setSelectedSleepDate(isoDate);
    const existing = sleepLogs[isoDate];
    setSleepHoursInput(existing ? String(existing.hours) : '');
    setSleepNoteInput(existing?.note || '');
  };
  const currentEx1RM = getEffectiveExercise1RM(selectedExercise, liftWeightInput, liftRepsInput, profile.weightKg);
  const currentExRatio = (currentEx1RM / gradeData.bw).toFixed(2);

  // ==========================================================================
  // PANTALLA 1: ENCUESTA ÚNICA DE DESPERTAR (TODO PARTE DESDE 0)
  // ==========================================================================
  if (!awakened) {
    return (
      <div className="sys-container" style={{ maxWidth: '580px', paddingTop: '24px' }}>
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
                <div style={{ margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <img src={profile.censoredPreview} alt="Escaneo seguro" style={{ width: '130px', borderRadius: '10px', border: '1px solid #fbbf24' }} />
                  <div style={{ fontSize: '11px', color: '#10b981' }}>✓ Biometría verificada y protegida</div>
                  {profile.photoDna && (
                    <div
                      style={{
                        padding: '8px 12px',
                        borderRadius: '10px',
                        background: 'rgba(0, 234, 255, 0.08)',
                        border: '1px solid rgba(0, 234, 255, 0.35)',
                        fontSize: '11px',
                        color: '#e2e8f0',
                      }}
                    >
                      <div style={{ color: '#00eaff', fontWeight: 700, marginBottom: '4px' }}>
                        Rasgos extraídos para tu Avatar 3D ({profile.photoDna.silhouetteTag})
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        {[
                          { k: 'Piel', hex: profile.photoDna.skinTone },
                          { k: 'Cabello', hex: profile.photoDna.hairColor },
                          { k: 'Armadura', hex: profile.photoDna.armorColor },
                          { k: 'Aura', hex: profile.photoDna.auraColor },
                        ].map((sw) => (
                          <span key={sw.k} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: sw.hex, border: '1px solid #fff', display: 'inline-block' }} />
                            {sw.k}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
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

  const handleQuickAddDailySteps = (addedSteps) => {
    const inc = Math.max(0, Math.round(Number(addedSteps) || 0));
    if (inc <= 0) return;

    const todayKey = getLocalDateISO();
    const prevDay = activityLogs[todayKey] || {
      steps: 0,
      walkRunKm: 0,
      bikeKm: 0,
      calories: 0,
      sessions: [],
      stepGoalClaimed: false,
      bikeGoalClaimed: false,
    };

    const heightM = (Number(profile.heightCm) || 176) / 100;
    const addedKm = Number(((inc * heightM * 0.415) / 1000).toFixed(2));
    const kcal = Math.max(1, Math.round(3.8 * (Number(profile.weightKg) || 75) * (inc / 6500)));

    const nextSteps = (prevDay.steps || 0) + inc;
    const nextWalkRunKm = Number(((prevDay.walkRunKm || 0) + addedKm).toFixed(2));

    let gainedExp = Math.max(3, Math.floor(inc / 1000) * 10 || 4);
    let gainedLp = Math.max(2, Math.floor(inc / 1000) * 5 || 2);
    let claimedStepBonus = Boolean(prevDay.stepGoalClaimed);
    let bonusNote = '';

    if (!claimedStepBonus && nextSteps >= dailyStepGoal) {
      claimedStepBonus = true;
      gainedExp += 40;
      gainedLp += 20;
      bonusNote = ` • ¡Meta de ${dailyStepGoal.toLocaleString()} pasos cumplida (+40 EXP / +20 LP)!`;
    }

    const quickSession = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: 'walk',
      modeLabel: 'Carga rápida pasos',
      steps: inc,
      distanceKm: addedKm,
      durationSec: Math.round((inc / 100) * 60),
      calories: kcal,
      source: 'Acceso rápido HUD',
      exp: gainedExp,
      lp: gainedLp,
    };

    setActivityLogs({
      ...activityLogs,
      [todayKey]: {
        ...prevDay,
        steps: nextSteps,
        walkRunKm: nextWalkRunKm,
        calories: (prevDay.calories || 0) + kcal,
        sessions: [quickSession, ...(prevDay.sessions || [])].slice(0, 25),
        stepGoalClaimed: claimedStepBonus,
      },
    });
    setExp((prev) => prev + gainedExp);
    setLp((prev) => prev + gainedLp);
    triggerToast(
      `[PASOS +${inc.toLocaleString()}] Total hoy: ${nextSteps.toLocaleString()} pasos (+${gainedExp} EXP / +${gainedLp} LP)${bonusNote}`
    );
  };

  const handleCompleteTodayTrainingFromAgenda = () => {
    const todayQuest = quests.find(
      (q) => q.isDaily && q.title.toLowerCase().includes('entrenar hoy') && q.status !== 'completed'
    );
    if (todayQuest) {
      setQuests((prev) =>
        prev.map((item) => (item.id === todayQuest.id ? { ...item, status: 'completed' } : item))
      );
      setExp((prev) => prev + (todayQuest.exp || 100));
      setLp((prev) => prev + (todayQuest.lp || 50));
      setStreak((s) => s + 1);
      triggerToast(`¡MISIÓN DIARIA COMPLETADA! "${todayQuest.title}" (+${todayQuest.exp || 100} EXP • +${todayQuest.lp || 50} LP)`);
    } else {
      setExp((prev) => prev + 100);
      setLp((prev) => prev + 50);
      triggerToast('¡ENTRENAMIENTO DE AGENDA REGISTRADO! +100 EXP • +50 LP');
    }
  };

  // ==========================================================================
  // INTERFAZ PRINCIPAL DEL SISTEMA (ANIME FANTASY RPG HUD)
  // ==========================================================================
  return (
    <div className="sys-container">
      <ExerciseAnimationModal exercise={animModalEx} onClose={() => setAnimModalEx(null)} />

      {toast && (
        <div className="toast-alert">
          <Zap size={18} color="#fbbf24" />
          <span>{toast}</span>
        </div>
      )}

      {/* ====================================================================
          MENÚ LATERAL DESPLEGABLE (DRAWER OCULTO EN ESQUINA SUPERIOR IZQUIERDA)
         ==================================================================== */}
      {drawerOpen && (
        <>
          <div className="pex-drawer-backdrop" onClick={() => setDrawerOpen(false)} />
          <aside className="pex-drawer-panel" aria-label="Menú principal del sistema">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <div className="font-souls neon-glow-gold" style={{ fontSize: '16px', fontWeight: 900, color: 'var(--neon-gold)' }}>
                  PROYECTO EX
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  {profile.hunterName} ({profile.hunterCode})
                </div>
                <div style={{ marginTop: '4px' }}>
                  <span
                    className="sys-badge"
                    style={{
                      background: 'rgba(5, 8, 23, 0.9)',
                      color: rankInfo.color,
                      border: `1px solid ${rankInfo.color}`,
                      fontSize: '10px',
                      padding: '2px 8px'
                    }}
                  >
                    {rankInfo.label.toUpperCase()} ({rankInfo.currentDivLP}/100 LP)
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                style={{
                  background: 'rgba(16, 27, 56, 0.9)',
                  border: '1px solid rgba(var(--neon-primary-rgb), 0.4)',
                  color: 'var(--text-main)',
                  borderRadius: '10px',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ fontSize: '10px', fontFamily: 'Orbitron, sans-serif', color: 'var(--neon-blue)', margin: '6px 0 6px 4px', letterSpacing: '0.1em' }}>
              PRINCIPAL
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <button
                type="button"
                className={`pex-drawer-item ${activeTab === 'avatar' ? 'active' : ''}`}
                onClick={() => { setActiveTab('avatar'); setDrawerOpen(false); }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sword size={17} color="var(--neon-blue)" /> Cazador (Portada)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--neon-gold)' }}>NV.{level}</span>
              </button>

              <button
                type="button"
                className={`pex-drawer-item ${activeTab === 'quests' ? 'active' : ''}`}
                onClick={() => { setActiveTab('quests'); setDrawerOpen(false); }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Trophy size={17} color="var(--neon-gold)" /> Misiones & Historial
                </span>
                <span style={{ fontSize: '11px', color: 'var(--neon-blue)' }}>
                  {quests.filter((q) => q.status === 'pending').length} pend.
                </span>
              </button>
            </div>

            <div style={{ fontSize: '10px', fontFamily: 'Orbitron, sans-serif', color: 'var(--neon-blue)', margin: '6px 0 6px 4px', letterSpacing: '0.1em' }}>
              ENTRENAMIENTO & ACTIVIDAD
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <button
                type="button"
                className={`pex-drawer-item ${activeTab === 'routines' ? 'active' : ''}`}
                onClick={() => { setActiveTab('routines'); setDrawerOpen(false); }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Cpu size={17} color="#10b981" /> Rutina & Agenda
                </span>
              </button>

              <button
                type="button"
                className={`pex-drawer-item ${activeTab === 'tracker' ? 'active' : ''}`}
                onClick={() => { setActiveTab('tracker'); setDrawerOpen(false); }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Footprints size={17} color="var(--neon-blue)" /> Rastreador GPS & Pasos
                </span>
                <span style={{ fontSize: '11px', color: tracker.isRunning ? '#10b981' : 'var(--text-secondary)' }}>
                  {tracker.isRunning ? '● ACTIVO' : `${(activityLogs[getLocalDateISO()]?.steps || 0).toLocaleString()}`}
                </span>
              </button>

              <button
                type="button"
                className={`pex-drawer-item ${activeTab === 'strength' ? 'active' : ''}`}
                onClick={() => { setActiveTab('strength'); setDrawerOpen(false); }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Dumbbell size={17} color="#f43f5e" /> Cargas & Marcas 1RM
                </span>
              </button>

              <button
                type="button"
                className={`pex-drawer-item ${activeTab === 'sleep' ? 'active' : ''}`}
                onClick={() => { setActiveTab('sleep'); setDrawerOpen(false); }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Moon size={17} color="#38bdf8" /> Descanso & Sueño
                </span>
                <span style={{ fontSize: '11px', color: '#38bdf8' }}>{totalSleep}h</span>
              </button>
            </div>

            <div style={{ fontSize: '10px', fontFamily: 'Orbitron, sans-serif', color: 'var(--neon-blue)', margin: '6px 0 6px 4px', letterSpacing: '0.1em' }}>
              MODOS DE JUEGO
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <button
                type="button"
                className={`pex-drawer-item ${activeTab === 'pve' ? 'active' : ''}`}
                onClick={() => { setActiveTab('pve'); setDrawerOpen(false); }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BookOpen size={17} color="#f59e0b" /> Historia PvE
                </span>
              </button>

              <button
                type="button"
                className={`pex-drawer-item ${activeTab === 'city_vn' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('city_vn');
                  setDrawerOpen(false);
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Heart size={17} color="#fb7185" />
                  Ciudad & Novela Visual
                </span>
                <span style={{ fontSize: '11px', color: '#fb7185' }}>
                  {unlockedCharacters.length}/{STORY_CHARACTERS.length}
                </span>
              </button>

              <button
                type="button"
                className={`pex-drawer-item ${activeTab === 'pvp' ? 'active' : ''}`}
                onClick={() => { setActiveTab('pvp'); setDrawerOpen(false); }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Users size={17} color="#f43f5e" /> Arena PvP
                </span>
              </button>
            </div>

            <div style={{ fontSize: '10px', fontFamily: 'Orbitron, sans-serif', color: 'var(--neon-blue)', margin: '6px 0 6px 4px', letterSpacing: '0.1em' }}>
              SISTEMA
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              <button
                type="button"
                className={`pex-drawer-item ${activeTab === 'vault' ? 'active' : ''}`}
                onClick={() => { setActiveTab('vault'); setDrawerOpen(false); }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Shield size={17} color="var(--neon-purple)" /> Bóveda Física
                </span>
              </button>

              <button
                type="button"
                className={`pex-drawer-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => { setActiveTab('settings'); setDrawerOpen(false); }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Settings size={17} color="var(--neon-gold)" /> Ajustes & Colores Neón
                </span>
              </button>
            </div>

            <div
              style={{
                marginTop: 'auto',
                padding: '10px 12px',
                borderRadius: '12px',
                background: 'rgba(10, 15, 30, 0.9)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontSize: '11px',
                color: '#cbd5e1',
              }}
            >
              <div style={{ color: '#10b981', fontWeight: 700, marginBottom: '2px' }}>
                ● SESIÓN PERMANENTE ACTIVA
              </div>
              <div style={{ wordBreak: 'break-all', color: '#94a3b8' }}>{currentUser.email}</div>
            </div>
          </aside>
        </>
      )}

      {/* ====================================================================
          CABECERA LIMPIA Y CENTRADA (BOTÓN MENÚ EN ESQUINA SUPERIOR IZQUIERDA)
         ==================================================================== */}
      <div className="pex-home-shell" style={{ marginBottom: '14px' }}>
        <div className="pex-topbar">
          <button
            type="button"
            className="pex-menu-trigger"
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={20} color="var(--neon-blue)" />
            <span>MENÚ</span>
            {tracker.isRunning && (
              <span
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 8px #10b981',
                }}
              />
            )}
          </button>

          <h1
            className="font-souls neon-glow-gold"
            style={{
              fontSize: '23px',
              fontWeight: 900,
              color: 'var(--neon-gold)',
              letterSpacing: '0.12em',
              textAlign: 'center',
            }}
          >
            PROYECTO EX
          </h1>

          {activeTab !== 'avatar' && (
            <button
              type="button"
              onClick={() => setActiveTab('avatar')}
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(16, 27, 56, 0.9)',
                border: '1px solid rgba(var(--neon-primary-rgb), 0.45)',
                color: 'var(--neon-blue)',
                borderRadius: '10px',
                padding: '6px 9px',
                fontSize: '10px',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              INICIO
            </button>
          )}
        </div>

        {/* SUBTÍTULO DE NIVEL + BARRAS COMPACTAS LP Y EXP + RACHA / PC */}
        <div style={{ padding: '0 6px' }}>
          <div
            className="font-hud"
            style={{
              textAlign: 'center',
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--text-main)',
              letterSpacing: '0.1em',
              marginBottom: '10px',
            }}
          >
            NIVEL {level} • {profile.hunterName} ({hunterGrade})
          </div>

          {/* INDICADOR VISIBLE DE RANGO ACTUAL Y SUS 6 CAPAS */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '6px',
              padding: '7px 10px',
              marginBottom: '8px',
              borderRadius: '11px',
              background: 'rgba(11, 21, 48, 0.88)',
              border: `1px solid ${rankInfo.color}`,
              boxShadow: '0 0 14px rgba(0, 0, 0, 0.55)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Crown size={15} color={rankInfo.color} />
              <span className="font-hud" style={{ fontSize: '11px', fontWeight: 800, color: rankInfo.color }}>
                RANGO {rankInfo.name.toUpperCase()} • CAPA {rankInfo.division}/6
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} title="Progreso de las 6 Capas del Rango Actual">
              {rankInfo.layers.map((lyr) => (
                <span
                  key={lyr.layerNum}
                  style={{
                    padding: '1px 5px',
                    borderRadius: '5px',
                    fontSize: '9px',
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 800,
                    background:
                      lyr.status === 'completed'
                        ? rankInfo.color
                        : lyr.status === 'current'
                        ? 'rgba(255, 212, 90, 0.22)'
                        : 'rgba(5, 8, 23, 0.8)',
                    color:
                      lyr.status === 'completed'
                        ? '#050817'
                        : lyr.status === 'current'
                        ? '#ffd45a'
                        : '#64748b',
                    border:
                      lyr.status === 'current'
                        ? '1px solid #ffd45a'
                        : '1px solid rgba(148, 163, 184, 0.25)'
                  }}
                >
                  C{lyr.layerNum}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '36px 1fr auto', alignItems: 'center', gap: '8px' }}>
              <span className="font-hud" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                LP
              </span>
              <div
                className="progress-track"
                title={`${rankInfo.label.toUpperCase()} (${rankInfo.totalLP} LP • ${rankInfo.currentDivLP}/100 LP)`}
                style={{ height: '9px', borderColor: 'rgba(244, 63, 94, 0.4)' }}
              >
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.max(4, rankInfo.currentDivLP)}%`,
                    background: 'linear-gradient(90deg, #991b1b, #ef4444, #f97316)',
                    boxShadow: '0 0 10px rgba(239, 68, 68, 0.65)',
                  }}
                />
              </div>
              <span className="font-hud" style={{ fontSize: '10px', fontWeight: 700, color: '#ffd45a', whiteSpace: 'nowrap' }}>
                {rankInfo.currentDivLP}/100 LP
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '36px 1fr', alignItems: 'center', gap: '8px' }}>
              <span className="font-hud" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                EXP
              </span>
              <div
                className="progress-track"
                title={`Experiencia de Nivel: ${expInLevel}/100 EXP`}
                style={{ height: '9px', borderColor: 'rgba(var(--neon-primary-rgb), 0.4)' }}
              >
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.max(4, expInLevel)}%`,
                    background: 'linear-gradient(90deg, rgba(var(--neon-primary-rgb), 0.55), var(--neon-blue))',
                    boxShadow: '0 0 12px rgba(var(--neon-primary-rgb), 0.75)',
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '9px',
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--text-main)',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              Racha: <strong>{streak}</strong> <Flame size={15} color="#f97316" fill="#f97316" />
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              PC: <strong style={{ color: 'var(--text-main)' }}>{hunterCombatPower.toLocaleString('es-AR')}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* ====================================================================
          PANTALLA PRINCIPAL EQUILIBRADA: AVATAR MEDIO CUERPO + HABILIDADES/EQUIPO + MISIONES DIARIAS
         ==================================================================== */}
      {activeTab === 'avatar' && (() => {
        const clsObj = hunterClass?.cls || {
          name: 'Centinela Infinito',
          passiveName: 'Muralla Inquebrantable',
          passiveDesc: 'Reduce a la mitad el desgaste y otorga +40 de defensa base.',
        };

        const innatePassiveSlot = {
          id: 'innate_passive',
          name: clsObj.passiveName || 'Pasiva Única',
          type: 'Habilidad Pasiva',
          desc: clsObj.passiveDesc || 'Pasiva de clase despertada.',
          power: passiveClassBonus,
          rarity: 'primary',
        };

        const combinedSlots = [innatePassiveSlot, ...unlockedInventory].slice(0, 10);
        const totalSlotBoxes = Array.from({ length: 10 }, (_, idx) => combinedSlots[idx] || null);
        const activeSlotItem = totalSlotBoxes[selectedSlotIdx] || null;

        const renderSlotIcon = (item, idx) => {
          if (!item) return null;
          const lower = `${item.type || ''} ${item.name || ''}`.toLowerCase();
          if (idx === 0 || lower.includes('pasiva') || lower.includes('aura')) {
            return <Sparkles size={22} color="var(--neon-blue)" />;
          }
          if (lower.includes('espada') || lower.includes('filo') || lower.includes('daga') || lower.includes('arma')) {
            return <Sword size={22} color="#34d399" />;
          }
          if (lower.includes('escudo') || lower.includes('armadura') || lower.includes('cota') || lower.includes('muralla')) {
            return <Shield size={22} color="var(--neon-blue)" />;
          }
          if (lower.includes('anillo') || lower.includes('amuleto') || lower.includes('reliquia') || lower.includes('gema')) {
            return <Gem size={22} color="var(--neon-purple)" />;
          }
          if (lower.includes('fuego') || lower.includes('llama') || lower.includes('ira')) {
            return <Flame size={22} color="var(--neon-gold)" />;
          }
          return <Zap size={22} color="var(--neon-blue)" />;
        };

        const getSlotColors = (item, idx) => {
          if (!item) return {};
          if (idx === 0 || (item.type || '').toLowerCase().includes('habilidad')) {
            return {
              '--slot-border': 'var(--neon-blue)',
              '--slot-glow': 'rgba(var(--neon-primary-rgb), 0.36)',
              '--slot-inner': 'rgba(var(--neon-primary-rgb), 0.16)',
            };
          }
          if ((item.power || 0) >= 60 || (item.type || '').toLowerCase().includes('reliquia')) {
            return {
              '--slot-border': 'var(--neon-purple)',
              '--slot-glow': 'rgba(var(--neon-secondary-rgb), 0.42)',
              '--slot-inner': 'rgba(var(--neon-secondary-rgb), 0.18)',
            };
          }
          return {
            '--slot-border': '#10b981',
            '--slot-glow': 'rgba(16, 185, 129, 0.36)',
            '--slot-inner': 'rgba(16, 185, 129, 0.16)',
          };
        };

        const homeQuests = quests.slice(0, 5);

        return (
          <div className="pex-home-shell">
            {/* 1. AVATAR DE MEDIO CUERPO CON CINTAS DE CLASE Y PASIVA */}
            <JrpgFantasyPortrait
              hunterClass={hunterClass}
              hunterGrade={hunterGrade}
              gradeData={gradeData}
              level={level}
              streak={streak}
              cityName={cityName}
              completedChaptersCount={completedChapters.length}
              profile={profile}
              classEvolution={classEvolution}
              gender={profile.gender || 'male'}
              onToggleGender={() => setProfile((p) => ({ ...p, gender: p.gender === 'female' ? 'male' : 'female' }))}
              onUploadPhotoForAvatar={(e) => handleSecurePhotoUpload(e, 'avatar_sync')}
              passiveClassBonus={passiveClassBonus}
              unlockedInventory={unlockedInventory}
              neonTheme={neonTheme}
            />

            {/* PANEL ORNAMENTADO: RANGO ACTUAL, 6 CAPAS Y REQUERIMIENTOS DE SUBIDA */}
            <div className="pex-ornate-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={17} color={rankInfo.color} />
                  <span className="font-hud" style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.08em' }}>
                    RANGO ACTUAL Y 6 CAPAS
                  </span>
                </div>
                <span
                  className="sys-badge"
                  style={{
                    background: 'rgba(5, 8, 23, 0.92)',
                    color: rankInfo.color,
                    border: `1px solid ${rankInfo.color}`,
                    fontSize: '11px'
                  }}
                >
                  {rankInfo.name.toUpperCase()} • CAPA {rankInfo.division} ({rankInfo.totalLP} LP)
                </span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '8px',
                  marginBottom: '12px'
                }}
              >
                <div style={{ padding: '10px', borderRadius: '11px', background: 'rgba(5, 8, 23, 0.88)', border: '1px solid rgba(0, 234, 255, 0.3)' }}>
                  <div style={{ fontSize: '10px', fontFamily: 'Orbitron, sans-serif', color: 'var(--neon-blue)', fontWeight: 700 }}>
                    SIGUIENTE CAPA: {rankInfo.nextLayerLabel.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '13px', color: '#fff', fontWeight: 700, marginTop: '3px' }}>
                    {rankInfo.lpToNextLayer > 0
                      ? `Faltan ${rankInfo.lpToNextLayer} LP (Meta: ${rankInfo.nextLayerTargetLP} LP)`
                      : '¡Cúspide Challenger 1 Alcanzada!'}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Progreso de capa actual: {rankInfo.currentDivLP}/100 LP
                  </div>
                </div>
                <div style={{ padding: '10px', borderRadius: '11px', background: 'rgba(5, 8, 23, 0.88)', border: '1px solid rgba(255, 212, 90, 0.35)' }}>
                  <div style={{ fontSize: '10px', fontFamily: 'Orbitron, sans-serif', color: 'var(--neon-gold)', fontWeight: 700 }}>
                    ASCENSO DE RANGO: {rankInfo.nextRank ? rankInfo.nextRank.name.toUpperCase() : 'MÁXIMO'}
                  </div>
                  <div style={{ fontSize: '13px', color: '#fff', fontWeight: 700, marginTop: '3px' }}>
                    {rankInfo.nextRank
                      ? `Faltan ${rankInfo.lpToNextRank} LP (Meta: ${rankInfo.nextRankRequiredLP} LP)`
                      : 'Has conquistado los 15 Rangos'}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Avance en {rankInfo.name}: {rankInfo.lpInCurrentRank}/600 LP ({rankInfo.rankProgressPct}%)
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '10px', fontFamily: 'Orbitron, sans-serif', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                DESGLOSE DE LAS 6 CAPAS DE {rankInfo.name.toUpperCase()} (100 LP POR CAPA):
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '7px', marginBottom: '10px' }}>
                {rankInfo.layers.map((lyr) => {
                  const isCurrent = lyr.status === 'current';
                  const isCompleted = lyr.status === 'completed';
                  return (
                    <div
                      key={lyr.layerNum}
                      style={{
                        padding: '8px',
                        borderRadius: '10px',
                        background: isCurrent
                          ? 'rgba(255, 212, 90, 0.14)'
                          : isCompleted
                          ? 'rgba(16, 185, 129, 0.14)'
                          : 'rgba(5, 8, 23, 0.82)',
                        border: isCurrent
                          ? '1.5px solid #ffd45a'
                          : isCompleted
                          ? '1px solid #10b981'
                          : '1px solid rgba(148, 163, 184, 0.2)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="font-hud" style={{ fontSize: '10px', fontWeight: 800, color: isCurrent ? '#ffd45a' : isCompleted ? '#6ee7b7' : '#94a3b8' }}>
                          CAPA {lyr.layerNum}
                        </span>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: isCurrent ? '#ffd45a' : isCompleted ? '#6ee7b7' : '#64748b' }}>
                          {isCompleted ? '✓ OK' : isCurrent ? 'ACTIVA' : 'BLOQ.'}
                        </span>
                      </div>
                      <div style={{ fontSize: '10px', color: '#cbd5e1', marginTop: '3px' }}>
                        {lyr.minLP}–{lyr.maxLP} LP
                      </div>
                      <div className="progress-track" style={{ height: '5px', marginTop: '4px' }}>
                        <div
                          className="progress-fill"
                          style={{
                            width: `${lyr.lpInLayer}%`,
                            background: isCompleted ? '#10b981' : isCurrent ? '#ffd45a' : 'transparent'
                          }}
                        />
                      </div>
                      <div style={{ fontSize: '9px', color: isCurrent ? '#fde047' : '#94a3b8', marginTop: '3px' }}>
                        {isCompleted ? 'Superada' : isCurrent ? `Faltan ${lyr.lpMissing} LP` : `Req: ${lyr.minLP} LP`}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Gana LP: <strong style={{ color: '#fff' }}>Misiones (+25..50)</strong> • <strong style={{ color: '#fff' }}>Cargas (+15+)</strong> • <strong style={{ color: '#fff' }}>Historia/PvP (+25..160)</strong>
                </span>
                <button
                  type="button"
                  className="rpg-button"
                  style={{ padding: '5px 10px', fontSize: '9px' }}
                  onClick={() => setShowAllRanksLadder((v) => !v)}
                >
                  {showAllRanksLadder ? 'Ocultar 15 Rangos' : 'Ver 15 Rangos (Tierra → Challenger)'}
                </button>
              </div>
              {showAllRanksLadder && (
                <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '6px' }}>
                  {RANKS.map((rk) => {
                    const start = rk.tier * 600;
                    const end = start + 599;
                    const isHere = rankInfo.tier === rk.tier;
                    const isPassed = rankInfo.tier > rk.tier;
                    return (
                      <div
                        key={rk.name}
                        style={{
                          padding: '7px 9px',
                          borderRadius: '9px',
                          background: isHere ? 'rgba(255, 212, 90, 0.16)' : 'rgba(5, 8, 23, 0.85)',
                          border: `1px solid ${isHere ? '#ffd45a' : isPassed ? '#10b981' : 'rgba(148,163,184,0.2)'}`,
                          fontSize: '11px'
                        }}
                      >
                        <div style={{ fontWeight: 800, color: rk.color }}>
                          {rk.tier + 1}. {rk.name} {isHere ? '★' : isPassed ? '✓' : ''}
                        </div>
                        <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                          6 Capas • {start}–{rk.tier === 14 ? '8999+' : end} LP
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* 2. PANEL ORNAMENTADO DE HABILIDADES Y EQUIPAMIENTO (2 FILAS x 5 RANURAS) */}
            <div className="pex-ornate-panel">
              <div
                className="font-hud"
                style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  letterSpacing: '0.12em',
                  marginBottom: '12px',
                }}
              >
                HABILIDADES Y EQUIPAMIENTO
              </div>

              <div className="pex-equip-grid">
                {totalSlotBoxes.map((item, idx) => {
                  const isUnlocked = Boolean(item);
                  const isSelected = selectedSlotIdx === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSlotIdx(idx)}
                      title={item ? `${item.name} (+${item.power} PWR)` : `Ranura ${idx + 1} vacía`}
                      className={`pex-equip-slot ${isUnlocked ? 'unlocked' : ''} ${isSelected ? 'selected' : ''}`}
                      style={getSlotColors(item, idx)}
                    >
                      {renderSlotIcon(item, idx)}
                    </button>
                  );
                })}
              </div>

              {/* INSPECTOR DE LA RANURA SELECCIONADA */}
              <div
                style={{
                  marginTop: '12px',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  background: 'rgba(5, 8, 22, 0.82)',
                  border: '1px solid rgba(var(--neon-primary-rgb), 0.22)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                {activeSlotItem ? (
                  <>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>
                          {activeSlotItem.name}
                        </span>
                        <span
                          style={{
                            fontSize: '9px',
                            fontFamily: 'Orbitron, sans-serif',
                            padding: '2px 6px',
                            borderRadius: '999px',
                            background: 'rgba(var(--neon-primary-rgb), 0.14)',
                            color: 'var(--neon-blue)',
                            border: '1px solid rgba(var(--neon-primary-rgb), 0.35)',
                          }}
                        >
                          {activeSlotItem.type}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {activeSlotItem.desc}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <div
                        className="font-hud"
                        style={{ fontSize: '12px', fontWeight: 800, color: '#10b981', whiteSpace: 'nowrap' }}
                      >
                        +{activeSlotItem.power} PWR
                      </div>
                      {selectedSlotIdx > 1 && activeSlotItem.id !== 'innate_passive' && (
                        <button
                          type="button"
                          onClick={() => {
                            setUnlockedInventory((prev) => [
                              activeSlotItem,
                              ...prev.filter((it) => it.id !== activeSlotItem.id),
                            ]);
                            setSelectedSlotIdx(1);
                            triggerToast(`Equipado en ranura principal: ${activeSlotItem.name}`);
                          }}
                          style={{
                            padding: '3px 8px',
                            borderRadius: '7px',
                            fontSize: '10px',
                            fontWeight: 700,
                            background: 'rgba(0, 234, 255, 0.16)',
                            border: '1px solid rgba(0, 234, 255, 0.45)',
                            color: 'var(--neon-blue)',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Equipar Principal
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Ranura #{selectedSlotIdx + 1} disponible • Completa misiones diarias o capítulos de Historia PvE para desbloquear equipo y habilidades.
                  </div>
                )}
              </div>
            </div>

            {/* 3. PANEL DE MISIONES DIARIAS EN PORTADA */}
            <div className="pex-ornate-panel">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                  padding: '0 4px',
                }}
              >
                <span
                  className="font-hud"
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: 'var(--neon-gold)',
                    letterSpacing: '0.1em',
                  }}
                >
                  MISIONES DIARIAS
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('quests')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--neon-blue)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Gestionar ({quests.length}) →
                </button>
              </div>

              {homeQuests.length === 0 ? (
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center', padding: '8px 0' }}>
                  No hay misiones activas. Toca "Gestionar" para crear una nueva.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 4px' }}>
                  {homeQuests.map((q) => {
                    const isCompleted = q.status === 'completed';
                    const isFailed = q.status === 'failed';
                    return (
                      <div
                        key={q.id}
                        onClick={() => {
                          if (isCompleted || isFailed) return;
                          setQuests(quests.map((item) => (item.id === q.id ? { ...item, status: 'completed' } : item)));
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
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px',
                          cursor: isCompleted || isFailed ? 'default' : 'pointer',
                          padding: '4px 2px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '11px', minWidth: 0 }}>
                          <div className={`pex-quest-checkbox ${isCompleted ? 'checked' : ''}`}>
                            {isCompleted && <Check size={14} color="var(--neon-blue)" strokeWidth={3} />}
                            {isFailed && <X size={14} color="#f43f5e" strokeWidth={3} />}
                          </div>
                          <span
                            style={{
                              fontSize: '15px',
                              fontWeight: 600,
                              color: isCompleted ? 'var(--text-secondary)' : 'var(--text-main)',
                              textDecoration: isCompleted ? 'line-through' : 'none',
                              opacity: isCompleted ? 0.78 : 1,
                            }}
                          >
                            {q.title}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: '11px',
                            color: isCompleted ? '#10b981' : 'var(--neon-blue)',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {isCompleted ? '✓ Lista' : `+${q.exp || 85} EXP`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ====================================================================
          MÓDULO DEDICADO: RASTREADOR DE PASOS, GPS Y ACTIVIDAD DIARIA (DESDE MENÚ)
         ==================================================================== */}
      {activeTab === 'tracker' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <IntegratedStepCounterPanel
            todaySteps={activityLogs[getLocalDateISO()]?.steps || 0}
            stepGoal={dailyStepGoal}
            onChangeStepGoal={(nextGoal) => {
              setDailyStepGoal(nextGoal);
              triggerToast(`[PASOS] Meta diaria actualizada a ${nextGoal.toLocaleString('es-AR')} pasos.`);
            }}
            stepGoalClaimed={Boolean(activityLogs[getLocalDateISO()]?.stepGoalClaimed)}
            walkRunKm={activityLogs[getLocalDateISO()]?.walkRunKm || 0}
            activityLogs={activityLogs}
            onQuickAddSteps={handleQuickAddDailySteps}
            onResetTodaySteps={() => {
              const todayKey = getLocalDateISO();
              setActivityLogs((prev) => ({
                ...prev,
                [todayKey]: {
                  ...(prev[todayKey] || {}),
                  steps: 0,
                  walkRunKm: 0,
                  stepGoalClaimed: false,
                },
              }));
              triggerToast('[PASOS] Contador de pasos de hoy reiniciado a 0.');
            }}
            onOpenFullTracker={() => setActiveTab('tracker')}
          />

          <MovementTrackerModule
            profile={profile}
            activityLogs={activityLogs}
            setActivityLogs={setActivityLogs}
            tracker={tracker}
            onStartTracker={handleStartTracker}
            onPauseTracker={handlePauseTracker}
            onDiscardTracker={handleDiscardTracker}
            onChangeMode={(newMode) => setTracker((prev) => ({ ...prev, mode: newMode }))}
            onAwardProgress={(gainedExp, gainedLp, toastMsg) => {
              setExp((prev) => prev + gainedExp);
              setLp((prev) => prev + gainedLp);
              triggerToast(toastMsg);
            }}
          />
        </div>
      )}

      {/* ====================================================================
          MÓDULO 1: MISIONES DIARIAS (PROTECCIÓN DIARIA, CUPO 12/12 Y JUSTIFICACIÓN LIBRE)
         ==================================================================== */}
      {activeTab === 'quests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sys-window" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <span className="font-hud" style={{ fontSize: '13px', color: '#fbbf24', fontWeight: 800 }}>
                MISIONES ACTIVAS ({quests.length})
              </span>
              <span
                className="sys-badge"
                style={{
                  background: cancellationsRemaining > 3 ? 'rgba(251, 191, 36, 0.15)' : 'rgba(225, 29, 72, 0.2)',
                  color: cancellationsRemaining > 3 ? '#fde047' : '#fda4af',
                  border: `1px solid ${cancellationsRemaining > 3 ? 'rgba(251, 191, 36, 0.45)' : 'rgba(225, 29, 72, 0.5)'}`,
                }}
              >
                <ShieldAlert size={13} /> ANULACIONES: {cancellationsRemaining}/{CANCELLATION_MAX_QUOTA}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <input
                className="sys-input"
                style={{ flex: '1 1 240px' }}
                placeholder="Declarar misión personal o solicitada (ej. Press Banca 4x8)..."
                value={newQuestTitle}
                onChange={(e) => setNewQuestTitle(e.target.value)}
              />
              <button
                className="sys-btn sys-btn-gold"
                onClick={() => {
                  if (!newQuestTitle.trim()) return;
                  setQuests([
                    {
                      id: Date.now(),
                      title: newQuestTitle.trim(),
                      env: 'Personal',
                      lp: 45,
                      exp: 95,
                      status: 'pending',
                      isDaily: false,
                      tipo: 'usuario',
                      origin: 'usuario',
                      createdAt: Date.now(),
                    },
                    ...quests,
                  ]);
                  setNewQuestTitle('');
                  triggerToast('[SISTEMA] Nueva misión personal creada (anulable con cupo 12/12).');
                }}
              >
                + PERSONAL
              </button>
              <button
                className="sys-btn sys-btn-primary"
                onClick={() => {
                  if (!newQuestTitle.trim()) return;
                  setQuests([
                    {
                      id: Date.now(),
                      title: newQuestTitle.trim(),
                      env: 'Solicitada',
                      lp: 50,
                      exp: 105,
                      status: 'pending',
                      isDaily: false,
                      tipo: 'solicitada',
                      origin: 'solicitada',
                      createdAt: Date.now(),
                    },
                    ...quests,
                  ]);
                  setNewQuestTitle('');
                  triggerToast('[SISTEMA] Misión solicitada asignada (anulable con cupo 12/12).');
                }}
              >
                + SOLICITADA
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quests.map((q) => {
                const esDiaria = q.isDaily === true || q.tipo === 'diaria';
                const estaJustificando = justifyModalId === q.id;
                const tipoLabel = esDiaria
                  ? 'Misión Diaria'
                  : q.tipo === 'solicitada' || q.origin === 'solicitada'
                  ? 'Solicitada'
                  : 'Personal';

                return (
                  <div
                    key={q.id}
                    style={{
                      padding: '15px',
                      borderRadius: '14px',
                      background: 'rgba(6, 10, 24, 0.92)',
                      border: `1px solid ${
                        q.status === 'completed'
                          ? '#10b981'
                          : q.status === 'failed'
                          ? '#e11d48'
                          : q.status === 'justified'
                          ? '#00f0ff'
                          : 'rgba(0, 234, 255, 0.28)'
                      }`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    {/* Cabecera de la tarjeta */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ marginBottom: '5px' }}>
                          <span
                            className="sys-badge"
                            style={{
                              background: esDiaria ? 'rgba(0, 234, 255, 0.14)' : 'rgba(150, 60, 255, 0.18)',
                              color: esDiaria ? '#67e8f9' : '#e9d5ff',
                              border: `1px solid ${esDiaria ? 'rgba(0, 234, 255, 0.4)' : 'rgba(168, 85, 247, 0.45)'}`,
                              fontSize: '10px',
                            }}
                          >
                            {tipoLabel}
                          </span>
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '16px', color: '#fff' }}>{q.title}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                          Recompensa: +{q.lp} LP • +{q.exp || 85} EXP • Cofre de Habilidad/Equipo
                        </div>
                      </div>

                      <span
                        className="sys-badge"
                        style={{
                          background:
                            q.status === 'completed'
                              ? 'rgba(16,185,129,0.2)'
                              : q.status === 'failed'
                              ? 'rgba(225,29,72,0.2)'
                              : q.status === 'justified'
                              ? 'rgba(0,234,255,0.18)'
                              : 'rgba(251,191,36,0.14)',
                          color:
                            q.status === 'completed'
                              ? '#6ee7b7'
                              : q.status === 'failed'
                              ? '#fda4af'
                              : q.status === 'justified'
                              ? '#67e8f9'
                              : '#fde047',
                          border: `1px solid ${
                            q.status === 'completed'
                              ? '#10b981'
                              : q.status === 'failed'
                              ? '#e11d48'
                              : q.status === 'justified'
                              ? '#00f0ff'
                              : 'rgba(251,191,36,0.45)'
                          }`,
                        }}
                      >
                        {q.status === 'completed'
                          ? 'LOGRADA'
                          : q.status === 'failed'
                          ? 'NO LOGRADA'
                          : q.status === 'justified'
                          ? 'JUSTIFICADA'
                          : 'EN CURSO'}
                      </span>
                    </div>

                    {/* Botones de acción principales */}
                    {(q.status === 'pending' || q.status === 'justified') && (
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <button
                          className="sys-btn sys-btn-success"
                          style={{ padding: '8px 12px', fontSize: '11px' }}
                          onClick={() => {
                            setQuests(quests.map((item) => (item.id === q.id ? { ...item, status: 'completed' } : item)));
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
                            setQuests(quests.map((item) => (item.id === q.id ? { ...item, status: 'failed' } : item)));
                            setNextWeekQueue([
                              ...nextWeekQueue,
                              { id: Date.now(), title: `${q.title} (Retoma Semanal)`, lp: q.lp, exp: q.exp || 85 },
                            ]);
                            triggerToast('[ALERTA] Misión fallida. Enviada a Cola de Retoma.');
                          }}
                        >
                          <XCircle size={14} /> NO LOGRADO
                        </button>

                        <button
                          className="sys-btn sys-btn-ghost"
                          style={{ padding: '8px 12px', fontSize: '11px', borderColor: 'rgba(0, 234, 255, 0.45)', color: '#67e8f9' }}
                          onClick={() => {
                            setJustifyModalId(estaJustificando ? null : q.id);
                            setJustifyReason(q.justificationReason || '');
                          }}
                        >
                          <MessageSquareText size={14} /> JUSTIFICAR
                        </button>

                        {!esDiaria ? (
                          <button
                            type="button"
                            disabled={cancellationsRemaining <= 0}
                            className="sys-btn sys-btn-ghost"
                            style={{
                              padding: '8px 12px',
                              fontSize: '11px',
                              borderColor: cancellationsRemaining > 0 ? 'rgba(251, 191, 36, 0.55)' : 'rgba(148, 163, 184, 0.25)',
                              color: cancellationsRemaining > 0 ? '#fde047' : '#64748b',
                              opacity: cancellationsRemaining > 0 ? 1 : 0.55,
                              cursor: cancellationsRemaining > 0 ? 'pointer' : 'not-allowed',
                            }}
                            onClick={() => {
                              if (cancellationsRemaining <= 0) return;
                              const nextQuota = Math.max(0, cancellationsRemaining - 1);
                              setCancellationsRemaining(nextQuota);
                              setQuests((prev) => prev.filter((item) => item.id !== q.id));
                              if (justifyModalId === q.id) {
                                setJustifyModalId(null);
                                setJustifyReason('');
                              }
                              triggerToast(
                                `[MISIÓN ANULADA] Eliminada sin penalizar racha ni enviarla a retoma. Cupo restante: ${nextQuota}/${CANCELLATION_MAX_QUOTA}.`
                              );
                            }}
                          >
                            <Ban size={14} /> {cancellationsRemaining > 0 ? 'ANULAR MISIÓN' : 'SIN CUPO (0/12)'}
                          </button>
                        ) : (
                          <span
                            title="Las misiones diarias no se pueden anular"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '7px 10px',
                              borderRadius: '10px',
                              background: 'rgba(15, 23, 42, 0.65)',
                              border: '1px solid rgba(148, 163, 184, 0.22)',
                              color: '#64748b',
                              fontSize: '11px',
                              fontWeight: 700,
                            }}
                          >
                            <Lock size={13} /> No anulable
                          </span>
                        )}
                      </div>
                    )}

                    {/* Panel inline de Justificación Libre */}
                    {estaJustificando && (
                      <div
                        style={{
                          marginTop: '4px',
                          padding: '12px',
                          borderRadius: '11px',
                          background: 'rgba(5, 8, 23, 0.94)',
                          border: '1px solid rgba(0, 234, 255, 0.45)',
                        }}
                      >
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#00f0ff', marginBottom: '6px', textTransform: 'uppercase' }}>
                          Justificación libre del jugador
                        </label>
                        <textarea
                          className="sys-textarea"
                          rows={3}
                          value={justifyReason}
                          onChange={(e) => setJustifyReason(e.target.value)}
                          placeholder="Escribí el motivo real (ej: salí tarde de cursar en la facu, dormí 4 horas, cerró el gimnasio)..."
                        />
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            className="sys-btn sys-btn-primary"
                            style={{ flex: 1, padding: '8px 12px', fontSize: '10.5px' }}
                            onClick={() => {
                              const cleanReason = justifyReason.trim();
                              if (!cleanReason) {
                                triggerToast('[JUSTIFICACIÓN] Escribí tu motivo antes de registrar.');
                                return;
                              }
                              const consejoObj = generarConsejoTactico(cleanReason, q.title);
                              const historyEntry = {
                                id: `just-${Date.now()}`,
                                misionId: q.id,
                                titulo: q.title,
                                motivo: cleanReason,
                                consejo: consejoObj.advice,
                                fecha: new Date().toLocaleString('es-AR'),
                              };
                              setJustificationHistory((prev) => [historyEntry, ...prev].slice(0, 40));
                              setQuests((prev) =>
                                prev.map((item) =>
                                  item.id === q.id
                                    ? {
                                        ...item,
                                        status: 'justified',
                                        justificationReason: cleanReason,
                                        justificationCategory: consejoObj.category,
                                        justificationBadgeColor: consejoObj.badgeColor,
                                        justificationAdvice: consejoObj.advice,
                                      }
                                    : item
                                )
                              );
                              setNextWeekQueue((prev) => [
                                ...prev,
                                { id: Date.now(), title: `${q.title} (Retoma Justificada)`, lp: q.lp, exp: q.exp || 85 },
                              ]);
                              setJustifyModalId(null);
                              setJustifyReason('');
                              triggerToast('[SISTEMA] Justificación registrada, consejo táctico generado y bloque añadido a Cola de Retoma.');
                            }}
                          >
                            REGISTRAR Y PEDIR CONSEJO
                          </button>
                          <button
                            type="button"
                            className="sys-btn sys-btn-ghost"
                            style={{ padding: '8px 12px', fontSize: '10.5px' }}
                            onClick={() => {
                              setJustifyModalId(null);
                              setJustifyReason('');
                            }}
                          >
                            CANCELAR
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Resultado registrado + Consejo Táctico del Sistema */}
                    {q.justificationReason && (
                      <div
                        style={{
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: 'rgba(0, 234, 255, 0.08)',
                          border: '1px solid rgba(0, 234, 255, 0.35)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                        }}
                      >
                        <div style={{ fontSize: '12px', color: '#e2e8f0' }}>
                          <strong style={{ color: '#00f0ff' }}>Motivo registrado:</strong> {q.justificationReason}
                        </div>
                        {q.justificationAdvice && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              padding: '8px 10px',
                              borderRadius: '8px',
                              background: 'rgba(251, 191, 36, 0.1)',
                              border: '1px solid rgba(251, 191, 36, 0.35)',
                              fontSize: '12px',
                              color: '#fde68a',
                              lineHeight: 1.45,
                            }}
                          >
                            <Sparkles size={15} color="#fbbf24" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <div>
                              <strong style={{ color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                Consejo del Sistema:{' '}
                              </strong>
                              {q.justificationAdvice}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
                      setQuests([
                        {
                          id: Date.now(),
                          title: item.title,
                          env: 'Retoma',
                          lp: item.lp,
                          exp: item.exp || 90,
                          status: 'pending',
                          isDaily: false,
                          tipo: 'usuario',
                          origin: 'usuario',
                        },
                        ...quests,
                      ]);
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
          <DailyGuidedWorkoutChecklist
            days={activeRoutinePlan.days}
            routineDayLogs={routineDayLogs}
            setRoutineDayLogs={setRoutineDayLogs}
            onOpenTechModal={(ex) => setAnimModalEx(ex)}
            onCompleteTodaySession={handleCompleteTodayTrainingFromAgenda}
            triggerToast={triggerToast}
          />
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
            <RoutineDayExplorer
              generatedDays={activeRoutinePlan.days}
              weeklyRoutinePlan={weeklyRoutinePlan}
              routineText=""
              scopeKey="generated"
              logs={routineDayLogs}
              setLogs={setRoutineDayLogs}
              onCreateMission={(payload) => {
                const exists = quests.some((q) => q.routineDate === payload.date && q.title === payload.title);
                if (exists) { triggerToast('[MISIÓN] Ya existe una misión para este entrenamiento.'); return; }
                setQuests((prev) => [{ id: Date.now(), title: payload.title, detail: payload.detail, routineDate: payload.date, env: 'Rutina programada', lp: 40, exp: 80, status: 'pending', isDaily: false, origin: 'custom', createdAt: Date.now() }, ...prev]);
                triggerToast('[MISIÓN] Creada a partir del entrenamiento programado, sin modificar ejercicios.');
              }}
              onCompleteTodayTraining={handleCompleteTodayTrainingFromAgenda}
            />
            </div>
            )}
          </div>


          <div className="sys-window" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
              <h2 className="font-hud" style={{ fontSize: '14px', color: '#00f0ff' }}>
                LECTOR INTERACTIVO DE RUTINAS (WORD, EXCEL, PDF, CSV, TXT Y MÁS)
              </h2>
              {routineFileName && (
                <span className="sys-badge" style={{ background: 'rgba(0,240,255,0.16)', color: '#00f0ff', border: '1px solid #00f0ff' }}>
                  ARCHIVO: {routineFileName}
                </span>
              )}
            </div>

            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>
              Subí tu rutina en <strong>Excel (.xlsx, .xls, .csv, .ods)</strong>, <strong>Word (.docx, .doc, .odt, .rtf)</strong>, <strong>PDF (.pdf)</strong> o texto. Podrás editar celdas, marcar ejercicios completados o enviarlos a tus Misiones, y verás la <strong>crítica constructiva abajo</strong> actualizada al instante.
            </p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <label className="sys-btn sys-btn-gold" style={{ cursor: 'pointer' }}>
                <Upload size={15} /> SUBIR ARCHIVO (WORD / EXCEL / PDF / OTROS)
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.odt,.rtf,.xls,.xlsx,.ods,.csv,.tsv,.txt,.md,.json,.xml,.html,*/*"
                  style={{ display: 'none' }}
                  onChange={handleRoutineFileUpload}
                />
              </label>
              <button
                type="button"
                className="sys-btn sys-btn-primary"
                onClick={() => analyzeRoutineText(customRoutineText, routineFileName || 'Rutina editada')}
              >
                <Scan size={15} /> ANALIZAR / ACTUALIZAR TEXTO
              </button>
              {interactiveRoutineDoc && (
                <button
                  type="button"
                  className="sys-btn sys-btn-ghost"
                  onClick={() => {
                    setInteractiveRoutineDoc(null);
                    setScanReport(null);
                    setRoutineFileName('');
                    setCustomRoutineText('');
                  }}
                >
                  <Trash2 size={14} /> LIMPIAR VISOR
                </button>
              )}
            </div>

            {routineLoadingMsg && (
              <div style={{
                padding: '10px 12px',
                borderRadius: '10px',
                background: 'rgba(0,240,255,0.12)',
                border: '1px solid #00f0ff',
                color: '#00f0ff',
                fontSize: '12px',
                fontWeight: 700,
                marginBottom: '12px'
              }}>
                ⏳ {routineLoadingMsg}
              </div>
            )}

            {!interactiveRoutineDoc && (
              <textarea
                className="sys-textarea"
                rows={4}
                placeholder="O pegá/escribí tu rutina acá (ej: Día 1 - Pecho y Espalda: Press Banca 4x8 @ 80kg RIR 2, Remo con Barra 4x10 RIR 2)..."
                value={customRoutineText}
                onChange={(e) => setCustomRoutineText(e.target.value)}
              />
            )}

            {/* ==============================================================
                1) ESPACIO INTERACTIVO DEL ARCHIVO SUBIDO (ARRIBA)
               ============================================================== */}
            {interactiveRoutineDoc && (
              <div style={{
                marginTop: '12px',
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(5, 8, 23, 0.94)',
                border: '1.5px solid rgba(0, 240, 255, 0.45)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                  <div>
                    <span className="sys-badge" style={{
                      background: interactiveRoutineDoc.fileType === 'spreadsheet' ? 'rgba(16,185,129,0.2)' : 'rgba(150,60,255,0.22)',
                      color: interactiveRoutineDoc.fileType === 'spreadsheet' ? '#6ee7b7' : '#e9d5ff',
                      border: `1px solid ${interactiveRoutineDoc.fileType === 'spreadsheet' ? '#10b981' : '#a855f7'}`
                    }}>
                      {interactiveRoutineDoc.fileType === 'spreadsheet' ? 'PLANILLA DE CÁLCULO INTERACTIVA' : 'DOCUMENTO INTERACTIVO'}
                    </span>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff', marginTop: '4px' }}>
                      {interactiveRoutineDoc.fileName}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className={`sys-btn ${interactiveRoutineDoc.editMode === 'interactive' ? 'sys-btn-primary' : 'sys-btn-ghost'}`}
                      style={{ padding: '6px 10px', fontSize: '10px' }}
                      onClick={() => setInteractiveRoutineDoc({ ...interactiveRoutineDoc, editMode: 'interactive' })}
                    >
                      VISTA INTERACTIVA
                    </button>
                    <button
                      type="button"
                      className={`sys-btn ${interactiveRoutineDoc.editMode === 'raw' ? 'sys-btn-primary' : 'sys-btn-ghost'}`}
                      style={{ padding: '6px 10px', fontSize: '10px' }}
                      onClick={() => setInteractiveRoutineDoc({ ...interactiveRoutineDoc, editMode: 'raw' })}
                    >
                      TEXTO LIBRE
                    </button>
                  </div>
                </div>

                {/* MODO TEXTO LIBRE EDITABLE EN VIVO */}
                {interactiveRoutineDoc.editMode === 'raw' ? (
                  <div>
                    <textarea
                      className="sys-textarea"
                      rows={9}
                      value={customRoutineText}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomRoutineText(val);
                        const rep = evaluateRoutineContent(val, interactiveRoutineDoc.fileName);
                        if (rep) setScanReport(rep);
                      }}
                    />
                    <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="sys-btn sys-btn-gold"
                        style={{ padding: '7px 12px', fontSize: '10px' }}
                        onClick={() => syncInteractiveDocumentLines(buildInteractiveDocLines(customRoutineText), interactiveRoutineDoc.fileName, 'interactive')}
                      >
                        <Check size={13} /> APLICAR CAMBIOS A LA VISTA INTERACTIVA
                      </button>
                    </div>
                  </div>
                ) : interactiveRoutineDoc.fileType === 'spreadsheet' ? (
                  /* VISOR INTERACTIVO TIPO EXCEL / PLANILLA DE CÁLCULO */
                  <div>
                    {/* PESTAÑAS DE HOJAS DE EXCEL */}
                    {interactiveRoutineDoc.sheets.length > 1 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                        {interactiveRoutineDoc.sheets.map((sh, sIdx) => (
                          <button
                            key={`sheet_tab_${sIdx}`}
                            type="button"
                            className={`sys-btn ${interactiveRoutineDoc.activeSheetIdx === sIdx ? 'sys-btn-gold' : 'sys-btn-ghost'}`}
                            style={{ padding: '6px 10px', fontSize: '10px' }}
                            onClick={() => setInteractiveRoutineDoc({ ...interactiveRoutineDoc, activeSheetIdx: sIdx })}
                          >
                            {sh.name}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* BARRA DE HERRAMIENTAS DE PLANILLA */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                      <button
                        type="button"
                        className="sys-btn sys-btn-success"
                        style={{ padding: '6px 10px', fontSize: '10px' }}
                        onClick={() => {
                          const sIdx = interactiveRoutineDoc.activeSheetIdx;
                          const nextSheets = interactiveRoutineDoc.sheets.map((sh, idx) => {
                            if (idx !== sIdx) return sh;
                            const colCount = sh.rows[0]?.length || 3;
                            return { ...sh, rows: [...sh.rows, Array(colCount).fill('')] };
                          });
                          syncInteractiveSpreadsheet(nextSheets, interactiveRoutineDoc.fileName, sIdx, interactiveRoutineDoc.checkedRows);
                        }}
                      >
                        <Plus size={12} /> AGREGAR FILA
                      </button>
                      <button
                        type="button"
                        className="sys-btn sys-btn-ghost"
                        style={{ padding: '6px 10px', fontSize: '10px' }}
                        onClick={() => {
                          const sIdx = interactiveRoutineDoc.activeSheetIdx;
                          const nextSheets = interactiveRoutineDoc.sheets.map((sh, idx) => {
                            if (idx !== sIdx) return sh;
                            return { ...sh, rows: sh.rows.map((r, rI) => [...r, rI === 0 ? 'Notas / RIR' : '']) };
                          });
                          syncInteractiveSpreadsheet(nextSheets, interactiveRoutineDoc.fileName, sIdx, interactiveRoutineDoc.checkedRows);
                        }}
                      >
                        <Plus size={12} /> AGREGAR COLUMNA
                      </button>
                      <button
                        type="button"
                        className="sys-btn sys-btn-ghost"
                        style={{ padding: '6px 10px', fontSize: '10px' }}
                        onClick={() => {
                          const activeSh = interactiveRoutineDoc.sheets[interactiveRoutineDoc.activeSheetIdx];
                          if (!activeSh) return;
                          const csvContent = activeSh.rows
                            .map((r) => r.map((cell) => `"${String(cell || '').replace(/"/g, '""')}"`).join(','))
                            .join('\n');
                          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${activeSh.name || 'rutina_editada'}.csv`;
                          a.click();
                          URL.revokeObjectURL(url);
                          triggerToast('[EXCEL / CSV] Planilla actualizada descargada.');
                        }}
                      >
                        <Save size={12} /> DESCARGAR CSV
                      </button>
                    </div>

                    {/* TABLA EDITABLE CELDA POR CELDA */}
                    {(() => {
                      const sIdx = interactiveRoutineDoc.activeSheetIdx;
                      const currentSheet = interactiveRoutineDoc.sheets[sIdx] || interactiveRoutineDoc.sheets[0];
                      if (!currentSheet) return null;
                      return (
                        <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid rgba(0,240,255,0.28)' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                            <tbody>
                              {currentSheet.rows.map((row, rIdx) => {
                                const rowKey = `${sIdx}_${rIdx}`;
                                const isDone = Boolean(interactiveRoutineDoc.checkedRows?.[rowKey]);
                                const isHeaderRow = rIdx === 0;
                                return (
                                  <tr
                                    key={rowKey}
                                    style={{
                                      background: isHeaderRow
                                        ? 'rgba(0, 234, 255, 0.14)'
                                        : isDone
                                        ? 'rgba(16, 185, 129, 0.14)'
                                        : rIdx % 2 === 0
                                        ? 'rgba(11, 21, 48, 0.65)'
                                        : 'rgba(5, 8, 23, 0.85)',
                                      borderBottom: '1px solid rgba(148, 163, 184, 0.16)'
                                    }}
                                  >
                                    <td style={{ padding: '6px', textAlign: 'center', width: '36px' }}>
                                      {!isHeaderRow && (
                                        <button
                                          type="button"
                                          title="Marcar fila como completada"
                                          onClick={() => {
                                            const nextChecked = {
                                              ...(interactiveRoutineDoc.checkedRows || {}),
                                              [rowKey]: !isDone
                                            };
                                            setInteractiveRoutineDoc({ ...interactiveRoutineDoc, checkedRows: nextChecked });
                                          }}
                                          style={{
                                            width: '22px',
                                            height: '22px',
                                            borderRadius: '6px',
                                            border: `1px solid ${isDone ? '#10b981' : '#64748b'}`,
                                            background: isDone ? '#10b981' : 'transparent',
                                            color: isDone ? '#050817' : '#94a3b8',
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                          }}
                                        >
                                          <Check size={13} />
                                        </button>
                                      )}
                                    </td>
                                    {row.map((cellVal, cIdx) => (
                                      <td key={`${rowKey}_${cIdx}`} style={{ padding: '4px', minWidth: '115px' }}>
                                        <input
                                          type="text"
                                          value={cellVal}
                                          placeholder={isHeaderRow ? `Columna ${cIdx + 1}` : 'Editar celda...'}
                                          onChange={(e) => {
                                            const nextVal = e.target.value;
                                            const nextSheets = interactiveRoutineDoc.sheets.map((sh, idx) => {
                                              if (idx !== sIdx) return sh;
                                              const nextRows = sh.rows.map((r, ri) =>
                                                ri === rIdx ? r.map((c, ci) => (ci === cIdx ? nextVal : c)) : r
                                              );
                                              return { ...sh, rows: nextRows };
                                            });
                                            syncInteractiveSpreadsheet(
                                              nextSheets,
                                              interactiveRoutineDoc.fileName,
                                              sIdx,
                                              interactiveRoutineDoc.checkedRows
                                            );
                                          }}
                                          style={{
                                            width: '100%',
                                            background: 'transparent',
                                            border: '1px solid transparent',
                                            borderRadius: '6px',
                                            padding: '5px 7px',
                                            color: isHeaderRow ? '#fde047' : isDone ? '#6ee7b7' : '#f8fafc',
                                            fontWeight: isHeaderRow ? 800 : 600,
                                            fontSize: '12px',
                                            textDecoration: isDone ? 'line-through' : 'none',
                                            outline: 'none'
                                          }}
                                          onFocus={(e) => { e.target.style.borderColor = '#00eaff'; e.target.style.background = 'rgba(5,8,23,0.9)'; }}
                                          onBlur={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'transparent'; }}
                                        />
                                      </td>
                                    ))}
                                    <td style={{ padding: '4px 6px', whiteSpace: 'nowrap', textAlign: 'right' }}>
                                      {!isHeaderRow && row.some((c) => String(c || '').trim() !== '') && (
                                        <button
                                          type="button"
                                          className="sys-btn sys-btn-ghost"
                                          style={{ padding: '4px 8px', fontSize: '9px' }}
                                          onClick={() => {
                                            const summary = row.filter(Boolean).join(' • ');
                                            setQuests([{ id: Date.now(), title: summary, env: 'Planilla', lp: 40, exp: 85, status: 'pending', isDaily: false, origin: 'custom', createdAt: Date.now() }, ...quests]);
                                            triggerToast(`[MISIONES] "${summary.slice(0, 42)}" enviado a Misiones Diarias.`);
                                          }}
                                        >
                                          + MISIÓN
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  /* VISOR INTERACTIVO DE DOCUMENTO / PDF / WORD / TEXTO */
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                        Completados: <strong style={{ color: '#6ee7b7' }}>{(interactiveRoutineDoc.docLines || []).filter((l) => l.completed).length}</strong> / {(interactiveRoutineDoc.docLines || []).length} bloques
                      </span>
                      <button
                        type="button"
                        className="sys-btn sys-btn-success"
                        style={{ padding: '6px 10px', fontSize: '10px' }}
                        onClick={() => {
                          const nextLines = [
                            ...(interactiveRoutineDoc.docLines || []),
                            {
                              id: `line_${Date.now()}`,
                              text: 'Nuevo ejercicio 3 × 10 • RIR 2 • Descanso 90 seg',
                              completed: false,
                              isHeader: false,
                              isExercise: true
                            }
                          ];
                          syncInteractiveDocumentLines(nextLines, interactiveRoutineDoc.fileName, 'interactive');
                        }}
                      >
                        <Plus size={12} /> AÑADIR LÍNEA / EJERCICIO
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', maxHeight: '360px', overflowY: 'auto', paddingRight: '4px' }}>
                      {(interactiveRoutineDoc.docLines || []).map((item, idx) => (
                        <div
                          key={item.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 10px',
                            borderRadius: '9px',
                            background: item.isHeader
                              ? 'rgba(0, 234, 255, 0.12)'
                              : item.completed
                              ? 'rgba(16, 185, 129, 0.14)'
                              : 'rgba(11, 21, 48, 0.78)',
                            border: `1px solid ${
                              item.isHeader
                                ? 'rgba(0, 234, 255, 0.45)'
                                : item.completed
                                ? '#10b981'
                                : 'rgba(148, 163, 184, 0.2)'
                            }`
                          }}
                        >
                          {!item.isHeader && (
                            <button
                              type="button"
                              onClick={() => {
                                const nextLines = interactiveRoutineDoc.docLines.map((l, i) =>
                                  i === idx ? { ...l, completed: !l.completed } : l
                                );
                                setInteractiveRoutineDoc({ ...interactiveRoutineDoc, docLines: nextLines });
                              }}
                              style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '6px',
                                border: `1px solid ${item.completed ? '#10b981' : '#64748b'}`,
                                background: item.completed ? '#10b981' : 'transparent',
                                color: item.completed ? '#050817' : '#94a3b8',
                                cursor: 'pointer',
                                flexShrink: 0,
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Check size={13} />
                            </button>
                          )}

                          <input
                            type="text"
                            value={item.text}
                            onChange={(e) => {
                              const val = e.target.value;
                              const nextLines = interactiveRoutineDoc.docLines.map((l, i) =>
                                i === idx ? { ...l, text: val } : l
                              );
                              syncInteractiveDocumentLines(nextLines, interactiveRoutineDoc.fileName, 'interactive');
                            }}
                            style={{
                              flex: 1,
                              background: 'transparent',
                              border: 'none',
                              color: item.isHeader ? '#fde047' : item.completed ? '#6ee7b7' : '#f8fafc',
                              fontWeight: item.isHeader ? 800 : 600,
                              fontSize: item.isHeader ? '13px' : '12.5px',
                              textDecoration: item.completed ? 'line-through' : 'none',
                              outline: 'none'
                            }}
                          />

                          {!item.isHeader && (
                            <button
                              type="button"
                              className="sys-btn sys-btn-ghost"
                              style={{ padding: '4px 8px', fontSize: '9px', flexShrink: 0 }}
                              onClick={() => {
                                setQuests([{ id: Date.now(), title: item.text, env: 'Documento', lp: 40, exp: 85, status: 'pending', isDaily: false, origin: 'custom', createdAt: Date.now() }, ...quests]);
                                triggerToast(`[MISIONES] "${item.text.slice(0, 42)}" añadido a Misiones Diarias.`);
                              }}
                            >
                              + MISIÓN
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <RoutineDayExplorer
              generatedDays={[]}
              weeklyRoutinePlan={[]}
              routineText={customRoutineText}
              scopeKey="uploaded"
              logs={routineDayLogs}
              setLogs={setRoutineDayLogs}
              onCreateMission={(payload) => {
                const exists = quests.some((q) => q.routineDate === payload.date && q.title === payload.title);
                if (exists) { triggerToast('[MISIÓN] Ya existe una misión para esta fecha.'); return; }
                setQuests((prev) => [{ id: Date.now(), title: payload.title, detail: payload.detail, routineDate: payload.date, env: 'Rutina importada', lp: 40, exp: 80, status: 'pending', isDaily: false, origin: 'custom', createdAt: Date.now() }, ...prev]);
                triggerToast('[MISIÓN] Creada desde los ejercicios detectados en tu rutina importada.');
              }}
              onCompleteTodayTraining={handleCompleteTodayTrainingFromAgenda}
            />

            {savedRoutineAnalysis && savedRoutineAnalysis.items?.length > 0 && (
              <div
                style={{
                  marginTop: '14px',
                  padding: '15px',
                  borderRadius: '12px',
                  background: 'rgba(5, 8, 23, 0.94)',
                  border: '1.5px solid rgba(16, 185, 129, 0.5)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <div>
                    <div className="font-hud" style={{ fontSize: '13px', fontWeight: 800, color: '#6ee7b7' }}>
                      EJERCICIOS Y CARGAS GUARDADOS EN RUTINA ({savedRoutineAnalysis.items.length})
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      Origen: <strong>{savedRoutineAnalysis.sourceName}</strong> • Guardado: {savedRoutineAnalysis.updatedAt} • En Misiones se generó únicamente la tarjeta diaria <strong>"Entrenar hoy"</strong>.
                    </div>
                  </div>
                </div>
                <div className="grid-2">
                  {savedRoutineAnalysis.items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: '9px 11px',
                        borderRadius: '9px',
                        background: 'rgba(11, 21, 48, 0.82)',
                        border: '1px solid rgba(0, 234, 255, 0.22)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '10px', color: '#00f0ff', fontWeight: 700 }}>{item.day}</div>
                        <div style={{ fontSize: '13px', color: '#fff', fontWeight: 700 }}>{item.name}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                          {item.prescription}{item.notes ? ` • ${item.notes}` : ''}
                        </div>
                      </div>
                      <span
                        className="sys-badge"
                        style={{
                          background: item.load !== 'Sin carga fija' ? 'rgba(251, 191, 36, 0.18)' : 'rgba(148, 163, 184, 0.14)',
                          color: item.load !== 'Sin carga fija' ? '#fde047' : '#cbd5e1',
                          border: `1px solid ${item.load !== 'Sin carga fija' ? 'rgba(251, 191, 36, 0.45)' : 'rgba(148, 163, 184, 0.25)'}`,
                          flexShrink: 0,
                        }}
                      >
                        {item.load}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==============================================================
                2) CRÍTICA CONSTRUCTIVA Y PUNTOS FUERTES (DEBAJO DEL ARCHIVO)
               ============================================================== */}
            {scanReport && (
              <div style={{
                marginTop: '14px',
                padding: '15px',
                borderRadius: '12px',
                background: 'linear-gradient(145deg, rgba(16, 27, 56, 0.92), rgba(5, 8, 23, 0.96))',
                border: '1.5px solid rgba(251, 191, 36, 0.55)',
                fontSize: '13px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div className="font-hud" style={{ fontWeight: 800, color: '#fde047', fontSize: '13px' }}>
                    EVALUACIÓN Y CRÍTICA CONSTRUCTIVA EN VIVO
                  </div>
                  <span className="sys-badge" style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7', border: '1px solid #10b981' }}>
                    {scanReport.score}
                  </span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px' }}>
                  Fuente: <strong>{scanReport.sourceName}</strong> • Esta crítica se actualiza automáticamente cada vez que editás el archivo arriba.
                </div>

                <div style={{ marginTop: '12px', padding: '10px 12px', borderRadius: '9px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.35)' }}>
                  <div style={{ fontWeight: 800, color: '#6ee7b7', fontSize: '12px', marginBottom: '4px' }}>
                    ✓ PUNTOS FUERTES DETECTADOS
                  </div>
                  {scanReport.finding.map((item, index) => (
                    <p key={`finding-${index}`} style={{ color: '#e2e8f0', marginTop: '4px', fontSize: '12.5px' }}>• {item}</p>
                  ))}
                </div>

                <div style={{ marginTop: '10px', padding: '10px 12px', borderRadius: '9px', background: 'rgba(251, 191, 36, 0.09)', border: '1px solid rgba(251, 191, 36, 0.42)' }}>
                  <div style={{ fontWeight: 800, color: '#fbbf24', fontSize: '12px', marginBottom: '4px' }}>
                    ⚡ CRÍTICA CONSTRUCTIVA Y SUGERENCIAS DE MEJORA
                  </div>
                  {scanReport.fix.map((item, index) => (
                    <p key={`fix-${index}`} style={{ color: '#fde68a', marginTop: '4px', fontSize: '12.5px' }}>• {item}</p>
                  ))}
                </div>

                <div style={{ marginTop: '10px' }}>
                  <div style={{ fontWeight: 700, color: '#00f0ff', fontSize: '11px', marginBottom: '4px' }}>
                    PRESCRIPCIONES DETECTADAS ({scanReport.exerciseLines.length}):
                  </div>
                  {scanReport.exerciseLines.length ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {scanReport.exerciseLines.slice(0, 14).map((item, index) => (
                        <span key={`ex_badge_${index}`} style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          background: 'rgba(0,240,255,0.1)',
                          border: '1px solid rgba(0,240,255,0.3)',
                          color: '#e2e8f0',
                          fontSize: '11px'
                        }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#94a3b8', fontSize: '12px' }}>
                      Aún no se detectan prescripciones con formato <code>series × reps</code> (ej. <code>4 × 8</code>). Podés editar las líneas arriba para agregarlas.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MÓDULO 4: MODO HISTORIA PVE SECUENCIAL
         ==================================================================== */}
      {activeTab === 'pve' && (() => {
        const clsObj = hunterClass?.cls || {
          name: 'Centinela Infinito',
          passiveName: 'Muralla Inquebrantable',
          passiveDesc: 'Reduce a la mitad el desgaste y otorga +40 de defensa base.',
        };
        const resProfile = getClassResourceProfile(clsObj, level);
        const startStoryEncounter = (ch) => {
          const prevCleared = ch.prevId === null || completedChapters.includes(ch.prevId);
          if (!prevCleared) return;
          const playerMaxHp = 210 + level * 22 + Math.round(hunterCombatPower * 0.45);
          const deck = buildHunterTacticalDeck({
            clsObj,
            gradeData,
            hunterCombatPower,
            unlockedInventory,
            atkMultiplier: 1
          });
          setActiveStoryEncounter({
            chapter: ch,
            phase: 'vn',
            sceneIdx: 0,
            selectedChoice: null,
            turn: 1,
            playerHp: playerMaxHp,
            playerMaxHp,
            playerShield: 20,
            resource: Math.min(resProfile.max, Math.round(resProfile.max * 0.7)),
            maxResource: resProfile.max,
            atkMultiplier: 1,
            bossHp: ch.bossHp,
            bossMaxHp: ch.bossHp,
            bossShield: 0,
            bossIntent: { label: `Golpe de Grieta (${ch.bossAtk} daño)`, type: 'attack', value: ch.bossAtk },
            deck,
            hand: drawTacticalHand(deck, 4),
            combatLogs: [`Escena narrativa iniciada en ${ch.chapter}.`]
          });
        };
        const chooseVnOptionAndEnterCombat = (choice) => {
          setActiveStoryEncounter((prev) => {
            if (!prev) return null;
            const nextAtkMult = choice.buffType === 'atk' ? 1 + choice.value : 1;
            const nextShield = prev.playerShield + (choice.buffType === 'shield' ? choice.value : 0);
            const nextResource = Math.min(prev.maxResource, prev.resource + (choice.buffType === 'resource' ? choice.value : 0));
            const upgradedDeck = buildHunterTacticalDeck({
              clsObj,
              gradeData,
              hunterCombatPower,
              unlockedInventory,
              atkMultiplier: nextAtkMult
            });
            return {
              ...prev,
              phase: 'combat',
              selectedChoice: choice,
              playerShield: nextShield,
              resource: nextResource,
              atkMultiplier: nextAtkMult,
              deck: upgradedDeck,
              hand: drawTacticalHand(upgradedDeck, 4),
              combatLogs: [
                `Decisión táctica: ${choice.label}.`,
                `¡Comienza el Combate Táctico por Turnos contra ${prev.chapter.enemy}!`
              ]
            };
          });
        };
        const playStoryCard = (card) => {
          setActiveStoryEncounter((prev) => {
            if (!prev || prev.phase !== 'combat') return prev;
            if (prev.resource < card.cost) {
              triggerToast(`[COMBATE] No tienes suficiente ${resProfile.shortName} (${card.cost} req).`);
              return prev;
            }
            const nextResource = Math.min(prev.maxResource, prev.resource - card.cost + (card.resourceGain || 0));
            let remainingDmg = card.damage || 0;
            let nextBossShield = prev.bossShield;
            if (nextBossShield > 0 && remainingDmg > 0) {
              const absorbed = Math.min(nextBossShield, remainingDmg);
              nextBossShield -= absorbed;
              remainingDmg -= absorbed;
            }
            const nextBossHp = Math.max(0, prev.bossHp - remainingDmg);
            const nextPlayerShield = prev.playerShield + (card.shield || 0);
            const nextPlayerHp = Math.min(prev.playerMaxHp, prev.playerHp + (card.heal || 0));
            const nextHand = prev.hand.filter((c) => c.instanceId !== card.instanceId);
            const logLine = `Turno ${prev.turn}: Usaste "${card.name}" (${card.damage > 0 ? `-${card.damage} HP jefe` : ''}${card.shield > 0 ? ` +${card.shield} Escudo` : ''}${card.resourceGain > 0 ? ` +${card.resourceGain} ${resProfile.shortName}` : ''}).`;
            if (nextBossHp <= 0) {
              const ch = prev.chapter;
              if (!completedChapters.includes(ch.id)) {
                setCompletedChapters((cList) => [...cList, ch.id]);
                setExp((e) => e + ch.expReward);
                setLp((l) => l + ch.lpReward);
                setUnlockedInventory((inv) => [
                  ...inv,
                  { id: ch.id, type: ch.rewardType, name: ch.rewardName, power: 55, desc: `Recompensa obtenida en ${ch.chapter}` }
                ]);
              }
              setPveBattleLog({
                victory: true,
                title: `¡VICTORIA TÁCTICA EN ${ch.chapter.toUpperCase()}!`,
                detail: ch.id === 'act1_ch1'
                  ? `Has derrotado a ${ch.enemy} en combate por turnos, fundado tu Ciudad 2D y desbloqueado a Lyra.`
                  : `Has derrotado a ${ch.enemy} y reclamado ${ch.rewardName} (+${ch.expReward} EXP, +${ch.lpReward} LP).`
              });
              triggerToast(
                ch.id === 'act1_ch1'
                  ? '¡CIUDAD 2D Y NOVELA VISUAL DESBLOQUEADAS!'
                  : `[HISTORIA PVE] ¡Capítulo ${ch.order} completado!`
              );
              return null;
            }
            return {
              ...prev,
              resource: nextResource,
              bossHp: nextBossHp,
              bossShield: nextBossShield,
              playerShield: nextPlayerShield,
              playerHp: nextPlayerHp,
              hand: nextHand,
              combatLogs: [logLine, ...prev.combatLogs].slice(0, 6)
            };
          });
        };
        const endStoryTurn = () => {
          setActiveStoryEncounter((prev) => {
            if (!prev || prev.phase !== 'combat') return prev;
            const ch = prev.chapter;
            const intent = prev.bossIntent;
            let nextPlayerHp = prev.playerHp;
            let nextPlayerShield = prev.playerShield;
            let nextBossShield = prev.bossShield;
            let enemyActionText = '';
            if (intent.type === 'attack' || intent.type === 'heavy') {
              let dmg = intent.value;
              if (nextPlayerShield > 0) {
                const blocked = Math.min(nextPlayerShield, dmg);
                nextPlayerShield -= blocked;
                dmg -= blocked;
              }
              nextPlayerHp = Math.max(0, nextPlayerHp - dmg);
              enemyActionText = `${ch.enemy} ejecuta ${intent.label} (${dmg} daño directo recibido).`;
            } else {
              nextBossShield += intent.value;
              enemyActionText = `${ch.enemy} refuerza su guardia (+${intent.value} Escudo).`;
            }
            if (nextPlayerHp <= 0) {
              setPveBattleLog({
                victory: false,
                title: `DERROTA TÁCTICA ANTE ${ch.enemy.toUpperCase()}`,
                detail: `Tu HP llegó a 0. Sube tus marcas en Cargas o utiliza cartas de escudo ante los ataques pesados del jefe.`
              });
              return null;
            }
            const nextTurn = prev.turn + 1;
            const roll = nextTurn % 3;
            const nextIntent =
              roll === 0
                ? { label: `Embate Devastador (${Math.round(ch.bossAtk * 1.35)} daño)`, type: 'heavy', value: Math.round(ch.bossAtk * 1.35) }
                : roll === 1
                ? { label: `Golpe de Grieta (${ch.bossAtk} daño)`, type: 'attack', value: ch.bossAtk }
                : { label: `Postura Defensiva (+${Math.round(ch.bossAtk * 0.9)} Escudo)`, type: 'defend', value: Math.round(ch.bossAtk * 0.9) };
            const nextResource = Math.min(prev.maxResource, prev.resource + resProfile.regenPerTurn);
            return {
              ...prev,
              turn: nextTurn,
              playerHp: nextPlayerHp,
              playerShield: nextPlayerShield,
              bossShield: nextBossShield,
              bossIntent: nextIntent,
              resource: nextResource,
              hand: drawTacticalHand(prev.deck, 4),
              combatLogs: [enemyActionText, ...prev.combatLogs].slice(0, 6)
            };
          });
        };
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="sys-window" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                <h2 className="font-souls" style={{ fontSize: '17px', color: '#f59e0b' }}>
                  CRÓNICAS DEL ABISMO — NOVELA VISUAL & COMBATE TÁCTICO
                </h2>
                <span className="sys-badge" style={{ background: 'rgba(245,158,11,0.2)', color: '#fde047', border: '1px solid #f59e0b' }}>
                  PODER: {hunterCombatPower} • {resProfile.shortName}
                </span>
              </div>
              {activeStoryEncounter && (
                <div
                  className="pex-ornate-frame"
                  style={{
                    padding: '16px',
                    marginBottom: '16px',
                    borderColor: 'var(--neon-gold)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '10px', fontFamily: 'Orbitron, sans-serif', color: '#ffd45a' }}>
                        {activeStoryEncounter.chapter.act.toUpperCase()} • {activeStoryEncounter.phase === 'vn' ? 'FASE 1: NOVELA VISUAL' : `FASE 2: COMBATE TÁCTICO (TURNO ${activeStoryEncounter.turn})`}
                      </div>
                      <h3 className="font-souls" style={{ fontSize: '16px', color: '#fff' }}>
                        {activeStoryEncounter.chapter.chapter}
                      </h3>
                    </div>
                    <button
                      type="button"
                      className="sys-btn sys-btn-danger"
                      style={{ padding: '6px 10px', fontSize: '10px' }}
                      onClick={() => setActiveStoryEncounter(null)}
                    >
                      Retirarse
                    </button>
                  </div>
                  {activeStoryEncounter.phase === 'vn' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {(() => {
                        const scenes = activeStoryEncounter.chapter.vnScenes || [];
                        const currentScene = scenes[activeStoryEncounter.sceneIdx] || scenes[0];
                        const isLastScene = activeStoryEncounter.sceneIdx >= scenes.length - 1;
                        return (
                          <>
                            <div
                              style={{
                                padding: '14px',
                                borderRadius: '14px',
                                background: 'rgba(5, 8, 23, 0.94)',
                                border: `1.5px solid ${currentScene?.accent || '#ffd45a'}`,
                                boxShadow: 'inset 0 0 18px rgba(0,0,0,0.75)'
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                <span className="font-hud" style={{ fontSize: '12px', fontWeight: 800, color: currentScene?.accent || '#ffd45a' }}>
                                  {currentScene?.speaker}
                                </span>
                                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                                  {currentScene?.role} ({activeStoryEncounter.sceneIdx + 1}/{scenes.length})
                                </span>
                              </div>
                              <p style={{ fontSize: '15px', color: '#f8fafc', lineHeight: 1.55, fontStyle: 'italic' }}>
                                «{currentScene?.text}»
                              </p>
                            </div>
                            {!isLastScene ? (
                              <button
                                type="button"
                                className="sys-btn sys-btn-primary"
                                style={{ alignSelf: 'flex-end' }}
                                onClick={() =>
                                  setActiveStoryEncounter((prev) =>
                                    prev ? { ...prev, sceneIdx: prev.sceneIdx + 1 } : null
                                  )
                                }
                              >
                                Siguiente Diálogo <ChevronRight size={15} />
                              </button>
                            ) : (
                              <div>
                                <div style={{ fontSize: '11px', fontFamily: 'Orbitron, sans-serif', color: '#ffd45a', marginBottom: '8px' }}>
                                  ELIGE TU RESPUESTA TÁCTICA PARA INICIAR EL DUELO DE CARTAS:
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                                  {(activeStoryEncounter.chapter.vnChoices || []).map((chOpt, idx) => (
                                    <button
                                      key={idx}
                                      type="button"
                                      className="sys-btn sys-btn-gold"
                                      style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                                      onClick={() => chooseVnOptionAndEnterCombat(chOpt)}
                                    >
                                      {chOpt.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="grid-2" style={{ gap: '10px' }}>
                        <div style={{ padding: '11px', borderRadius: '12px', background: 'rgba(225, 29, 72, 0.12)', border: '1px solid rgba(244, 63, 94, 0.45)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#fda4af' }}>
                            <span>JEFE: {activeStoryEncounter.chapter.enemy}</span>
                            <span>{activeStoryEncounter.bossHp}/{activeStoryEncounter.bossMaxHp} HP</span>
                          </div>
                          <div className="progress-track" style={{ height: '8px', marginTop: '6px' }}>
                            <div
                              className="progress-fill"
                              style={{
                                width: `${Math.round((activeStoryEncounter.bossHp / activeStoryEncounter.bossMaxHp) * 100)}%`,
                                background: 'linear-gradient(90deg, #9f1239, #f43f5e)'
                              }}
                            />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#cbd5e1', marginTop: '6px' }}>
                            <span>Escudo Jefe: <strong>{activeStoryEncounter.bossShield}</strong></span>
                            <span style={{ color: '#fbbf24' }}>Intención: <strong>{activeStoryEncounter.bossIntent.label}</strong></span>
                          </div>
                        </div>
                        <div style={{ padding: '11px', borderRadius: '12px', background: 'rgba(0, 234, 255, 0.09)', border: '1px solid rgba(0, 234, 255, 0.4)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#00eaff' }}>
                            <span>{profile.hunterName} ({clsObj.name})</span>
                            <span>{activeStoryEncounter.playerHp}/{activeStoryEncounter.playerMaxHp} HP</span>
                          </div>
                          <div className="progress-track" style={{ height: '8px', marginTop: '6px' }}>
                            <div
                              className="progress-fill"
                              style={{
                                width: `${Math.round((activeStoryEncounter.playerHp / activeStoryEncounter.playerMaxHp) * 100)}%`,
                                background: 'linear-gradient(90deg, #0284c7, #10b981)'
                              }}
                            />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#cbd5e1', marginTop: '6px' }}>
                            <span>Escudo: <strong style={{ color: '#38bdf8' }}>{activeStoryEncounter.playerShield}</strong></span>
                            <span style={{ color: resProfile.color }}>
                              {resProfile.shortName}: <strong>{activeStoryEncounter.resource}/{activeStoryEncounter.maxResource}</strong>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span className="font-hud" style={{ fontSize: '11px', color: '#ffd45a' }}>
                            MANO DE CARTAS TÁCTICAS ({activeStoryEncounter.hand.length} DISPONIBLES)
                          </span>
                          <button
                            type="button"
                            className="sys-btn sys-btn-gold"
                            style={{ padding: '6px 12px', fontSize: '10px' }}
                            onClick={endStoryTurn}
                          >
                            FINALIZAR TURNO (+{resProfile.regenPerTurn} {resProfile.shortName})
                          </button>
                        </div>
                        <div className="grid-2" style={{ gap: '8px' }}>
                          {activeStoryEncounter.hand.map((card) => {
                            const canAfford = activeStoryEncounter.resource >= card.cost;
                            return (
                              <button
                                key={card.instanceId}
                                type="button"
                                disabled={!canAfford}
                                className="pex-tactical-card"
                                style={{ borderColor: canAfford ? card.accent : 'rgba(148,163,184,0.2)' }}
                                onClick={() => playStoryCard(card)}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                  <span style={{ fontSize: '10px', fontWeight: 800, color: card.accent, textTransform: 'uppercase' }}>
                                    {card.kind}
                                  </span>
                                  <span
                                    className="sys-badge"
                                    style={{
                                      background: 'rgba(5,8,23,0.9)',
                                      color: resProfile.color,
                                      border: `1px solid ${resProfile.color}`,
                                      fontSize: '10px',
                                      padding: '2px 7px'
                                    }}
                                  >
                                    {card.cost} {resProfile.shortName}
                                  </span>
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>{card.name}</div>
                                <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '3px', lineHeight: 1.35 }}>
                                  {card.desc}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div style={{ padding: '9px 11px', borderRadius: '10px', background: 'rgba(5, 8, 23, 0.9)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ fontSize: '10px', fontFamily: 'Orbitron, sans-serif', color: '#94a3b8', marginBottom: '4px' }}>
                          CRÓNICA DEL COMBATE:
                        </div>
                        {activeStoryEncounter.combatLogs.map((entry, idx) => (
                          <div key={idx} style={{ fontSize: '11px', color: idx === 0 ? '#ffd45a' : '#cbd5e1' }}>
                            • {entry}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
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
                  const recommendedReady = hunterCombatPower >= ch.reqPower;
                  return (
                    <div
                      key={ch.id}
                      style={{
                        padding: '15px',
                        borderRadius: '12px',
                        background: 'rgba(4,6,12,0.88)',
                        opacity: prevCleared ? 1 : 0.6,
                        border: `1px solid ${cleared ? '#10b981' : !prevCleared ? 'rgba(148,163,184,0.2)' : recommendedReady ? 'rgba(251,191,36,0.45)' : 'rgba(225,29,72,0.35)'}`
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
                            : `PODER SUGERIDO: ${ch.reqPower}`}
                        </span>
                      </div>
                      <h3 className="font-souls" style={{ fontSize: '16px', color: '#fff', marginTop: '4px' }}>
                        {ch.chapter}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px', lineHeight: 1.45 }}>
                        {ch.lore}
                      </p>
                      <div style={{ fontSize: '12px', color: '#fda4af', marginTop: '6px' }}>
                        <strong>Jefe de Capítulo:</strong> {ch.enemy} ({ch.bossHp} HP)
                      </div>
                      <div style={{ fontSize: '12px', color: '#00f0ff', marginTop: '2px' }}>
                        <strong>Recompensa Especial:</strong> {ch.rewardName} (+{ch.expReward} EXP, +{ch.lpReward} LP)
                      </div>
                      {!cleared && (
                        <button
                          disabled={!prevCleared}
                          className={`sys-btn ${!prevCleared ? 'sys-btn-ghost' : 'sys-btn-gold'}`}
                          style={{ marginTop: '10px', padding: '9px 14px', fontSize: '11px' }}
                          onClick={() => startStoryEncounter(ch)}
                        >
                          {!prevCleared ? (
                            <><Lock size={14} /> COMPLETA EL CAPÍTULO {ch.order - 1} PRIMERO</>
                          ) : (
                            <><BookOpen size={14} /> INICIAR NOVELA VISUAL & DUELO DE CARTAS</>
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}
      {/* ====================================================================
          MÓDULO 5: CIUDAD PERSONALIZABLE 2D + NOVELA VISUAL
         ==================================================================== */}
      {activeTab === 'city_vn' && (
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
                  const isUnlocked = Boolean(char.unlockedByDefault) || completedChapters.includes(char.unlockChapter);
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
                <VisualNovel3DPortrait
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
      )}

      {/* ====================================================================
          MÓDULO 6: AMIGOS & MODO PVP POR PROXIMIDAD (LÍMITE MÁXIMO 30 KM)
         ==================================================================== */}
      {activeTab === 'pvp' && (() => {
        const clsObj = hunterClass?.cls || {
          name: 'Centinela Infinito',
          baseArchetype: 'Centinela',
          affinityName: 'Infinito',
          passiveName: 'Muralla Inquebrantable',
          passiveDesc: 'Reduce a la mitad el desgaste y otorga +40 de defensa base.',
        };
        const playerRes = getClassResourceProfile(clsObj, level);
        const startPvpTacticalDuel = (opponent, distKm, isRankedFriend = true) => {
          const enemySeed = (opponent.id || 77) + opponent.name.length * 13;
          const enemyGen = generateRandomInfiniteClass(enemySeed);
          const enemyCls = opponent.cls || enemyGen.cls;
          const enemyRes = getClassResourceProfile(enemyCls, opponent.level || 1);
          const playerMaxHp = 220 + level * 20 + Math.round(hunterCombatPower * 0.42);
          const enemyMaxHp = 210 + (opponent.level || 1) * 20 + Math.round((opponent.power || 80) * 0.42);
          const deck = buildHunterTacticalDeck({
            clsObj,
            gradeData,
            hunterCombatPower,
            unlockedInventory,
            atkMultiplier: 1
          });
          setActivePvpDuel({
            opponent,
            distKm,
            isRankedFriend,
            enemyCls,
            enemyRes,
            turn: 1,
            playerHp: playerMaxHp,
            playerMaxHp,
            playerShield: 15,
            playerResource: Math.round(playerRes.max * 0.75),
            playerMaxResource: playerRes.max,
            enemyHp: enemyMaxHp,
            enemyMaxHp,
            enemyShield: 15,
            enemyResource: Math.round(enemyRes.max * 0.75),
            enemyMaxResource: enemyRes.max,
            deck,
            hand: drawTacticalHand(deck, 4),
            duelLogs: [
              `¡Duelo Táctico PvP iniciado contra ${opponent.name} (${distKm} km)!`,
              `Tu recurso: ${playerRes.name} (${playerRes.max} máx) vs Rival: ${enemyRes.name} (${enemyRes.max} máx).`
            ]
          });
        };
        const playPvpCard = (card) => {
          setActivePvpDuel((prev) => {
            if (!prev) return null;
            if (prev.playerResource < card.cost) {
              triggerToast(`[ARENA PVP] ${playerRes.shortName} insuficiente (${card.cost} req).`);
              return prev;
            }
            const nextPlayerResource = Math.min(
              prev.playerMaxResource,
              prev.playerResource - card.cost + (card.resourceGain || 0)
            );
            const nextEnemyResource = Math.max(0, prev.enemyResource - (card.drainEnemyResource || 0));
            let dmg = card.damage || 0;
            let nextEnemyShield = prev.enemyShield;
            if (nextEnemyShield > 0 && dmg > 0) {
              const blocked = Math.min(nextEnemyShield, dmg);
              nextEnemyShield -= blocked;
              dmg -= blocked;
            }
            const nextEnemyHp = Math.max(0, prev.enemyHp - dmg);
            const nextPlayerShield = prev.playerShield + (card.shield || 0);
            const nextPlayerHp = Math.min(prev.playerMaxHp, prev.playerHp + (card.heal || 0));
            const nextHand = prev.hand.filter((c) => c.instanceId !== card.instanceId);
            if (nextEnemyHp <= 0) {
              const lpWon = prev.isRankedFriend
                ? (String(clsObj.affinityName || '').includes('Sangre Real') ? 35 : 25)
                : 10;
              const expWon = prev.isRankedFriend ? 45 : 20;
              setLp((l) => l + lpWon);
              setExp((e) => e + expWon);
              setPvpLog({
                win: true,
                header: `¡VICTORIA TÁCTICA PVP CONTRA ${prev.opponent.name} (${prev.distKm} KM)!`,
                body: `Dominaste el duelo gestionando tu ${playerRes.name} frente a su ${prev.enemyRes.name}. Ganaste +${lpWon} LP y +${expWon} EXP.`
              });
              triggerToast(`[ARENA PVP] ¡Victoria! +${lpWon} LP y +${expWon} EXP.`);
              return null;
            }
            const logEntry = `Turno ${prev.turn}: Jugaste "${card.name}" (${card.damage > 0 ? `-${card.damage} HP` : ''}${card.shield > 0 ? ` +${card.shield} Escudo` : ''}${card.drainEnemyResource > 0 ? ` -${card.drainEnemyResource} ${prev.enemyRes.shortName} rival` : ''}).`;
            return {
              ...prev,
              playerResource: nextPlayerResource,
              enemyResource: nextEnemyResource,
              enemyHp: nextEnemyHp,
              enemyShield: nextEnemyShield,
              playerShield: nextPlayerShield,
              playerHp: nextPlayerHp,
              hand: nextHand,
              duelLogs: [logEntry, ...prev.duelLogs].slice(0, 6)
            };
          });
        };
        const endPvpTurn = () => {
          setActivePvpDuel((prev) => {
            if (!prev) return null;
            const isEnemyArcane = prev.enemyRes.type === 'mana';
            const skillCost = isEnemyArcane ? 35 : 25;
            const baseEnemyPower = Math.max(22, Math.round((prev.opponent.power || 80) * 0.24));
            let enemyAtk = baseEnemyPower;
            let enemyShieldGain = 0;
            let nextEnemyResource = prev.enemyResource;
            let actionDesc = '';
            if (nextEnemyResource >= skillCost) {
              nextEnemyResource -= skillCost;
              if (isEnemyArcane) {
                enemyAtk = Math.round(baseEnemyPower * 1.45);
                enemyShieldGain = 14;
                actionDesc = `${prev.opponent.name} gasta ${skillCost} MANÁ en Descarga Arcana (${enemyAtk} daño + 14 Escudo).`;
              } else {
                enemyAtk = Math.round(baseEnemyPower * 1.35);
                actionDesc = `${prev.opponent.name} gasta ${skillCost} ESTAMINA en Ráfaga Marcial (${enemyAtk} daño).`;
              }
            } else {
              enemyAtk = Math.round(baseEnemyPower * 0.65);
              enemyShieldGain = 18;
              actionDesc = `${prev.opponent.name} concentra recurso y golpea ligero (${enemyAtk} daño + 18 Escudo).`;
            }
            let dmgToPlayer = enemyAtk;
            let nextPlayerShield = prev.playerShield;
            if (nextPlayerShield > 0) {
              const absorbed = Math.min(nextPlayerShield, dmgToPlayer);
              nextPlayerShield -= absorbed;
              dmgToPlayer -= absorbed;
            }
            const nextPlayerHp = Math.max(0, prev.playerHp - dmgToPlayer);
            if (nextPlayerHp <= 0) {
              setPvpLog({
                win: false,
                header: `DERROTA TÁCTICA ANTE ${prev.opponent.name} (${prev.distKm} KM)`,
                body: `${prev.opponent.name} (${prev.enemyCls.name}) agotó tu HP administrando su ${prev.enemyRes.name}.`
              });
              return null;
            }
            nextEnemyResource = Math.min(prev.enemyMaxResource, nextEnemyResource + prev.enemyRes.regenPerTurn);
            const nextPlayerResource = Math.min(prev.playerMaxResource, prev.playerResource + playerRes.regenPerTurn);
            return {
              ...prev,
              turn: prev.turn + 1,
              playerHp: nextPlayerHp,
              playerShield: nextPlayerShield,
              playerResource: nextPlayerResource,
              enemyShield: prev.enemyShield + enemyShieldGain,
              enemyResource: nextEnemyResource,
              hand: drawTacticalHand(prev.deck, 4),
              duelLogs: [actionDesc, ...prev.duelLogs].slice(0, 6)
            };
          });
        };
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="sys-window" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                <h2 className="font-hud" style={{ fontSize: '14px', color: '#f43f5e' }}>
                  ARENA PVP TÁCTICA — RECURSOS DE CLASE & RADAR 30 KM
                </h2>
                <button className="sys-btn sys-btn-ghost" style={{ padding: '6px 10px', fontSize: '10px' }} onClick={requestGpsLocation}>
                  <Crosshair size={13} color="#00f0ff" /> CALIBRAR GPS
                </button>
              </div>
              <div
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(11, 21, 48, 0.9)',
                  border: `1px solid ${playerRes.color}`,
                  marginBottom: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                  <span className="font-hud" style={{ fontSize: '11px', fontWeight: 800, color: playerRes.color }}>
                    TU RECURSO DE CLASE: {playerRes.name.toUpperCase()} ({playerRes.max} MÁX)
                  </span>
                  <span className="sys-badge" style={{ background: 'rgba(5,8,23,0.9)', color: '#fff', border: `1px solid ${playerRes.color}` }}>
                    {playerRes.archetypeLabel}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px' }}>
                  {playerRes.mechanicNote}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
                <div>
                  <MapPin size={13} style={{ display: 'inline', color: '#00f0ff', marginRight: '4px' }} />
                  Ubicación: <strong>{userCoords.label}</strong> • Código: <strong style={{ color: '#fbbf24' }}>{profile.hunterCode}</strong>
                </div>
                <button
                  type="button"
                  className="sys-btn sys-btn-primary"
                  style={{ padding: '7px 11px', fontSize: '10px' }}
                  onClick={() =>
                    startPvpTacticalDuel(
                      {
                        id: 901,
                        name: 'CENTINELA SPECTRUM (SPARRING)',
                        level: Math.max(1, level),
                        grade: hunterGrade,
                        power: Math.max(70, Math.round(hunterCombatPower * 0.95)),
                      },
                      2.4,
                      false
                    )
                  }
                >
                  <Sword size={13} /> DUELO TÁCTICO DE PRÁCTICA (2.4 KM)
                </button>
              </div>
              {activePvpDuel && (
                <div
                  className="pex-ornate-frame"
                  style={{
                    padding: '16px',
                    marginBottom: '16px',
                    borderColor: '#f43f5e'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '10px', fontFamily: 'Orbitron, sans-serif', color: '#f43f5e' }}>
                        ARENA PVP CLASIFICATORIA • TURNO {activePvpDuel.turn} ({activePvpDuel.distKm} KM)
                      </div>
                      <h3 className="font-souls" style={{ fontSize: '16px', color: '#fff' }}>
                        {profile.hunterName} VS {activePvpDuel.opponent.name}
                      </h3>
                    </div>
                    <button
                      type="button"
                      className="sys-btn sys-btn-danger"
                      style={{ padding: '6px 10px', fontSize: '10px' }}
                      onClick={() => setActivePvpDuel(null)}
                    >
                      Abandonar Duelo
                    </button>
                  </div>
                  <div className="grid-2" style={{ gap: '10px', marginBottom: '12px' }}>
                    <div style={{ padding: '11px', borderRadius: '12px', background: 'rgba(0, 234, 255, 0.09)', border: `1px solid ${playerRes.color}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#fff' }}>
                        <span>TÚ • {clsObj.name}</span>
                        <span>{activePvpDuel.playerHp}/{activePvpDuel.playerMaxHp} HP</span>
                      </div>
                      <div className="progress-track" style={{ height: '7px', marginTop: '5px' }}>
                        <div
                          className="progress-fill"
                          style={{
                            width: `${Math.round((activePvpDuel.playerHp / activePvpDuel.playerMaxHp) * 100)}%`,
                            background: 'linear-gradient(90deg, #0284c7, #10b981)'
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '6px' }}>
                        <span style={{ color: '#cbd5e1' }}>Escudo: <strong>{activePvpDuel.playerShield}</strong></span>
                        <span style={{ color: playerRes.color, fontWeight: 800 }}>
                          {playerRes.shortName}: {activePvpDuel.playerResource}/{activePvpDuel.playerMaxResource}
                        </span>
                      </div>
                      <div className="progress-track" style={{ height: '6px', marginTop: '4px' }}>
                        <div
                          className="progress-fill"
                          style={{
                            width: `${Math.round((activePvpDuel.playerResource / activePvpDuel.playerMaxResource) * 100)}%`,
                            background: playerRes.color
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ padding: '11px', borderRadius: '12px', background: 'rgba(244, 63, 94, 0.1)', border: `1px solid ${activePvpDuel.enemyRes.color}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#fda4af' }}>
                        <span>{activePvpDuel.opponent.name} • {activePvpDuel.enemyCls.name}</span>
                        <span>{activePvpDuel.enemyHp}/{activePvpDuel.enemyMaxHp} HP</span>
                      </div>
                      <div className="progress-track" style={{ height: '7px', marginTop: '5px' }}>
                        <div
                          className="progress-fill"
                          style={{
                            width: `${Math.round((activePvpDuel.enemyHp / activePvpDuel.enemyMaxHp) * 100)}%`,
                            background: 'linear-gradient(90deg, #9f1239, #f43f5e)'
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '6px' }}>
                        <span style={{ color: '#cbd5e1' }}>Escudo: <strong>{activePvpDuel.enemyShield}</strong></span>
                        <span style={{ color: activePvpDuel.enemyRes.color, fontWeight: 800 }}>
                          {activePvpDuel.enemyRes.shortName}: {activePvpDuel.enemyResource}/{activePvpDuel.enemyMaxResource}
                        </span>
                      </div>
                      <div className="progress-track" style={{ height: '6px', marginTop: '4px' }}>
                        <div
                          className="progress-fill"
                          style={{
                            width: `${Math.round((activePvpDuel.enemyResource / activePvpDuel.enemyMaxResource) * 100)}%`,
                            background: activePvpDuel.enemyRes.color
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                    <span className="font-hud" style={{ fontSize: '11px', color: '#ffd45a' }}>
                      ACCIONES TÁCTICAS DE CLASE ({activePvpDuel.hand.length})
                    </span>
                    <button
                      type="button"
                      className="sys-btn sys-btn-gold"
                      style={{ padding: '6px 12px', fontSize: '10px' }}
                      onClick={endPvpTurn}
                    >
                      CEDER TURNO (+{playerRes.regenPerTurn} {playerRes.shortName})
                    </button>
                  </div>
                  <div className="grid-2" style={{ gap: '8px', marginBottom: '10px' }}>
                    {activePvpDuel.hand.map((card) => {
                      const canAfford = activePvpDuel.playerResource >= card.cost;
                      return (
                        <button
                          key={card.instanceId}
                          type="button"
                          disabled={!canAfford}
                          className="pex-tactical-card"
                          style={{ borderColor: canAfford ? card.accent : 'rgba(148,163,184,0.2)' }}
                          onClick={() => playPvpCard(card)}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 800, color: card.accent, textTransform: 'uppercase' }}>
                              {card.kind}
                            </span>
                            <span
                              className="sys-badge"
                              style={{
                                background: 'rgba(5,8,23,0.9)',
                                color: playerRes.color,
                                border: `1px solid ${playerRes.color}`,
                                fontSize: '10px',
                                padding: '2px 7px'
                              }}
                            >
                              {card.cost} {playerRes.shortName}
                            </span>
                          </div>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>{card.name}</div>
                          <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '3px' }}>{card.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ padding: '9px 11px', borderRadius: '10px', background: 'rgba(5, 8, 23, 0.9)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {activePvpDuel.duelLogs.map((entry, idx) => (
                      <div key={idx} style={{ fontSize: '11px', color: idx === 0 ? '#00eaff' : '#cbd5e1' }}>
                        • {entry}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                  Tu lista de amigos empieza en 0. Agrega un amigo arriba con su código `#PEX` para combatir dentro de un radio de 30 km (o usa el botón de Duelo Táctico de Práctica arriba).
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
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
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
                            startPvpTacticalDuel(fr, distKm, true);
                          }}
                        >
                          <Sword size={14} /> {inRange ? 'INICIAR DUELO PVP TÁCTICO' : 'FUERA DE 30 KM'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })()}
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
          MÓDULO 9: CONTADOR DE HORAS DE SUEÑO DÍA A DÍA + HISTORIAL PERSISTENTE
         ==================================================================== */}
      {activeTab === 'sleep' && (() => {
        const todayIso = getLocalDateISO();
        const isSelectedToday = selectedSleepDate === todayIso;
        const allHistoryDates = Object.keys(sleepLogs).sort().reverse();

        const handleSaveSleepEntry = () => {
          const parsedHours = Number(String(sleepHoursInput).replace(',', '.'));
          if (!Number.isFinite(parsedHours) || parsedHours <= 0 || parsedHours > 24) {
            triggerToast('[SUEÑO] Ingresá una cantidad válida entre 0.5 y 24 horas.');
            return;
          }
          const cleanHours = Number(parsedHours.toFixed(1));
          const cleanNote = String(sleepNoteInput || '').trim();
          const targetDate = selectedSleepDate || todayIso;
          const alreadyExisted = Boolean(sleepLogs[targetDate]?.hours > 0);
          const timeStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          setSleepLogs((prev) => ({
            ...prev,
            [targetDate]: {
              hours: cleanHours,
              note: cleanNote,
              updatedAt: timeStamp,
            },
          }));

          if (targetDate === todayIso && cleanHours >= 7.5) {
            setQuests((prev) =>
              prev.map((q) =>
                q.status === 'pending' &&
                q.isDaily &&
                q.title.toLowerCase().includes('dormir')
                  ? { ...q, status: 'completed' }
                  : q
              )
            );
          }

          if (!alreadyExisted) {
            setExp((prev) => prev + 15);
            setLp((prev) => prev + 10);
            triggerToast(
              `[SUEÑO GUARDADO] ${formatSleepDateLabel(targetDate)}: ${cleanHours}h registradas (+15 EXP / +10 LP).`
            );
          } else {
            triggerToast(
              `[SUEÑO ACTUALIZADO] ${formatSleepDateLabel(targetDate)}: ${cleanHours}h guardadas.`
            );
          }
        };

        const handleDeleteSleepEntry = (isoToDelete) => {
          setSleepLogs((prev) => {
            const copy = { ...prev };
            delete copy[isoToDelete];
            return copy;
          });
          if (selectedSleepDate === isoToDelete) {
            setSleepHoursInput('');
            setSleepNoteInput('');
          }
          triggerToast(`[SUEÑO] Registro del ${formatSleepDateLabel(isoToDelete)} eliminado.`);
        };

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* PANEL PRINCIPAL: SEMANA ACTUAL + FORMULARIO DE REGISTRO DÍA A DÍA */}
            <div className="sys-window" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                <h2 className="font-hud" style={{ fontSize: '14px', color: '#38bdf8' }}>
                  RECUPERACIÓN NEURAL Y SUEÑO DÍA A DÍA
                </h2>
                <span
                  className="sys-badge"
                  style={{
                    background: sleepOptimal ? 'rgba(16,185,129,0.2)' : 'rgba(225,29,72,0.2)',
                    color: sleepOptimal ? '#6ee7b7' : '#fda4af',
                    border: `1px solid ${sleepOptimal ? '#10b981' : '#e11d48'}`,
                  }}
                >
                  SEMANA: {totalSleep}H / META: 49–63H
                </span>
              </div>

              {/* RESUMEN RÁPIDO DE MÉTRICAS SEMANALES */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  marginBottom: '14px',
                  textAlign: 'center',
                }}
              >
                <div style={{ padding: '9px 6px', borderRadius: '10px', background: 'rgba(4,6,12,0.88)', border: '1px solid rgba(56,189,248,0.28)' }}>
                  <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>ACUMULADO SEMANA</div>
                  <div className="font-hud" style={{ fontSize: '16px', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>
                    {totalSleep}h
                  </div>
                </div>
                <div style={{ padding: '9px 6px', borderRadius: '10px', background: 'rgba(4,6,12,0.88)', border: '1px solid rgba(251,191,36,0.28)' }}>
                  <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>PROMEDIO / NOCHE</div>
                  <div className="font-hud" style={{ fontSize: '16px', fontWeight: 800, color: '#fde047', marginTop: '2px' }}>
                    {avgSleepPerNight}h
                  </div>
                </div>
                <div style={{ padding: '9px 6px', borderRadius: '10px', background: 'rgba(4,6,12,0.88)', border: '1px solid rgba(16,185,129,0.28)' }}>
                  <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>DÍAS ÓPTIMOS (7–9H)</div>
                  <div className="font-hud" style={{ fontSize: '16px', fontWeight: 800, color: '#6ee7b7', marginTop: '2px' }}>
                    {optimalSleepDaysCount}/7
                  </div>
                </div>
              </div>

              {!sleepOptimal && (
                <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(225,29,72,0.15)', border: '1px solid #e11d48', marginBottom: '14px', fontSize: '13px', color: '#fecdd3' }}>
                  <AlertTriangle size={15} style={{ display: 'inline', marginRight: '6px' }} />
                  <strong>Registro semanal en {totalSleep}h:</strong> Tocá cualquier día de la semana (Lun a Dom) para anotar tus horas de descanso y alcanzar la ventana óptima de 49–63 horas.
                </div>
              )}

              {/* TARJETAS INTERACTIVAS DE LUNES A DOMINGO */}
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, marginBottom: '6px' }}>
                SEMANA ACTUAL (TOCÁ UN DÍA PARA ANOTAR O EDITAR):
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', marginBottom: '16px', textAlign: 'center' }}>
                {weekSleepDays.map((d) => {
                  const isSelected = d.iso === selectedSleepDate;
                  const isOptimalDay = d.hours >= 7 && d.hours <= 9;
                  const isLowDay = d.hours > 0 && d.hours < 7;
                  return (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => handleSelectSleepDate(d.iso)}
                      style={{
                        padding: '8px 2px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        background: isSelected
                          ? 'rgba(56, 189, 248, 0.22)'
                          : d.isToday
                          ? 'rgba(0, 234, 255, 0.12)'
                          : 'rgba(4, 6, 12, 0.88)',
                        border: isSelected
                          ? '1.5px solid #fbbf24'
                          : d.isToday
                          ? '1.5px solid #38bdf8'
                          : '1px solid rgba(56, 189, 248, 0.28)',
                        boxShadow: isSelected ? '0 0 12px rgba(251, 191, 36, 0.35)' : 'none',
                      }}
                    >
                      <div style={{ fontSize: '10px', fontWeight: 800, color: d.isToday ? '#38bdf8' : '#94a3b8' }}>
                        {d.label}
                      </div>
                      <div style={{ fontSize: '9px', color: '#64748b', marginTop: '1px' }}>
                        {d.dayNum}
                      </div>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 800,
                          color: isOptimalDay ? '#10b981' : isLowDay ? '#fbbf24' : d.hours > 9 ? '#38bdf8' : '#94a3b8',
                          marginTop: '3px',
                        }}
                      >
                        {d.hours}h
                      </div>
                      {d.isToday && (
                        <div style={{ fontSize: '8px', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>
                          HOY
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* FORMULARIO PARA ANOTAR EL DÍA SELECCIONADO */}
              <div
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(5, 8, 23, 0.92)',
                  border: '1px solid rgba(56, 189, 248, 0.38)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 800, letterSpacing: '0.06em' }}>
                      ANOTAR DESCANSO DEL DÍA
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>
                      {formatSleepDateLabel(selectedSleepDate)}{' '}
                      {isSelectedToday && (
                        <span style={{ color: '#00f0ff', fontSize: '11px' }}>(HOY)</span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {!isSelectedToday && (
                      <button
                        type="button"
                        className="sys-btn sys-btn-ghost"
                        style={{ padding: '6px 10px', fontSize: '10px' }}
                        onClick={() => handleSelectSleepDate(todayIso)}
                      >
                        IR A HOY
                      </button>
                    )}
                    <input
                      type="date"
                      aria-label="Fecha de descanso"
                      className="sys-input"
                      style={{ padding: '6px 9px', fontSize: '12px', width: 'auto' }}
                      value={selectedSleepDate}
                      onChange={(e) => handleSelectSleepDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* BOTONES RÁPIDOS DE HORAS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
                  {[6, 6.5, 7, 7.5, 8, 8.5, 9].map((preset) => {
                    const activePreset = Number(sleepHoursInput) === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setSleepHoursInput(String(preset))}
                        style={{
                          padding: '6px 2px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '11px',
                          fontWeight: 800,
                          background: activePreset ? 'rgba(56, 189, 248, 0.25)' : 'rgba(11, 21, 48, 0.85)',
                          border: `1px solid ${activePreset ? '#38bdf8' : 'rgba(148, 163, 184, 0.25)'}`,
                          color: activePreset ? '#fff' : '#cbd5e1',
                        }}
                      >
                        {preset}h
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="24"
                    placeholder="Horas (ej: 7.5)"
                    className="sys-input"
                    style={{ maxWidth: '140px' }}
                    value={sleepHoursInput}
                    onChange={(e) => setSleepHoursInput(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Nota opcional (ej: Sueño profundo, desperté con energía...)"
                    className="sys-input"
                    style={{ flex: '1 1 200px' }}
                    value={sleepNoteInput}
                    onChange={(e) => setSleepNoteInput(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="sys-btn sys-btn-primary"
                  style={{ width: '100%', padding: '12px' }}
                  onClick={handleSaveSleepEntry}
                >
                  <Clock size={15} />{' '}
                  {isSelectedToday
                    ? 'GUARDAR SUEÑO DE HOY'
                    : `GUARDAR SUEÑO (${formatSleepDateLabel(selectedSleepDate).toUpperCase()})`}
                </button>
              </div>
            </div>

            {/* BLOQUE 2: RESUMEN DÍA A DÍA DE LA SEMANA ACTUAL */}
            <div className="sys-window" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                <h3 className="font-hud" style={{ fontSize: '13px', color: '#00f0ff' }}>
                  DETALLE DÍA A DÍA — SEMANA ACTUAL
                </h3>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  {loggedSleepDaysCount} de 7 días anotados
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {weekSleepDays.map((d) => {
                  const hasRecord = d.hours > 0;
                  const statusLabel = !hasRecord
                    ? 'Sin registrar'
                    : d.hours >= 7 && d.hours <= 9
                    ? 'Óptimo (7–9h)'
                    : d.hours < 7
                    ? 'Déficit (<7h)'
                    : 'Extendido (>9h)';
                  const statusColor = !hasRecord
                    ? '#94a3b8'
                    : d.hours >= 7 && d.hours <= 9
                    ? '#6ee7b7'
                    : d.hours < 7
                    ? '#fde047'
                    : '#7dd3fc';
                  return (
                    <div
                      key={`day-row-${d.iso}`}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '9px 12px',
                        borderRadius: '10px',
                        background: d.isToday ? 'rgba(56, 189, 248, 0.1)' : 'rgba(4, 6, 12, 0.85)',
                        border: `1px solid ${d.isToday ? 'rgba(56, 189, 248, 0.45)' : 'rgba(148, 163, 184, 0.16)'}`,
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <strong style={{ fontSize: '13px', color: '#fff' }}>
                            {d.fullLabel} {d.shortDate}
                          </strong>
                          {d.isToday && (
                            <span
                              style={{
                                fontSize: '9px',
                                fontWeight: 800,
                                padding: '1px 6px',
                                borderRadius: '999px',
                                background: 'rgba(0, 234, 255, 0.2)',
                                color: '#00f0ff',
                                border: '1px solid rgba(0, 234, 255, 0.45)',
                              }}
                            >
                              HOY
                            </span>
                          )}
                          <span style={{ fontSize: '11px', color: statusColor, fontWeight: 700 }}>
                            • {statusLabel}
                          </span>
                        </div>
                        {d.note && (
                          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                            “{d.note}”
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <span
                          className="font-hud"
                          style={{
                            fontSize: '14px',
                            fontWeight: 800,
                            color: hasRecord ? '#38bdf8' : '#64748b',
                          }}
                        >
                          {hasRecord ? `${d.hours}h` : '—'}
                        </span>
                        <button
                          type="button"
                          className="sys-btn sys-btn-ghost"
                          style={{ padding: '5px 9px', fontSize: '10px' }}
                          onClick={() => handleSelectSleepDate(d.iso)}
                        >
                          {hasRecord ? 'Editar' : 'Anotar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BLOQUE 3: REGISTRO HISTÓRICO COMPLETO DE HORAS DE SUEÑO */}
            <div className="sys-window" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                <h3 className="font-hud" style={{ fontSize: '13px', color: '#fbbf24' }}>
                  REGISTRO HISTÓRICO DE SUEÑO ({allHistoryDates.length})
                </h3>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  Guardado automáticamente por fecha
                </span>
              </div>

              {allHistoryDates.length === 0 ? (
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>
                  Todavía no hay días registrados. Anotá tus horas arriba para que queden guardadas en tu historial.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '320px', overflowY: 'auto' }}>
                  {allHistoryDates.map((iso) => {
                    const item = sleepLogs[iso];
                    const hrs = Number(item?.hours || 0);
                    const isOpt = hrs >= 7 && hrs <= 9;
                    return (
                      <div
                        key={`hist-${iso}`}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: 'rgba(5, 8, 23, 0.9)',
                          border: '1px solid rgba(56, 189, 248, 0.24)',
                        }}
                      >
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            <strong style={{ fontSize: '13px', color: '#f8fafc' }}>
                              {formatSleepDateLabel(iso)}
                            </strong>
                            {iso === todayIso && (
                              <span
                                style={{
                                  fontSize: '9px',
                                  fontWeight: 800,
                                  padding: '1px 6px',
                                  borderRadius: '999px',
                                  background: 'rgba(0, 234, 255, 0.18)',
                                  color: '#00f0ff',
                                }}
                              >
                                HOY
                              </span>
                            )}
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                color: isOpt ? '#6ee7b7' : hrs < 7 ? '#fde047' : '#7dd3fc',
                              }}
                            >
                              • {isOpt ? 'Óptimo' : hrs < 7 ? 'Bajo' : 'Extendido'}
                            </span>
                          </div>
                          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                            {item?.note ? `${item.note} • ` : ''}
                            {item?.updatedAt ? `Registrado a las ${item.updatedAt}` : 'Guardado en sistema'}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                          <span
                            className="font-hud"
                            style={{ fontSize: '15px', fontWeight: 900, color: '#38bdf8', marginRight: '4px' }}
                          >
                            {hrs}h
                          </span>
                          <button
                            type="button"
                            className="sys-btn sys-btn-ghost"
                            style={{ padding: '5px 8px', fontSize: '10px' }}
                            onClick={() => handleSelectSleepDate(iso)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            title="Eliminar registro"
                            className="sys-btn sys-btn-danger"
                            style={{ padding: '5px 8px', fontSize: '10px' }}
                            onClick={() => handleDeleteSleepEntry(iso)}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })()}

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
            <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(5,8,23,0.9)', border: '1px solid rgba(0,234,255,0.4)', marginBottom: '12px' }}>
              <div className="font-hud" style={{ fontSize: '11.5px', color: 'var(--neon-blue)', marginBottom: '8px' }}>
                LINAJE DEL AVATAR 3D (RAZA)
              </div>
              <select
                className="sys-select"
                value={hunterClass?.race?.id || profile.preferredRaceId || 'monarch_vessel'}
                onChange={(e) => {
                  const raceObj = RACES_POOL.find((r) => r.id === e.target.value) || RACES_POOL[0];
                  setProfile((p) => ({ ...p, preferredRaceId: raceObj.id }));
                  setHunterClass((prev) => ({ ...(prev || generateRandomInfiniteClass(101, raceObj.id)), race: raceObj }));
                  triggerToast(`Linaje actualizado a ${raceObj.name}`);
                }}
              >
                {RACES_POOL.map((r) => <option key={r.id} value={r.id}>{r.name} — {r.trait}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
              <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                Cuenta activa: <strong>{currentUser.email}</strong> • Código: <strong style={{ color: '#fbbf24' }}>{profile.hunterCode}</strong>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="sys-btn sys-btn-primary"
                  onClick={() => {
                    const backup = {
                      version: 'PROTOCOLO_EX_V4_V5_COMBINADO',
                      exportedAt: new Date().toISOString(),
                      hunter: profile.hunterName,
                      data: JSON.parse(localStorage.getItem(storageKey) || '{}'),
                    };
                    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Respaldo_${profile.hunterName}_ProyectoEX.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                    triggerToast('[SISTEMA] Respaldo JSON descargado correctamente.');
                  }}
                >
                  <Download size={14} /> EXPORTAR RESPALDO (.JSON)
                </button>

                <label className="sys-btn sys-btn-ghost" style={{ cursor: 'pointer' }}>
                  <Upload size={14} /> IMPORTAR (.JSON)
                  <input
                    type="file"
                    accept=".json,application/json"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        try {
                          const parsed = JSON.parse(String(ev.target?.result || '{}'));
                          const payload = parsed.data || parsed;
                          if (!payload || typeof payload !== 'object') throw new Error('Formato inválido');
                          localStorage.setItem(storageKey, JSON.stringify(payload));
                          triggerToast('[SISTEMA] Respaldo restaurado. Recargando sesión...');
                          setTimeout(() => window.location.reload(), 700);
                        } catch {
                          triggerToast('[ERROR] El archivo JSON seleccionado no es un respaldo válido.');
                        }
                      };
                      reader.readAsText(file);
                      e.target.value = '';
                    }}
                  />
                </label>

                <button className="sys-btn sys-btn-gold" onClick={resetProgressToZero}>
                  <RotateCcw size={14} /> REINICIAR TODO EL PROGRESO A 0
                </button>
              </div>
            </div>
          </div>


          {/* PERSONALIZACIÓN PROFUNDA DEL AVATAR 3D Y TÍTULO DE CAZADOR */}
          <div className="sys-window" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <h3 className="font-hud" style={{ fontSize: '14px', color: 'var(--neon-gold)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Box size={16} color="var(--neon-gold)" /> PERSONALIZACIÓN DE AVATAR 3D & TÍTULO
              </h3>
              <button
                type="button"
                className="sys-btn sys-btn-ghost"
                style={{ padding: '6px 10px', fontSize: '10px' }}
                onClick={() => {
                  setProfile((p) => ({ ...p, avatar3d: {}, hunterTitle: 'Cazador Despertado' }));
                  triggerToast('[AVATAR 3D] Apariencia restaurada a valores de foto/linaje.');
                }}
              >
                <RotateCcw size={12} /> RESTAURAR BASE
              </button>
            </div>

            <div
              style={{
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                marginBottom: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#6ee7b7' }}>
                  ADAPTACIÓN AUTOMÁTICA DESDE TU FOTOGRAFÍA
                </div>
                <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '2px' }}>
                  {profile.photoDna
                    ? `Activa (${profile.photoDna.silhouetteTag}) — Piel, cabello, armadura y aura sincronizados.`
                    : 'Sube una fotografía para adaptar automáticamente los colores y proporciones de tu avatar 3D.'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {profile.photoDna && (
                  <button
                    type="button"
                    className={`sys-btn ${profile.usePhotoAdaptation !== false ? 'sys-btn-primary' : 'sys-btn-ghost'}`}
                    style={{ padding: '6px 10px', fontSize: '10px' }}
                    onClick={() =>
                      setProfile((p) => ({
                        ...p,
                        usePhotoAdaptation: p.usePhotoAdaptation === false,
                      }))
                    }
                  >
                    {profile.usePhotoAdaptation !== false ? 'FOTO ACTIVA' : 'ACTIVAR FOTO'}
                  </button>
                )}
                <label className="sys-btn sys-btn-gold" style={{ padding: '6px 10px', fontSize: '10px', cursor: 'pointer' }}>
                  <Camera size={12} /> {profile.photoDna ? 'ACTUALIZAR FOTO' : 'SUBIR FOTO'}
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleSecurePhotoUpload(e, 'avatar_sync')} />
                </label>
              </div>
            </div>

            <div className="grid-2" style={{ marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8' }}>TÍTULO EQUIPADO DEL CAZADOR</label>
                <select
                  className="sys-select"
                  value={profile.hunterTitle || 'Cazador Despertado'}
                  onChange={(e) => setProfile((p) => ({ ...p, hunterTitle: e.target.value }))}
                >
                  <option value="Cazador Despertado">Cazador Despertado</option>
                  <option value="Forjador de Hierro">Forjador de Hierro</option>
                  <option value="Azote de las Grietas">Azote de las Grietas</option>
                  <option value="Soberano de la Ciudadela">Soberano de la Ciudadela</option>
                  <option value="Monarca Sin Límites">Monarca Sin Límites</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8' }}>ESTILO DE CABELLO 3D</label>
                <select
                  className="sys-select"
                  value={profile.avatar3d?.hairStyle || ''}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      avatar3d: { ...(p.avatar3d || {}), hairStyle: e.target.value },
                    }))
                  }
                >
                  <option value="">Automático (Foto / Linaje)</option>
                  <option value="spiky">Puntiagudo Shōnen</option>
                  <option value="layered">Capas Tácticas</option>
                  <option value="long">Melena Larga</option>
                  <option value="ponytail">Coleta de Combate</option>
                  <option value="crown_swept">Corona Imperial</option>
                </select>
              </div>
            </div>

            <div className="grid-2" style={{ marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8' }}>POSTURA DE COMBATE 3D</label>
                <select
                  className="sys-select"
                  value={profile.avatar3d?.pose || 'heroic'}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      avatar3d: { ...(p.avatar3d || {}), pose: e.target.value },
                    }))
                  }
                >
                  <option value="heroic">Guardia Heroica</option>
                  <option value="guard">Postura Ofensiva Lista</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#94a3b8' }}>COLOR DE ARMADURA Y OJOS 3D</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '4px' }}>
                  <label style={{ fontSize: '11px', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Coraza:
                    <input
                      type="color"
                      value={profile.avatar3d?.armorColor || profile.photoDna?.armorColor || '#0f172a'}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          avatar3d: { ...(p.avatar3d || {}), armorColor: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label style={{ fontSize: '11px', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Ojos:
                    <input
                      type="color"
                      value={profile.avatar3d?.eyeColor || profile.photoDna?.eyeColor || '#00eaff'}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          avatar3d: { ...(p.avatar3d || {}), eyeColor: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label style={{ fontSize: '11px', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Cabello:
                    <input
                      type="color"
                      value={profile.avatar3d?.hairColor || profile.photoDna?.hairColor || '#0b0f19'}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          avatar3d: { ...(p.avatar3d || {}), hairColor: e.target.value },
                        }))
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* PERSONALIZACIÓN DE COLORES NEÓN A ELECCIÓN DEL USUARIO */}
          <div className="sys-window" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
              <h3 className="font-hud" style={{ fontSize: '14px', color: 'var(--neon-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Palette size={16} color="var(--neon-blue)" /> PERSONALIZACIÓN DE COLORES NEÓN
              </h3>
              <button
                type="button"
                className="sys-btn sys-btn-ghost"
                style={{ padding: '6px 12px', fontSize: '10px' }}
                onClick={() => {
                  setNeonTheme({ primary: '#00eaff', secondary: '#963cff', accent: '#ffd45a' });
                  triggerToast('[ESTÉTICA] Colores neón restaurados al tema original.');
                }}
              >
                <RotateCcw size={12} /> RESTAURAR ORIGINALES
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.45 }}>
              Elegí cualquier color libremente usando los selectores o ingresando el código HEX. Todos los bordes, brillos, menús y barras de energía se actualizan al instante.
            </p>

            {/* SELECTORES DE COLOR LIBRE (INPUT TYPE="COLOR" + HEX) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(5, 8, 23, 0.88)', border: '1px solid rgba(var(--neon-primary-rgb), 0.35)' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--neon-blue)', marginBottom: '6px' }}>
                  NEÓN PRINCIPAL (BORDES, MENÚ Y EXP)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="color"
                    value={neonTheme.primary}
                    onChange={(e) => setNeonTheme((prev) => ({ ...prev, primary: e.target.value }))}
                    style={{ width: '46px', height: '38px', border: 'none', borderRadius: '8px', background: 'transparent', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    className="sys-input"
                    value={neonTheme.primary}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                        setNeonTheme((prev) => ({ ...prev, primary: val }));
                      }
                    }}
                    style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '13px', padding: '8px 10px' }}
                  />
                </div>
              </div>

              <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(5, 8, 23, 0.88)', border: '1px solid rgba(var(--neon-secondary-rgb), 0.35)' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--neon-purple)', marginBottom: '6px' }}>
                  NEÓN SECUNDARIO (AURAS Y RELIQUIAS)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="color"
                    value={neonTheme.secondary}
                    onChange={(e) => setNeonTheme((prev) => ({ ...prev, secondary: e.target.value }))}
                    style={{ width: '46px', height: '38px', border: 'none', borderRadius: '8px', background: 'transparent', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    className="sys-input"
                    value={neonTheme.secondary}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                        setNeonTheme((prev) => ({ ...prev, secondary: val }));
                      }
                    }}
                    style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '13px', padding: '8px 10px' }}
                  />
                </div>
              </div>


              <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(5, 8, 23, 0.88)', border: '1px solid rgba(var(--neon-accent-rgb), 0.35)' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--neon-gold)', marginBottom: '6px' }}>
                  NEÓN ACENTO (TÍTULOS Y RANGOS)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="color"
                    value={neonTheme.accent}
                    onChange={(e) => setNeonTheme((prev) => ({ ...prev, accent: e.target.value }))}
                    style={{ width: '46px', height: '38px', border: 'none', borderRadius: '8px', background: 'transparent', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    className="sys-input"
                    value={neonTheme.accent}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                        setNeonTheme((prev) => ({ ...prev, accent: val }));
                      }
                    }}
                    style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '13px', padding: '8px 10px' }}
                  />
                </div>
              </div>
            </div>

            {/* TEMAS RÁPIDOS DE INSPIRACIÓN RPG */}
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '8px' }}>
              COMBINACIONES RÁPIDAS SUGERIDAS:
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { name: 'Cian Monarca', primary: '#00eaff', secondary: '#963cff', accent: '#ffd45a' },
                { name: 'Carmesí Berserker', primary: '#ff2a55', secondary: '#991b1b', accent: '#fbbf24' },
                { name: 'Esmeralda Cazador', primary: '#10b981', secondary: '#059669', accent: '#fde047' },
                { name: 'Violeta Sombra', primary: '#a855f7', secondary: '#4f46e5', accent: '#38bdf8' },
                { name: 'Dorado Imperial', primary: '#f59e0b', secondary: '#b45309', accent: '#fef08a' },
                { name: 'Rosa Cyber', primary: '#ff3e9d', secondary: '#8b5cf6', accent: '#00eaff' },
              ].map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setNeonTheme({ primary: preset.primary, secondary: preset.secondary, accent: preset.accent });
                    triggerToast(`[ESTÉTICA] Tema "${preset.name}" aplicado.`);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '7px 11px',
                    borderRadius: '10px',
                    background: 'rgba(11, 21, 48, 0.9)',
                    border: `1px solid ${preset.primary}`,
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ display: 'inline-flex', gap: '3px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: preset.primary }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: preset.secondary }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: preset.accent }} />
                  </span>
                  {preset.name}
                </button>
              ))}
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
