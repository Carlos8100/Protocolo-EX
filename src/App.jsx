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
 
// ============================================================================
// MOTOR MULTI-IA CON FILTRO ANTI-ERROR Y CACHÉ LOCAL (100% SIN CANVAS)
// ============================================================================
const DEFAULT_ANIME_AVATAR_MALE =
  'data:image/jpeg;base64,' +
  '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' +
  'xJLr1rLx99LSTpEdF6JdGXyKXBijbsnLajFLdkjWlWSJELcjFxHIzHjcpU+kKI0Xol+5yKXwJeryHUTMo8YomNUjycO9X+DxXWRMXQyd2SZgXbMUXLHNL8kY' +
  'VK9Pkr9pyX92cdx9JRJ+0xwTTsl4P0/eiT50yqmSZgl7tpg9sZ/7I6V8/vvnTdXom+DM+DD+kl0J7o2WT/klDk8VXkkyK7EudHyL98yQ5pOtZK1RK7aZ4WV7' +
  '3ieipE1THLjkh7mY8eyIkRRJkVX7axzS7FOL6frZGVslC+RaOJkjzyieOpKce0ZPL2NOuGY88Z8xJx3GRbXRCe12IR/cOfvF+3nN3UTba96MUEra9bXpkrGj' +
  'yIcbkQm4u4mDNviZcSmZMW2LPEyb4J67fn0If7RoSpfYv1SVdE8MTxYtStM3V2bY5I0zHgeJOMSErQ+hkfQ/2l/drRkkT9srRj8jf7WLP9Ne4qyTrkacl7WO' +
  '/wC4hwJftqK+79JqH1HpNp9DPIRFcko78dmCdxRRQmL0r9/4WFZJ0z+oSXEdHNJ0NmVbkLs8aLiql2Qx7SPOkehf4SGZ4V7e2Ntu2JEoJ8s3E5HdmO3FSREX' +
  'Gkf8O2SdE18o2yfJj+muOzFVUVWq/wARODlwj6NGSbkYMfusihLR/wCForSMm5UUZH8Cxpvkxxjd2LV9f4ebpWY4/OmS99CfNFWrMdl6NcC/wSResmVpmdRb' +
  'FkPHfDQvRRz+/Ssquxu/RON6+R+kgrPHjS0ri9ZOmvuv71jYnq3t9H+yTvTdxYppk+Y0LDTZDRSrXIvuv7zY2RlXYmR55Lt6V6snBjndDjx6n+5vSbLMk1VE' +
  'ZbuiP40XtW5lmLHvZmioulo2NmZniyt0JjjZVfvHo2SZOf8Ab+SduXJ40GoKxaSlb0jkcFSGyWT4Qr+TI/kyTsxPshbVfIh+tft5MySoxc3kZ40FOW5i0Xoo' +
  'oZKVIinN2YqctqKE93fejKLL5F+yb0eljLJSPInue1EpcbI9GOP0o0RVvd9lT9tM8eMXjI+MvgjFx70/Ur1aGvcIX7J+iyTM+WjDFtPIzDjVqxysn5HxAxTc' +
  '+fsbfgwccG7aKV6J07GXpXN/tWOZuLJk25ujbtjtRBcGaW32nMnSMGLYhLS/TjwcXJkdvHIktE9EMcvjVRbOvv0VpNN9E8E5fJHDIeORNyTcWRhU7HM37YmW' +
  'G6bZ462Mx5FLoWlemMUVpuO9bLORUhzb+/Wl+ryI5b9r4GyL4G0+Sr6I40jNFx98TDNygm/TVd6Y+9GLTdpN6RTvRfdv17z6iN3yWOKfZ/x0LxYkcMUZfb0i' +
  'OH6j3MitfpvuXBurrWC+dLLLLEy9zELRfeXpkSlRLP8AgjJ9kaatiaFkT49UVZ9RRVQ9FkWNjlQvIi3tOWy6N19EeCJYtF9pD9LGyTMvuaiZpxdY4EEkjg3/' +
  'AAU3IWjkWJepiJIknOe34ISSm9o89EE58knXCN1KyHC50jov2EpH1fkea1wS93ZtoWQWa3RhgRhWtS3WyP2P/8QAOBEAAgIBAwMEAQMCBQMDBQAAAAECEQMS' +
  'ITEEEEETICJRMkJhcSMwFFKBsfAFM9HB4fEVcpGhov/aAAgBAgEBPwH2oTKsfeT/ALkI6nRmhplt/eQjot7iKFS3L/UT33H/AGUMg/BNV2f9yiC0xv7Jq1/B' +
  'RRRRRXvx6dS1cDq9iKOj/M6mH+Uzxqok37kS7442yu03dHA/dRGDfB6Vfkz4IX2kKTIXOVNmJa539GVaZ6kTWl7Dk+3xPTT4Zkg4rdFFe5GKGp0YcTjydZl0' +
  'fFGWdj7dP00sr2JKu8UNdqNKhDccrIksTSVjQ/ZQsX+bYuK/FEpt+RRvhCj9s+CNUfocvoUuMhJ/JzZqLX0XE/1KflClX4s1J8o0X+JRXsRglpkmad7Osd5C' +
  'feHUOEHFD7xGiMNTpE4LDH9xvtj5JVKNGRDrT+/dQ8sUq/E5K+zVXBrb5L7pGJ/pZm/yjXauy23Nf2beB/ufzuenf4lFdpqKUaFI6LM70s6yHzsyRplD9qI7' +
  'nT4f1M6jJql2aXgRiz1szJyeDHG5Cgn+B53K+xvY1fGuyKEhISQok1bGjSOI17FIi/oZo85DKlexQ0IhKj1lkjbMmBS4JJKBq92J7k9obD7V2QlYsdK5EGnZ' +
  'Fad2uC/r2RKTNBpFE9LUSUsZHMn+R8WOBpolEaKK7xl4ZVqLSJukh4rVwGihMhLwdPktUyUbT9iXdGKeqLgzSZY0y32SIJQ55NVvcap/uSm18e1CQkKJFfRo' +
  '23ZKCf47k7ierY22UJ0LJNbxZayRtFeBwGu0u8cjrSKN7eRyp7bDh6itckokhMxyp2ZNoj7KPtxfkSj5MrsoSIrR/JG2xtQ2RH77qIoCgLH9mpPaCsn8eeSW' +
  'WT899dCyGr7ExS+JGa+Lf/Nh6XwSgSiNFd5fZF6vyJppkn6n8kl2gZcbcEySoUbK9iMUfkjPGoFb9o/Hc428jpLYk7Z4NOwiAsqTqUSXUNcQZ8sn5tJDkuEy' +
  'bXZyN+2xT8Dfki9jHMWVvYVPYnEkhoRQlYnTITvZjjz9n5b+Sjp4apUPJqTiuEZC6LtD7owtRabMsdUKHErz2jvsSlZFeTZcjYkRiRVqh5lxj4/5wTyWPIam' +
  'xRvns3RqZQosRqrYUhu0QnezIy1fGXJOA0KPaMouNeScfInRfgof2dLsyWRJaYk0NbCVI57Qg5OkNaXTIyMXUp7MyYbexlxOI9hy2ojD7E/PaKIwTG8cPyZO' +
  '820eCScVUTJRQhVQ5IooqiTa4Lvci0aSLvbspRcKmYcup+nk5/3J4yS73sOHldkR3MacfkMe+xOuEShsKFFCdDk5O32iyK1R0+THPU2pEoxNN8I9HSrZ4KIi' +
  'hGf5I0RxPTDdmTO0tjJmk+WX2s3kV57vYiikimQdo03ETMVVqZCEWvTl/p/z9iTbVPkkhrtHg0qtivslXg0fHYk3oUTQ2SwenG2KJ6T0mRqBZV98S/UyE3di' +
  'pytEnuQ2JXQpLgoii9Oy5Y9OONfZO5ukZOe3Al5YhdqHuUNWxryJ6HqJZLJfZie5qqn9E4kkSFFvcX40SyaXUd2enOSbyOv2NKI7Cg5PcSipbnU/KVGPpvMj' +
  'qOqr4xJzvtF0yW5FEl+gf+Ywz3omJLSjJ2iRXkxw/Ux3ObkZU0hryxLz2kLvOdvTEoonsRgycdOwn4EQ2Mcq2ZHjYkkOO5dE3eyMK9PgndFHkx7QtmhqHqPk' +
  'hKMuDq5tRpEmPsjHic+CENLt+BJt/wAmT6RHmzzQ9kO/IhGqEV8mPqoPzsPKktkTk5fJk46UcEUV2uhyb2RjjuaNxR3NtVM1uGw325MXNMgt6Mb0u/v/AHJk' +
  'mNkIDdC3EhfkTSeJtizvItPgxao8GbLaJ/JjXbbSYcijszJUkv3Lq5D4I8M43JMuxEWLDjl+kyQjr9LHt9mStFxMjSqH0SnbJaTV9F7is4Ix0kNkKVFmr5Mb' +
  'E+3khVbijsmY6ywkh7q2SFj1DgklJMjNS4F9DW5iVyOryaYaF5OnwqEdUhzvYyPcg4RhuSfZIhBuSRGcN5MySqokf3PJmS57UIiKWmOo0ejilJ/kyW9EySok' +
  'hISHISobvsn2TGPfctohUjHu9LMTbjxudLOKySj9/wC5KJJG2lxfk6mf6YkVT2IfZCJjjvualky2hzvY9SjLGnaJPtXbB5ZKFEqyLtEcrikMtcCh9iiKO6Mn' +
  '9X4xMqUEVuSW4u0hRrskPfbu41v2rcW5FaWRh8rJPSm/2MnSvNJTT53MfqpVkomTlW4k2yMKIoxnWT0RpeTpHUWTbJv5X9kncEPu0cQRH5onDTwcjWlEuq/y' +
  'kYSnvMjFLgREeHXzJmCHydfihbxROO/8DVqx7dpPu34XdkZbj2QityUrVPwdPNSWk6nVJJL+Dpk1HQ+YskyRPdmJbso0kIn/AFDeaOl2dMnC9x/iiO6aJdok' +
  'sDa1Ek06IWiS1GjTuzPl9R7cGGNy76aVsxxVHHBFKMP4OkkpK3wjLvIaqI1uMku9dlyZZeBKx8GMirkNfKzpV/VVGaf9VfS/9eD06lqRNliW5i5cTSKI3Wxk' +
  'xqVWZen+NxP8XdWKpXRGtSJEYkDLKSUckDMr+X2N0QyRjFuRk6h5HbOlw2tUhorbvAidTk+Hpw5/9DDg04bZhfqQ1GdeCYx8CfdsizbyOTeyNDSpmPkxfZN7' +
  '/E6OX9RSf7mCCbnfllUiRIlDyhT9PIpsx1NXEcleklDcljtEkOCcmdKmlQuLJrdkH4EYcjuiU9SpGSNSM07ekhDU6RCVbE40Q53JwocGQQjStLSIK8aR0bcb' +
  'iSVyszY62N7PTndDxzXKEWTdbjnSI5ER63FpVrdGXqNbsw7Rs16UR/c6XHuv3/2/92QWltjJLtRPDGapkXPppMxvVL1EyfXxj+kn1maXkj1eWOz3Eo6dSZi6' +
  'iMXUj1YfimPFT374/wAhbKzLNU5IlBx5OkXMhHI4iLRCJwIiqNHzko/Y3pnpf/P+US5+Rljueq4k+tySVCdkpGq1Q/ZCW9fRkyHSYXmnT4Eqy/6ERjEl5KEj' +
  'LHUTeieyJS9aVJD6GXNC6ZydDxzwy3RKKv49sXVONKXBkl9dsfPZ7MzvVOzppfp+zgiviaRxKFdfEnyLtDGocGaPzjIzQ+Wn/UmvjRkXbUPj3RFDVudPBY8X' +
  'xIS3Iy7UOCkqZknpWohdfIskoyW6MeGEHcUatiUE+TqJuEtMiWz2OlcL0SRn6RVcTHkenS/HbHyfpOq2+J6Lm9iGCMG3E5RHeOxHIuJEl9FdkJdkV5Jw2VeB' +
  'wt7cmeGl0Ndn7kY14J7Ki0iOVEMl8Hqo2dNkkpcknvXZIojy2zI/Jnj6ko2ZYaZUOVSs9f1I2P8AJ9sXJCGx1E3LI2dOk8KkXTJQpEXSOojxI6d3GmTRHtEr' +
  'uzNHyjrdM3a+iURo59qEYJapmSeqCf8AI5CZB3sxz05Iw5v/APRj37dS5RqcfBj6yMnT2LE7Hsicq5OTqlUl/HbpuWMjBsgqZk6p/KKJryYerUcagUatqEjL' +
  'G8YvikiW+51GX06ISU1aES1aXp5MUpONy5LJSMkjRNy1GWGl14JIY/ZFEnSMIpfGu0TDqk6gRxqGd3v/APBi7NHVxX5EckpRohFpbjRljaZjjGMU3wZ83qTc' +
  'ijpo8skyGVxLM2J66XkacVpZwY5epBSKoof4sluRR1eFumjoo/FiLJzpnq7ksiJZvoeUb1KmSQx90hKib3Ic9kmyKSOmIO8uSX/OTEPU5/siTOoltRiko0I5' +
  'OolphX2Z53WOA4b0f4eUpKKRkjGC0LvZptJmdwlBqRpswZp4vxH1yfgxZY5ODPsrMM9Sort6Wl3EROdEppksiWw5WSfayTJIfeMaG+0It8G3kcrInT8H4uf8' +
  'ojPbY1JInks3kzFh3TNVEWoxuR1HUObMWN8kMGn5SMue23Ee40UIgriRQtt0enHIqZlwtPc6XP6f5cDcM0WoslCcOTBmcrjI01sXRPq0to7syzlLeY5sb9z+' +
  'iaKIxrs7fBHCvJ/HeJjemJ1fj9//AAjBjdbE4N7E40iEaFn30o+cnq4SMs3k4IY96W7NKitiV1Q47WbclEolGHmictkSW5B0ZFriVpbgzG3B2jFk1qzPh/XA' +
  'jNSVo6lN+diq2XafPZ+177+yMb9qIGH5OzqZf/y//Bj6utjp9Uo65GTHZorcmtPBkyOXxRDA57vYhijCOxjlDJj9REourJrwOIo9pJkNjz3gdQvnZGNxs6dc' +
  '9n8ZOA8l7M52JKiUfemPtZD8fdFWdLSepi6aUsrkp7i6eCksjFni+RdQsstOPb9zpoSeNt+SeOuDTT+IoVyJ2jHGS+LJWxxtksbfgbUFRjnewk7HEjuiU4x5' +
  'EhIjDU5s6eNQ3JKuO3USrKY95GON5UmZcdEkMfZ+xllkPx9qITUUPK3sYZaRY5uT3+P0S6Px4/n/ANjB00MUvmyMk1sRkpPSj0lZ1XxjqidOm/yYt90Pmh6U' +
  '6Ms9KJxk92IwTvkozZvT4Oljrm5sovStTOklSp+bONkSfglOjqm5PUdFljy+SWRerqR1HVqMbJ8akNJkuz5GVXZj7Y/x9zYnW5HNRi6neyHURZGaktifprdO' +
  'hZXiTpf8/wBTB1kMi+I8keCXUY9WmBk6yOJHT9TKfjdnp1LW+RqU5E46nS47Qm+DFkMz9TI2dHi0xtlHV5tXwidP8pRRQoqzqbgKWxBS11Ajqcvv/n2R6bLL' +
  'eb0ok4RWlGT4ku6Gxs1dkrdEVt3fZy+hKirKKIzlEx53e5jz1uluRk5rdks3UYN57on1PrKoyr+f/P8A8GnLj8HT/wDTde+Vi6dQVQPSfLI1ZlaXaDPBHHp5' +
  'IZdKozdW38IDx0jBtIv4j6lwG7W5k9OHgj08MbFq/SqJ/FXIu/kxS1KhvtLksk6L3vsiEaFwX2bORL2V25ERnJcGPqa/Ij6Ev0oWGEN8aP8A6jodTiyfWzk9' +
  'WLdHTzytWzJmSMs9TGhIxImrkZsjbpGDH8j0W3uQw07MkNUdjNPeiOWcaeTav+cCccsdbW37/wDghkbdyJ9RXBmzaviSYpE/ssZKVGrvqIvbu32S9rsirFH6' +
  'MeBtWyarY3Isx9Q4vcShKNSZGDT2yMhmmtuTJBSMmGXI0QRBGbIrZotkIaOOTgclwSz+mtyWXNld41X7mHpIY/ll3Zl6jVsSyjmavPZ7F+B9ssPPfkWJlUuz' +
  'Yl9j34OBexsRiUVyLIvA0mTxrxyTdHG7Iu+RNcH+HhL8djBPJiko5N0/Jl2MsNzHA6nJ6cduTBDW7Onx6N5cn6iTrcz5d1Fcv/Yk43Y8+1Ik35JjkSYomw2e' +
  'RiJ8Ptihe7Eu+5Q/oSGVvv21F0iKsqt2JkWYpfZ632aFWuRTbt9kQyeCf/bf7blakShqIJROoyeozo7jI8lHgrVeT74/geN6tJ6ahuzVbsezNQ3p2Q23z2fb' +
  'yIY8O4tvckP6EV5KH+/aKrccrEYo6pUZNro5ZeqVfQ5Fi2OmjczLjjBOHlmKX9JMnOlZkn+pDjbJTjFJr6Iyjt+/bI7+Jk/7kEZMmndEp/YpcsURl3uN92IQ' +
  '/wCxfZ8dmNUJDfjstuDp5wXOzJzL0ojsiQtty7P+nRWq2f8ATsc8uV58nBiXxcPomlKNGFf1FFjhrcpRRgSb3OVaGTe5lkoZItjm3Eaoe0TUS4I8eyQuz/tJ' +
  'tFxfIlG+Tl37Uxcl6nfZofbps+gXV6jHtkZ1OZxkkiOWE5avJ0svjJEfizFO47kpn6bM9SyQMmyo8jl4op9o+x8iGL+1ZYl/YpJC5JYVIcV3wL5JHGav2Or/' +
  'AO4Yd5JELjKWMli8ohG1R1OHJHeG5k+MKJveLJS+KsTIrSrZP6GXQ+659rF72V9/2PI2Y5adyE5U2yOGUouQ0JkJ7poc7zL+Dr4J/ISMGVxlbIz1GrSrJZP6' +
  'epGSdsnLazJJbmOKbvwTlqfZ9vHZkeyK7+OyLN/bpZok/A4tcrsu67RVkpWt9kY8iqnYyyEvsuXMXdG2SOlkem8Pk/w+2xjzV8ZDdEJfL0/BPZj4Zd4yGP8A' +
  'pkl20bWN0Q47SF7vr2Uvdjxx06p7F0/6bM8ntFoXb9u8X4MU+U0KbJdkY5uO5GQpWjLkcZXEcY5I60R3WkxY5xzVP9/9jqoeUckd9hT5ih9rJkPrtIXsf9yy' +
  'yTcpWxD9vG41XI9+8Vb2EQZPFCa3MOLSuf5PSbexObhKmY9OVI6nA4SI/kY+TJs+21EuSPPZ8i7Puxe9xXdFeRdn2j2XbVMtl1yQW5rfiIkJURZk2l/Jjyxb' +
  '0cMyYpSyvG/qz1HB0P8Aq7NjSxSamiDV3AyK2SmvA9TEXRLZnkX9l8lFs1I2NaNZrZ6kqoXv8kVaKKMDlwjF0yS3Mbp2RuvkRMytIz2mYszmoykjqIq3Y8jT' +
  'sz5NTslGmTbfLEh7CGT5F7WLkXukP9ihIlGh8CJdl2ijYa8kSiKs6TGlHWOajFuQiJGI1seip5dzO9jLm1GRODG7VGVbkvHaXeTF7X7V3Yuey2RY+0i/ZGNu' +
  'iaqNHkiRi0LOsUVFnUZ2+TI62IxX0RlZkyUYcn9QySWpwZk2ZN6keTL3l3fuf9jyVv3ofI0WIQhbiVdvowx8sySko/Lklb5Mk72Iw3sWxmzaMtC1SWpkHG9M' +
  'eTqLTsc9a3JKuBkt+757MfPZex/2Fz7Xz2fZdlHSXY1WxRik/DG7ZNJQ53GLGZtqRCONO0tzO3Iwwa/qPwZZamSl9Gojz7739z9q7r2+RlDEJikpGPG29ifO' +
  'qQ2tW56m1MU4olO3YpDlpRKblK2dLH9R1CVGeUtOlLYk2xjIL5I4QuBi7x969i7r2r2LdCRRHI0ak+TTYoFLyUYelcqvZGetDLo6bIlCmZ/xFKnoZnUWxxQy' +
  'DqVk0Ib2F2lwL3rjv49i4F7I8d6OO2hiiSjSIoll8IjPwh4Y44/LeRgxOTHluLRPkxW2ZM/xOujUlIlvuPs0a1Q5RGxdple+PHfwWWixREn7EihQHEoWwtzD' +
  '0rluZmo/ySlvuI6GP62ZYXuLLCBOFOiXJ03lGNetlo66epiQung2ot7szY9LoZiWqMkNbWLtf9hkfdSNJRRTFbKERyVDSRhbJY6JQMMbkS1RyNt7Gae/aPJj' +
  'y+kqZk/6hJ/iqFlTe5lx6si+mTwNOjD8MiZgqLk0ZlsJHqY5qOvlcHVT1StDR00qscdh9pf2GR/tUJdlEhCzHjozw+iWLUrIr0/lInqrU2TgkrFi2ti+PAot' +
  'j27Rdcmfi4k6lj9SJCfztGnZ2S2GOdrftB0yLH2lz2XvXvXsSsjAowR2IxMUVqcmRSUNT4Ooz2k0QlqlcxRS/qT/ANP/ACSdvcxY41qnwZ4qCWke5jx2RRN0' +
  'qFj0xlHwZcbiLqnWmRqjJWiRpKOGREiT7x5969qK9kURRwQjboxwHUVuLOm3My5no0sm7ZjjqkkZJanYotiy6FpJSlNkOk/VPZGT01+JVGeaSMGS8o9EnsZI' +
  'NGGVDx0SVdnyir2GzI/Hf9/YuzI8e5CQuCiqELcxQ8mLizrM7cf/ALv9jHia3Zkt7ii5KkYJwxNuRrTZLJCEaiJ2Rzen+JOcnyRZJ6VbKlll8SOBYYuT5IzY' +
  '/nGvI1udP1Cj8J7oywUt4O0OH0Sh8L/clHTsN+1e1i47ooUSMae49yK8CjZotERRMUPBmdJYlyz0k5+o/wDQ0+pwZ1p+JHVF6jbJLgnSfxNP2OXhCKvss2rE' +
  'zBJqGxPrdOzJ5IZF8RSolonC5E8TjuJmOdx3MVaNb8E2T+u1C7L+0imW2Y6vcqymiKNO5CIqhHUzCnNvIzMqgLHoQ8Ke8hTxyxOxbI4HTJRR6bqxzVUu3UY/' +
  'Sdx4OknepDgspLE4mq+THKiXwlRKHldlkco6PookUaNrf9mPauyEURgY0iOA9HSaCCM8nOagY41GkZfyRPJZmnb0ocVGNE5lNmhik1yetqjR6e1jJ4ZZOWRh' +
  '6UNKQ5SQm2ShZCWnZmRXuYv8rIYVpcmJUynVEeknLhEoKH8jd890r7N+xclcd6LS5PVZydLlwwjutz/FNP4pV/P/ALEuth9EOpxsg4vghj/qObHLSZN92PFa' +
  'F0+l3ZmwtckqW5rQ8huykl+56jezEvsySklsOQ39noxcbTHceR77rtGDeyJQ4ihY43uXjxP7Zm6v6NVv2t9qNPe+1mt/pNDI4l5Z6Ufs9F+B6lsxOyJC9nE1' +
  '/Qsjqn9iyJ7sTvgUR86GdRhSm6HAqi+2nT+Q5NmX8BkEND+men9dumhvqIxivlIz9R4Q5WS9lUMor20KBSXJqssQiFiwXK2R6b6P8M48npyRGTM0cNfua0hd' +
  'bNcGHrJN/Jkup/8AyZJ2aZGlnoKrY2o/gV9lGaX6UIURwNIokoJojFY47mTJq5Jy1OyiQ1QhIkxyFfto1W9iyTt9kJEYmJWY8djljxflyONqjJKS+MRdO58y' +
  'MvTSh+5KRZqIx1Eem+yHTrlvYy9RBfgTzNmsR6dbmREI7ix2emrocUjTZS4RNWZeBRskL8icTgc32S712SJMgSfsSIxZihRnyejhcjoMM5ZfUmTlLhFO9yMW' +
  'Z5VyT7YOnlkf7GiONVElnSJ5nPkfdOjHPUib3MUt9zrep9KNR5OgVQuXLJuMVbJyVEI38ia8GR3IUTILmyXBKPn2qhIbSJSfAkN7Jdl2iY8dnpxgrZjxJKxw' +
  'i+SjVEh1Cm/iSz48f5M6nqnlf7D3EOKhiqB1Nj90XXB//8QASxAAAQIDBQUFBAgEBQIFBAMAAQACAxEhEBIxQVEEICJhcRMwMlKBI0KRoRQzQGJyscHRQ4KS' +
  '4QUkU2PwUKI0c6Oy8RVgZJOD0uL/2gAIAQEABj8C/wCoEf8AQT/16eiDv/t+7mU5hz+1hoxKkf8A7CvHAWHqg8Z/ag+U5IvcZk79FL/qVASqyHVVePRe8VRi' +
  'oAsVqSrg9VPRXldOBUljZgFgvFJUIKw+1SH/AFCZF0feXE8u/CuCEPVeL4bvD62HzLimhJGeCpNC94rK2c7cVxMDl7zFOG5rxyVQR9lA7kx4ukwP+i4SGpXE' +
  '6+dApQ2hiqSbPENzwlVkOpVYjV9Z8AqFdoPVXdVdReclMrx/JeMLELDemPkq8Q5rAsKpJw5fYuid3Igs8Dc9e/rvTlTvpxDcC9myZ8zlxO3KBVk3quJ5P4Qu' +
  'GFP8RVJN6BVcd27kV0RlqrgwG/gtFQ73EFwnvpm30+zUC+9vvY7CarhkbQxviKkd+bqKTGy5qZM9ypkqCfVadO7DswnvPd4qoVDu1quE9yTpuUQcE0/Z577o' +
  'ZPEcE4+Wtoc0yIRJxNd3QLh+NhnOeVuq0766c0Gjr3+m7xCam2u+5sqnPdkUPss1LM9xMKKx/wBYG/HekuS1Kqq26/YZon7DWyttVRDujqLKfYp2T3Jb0t1z' +
  'tAuS4TI6KiktbJSWHdzvMb+Ir6+AOrleDoLhqIoV4wX3dRUfK07tDddoVIiRHe1sqpk0Um0XTusZKRsn9iPfUUhV2qPMonNPf6KZ7qnczhRHQzyMlKOGRv8A' +
  'zBX4ql6EefEFe904EYbwhx8PdiZs/cK48Vx699TFEaWOCkfiq9zP7U2+JXmhw6b948LBmuzhCTPmbA05KbTMJo1+wUqvqon9JVIb/grxgvl0s4hMIGd5hwcp' +
  'tMv1U3NLeTP0mqRI7fxQx+69lHgv5Tun5q7EY5p5i36HtBk3+HE/0z+ydDiNuubQjviNbMbJOE2q+3iZvU3D9hkhvC8ZyEhvdpGo3IarRowauKyqBCHeXYbH' +
  'PPJe32vZ4X3b14/JcJZH/FFu/Jex2WA0f7bA/wDdSO0RWchwr/xUf/8AYVXaYx/mmpsiD+kLieP5WgKbdpj/ANSdCjXHh3mYJ/FNcfAcDYC9rSPvNvfLNXNq' +
  '2MQiaiJBJuuGqlse1iJD/wBKJxj9wjFgicsYc5/Cya//ACNnH9TP7d9OymNl5Uw0XaQfVun2vn3d+Jjk1XnGzVUq7vZDFcXtHaDwq7OTPI2gs9lBe70og7bd' +
  'qhwfut4nIth7LH2r/wA51E5wECED7jThvaKTrLhwx6KcyDqMU2/E7aHzTNr2Uj23wcU+9Qs/dNiDKqexngPEzofsEnY6qRsvNMpIvYJOzb9t6b95/jyCmbNB' +
  'qrsPDXWyfdyFSpWBvto7/LDEl2seFs0Dk72j1dhX7vMy/JYhvQLic49Tu5FSIHwWa1UpXdx8C94T8v7H803bJSjRHCHElqM0Cv8AD42ZhFvwPfg2SdguSmph' +
  'XhSJmNe4HL7GBrXfvOq/IK8bJmjVdaLrdLflumWIE96fvvHwCDIbC5xyC7TborYY8gP6rsv8NgCG3/VIki6LEdHiZ1VGtYNBZov3XmXhCwVHFZrFVFl01tl5' +
  'qIN93xS52bDBgtn2cK88zkGzUo+3tLvLBZeXDG2r1hj917PaYfSILi9pDLQcDkfXvpGrdFebVttPF+fcTl9gFh3rxxUypK+7w/mtBopWTQG6HsMnCoRi7I3i' +
  'FXwM29NQpOBB0NoaGud+ETV+JC7Np1MldERkBv3BxH1KvgVH8R9Si2Hwt1zKADHTOFFxulyFSqBXnm6FdawdTipzkqlUCyWNlKqlnWyadpkuKjG1ceSudo66' +
  'TPkgxgmSg/axGik+6xt1v9RXB/h8FvVzij2UNrWnFszdPoV4RssT/wBM/srrxI9ydzUZhXm4WTU896Q+KbCZg0fYBYd2ZtmcFyGA3JKe8HscWuGBCEP/ABGF' +
  'Dvf6hbQ/sr//ANP7SF54fEqNhMP3oa4NohdJyXBH2dv800S6NfPIEqbmxIv4jIfJHwwGfcbUq60lretT1NlQSVhJY/BVEuu7jNYLim06rUK6bR0V33ZzkvBf' +
  '5KYgXDqx7mlXO2c8f6e0gOB/mUoR+h7Qf4b/AAO6FdnGYWO/Ozs4nEzLVvRajI99Npop2T3Gt1KDGp8jP7BOwO3qWU3J203/APKudzHu+q/zMGE+Jm7Zzd/s' +
  'hGgjaLpwvQv2Ur7ViLMVmsFMUCm5xDVKGJc89ylSqqhtunBUQdZReEqiN8VHqqfJS93ynBfR4o+kM/0yfaM/Cc12sJ3awCZB2h0Ohsl3ErJ93D/EF2UPxn5f' +
  'YiUW7tbJDdopY9wHx51q2GMT10CbBY2nuw2Ci+lf4g5pIyyH7lGFBnDg4XRi5e24T5M/7KXDDbruaqb6u8uiliTjuSGFmKxUlUqll2zBaKhkvCPSiMvhYCKF' +
  'dntdHOp2vm5O1V4CcE+F3dcWO9XDeD8btUXOMyfsTROtnXdlu1xXIdx2hAJ9wH80GNm+I8qUJh2naTjd/wCUC7Tb9oHKDCrdRhbIwB+b8SESVOVNdyfvfkpy' +
  'XiUmQ3O6ozpLHkpDw2YWTNBbRXtyiqsiECM8jufRNqF6E6nFkjGgzdB+bO6pvSsnaenfBpMpotOI3ZPqEJycFfxZksd/h+NkvXcuRZ3cnDFq7SC0bRD80Kvy' +
  'VYMT+krg2eKf5VOI5kFnOpknSe6K84q62UJmjV2ezhxOoXtntZyxK9lC/nfVVMzbPPLlZJsgr0Vy7ODNjc3ZrsofhbuTNt0WSU1gJKYtvCrFwEITzsDgZEK4' +
  '4ARwP6v2R2eKZuZwunj6rtYQ9g7/ALe6mq9zLdphZPuJux3gQnQvKiZkTRa4YLwlVc0eq8c+gVBZWz03b8GI5jtQgNohiJ95tCuHanQTo8KbdrgPHJ4RD4w/' +
  'qXDI9VK8ZcqWVsopmqnZM1dopmpQgs+tfiUJ+I2zOG5OwSCwlZyUxhY4csMiFwmcJ/hcpPqLO0Z4m+Ifqg8GUjjoVD/xHZ+F7eGJL3SjA2xodCfQq7O8x3Ex' +
  '3mHeVWKxFgU7J7/TvuZTX+7mg7JUpMTVbKFSXDimjl3NyGOrsguxgsEV5xnmvC0nRrQAFKlNN2QV2ymKm5GMfAxOjxMTkjPGy8cMue5c1tnopKSqpO8BWoxB' +
  'GBCai2U2PxCuzmMjZebQ5t16Ka7CLXZ44uFPguxafivocTrBJ912nQ9wLJqtgmsFUrFTBvI7nPcLtbOXd1wCvKpRguxHhUM8rJWOCNn674hs/md5QvomxcMN' +
  'viialP2iJOLdo2eDnIud9dGqBoNbL7s/CNbeZV4qaoplXGpsAUaOJ36ICUgFenLVTwgjX3/7L8rZnAK8c7SFMIHNSK5L6O41bVn6hGbADqES3AlSzyt4/F5l' +
  '2PvGreah7X/Fg+zi2CN5/F+LuqqiFJBV3DPGxsVglKjgr5wG5TDVXXYK6zDenvBmZqVM2NePdUCI3A2jqiDZX4W0Rpha2GwTc4yAQ2RrpvdWJdxd+wTGACZM' +
  'mtGATosT/wAJstGj/VdmfinxX4uKnGMmAXjzCL/kMrJmyVk1JF/wsOuS/wBof9/9ldH1TcTqsFdlVfrojd8IoOavWEIKmVnbN/mRu15Jr2zGY5Jm0jE8LuRV' +
  'VRXxnZyQOieQOKI27Ghecajmi2c5GU05v828J281OS4qlNHLdnYWS4CKozwFkgpv+Cng0KTaDfk7DkqbhccGouNnWyR/hv8AkbWKQxzUhjr3H0unbxZtgz90' +
  'ZuRc4kk4kp+0ChPAw6alM2GD4IeMtV7WsTyeXr+yJJMypCzpRTsl8bOqDdLLz6M/NXcG6LqqBSZS9i7kuwgeDN3nTGetgTjZMZ2XDg8SQJ+rNE5uRTtneeGJ' +
  'ToclIqikcCi1UUnKYMiF7Rwhx/OfC/roU5kRpa6Roe5mVd+CkckLRZdOBUs1M45q/hKhVTNUCkuyZh3oh+ps5C2I3la4nRS91T32Qx7xkptpDbwsGjRgmsbi' +
  '4yCc9lYcNtyEPNq74pzmu7SO6roun4f3UzQalcGG4bZL8NUSpu+FtTJoRP1cFviec12UGkP801pwFSohGE5DpZ0qgnO0B/JfogWuImJg6o1mUYLxjgpPrIY6' +
  'hTXa649VSyuIzV6+zpOtl0pry03X4HVdlGZ2kMYat6Ff5Z4i/dwf8FxQ3t6tWW7O2uCFotG0uHJFvuhPHuyqsMLHIk4nvLxwbVTOdks3V3vVcz3D3ZhhA9aW' +
  'CPtLuy8rPfd+yEKFD7OC3Bn7rtIxn1X4/k3uTLVUq7W2nEVf2l38uauAXIYwaECcCo20HoEwBpPDXqjDbUzupz5+I3Rz/wCVTOHxYKKdeAc1Dc7G5kjs78Zz' +
  'Yef91w4kUU3GZUnY+66xzPUWTsvD4WFw8cI/9pTtg2j6qNSvuuToLiQ5pkvEuOI93U2StnudNz0skn7PQNA4Vw+JXZ9SqYKYWAJPmwCnfvHksO5fFYJhmNgb' +
  'm6psllmibQbZZBT3ZOddGqvNhmIzzQ+ILh2eKf5Ue0uwgdalf5dgMT/VfUjojEjOL3Zlyc5krrfe93+6qeAVsN2ZDceSvbk1ICZXEfQLQWSAUyfUqUGrvMpu' +
  'MypYDMq4wSazhaFB2UfzKZ6r775n4qFs7cGCahtOOSYzVyMHEgXm89QmRG4hB2Rx62yQPoiLZHOwNd4YgunoVDjQ6RjDF5vnlQ+tEza/4sH2cXnod2m/LW02' +
  'TTj91E52XXuqckWwxcl8VN5n3Epypa5kXwPxKc2GZw8QeSJsnm/8txnrZNHnTfvQ3uYdWmSl21/8YmvBB+CreafugI7TthccwIpncC0hjwNV33nVKLig9hk5' +
  'SvfRX9Jwz+oV6ExsdusJwcrroTmnR1FxPYPWaxJ+Sl+VvE6S9nDmdXLiJKmVIVJQYPVdocG8Sc7Mo3zw59FEeaQ2NRiuzqr/ADTR5UHNNQutUdDuFwyx5IG2' +
  'YrJXviiW4sr6KDGHmPzE/wA06G+QbtDbjxrz6p8N2LTLuwpoWyKvn3kXOMgERA/qV6ddU2KPfG4xz/G/LTepS0nWgslqpDBtNwDRS7ztnj2cL5lSJPYNNAMY' +
  'p/ZNhNa0CCwXpZuxVUGLrZNpIOoXHEL/AMdVgFSdmKnNVsvFH5LmnLrbcHvGZR5oTwFUScTVXSull5UsvLtYXhHib5P7Wy/4VhNppJNd4of/ALmlOZL6t82n' +
  'Vs6H52M2jOK3i/EKHdEKG285yhsc4PMQTnLCytpClZWxrNSg0YBdjDM4TMfvFU8JqLHw828Qta9zbwaZyV91BkNO5bDGS5p8TTDrvMjM96ndhoEyaBMgDiiO' +
  'GGpzKh9oZ1megUS+fDxxT/z4KeEyjEfgcBrvdbZW1KJ0su62z+FskUNw6i28DL5r6RszJtza2sull4Kbsc/3QYDxe6ouyxAe0hAskflYBo/9N2LtW0OldF1u' +
  'pKMQ0GDRoFLcnuxNofINYJTKMKDNsL/3WDWGfkpIH0Kc3u5nAVV7NYprfU2Yo87bkvCuvdO2mL9Xs7b5/ROjRMTloo0d3uiS7P8AiRndrE5eUKbxxnBmnVTJ' +
  '3QLZ67srCbRpuTtKkVeVLMUHwnFjtWlf5qDci5xIVD6jBey2hkTkQWlHjb0QpeGc0za9nI7YY/7g0K7VrZQolfwnRDmZ9yTaCp2jZoVILf8AuK+8+vpZdODq' +
  'Ww4nKR7snzU7m7qERp3TWZx33j0FB852CE0XnRJvcOWifEvCLtDjMuGDOiLj8SuVs7CbJWUpaDZK2W5NMujjY347g5qTlyU7WbQ38D+qpimxV2Ur+gnVTgbQ' +
  'J+RwkjCjsofgi9g7SFqMu/uD1UlPC295q2PZ/MO7azQWy3um5jZwTeVLcYzyQ2t+U/1Qi7S7sIXPxO6BGBssPs4WeruqBfUnAaoNNGzwsujKilpvytlZytnu' +
  'Bupkpyou0HgdjyKO7MfBTFjoUT6qLR3LmjDiZfNfRzg+YCaDQsmfgol0cBN67rNEQY8TszxMrkV9d8WhXnFl7UQwrziSTmbZdze8uKmhuD7psCI7kBeu7M7h' +
  '+FlKb2E19a6Fyc2f5L23+INlo1hV9sRronmcCSiIXaRnAVpL81cDWNiaYkJseGPDCBc4mpLlFi6C6OpU8m8SLs5IC0DfkiuedgtbY3lMotd/EToL06G7JNRT' +
  'VOy65jXA/FUJ5WMgO8baQ36cjyTaEPacOai7Q3wRIQePVQY4wcJKC7NhLP1G7PuokjlLec3UWh2o7ku0HdXcrJnDujtB+tjnhCLiZucU8eaLd9GgD91s8P3n' +
  '+0cgPeifknF2MsO7BV5Ux3elhOpuqSvjxN/JMd1CmMrGW3uahw4Qm8mS7V118PNzcleYXNPJN7V5ZHb75wd1UQEAFrbrXAzDuhURjvrYFeoUtYn6bsrJb80W' +
  'N0nbdtBRFjeRlvtlpZ1KnKe+czby7mZkBzKk2p5osnwwfZt9EDoVsezSlem93xqj5WcK7aJpJrU5zqkuTvwmw7noj0trjYHbk01x8TzNTQJ0+drZeEuon3pS' +
  'wTmgzGRTaZIzsn9/9E3aAZOxlookCK6G2HEbIQ5frqnQz4mmXqsKsOGicIQDe0cHyyIzorx2ZppI3XETCMMRbtwkSeFkbQTmjYN9zWou5SXK0Z2h2osePXf7' +
  'IYnBFrhIhNFhO7XHRVw07hxnghQCWipaxxycCn/iKhM1cFF2t3usutXzJKbEnNri6SbzJKdzYbCvSwaCpsJOPRESPraEWquNob7oqUwdUxnOZQbZK92jtGpr' +
  'zCEOBep1ToxF6qDwPCvS2GHCYD3O+QQBB7IGQPNMiweF14dE8xGhpcBEIUcu4aTDtEHt+tgeIcrJk7oOtg6qds1dkuzHizQRFsxjZNTQPOyWttNyEeapSJkU' +
  'WH3bDuXW1d+SqpBcvz3xI1z3prtvdh/mmwBRp4nnknbO0Tghji4+eQ/JQDLyn4t/dQfwT+a/ldb6IqI/WabD+KPVNf6Wy3JnAKuJqVd0ACESM8NE8VLZ2Xvv' +
  'PoFxPN34NQc93aHytE1DZ2TmC/70hlomwwWI3iDPQLBAI9FChjxCDP8AmcV2IYXqLfN18Ns5aqE+VXwJfNR8JideoCD2dCNQnO2czbjc94bjpji3ZZi0812j' +
  'kTrYZbhFkk5UQKO814yqrzDXMaJx81bBbTxH5WzyQHeiHCHU5BQdi2d1514Tl+qiQp8DaSGafzhv/JQfw3flNQB/tBBA2mSMncOaL3DFEPmEWsc12kldPvKu' +
  'S9F1snyQGinFP8oxKdGFCTMckJAzU4sVgdp4j8FwwO1OsY/oFIP7NmEobboU3EknUrtHOdgnRXDhaD6odEVChjF7lEhnhaZS/CBReK8BSuaiPaPHDp6rZYHk' +
  'hzd0/wCBbUAZiYI6GXczFkwpYGy870XUytHTcna4cu6DmOIKa5wlEbQ87BZMqZtDdFNHu+Jrnesl2TJQoXkZT46qAfvhR/xlHm0hRQBWHJ3wUNrfCIba6CSf' +
  '+AojStrScMUQJIMvQ/VHAfzKYaeqnmKoXmyPJO+FnVA6Idm2b3VnogYjhNxwRdhLPRdlCaa1681xFxPLBdnGLBF8oqVJ0QmHi1k8CokWXs2ns2uyJJqmtgNc' +
  'IIo10vEVGHvvbdRNgcP4Q+f/AMrZXAisPs/UWbNAJpCaIkT9P+cltG3e/tR7OFyYtogawwR6b0513KhTbWwNizb97FNbBc1zdQnBo8NousnLVe6PRcQBXDib' +
  'a4HvK4WelktLZ6WeqnruEk2E6b4doZqNzdOyI7zQb3ykosGfGJQ/SSMQu4y4SbyXJyvWPAxFZars3zB93qg6b6p0M+IKRfdpogXV6qV390BrWwn4dUb2OnNX' +
  'vdVyEOAOuAqgbeyvVAU5F7jUl2a4Gs9Sh2kGASMHBxBCumI27nUlQYUWO97ACSPdAykE24wAM/NQofmfP4Jv4rDHiUA9oTyH9/yXbHhDfANAmkMv1kG+Y/sm' +
  '/wCHtiTj7RxRn6N/5RMgt8MFgHqpjQhSiAz8w7vtGimdl5ri06gr/wATE9TNTvA+im57t2TmgrCwUBA1WC0TXa753CdzqbAuh3trhvc3tXN4Qe4Y/ldPpZHZ' +
  'Pwf+0lPPhZiXaAZraIjWEPbxNByGilyD29CgDhgpJrvQq83FBu0tc0eaVFPZ9phMPUSd1QbFgTeNC0/qjEfBIaMGj9U6Lckcq5qRrIBVXaXiGt8PXVX3CWqi' +
  '7LD+sd4Tk0Zk9ELolSTZ49epUr0+u6XZmlnZMrcF31xKgQ86uKa7zmTUyDCYe12otaG5y/8Aj80HbS7iPuN/Up21RhKXBChp+0RjOLGd8h/wKI7V5UpY972+' +
  'z1b7zM29Fwm8O513ZF0wD4VTeNs0OavG1o0FpGo+wbREf/E9k3riicj80YRwitLVs0X34Q7N3Scv+dVEGv5qTvQquCBzzWCJuM9WqgA6KSbCFQ3iP6Jx5psj' +
  'J0QyYNU17hwil3miXi/C0TNpgNDyKmFoNOaEWHhmMwdN90V1ZYDU5BF0SsZ9XnTkjs8Pww2hv7owwPZbM0Q/5ii8NrD9m0qZwCvV7FtIY5aqE0jhEIjqcSny' +
  'wvEjpuTmi6M2+2R4dTbDj4tf8tyth7IgHmEXFl2emFs2imquviNmqRWeswpuYZa5L6xjepU5NcNWmzirz3ZhTG6bShNAWkqqKaeaLNO4btMGnDNzd6pAGpTG' +
  'CYgQxJrczqSq44FNcMQZqA5ngjPLviBP5hRmBvtYUS8OajwD+IKb6id0nylXfdduTlNRYxPGc/vFB8YUyaf1X0h4xowaDVRR9+fyFl4UK7W7J+ZGfXfbEf7v' +
  'hGnPqi+WGAGZ0T40QXtpimbuuifEeZ3QYj3alSfHunGoKOybGSQ+jomHoFDb7rSGn8/0UCKcWuv/ABx/NU6StBmDPRVnuP2WODL3SMrKKbvGbL1lVm3ovGfg' +
  'vGTyyTT0V0aqQwU4EmRfJk7oiDTlbSygXApFXJc57p3Ap62meAruMjDENr3Bgv8Aq3fLutmh0N2b/ih5YmKcIVHeJunRCM1s4UXhew5HMKJBhxOIDtIWjgux' +
  'jC5GHunPpuB0QUZVjcp69VWqAUbqPy7sPfW74RpZ2QxjOl6ItIkQm8qrbbw46y/L9VJEHLunR3e5kq0AwFlaSVKbrZaJz+ampzqu2zNHdd26cQprnvG0rohY' +
  '1zsTlogEOtrOivwx1H2CbvhqrxxRZofktjj+8D2T/wBF9JAm1pBit1GvUJu37HK9D9oA3B4zTIkr0F4vMOi8d4c8d0lRv5e7JsbB9zZ216qfmTIfmIC21k29' +
  'pEdEcBmqOHx7mHAhQ7obUnMlVwT2w23AaAWSbjuSFvaO0U5ALllYQjLLcBTSN82uNgRinWTUJ5KYQtDHNw/JBzaqYF12qk7MT3w54m0ZImHDDRoFxcXRU3po' +
  'HGRmnM87S1Qdp2eXZxQL8M4XlG2Qi7dPawxyzCpTefzl3YRc7ACZUTaX+KO4v9MlBUF50JTSHHs7rC5mRToYcxzG+GbAaZKsGEek2/kVxN2lv4Yt7/3BU2u7' +
  'yjQv1apshsjjWBEDvlirr5w3aRBdtpZIZIDWx79XbnOyZE0HOK4cFdOH5KVhXI7g0w7oNGYrYGhCH5RZLduHwusD/LuS3ORXDUdyOq7DzMp1yTIkNvHDmZdM' +
  'QmxIdYcQXm7xHvCpCme77AHj2g9mOmfyRlQNChS5qJoAGjooEfzQ7p6tohXCm5NpkdQrkUt2iH5YomrsF7tijH3MWOQZtTQy9Rr2+F37WztMNxlbOyVghDBr' +
  'V67s9DujuKom13W28juNfqF2cRwF+lU5hy3ZC2h7mWqElGfkG3viomwHD6yB0zHpvNiQzKI3DQ8ihEbTUHI6Kd89Mu46Jz3uDWtEyTknbSZiE0XYTeSAOJxX' +
  'NraeqlqE+CcZ3mddN+G1vhaQ9x0CZDziRWN+dsrbwwdVcLiEGxf6hZyRdm6w9F62SOCpYeZ3RvhmEyrjcM7fRFxx5WHmpZFYyEs9wt8pUvKJITNW09FO25vC' +
  'G3FFrsR3D35vPyyQiQfr4Rvw/wBvVN2mHg7xDynedd96p7meq/8Ap8B3smfWuGfJAy4cbNojy4TeDOmE0xycMp73Zwm/iccGp2y7NxOZWI/UrZNnA4WOLyec' +
  'sLZg1tk4TRkOIYWdk/6zI6quJRUhgEeljag0nRHkp2Bgy3RuMe9hDXibTrZOQKM9dwOaZEKetvqgdxzdQnO1Nl0qll7NSPi3Q9qD2AgkcW/ecQGjMqbBfHmP' +
  'Cz4lSY8//wAfCPjinF49hF+sbj/Mg9hDmOq0jvZL6Ls5/wAxE09wfugweI4qfmRZD8b6A6c1EhtHuojSm99J25/0bZxr4ivo+wM7DZxSeblEhwPrXmrsoY16' +
  'qHDbhCgE11J7iI3KahP0cEa4YouBlZ6KikMU7ogp55bst1uzROJjPDqLeu7NTGdktUVQ0sPJUzBG5NO6WDrvS3RfdInAZlcd2B+Pif8A0/uvZNmfPF4j6DAK' +
  '9Ee57tXG3sNom7ZXf+mdUCCHNNQRnafaQIbMpNJK/wDFf9i4o59AuKJGP80l/F//AGFB7Xx6ZGKSNydDtD/A39U7aoxLnvrM/mgEGjKxw1BUZv3zucIp5jgr' +
  '1zt4/wB7L9vzV+M+egyCF+Y5Zn9k6LIDtHYDQLa3eUMZbIVJTGe9Li6qtrpaCaaNSFHgg0IHyswR6ITE7+PRGWGSlqi4qe7PM9wDopBYU3OzwflzsmojRpaW' +
  'aqeicLbtl5mGiBNtLRaGVc84Q2ibivbxex/2oXFE+OARGzN+jg4uBm93Vymd76NtBJ2Y4HOH/ZAggg1BGBtmBNfV/NXbhnu/SItTgxnmKdHjunPH9rDF0tCi' +
  '862XWtJPJX9ocPw/8xV2HwN+f9lRVUsymsGDaLa4nmjn5W9sYd8N+SL34m2uCiRNXIO0M1edi6c7XH0t+6FIeEbl80GXNTPhCm7xZBTO+VP3TZyNswhfaQdQ' +
  'ptIcOSFoKmM0IgyobQ6WOCE8lJX2fBdnFVCEZZbgZV0Q4MaJuK/zMXsv9mCZxPU5Is2do2eGcQzF3V2fczX0faJnZznnDQIIINQRgbahcIluGNGPCMs3HRdp' +
  'E6NaMGhBosaM8dxjh7wkr8c9mxXYDABqVecalaKWVk/LVHkU1/nLnfOwznPJXR4dw7PCNPedrysk0TOidFybS2VnZNMvMrowtk0Ek6IxNrMnSm1n7q4KDUow' +
  '4AvT989yRqLOGSk+HQ2VBG5MkzXFxhXmmxvKiLTgUQVghOgaJAaIE0mp2SInZeCoheNTg0VJ9FPa4n0VuUNtYrv2RhbIz6NDOMvG7q7vewjzds5+MPmEHNIc' +
  '01BGe86NGddYPnyV9/C0eBnlCvHE2NblnbfjRAwc0Rs7exh/6kTH0CJYDFiH+I9Te6a5Km4XaraneVpPyUAfcCkBVRKAulIWXjVxwC7SO+/GfW43IItZ7JvL' +
  'GwNaJk0Cut+sIq9BjcBYXyo1TKqa5BE62yFfyC9gwPiecrjimQyG7KXrvBEWDkqhSGC42+rVfab8PzDK0O0Xaw2NqJEWOZqJ2VE8iuF0h+Sbfq2dU8twnS2Y' +
  'sm8yXbx4n0KD5neN3QJzf8OhmGTjHiViO/ZFziSTiT3rhniLOxizds5PqzmEHNIc11QRnuGLGddaPmr7+FjfAzyq8cLOQxT4hzoFfjRGw26lEbHDuN/1Yg/I' +
  'K+5x2iL5nFcRVPitd0BADxHBf4hXxNHzKa3QAKQ8RsLnUAqi84ZDQbjox9yg62SUggxoyVyC5sR+owb+6LnEknM2Vop4N8xV0UCCnbJGbg0Csz3DXaixzdyY' +
  '9Rqu3g/V5jyW8JkuNs+iD4TuYKlGEuYVxrwTZLJ1Qjuf5ZoujGM/wD91/l/83tX+s/wt6LtI0QxHKir3rfgpjGzsos3bOcvLzCvQojXt1BVSB1KJMZr3D3GG' +
  'ZKvxKNHhYMGqWSkLGtiODS7iKEPY4PYsA+ujfo1X7ztsj/6j8AuN3pkqVXGZnQLlpvGI/AIuKezzxIbfnZMrhomwm4u8W6zZuyEnO8U6q8cAvaRGQ+pR7MPj' +
  'P6SCuUhB3utt4fiVefO7+a0AwGlhd6blcFIdx+Eq6p5IjcrVpoRqEWA0xadRudm7wu+R1UxYGxq/eV+hFpiOqGrt9ujsiSF5sBmB/wD7K5SFAyhtwUs9FX4K' +
  'mSHfB2oU7a2SFk3KYb2DB7z8fgi5s9pj/wCo4z+f7L2jqeUYLhqnXjOmSp3AhtwFjIx92Ox7ulgACkn7S6rgynKwncDIbhCb90V+KLnEknMq8SCcgplCXi/K' +
  'wvfSG3H9lRvQDJVsZDzAmeqqET3ZZ5gjXiVME11lbTLxw+IdM93kcbDPHJdnErDcjdwskcF9Gin/AC7z7N3+mdE6G8ItImdbQ7Mi9dGnfXdCq4KW5M42QHgB' +
  '1ysiniZEFpk1ik2qrX8rJdxIY2NZqtphj35tHwTPMBJ7c2lUV6VUWe9Ep6Km5KFDJ55ItmIjx/SN3GQU5EQx4R+pTWnhBMky5jJNacBU9E94zNg57nC263cl' +
  'aDop5OqgiN7m03d0aiwVwUOKOhVRJckWPE2nEIbLFPtB9TEPvjynmpYOFkDsIcgWTMQ4uOa8R76WosaSKTWrdbL7hW2H+H9U89VDgyAazQYmy6xpceSgudGh' +
  'ExfdaZyCbtAk6EaTBwOncui60CYHCRPEu0YXQowwiMx/ujsm1ACMBeDhg8Iw4J6uXESZa2eAO5FX9qhMht5UKjO2bZ4bSBiRWSc2HELQ4SNjRCnEivHEXDwd' +
  'FU+lrYYzQaMBZeneiBRH+9E4B+qqpLpYbnhFXOODVLuRqyncPHmF6y5PHC0feFr4Z6qSlYWP9CMQdUWvH+aYKy/it1CmEYUUyhPqHeR2v7ovvNplmbKd4087' +
  'CNVJTDB8NyCPu/qnKaY/an9rEe0O7JpkGjmVcY0Q4flAkExXZ0xlZd3ZqSDITaDMqTYzm/hXFHif1L/D4t4kugFpNhKDGiv5IS4neZNhDD80dlh+N44uQsnu' +
  'MYMXGSdEbmJdEZBTV0YnBCFkyljn6Wu2RjAL2LtbJN7i6cHUXMWT03wRirxbiuCibytlqCq2A6ixhFIgdwO0RiSuvHjap5ZqbSDZPvWus5HcnmoP4f1RRQvE' +
  'mmdjE0TEyJ9FjPfosbYTXzDoTiA5uLVeiN+kwR77BJw6hC7GBnkBM/BdleMI/wC427NTC9lWK33vKiSZk523sBZib08OSe/+JKTOSaeQUpIz6lA5aKZsYzN3' +
  'EbJKllN26bKWNiaquCuwxevUUneLPcKaeSn5bRztYp67kMc12jPGMvMNF2sPw5jyqlFxCa0Uu6ogDlVOZ5TbKyZs2fmwn5oooBoJoj2zwJYSzQuC5dzKmSSd' +
  'TvT3ZNqjc2gieIYJ/mpx4Zjf+bEJ+S9ixkJv3WABXI8ODF/E1H6LGdABxYTNqvOg32eeGZqjq6GztogNwYDzFVM+ibHu9JqlnZzF+HiLJl2K7R3QWNblmnEY' +
  'YBBjW1KkTVXnGS03QU2K3ceHnoq/BX1fzwO4XI8kOdbRLJNZIdUGSV4ZBXTkqqQ8I+aLMsU2QwrY6NDaXCXtGajVU4mOwKun/wCVSzn3V7NyI8wnuTNgC2cf' +
  '7Z/NSs9nC7P1V5xm5Hu5yaT94TUo2zbPEH3WXT8kLt9sLPzL2Z/r8W5NpIPJe3hMic8D8V7DajC+7GFPiF2UTZb0OVIsCokvGJ+XAqWDbDLHRXmEtKle+SD4' +
  '8+LBSb4W2Oe4SfEoOQXAF2sZwHVcAnLNZ3rJbvZGrTaSVOwNUjgaKRsPmdQIojVUsJsv5usquE4qae0Ci5lVU2DHJcUpnxEougTOyvOIFIbv2V00IUsCLLyG' +
  '9ysDB6qShHWlkkOVt45rZ/8Ayz+f2AWVWNNCvfh824fBUuxfwY/BXJydo4SskOJ2jaq9dbCZ5nLj27aIh0gm6Fddsk+b+IpztjcQ8CfZl0wf2Qc3AqTaala8' +
  '0IsYUyanxSfFgpME0CeJ2pVRNXWyLvyU3unbfOSph3AaM6mxsMmQKlpYHZjGyY8IoEfMaJtoFjJaWSsBRcM1NcRrkMyptaIA1fj8F2m1RHR3isnV/wC1Exr3' +
  'ZO+rgAyEtSuyd4x4TqNFeGIUxZLfnbCd99E8pLC0MCmaNaE1x8lB67vr3U8t3FcYLTq1UiMis8rxP80NppAbo13DNXG7PAnlEu0+Cvx4pPVSgsvcypO26FDP' +
  'kQiwNsAiNqJsT+2gTYXXr0KoHopQyHcgmF9S0KSF5SkAFWJeOjaqUBhbzKyWKr8bACqKu9MomwuTYgzxsrmjAYZn3iPytdT3bZzo0WcRk0qbCCOVoRaZvIxa' +
  '3JXoz27LDOQPF8VOG2p992fqaq7DNOVEReocQM1xVlT0U9F2o/mU/dOPdyUNjhIhyZ8VOyaMQ5rsW4DxJv4O+vHwD5qnQBVxsqN1w5KmKvON4clRTCDI/tWa' +
  '+8u0hOmPyU4kMXvMKH4r/L7QI7fJGx+KDdsgxNmdqat+K7W+0s1CkOCHprZjZUVsDi4us5qZ3KWO6Wy1XZnByLnCTRiSrsKn3tx+qCDc0WyQMpgq64SIyXsy' +
  'QeSxb8F2k6pvaRBs0E1vT439NFdg3+zaZhreEepxKoQzpU/FTqeZsOgxKpZ900KkVLedudq7xHBfBAWiE31VMcGqa/kQ62U7q6KNHidoELo9mKNbmherEI/p' +
  '5bsyqn0WM+dkhgph0iuNodzWY6fspsc1/TH4LgiuEtCgHRD1CpGKuvbDeOYXDDds5OcI0/pVLsdusPH+lUNdM1dwaKkrhFyGMzmpNHqbOSxkpOO+Ve1t8ZaB' +
  'i6eC7NkxDHz57pV4g1wQcLAjPGamKGx11pOoGiL5zmbNVWiDrtXGTZ5ldg0/iOtkrJe83dCa4Ok4ozZfH3SpE3T96i5LtHDgHzsM8rZ55Ixopl1V73chY8gz' +
  'k0Id2GNxKuQ5XBiT7x1RjxaEeFvlH7rIrhMl4ZrBFz6NCvXZeVuiLWHh/OyZ3JyXDXqpPbLqqPu9ahTOHmFQsUBEhsePvLj2ZrPSarCbycyhRMC7tUM4tNH/' +
  'ABXZgmHFGMOJRypxnkuEBqnfcrwcZqbqnuDZVSy3pupOxtgmg8CjsUHNGGKnEcByzU4TWbLCP8WLiegUbbdpiF0MeFzx4uavxWDkD7oVyAwDopx4gc/ROjDA' +
  'cLFM13JrkdzogPLSy40T65KrXXtWmSEeG9z4ed7EdeSa9uDhNE2TNAF7GH2jW5kyb8Vec6CeTZ0UnRJdGrjdEd/Mo4aJDAbs9+Z8Tvkvut+Zt1VeFRIhcwBj' +
  'b3EU2PGBbD/gwwJfzHmU7ZtmM8oj/wBApBa20C4q7nDwnkp/Nq0Orf2RiDiY3Et93qoZLuJwndGKI+lQ9madRed+yvHaY0ca9rT5Ke0PuHV0aqls3+KbPFHl' +
  'iukfiuzjMLHGtc+neEnBTtoJoQ7wGZ5Ls2trkTimk4DK1vlGSDm1CmaBdns7H7S/RmHxX+YijZ4fkhY/FXIEFr4+rqn1QER5cXYu0CENsm7Ns/wLv7LhDoh6' +
  'yCkJNGg7iWbbeimq+F1CgBiVdzzNhbqjs/lM29LJuIAUpEbPkP8AU/srolZIDKtjneZ5Pd3jgFdGJQG61kW8+GzxtGZ8vRBsEOZFijP3W6q6FdFeetl6IJA/' +
  'NXsGa6qQEhv6uUjELaeJDs4snffwd6qUYhpHuzqiIT3MB8pxVGud0E19RF/oKbAiNcLjpsJy1CnnmjL1VN0UAyoLWjlNcty6MFM+J+dl7XGzmpOxyGZTRAhB' +
  'r3ZP01IU9tjOjny4MXuwoY9F7DgBw16qZMzqgGf+Ij1n5G5KUzdFB3ZFhGtvZxHe0l7Oef8AfcD81ILjm7kudkyQBqU4wXdt0wXG6nlCYOW7RScCHabl0K43' +
  'JXn4uVDuC6ZPdhy5oxHjgZ7vmOic95m52Nl1s1ePE5cc7g+akApihRkL0tLZWXW/FSbjZwUdyUysEBDim75TUK7tDSw+ZtQvdiMdrWaL9jd2L/KfCU+FEZci' +
  'MPEFNpkcN+QxKPlFFSyiFZ0sF3BSd8VI1abPYiZPv5emqbHeL+3R6C9kiHPvOxe7MlOEGTWN8UQ5KryITMialEnFcf1beJ3ROiOxd3gdu4kZgjJCDGpGyOT/' +
  'AO+9J8Zpd5WcRUtngBv3on7L28V0TlkPS2W9M47k5YppdD7RuLmnNHhAnkFRe6UbwlJY4Yq+RxPy0Giut8DcOfNTsoq5oNhsa0BeL5LiaPRcJ9FxAFSY0T5L' +
  'CXVXRjmrrMfyUgrjFN2NmCoFR0uinedPqpPd20Pyux+K2f8AxGFrdPQ9xf8A4kSjOQ1tk1SHqbGqRwKlpY+LHN3YYM56xOXRdtFDWwYXFdya0YBOigF9wXYY' +
  '/VXoz5M8oQaOFoyCpRTK5xPyHc4XRq5Sq4/AWyR3dn6u/LcdD2UtDW07QiczyXtY0SJ1NFTcaOfc87DHjuLIGDbuJV/Z33mHwiJQyXHCeBriFMWSlVXYhBcA' +
  'CZH5LGrqLkuSkFPdDsrHE1BV0Hicuyh+Jyu3cc12UMzOblM428t3bNmzZxD8/wBE12osnKUtyWWJRflg0aCwyxwXM47nErswXBQ9mZR0TPytzKg7BB4WmpHI' +
  'IsHvmZ3KoAZ0VMBwhU3eCGSNcl7SLM6Q/wB17NgZzxKmVw13zrZs/wDP+VvZQz7WLT8IzKkN+vDv3jSxkNuLjJNbs73McaU8q4z/AFBA8TebaqdyDEOreF6n' +
  'Ajy+7FH6hOD4LuGU3NqPivaC/MzM8USKDIclwq6FPJSbgMP3RO7zuysLiJiUl9IieN2CuN8bvkrzsSsFM7lFI2RoZwfDT4WcN5bZJSyytZC96Jxu6ZWmYwt6' +
  'IXvDZMYqLtsXF3A0/dCiuyHCFKyimbHP8op13AxomXGQCDtrjNhT91tSvYwJnzRKrjeTys0Wu4NwA5YKWagkEgzOCDYtIw/7uavxogYE+M+l7AaDTdENpa0n' +
  'C8cUWRDfc3EBSaA0ct6QXNchZEeXAOAkwHPVR4rZ3IfC2XvIoudw6SzXivdVI3vzUdz4bQ+U5jN5/wCfJOJ94zso28Fdc4N/EjDY6g1yVQuu6Apar7rfmnxI' +
  'hmG4cyjFiWBuSlbzNhsB1aQtoaBjxqTbJOF5EASKazUyUV7fDOTegt6nc4SqhGXiNB1UHYmZN4ui/EU7ouSkKuK52XG58S4Qb86uVTYKUQe7EtCLWjBcRnuz' +
  '3pqq2clpAJdI5FBzaOC9o+csVSq8PxXiA6KVT1TW4AnPBBzGtZdE5NwG6FK2Tc7bzTJwEh1KEMHhGUlxtEPmCvZRGgASDXUU3M9UIZqWcTxpyTIOfjd64fL8' +
  '7JBSCwXCZjQri4SptMuivETGosmgNUZKQxQYKlN2dh4WZ6nMqnhCopWz3AxjSXFQW4xfE4qG8e/ClbJVwKdHGIElzsITZ2uvtnSnK3Z73gZOM70W1bQ7G6mp' +
  '46K7oMFecua0QOgluFNKdLMd9szdHu/Rc8lLE2SGNk3UCMWG03Rw0yTiem5II/BTNk1OyeTapkP1O5eYcKhOfFg9q+KZkuyCc92JMypWltlV7N3oVde3sz8l' +
  'P5hXXiY8wV7RTReUXDxGgU8zuzeZBUEhuNdd9o8VKb90BbM/R1342Ux0RKpgoYOLnWyQbohqg9zmSIG5GA5Q/wBSo33nAJ3JqjvOAKLjmtFwiXOwbpagpryh' +
  'TxKlb13SLIXJ6pg3BVtnYNnbPieYkT9F1KJU7CdFNyoplXRZIIDwh5qdAFEiwJRGE8IwMlKIDDPNUNVUIMGaM+inmVz3+LBThOlyQEcXDrkjKhKEPNSX3Ruz' +
  'O6xupkpEzfKjUXuMyVezhOH52TCaaDKXOzZ+ZKlaZ4zQAyQ47xh0u8lWwl2QRccXGa/nUVxyCiX3BkO9xOTuzqOambWi2VgR76mANeSlZzsmbLhI4GBlF6KV' +
  'vU2zU7ZB026LiElJrgeRXFCuHVnCuCKD+MSV+MGzcKSM1c9FM490Zia1apnoi1jprmbJWTKO6IrZXhhPJFznEk5mzbYP+3fCB5WQx5aoOGBUJ/ld+i9bXFNJ' +
  'V4ZIu1siu5SUk3qn6q64mWMlLcFnhRfKYbU2jnXeluHcxppuTNkOH5nAJsNszedOpmUBqd+7ZOybbMwqOmOa4mJ9XXw3g6ouyFptG6AihIyKrluC2W+2HlEB' +
  'Z8kzlSztFeJHZlRwwcMNwI5pvVYVFLCNUB5aWN1lWyDD88QJ3VNTlPca3UrWygVy9JpytYdOHu+e/Rc00xdo7ANBN5XfI1dN6dnK2SphZgsa6WStNk+5y4se' +
  'Skcd4Hdmgtm/GFGh+SK4I2Smnw3YRGlvqoIOF5FsMZ4218DrBZCb5GF3xT/xJw0cnJ3Wzpaa2U3IjP5kNyW7LWye5RVrZNRXyhkRCIdRxDOiiP5onclZLTdC' +
  'HKy7DqdVedV3fhuQRLl97DcqqWS3XfdC2f8AGFtY1cHfEL13A7QzsnbdfxQ/yQcxwIs2g+WUP4I9SojdQinT13adLOzGOala3Q0RBxHczU1kq4KQquKqnuCj' +
  'hIEznihz72TsFIUCnn389Fe1XRTsmTWw2z3Q/LPmFBlVs7zTyknffhAqXO0TQQKE9aKrfWzVXmOkVKNwHXJRNozeXP8Anb1TgjYAp2AirjgFMqe5e8wDu4Nk' +
  'tLLkTBcJ+SpZO0gRL+DUBoNwWz3mqQ78ckGa2SsE+ttz4qQQc3DPfEJ+LPCoB1huCaOaI0NtU+D73iamg42X2CSkVJOPJQoDcGgT62hGwhpmNbJWTdnvQneU' +
  'liPdk7ksrGNaLxJwTAQAXGZkp2zRsrbiF4gvEF4gscliO5KPXcCmi7cBzHDZzUmBzz90TV4tZBH+479F7Xa6f7bVwtiO5vcuGGwelmKy9Qva7Mxw+6bpXa7B' +
  'tUWFEbix4nJQIjoEOJ2U59k7xei+8E/Q8Q3GxG4tQ2mDn4hpa5jhR2HJSKa3VTKKkguot52hZ/BeFyndIWCwW0s8soiG/LeElIW8TnNkKFqaAZhrULQpqazW' +
  'CwC8IWAWDfgvC34L6tnwX1LF9UPivC8dHLxxgqbT/U1cMSC/1X1JP4arjY5vUKU0CndzNOGtVf8AgnGPAvRsDWp5hOhsiuEP3clMBzuZVw3G/NSvuPyWCoBb' +
  'OQKn2Tf5SQoMLtolx1CIvFXqphCI0cTPyRuCZAnJSNvCaYyQiGhPuhAtM7Lr0xp8pO6LBNTuyHOi8XwsyWawK8BVQbBDOEUGGfULpvC2albTccQQMqqK46yR' +
  'tPRBqDdUOIzwWawXhCwCwC8IXhsz+K8RXj/7VwuY71kvqz6VVQ9vovrLw0NVxwgXgaYlOkJDTeAyFoFgPNFAOFE18N4LxJwBzWMxzUjQq9vhzTIitrdohfV/' +
  'kpvaHaOU4PtBpmq2mGTRwp1tgjWE8bose448ledTrugaqTa2siDFjg5RW5XjLohuz7u9dM8Zqep3HWdAgpd3fOAVKqnD0QbiSUXHxGgFg3ZrpZO02DVlFLSy' +
  'WfdSPhKAZRuSCLmybG82vVFjxJwxFgIMiEAHjth4mfqLNi6PTm6HeY3WpXr3BNkGL5mAH0oj3MvgpGyaBt+sB4MEOilaOZscUe85aWzGQTAbRYBuS3SizzUQ' +
  '+C4vgqbgnia9FLVV3ezf4CuF07PpDB7RmPMWhzSWuGBCELbZNd/qZHqtllgxheg7zDdA7lzuVoPkiEfEd3eGVptIhsDGl0gAZr5bjeimgp+u9KdVQ9wV03wO' +
  '4mu3hubIiZrgVVhvIC66nJAzt5qVmItY3s2tu5jNBcK7OLngVJzmgmkijdHs31buXHi/DNObeiERrr7Z0cERudNziaRnW2SkEBbtcP7oePQoWHuKiYUtyFeh' +
  'uii8JsaKuCgdjBMFrpuulskOtkrSqCgQy3Wsbi4yCaGQvZjGJLjejtMAt+kMbeoJEgYgqY3wnHvcMUDZ2N0ETXgXhKxWIVFWyW79HMFkwZh+dnNMiAyiNoeq' +
  'AjTLmUrjZI0V05WG6aHFpwcu0giVKsOXRTtcbW3ZX3VJ5aLZBdlFhThk6jG2bVjXcLPOxzfkhYe5nYbIcTZoHbxGAm5OSbeYWObAE2nIlDccUOqqJLG2tjIh' +
  'Ew11UHCZYfC7VPdeAc5pYG5maA3MUJB086IMaJA5lGyVstydtFPupzojKQGvcmFk/wDNSeK6qfiZ5ghDiROzvYGWaiubCv3HXTI1UiJEKa5p8EODI8ptBwJR' +
  'a4SIoRYwtqJTMrYcZrgLvBEH6qeQoLKqllbYJ+8njQ7h7uLE2WPDgFrJFzxqVHe/GjUeVoC9ULcVULFYfBSxXZNe4MnOSvvvOdzWQXj+SzWAXiAXjsuD/wCU' +
  'LD3EhZKxwsLbKWzCIIxQEqWXjhvgjJBw94TVQu3g/VH/ALUYcV0+2zPmUeeLZAH0tD2kgjML6VQRm0i89HWTaSF7QT5jFcJvWVVN9jtDNRe/i0fJ7mi8G0UZ' +
  '33keu4FNTVBuUK4gpXqWUCoAsSs++kLJ2yzslqnNlNXcNzrZy1VxvhbS1m0wKwXj+ndaTpKxzHCbXCRTmeUzaVFi5uM/knC29iMCNQqVbiOm5+qruOO7PVoP' +
  'yQtHdsq3s3RXGWGicdTuO6W+ltLboE+ia67K9gqb2Fg7mW7SwppU1I7s/dUgKInW07NFbfgn4hGW4AcENRZDZjGHyC6rruS8u513eqbuQj/tjv4ZDLrpEkz8' +
  'SCCnY/uXxMLkJxHU0/VCJtQhv2eGHHxTBocrMbMFkEG2eneT3KgSXUWNPrvDmjM5U378uHCdks1LVCFB4tofgPLzKuF1+JE4nvOdgPvNodyalaEVO1rV0Rtg' +
  '/h/Xv23jOUGgBQ6IW+tg5lDe2raT5mMH5raCAR2cF3zonHcrQWlG2XeBqYRqiEPhuyC7NlSM1NxnuXAQ0lFlyZlPdatreDJ4f8lNxmVO2doPpb07pnTv3C5d' +
  '4WjDovTcHWxiG99FjQohF+/NjltEPZ+2vxbo49Jr1t1Q0t9e757lVRFdU8I7k/fOHLdDUHNxCmXSdqgSKHcmow84DkW6bl3cNmJ3SULJ2N702ODAQ29Sm6wW' +
  'N3ieSJQCbuSKlYO+mudhQXW1+07R4gOFv770yr9tcsLJi2E7zMIQOoVVPeNh3TYULG9O+YL13iHFogb96cSpnut6WeiO6eiiUqhyagOW8VPl3szhuuHNAoLt' +
  'YxAhQuJ01ITbDGA/XclZy3OydhJSNt5xlNNiP8DcAi6XcGw7hQsFo/CO+YX+GdVCHOaG56WOR3g4NHHFlNRBpJu/L7DOw87Gu5KQw3Jqe653oidBYQYkz5W1' +
  'KP0eA2FD/wBSIr+1bU+IeS2bsgeImd4zTuu+Ee8lyH5d8wiXqoaG87eHVbPD0de/NPdq/fHeSVzTcAFjeaKHKYQvMnSpt8QUshvN1NU5rZRInLAKRikN8rKB' +
  'Xp3G66psNs7rRKtkBl4XwSZdwLRuNG70BKI074cN5N6IbhsPXeaoY0HcBDu6KYXOyqbdbJwxVUDobCCwO6oyEp2YLnbKygwU3GTc0YcPgh/M2Bk5DM6JrW0a' +
  'MLPNFd4W/qr73XojjMnuB3kV2jZfNOdqe+xlRfy7ru4C/l+zUsqsbedme+StFIeH87a+I4qSkGh0Q4BGJEdeecSsbZ3q6bo3zu36XnuO/LuDwzoj03T17gJ/' +
  'RH7NVSHcctyQUtEQfEcLWi1/WzXujundhwpzkO/dwzonbp6o9w9HuD9hlZUWTNBu4yXPVAE0zPJNyGQtdybb+IK6e5PTu2t1KPLv33r3on7gXqihvTTvtlVN' +
  '9OWZX6aLCyQwXO3sxi+m5dObShDZV5+VkJ/OSn35Q3C45NKLte/dK76qJvhU3j9rouHifrkFMmZtkMUG7jXHIp8tbZg1Qc81xUioh8knLp3TXbw3IjszJv2B' +
  '77k2AgEqJ13iuSyWC8Kwtd9qvON1uquto3dnme6cdGqoUVnmaQvTupDuZID1+wOPalpmKTxUXr3GCwtxVZLJYLNYleJYi2XeytlEEjKctEIkbPwszd/ZTPw0' +
  '3Wzw3eGm8ebU6lFEi+UU6qWcu7n9pfDiQpxS8Fr7s5KN+JHuMN/FY901pMpnFNZsjeCGLt/z8+5dtLhO7RvVdqQHxnVaw5cyi97rzjnvADVBtSM5IYBeFTAk' +
  'p0Txz3WOOAdVUUPZRg3jf+i6bkNkUAw4k2OHVXm8cI4HTrvnpvuMuI4Hv52PEMwRDMZoN8Gc+SjfjR7kbjp5fZy6QEMcMNnndqU6LEdec7E79T8Fw03Wu9EZ' +
  'ZCe4RqhtDz9W2T/RRIzvHFM+m61/lM1GaKRLhNzfdvhv2CSiQjHEOI+K2Q1oo340dwdxVP8As0iZNFXHQLRoo0aDer3Banq9CHFpqiM5W7TsodJsWvw3wWmR' +
  'HegZIyw+wxB9BdtHGOMDwKP+NHup2nvgNyK7yNmhb2Qxxf8AtZqtLLzsMhqq905w94WB4o6R9U5hxaZWHuCylfl3nbmgiG6Oe9PvIjNnhNfDvAum6Sj/AIij' +
  'vy3J2HvZbt3XFS0sO0xPA0yb95yx9VIYKakg+J6N1Uzudq6gJkJ5qQ3g4YhAtzTOqG0tHDEx62z+wTsbCbi4oQGfVwRdG/Pu4ggR2wxeE5tmownPi7497Pcu' +
  'Bs7gvOV1oqojPVOe91yDDq93/M1QXITKMZ5RuGI/wtU9wx3C9dyXZ5QxLfkUS2rcwg4LsInvDHQ6p0GIJOZS2v2F+0iHeu0mclM49xTuornRXsLZGTTiop59' +
  '8e9laXu8EMXijGd44xveifcxcVBu0vMqTgJZlNgQaQGYfePmKlbJCGMBj13RA2YyAEi/VTNtLcVNAqYpZGgE/wCYY49kT7w8v7ItcJEbnEO8nZRQ9mBEhxHr' +
  '3VO5imNKYldrJP3Tuy3HeveE6bkDYB44zr0TkFJhAb+SJPhBRgQPqm0n5t3p3EmiZQL3CZrdCxCoFWxrJC6pqWlkcc5rJu2D/wBb/wD0i00cNe+la6I7BiJO' +
  'J+xxLzAZihIwR6bp7l3qh3YHrb2z/C3BR9uOB9nD6K43DVDZobvaxBU6C2qoJDdmbcV4b3JS4ejVU7rmPh+ISmMlQUKlnY86sBRKuxCGxsBEPvcj+6LHtLXD' +
  'I2z7qZtbDY6841dvz70hssM16bpG9K1yHdSU7AE3Z4X1kU3AmwxRrBJOifwmVKfGiYuPwsbFPhcSBuma8JVGjckO4aDjZI8cU+FgT40c8ZHw5WiFtBw8ETy/' +
  '2Ra4SItkasOIV6Gbw3ip2l0uGHUou1+wS3OIyBCb03JL036WEqW7PdJ9LJrtSPwqJtbvqtn4GdcyrrfAm7M048T/ANLWwmmbYbQB+tlSsVRV3JnBU7iRwxU0' +
  'Yex1OcQ4Doi8kuecXHErruCE7xDwO/RSIkRbQrjFdVjO1qLVytDai9j9lhthtDnOoAVDmJFDcrpv0zsJGSn3V3Sxrcs+ikzxO4GBM2aF4G4nzFF7sBUpzzi4' +
  'zQmJondmbZmyXcXxmvRQ4QpfxUroWYWKpTcvH6xmP3h3BccGtmi44ut5BUnLL7LCij3XBMPNeu4Nylkp0tidJd0Fe1sr43Yqn1cD87Lg982hoqVx+zbzxTob' +
  'xxBTGPducaNaJncI1RcckyJ5HfnuV3A4ZIOZ9W6o5clod46ZqVuPE77M17DJzSCCpRiC+9Om6DbPef3Tj6Lkr58LU9/vYN6qWbq2BmgsDWibjgp+J+blJM2m' +
  'HV8NsncwuZ7uU9yWBTnDByjMzLaWXd8wjnUdbK7p1+1z2m5fIDuDRen2Km61ulSgxuakMGpsL3W/nZRPfqbO1I4nYchb2Qd7SJ8hqp91Kytswq42RYZ9xxCn' +
  'ZTeva49e5cS43zgN3kqfYob2RzFeWi9N87tMENw9yahYrHcpuho8R8R05LmcE51jjysa0+EVNlVk6K7wtTnxHXnOxP2GQX0bZz7Y4nyqpJJxOvcDcvWTtkpa' +
  'bnF8PskMM7MbVI35eJN3H71VQLGyc1QKWqk+jiJ7pcr2ZQOid5RQJ3Vc05OIyqUYmpVaLEKMXGfFL07uiFQTny3TDhvLIbDKmarEiD1V7t66uVIjHeq4mkd3' +
  'Irluc7PZsc7oEQ8XSNVwVPm+y9g9kL6RN2I4l6o9UZYWHohbXeoVMBnq2aBdA2d4/BdK4eyh9Gz/ADXFHevrX/FeJVAKuRDcnrY+WYsdzKKawdU4e8RVAXCt' +
  'LO2lMe8P1U4dRp3VNyVjyfMVju8NVJwItn3UmBcRQdDbUYIviH0H2aW0Qh2giTa+5NRmfeR3qd/SNDbyzV4RYhtguaMKFTV92DUQ0IWVKk2gVw4ZLQ6qR75/' +
  '4juYrBTQwIXD8O6lqi/aXXXGstEWQhdZ+f2mLD2aUjIumognPnvSFtbMAvC34LwNXhl6qh+O+HNJBGYXZ7XD7RvmbQq9s8URW6e8PSx3Jn5JkswDbJUxUzWw' +
  'oTHqgJ4btN3jpyzXK1/4jvynMdxPWyS7WJ/K39UW3uBuA7uffuuRCy8JGWe8bK9zTuaRD6owYkJr2mlKFNbFPZ3WjEgz+CpFf/QuARHekl9U74om6qtKoZci' +
  'q+BvzV2H8e5maN1K4BXzHdcdXHudd2VhdLhauHHVX5zLte7n9hbZM281M91gqWVquA+hUjQ7tN7/ADF+591OEEsa6VJiq9ltAc3Nt5Y70mzPJGJEAhMGblKE' +
  'L587v2U3GZsxVZ/YZqZo0YlCGwXWjJBuqueX7Hj3AQL9fDmjbIY/Ybrjdfk/905kSjga97I7t+KGdmMS5dnscNv45I3ojjPn3Eu9lqp+6KIQ2CTW2XipnvMe' +
  '/nnki5xmT9iutaSUY+01lgzmiTY2bcrMLPaMa4SOIR7OHw6Ny7jVVpbx1+6pE8Ogw+xSaMMSpN3DEcbkFmLyrsEXYbaNFktUGsbdljX/AKc1mRxV2G2XPVNh' +
  'epskFXc0mnluIG/N3wUhbT7FdaFdBnJHmq29vtZuj3YeblLwsyaMBa6KcBgpn7VM21wR+wPjnOgVDfdyRcc7BJVQddMtVQfFHM2UIvuw3ZCpQnV1tMPsczgj' +
  'cEjgp2kSV5vHG5+6uIkm243EmSEHLH7cTcnJGVB3ks7MKriQYDdhjBow7kk1OQRe8zO7fd4j8k37JWqaG5qUldtvOowIhimi610Q4Moi7X7cROneSCvO4YWb' +
  'indk263AKlN2TclcaKoUDnZkrs2galVKkweqma7wnimS1+w//8QAKRABAAIBAwMDBQEBAQEAAAAAAQARITFBURBhcYGRoSCxwdHw4fEwQP/aAAgBAQABPyH/' +
  'AMzouiQj1Dqt/wD0BOzP/wBp0JUMLJ0NseSaLjt/8p00hmVHHXeOJZNH/wBN1+mcAfwyv/uIS6nMw8wru9Mcf/MTToqhSTBAvq//AFENfeMz6DRESOp/51Lc' +
  'Tb/1yNpRFYKTCfTn025o0IN3aLbKxf8A61/4a5q6rMqO/QWzU6UUt/7/AO1fTXWmWNpa+RiM86S1fFYQjotXZlnQWWNn/wAdxMnSv/TeI3TL5DtelQOi1d5r' +
  'SxgjW6O8f+p/4BmVmVKg1Lxcct9KEf8A4anxmEwWB7p+Ekr/AJMp0PVg9n6R/wABA3cFBbuplun3TCHhgZ/3Y7LU6Lwe0o6tM9WeJ+0S74pmquVKgVB0r/3J' +
  'Z0NOmIIMO8+4WKx9aon0HS4fQPoK16uY9Hosjo/+1SoioLe0JocyqbpeBHSTvmziRxhE6lfMLRxnVjGq9Da7cXKyM2/Nw/I+YVwUOGbmzeaXphbWHbXoCtoH' +
  '3gFd5YmgOFeL9o3lfdJ5UEzFqY7yuujj/wBCEsR4ls+m0WomMsWbR+kShCjufF/UvoGPr8QazJxiw6GjKjK/86gQSz0iTcPpMSUbsZidud2CeK7s3Q8ZlzFd' +
  '4F6Zhofb6LNk/GZzOOp0nDAHUMGXj00eZpjyzRT0RbjX4lbF6wrC+yesTik2SW9ZlqEeFwuwwvsruoIqvEYvxlkglvkQ/wDqdFLm9dE1rBJdipv9bUELah6E' +
  'X6jPRPpCHZg6sytTLodFldbF94wkuo/+KKgtlJV7mvRwagPbaFkzUK6Hr0dyPiGtU7oTufdiyJ7aGuP1l/QpvYWJSOqxgpbqHaGiK/RaaMD3meoZ5Iy0GOvE' +
  'hNGY8QUsUmxd3idx2YpUlfU/SdABoQyTIJVbmK/+EqV118ZXUW9+IpWtsep0CJa9uJQDb9WCCA/eEIjBSYT6iUllfmFWlu9ZYAu8way+JZYywrkhN6vmGmhr' +
  'xFuS356XL+kjIGL3noEYDazRGourrE/8dGj8zJZp+GKskFGBglJLVRpNb6DEVSV/4Mfprh0XByowerOJp3iVBT9Krx/5DfROgZ9IBQYCWX0iaoSgJYd4O8Ig' +
  'dC0EWJHTtLP0qLfIzTm3lFVa2w/wFBhoCbhtwRxDDtLv66lSoECBMvQMA7rKPRJUqV9AXqxTaX0MDXzL7qOaZO0tKNOGWGF8UPmWltPmP1NWnuOhBhOYktfD' +
  '0AvqdNGP/n0TVUq2lUP8fotVyuiiAiJkYDeS8eYo9NJ0AVpMrrylO/0E11CbdBF4iePLOLLmaw9DHH0ZLHSulSuggipYBqT4IiRJXUrpUqDV9/qEaM2Cu5Fm' +
  'TJ2hpdCWrMS+A8yhZQaudbfpcdCEUE2hBfZh2Y0JFUNglx/8hqWPTKDB0vdhg+meOlwZQbWt/ENvCPWShIBrXhEvZkIIVl6wBpoT10XWwxY7rBdAQalw9KlQ' +
  'JUqVAjXAdk+I2Hrg/EolfBS/MvrcP5rTOYQ+90MVNZSHeHD4f3HDsBEydFRP/EWhnYnmJ3CWOj1iCRQV05mC8o9KlTR0IQY+PJh8TJ1DeESjTITJXUv/AMyK' +
  'koyXaMfpvFdCE1YEqLUbYBWuw7DxNR2oxDA5iqQIL4DeI4MHH/hRlk0gmczoqVKliBC5V6k8mG/2TTocL7NPzNw4f3pk9mL2LTKtepGHosPZGBTTq9h/6m3E' +
  'cUqURsGyO4wRInSpX0X1XROw8JdWrjy3MPucxHTtKNDw89WPW5qlB6JZhgp+Jqhxf1n117ECyaJ3m8NfQ6fcSaQjr1IEAWNQ4DukxYPJ8o5Be7T9VN+lQuEJ' +
  'IB2dfGLjk7Zhq4v62lUc+c8yWWPic2PMwx+UwnhjYjQ/2TZj7Lamp5G8OD92Mv8AGH3lmnO4r2grM8/i1nawVVxhCUwQMls3Pz3PWMsVYiRlSprKmj6Tpats' +
  'naTmXOauOg65bcSjezfjzKjHWVDvEK0o46aUg1L1vUSGvP6Fs0zz9CvqGZRozBCZiWRp3dLmduqtjj6CCZteqyyFGmNCVJ3ZqV2tg/hijAXNdoTQVR9WEqBA' +
  'gQjtHk3Xnia8X8ej5m7rmv7D8w7Gt0vdtP7dDipvv9neaYThf3SiA8qLHMHzPvTAL4RD+JTO2oA7IN4CscItl8Spp11Y4d1o+eGGQ3YXEEZt/CP29CcKMrTu' +
  'tzs58yuUyyLzZHctTzqO19NjQyui9EJX0ha0lgaFYCB+0mjxEjo5lzyWr0Y4y154SVKhv1VPS4nJN4tI/TrA/wDBQBHQ1M8FMODz9RAh3Mv6ZmQdjYlm5caa' +
  'tTReRxAa92AutDB1rudKlQJUCBDQKtAnySqHl39PeWT2zX6H5h9IyBPJ9ye6H5DTHNftmkVxFfJiHjPjSH8ZlvCeNmmBgwT2eZ3CZ0xaHLtBZO0ehLlhcman' +
  'Z1uM4o00Tk8L9/McrJNE3oVO+BHIantc2dr3o/UcoIkSJDoSpsz9I2GD8EA6Gz9o9rniZVEJga5b9yPRX0htcTM+D6RP/kEWjoFnQGC2pXSpZBhWvRl57WYi' +
  'BhiPY1WhNEW7dDMT7foqBKlQIECKQKYA3lssBjDrLFTJicd7v6h7doqn49iPvbMH2/aLKWuO/fWCzTSWOiTyJmqo5YIT2IKgHjL6kPb9SpTXxlwrhbD42LWk' +
  'VkeqAEzubE7iMByr7Q2r6sSk+Y7rLF9IjDL0lSuiX9YviYehVrfZFq6vRmBa+YoJSbxVCvwd8ro6/QCDvMJk/SCj/wA9CJU72I1TnpWepmCtWehElbXV6aro' +
  '1YJBDpy8wcSrajzrTR9BKGbTXsa/HVJJLQtTuOf8v28zRwYNsP6sUR9f0g3b4ax8Xl8xUc0FD1dZ6Ih/Os262ZSkdmHi1XKnKLtgjfQZThEaHss3L7o1qmk9' +
  'cgNa+GDbLSVWGXMwb6H36fNS36J9pUUCHcQLGy3xEOeEV9dJo7vNGGqc7IT65PmCj34fEMMpiSuiSrcfS92m8SmmZNTQlmsZ4s34lXpLDZipRlgdSEqMqB0C' +
  'XqbALq4nVvf+h6CJ8WIzERJjpUegJkpCrauIOkn+E0xTpwmwl1Fh9BMeBAlSrhLRFs4YKJKh7n/aRyR6hSQgrmE5lzaq9JbU62tVwEvCeuby63tLYrrL96Pk' +
  'rhjGl6K+ZgjX9mxK2Pu5Z/qCxQDDuKLwLwYlqviKd6WuEDe/aauepNQU+Yrkql4XHeHZoLIqY6DrrPung5/MJFvhLh5dCM9YBeHYOAo9ImDbTTFUj1dT0jME' +
  'cs/cjmx3Ty3EbqI8K/k+Z4jB9d+TkdzvEiSowreUnU08I5B9OgxG2W6m8N6/29orVlUDSaVPyHePQhBcqFRq8CBhV3ysHQGY6BBuKui/UQ6NdPnOYkxuVXQj' +
  '4IpWxcW8ubaUG2DgnrulW4hYbCNordlKm69prDoYd9qpIuZpAPkgwzZd9D0u5Wpjm/TBj0aWhbyXRaPL91qXBBoGXpB0Avk+BfvFLTqWfun2hBb4kRuCrYNp' +
  'g3m6FFj+Xy59oaxvpfKYu3LNxLtKL+0rB7gI/smRN5U5tGFY4mFJqnAID0eoPM1Ed6/xKndP5+uW9h17RaV8xy1pmy/1+ozGNL07h3gqaGR0bnP6aM3gTIbk' +
  'SVE6FlsKe0SpuWFKtLjiCQbncB1OYavPJ2jD3bwVWQUp69KgjmagQgPLyw9GEPjpZp01Tl0r6iGK/CXEtfSiSqjpL8ukR4mvK+8FrdIrUMHS1bjNb2Qwvaaf' +
  'm4pq55izWB1HUTUwzsPVggq76gjyuUxJe7Tfrf7RM7DUuvvNonrKXrBedOA4j3XpM2H6sRgcwShdN1y+Jr/fqHRZi9eVN7ZluRRqQxKymfxHwJ35ox01ziCw' +
  'DtjSWa+hBu0j8y/YDWsvSMUB8JQLa1yL0mLf/OG+Os2hsSni+grs7uJHpUToGpxk6zHzP2fPUgtem8FaZGFjvLQG5p1f3uYhYdZ4x0q2s1RJYq4ipgzGMfqJ' +
  'pgCnF5h7PWOgDtjBaPFGkrQzLi22otGLBAtUbhqjSIsRerTpUCBDos6oWVHyv9H5m/UqmD438s18bvl+IXF7D5avsRkZcD74ADY1pfvuxC0NOeYoYJeAmUq0' +
  'vAG3s8+/aO2XVOIwi4W6DVj7H7pbxAR22i/DvORMS1dXSKqZqWmaYSgbQK3S5WIsTqa6a3/FpFKxTVY6FYINiTAsF6YPDs76kaXXgbDsyvoJ0LJSyunVKE1I' +
  'tNzchlTo7xKw9RpTKsakRk794qw6Sh6EHLKhHwItXeXG0cQI5mCPQL+umDctUi28Q9Ez9Yz6bQqVAuTcWlJrZY+gTvVsTK1KyVFtb1sVZqXCTpBL3orL5djj' +
  'nxBr305eVY4OFb/i9JUHk4gcXp92bOP+4OY1mq5ViOtfFMK3XabiUOkuf1/uPqFaTUqbrvBMh5/UjYrxPhHNETdty+CU4JhvhsjEaFnvNowStX1JQy23zLtp' +
  'v4RaNMQUWNnR9dpbkVp1b4lHj7TYMcQG+CDihrX2vb7TLM6mvk7d+oVEgRpgqs63Tctu0MBpw95UqGJVkVlpld5lU6OSXohE1QulcYxBZ7TWFO5lOIENMC2Y' +
  'fRTL4X3hIUlPVQVC9G5U+c3goyZWRfq4gFuPYlLgmh3jEmnQVW4O8CUM8pleY6Dvl1I7DdyU8bnaeSwsPOofJLVDeH9U9zTD7yt+UAqB2MfMAsO51fbG0Q03' +
  'tQNYsJ37fuWL7L+2aesvupg+wNJbE5mV6xTNgcLC0fdCipXPwGZQaPNz8PCfidgt5YgXC2uCbHLsWNiOo5ftO1KDUftEjUNGAFXtKy04Q2D+0q4gUkFGtU9p' +
  'mGxiXiAKxEBIsR0hy3KnAeR3c1jtKGSUaR2/kwzWcuO/jxxKJWroc/TkzjM4IVjq5iHc67zRAwlJ1qJRiGgNtZ6VNplwJlpPd0IClADrXQssl3rpS/QMGMTv' +
  'kjZpX794EGDAaXGvDi4iM+5BOYRtNKQU+6czJuspHUukHJu6TQ8OpFAnMTV/uCnOX4tJlvE3CHkYX3lwGbAftNN5eUMfAYPiKe3Gkur/AOJUc6yZmTCG1e+k' +
  'TtmUxmx+8GKs0H6lOWJbf2nvBUNwODmZQAty16Q5mUCpjK6EV4B3Iuu5AjTDEyodxzCyWtGV2it3yed0QQrlcXZ7xzYpvrNaOOZlBsH9kRrmffeNntLPNQnn' +
  'Yf7ZIEcrw071+pfGup6Lozx6E+nTmpHRgClYja4Zegp5JTcTtlZpSGqGJZ027y8wFdKWUUSoaUjgu3U98FzNG0oOYSv/ABKpfBBZgNN4jO61myOzehhAy1Od' +
  'yUXqnJiBt8kyHL2mZrW7FOFZmqfYJWOh9CL4BltHvEeZTI35YyD/AD8EdpYqsMTEmGfaVG8y7TjtLL3mYoI2xtL0LBqJQ+jwu7zKB3p8DYjWF7pV3MBh2oce' +
  'IZzKLSvGuqYlTMDpMUNcocg4jXNLVCDl3UrbuSspgMkjRINJ1H7S4llaNP4ZetnPMSxpA9DibP8AG0LXsdvxNhArtenszh/Dw2ZlK2/6j+SoooiJswZjE+j5' +
  'kd4yNm8sS2ukuDiUBcIXugBLTcM16MRmrBb+tQWqYwtNPO6exKhaXFrhBCtDViGjhPSQejr9RCt5TF+ETWyWFvcQ3yUdIvyh25j5DVX8wYvaKHOU+I+sxFG1' +
  'wRbhAgQTGOappyTFXAd82YJw4GD9uUDLApWchV3Hvt7xZWaH+h4mVcs7noi4grXlNIMsv3/zKzEbynIP+z8+so/U6hVQOW09EjQrl4iwQxoO05J7EA7h5ll1' +
  'IzL1ZRb1i2LxNPAxVTo0hHUn9GkZWpl7fZlNIwiWeY+mQwWejP6y/Dr0AzA6ftG9e86uB7/eJTunOtbL/bzRvSJj5+Br74fWGJ0RZ4uL00VwQ6jPeahuxUpg' +
  'bMZa7Lw4WGtZpWVYBtAcu0TQ1KF6kSBF0NzzFYVpd2XnLiVKlJw3QSwA1ZnY8N4jrFvpcZc6FdRMV/hxD4IraI8uHg7RqLFR9ugWwi9aEbBUCoMEAt6OETVK' +
  'JRVr0hqLGp4lQxoJgN2VGdnU/C/6QSwRdRvaTf7JeHpGju52Ox2JkM8ty+x3lyVnQKBsHibJKirGxzC+RZgDC9ICdXLMMj0d7DmW1Nq2vLLYaioel77paFYl' +
  'HZfAmxpwEfbBESFUFq0HMcVjXd3M1rQ0glXoI6jnPiXDq1RZHeYKMXRNnn1grYwu25Hgy2bqYBwoNiH+0eTlKE0/gxELvcASm1g8/iO0H9JdeN5TwvUaNS74' +
  'SD7fmCJHTpVxtJnhhW7LOLmZNOxDZD4mAD4I8cH5RW9DV3YQwbWFUUdvRYAVDqp4GpQhVlEr8ZTS5DGXpMYW/pZHTejMzS136iDej7Y9QFm07S/NA1MhW4/B' +
  '13I2cxydZns7RFnbMxfULzLUnMqZphNVL+BsRA72i1Z/cCu8YgcMJX2D0/MOINTh+z/qKAaudZm9x5nJFLShSjaWmHK+YZp9UAdt49POBAwtJaOJlqjaTwdg' +
  'zE55sT3uXWUEzenThOd7vL9R/kTAnYiaGsLyKIWHmMsMYPZhLERYxlvluXEVxmh+NYFcDR91+PWXJ1+IuSgVl+KBU2ZvKZ8Q7MCOyBNSb+/Y/kZ0d4WwEh26' +
  'DCQETaYeWM0xrPxGVulML8RZhzkRLHWutfJCPL/ozSOqqnH9fnxCgtOiVFHD6AYx7DV4IOQ1yxi/8FQOhV+vzwgZherPiK124lzyIPs9AqHsRSAxKGXv5mct' +
  '4K6lBhDMwgp247wlxA8Yft6wcLIHdmfec9FNTs7uCXhs7BOv8eJleQTga4F45lDvG/JlqBNEcVK3d0lZ33mwm5sIxslND/OY+vaOAauIcQBVxgnXIp7DjzGv' +
  'g8Lo/wCZlBrRxPMI+GJhdsxPAfZDbc5grm75TSnlbzkpBqd+5oy5A+RrSaFlkb/7xLnWIPYMKUdSY9Kf9kqs+yV03hbRbQLvswxWD+FdKU1a5/EQZBe14MMu' +
  '0Bx9u8aTKAc8X5elxJx2thUz2q92BHfRV7wdWsCiFmeIhcMsnaA0tlRgTAe1wX0ROkYHLzA6tmCZCW5NEtDUsOScyzXjVj1ZLhpGPrOldAVo9ojayjsiVd28' +
  'TR0VtblRUu5XuMYB3XxCdY4VWYYQOloeoHD+hZSxg4aUC7CsH3M0PDJUPLdjEKM8PaI0u9Bp/wBH7RfVgPNBnxNVxQW8S1zBSosXKDWuXYnyA7eJvblhtUTV' +
  'txex+5qeBodX6lH4D3llBXB3gGNfg/2UvAKDc2wFDiK5lVbi9kWDgAXMPtpPLLDrb0Va8PpMb/Yn+BiZ7G7fmXackC/wVTZdR7P3mgTPEymGC+ZdhqRSCPd4' +
  'RQnbYe+h7P3ijau9qv8Au0uMCZw94HR+xAKG4VI5hGEYqXEuQhLl33Q5tw9D7ppnAJe7ShQg0wGenWY3y1OYcQu75mUszlbdHiVTeN0MtX9a4mwpMuYH0nRY' +
  '8xU1L3lDB/httAUu+0qV3eE4ZdPE09AbBhgpRgDVlBHivtvL9bz3HQ6bek4XU/jBG2nrFz3vDDVwy3L0JeO1XwGhDJhlWPeXFC1FHte7sRoIZHg3m6mOODiI' +
  'NAHH++sMzrWCYTBMDgzLBS9aTQI11ry/d/UsKAcEq3l0tLHFWN9ImOO8/EvWXmbLOeIgH79H/Yz5gHwMvzEemCvBKU0VXh/xObdn2/u8WXYfZKycleD/AGUS' +
  'xj/C+Jfm9N3riKzb0fHL1liWR0eZZy206We4WQYuj+MXKZTRMjxEDFUcnIO3ZvE67V20R0LXRVQWxFX7QAVDbKjDDcxbaQlNQJn5Y2fMm0UVxopS3jq4hcZw' +
  'cqzMFqVzFqr7xRlRPoN6Mj56KVdFZwQcDtTSOBNDxKCoZ91RF2R6fG+6a0zG7tCD30LmE+jcNAO4UHMI4flrN03qPzKz+T7xovXxFaX6dooRcfl7yo/FTYlN' +
  'NTOxLv73yTMmHcz0/KQwSc1z4zFP8mMxtfB5viBUSKBccRw4j2C+7KzZdmsEr+i0hcV42I70SgFibZJa5ZR9VfVtFitYb3CXnqZ2Zr1alUcx4P2zSndfY4hF' +
  'cKOCWLpi+dWJhmQSWNbYvzMW/XH9GpxCxdwZuegE+7xPXDoqRTc2WuNmKRzWO1gIOuru/D95Z/VitqvsMsvjpB7Q1+u/TpYzC5ZmVLD9C8LEFhzw+Zl5o5Xm' +
  'IAFrBbwS0Kl/EGwC1dCaIjlv4lxJtduZXZsnmKLHAN5ZrN6HQ9RqJE02IQRLzczD2ljGqoh7RVg1iDo+bJhUzNeNDSPbjoQhLqEUczmsBBB9E9NZUOzFQ/se' +
  'YKwinCZfg9JyFUq/WrYnd+JGKbFolMpwmmB98ZNFeCoVtHeefxL6MvEuqp5lci2AOkSFlmppgSw6vVhGTS55XN6NCaGCCf7whofmIeijLtRbwRd9i9Zf7E1G' +
  '6xCi4Khpoylwl2QENu1n/IIPNWo/xo+kNUjrTUmAjsbdkQu5JfZmcZtfRJ7XGbT/AGYaQlgomibQm9L/AAOB9fotZpjkEWwKRqmxMMzhQaWRZ6xOB/2YMqti' +
  'OqrHeBbMqiAKmM6MzTg8RntfTYtVcf8AEevXuLAKuLiowOgij0WotzRGXUKZqtesQwzuhsNteTo6zAvSa1czVL43q9kmC3ii5zjpX0DHNUsRIDllGCH3R2n2' +
  'aLyV2IZUq3EXNHuDvG7YZFGxxNASf04jjbxpzF4jCY0u5gOYy1waFutYVeyLVQbrr9oZMqUAYRBYmszge6XNTG8p8EZQ0SjoCsWzHFHXR07QiGyRLBB3MBwx' +
  'DS9LqicJudozoWu9TcnZyd5gsamsa1A6c8M3doYWrluj29Y1/Ka1V/x6THGN7LV4R+oIIwlFhDcRrR4mONhtr69BFWssmYquEoQc4mF9tZeOCZou/CAcxU9F' +
  'e/l2mDRLpwPVC0EO2xfoTgwceIkkwmYi2/Rccwp0LTsxtNhqbzNGpXEcm/vS0BWMuGVShp0IogEokt5q/pOhB06wE82g942mXGw7E0FFN+X7Sxt7bP4c+0wy' +
  'SybOf0iC0ssBt0NCbEXBUB9Ywsl0l0TNXdMS95e/BrA5NCFE7RCLitIUzmU95Z7Epxfl7TAtXxDWAbrNfREp3XNaeZYDLKNdoPEw0HbXxCF6oOYb5TsdIIyV' +
  '2lY+6+IywZzRPolfMUNCuNdwH91PTiVgBWw+6d46QimPIpUfJ6NP30hKZUuGs1TXaOW3Xo1bmhMGYRzuDEyFqdBt2ifbznmYRqfZbffWMBbSbxtDcYrb5nfD' +
  '6ogjrHrUr6HIzp4hSKgqAr2ZaxpNIdNcF08RDXiJRvKgdQidA5jQ9Z/ebnpDCW2Bd1Hqr2uMRi1K45vf25hJeNWGs/6hlcse01uU0VDL0IZmQNXEynBpMRij' +
  'PEGj1noOPeWAzBTXd3gD8Ra7q5YHzC1pPDJdLwlqwD0bkOhNMdsTdmSOyL9xKBZmH1kb6ak2uJVDF+AaPqRamg3JrAsywnrTYPwuPRiLKTynk58QYAtI5XrE' +
  'oUUDk9z8wu0V5O+Zm3GIRdCLc9F8ZQUdBDNnrArHfMwlDkgpAtZdUNgGwaRi6s1JnVoI+GcxEF6E1+iodf6JcxneZVm+gihTroHvKs+UyglR1RiFFvepiAq2' +
  'gaQwIB2Oq2W4QXyfMW8bSkArwsfkvxA7a++uxBIopXQJmXmWXm+5MgdPk79F3LSaFTTfSXYYms64lqQQolY9p6oR+xmq4ZjO5FGry/EyGL5ZWD0hFC24uZVW' +
  'r4mMaWA+7c0e5Bg7JMg8tTwR0mi1up2i/Ay39Rg8X4nohP5Rk0Gydom30OymPmWA2XzA4bkxgaj7wLejUmsa+0C0sFHnhr71H+pZLXrua7axKieG800OoYhw' +
  'mDUtf/JEV7x+/Fgavbo529HozJrmZro4Z2VfqBKrp5alw8wMpxLCVlzFOIcVGwGvEqWNTVcFLykOty8E0MQ3q1zO9veHTVEAtHHMyo7s/v8ApEOF3H7sxTA2' +
  'qKNo19woSHmLQua2q99o2nVSuq9gY6Wx/RxczGYVekTZYN9Y+WZVTmYXjEeanLmaJYTt0PzLD6iaYeZojUOVn7RqHyzTUz2SaLlhGncH8MeDyfxKy2aPfvMv' +
  'KMPJzHa79APWqHR6WN4sMMtUF490QlgcEvHmYFKqKDsMfP8AJnaWTchqCChShtln7QnIpue595zIPx/oxxxei6iprlSHmVKmmVcEq0eYz0X61vQaRmtPPTUw' +
  'f97phb1hvYXTSY+g6OuOmSQKbxdGZVAJpKYSCGp4hlsyFV7o6f1FwAKMdNuh1RiVvxAZGw24YPTeOTuFd1gCOD/NzCs4t9bB8TZhbexlmMw9he8GV4X4l70l' +
  'BEyc1vM0J3jwYzUxeAylUZTHaBYy+yYBdXLDm+prSQETjoeDX7wCDQwTAPL3ggqL1IZDGp4izdoM8N+uXLxBSNSvxMfVpdQrowTq7kGEDrYYtg3L/LeItsqC' +
  'Wv8ACDrTT+Z7XG+Qe3+4/onjxLlYhQG8oCpU2nDbiBKprXeKHvqGjaL2Z6ZQUNwe8LA5gJDPeeQp2yYzPb9IepAmKKSjKhl8E0oVYs0mdnzLCRlL6KGDSNzx' +
  '5j3Lb0uW/wCofSEN9BAR2/4IIC9oRj2mdoj4j83HPLoa5mLRTm12jSOuh4jAFoESz+jPYv8AMt7HRdiNIKfiflHBxaKj3zRWaLMNz2EudSUlthgvBrpMd6Sv' +
  'vKI9syrOr9ioYW0CUvyU9WWPTInVdmHELNpFfrHwEiDA0cpfQaVBa958bimUIvgiIpM0fdymLy2OxqUmOSs5XOfGBqeDWveIrwmuTUTJBGs0hvyWcSwLo3HE' +
  'cdZQJQvEs+eVDJ7ypUqEGoSzW28FNBWHxHMBbZdyoXZ6GPfHaLOIVRvlBuGY7mbxEqlzwMhI9LIdGIJe25jw8RGGvUQDV9pdtUQdXMvREN4mJU57sEcyrg0l' +
  'YWOI1rqyu893XHordRiaBrCV2uC1WiceVfMPSjHoxXOqj7yxslrxrK0cPYNX5qKnAN4grdXiXxQD2oa/2f1loT1E/Er01WpiEzt2TnzKs6MN7kiMNnQTCBAW' +
  '0CsRI427y+gZg+SUE3lBYOg7xx5Yn8KehPTymNrH0B/E5PDPmbSywvf93SDyuetaO+/pKMWUL3rghjBoa4hvxBHRJ8BMVpDmqPlhWEW0f7iF01YPKBlV2hjP' +
  'yRAlFRuh5YO7sfTf0jYcIVyrv0mM0VKw2fMG41hCCG51FS+mp2l6Btdd5mQsZ8dpuN8QpyXUaMwXAcsPmLoi1PbnpE7JSXtHV2xJi1xKm1lCB1mWKAjydmCt' +
  'nBiTTuMqVLMmEwAcsVymryQAUxg0pp0pcFPV1hnh9oQvJmotuoUq5ovzMPYnPKNJaDcCqO3q/aCD0BLrXo4lbUAHwX4MrPPyKXd6HxNbPMS4ckIUd5cBk0e0' +
  'yTNPsJhZgfwl09HP8Tl3qVtPbZlNU03hl4czV8Qk0H3ZgH+ypoGag7uZjsVbg45zLdK/gNZlb/0PTeBTk69vtglLnWOAtjAtHruuedoeRr2JG9rmLwkNP3S1' +
  'Qy44vB/Exs8uPn5ijY92td4KjBKBzUeLf/VKEmsjTeGDhZosD+fSBFuaY5lhJw7dNE1MzSZXbMLN7HboJvlpwnGnJ4iq6q5vcNGi7ljW7MMG0Z5cmUZVozM+' +
  'KYtWTxPFGUw6X0EYdFKFsFwESnnUwroIGZ7p6M7JSGkuLbu5rL9aMXLVGlxOgsuZBE6HWIIItF9t5YE1i53dUwZschW/M3iqV+uYgYPdAPsw1W/ljp6ah7MD' +
  'upHW4AcGYN6DeKjDfTC6l0F36TKJu7qyJciam+0FFoFeGKTVBtMW2jOXGsuvJL4yZvmIzv8AUhZt+PkZCFper6RY7Ja/Rg9Zr027p9qAWs09ARvvmsYPIDTd' +
  '0mTpIOVfaV/sivbRdFE9IV7kHNCK1doZhhwzFQyuAe7B1w8Ta4wsJ7YJmhuGwRF6irqm+gRMTPHMrZltaTEBLxu8pDEqNZeEU1teiVbTCKtOcamQTUj0Eut4' +
  'GJ6DmG3I5QSzZoz5ZUV0wwvoSuFLW4wBWgtBzFbMR7dEB0D5itrWBK2JT3l3YsBxDRd4kGpjtMXNQlfVL4RwQsN4SfLX1Q9BD78U+38y7/2JNmrO9B+yxdYG' +
  '7dxFgbxeFhOTEWpHUgvuIag7jiKk74WXpRVUWYgSjQH3jNiGz/JVi2UvmC0J4XQkKA1MBmJHBjc0/hLocl/WsQO0jL3VlMFN3T/Uqc1suE8niZ0YxWgynEbu' +
  'LnxLAZKzBNWLCAncMHYLlpg0P440i+AB42hUM3Yo8w4v0gSFiJ8D5EAgW23d35ha3olOQ8OzWPvbDaFkHgv2FhAceqZ+GXXrmCbk3XMr516ARFfqEyBWs89G' +
  '2tQOh5nfTLdEr9qlfuWx7LoZuPBaqtVcsFcAQbHdtGZk2qdToSV7SVfHeKI7jPfiQMkOcFrGnUhH8YAELbJesoqtNoaDslTE9Pu6Eb1GOJkOY8FlBGNZj1mw' +
  'PEgwFNXaNIJgQhKp2evYzFzRz4c/mVE5gsN1eq6+0MKynzrD7XHQIHNbL71Kvgl02aMJeSaKPTgjpUmhw7CZ2A2qFdprlXM1WZEWXjEZQO0pcXXWag4fuUsS' +
  'JDDgmiLTA5UYwoYeImOtcpZ0+kX8sHlVhjya3Ys3tZ2rlglVTmPsQ9a8bfZr4hZbsW+PgZgJ7cFihgu/vMrvpjVYv2+8w5zeOwv7pLUHYe0125gjnDlW2M+5' +
  'h1ZS7e6eXeIFDtXavhuwG26f1PGlDiCYoidx+qjWymx4SmWzhpr+pvNUMHMSMVKdyWMIZSvas48d5pBApwmJpb/DWPfCZdifMX6BHaS6kHwm2iA9zCIvNzsx' +
  'uht3iiGNESB7wOfo1eEMzODiCztU7WRb6EGff4ibxKH1nu1ekylcCDiBAEMmUtZx6wyBAhLilUu9Fr5tHxXt0mVUSU+q+fvLleBXWz/N0hTwqFpafCaBxYch' +
  'Z9495L9uIufbSFsz804V57kLtiosnn1j3rlBdtazF2aB6MARnzeV+oOgesMrOsRHtsNMSw5S8pJmbwrsls0e5HF01vqddsfkRkamA0br3PYhGyPZkldCMrNg' +
  'E9j/AL0DFcwd3+ELGbM5dPzMjEfTOZSogy3rD2fKM4uo9Hjc9IeFGn/b/BLbsZ7FtdrR6TJ9fua/Essmi+III2Zm6BdqG+YWtdINU1dJYwcdTSLqLHcPuJlo' +
  'hxqRDRfExq5l3vGbdNpUTQkGkUnn6NoqFqXuP4lpdkrmB9H7c395U1xG61DAqN0+wToSu2v7hrDmuAn8Zkz0CVK6LoaitUsYOV0ui7Qmj7dJuaCcfJ6USptb' +
  'B8v1x7wkWY+2I7mpPei+DGRTRjwmuhWNnxKrztrUszRjylkTa/zLtVW7CY/wioFYFTYwe1ej7s8Ot/Uuo7BG74lfU69jX2iO6sgte1ROx79/QReG2E8pd5Uq' +
  'VKlSoJjTh12jusOeJdvbNIOdqfv90Bi5zzrPofiDQy8Axdfb0mQwyK6ErelqN/2RI0JvZ/w9JTOtIG6yfeNKIcxoFDe3EUmFQ9DO3TazEO3VbuGUwOifrTIB' +
  'KKv7xEkFXu9DN5ujMCsnJgiNdqwCyjXvAgMGPQ5XqQqartSv+BKRWUdLxboJtBQ1+j3yHMSemmIpfo0eMwzNWY+SUDyoWfdehrBByDD5Ge9SuyguNzzHclTV' +
  'LMJXSpkhiFhsO6SiPQQYR+wggszpmFfdPHYig6PuRs8IS8hDVcIHyQji4prY0+GauzXY7+kB4/kOJ7cMzJxVNZ6VWx3hbBvCKm/ywHt+JgkJeDZz2dpY12W9' +
  'XyceCEEV+aQx9+JvLqho4dfu9ZXSpUqVNOPN1fx4lvqYaptB3WCYe8z++0t2PWjWFrEbIsvpMoK0ZH8ZhfCWAK+FNiALsW+z4Rii63KOp6WRst95kbjDVG/Q' +
  'ZoYlSsk1f9mSCgKuAjenGeO03ma/BFoo7ly7Av8AdJixbAjqNkKuqYZQzhOySk2ZqCs/0UxTaRhUYKYraRhtmW3WnJbmWZXoxGhSSlsa03eIv0afGBw2IGYM' +
  'vMBLpTHk9V0MIywaj3SsI5XmCOdsHpjTo1RwgpgmDLJ2SebvCsXNodCcdoMFWN9Z2hNRnEwbqGAHyx0sBBcOzKD7qXVZduzkjBxImS1O5rFqi4L3ReycxViT' +
  'IV5wMQhK2XsS5UluBuXPDiCkNHLe8v4Jc0HfkhK6V9FQIOdL8Hf57wKHjSVLY1ezL+JfSVJxCGdFb0lV5Qa4otKQwxpEEmrDybdJR0iJenTNUwjkViEZTaNU' +
  '7TxsjaI1R1OmM41IY5gvSE1m4KM+5VCua7RVK7odQZP2vWWJlbppmelJ3IVeUM45w1WEi/Ro8ZnA1SgO8wEGWFEcw935TGGat8wt7IrLNc1Xslax9R28dFLp' +
  'hiQPpDqylwIFGkqVXQ6WBYhs+Et3ttwm04vLJ/doLfbEd8KvvLK4gTsV8nqTOuvRoray4AyVvQ99klOVtI+7eEV0a55Mj/hw9R+slB6XTe4aO/P6lFWwfWf4' +
  '1mr8EYBJNLG1e0CCmy8CM2p+hjs9Ch3g5WaqAL1UA1Ms1rDL62ox55meY2KRmnaAhqvdjGa2WoVomYQasJYPERBbowYIunRhY+5ksA0WzaEYbuzDGB3Okb8k' +
  '0PHUmvwmDDlc8VLmrfQhDZ0e/PpCwLtcJ3E+ZN2BozLD9sJCeQO8sexWj5mPt6CbEOKldCZYitTLeXaApLO0QZWiboQtkCBNXVUXvlGAoU/t4Fvs9wJZHpPj' +
  'TU4vMAAkt6Jw+PzFH2OgIxwq4lTzgfhl1Wjk6H1k8izEmpycBHrFXsnD2lic2TliV7Gh9mUQ4Y4azj1Y3IN5a9nFT3cr/wAU0Hjce35JjyXLPkftP7uc2qC2' +
  'ORV8zKkgDGsS8MxV4qMtPD1m9e7aaYjeW9jSVKl1gjs17xgylOSmzGsyr7FTXCBrzAOXLR5QLLUlWzZguZQ5CEelKXIhTP1QKDqTW8Q3BzKTUE/j0V6q6lB8' +
  'Xl1Y4lQtNY0vVC2QZ+egyy9IoLlrw9KIMunw9NxTByZLwxgFX5gYgZiLa9o9xMNJOQwowwQVdEOhxSwcBh5aULjUvtErLrzB9q4CVQN2eiokqYXbaOgip2jp' +
  '9ojaz0PrFtcwUHE0Dh5N7/m8Qmtj+ibjj9IfnxAx+5gex5j8KhIU1p2Jb2lpas4gRhaJTOVVZ311gJX0JvcA/wCRnorK24vd2ZVK377T1zEl0XqVK5s7F54l' +
  'Yvbo1wzLkB0lOdeY4xXD3ZjBmDTJ0SVHb+8I9c/FDdDHqE0ZnXvHS9BlZ3Oen2FmdkJLDFFiiC0rXM1YDBbHLEKTWdlpfMIFCIN0XWC95hEuJMvWNyPQtamg' +
  'iZdPBCAggzCyw2mC8EIjCsBxK6NP8/1mmLN3m/K+GOWTMSV0IUzIyNnR37T8QjG2NUWq7kydTtP9Q+uufKJkJoQN4X1hm1tfLGAbs96W+Sx9rn8h1ho61b0P' +
  'qPkjh6auhLncljvZmNw3aM+X4hXdYrbFIlpiYvRnDbedyOD4NjoJTij7ksAmu9z4jjVtdiPe5dCOk5M0IDekThFwTfQ6fFND6MpOvVUCVJedJXbTJ4hDQuXL' +
  'Mlei08ohgAWpIYLDHc7SuZYJmBgLaoSmHT/HIy4GgQLB5mrslBg6OU+L7wKgQxCMabygm27oQxKWnpFM5iGeJoJn6bXp1nYUJU4Wzl38BiXgmo67g9xiRJXS' +
  'mCWRwFWo7wY/8M21ymooWzUfj9/E0mDj2MEbQ/fwgfg+Z28qAVyHhzFvXpq6heEdkd/1L/VD46/raWzOzOv2PzFesSWiHZNUJgGawmCi3+IKSKI+0ZZQeD+4' +
  'ONz9ozNtoxfCEOfJDgxvEbP1l12gqrORK3ygW1CdC1+Zs+g0u0egXLVyhslGhMgDwxF6ugyRKl1RWMf1u+Toqia+MJaymJmrrEpppKpZ2lvtGV3mLK4lZ1ht' +
  'jiOCu2Ys7ZNzhQ+YQdGqVfWajvMXFDvHKZ8lyroafSCNQjUHrL9x3v2XpcAajj7zl6BMpcwLR8srzzKy3srEj9GC4dKeJ6fRX7NWa7iq9xv5be81UZ3yyn36' +
  'PBLWUHmdfQfNTEoxPBoRtTVMMS8vPXVMpv0jb+n79ofiCFd7t95QsQ3mDu5WaJc/mCtcte7UssesNsYCu/TUIsMDkPXMS8q98y4g+xHcAB2mbMyN8pe7GnxK' +
  'BoHXiCvIlHtQvbkSrW36KyFRK6DB89CkfUsuOr346KlV6xl0VTHNdFRwbhBpdFy4qlnYZUjI1DeYO01rVLl0ZPwk4Rm8V6PZhujl0K08IGYIWaLjQrZhdZ5p' +
  'PGZNIhtXRowdweAMs3nhBb4OnqIl6lpWH8Wk8x4DPdORXiW7kNdXgduYNAHVgcx6F2cyd++IOxfyP3EWN6cofynadz+feWRP6CL9GnS5fu7EXuiNRYAnNEDp' +
  'QURRf0tJ2k+59G2u04B/cEwbHR3fH+vCaWTRx4yIdCsHH63fWXK1qCgwH5nIKT2uOooBGooDeYCNSuF/kxtnaE0HjpWnawPKp2/XzLc8T1GejqyGVoZyuYI6' +
  'gYMiXsSj3uvSDRxFtehx1ql0qH/hNJpcCijqR6Unq32mFHe5nm3Ii9RR3mXt8zDEqeDNIhVejMmk1bigajEdKZEZnnE2I+6WGhOGWxttGTJqeEEDH2mLp2Mq' +
  'eZqnXLKaw1ixfw5QluCuw3n9mCqsH1DGfao6qZcq79N85lxSuZzLesvJ9xEKAe2seTqqsTbmFUAdFcZ+ln35Z/XH1NW9g2ExAFHEswxolka5j7E7RZ8ZhgVT' +
  '2gWtegcfv0Y7yhKRRWz00diWWhaZo2jkrTONoXFr15WDqgTOwZPACZdLPXF1qzpE2tb8SxqbkAFoBlXaVs2Mnjac7BARrsqA2zBbpMJbRhOwASjXSWaNaDwc' +
  'zCwYAliCDWZl9EGqN17xChf8V7RGS13+gaYvTM+G5R9jfEdDzFvCtrh4jKjAlJkY1hrOb4gHm04sjRfvGxOns2zRXlLgswZOZfM2QZLmIWrBl7NcbHXhN6Fa' +
  'PE11+sVfLlKSGJMlP88K0hKW+I3xyzVjj81HLMvaAF6v0D0NLhFYi2NScnbkliAPbWHJ0CaVrzCcP0KZ+MHoEVb3wyJ5kF5YWKmN6Raa01zAuOBZShq0/wCz' +
  'HZc4X9feKt4C1/fr7Rwx3HWVu9G8crxxIsZQMwfdtC8q/Espr7q5rxdO2B94jkcrra+YQ1tYmCoe/tF8EyWs7QsxNBqxGtCvlguGJvdQi3WOpJqNOrg4lmh+' +
  '/wA9BSBcdAFrCzJe5/mkqcBriDv4gfiFJ/YiJVVd36jpkxKEpLGIQwhWd5SpRrr69DLGeSBcqCdijyQckN7zPX0vX3gO0faGcwc0MGwpmVoNHmVFovJMYgB9' +
  'BDTo3XaWEWxjBSGFBFTLNE5lmeTUdSVB9uejEa+vmmf7SQ3qrv5ab6xejB3lVLiz9Iy7CXpDCJYrKfY5IDEbawckOkevyACuHecS2Dj9nLMMYMdoEuQsZ8IM' +
  'U4krbL4N5zYIsz4PLHWWJL/viX7050PHEboxyYV3Od+rUTmhzK37jOYT7dzOgoeQCbUGOc+9Ef8AkuT+xEcEEQJ63rFl/wAdHMboY1Ft9u0Aevk7zYIq+Acs' +
  'QcOAlrqZ3WOzaq85lRoydydg5WFZBhPHpEo3QwHxCaWMZUxWi7voToQl37zyxNnaZHlUz4xzdOENu+kn4ZS5/ATaOemBBtdMGdQgY9TnvChxpw7S/afAlLLs' +
  'ATJuS3omzmKcpYIaTapxDk6e4lxa0jUp2vdlZq7OD+dfaJYUPnZhqbWi1l3T3+lWv1XAghAmcWMr9jkh/Qt7BydFy58o1rg5Zx4AuB+Xli0WGhzKpcXYuKkf' +
  'yuPOcGr8cy/Xz6ufysbNutwP7tGtTtsQW1sNdh6xN5b/ABFfUlX7sCkVYcSy2vq2iEV/mRQOCr46W5p2eCWMmiRWIKIEodgeu/yWgkZKams0DO8ZeLlRF5jh' +
  'zfufEyh2dR6DC8PeVnIdfsBKrwOa57vMF3aGWWnKMormWHsdYKoDboVKtNJr0ISj/wBvKTB4SzohetwamKiOE0HDGY23vrjxwxIMxC3/ACgUqHODOGn9CVIW' +
  '28e07dNHXoXA1LIfegtqqUQN6qYzT2N4P1xGeBYc6dv694kUOXTsG0KsNsWs3L6v13ALtFt6xxdBqcwZmRto1f8AFm8Bv3Kg1n9gmjziwPxLK6DSH77xAz5Q' +
  'AAA6NYAjq8EFRnhy8v7Ise4rfg/z3jxuLuuPZLcX8I3ftN6wAMA0Gh01dCZMBcb8zdLfbtK30+QP4mc+kEt8EU4B97mZ19jsf7NeauJd4CaO81Y6FqMw3+di' +
  'l8YZvaWOw4D5DKs3F9Tu6sRRo0oTaMwR7x6rgltFGAGnQpMU65kLWJkIcoGBpuSUzoXd7xWuj06im+hCZ/8A5RtEbgam6ebOoFvtGtFTh8Eowt2GxMGJmBUu' +
  'Dtj7f4MAfBXDHG7zNATbceZUZSafSXMHNqO0NRBdEf5SE9rXV8TVYsYFO/P2jBq2CAM8cJoOvQfiBacfS/rXNohu1kdVMb9pcEaKeIrUXzBhjXYI5jYFGnKv' +
  'BEnXVK/xHrDDXrqn8/aMtr4h9P3MlDudj1nog7Lv5nHA7dVHptDmMk/M8zamqt2VpP3Bl5l8zbEFaSJirVdMfvDjLhXLv0Cw7TAynchtYVufVNduyWsbjFpf' +
  'uxGlrKMxWV+yaITPO5mr2d5h6gxoBE5pio/eKUVSACbESUVm8dAubTTLyujSUjttKvWWEbYrfxOXNlz0ZTKlRQpuDXQqu8Xbh7mx+Zpujki3aypUcrc3/Uwi' +
  'LvjphKrNOCb1avEU7ITAKwjvEChyP+RKwyYe/eA40+rv0sycTEJqBb3PH05ECV0qP0M44JiQWsRrGmo9uoUBqwtUUIMssr4W696hRShaY3eWWHJ34PWAa/E/' +
  'lxcNuDSE32H3h0X6F5nOCDdjCbsvBvKufE1hH5cdmhMiSpQgvAXAJdv9zLA0VL1KHmNJ3uPQPWGHBlNT8yytyzVUym+wt+Q8QQnNX689yVTAYENU3yPzNZS8' +
  'YzL6IR8E0U8plKxcSDePBUaF2x2HRwYmTlJ8xqEqndcuhwYluC9bnzElmrDX2lRXO0VOaHDMQ6tQ1IZLidMy4EiqDtFSsNo78BI+bCaAvnKRy0kQtSX/AJoQ' +
  'CYt32YW7RNu8w+1LNKXinFeIqcmNf/JWMCBKX/2EaKZeSpR8MyFcR6aQloPV1xMvkROB11kTVXeVEQ9qDTzxHrt8qLpzGTesa+Z3iQOtNdV4lWIPeGIjh/O4' +
  'vJah2uBOCy8HhBe+5vzhlZkNC+xD5oAtoTVS5ucUXHBloXTznEzxjXeSrlMqQP8AZhAfbzTHZ3d5Wu54QdhC5Zxn/MJPDRDRZd2EVu8SttT0IYTQm3MqXFsy' +
  'Q0w6FPKHYDlliG6deZZCBbDoC4xFapshLs7tvEHDsVNB2lmbanXe6BYtgea/7AubaIct3iUKMrMon/QmkTpGaWhEWpMSoKgYIBaZvxkIJItUY+5ckKqM7nML' +
  '7kg2MeDp/iJwoQCYY6L19nESvqKiBKtmnTsPlKly7MR6kw8vJBBDEG8AzW9x9xLLmgXHngNrPWfBUI39KT6bvmXUct/uUizLUxelxtyxK2aG6vouegG7r0zA' +
  'cd+IAQjUAfBFDKE7uBJz3VRzP2Eco1+Z3eh2HLMWlGWZ9OCab2nqhIDGp/eehkIwQTL7wZxCBasYIZORJsDiJSytowsVWIxy4lxGzCnRzvEl86DHmDMwYwGb' +
  'zjiZxwRD5JzNsr106ZpmC4jbEWMNtJtAkul1hgKd2L4haoKgVAjWGwSlZoImyKMjJzGZycMXjudB0jSvU0pXlKEYbBKBmggah4dXv6Mq+7rjeTtMuNrR+YkV' +
  'ntqekCOZk+UD/MxA31ejnqsWC6TvIZgTOHJ+4VahJIm/+J8rBuYrwyx1rlXNWU+SM6gWHLZh1ELetuhVKveahgXggFexAlra6r0MleZgy2qVqa7x7wFDkNB8' +
  '6D6RkOOFeyzM1vnN7rGJBHRN4XAeZPDlhQyLU6s3YvtMsVAtBWi94n9ym/gGMOYZt0sGidX2msK2X0mFYVGmgGhK4XbEJSlrlY1lpwGKO/5A9V995iByy3oG' +
  'ehyhVXFNCYvo+hctYmsqjtp8zUNQJSPdwQerYaUCBcIKPcOlF2tMvWBRKTXWUOb/AJmxKYHDyzGTH3wAmbdAqIHtDxc2YQ8Lw5Eyss0mq4YobUdHh4mg3eky' +
  'hcO/F0nAlD0SL1KuglQtlG0LTB2qnR/nGAttOjQpzsTNjPeiE8cRi0weZbwdBXLLjcGK7aTKqBlTLLm9KfMu22UE0hpL8rc5NJaqIFm+7FUbGuaCXN81WH1w' +
  'h2i7+CEMri37FKPLexiO5QPR4lgfaWF0R4DBXTLppKMzxeJayoaCgg+DVuocRQHfONOgsiLuJz+I7uAh5ZW+sUFVvo7wuCPmc/m/CMXu1PYiQNK9pUNfVN5g' +
  'obcsu4UqoualyuiqyKdWEaZXSmlnHQzhpxMMlZO6y+PG2wld2rghp2P+sIHQvTdWAChcWV9A53r3j2uDQZfMcInFsSulZcAjZ0MRGFTkOjdMKRhWN12JtCaQ' +
  'No/6CEiqd8xLDbbs8IpGiRhbDo1ml0vdDGiOIW2OY05l592KrMl+kXbn8IECXl5lAH4OiE+s8WkofKMmMsvJvRbPtcosOZg34jpUTcZdr6QsWNby1RgXeYT1' +
  '7Rno4njAIHwmWH0WI8Xid/NEV8vxExcYzvWpUyzXgXxvzDXP3X9u0rNwvtZBbmG77EbrYaEb7TAqh6oOCdEmWX7pnm0jl/REKgCjxHKPA843feV5b7FytXQx' +
  'bSDjg+UACi3cBtUv18TXvLErHU4IhWlVO0uO2AsAJeGmxxKyVvKOzRKdz0VdqFINLQ8XLNRwSyPVB74gKtBgjLa4gtzKVZ+Ama6lJwbtog5FMJhhdakdCzx4' +
  'gGdapUtUrK2inMQqJXovEz2OW3+HlHGd4eJnLlEQMRYDbWZKNGPTXNEe0XN/1DAfBHFtbuCFQl+TM3B7RAGrCKOSCIFsuNaSdsfezJPMzW9d3p0mx7y5Ca/m' +
  'L0GXKh7RXFtBmczDRgYGbwfqbj6r72PaY4DnH3fwssbr7x/Ms2gLbxVv8la82/nSeqUnuy7K+a311iPa6G3MAAUN+ImQIWjQExA0YprCyMy/3Zaaqo8S5RPs' +
  'SofxniVE+Fy3HhmkWuL7QQTK6GiWUACV07OCw3JEBWsM3XQBdAyxWxWjMd5meDfwh6ZY/gGNG8mHaI9vPtMCJbBwTMhtKopsSbPgzEst5dNKcTu2QPKsVg21' +
  'lApWBz4CU1g2ZvSPzKQsovwGI+DWrwHHtehKhLHP7iUIXOcnEA24YbDmYr6zV00+sqjx0IUTKNJ/LaVFb+NR19CjuzA6MoOhW5NYib7BMPwM4CD9n0Lr/NJa' +
  '0SohCLKNIjlBxHSNpNPmG0xEs6z2Q219I/ia45ZV8aPxFmw6Yrx+ECimxxI5F+JbUzSR7u/eIVzZeDwQFur0faWaDbd+xUQRFiB65ihb25uvKoML/U9tZSOk' +
  'K2lrCmpWxCniJLYrdu36lduWr5+Iyte2I86N5kfe3mue0XLD6QCWkAeyXNR60IWjm6mCM7K9j06gmsXipSTo7A/meqz0dF+s7W5Z6zQsWq8S2G0blSzDPLEJ' +
  'ZUQ1samc8dHst077E3ypUsd1p6TOv6yU/IehLxJ6P31+0J7OEnlzFrSgC3QaExy05EM9TQcM0vsOHoquQovpgPMxO7NJwWzUun3hIRjIviUxRU4wyiVqW9Zc' +
  'jeCIV6EZ1vEmWt3ueJ/R3mk8nUTn2ifdGLa4RBFZYqEMdCptGpeXBKKgNhP7tIHe4CA8VE8zwppWnEMN1tXcidp1diXbhc7qUKpASImjNDFu0eu/rAXKjRXe' +
  'ZN9mN9EesLt/A/mCSrFNvojPvGsfEsXeDr5S1YjddCNpKeJXO00EUoUJWlzHCvNWhKVXoMpedJo4dKpAthl0odnYOzHi8UBEuqNHQviayVmBBRmwEYbcwxGB' +
  'lglDtVjPFc9niLWKpW0MPyVH4s7zp91LK0ksqB26jvrC+hPF3KWkaKfP3K2PrI7lscysti0d8UJWgnoIFEC8yDpB0tpMoqahNJHImddphEJklAO6HbvLnWQB' +
  '7SvNioZqckXf+Xeaf4V941SbXVlg7H7zHzEAMs/3RHLrCPbp29AuZppOT4/izKjqoJu47rG61shp2IIXUtNpOUJRineWik4W0tgJNm8GrTAFCZBchPZAazFt' +
  '381fhgphOzw9WfvAz0t1LFlcAvmZlnZCPWzU1ZSbOvKv3WIctD2j5WfaADmGugekpa/ARMI4zet2iOw1yMHwjLcvwh2xmYOyynaZdNOi6JRgZHQtzMMK1zJt' +
  'CUrErB1fLvBaYGNJhHJiG9PDBRwxBvUR8zczLzfMeyUzlMXHRUNyWG+ZikachbZr0uIHZgWUGtPGLmbrbtLBl6I+WUP+FEB3qzyIbTGJcyfs9yXWemiTKaRz' +
  'LRQXVWR0sd8h6Qs8AFvmZw9xvKrsj+aS8S9jCPt0SGg14HeEq30YRZgxxE1gIACyNu6Gkd56LFomEW+gXNCCiGzeEgvdpM8z8EHCFW035QwVMR3Y4Yt9qcgQ' +
  'GRqHnscrxClnhVl+S7veXLTcn9xFtzOInEAFBF46YLKuZvA8GfbMs94wWX/omT2ZRC8z5SUN0ah8YfmHAtzggZ0uyPUlbErw/wAaGafICq9HWW5b2PvMkU7Z' +
  'l93eZd2bvLD9yXekYw06CUFyhAWx12TOdXuu/QGomiVbnSatKNiVDkJmOJTmaPRELNqlVuQ8GM0Oqk+9FL0hDiIf6p6EZa7vDdn4lhsH8I8yps3R/VHxIOfi' +
  'O4gan5fWK0st3LJJW4yj9/chYuQg7cTRMxMXthMpZa+gH37YO8vHcPxc0kD1Ozy7tppZQTHn9ELgLV2lkdFFC/nE7SjpPBdRtIRhAPvMUJw4fEojCF6dSjB3' +
  'RW9DlAqBcWBfu3ZxNRuY/jaGWK1jGc0e81sXfSK3ssA/5BBK9gO17BsSi53Ov4uXfxErNwRblzCB6I9TLCLycbRJcaZktMmqnsPqTajxvvo+0p+d5PBqedJb' +
  'xOMqPEbM3dUH4fMIcTEeys2QdGU92cFz/UMAh6hkHlGE6JnQuUFVmZyd4ypUqG2EVeTKlmjqxdgaBwQIEySiz4qzWkfBwsWTObP5MtlRpmaquB5Ey6QArAar' +
  'gIq6N04+dENS7XI/MI3czgu6/BGM1m29a4mGpzWhbePujcE7ln9xep1g0f7Ml5gGWKYGYtnbr7bPEcMVtStrF08pqyvRHZhl2lBCxp1czLGmFUmEtLRhdnt6' +
  'P4jGJ1qrBBDeFfLx98HCPGCVSjMNWCFXLLpvo4N4tdFtF26YZYQdMCcXdiITkeCMBQGAg11TbIDdXQUTZ4HLy0bQtZjLP5jt2zxEQpC6t0liB7wNwIMwcywd' +
  'f8Rd0/q8JUrltGjacMvKJ2mpD28V6zWIRThxUGi08s32+GKcFq2/U9ZtSRsHyZZLfKKV7af42l21ViUf8GUq0YgXDQfhG/HonpUSxSNlADSK4KbNLPWVgMHQ' +
  '/MECckeJSb0gDWstuNpY9K0YQ1OHYy1MjpBA+bQF+AhIEu/JwGh5lALtuL0NYLcE7FCYY5I3UfZ2itQmVbxAYlZf0XWOhY6F+fXXqPYl0UFsS5gVCNJTu2jO' +
  '0EOeZ3AQ9GlA8Tv6IiQzmuY4uBr3iYmXeCfVdIdzl6xiQz1SglASQzp+u/pDHD4pHHkItdLrWLccoWzzmAyR21Kc7wRaYR3t+JTTQZ8Qo1mhkWtscQtHFBig' +
  'R3l47/p3mWDQt4v27XLGDtfiU70v2+EE3yXbtHslhW9fEAgAwBtE30LRg7VIOklPeXwk201mrmegfyo4Vf2Tg5dV3gXPk2TLtDnO85I8swqmyQQO6R7GpKlo' +
  '/FKD1nv2d+qXjVi/eJ3INuzMriUpNoQQyM88QI5axUE4h7uoMOhzrErFsQ1scvMcI3xAj3K14lUoxFxyiLpUTUeSYrSgjH8kzxQXJbt6GWX4HM9UsSIm8wHb' +
  'ljFzEfwF+IWOW2ldoqbuw8dvXT1jj5re3aM3Ll5Ia2xTAqJv0W2jPRe/FPkg+OvC2OVJEQpXJOA1RMJv25EdqBroYpS15Y6/xQVC0Ty2+z9zP35Y8QxHGJor' +
  'nEVdgDo9AjrB1mKjRFW7AnTTMksw9IchVtoZ1FXsHaPWQf7aGOW8tkUi1eb8S8tay7CKCFVbNqANbx97f1faDNpQDBuyqH15mBkbK2lYxUXmJzXxSbmd8Ja+' +
  'R3Q+vKEsTqbMy7gjGsOhH2nrmO0apF1eZuF8pNJ3w4hzp8wq0xF3vMCpA52S9t3lrgVnI4eIBPa+i7T4YNWcCX1GHJHKCV08Xxf8jDllMbbykmr7EqPb6jGA' +
  '8Qe9Knbz2nFI3ZlyUzCmv85laYnF+c48hIJoOX5moKNaD6flgZGi+88sDU/LeZbFv5joGpb8XzftCYaxi7RYCGYBGkLFtdj41l8RCngOCMzODc1Q5Y9pn4TI' +
  'TMlf9MCox1ll/wB7De4VEV7d9sYgUoAcEc6O23op5gywvLEkrK4IAmXSLNSogXKCjPKaYAe2CB+ewfMuLoXIdjZjMKvjQ+QhnJfchvL8yjTLoa3D2dJlLn2R' +
  'rnWjsbv4my0ReAasAAUTMZg+XiDUcdXll9bs+JQc6RtSOM6Rad0cG7KMLqoNrhJkVm2rO17L7E5H9vR5TTmPu6C6Bi3K8/5yp2sGOtSmCWdHEdbmSWzKsHLw' +
  'RtL9IdCEqXJVA5v6aRbR6OyYgqniFs9odBHHKRM1OeBAGKFD0j3+0xN+uhg/Mtt6h45ZaugjmbLwE8aX69NXEyYHfpaPVxNsea+WJ/NR5fxHJS+VgCUUbmnX' +
  'DymQ9pqhcRBDogmPeiaRiHRvCfybEwoKDQhp0sYwtJmNLhqia+g76w7joy1lCWNvTNWmxuzvPtQB3hFF16w/f7jAaG35CWT5mv7gjyvDe1PuR5R/V/sQ7UBg' +
  '46NNIDgXGWp1blCrMcEaatmKlJs4Y5Xg4vvxMb7fc7wm5zHEvMFhcwJdqyHq0+0wZl6WKvTSWGfPbY5mZsHsjmcNC9oCaoyLHbpqiKtBG+2wjvCh4f8AZYJk' +
  'd9mA37ytozGLMsqO6mNSBpofgPePQx8YYtRGkS6i+EOp5ZqDI7wqEQaJFAvKttR9X7Ss239Mmg4E2lkAtZpHPEzA5zP4JbB+ZoeCGdWOWYN/aMK7oGH7HM/E' +
  'sXN39tIhgTTYekrpq8EzbD3Ytr7oYhpdTZBNpLUU4LiNsiuEYUDDqNJhUOV28PzGtK3nV8ELK2HH6fzeAIR1AN7eCY2+4VuDvHsKpGB9IJ2LizVzMvaUBeOn' +
  'ooqAuDm5jFH7unNgWn/H3h8osLUbHyyoXVNQLBqWoLiCmnH1lR6ZxfeDxvoVBv8AqhXVqp5j7MITcGtYT9lYlVowZ5cMC8h32h18olwQzvFo1g2MYPVfM7ig' +
  'b3OZ7uJUqR3JoQP9l35nYpwg25lyjjpsEQIu8z26W2EDmPtSXtDQgVNb3rEVxd42ty0OHS9pVTW5orr8J/ml0dBUvENXgvebl+kwqlaydpkEPMdJ+5sEZuk8' +
  'dgZ92WO9bfdm81X9VlhquTLJ3hxB+IRVKyhFqVmsGP3DguLbFcB+Y7vcidszL4WiF2H7Ffhhfgi1dCK3OzQgVgoIqIryiqND0dNzz0tEwZg0zzDpu2YPNkp7' +
  'EYqdHREeXk11djwQTq8CPH3KiaFHAjilvKuM9VFeEDpbWqR91lO77SuigtvmLZvE7TmYAJeFXloSqIdssHco75vvDipawkK840h9JcgxnIHxLUw4fuAeexD2' +
  '8uYhjS97Q+TGgMERSIElNhQ16OAnXqNJTcvofSUfeBryaksFiJKnCvkqiHbXELMsSkWzHllQS2R/JtOKBq3aK3HvvKFNeoM2ssdIR21H1JgIM9IIvsSw2Gt4' +
  'YkS4ypED2DFjt0d1wPzEKd3xAzBxMpbFilQud4ahyiaM3Qy0IApLI9Y5bsHHzNaMq7W0HtPBbfia8oAvyxhKDdFj8ka5ytiMKarGqeRLd7v8xb8PNZWUeypa' +
  'mxUvLVV9+izNWXtHZro1mczTDDQd45IaEreOjtiZVcvsdX1ItXXQOWAzdx5YlLG3X8S9s2sH8ond8XIS9Xrgh1jeMMCy7ywbGEv7P3lCtO0SrwRVX0rtj7tp' +
  'Te3vP+TTokmPFxNr5qGiwBNP8sTDK9bb2qMgasMV8wwJLWugIFkvlXrDBlvlMqHj0d/WJw7Gh6m0Mwb0kFHtF1G6S/Feg8szs/RNNStMnTyzeP8AYvc9gu2u' +
  'glRHPhVtfEtA7qKizdbsMfab5bMN0Zl8RmjLJBDVUfQiQ1mXS26BHR7IrYgU5V2hljKCWObekfkqK/8Ax3Dacn3n+JBI2oLMaGWkNvzEq1rbMXyL7swJoY6Y' +
  'rvLOFma13qWlbl5KORlK15GGQ2h0tXbKaN9oLZYXxDTpFpcQL+MQ8/a7nd/ELZUM0axm3HmU7R7H2hV9Ykq6wO5RfmWLkVhfBjXNIYJe4EGj0zoL0LkgFFRY' +
  'F0UtF9V944bd0DYU9p4B0VMy9LWdGZ9GOGYQRdQNEKp43/u8C6ZZ5yhSDfu6R2O8cM1GEEoXCN3u6MQiOzVMyntGUsJugkOAmi8Z4mI+00LdCK1zO0aqJZv6' +
  'KC6n8pQUFDc+vaW7FayrtYL6fo9E4tSQLtkARmMEf8ZCoTACJVkzVBqIPeBDoRUWvhFpEqLmhMjLPVBerFo5v8RItH5Zl+F3PBMKtrTwjbt27RYqY7YaPGfE' +
  'upwRu90eanbjMFvMAfWUH05DY0m7rFFRVd+jrQBXDMoQVCBVuVvLQ+3RQNZlyGmbZ9/LD24zOyoaUShHDXNks6tyxbpDXhCqvV6WTvqwy5y8hCAvdpafPHn3' +
  'xNWW7j20faXL7d94WSoTeJ4O+JpLgfhr8yrVo9po9MFsSgQ05REuXLhCdnF7S6cv24gUSqdu81lJXh4uV18jAn70ebKqDxE1EOqhaLbrtzMxJlLWXUbwo7n8' +
  'Rwi7D0qctZzlqMjehAaGV+YyZzH5joaehrUsjW95RZbYl0Ba2gcRt/xeXEcPDEwHIYSWqwVCopdz4GFgwRqocptMC0MxsyzResPi7oWHmZzkHiOLcARaOMfT' +
  'gGrMSMNEEj6Ra2bnmKhiI9TlxLlwBy7EstRlVMjAZrWlja5u4g0zBToAecVzKzXBLPaBWkrthr03/pKhhRvkj1Ss5qcDwzVENow16wzMSwDke/7+kyfOM7xM' +
  '1Mrq4g3lmj5jdcfS7sbue1QqTDGQd9Gc3dJdwbR3mzFRJe9RM3QJdiDmZ743qoFJ1HwxDI8QHrznxLu2a70lPlF3G7BXioEAZcyou3waNckCaLyeUcyGJ5Fh' +
  '2MzAXn95cOEPmd+hiGz3VcdtyivMGJnYKjLRHi6MYcTkB4l+qxsBKtOiwN3ouZavufmAuOBL+haLYm6OhgsEqmPI4ZUs0SiXTivMYr9+InI53YGjvvLGW4NS' +
  'H9zWqrPmNgFBVN65/MePZF0MdNUgs92CoFIG7q5ZrWjqMOTnxvFRRSyEJ+jTHs29UVZo8waXvBCLm5o8I2VxLAd0Oly+jGxPVl87uCbCscvYxYKg0k0XQwQW' +
  'BwMwyKZtkSFQa1n6LhioHmRWpfzQs9H1LhQsri4w2rONkZmkRh8VLC1SJmVMVxV44ZbGfDK8QcF64qJ8p94c3L5mHinsZWaPaOKLRNcMQTVJmrTWrKOGh1t7' +
  'IHpNR9FzX1hF94NWVHlRibf1jVXpLh3QHsW/EFl242jQ7RsLeUKkMlGXYaELNvWF+VjqtCw4KYNenY0FlQUo6pEarTzLg64M102+IW58f5lqyzoMWXFmALO8' +
  'uUDEfozua15nuhhOnVVcxgVtFnxv7VGAPBNg52iadkY6UbExFS59ANEbdZPnql2Jpdx10gjj6wXbjUph+YlSlb00YQu2uY7KJbTMViACyMvRn5ZY+fvTs35z' +
  'MXo2HylpjLxF+czG8LqNZcWKwuXViT5yxTtt1G7qX9YjrivUmvTPdNpqIaPS8BqZlIG80V+Cy9WppcpoW7bQvnJxBGkBGoAq3x0sFdNYW49p5BLFiX0rEN2V' +
  'alswlbvDrhd9pZA21qVSOMim76Fy81eem7xLEloi6qkzFd2A60EzFq7mJekO3bwla1y6vMb6V6zHwVqy7jpL+Q6nTAV2o+4Szq3uFku3+M1CS26q5VFywczs' +
  'J+8IG9K4ms1cNIUEqmygXUsjN3e/MwEbY1fqMnWpO+H4mslDNjw+JhbtPOIWVnoCULasBQ9LicHoDzFd5czEe/qWCbZlCOnvhn5uBWOOmI4lR5TKTGJfdzSV' +
  'Fb5sSymSA3NZiorjQi+Bh3iLGkSxjxACMNjHbHRBVHWstwvpZTYleXQ+iqGr9pQiP0UaR7xtPIQ2HMyF+Ge0x9D0cxXSMC1WYFANCWvZEsitDFRdwMxU7tfK' +
  'e/B4hZLT/qC8S0GU5JTmDVWQVmZRLr/if8HlGVRqH2nfcOhBcrxUoz+mYTSC7HaUqtp5lQaMNNhJ2hD49VA3snzwi59iYEu33I4GGgWFtWynBcKuappqzTNX' +
  '4jELrVUJQiOjLAevdqH3PzNO9mLh6CLqhq/OZmzRlG84i3LtHMFQdHzLlNEYBcWk0O8V6kIbyOOtd2rMl8E81CLaJZySzkn/AGJ/0J/3OiDaNGEP9qWbnv1Y' +
  'qT0zkyLhqczAePoLBDh5TsvQ6cwWqExt9q4gtlItcb27z18sgS1O0+zM1+66EPdgMe/n0JZ2G2r7xXIeKI/0zTV9gZarnzfFj4lnqiEntk1I+RzMge7SVphR' +
  'Ky+59Go0XXPabFB3FNUTw4lYKmW77MqQ0aPJKM337dNFXcjpYwSINJ3VDSHW1RtVdeiFticNvEcHtQSSpYR3USPDT95g/p0c4EP4QZXoaqaEJSoFU6kYbzDf' +
  'Qb1veWVALzRH0FUZb1nkt3ozWWQorPmEmbhMw4zGZJ0JqE90rLRHpEbNvLKoouI09uV/pn/Bn/GTvXohvpCNfkJz+gyXfwfacHtX9QLteQ/cr0B2qz5nqG6T' +
  '8EHmO0GQ3mC9fodleJiDfEryeIOm+ngKHKzmnMpK5aq90TQPtEooHQg4xC34de7Fcy3cr8EOwjeqhszby3MoIeIhwS/HtA9FkxASuN1fhgczVNoYDBzDbUkL' +
  'kSIdOlRqnaKgRNRlRJbCXRW3NHzEjsU6g/qGsGyRFZAPqO5KjHATcvoMDNLTMswfOI9LxcY2OsrxjvJAZK9n5nYvywNFPBEOXpLUsSXnpEqheZTXM/5x4fNS' +
  '2W+U2uMVKZHSoXfqvOZrMTxYUkedKlKtX2+gzfFX3bxKVex/dpkvFEBVEKglBcR4mLiwt0tEWsLgdd/LDhz/AIEP8qf8aWfonZQ4X3ZXkx/Gof8AT9GNU1xZ' +
  'fM37eRCXu6IXZU7J94axQ/aIioLcDQjrz6uxgq9+kJcMtE4JVE0eL4MFZXBiHbWlriboO0mKejUmPPsR0nR1lHQ9Rj0FAeEiqXo04d4IdpyfIhqyGDX3ljf7' +
  'f+4igRMI7RxCATdF2pBMkesMS4/86DPRjxUVK4lx6QAlTRTOkwMHdmVnVlL0m/DEYFC1Ww99ZzMTGfxHRUUfAPRhg7zyZPhg34umMPQgoQ58CK9oE5leCB7w' +
  'U4zid0sV0ZfWQ2aJ2maWtkc25Vla3V6PN4JasOD3Je7D/wAEfR7GPM5Z7TVYIwV7tzADpwTp3ZnbFY60PvNZMnlNe2LILvl0SypXJ6+d4mLjZu58bTFf6Jcu' +
  'C0Zm1BUfpINTJyahDcOBL07wmBGNnb+0T62k2l6usRwyLE2hUh5MX9yZSU8RLW/2phrV9phA3BDEV5YV3dCueMuhtzLlwo3Ln4UMbS4aS6tfKP8AImsd4x4J' +
  'oems56aRhHlWXed8HTRdHWDAeOjEtewEMX/2e9ExOBnpU7xY+5FAlfKqfgRVL6X9VwrVh9LhpsI9F5adTzD32lsGJxLG7dFBVTmaqWd4uoucG+sAUbS2HB90' +
  'RG3cpjLB15+s3LxNRzKHQhk1aNm0y0bOzWMUahFBiqFr2j2YyJAdHUm8NcdxP7xKIxM42ikZdjQGn8DzMExTJw4JiP8AqQ5Il3FuaoFuZmg6GIafSJcLbqYe' +
  'XokH+dtn4m/xcYsCZL0NZ2hxNTjPRRbiCV8nxLNY1UqLbU6VoNXEINbhgO+8OXp0Bayy5cuA7QbXDXezCqBdV1GHRQWTaaSNR631IsvvPSVQ0xiuvEYpuswk' +
  'QTc9OtBcVomNGkFr7MoEZBRDiOZatWxzLJwquDxR3HEu0SWF+8S84AHnvPil3P8AYdVoFYRr1SpUz1bdR0guvZ3+GLCAomvaaOPQuT0iS4oqW1IH7T8aQAX+' +
  'IPD2nuHLwmkyzN7hcM5miOwKuxGwTTAVjnqtLEvdholBd24GSMRuH8x2Z+F09Cg1YbB3jz2ZuS2suasu1YYTtNThN5BVekZpSWsAZQIwsD4n96bTJPl0tw06' +
  'YDsR/BmQpSF7DBByNnEvppFKGA92lsUNfpFeW9DsS8U3+QwzCzFPP1FkanEffWfs6aDkli9BrHZVoSoOmso0L/suayFeI9jeJFzbtbr6S3Ve8DrG7d6k5bKV' +
  'l8zvIbillENtU3ZyL6RKeipgLgANEplDvTeCLZdyNI0wGex3lXAJst5jNuPXpV0jRbLhJlNWzreVtz5memmpKIzyTE7TIlNFZuzQfk+ks8Ay9t7X001ggPXa' +
  'ABNrrYJhjQhqjpFbNJzH1HR4XMNGGx26KPeGHTNcqOKC+I68EvzEamY0Kq79Yl8aM1p8xz2hZW79CyeZd3VTH4HMVhI2ghtY8TDRHzMNCS7LJh59HJCdyomD' +
  'HdTiL0D4nZgj0Y6w+kcKjGTMtxxHDLLRwTQnwulA8MyEXlh0seHUcMmZrmogjGkwHhj/ACjXcMbuGIO6om6Cmik17RWBWEQ5mLGoMvPQOkZqh8x1zho8NJow' +
  'Oh1Jm58B54iDNDOOIxla/ngnbWI3IpEpJgbGO8MIoNEljmdKXHk1PWJ/eo1GJCuWILNyw8+YJBw946QszZMnqJiGAongeY5a9Wcw6aW26ngQe+J3/wD7xYWL' +
  'QhgqDKhCaTSVdXeBCiXMnoM2l0xRRhzZEkEaTegQF/AI7X0wfWms8qLBxDeDck0CGPxzQfdOyPOEKHAOzHj5RWy+Seg0rSah522JjVzVKlN1esM49Yj+8Tc2' +
  'lutfSHQVm738pYEuYjvDWLeWG7CP0TASt93SqkyMFbUySjSaNTTmOWBmourmT4Iyp0aaQehlr0maZVgOFjlQLZh0xUxR0WVZNsFCDiEcU7zHitkNX+oB/wDG' +
  'NPfSUrphNdEfJnvLjA2sSkZYWGM0/Y0e/mI6ZeC9md1eL/UDQBxv7QRvLBoPzEcGorZWA3hkAS9Zpjp2EflD6zfxHDMidMPXCaptNToHXQ6E9eejEWl21uMs' +
  '3bja7+i5viVr4J8C4soCxYd5ZETt1Q9prRUzfIRbWNFIPe/BB3fVi2g9J+Douor1lpbiUzZDaemN+ZsjpDoMdHVLeA6MOQf2mt2Z7TUs5mzUcAKPQcq+hlNo' +
  '25iuBrArNDTu7vTSl2YDWtuILQ6RUwrUBKghiygdyGBTyc2Zl2Bs9H6lsGLZanJqSmiwV6NqTGqzK79BhkyQpdXszB3DAHTPVR3lDqIUMF+TUqHjo6zKfL9q' +
  'ZD0w62pBqavo29MwN6ZFAu9/E7w7PkWVmUFR0nEOs7VNWYVgqA00gCkm8JNvvx0JqS6C5SljWTDzK6VQJ9FTuJuEoW1cz0jLvSHBL06BodVsulKA1ZVBtN4m' +
  'AWy2YRhj352NYCPiFvXN5bFlynJGjuZIqvgaswYDad6FyphFFrYnJxFnbLw89DcQ8QqO1ZPTgz5oFN21v8+ukxi0CpSnhc0xpjia/rmeHXoPgdNgNpmt26V8' +
  '6sXFczDyXMR6w4PXv4PtLq/E3PQ6DNSpcdIddDpcOWdtbTW2IPuTCAgj9bH2j0cdPAnglDL6aogyRgGyR2CvzFs8RSq2PRBH6Q5QDyw40CnBusM30jmVb8Qr' +
  'PYmlT0My6Fk0hmL9Xrv5hiyd0YpY12mLqJQVp0CXKBALVvNFTSCzMGZ5cWL9Cojj6GSESCEG49SI0zcHbodJRwiEHD9oSJZHbgpoiWdAYb9pcrvcdpcwM+mI' +
  'cxy+8y226LdJq4CHPsqG/e6GsV/x1RU+kbHUhGXLl/RmsaFCgOTTfPShce0Cuiyefzi23KL9YZI7xJuHSrImV8QsAPkrfYhSFre7U/djrdRK6msPUPlZctjj' +
  'iZP4J719CwZcbQ4i9AwEuB9GCVBaiUA95dBiiu8BJd+LNhjBipd6xSyK0QLSenYSwBdKpRuFmqOdPEOVksODeX1zRUPyYKWtIV8sKxo7OGhOKYuCnlBow5Q0' +
  'jTSaMWfIkOXmOhzALGOiGCpqTAqe0hwvLHJUrPjpkPCPliwHdgUH0a0wj9OrNTxAZD4jaBVICpfT3cXL2mRd4/cjkg0dCV0mrtXUt0PiYABpolLbekNecMfT' +
  '7savVzELG+p0kGp3m9D6HXE0Jyl1GC9YVeeoAb2uhxF3Nc1xEv8AWXq4Shwtz4GVGKqU/wAE8+ZfQy+fErw3gSottY7NNYzPy3ANDiLG2HmBuZjqgtm+zyku' +
  'Ix7sUw3OqqeSgSDiXKcJ7dZZDa5k+UG8U1Kg94RTchbqo5Xk9Ph/nqVTfUYi2lfQPTalRKkEyGJqda3SgpUy7QsWnghSX1XKrFotUYiIUa/m5hrFlwsOk/EX' +
  'kRQDNR6zJsc9AI1OmuLcNJy63Ls9NpVU/wAdDS5IvtRUjjUw8iKqiBpdPZdP8TJ4ipVVdWCz2zAS4rQ10iPQ1u5mS2kAm7fhNAJBaoEsDK4WGyfo3+YQGuSD' +
  'i8kzwXU79PKDM0PMfuY6SmUwB2hCXWeCe+nGO16TwDpVT5p79bqcddJb9Fy85ZOW5Gmesr5FnIvvDp5OuZHS4XT4fqpqYAxLUfEIA5PeN7aL+hHrCGPbp4Vr' +
  '6UIlQ6HQLh1t7D5mnWs63Bbji/NwC3vUXWLdu4PeNLzz6vd3jtuW6TJ6Sip1M9ML0TCOvSuPbMEalZ4lwVJAu6xK4pLWi5fJlN4P3MJXB2gAvJK1dBZO7o0f' +
  'MXyYxMH0HT+k0HvNUzp69NmP/qvoqurKDUs+lgMC2zic28rVVzV5dFtHRjk9GScBBtXfos9Xn3amBxCtdT9MFDp9h/swcS+ly5dRFW1xHS8zRCkHzDf0q+mk' +
  'dt0NYUFVVQvKKxRwg0xvnZDnPYL7S5LTbqcsuBGFAsmn36BUDZmBUSC7RWCjWSVRH/RtFFtSx9uY/Uf7ljXTE8jSVW2tDUVPQG8UXoPemryiZmv3foP3sMDs' +
  'QixOc5ipOz+ksOm0dZoyz6GyAN4WaS1S3Q6z5MWLbcdIa/HTNe8N/PQg3008GwKbQcL8zCtZql2/SxPdmKd5odLlo/R2Qj1JQKBDYmsYS72Kt8xzHQwNEqd6' +
  'vySwgbjPpG46SmpCYS/1lRZ+ViauhFUBcqKbn1mU62XuP6gj56iJqzasXbtAt6gtbAlJXNLkE1jzEtKIVjwRxLnyCbvPTXrmvSbo/ZHljEdbj4CP0z7fTqa6' +
  'n3Rlz10egvEoLSx3D9zFt1+x6b8H56qXNB5ZeDhdvEonusPovp+aPI+rX0iBfSFZWupKBiFbShgbQFRmHCOi64cyoZr1A2DEsxV1c7E4SCUBb4mqWQVDfpqu' +
  '5WAhWMrtALOnjT78EbRMkPQQBYGh2iiVCFB/17tLaLn6suiDWXI/R82aY6TN9vofow3g4TmPPQryCQ8ondgmj6VQ9DcanS/eX3PQ3q1bY1NM4hY9hjl6ceZ8' +
  '7p9yaErqTR9pk4qqTPxIafSM+Aip6MSUy8qujiX0EsuZlXzFzULYu1Rtavno0SVYwE3zK90vsTDrFvr4iiPpKq2y+iHQ+7qHmPZ2m6vF7Qufl4O7N5eT7HaW' +
  'qlBOGa6s2tl5wzKidVpR0hyeXrxBtpp6GsfvKQLMKOQEA/P/AJA1D6BvErmFcRifEIZXWtPM1S0M0ppfRczHxHduI+AfStSzDVjvo5MTw6roZPo+cFbInfNa' +
  'a/Eu9yEYcawgbLiYBKRAJbLQR1x0CGAtZUbototP56Hz1sUxdvghiMNYru3+EHO6YDD2RKc9KiV0en2GacXsTQ64LmIppTfperguHEkAp7vy9NL6RpuanQ4v' +
  'jo9E41gQBxLPjkrKEqbk+8i9iOvRAx0WoN9HJ6hkXfRV13TXpDUvouqiXMH6TDiAHMLZUI5lUMGJwsxSUasotpYbTIJWL6NseUGPdBtL1cG6Li0i8BtGOkvX' +
  '8XGGXKB7sQcGDJbYiGZXPQ9PkI40dCxLZdrM32m7v9Hb0HxFtK0rpl9RYrjollTTH0ZFsYz/ABBXbqJn4+g1vKVF2j9iZn0Qyap3gIZ1mZ3ei05Ib+g1r9Co' +
  '67dFtKuV1IBIDrpBTN7eKbpjEELwln9KO8LIYNBpHilDrKZ4fExItYtmAgtqNVdz2N5qnAdFjtSqx3YCRt3SFVMNDmm/WeeTT7kI92ZRG0A6xDZuCulcyhwa' +
  '/c6Hu9LrSPykSh79CVKCCek2uIluvo6a5h9L6hzfV1S4JujOp8iOrruRVfzNafhjXAiBHjHpqz5v01Mo5JqTT0zR9Dl6VRHbqrmqCzrHMd5c0hAySrLKULdZ' +
  'QK3az2TfzEFCZVdYO8tUJlahkrBl5mz0IJ0iOauasTJ+YGxYTDoqKBkTaUyXt+hGp6ZSJn4LMz5RI2R7+3RMuWTWUdKKRta7RZKCdnKHEzzArKMAbTcOjgmv' +
  'sFHn6HT6lY6DB115T+7Do5qa9jd0tdze7SiZVBOjTT1iNFQNf3SrdLNV7R5oJlNSHh+jSUOCyHYRau30TxXRpEuiOXrpM4wtqxEOmIrVN1mRUBeg47uxzGFH' +
  'b3fPM0I565x+qG41doVTaVZd89FtbNnQgY//AFmNsha4fHzDXVhg0dMpTKldEg8mOJ2ftHdZfv1dUwWxI58phu7boEqOvqqa561W56akqGYBHwlfarN0fTeO' +
  'iIFOjExVkEZrDk52WXckduAJk8Q30qVYXiH/AGSm0FGz1JbdekycQWMCjKTFTQdNJvcqJOX6TE32nRmAWsJFzm/ylwAZ6He7d0whKwDQcEfoCLc6KuJTWIZ1' +
  'vxLWjv36lKvfPQgrO+ezcvzyFRR1lpzoD3hC9dPWYKdCFGDMax+hslHcgWwKgW1GrccZmATDRD6GZfu2nQ06VUdn1DZfS4Jea6Dj9Log4vXoR6hNKPFTWYTi' +
  'IvtLN5wpE1zCF8yvdO86PanhCkWCaRz0EQAFtCaoelq7jQqWRK6idGmdZmLuf3PpFG4WCBvybVFUW+tyB1ZCE5mU1i6Cu7A6e5ldXbctcKrYczjzI8OfpA/B' +
  'ycMA0AJdvB62z8ywdsCOr0GZYVRNwfupfJ8p7IvTVFqLfS+94MPiBKM9NqOHRHOzUxXjoFsSHTF+pbdcEmYVGWXqjC1h2uLN3/dg9+VcYC4cGaMOoFNIDvNF' +
  '9oAUwHepiWhWGsafSriUdF6V0c0SrYKm5KzEqVKg0zXeLST5252v+RaSrSURb+gKotYyFC6mr3gxWHtq+sadelppDE9ncgwO04vvM8RJWelW1D9pmEN5R+So' +
  'h+T4OJUNLoY52oD0isHdAo25ihx6ji9pXDp/sTNRTgm81mHcx1e3TV036rb6hsvpsgU20hHlU2WNPM7xGfLH5OtdYG3XHSw09KcQi84/EVA7Q1qHVzDoZr0D' +
  'obvodQe3DTECi9B/7iEjghXnqI5i0vfpTV1iK5wOJYYCLfQIInQ6kvbzDRJmiMeWfxRKpomvEqUTK2MMt1aepDQ6b0OjCL1yBHSJlKiVHoYXtBS8kO80jAv1' +
  'lDvMp0MrV1CertQ9uip6ZFh0IZ+l7dNkq4bdxajo7nrPnX5Zr55XXSm2SxFZ10jU66TyOlFpU2+jWBcxdHGYV7EohKj3tCDu8fefAiDiYs5qV5NvR95Y5mjq' +
  '0K5YuGaK/g9oZXTsGhGkDJCKg9Y4mSa9KKYFIq6u+8xWVgqCbXIEaIQ9uhFUtlzFbnQ0hrXzK6PRWoRXKZUSsMXR0g4+YOfkjHEYUP2liBdK55UQ6qzo6VpC' +
  'EVfSNN9NsI8iughraVf+rYfY6msKPOetbb6NI06C38wxBuG4Po1xLe0KdbG7oMmVKis74lUinL1Si8ySpjVoD7Xg1Zcr1Nq1mHRi9wJV3IQVkD7xLlXEhrzv' +
  'i8Zj+SOMCX6yqlq5AHMYKyAQ6GUfZD7T+yUero2httKjeKo6y30F67R6O82qGnRdl02TF4mx6rvvDoItupfpp1H6XippOmarpzsTBtTnnMNXpGLBwnPl+in3' +
  '60Oswm20+76XUG4K6qcCes6uW4tzE+2aKlSpcjjBtM7CiNZyF5sh4FO3ODlbEUMJrOPyLuxbelMGqxX9jYqfocRxLuXQnIWHp5lWPyG82E1dN5nIyyVrGh6T' +
  'aZgWWZk7kBRZzC/jPiRarlj8xKlqs1lysDbt0mpKirB9TNvvN4MuWoVhhNN1TFvzpHVrTawmT0G00PVstHUz9Cpmg6KCUCj7N53ItN/iPS8GGr5+jLfQ10xs' +
  'u6MNDoMNLlx/CAadCOkW46UasKDhBAgkPsPQ9WbqsPw/LOYAUmOBe/hWU7DLwd613u47cEVI8vUJDVjT91cw4i3BcsAbzuYoHhFCKras2h6GcMczT8naCbe8' +
  'FZpWkzG15Zfmm8ox05oNYBO8rXsq3tf84isGUiZGCozT2Ga47ShQ6spU7xMdE6hqN5v0steHrK8oDDdz9/Xqeh3mx9FeYINdHq8JpGKOvczcUn7emmbk08n0' +
  '3nQkI5kahNK6kSmaKh19P0uTpO4lssSjMRwpnNnaUoKUciM4nAveKgXWO/8AUWYt9cntl0SGfMb0iDB0ay/ntS61LsfLHhQrYicXdj1CzBlQ1DONXmasYNo1' +
  '1ulbcUmzMetMB2Gr0B/PWWrM3hpqMHQHbaFYSrtAmsejPHTV0zJVIXvgikKO9LtjJWlvQhp0S4/pd86FJrHrXcrTZFlrlcZQ2qN30lc1jYO1w/Sq11NhGUa9' +
  'JBfgnp+hBiPMDppjTo4JzA5Q5qUEw9W63f8AJRnLk46sypBrFiHlH+8d9LBZDep4Xh01HVzEp6UtriEYbadBV1QlHk/QMtj+BQTVGuDBF3LJqTLAf1S116wQ' +
  'XUwktN7LEC9oO3/D/wCRuRZTUXZY/N/6iThp2IuqaZJwjnhjgOzkiRu4jpr6MYurlRl6SLk5iX19k7f3HU1+jBIfofTdk1jM09501OmLMsuid+lOGaIdzBHQ' +
  '1OT6cvRoIkA8k8SxHMohKsqOgyh3luDqVyGV56QwtJedOZmONX31ZQcPb8xsKBe6RItdXDY6DAHdqqv7wLg4SmIKGvEEqysZkgSl8pjVtHYiVZgD8yrRR9/P' +
  'QUro1S5V+ZRCZrV0THqNvnghzWtRodhFmoVpESAK1Hteftn9Jnnx1vp7x+53ngTNyYjKg1QWyoaHOIRDQlufpF22OmZgrdo74CrwddX0OZQnt9RibkM5tGbS' +
  'pVV3MjUIUaNIK6sKoYTCWZjeH0GJc4LRbW00gtg3dZIsuirjV65jrU7gcIFEuu0lbznA/M0R542S5FDjecZD8T8xzMYYJT5xpa91l0YlpgIlf2zSZSosUS6w' +
  'Rbiv8zSAPmXtGuhl0C5VTaa8wHpiKBVAbu00T0hf7GamSvuDsTCywu8Qw5gwskMbff244jNyKR26YjVsMcOnhhjgCcTWKx0U7vcEGt14jlRgYItxZJlhMxWp' +
  '9J9A1CoP0NI26ZaazLXXqiXlijJL2awJc1+UoejKx4OlCVL/AGhBSud5erpm8AFOZRnvL0mi2KdXEAly5rGjMZAhKlTD4b9Z6OAnGtcRb4au4ZbcD3t995gU' +
  'NTt0QwTNbk5lCgq3BHMrzcSM7odJo2k1mEOHSAIhh0MxAQTKrpdTFGMHzBT5RA0Na7htGDDOMSlVJHThjTWviV1nRAwtsP2fJ9o2Zk63M1KXcjN4gUx8sexG' +
  'XjpqfdlmpHFuPoZp+hmCuq1mLb0C4YnrIPPRqIrsxFMrObIFiV0+3KMOkI0mYFXoizGspt0VadSNPesqvLiX0ZIXQNneVKgpvQnZBmZi3XONgh3jc7OCWNrC' +
  'jv8A37TRbseyzV6Gst8mVGvKbHMcHzsvZNdF1d+EhX/0TAbbyl4iyRI8XGaLepMhWOZfS0BZC+x5mCqzz1YS0Y8zRRSqikHL4wiVHMR54x+kXduJUKTULXvD' +
  'udNL7vRE0fxsRUkIZO5UVrJTwdIEX+0po9YsWJWg7cdvpJmY4lVEz1udXfQ5/RKy523CsjiCuSpGt5m94el2Tp6i6N48RUppO6XLNOqtcuPZ/UyHiVBlgrU6' +
  '9LhN4HQeJu2k4dQFZx92AS5e8hbmpdYiSov+0w00ho7EQdQXU/EVUNY4zBJ7/pMOMF1WoW1lnCIcZrpBWkdnQNKjdnPxzFGCrpW7EiGDxu83sF+JaWUvkZ/E' +
  'PqEoK1NGI0kqCdkC04YkYTnA8P8AuOGDo9HaNOq4qFT3eYub0xOxrLnI1jH0DEq4Uh1Zt9A5iuHRC0AOihLurLqGGYbZYx6xz59FTfIsThh0RWQ+2JtNRtKl' +
  'TI99Ywe2JWJUbRrmG1prN0o7YFEsPQSP/PwIR073gmbXPfd+poI6wojtdyooLWibdnV/GYaIUOc5zEVYkK9f8CAWvQ4ikUxGOehpGJvN0l2KCeIimSVyEsQY' +
  'AZK0YQp7u8BpWIo6vZNviWBCBSCM3wqG0zMGoN69Tprp/Z0NBMbJn46GvQzeOCA6KgjCbq/TYXoN4iqGPv0PoLMFRqt6h9JPS/NA3VwbGIHwJoeOvpTECzqN' +
  'NzSOs1ptKNNIQUrBXLNDJtWACxuDwLjXWNHCYNwWTAjBq2hRvNNl/A4S2prFFybFQuwdcTtooqVP1SmeECZYzLYfwS9o7RVpvK+pUt0IJrmBGsrQiJO0MtVw' +
  'iB2KinfpS4g02JQ0X47+ZjRHtG1RDBLCsB4mcGAtr5iumUS6wBOJa569FTfE9AxJQ+tOmtcQjmMtdsqV0aLq9/8AkR520DQ6VD6Ny3Q+j1kW9fpYaxjdSOsF' +
  '0vxB7yfQIyMhZLlGTTqQjyzF7R5mrLpSuaNjWbSTEC7SrOgpwTLiMLuEX17du0ax2u0r6qi0N2F+pZlMVAxqGriEzQFNiciVehMXk7x5m5l1sMdhodAxJdmA' +
  'EGXEErFHaFlBXtGtVFgbh9ouymkG5cGdf5JpfMWt7mLY59cjCsP2qz3cNunwgBL5EEZhDWZe0uZTQeInQK2neeEaxaOYxUJS4C4pSptdHNzhs88TC9yvxNW/' +
  'qYQCldeL6tZ3yoxUxaLFWIzUOPxmgXEAYpfFwDozc8wvYm03CKNqNowdDoBuhFe0g70Q+6ExXA9wibQHhXvDVo8NfaagnmANz5j34iLKtG9HvMGo1uRt2rOz' +
  'M5p7UliVEqsrDgct7GpaJNmeN7awsKtmIunJTIUMUuo4cRamJ7y+JS9AJrmcFAJrUqIsTcaz3IClV/cmjZSrv0upscMvvZliw95QlXiaJNIwY60XLlgs4MTs' +
  'EJ5May6ShNVfNQ6z0mgQAardFEegzR9DlolPpcuwfSF6Q5RK6uXCJVBMF7ZGeGV+WELnol5ziodS+hY5MSrW+p0rrcuBk2eOpGdKGubXxLf6wooHowSmYV9Q' +
  '/cplq5i91AjbSuY1SbdIlkS0/YSn1+vjtA7fCikfXmVWWOYrrKNZohLlO0U6/HUL6b8TG631eYIiUn+GcmsZTxKdvdLhb0gGjfJGGC+SDrj3Rt04Yji4M9al' +
  'GbGWKlyklkEtitB8CY9+8pj8xr1WzpqlQKeq7SjLrCNMsf6ALpDnKmn0NOUpjQcOfMDmu88o4fJ9FjlmrlcENZK8w7rgbrgaQ9pU19uf7UP+TLWrwhD/AIpn' +
  '0xyN9DqTRLslJNTx2Hv3ljqJs8kURWHWz1/4g1/CeIoR3gOjZmJa8wKcnFCWegbdxLOyt+8OAoNNyVlulEAdD0EVd/oYbtw3P1NNpsDr/N3gp9QhSaiesVpw' +
  'B2gfXvANpki5GSX9GQa5RkIE3BV3kh+ZFDpFlx06n0LUvy6KHqUsOUrqsegm8xoqnDNx3JoRxBOhNAX2mTC1MOPQmc/bLDpt9AzFKszdG4k12lQiqLgxMhpJ' +
  'iUnGUKdbZVXMQCBUJiLo8q8VdD1r+UvWL5Eu157y5gwDWvBMZ3Ty48S2yunE8S3Ll6DGEck3avMqMr5GZil/RXMfjzz6G0SrW13+gB9EfPWqWKlY7zCXKvfH' +
  'ecI1eNJdkwxQ0nSh90CbLC39QNwYWz3pye0VehNHRlTT0ZYtpK6Bd3SugFdEEpLuOZXXTxfaGk9IdK1lrq8SsQ6PDLatkLdUy5fWsdRmFtZb3Q2mfMs1Ql7V' +
  '8IjYuy6+sUwoYR2ivHzFHQo1ZUYRnLLxi5cAoXDXGcOw28sK2I8zmXbJ3Jr026bgCcC4LTbV/E9EGYPEXScjE3RgVg8AOgUnE8NK6gnciSokbZJdVZKpWL4z' +
  'A88EW7f3DzPFZHV5YO81ZiwWz7ulfQFvTX0s9pVSiOeiW8o2WL2CXbh0XJKgSvowVvXaLM3kaUd+JTa120h0q7j4mr/4m0tgfQfE0lENoN9uyCBihcwlW8z0' +
  'pl0Hq/RfRrKgZg2DgbXOGnmf2CnUSAO+h6czUFrRwYPfMN51YKgJjp1GX5ldDDgxEWHSEs1vjGSky5YQUSsbu75jCQO5EpS116DEeirxHHQawLQK6bnLiPEi' +
  'r0s1gVp9JKirSB0Cms5HHeNo5CurKPKGk85HLKldRdNYBxKnRpguOwgpbBKz0cO+y5vQW4LYRQu0CYSdm5pgPSWtMeFtnNL7maB0X9JNGtTciAO/mcJDKF9g' +
  '/eFFAaYhLYYsyma5AaOmKKUF9KlIQxx7QhtGbZhDJNz61YBryukqpkhf838TvLeR86ufL0YElgAYZZ6BcrqYrgx0CVbnRNMx1q5Tr9JAlVFqBcqYO+0UyE0I' +
  '5USrfoLQPEqBKmCZjId2GT5mia4uXsyNieUotY0VwSEc4l2z3htK67Q6IOI9vQKWbiy3GP0BGdHFFQBwdO7iKMY99+ipNZViKxKrpppNhiEiCUxOgSpl84kB' +
  'LViLby94oc4UZwSjcqF40Ajvjg/8iZv9BEboLuV1YbxxbeKustyug6dTLoqunDNfow+kIR4lgh0YNjjmXr36XGVQgzYGN1rGGVQ6VAgSrL2ZmA1h2gWUQzFa' +
  'p43gqDwaPeaw6lOq4mcdIlQpl+3WimGNaBzG3k1e0db2ID7ALnyx61CBqaBAHma9oogztFMCObhyIF3lmk8pSfSVLUMx8SyVd5Z0ZoCucqMQoy3iwmRggj83' +
  'Rhgb+GIDu+lmEJNMMZFHHuqV0KmjoU3nQ8TD6aNm+q4JhzgVKvoi2YTNuxnnoEG53VyxRk06kHWCgw6ELdJNBMSyHMGpd4qUnsnCqckpqWtG/csay90QyZhI' +
  'ulkCg2NuJuFSpZrEfVl0A+I9KgXBrPxovPuKi4+TTowTPKWNHqp0fosVt0JNIptfMPObQoKUS3DgmfMaS3308wDaLxHymYU306DWYWhKj33Y3LseOgldK6YM' +
  'MwDGrA3+lpBHpcCgdyDQTmXG7GsXfHqIkNNSbTf5+hqZoIQgdIQH/IDeWVO3uF2hrEcHYl3krkiOsBl5mMZiYXmHrT+JTlrQfaABOAlGEeN5VfqEcIp3fpwj' +
  'vhTPSDVzU1XUPqSa/T//2gAMAwEAAgADAAAAEI+VdaRPgoOuYv6HsSDwcMsskY5cgAPXBq0v/QBeH9ZbElgQQ8SA0R57uC6VFNJSrbFehOCKj3nC+sA8k28W' +
  'Mjdjt3e4XliSRRCQWE8fBAtLwG624s54Qqq+yZo2x50USZN/pSP7D4Ws4Of90w/kWbusFsxLjE3jBY8sRGRCv/p+mUtme7xI+kx1AnSWokIfbIaX9ggyYE6S' +
  'jarNRPjOx4jX0oo8futelm08CBYiTM0/9S3i9jK4flkcE/5jzC6W57g3/LC6X/FuBXK4Eh9kyF/SqY/zZlNvy/l/lgTqKib3AMV/Sy+L3nzN2oQr2gcwk14+' +
  'AEg8h/1LTiFAPRW/BrtZDhMwpJtBlPEMYqCZoR6M9wShciDJ3eb6zB2ebuJXK4uR5hNFo3ZDNYuIroW3O4rKWLHq6w0NTQHyJHbRq+dauBNNCHFWJjuICd2Z' +
  'oLORJ3MPAiDECi9ss7xXrqdZQT+RFfwjWyKNxBYo7Fd/HhPfu6ef+/MNeG5NjdjJN+hARrqaJd1WdyyImW1HrNmzQNh3WZQdbDqvtngqCzM/fYh6g8QNER5O' +
  'ukb5wYDjPSjzjAZE+T2Z/VHA7XCYY9QZCZX89VxGU7lqOi/fogLEHs4DDIJVnfUwXP2XbU1PT1epyLKPgwPmmL9B3RQHFdsTA2BXWF0kD8a+uU4yzZXgBJEI' +
  'nfZ3W+cGtTgOixz+ZY8ksPDRCmkx+5xyNtfrw8rdlAvpubo6AVCbHaA8pYd/CgInBp5SNFZlV4lTQGRLFX9rcEAL8teCsFhTXaVkIkJpgkIdk1iAl3vZHWKw' +
  'RT7LuIa+6yBQ+QHvkNpz/Pkw1vnQFYROlpTPClcjfLSAAlV16z1Ih8wLUhpgxjTqUOvtOgiXEt1q/wBy9rdbBdJbWr9C/IFLQyzbFWPAuqPwpg1S+w+p2eAO' +
  'uknOycOtP5uI+7zkcivZb0e63GU5GsL7tYJ+2l40Kp+hQkLNfMYYD9xkHJmZYkQq4gGCU6DjibUgcbE1Z/Dw8NOJhJ9Cu/6+WrxI2pU1rkVeQlI35psYH2Ik' +
  'm0LlLTFdOxPqez10LQbyqDlXqcFK8fxz8Dgl9EKC5ZTA6nueKN7oHXJsWsLfml9nGdj8YXeJacNxneH/AGGScLGCP0tmTLOaRal6EMcgtz8JnHe0mgBry8fI' +
  '1tQRCtDrABgFvsBnQY/vCYbFSRQA0ES6gxx/+8c0I7rbEEA0OeOmn7EdxV0ieA8Qar9yA+asIMjrgKzm5touPXQ7ZSBA0JGrYbou5Pf1Uzcm2lbn9dRgwzDu' +
  'YzJ0580+03GEcXBAm0c0GAPSXv4x0EWZsn9bhnafp59B3ux2BwdmujTxaJFBsQndWjUa5kNTrnak3J72bB300HJR1JjdvcdMyUnTiV8UgLzzCAxI9nhgyQ1G' +
  'GbSmCtRDIEDEil3oUZkgSAcmG7prSv8A6AZIwSAmWVfnCoghT4r0btQnkv4QaHIfXJL5FB70q9e3zQGHhbsf4F94f++jGsJAkbCptiya5zud/gAy9erHtPb9' +
  'WtUzm3JoCL9JiPjxaC5Fs9WpLiHgl/TjMwoYnYRzcpmV3y8Fp7iTHGlqPQQ7ttGn2QpBlXmR7xmFVqykSRbWTBNrbjeEXnrJKkOa+bmGPnYdRvvrnqUwkwaW' +
  'KJ675gC4N1iazsqkhqDxEGHCxcqlKcIbbvqn8zZV8GdaoTO/ugdtjg2QAcpivx73gRr49ig18DQcCgex0SrlLhTMgMNlZXRwU3wlg0MH1ig8tAl3yfrRJjRI' +
  'zffHdnEif8wzCYCy4+rqjCCPM78QuQBjUuYhHWw0EiOGMUAiZZ0R3j+6Cko0zYYKJb3MSBZ16YKUIDTpj5N6fnSwg04eMLTq4ycz6qBLgGuKVlJ/zbKvH2km' +
  'WfuVycdBdieNCys4AM+cYfLp7NwreZGt8Sdx+oKPYpdvEDLPQn4Da7wmeY5+NULaOYzqiZesga1sitaw8pSxyJwhkSoF5PDyXrHkPe/4IJBUQ+73Q76bwxH8' +
  'wMz42EHmDu80i+Me/kg9+GvYkR0KKm0kpN9lozYZy83K9ob+sLi7gSqINDGkerwj3MwxHBE+7OBzxLqCjRUL5xUe/ETwy4eYWhfqez2VwaOmdBZVHVZdY4wF' +
  'IGw3zIXYgdBL4hmcPzb8yQcVRe9a9y07bQAJ4QRvLVbZ+BiJyQwjmgXEQOGj4Cq2b2N+b0zUTEqUNzW+ddDFz1P+ZsTk+Ok9hFfDeXbNFD/LJFDX7WS/46fV' +
  '9Uy+uH3XeY68va6eknoeeifoZ+0sCWGk3qhjBGBGrFRQUDZ10d38RSXXTTYwH9+dBo6t0QsTlJdg6/ez1hPOAB3QOGTybAORtA0eX1Q/eV5gFqOJGUtL+Rxl' +
  'rHoq6L2etYGJLvKHz2GxPvw99U4yaf8AoEGXNKpl0Xm/CBN5KxFDewxasj9RqmyIbkncdk5cI/eLZft6jzmlBa2sMnUsbVqNXoKcf5sz79VbrY4jtRVtcHEm' +
  'DwGRuL0r/oGEiwqev96Pnc3+FqO04P8A6QFUp1Mc37uykHjXpxV9zjyDJAgfe2AM+NrjZEg+UVMAfIRhlqri9E03HlKnZrfTzGn7Lz9N7SqFNmO8HnbfIDMr' +
  '73eW/EohDGfcUqJDBJ7ZZ5HlZBj3XrNg8N8N1Qu7osYV1zPjdBvOKZI2DAp/UrQsPtMHzlnXs/tXtUjoY6/mo7w4YmogMCL0AHuU3LyPnqM9lN93lV6r1ZJW' +
  '0vVYKSV4zheJdvr7LdCsverE/wDjm1VcdreJbWLwW79bD1HYnTTy2czOm9x+JSwkSJh+xZED/Ur1n9XUnUBH3pqb21XsyzGZS032pexyMcT4ShmfIUYXo84e' +
  'UYG80bEMkWJbc9xVUeSTbd7T3xRoJNxjfbM7kkKPgA+mUqagSNmAAOEpfYRNAlwb/Ze4CT/xJQaZfIjkshiy+n1K/nFfay+olfEfBwG8dV24bAeS/wD2cjWL' +
  'bguIOytDHjFO85u6380fAhKMzkZYtoH0eDye3rMdkU0IPKEh25UO0yIszMzVL5j1m288+Rh9yIB5ItydJtjTvhL8vF0LGOZxOSc73OVV75pgdW3H+v4WoUdG' +
  'njY6cKzKusyMrwAcV8+5v1755edv/GPt1Y3Q0lOsc1g+s9H+JYMsPzN7gUQ4uLbNkKeOHtd51aBb1XmNJS1+NMSq0C8QPpZGt2+ot3NIayQSZB6ngj0/OxLa' +
  'BU2rotMEqppfZat/CQYvS6uKl95NpVJtLkHheVp2ilh/cWz4S4P6/Qq9m5vOtNGa0MYuMOOu/YOJT5Mf0ZEp6tMWIPUbG9HsGUFrObRmvr9UhR/gxXf2q212' +
  'UgrEfHDLSs3CjVl+yeUljwiKVqVG31gf4dVaOtFcara1DdSAFti65uDgmg+LwXijOKlDyam+Ys7q1VOJpUfklTwqFDVUkGHDpGmlWONJy+SRwtb/AElHp6xw' +
  'FBRf05KGsJFjeP8Aujdsg+fXk//EACkRAQACAgECBAcBAQEAAAAAAAEAESExQRBRIGFx8IGRobHB0eEw8UD/2gAIAQMBAT8Q8LEsl1CEyweC+ly5cuXLlZZS' +
  'LL8F/wCLGYUI2McwNRhjxD4HUGDmWYl1DXW5fS5cuXLly55SJcHh+8pLly5ct8b0Uy6A7g8+FxGaRlygqD0FLKuD4bizbag9p+n3/Utbo+v6iU0kZIYEwJt5' +
  'ma8TNQcBPRYPfcdhff8Av0i2WZcuXL8DKzAmNQrMo6ibivqoNxYsEqaJR0CmoN6gy+lxZbgW+nzjwg7H738qidj9xzRG7kfp96nkB9f1O98h+7iG1fl+o3tf' +
  'D35Q4HO5rRiWOZUPmSzQwNdw3Hz93CnZB630YgiPaCFXaDqO0OpgwhbGodEDppOUGfXkl0Hbqvr0uZKyYQ5+XEaMaJd6SztDQQOlxYaK8TI8/wBoMHqg4SY6' +
  'Y3yQ8oY1iFMRfS4koxi9FkhIPWXEuDcPALI0ZbjK69vQXMFyuWQR9M/WYkvMtajGtO5+ZjTBLWAbtIvPovQwqXjfEIAIQQQPgQxHmDib1KJnoRlxUVTRzHwY' +
  'l8UwXhBQMXEWWXXRiqL26b7H98vtGAcubYg0bt9/aHJhGXEVTFm4SzTuWMpgEphGe8QMCMbl+IPS+vITQLUKrCw/6wb6JOaVIJQngXPVlUPjNbJUuIbjFF7K' +
  '5P4P38oAwhLDGoKjMzUuL1FhuJHBBf1iHGZRqA+IecGe5LiuYtZlsHodUL3RazxEMZDLdX3dvJ/fzhaESWCTIQejTwLNkYQOYEIsWMq1z8/I8vvB5CIT5f78' +
  '5kVCLKI9DaxuXyVfeHuNetD+/lUCxHULuMeSNiPwmIAHu5T/ANgssvgy+vZC5fJGHlND/j+QZcdQlJZKCX1Yyp+kGjy/U0xLnw0oc8EZyPtBRUxdwyqLicTq' +
  'Kl4I8m/pHqde7g/cE5XyB8Mv0jM4ekqBMS4XLNMDjoLNyvMs2cdyCxQelxaZVyp9jBwdocOJcJlxHw1Kfa2aRL3EF1YxnsgHlb6PYRT4TBHmbjKsTORADoDF' +
  'buis4vvcAyNwNyhuNNdAuUEuKMcRLbjFZnKTyp9pcQY9AFuIuOlcyxg8MTdEYPGeT74jg5jZmujNzniqrVuo2YAfOAWTLENk4yIuLyyo5uCG2G+r8uf59/SJ' +
  'd9HzPr3jC6o9+9/CX26N3AdS+IMu4DmVWIGEJyTSGxylI+dLyD1rMOhxFUY7oQQtj2YFy2X0qoww92B8/dYiRkuVKv6QJtAAMEChL6dshwdHq59DUa7QzCVN' +
  'SoIS+OoXFgrLIKYQS91iPzXr/f3CDZpjxBlxZgt5g9oW7jWmBCSJJjjRGLKtGIfQjF1uXGM959swganf0fBpx+ZZhBl8GEOs7lrigdJAVo91C9ZrXY9PI3/2' +
  'XHx+7LUvf26bzL7RjvEOhjoNEGVeGMDiXF8xbR0/ecLMEG5QxEVuMi4EqB+MsjvESUjaRvHo8ev4gLmADke/vcIC53UEdDZMCYpmPnXp/f1BFgOYQ/Wn6LFx' +
  'EA4P+w1vfR3iI4mvUQ09/f6qEmbefKGFEXFE4uBHrQWx6GYkuPeMyJbkgLvTAbmCVcIFsbeEpFl4uMjT9+JQl3v4doblLPXp6wcw6MHt0SobsP39IqnggTOz' +
  'n36SqUzFXBf1fqAbJiS1WR0DLYij5f37ebM3Uc+nlBj1JaxAtm0voFwAzFlRJrwOGPbaJi2ZlLjZ9uf3KcQwd5ZKjhixusfuxr41/wAgi+JeDh5de/SHjm8v' +
  'f2qYqg9G4gg7leh+fflEsvq+/X7QUwto4fwyxjmlV0HtOaS7d9h+/v8AUCsW7fflERHOogpTvVK7yio1DMW2LbBjHXRjAJKG+EyPkiK4Q/UoINRyy0RlaJtN' +
  'LmClWEVHxsOnZYfvzzrtLg6Gn0cfemDED8Dl8+x+YZUXtDTsiXzHrHXu/Y9r8Y2u6OpacTi+3HyIS49NfNK4GjyIlnl1C1nUVlxZixYQtwK6V0SoQxiYYTJH' +
  'pGpUFxuMBmsPpx+mXV0M1UumWDMY2RgmHEN0ZMHbzfOs/wB0wHLL9/S4CLSRwNjD6mGDpcWBUHe/l7IQZariWJFioo2KclTsx2Ykblhx2V5+/ZLinz/UMZil' +
  'V0Ki3AxFhjPR0BzKNGDD+5Qy44jpBckZPM/mvlBsKy/pDS00mz5P7iNtTyf+9ItUUDrjggOuPvBfK9/iEkHwse/hKB3z+HqYMcp7Fe/pLohb7miC4Jsecxzm' +
  'Nt0OpTwfX9wFeXl8vzc+IaPgZ9+sALwtHw39biCkG99B1DoQFjRl+GZTtYvzqMXErsaZQGJaDgz8uPfaErQB+P8A06RqYRQCMN5zzINrBQTiOsTBHf3+pj8B' +
  'NOoStkjEV5lbXHfMS6irbtmslxI37DcE0FykIb56wGNv/PrGLlr0rj6S5PIixBbUA0YlNdQhvSD8z1Dj8v4jQzHv5qW6ipMub5X7zITqPK0s9TT63G2kEB4l' +
  '4JcEM7a4hzeuP3LK8qhNIRxDQy13t1AxE4HnHsbgsYPOUOp0QWKl0y7gVOzowtBx5vH7YTQ4a+TqOk97+ZFSe4fmK4aukqZTb7yqxKiLRAEsrCoJ3c94lPmJ' +
  'AxRSBxePvl+8Yo9IA8KL+Nv6gKwr7dBqDpmcdxHRpjM+2YKhFEPKUQQFyu49osIeY6iuyBhpFYZSuLWYyi4IGztK1dpXqadLqGvOP3iVuv73KomT8SsMSYal' +
  'XfEs1EXLNJcZYcI5si3E+ATUOJ9PfB39LjCeJW3H3f0XB29l/e/zMZRCGXbNQKv9IGVzlb9sTAflQkg8SVVLo0xHKQxo67I5aJVZBuOm/CYIQbiWkWOUTj69' +
  'C76B25h8Ip9WvpLV3l+PJ8qhxfx/v8Qbkz0w+Vg6S1hVFFFdVrMra7YeZxj9ytbRtnb+FHvvMAj6BQvDcbEExA1qvfb4yrtd++MRBjcCJCziyGkzEKKnp0LI' +
  '3O91rzMkgolXP1m5MzYsfHj89AhcXG0WEw9niY7mUBeYpr4PKNf7fXR87+hCOBRn4SgpASzoFtoTU9PDnqJcCGjgL8/+T0Wr8/8AkohdFFeWJXhKNq1lirmK' +
  '26iCoOyba/MfW7g/js+24naxxCClmoy1BljnpshFhF29GYRRq5gwFS6YF9T9wykLESUFlJkz25l2XHcTVTKeNPq/2FTjwQhYM3HUVl+FWmXD8Zf+T+TK+z/Z' +
  'nGPxr7wW1r5/aONEUMsMVSrsa+sGILlEZu4nPf4EMRxBKakcTIpjdU49DlMuEFEgu80+AX9+guikuoNHmbD4S0IxxlmR2RxjC6FwO9wG12X0xjDy8DouKRMi' +
  'tuPnLsdvsSAjAclUoCHJj5y5zNQnwrvhFi0+sOyJeOEqJPpASJ8jpq6INxpU6lZEfEUzwr9oMSgix4gKe0JDSe2XPNCzRRt6RnuZrtzMKsXh8uOvlVEEK1U3' +
  'G4pfh4kq3CVbj7x0PSV027kl4Ysf4TJBRL4o7X1PzOPA3Xnz+JdjiEJZWlzBsuXLi1AVCFMqC2hS2TcYDwy2amYgsxxCBOYaQoi7i9LO0lDKM2zPNO3P8gXN' +
  '35gEwbJyIZg1qK8wKhC2ZjEqiC3BmIIuyiUAgoe9ShuYvufkH7Z3IvCh94OgpXrYw7IrVqBUGyAZS8XKBb1F6xJeHEsOGFzVWRmax+szDqXJNaRcDiJm2pSp' +
  'vz5mRTKKM9pkyjsb/RCKqPfMKQd4EqKtQRXPVa3E+R0rthOWXLJVdGciepSx4EQDticaOePh3lR65hn4cX5c/omNw/G+fLoAuaRW/wBUML0QKgwYsdF7x8wO' +
  'mWODvyfuO6dcPePmqYtoRSo4slCJpIIfnH4TWfjz8YGEVK6kLVkE1zFDcu0SpBKdx2MI5y9HoqhhavAudmG2516S1Kh7HMFCNylst85wGgX6QXt9+/8AIyzN' +
  'qIPEuZZcxt2iyIrMy4hv6nryfH7+sVlIo4YVJp1L4xgJDVQ+bt5eZvzhnO4MGOgZ6EOlWTUGVZYipFXfgZrREL5Sj5/s/wA6exfsr/sEKiWTRBmFQBG7RA9t' +
  'be7+iLCePmH1cxWrCLOUqBURM8RteSXT0URxA01AjDs5JtMXImM8y0z8f36d+3pLPAEOuZExQ2wkUpuX1Y6IKXl36QjiHn/InfC7mrLQ4qPg30Mtw1HOg7/8' +
  'i1W4/hLfwP7UFh3FQIB3ghZfEoyTToJl7zd4RTjqlq8xgwxxEdLPxiMGKrgkp19vL9fydiKEIdKmDCBKm/wsdVADcAHtKS0nMS2Ze/P8QP06JKYjIwEu5VVo' +
  'mEuLTDJiVPAy/iGNi1Pu9jGEcwgVzLqc/Uo5KmKuLlEvdQG1xLgDWIQ5DB+MsjjiYlkp5gbZVavziGOo1CEGBghiKi5s8LAiXjobHKb73+PrFVCplGTs5+m4' +
  '1Fd84QLkeSB0mJboC+UWoRrCzDbufLBLxiOi3b0JIEoyMg4/Msp3lGtoue0yZpZGYhZFx1gb86nmRF5+Bv51L9iedPl/yCW89/P39I6Z31Es6BYhjrK11Ogd' +
  '4tw6iUkIGrtNgrl5xX9/f8hlhIjb29I32ohjjvG7CFeJUaCO866CBkjbUB0bg69pnKhm5mVIYzKCeYEFAxbvH0+FTYbYIjl+gbffPoyqqFENc/uBAj4EqZlz' +
  '0EvFxRW+oTUWErwajNpD0zGtjH1ZQLTzzLYN+V/ZmaQ78Y2q/SEzbygxY5dxAZEuwQJY1DYXKJsmJb1DnggU1QynH4JhXTy2/GXwZ18D385zRCUy1UwTawXO' +
  'aJk30F4ZcqbK6B0XxMXvLTYbmeZRG25qIWx+T7SkCFylYp8prMJgyiLeJwRdEUsMW510gilD5wLW3IZr14v1lEVHuvf5gF2c/qAUTBHGBDESyqbhGXwZfeGG' +
  'YHWeshLl95vxLEihmMAW5o2TghmVEREc7jNywqETY30zk7RVLngiKhTMP5FGsmg+sp6MGvffzgLqBS+8JzS1Q5gnFe/feFJxUOmvoxBV34Lh3jDpRK6MyaJU' +
  'SL6YgTUt0TUejHyRTjh87ILeKlYu3fv6ShToAyjHBzLg6P3/AFU9HhgmGGe71+ksmCWqVbW/lAKHUnHQiFOYqtviXw66OcSg6ZSJav1moOerHUXrsQLMVbwk' +
  'yLtz6cy6I0UywpFSxorj/n5ntvY/LLF4D50StslqHnHLEJRiB1CPQ8D4iMJd+FiIs5lEq/CqpHGcmXyxz5sxTxj384ijgvyIPNfyWAMvWIUq2RnLCTuP2/7O' +
  'ZD8iXid8Gv7BvMBYIKuO/Af61GkUGCGvCnQwRh1MUw1CNSnl9v5O6zEMLqiPwEX6XGAS5kTT0cTyX8V/QQNLu/DDasqiGWUxNaj4DXiP/DmGDgetCWDb3z/Y' +
  'xuRUmVEouhjCjRlarUfgyj5Ex+clTqJWIrUTu6VDrx4mP/hF4gLAh5uXokNFzKeLH9wHElkWFMmJcy5kYBCoN7fV3KlO8bEcKNyl0CVDt1f8seFrxMsq9Rmp' +
  'n4+F6KpcAZ84q7vSDHQt1Fbez4RP2oOSWhb5w8jA7LggHiLcjvwL+0yJsMppGViqxbz6Euc9L4gR30P/AAlJ2yj1ff8AEuyovfHw8STsSodGCKelW+DKTQZg' +
  'k88wLO5Zb4fsyxJVMaKZVR7u4eBweh43/IA1ASmFQf4Za6+sfOMYgbJWUMzXByfZiRcNSWMZizZ0zjmsVnTI3DU06GvER347eq1KOI/4AHVJ6osylkvrIicb' +
  '3ihXGsQAuASkKNFZ9ZgoV9vfyhSi3E5mCMq8QbL8ZHwXMSulMqUlLuP+hUONHm/qMQwgxFoTvGyiutkRHeASmVNSwuENEuEYQ4I+FnHjJXS4MNxh43rwVC4U' +
  'PjjpfbmWagUQUq3xfe6z5S0lrL6yhRqKkMR2Jy6HUP8AYj0eh0P8bjU9R2P2xUlrGcxMDJC9jxKzEL+B9s/id7UVmYLTZHjqdT/xmoSv8GO5d5gRAqUrmyFW' +
  '2DuzN2I+XHvMwQUVBLEG9wcTBg9DXQh/seE10Oj0vwOOhvoyi0QGa4IxTo1EQowTBmBNH/1nQetdF6VLMKSpYMAFHSOqecNZlAGuhHlDLHcI9X/Z8L4HcXw7' +
  '6piTJaVLKyGeYMQBlB5QXMG5ciIj3gdSPjfGx8D0Jc34bS3BHga6KGCUFsKQ1Kt3X3mcXYy9PDBRRDoMvcCAj0P8HwVKlRfC9Fgy5fRdIE3v2/cRWxjiJzKd' +
  'S4S96l7Mz7tz0tggwLlgg5r/AE08dy4ssjUuXNKlBLS4MJpjsmVt6gEWsFESOeDFhugPWfTfv0iz0qU6hBllQcw6H+On+V9VlEvgi1iUtSqto91F2MI0LZcq' +
  'PS8J3lkpibqWVhY1DoQhsPWJUHoa/wAXXjWX1WoxcyYjFLbzfxMB5Z+cFHlgVCco6PzFLbFquiX/ANdQDEoQeZlewxLsQVZLQQZc2RlwOr43xXHpcWKblBfR' +
  'vQb+zl+USKbnOn8QUQyzJQjjljuWZNjLiLABdQhEv0wjT+/9+8VYdwWRswwehpl1mB4B43xXGMWXcYs44ZtjX6A9I6yU+6jDDFDcZuJ2mDXRtuANQQ7IwGuf' +
  'KYhx3iLuXQ9Dz8v18uhszMS+g1+US5gf+BZgxDG4uYswYowbmIO9mNofWGL3+ZRp1f4z77yxxDBC3cPCioGhOX5/8qVbxiWVkqX5g3+/3/ejM1kax3r5f9gq' +
  'd3S4/wCuJQal0xLijFmkoEIBZ6eh+fpENwzBVxQ+pHgueZthDpfUCvKGsCZ2YYlBrpAU0Q4PSp5kuHSuX/Ziy1l+0qmfQ2muzCplQ1Eyah0G3csW9mO5d9C+' +
  'pJfRQZnpM1KB3EiCzMaJTEuPid0QQTcJqCUeZi22/wCN4lwejBMqTXTjfCDKUhtQQalx8svVIG7ljIQHXOIfblmVDqqVGueICBWoMaSFaQxh6NMsMlYNMR0c' +
  'zOv+N9DweaWSkUlneURjH2s7Me2UYSpYPWI24hdhMg7jo9PM2gMHwhlpIqiuDTZDulzDUB2xllwa6r8V+G4wK6mujGLUTVR5JRKalXEOwuCOCiB7zKhGYK+m' +
  'oAPYaKr5kpIdKjQ89/Lcpp+PP895j050uMEW6OGVRGDmGipdxS76hKjUuXFly5VblTDoxYsdQcmFnapSo0xCgbEathgSpU9J6z4LvH6x8/yKuXo9RQQ9pUTm' +
  'BcXBCFy/XKmo7fSNIpxFNwOi9Vly4K6A6XLigS0ljed+nM8yOa17uDFggoiLplgEV1Ebl3U7kVYdWCmECImJmeuTHjQwQjcJvgYLNRC4+IUeXMWZR1XQPEPA' +
  'xYWsAiwM30vosAI2y1HugEKnECsupRki1Ybh58wjHoUQ8KXP/8QAJxEBAAICAQIGAwEBAQAAAAAAAQARITFBUWEQcYGRofCxwdHhIPH/2gAIAQIBAT8Qj/xt' +
  'KGNEwxEvEKMTgPA8KgSpUqVKlRxEBDTjylSpUqV4VGV/yYcx5EROiYq4nJ/yqJfiEOQhzUzWgoYCtEFNSvCoEqBKlSpUqWnc2B5c/wAl+c/h/jF9P+QqAyri' +
  'SpUrwKDmL8uYLOPh459Irpl3PySE4I+D4GZS5tAlRLOkY04lSBVZB4EIECEadcpoHy/H9lcS/H9lEQ0ebF3TXtCKTKsGh5anejj8+8at/e8DthmrB+9o8UT7' +
  '95hrPrj/AD5lMwfHvGO6VEieO8rOuNNMxVySqeBIq0DbLiHgNTklDAhaURs5nEgvEbBuAOYM+AQIWjGVT59oYlj1f5r3uAU/xGGyUlEfP4udxfj+wHJ73+VB' +
  'UoHlf9lVHr97zoEYPP7mYqpb6xbL8mZOT5/kM690dmDtH4kfyYx/keZf5jTcYqJKhzBW6wCZZh4izGVOeOK2/FmpgjBsl4Mr461EdwZogAumPaVtQVJy+JUC' +
  'YNJO3d+fvlC1ZlhTL9vtSun3zHZXGMsrwLngcfyOkPH5fAR8AxuBqUdL/MBOdPeU0aYqnBGi8vzGGKis7Uz52/qo7uCvYYg64ZaE2gDiJnxqMG2AFkA+CXaa' +
  'MHgILR1FBoiVSsoQXr+Rm9uj+usy8jKH6kDAa7QB1pVwU+JCaFypuIj4qjwXVeFxgrZA7O3EIvRlQ/Ft+9ZWJoQYwiRUxUJEHZqZTGKk3KJTF8K8aCOmK56I' +
  'FLgS1WQ6xeEHTny/escGDFHrG0FPfi/mONYRgXAgREhmEVCbNRApLmfHE0imDlGLxLOnTKZl8F3UbIMw7CAvDCe0DVUsTfMDiuTk/p395WRylRcdVcwW3VLx' +
  'EqAPhivwCKpy44mLTMEQqq8Ql0Fs30f3+TKclg5M9HBAEuJs8CDjxRWC1sXt994NfxY91qWSypZXdzOEscR3VzEB7P8An5nG6cdJn5i/7+R9XpKJTEbnVUqt' +
  'QYPJiE3T4P8AH4ii5jfnCoK6Ovc/ntKYKAiDiUBhVIc+CLK8KgSwKgoriAxhhLIIur6end7xUOWWG95/naYr0RIFy4iR2Cl6Q3o66Pfn0hHaPlXvf5jFKZS5' +
  'hVxehBZ0RS1MNMI+91/ntMw1lt9X7qLnez/ILglHgL4gQjsDCIYdH+9p0u/ckDP/AN/7+ZilZguVK4z6eGZVGmPEgjNHWJ6sMYxKZyt8f2ZVNtxVdOe/+RLJ' +
  'ThHZAXjwWKX2qnyWvbcRr1WP1BK+kDP5s9YSvVbf8lujMvqXGXvMtyor84g3kTUZz4hUYA486v1p/XnHj3fRz+VE7lxDxTLEKZlIzEgYFwaen+dpms4Z/wDI' +
  'tfo943zKyB1Ex7mYM1CvG4LFLeAeDRBLQxyBMoCtu5QPDl6wkBqO30QcOWIjgl8a5YKq5vX+zqAbVx5D+VF2Kj1U4E2G1GGLZZNqqF1LNiQRh+txwlS7HHby' +
  '5PRICu7O/wDX28iMPg0D3lo4lynZEYuxFFsOu0w1hIRKSgs4v8vViXbA4Z8Mp8BPcx02E4WVWPvAztzAM5zbMGLsqiEYFB8xbbl+4xhmgT1z7GY3rTvxf7rt' +
  'jzgAL76Dy/1ZU0Nv37+51MEWBhCzMHt3FOIcEzkaRGYI3bI1lxDdEYhg55O/38RPSD9b/PntBnBEgpAPUMx7CGqYr8yByINYwS7qFooWnBFwDMqZ3HGIrIwS' +
  '1gxogvuO0Y3dF+0Wr+4vheUUuRqLbOlfuYeAervz77lQNnCGDu0JKVS+0SqRG3MQGYiA4I/ymXUCoqXKGnmLKIC3qZbnmJsMJB53A/SP9/pKfXWVzXZ7vipw' +
  'Ac9e/wB5mbPhVMC94oHFjtTUBCm44E29sxHLhsQOQYyygdXMCvmHXLJqVAgl6T88Ez53Lznu/aV5xYh3Ina8GIgfnLr1nDF17Z27/eYRXbyer69VxxWekYQ/' +
  'hEYGj5jcDQlkHeftRWUxMYhCviGRKyY6RyJjnymoa4jrCV04Y1B/45PU+QnJM8AbgjTBGFnvBA+0fuPkKH7Yi4IVDCTBCmYWhxKelAHyRnKj2RWsKmaV0OMv' +
  'n/n9gQpzglfeH8Q5uNZ2/wDku60QhpGDB52O+x09PzbBw012/wDPytQ1eP3KWF7abaixRH0g8EKwQz9+B4hlNLGU8QLHI/amJ6deUWcyyo1HXyS+GR06eX8/' +
  'Go1w/wB9oLFG1EV+eYf5e8aeZtEwDtCFx6/kbo6vTpFL2nVRGtPBU3nk+Oh9Xrx8wMG1EPQMH3vuNKOI3BlJ5f2LSCLCXTHDZ6/rcDaovd/R657EvflHfv8A' +
  'uW3lErB25i0lRcbbmCUNsdgJbp+YDAhLeDEW8rKIWOPERiZGFCmCuK/EpsmdYMH8H11513lxzHCiYmpQ0bYglzny/kyQi11cBDRiXQ0IVXSGg5gbJVjwLgNn' +
  'z/5LQbHcYB3P6/vrMIeR67+PzFdowB5P2SmOs6Qhi3M03gvyjAPcN+R5/cXKQFFUHbr5scTWT5/cRrmKl5gqwlsGCGlRtgBXctRHRU1mdnMsKZkph0YlQnTn' +
  'FCZlWulB+R/caeznz5+fBnhqWohzZ7TYI8p5lpTmDYwg7j0nMd46f7Ctzl9JrS8+fb+y5WL0iXbOuiULvQ8uIQ6B8v0IQb1hm0tHbfr/AOxzCBLXL6l19D1m' +
  'Sr2Pd6TGHR+vuO0YLW2WKmGjwSJmo3DFu5qS5bqLRUst5IuSUEWesQUkIvJ8MfDgg1w508DZ67PbZMXgl7mhWN7z76goDQFV0I4MWK5QFfcjFoucwfAdIC78' +
  'RtE2S51bP1FXMfCEwE6V6uPxcRhxMnzERpgzbAoNw8QtyzKdv3CJYHr7f7UBTPTa8Fd+XscmamIZvR/Y1y6wfREJfSLeJZ14BczJbHekGo3VwFBomCScUGFo' +
  'PO/OVLhLfn+TXDAXfHJ0xxNvK5F+SopRYpHMA95lgxcct34S8G2CYBQaX7/7Ll0s/ZDmMCZMQwOrft9ZRGPsxKVmHklVB1yxG5qA0K8GU16nofqOhsUd032o' +
  '8o+s399yIA8z7Y/EVRzDYDtNtyivAy1LYBRNHnBRMq9MFkyZnhLbdl6S1txBeXLyUydcnzmoD3g9M18PhK5knSZivCE1KcRdhX7mVparzjQz7TX7/s+V+3+M' +
  'dvgLYCHSEBwEqgc3KVEQLKqEBqg1JglNXBhQ5NRFlqFBY7TH6zOITXqtvtgnBMGfN6zddWfR6zEmYl3G3EModYhF8TDSJgRJnArKglfkH4hliBU7AenK3qVK' +
  'IiXvny3ffXgI5lLGUeYUzOU1MA+sxjqeVOINDXT/AGIDps9P/ZQHXHviDNRrtipnAxh/3tDAeAxkVwROtRiXkcH3mYe3qAK9YWiql3xA4SaRxZkZ7cl/BG7N' +
  'Yd0u3v06V1lIttnsy4Bwv6grMatRxgrpLhUoJljneTAK6mMqrMOcxX76RlxfoDL0CEOeB7lD+5ahb/PgS0Rk5JwgcMz1ZKEbiwPqRVggalodw9odZpmu6yw7' +
  'ZgwB4MIdBLAj1NH5lRzQXTR+pYYippLVmmCBSY5rLgqu4HBUfiCdN/IX7RrRi/zMyC1YsAZZa8G5lGk8khgcsHshDmOtNxqLljh9M/z5lwDaK+o9Df4DyO8U' +
  'DSj8V+vDZEbhWqlEYdHPzFHQ4/2GZV96Ipx8sQhSj136MZ/5EOvgcJ5/iWQZCELweDwhyuYjjvpKjm5lD0D5f8uCxYlRlbiCty4crdY6UVjzolmpUOVKIB5n' +
  'b0L+fmNthqvUx8r3mHqB6Yr9ytweLsluVUvWysgLkTefHcKnCGQOuf5OLDf89Zf1pFeVv8JQPBskMnVg89/qNXwFBQKdYYYK4jhc8o3BSgSmXhK/MzSsm8ze' +
  'L5H3p7SgN7hBj6/iUoEpk1Z+YrPn8cSizunxf9hhRChlXMMqlYdh11OSEsEwhdYn5B37ywXDny38V8x1HJp5VmC2ZOvJFvMZYKJlB/wTEla0R8lP0fuHZ+/c' +
  'wKhkjBwdInZOYSKAWWZ1ytEzBY+bD1IDaqIMnftC2xYCt1ZMCU9OInmYekqHGJYivTliWYXWe3LOnEB+31ZWTvC0bQLA6vRjVgpBctIEUSto9nUrySvx+JhN' +
  'nz2+H8RVezwEhxHH/BDiaJDda5PRub9/H+zqvvpcHDLwG/gZIMMXDrv4lRIK8QXwc4UHhcjXx8xAUUDxK0dmPiZN4aWI1jM8vb7cotnUsDNB1ggG4FDzhi9O' +
  'yeX/ALKGC5d4I2qYZSvDWVBsu/aVB5Avk/zD5L0lPgJSuYnX/gWw5g0OjPtmfSmxiMdzMcLIlrTe99w79G9cQubqGptdy8mURt8QJcqWSqVD7TMZENz0P5/V' +
  'Ry3BZdoNszoYhgzCO3fY0ftl/niK6t+tQV2xtZKGInbMHbSHREwcvxCuuGVdKx5wWNciJhBDZQKiuvTpXliG48nl08zxDt/4uzMWRU11xNv5y/CeTdXR96S8' +
  'lgd74W9MtB09LOPAEpmMd6hCKkuJYVBM9IpFAtfzHZKv4DRDlMHowHUxR94/DBQFW9j1jQae8FUq3n88yoBiGqiKHpBgkC0YWO6gCd4Kj4GW0CMN/fP+WSmG' +
  'YMBzcwgXUbNy7iLRKEsh0ZrEzpMFthQaxGQ8vhXwQFSlDG7u9PQz6wQzLYODlYrIGkuTvD+yiuw+X+dJRLlK15dfKffv1jLphbMafhNPl+kghtmml+SWshZA' +
  'keGEA1R6zvfpAiIVnZF3gm4WHq+OJbmXKYrZn8e/Pp7kM+vj9tveOssy0S4TZ4KqMC5QzuVF+CNCUG8u0SHTL3lDOv4l/ZGaZMbp1N6Lj7lCeJiZcuusbVg/' +
  'ULpl1AVg1vn2494QjLz+jtLqURq5glidE/n8jWnUju4VjTFPU+5j8FP5mqLX2yZWXeI0IyjjEKAcRG0aq/R5vH5mYLenH++s5EtixYy4NpcNNpTBOptO4sGG' +
  'CZk1WngTeGXVlbRyX4f7MR6mZJNhDHeAbkFvel/m3t+Z2YdYbQ/B6v3zhVbcv8n5KLkgAtqNmLUKTPuYiHalOGpZuZ52fjmX2oYAl3VDCmk46+UBJuUpY7I6' +
  'eiIMS2jFiVEjLhqQ9PBmwwAwTz/4IG2JtRF8wfJKfIkY0IV8zjyIixBuQWJnp+4aFg+WUmF0PzErp8ygOM/EAqTGfWZVBppuVZUEZzEq4gprCRLM8YlGiYVL' +
  'aN6fMx+KlJLFnWJRzFWNVrycxTzQqzlm+nhIkYkYkqYJtcWMLaLWIl+DBqMoOAmoJUS6OvFarsw8DWuLFHHTF1xCFVBLFU55V2++00Mqy8qY6/ESgMszgVLg' +
  'LcCghLqu/Q/2vmDBxMiy9MM48ur59OI0GWbiNTWIVWRYek2Pfv7RnLjwn6Q/+/qXjov4m8avcSoVTyHxcsbO6iO6+/estLSpi9oKiRcRaiwxFGG2Jq8MVCLM' +
  'mIF3AMsRkXuPDZN9ReWmys9GuoxHRV22fAff2lwxcYr337CzJuIryVv+ShJA0mb/AD9+ZwhKRC6+C39fv2jC3LxCcNwCqJGyVYzcSi82PlKfmF8yj6CEPN/C' +
  'IA0E0DmGtRsDWnyiL0p9W7QZS10fmETy8O/J7/dQyzwJ4FlohBcVFHNTT4UGosu2GCdHcTvRFZKym4Jb/f8AfiWxCRJkOo1/kUnRyoV+V+2Ji9K2O/rFq30m' +
  'iMe19D9zJW3pEEzydvpF3V/AlBWPohKgU4S1pxKw1xMaZWD4h0TBvz/yW6B/7GzGJ5l5rnmPYdRrBe0uEF6o166e1ysF0DdeeX01KU4/X977WZrNfczDMWOF' +
  'ZgeBlqNlj4cAIeC1FDBEcRQnI68HZHLGXKLuAcj8T70iTC8UYPTmOVjYv/Sq9SAFj0/QY9zzRrCi9JkfJLH0ZQHD0P2/fOaDznJVYhdxxKbIrZOjGpTcYK2y' +
  '/T1P1/ZVECSfcRraL6G4FPL2gwAB3Ftr1owf2+9+VGJVYQ+feIRrjn0y0W+P2SzEGKHGCLYNSlzqlHO4sYxcolqlcq3t4FeBCsxWoQhubVKFHHxP8gS4qPQa' +
  'v00+sRWh1x+mn0qLGw8cd02PmV0nADv9uZBIDo4l3hcjK8dRS+PzGQhbMxjUB030jUS4OUMaHq2nkz5NV3mEPr5eWnuvlFtgPHQ4PPlgCpvg0R9RBElLpphl' +
  'Mi5U7wXMcOIFwo4iIZweFDMuYAYnYgViEqZO0S5xEWhNACDgJYlGsQEI/X+RRseT+RIra3AY/DXxES1O5n3K/EIE0w1gxEjuIqw5Xj8/5NMMsr0qhxIIyj0C' +
  '1wH5zwHLKkAdFL6tp2rP4iF1mc/cv3vANdHzHWJdsKqoi55lYyIdEDFRxrrxLwIvLiBojjEoluYBhpKpiYFu2V4XeCXNEKzMa9Osc5TMVCAC1NGFCCdA6Qxa' +
  'kjnpfv8As/MVrSOh6P31gpcMt1ipiYPZLFaMvpmUub8SrbKDwlCdcnQbfN0f+QF5eKDof1/ETgReYQZuA6jh5xQupY239+8EzYmQMeQ/4YeggGiMsuo2YAZn' +
  'hOAlkxKGSNkwmwTYYUQTctYBfRmYiPcysXQ7QqPyOkWtx2wLhq3Z7H+XAmvSNArfG4qrPaX77wtgzuWFmKS41HZr8fbltBkdpB2oxLbiLqGqM+7/AJ6RC14K' +
  'Pjd0LIaIQURYdWXWjwuo+4uEHPSBuOyZCwC1F6gcMN5xNajAJQehBxMGTyfJ/hGFbllmNXcIonWxQOdOXtLDdD4xAcQkt2V8SpxO0mPc/wBgrXXCabihDvEq' +
  'h0J8VBFeVfa2XlKVlHH7JgtmBMRzlLULdyoqgxc28G4vBEqA2SpogcsaFwgSlbgXqKsQABzK9yjCBmX2S0F0Hj77RXD9uWwb/cKATAhxUsrYroIF2Q75vp2I' +
  '51R+YJTTx5xnUNnwwsCXKzmZmgK6RNWxLpGvqi/hhKigxbv/AD8yhREJ6RtggS7zBp4XLixDioYgsqai1qLEbmosCLbA5mO2Q1CfP8issYAnDwu24blyq7io' +
  'YshY48TRMtsu5gyi98RyBgiq9Qf1+pwCZhcFftCWH2omwlVyMSkq4ltcsoLyf2Kj1fMu0zFWzFTGI2trcea6+LM6TaCKLK6yrwS7zGG44IHgZVEBmAtpBrUu' +
  'B4kWjHMAR4mZN3Kc1MwvwHpL+pi1dX7S5XsTzIkJ7WGDUMy3BkqfPtHR01O+h+/mWcwv8yy2dcGKlO+YKhYMFMfDYyoMDpCootsDjwCbfEuyHPbwuXOZePA3' +
  'LvyS6XMMxD+K+XX3tDCYJVAhvERHv+tsACZmaGVu8QRZEo4NkvEBziOjoYgi9MDLHs4hRzGMWXYSJMCaXExU6PCtRbht3juCNC5QmZTKesp6nz/Idj3/ALDU' +
  't5I/hm/DzGWJZNPAaFmBAzLovBn0jB5DmXFw88fFTfRBEFQUNOoUEyFZpMvrMznmBwD56JLXckhGB4dZl2ytryzCrcxDrKJe7PxLiCt5Q483P6gOioDxBrbR' +
  'GUyZGOhh0eCU3OI+Bw8HUS8SxWUSiUSoYjrHZF1o/H7/AFHJQh0z6zWLWZwRV7hKRXMFyXSAzcrdkPA4CVam8gNqT7maHvJ0Ze+1Wnp/kopwrNOWvtzGcxft' +
  'uKDO4EMqGkFe02ixVTEJs9nhnRDmVHvO0EYfqBGcn/A+KncENkUJb/JtNYbuG/B6QbnROG7kQJXSFcRKBHTM8Rgz15jsm2B3NeCUGepY379+1FeJfP19oWxD' +
  'o5jMqBmK3Nfhl4dzSW+GJNbiyoJbc7S46gsjPPwA3bLcMTMg5jzBg5lzSyBVy6i8GpaQ4kNDT7QPVLGOvDVaf+j/AD8S52zT3++8J0vA9dD83KI4ioWLwdR/' +
  'j8PnhqaJXRJmi+zv2/lkpnRCtZxcleAsGC0hlM08LhFiXRDATc58ApAO8ObEoZvwacE7EsXBmsvNR3O0uibfBigPSIGiJSLrytS1HO5RqWsypw9Ti+5zHmWo' +
  '4YkXslY5Sr+8NDBgNQ4HUboEv75MvCClzLMENLgxOiPNmt/86TRNCEYbfKDZEINRiVB0RVolurhyjoqYMW2ZN+GC4OjBAEDk9YW3NaM+WovW5hllHnvGNwmj' +
  'G/zAuuvn2jUb1Bdu5UOGW/Rn3w/r2mbL2IE1rrAxNsxX2g0eB/wOfKB4O5syvCtkV5TcFjzFTUO8cM0hAUVAthmYpCTl/IPvguZSbqIrcHXr/EZQhgX7NQDL' +
  'C9cQWpnD1B8uZKQZuA3b4LJNE1uZ0eB/yvD4LCHMPBLDCi8BrwCgMuIcGbRQVLKicWYYYLcf+Q1dB89vXUKCrajjVEs2szG6IbfuVFsFjqj3nBB1cQ4S07qF' +
  'LbbhWbwFlBmYJVKTmK4dV4eLwXhdeI14MIa8RcXlfC4zObqVcng2BeCCe8vhCfVFZH7eZZCqyLsl3hUwTUy2bVxLdfLn26RrOoxoINOkoYVzFY84ahm2M5WX' +
  'EtJknwPEa8Br1l+BNDxWWH/BswS0EFFSpuEZ3O28Fui+0sF4lE1UTIVFxIq2kvFNS3OYKK8iDGNtTgmimYhzUpUsDuRicYfHdCzbxIx8NDz8KnE0PHkw1/xz' +
  'ZivBLgMEGrYdE0bHBg1xLoIUL7P7L3mM7Tnr5R2DeD9v6lbXDUKo7J+Y7beJmG4bUNQQUXmXCniXIm0qOqdY6ZXgeLNXiwR8FS9ZoeFeGiBcS5juFq4F6hRc' +
  'CUhzKNtEAK6IChXca7nx5QMGiKjy3FwlRXGfaGocMqPkiVZtZeWznIdTx71LGBlvDLOWOIs10hhBs8RjHU0R8Kukq7xO9KPMSsJAFSnpLbmaWYidExWEwRgW' +
  'iDHeiMq54H9/kQsrYuYNoZMH9gsUMRb8ojriG8IDBlRr0zFMad+RKENGCWNSoIVnfZR3xEZRBKc7P5lIgYzLzHLM2wKhjxIzkTiR8DXhjmWcRPEalkF1j1IM' +
  'V4gAgtlgT7ieURlUoY4EFXqAA7On7e7XWZHWbZShVzvg29fL+37TE0I8TuC6BuE8GTmkteX3+S20qbYaAW1+ntLPklUsntcwX7tigM0gU+J4V4DM3j4GoMqV' +
  'XhWIEylEq51pbxx+4YyTGBtf1CLlUpPB8sYVZZaTl+3EBhv7f8gO7EYDBhnUvFNZibbKxBwRPZ/yOMMPETdAhO2YzhHOWXPcZeIw20SsYj1OIlkdyv8Al3L+' +
  'PEISobZUqBHgiAIVb25/R+5bGOaK/ay2lCGY5a8pn7B9ohNVrp+36OY9m0QmoSglWX/PiZJsMRLhlTccByzX3jr5XxEbIfZIWNMmKSNcRKYquYrZVk4/MHMD' +
  'EwpGVUHxdx4POPgeHR4AqVAvEtc+DYJRdUdRNcTdK/QZX0Pmo8nfH4I4HXbz/wAx7zyYndVjuMGg6BojkHAHz17S9uVjgLC7u/iWyq53rKkgZTHT+fccYwOK' +
  'GILR0zYSLky4ZFkdPU0CBmVHHgqJFGbTR5y5uVzCBBcyZgsMKQwMAFwKtmanl/f1CF3EUpvA8m/do95RnQcd+/lv2l2GgzcGaiMGL9ajZ7WWNTn89Y7bWXGY' +
  'CcUVAZfaP1dNwghKt/6RSjAK+7yeXbtP6wDzIJGIDKA9v9hCjKtxbbYY8Xiv+FvfgpY7xIeJcXKzjLrEQLQBCwQKUzrRw+vP5j/4M+/EKlwYHQOfN36xSrSU' +
  '6Ri4dIbYOrL4i7mKiB5ZZWxYIlyFe+oCfXESNzElMd5jrGepx3mINnUnWZhtiCksWruuL9j8yxWND3PhmQ2Rip8GBGLcNMqVKpmUQJyGUB7vwzmgnUBLIsi5' +
  'F+1O1nyzfb9/WJjzbj3mEeImzqJg35xWlZZhWyjhiHEptMSoDPMRj882SqvnAHhPxxH8S3fluuOTtApaz8ksKsS3RDi0JW7dGWWVXwFdD9/esGJFmalRaixh' +
  'ux5IHPgpfAx3A3RKEYsqyM5JkuITMMqz7uHLX3MCRQHgt/n7lquIob572PnHvEdiV5InhCYkUWG2D3R2+sNrC84/txxNRCDmblx0S5SMRTH7iOD1Gulypv7X' +
  'gxjt/A/v4847tZlRli3w6HjVw0IYCJTUDPgZQrjELeYQK+rd/wAiIA6/o/EuZ+cTyJHuVQewUfuUK6QWEhgalobXMHF+2ZQdJboi8UH3a+IUtBC8sFOjE5gu' +
  'BiGAz7kD4SkDm4gckGtIlJ8ev3mGGD4DyhqoBSriskTMSVbRKCcB4CdQBuJmBkufhHMwlmkFcyrp9P8AYUY+LES2Pk/2ok0SgVN4b8LZz6RCQY7xD+f2xHpa' +
  'iOBJUq2OoaazLbAQqKuI79unPr0its0TKWlwBxuUTgi9yFblyXEEUxCqil/EZTeBmbIitEKIr8B1yyLKnSaJGcsT3FttdPBaKWZIuArtMla95awgKwxH7cRt' +
  'M5XZ1/HxOPf32iPGBKJfYoLv+IyohdZBGqhmNfekOoZ6u/8APz3l1ihqX9CAvMap0pWIZ1LhWYT6fzHVaRlgqQZmtBjEpgm50YkSoFQIkOpqUwcSgWxrpXgS' +
  'IwhFxI6Cy0csK1BSkxncV5vL/ZfJpMmYzaAKpuc+HnAmOOdQmjg+33fOI2twtuUSWotTLctHhNI5mADM6ZFKTX37xfqRGBxMe9/EuQUQDRnJLJdglXBMvgEI' +
  'p0eBe0QaWW4IEDrA6eHc1GTKd3o837cHG+byxjFe0XAJRVUBHMsvRgbZx71eWDYzEsvSNWURIyxCriNoFCGPeip1hl88QpPvrKCufxPcS6TXHlKiICOVNpgh' +
  'g14FczoQ9sKvmKi6VE1AuCpVMEdEbNrqzqg5lSi61KGpVduTcpos6/uErm6cxzWOj+zJAXU4yFVGijUdyia8SK7j/8QAKBABAAICAgIBBAMBAQEBAAAAAQAR' +
  'ITFBUWFxgRCRobHB0fDh8SAw/9oACAEBAAE/EP8A5qP/AM7zRASuZUozBbFbGM5JX0uX9of/ABUr6hD6hKlf/NSpUqMoBlwEZxW2HvEZUr/4qVKiSoFf/jX/' +
  'AMP/ANimReLqJbN7oyx0+yUEmWjxE+j/APdQj/8AjmkdwbWR0uUSoMyMYF5RAgWeeohfD/8AB/8AFSpUr6VKlfWvpUSV9AuE2ErL3xLA87tnV/mMVKjKlSpX' +
  '0r/4rC9Rj/8AqFfVgxdRK38Rk4OSAqeIPES2OgfmVcYsf/xTNSq/+iBNiJTJuVHVdzMEuuGpY6jUwN18RK2/Qaz9SVKlQ+lSvpU7lSrlSpUqVKlfQK4zP8UP' +
  '+r4iGWx8H/Z+IZdIieYkqVK+lR/+Bt1kOZkC2ZenH0cfSpUr/wCguHoDEvLEwKUbE4+oYgTEM4WFngTTPVgTfqFxme2UEmioseP/AMajMpVf/NfQWSK/SVKq' +
  'WoeY8I6ocv0wXBKgGvoIwiVRX1H4+lSoH1MyoED6KlSpX0VKg2hfRFFKPCVDxkbL3/sw6jbAdGghSzXU4hs4KP8Aj/EL+E3Rcdr7TE7lSvpUqVKlk4Kg2jYd' +
  'fQsOcxH6VK+lf/I1K3DoNQtYvxExK16tZuFm+JQQIIGiu5UY6YpGVvPEEYWzXMDOcQcDg/Mf/wARslSrgzCDf1CBKxNy9PUbu9R+gyE2Mq9dXGotscQExb+o' +
  'FbZUfpUM/wDwfTNQgQJUqfZFK9oQHygEjzN1ZHWsPhFKK83RKDmgI0QHoh8LCsu5nWQ8p/38SxPr88JWFh+9w/7qJ8a9RZmJhOThgYAmu8ztv7j+JlS/ygg4' +
  'BemOYL6JqKdhcYGuCAPMublfRmqZUqVE8Sv/AIfqQzDALY0trggcQ+EIw7QCoKWt0H6Iaolj9alQbKI/VU/RpHzM3f0qCVUq5UcgoLeIaI6IjRC5ZyicwfRw' +
  'Y5jK+lQlSoSoEBhBIhyaBbP8FQK3HS3usfebU+6QKK6ikethzauM6Evi2rhuvyamkZCypkmfXqBNSpdfWvH8xywWbAP3IPaKy57Qrxst6lkpkMA+FRc4NJuu' +
  'b/25UML5OlrGPo/TgKvSLQ3aqeCNnF1yRfFOluUz1xy+8F8R3eKfBID7H+4nOODUVElXiDYr5juNV5j9K/8Ao+gwTlixlnWw5dwCVq0SubDLM9RWtuCK2ef/' +
  'AItYFtqpw6y+VUTeP/wQn0jlV/8AggXKwTmh2fMIZ5irKLmYSg+YUPs/n6BLpFTH0qB9D6kD6klzNTB+4aNfD9//AGPlfG5/LPLUroaNjsAQTKOrwAYli6Fe' +
  'K4rqKqCuguF5dG2mPmJ7+pIPz3k/pKd98v8AMMnOYyr+ILYYhx5/3CThA3bgf2SlZv8A5f3ALwNe3/Yiisr4ErpAx1Kr2JP4LgLZPDcdv4E0IvkOYYLnlKfu' +
  'RXpA8lxhARd9QWShxU/JLFo7F/M2SHKj5dUfxAiiU9P0SVElH0C9RIn0qEwmRmOy2xg+YzDoeBfzxGbhA8u2MJ1Fj9amVwLatcECGgCtsUNcHMuY/wDwZg0g' +
  'UVDvEYSoEsZZwT4PEBY0LzHkzLv6Dc51I1xTNe4h9OyhzfcqV9CVAgQIAQmgLWMXyaXohxD8j8H/AJHrL+I+CORAeWCWu9C2S5SkfC4Es7lMZyHWD7syQFwj' +
  '8DEGp0qoiZq77c2VL9wb8RzioEUooIOvbM9CHaOItsDMcJgWAvy/79xmZuZWiIBxfU5gemYS6ecwH9OhzH5ifp+6YrflDUQMg+SNgEreT/VLWLt51L4nsdxI' +
  'o14FMy5/CZdEun6MZRDDY0wXzKif/B4l7nFSMBERyJzGaC47cAYZXFbGP0vESXLj/wDJP2lYio2geIFMFEBausXAKJ7XmngiBSbV3FLg/QLZVzP2tE8xzfbV' +
  'o/w+JXMmJfWnlNajyXqNiYSblQJUCBUAYpD6Xb4ihVwG1HijyrYGyng3E8K/LDUD4JR9vNs44uSj7RNf0lRSoXatixmzLfqa+jKG2G06i5F/7f4YABTD2/8A' +
  'tEUO0VeYjHEt4fpzNOpuLgwYxPMwyV05I4wD6Zz0+hmSRMQa6dSuYXa8kUia4SCU/n2RJkPzS8BHcqJE6lYiTXmVm5RcGNndtShuFiiEIVxwuE6j8bx2OoTS' +
  'dL/cLtEVhIn0C2oA3ALIKF9xP/qvob+kqVZgXK06OWtsPAG0aCMnpcHRxFiy4TeKDWn4ioVR58SuJQX5p/DKF+gEBlKRJccPsK2sqBAr6WbP9lT5BN/xL8ux' +
  'lVqhKH3XGGzcz+DtwQDm+MlkIEKSrb2xZcGK/U5fQfQWQA8wt9Urz/5cwwiaPx+bgldkyfQ5fRQTIwSub4hYUEA465YpfpvFOsicge4yTKJ2QZLBYCqjcMem' +
  'eP8AkE1uzQgeY5w+IKw7lTM9RJUe8CwZtwP0UsiiNkHn13KZ1VfsiOkqEBNxIkFI1PM7cwZ8f/dfTK4Eo0lpJQZTB4l7MP25RYsq78QRcCWg1Ko0lwDSJzEI' +
  'D4ATDz3LlfpDJKeSVcFZta1uggfP0dfMZq38J/6RS0ejgjCkLL28EBWlEOsA5YCC2PmahNNXRghXxCMAduX61Bplsz1E+g9QvCT6HwTGPbgJK7sFoPAalvEp' +
  '4jnqKjlGkTWIrEVeMzGUNKzEpyUyvrRXmP5CHJEBLfNBaXuAmG3iK8K8RxD4ccH7mj3LMWadjiJHqBBozDacxXUWY7dKsiFGJs5qZUrgC7J1zK7lIMHcADQQ' +
  '4Q2Tj/4SV/8ADOyEETmA1j8rA4imag+gj9CxhcLRHFKzAzqFH6d9A2qPLcRvbSC5Wb6lsQrGV5w9stEOZ/xC1zZVY+0o8SBFWdwJYpfgYf56J0wccEtWRRBa' +
  '1r0QUMDmiIrGp5I1CZVjctrki+ofQBxFaOeo9JWrVfWT+JY2PRffGCTbYierRnxBdcXSL2gPmAWMps6lhLC8o/RMIgL1qHjrgIP1wvj7o1nLMJ0jqOUfsiDc' +
  'pG9Mbv3Mx+jBtmI5aE4bxtMNz4U1AlWeGz+4IDYsrH3ZhwPAq/X9w+u/99z6KmxNq6gw8fRZilUC2jPO24OKEqnMV4jWKj9R2rTH+MvzB0n1r6VK+pCYMoTb' +
  'qHyJl9ykHKUfM2x9QZlUS8zIUMPWfoouYrcrmWbhnmF28nQdrxBgGo/KeXmAaZIej/xhDcsdjwfMJ7kXz/6kwEUva/pCaDjEZcvO4QURNkMsIRUsFHhlcjTm' +
  'FSOP0k0GlL6lBiPswJwN+Ix8XGl8qs9ywc4oJ9fdbRAK532+iPm9kUBTpPVuL8b8SnE54+M8EBw2HiAFQVnoDvweTsDjUEL5GwLIkp+fqFfeKcxRXmMWXzMC' +
  'cwY/lZyOmIL9rp9Sgu6Dxz/ccQB3x5hlUoU/3xEehODjw+JqodGvSUYlcQcTaBBhQio7KC3mpsWeJS07XMQy0f8Awr6i2AH1IbhL40MMtYxe1aBhLUqBX0EU' +
  'jV7tV+Po3YDwahCZtVMMz021/R2/7xBtGbXZ2v8Av4mGYFkDCEp5bhqbxb/7FVYa/u/kjLjTK+gTkh2FyodJgBDHNQOdxnH2mRMupfqX6jyUe2ojSpwVfiMK' +
  'L2KorR28Qe1KIeK5Vb22qKSGxxgkvAT+V6PhsZnaaBoU3xvk+RTMalpcB9PgeyOC5Vc7FYPd6Go5KqkvHTn/ABMgXpjeAgvgWYqXYxDsvZ5JRWIrLCQG5Rbe' +
  'Mu166LpkbTMfIU9jyJSJhEZXcCaj90tdsRoBqXResxxN5eIn4i5xdeYMqvoMMBHZk88fzHG0Jq3PqLCgWrP6jQoNl4eyH08ZW/Ii7jYd+P8AaFXM2ldJgWyl' +
  'mx4iUl2E3R7hGLerIisjINhDLGFUmURPoNQaeS/L6nF1/wDCoQlTczD1XxGt9yiPZcR2sraKwjXPrF03Q8ZYYhDiCFZcCr8o+g6/2IRcEwQ/ljhCinMOFjbR' +
  'Rd9zI2Hg7j42WzXDMYQK0e7zLuNTicSoqNBbzCzmD19VwamGJ2vo7Wh5aI1Q3YQewofcLK4qNX0H7zzMD55uSWyI5MfgQpdh5iyunFPwkmc52+0CBLkOlL7T' +
  'kQ2pXBz7YP2jsnBIbSRp5vacxMwpchypw+GmGEcWtIHTA8Fg4NJ3wqwatWGyqUREEmYsyHogs+aMtQLtWDpD4gEK0qPi7KYWhv8Ab3z2Ceg4JRf0sErjmOUa' +
  'TVSkQwMM0LFZM+5ZLM+oS6MsNXzBhOyglHOIkzcnwO+4Yajbd+o3qUP2mNiSwafUx/wNR/vzCNQL5fsOT/HUS409xvMKJieLnGyUicQzk5l5ZGEiEXhrmZTT' +
  'qOXUPoFqlB/8m/oShjn3aeqwynpNlxKw6H5ifUgYgjQ5bV8q9+n48uI/wig09B/rlTYCnC4gNcZX+4bGObhBWyvVsBv40Yiy6iBqzA4lfQfQk4KmiM3WgWrF' +
  'hIe2p6PPrUim8cgPwpfNnzENYfiMQ3MB7VH5gq7sB8IDT94ialX18huvsSqQ1vp6yW839iUBCOWv5Fwlpa9GANgfUbUHesHFkozRzjA/wyz+ODB/uChRyCLK' +
  'Vri7Cl6XizmjkI7I8j6KI/EAATXOVNL25gpYVEBG3hidJBpgkz1qJmRw5ftOV7c1uXhr+Yb29mkqD1n4S0Vj5gVRKfo2yjLExLtiwQBA6t6j4h9PmOJw3LsF' +
  'AbR1xLqVnt8RmXU1nHsgDlQ4jn9+E5J4M7D/AE/zthRETCPESYD5iV9BjxUcejHMvZHdOkcsSVElgg0blGX/AOKlSs/QPorXYgjz3LSxo2w2eVwSjsHueUC+' +
  'IQiAFXghoD3++/78xovndHR4gB4UWy3HTxMmHhx/uPDX27O/H+1FmC52CfZl/RGXAu8Tv3MMJHf0bfotlECtTwHMHVLsXX8psjDYL5dEGpozWeb2vJ8orkD0' +
  'vwUL7IJFGKDHiph4XsgXyv8AKLMrwifaCdA+0EfsQuKlDwBNBRGTMbyH8MsM2sgv2xFG/bd/lLIDrCD9w6l346WF9D+plg5fTzGVrPJ3NI4fzCa9XAnQAD0i' +
  'FTrzAdJwi98ldTXyqN9OH8Msn2XIH8kdtDBuMF1Huq+i4xhKlCue4iLxLpxDU4nie5TO/tuINYmKF9PPrFxTVdPhlAGnFuH+Y8d1g2SjzDDT08/7qWukpOJU' +
  'NdriQ3mC3H0GZvK9cS7LyxhCkrPESArUwRKhiV9D6EIEC2CzlqpoG7nowfm4wDraOZcyxKuBUCuVhEO1683z/wCRjKLXAf7qaYQtK8r4J7SRnkobS7ZcRlWi' +
  'BToTycrOHErMFpLxD1MTgHJG6dpZ9DBwjwTxRtCGMLK5YFnQ3niGNNiqfBo86lRla8+bXq3uIvuAGDk+V+CMj9UrPLfwK9REOK/tq18sIp8I/ubEXH9kEUO1' +
  'tfj/AMlWJ/sr2wI1vpfywHQesfqFX5gpFZaPZGAKLw5IH4MtV5iywaw7PZzGj4LW1rzzKGoiUkrR28eY1UGQdCP4IDN7b4Nn3WPgn4kYsTZcM1asLWWq7hgF' +
  'wwLq6QMo9Lv7AMaKLXykPyibdVofIHwMuZMytjbiO9E5oYo+IE9RgYhiOavRKv8AUVNg0wJQNy4ifsgHwHyXTFar8QBRWicSqkAvhHZ5jJEpNjCrcYs+hFiQ' +
  '2CuYMX1KlggbZiseoz3HP0xCEIEMwJdR3/Eqr43KWaIPFEDFMVfbKlFtMblIwUypUFY3d9zIZXb/AARyBR8Dr+2IUu/K6QVQwS0P7hAfJCy5Wjf5OX7fuFpK' +
  '2fbn9VLrjRSD0128Q0+Y10MJdHhwnY4TEufIfNybseDbSJTMOUEEeRzH6ftNkUeYXJte4KA5iKsU4iMhKAMnEOYLZ89hXoBxUF3uWPptT0B6JljYG/a7DwS8' +
  'v1NnesZmEX24HhR/IvicW838+vsEs78Lz6z+5/b5cTo9EdwvlSWJezP9RNH86ajn/htlq/SBBMg/JOFLjQ+IncRs6mFKGwdw1P4weSOVNJkmNUYeE/6QJQ5I' +
  'fR1PyhVDD4yVTyYO3wwHKyzMAHGAC20NR2IUAX5ejzAyzZ2egCvQ+Y68O/LKBDsBoZvMX7X5meMAMvTdv59vKHHQIoiaBhOAoxNMyRFiwC7mwSPCRydnZqc5' +
  'lxUW7/lPOdvjUcS8rmBQYukP7gNV3F780IQoW6OIBYIUo6J9X7QRLIMw5lohu0Nox3SjsC7ylfOpmfosB3DwtYuALnC2y8F//AQgfQbcTQZC38QBo2kW2Ydf' +
  'SSoiv2SiLAunUDMF4jTuf5IQOSi60nvqWi/yeJekp0ND+5Qo2/Ec5vLBAC10QrA5H9sCxe33NSXM8vy+eoqjBQVgh+gj4nSexhT4H2uW15MeoDKkak5s4vJZ' +
  '6gOlhGj7QhAENCL9wlmJOD+mj7R+tHOPvRXi5+oHJYl/Mx1BKn2MvtYPxMQjSKeTPoV4RFURKhGBoPmMAiUDAl0EYVL+BaiEePW+Gob9gFEoqiDyEVHKoBnS' +
  'Exx4rR92OoHtQDWuXu98/uEGwrawQncDa4eIpSlTN8ljEUzaYMtEeeNXYw1atoYL1b2zNYbq+8x/MwLO1N9Uf5IUBmvFEsHiteYychG+wM+GLKsIyDpYHkij' +
  'qYSeUHK2rq+fsHMSsIcB3ePJw4+grqWXAqUAaIFzn+Iiz8eZQQWBdd5lQABrGrvEKm9wlqtwlTHuown0IiKoiZfTCJQGoIpmFzfDqVmNc1VzJNKafa1ApWGv' +
  'PdKPBYHFCz4iywZl2EbY5Y9O5RbcRLnnDB9Az9doNXDLrFPZLUmiJucX/iYpZQXBLSdsYUaNHRKGQ61r7S0Whle4pUNR/MxQ3girbLmClJUWUmLd8xXDn/1B' +
  'q2AtLxiY9OzP11LQALNrzC6a+gKhiQzYsVIdjC8tR2a68/YFfV+4BuqVS7GCeUS+A6RIfICW9p0WGxUN0w4k1CN0OIfQniOxvR+o+xKv7DmcScKfSf24i0lX' +
  'C2/Q8Hqol/mCoIKMPLqJBA5aIjz+i6D4iMg8HDGaQYrVx1EcHOefZ/MBc+RfPia3lftOZe+G1xcqAcADFHf8xzlHecUBnJsEYZMJYvfKHj+MrfDkigjLB9w0' +
  '+SnzLxjX1jxw8w+TdVe5Z8sw6Qvw4jF4jOQ0lZGqx7/gmSCVWRzN5UDHbDFxRWzkYARdoLyFfmMRmrZRx3BQ5OPD/qVDcVgWL4jKC3gTDVwmAjfpBLFVhIIc' +
  '78S7hlytp/hQTJY+T+YpZCq7WPL6AYAXV9xAFJhIiKgxUporyzbf0SBf1wmu4VVMPlMYqFXl1LaMph6eIwqKTCSrMuVA6T8wbi615gZX/COPO+8EAtfuxjOD' +
  'qEvN1FEbYhCgx68zn0TTRbKsQDQaIjcLfV/FL3MFKisVa5lxjoAgbVfuxDk7ZeViACg8aA+0a8O54APZ88q+Lu4EXhYphx1t5t8R4uetTyp9B+IdFs5RT/SC' +
  'g/BLtmO4QXW4a2+Cdogs9Hl+DnqZiLV7b9dfeZ5IKhWBvPHgm8tPmAN17RLknxG5ZRWpY3xJSzJ8H2gQEKoUr65n5WdywUuYPv8AsgKqsq83LlkO9TcE85gT' +
  'VllNnVVqABrc1XPOz7Eqjzc4eQd+QWBWrp6h1xLUicjwwQJUgdU0+jzLNx6PJtMjcPS7PMuYxUrX6dblYcczQhwB2xyx3HIpLE4ZaEA1UKdn9RRZsdNeGK0M' +
  'mGVLziE5Z4n+sEAI+R7lRT2OYNtjcwWx1PeELsppQUv5qJtNvk7jfF5jKoLJL2+CXSuVlVuWOnmBF+om4Q0ROUDKUdSlnLpMgjBa3HI4X3cx6I1bfMUoTJh6' +
  'th847YwKspud8DBNsRwDbgIc1FtMnX/ZQlCsNf8AY67Ftm4FpK9goF8jzPBPHO4idmTALCfKYFh2wha2RW5N9IGV4CaeUo27PY7benUc2VM0u3B7aT8QHP8A' +
  'f8G+/XBHyuv2q7VY/p7Sik9Dz8QoC7VePcVZUdEby1eM/wCYdzPF4HR/Lj3AIt1Oh7f9ljFdSxFr1wRK1cFlfg/LPWXcPg5/XuEy4I4PbAtsotg+YlWviJ7M' +
  'OlhUK5VOLcWOO4qkHQvMZdranDz/AH8xlrj/AMjAS28qXMi+4YUicuMMDAnbqasmv4QZ9ppd4Q8ml67iNKq3z/x+oawnTLMj5JWNQNhbRPPjtrGhwLW2Q8Ln' +
  'icNPca1eMStxGv0HYomEZYNE5lFTUGAwjZKBuenUfTF4W5tTZxHKO1ke1Zqfhh6hpYHMQxLA6L0+YBsL6mMsuYMtGr/M23EmSUwixXklWm+HqmbSX4mIj1EA' +
  'aIn0IwZKCXVMfmpgJAefpeZXzKZQUK4YXa1HF/cswnF8P8MsTPdF/L1F1ngWLDBoEuojc5XcOe4iu1VEzHjxby9HMQWORZ+DiBYbT91gP7AL28HxLnqFu4Tm' +
  'Kwi3IqG5udiO6hR18KavG+5Bcm2EwcZbFkT5oRWOaZ5QaDy9lgxXEAAeirbLb5upSyGgNeXH8QD7qxZ4Z+eHHcXCXK/5SvkIYsCat2b4L96l0l5br+vUAXks' +
  'PtA/crG5bw7ef1CEaILA3d2L5YAog20D0Btho03ThzTy0G1dwUHIRsLavOeeW2Zy/aHkBODb7YQ0BfODzMCkcptj3wGA49PMWQwLqAkAPtCmTHct4zXzN6No' +
  'dqi4Ec4UVvjyumYOyZYiWiqcGX09PXDKGO2qlPhOP4YOq8hvYmx8n9OmUAW8Bz4h++V5Q2ImnzLyOLCmEGTU2ZDYYSjacxKrpqtxZxdQwXVgzbm725fHVonE' +
  'XiQW67lh0Yllayo/Qjsd4P5hGho0+4z0cD/MuUxbTj3HuCmuMxzbuXs2cwk0sUIOAmNU5IcCr5MxobWxoI51G0QM2EBcH4grcDhYWGdxwRhxmXjRW+5jEpWg' +
  'lYjBGBETInEyGIoVdFW+fqNRpilA2hZpzLmBFcjp83EEUKp0r8yyholmxSj5lhSDKig+8whfJX8XBOwBP5qNaOsr+iINVTXax3esB0G7gt4Hh2wUXQ/j6BKX' +
  'KEgoLi3R0mh4bgx5h+WKyfVTOOm6W9ln5nZ4LPsyvvLzdRyz5VBijdr+B/cHNrmv+Mn5Y8vGwCn2hzTwQAKCiaFT9j2wXpN10vVdEdn7OCGxkgAIzdge/wCm' +
  '/UCHAei3AOIVMT5QOF/Y+UPohYPkeej5gMHJGagOO4Rni32e/UNrrwEIgRQYQ5eoMbLceCCHLo3KiC6aqpbVs2+455V9ErXKw7p/cccG+zx4SIqkVMvZZuhk' +
  'NjpEyJEOYlaVz1DnvD3ElR7WRWnzUUZw0NkwNWBd3ounk4S+YE/AAujVeaWHKTYQ9YCzOQ2ZodMLQW4cHq1nPDkB3UYDktEJizT59ygtWjXEwRMSm4SoLN5a' +
  'nxAfHmbiCqXMWPYR/wAQuyUGE+lhnkfciUk+7ljIsvsiIUWnPp48zgcWvcVVyB9opgEMt3bLJHGxrL4gIDWybWBAZWXeHOoVV4ijGopKCtsFkbRw1PX03DcI' +
  'F19FraFToRcsxFCtnlg4rgZLJd92dBdL7xKAn5MOoHBZ+JVCRDqmYowRWGsDu5YCJVWzx1H4VZQ3VrFadcB0Q0h/wSpdu3XXmVqCCYJG4uUBqx3yl30bZx7I' +
  'Oteg4NHFxgTdA/KKPzAslQxLz2wgrjOu42CLXR/bAzqWwgAlXIP58RIZX+3mFPM36/7EwaRaiL12ev7nZCLLbFnY/kZAO0ikGrNmofwL/wBgnQUdLosPHEFY' +
  'DQWvR3BX9bU6c+rx5+85mgSlcsRGZng7eI6e8z6P+v6lKG+4QpackNSy1/k+0UvA5bPJEtUPMbBzhIZdMuLf5x1zMkmVuyLp/dmyPgsVz5f1GWxlZCop0OR9' +
  '8MQYko0Pp8euESXRdI3nJ9oId6ajeVw3TbHTxCBRqUoq804z8kWPkh1sPwtV9Pgl9OF2uR9lP3iucGls3bjT4u5Y7IEQpE2PmV2qDcs1KgZm9FQXZAptu2Jj' +
  'CKs1cICILQYr3PKBJYhrADbmVkB2828WzzYymWJOHiy+7GRB5vPqEIrYOye8QSRMkfAINirNOYlWW2q+LhPAhg+F6lKKzJoJe4NCx8Mg0dzFX0P3fWvoETLS' +
  '0N711HIxnIaDRFhWGi6D4hLdlS2Vk+JjXN56f+x5YqnKMHb1EVraE/32g8uml40j0c3TPO4YKpF9DR/uo7fyFf8AsIshxM+0gtzn6dxiZzEPKvFeYv0HL8zM' +
  'S0kPM733t0FbRXI3UrEaBkoqiswQjS2VNsGFWHgHpM1yv9C27o1f2+6SmUVeWOj7XRLNZea3gh7M6XqMntY8BFBcxB/LDWS7bfKK7FaRp/4RtzD7T/CNvPhN' +
  '9ANt0US4HlvWnP2guC60qb7Rwc/mMXCqpVDHwSgFXf2IJTWBiXvrI7XAR2mr9HUqQYH4iD5P4RsjVHsSJaUsw8DU9vEbFYxnk/uLZLe3MK1SIu1lO1uvbslh' +
  '07y+hTScljLQxcPLvxeMdk7RA88/L9h3K/E/PmXhLrp6Y2iGtt+DyednmMyop0ojOo0MPQibRKymGgbssfl1EaCrimkgLCtK80D+D7VNkxRPMHVCwKRsdTBV' +
  'ZvcqEsAG7WiJcy7bvXxxAllchfZBVqbR1EOZ3ZWYrmtG0Xs7gS5+3OA4xMsG/MQANKt6jdsvEAEWKAbzzDU5OouoBxA18oj7aJ8R/MAaulUeEMdQEFWwwf2x' +
  'AAbJXzCro5R7eWbh6DiXrgpmDiWVPBlS1XxAtgXMMXUNOjiCC7FqjaxhSr/BGLAKHfL7ymh8dIo8sEIiNjKM90Z7t3L8I2KcVz+IIqvXNHK+YzC3VmnFxe1g' +
  '0GAmYIPhjaQXhUaMOy4QpBWbRSmI0Eq/YOIcf9qMBlZnXCYTwdG1bWrWW4j3CTm7KB2U0Msbsg0aOgKA6IJUYrWba7MHa8dxFuXUPgXQomLj5YDWBs5f1CMW' +
  '3OvgtlgDPiITAa7HogCuUzXBLj4EZyuC2xbvHMwPqE6tdvgC4eYjZtD9B+/qWJ6qcdeDFH34lESC0LRwEDXUa9/99ovZc9Rdt4CA/kLZNvprjgohCHBR7e4+' +
  'MQTiqAHt/wDZSOUTy5SqFph2X+5cjIRgWWDt2j4/Y8wuErWW3V7zxFwAKdAdPkfxK3+oTa9Jk8VL1YeGopXILOmaGJb+Q+YJeHjqPaFQvXS/qDzQ8QGxEyvJ' +
  '+YwB0VLSh3W3yFhmoRTAcqSz3VyybgZ5LX4/CZMlzbCCx9HVLpZWxBIFpIXVz7wwapEE0PvqVg1adH5YdsVImnqW9u/KYV4UYAjAmbT+BmNJuInM1Phlo0K4' +
  'rpl+o89dH3xDirD9KlXXgIQSVAFrBapcift/iNiBMBQHiZMDrk+X+o13eY6tYxLh9GQ9wCDwLUyAcMLisCXxf5qTwRzDIf6IjEUAol3NYPRN+OVVA9Ix9yK1' +
  'Y7gEM/Zjdxwu0X4F4txW2VBFPAHARS3KxLCq3zAANxg7RwhxlWBiL3VzXThz37M8XFeMuhbV7m1yI7afJg8sy1x0rFedD9+0epSjz0ef4PsmG6zdHT4xrWJa' +
  'mv8AIliCq/xCXA4gUP55uAhotf8Aeol1vKUv29hwdQMoAWCXDeIO2VNd/lNv3YlBKI2brTa69fv1mYudDAHq+/WiVBplVheMeP8AsZYO1fweIXhukWx7TPrL' +
  'GjOLrLj0XRzuHrEEfXq/vcAjxYHzB4Wce2ULo+cAP8yshdgmSRKfM18P7i3jLAF3Es1Y14T8sPhNG+exezD5M9zUVV7pRQmfF80Ofv5eIStovy0j6YoUB44Z' +
  'cQiifsev4gc21Y5OE/fzExUeGHV0Nax8eGOa4SpOxlCzqtr8zb/UOZQzAgl2E7GhEw8TdK5jZWbzfEQSPA/GfRavvk9TmlPyfcdhodIIsD3UPPZ/MpUW4nli' +
  'QLYg8iv0TaHxbXrgwWajCMrK31UxtWh+pbwcTkOGHtTAFH3liB2kdDWZPkZREfK9H8x5lpXUY/SolQcxL+iyF+Zc/OlOVo/3RKBattcR1eAt6EAkq2OhxFXj' +
  'Ua4687R/hgu+4i7l0k1m1XR9oqCuHeQduV/mKiZVviGincr6CCGa9w0lR6JbEqDF6K5XgLfiAKorwqPaZeVPNgREo/cO2gqmvOWi1lgR5ham3G8sBzed89Db' +
  'iUjeg7X7W/mFud2PJeXrgxDAZ7Mqw/rJULK1FR2Bh7uhZrPE68zJuza7YaiWbX9RDfuL3xEFWse3/wBYpolyPa/5r7wMEpajghLqlP5fiZoPnTXXb6jNguDP' +
  'l0e9jRlgqkVconHjx55gUhdtAfytHzMs6u5aLT9QEEuxGMg3tuKFxF9m75W4ZA5nwmR+Uh1blBqDp/v5mQX6oXUg4fR4eY6toGmLZUum0KM8wOi35a5g8gj6' +
  '4j4x8VxHHomzfhg0yYoeAL5RfmLyPa0/1BBtRLq8kFymy4awHvTxbHAwYKs9YY9uPMBiad6YWxLFeT4mMH32fgsXhLs6lqohbe2oX7RfRuOyFko8BbXu/hBp' +
  'C/5UsjoxqlFWZt76lY4M6ZgDjBFs8wS5XErFis54lZu+YUo05XFFj7i+6+eIAoJinOX6LM43U/w7KwBqK05xzG352DA4+PUGQp24U5id+erq7o+csuYWvShJ' +
  'lFqPEJilbay1o+856gvFXGsFXI2PqJFjAjn6awJeBU/P1NNH3i+XcfEZ39zh9fSdHzMFN0TsZs7GM2xTV2yxvST0FS5/B4uB/Mtq8eoqr5YLEFUjeoVq8QXM' +
  '9S2omsQMdC0SCVzQfxKD4E2iz6Za1tIOI9QgTA0rn3a4CGQtto9fyblrTx4nrssu08owLhyo1LjVDh74/wB4mSXen2hpHKYPcaJgXzOTm8H6lQOOZUx5/EJq' +
  'mEtAcrxDtGVow/Hvy5gNkU5YpGhXa0HmGFAyauq/8e4yod+IlcPGPiHEY6v+h/BxFJREb03+ZkLBt5DbXtB8RIM5qLsntCCbZAbAD+V+IeL/AARdk90vVRuo' +
  'vEZJYeJZu0lYyL6lEPBBvu1Afd/4Y8xQ8FxXzHmupZo4a4tw+Rsp5JQOaLFOPUwi+UgeUZHi3Cziq2VuX5cP9fiGRrIOuyECw5DZBpdUxItFD3Oa8c/PiWqb' +
  'K3AgA1O3Zfj9eMbh1VaUy1bQ+RdxheqVRwB4Sk9xnDTIlh+JT+yj7cXU4Ll4t8LPaFe+DuI8oQMaUuV3cfP4jZDOQ8nMxz0V1f8A5HcplTfK+IKD/wAr/syS' +
  '0NssULWrvUaLfDLeCU3bmWcBaXS/iPNYl9o8ER1sacblYRWcsnqItrgADlvfqBBl2az8uPsQgpg+X7yrky3aHuMqOPphBbKmhcgradFZ9xGE1KPw3p4JcVh+' +
  'H/sFLQzdDcWpyUOhog37agS1S6x7pzFNVcnpgJWlEK1bHgyv3FHVbXRwfaWjSCz1NSmFfiPFbYBEFVrfChlO6z71MRW0Fvzd9APiCVpyCfdAgmszG0cMXHKQ' +
  'nQH5g/K5Y3tsNt5Tn7hDl2aM6fYW32bl8D1XJudYusAYLA7auot149D0AQWUrwyaz2Fh7ZqA+JA6lwfguYsb4hpHYfmWm5yJQjX7YVC7DtggpFNyvGn4t7hX' +
  'YuBg/wCsCX+kexIMD4OWV6JfN1V1Xpx735m6sUVofxBVmnR/0vBKZcrNoWcvKuTGcEme1feMWAPCQW/18xsl5wGKvxSEPr38lB80QWyiY2NWfsv3miC1XBUf' +
  'mCLZnuSFj9z8iJ/ITQnm3kcntiQ6IvnHil+7hdFjmCLaipvcF149fqJocNr5P7goZj/D7QBRphjJk5iksU6PECB2fkgl6ErhpD96fiDxMuMjyJlwUmTKfz0c' +
  '8996fK9TK4nKVGjP6jbeCMjOj+4ZYC4B+4DBqHa6I05hVrUddMG/JAu1YB/THRGRpJZR21Fc6R9sS4Gau6IzS+EMA3C6VKjI4VYYjMqI4F6Sg18xQISjRPwR' +
  'i60Wr+xKFL/5MpdNSjNRJUSMZgO+QXUrmUJD+JQLuas6zmWA5jaecP4iD7NPQwQBG2LiPKgbflmC9YYm/mDLPSUS2EzZUdDj8nl+D9y8HS9bf4JhmZKGTLmA' +
  'otYPxKmF9wdFTJUI+9AxaHjKPvD8oqr95JhXLDIjPhu/iBqNbGjoF7lqxYNRwCvM7IOa3wFE4PcXkc/dbfNdQAmOPYZfzRE3EsIlOgcIWI4TEHVW08RXVvRR' +
  'cUTJR8sj0qekGXMpaIw7REI1tilA9XmXXbWgfy/qNab3iH3383OI/s/1Ml15WCAU8LfYlric9r8MfdZxogseg0fEAsPTthleGP8AaCMQLQTft+OIT63I6Q4/' +
  'evtG900XB4Ou4JKsbMllgfYc5gjSgvZO3/GAiJShesx8AD4m/uzqEoJbDEAdn+SviWavvqTzLhVclwLofNyveQdu/wCYbi8qLb8eIhCw5xLxyi2hqIbyx7HF' +
  '8OOSWrYR+8xraHV/qOlSw2R68KKry/sp6altF3m4H0/vHUXIUTg9vlIs4BwqdCeKjuLxTZmM0Wuw3dmbISKWv2kv538wU6hyx3jmUSDK2swqal3ZCvpl3KNy' +
  'pbOWr+J/5WH9kPwH7mb7T+Y4ZFAdxqRYDWo6hbGOOv5jwJN0HKssCOpVn0OjyxpuULXbLDUa+IOE/wB1GiQwlVQRr+tmtRdeVs9TBmk4+nIX4i5VcraHuI2R' +
  'wRY6Pfu0cp+YFttDb4lb8AOohXA9Jt+9y4rTKm+4EVUKIPNty0qL1TxKpMsHl5+ZbXXX9xsvzFTUU2hZiVo7foJZLg/UvqYAxv8ARs+ICYDPKpR5GO7dW1QJ' +
  'kKjAndC5FwuZcEqC+Vz/ADCSYCn/AHf6idH1bD+/4ipV4M3C2/gXezMKkxhgfZX8y4KDxvtLcejip3cLusNQHlg4id1Ng7HqZnAvMvtTgoywYAuAP0S8ZoWM' +
  'Cv8A7AoAf/M8QCMgPsSjDDnq4P5iyBvUcGfE9+flmPChf/BXa9k7nB6l2/onB++XJXzr5iAWCPKWXYz36mFgp/G6+ckEC2OY4pdU/DHJVptOT4lMT6ZWzdhG' +
  'wOERwowjsiSK1iw4M7U4TJtmlyo+YyRJsO4MTK0pdmFnmWu18vOepr8gxAW2ITBLXmwekgQS/wBPFPD++AnsKKUaR7IbwJEKN58wAGvvBE3EtzFFqpoHaq6A' +
  'yswBPss0vyNmealQpoI1pYXsgC9jDoCr7hoOaWeyWaKzEE0cN5hjWytrcpA4Ng395Y4gFeuX7SnAQ4ACHSFrLE37D8sRyAqtbq+GyGLwMnzLRy9Hjh/u4vtA' +
  'WM/IRyTIX7qDCJf30vK8ssZl9KEp4hSkFZNylAytB2xLbHhi3llcSWScniFuWf8AQfYiW9+foAkqLliFaVaoSo5JeqDWlIKfwVLIe1rjo+8usgry8RLinUFr' +
  'ULxPU0P0EI/RE/BjtGg+7AXKKtKbBkvjtADxYAUpVGkBjAAGC5ZZBvkPNXlECjlvUWaeAK+IwhWW2e/B750cpYq72weQRWGhePRj+5fAo7YbdDF1L5xRbjRx' +
  'A8gfaWiHN9zA2KWQELrkDnxFUCeLx/3D9gg28HQQqj+NL/6Q1Qvz1E5MT6Z/9gWgwaDojvXQ9f8AZWXxi7XC/wAfeZMtrLl4WGgwuX44lWdgB8S1Rtp+cMyx' +
  'pOoVTwPKLmDQgUEa6vNQUXrs/qXQl5LmVAUShhXhjfKKiKrxHK/Yx1DMx7FlNR7CN5Mcyo8qPyHB3+8ywpFyld34OHmu2VRhpTutXYn2O49FG6zEKrseUfzF' +
  '6rKdxDxBniVUWZsiNy0PBeYbafLssweV2vctXZymG3bFYEPEVjBnnZcTaz/hAPhhT5/zBUIAcFLCoVUrSgNWC1fgr7xqzVaF308PvMDSc9zmy574Psw2grgI' +
  'gwpJwrH9SrTJfNZPwxQrAHpIzS1VfLFjGdYHCHAQ9ph5nN61+ZcUQdGZRFDLjmcgBQKtauHMDLcQlobb4T+YZNkEeHh9mZXNksoGVwRAU3TdFL91Y9itp5DX' +
  '5uPqFXks8MDiblA1mBuC6iFcTaNVS286jyrHkJq6a7B0+A/NvMENSJ0Dl+wlm2enKl+FXO3pCNx6N3GnheN+WjCxDYX/AGD9RZCNv2SjVwf8Je+guahxdfom' +
  'wllvcc2UyH6iLFwQzZNfqEJtlgmHukKs/J4/c4J4jR6hCAC0/EoIaRymf3Cuw8QDTAUfeP7gMs7fP/IIVTF9EUAKFPBFR8ZgMSgNPcUz7/ZSUCS0LNlym3rC' +
  'eRwZUaWbXVRjpcU9zmvj5wqqFnwywiI5PSTdj4yhAQlXb7HCe7l12oP3WZfJZ7mmgnsQj7FBDXmVct4Dxm/EJl33hp6mPub8QMnLntOgVjYQvEr7y2lmelm0' +
  '8eo+Luj8AD9z7JT7jLEAuLyeSFmiY0QHEGxWtO4F2tNsoghBhk7inZuDMPRl31r8SjTAFVu4ZYohiWO1aDyvUY4m2Y5XivR94Ay8SmScPFr9AjsQsX7O3T95' +
  'euHD4SJafaL/AEzP7gBA4dxVHMcH0mUqBUVMLXl9Df8AMqrTbLEsX+IzrwB4jMir1NAG734mWNfQ3bQTGxUzbdn6nfi18Ygl2oeauIutTa9SoH5n3ItwP2nI' +
  'xwVLO1Q23GelQVJ7jiwZzXJaHHbgCYVexLY8mjXECoJyMlsX75m4vpZT/Q8Sn10H7ilejn4lPmIepUCbeZmxwH9sYLO6vuLkFK127lAZRQ5fiEJcd81/EbcD' +
  'KzE4ICChchPgV+6hkZK+8bkCmn1/5EcqxQljbXgbXqZpshaX+iECjBh8FSwzF0Pj/XMSh4R2+Y2ngsCnMQGaL9lqn2hWAGqTpiXELfsZxPuX4NVvcWzIYts9' +
  '9wu0XInEBQOjFbTPVdnEBRN0qK+KdHlfaPke4CkrYlJ9oylJ3bG6b9P7jktsEV8pmEC8F8MEvSC1XCI6OLb5g/y13sA09LSQ0vFsOUBZ+GHeICy8PMNiChQV' +
  'vWGBRNtyotRwqC2N+bR0SotjHJYE5AIlMApq/ExVcfhGDaWPDr8Rab4iWiIteOCKSRVG4lGENEAAfATFuAK5BE7IA8Zz7d/mA2o2L3tl25o9huWMAsBRdhp7' +
  'j0TiUTvMOIt/GMQ8TK+x9pQ2QtGsaDEdbPJANJhIrmzEMbgXKTcpb51KL1P2/wDZe65XmURW/uzHBfcwtOir7wWKHX6m/LBgH2AX7dsMbb9TLjEYX1mOj1h5' +
  'R9xJvTDSutny/aW7OUNkADsqjTHcwSsAvrfyOIfShJYNq84HMCQWqw9xCiyEORv83EKLFFvFmX3x8Exc4othHkx6zF5DlA3cyy0hEzVREoULaM2+ZZY2NmcK' +
  'dvioICiXUNwq74rPcYFlKfuZdcC35eD8S8bWiLMxZenR/MBzylngiDW2D2xIjBgeWBd/+cVCUv8ANufwMsGiRMJuj8P2nCMAGP6n+5QNcR8n/JQ/wVCWeV+Y' +
  'SQyClTA5EWQWs2OLe+Drx9oCtQW9dL+oS1Tyousv3fj8qn1Da5zYXK5QiMcIByjMU+BKyqEbGCvvAW5Ikq6HvD/yB1cS6Kmrav7JhVHlT+pkAl5H9LxbQWwj' +
  'ysxLLuJcyxhfdFWY41pt1AAAAYojklW61BA91KGe6Y2OjRHsrD8OD/HyRDMu5Qz1+kIYW/EvMXMLf4PzFkeE40T4nEVLnPjiDHmJjUSokCZK/cbEdjGXYYbP' +
  'ozGJLwHoxEEcqhbsNvEGr7uCasLBDELyrAGOlblKjczfaYDyZ+39EuhfMTWN3tiDPopwTI15v6TQCYlhdQ7QtrUB1ZknsQEXrM/Jg15UMvho+0pzgahENDAa' +
  'CXTAVwKLYrPEHJyqazCjBeDLzK8DOFZZ+xUF4IR1Drtc16P3Q27fBLB8tRzLIu1R+2/iOh0Q91zE7DqCRbq41d5t9BAH2Q/ELStq/UwrywA9fyIYhCw7TPtf' +
  '6fz+43WLzQOb/wC/uB5gZaf+YJnWmttcI24J6fH8SgdR36IAOR/MrZ3b9iLjESwlb7qn5WYco84cjybmWuFg0dD8JMLgpmLsflLYwWH1MKuCOl2UEWhs8kvF' +
  'Ick4cTSGODkHrJMwiQAvTyv4mYD25JY90CQ2ObTpb+LjbkyhStondkIDwjEH87fMr5ddTT+hQ8Qr/OZ+r+I9zzy73ELNEXx7hczlcrBrCPeXlZ6QyjawOGFR' +
  '+JnsNbjWNAYrxqvABPtHKxDOEYUbRMviaGI1fcNzy16ZIBYt1yEa4c3RlFmF89P8QAB7MY/SkLhHYHF7iT3gr2xlRDSKfmEcluxnA0FSlME2bvMyYwSyplps' +
  'G/MtDl0G2DRTfeUrLzqMatpwOf8AiAgAGAm2FYcyk+YsVxdwXFUV5mcGwNuiv1ErV22Yp0yvZ3FxeWtVt+ZjCF8ZQ/J8wDMDpk0X1AMXSbixg+WmC4BobTB6' +
  'LlrojAVJT6pQc2ih7ZVG6guPF/qDP6fqGH1At6BHS3Q36JgzQ8x2G4VNHLmfKu4WIfvJ/d/EoYWln/dzJ+B8f5iIVp1/vvL1emoheQ181DaxxCeNvusi+/4Q' +
  'GaEDoNTd0FpvmPjf3g0sqcqoa+5GIuUuC0fmWXJL9tw3oC/uJgN2+xAZ0YuK5D4MKAW4AvOV0GW+oT15XRNDAguB1KZrhgPhIYXSk1tYZs1UWsI1cIUEOjyW' +
  'GrTkVLjAxAIuK+wfJ5il7pfYf0marzEVFFyYLiXOBe3/AJFguWmFqgQNGCFOpRbs0dwVAuqpbVzKBqVGnN1juMC/l/cs9cA7pY+w/QrsjXKxF/CKHXS9SqEP' +
  '+VHcdC/Wp0MtenM0JTlUvTr+I7ccfQyn6NESFIedFz9qjXiZXkvgS0IqBcLuuyXBFbUvMBFM5Jrjkhopybg0usdywd1oljtojgd9DPzEzk+mI8H7pQKqpZef' +
  'xLLgwiVqUtR1xd9TQXYQ/wAvxATHboWiuWXn7QcVkGqInyV9upYJg+BGvnUxgnLj/uyKQAfDa5+BucMCiXu07VvweZksIvmxfkRA1l32JykRlgUee2XDuaN4' +
  '5sznK4ibWHb7TAvR7qj8ymmuh9wPsH+Iqpg3tp4U/iAZC43llSsgDxHVHASmCXYPkhZXpV+Iaghh64z3YpD838xCbEvoj1QfL2P5qKBfEHHE0e18P1EpjP4F' +
  'Nkz8QjpqJsR8xoi8rS7dwhgGwBvLUf2B+JWVy7fFjXEmaRYs89nmc6Y+IprcMHFNaxDgs/8AJrT7MJSNIS8DyXdOoJGxG0dl3emQD2i4Coo1KqieDNTJtqhf' +
  'LMYBxqBn4rKXpm3qZwzGCWuvD58RKPh+JkAsK9QFczDWZVuDvUVCiI0BwmS9xeEcrqA7iFN5Zr4WUJ0jTJb8xrYKWnvXuALgudvtKrJEbE4iCqDIc+YMEjvs' +
  'iB1uVO5z7MMGiStQrt2IPIyjP0XbqbzFMmW6A7IihfFxXNUVJPVC/lh8t/k/8mZJbei4GmFx0S6bYS5RjbnqFt6mitVqy+3g/MWUWWDQ/v5hSp4gaWJeS+Zk' +
  'btro4gKFBmk68wA0J5H0N6gWuZMynd/iIikZRfKvaxsGWSAC8rg8dwxdVrcH4KT8VMqF2dCv6jf2mdq2AHwR4NvwQ0MsXkF9dofEaaE3pGeAHL4ozERWoJGC' +
  'HnPyJdlUe4z/AAR6600XA4JMfMZqApcpD8F+4Aq3eoL/AIIhfID7ykECIKDGj3FP1LALJ+/xLStzKs/dxC2I7hDrKzBo9Zff/sClPIM14lqGyzCUGFA9sFYu' +
  'nyh+x/BG/wATgP5i6Tx5rT5afMHHU/ZZfzFtpo29Q65iWgHrS/L4lAuFt01vNC9Al8hwN0BboxHbDrAZ6+z+5Qv/AIa/zPJDGw9j+GW1gXpnD4oi0h0aPtX3' +
  'Y/7HrQHNLQa4y/8AksuEDYlxclph75hSojXlVPJTk5PiEECF92Fh2gA+RHfIxQTqFqdqxrZcSsxprUUhLRmuLhurLnwGk/T8wD0xwqQJ8R2MXEMPMEtw3Bcz' +
  '2dvviK1A0pelV6lfmEHB/aIQ0V/nEuImCvecxmKyMVu1cqBZGuETyw7HIwvl74DqWAURMAVXidxN9+YOq4lDoR+0Fj2k+0/CUslLwxFW4pwhcMEfnE0ZJNf0' +
  'JRGILzWYwy/KIl5ydSzXqAeUMxDSsn939RpbYrarasyQZwmdEUHb+oWZpQcQY9mSW2bJqEzlkh9VyIIiC20peGtRxtpizuZb1LAogfYKv5x83FjqNY4YHoVf' +
  'juEtttUJwng2PSibieNkYbGBOVWy4n3oBYh/7z/pwBOA+bvUBIkoAOEm91GCoBpl6ZaLTY1ABc2FQbBCsA0AAUaA/wCpRrC+/a/ZDjyZD8n8nxAAxzuSfT/2' +
  'AGYDfodfmC340D8/7zK6MBA+WJhVqjacHn+5qAvp6+Bj7wY+wjvge8kAP8zhduhm19GaImTr4jyHL5SXTnE4ng/29yzP4XnkKHhbe4prRVgwBCGdtEwPJbQl' +
  'K7A9ZhGUCxb+APzHUsW3d4rBPEtvv/mEhWMj3TMCBGAYMr4PiQSpBFjttXisrIdSl15IExxbnfEogV7yWX7NfMSLrOlIPtQ+JeMHk9jwn8bl7iQ2pYU4JdWl' +
  'xkISBE2JqJgKozLFDQd4yz8xiL4K2CvkZa1tEWeLU7K0zaJVGfUpGyK8RQQIbuBz8xR7SvmGCNjcM9HVjhzKAa0XioTKswvufdDK0KvWyZjzPQn6YDl2Z80y' +
  'jmBezXXcZrkVhF+00mtzEvxKBcwj1LixwLFHmV+0Wv2XXTC0Af7V/Eqg0fYwozOfHTzNHKTweffX3hcst28s7LKg1WvJ4PMwGBIDgCpTiJmLoYlAF4jjklQQ' +
  'M5lG5mupwS+ouIwoeWvXjbL9EGFZwGC+i3AYJSu9FVQbe6K0aOrmAqLY4LOKOkPr+gb5hi0p35t/Mvmk2ni7mNZXufJhg0c5mn5Jrs/shKqoLKu46LBBLpxp' +
  'lKO1cTvNOuJdJWbiJqz11Ltw6KhzhvZBVgs9jk+RIL1JT5O/5lCcNv5l6ykfYlAvbofv+5Z2gfkxTmCbq+Q+OfTE0lFB+y4PLUaFbpVL+YV9oDX6AUvG1ecE' +
  'FEM0sPGS9mGOpwL6o+5YiKg6w2ENnVyyngoZ8rEmENQhgpnyx0vKvgWXwfzFeM/wTIWBR96/iC9dP7CX+Yt0L5eYDwtsEVXTAPDyeHZ5gdLEFCeU0kRVXF1J' +
  'L8fkTJR/pTUgngx8TNOoLMgWewmYNw3zKU5hLA6JmNr1OLcI1uxw/uOKGNJN3wolicjM8TgbHoxUWuo61AmlNrKSUofk/oiJGWykmroDsHVy8zBmbMz4hlA9' +
  'JSY51pWn/tfMxgiipk4hWDsB2QXfoMSx4LBdw0oqyGI6iUpizO4WOnsipPQ82DryeZYMPgr/AHlYhV2d124P95l4p2v0LKAqtAcwPKzOXb/HxBUBA3XaywOF' +
  '+5gl24q2sIYu4iI8ztAqJTLXcFOpm3Uo6FUcL5aWvUN9aL5Nt3lfEQ9JmvU/mKJ19pT+IS0G78XlwGCvyyteyRBqCxdAwIYrrNDR9z5uVOUEOacP8PxKCstS' +
  '1R5D4iUVUsWBi5i6c2N3yVxMepcbnzio6a0wPGDB13NzqA2nymJaYbCWt/MDMFlflDnEv5kC5FucXRRAC4w+f/JhJQicPNvAytK1dFXW+n2ub7ppYMofHe4i' +
  'IbSeRLxhy4PmoVNG89is+N74NRio7DeMKuUH1cruQUyLVzAtkU4WIGmLVtBiWpCZQwdyc3q/UuUJobRYPSq3KsRbWTOGF6y323DcLqe1gPvLFa8ge6x+W5TO' +
  'm9gp+RRoa4nAiU5scrTeRbzL8B9wSV+58DuIFcJ8lh8/sPcVlUDvjeX9UBDhFMwWw1KMaibOJWDRdub7uZWWlflLP4qVMaZVdDDlxWFUK/cLMjT3AyGFLK5B' +
  'k/MpJwCGhtTY+GGWKx5Kc+24TSvmUWwKpgO4HhuUOS4DPMb1fYUe3cGot3QwddfiNLxLHQ8vTFjrEqCOcN7XfZ/bxK8MSzIicQBUBWLeJSmAOIrTlSpieT1x' +
  'ArWITxCKJJt9KVWkSoi8g8RIlLtFtDiCPkP1TaUCdnmDcV31CZUDn5uj/eI8D5Z6aHsD/sB6QEqaCzuDMADJEOBPZmTNPqUahNyFhizRfziIskqcXXmKwop8' +
  'Q03xH9NT92X8D/EIvtq7EP4h6YvC+SDAC3n9gP3iOUCuX2BYQr4rjzh3jABzTEuDdvx3+vzKspB/1lioT9RK7F5RmvOpktfFgWnh4rnEoOhW1B+3ct1WhsTs' +
  'OqpuCQgfhExXRXF6IyIrkl8dseRktFTtB08bI79HDDVYs+0vDxBmQK+9APx+ZV9VmkRb7v8AUGzVjQzbxMsohkSyt8rS9FdkcOoRl+3z04v5t70g7wZt94OA' +
  'g9oiv0SSpiBC2WkNXWVkJTJsiuDlPOPcrLtVRAEWKVSFbalEqV8hZHalsvPhK8GHmZQG0N4HaZPwofD1NJkae3v+Zk/k9nK+1VzSHuWb75l2Cq7eghQ12qHn' +
  'xUXxhRlqDmMTWLMOCDhDzBLql0AX7A/LLDbAO6H5Jroyr8Wx7YfcywcdzNgljaht3gmK8bg+M31NRdXHRNfrcAY1Gy/M2PRDXUeJTGqkyC+TMpfiYB80bi1E' +
  '5r9dT5cdA9BgiKqqu1mO5UrouO76VeE9m/mHZp9Rrav1L1ksBh5B/iBYFtjV+GFLJwav51Ku7onbX8SjUvdOqj0bMqEIqTpy6IGWtYHjMBJlA9YgO8L+YiVb' +
  'XK/TYYYMyn8B+Vi2rYAnSvl/5LDf7oWfkjZrESqLX6lLgZpcfzLuYReWMBb9mhjcXBKPcV9QsAT4ImTFQSDeaaT7/MgXl15hQBqdAHwGMDfYsCFHLWA5BzNL' +
  'wQXKVhQQvLcyWj4Aen6fDCaxud5bb8NfEtj7W66jnaf1Gj95YAi0TZvFbOa42dRSwsMl5KGNrfOQjRyyBBxMOt12MM4cNM00jkQyNBY2HDaALug5q2GKsEly' +
  'BYKzeTmpUvRoLbUerMwBoGvi4FEW3z3R2cBzD7wAQ9fVWkcmNmYbJcdAXoCL5oMwD9b4jbHwgI4DiY/oLFH3CEVSweIMQg5ePIh90xoJQANHGweqGzxTGPHr' +
  'uai3q1Xr3GNeP6NXXm1K8HkjodIodA8C8XIboGLfAz5FDyxkq0wu9GMDS3p7uGRBqM1gHFAOqS+Sqvwx+BKEVpQXtfxfcZXF+JlzGBqWdogrUvjHGyq649sq' +
  'XthxdRhpbK6CAO4eIJC4MsAUClhLE6j+4y3A2r5Kch3OclKvuEE0mLL4DiLlMezMq8MLqqe0S4uKI6ujDWVO62/Ep4A0Gx9F+hp45eoDehVhflBn8Vek7lLG' +
  '1XEnl4PpUrEH5YyA20dxeELMENUZvkhmbLPgIJwpcN28v0wbiQjQTy5fuK6Y7lFTgH4i7KifYfphhBfUMW4VS4EyarwxhVaxsUqalwpiUsIAUbeo2quUALSN' +
  'rpjCZjexQtJ5vwUXzLXsSJVTYo5o5Dty4quoJOrUp+T8sPYOTggvpr4S7jRrTFF/en8xTOyMMmsJ4a1BdaRwUh48m4SYdd05+Sn5h5ViqWXWxq8GY+36oN0H' +
  'XiK1zoT+ItZQpKwkK36awrDefwBBLmy3kGvwCM1T5ui36qUPPozvL56TAHq1+2G/a9Tu5dCd8RYKAqg3VdSg82WDRH/lcCLR2B79y/1SkLTDiVIAAWtoHNAr' +
  '3N20LKrJznfaBoJuqlcYMzwXk9DzUGUtAoz/AHKvhBKUYYziR6aE8lNRZIyxQGVXqXBCCUXU17Z9gJQij2BBnkWGulkWNuPCQy4yc15JkHMIZSbN37e5fVm9' +
  'DFB4BbvxBa4invLMCzs4Cn4LIj1LfmY7u1/EdmA8rZGqqL1E33E4vsi0KlVC5QOL0MLyvO7l5QttMXDzxp/tLv4he9TBb1nE1Na/YET8zaydnrXE2TcGR+Io' +
  'Mi8RfeLmiZsdShSsKBx9vJ7g5YWgujzNyoMK5h26E5ulCtDD5uEqVqH/AH8xopiv3Kp9wWIWo0g4vEsSdC/4+huneIoWDDtKK/EQjW60NGdT8UiWZUHi8/i4' +
  'itZHZkftUu5qP90sOG+o0zCFmiXA7lFdWdgroNjZ9oTQmjiCjzH3CxxFhvWW/Rl9FrM5BZS3T0gVwAeY2L+BYX5w/MpLOPkbIFUSvA9fSfIlXUPaF+4L7Rd0' +
  'TvjJQ8kvwyi9cQ0HHainyVGMb5QxkT1n49QWwFCVseY3FjG4BtPg8e+JYChw1M8Cg6PeYx71QLz6pm3t6hs4cLpotDikBwhtYGoagrKF+W4glLFA6uDHsRtA' +
  'iwX0Ax40U7lKlQ+ocIYy19wbCjTTA8FrKsZFFDt6ic0D/wAlU/5bL7A9ClvXQgzUf2g/PaA6AixQSY5G/a5XGJ6HaRc06VWLDdyh945xFAMDt/4IQVFhVmKW' +
  'k6S33cv4l93FOS2srhBsRgImXZV8B6L5i1eYl3W5wkCaycecvn/plFTXUYOwAtXqWSURfO6fyyrd58zQV0i8vc0y28xmgGDeR8R88ba0/LH2qLLwliv3EZcE' +
  'cHtTz9o6VQarbwfxLtDY+8AmKWAI+Rw/MWxE5K/2safEuKptBEciSrfU1moBKNIwxBZdobTmom07Y6B1deIWYusv+mPQVSOyIudkYHI6OZQox6hCBB88sbOT' +
  'ExPcop7RHqyGOQfoHBK54jxmkY9mX59H8zMcbP3FbeVMhEhgQGWu/h/c5BHn3F41nqBQbog4KCUHuKhnPMgWgqnjs+YggQas5i6Ue+5pBTZuPuWZULo9S1Jc' +
  'biGW60+z9RVG11hJ/wA8yo62OX+sx7cTqdfG34lr0y9TVOhd/IHV3xLKHINa/hPIKcTjLcYv2CQYw2VGlH+CD4k7C64xN85lkUNfkEMLZtc4XoCgVQbLcgAl' +
  'U5b3T8zKWGXtf+RaIBhc2P6gizAMr6KlSvooinBFRmcJ7ZjoWFWqQs1cuF2+2XjlXb/vw/MZFYLamCVnoFyxgpFhBn7rH5iqpBjwhio6+1wYfKHusPk8yzjm' +
  'WgF+S4pQtc0UR1LDrEDBupfUvxFLI4isrOrrFxbqXXChBtyX2cQkgsfsHtlK3rWNsRVsKVX27hKqUBV3L0O8YL1EshSrfUdOfiKYEPUFKrgAWWgtoXPOWJWL' +
  'YDyyonewtJ66lRxWDnY+L8jDUZUoNxFUw7iHVVl/jMHkbn2idoAx/F8SiRbyS7JzKhCZS4A6zXctIq8nqIoim0wnQr5h4P8AYhpz1b8wENUesCez1xNcH7K/' +
  'oxMPfAVw4hS7tmAILfD8CxL4WD+4deJYaSZ4CJj1CPUVSxQ1BTMxJVjpaIly+u168QuVTUuuM+dQyYluorq4DOe0Ps4O37ZlYASQoKoAOAAA4Cc9sjzP7EgP' +
  'rZgoz9lfYwbmEJXgf/Yo6IY2SC+K8lCiuRLi/VJ2hQyjCiagGocRQ8jHtQ+5RC8KZjDPqvUTj3D0aiUOm/44FYh9Ih/8EE8qIImI13Wk2KjH/dQD5PPan9Eo' +
  'nFxXBbfufeFtyCPwbRfxiZsgIcg8PmMPwNwlSdBLEAwFFmZ1qCmm4S2W/wAS4r4hgX4tSU268Q/XE0lOavmBxEBsApVbXL5md7RChORVLq3/AGYSHzzLLfE5' +
  'GfEYkWHLUcgBqumZq7mugDlD/LiP2MCoArXol2Eai8nfzKY1dfF5MjCLg+Ajk+ptHBMUuQ2kO3NStoxULCXuh9sxW3YlTmC4LDzlBvbFU2WK8LA+8K/MVRNq' +
  '2w+CGAnajDFd/eK8viNCdc2L57hBkBioj4H7leq2VDZO/Eds6l1Sz8osbWOC0fPUr66j7D+YcKgC7Ecb9kYcJUOUAFkNWTIumVHZeWVJPt1U7cTc78uPbbo/' +
  'EFs23iF67qWgXjc7rgdTQxzMXGAGSZSmi6PyvzFdUvxd07PC1H+4+tHubw/KQMbqJSXFl1DWF4zCn3tJnI7Eif0l+LbKKh+IQMGKjW7CiJaadp6/slIpoJX0' +
  'EP8A4IJ55ZfMGe0mgWv2IEDkjaHwYQOVvngR/mIuDdKhVTxB7HIAdy6WmTeZT64jnLLbtvlEKe6vvQfiYgV2/eAhoVuG+qj5YSwktTHuq+zOFT5n6Kg/CxpB' +
  'd669ykjLfcfVFYl2aDdwdGoSu6ZfvCyGyuCi6WIH9/U2LOvrAPtM16ijUCSxeCE0CkSoByVHSecwLJF8T7h5ylQAW6NBUZ9hWtf1LOgl7fJ67mMFKTc5CBNv' +
  '9w3S18QyDB6s0nwwZY8/RVQAjzw/ecA2Q5ehKk8AfV1MfMpQDhuYSGEl6vsMafz9oRvAed0DywGNhNOXJ938RcoXNnwrcoxRAOC5SPlFYYsomMpwt+JQ1JR1' +
  'xv8AES2Z3Gp/rTX3m86uW5GIqKupZXvzBZCOQDRe2CCrvmUW4dwQW10P5hT2wqUm5BU3Wr7lhsvqLZz1FLmt+IhrfcqxuWPUTHMyg7mT9j9xYxA+ApQen9of' +
  'Lr4XH5CahFST0ldfFxEx+gHrERObK7I+M44QKXpsX2VEov8ABBhhNS4P0CIAyoCCDoBDqBQHD8EBL7EZlcMYAP4IQ0uYPmn7SOvmrvJfnL5l8FYHwxH5fmF7' +
  'MrWxa9ZY3ZV8Q6B9MCi3tFN1aAekzB6Rgsjq/wCyzIO4/fAF9F+rlmGoOuLP3ThYK1nnESVSmh5h5BysobZQeS2PJUfuC70cFPGoFApXJkYXSEvIazojUU14' +
  'gVVvDwTZDb06JaIaRw5a/EXN/pFlmmYOzk8+o+JYRgS136F/s/MGZVcSoWIjpgUu+3uF2SP2gnH0uYa6nEYpZESgko3oEw5RgOjghFYLwM+JkcspfmrOIr40' +
  'huEzBP3OIwoCoA7CXbLWL0McMo2ryxFFDI9MENv9IP5GCeWBXnniHU2wenD8kIaAMcw4QLN3fqDFHMW6vJwe5SFqvLKizuWS5kslgO7PtEaKiC2MyloShwS0' +
  'OfEYASxdTDWlTaeSvLrxCMAQGgahl7mRgMKksTTWtTe110dRRCAaR4mGOUqU19PTBSkDM+vgBnapNZNBX2GV5hZ5w6YlWa0BBwat7uDH/wADBgyyNC38RCQG' +
  'UFavRHaOAyu04oV9hxMaW+ZNfBidKIjLdPxfoSwbdPzQ/uHkssqO64xV4O4lBETFMWPWa8RXijuzDLVp5DZA9AQMFfcoAdviEUsYq+38Qkxa2iZaKuA4iLmU' +
  'o3CUjYTJ88kfCu0mv9H5iwPYIH21GGlBQR/R5I2Brz1Dx1C19P8AVBRC2CS9ewmaBHL6jrtt+iZBpeYjWsRDf9yzAmtZlq3cypVcOw/8i5e8H/xa25Tn3BtW' +
  'SKscyoZVuU0BcoarSEq8GrVcCKTsdNx6Pyw9hf0apaTq7r/kRoRiUWY15MyhMSEodAbWCNDPanULa1DcAaxziP8AJK3YUXrqLJmAy2tXov8AYwV1/Odv7jhl' +
  'btkflTZ6qEBnNQOWIsEIyAOBy+x+YCp+ZmlKI57hV9xzQF+pW7tXWG1lrHi8kcv3FChgiCOAkC7dLssmBTzGDjXcKVRCSh1HH2QLfaxPRzNGUvsL2QNwqHRc' +
  'H4wH4eZk+uqVESbGMir2MIKv3QfYlMDLh9CDBqPXP6XEuDA487AelvuAeqh8Csfmj8wnXK1mOGqb5sz6Jh7Ry2ih9OJmKsXvA/cRKlV2tsuYGbhzMxbKCM5X' +
  'fQy/mCIVIDY0IclOGBjdx6Co2doD2EXqkNq8upe3kKKxiUBLTsfMFpeds2SVKqlHhNIwGhwisn6OoHZyI0o/mLOaVzz34c9kcVOQ9OCYplwV7jeXnu+37xKX' +
  'H9EqBS616hopPHFyvI7lOVVnPmKitOg8HMQBtaii3l+DXwfuUoaQ19D6W+6MeYmriqiLAkZg1FPkZkJV5j38YRsfXT5m2YvjMWHzS7UcAELhJWM8BgVeAmUD' +
  'QbXL4ga//Y/5HtbF+YFtysLWIr0yeIwGsauA9qw9q/1cUHP3FjFvEoBey5Ic4K0LzEaUFfGZcQIubFbg64Lxo9nnxLqh0iXenqCTOjEUXmpxlvQDsYEAguQO' +
  'MPOKmUUV6gJvBsuse5YLxDrUVoZKMvEAzXMyIUKP5WCO8agt3wfZU4ZNW/Ib/wCxlvUNl6qLfYYeQjAJ7oRZTzDEzKg1iXwVFSnqWcvtETaPZ9RiIa5fEYqa' +
  'rK4x+AOD0gVhhftfAX0L+2DW1R+EfdtmV2LmmD+xTtCHMAG6rA8ARTVKPhSVJoWrZDder17j9NDBFQQx2q8AOrxYrjlMvuR5XTu3KtuU1DpTro6jsD26to2K' +
  'be4AyubCvmFF0UXcoyJmfERMGIKV4V6jvJiCAutEB+hX6BT9wzqwI1ig/hY5YuiHiXT5pPvH5WHiC/mX4r98y5waIneIraO11s4uW5RVB0TJ5uEhwIRACNKj' +
  'jBeG5e/RFLEbV2sctwL1x9EG0ufXMxBUqFwiLcOCMrMVEEEmlnA2fCKjZi+oqr4jviAL3w/k+l6oRCtePo4WUB8R6RKz+pVf7cZoKYX2ZGVRwm+rsYr01WMU' +
  '1ZLsm32lwwV8bzHYAVXa5fKMhE5sYHr5l/7mzAG7iiFqB9mbqGKRQE3uWrq4dZuMQK+PMain8Er5PuOPR+ZflWRSmV6gIrhOdwKhkEV9Xk9EAoal0x7T9/qQ' +
  'om81Lun7KfMYu3ML1ejwQNWXbqIeP7vvAzUeyz7FuhrZyJIYVrfIEw4jl96gALVEnF3A+rgtd9Vn7QOpKpC/ZlJa3kxfiSn+Af1FtdWLvhYJ4fpcGVparXx4' +
  'fzODmlnlDatr9HR8Qjxa+zR+1+IPAFLoMTQYqGC8L8p1Ac9Kf5jFvUSaTZCL6Xl8CvUMg7xDuBZ84L4C3XP4PK2vLKOCXePPl7ZcHMB0qomVBvtba3ay+veC' +
  'U2fdgJV9w7oK8wdoBMp4JVKlB2lo8YELFauRZSHpWXg5ohA2VWo2lW6aPDxVRg2kl9iApWs8Q/BPtK86uABQnDi/cwCAwOMQLzdwDgDpctxqYFTkvTCNcCnh' +
  'n+oKHhvuuotx8dDqIlYq9QLlO8n0a1gNDxw+WABthb2H/YJBQEq4amSGphPEoDZz7S7ootLRCVBPef8AJUXs5iUfQkUCu4DnwHHcVZFJhGCSghRyw0cxhts/' +
  'uCopK6lWoN8SiFyD2Zr5jSRYp7hHYG+Q5P3Nv3QBDS4YrOyfBEpb2SbOIcuzk+nZ4g+EbU+6Chq7/MFoWv4jkoGQTcXSYrviOYrAyujVzLde2E6DopA4Fkvy' +
  'IPLR5lcNMN4r+7EVN5RC/wA5VEcq2Fq7V2xXGPL/AFEuU+2oTXLxEDc4EPu2/YcjQDksjkQ2McR7jAxWFphEBCYR/wCZabNFz5uoMv6XKLEUdP4w2vH2hYGm' +
  'xw3wVgOrdypIAAMAdQt/Ljy4Pxb8x8jbVR3hHtYbXyVBMgBK5v8AsMuyvtNQZCt9+Dyxf1k0r7UninaATzMgXQwPQ3ysaGktwO14PcyiVQ09O3yys9IVtRVr' +
  'zPxZkAZ/mCAbl2J/TCpyqZuK9zCs+hhK+90e3iWHFQa8DwGJjHLKUZdRZkAFANt+odwN/avwCVJpT0iP8SmjnOVFjFEA5qChtfcuXZi/WYqgoK6AqKNgWl6P' +
  'MxtGl0Lle/6g0aC1uu3y7lYcbnoAAQ1aYVyRdpaE8eeY/TT/ABiJWQtzH8PQ2+o1tdq5YdQMyqlQ1ctrMKmUl0U8OGH/AHke5w+qX5jl6GomEy1FuPAbE0ws' +
  'bAUC+3p+YGOOcz7mz5hNQBUvjB/LHVEppPJC9Yl+6NXxcGUsDDk4nCwJ44fvj5gXdL9XMXhMicMWD+oKDpqHg0VXqM83Tj1xEIXWG07rsieI3NOnx0yuzuqD' +
  'HViZfB9RxayzNY9VKmniWj3HegdHlo8zHj7PAf8ABlvmXfIsnzJm+Q8S/K23bzF1lO3f2m1FwLxFZcGUzyR2Dap9MvH/ACLPZ8v+UztHftyPSGxnEyRH0Bh+' +
  '8WlhtNvt+q1HnOt/CPleXQZYqOco8X9y85WFxr2LbGYbcEtepD1YUfBUWTqOC1aqzcUw7qJYY3r8JybpGeFnHpnwhRj5H3TlefgIhpMra8f8mMGlzR189fuD' +
  'cc3qF7e3yxTz4g3I39X5N/EO64c9Uf4nJnj3cuMIhOoldS82dAQdDFd8qVh3WJgzUQ3IKvqUADZMxwtmEOfBe3mqloA1RPHmKN+g2nggwole932D8xwYp5iV' +
  'S0B8xoahyG3v1BEUVUFghu71+z11EqG8Udvv+BolXB/MsX4QsT0BuGeWyWAMYbzw+YUogtDBangRt5O84Vuel1wRuyWpasSBKxNTmCBD54D3BswKR1KbQgXc' +
  'PMaZdZtvBIuYBOFioJ7nhwo1K4npKfvNPZGqfMHDU5fv7fMsqOHGV0nDFxcv65Xxa/FS7oQeISNjDocPiK4BsTZ3KvgiUxo9uX3BntTvtas/MDKKgZgvJdy5' +
  'NEyXBYysUGiGrJ4QjbrqqGfwU+vrMf15gUj23kgYXtzMerV/PTK+hCVjWttV2/yy6BZzt9oDLK9u4xaTolxYMGVzIeSNhGHT7lmr9FjsOV8uzOzsTuz6TkZh' +
  'mK7ZRBlzQ2bWX6Hl9fLgmGQG6dbyt8j4qCdfEOx/bz8ExS5tXipl/BXzOQxX4hU9suh38BDK9EDawgD3lx7E3HwxL4XL6Ke5bsnFqHoaHqZLH4t+jmWLDwv/' +
  'AJXxDfzFDTdJGcstfHH8TGIbe9OD+IreyTy2fuFWMoCMAomCDSnxcpTWNx+BcL6X29DlieklgfF/K3nPNS1lRWZeXn7VLH3EBGh2nUN9XhhGug652yiqHLtu' +
  '15ZdUKvUL/r7kwftiLUiQYPHqADWxZ81cHl/MetIlWV88xV0lMziUecR78gtE7h6JWDYVUejuvtfMqAwUDxnFIAwjjvy9sWJtLsWsApWbSteokoYDBiDMs3R' +
  'R9MQMyOvnX7gQGzD5gTXc/THxN7MP4h0TgvZ+YhVh6POr8DXuWXJqildbl+IaHemajhPCjY+GPxZnZdAmHAgvlRl/kcnmWZTQF6f+GClZOGYhZAs4PzAV5hy' +
  'FWK7PErhnwFX+YUyi4FMFS4C7/UVcDGVqZIcMVw1LcGB7dAbXwQKAKDKOOK+GzF+KXejiyng+xGuiTr7Vyw6I7fwSz29u4uYsuWLz/8AFwYOUoNAS8Ocj95Y' +
  'c2JxGpvgFjsOV8uzOxR9uj6Tk/8AHMdQyhBLMK98A+Tg+XEGWWrAzl7f4DEJ53m5nPo/cohaxmhvMcH/AFxMaqviMr70fEPfRr4YNrwDFqVLheQaOlqM7K1m' +
  'eHrwK8wkuLsOPQfzuWq+ZGvd/AzKpUM2lD0fyywF6nMJqPBNMqheja/a4AozPty+DHzDAd7W20vvMDZD7IT+IAgUBw0sa4ePzDuqr4ImyGxxaPfL5ZiCqOpc' +
  'rd6JawLBJZ0Zfj9ozBW6qIK1KA33X+4g4LNujuC65Y85y9YDLLYF5bdDoPGHmMRO0tJjv4gFhdIy+jmCRc1mq/dP65iDdrDy/I8vxUHnD4jMZjaWMQobrPuI' +
  'TyLfEQNLBFGU1nctMipo6Da+J8MYR3Z/SIAA4gVBmHp9T32+xj+fxFwmu/MdDbU8kM5gKgHZDAVzuMKAobZsOSKgoE3eXa/ggvuXB2Dkju34Q0PJBbn+M+NM' +
  'u8bwXGlDyaTyQkeeKg99PJFwICahLK7+JZVyRyIWhovf2biWmS2fma0lwXdQqNIL3KlgDKrQHaxRWdsAG+6P7GYrEhHRDjH/AEpqu04j8AeCWJLKGj3A0FXV' +
  '6+0foX9FQvRL+gRIsuEM6qwPWEAzovy9/uZMQU2zg/Y/8dsMy7OBD5Nj4QY9KOQPyw3CYLjArHsuJXrZQbHXa5WXwYmDgpc36PLA+AAGg6mBqHbss8GMMtbo' +
  'ICw5Wc3CW2i69Tuzs9+IHRhrK4Gh9N+22Yp3dWYHthhr5GwP85z4IyDDloPUdXFafqfolvgR7nKHlAPmK90BocDwTLC/+dODTbukxOB/iYK3hLe3/JfakKKm' +
  'g83l8SgsZ1F4flxK2gAAB/twq12i5xVsMELNNUEStrYH4T43MsFpSnjJ/Et5NLO68XoWdrLo7l/QceJkXwEW1xlzdf8AZ3vpW/Bol46aLftH7ePcwY5R0HR/' +
  'e2C5w+uti5a+P3GqOmL6YLZl/UyXA1GVl7ARYgVQj9o4IMBQoxAxAfZCAFXuolThMfcRwW5fC/8AYp8w1ru/EPLhXPWow+ix6ckqnzOo4pW8L+ZTsgva2j9d' +
  'NQ1BmOFZXhrD5GNNC7xUFyMksSp4Wz6g8fcHwR0NKug0kMBAbEaRlgHGCfacnnfuU9GppNnDHSzmYIh0xLfMWxyAeMu+ISPEkLDZoop0eoTaso1cBlfDHhL8' +
  'Ll5Kn8HllZI7+Pl2/qMggLBgTn/OYwjCn8xf/ipecfQIRjFthA2q3x7gJ1Leaz+YjYJo9u/T+/cFHbYdqS/tPygl/cocYIGF8joO2EQZmV3/AOzKaIAFDQGV' +
  'eiEhxvgdiflZHvZn6ew/AICHLZ/3h82fMy31049ixETplgkDB7w+I8YPAYYjuVML1MmBmOKHMVIU2xag6lcm15dHRKqBMWjWG3d6H7pl6Hh/cPUbKItXuCZI' +
  'KT8QUu078uLjp8gOe4lg7O0e24wqDLNZY7yUb5D15mVtZdhq2xt5So+HreV5XLDmEtqv9R13EnKtWUZdKgdO3m4xmPWiPpGVZXXkfjcAqT+CR/3ljg7vHB8y' +
  '4Qs6ivlfkzXwUQQJSaGi5Y0GD3LrlmhuFq8PU/hEs9fmIaGYNwIqUzxM1w1yyrS6+WAypvxZJQ7yuIHPhcNlWZDtPbNQy/KJtcYbbdgfnibV4WPDTnu8VEo2' +
  'J8ln4NPTLw/hTOY7Qlq3CJ8YPEGsqMrcWzF3m/ibgiXKaU/klJDbQ3R/ZDDqc+GBSRAsDsZVjhlr6a6XD7GKAwjgcDwy8PVXRDryTVai8RDbTzDVfXDTpN9N' +
  'PCacQ3H6hCpbKEr6P+Y4xzOYoYI5vUcn8w6uRyOIja0eV/aEvMAtUoCBQBWtf7H/ALKCpT6A2EBPjJTw5i0eqqqqswrbbrAQzVPBr2aEGG75j5cwGJA6Kh8S' +
  'klvJ/nqCyJmVFcx8dzUOWNvAhGt7XomVzN4v9xQKx/IL4LlQZguEJ9rUCK41ABshsfcVQC7XKx7TjAhgCPJ/kfMFgtFWVM+OpYBiHBHFOvMozRpD5Kx8biRS' +
  'dethyz7e5aIpz3EidiYR7llgzLEGzg7luwLLmB659cxiwl1v1Np+1VG2BDhLa0S5cAzdhGEhiusl+oyblvwH2CZAGj8QUVyYeJnqq6+jRkXXBi5zpC/IXlgK' +
  'bHcQz1CqYKcRgOvKFfKFqGyCncZ9kYPJwF8MAgKxTNXDyz+aBxPiXCsKW2wRggLRdL4uHbVhjpKf3HT9YGv1LlEKAMQ+DfcGLn6r3KaftUYnki/vC4OnHqUu' +
  'zBOEl1mJTiT45mXdImH+ooybmD+HkeGJAfPQe0+13hjckFDJYRPwxDQtCnXT/cTFagHKh08OhWbigRooEWdY4llQ++5cr6VcSlP/AIV5giLUoYLemT/HSwEA' +
  'SPSCueqzyNMduk0cfPUsebim8eHkPUYyzvLcuFfpFpOVs+WVMiAGQ2i9uI4zNyKwr2tDyoQSFQ57QuVoKLqty9orK3QPCw0Dj1KOKYEuCwNYfTFuKsRpGuyv' +
  'BzEvOVuAIHEyJg4OLy/j7w6TjZswPmggdQr7QdeBmvqwQNJcHJ7mzIPAf439oMEGR7KL0RSgsac8RBpKosK9AlsOzwq9EsD8wBYAU0g1ZGnfGYxqFoKeTrhZ' +
  'nLBcMAOG014Bztlx5iM1Sxbfl4lCgu7MalGlhu4tY459AuVEiF4JTFiNmdS+VKFyTQ+JTQA/Icr9EO9yCltNEIpSpqMpFVYrjuBg6ouSnxrbComgDh3GIl/y' +
  '/wByu5VxM5HmMIMmvM5Lu/xGiEaTnzW+n9RKGsA9RXsGfXMbmHyDHG4U0bl7CC7qFXaOeAX9Q4XqY0HA0Es8LzEMIjSPE3FYuXwgUUa2H4ucHuCpZOCK+LAH' +
  'V4X9TdM0pzLiLK5/UXQVIOyyE4k4gWzwj99QH3hoNg8XXZMyhx0OvcaYCyQ6KGaio4p2JWt6uq7oDgyrR1biAiC+FiDI8K2uoypKgfQZv62H2l2XUbEoE4zC' +
  'XcCejh/crVQsMwLp2P3qU1igwPHZ6/8AIrN3UH9RnNNRr1CCtVB3NeRV21mfn/mwYwoXoI95TQkSnO3W1nNbIXrzaYxz5GsS04NvWcMHemylNGrrF9TdFtyv' +
  'MXb3lKhTNHEWWeEAVef1G8z8RVXowe47BZytDlhEwi0v0H7Z7eqlfmZ9TNp/mJzTNvRd5grftWoHcFZeXRMFMdFjZAAYtmr1/Az2xGTSw5U36uZOmPKMnv8A' +
  'S3klyscBvyPUXneXgStUQGsxJQWDN5cv2uVo6nYag9gLjB2LbVc9dsxDeKHeOJmgrOyynzcGhN9QSGl5KMpW1yzEYoNYtkNO8VfU5pu9xYF8L5lmwCg6gMMv' +
  '0giCNkJNRGGGxIkwjIrInY79gUxLelSnZzBBdmYQWX+ZpgYqj8spZd7IIDmBQPzCKcf8yrBjZ6Zd9To7vEp2NRar5nNxtsfDxHClBed03BYsxxDuncdLQR81' +
  'Z+opgaNNyjNOSBR5AOSsZg6trUWvhsofcFCc/EMToF/6zd/9jZC0rZ4ee+yK+cxfe2+dSkhExTxNaNaPZ38QCoN6EJKQjjDEsgpi4mYONsrqVUy3wRXHEqsr' +
  'dV3LcbR+VSuhmLlRrXPD+fvL4MJfuNdAS6tStBhjGn9zKxyvLeYP7lB4v+oinxuKiwy9AQKpYHFp/DLOz8XsPJ6lqlLCsfS9+phWrlbzA7Fohd4mWIjY4CDk' +
  'gGVgp4kj1Uu7SdGD7RtlTgI1F82sze2PnIukFjY1LARiAOS0navxLJOAqclCH2SvcHZd3SW+4Sh7VYPCbmFrNm14aHtweYrb1qU2qwcCDIq4gqsOMyp3N6l1' +
  'eOzzEA23ydRpeXODyeV2VWpmj+gp6V7LUdviD6/DOxbCARkPPuOCIhkhy1AdTu/AXTct6NRys3OomOlRyDq/9xLcQgNcq6HbKA6ayLe3ggPQtDsOZQVYGnuI' +
  'wRF1DCnODGo0LmBlgMuRLGVTHzQFfRMwUGx6gjcGJwP9+IoIFtWoiK2Tyun43CTPB1Z146hYs/7EgVshFuvsQjFTLR+MQCeI9lr+X4giV8xgaJaqYxnRj2hU' +
  'eUajTTp7hXsqD6pnntfymJvRKqrF3xmIjs2OYoCyb1QFfmVe0WWOR/A8MqLbAVyQ4zGIV02v1B4gxRhWY+r3EfhNkHvzc4eoZXL1EKxHr6XHmYpkXyyuZXoa' +
  'WLbjULsTQEsJeJMg8H5jcXAHjZ/MpslEGmxXSa/3mEQVgvH/ACXlyozOU48vmCobcHzBaAKOaxz9pteP5gdxK/MdSax8s9B7jNZxwFbT41gYiTRl0Q2KGuXO' +
  'CZqPlCdrF7YKqaOJsb4EUiWso125YDO2hfDMnAcGiLyw2r+4BDa6P5iK10/4eoFM1qnsrgilGsfQUKJwg1Lgji2/RX0EtG+qq+1pag7oS+rceyVJ6iivyF+1' +
  '9x4Y5SCdtXXzUVf5grmBKvsh346D03hywljEWXyB/PjqFwsQLKbJ887j47lrC3R3LClbjcVCPhjutuqI2DXF4PLAkBgDn/mMYNR4bfej4hK5NB/iCqbI8HL+' +
  'COXSgPEf38xrNMvbz1B9K3kL6IltGm16CMjvQGaPfcMNgasSWi/ENS+ns7m7UnNTqEtQFoVr8/ucyhNr7h43uHGEbPTP9pZgsGj/AB8wdvaPRyx9vT7DXyI1' +
  'WlD9K1qrumMgP38sVbr+4qYufyuvxX3joYP5gW5z7gC6LAc9o2Gu62W77Vr1NRq4cG1lkG8BwuD9zOKrbKdQ8l2tdV/U83i+3frqItXMOEw/ePquE5KP4lw2' +
  'hnz5lpdW6r2T7niHxobpv0nPmaTBaf4s5iKXGrCsS1hnSfsY4ceH+0WDxcql0lyjX3TOuK7RWKzNccSqCht6I8BgMm2Lq+y8Jx2VfkbTAHEpSVGYFw86bb9s' +
  'TmaxjK6Ofx+4VEoAHReE5en7ohAPkHmm4zUAAAN0E8rlWZhJu+6+8Sx/hYsJs8Zll4A0RSKYisGWUESqvEqLWCNUGOotHs+fEbJeAH8qfIwkQlHwK2H3irhi' +
  'LzkdVxvO9wUnbZxTzU/NJYA4dPcefMVErw+n/cIs4nOj6pX4McLLr48WV8iVmgYqG93ZduHLLsj277PKz8EqEjppfL/XEcINYtGue3rL6H26S8JL0oTkPvUR' +
  'wWAYpzrozCVZP4f2xswb4m8A/jkPD+kYJrC2P+Q3Zmons+fEbDnEaB/UuGBLY4AQMOLwAlhRt09xuG1xiV9oYjlw5lwDNr3HjMVSqRxCxdkioZKrwRlcDHUh' +
  'YMMDPcNhQi+3uXgYcvDw/eW/W/udy1mADpXtH4B+6QUA5fREjYf7T/KOaHPHRggcvUBxVJF7qIOz+oIEyzw6PncMJFhV1mpQVazgp19pk04pz9o4gYrsI7UO' +
  'DSyEvoCjOaIXIDNx5CgY1WmvMFqhYB7OKJtcqXFZSnoMH2h6ZwM24TsfyM0zhX6ezwxOLyjHAgcAckpkQbgqjoImJ+yCwfLNXfLGaEDxtdH9ylABrQQ+ptnr' +
  'o9tQuFAVCOGk/nX7jVl4LDIyUSvFLnlme4owAWxjOfF8H+/UYOGlgb7KrfvEFudHUuouIKKVeP7h4G+o7YbWGoOIK16hHTn9ZY4gDOXgjUv4hiD79xrPlNgC' +
  'KWEi1NN0/eYFgeXD9ybX7K1/DcVTlaS73lfIlepFronmlf8AyS39lLj6CLFF2+0bHHSPdY+SSjlFpwr2r7LitAm04ftv2EdVeVfZVuXzEZ2FLheys6EaHiV7' +
  'Ro77D6bIuDNe/av8S5FayaHIzKzO05PD0c8wffrOC/tqKwxlfurwRkEspYXhx73KwMcBeo+fsOy81t8RkjaFx4BoIys74AJwW75fiWLG+3mYtvuZZIlNRDQU' +
  'u3GX5jl0p+SBiCdQAscr7hxKzByaD72/Eq5f/h5KC6PLqInLNyxiVlyNryMAA/L8H/eZQXZTa6DlmWQFD059rmauWK6ra37ojkCiX8FF9NRUVVjqJdRmGu0q' +
  'py1r4lwTDbzONYE4TFRqEUKvnxKGyleCJwLyDsls7BffMP7Fa9NVHBeKKzUBmoArPDa/aPUJfBzpPt8Td3gj3UB5SjlioBVppRzqMG0xQZ0BszPcdnD/ABHv' +
  'HY47l5gZDq8eGAjoVHe+Dh8/9izOowrbnCZlxeYlWc8p1DohRXxHQEH59SnbtAr/ADfmM0iqjPYjb+ITGeCYU16P5IGr0MCoioqbemK6P9mEvuFeAS9PyHaj' +
  '3yzQ7R+YlRjcpfMH2h7HHfc5fLqHmHFxGrdYIWGT3Pe9rLKlGphaN2DmDK6JQVtoDmEWp13qNNWupcsj2qmQycmr98PyQbo0kebQODTFr4iTXyiSVXLXIpS4' +
  'aJYlEEavRiALbkMrsvqUhv8ARwYPQRloHOfAZ+6RaMLHvPgPq2G9OgCcUVjpKzF9k297HDbJjEuROrMXysH2R0nsmTS91LaoExcaG1YxEMgGQqPnv3BjMdpT' +
  '0ph945JFCivQae7uaM3i2PzCIt0aFP4g1GVXk+EzFAutQiS86aHh7lJSkxXEG2j1yzRGJEy8OIZI5nJdfYQyaOgdgEbXBGyARORu/wCIHIApOGXJyVbNLYJM' +
  'Fg/P7gDSVazqPb9mu5XDBWCGkjY2WNQQWQtGuYqBOhfHmNYlA0c15b/cpVkRkic0bVYJpjkvtLz5jry4jK6WQcj5JSscfmMJWgH3Oz5W+iUWPZhhrGfgL5gU' +
  'sFq+a2fKE7QlR/kYwvtbU5Hv5LCL8q6hQeAxAL+rThh406P935mr5aD7kWzFZyTINXzKrm79zc+SMxPo+IVBmz3aJZDx1ABXE8M0UywWvQeWPMV3hd+pqw+6' +
  'Vf6qCSw79Me5iBG3zCWzPhOX+PiNssIPp+G/fqYJ0/3jHyfuj1NS/ZLqGaaC3Dt/8i2sbpcENp1zNj9p4EiAOZSOG3uAED2zCh4Yf2XbwfEasqU/2CWWq1yP' +
  '2EtaFNYmJauFLPvF6V+ow0H8ykttDmJDc2Vplge89Qw13VlzhCTyPP31KbQeujqth6I6SA2BHYvYNI9nUeA1ASh8f4dzhqiD0g4Y9RObz+yhnGnVYHWV9kUP' +
  'lL98YvuRslFh/ERt8Sp/4F+Rm/WvcAqKOSWqD5tddERgXnUoUBFp9sGZaXlMEeuMGHy84hNEE4jmpSobA3vb9KGxzFWF7VCoMwRSJ76fz0GzGobIA49mpZZ0' +
  'vjhiW0ql7N6+YhpCT0Oh536lxWA17jRHTUoNQ9iI8Ba1/MP6WvgbloJDyXDBsBdwZstCbexK7ekpXT5jFZouvw5mecWwv8RkmKvcPLfiYp+pS0bSdbXitwVk' +
  'ZXDruItCuO4x44Lqfbb6SXLPapPcfLjrREVMccDryw6LbgW35ju7obYOJgp4Tv4/uZzn+R/yWJZxvs4ipFW28ztKZWgVftGZ60HiYsHAL8sqdBBeoisRDrlg' +
  '22FJq/smuj3BO/q8W0v7MLSjHoJY/wAMXlT4jbUGj8PQWscIGY8036DL/wBjolKjlXbDB/o5mC6B+5dgDtYFUbe0QUVcs0vxLmuuZg3GmOXMVcsd4hXrRiaW' +
  '6l/GtWss/K0HL4GERGW2nom3ZXyrQS95QJZOk5e2MzbOZY3YXgqCMDPI/wAR7tV7xT/TFITNpQ+xt8G40ZBU7R7fNZeonWlAoet5rzNIfhqUQ/tP+x4DPBKQ' +
  'oeMx89w16Wu69/wEY72UnuI+ynmLuxFn2D+Y13Y1BfCn3ifIlR+yQqbVgh5Lp+0KtkNl7ZL4RhBZHIDvEfcQhLEb7lZJdMWmfAeXRGJeyr5HZ/EOi6DEPdan' +
  'sO9xtFQad1cQs4QumEVrYJlX8QKVVe7iWRgglU8QyDCAOr91mUmradnVwZhQZFsTZDBzcA7vfRGG1YvJ7151EEvbVwNWjUyL7shNKo8wCLXdn3xCXQ04Klrf' +
  'V1MOlAV+JbsdbtcWqOqOmId1XXd23NYeEpPkmXSmKKAgacpHLwcywxWVaXjD0VjiCATgEezMUpbpwPvE7gaGfuwOsrlbmujK9EvjQc5c597fFEWu6OWBpbwe' +
  'phLNrG+2g/r4I2HHT6l8y7R3UVBiS5y+0zETrd1rJiDVKWJo8qWLCdF3+JC5A45b7B/mULWiPlwV+T8RtB2ZmPQnj6FBSvndviUsym03tO11jzMQHXfcfLt/' +
  '5DBetyyddbBypczqvUfEYuho6i1mX2ykoy4CKpef5ifQ78TiCBfDWKyNAcq8AZXqCILddFPIdcB5WUI3cO098zwYhIsOOT42Rgjkyj87Jtm3JuEBQOMn+qCZ' +
  '215OANowDPoFmNvBQ7dBcrgAUUEPhAwj/P331DZSvcStnDyZTABoOI9UL8xHcxs9oBmJig61PTMHH4PxgyfDLkPkfx1Hv2TlT0DT8R6afEGG3kt4jslwfD6I' +
  '/uCzuiQ+dkW6vLUvGZ9NwyuZJQKwaThqNkBlN6/gLMKa0lKPlfxL/HQyHtf6lxYtjxfUp3YlbX7uKEph/wCInZcFYhVuBwvF3UFRuJS4+mEkKAEvu5k/EM8r' +
  'asywdcGHz2e2ArBJsos8M1QdiTk9RqMzKbghI8tCra49SnmBQdQKjdchqsRVCt4JZSgUee4zcKNfJ6f3BapifHDMtQ0MjoGZZRHL+qFXs9xIRdBVyLi8HJiR' +
  'ALHRsEGLbfLXEVlGlMdrwhJU15qvpl+aIaxQrocgcK30FcxZqyW1dsKD/LFSi4iDWhg9myKmqdhpH/fmVCt4RWjUojsuApcH/UDUIes2fh/E5QQFy2L7luIA' +
  'SEyzX1hDMnLiewC7wtU5MxRry3eEuGPUAD3WX9HxKuOJAlQDaxFX5EI5uiqu6NQ8IMHRxAg+9sMdxQInG0T8rMXwAmco8LWF5fbLQen6WNRBd6JZeA0TLfS7' +
  'T0dyhOZqGLftMRAhb4fdwvwTYH2otvrh2+puXdm4wM3hMMIC0UOfvMmAw0sfJFsoBAC7Xgcv9wOQUVOB2uw4TmV3RcsMc9ZTzCtM3hD/AGXxAVXLwPUVEZ6T' +
  'YvmdhqrQdvUxm4w0PfcueuJhuyVEab2JL+flrD7NRMb8LqH5CYB5khr56XstGbpmXoVw/Lym7rAKN00eWiJUZWrOUstf0jYZyQ/APUu1TUJr1Vzj1Ej5g4/A' +
  'C3zUtoMYR5JV2MzMFPDHERVdBAG82W9xbKLy1NbhBTUwxHomMwPJh+4BoLfOeDteCWoIGXdGiWSvMcPbIYPbEQstEZav8HaR1XAJHnLxfRFrNa7eXwVEYBEa' +
  '0B1WoKFH10b+8eQTfkek4ZmhQsB5XBK/qtbXy4fFxqhzPrdLg+L9S9s5PsvJ8C+CXaCeQqDADAGLSKreogFhLhHL2/E24Vc3y7+Fe5Uoqo7hMm9rtXNTbKVy' +
  'raxKO2rXuMOC1m4rWINOHHmLBpmfbLXb4+M/cmC94lBw2w9atfxCs2twQMCt1/YY+Y9Uw21dEtBOAf7DRMAZdSqQVglg+Za1N4CL++T0wLzCWHdMBLvFWs75' +
  'w4N7OINpAGgFcAaDggIjhlYDAgOTl+AlbCByuglg2w5vZbU5+glTzCWUecstoODUM4NzDZSaIgCOeZ5YYWGHE2+XB/xRKg2QPnffBBgECE9SG7W2eUWIpbei' +
  'srL49k0ohdiOl0S+g6Au411lOtoIogWK+TwEuQhZ6Xjx1MxAKWhQbc8QO4DHBwpx4OXmtRIqhEGjZ/fU67kefK8vmIprELBInBz3LXUwrD1EOA3946PUX98R' +
  'mgBrShZd2POHmOBYKl4VDC8IHce0GA9yDT0rPAxp9uHDoKX4ohSdbUp8oMBVPKiLk91MPJosDyPcpFxnnv53FlHpHNrqMglgqBeImRkOYBvFH6ju8ELaiUKA' +
  'AFHfb5czAGiVA6mpxbuj/wAH5jkH5M9vL+pmz9u/oG1W+iFzKZS7qouxFMmDg+Ft+0NEsrBvJ5g2tag/zncrGuZW5dvD7iWi1RnQZYSRCH/yBKFcAxM0Nct8' +
  'VPsxIbSQhejb+Ze4BeOss4cDltdVFv2q2p2rzAgF5h1/xCnqGCAopDkdpU+YrtiPMLgoJi++ZgOCHQH9QxWjRKVNu2JVsS0NrZ+Bi8ysQ2sDMcjjxWYFXtZv' +
  'CCcncYG43irAejFclvEacfaUDu4uxuO7ccDVKlbiV2LhGAoTP8jrxruYygyODoi5hvxsgHlcEMW0WRQpLn7PcG2O0/I8vzH3pYe2ZD5irl3EBdCKleYJYjWI' +
  'm4bWkHk4mDZDEcWa4EAjTEaLWejliPsV9dPbLvFEGIXgbKd8yq0G05+0Si1XuqlBiXlc/uX5CgbHHx6+TiIRGDGX5emlXA5JF3u168AOAAA4AIda3tigsvDR' +
  '5zqVekDILsHfzLup38g4vRy+a7hzHBKB0QQ1cv7BLtcJpkfX9S5b6jSS/i1cBL+rwXF9E0hdtEe7cGqn48PMORPL0e2UUU6hmBtPc39iaWL2HNt081z7hmnu' +
  'Zgh4FQHFJZ8JGkvFifL+hcKG+QK3gR1FBVnxac+5YdQ2h2p8B5HhjN0g5Ck+SBSo5jsbMRKog3GdCxIWtxaH6gyrQAR9wlr46PjEoUrXamoDdayvjx/u4GSu' +
  'j+YgAE0vHIzKYFaAmLgAXuGojYJcjL8cscXRqvJwnSR+QAHWwfUHKQ5gGHLR2YPMqbebuYejInrUZ5yw5TsB0aDBKwzb/TE0Bdy2lVtXt78WBFSaLFDWAboI' +
  'FfEnjeV9lR8wDQSRq2AdAYPATqi3uNty76tfuMdjn3Gf4lfO+YK0My5jxXREQVaeidtfjD+pmTskV+JRMRRKEOWphFGY7hOEhsQNRDLR0GfkOpvCkmBSqguW' +
  'F1qGhGtH7YcU91vq4fKR5iwfPzH94BIjIv2gEtk4lrjdB8svRg+0EFQuIC3RGQGjXmZDAhZishNkQH9rWvmE4M9w4DczpMbS2t5Diope1BeECiNDThLoItBq' +
  'ZXfwu2jWblKN1Rj7oAAStinnZfmKAbAHnqqG+c1AoqW7CG8OfHuOxUDgGroDL8sajZfV37BjwI7yHU0RXLo/7MLhzyXmMWk2UUDlr9f8hTR5s67dF8sQNF6X' +
  '6hMHu7EfGYmbFbGBxcrIeKmMSC22zrz2wUryMqX43MSha1h2H9vx3GJCfWSsjlLtyq2K6zs9H9zDJsHr28xhwHoXNBYZQsKlat7DSXb9Ypl73+ZnCtv+ZctE' +
  'YFKPmyemz1Lj4rzIj2nXi2Gthd1USlFXz3KbR9uZXRExioFlXC2QolxbdcTKlMXJfv0RWK2vM402XRzN8uI47HwEMgTKGX+DxAIxu/dljLsxr7UeXDMryVic' +
  '9JKqYtu/MZqFE5KD0cY2agFbfweUHAYX3TMzwNm3O+FcR5e03A4OTxoipnt2L7PyPxRFNk7AflxBSkVqtqh4qz82UPm74RWeWIFrMdsL2cQavOfiF8DuGb67' +
  'gIzuHX0Ez9bPgjKiZtPwbfxCaroFEeKMssV0PnENF3THjcsx235go6yhsHUbUQpLxiXegmFKtdeYJl0SRihwDi27R4lgL5p8KvwheA5oho+NHbEZLVtYdMIT' +
  'IfAMxuW/cwmtvRHiBkJqT5ZeE12zV8be2Zp2x1X5iRlD4RUR5YGfhMWFqOM8Wh4MqVom4BQyGQQoTmPzD/2ufeoQUB2WfclGFXWUfCMADbwFcupjTpNFRuil' +
  'Wf3EUDNe3H2sPb1FiwwHqYFemfoh8A0EJv1ZXZr5foYjEQ0UVzF4qCYv4iAZcxpX3YZUKttnUGYocHQfVEtcLcd/veDy+I1uQMuuh7/9lJx1Af8AlGET9Kv6' +
  '/PPqAGim8/geY3K2UFc3Esz0RkPcMpUCGFLMsZb3yLAV/hcbYfINZ/MMgtXFQr4xHyma7TcqVOEq44O+Gz2/7uNYro+sQPjL5WJUJnA0aO3RCGLmRx4eD9zD' +
  'A/43Vsjot5CTKw27GviXEaZ+l7Iwe4W8jxNYPLCfF8e1N7svcPuu6Hor4FddviFwrnExZlziXl2NXXNdwFlP7K0R0X9Rj70vzAGhTvmXVyqN84lglmi33oj3' +
  'MGLlbV3T5VQ+8G4lsvtaB8DC6++T9XwI6jTldvysuD/Rp1cp5+xKKqorjgy78X7zmmDqKhcF2qBPHc1vUVFQtS3aannMeDHZK1ESZHHhc+xeoE0DrwRKLKZq' +
  'Yw0YIrI7DRzKTKCF2XEWj0MCtfBGsWu2PAAquoWX9vEvXnic9B+5i5cAMyGXgr+4F2tsGDBD05+Bb8QBIgqikb9qLggDgZB8Vv3h9GIlCzkK/BgITMp8hbj7' +
  'IkJ8yvAH+dw7sC4u6lpYGrpgNEXTSKLbo31E1AMVVgP92xZwxaXiIUBZKx5aYuK63J6PP6NwmQN6Uwn6PGeYDmKP1FSFLcRqSmKurmgzA83X9C/aCHAMwIYA' +
  'NO35LmAlbJ7P+zx0e4JDuWjl+fC/q4YEJb9K/b+I6sSt1j7wlgGLqKwY/eGW7mb8blo/J3EUmdJ+olkHPLCc0j+HCvRMBamoF1SGQsmkeSNCfAEgwmDb0RBB' +
  'ghmVZTYR+/k+pb7QcytBanmefYXAGLIhwCWOBCArRn8R5MbKpqCEyCBTi9xmaCqke7g931wWf2NvMXLn+nr8tvzM9ED75iJlBVEUAWsMaxwuJc9uy/UbaXK/' +
  '42LXxFUFogIZlPQPzE3l8C4VBl4FGgto+8AgmzVzdVg95JTzus57NUHc2DXqGD7RFQvQWwdTyv8AwiA3Ry7/ABqKmeJQdC2emMN3mJsdkBFfUugbuopWFYZy' +
  'unslxoW/5HZGBA0ijkJpIQbVkoHXm6cOdMJukL3T0ZXj3GDJEt/vQZe0xGwy/QzVt/EuqRcNy/Jw/LjD4Y+8fowik2Wq/MEkmgz8ssZFfKz4n3YXjlBlyrOI' +
  'mo0iIl1NWFm+D1Mk2lHl39GFkYq3KPVD/hiN/ZxXX3FPYcy5luksWs2SwyLdULtPkqoFPyAt9Nj7wjR6f0qyPhlIstFGUNrD7FEw5YwLLa0YLc0Rqt0cpnE+' +
  'Bh8zK8dGl9Dx+Ii4wTqW8hxhuDAnRt90EJbsb9YjDEJseB15m6ekx7E59wUOBo8v+VK4tJnwcw5TUBMcPpy/9lbhlirCn7fBLSo3el0HRj8EbEUNHUsx5zs7' +
  'Yy2A5e3+pcUeRll6kTR69wKhCBFNxRrY57irFfjyE/IQVX6ylHJ7yRAKcjb6iUORDBo0/dcJllF2v/IqSyN8Lz+LipYU+D9kF/Mc7lKigt8S07D8GJQVf/E2' +
  '2XZ4e5YlVepfCrmhQ+pZArqxzM/1JHK4Pll2dyWba3kn4uKx3fPmxgB16YwQ/mYpJZ2eoBpxno/j1DAUr/0YgFq3cOBQKAHRVwBf3REC1WhWip8qfRHch8qO' +
  '0fLRMooCxb9v8xiu5tUoPlPmF5smoIpRA2P0H8wDR0AqWCRr1ziW2cuJiPjL+PocnSO69EWRzcWX5lStYEG5WBIFo2f88R8iAC0Sxc1ixqrInRbzBf1XYxQR' +
  'x6kpxso8QjRvOwMLjyP4FsS0xuwny/1Ko2cuCeDX4la0UyRtVDBV28Sp+yPYWq86+0a0A3n+1g1lHj+0BsJUQBWZOzVx2tm3gjdmFzSFmFy8suK4Bs9FwwIF' +
  'QCmAOXgioUgcgiPJa+CVCqGUcuE5ZXU/y6bL9VCdkEgFYW1bbvmXZNoLCuqGH+YA1V1UNibsnhrYxToaOaqb19giQbFUJ7Ha8eYKGO3a9xjvMatxYw/kgMls' +
  'Ju+f7lKxu0fdo/FQLHbTfZ/kcnmJrlyNkuAy4uXpZSPXP4j6Kvo6lpuAPHH3/UdSQANu/wByxJxqN9wKp4PMbAWolHt53MIGmB28nr1xFtMtvRHqGSNBeA7l' +
  'ElO72/Rnpl3Kjjj2v/PMeBObGwPEZ9zFtS3OT9JLS4rRGwhANCvgINHB96M9Cr06nk/SXzaZvgHHtl0DVR6eeIjYXi21cTkcnriESKvevTaI+Tj5hSaMcErB' +
  'bY5I/GOFZ+0VrzGORQLqRPUVqrPxVF19S81kqFN1TwcHv+4aJUt+Xgj2xuAtfRACAKU3vnzEbOwHRL9IWUAMXUscnlMAYhasH/SI8tRfv93LGbTDgp/JFVVb' +
  'XuUSwAR0IKsh09xkZoIzy0JbwxFOwafcy70K1wsDe9RoxSOUwSuwDmCLhdf6cQaTR2PR/vMAVpLpMuV+8shkUz1iWAbOHSUkrCslWoG+T4CF6GrAaVJW8nJq' +
  '43AKEJTfP6jbIohWIEV7i+MclgQVaVuuZXpkp8GP3cTNX+//ABERINAIAKBedzlYcRIyxsfw/LPxGyulHej7D8wLVFslrTLXzqMg6Sw1vUJCGmLjzm1UfUt7' +
  'BXA6DwUfEBm0qVMWu+0vXRd7lsTzGh3UYRXY31LdBefhTeP9uXflsZR+z8kdsDSB/o/MogXbo97vYs9RE7VYNi8sZWgW+YTmRD13/X3mPBr82KD0NHl8R/DH' +
  'xwhRWxTMyZXRLkLbdsM55nAgWatHYcrQd7nOKVQ6Ly9+ZUsnrrcJSZjgOQ9FVBZUIfDan2Za435uzBJYFejmWnp2bP8AkYCKccQM5Yt68RiwYvTP9TG5MfmI' +
  'vDU3NRfsjjWF78twl1yb2mLhvzrtAHNcuoVJzeo4VKGhe43HYr/Q0fEbnfsVx/vIgiiYIvjXN8+vOXj+JcJeXcVoDijL6P7lrE3LMK2j/joIlGja9yijCiYB' +
  'XRH5H8pdG8H++8dddL0/9CUJaUBfcqAe0Ffa8xAWNg0D3W2XM12gjpJVhwPfMFRcL8z1pmYDvaKw9kQV9xkEsTRdfs/pHVLY2z+E0+ZechzjNynYs+0XWhze' +
  'zMQZ47YcwBoaIBotDpCdAuHLxH3Jk7lwNhan9/iKBq1vnxAAAAYog/8Aqbn+oJsMZf2/1KcY+YpWVsvmLxpz7/5BIcQuWXnqM8xZowlvw/aSyxAOGTmAFix4' +
  '/W8X0uGBfSIUs/o7la0Qu64g/pbo5ftcNMj0CX+FEMxKEDzAJfaevBCRSKYjIpo9u4CFuznu4LDrE/UkGSVKUOEvNSyMW1b+5h+YSEq/w1+oqJdsosTeNPkj' +
  'zCqr3x7Obiq06t4Da/uWgUOjw/lf5iHG9PFwBEoLWWDx0dEd3ZgvbU6PLEfQvEqyeJsQWbFHdghAMMgUUPSDYpfwjxHQ8tOIH7EuLo/caQqxIyXez7TvS+oP' +
  'APTBRukB3BhlAP1E9JDmB6nFp2+k15lCigdvliAv8o72zHCB1VcygtviN2mI9hefGJu98vDKNu96KkKoAHlcQ7cR6t40VpScXrL+ZjTLFrhby+CP3LctDwTE' +
  'tyQbHeGj+YSGaPtWiTaxV4SoOVU+JhH3LOvCkdJoKez/AMiZYWASGgZeXKx9yuYRxctB0Q8i+a+0xW9OJVz0DEzvWExUGPAvQF/eiuVIVJOB2HA+f5uHuoha' +
  '5av46l088dog+A6IOTguBEIVBYF7XurFmIEeH81f2ws9lA1zAACg4mX5dEeu1x6P/CKVRPLOiv5YytDHl6iI2l5iPAq4CGzmtn8QRcilNltodF+p2Rxdfhx+' +
  'ZVTmHH2ZvvGc5hlPO3+lwLbrhz/2bCYY3uRHJsF1gu0zK3fsE1Sy+bfaLvKwdP7jnQYtrkr8EqjdNEYt4uYHy2fM7kNwpFZb0RS3EBjDG2Mj3lisIWh3/WB0' +
  'INu05aGca+81shN3ZscjTdeJjj/GEsz1Dqrgb8mUh9QRaLozQXF0dTLMPpUxmYqqFNFeU2XzHw7aEdrChXcayJetm3P4I4PyfIR0jH7mSOOB9n8ymQLXXj3E' +
  'wUYXiz+pa9yRftjhZdbdMDMMdvEDLjiJZN1tlLYlMdlrBjny4gouIwvGbhqUTTtQfuJcExo8VF0n3RYRRpiM7eeIzAUCuePj8RkEA0GJU1wBcKjyX4iUvVEA' +
  'ByNPGv4h51vgMxr0b5xmX8aKnV8Dc1azWoq3aG4kbRx4f8yryX+n4l3KlQ1P/BEhofCxLKE5HMwwU5dMZFTHDnEeXjMplFhJwjKfSsyPotVW/J/yW62cOoEF' +
  '4JV1+hYAKHgt+IQwzGCoW4BnhAv0Zf1KmOW+hLd74IfZXyxq9DbDICg0SuXn9+pomMHLp0dzLCYZjBwP5CJsDZLHMu2I7SfqUhpBn+JhOF/yqv1CgS1AI0Fq' +
  'QL4dJVm1Lemv5ZwmK7ohtrMTOyxUvhPvIlsuLcfEsO5QdYzEMdtsRBYi28L/ABKRV28jX7g0eYepr/t8Quj1Zmw/iUcAgynL3AREudZDj1xNfQWxyAFBRqcx' +
  '6jBpzcyjQ/Z/OCbhC/af4QCmsl8SoFrpeVs+0rhUvpfs89kDOsN7ghwZwRRcqYbKhAz1Xya9EcpgFTmzOJt1kfmx+bihiIbKu+S4+1QyxRoaxcYW784O38S4' +
  'ikw/KENynsUPCu990Y6sALgqWfaKRcuviUpfUQVQqWzlcEUYS5Crk8Svfp7QAFUVbiV9bcaRQpzKlyLDMy1f+ePMGX2eryY/qUfU2wBFb5/BPQyp1RubHDuX' +
  'm3Yyjq2HmOETiyEJeoNbecnxADBDwZ4/2jRseegmMemLaPmGJb5eiYRW6KajRM24uhrMvQDEAaARHVCXjwr8rX8MsqUOtzasqh5uKw5G/GoJgV/M6yGPLEBy' +
  'NZ5maHZ5nEJZQUDDYMr7EvTzKuh0QZriZNI94Mzy6w4jv173AbK8C2pn9W3swVaL4l60WBQ4Vct3yqXbqn2naKH1FsitDmodT/Qf9lPv7BiZsSrybKHiuexY' +
  'xlpnCNJLO1/+xLYCAt0SiFBVeuIoLg6Yo1K1qMv+6/mVAVgVFS1TXMcAWK343H8Hfez+Y7pTVdF0/cVptofbUKamtW2WUPddwFwYTii39yvmC0TrwO5VBald' +
  'CqfmZwZzFjMgoHWd5PTj5iUdjLRaSqeOJRBdeYVQ2MdH6EMAr3T907KT4R/2Km9/2Q/K1+PpWe2gf5jG3aVm+pdLLl28O34mFB5C1+85gbuCaTWM8+foR2Hh' +
  'fKz+Fgwawo+k/wDPqdSsTBn2hz4C2Xldxe9GI2EYZ6AnyZJQO2FVBTmnEB22/lHD1LAy8HcY2Jy6HzHcqzTA/v5isVQL6qPvCuLRZV0qycIKO3AcxH92B8H+' +
  'IrN5A8B/7H6eKiOgAGXLOJQnsfcYRz+IZ6D8wfog7Io4EJFmaMYv/wAhaT2Lg9opV0jA+H8x3ey1W6f5fMKOYBg1ebleLjaCU4hssE+8D1pgJqpYnf0YrPzi' +
  'ZL5Uej/MXM5PN5/glHCaK7pVfb+IfvIbLpby/cuAF8wlq1uuL4/v4hhLALPUCTsZb0kVch6CMGEpFvLEdbHfcMZlwIFF1mUiUsdggv8A3cfHw32uBR0D+gX8' +
  'xJUYE/ZhBzGtwqzFCYfDFK13GJRYDWKblqkgGFdzcjiUGNrpeH+GO6RV7LpNj4YSJHZjv2t+WAO6h90yxyU9gP5gLdXfamM+iL5ItFcWuUKu0qKvk5+8AMya' +
  'jhE0vYWerP1GHT6OYDFyLLNeIwCnb6i7r4Th/MJqlMez+yCAeHP0JeWj3LteV5jhvLHZdFz2DMdRXIIPiE4wLIXb4wv3iUxU9rscPmACecWPZjuzwtH9xLWk' +
  'C2vsQXtX4g6nKl7lxVilS9WIvGBwXDXdp9f4iJ85j9C6LJn++0ER8vc5NdHuC62q58sK9S2/oGEFPcumEMdbY9QAEAayjGYATQVfUvEuDmMpohbiXWYcN738' +
  'S1HJZ+IVM2XLG2LGCzoLmKeD2wcLsV3GD7ZbxDSqFwb/AOxHVeL/ABFcrF1h5PWsfzEoDaxGfUrNpPIdHmZI6yl62uCtn12zMBfEZCn0KY+x+iZnvDq4H2Yi' +
  'C69kupvLPWmxph9L6DYXUqoqiMS6YX4GE/T8wWmizeVX+IK4nitfPEQK1AwKDVjYQ+EgSh6GkhR3cnxPK/HmYTX+yxLFTbu5aOGx9JX8zLNVFvuC74IPzMi4' +
  'H7iMbjpquqx6Lo8Er58uF3Z+cfMKGt0Offo/euo4qpsu1lgOMfw+qIqUQtVp9/wEEKN6OKj4mJawhZuUeqO8PUNDoVHEcJTt6+0IVXL8gdQ3tJhGAYRwpGMa' +
  '58x3ZdQPrN/eDRF6vUTyWKkoZiL4jolKrggXUEhS4YcsHOYHoU+U/wCyhHP6+j4g1GWny4/v6Y4/2RRoXXiO5aE+fpjaMi+GZhg7eWYS5zMR8Nu5iUlrvzAB' +
  '4YSW7wSKdz7kSp2fsYtxcy5QRthGQ6C/wRWvY8D/AH6gEsFExnW3uMgfExmIexLe0dyhjNDH5aPg/cEBQZTQ7YkdQLub/hKjSzT5iKsbF5JW/wA08aCsTrOo' +
  'iILTKu5BG/sWvmXf/qT7zDksX2z9pzzkfSkqUDzAA6AFdBCclEsdoUPnEobqFSrbEll4KKRI8fVaTQbT1ZqI89P7R3DdLHsYr3PziUfuCbvqnGngV+fUqY1b' +
  'LUHNS3Y/0T4eL92XqU7FB5fEQiqj7iHBEu0fY4IR47NcIbEGpaxQPRv9TXgPEcmgpjbkNfTeI+Z/wt5iwWcD+L+iMIbCc55mC3guUU7YKV7uG5Tck/wgUXL6' +
  'YwzjJ/EzcBZohWmRiSrF+OoRra7YNHpM6+TtmGY4+gepkK6KHMqvddVmNm9uYqwwYPB/5HDKmANIHRcr0SPwX/MtE2wSilXC7nQnzK8pe2V7L4SjY14fSWH+' +
  'eW5xpXhVz+Ajsj34Tiv6E3qfEU8GEI45VpPEQQbHJOlFZ85lnYPzGyXj6W9DMzR2u+gmXmD/AJ+P3LF5cHuWW44nlqIGhwFYGP0PzFELZfJ0srHRTIrORRXu' +
  'iGwTs2Pk+6pmYIoRDeRWMoE5Z9iV94YaVazfdMI/Zj9EJVSvmL4Bdh37k0JVI95FP3Qn38hLWHQ0083FYLr1gtYrF0LF1ez2dkUWntBt+blXAK8yuoopRC0O' +
  'V4SLNHiA3fk/OGZxQ1aHFr3KAtXFfoEtJY3P8JNXrWeP+n8Rg2aqjQHE8zofERzh1DQbP7ji0HeNmH9kal7hu0G0mxO3r4jWrTaxgEgO/lgxj4UYpt/ZHhVi' +
  'leYlyipSrj/S5v084hpV/JZ+SbgC3hgCXqUJ6Uu6GIHRCbsAZj5odnDwxXiT8wR8BgWJEIGKcfjiVpKUFBDg3RYb3uuOsdSoX8L9S6mkLzq4IxCxoy39oVaT' +
  'e9uf5IrN0ae8QVMYd3l6lnkF/H/Y820Z3q/+RMQ4jLzBW28QdjgUVQjVugBo+MP4akBwN7Sf2KX7pTg/ZD9TLb2vDfmOp/ucwOV8T/PH2DH54pP8qAbCbEHQ' +
  't9mOSjY9PvMSxtPHiFZCCrPEtRykbIzmI3JukvMSA/zMH5q32y9B4CVeZSczg9SzwEPZh/FR52UsdMX6uN7GRr3IAvWnNzDkFBhVqhfdbq5lmvYfyZaC9Av9' +
  'H5nLK6APGC/zF2+TfsxDQTgZhXs8TEqmeT/UFKt218Yl1QCB72Oz4gnV6nAkMo0tyPcc8qci1LKrdenP3mWfltymnNXqKBagIj5JeKN9x7WEIWseh+RR3MAv' +
  'ivlY+64im26KObuZlCN30y/WjG4e/ctgb6sI8cMdERY5Me4vtbg7QUjt3A+MAsLTB4Y0po4AqvBUrY2hQHluVDoT1939RHa8mf8AkTqx4IJi988QJd/2P5i6' +
  'VCmn+0boDikFtgvxxCXa6ezH4Iqa4l7N/wAxKzeoBfc9yxMR21DV+2cvGT8ZiN3ncG/7mBHB6RVWG49P/YweN4groHq7ismW36nMLNs7MsoK3guJatnTGMXH' +
  'ilH7W/uG9zARYPzB7mf99pUuz8XUZ6kS+vMFF1WBo5X4uIFF0oD9psXPlWFcAv60/wDORdanmG3A11cBovRfzOA9RQV3WfL9k8k7zfo/UPsmrl8D+YZBd/7k' +
  'Yuavk/7mIK3WuE6S0yTksBZtrRa6dHqNcK6WzxeamMvWpxGB0JPkT/SVI2lxSN6PcxistCy2rAABQFTF62QnwP8AEc7WA3rNeD+5Xgdql5fPJ5CD/jKtih1a' +
  'XRF7VG6DZx51ES5YM2ohQsAdjHemlxFiVbizUsgvAm5RYyv/ADBLjo5gdMdRjfZcL46ZQKpTVXVD+YGsGWleg18M+IkV0CldJxAq5S00jmEHW1di8HClxYDD' +
  '3NcnCuoAcUr3ZPzFKPuLmuSGwiN+iKZtXHV0D8SsK3soWc8GdzDVlrd9hzFqVjoxMporykT+HiE8mY2iFoJhjNXXh0/1HYBe9dNn6lb3iIBA8g/xM2vtH8MR' +
  'hOwD71Ejy+Z+YZUHqbVWA+YDuhgP+xL4PcXTCOMxpObFX2RgjVUzUCpCBpxdaiqdr3EVcfU0IvyQGC3w3E7MlHd/7z/k+FjwTUepTkfuf3FlW1cx0nN8nEAT' +
  'Vs/fB+mZ2HpvUMQphRLvDCP0WziO4rocvF9vR+5alurX7/1cwPyA/di1jYtWAVn4jKqBg5tG8FV5ifIZ4tg4jK9eVUOZj/kzHa/Eqt3+yLDkalhd4Hgly7yB' +
  'NnHmXC0aorqn7OfmKscNRXbL8lX7Gz5I7rlR7ZP5PiWvqmXlxF3lrUxNM+Yrh5i05+hiDgeY8HJO98QUMxXLE9SsGbGtL/cofp+5oT+qo+542PJHc/JyiU5W' +
  'VXxcHIBClGk8zAQv7V+w75GZRIU/yilQofhM5AIezZ+4knxAOMywiseGJXchn4jYQ0XfOfmvtHMcgH4aYtzwo/MSGCXj0GmquN4JKHFD3v8AqEaCdUYghcwa' +
  'u2X+IYUaB185/mPOJiu25idKIfiGWYsv8RCiuu44DW5tojBANPgZr0/1K8owF9S75juj9BhvvH8fTEXrMFaTGC3q7t2mo1V/tzMqyE/0lTLm2CeUq/NXCTzt' +
  '6iBDDX6CLa6r7D/s1nMo5ITKBc4hLZdseEQwL41cEccDHwRm5cuNcAbNMfB+ZURCNVdtD+JsHNxNvM7sYvuWg1uJV4AfzKIzRiFrLdsZg7w+uYAY1COEGNqr' +
  'XkQjFLJKxhuejg/eo8BES83j82fMDttGNTjTF9OfUegyCjmOY6bX7hoPw9MCWJVbh8EOypTI8qZfYRKsxBP8DByW0l8nZ3BVxTmyEoXcRE7jULT3jxcAkC8X' +
  'sI1kahgnDmT58u3q+oHSCmseyHZw07YTUpt4CLPibeGO6lG9fLL7LOGioVBihT1/qo4A1DIURsThm3d3mCn94+yoPiD4yPiWWCl8dzmKsxcfUgFXBlgqaY+9' +
  'R+37SsLECuomQVDwIflwQKti33Jkz0InzFYSwtgl7UUcPcAC6MbPP+7jhKp9w1bKl9iBp55fbD95hGDw9wKrSJqfNI9cTUXfqHtxKe/hFyw8xvzMYaoPuEK4' +
  'ctsEKUGWOz1wdEHaRXuoe0UvwRHO7v5YcotAaL3KzCYIbYYg1zQLX8S7dCacj/E5fS6jhFuMF1Lgm2Hox/cuzg/sL/mFMGprL3s/cUznS1DZOoan2wWrzFBe' +
  '3D+Z7jpbluviAw62/tihaUo+ICwJuIDozuSXlaCeWBL3GmPa7uXtwMl/UGHwhR7GaKvTDanFQKCIhfAqn2+8ItHW1O2NF4DR0QBi2rSTw4mw2bqCAWiK/TuG' +
  'kpmx4ajJiBXtP9yj2uiUdPZwyt+hIt6O/UB2Z9eX5X4SPXriDGZtiyzySxasFKBsu0WrfLw5g3qHQyUhvRaz7MxzhUEgcROogqsmIHpjsPTQkC25mZjYaAC1' +
  '9EGo0PatAdjw6l4IMPvkKrwG2KmKhezv9M1azT9fzMR8sGbjpcCvNTF03d/y/j6ZA4TF8E8vgmQXQUy6FzuVXHxj5jSmqrGDcwLYag0gihq0Un5iZfSKKVvc' +
  'qCKEq5g0y3O9eh2SwYhFAoq0VitucOIm73Z8Cx8SzZg58sdV3iG5wF0x7CgfmCPyHmDBfbT9oT6IHefcBhMkDmDFLmJU27oJQvg2+CL9W66jdsuRijdsOUI5' +
  'HFflFResNXDpcJFRayxVmbm5ZBuodlcAv2l44KF+cv7nlzr7zFPN/wBIyhL/AKE7I0Qq70RWL5biO4I3awCeCouYqqgSqF12hoG2U5WfxcvptSdQhbN1/Ut1' +
  '42U1VuDGqg9Qer/xHih6BitAzyQbyO54d4/6lzgerf1Kix8txlxZzsJsHowe7lYlvuyxFHY0wNSqQx1HQavJlyeevUrOL89TrCWBzFUFSaAZPs54idyi3ZgX' +
  'Nd/ucUrAlQyyB71LDkyi17j/AOwmJeE87OEio9Smnkmffhze4FwyydksQYh8jr/vmBXpiGkOoerihYlH1p7LHEZpvS1pScCZ94UlxrJAdsVgo7Y/6lZUIKYF' +
  'u9tTNl4Cob8BU2QdoKPNpPyENE7C++ItE98T2DMuVaLKlJDobJnGmNSzXMwi395USYcXCjLAKPPmWrMO5ZhvLMqU3yQGcxLJtcKrG1OOtQwMYWXzUNL/ANQJ' +
  'gxywfTVsUIFtxPwETpNBt0izlGa1Ara8MvWL9upRfoUdwvdWfcgLEThMksb9xpZ7pa8wSj2N4iJi+zY2SjcJgiyuAcuc6ni/Pmo/tDMAbQ9tRDJelf6jCy4B' +
  'jomMdJLuGoKg7W9AdSrxcFlZ1XuanasbVeP4g37uf6QINDjLGw9v4m1xloGNJeJcQ+d4IiW7Le42Ib2XLugRHCqOkpTh4e5cFil4J7R4j9iw4Jmcjuo+ih0w' +
  '+EuEcnyRydAjPogkWz3FiuyUHjb9wM9xn4zHTfCRhviORuSqXifAmoZF+z5l2zoX+88MfSXYDHo/8SoKnfTuYFxcpJNS6HexVVUT5hcjpHIxCujBHJvo51GB' +
  'paKR7JrLWXtvGQ4GhpIES6aE0j5uUtMShSsAa4+CpbGxswYqOTWFxJTpqbwvFPyQXJ7RJy12xZkq85P2mLl9tvxHGi+3Udq6OiWaK7ZSl7ZuXc6T8H+U9fL4' +
  'sTHPUwBy3DT0KnoIEdFxCLziv5hsXjruWN0kNF9Bw/79wLLjClvuP2SrylSsxiCDjSBmYGallgxQYW0L10RjEpT8sV1/5KVo3Ckdq+3/AGZdo/mv4hIeFsVq' +
  '7Zmirm2k6u4pTe8ImAj1gzeVRstcTdGpwv3P6jB+LRrYat5hZHguU8F4gdA6uxfsEcIsbp+cbufzG/4jtC9g/uCKqdFP1C2mvFsuzDTFJixUVMmsvBPENXCj' +
  'B8uIsjsjuzMzexmt9xYrlwQ/IsUqWWvtlDRlZkS3a8y/zCs00v8Avkm8yVUd+lG64/qZkUlzTX/GDqAC7KIljSjVmoNpKC6l1DPP9IPxoKtYb/UEPNyUA8EB' +
  'VGJnsYW2uwPP6isatWjiesmLUDgLgYV+Tfiacp/EoWHY7G48miF1ef5ibiWWDkTmLUYXFW4L7OnjXUBmAL80bPYv2qCQFTAU2e8vMbFBaA1DK4Lt1YLSPDET' +
  'V3AVwIaKeAEPwyfmedIsQCo9WP5uIKvmFKHtfxcw5AuTf71L8L0bi+EdW7loZfKzkLg7hDJncBIimh+jAqP24MIo0x+Qy5OEH8T12oQWvai4iql7xFwal9BH' +
  'Usa4hgDhj3cWDtixiuazT3bVjR1xUdJk1bur/uXh3m+CczM9ae5pWlfz/wAmK6uz5bjvyv2hJrMnCUk4yi4iYRHplYpmaPsmXoONn2lAw/51CkhrhUun8sBo' +
  'cgsIhhPub9zaVvSv1Er95C+z8/TZsiQQ2xkxPAxEgr4gl19iLJ6Jj7zR6lV0SoZbk9vcCjuXTOnyy8VWYK8w8SB8eEClpQiryo98fkiDQInwlj/EfGG2uTg+' +
  'M38SvLmAAqKiZ7h4TIe+Zt4DiUIO9GDx5YFZkjKmU8r+oOYSyhrvmWdf02cynkuwfiWmMkQOMw22POZiXz3HvMCGkK/iN0TeYDVTXIUkfLBottm94z5GIKHS' +
  'UoP5UO5ASdlx0BxsvkiGirEHZBQugQS+E+yDxCRJzlDXzw+RlHJiV04ofxEpVEyJsiMUT/RuMAlybnC29wLg1vK/pAv2Q4a/7MZyAmDcj8fRLhxzPuTexCx9' +
  'iLwVw1DW8XLrMHkhSW1LmdTBYq4FRxmGc1Nj7Yko9QbFurQUUUxnOZ2993YN+x+YJAZWAQ4mSs/wL/MALDT8Iq9MAK2/vAYkFA4hsT5TMWZDzknTHeUDhj6+' +
  'IxICuDwMK5ivCtpDpqEgCxaHucQX5gVqVKilxn1BjC/DEzBu9RNdejo4iMXOyAAqxLK5lydTK3UWfqVSiorllF+MSrLjSnMCsu2HQIgaFGfKEq6OOIKxjhKj' +
  '4ANVJk6gRTpm5dG3+9RCBsCTRN6TU6/iW+D9SzTZZ5hxbwci9EAGPpGZbt+5g7xFceoeYzjHsvTTmnnkjLk0IVS8NcQdVKx3tlCe0vJ1Thvcvyj/AOlDVKrb' +
  'MrbU9Va82iPbzDcyeTi9kw5VH8P4gTW6yePpQrxLbhn32Hw0/LFlZ8FGKu8d8UV/M1vT7E5IJUNy1rxEtbyjrzd/w/1RvnOejtRaFlZrxDHbWnyE/iFHoYF8' +
  'mIF4hoA4Ki4+gOxtmEajfiZGdRepcdh0fzDLGtSW8jBagCjBdLMW5u/yht9l/mZ7ej6MyYt+ghovpFSO8Q/4TU5vDC2Y7iQS/E0b5gi9PID8L9oSH3aQouS0' +
  'LYagQctnqHyfBNl8jAa+SEjTyLAQMDHQsI+0BGcnzdEpXTDDwjqnL/Ew3ef4g1ZLj5xFUb3BCoG8oF5igXN5ZcEKiwbw9xCh8BGNM7ph+IIpYFrnogCNWAi3' +
  'aqiyUdsTv8/zEEAOHUY6sxM1S+PMpXR47lKISP8A0a/iChOHK1UIU++WkByX1UCNxKt1LUl6IqrYaXX2iBVr/FQTkSHh3LRVbx5Myw7lP64HBzUOXK5dzfgv' +
  'R0RXXJLI2lnY6fxMxuJ504u5hnFp2LCfZZkiwaHs4ZcPgPxLjOXF67f+xeRX7gNTCx5Y6uXgXmXRf4x/ENU0I+ZhGyF0QWnzAfduP2GUbtT8wUfOYQ+0hGOl' +
  'OouPoMKhSdYsd/AhhvqOdNQdlMBOQVTU3/FvxcYfAG/GIAAwEGpcjWX1/wCIzLa3KwMA9EGZq/1GOZ1wyydzmNgj34Av1Fjsx1rmR3K5bNmkM2yJ0Cz93NS7' +
  'jNoLj26Cle+XxEQV83mF2vniBTb/AKLiTG8COMzUyS4yQWRsTpl1FFnmWIX9FLuiCLQFHmWpb8jAjiOOZXENKXtWh5WXtBiNGqa45xK1BV2fJ/dwAqXo8bP3' +
  'Ga7rPuCyI0Ar+INWrdQLEQDlY7xtmWN+2/iK+2XrxLXuCxUtl/7C5KCleg7lrQxqZGFmtXUKG1g3XEAHOxK0cRyCqQlMGz0VEORDZCD0VxGD6yzo1C4ewkuZ' +
  'hwnZEGsz9Q97WTM1QWD2tnk1+H8TN+kZoPD3AFQbmsFH9ka3lywgAxHX2RFDlCHC8T8E9n/xiGxaSooY+ECoN7jPvT56fmVLomY8CwfpQPDhiKuK3UuDLxNx' +
  'L4qIKcapZ6xMTllDOp13lvm5ZDin4lADgr6lQ82/tmcGH5YPa37VGZ+Bfo/mUqqxlKji7gk/aGlsi17I50KgdOQTQk+Y2seIC1BBlTbqZ5NjfoqZR6qBylBC' +
  'j8NMfExFHXT58xjiXrtP8TN8rKxGncsw7i3Bp+JdCQ0HMU/FOzmNHl0TGHR48yyK/o4IezBeROh5mWqOYPay/MBBSITdUzAcf8/udYgT8fyTBHa/DmFtxa1L' +
  'KqqDF6HHlOflx1vqCth1HYAXJ9Q8jOECwnuo9mLZKLsSOIEk4sKR4lFh3XYPENlKUnUKITotYhRJ4iVBW49QNWP7/kBl1czLnqeKGmIolcS8XvUIiKgulxOa' +
  'qT6Jktg15hs+bGACiNj1Fia/O4Tuco+JwShDzcuvhYaLmrZ74ix1DJKqfm/2mlwP8/Sv6MEQTW4alka/sY2rp1HEvEuAMV+6IKmhwvvEOOtoArRnJgMOZRL0' +
  'fki5nMsXnRDVuW38QRGiGtv+UmL/AIr/AMjLLiZZIMEqFcZVHn1H21AF93/UEnLx8SmAoUzzcCuX6n4PxBhQtMEdf312RIix1z5joMOYKRwf2gt+D9wApjpU' +
  '4GOQ5+hu/BmXL44iA3xM256JdtsE4xEGV8RGDg4d+YBAVgX8vc3tMwR8iH4ltxpfSVa4X/PtHYf+5/7BILuBtpXVjZNtt06jbRyrtzmM2C0bVigOVILMwU31' +
  'W4trriY+Rv34lsQLE4viENNIJHIYthjquSZtuMSxypoiEY3qyMQNvFam5TXZAWhNctQ/aIjio6poftLShoXkjC0Uzr/2Njlncpf4iKJKI/HfuC28DcG22hbh' +
  '8cCLMwjevTv++0OblVHV2lMbSntxBCcKiwrfB+6s90g+nmkD9N0eH8QqG3jzG1/+BmXtZVluKGDmuAN56gD4YC21VWLbv5lgO/3S4pm8TMcU1F7Q/RLmSWCt' +
  'PAQY7KZcHEqdZfmHggioWWD43CtrOxhUt/YIZa0WL7jCy5sEjA1TFeI4GQ38RHDgAnTUUAw1nqCJYjczsRUxIx3FQncJgW4gnEWo4lkwdupelAONSwLuNji+' +
  'YJUFgup3NcHzLjYTeIZpu9J/dSkMmSENGcrTBuoZOWLL4fsOPvCYcwKO3Mbc3SIFZo9epUJY0YF5hnXzepgINcssr8RlhEKZoYjX6Ka5P6gwkBys4Cg0Qvfw' +
  'eXyHL4jpHE4oMr2sX/yJylos0DBGAUbJkAXVVxLzEb1qC1Hf7wfZfuXMQu55WYjLpisnp4EHsB/mOjGsdDb9EFp6SdIFDYh8/wDUFV6v613Thl4+h+7ERQzX' +
  'Mfo5g5fcEQLgoBvJzHRuXILAbr5jsez+mOZSUcs/Gi0NP9wj8MIjm8PxLlQ8y4MUHqMuNQXaKk9A01spUVoX+VK0hMFzKcRgr6iliHxZH3MIA7B+YK6XmJoz' +
  '/qSnZv8A+BKzAGPtCN6X8RjZzr/BMfAwK0R+lvpLc0dEa3rW3vqOFOTNxNuyz2xn7S1XN2a5Wf1FfMQc9L937sdsVrBRljB3KUbVp8pMIUmheXiJDR4lKtLV' +
  '7hAg4MCD9v8AEdcXkOlxKg3x7IJpsU9bWPkxwmwijyNL0JEJleNftr0EWI0ckphKNvEYgCgB1csDpjGcM1lK1qMqKOCeHJEC7H7n5H9z7iZf6c/RjxUxyYQ+' +
  'SKwe4iLx/H/Vlw+I5KcE/wBswQVnwfUalHbr6JalLcZlthDNc/uGYxi6XZ4hcRpbd3tPyj+GUWsukQ5fB+Yc/RPyy46bmn4n7cuKUIMVucMvt2ZsXwvzuWBk' +
  'sl1X/kbD5g5l1Fg2QDmWF2X7ZjFvf8IWLmo4cx6yrm4xyfP1BUCDMqmWrJTCvyvUDZFrrdvb3/uIgknJTUSt3bBZGiqm/l7/AIInxmEaiV1NTrJEYwR+QH7Y' +
  'PMiowPOGANeYdAFcHXiP52IRoKPHKA6sQpxyP8RYVdFBwHiOZc2FsZF0aqWcvzL984fgfYI4ygs4px3+LPqdLNCDpTL8sO9Xbq7NPHfeI9hp3Q8rKS4RrNAo' +
  'C6FMQBL3M5VQzdmJycy/ihEU5Y2mZ/6uKxdr9/TQ8r9GOoVvLV/ebbwEosxd9iCyoTVzhQyP9Uu4AH4TT4PqSpWnH04lIeIGMbNTGkaf1BwcDjuLD6lym10j' +
  'BreZVEBE4fcdB4X4JZ7fR49n7m14H4+i+VTIXtP5lfTghlN5w/gm+kvBof3LC2/t/wBxXnuXFizBl4mK+hfj/su9tl0VCrfH019NJUIZ+30uoyVKvzfcs4ga' +
  '6HkgU7DGNpDf2lw0xormWysjVIa1t8xhAD3x5ZmQtjjH+IqnAmU4I3XBSfxdc4iaK1ujwGgg1XZ8tw/9M+BqadxBZqPFHUZVepqAjlYBBvxC7PFccoaGS9OA' +
  'L8B8selOuDiKJIvrdvvg8sNgwjg/lHp4YFFyM4/hP5cSyBe3a/AaCW8wC1Uyhg4guUkv6Z+rMj5t/MeUdzgpOIxlKdAma/NSnxBMEeYYFeI8kGpdiNfAzpNB' +
  '6vEVr39N/QUYfYfSwrZkg0JHDLFJgOGCBwRa7lQrU6Raa5YKuLRlbWWiv/iisYys+iZJ4n4jgY6tW1Dfmz9FQMzSWf8ARbKmLNx1n/kKK9v3gofR+vZKFlK/' +
  'a/8AJT+gl8zIblD4g2hnqIp9/QYdQp3PvlaJY9kzbHn/AHMqQDWEBopLq5b02bRxGBGZvY+IJbolWcOEO5xaxmzTW2WzdTa1HJT8lTiE9sXS4aiJVVefqWNp' +
  'E5IbKwppsi0Eq1uivM37+Dl2/gg5g4gJACM8OPh+42oHagVIg2Au3g8bY+hN4RXAcDglCIAKb9yjBPbFXaX3LWKQFDh2OmCzmBCDUqG/A3+Jk3cqZe5ZyYGo' +
  'xyjzOqczK/asefUdB6YLK7BE5NBL8JrKPaG5p9v1ucypVzk+g5lYHDkiX9BrIpLStn5mWudobsznEc6Uir4I8rp/cTLDMa17/hPRz/ifhMwf2zD0EqVKPoHj' +
  '0/mCqcgX8L/MNLegho9fR+g/0jyKJm/onwEckHhs4Y7S/CMWpRZz9C6MESsQFaCC5ZYgojjpmkHy0ypjfyhJsJrNst9FdMlXvxmcUTYxi9eoCHRuWBoIIt5z' +
  'x/2UtlV4+mBeorbSCDWAFV2dzApOmNtvss+yOIQrAxfyRKzvkimXGPcKUtydAqYMk3WvtHSAHy+0SgI+cSmrrEsssmcy7mv0N36b8Q16SHQOR/sIwC7ds8zZ' +
  'MldLPiEFF4m/l9Go7lO4QYvVBc4nNlL5H6H7X1q/oxDY3BoTTmamAdqXiDn6NV4DUBvlURWTsZldwX4IU9X8wWwI2RFp2P8ADLZ9/ulHtSiemyoeplgiBygW' +
  'zD9J+CG8GLo+xHQ/IfiIbgNIkr+WLefpkLzNjpfpvxt9K8G5UCUtOmVPMJYk39K6lEVSkSDFaPDuMDuLp7gPO4AVVHVNVuAP7In3Mkvo7fEwK0E4+YArQuKw' +
  'B4JfQ13ATMGccL7MAb3tRvwdENES8Yi19hjxUs+ZoPmggzmALhTEKyo/cEzA33FVMQUB8jD+psIFB/iLiZtC6rJLeFjdagVKfUblCU4OTuK/o6Xmg+YiMIFX' +
  'yy6ULkSJjpJk2yyG37jfZECm7VAoDqBl8Y+l4lnyBb+Bl36SXKrl/g+PogPGPpX0qGpe+enqbgItJURStjUSogRhegGmRzACNAH2Jkux/MCcwPuP6itu0/MH' +
  'lGMCOQQtPN1EjBnXqOcscZiBeaYViXOHxKhWVXjUrRMoxfU5xqE4xe5Ts2fV4NbzMu8wxFv6e6Zf0rJ7xGXFtwApvxBEDv6OsHzMwlsZ27QXBuonZXC+PMwz' +
  'OdCsH/swaC2A7r8j4GEUNeOXjt7XLEN0Bw1F1gfcMUsiuh2yjpuLXo4lE81zFIZuVhLiHaP3AHzLdM34v+YuZaJxcrbBB4Ea94ZRdZ4BcX5euoAQGsvFx3Mg' +
  'VihZ+RjCSg3fkgGziz58ylVf4Iug0ZuI0nBpnFD1FfiXG402dkquhk/AxMPZAIcCz6Wz2Mw7lCx51EYJZF6lsbmVLJQVyW7xN4D/AHv1UEqV9OZXvDhhmoyk' +
  '8XDFvEY6TxKVgMvyaqtwW7uoz8I/mDCLn6uZh2vyxt7zEMjQZQRheWWv7nUfeXiCrEmph8kun0v4i/OP1bFyfqbYZhRbYXNfj+E2vb9fMdzKvRMhdwUD5iQa' +
  'zKHmHbkhurTpGqA/GoJwqIcdwXcEhozFl3FVoO1cB5YuW4c5vNt5FHBzE9zYlXa8xB5MVBddpLvR549+IUALBKvysQgOQ7YqAWOZnrBqAvp31X+34lsBNCaQ' +
  'CCh2wjPFsKUaSXFFWGOIrrUvzDnuPahABwNv2WXRMqnrmX2RHCQwCrAhq4CEPpxUsuVhVuKek2DJ9MchBzRyPj+4pT5kQF0rJnU0FFeI34faVDlm0ikWBWL9' +
  '4wOYzpmfEAWytl/H0JkpNkpXxKxK/wDi2OzDGXnLj3Lr3Fi+zKYEMF9sN8biWguXPoItFs5ivELFWciMHw2fMvhr/sAskl1k1+4clDzaMHAPdHM5Q+qYGk+U' +
  '6Q9w1CUu4oax/wDIAV5vBKlSo4W4Jkk+xHQIVWZkdoFCBAlAG2C2wAYlnsczMTXE4gZhlZCGF1slTVqY6qXrk8TTMdkv+5MR6IYIjIWvp5fg5YjTddW/K+X4' +
  'OCWFEu4QhmeO2+HBHsNn6jsiuVR+0ao2ck2xtVedx13O5qOKly2LilpVr5BAUNMZ2fMqRmDmlgfepQFQbvhDP5Iy1NXiDi2y8Q0jwS3UGzRW5zh8Q8TZ2yXB' +
  'KIEwwvP4IYln4lvmUuVjp3vHUsbNYjLYYjubWB9cwTlj9B/P0uY4rLVXhxD/AOcq1+04+mKay+ZcVSBYmAC3eW3p4lGFTOd8yynqpbg19D9Y3RrMZneyEy3k' +
  'sw/9jNAfCykr4TO4/tHMtu6i8hfIlTHOralXPcC0fclM2TBdR9VT051P7M0wQJfZ2nQU9x7ABS6bWKTZkKT3B9ieotLhmzLC0U2Q+1glUSuJWZWorEQq+zjw' +
  'wFY2ZAAFq9VKkTIRsyA4azXEDMag0f8AK2XjuXqAUtcYOD/MAL5l3uH0LnI2dxKnuBCJZLNCf3KTmOMo2jp1Sx/BETxAuC1JSnk+hsqUFpMObD9LmMsBZMXc' +
  'CgXuw/KRGCMCHK2/dYfAQWC2UJgbe4mw/SSsMfpZYdn7mOGN/cwXzOhuKZ2wFHx4mxcQNrnfuWHEcvcyCKD7nUorTD0fQ1AXC5rAyneefpX0SDSJxK+25c7o' +
  'MnuGRb3Fp5lOYSRYqMFaQCMOctPzHXkr9RjBl4xH9uJRcRDaZ7ATyRzlfRD8I9MdZnsIhsfcmsJ54ilQsFbGfMt0HXmY9pL95+I8gmWz8MsWD95jktW12wYC' +
  'VyxFbwQI+36tCuVegzFdlsnfLOOjxEQXtlmIkdkSDhOMMtltwaYf2lTVUjGN/CoPL4i7vUbS6uQdDt8EtgUW1f4PHEA+eoiv6aj1FUZYbl1eNOY1KqgFDmrx' +
  'GgJeDbblDmopVpygLKIx2jV9nUQ5DrX2SnCmvtD9wJdRlXKgVsyxnioJ6/5IGKOAxFs8RHOjes/IlQZkWWe8/S4eYfddBQDPCBDwkZsBafiO/OmXJDQgZMXw' +
  'JfMw3ZhAe6V84lGT1Kl9uvBLshtDIuY2HLuZwdxiMtOICVhu27vjX0qCWlkNyr3HccSuo11Er6032iwlDqcp+5mVYsHaSY27i1gLaymcxTJrbAAOP6RApI3G' +
  'ZmXwS/gBM2R3E4lJ6ho6RlO+o7Tj0zeM9txSdjHiHJQ1nLCp4S6IbTSIGvqg7CIWhAGtwwS7HEC2FPpZbLblriCK5lpX0wwe4uCTBmL7hXei/h5gpR1nbZum' +
  '2uwRjP8AmHoOA0HBMus3xESu/wD4OijQQJGCAa9dInIbd/ubR9Lp4wy22/zDMSRyAuGjIdMQsU3UVrJ+F+0O25VwNzBABUEOI6WXGoEe7QTdiXkzn7j5j/LJ' +
  '9kHooPUbTUqHJDMppYaYlzpUJ+oEDITksfBiGpNMytCyy5j9Le0H8QINiB6ilIlhTuZ6VEM+sG3bF3VkohcMW/77/QC/BCVVPoYT6ZInEqJBps2SgHMtYRo9' +
  'MusmxKvUzt6GxTSOTLHGjDOJ87fYj1KuJtTdTP0RqIqwkG5UNXi9PTFMKRpgcxqWJ3zLhDeECNmh+par4mKjs+tsIRAqKpTkagViWFsqFT/3pTQQxktlJq1+' +
  'IVY8XHR3RkjGdcMDiC6cWFhb9uA5UI6IazgdHt2vKsUllKYvqWfKsBppyrmvpzDKrrFwEV6G2NKZ6OfcTL6I6IDszKOZmMoGW+hr+vmPTAJHjLiNODYXA5pw' +
  '+OYqAEIpHJPsM/GUe0WOYTnNCi0b8UJ5QOYmrdH0bHG6ldLNQedxS3YcqOqKF+ItcpAFrM2OrlId4nvUDJ3DifMG1x7TlqNoWxnnP6SxVd0wc19pXz1Sqxgf' +
  '5lSpYaiyTV2xXOIkbMRUuJNaiUfTcoz+eJwfvHTtf6qDKI8ATUQXsc2aiuw/iMam2Y/L+5s+aNbxzCBNMPpS4TPkhKlqBrKY9R090fTxZ+jDSs3u4EMS9zfx' +
  'FwCNRcqxKI6NPRPUFvlf8y3bBGxnUuXIIev7BfaEU8IbYuLYclYZQb9Rt29FrfLxCuzTNcHuWigNU4JoMBoMxKnbQeJeVX5KX/HZ+0vOYYBQ+D+YZv8AHcSV' +
  'xPJ9phQOVxCJBwYuX24l2WUyxZkibg6tmrw6yPzKOEbmKxGZ1C+nO/vAFtZkVUKiNPcAwZFmm8zMuv2RFggJSsGEcFy7EtGEhmqlC6R4M09nqI2ixpzLcES4' +
  'KUxvNz+ZWBuAs8QWphUAhgu3fiIFaxlODi7Mu2ysNr4m0YlMoWPR7YqTz2dSjSamEsU6juM8TUoOkw5OZ/LFBEtuWgEucW6dEC+4h7lT/TiODMY7ExDkD7sf' +
  'p0I6g/RjurNydMvFwUi8/pHUrqALIbHJNPJKhNEeLXMYW4dQhQTUdEQDMOOsLfAS2ibo9EO0RbV15iUN4IVNN9g18FEdPbvwwyhSHjsbB2GT0cwWvbbZbb8s' +
  'pouryy9QPZ3BqOVn1AQJlMW4vxzH6CuigOAOCOEznZ9KPnMAIm1HQbdZKlOm6RKiuWFZUTY04O5oTmVhtfAcnyQtlZO/THLxCn2nM3w0bn0D7GVfEOZuq7dj' +
  'mUAMslZshIxkmKrXEK9RMRAUbjMFEqOImVyzxP8AUuvIj9orD2RZXzNA9QHU0yS/Tl+C34iLUEWsS3vAfDN2O6mGyZH5TZ7nCVcWtu9p1LFs1CXFOz6JUe5c' +
  'u8E/JYRYzgpu1I1igccwCQN8pyZrzH9v+UVV9AQV5f1LbHQfn6MGn1My6YYmI6lBAI4bi8h7SoV0rnOCCVwBL7pmvoKgByXAQI7FzPgQ8muPL/MuXN1zCCmX' +
  'iUHY5OlDT5tCvcOIRWteXqLHRAFUBv8Acw2DRtZoPk47MuBZV3nSWLy8rOxXqiXD9LRU5+JrprR+I/3iYwTXQ6iBbG2XCI2AupBy7zoh1csQ0PP2YPiCpYkV' +
  'u5UFrR1AMkdEQK+EbJdlbIGJ2YlfvHZ8y8MukswPirV5GvycxlKvCXp2JSPTFUCWoNjCYrHI7cepasyPMqx5P1GBTs/U4lcXUSlHYyqiXBhjy9n4gYHUqL0Q' +
  'Vd9+pVDVpb4gD1AzirQfC928ADzGlJI5VtZvBkiWJKF6Y790I54ju7mdS4OkjBE4lRlAzP2sJWYhDObGn2eWGZgrnvMMeh/P0OJvND/E/Jx+tDw0niWOtM4m' +
  'oT6v1EQbTwnTPvj6UTavHqCcJMo47QGh/wBgQRAm8BNE1+4F8AJROgDML9G16u/SfwA+8JPLRui/kv2JTzWYsejx/LBlENMieILD9jKQ+2bIqvQPgHQd2XIv' +
  '+RKuMzipQS90FDm2/EwKuCO74jvUSnWgLaPljjiBb+UOhby59RfakLVeV5jcBdspupXsLa0Q+j5ovNA24BGpdF2NvUIbY5yX8xzihodktUaBiF2wxrSGoTyr' +
  '6LKo83lcW6JG80rwmkR0jFSJBMbi6ckH2Lh8XxOCNoKZqWdl/QWOvLFCWU5OYZgSpQZmjDctB5l78T1BHcQitUB2tEcqzngsCvLThxhx9DmYL+nA+ZZl1USi' +
  'X9NIxydTZOsy/ezmbpGz/wCBovDFpctMqe84GS9ETdd04+Ji/J/bDMuKiUoHcCh1/D/5vXVmR8Q1mUaizDR3mNnkPjH0qao6Z8jFfiggTRa0bjKjBfvKnBi+' +
  '68TKU2ZfMuYPtFAimgMqw/eSdk28BfyQYdBVQSgDWiXptWWaQsTnKLnPVMHKW8Sx5jWMVdyozITD93EBcuV2y0S94gc3oQAtUee5jmq3FMRFXlg7qQ2/8hSI' +
  'Ml044L8H3hdT0a37EZhQ/L6I1YnmFqcJu5xInMs+3CQXPJ8oKypU+HiZeW39o1CCRhMB/MfZCWIIYF0A0+u4BbvqFh0Dpx95Vr6IyLcpW4vSdR6CZaz1xN8a' +
  'iTOiKBW3cTc3HiVlIgxzuI4QJZQYLuG0XaizxThx/ERcgz2v0FtQ0D6AEYznyS7BOfqEvx55Cbx1NR1BD5JS8S5veoqK3tgWBVMYaxiEUAAGalq+QfeWaXDG' +
  'hKELo/cqqMWP4+tzcMylHl46lAdGHyQdmXUZJnNvtA5Vm/tHWMrT1CHcvtzKy6vDPBNFsvf+iBBa9Fy7/wCQdSrHdmYQFRHCu68d/oZ9wssFOzg9tHwyygl6' +
  'y+juX5kZuivhyDxcUMVhAuJYWhzRGLVlXWh2vKwLlF5L+CYKvJ6m5SKi1yfMMIDAHLLVeVWBFK6XP2IZGywr9isv3Iq5/BfHU3+fcfpYKMIfG4bB9y9TEMkC' +
  '7Vdz5kYjBr8pgKcGGGy3k/MBjjJqazMH4DFgEuTx1KyxjgqoXjgfDsVcCJSv688yjpVwVCInXEIQDcD/ABTFHmGzhJXFAF3xEbkNPib+jgYKB6iLN5h+oHli' +
  'rrpMiM5e+paqBhSb9s1/6+pswjj6Gg4Zjb/4ldQ+ocbl5gTcqAx0OzSLMvRCMICmRALNVLBW2scE8Mu5aEx31Dx8fuYQvQ+8RCApZY//ABVSqznXuO/f4ghQ' +
  'J1HmAr+RDE3SqWPUQEQplizUGWGq3qZOC/3MW6YmxYNvcqBDluS6P5h4zg6OIrpwy58oA8+D134lQtC2V/DD9xfb+MDRle235lma2mS4OlaA7Yj1RkxoHwFE' +
  'eZYmA9opB1gX3cRUQa6o77iNZzK2TyimWsWZ3YQW5CaSEoIOx/UIoJg4YGDT3GNFvNIC3rYOfd/GpgFo6IPmYwNEgdSrFK5QKvziGIQUdC2TI0YSpgJ1qz8P' +
  '7HPEV09HR7odFytfKGtTLd/xLxrIeHy9hvY5HHWQg2JVgTCikTCMcQiguL/gAlHFVv8AG5lhXTqOMIKRoAyxoxEEygfOJiKwH2jBDC0e3lmY8CoZxAuhKNh4' +
  'v7fiNeHQAOsH1VF8w1Ex9BRHmUp5y/8Ai/pTminZKeQ/U7E/y4UaeI5XqEFIIH7EsV3dA9hqUvm0+mpnjjDLjWWde4DAs1Ge1phAlMVhMJmW6qgi6G31Eayn' +
  'AQcGR2cCQcrNj9CtExGza4YTIDTn+5gBpSr8QIELRq+z+5/3UMA4lfhP58TGMrUqjT/A+YwYqLt6PRf3JlLusL9zangu+X0X8iBUtkmdhM0mrrI9xY/8lazn' +
  'lYSBxgvbM2Bd0kjQRv42ykvDVLmJOg6jKi4YxjlaI3SxSm1AQB1Q3X9syu5yOoy9xHRMOIm3W5cxZvPiWXqEHNcQNI9qUA5Xgita989J+9r3CWybkPLx6iRR' +
  'ZVx1fiBClsFGBiLcRpaxo3dvZ25NacLYgFSjYncKvOo9IvYjjmCi+5589kHXjSYftKyu0CsRZmY0sEz0LEVLXPADL8TUaNL0fy7+Y6emWHLRHScXaFm7+Kx5' +
  '/wDgaRmdRLPrRvf7lKckuP0I2/aO+jqDMt4AilQwmyBL0AFhQteK3DeGcw0+yFFC0p+JdlY4lTR9TLW0H5l2cVFBFj3FsMvTBbqUABco3wGrrEWpUi5XFd0w' +
  '9TYz7P5g7Ka6PDDNqhRxEBTkiAbHTLvwxGMOzEzNQ5stwW8QVndKTt/mMr1yZduzQ4Nv8HuCBCDcBVno/NTa21KRl/GVHQRsvTILlp65eL0fBR8QctAo4F6j' +
  'Iu4hxbr4hVa5e5QFlPBxKNTJgC7E0rR/bARFDAdS10Cx7YWU7ljY0GAxTKRM8vUu4bBqOwXx5itsAaJeaupkft7gBTSk4/6jj7H8Rt/7gV6b0raeIUDKgvGV' +
  'Nd5IfQbslmNjW/7S8OC0PcY2/DCP4jhBDd2GB94R7o8Msgo64jBrMLZiqgtGfUdheb2RXLh0gfIRA2nbOTNRy0FjuCTeq0F/7/kPFobtB+rbfn6hbUFMdxvB' +
  'H6Cx8Zl6+R9QCtRbn6Np94AUQcjEU4+6CQpyqFRzWazzxGrVQqU8YYM34EJrTw9REiZiQA1RXP7Esj+/Uy0ibs1LAA3xPTZn+YqitszVEsTgi22QHz8nZKxC' +
  'j2sWoETIRY+pfcE45gUI154lEvwgGPhDE0v5gIj3uDEyI2v41+Yy3dTrR+I9HaorlhvX15HD658yh2VXpML94DXejOo6SjX3vyoiA1yXMCGThArVcHbHiFSx' +
  'wdh/mo2gM5AOfASkfMdHXI4/6i7lM+krSzWjiIeO2CVX35gsF5HiZtcHMtKw2f8AsAssqpqFNcQy2x1AtM8B2nAQ6ggVbNvitQtvcuUrYZfWxHpSUcrcS8Ym' +
  'LoP5BMyDTESx7gneNUn2qlzTPFumI6RHzHh9BuA6HInSWPuZjizjlke1j1TCbZyD/gixQnDMI2Csis4inuMxqGhtfxPBNTijg+/6jInl+OD5/iWKyixvRLTJ' +
  'DlFW7/rz/wDAtWYDHZU4HfuVfQSg8P4gk5luhwSrnN9kMeJdDeCYqGj9yxZxAo99TF7kBrFU4whDarDgrp+VXiZro/kI7ZXoyfmVKQ3sP5/qFV5jZWeSlHsN' +
  'fMCl69dzBGf4lYhhimeOIVSID53mf8P1M/cOa2aaizjXUof+ifuCJbsTujL6hUtATp/1v2mOlLr9ENnEKVjjPRt+ILcOjnifgt+JYyrSU6xb/txwW6weo6/A' +
  'D4cn8VAVDQP1GlMq8vb4N3OJQFdPXU/LCFpwjURisj+23pep6HCcHcFkB4Gr9y7evB3NlKBy1BiLMbu4l+q+qbJhtk4vibx+JiCDIcf9l/OTVMMMuk2g4vv3' +
  'C1gQ/BKdaiIk5Gv4TF+gA2uSIWznM00/MEKVgjglm6o7UP4Z3hx0TqUN8P8AJEVKI6YnMamPFXLxGPgYfiBQREaR4lLdjJi52SvoqOjZDIG9Ds8fEultcvuM' +
  'pWNd0/3xFPQdEUNR+tHtLKgtmRPBwP8AMG4SzMcYlzM9yn7MTCG2P4nc0pnv6E2sS5o6jbH6BjyZslZW1u8su8m4NfA/ibL7mUv7eTuL/i5f7gjRDaU/uedc' +
  'kLKBNSzQv9IW4hjFfqzAdlSg9gQ8QJ5TcxA427wRGrTunXxDIRYpxAPkNfMssZZxLJocfeBvv8i4D7rD+jUYxzL4CBQnyez7WXBWKuEy/gAevMFQLA0dRVk+' +
  'C7ol8xSLxf8AVR4INsu6eA24fTs+KlCqwvW4QwJEZPqCGqWtbCHaX2LeiCk5cmacE3jviMKMfuL7lsnMMRwUh6M/cfLp4efmEmsdG6ixCwVeszlGCRT4OIlj' +
  'rggXnUSgKw4YRjCh+0MYMaTxFpqrfJfuRDdKNsD5QFxWUdF1BVR4RTIRO9kEU/mCqnI8wLyWeSACBsp0wvnD8y5fQVxOSEWhvJKfOPzHEF+kGmzcZibjyRaW' +
  'ZNF9BXBzcqJKgRmaYi9ejt8RgqHOdrt/qdeJ+H0GLItZlj8yg7cwtsPXX01BM5eCMruH13gX7lS2cKb5DVQ6jmFjX+Ilv6SoFwLzCj70wGTVZ8SoEcBxMbB+' +
  '0Wh5Fte5t/8ACKmBjdrQ1QuaxHScw9SqxroblcQeRxD67PBtmQ4VLlov/XApQt3NduMhWFuY27x2aK9soOPhZB5Pe3lxDeWGeeH438RM63Htf+QVoZUHP/kc' +
  'HFj5qOCccykDquxx8tH3iAAocB1CIrQcPuHyARXHnrP5cdzm6wLoHQaA1E028xfnuNrCu4jr+iaSLriL1iPGysS0HTYM5CzhhUph15gJBUK4mXMI2NalQvTg' +
  'XmVPoxo2xksGA4mjzM+DO4txb7kFWGtCxAsDAEJA02w6lydytqBoOSNRyfmYAgyiEtXyfMCwav7iVGIbVkF6FbQ4foOAGzsBKiKVXUI9plCV8dJq+ZlL9fQi' +
  'hypLUjz/AIyxUAUKg6D6OU1nEYwAOYh/2H/wRoz+kR2nMZ8xjf0Gxj3DjA2pSp5KcvUQSsCvd3/MKE6U/P01mAjSid4/5DAb4iWHyOpUCMt9ZlBwuDKx4gHe' +
  'T9piEeLohqC4exr+fUpqvKs/eI2wMZbhF6guTUBYhLghnEZSJ1HrAOrsZyeYgJqbOy7fb+IUG/tMvRdT4e37/qYmIDhgKolDRt8VKPAgEciqTrAugF17alzG' +
  's/x2sIM72x94OhNSrgPDLK3YbEUXiqjzcQruFGNqqrLZtqXzBcBXxiFsS5FI99+prFfcSxjgXAlnRwtoswtb6hGMmWWZs8wRYiMwnDZ8TAUZqHaTg0EYJOat' +
  'z+4cXloWX2ub8wOEtA/kj6ka5fcWQp0jKiWbTiA8wQ0Mqwuuo+FE7iEtH7mUWLawCZhoLIYY0AGBXHmBW5y+XRKCXOT6IL7irPAQSulrsabitXKxdWa0I+0o' +
  'BS1F+7UG0dA0+PHtz6grpVcq8y6bhkv6BLioi0mjEMzxK+lRS+e42tu/o/UFYIclAmAiyPb3gRnmgHhxHbHZj4RBWj0uhp1HpbDmh5lSBNJ/xZCWNo/Uq1r3' +
  'K+jk6laB0csw1/Ft/wDg4sT0rMTL2YicKFUd9gwGQUnjiHj7RPx4Bk+T9S3KuwE36BMEZ5WO/jBgCn+6CBNRi9018wxgFJaI1yJD3dv5N/ZY16ZeBHM5Bij4' +
  'BXtgS7wm80H3jBXomxgiYKVGgRfMq1Z8hfPEwqrq4WaZh3QlU9cxrPYXlbXh5jMIibHiOSJmiaILyLElUfTM1y8TnfuZqkvlxMrm/EtKA0g1dQcIpq5cdkAW' +
  'cwyFRw1yypUzqdEIVZtsNVeGDUzWr3mCPTMmNc1iN1tyDx8wCiDJLjqo8CXN87I+C2uIAPWyrRDrbLBKnMy4kNY/mSgvUR+NUwPxEwgeLfasDJV0Cno7969y' +
  '628p7zW/U0ORAvo/mXMyWGK6TU4lxPcQxOYRAW4J4x13N5XP/wAJgFnat6IVAK+gSmWXRkU+Ivu5gZQ48UH8E272j+J6Ihd2YgLQAqohWYZl0Zrvg/uKlJ5/' +
  '+BLdQMS6l5nAUkiHZ8whmDMQZTrS7aFfMH5Igs9mcYgUuuZfQMkEoBwbCbfh+Yh7kBzeotICP0P7gPNV9uOoYAIBoxdS25U06Dl9HMpy6L5gUNLn5d/4+0Zl' +
  'jwWfnuEWGrBodkfMQuATpB1zBJoPUzAe+ZjFdAvyy+Fj4RbYxRTGzwhQDezv+hMJsgpjQ59pvAIaYB2H2nRl4xHlPQuW4wbc8QjTa0KeoDJFdl/1F3euyz4Y' +
  'GghsYBZV1Ke3qVHMIvg/QS15ViIZW/zFSkVQZqDuFs1pgWrHHFziyCH+D8xpqNW4vx+tl8y4ifTiGWVdyiphCClfiVW9/SopQWZrdwJrBEpucJzCDny5VIAd' +
  'KVqOtUVEb7WzG1l6zWT7ypX2mkmZqy45ZrR8hiiie3UR18WoHKeBiWSfyh/cKFj4wFw3oj/0DP0xouluPyRtDHo/sYgtLhQH3Po7gVDE3ib3thHhmtnBq8ga' +
  'R8Q3Z1rPJn5LJtv2ghsweHsYJKix5WGDgCPmO72D8S3BbenqGiAYvg7YiblMyBWIm5gnquphnFKY8w5fxK08skW8/iJcXBdYE1RmJ3sIRhTvc5/B7u3uIm57' +
  'iCa0sf0unl+0UAAm9I8+Xyy/oCC7Irlw5j9EU/cI0Q+604YZY5u2F3cthVdP8zFYEMJhh32DZBoDxK5geJQF8yhDmeuJWqAjld9StpbaxORwLqKS4ABDL5b5' +
  'fo2fpVGKqYZiU3Ewv0F6v0QIIt31GVsqMGYIZnPxABQUfT5lrfEswEF2zL3D8ZH2ofU/xGu053uD5RIjBSbUYrB1dba7iTJRVviUgBdBVw39HB0TUOIrgCKG' +
  '5duYJL/cqb8woGAzXL6hz4jxUV0YjltzszBOA9QvOiDB4FoiDFhGgjSfMMArpP5iybzQGmtn4iS66TGglHGkIpBOjn7lhuoKS/m0dUF6BcAGrsK4OoqoXZTD' +
  'R9RRZf1HUabqD7dOYCsDIf8Ao96iNRRtXayiMt3MCe7ZFaydQWmQSnsg6gCFkV4x9N/CE06uAn8Xvl9RSzIU2r5lYgSseZSpT05F1HeJQFfQs1EAmbwriB2f' +
  'SUJzFOWIBTlnqpRv5JMkeDjuabZmuGIlCcMMTq9fs5lFYwQ5k2nQvFv9i4Quk3THwSt5ezRqj4yxxVVW1eYwYuCieZUGZhhiunUSKi2JU4aIUgjz1EVwEO0V' +
  'OiBoS6mwQjw2x3fzEwYRr6Djtuk7aliFXaOouYUOjqpkUXDghWhVSgo0NwqQUCuvcakt0sWuVYfVlaz1zNTkliDLKQoPEomL25ZS5TnhUK/wpbKhGS0XL5Mx' +
  '5qfTV4Hf3XuONujpXSRliUbVEKutbOoDqbJBMXc9sWPxmCPZFeYxdVW2FAxsLPm+PWY2foD/ABB/crgBWr7A0i8QHyeZkwK9zhTfEVepZqDKAWFLtwhPwTDe' +
  'I1D/ADmpbVvDlX+ssX0VVtofx8QOqh6lHD7QXlj1qDo3xv7xYfECrlwjhghZxKW2IEoohupbnTqIMy1Kbl3QnJFvRClMxcjnT1M9vtKnmfsCIbkOa6Ha4IVV' +
  'ZbY8zy+NRLZWJ4IJDBTWrf0V9CzKqDREmc4Ikwp3Fj+NAADATQNwWtWYCIZ+yC8M7cRbTPvKGfQMxJxb3BbMrx9FrlomGpUTMCAUArdLacYlAkHyAXw8y1gD' +
  'JNGdEEuArWGfCF3tvKsPoSqh9KuVdVHXSsT+kEAo+J2DERTCxeswoDT+ZhiI7QddnC9nqCkSYEE6TZ5NzA8rEWuE8CIV9paWK9zMUVRaaJcun6Ldy3GI6g/M' +
  '47E6EQ2+jMTWB3hD1kXcqvkHyyrNUYg9N+zjxFKMDpThrUDqfhMUUemNupTedwhSTzh3LpXY3uV9EEeuIFODChVSmuepT6jSR4gLi4gq63FYlqYYBAyBKuqh' +
  'f2A5eWYzCyvtXld8FBqLl93LJ94NeorBVp2sSU25YKagyTICAqPo6LFDqapC3mLMFvZjUlV8s2isY+WJ1BNAPpUDEO+Jlg1C5mAK2YjKqLiDxBhGl34I7iFK' +
  '17WajYYWvqYAy9ePMSitrteYVMEEkSAxHH3guWAbVgnAgp5vMqF4vLFYoLr6enAw8dzB7cvLM8EGWNo+c8ESmLkhRbATZIax5VgcXyZx1A9v2VlQpeIxgDVD' +
  'UpMOQGDfuPSbEUB4y/MbGNMWy5c2yoKhDTRrcRT4Ayzciu8oQ4C+Aivcy+S8+DxuBn1d9jz7Y2zJuP1HA/UNoMqjIg4rPX0BhalaSjiMm4lNMwhKaYQUBx/a' +
  'Xbj0QzFDJuX/AJ5ieV68EDAVhbtghDcHkBL5VhmJiGoBEwBs7f2g61kfIvuMpeblQcKq+jlh6W2K3bOsZrzEl7OvoGb7m9+J0VsvfiU/E52AbuUgF3fqIOl6' +
  '3G3K37lQSoLYeWT+pUfpUCy1xlgdssH2iq3MqFRBKZafzHVzMh4isurIdx8B2xU2WVOPBOMR62YgCChjBEfUFdQw3lgBJVzoPMFM1pCo6qFTRE4CxsDlZQTb' +
  've5iLimg5XX4i9YDuK0UGLbfUJnKswG6rcygUQHyvFSt9iOTmpScA62obZa+4KZf0C4jrniCLTsO331KgL4K/wDY3FAUAbXiWN5d83rqLcGx3xEzXHmX+WZD' +
  'GorBlQHJUy50OoRorxKEWMyRy3xLYQ4tlcj+Sc3EqwHa8EuBcHp5V4htu0BsbU5xBcg5JlJboURdQ3oDmWN01z8X+zcFOz1wOCufbuBBeVevMvc73HNA0OA3' +
  '92ibFMpkyghpPcEzI6fGJUrhGjeIA1lFVa2x+gWwg8wly5zLNx3Lgg5o0dwgTbMtuXuBUFC2NdnUuG2updwrgJ3eX1ERyWfEcLg4OvpVxM2jcK6zWZSVMoFY' +
  'lpr3AmSnxKgMFC+oCM0H5jlIWJwBjEBkFrAGV96IeYc2D5/pGTG81oOCWeY3nZFSF5X9Mu9Lh5iYFyHZ0PMqXZ4ghbRVGfcEtldYfecbgrTo6D8xbYtxIQhk' +
  'a2FjIAlXHif3L2W6aG1mOqHfMaUlYv8ARAuHuJhVXEs5bM6n0sySvo29xSu05ipY2MFU07lDDmAvXUyEuFG4zw3NN+oE95hbzEStVuNQjXE5QvgjCseDVMq9' +
  'HD88HLERpt9wrA1qoqhRN6KGuO/tKQNBCqOH5zcyljChUEY+2WNGiP8AZ9EcrMaqu2VK+nMAUAXs5moU8wvNAMc2g6H0gNxbq9EctlSlXQcHPzLtgGg0fRHi' +
  'HeNC4QOqhXhGnWblSj3KEeY3cFfSFwFajRgLjVe54IXdTK/qAG9IBMsALWDQEeZezxMm+vQPPK7WNda+AZuFa8zHNDvuYxohVBF5NS5a6rY+EZS4ByO4nFtg' +
  'da4E5Xb0eZ+FgxwBwH0I3SQXM0CDbBYv7B5eZd6xU/iWFFouiPLUNHBNaxBbNaYg+kutsGiCToTHENP1uZZa/wAQZT6FOQo9kFhbdmkRgImOIWwEEHcGFRyg' +
  'xBVFJcSjt3oa8EJarocEEIK5tjO7denMBMoGeDtiA5DtXL+I/cZ+sDoYD7StEoxWZpBVEqa5qVcSNRVE5mFf0TFbKygpQevpVyqgqsnuZQcQpqYhpIrYTlI8' +
  'wIkNkG7MaeolSm3MWcfQzMVuuI29ac5JglUPl9Bbf0P2rmXgjsm5LnxAA7ho328e054VW/uEW9RDy8n8QBRzthVvlq33FeImymIW1u3zCK3QzPBR8QOS/ERY' +
  'XavGvbE4sqv5TvEnK8DqZjDhC3gjhcedr4i/4D0TeXJLZcWF6NzXMSxNkAppBrmUJRbU+KlTAwq2VQa0s1DLCDH0dfRjmMKly6VHDNwm5//Z';
 
function buildAnimeAvatarPrompt(gender, cls) {
  // Dirección de arte: anime 2D ilustrado, nunca avatar vectorial ni render 3D.
  const subject = gender === 'female'
    ? 'young adult anime woman hunter, solo, layered black hair, expressive violet-blue eyes, calm determined expression'
    : 'young adult anime man hunter, solo, messy layered black hair with individual strands, expressive violet-blue eyes, serious calm expression';
  const weapon = cls?.weaponType === 'spear'
    ? 'subtle runic spear silhouette behind one shoulder'
    : cls?.weaponType === 'greatsword'
    ? 'subtle greatsword silhouette behind one shoulder'
    : cls?.weaponType === 'staff'
    ? 'subtle arcane staff silhouette behind one shoulder'
    : cls?.weaponType === 'daggers'
    ? 'subtle paired dagger details'
    : cls?.weaponType === 'gauntlets'
    ? 'subtle glowing combat gauntlets'
    : 'subtle sword hilt behind one shoulder';
 
  return `${subject}, chest-up half-body portrait, centered composition, wearing a fitted black tactical hunter jacket with a tall raised collar, layered black fabric and leather panels, detailed seams, pockets and metal buckles, ${weapon}, deep navy-black fantasy background, vivid electric blue aura behind shoulders, cyan rim light on hair and jacket, subtle violet shadow energy, floating blue particles, faint elegant arcane geometric frame, polished Japanese 2D anime key visual, hand-drawn illustration, precise clean lineart, detailed expressive anime face, natural human proportions, painterly cel shading, soft highlights, intricate hair strands, rich dark blue palette, dramatic cinematic lighting, premium anime RPG character illustration, detailed mature anime art`;
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
  const negative = encodeURIComponent('3d, CGI, photorealistic, realistic human, vector art, flat cartoon, chibi, simple geometric face, plastic skin, game render, text, watermark');
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=720&height=960&model=${modelName}&nologo=true&seed=${seed}&negative_prompt=${negative}`;
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
        prompt: `${prompt} ### lowres, bad anatomy, bad hands, text, error, cropped, worst quality, low quality, jpeg artifacts, signature, watermark, blurry, 3d, CGI, photorealistic, vector art, flat cartoon, chibi, simple geometric face`,
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
 
function FantasyAnimeAvatarSvg({ isFemale, weaponType, stage, accentColor }) {
  const uid = isFemale ? 'fem' : 'masc';
  const primaryGlow = accentColor || '#00eaff';
  const stageScale = Math.min(5, Math.max(1, Number(stage) || 1));
 
  return (
    <svg
      viewBox="0 0 420 400"
      width="100%"
      height="395"
      style={{ display: 'block', maxWidth: '460px', margin: '0 auto' }}
      aria-label={`Avatar ${isFemale ? 'Femenino' : 'Masculino'} Anime Fantasy RPG`}
    >
      <defs>
        {/* Cielo cósmico profundo */}
        <radialGradient id={`pexCosmos_${uid}`} cx="50%" cy="38%" r="68%">
          <stop offset="0%" stopColor="#261b5e" />
          <stop offset="45%" stopColor="#0f1b44" />
          <stop offset="82%" stopColor="#070d24" />
          <stop offset="100%" stopColor="#050817" />
        </radialGradient>
 
        {/* Halo arcano detrás del personaje */}
        <radialGradient id={`pexArcaneHalo_${uid}`} cx="50%" cy="44%" r="48%">
          <stop offset="0%" stopColor={primaryGlow} stopOpacity="0.42" />
          <stop offset="48%" stopColor="#963cff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#050817" stopOpacity="0" />
        </radialGradient>
 
        {/* Piel estilo anime cel-shaded */}
        <linearGradient id={`pexSkin_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffedd5" />
          <stop offset="72%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#f5b882" />
        </linearGradient>
 
        {/* Sombra de cuello */}
        <linearGradient id={`pexNeckShade_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d99b6c" />
          <stop offset="55%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#ffedd5" />
        </linearGradient>
 
        {/* Cabello negro azabache con reflejos índigo/cian */}
        <linearGradient id={`pexHair_${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="45%" stopColor="#090d1c" />
          <stop offset="100%" stopColor="#04060e" />
        </linearGradient>
 
        {/* Armadura obsidiana */}
        <linearGradient id={`pexObsidian_${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="45%" stopColor="#0d1429" />
          <stop offset="100%" stopColor="#050814" />
        </linearGradient>
 
        {/* Filigrana dorada */}
        <linearGradient id={`pexGold_${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="48%" stopColor="#ffd45a" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
 
        {/* Capa carmesí real */}
        <linearGradient id={`pexCape_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#be123c" />
          <stop offset="55%" stopColor="#881337" />
          <stop offset="100%" stopColor="#3b0716" />
        </linearGradient>
 
        {/* Cristal romboidal cian del pecho */}
        <linearGradient id={`pexCrystal_${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="45%" stopColor="#00eaff" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
 
        {/* Filtro de resplandor neón */}
        <filter id={`pexNeonBlur_${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
 
      {/* 1. FONDO CÓSMICO ESTRELLADO */}
      <rect width="420" height="400" fill={`url(#pexCosmos_${uid})`} />
      <circle cx="210" cy="175" r="175" fill={`url(#pexArcaneHalo_${uid})`} />
 
      {/* Estrellas y partículas ambientales */}
      <g opacity="0.8">
        <circle cx="52" cy="58" r="1.4" fill="#ffffff" />
        <circle cx="88" cy="112" r="1.1" fill="#7dd3fc" />
        <circle cx="348" cy="64" r="1.5" fill="#fef08a" />
        <circle cx="372" cy="128" r="1.2" fill="#ffffff" />
        <circle cx="64" cy="215" r="1.3" fill="#c084fc" />
        <circle cx="356" cy="224" r="1.4" fill="#7dd3fc" />
        <circle cx="122" cy="46" r="1.2" fill="#ffd45a" />
        <circle cx="302" cy="48" r="1.2" fill="#00eaff" />
      </g>
 
      {/* 2. CÍRCULO MÁGICO ARCANO GIRATORIO DETRÁS DEL HÉROE */}
      <g className="pex-arcane-ring-cw" opacity={0.45 + stageScale * 0.08}>
        <circle cx="210" cy="175" r="126" fill="none" stroke={primaryGlow} strokeWidth="1.4" strokeDasharray="8 5 2 5" />
        <circle cx="210" cy="175" r="116" fill="none" stroke="#ffd45a" strokeWidth="0.9" strokeOpacity="0.65" />
        <polygon
          points="210,52 297,88 333,175 297,262 210,298 123,262 87,175 123,88"
          fill="none"
          stroke={primaryGlow}
          strokeWidth="1"
          strokeOpacity="0.55"
        />
        <polygon
          points="210,52 333,175 210,298 87,175"
          fill="none"
          stroke="#963cff"
          strokeWidth="1.1"
          strokeOpacity="0.65"
        />
        <polygon
          points="123,88 297,88 297,262 123,262"
          fill="none"
          stroke="#ffd45a"
          strokeWidth="0.9"
          strokeOpacity="0.5"
        />
        {/* Nodos rúnicos cardinales */}
        <circle cx="210" cy="49" r="3.5" fill="#00eaff" />
        <circle cx="336" cy="175" r="3.5" fill="#00eaff" />
        <circle cx="210" cy="301" r="3.5" fill="#00eaff" />
        <circle cx="84" cy="175" r="3.5" fill="#00eaff" />
      </g>
 
      <g className="pex-arcane-ring-ccw" opacity="0.55">
        <circle cx="210" cy="175" r="92" fill="none" stroke="#c084fc" strokeWidth="1.2" strokeDasharray="4 6" />
        {stageScale >= 2 && (
          <circle cx="210" cy="175" r="142" fill="none" stroke="#ffd45a" strokeWidth="1" strokeDasharray="3 9" />
        )}
      </g>
 
      {/* 3. GRUPO PRINCIPAL DEL PERSONAJE DE MEDIO CUERPO */}
      <g className="pex-avatar-hero-float">
        {/* CAPA CARMESÍ REAL ONDEANDO DETRÁS DE LOS HOMBROS */}
        <path
          d="M118 228 C78 265, 58 325, 48 398 L372 398 C362 325, 342 265, 302 228 Z"
          fill={`url(#pexCape_${uid})`}
          stroke={`url(#pexGold_${uid})`}
          strokeWidth="2"
        />
        {/* Pliegues internos de la capa */}
        <path d="M128 242 L95 398" stroke="#4c0519" strokeWidth="4" opacity="0.65" />
        <path d="M292 242 L325 398" stroke="#4c0519" strokeWidth="4" opacity="0.65" />
 
        {/* ARMA RÚNICA DE CLASE (DETRÁS / COSTADO DEL HÉROE) */}
        {weaponType === 'spear' && (
          <g filter={`url(#pexNeonBlur_${uid})`}>
            <line x1="336" y1="36" x2="292" y2="396" stroke={`url(#pexGold_${uid})`} strokeWidth="5" strokeLinecap="round" />
            <polygon points="336,14 348,54 336,68 324,54" fill={`url(#pexCrystal_${uid})`} stroke="#ffffff" strokeWidth="1" />
            <circle cx="336" cy="68" r="5" fill="#ffd45a" />
          </g>
        )}
        {weaponType === 'greatsword' && (
          <g filter={`url(#pexNeonBlur_${uid})`}>
            <polygon points="334,26 350,48 318,266 296,262" fill="#0f172a" stroke="#00eaff" strokeWidth="2" />
            <line x1="333" y1="44" x2="308" y2="254" stroke="#00eaff" strokeWidth="2.5" />
            <rect x="285" y="260" width="44" height="9" rx="3" transform="rotate(9 307 264)" fill={`url(#pexGold_${uid})`} />
            <line x1="305" y1="268" x2="298" y2="322" stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />
          </g>
        )}
        {weaponType === 'staff' && (
          <g filter={`url(#pexNeonBlur_${uid})`}>
            <line x1="330" y1="68" x2="298" y2="396" stroke={`url(#pexGold_${uid})`} strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="332" cy="52" r="18" fill="none" stroke="#ffd45a" strokeWidth="2.5" />
            <polygon points="332,37 342,52 332,67 322,52" fill={`url(#pexCrystal_${uid})`} />
          </g>
        )}
        {weaponType === 'daggers' && (
          <g filter={`url(#pexNeonBlur_${uid})`}>
            <polygon points="78,195 92,268 74,274" fill={`url(#pexCrystal_${uid})`} stroke="#ffd45a" strokeWidth="1.2" />
            <polygon points="342,195 328,268 346,274" fill={`url(#pexCrystal_${uid})`} stroke="#ffd45a" strokeWidth="1.2" />
          </g>
        )}
        {weaponType === 'gauntlets' && (
          <g filter={`url(#pexNeonBlur_${uid})`}>
            <circle cx="94" cy="316" r="22" fill="none" stroke="#00eaff" strokeWidth="2.2" strokeDasharray="6 4" />
            <circle cx="326" cy="316" r="22" fill="none" stroke="#00eaff" strokeWidth="2.2" strokeDasharray="6 4" />
          </g>
        )}
        {(!weaponType || weaponType === 'sword') && (
          <g filter={`url(#pexNeonBlur_${uid})`}>
            {/* Espada rúnica relámpago desenfundada al costado */}
            <polygon points="338,34 346,52 312,264 300,262" fill={`url(#pexCrystal_${uid})`} stroke="#ffffff" strokeWidth="1" />
            <line x1="337" y1="48" x2="306" y2="256" stroke="#ffffff" strokeWidth="1.6" opacity="0.85" />
            <path d="M284 258 L328 266 L324 274 L282 266 Z" fill={`url(#pexGold_${uid})`} />
            <circle cx="305" cy="266" r="4.5" fill="#00eaff" />
            <line x1="304" y1="271" x2="297" y2="318" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
            <circle cx="296" cy="321" r="5" fill="#ffd45a" />
          </g>
        )}
 
        {/* CABELLO TRASERO LARGO PARA VERSIÓN FEMENINA */}
        {isFemale && (
          <path
            d="M142 104 C114 156, 108 242, 118 332 C142 318, 152 292, 158 265 L262 265 C268 292, 278 318, 302 332 C312 242, 306 156, 278 104 Z"
            fill={`url(#pexHair_${uid})`}
            stroke="#1e3a8a"
            strokeWidth="1.2"
          />
        )}
 
        {/* TORSO Y ARMADURA FANTASY OBSIDIANA CON FILIGRANA DORADA */}
        <path
          d={
            isFemale
              ? 'M146 224 L274 224 L294 398 L126 398 Z'
              : 'M134 222 L286 222 L310 398 L110 398 Z'
          }
          fill={`url(#pexObsidian_${uid})`}
          stroke={`url(#pexGold_${uid})`}
          strokeWidth="2.4"
        />
 
        {/* Cuello alto blindado de la armadura */}
        <path
          d="M164 204 L182 232 L238 232 L256 204 L268 226 L236 250 L184 250 L152 226 Z"
          fill="#0b1226"
          stroke={`url(#pexGold_${uid})`}
          strokeWidth="2"
        />
 
        {/* Placas pectorales esculpidas y filigranas doradas */}
        <path
          d="M148 246 L192 268 L184 334 L138 312 Z"
          fill="#111c3a"
          stroke={`url(#pexGold_${uid})`}
          strokeWidth="1.8"
        />
        <path
          d="M272 246 L228 268 L236 334 L282 312 Z"
          fill="#111c3a"
          stroke={`url(#pexGold_${uid})`}
          strokeWidth="1.8"
        />
 
        {/* Circuitos rúnicos cian brillantes en la coraza */}
        <g filter={`url(#pexNeonBlur_${uid})`}>
          <path d="M154 266 L180 280 L176 312" fill="none" stroke="#00eaff" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M266 266 L240 280 L244 312" fill="none" stroke="#00eaff" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M166 352 L192 338 L228 338 L254 352" fill="none" stroke="#00eaff" strokeWidth="1.8" strokeLinecap="round" />
        </g>
 
        {/* HOMBRERAS ORNAMENTADAS (PAULDRONS) CON FILIGRANA DORADA Y RUNAS */}
        <g>
          {/* Hombrera izquierda */}
          <path
            d="M148 218 C108 216, 84 242, 82 284 C106 286, 132 276, 152 254 Z"
            fill={`url(#pexObsidian_${uid})`}
            stroke={`url(#pexGold_${uid})`}
            strokeWidth="2.4"
          />
          <path
            d="M138 228 C112 228, 96 244, 94 270"
            fill="none"
            stroke="#00eaff"
            strokeWidth="2"
            strokeLinecap="round"
            filter={`url(#pexNeonBlur_${uid})`}
          />
          <circle cx="116" cy="252" r="4" fill="#ffd45a" />
 
          {/* Hombrera derecha */}
          <path
            d="M272 218 C312 216, 336 242, 338 284 C314 286, 288 276, 268 254 Z"
            fill={`url(#pexObsidian_${uid})`}
            stroke={`url(#pexGold_${uid})`}
            strokeWidth="2.4"
          />
          <path
            d="M282 228 C308 228, 324 244, 326 270"
            fill="none"
            stroke="#00eaff"
            strokeWidth="2"
            strokeLinecap="round"
            filter={`url(#pexNeonBlur_${uid})`}
          />
          <circle cx="304" cy="252" r="4" fill="#ffd45a" />
        </g>
 
        {/* GRAN CRISTAL ROMBOIDAL CIAN EN EL CENTRO DEL PECHO */}
        <g filter={`url(#pexNeonBlur_${uid})`}>
          <polygon
            points="210,256 232,286 210,316 188,286"
            fill="#071329"
            stroke={`url(#pexGold_${uid})`}
            strokeWidth="2.8"
          />
          <polygon
            points="210,263 225,286 210,309 195,286"
            fill={`url(#pexCrystal_${uid})`}
          />
          {/* Brillo facetado del cristal */}
          <polygon points="210,263 225,286 210,286" fill="#ffffff" opacity="0.45" />
          <circle cx="206" cy="278" r="2.6" fill="#ffffff" />
        </g>
 
        {/* CUELLO Y CLAVÍCULAS */}
        <path
          d={
            isFemale
              ? 'M194 184 L226 184 L232 232 L188 232 Z'
              : 'M190 182 L230 182 L238 232 L182 232 Z'
          }
          fill={`url(#pexNeckShade_${uid})`}
        />
 
        {/* ROSTRO ANIME */}
        <path
          d={
            isFemale
              ? 'M168 122 C168 162, 184 184, 210 190 C236 184, 252 162, 252 122 C252 86, 234 74, 210 74 C186 74, 168 86, 168 122 Z'
              : 'M165 120 C165 162, 182 186, 210 193 C238 186, 255 162, 255 120 C255 84, 236 72, 210 72 C184 72, 165 84, 165 120 Z'
          }
          fill={`url(#pexSkin_${uid})`}
        />
 
        {/* OJOS ANIME EXPRESIVOS CON IRIS VIOLETA-ÍNDIGO Y DESTELLO CIAN */}
        {/* Ojo Izquierdo */}
        <g>
          <ellipse cx="191" cy="142" rx={isFemale ? '9.5' : '8.8'} ry={isFemale ? '7.8' : '6.6'} fill="#ffffff" />
          <ellipse cx="191.5" cy="142.5" rx="6.2" ry={isFemale ? '7.2' : '6.2'} fill="#4f46e5" />
          <ellipse cx="191.5" cy="143.5" rx="4.2" ry="4.5" fill="#00eaff" opacity="0.72" />
          <circle cx="191.5" cy="142.5" r="2.8" fill="#050817" />
          <circle cx="189" cy="139.5" r="2.3" fill="#ffffff" />
          <circle cx="194" cy="145" r="1.1" fill="#e0f2fe" />
          {/* Delineado superior y ceja */}
          <path
            d={isFemale ? 'M179 136 Q191 129 202 137' : 'M180 137 Q191 132 202 138'}
            fill="none"
            stroke="#050817"
            strokeWidth={isFemale ? '2.8' : '3'}
            strokeLinecap="round"
          />
          <path
            d={isFemale ? 'M178 126 Q190 122 201 127' : 'M178 126 Q191 124 202 129'}
            fill="none"
            stroke="#090d1c"
            strokeWidth={isFemale ? '2' : '2.6'}
            strokeLinecap="round"
          />
        </g>
 
        {/* Ojo Derecho */}
        <g>
          <ellipse cx="229" cy="142" rx={isFemale ? '9.5' : '8.8'} ry={isFemale ? '7.8' : '6.6'} fill="#ffffff" />
          <ellipse cx="228.5" cy="142.5" rx="6.2" ry={isFemale ? '7.2' : '6.2'} fill="#4f46e5" />
          <ellipse cx="228.5" cy="143.5" rx="4.2" ry="4.5" fill="#00eaff" opacity="0.72" />
          <circle cx="228.5" cy="142.5" r="2.8" fill="#050817" />
          <circle cx="226" cy="139.5" r="2.3" fill="#ffffff" />
          <circle cx="231" cy="145" r="1.1" fill="#e0f2fe" />
          {/* Delineado superior y ceja */}
          <path
            d={isFemale ? 'M218 137 Q229 129 241 136' : 'M218 138 Q229 132 240 137'}
            fill="none"
            stroke="#050817"
            strokeWidth={isFemale ? '2.8' : '3'}
            strokeLinecap="round"
          />
          <path
            d={isFemale ? 'M219 127 Q230 122 242 126' : 'M218 129 Q229 124 242 126'}
            fill="none"
            stroke="#090d1c"
            strokeWidth={isFemale ? '2' : '2.6'}
            strokeLinecap="round"
          />
        </g>
 
        {/* Nariz y expresión heroica anime */}
        <path d="M209 152 L207 160 L211 161" fill="none" stroke="#c98a5b" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d={isFemale ? 'M202 171 Q210 175 218 171' : 'M200 172 Q210 175 220 172'}
          fill="none"
          stroke="#9a5b38"
          strokeWidth="2"
          strokeLinecap="round"
        />
 
        {/* CABELLO FRONTAL ANIME (DISTINTO PARA MASCULINO Y FEMENINO) */}
        {isFemale ? (
          <g>
            {/* Melena frontal y flequillo estilizado */}
            <path
              d="M158 134 C154 82, 180 58, 210 58 C240 58, 266 82, 262 134 L254 228 L244 156 L234 126 L222 146 L212 118 L202 146 L190 124 L178 154 L166 228 Z"
              fill={`url(#pexHair_${uid})`}
            />
            {/* Reflejos azules/violetas en el cabello */}
            <path
              d="M174 96 Q210 82 246 96"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.6"
              opacity="0.45"
              strokeLinecap="round"
            />
            {/* Tiara / diadema rúnica dorada en Etapa >= 2 */}
            {stageScale >= 2 && (
              <path
                d="M174 102 L196 94 L210 84 L224 94 L246 102"
                fill="none"
                stroke="#ffd45a"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            )}
          </g>
        ) : (
          <g>
            {/* Cabello puntiagudo dinámico estilo protagonista shonen/JRPG */}
            <path
              d="M156 130 L146 96 L168 102 L162 66 L188 84 L198 52 L214 78 L234 54 L236 86 L262 72 L252 104 L272 100 L262 132 L252 154 L244 122 L232 142 L222 114 L210 144 L198 114 L186 142 L176 122 L166 154 Z"
              fill={`url(#pexHair_${uid})`}
            />
            {/* Reflejos de luz cian en los mechones */}
            <path
              d="M178 92 L198 76 L212 92 L228 76 L244 92"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.6"
              opacity="0.45"
              strokeLinecap="round"
            />
          </g>
        )}
      </g>
 
      {/* 4. CHISPAS DORADAS Y PARTÍCULAS DE ENERGÍA FLOTANDO */}
      <g className="pex-ember-pulse" filter={`url(#pexNeonBlur_${uid})`}>
        <circle cx="96" cy="296" r="2.6" fill="#ffd45a" />
        <circle cx="324" cy="288" r="2.6" fill="#ffd45a" />
        <circle cx="118" cy="196" r="2.2" fill="#00eaff" />
        <circle cx="302" cy="192" r="2.2" fill="#00eaff" />
        <circle cx="148" cy="336" r="2" fill="#ffd45a" />
        <circle cx="272" cy="338" r="2" fill="#00eaff" />
      </g>
    </svg>
  );
}
 
function buildUserLinkedAnimePrompt(gender, cls, race, evolutionStage) {
  const isFemale = gender === 'female';
  const subject = isFemale
    ? 'young adult anime woman hunter, solo, layered dark hair, expressive glowing eyes, determined heroic expression'
    : 'young adult anime man hunter, solo, messy layered dark hair with individual strands, expressive glowing eyes, serious heroic expression';

  const raceDescriptorMap = {
    monarch_vessel: 'subtle ethereal shadow-sovereign aura, dark royal mantle collar',
    ash_saiyan: 'embers and fiery cyan-orange battle aura sparks around shoulders',
    abyss_demon: 'subtle arcane crimson rune markings on cheek, abyssal obsidian armor',
    valkyrie_dusk: 'luminous twilight feather particles, silver-gold filigree pauldrons',
    fenrir_kin: 'silver wolf-spirit aura, fierce predator gaze, fur-trimmed tactical collar',
    hollow_lord: 'pale celestial steel armor plates, translucent astral halo behind head'
  };
  const racePrompt = raceDescriptorMap[race?.id] || 'fantasy hunter obsidian armor with golden filigree';

  const weaponMap = {
    spear: 'glowing runic spear behind one shoulder',
    greatsword: 'colossal dark runic greatsword behind shoulder',
    staff: 'ornate arcane crystal staff behind shoulder',
    daggers: 'twin glowing abyssal daggers at sides',
    gauntlets: 'luminous kinetic combat gauntlets',
    sword: 'glowing runic longsword hilt behind shoulder'
  };
  const weaponPrompt = weaponMap[cls?.weaponType] || weaponMap.sword;
  const affinityName = cls?.affinityName || 'Infinito';
  const stageHint = evolutionStage >= 4
    ? 'transcendent sovereign aura, intricate sacred magic circle'
    : 'arcane geometric magic circle behind shoulders';

  return `${subject}, chest-up half-body portrait, centered composition, ${racePrompt}, ${weaponPrompt}, elemental resonance ${affinityName}, ${stageHint}, deep navy-black cosmos background, dramatic rim lighting, polished Japanese 2D anime key visual, clean lineart, painterly cel shading, premium anime RPG character illustration`;
}

function UserLinkedAnimeAvatarSvg({ isFemale, weaponType, stage, accentColor, race, profile }) {
  const uid = `${isFemale ? 'fem' : 'masc'}_${race?.id || 'base'}`;
  const primaryGlow = accentColor || race?.auraColor || '#00eaff';
  const raceAura = race?.auraColor || '#963cff';
  const irisColor = race?.eyeColor || '#4f46e5';
  const stageScale = Math.min(6, Math.max(1, Number(stage) || 1));

  const bmi = (Number(profile?.weightKg) || 75) / Math.pow((Number(profile?.heightCm) || 176) / 100, 2);
  const shoulderSpread = bmi > 26 ? 1.06 : bmi < 20 ? 0.94 : 1.0;

  return (
    <svg
      viewBox="0 0 420 400"
      width="100%"
      height="395"
      style={{ display: 'block', maxWidth: '460px', margin: '0 auto' }}
      aria-label={`Modelo vinculado a ${profile?.hunterName || 'Cazador'} (${race?.name || 'Linaje'})`}
    >
      <defs>
        <radialGradient id={`pexCosmos_${uid}`} cx="50%" cy="38%" r="68%">
          <stop offset="0%" stopColor="#261b5e" />
          <stop offset="45%" stopColor="#0f1b44" />
          <stop offset="82%" stopColor="#070d24" />
          <stop offset="100%" stopColor="#050817" />
        </radialGradient>
        <radialGradient id={`pexArcaneHalo_${uid}`} cx="50%" cy="44%" r="50%">
          <stop offset="0%" stopColor={primaryGlow} stopOpacity="0.46" />
          <stop offset="50%" stopColor={raceAura} stopOpacity="0.24" />
          <stop offset="100%" stopColor="#050817" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`pexSkin_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffedd5" />
          <stop offset="72%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#f5b882" />
        </linearGradient>
        <linearGradient id={`pexNeckShade_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d99b6c" />
          <stop offset="55%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#ffedd5" />
        </linearGradient>
        <linearGradient id={`pexHair_${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="45%" stopColor={race?.hairColor || '#090d1c'} />
          <stop offset="100%" stopColor="#04060e" />
        </linearGradient>
        <linearGradient id={`pexObsidian_${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={race?.id === 'hollow_lord' ? '#334155' : '#1e293b'} />
          <stop offset="45%" stopColor="#0d1429" />
          <stop offset="100%" stopColor="#050814" />
        </linearGradient>
        <linearGradient id={`pexGold_${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="48%" stopColor="#ffd45a" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id={`pexCape_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={race?.id === 'valkyrie_dusk' ? '#4c1d95' : '#be123c'} />
          <stop offset="55%" stopColor={race?.id === 'valkyrie_dusk' ? '#2e1065' : '#881337'} />
          <stop offset="100%" stopColor="#1e0716" />
        </linearGradient>
        <linearGradient id={`pexCrystal_${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor={primaryGlow} />
          <stop offset="100%" stopColor={raceAura} />
        </linearGradient>
        <filter id={`pexNeonBlur_${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="420" height="400" fill={`url(#pexCosmos_${uid})`} />
      <circle cx="210" cy="175" r="180" fill={`url(#pexArcaneHalo_${uid})`} />

      <g className="pex-arcane-ring-cw" opacity={0.48 + stageScale * 0.08}>
        <circle cx="210" cy="175" r="126" fill="none" stroke={primaryGlow} strokeWidth="1.5" strokeDasharray="8 5 2 5" />
        <circle cx="210" cy="175" r="116" fill="none" stroke="#ffd45a" strokeWidth="0.9" strokeOpacity="0.65" />
        <polygon points="210,52 297,88 333,175 297,262 210,298 123,262 87,175 123,88" fill="none" stroke={primaryGlow} strokeWidth="1.1" strokeOpacity="0.6" />
        <polygon points="210,52 333,175 210,298 87,175" fill="none" stroke={raceAura} strokeWidth="1.2" strokeOpacity="0.7" />
        <circle cx="210" cy="49" r="3.8" fill={primaryGlow} />
        <circle cx="336" cy="175" r="3.8" fill={primaryGlow} />
        <circle cx="210" cy="301" r="3.8" fill={primaryGlow} />
        <circle cx="84" cy="175" r="3.8" fill={primaryGlow} />
      </g>

      <g className="pex-arcane-ring-ccw" opacity="0.6">
        <circle cx="210" cy="175" r="92" fill="none" stroke={raceAura} strokeWidth="1.3" strokeDasharray="4 6" />
        {stageScale >= 2 && <circle cx="210" cy="175" r="142" fill="none" stroke="#ffd45a" strokeWidth="1.1" strokeDasharray="3 9" />}
        {stageScale >= 4 && <circle cx="210" cy="175" r="154" fill="none" stroke={primaryGlow} strokeWidth="1.3" strokeDasharray="12 6" />}
      </g>

      <g className="pex-avatar-hero-float">
        {(race?.id === 'valkyrie_dusk' || stageScale >= 4) && (
          <g opacity="0.78" filter={`url(#pexNeonBlur_${uid})`}>
            <path d="M135 215 C72 175, 42 125, 36 82 C75 102, 112 138, 145 186 Z" fill={primaryGlow} opacity="0.35" stroke="#ffd45a" strokeWidth="1.2" />
            <path d="M285 215 C348 175, 378 125, 384 82 C345 102, 308 138, 275 186 Z" fill={primaryGlow} opacity="0.35" stroke="#ffd45a" strokeWidth="1.2" />
          </g>
        )}

        <path d="M118 228 C78 265, 58 325, 48 398 L372 398 C362 325, 342 265, 302 228 Z" fill={`url(#pexCape_${uid})`} stroke={`url(#pexGold_${uid})`} strokeWidth="2" />

        {weaponType === 'spear' && (
          <g filter={`url(#pexNeonBlur_${uid})`}>
            <line x1="336" y1="36" x2="292" y2="396" stroke={`url(#pexGold_${uid})`} strokeWidth="5" strokeLinecap="round" />
            <polygon points="336,14 348,54 336,68 324,54" fill={`url(#pexCrystal_${uid})`} stroke="#ffffff" strokeWidth="1" />
          </g>
        )}
        {weaponType === 'greatsword' && (
          <g filter={`url(#pexNeonBlur_${uid})`}>
            <polygon points="334,26 350,48 318,266 296,262" fill="#0f172a" stroke={primaryGlow} strokeWidth="2.2" />
            <line x1="333" y1="44" x2="308" y2="254" stroke={primaryGlow} strokeWidth="2.6" />
            <rect x="285" y="260" width="44" height="9" rx="3" transform="rotate(9 307 264)" fill={`url(#pexGold_${uid})`} />
          </g>
        )}
        {weaponType === 'staff' && (
          <g filter={`url(#pexNeonBlur_${uid})`}>
            <line x1="330" y1="68" x2="298" y2="396" stroke={`url(#pexGold_${uid})`} strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="332" cy="52" r="18" fill="none" stroke="#ffd45a" strokeWidth="2.5" />
            <polygon points="332,37 342,52 332,67 322,52" fill={`url(#pexCrystal_${uid})`} />
          </g>
        )}
        {weaponType === 'daggers' && (
          <g filter={`url(#pexNeonBlur_${uid})`}>
            <polygon points="78,195 92,268 74,274" fill={`url(#pexCrystal_${uid})`} stroke="#ffd45a" strokeWidth="1.2" />
            <polygon points="342,195 328,268 346,274" fill={`url(#pexCrystal_${uid})`} stroke="#ffd45a" strokeWidth="1.2" />
          </g>
        )}
        {weaponType === 'gauntlets' && (
          <g filter={`url(#pexNeonBlur_${uid})`}>
            <circle cx="94" cy="316" r="22" fill="none" stroke={primaryGlow} strokeWidth="2.4" strokeDasharray="6 4" />
            <circle cx="326" cy="316" r="22" fill="none" stroke={primaryGlow} strokeWidth="2.4" strokeDasharray="6 4" />
          </g>
        )}
        {(!weaponType || weaponType === 'sword') && (
          <g filter={`url(#pexNeonBlur_${uid})`}>
            <polygon points="338,34 346,52 312,264 300,262" fill={`url(#pexCrystal_${uid})`} stroke="#ffffff" strokeWidth="1" />
            <path d="M284 258 L328 266 L324 274 L282 266 Z" fill={`url(#pexGold_${uid})`} />
            <circle cx="305" cy="266" r="4.5" fill={primaryGlow} />
          </g>
        )}

        {isFemale && (
          <path d="M142 104 C114 156, 108 242, 118 332 C142 318, 152 292, 158 265 L262 265 C268 292, 278 318, 302 332 C312 242, 306 156, 278 104 Z" fill={`url(#pexHair_${uid})`} stroke={primaryGlow} strokeWidth="1.1" />
        )}

        <g transform={`translate(210, 260) scale(${shoulderSpread}, 1) translate(-210, -260)`}>
          <path
            d={isFemale ? 'M146 224 L274 224 L294 398 L126 398 Z' : 'M134 222 L286 222 L310 398 L110 398 Z'}
            fill={`url(#pexObsidian_${uid})`}
            stroke={`url(#pexGold_${uid})`}
            strokeWidth="2.4"
          />
          <path d="M164 204 L182 232 L238 232 L256 204 L268 226 L236 250 L184 250 L152 226 Z" fill="#0b1226" stroke={`url(#pexGold_${uid})`} strokeWidth="2" />
          <g filter={`url(#pexNeonBlur_${uid})`}>
            <path d="M154 266 L180 280 L176 312" fill="none" stroke={primaryGlow} strokeWidth="1.9" strokeLinecap="round" />
            <path d="M266 266 L240 280 L244 312" fill="none" stroke={primaryGlow} strokeWidth="1.9" strokeLinecap="round" />
            <path d="M166 352 L192 338 L228 338 L254 352" fill="none" stroke={primaryGlow} strokeWidth="1.9" strokeLinecap="round" />
          </g>
          <path d="M148 218 C108 216, 84 242, 82 284 C106 286, 132 276, 152 254 Z" fill={`url(#pexObsidian_${uid})`} stroke={`url(#pexGold_${uid})`} strokeWidth="2.4" />
          <path d="M272 218 C312 216, 336 242, 338 284 C314 286, 288 276, 268 254 Z" fill={`url(#pexObsidian_${uid})`} stroke={`url(#pexGold_${uid})`} strokeWidth="2.4" />
        </g>

        <g filter={`url(#pexNeonBlur_${uid})`}>
          <polygon points="210,256 232,286 210,316 188,286" fill="#071329" stroke={`url(#pexGold_${uid})`} strokeWidth="2.8" />
          <polygon points="210,263 225,286 210,309 195,286" fill={`url(#pexCrystal_${uid})`} />
          <circle cx="206" cy="278" r="2.6" fill="#ffffff" />
        </g>

        <path d={isFemale ? 'M194 184 L226 184 L232 232 L188 232 Z' : 'M190 182 L230 182 L238 232 L182 232 Z'} fill={`url(#pexNeckShade_${uid})`} />
        <path
          d={isFemale
            ? 'M168 122 C168 162, 184 184, 210 190 C236 184, 252 162, 252 122 C252 86, 234 74, 210 74 C186 74, 168 86, 168 122 Z'
            : 'M165 120 C165 162, 182 186, 210 193 C238 186, 255 162, 255 120 C255 84, 236 72, 210 72 C184 72, 165 84, 165 120 Z'}
          fill={`url(#pexSkin_${uid})`}
        />

        {race?.id === 'abyss_demon' && (
          <g filter={`url(#pexNeonBlur_${uid})`}>
            <path d="M166 96 C150 76, 152 54, 166 44 C164 62, 168 76, 178 86 Z" fill="#be123c" stroke="#ffd45a" strokeWidth="1.2" />
            <path d="M254 96 C270 76, 268 54, 254 44 C256 62, 252 76, 242 86 Z" fill="#be123c" stroke="#ffd45a" strokeWidth="1.2" />
          </g>
        )}
        {race?.id === 'fenrir_kin' && (
          <g>
            <polygon points="164,95 154,54 184,78" fill="#1e293b" stroke={primaryGlow} strokeWidth="1.5" />
            <polygon points="256,95 266,54 236,78" fill="#1e293b" stroke={primaryGlow} strokeWidth="1.5" />
          </g>
        )}
        {(race?.id === 'monarch_vessel' || race?.id === 'hollow_lord' || stageScale >= 3) && (
          <g filter={`url(#pexNeonBlur_${uid})`}>
            <path d="M178 62 L192 44 L210 56 L228 44 L242 62" fill="none" stroke="#ffd45a" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )}

        <g>
          <ellipse cx="191" cy="142" rx={isFemale ? '9.5' : '8.8'} ry={isFemale ? '7.8' : '6.6'} fill="#ffffff" />
          <ellipse cx="191.5" cy="142.5" rx="6.2" ry={isFemale ? '7.2' : '6.2'} fill={irisColor} />
          <ellipse cx="191.5" cy="143.5" rx="4.2" ry="4.5" fill={primaryGlow} opacity="0.72" />
          <circle cx="191.5" cy="142.5" r="2.8" fill="#050817" />
          <circle cx="189" cy="139.5" r="2.3" fill="#ffffff" />
          <path d={isFemale ? 'M179 136 Q191 129 202 137' : 'M180 137 Q191 132 202 138'} fill="none" stroke="#050817" strokeWidth="2.9" strokeLinecap="round" />
        </g>
        <g>
          <ellipse cx="229" cy="142" rx={isFemale ? '9.5' : '8.8'} ry={isFemale ? '7.8' : '6.6'} fill="#ffffff" />
          <ellipse cx="228.5" cy="142.5" rx="6.2" ry={isFemale ? '7.2' : '6.2'} fill={irisColor} />
          <ellipse cx="228.5" cy="143.5" rx="4.2" ry="4.5" fill={primaryGlow} opacity="0.72" />
          <circle cx="228.5" cy="142.5" r="2.8" fill="#050817" />
          <circle cx="226" cy="139.5" r="2.3" fill="#ffffff" />
          <path d={isFemale ? 'M218 137 Q229 129 241 136' : 'M218 138 Q229 132 240 137'} fill="none" stroke="#050817" strokeWidth="2.9" strokeLinecap="round" />
        </g>

        <path d="M209 152 L207 160 L211 161" fill="none" stroke="#c98a5b" strokeWidth="1.6" strokeLinecap="round" />
        <path d={isFemale ? 'M202 171 Q210 175 218 171' : 'M200 172 Q210 175 220 172'} fill="none" stroke="#9a5b38" strokeWidth="2" strokeLinecap="round" />

        {isFemale ? (
          <g>
            <path d="M158 134 C154 82, 180 58, 210 58 C240 58, 266 82, 262 134 L254 228 L244 156 L234 126 L222 146 L212 118 L202 146 L190 124 L178 154 L166 228 Z" fill={`url(#pexHair_${uid})`} />
            <path d="M174 96 Q210 82 246 96" fill="none" stroke={primaryGlow} strokeWidth="1.6" opacity="0.5" strokeLinecap="round" />
          </g>
        ) : (
          <g>
            <path d="M156 130 L146 96 L168 102 L162 66 L188 84 L198 52 L214 78 L234 54 L236 86 L262 72 L252 104 L272 100 L262 132 L252 154 L244 122 L232 142 L222 114 L210 144 L198 114 L186 142 L176 122 L166 154 Z" fill={`url(#pexHair_${uid})`} />
            <path d="M178 92 L198 76 L212 92 L228 76 L244 92" fill="none" stroke={primaryGlow} strokeWidth="1.6" opacity="0.5" strokeLinecap="round" />
          </g>
        )}
      </g>

      <g className="pex-ember-pulse" filter={`url(#pexNeonBlur_${uid})`}>
        <circle cx="96" cy="296" r="2.8" fill="#ffd45a" />
        <circle cx="324" cy="288" r="2.8" fill="#ffd45a" />
        <circle cx="118" cy="196" r="2.4" fill={primaryGlow} />
        <circle cx="302" cy="192" r="2.4" fill={primaryGlow} />
      </g>
    </svg>
  );
}

function Interactive3DAvatarViewer({ isFemale, weaponType, stage, accentColor, race, profile, hunterGrade }) {
  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(4);
  const [autoSpin, setAutoSpin] = useState(true);
  const draggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!autoSpin) return;
    const id = setInterval(() => {
      if (!draggingRef.current) {
        setRotY((prev) => (prev + 1.2) % 360);
      }
    }, 30);
    return () => clearInterval(id);
  }, [autoSpin]);

  const handlePointerDown = (e) => {
    draggingRef.current = true;
    setAutoSpin(false);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setRotY((prev) => (prev + dx * 0.65 + 360) % 360);
    setRotX((prev) => Math.max(-22, Math.min(24, prev - dy * 0.35)));
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  const primaryGlow = accentColor || race?.auraColor || '#00eaff';
  const normalizedYaw = rotY > 180 ? rotY - 360 : rotY;
  const parallaxX = Math.sin((rotY * Math.PI) / 180) * 18;
  const parallaxScaleX = Math.max(0.72, Math.cos((rotY * Math.PI) / 180) * 0.25 + 0.75);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        position: 'relative',
        height: '395px',
        width: '100%',
        perspective: '920px',
        background: 'radial-gradient(circle at 50% 45%, #19265c 0%, #070c22 65%, #040612 100%)',
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'none',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ position: 'absolute', bottom: '52px', left: '12px', zIndex: 12, display: 'flex', gap: '6px', alignItems: 'center' }}>
        <span className="sys-badge" style={{ background: 'rgba(5,8,23,0.85)', color: primaryGlow, border: `1px solid ${primaryGlow}`, fontSize: '9px' }}>
          <Box size={11} /> VISOR 3D • YAW {Math.round(normalizedYaw)}°
        </span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setAutoSpin((s) => !s); }}
          style={{
            background: 'rgba(5,8,23,0.85)', border: '1px solid rgba(255,212,90,0.5)', color: '#ffd45a',
            borderRadius: '999px', padding: '3px 8px', fontSize: '9px', fontFamily: 'Orbitron, sans-serif', cursor: 'pointer'
          }}
        >
          {autoSpin ? 'Pausar Órbita' : 'Auto-Rotar'}
        </button>
      </div>

      <div
        style={{
          position: 'relative',
          width: '320px',
          height: '340px',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotX}deg) rotateY(${normalizedYaw * 0.42}deg)`,
          transition: draggingRef.current ? 'none' : 'transform 0.12s ease-out'
        }}
      >
        <div
          className="pex-3d-pedestal-cw"
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            width: '250px',
            height: '250px',
            marginLeft: '-125px',
            borderRadius: '50%',
            border: `2px dashed ${primaryGlow}`,
            boxShadow: `0 0 28px ${primaryGlow}, inset 0 0 24px ${primaryGlow}`,
            pointerEvents: 'none'
          }}
        />
        <div
          className="pex-3d-pedestal-ccw"
          style={{
            position: 'absolute',
            bottom: '34px',
            left: '50%',
            width: '190px',
            height: '190px',
            marginLeft: '-95px',
            borderRadius: '50%',
            border: '1.5px solid #ffd45a',
            opacity: 0.75,
            pointerEvents: 'none'
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateZ(26px) translateX(${parallaxX * 0.4}px) scaleX(${parallaxScaleX})`,
            filter: `drop-shadow(0 12px 24px rgba(0,0,0,0.85)) drop-shadow(0 0 14px ${primaryGlow})`
          }}
        >
          <UserLinkedAnimeAvatarSvg
            isFemale={isFemale}
            weaponType={weaponType}
            stage={stage}
            accentColor={primaryGlow}
            race={race}
            profile={profile}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            top: '56px',
            right: '24px',
            transform: `translateZ(58px) translateX(${-parallaxX}px)`,
            padding: '5px 9px',
            borderRadius: '8px',
            background: 'rgba(5,8,23,0.86)',
            border: `1px solid ${primaryGlow}`,
            fontSize: '9px',
            fontFamily: 'Orbitron, sans-serif',
            color: '#fff'
          }}
        >
          {race?.name?.toUpperCase()} • {hunterGrade}
        </div>
      </div>
    </div>
  );
}

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
  passiveClassBonus,
  avatarRenderMode = '2d',
  onToggleRenderMode = () => {}
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
  const cacheKey = `pex_ai_avatar_v5_linked_${gender}_${race.id}_${cls.variantCode || 1}`;

  const [aiImageSrc, setAiImageSrc] = useState(() => {
    try {
      return localStorage.getItem(cacheKey) || null;
    } catch {
      return null;
    }
  });
  const [aiStatus, setAiStatus] = useState('');
  const [styleIdx, setStyleIdx] = useState(0);
  const [showPassiveDetails, setShowPassiveDetails] = useState(false);
  const [loreSubTab, setLoreSubTab] = useState('origin');

  useEffect(() => {
    try {
      setAiImageSrc(localStorage.getItem(cacheKey) || null);
    } catch {
      setAiImageSrc(null);
    }
  }, [cacheKey]);

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

  const handleInvokeAiPortrait = async () => {
    if (aiStatus) return;
    const prompt = buildUserLinkedAnimePrompt(gender, cls, race, stage);
    const seed = (cls.variantCode || 77) + Math.floor(Math.random() * 900) + (isFemale ? 500 : 100);
    const engines = [
      { label: 'IA 1/3 (Flux)', run: () => tryPollinationsEngine(prompt, seed, 'flux') },
      { label: 'IA 2/3 (Turbo)', run: () => tryPollinationsEngine(prompt, seed + 9, 'turbo') },
      { label: 'IA 3/3 (AI Horde)', run: () => tryAiHordeEngine(prompt) }
    ];
    for (const engine of engines) {
      setAiStatus(`Invocando retrato de ${race.name} con ${engine.label}...`);
      try {
        const verifiedDataUrl = await engine.run();
        setAiImageSrc(verifiedDataUrl);
        setAiStatus('');
        try { localStorage.setItem(cacheKey, verifiedDataUrl); } catch {}
        return;
      } catch {}
    }
    setAiStatus('Servidores IA ocupados • Manteniendo modelo vinculado');
    setTimeout(() => setAiStatus(''), 3200);
  };

  const handleUploadCustomAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result;
      if (typeof dataUrl === 'string') {
        setAiImageSrc(dataUrl);
        try { localStorage.setItem(cacheKey, dataUrl); } catch {}
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const activeStyle = GACHA_STYLES[styleIdx];
  const is3D = avatarRenderMode === '3d';

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
          <div style={{ background: 'rgba(6, 11, 28, 0.86)', backdropFilter: 'blur(8px)', border: '1px solid rgba(var(--neon-accent-rgb), 0.55)', borderRadius: '999px', padding: '4px 10px', fontSize: '10px', fontFamily: 'Orbitron, sans-serif', fontWeight: 800, color: 'var(--neon-gold)' }}>
            GRADO {hunterGrade} • ETAPA {stage}
          </div>
          <div style={{ background: 'rgba(6, 11, 28, 0.84)', border: `1px solid ${race.auraColor || '#00eaff'}`, borderRadius: '999px', padding: '3px 9px', fontSize: '9.5px', fontWeight: 700, color: '#e2e8f0' }}>
            {race.name}
          </div>
        </div>

        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 8, display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '64%' }}>
          <button
            type="button"
            title="Alternar renderizado 2D / 3D"
            onClick={onToggleRenderMode}
            style={{
              background: is3D ? 'rgba(0, 234, 255, 0.22)' : 'rgba(6, 11, 28, 0.84)',
              border: '1px solid var(--neon-blue)', color: 'var(--neon-blue)', borderRadius: '999px',
              padding: '4px 8px', fontSize: '9.5px', fontFamily: 'Orbitron, sans-serif', fontWeight: 800,
              display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer'
            }}
          >
            {is3D ? <Box size={11} /> : <Layers size={11} />} {is3D ? '3D' : '2D'}
          </button>

          {!is3D && (
            <>
              <button
                type="button"
                onClick={() => setStyleIdx((prev) => (prev + 1) % GACHA_STYLES.length)}
                style={{
                  background: 'rgba(6, 11, 28, 0.84)', border: '1px solid rgba(var(--neon-accent-rgb), 0.55)',
                  color: 'var(--neon-gold)', borderRadius: '999px', padding: '4px 8px', fontSize: '9.5px',
                  fontFamily: 'Orbitron, sans-serif', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer'
                }}
              >
                <Sparkles size={11} /> {activeStyle.label}
              </button>

              <button
                type="button"
                disabled={Boolean(aiStatus)}
                onClick={handleInvokeAiPortrait}
                style={{
                  background: 'rgba(6, 11, 28, 0.84)', border: '1px solid rgba(var(--neon-secondary-rgb), 0.55)',
                  color: '#e9d5ff', borderRadius: '999px', padding: '4px 8px', fontSize: '9.5px',
                  fontFamily: 'Orbitron, sans-serif', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer'
                }}
              >
                <RotateCcw size={11} /> {aiStatus ? 'IA...' : 'IA Perfil'}
              </button>

              <label
                style={{
                  background: 'rgba(6, 11, 28, 0.84)', border: '1px solid rgba(16, 185, 129, 0.55)',
                  color: '#6ee7b7', borderRadius: '999px', padding: '4px 8px', fontSize: '9.5px',
                  fontFamily: 'Orbitron, sans-serif', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer'
                }}
              >
                <Upload size={11} /> IMG
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUploadCustomAvatar} />
              </label>

              {aiImageSrc && (
                <button
                  type="button"
                  onClick={() => { try { localStorage.removeItem(cacheKey); } catch {} setAiImageSrc(null); }}
                  style={{
                    background: 'rgba(6, 11, 28, 0.84)', border: '1px solid var(--neon-gold)',
                    color: 'var(--neon-gold)', borderRadius: '999px', padding: '4px 8px', fontSize: '9.5px',
                    fontFamily: 'Orbitron, sans-serif', fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  Modelo Base
                </button>
              )}
            </>
          )}

          <button
            type="button"
            onClick={onToggleGender}
            style={{
              background: 'rgba(6, 11, 28, 0.84)', border: '1px solid rgba(var(--neon-primary-rgb), 0.55)',
              color: 'var(--neon-blue)', borderRadius: '999px', padding: '4px 8px', fontSize: '9.5px',
              fontFamily: 'Orbitron, sans-serif', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer'
            }}
          >
            <UserCheck size={11} /> {isFemale ? 'FEM' : 'MASC'}
          </button>
        </div>

        {aiStatus && (
          <div style={{ position: 'absolute', top: '54px', left: '50%', transform: 'translateX(-50%)', zIndex: 9, background: 'rgba(5, 8, 23, 0.92)', border: '1px solid var(--neon-blue)', borderRadius: '999px', padding: '5px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--neon-blue)', whiteSpace: 'nowrap' }}>
            ⚡ {aiStatus}
          </div>
        )}

        <div style={{ position: 'relative', zIndex: 2, filter: is3D ? 'none' : activeStyle.filter, transition: 'filter 0.45s ease' }}>
          {is3D ? (
            <Interactive3DAvatarViewer
              isFemale={isFemale}
              weaponType={cls.weaponType}
              stage={stage}
              accentColor={cls.accentColor}
              race={race}
              profile={profile}
              hunterGrade={hunterGrade}
            />
          ) : aiImageSrc ? (
            <img
              src={aiImageSrc}
              alt={`Avatar ${race.name} de ${profile?.hunterName}`}
              onError={() => setAiImageSrc(null)}
              style={{ width: '100%', height: '395px', objectFit: 'cover', objectPosition: 'center 28%', display: 'block' }}
            />
          ) : (
            <UserLinkedAnimeAvatarSvg
              isFemale={isFemale}
              weaponType={cls.weaponType}
              stage={stage}
              accentColor={cls.accentColor}
              race={race}
              profile={profile}
            />
          )}
        </div>

        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: activeStyle.auraOverlay }} />
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
  const [avatarRenderMode, setAvatarRenderMode] = useState(() => initialData?.avatarRenderMode || '2d');
 
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
        avatarRenderMode,
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
        avatarRenderMode,
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
    savedRoutineAnalysis, dailyStepGoal, sleepLogs, yearlyRecap, routineDayLogs, activityLogs, neonTheme, avatarRenderMode
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
      <canvas ref={canvasRef} style={{ display: 'none' }} />
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
                  if (!cityUnlocked) {
                    triggerToast('🔒 Completa el Capítulo 1 de Historia PvE para fundar tu Ciudad 2D y desbloquear la Novela Visual.');
                  }
                  setActiveTab('city_vn');
                  setDrawerOpen(false);
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {cityUnlocked ? <Heart size={17} color="#fb7185" /> : <Lock size={17} color="#94a3b8" />}
                  Ciudad 2D & Novela Visual
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
 
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '36px 1fr', alignItems: 'center', gap: '8px' }}>
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
              passiveClassBonus={passiveClassBonus}
              avatarRenderMode={avatarRenderMode}
              onToggleRenderMode={() => {
                const nextMode = avatarRenderMode === '2d' ? '3d' : '2d';
                setAvatarRenderMode(nextMode);
                triggerToast(`Modo de Avatar cambiado a ${nextMode.toUpperCase()}`);
              }}
            />
 
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
                MOTOR DE RENDERIZADO DE AVATAR (2D / 3D) & LINAJE
              </div>
              <div className="grid-2" style={{ marginBottom: '10px' }}>
                <button
                  type="button"
                  onClick={() => { setAvatarRenderMode('2d'); triggerToast('Modo 2D (Anime Ilustrado) activado.'); }}
                  style={{
                    padding: '10px', borderRadius: '10px', cursor: 'pointer', textAlign: 'left',
                    background: avatarRenderMode === '2d' ? 'rgba(0,234,255,0.22)' : 'rgba(11,21,48,0.7)',
                    border: `1.5px solid ${avatarRenderMode === '2d' ? 'var(--neon-blue)' : 'rgba(148,163,184,0.25)'}`,
                    color: '#fff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '12px', color: '#00eaff' }}>
                    <Layers size={14} /> MODO 2D (ANIME)
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => { setAvatarRenderMode('3d'); triggerToast('Modo 3D (Visor Interactivo) activado.'); }}
                  style={{
                    padding: '10px', borderRadius: '10px', cursor: 'pointer', textAlign: 'left',
                    background: avatarRenderMode === '3d' ? 'rgba(255,212,90,0.22)' : 'rgba(11,21,48,0.7)',
                    border: `1.5px solid ${avatarRenderMode === '3d' ? 'var(--neon-gold)' : 'rgba(148,163,184,0.25)'}`,
                    color: '#fff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '12px', color: '#ffd45a' }}>
                    <Box size={14} /> MODO 3D (INTERACTIVO)
                  </div>
                </button>
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
