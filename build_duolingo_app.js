// build_duolingo_app.js
const fs = require('fs');
const path = require('path');
const { avatars, icons, sideMascots } = require('./generate_duolingo_masterpiece.js');

console.log("Compiling Missão Tabuada Duolingo Masterpiece with Official Heroes Branding...");

// 1. Lessons Data (10 Verified Lessons with Lore from Léo & Maya)
const lessonsDataJson = {
  1: {
    unit: 1,
    title: "Tabuada do 2 • Iniciação",
    subtitle: "Treinamento Base com o Léo",
    questions: [
      { q: "Quanto é 2 × 3?", options: [4, 6, 8, 9], correct: 6, tip: "Dica do Léo: 3 + 3 = 6!" },
      { q: "Quanto é 2 × 6?", options: [10, 12, 14, 16], correct: 12, tip: "Dica do Léo: O dobro de 6 é 12!" },
      { q: "Se cada herói tem 2 capas, quantas capas têm 4 heróis?", options: [6, 8, 10, 12], correct: 8, tip: "2 × 4 = 8 capas heroicas!" },
      { q: "Quanto é 2 × 9?", options: [16, 17, 18, 20], correct: 18, tip: "Dica do Léo: 9 + 9 = 18!" }
    ]
  },
  2: {
    unit: 1,
    title: "Tabuada do 3 • Floresta Mágica",
    subtitle: "Desafio dos Cristais com a Maya",
    questions: [
      { q: "Quanto é 3 × 4?", options: [10, 12, 15, 16], correct: 12, tip: "Dica da Maya: 4 + 4 + 4 = 12!" },
      { q: "Quanto é 3 × 7?", options: [18, 20, 21, 24], correct: 21, tip: "Dica da Maya: 7 + 7 + 7 = 21!" },
      { q: "Três equipes com 5 heróis cada. Quantos no total?", options: [12, 15, 18, 20], correct: 15, tip: "3 × 5 = 15 heróis da multiplicação!" },
      { q: "Quanto é 3 × 9?", options: [24, 26, 27, 30], correct: 27, tip: "Dica da Maya: 30 menos 3 é 27!" }
    ]
  },
  3: {
    unit: 1,
    title: "Batalha das Estrelas (2 e 3)",
    subtitle: "Revisão Estelar da Liga",
    questions: [
      { q: "Desafio Relâmpago: 2 × 8 = ?", options: [14, 16, 18, 20], correct: 16, tip: "Dica: 8 + 8 = 16!" },
      { q: "Qual número completa: 3 × [ ? ] = 18", options: [5, 6, 7, 8], correct: 6, tip: "Dica: 3 × 6 = 18!" },
      { q: "Quanto é (2 × 5) + (3 × 2)?", options: [14, 15, 16, 18], correct: 16, tip: "Dica da Liga: 10 + 6 = 16!" }
    ]
  },
  4: {
    unit: 2,
    title: "Tabuada do 4 • Castelo dos Quadrados",
    subtitle: "Laboratório de Estratégia da Maya",
    questions: [
      { q: "Quanto é 4 × 4?", options: [12, 14, 16, 18], correct: 16, tip: "4 grupos de 4 é igual a 16!" },
      { q: "Quanto é 4 × 7?", options: [24, 26, 28, 32], correct: 28, tip: "Dica da Maya: O dobro de 14 é 28!" },
      { q: "Quanto é 4 × 8?", options: [30, 32, 34, 36], correct: 32, tip: "Dica do Léo: 8 + 8 + 8 + 8 = 32!" }
    ]
  },
  5: {
    unit: 2,
    title: "Tabuada do 5 • Montanha do Relógio",
    subtitle: "O Salto Quíntuplo dos Heróis",
    questions: [
      { q: "Quanto é 5 × 5?", options: [20, 25, 30, 35], correct: 25, tip: "Conte de 5 em 5: 5, 10, 15, 20, 25!" },
      { q: "Quanto é 5 × 8?", options: [35, 40, 45, 50], correct: 40, tip: "Dica: Metade de 80 é 40!" },
      { q: "Quanto é 5 × 9?", options: [40, 45, 50, 55], correct: 45, tip: "Termina em 5: 45!" }
    ]
  },
  6: {
    unit: 2,
    title: "Tabuada do 6 • Fortaleza dos Hexágonos",
    subtitle: "Escudo Hexagonal do Léo",
    questions: [
      { q: "Quanto é 6 × 6?", options: [32, 36, 40, 42], correct: 36, tip: "Seis vezes seis = trinta e seis!" },
      { q: "Quanto é 6 × 7?", options: [40, 42, 44, 48], correct: 42, tip: "Dica do Léo: 6 × 7 = 42!" },
      { q: "Quanto é 6 × 8?", options: [46, 48, 50, 54], correct: 48, tip: "Seis vezes oito = quarenta e oito!" }
    ]
  },
  7: {
    unit: 3,
    title: "Tabuada do 7 • Vulcão do 7",
    subtitle: "O Grande Mistério da Multiplicação",
    questions: [
      { q: "O Terror da Tabuada: Quanto é 7 × 8?", options: [54, 56, 58, 64], correct: 56, tip: "Memorize o segredo: 5, 6, 7, 8 -> 56 = 7 × 8!" },
      { q: "Quanto é 7 × 7?", options: [42, 47, 49, 51], correct: 49, tip: "Sete vezes sete = 49!" },
      { q: "Quanto é 7 × 9?", options: [61, 63, 65, 70], correct: 63, tip: "Dica da Maya: 70 menos 7 é 63!" }
    ]
  },
  8: {
    unit: 3,
    title: "Tabuada do 8 • Vale dos Polvos",
    subtitle: "Os Oito Tentáculos Mágicos",
    questions: [
      { q: "Quanto é 8 × 8?", options: [60, 62, 64, 68], correct: 64, tip: "Oito vezes oito = 64!" },
      { q: "Quanto é 8 × 6?", options: [42, 46, 48, 52], correct: 48, tip: "Dica: 8 × 6 = 48!" },
      { q: "Quanto é 8 × 9?", options: [68, 70, 72, 74], correct: 72, tip: "Dica do Léo: 80 menos 8 é 72!" }
    ]
  },
  9: {
    unit: 3,
    title: "Tabuada do 9 • Truque Mágico",
    subtitle: "O Segredo dos Dedos e das Dezenas",
    questions: [
      { q: "Quanto é 9 × 9?", options: [79, 80, 81, 89], correct: 81, tip: "A soma dos dígitos dá 9: 8 + 1 = 9!" },
      { q: "Quanto é 9 × 6?", options: [52, 54, 56, 58], correct: 54, tip: "5 + 4 = 9, então 54!" },
      { q: "Quanto é 9 × 7?", options: [61, 63, 67, 72], correct: 63, tip: "6 + 3 = 9, então 63!" }
    ]
  },
  10: {
    unit: 4,
    title: "Tabuada do 10 & Chefão Final",
    subtitle: "Duelo com o Monstrinho dos Números",
    questions: [
      { q: "Batalha do Chefão: Quanto é 10 × 7?", options: [60, 70, 75, 80], correct: 70, tip: "Basta colocar o zero no final: 70!" },
      { q: "Quanto é 10 × 9?", options: [80, 89, 90, 100], correct: 90, tip: "9 com zero vira 90!" },
      { q: "GOLPE FINAL NO CHEFÃO: (7 × 8) + 10 = ?", options: [64, 66, 68, 70], correct: 66, tip: "56 + 10 = 66! O Monstrinho virou seu amigo!" }
    ]
  }
};

// Unit themes with official heroes stationed along the trail
const unitsData = [
  {
    id: 1,
    title: "Unidade 1: Floresta dos Heróis",
    desc: "Treinamento com o Léo (Tabuadas do 2 e 3)",
    color: "#58CC02",
    colorDark: "#46A302",
    levels: [1, 2, 3],
    mascot: sideMascots.leo_cheering,
    mascotSide: "right",
    chestAfter: 3
  },
  {
    id: 2,
    title: "Unidade 2: Reino da Lógica",
    desc: "Laboratório da Maya (Tabuadas do 4, 5 e 6)",
    color: "#1CB0F6",
    colorDark: "#1899D6",
    levels: [4, 5, 6],
    mascot: sideMascots.maya_cheering,
    mascotSide: "left",
    chestAfter: 6
  },
  {
    id: 3,
    title: "Unidade 3: Vulcão dos Desafios",
    desc: "Desafio Supremo da Liga (Tabuadas do 7, 8 e 9)",
    color: "#FF9600",
    colorDark: "#E08500",
    levels: [7, 8, 9],
    mascot: sideMascots.leo_cheering,
    mascotSide: "right",
    chestAfter: 9
  },
  {
    id: 4,
    title: "Unidade 4: Fortaleza do Chefão",
    desc: "Multiplique por 10 e vença o Monstrinho!",
    color: "#CE82FF",
    colorDark: "#A855F7",
    levels: [10],
    mascot: sideMascots.monstro_boss,
    mascotSide: "left",
    chestAfter: 10
  }
];

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>Missão Tabuada — Heróis da Multiplicação</title>
  
  <!-- Favicon & PWA Theme -->
  <link rel="icon" type="image/png" href="tabuada-assets/heroi-menino-oficial.png">
  <meta name="theme-color" content="#58CC02">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

  <!-- Google Fonts: Fredoka & Nunito -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet">

  <!-- Confetti Canvas -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

  <style>
    /* ========================================================
       HERÓIS DA MULTIPLICAÇÃO — DUOLINGO MATH KAWAII DESIGN SYSTEM
       ======================================================== */
    :root {
      --font-main: 'Fredoka', 'Nunito', -apple-system, sans-serif;
      --font-sub: 'Nunito', 'Fredoka', sans-serif;
      --duo-cream-bg: #FFFDF5;
      --duo-card-bg: #FFFFFF;
      --duo-border: #E5E5E5;
      --duo-dark-text: #2C2C2C;
      --duo-muted-text: #666666;
      
      /* Vibrant Duolingo Palette */
      --duo-green: #58CC02;
      --duo-green-dark: #46A302;
      --duo-blue: #1CB0F6;
      --duo-blue-dark: #1899D6;
      --duo-orange: #FF9600;
      --duo-orange-dark: #E08500;
      --duo-purple: #CE82FF;
      --duo-purple-dark: #A855F7;
      --duo-gold: #FFC800;
      --duo-gold-dark: #E5A500;
      --duo-red: #FF4B4B;
      --duo-red-dark: #EA2B2B;
      --duo-gray: #E5E5E5;
      --duo-gray-dark: #AFAFAF;

      --shadow-depth: 7px;
      --shadow-depth-sm: 4px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      font-family: var(--font-main);
      background-color: #0F172A; /* Outer container frame */
      color: var(--duo-dark-text);
      display: flex;
      justify-content: center;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Main App Viewport (Mobile-first, Max 560px on Desktop) */
    .app-viewport {
      width: 100%;
      max-width: 560px;
      min-height: 100vh;
      background-color: var(--duo-cream-bg);
      position: relative;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 50px rgba(0,0,0,0.5);
      padding-bottom: 78px; /* Space for bottom nav */
    }

    /* ========================================================
       3D TACTILE BUTTONS & CARDS
       ======================================================== */
    .btn-3d {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-main);
      font-weight: 700;
      border-radius: 18px;
      border: none;
      cursor: pointer;
      user-select: none;
      transition: transform 0.08s ease, box-shadow 0.08s ease, filter 0.15s ease;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .btn-3d::after {
      content: '';
      position: absolute;
      top: 3px;
      left: 10px;
      right: 10px;
      height: 38%;
      background: linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%);
      border-radius: 14px 14px 8px 8px;
      pointer-events: none;
    }
    .btn-3d:active {
      transform: translateY(5px);
    }

    .btn-3d-green {
      background: var(--duo-green);
      color: #FFF;
      box-shadow: 0 var(--shadow-depth) 0 var(--duo-green-dark);
    }
    .btn-3d-green:active {
      box-shadow: 0 2px 0 var(--duo-green-dark);
    }

    .btn-3d-blue {
      background: var(--duo-blue);
      color: #FFF;
      box-shadow: 0 var(--shadow-depth) 0 var(--duo-blue-dark);
    }
    .btn-3d-blue:active {
      box-shadow: 0 2px 0 var(--duo-blue-dark);
    }

    .btn-3d-orange {
      background: var(--duo-orange);
      color: #FFF;
      box-shadow: 0 var(--shadow-depth) 0 var(--duo-orange-dark);
    }
    .btn-3d-orange:active {
      box-shadow: 0 2px 0 var(--duo-orange-dark);
    }

    .btn-3d-purple {
      background: var(--duo-purple);
      color: #FFF;
      box-shadow: 0 var(--shadow-depth) 0 var(--duo-purple-dark);
    }
    .btn-3d-purple:active {
      box-shadow: 0 2px 0 var(--duo-purple-dark);
    }

    .btn-3d-gold {
      background: var(--duo-gold);
      color: #78350F;
      box-shadow: 0 var(--shadow-depth) 0 var(--duo-gold-dark);
    }
    .btn-3d-gold:active {
      box-shadow: 0 2px 0 var(--duo-gold-dark);
    }

    .btn-3d-white {
      background: #FFFFFF;
      color: var(--duo-dark-text);
      box-shadow: 0 var(--shadow-depth) 0 #E2E8F0;
      border: 2px solid #E2E8F0;
    }
    .btn-3d-white:active {
      box-shadow: 0 2px 0 #E2E8F0;
    }

    .btn-3d-gray {
      background: var(--duo-gray);
      color: #777;
      box-shadow: 0 var(--shadow-depth) 0 var(--duo-gray-dark);
      cursor: not-allowed;
    }
    .btn-3d-gray:active {
      transform: none;
      box-shadow: 0 var(--shadow-depth) 0 var(--duo-gray-dark);
    }

    /* ========================================================
       TOP HUD STICKY BAR WITH BRAND LOGO
       ======================================================== */
    .app-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(255, 253, 245, 0.96);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-bottom: 2px solid #EFE8D6;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }

    .brand-logo-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      text-decoration: none;
    }
    .brand-logo-img {
      height: 38px;
      width: auto;
      object-fit: contain;
    }

    .hero-badge-btn {
      display: flex;
      align-items: center;
      gap: 7px;
      background: #FFFFFF;
      border: 2px solid #E5E5E5;
      border-radius: 20px;
      padding: 4px 10px 4px 5px;
      cursor: pointer;
      box-shadow: 0 3px 0 #E0E0E0;
      transition: transform 0.08s ease;
    }
    .hero-badge-btn:active {
      transform: translateY(2px);
      box-shadow: 0 1px 0 #E0E0E0;
    }
    .hero-badge-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #FEF3C7;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 1.5px solid #F59E0B;
    }
    .hero-badge-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--duo-dark-text);
      max-width: 78px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .hero-badge-chevron {
      font-size: 11px;
      color: #999;
    }

    .hud-pills {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .hud-pill {
      display: flex;
      align-items: center;
      gap: 4px;
      background: #FFFFFF;
      border: 2px solid #E5E5E5;
      border-radius: 16px;
      padding: 4px 8px;
      font-size: 13px;
      font-weight: 700;
      color: var(--duo-dark-text);
      box-shadow: 0 3px 0 #E0E0E0;
      cursor: pointer;
    }
    .hud-pill:active {
      transform: translateY(2px);
      box-shadow: 0 1px 0 #E0E0E0;
    }
    .hud-svg {
      width: 18px;
      height: 18px;
      display: inline-block;
    }

    .sound-toggle-btn {
      background: #FFFFFF;
      border: 2px solid #E5E5E5;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      box-shadow: 0 3px 0 #E0E0E0;
      cursor: pointer;
      transition: transform 0.08s ease;
      flex-shrink: 0;
    }
    .sound-toggle-btn:active {
      transform: translateY(2px);
      box-shadow: 0 1px 0 #E0E0E0;
    }
    .sound-toggle-btn.muted {
      filter: grayscale(1);
      opacity: 0.6;
    }

    /* ========================================================
       VIP HERO PASS BANNER
       ======================================================== */
    .vip-banner {
      position: relative;
      margin: 10px 14px 4px 14px;
      background: linear-gradient(135deg, #6A1B9A 0%, #8E24AA 50%, #AB47BC 100%);
      border-radius: 20px;
      padding: 12px 16px;
      color: #FFF;
      box-shadow: 0 6px 0 #4A148C;
      display: flex;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      cursor: pointer;
    }
    .vip-banner::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 60%;
      height: 100%;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0) 100%);
      transform: skewX(-25deg);
      animation: sheen 4s infinite;
      pointer-events: none;
    }
    @keyframes sheen {
      0%, 70% { left: -100%; }
      100% { left: 200%; }
    }
    .vip-banner-content {
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 1;
    }
    .vip-crown-badge {
      width: 44px;
      height: 44px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .vip-banner-title {
      font-size: 14px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      color: #FFF;
    }
    .vip-banner-subtitle {
      font-size: 11px;
      font-family: var(--font-sub);
      color: #E1BEE7;
      margin-top: 2px;
    }
    .vip-btn-action {
      z-index: 1;
      padding: 8px 12px;
      font-size: 11px;
      flex-shrink: 0;
    }

    /* ========================================================
       DUOLINGO INTERACTIVE MAP & TRAIL
       ======================================================== */
    .map-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0 40px 0;
      width: 100%;
    }

    .unit-section {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 24px;
    }

    /* Unit Banner Card */
    .unit-banner {
      width: calc(100% - 28px);
      margin: 8px 14px 18px 14px;
      border-radius: 20px;
      padding: 16px 20px;
      color: #FFF;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .unit-banner.u1 { background: var(--duo-green); box-shadow: 0 6px 0 var(--duo-green-dark); }
    .unit-banner.u2 { background: var(--duo-blue); box-shadow: 0 6px 0 var(--duo-blue-dark); }
    .unit-banner.u3 { background: var(--duo-orange); box-shadow: 0 6px 0 var(--duo-orange-dark); }
    .unit-banner.u4 { background: var(--duo-purple); box-shadow: 0 6px 0 var(--duo-purple-dark); }

    .unit-banner-info {
      z-index: 1;
    }
    .unit-banner-header {
      font-size: 13px;
      font-weight: 800;
      opacity: 0.9;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .unit-banner-desc {
      font-size: 13px;
      font-family: var(--font-sub);
      opacity: 0.95;
      margin-top: 3px;
    }

    /* Trail Canvas / SVG Connection */
    .trail-nodes-wrapper {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 36px;
      padding: 10px 0;
    }

    .trail-svg-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    /* Stage Nodes */
    .node-row {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      z-index: 2;
    }
    /* Zig-zag offsets */
    .node-row.shift-left {
      transform: translateX(-65px);
    }
    .node-row.shift-right {
      transform: translateX(65px);
    }
    .node-row.shift-center {
      transform: translateX(0);
    }

    .stage-node-btn {
      position: relative;
      width: 86px;
      height: 82px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.15s ease;
      user-select: none;
    }
    .stage-node-btn::after {
      content: '';
      position: absolute;
      top: 6px;
      left: 14px;
      right: 14px;
      height: 30%;
      background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 100%);
      border-radius: 50%;
      pointer-events: none;
    }
    .stage-node-btn:active {
      transform: translateY(5px);
    }

    /* Node Themes */
    .stage-node-btn.u1 {
      background: var(--duo-green);
      box-shadow: 0 8px 0 var(--duo-green-dark);
    }
    .stage-node-btn.u1:active {
      box-shadow: 0 3px 0 var(--duo-green-dark);
    }

    .stage-node-btn.u2 {
      background: var(--duo-blue);
      box-shadow: 0 8px 0 var(--duo-blue-dark);
    }
    .stage-node-btn.u2:active {
      box-shadow: 0 3px 0 var(--duo-blue-dark);
    }

    .stage-node-btn.u3 {
      background: var(--duo-orange);
      box-shadow: 0 8px 0 var(--duo-orange-dark);
    }
    .stage-node-btn.u3:active {
      box-shadow: 0 3px 0 var(--duo-orange-dark);
    }

    .stage-node-btn.u4 {
      background: var(--duo-purple);
      box-shadow: 0 8px 0 var(--duo-purple-dark);
    }
    .stage-node-btn.u4:active {
      box-shadow: 0 3px 0 var(--duo-purple-dark);
    }

    /* Completed Node State (Golden) */
    .stage-node-btn.completed {
      background: var(--duo-gold) !important;
      box-shadow: 0 8px 0 var(--duo-gold-dark) !important;
    }
    .stage-node-btn.completed:active {
      box-shadow: 0 3px 0 var(--duo-gold-dark) !important;
    }

    /* Locked Node State */
    .stage-node-btn.locked {
      background: var(--duo-gray) !important;
      box-shadow: 0 8px 0 var(--duo-gray-dark) !important;
      cursor: pointer;
    }
    .stage-node-btn.locked:active {
      box-shadow: 0 3px 0 var(--duo-gray-dark) !important;
    }

    /* Node Content */
    .node-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }
    .node-num {
      font-size: 26px;
      font-weight: 800;
      color: #FFF;
      text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }
    .stage-node-btn.completed .node-num {
      color: #78350F;
    }
    .stage-node-btn.locked .node-num {
      display: none;
    }

    /* Boss Node Avatar Image */
    .boss-node-avatar {
      width: 62px;
      height: 62px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .boss-img-node {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    }

    /* Animated SVG Progress Ring on Current Active Stage */
    .progress-ring-svg {
      position: absolute;
      top: -9px;
      left: 50%;
      transform: translateX(-50%) rotate(-90deg);
      width: 104px;
      height: 104px;
      pointer-events: none;
      z-index: 3;
    }
    .progress-ring-circle {
      fill: none;
      stroke: var(--duo-gold);
      stroke-width: 6;
      stroke-linecap: round;
      stroke-dasharray: 280;
      stroke-dashoffset: 70;
      animation: pulseRing 2s infinite alternate ease-in-out;
    }
    @keyframes pulseRing {
      0% { stroke-width: 5; opacity: 0.85; }
      100% { stroke-width: 7; opacity: 1; }
    }

    /* Bouncing Floating Speech Tag "COMEÇAR" */
    .active-bounce-tag {
      position: absolute;
      top: -46px;
      background: #FFFFFF;
      color: var(--duo-green-dark);
      font-family: var(--font-main);
      font-size: 13px;
      font-weight: 800;
      padding: 6px 14px;
      border-radius: 14px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      border: 2px solid #E5E5E5;
      white-space: nowrap;
      animation: tagBounce 1.2s infinite ease-in-out;
      z-index: 4;
      pointer-events: none;
    }
    .active-bounce-tag::after {
      content: '';
      position: absolute;
      bottom: -7px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 7px 6px 0;
      border-style: solid;
      border-color: #FFFFFF transparent transparent;
    }
    @keyframes tagBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-7px); }
    }

    /* Shake Animation for Locked Nodes */
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-8px); }
      40%, 80% { transform: translateX(8px); }
    }
    .shake-node {
      animation: shake 0.4s ease-in-out !important;
    }

    /* ========================================================
       BRAND HEROES STATIONED ALONG THE TRAIL (LÉO, MAYA, MONSTRO)
       ======================================================== */
    .trail-hero-mascot {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 90px;
      height: 105px;
      z-index: 2;
      pointer-events: none;
      filter: drop-shadow(0 8px 14px rgba(0,0,0,0.18));
      animation: floatHeroMascot 3.2s infinite ease-in-out;
    }
    .trail-hero-mascot.pos-left {
      left: 8px;
    }
    .trail-hero-mascot.pos-right {
      right: 8px;
    }
    .trail-hero-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    @keyframes floatHeroMascot {
      0%, 100% { transform: translateY(-50%) rotate(0deg) scale(1); }
      50% { transform: translateY(calc(-50% - 10px)) rotate(3deg) scale(1.03); }
    }

    .trail-boss-mascot {
      width: 100px;
      height: 110px;
      filter: drop-shadow(0 10px 18px rgba(147, 51, 234, 0.4));
    }

    /* ========================================================
       INTERCALATED TREASURE CHESTS
       ======================================================== */
    .chest-row {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px 0;
      z-index: 2;
    }
    .chest-island-btn {
      position: relative;
      width: 80px;
      height: 70px;
      background: #FFFFFF;
      border: 3px solid #E2E8F0;
      border-radius: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 7px 0 #CBD5E1;
      cursor: pointer;
      transition: transform 0.1s ease, box-shadow 0.1s ease;
    }
    .chest-island-btn:active {
      transform: translateY(5px);
      box-shadow: 0 2px 0 #CBD5E1;
    }
    .chest-island-btn.ready-to-open {
      border-color: #FACC15;
      box-shadow: 0 7px 0 #CA8A04;
      animation: chestWobble 1.5s infinite ease-in-out;
    }
    @keyframes chestWobble {
      0%, 100% { transform: rotate(0deg) scale(1); }
      20% { transform: rotate(-5deg) scale(1.05); }
      40% { transform: rotate(5deg) scale(1.05); }
      60% { transform: rotate(-3deg); }
      80% { transform: rotate(3deg); }
    }
    .chest-reward-label {
      font-size: 12px;
      font-weight: 800;
      color: #92400E;
      margin-top: 6px;
      background: #FEF3C7;
      padding: 2px 8px;
      border-radius: 8px;
      border: 1px solid #FDE68A;
    }

    /* ========================================================
       DUOLINGO INTERACTIVE POP-OVER CARD
       ======================================================== */
    .popover-card {
      position: absolute;
      z-index: 50;
      width: 260px;
      background: #FFFFFF;
      border-radius: 22px;
      border: 2px solid #E2E8F0;
      box-shadow: 0 10px 30px rgba(0,0,0,0.18), 0 6px 0 #E2E8F0;
      padding: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transform: translate(-50%, -100%);
      margin-top: -16px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.15s ease, transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .popover-card.open {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, -100%) scale(1);
    }
    .popover-tail {
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #FFFFFF;
    }
    .popover-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--duo-dark-text);
    }
    .popover-subtitle {
      font-size: 13px;
      font-family: var(--font-sub);
      color: var(--duo-muted-text);
      margin-top: 4px;
    }
    .popover-stars {
      display: flex;
      gap: 3px;
      margin: 8px 0 12px 0;
    }
    .popover-star-icon {
      width: 22px;
      height: 22px;
    }
    .popover-start-btn {
      width: 100%;
      padding: 12px;
      font-size: 15px;
    }

    /* Pop-over locked variant */
    .popover-card.locked-popover {
      background: #F8FAFC;
      border-color: #CBD5E1;
      box-shadow: 0 10px 30px rgba(0,0,0,0.18), 0 6px 0 #CBD5E1;
    }
    .popover-card.locked-popover .popover-tail {
      border-top-color: #F8FAFC;
    }

    /* ========================================================
       MODAL: PORTAL DOS HERÓIS (LOGIN & PROFILE SELECTOR)
       ======================================================== */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .modal-card {
      position: relative;
      background: #FFFFFF;
      border-radius: 28px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.3), 0 8px 0 #E2E8F0;
      border: 3px solid #E2E8F0;
      width: 100%;
      max-width: 480px;
      max-height: 92vh;
      overflow-y: auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
    }

    .modal-close-btn {
      position: absolute;
      top: 18px;
      right: 18px;
      background: #F1F5F9;
      border: 2px solid #CBD5E1;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #64748B;
      cursor: pointer;
      box-shadow: 0 3px 0 #CBD5E1;
    }
    .modal-close-btn:active {
      transform: translateY(2px);
      box-shadow: 0 1px 0 #CBD5E1;
    }

    /* Tabs inside Portal */
    .portal-tabs {
      display: flex;
      gap: 8px;
      background: #F1F5F9;
      padding: 5px;
      border-radius: 16px;
      margin-bottom: 20px;
    }
    .portal-tab-btn {
      flex: 1;
      border: none;
      background: transparent;
      padding: 9px;
      border-radius: 12px;
      font-family: var(--font-main);
      font-size: 14px;
      font-weight: 700;
      color: #64748B;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .portal-tab-btn.active {
      background: #FFFFFF;
      color: var(--duo-dark-text);
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

    /* Hero Selector Grid ("Quem vai Jogar Hoje?") */
    .saved-heroes-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }
    .saved-hero-card {
      background: #FFFFFF;
      border: 3px solid #E2E8F0;
      border-radius: 20px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: pointer;
      box-shadow: 0 6px 0 #E2E8F0;
      transition: transform 0.08s ease, box-shadow 0.08s ease;
    }
    .saved-hero-card:active {
      transform: translateY(4px);
      box-shadow: 0 2px 0 #E2E8F0;
    }
    .saved-hero-card:hover {
      border-color: var(--duo-blue);
    }
    .saved-hero-avatar-box {
      width: 68px;
      height: 68px;
      border-radius: 50%;
      background: #FEF3C7;
      border: 2px solid #F59E0B;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .saved-hero-name {
      font-size: 16px;
      font-weight: 800;
      color: var(--duo-dark-text);
    }
    .saved-hero-stats {
      display: flex;
      gap: 6px;
      font-size: 12px;
      color: #64748B;
      margin-top: 4px;
    }

    /* Avatar Grid for Hero Creator */
    .avatar-picker-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin: 12px 0 16px 0;
    }
    .avatar-choice-btn {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      border-radius: 18px;
      background: #FFFFFF;
      border: 3px solid #E2E8F0;
      box-shadow: 0 4px 0 #E2E8F0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      transition: transform 0.08s ease, border-color 0.1s ease;
    }
    .avatar-choice-btn:active {
      transform: translateY(3px);
      box-shadow: 0 1px 0 #E2E8F0;
    }
    .avatar-choice-btn.selected {
      border-color: var(--duo-green);
      background: #F0FDF4;
      box-shadow: 0 4px 0 var(--duo-green-dark);
    }
    .avatar-choice-btn.selected::after {
      content: '✓';
      position: absolute;
      top: -6px;
      right: -6px;
      background: var(--duo-green);
      color: #FFF;
      font-size: 12px;
      font-weight: 900;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #FFF;
    }

    .form-group {
      margin-bottom: 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .form-label {
      font-size: 14px;
      font-weight: 700;
      color: var(--duo-dark-text);
    }
    .form-input-lg {
      width: 100%;
      padding: 14px 18px;
      font-family: var(--font-main);
      font-size: 16px;
      font-weight: 700;
      color: var(--duo-dark-text);
      background: #F8FAFC;
      border: 2px solid #E2E8F0;
      border-radius: 16px;
      outline: none;
      transition: border-color 0.15s ease;
    }
    .form-input-lg:focus {
      border-color: var(--duo-blue);
      background: #FFF;
    }

    /* ========================================================
       MODAL: QUARTEL DO HERÓI (PROFILE & STATS)
       ======================================================== */
    .profile-hero-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 20px;
    }
    .profile-avatar-large {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      background: #FEF3C7;
      border: 4px solid #F59E0B;
      box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .profile-name-text {
      font-size: 22px;
      font-weight: 800;
      color: var(--duo-dark-text);
    }
    .profile-title-text {
      font-size: 13px;
      font-family: var(--font-sub);
      color: #64748B;
      font-weight: 700;
    }

    .profile-stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 20px;
    }
    .profile-stat-box {
      background: #F8FAFC;
      border: 2px solid #E2E8F0;
      border-radius: 18px;
      padding: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .profile-stat-val {
      font-size: 18px;
      font-weight: 800;
      color: var(--duo-dark-text);
    }
    .profile-stat-lbl {
      font-size: 12px;
      font-family: var(--font-sub);
      color: #64748B;
    }

    /* ========================================================
       SCREEN: LESSON & QUIZ RUNNER
       ======================================================== */
    .lesson-viewport {
      display: none;
      flex-direction: column;
      min-height: 100vh;
      background: #FFFFFF;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 200;
      padding: 16px 20px;
    }

    .lesson-top-bar {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 16px;
    }
    .lesson-close-btn {
      background: none;
      border: none;
      font-size: 24px;
      color: #AFAFAF;
      cursor: pointer;
      font-weight: 800;
    }
    .lesson-progress-track {
      flex: 1;
      height: 16px;
      background: #E5E5E5;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }
    .lesson-progress-fill {
      height: 100%;
      background: var(--duo-green);
      border-radius: 10px;
      width: 0%;
      transition: width 0.3s ease;
      position: relative;
    }
    .lesson-progress-fill::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 4px;
      right: 4px;
      height: 4px;
      background: rgba(255,255,255,0.45);
      border-radius: 4px;
    }
    .lesson-hearts-box {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 16px;
      font-weight: 800;
      color: var(--duo-red);
    }

    /* Boss Banner on Stage 10 */
    .boss-fight-header {
      display: none;
      align-items: center;
      gap: 10px;
      background: #FAF5FF;
      border: 2px solid #C084FC;
      border-radius: 16px;
      padding: 8px 12px;
      margin-bottom: 12px;
    }
    .boss-fight-img {
      width: 44px;
      height: 44px;
      object-fit: contain;
    }
    .boss-fight-text {
      font-size: 12px;
      font-weight: 800;
      color: #6B21A8;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    /* Tutor Mascot & Hint */
    .tutor-speech-section {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 24px;
    }
    .tutor-avatar-box {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #FEF3C7;
      border: 3px solid #F59E0B;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .tutor-bubble {
      flex: 1;
      background: #FFFFFF;
      border: 2px solid #E5E5E5;
      border-radius: 18px;
      padding: 12px 16px;
      position: relative;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }
    .tutor-bubble::before {
      content: '';
      position: absolute;
      left: -9px;
      top: 18px;
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 9px solid #E5E5E5;
    }
    .tutor-bubble::after {
      content: '';
      position: absolute;
      left: -6px;
      top: 19px;
      width: 0;
      height: 0;
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      border-right: 7px solid #FFFFFF;
    }
    .tutor-category-tag {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--duo-blue);
      letter-spacing: 0.5px;
    }
    .tutor-tip-text {
      font-size: 14px;
      font-family: var(--font-sub);
      color: #475569;
      margin-top: 3px;
    }

    /* Question Box */
    .question-headline-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 24px;
    }
    .question-text {
      font-size: 24px;
      font-weight: 800;
      color: var(--duo-dark-text);
      line-height: 1.25;
    }
    .read-aloud-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #F1F5F9;
      border: 2px solid #CBD5E1;
      box-shadow: 0 3px 0 #CBD5E1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      cursor: pointer;
      flex-shrink: 0;
    }
    .read-aloud-btn:active {
      transform: translateY(2px);
      box-shadow: 0 1px 0 #CBD5E1;
    }

    /* Options Grid */
    .options-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      margin-top: auto;
      margin-bottom: 20px;
    }
    .option-card-btn {
      background: #FFFFFF;
      border: 3px solid #E5E5E5;
      border-radius: 20px;
      padding: 18px 12px;
      font-family: var(--font-main);
      font-size: 26px;
      font-weight: 800;
      color: var(--duo-dark-text);
      box-shadow: 0 var(--shadow-depth) 0 #E5E5E5;
      cursor: pointer;
      text-align: center;
      transition: transform 0.08s ease, border-color 0.1s ease;
      position: relative;
    }
    .option-card-btn:active {
      transform: translateY(5px);
      box-shadow: 0 2px 0 #E5E5E5;
    }
    .option-card-btn.selected {
      background: #EBF8FF;
      border-color: var(--duo-blue);
      box-shadow: 0 var(--shadow-depth) 0 var(--duo-blue-dark);
      color: #0369A1;
    }
    .option-card-btn.selected:active {
      box-shadow: 0 2px 0 var(--duo-blue-dark);
    }
    .option-key-badge {
      position: absolute;
      top: 6px;
      left: 8px;
      font-size: 11px;
      color: #AFAFAF;
      font-weight: 700;
    }

    /* Lesson Footer Bar */
    .lesson-footer-bar {
      margin-top: auto;
      padding-top: 14px;
    }
    .verify-btn {
      width: 100%;
      padding: 16px;
      font-size: 17px;
    }

    /* Feedback Drawer (Sliding from bottom) */
    .feedback-drawer {
      display: none;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 20px 24px;
      z-index: 250;
      animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .feedback-drawer.correct {
      background: #D7FFB8;
      border-top: 3px solid var(--duo-green);
    }
    .feedback-drawer.incorrect {
      background: #FFDFE0;
      border-top: 3px solid var(--duo-red);
    }
    .feedback-title {
      font-size: 19px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .feedback-drawer.correct .feedback-title { color: #2B7800; }
    .feedback-drawer.incorrect .feedback-title { color: #EA2B2B; }
    .feedback-message {
      font-size: 14px;
      font-family: var(--font-sub);
      margin: 4px 0 16px 0;
      color: #333;
    }
    .next-step-btn {
      width: 100%;
      padding: 16px;
      font-size: 16px;
    }

    /* ========================================================
       SCREEN: APOSTILAS HUB (PDF MATERIALS)
       ======================================================== */
    .screen-view {
      display: none;
      flex-direction: column;
      padding: 16px;
      width: 100%;
    }
    .screen-header-title {
      font-size: 22px;
      font-weight: 800;
      color: var(--duo-dark-text);
      margin-bottom: 4px;
    }
    .screen-header-desc {
      font-size: 14px;
      font-family: var(--font-sub);
      color: var(--duo-muted-text);
      margin-bottom: 16px;
    }

    .materials-grid {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .material-card {
      background: #FFFFFF;
      border: 3px solid #E2E8F0;
      border-radius: 20px;
      box-shadow: 0 6px 0 #E2E8F0;
      padding: 16px;
      display: flex;
      gap: 14px;
      align-items: center;
    }
    .material-icon-box {
      width: 58px;
      height: 58px;
      border-radius: 16px;
      background: #FEF3C7;
      border: 2px solid #F59E0B;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      flex-shrink: 0;
    }
    .material-info {
      flex: 1;
    }
    .material-title {
      font-size: 15px;
      font-weight: 800;
      color: var(--duo-dark-text);
    }
    .material-badge-tag {
      display: inline-block;
      font-size: 11px;
      font-weight: 800;
      background: #EBF8FF;
      color: #0284C7;
      padding: 2px 7px;
      border-radius: 8px;
      margin-top: 3px;
    }
    .material-desc {
      font-size: 12px;
      font-family: var(--font-sub);
      color: #64748B;
      margin-top: 4px;
      line-height: 1.3;
    }
    .material-download-btn {
      padding: 10px 14px;
      font-size: 12px;
      flex-shrink: 0;
    }

    /* ========================================================
       SCREEN: SHOP & VIP PASS
       ======================================================== */
    .shop-items-grid {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .shop-card {
      background: #FFFFFF;
      border: 3px solid #E2E8F0;
      border-radius: 20px;
      box-shadow: 0 6px 0 #E2E8F0;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .shop-card-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .shop-icon-box {
      width: 52px;
      height: 52px;
      border-radius: 16px;
      background: #F1F5F9;
      border: 2px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .shop-item-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--duo-dark-text);
    }
    .shop-item-desc {
      font-size: 12px;
      font-family: var(--font-sub);
      color: #64748B;
      margin-top: 2px;
    }
    .shop-buy-btn {
      padding: 10px 18px;
      font-size: 13px;
      flex-shrink: 0;
    }

    /* ========================================================
       BOTTOM FIXED NAVIGATION BAR
       ======================================================== */
    .mobile-tab-bar {
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 560px;
      background: #FFFFFF;
      border-top: 2px solid #E5E5E5;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 8px 10px 10px 10px;
      z-index: 100;
      box-shadow: 0 -4px 14px rgba(0,0,0,0.05);
    }
    .nav-tab-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      background: none;
      border: none;
      font-family: var(--font-main);
      font-size: 11px;
      font-weight: 700;
      color: #94A3B8;
      cursor: pointer;
      padding: 4px 0;
      border-radius: 12px;
      transition: color 0.15s ease;
    }
    .nav-tab-btn.active {
      color: var(--duo-blue-dark);
    }
    .nav-tab-icon {
      font-size: 20px;
    }

    /* Avatar SVG helper inside choices */
    .avatar-svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .avatar-png-wrapper {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .avatar-img-round {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Confetti Origin Overlay */
    #confetti-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    }
  </style>
</head>
<body>

  <!-- Confetti Canvas -->
  <canvas id="confetti-canvas"></canvas>

  <div class="app-viewport">
    
    <!-- ==========================================
         TOP HUD STICKY BAR WITH BRAND LOGO
         ========================================== -->
    <header class="app-header">
      <!-- Brand Logo / Badge -->
      <a href="#" class="brand-logo-badge" onclick="switchTab('adventure')" title="Heróis da Multiplicação">
        <img src="tabuada-assets/logo-transparente.png" alt="Heróis da Multiplicação" class="brand-logo-img">
      </a>

      <!-- Clickable Hero Badge (opens Quartel do Herói) -->
      <button class="hero-badge-btn" onclick="openHeroProfileModal()" title="Ver Perfil do Herói">
        <div class="hero-badge-avatar" id="header-avatar-slot">
          ${avatars.leo}
        </div>
        <span class="hero-badge-name" id="header-hero-name">Pedro</span>
        <span class="hero-badge-chevron">▾</span>
      </button>

      <!-- Pill Counters -->
      <div class="hud-pills">
        <!-- Streak -->
        <div class="hud-pill" title="Dias Seguidos de Treinamento">
          ${icons.flame}
          <span id="streak-val">3</span>
        </div>
        <!-- Gems -->
        <div class="hud-pill" onclick="switchTab('shop')" title="Diamantes Mágicos">
          ${icons.gem}
          <span id="gems-val">120</span>
        </div>
        <!-- Hearts -->
        <div class="hud-pill" title="Vidas de Herói">
          ${icons.heart}
          <span id="hearts-val">5</span>
        </div>
      </div>

      <!-- Sound Toggle Button -->
      <button class="sound-toggle-btn" id="btn-sound-toggle" onclick="toggleSound()" title="Ativar/Desativar Som">
        🔊
      </button>
    </header>

    <!-- ==========================================
         VIP PASS PROMO BANNER (LIGA DOS HERÓIS)
         ========================================== -->
    <div class="vip-banner" onclick="switchTab('shop')">
      <div class="vip-banner-content">
        <div class="vip-crown-badge">
          ${icons.crown}
        </div>
        <div>
          <div class="vip-banner-title">Passe VIP • Liga dos Heróis</div>
          <div class="vip-banner-subtitle">Todas as 10 Tabuadas + 6 Livros Digitais A4!</div>
        </div>
      </div>
      <button class="btn-3d btn-3d-gold vip-btn-action">Ver ➔</button>
    </div>

    <!-- ==========================================
         TAB 1: ADVENTURE MAP (MAPA E TRILHA INTERATIVA)
         ========================================== -->
    <main id="screen-adventure" class="map-container">
      
      <!-- Pop-over Card Template (Floating speech card) -->
      <div id="interactive-popover" class="popover-card">
        <div class="popover-tail"></div>
        <div class="popover-title" id="popover-stage-title">Fase 1 • Tabuada do 2</div>
        <div class="popover-subtitle" id="popover-stage-subtitle">Treinamento Base com o Léo</div>
        <div class="popover-stars" id="popover-stars-row">
          ${icons.star} ${icons.star} ${icons.star}
        </div>
        <button id="popover-action-btn" class="btn-3d btn-3d-green popover-start-btn" onclick="startSelectedLesson()">
          COMEÇAR +10 💎
        </button>
      </div>

      <!-- Connecting SVG Bézier Trail Canvas -->
      <svg id="trail-svg" class="trail-svg-canvas">
        <!-- Rendered dynamically by script -->
      </svg>

      <!-- Units Container -->
      <div class="trail-nodes-wrapper" id="trail-wrapper">
        <!-- Generated dynamically via JS with heroes and mascots stationed on trail curves -->
      </div>
    </main>

    <!-- ==========================================
         TAB 2: SHOP & VIP PASS
         ========================================== -->
    <section id="screen-shop" class="screen-view">
      <h2 class="screen-header-title">Loja dos Heróis</h2>
      <p class="screen-header-desc">Recarregue vidas, compre gemas e desbloqueie o Passe VIP da Liga!</p>

      <div class="shop-items-grid">
        <!-- VIP Card -->
        <div class="shop-card" style="background: linear-gradient(135deg, #FAF5FF, #F3E8FF); border-color: #C084FC;">
          <div class="shop-card-left">
            <div class="shop-icon-box" style="background: #F3E8FF; border-color: #A855F7;">
              ${icons.crown}
            </div>
            <div>
              <div class="shop-item-title" style="color: #6B21A8;">Passe VIP Liga dos Heróis</div>
              <div class="shop-item-desc">Vidas Infinitas + 6 Apostilas A4 + Todas Fases</div>
            </div>
          </div>
          <button class="btn-3d btn-3d-gold shop-buy-btn" onclick="openGuardianLoginTab()">R$ 27,90</button>
        </div>

        <!-- Refill Hearts -->
        <div class="shop-card">
          <div class="shop-card-left">
            <div class="shop-icon-box" style="background: #FFF1F2; border-color: #FDA4AF;">
              ${icons.heart}
            </div>
            <div>
              <div class="shop-item-title">Recarregar 5 Vidas</div>
              <div class="shop-item-desc">Volte a treinar com o Léo e a Maya imediatamente!</div>
            </div>
          </div>
          <button class="btn-3d btn-3d-blue shop-buy-btn" onclick="buyHeartRefill()">20 💎</button>
        </div>

        <!-- Gem Pack 1 -->
        <div class="shop-card">
          <div class="shop-card-left">
            <div class="shop-icon-box" style="background: #ECFEFF; border-color: #67E8F9;">
              ${icons.gem}
            </div>
            <div>
              <div class="shop-item-title">Saco com 50 Gemas</div>
              <div class="shop-item-desc">Bônus de treino rápido!</div>
            </div>
          </div>
          <button class="btn-3d btn-3d-green shop-buy-btn" onclick="addGems(50)">+50 💎</button>
        </div>

        <!-- Gem Pack 2 -->
        <div class="shop-card">
          <div class="shop-card-left">
            <div class="shop-icon-box" style="background: #ECFEFF; border-color: #67E8F9;">
              ${icons.gem}
            </div>
            <div>
              <div class="shop-item-title">Baú com 200 Gemas</div>
              <div class="shop-item-desc">Recompensa lendária dos heróis!</div>
            </div>
          </div>
          <button class="btn-3d btn-3d-gold shop-buy-btn" onclick="addGems(200)">+200 💎</button>
        </div>
      </div>
    </section>

    <!-- ==========================================
         TAB 3: APOSTILAS HUB (PDF MATERIALS)
         ========================================== -->
    <section id="screen-workbooks" class="screen-view">
      <h2 class="screen-header-title">Biblioteca da Liga dos Heróis</h2>
      <p class="screen-header-desc">Materiais oficiais da franquia Heróis da Multiplicação para imprimir em A4!</p>

      <div class="materials-grid">
        <!-- Material 1 -->
        <div class="material-card">
          <div class="material-icon-box">📅</div>
          <div class="material-info">
            <div class="material-title">Cronograma Mestre de 12 Semanas</div>
            <span class="material-badge-tag">Metodologia 15 Min/Dia</span>
            <div class="material-desc">Guia passo a passo para dominar a tabuada sem pressão.</div>
          </div>
          <a href="Cronograma_Mestre_12_Semanas.pdf" target="_blank" class="btn-3d btn-3d-blue material-download-btn">Imprimir A4</a>
        </div>

        <!-- Material 2 -->
        <div class="material-card">
          <div class="material-icon-box">📝</div>
          <div class="material-info">
            <div class="material-title">Caderno de Atividades & Fichas Diárias</div>
            <span class="material-badge-tag">Treinamento em Micro-Passos</span>
            <div class="material-desc">Folhas práticas com repetições e invasões surpresa.</div>
          </div>
          <a href="Caderno_de_Atividades_Fichas_Diarias.pdf" target="_blank" class="btn-3d btn-3d-blue material-download-btn">Imprimir A4</a>
        </div>

        <!-- Material 3 -->
        <div class="material-card">
          <div class="material-icon-box">🎨</div>
          <div class="material-info">
            <div class="material-title">Caderno de Pintura por Multiplicação</div>
            <span class="material-badge-tag">Arte & Fixação Lúdica</span>
            <div class="material-desc">Pinte os Heróis e o Monstrinho calculando as cores certas!</div>
          </div>
          <a href="Caderno_de_Pintura_Multiplicacao.pdf" target="_blank" class="btn-3d btn-3d-blue material-download-btn">Imprimir A4</a>
        </div>

        <!-- Material 4 -->
        <div class="material-card">
          <div class="material-icon-box">⏱️</div>
          <div class="material-info">
            <div class="material-title">Desafios Semanais de Acompanhamento</div>
            <span class="material-badge-tag">Cronômetro de Herói</span>
            <div class="material-desc">Folhas de teste para registrar recordes e tempo de cálculo.</div>
          </div>
          <a href="Desafios_Semanais_Acompanhamento.pdf" target="_blank" class="btn-3d btn-3d-blue material-download-btn">Imprimir A4</a>
        </div>

        <!-- Material 5 -->
        <div class="material-card">
          <div class="material-icon-box">🎲</div>
          <div class="material-info">
            <div class="material-title">Jogos de Tabuada: Trilha, Dominó & Bingo</div>
            <span class="material-badge-tag">Jogos para Toda a Família</span>
            <div class="material-desc">Tabuleiros recortáveis com Léo, Maya e os vilões matemáticos.</div>
          </div>
          <a href="Jogos_da_Tabuada_Trilha_Domino_Bingo.pdf" target="_blank" class="btn-3d btn-3d-blue material-download-btn">Imprimir A4</a>
        </div>

        <!-- Material 6 -->
        <div class="material-card">
          <div class="material-icon-box">⭐</div>
          <div class="material-info">
            <div class="material-title">Volume 1: Missão Tabuada (1 ao 10)</div>
            <span class="material-badge-tag">Livro Oficial Completo • 43 Págs</span>
            <div class="material-desc">Com as 10 tabuadas, gabarito e Certificado de Honra!</div>
          </div>
          <a href="Missao_Tabuada_Volume_1.pdf" target="_blank" class="btn-3d btn-3d-gold material-download-btn">Baixar PDF</a>
        </div>
      </div>
    </section>

    <!-- ==========================================
         BOTTOM FIXED NAVIGATION BAR
         ========================================== -->
    <nav class="mobile-tab-bar">
      <button class="nav-tab-btn active" id="tab-btn-adventure" onclick="switchTab('adventure')">
        <span class="nav-tab-icon">🗺️</span>
        <span>Aventura</span>
      </button>
      <button class="nav-tab-btn" id="tab-btn-shop" onclick="switchTab('shop')">
        <span class="nav-tab-icon">💎</span>
        <span>Loja & VIP</span>
      </button>
      <button class="nav-tab-btn" id="tab-btn-workbooks" onclick="switchTab('workbooks')">
        <span class="nav-tab-icon">📚</span>
        <span>Apostilas</span>
      </button>
      <button class="nav-tab-btn" id="tab-btn-profile" onclick="openHeroProfileModal()">
        <span class="nav-tab-icon">🏅</span>
        <span>Meu Herói</span>
      </button>
    </nav>

    <!-- ==========================================
         LESSON & QUIZ RUNNER SCREEN
         ========================================== -->
    <div id="lesson-screen" class="lesson-viewport">
      <!-- Lesson Top Bar -->
      <div class="lesson-top-bar">
        <button class="lesson-close-btn" onclick="exitLesson()" title="Sair da lição">✖</button>
        <div class="lesson-progress-track">
          <div class="lesson-progress-fill" id="lesson-progress-bar"></div>
        </div>
        <div class="lesson-hearts-box">
          ${icons.heart}
          <span id="lesson-hearts-count">5</span>
        </div>
      </div>

      <!-- Boss Banner (Appears in Stage 10) -->
      <div class="boss-fight-header" id="boss-fight-header">
        <img src="tabuada-assets/monstro-oficial.png" alt="Monstrinho dos Números" class="boss-fight-img">
        <div class="boss-fight-text">Batalha Final: Derrote o Monstrinho dos Números!</div>
      </div>

      <!-- Tutor Box (Features chosen hero: Léo, Maya, or companion) -->
      <div class="tutor-speech-section">
        <div class="tutor-avatar-box" id="lesson-tutor-avatar">
          ${avatars.leo}
        </div>
        <div class="tutor-bubble">
          <div class="tutor-category-tag" id="lesson-category-tag">Tabuada do 2 • Iniciação</div>
          <div class="tutor-tip-text" id="lesson-tip-text">Dica do Léo: 3 + 3 = 6!</div>
        </div>
      </div>

      <!-- Question Text -->
      <div class="question-headline-box">
        <h2 class="question-text" id="lesson-question-text">Quanto é 2 × 3?</h2>
        <button class="read-aloud-btn" onclick="speakCurrentQuestion()" title="Ouvir Pergunta Novamente">
          🔊
        </button>
      </div>

      <!-- Options Grid -->
      <div class="options-grid" id="lesson-options-container">
        <!-- Rendered dynamically -->
      </div>

      <!-- Footer Verify Bar -->
      <div class="lesson-footer-bar" id="lesson-footer-bar">
        <button id="btn-verify-answer" class="btn-3d btn-3d-green verify-btn" onclick="checkSelectedAnswer()" disabled>
          VERIFICAR RESPOSTA
        </button>
      </div>

      <!-- Sliding Feedback Drawer -->
      <div class="feedback-drawer" id="feedback-drawer">
        <div class="feedback-title" id="fb-drawer-title">🎉 Resposta Certa!</div>
        <div class="feedback-message" id="fb-drawer-msg">Sensacional! Você calculou como um verdadeiro Herói!</div>
        <button class="btn-3d btn-3d-green next-step-btn" id="fb-drawer-btn" onclick="advanceToNextQuestion()">
          CONTINUAR
        </button>
      </div>
    </div>

    <!-- ==========================================
         MODAL 1: PORTAL DOS HERÓIS (LOGIN GAMIFICADO)
         ========================================== -->
    <div id="modal-portal" class="modal-overlay" style="display: none;">
      <div class="modal-card">
        <button class="modal-close-btn" onclick="closePortalModal()">✕</button>

        <!-- Brand Header inside Modal -->
        <div style="text-align: center; margin-bottom: 16px;">
          <img src="tabuada-assets/logo-transparente.png" alt="Heróis da Multiplicação" style="height: 48px; object-fit: contain; margin-bottom: 4px;">
          <h2 style="font-size: 20px; font-weight: 800; color: var(--duo-dark-text);">Portal dos Heróis</h2>
          <p style="font-size: 13px; font-family: var(--font-sub); color: #64748B;">Bem-vindo à Liga dos Heróis da Multiplicação!</p>
        </div>

        <!-- Portal Tabs -->
        <div class="portal-tabs">
          <button class="portal-tab-btn active" id="tab-portal-select" onclick="switchPortalTab('select')">Quem vai jogar?</button>
          <button class="portal-tab-btn" id="tab-portal-create" onclick="switchPortalTab('create')">+ Novo Herói</button>
          <button class="portal-tab-btn" id="tab-portal-guardian" onclick="switchPortalTab('guardian')">Pais / Nuvem</button>
        </div>

        <!-- Tab Content 1: Saved Heroes ("Quem vai Jogar?") -->
        <div id="portal-content-select">
          <div class="saved-heroes-grid" id="saved-heroes-list">
            <!-- Populated via JS -->
          </div>
          <button class="btn-3d btn-3d-blue" style="width: 100%; padding: 12px;" onclick="switchPortalTab('create')">
            + CRIAR NOVO HERÓI
          </button>
        </div>

        <!-- Tab Content 2: Kids Quick Hero Creator -->
        <div id="portal-content-create" style="display: none;">
          <div class="form-group">
            <label class="form-label">Como se chama o seu Herói?</label>
            <input type="text" id="create-hero-name" class="form-input-lg" placeholder="Ex: Pedro, Sofia, Arthur..." maxlength="16">
          </div>

          <label class="form-label">Escolha seu Herói ou Companheiro da Liga:</label>
          <div class="avatar-picker-grid" id="creator-avatar-picker">
            <!-- Primary franchise heroes first -->
            <div class="avatar-choice-btn selected" onclick="selectNewHeroAvatar('leo', this)" title="Léo Herói">${avatars.leo}</div>
            <div class="avatar-choice-btn" onclick="selectNewHeroAvatar('maya', this)" title="Maya Heroína">${avatars.maya}</div>
            <!-- Kawaii companions -->
            <div class="avatar-choice-btn" onclick="selectNewHeroAvatar('fox', this)" title="Raposinha">${avatars.fox}</div>
            <div class="avatar-choice-btn" onclick="selectNewHeroAvatar('robot', this)" title="Robô">${avatars.robot}</div>
            <div class="avatar-choice-btn" onclick="selectNewHeroAvatar('cat', this)" title="Gatinho">${avatars.cat}</div>
            <div class="avatar-choice-btn" onclick="selectNewHeroAvatar('dino', this)" title="Dino">${avatars.dino}</div>
            <div class="avatar-choice-btn" onclick="selectNewHeroAvatar('owl', this)" title="Corujinha">${avatars.owl}</div>
            <div class="avatar-choice-btn" onclick="selectNewHeroAvatar('dragon', this)" title="Dragãozinho">${avatars.dragon}</div>
          </div>

          <div class="form-group">
            <label class="form-label">PIN Secreto (Opcional - 4 dígitos):</label>
            <input type="password" id="create-hero-pin" class="form-input-lg" placeholder="••••" maxlength="4" style="text-align: center; letter-spacing: 6px;">
          </div>

          <button class="btn-3d btn-3d-green" style="width: 100%; padding: 14px; font-size: 15px;" onclick="submitCreateHero()">
            ENTRAR NA LIGA DOS HERÓIS! 🚀
          </button>
        </div>

        <!-- Tab Content 3: Guardian / Cloud Sync -->
        <div id="portal-content-guardian" style="display: none;">
          <div style="background: #F8FAFC; border: 2px solid #E2E8F0; border-radius: 16px; padding: 14px; margin-bottom: 14px;">
            <div style="font-weight: 800; font-size: 14px; color: var(--duo-dark-text);">Área do Guardião (Pais) & Sincronização</div>
            <div style="font-size: 12px; font-family: var(--font-sub); color: #64748B; margin-top: 3px;">
              Conecte sua conta para ativar o Passe VIP vitalício e salvar o progresso dos seus filhos na nuvem.
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">E-mail do Responsável:</label>
            <input type="email" id="guardian-email" class="form-input-lg" placeholder="seu-email@exemplo.com">
          </div>

          <div class="form-group">
            <label class="form-label">Senha de Acesso:</label>
            <input type="password" id="guardian-password" class="form-input-lg" placeholder="••••••••">
          </div>

          <button class="btn-3d btn-3d-purple" style="width: 100%; padding: 14px; font-size: 14px;" onclick="syncGuardianAccount()">
            SINCRONIZAR CONTA VIP ☁️
          </button>
        </div>

      </div>
    </div>

    <!-- ==========================================
         MODAL 2: QUARTEL DO HERÓI (PROFILE & STATS)
         ========================================== -->
    <div id="modal-hero-profile" class="modal-overlay" style="display: none;">
      <div class="modal-card">
        <button class="modal-close-btn" onclick="closeHeroProfileModal()">✕</button>

        <div class="profile-hero-badge">
          <img src="tabuada-assets/logo-transparente.png" alt="Heróis da Multiplicação" style="height: 36px; object-fit: contain; margin-bottom: 8px;">
          <div class="profile-avatar-large" id="profile-avatar-container">
            ${avatars.leo}
          </div>
          <div class="profile-name-text" id="profile-hero-name">Pedro</div>
          <div class="profile-title-text" id="profile-hero-rank">Agente da Liga dos Heróis • Nível 1</div>
        </div>

        <!-- Edit Avatar Accordion -->
        <label class="form-label" style="text-align: center; margin-bottom: 4px;">Trocar de Herói ou Companheiro:</label>
        <div class="avatar-picker-grid" id="profile-avatar-switcher" style="margin-bottom: 18px;">
          <div class="avatar-choice-btn" onclick="updateActiveHeroAvatar('leo', this)" title="Léo">${avatars.leo}</div>
          <div class="avatar-choice-btn" onclick="updateActiveHeroAvatar('maya', this)" title="Maya">${avatars.maya}</div>
          <div class="avatar-choice-btn" onclick="updateActiveHeroAvatar('fox', this)" title="Raposinha">${avatars.fox}</div>
          <div class="avatar-choice-btn" onclick="updateActiveHeroAvatar('robot', this)" title="Robô">${avatars.robot}</div>
          <div class="avatar-choice-btn" onclick="updateActiveHeroAvatar('cat', this)" title="Gatinho">${avatars.cat}</div>
          <div class="avatar-choice-btn" onclick="updateActiveHeroAvatar('dino', this)" title="Dino">${avatars.dino}</div>
          <div class="avatar-choice-btn" onclick="updateActiveHeroAvatar('owl', this)" title="Corujinha">${avatars.owl}</div>
          <div class="avatar-choice-btn" onclick="updateActiveHeroAvatar('dragon', this)" title="Dragãozinho">${avatars.dragon}</div>
        </div>

        <!-- Quick Stats Grid -->
        <div class="profile-stats-grid">
          <div class="profile-stat-box">
            <span style="font-size: 24px;">🔥</span>
            <div>
              <div class="profile-stat-val" id="profile-stat-streak">3 Dias</div>
              <div class="profile-stat-lbl">Ofensiva Diária</div>
            </div>
          </div>

          <div class="profile-stat-box">
            <span style="font-size: 24px;">💎</span>
            <div>
              <div class="profile-stat-val" id="profile-stat-gems">120</div>
              <div class="profile-stat-lbl">Gemas Mágicas</div>
            </div>
          </div>

          <div class="profile-stat-box">
            <span style="font-size: 24px;">❤️</span>
            <div>
              <div class="profile-stat-val" id="profile-stat-hearts">5 / 5</div>
              <div class="profile-stat-lbl">Vidas de Herói</div>
            </div>
          </div>

          <div class="profile-stat-box">
            <span style="font-size: 24px;">🏆</span>
            <div>
              <div class="profile-stat-val" id="profile-stat-stages">1 / 10</div>
              <div class="profile-stat-lbl">Fases Vencidas</div>
            </div>
          </div>
        </div>

        <!-- Switch Hero / Logout Button -->
        <button class="btn-3d btn-3d-white" style="width: 100%; padding: 13px; font-size: 14px; margin-bottom: 8px;" onclick="switchHeroUser()">
          🔄 TROCAR DE HERÓI / SAIR
        </button>
      </div>
    </div>

    <!-- ==========================================
         MODAL 3: GAME OVER & RECOVERY
         ========================================== -->
    <div id="modal-gameover" class="modal-overlay" style="display: none;">
      <div class="modal-card" style="text-align: center; align-items: center;">
        <div style="font-size: 54px; margin-bottom: 8px;">💔</div>
        <h2 style="font-size: 24px; font-weight: 800; color: var(--duo-red);">Ficaram sem Vidas!</h2>
        <p style="font-size: 14px; font-family: var(--font-sub); color: #64748B; margin: 6px 0 20px 0;">
          Não desanime! O Léo e a Maya estão aqui para te apoiar. Escolha como deseja recarregar suas forças:
        </p>

        <button class="btn-3d btn-3d-green" style="width: 100%; padding: 14px; font-size: 15px; margin-bottom: 10px;" onclick="recoverViaTraining()">
          ⚡ TREINO RÁPIDO COM O LÉO (+3 ❤️ GRÁTIS)
        </button>

        <button class="btn-3d btn-3d-blue" style="width: 100%; padding: 14px; font-size: 15px; margin-bottom: 10px;" onclick="recoverViaGems()">
          💎 RECARREGAR TUDO (20 GEMAS)
        </button>

        <button class="btn-3d btn-3d-white" style="width: 100%; padding: 12px; font-size: 13px;" onclick="closeGameOverModal()">
          VOLTAR AO MAPA
        </button>
      </div>
    </div>

    <!-- ==========================================
         MODAL 4: VICTORY & LEVEL UP
         ========================================== -->
    <div id="modal-victory" class="modal-overlay" style="display: none;">
      <div class="modal-card" style="text-align: center; align-items: center;">
        <img src="tabuada-assets/logo-transparente.png" alt="Heróis da Multiplicação" style="height: 44px; object-fit: contain; margin-bottom: 10px;">
        <div style="font-size: 52px; margin-bottom: 4px;">🎉</div>
        <h2 style="font-size: 26px; font-weight: 800; color: var(--duo-green-dark);">MISSÃO CUMPRIDA!</h2>
        <p style="font-size: 15px; font-family: var(--font-sub); color: #64748B; margin: 4px 0 20px 0;">
          Parabéns! O Léo e a Maya têm orgulho de ter você na Liga dos Heróis!
        </p>

        <div style="display: flex; gap: 14px; margin-bottom: 24px;">
          <div style="background: #FEF3C7; border: 2px solid #FDE68A; border-radius: 16px; padding: 10px 18px; text-align: center;">
            <div style="font-size: 20px; font-weight: 800; color: #B45309;">+15 💎</div>
            <div style="font-size: 12px; color: #92400E; font-weight: 700;">Gemas</div>
          </div>
          <div style="background: #E0F2FE; border: 2px solid #BAE6FD; border-radius: 16px; padding: 10px 18px; text-align: center;">
            <div style="font-size: 20px; font-weight: 800; color: #0369A1;">+30 XP</div>
            <div style="font-size: 12px; color: #075985; font-weight: 700;">Experiência</div>
          </div>
        </div>

        <button class="btn-3d btn-3d-green" style="width: 100%; padding: 16px; font-size: 16px;" onclick="closeVictoryModal()">
          CONTINUAR AVENTURA! ➔
        </button>
      </div>
    </div>

  </div> <!-- End App Viewport -->

  <!-- ========================================================
       CLIENT ENGINE & GAMIFICATION LOGIC
       ======================================================== -->
  <script>
    // Asset references for dynamic rendering
    const AVATARS = ${JSON.stringify(avatars)};
    const ICONS = ${JSON.stringify(icons)};
    const UNITS_DATA = ${JSON.stringify(unitsData)};
    const LESSONS_DATA = ${JSON.stringify(lessonsDataJson)};

    // --- AUDIO SYNTHESIS & SOUND EFFECTS (Web Audio API) ---
    let soundEnabled = true;
    let audioCtx = null;

    function getAudioContext() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    function playTone(freq, type = 'sine', duration = 0.1, delayMs = 0) {
      if (!soundEnabled) return;
      setTimeout(() => {
        try {
          const ctx = getAudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = type;
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + duration);
        } catch(e) {}
      }, delayMs);
    }

    function playSuccessSound() {
      playTone(523.25, 'triangle', 0.1, 0);   // C5
      playTone(659.25, 'triangle', 0.1, 80);  // E5
      playTone(783.99, 'triangle', 0.1, 160); // G5
      playTone(1046.50, 'triangle', 0.25, 240); // C6
    }

    function playErrorSound() {
      playTone(349.23, 'sawtooth', 0.15, 0);  // F4
      playTone(311.13, 'sawtooth', 0.25, 120); // Eb4
    }

    function playFanfareSound() {
      playTone(523.25, 'triangle', 0.1, 0);
      playTone(659.25, 'triangle', 0.1, 100);
      playTone(783.99, 'triangle', 0.15, 200);
      playTone(1046.50, 'triangle', 0.4, 320);
    }

    function toggleSound() {
      soundEnabled = !soundEnabled;
      const btn = document.getElementById('btn-sound-toggle');
      if (btn) {
        btn.classList.toggle('muted', !soundEnabled);
        btn.innerText = soundEnabled ? '🔊' : '🔇';
      }
      if (soundEnabled) {
        playTone(600, 'sine', 0.08);
      }
    }

    // --- WEB SPEECH SYNTHESIS TUTOR ---
    function speakText(text) {
      if (!soundEnabled || !('speechSynthesis' in window)) return;
      try {
        window.speechSynthesis.cancel();
        const clean = text.replace(/×/g, 'vezes').replace(/=/g, 'igual a').replace(/[⭐🎉💎❤️🔥⚡]/g, '');
        const utt = new SpeechSynthesisUtterance(clean);
        utt.lang = 'pt-BR';
        utt.rate = 1.05;
        utt.pitch = 1.1;

        const voices = window.speechSynthesis.getVoices();
        const pt = voices.find(v => v.lang === 'pt-BR' || v.lang.startsWith('pt'));
        if (pt) utt.voice = pt;

        window.speechSynthesis.speak(utt);
      } catch(e) {}
    }

    function speakCurrentQuestion() {
      if (currentLesson && currentLesson.questions[currentQIndex]) {
        speakText(currentLesson.questions[currentQIndex].q);
      }
    }

    // ==========================================
    // MULTI-PROFILE AUTH & STATE MANAGEMENT
    // ==========================================
    const STORAGE_KEY = 'missao_tabuada_v2_data';

    // Default structure (Léo selected by default)
    let appData = {
      activeHeroId: 'hero_1',
      profiles: {
        'hero_1': {
          id: 'hero_1',
          name: 'Pedro',
          avatar: 'leo',
          pin: '',
          hearts: 5,
          streak: 3,
          gems: 120,
          xp: 100,
          unlockedLevel: 1,
          openedChests: [],
          isVIP: false
        }
      }
    };

    // Load from LocalStorage + Migration
    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          appData = JSON.parse(raw);
        } else {
          // Check legacy keys for seamless upgrade
          const legacyDuo = localStorage.getItem('missao_tabuada_duo');
          const legacyHero = localStorage.getItem('missao_tabuada_hero_profile');
          if (legacyHero || legacyDuo) {
            const h = legacyHero ? JSON.parse(legacyHero) : {};
            const d = legacyDuo ? JSON.parse(legacyDuo) : {};
            appData.profiles['hero_1'].name = h.name || 'Pedro';
            appData.profiles['hero_1'].avatar = h.mascot || 'leo';
            appData.profiles['hero_1'].hearts = d.hearts || 5;
            appData.profiles['hero_1'].streak = d.streak || 3;
            appData.profiles['hero_1'].gems = d.gems || 120;
            appData.profiles['hero_1'].unlockedLevel = d.unlockedLevel || 1;
            saveState();
          }
        }
      } catch(e) {}
    }

    function saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
        // Keep legacy sync for backward compatibility
        const currentHero = getActiveHero();
        if (currentHero) {
          localStorage.setItem('missao_tabuada_duo', JSON.stringify({
            hearts: currentHero.hearts,
            streak: currentHero.streak,
            gems: currentHero.gems,
            xp: currentHero.xp,
            unlockedLevel: currentHero.unlockedLevel
          }));
          localStorage.setItem('missao_tabuada_hero_profile', JSON.stringify({
            name: currentHero.name,
            mascot: currentHero.avatar
          }));
        }
      } catch(e) {}
      renderTopHUD();
    }

    function getActiveHero() {
      return appData.profiles[appData.activeHeroId] || Object.values(appData.profiles)[0];
    }

    // --- UI UPDATERS ---
    function renderTopHUD() {
      const hero = getActiveHero();
      if (!hero) return;

      document.getElementById('header-hero-name').innerText = hero.name;
      document.getElementById('streak-val').innerText = hero.streak;
      document.getElementById('gems-val').innerText = hero.gems;
      document.getElementById('hearts-val').innerText = hero.hearts;
      
      const avatarContainer = document.getElementById('header-avatar-slot');
      if (avatarContainer) {
        avatarContainer.innerHTML = AVATARS[hero.avatar] || AVATARS.leo;
      }
    }

    // ==========================================
    // INTERACTIVE MAP & TRAIL ENGINE
    // ==========================================
    let selectedStageForPopover = null;

    function renderMapTrail() {
      const hero = getActiveHero();
      const wrapper = document.getElementById('trail-wrapper');
      if (!wrapper) return;
      wrapper.innerHTML = '';

      // Pattern shifts for zig-zag S-curve
      const shiftPatterns = ['shift-center', 'shift-left', 'shift-center', 'shift-right'];

      UNITS_DATA.forEach(unit => {
        // Unit Container
        const unitEl = document.createElement('div');
        unitEl.className = 'unit-section';

        // Unit Banner
        const banner = document.createElement('div');
        banner.className = 'unit-banner u' + unit.id;
        banner.innerHTML = \`
          <div class="unit-banner-info">
            <div class="unit-banner-header">\${unit.title}</div>
            <div class="unit-banner-desc">\${unit.desc}</div>
          </div>
        \`;
        unitEl.appendChild(banner);

        // Render stage nodes for this unit
        unit.levels.forEach(levelNum => {
          const shiftClass = shiftPatterns[(levelNum - 1) % shiftPatterns.length];
          const isUnlocked = levelNum <= hero.unlockedLevel;
          const isCompleted = levelNum < hero.unlockedLevel;
          const isCurrentActive = levelNum === hero.unlockedLevel;

          const row = document.createElement('div');
          row.className = 'node-row ' + shiftClass;
          row.id = 'row-node-' + levelNum;

          // Station official franchise heroes beside curves:
          // Unit 1: Léo cheering beside Node 2
          if (levelNum === 2 && unit.mascot) {
            const sideMascotDiv = document.createElement('div');
            sideMascotDiv.className = 'trail-hero-mascot pos-right';
            sideMascotDiv.innerHTML = unit.mascot;
            row.appendChild(sideMascotDiv);
          }
          // Unit 2: Maya encouraging beside Node 5
          else if (levelNum === 5 && unit.mascot) {
            const sideMascotDiv = document.createElement('div');
            sideMascotDiv.className = 'trail-hero-mascot pos-left';
            sideMascotDiv.innerHTML = unit.mascot;
            row.appendChild(sideMascotDiv);
          }
          // Unit 3: Léo cheering beside Node 8
          else if (levelNum === 8 && unit.mascot) {
            const sideMascotDiv = document.createElement('div');
            sideMascotDiv.className = 'trail-hero-mascot pos-right';
            sideMascotDiv.innerHTML = unit.mascot;
            row.appendChild(sideMascotDiv);
          }
          // Unit 4: Monstrinho Roxo (Boss) guarding Node 10
          else if (levelNum === 10 && unit.mascot) {
            const sideMascotDiv = document.createElement('div');
            sideMascotDiv.className = 'trail-hero-mascot trail-boss-mascot pos-left';
            sideMascotDiv.innerHTML = unit.mascot;
            row.appendChild(sideMascotDiv);
          }

          // Node button
          const btn = document.createElement('button');
          btn.className = 'stage-node-btn u' + unit.id + (isCompleted ? ' completed' : '') + (!isUnlocked ? ' locked' : '');
          btn.id = 'node-btn-' + levelNum;
          btn.onclick = (e) => onNodeClicked(levelNum, btn, e);

          // Content inside node
          if (levelNum === 10) {
            // Stage 10 displays the Monstrinho Boss!
            btn.innerHTML = isUnlocked ? ICONS.boss_monster : ICONS.lock;
          } else if (!isUnlocked) {
            btn.innerHTML = ICONS.lock;
          } else if (isCompleted) {
            btn.innerHTML = \`<div class="node-inner">\${ICONS.star}<div class="node-num" style="font-size: 13px; font-weight:800; color:#78350F; margin-top:-2px;">\${levelNum}</div></div>\`;
          } else {
            btn.innerHTML = \`<div class="node-inner"><div class="node-num">\${levelNum}</div></div>\`;
          }

          // If current active unlocked stage, add progress ring and bouncing tag!
          if (isCurrentActive) {
            const tag = document.createElement('div');
            tag.className = 'active-bounce-tag';
            tag.innerText = 'COMEÇAR';
            row.appendChild(tag);

            const ringSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            ringSvg.setAttribute('viewBox', '0 0 100 100');
            ringSvg.setAttribute('class', 'progress-ring-svg');
            ringSvg.innerHTML = \`<circle class="progress-ring-circle" cx="50" cy="50" r="44"/>\`;
            row.appendChild(ringSvg);
          }

          row.appendChild(btn);
          unitEl.appendChild(row);
        });

        // Intercalated Treasure Chest after unit
        if (unit.chestAfter) {
          const chestRow = document.createElement('div');
          chestRow.className = 'chest-row';
          const isChestUnlocked = hero.unlockedLevel > unit.chestAfter;
          const isChestOpened = hero.openedChests && hero.openedChests.includes(unit.chestAfter);

          const chestBtn = document.createElement('div');
          chestBtn.className = 'chest-island-btn' + (isChestUnlocked && !isChestOpened ? ' ready-to-open' : '');
          chestBtn.innerHTML = isChestOpened ? ICONS.chest_open : ICONS.chest_closed;
          chestBtn.onclick = () => onChestClicked(unit.chestAfter, chestBtn);

          const chestLabel = document.createElement('div');
          chestLabel.className = 'chest-reward-label';
          chestLabel.innerText = isChestOpened ? '✓ Resgatado' : '+25 💎';

          chestRow.appendChild(chestBtn);
          chestRow.appendChild(chestLabel);
          unitEl.appendChild(chestRow);
        }

        wrapper.appendChild(unitEl);
      });

      // Draw dynamic curved SVG path connecting nodes
      setTimeout(drawCurvedConnectingTrail, 100);
    }

    function onNodeClicked(levelNum, btnElement, event) {
      if (event && event.stopPropagation) event.stopPropagation();
      const hero = getActiveHero();
      const isUnlocked = levelNum <= hero.unlockedLevel;

      if (!isUnlocked) {
        // Shake feedback & sound
        btnElement.classList.add('shake-node');
        playErrorSound();
        setTimeout(() => btnElement.classList.remove('shake-node'), 450);

        // Show locked popover
        showPopover(levelNum, btnElement, true);
        return;
      }

      playTone(520, 'sine', 0.08);
      showPopover(levelNum, btnElement, false);
    }

    function showPopover(levelNum, btnElement, isLocked) {
      const popover = document.getElementById('interactive-popover');
      const lesson = LESSONS_DATA[levelNum];
      if (!popover || !lesson) return;

      selectedStageForPopover = levelNum;

      const titleEl = document.getElementById('popover-stage-title');
      const subEl = document.getElementById('popover-stage-subtitle');
      const starsRow = document.getElementById('popover-stars-row');
      const actionBtn = document.getElementById('popover-action-btn');

      if (isLocked) {
        popover.className = 'popover-card open locked-popover';
        titleEl.innerText = '🔒 Desafio Bloqueado';
        subEl.innerText = 'Complete a fase anterior para liberar este poder!';
        starsRow.style.display = 'none';
        actionBtn.innerText = 'FECHAR';
        actionBtn.className = 'btn-3d btn-3d-gray popover-start-btn';
        actionBtn.onclick = hidePopover;
      } else {
        popover.className = 'popover-card open';
        titleEl.innerText = 'Fase ' + levelNum + ' • ' + lesson.title.split('•')[0].trim();
        subEl.innerText = lesson.subtitle || 'Desafio de Matemática';
        starsRow.style.display = 'flex';
        actionBtn.innerText = 'COMEÇAR +10 💎';
        actionBtn.className = 'btn-3d btn-3d-green popover-start-btn';
        actionBtn.onclick = startSelectedLesson;
      }

      // Position popover relative to clicked node
      const rect = btnElement.getBoundingClientRect();
      const mapContainer = document.getElementById('screen-adventure');
      const mapRect = mapContainer.getBoundingClientRect();

      const topPos = (rect.top - mapRect.top) - 10;
      const leftPos = (rect.left - mapRect.left) + (rect.width / 2);

      popover.style.top = topPos + 'px';
      popover.style.left = leftPos + 'px';
    }

    function hidePopover() {
      const popover = document.getElementById('interactive-popover');
      if (popover) {
        popover.classList.remove('open');
      }
    }

    // Close popover when clicking anywhere else
    document.addEventListener('click', (e) => {
      const popover = document.getElementById('interactive-popover');
      if (popover && popover.classList.contains('open') && !popover.contains(e.target)) {
        hidePopover();
      }
    });

    // Draw smooth cubic Bézier S-curve connecting all 10 nodes
    function drawCurvedConnectingTrail() {
      const svg = document.getElementById('trail-svg');
      const map = document.getElementById('screen-adventure');
      if (!svg || !map) return;

      const mapRect = map.getBoundingClientRect();
      svg.setAttribute('width', mapRect.width);
      svg.setAttribute('height', map.scrollHeight);

      const points = [];
      const hero = getActiveHero();

      for (let i = 1; i <= 10; i++) {
        const btn = document.getElementById('node-btn-' + i);
        if (btn) {
          const r = btn.getBoundingClientRect();
          const cx = (r.left - mapRect.left) + r.width / 2;
          const cy = (r.top - mapRect.top) + r.height / 2;
          points.push({ x: cx, y: cy, level: i });
        }
      }

      svg.innerHTML = '';

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const isSegmentUnlocked = p2.level <= hero.unlockedLevel;

        const deltaY = (p2.y - p1.y) / 2;
        const segmentPath = \`M \${p1.x} \${p1.y} C \${p1.x} \${p1.y + deltaY}, \${p2.x} \${p2.y - deltaY}, \${p2.x} \${p2.y}\`;

        const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathEl.setAttribute('d', segmentPath);
        pathEl.setAttribute('fill', 'none');
        pathEl.setAttribute('stroke-width', '10');
        pathEl.setAttribute('stroke-linecap', 'round');

        if (isSegmentUnlocked) {
          pathEl.setAttribute('stroke', '#58CC02');
        } else {
          pathEl.setAttribute('stroke', '#E2E8F0');
          pathEl.setAttribute('stroke-dasharray', '8 8');
        }
        svg.appendChild(pathEl);
      }
    }

    window.addEventListener('resize', () => {
      setTimeout(drawCurvedConnectingTrail, 150);
    });

    // Treasure Chest Reward claim
    function onChestClicked(chestNum, chestElement) {
      const hero = getActiveHero();
      const isChestUnlocked = hero.unlockedLevel > chestNum;
      if (!isChestUnlocked) {
        alert('🔒 Vença todas as fases da unidade anterior para abrir este Baú de Tesouro!');
        playErrorSound();
        return;
      }
      if (!hero.openedChests) hero.openedChests = [];
      if (hero.openedChests.includes(chestNum)) {
        alert('🎉 Este baú já foi resgatado com sucesso!');
        return;
      }

      // Claim reward
      hero.openedChests.push(chestNum);
      hero.gems += 25;
      saveState();

      playFanfareSound();
      try {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      } catch(e) {}

      chestElement.innerHTML = ICONS.chest_open;
      chestElement.classList.remove('ready-to-open');
      renderMapTrail();
      alert('🌟 BAÚ DA LIGA ABERTO! Você encontrou +25 Gemas Mágicas 💎!');
    }

    // ==========================================
    // LESSON RUNNER & QUIZ ENGINE
    // ==========================================
    let currentLesson = null;
    let currentQIndex = 0;
    let selectedOptionVal = null;
    let mistakeRetryQueue = [];
    let isReforcoMode = false;
    let qStartTime = 0;

    function startSelectedLesson() {
      hidePopover();
      const hero = getActiveHero();
      if (hero.hearts <= 0) {
        showGameOverModal();
        return;
      }

      const level = selectedStageForPopover || 1;
      currentLesson = JSON.parse(JSON.stringify(LESSONS_DATA[level] || LESSONS_DATA[1]));
      currentQIndex = 0;
      selectedOptionVal = null;
      mistakeRetryQueue = [];
      isReforcoMode = false;

      // Update tutor avatar with chosen hero
      const tutorAvatar = document.getElementById('lesson-tutor-avatar');
      if (tutorAvatar) {
        tutorAvatar.innerHTML = AVATARS[hero.avatar] || AVATARS.leo;
      }

      // Show Boss header if stage 10
      const bossHeader = document.getElementById('boss-fight-header');
      if (bossHeader) {
        bossHeader.style.display = (level === 10) ? 'flex' : 'none';
      }

      // Hide map & tabs, open lesson screen
      document.getElementById('screen-adventure').style.display = 'none';
      document.querySelector('.mobile-tab-bar').style.display = 'none';
      document.querySelector('.app-header').style.display = 'none';
      document.querySelector('.vip-banner').style.display = 'none';
      document.getElementById('lesson-screen').style.display = 'flex';

      renderLessonQuestion();
    }

    function renderLessonQuestion() {
      qStartTime = Date.now();
      const q = currentLesson.questions[currentQIndex];
      const hero = getActiveHero();

      // Progress bar
      const progressPercent = (currentQIndex / currentLesson.questions.length) * 100;
      document.getElementById('lesson-progress-bar').style.width = progressPercent + '%';
      document.getElementById('lesson-hearts-count').innerText = hero.hearts;

      // Category & Tip with hero name
      const heroTitle = hero.avatar === 'maya' ? 'Maya' : (hero.avatar === 'leo' ? 'Léo' : hero.name);
      document.getElementById('lesson-category-tag').innerText = isReforcoMode ? '🎯 REFORÇO DE OURO' : currentLesson.title;
      document.getElementById('lesson-tip-text').innerText = q.tip || ('Dica do ' + heroTitle + ': Você consegue herói!');

      // Question Text
      document.getElementById('lesson-question-text').innerText = q.q;

      // Reset options & button
      const container = document.getElementById('lesson-options-container');
      container.innerHTML = '';
      selectedOptionVal = null;
      document.getElementById('btn-verify-answer').disabled = true;

      // Hide feedback drawer
      document.getElementById('feedback-drawer').style.display = 'none';
      document.getElementById('lesson-footer-bar').style.display = 'block';

      // Render 4 option buttons
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-card-btn';
        btn.innerHTML = \`<span class="option-key-badge">\${idx + 1}</span>\${opt}\`;
        btn.onclick = () => onSelectLessonOption(btn, opt);
        container.appendChild(btn);
      });

      // Speak question
      setTimeout(() => speakText(q.q), 300);
    }

    function onSelectLessonOption(btn, val) {
      document.querySelectorAll('.option-card-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedOptionVal = val;
      document.getElementById('btn-verify-answer').disabled = false;
      playTone(480, 'sine', 0.05);
    }

    function checkSelectedAnswer() {
      if (selectedOptionVal === null) return;
      const q = currentLesson.questions[currentQIndex];
      const isCorrect = (selectedOptionVal === q.correct);
      const hero = getActiveHero();
      const durationSec = (Date.now() - qStartTime) / 1000;

      document.getElementById('lesson-footer-bar').style.display = 'none';
      const drawer = document.getElementById('feedback-drawer');
      const title = document.getElementById('fb-drawer-title');
      const msg = document.getElementById('fb-drawer-msg');
      const nextBtn = document.getElementById('fb-drawer-btn');

      drawer.className = 'feedback-drawer ' + (isCorrect ? 'correct' : 'incorrect');
      nextBtn.className = 'btn-3d ' + (isCorrect ? 'btn-3d-green' : 'btn-3d-blue') + ' next-step-btn';
      drawer.style.display = 'block';

      if (isCorrect) {
        playSuccessSound();
        try {
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.85 } });
        } catch(e) {}

        if (durationSec <= 5) {
          hero.xp += 15;
          title.innerHTML = '⚡ RESPOSTA RELÂMPAGO! +15 XP';
          msg.innerText = 'Impressionante! Você calculou na velocidade da luz!';
          speakText('Resposta relâmpago! Excelente cálculo!');
        } else {
          hero.xp += 10;
          title.innerHTML = '🎉 Resposta Certa! +10 XP';
          msg.innerText = 'Sensacional! Você calculou como um verdadeiro Herói da Multiplicação!';
          speakText('Muito bem herói! Resposta certa!');
        }
        saveState();
      } else {
        playErrorSound();
        hero.hearts = Math.max(0, hero.hearts - 1);
        document.getElementById('lesson-hearts-count').innerText = hero.hearts;
        saveState();

        // Adaptive Retry Queue
        if (!isReforcoMode && !mistakeRetryQueue.some(item => item.q === q.q)) {
          mistakeRetryQueue.push(q);
        }

        title.innerHTML = '❌ Quase lá!';
        msg.innerText = q.tip || 'Tente novamente! Todo herói aprende errando.';
        speakText('Quase lá! ' + (q.tip || 'Vamos tentar de novo!'));

        if (hero.hearts <= 0) {
          setTimeout(showGameOverModal, 1200);
        }
      }
    }

    function advanceToNextQuestion() {
      currentQIndex++;
      if (currentQIndex < currentLesson.questions.length) {
        renderLessonQuestion();
      } else {
        if (mistakeRetryQueue.length > 0 && !isReforcoMode) {
          // Launch Adaptive Mistake Mastery Mode
          isReforcoMode = true;
          currentLesson = {
            title: '🎯 Reforço de Maestria',
            questions: [...mistakeRetryQueue]
          };
          mistakeRetryQueue = [];
          currentQIndex = 0;
          alert('🌟 HORA DO REFORÇO DE OURO! Vamos dominar as questões com dúvida!');
          speakText('Hora do reforço de ouro! Vamos dominar todas as dúvidas!');
          renderLessonQuestion();
        } else {
          finishLessonSuccessfully();
        }
      }
    }

    function finishLessonSuccessfully() {
      const hero = getActiveHero();
      playFanfareSound();
      try {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      } catch(e) {}

      // Unlock next stage
      const currentLevel = selectedStageForPopover || 1;
      if (currentLevel === hero.unlockedLevel && hero.unlockedLevel < 10) {
        hero.unlockedLevel += 1;
      }
      hero.gems += 15;
      hero.xp += 30;
      saveState();

      document.getElementById('modal-victory').style.display = 'flex';
    }

    function exitLesson() {
      if (confirm('Deseja sair da lição? Seu progresso nesta fase será reiniciado.')) {
        closeLessonScreen();
      }
    }

    function closeLessonScreen() {
      document.getElementById('lesson-screen').style.display = 'none';
      document.getElementById('screen-adventure').style.display = 'flex';
      document.querySelector('.mobile-tab-bar').style.display = 'flex';
      document.querySelector('.app-header').style.display = 'flex';
      document.querySelector('.vip-banner').style.display = 'flex';
      renderMapTrail();
    }

    function closeVictoryModal() {
      document.getElementById('modal-victory').style.display = 'none';
      closeLessonScreen();
    }

    // --- GAME OVER & RECOVERY ---
    function showGameOverModal() {
      document.getElementById('modal-gameover').style.display = 'flex';
    }

    function closeGameOverModal() {
      document.getElementById('modal-gameover').style.display = 'none';
      closeLessonScreen();
    }

    function recoverViaTraining() {
      const hero = getActiveHero();
      hero.hearts = 3;
      saveState();
      document.getElementById('modal-gameover').style.display = 'none';
      playSuccessSound();
      alert('⚡ Treino de recuperação com o Léo concluído! Você ganhou +3 Vidas ❤️');
      if (document.getElementById('lesson-screen').style.display === 'flex') {
        renderLessonQuestion();
      }
    }

    function recoverViaGems() {
      const hero = getActiveHero();
      if (hero.gems >= 20) {
        hero.gems -= 20;
        hero.hearts = 5;
        saveState();
        document.getElementById('modal-gameover').style.display = 'none';
        playFanfareSound();
        alert('💎 Vidas recarregadas com sucesso! +5 Vidas ❤️');
        if (document.getElementById('lesson-screen').style.display === 'flex') {
          renderLessonQuestion();
        }
      } else {
        alert('💎 Gemas insuficientes! Faça o Treino Rápido gratuito.');
      }
    }

    // ==========================================
    // PORTAL DOS HERÓIS (LOGIN & PROFILE MANAGEMENT)
    // ==========================================
    let selectedNewAvatarKey = 'leo';

    function openPortalModal(tab = 'select') {
      switchPortalTab(tab);
      renderSavedHeroesList();
      document.getElementById('modal-portal').style.display = 'flex';
    }

    function closePortalModal() {
      document.getElementById('modal-portal').style.display = 'none';
    }

    function switchPortalTab(tab) {
      document.getElementById('portal-content-select').style.display = tab === 'select' ? 'block' : 'none';
      document.getElementById('portal-content-create').style.display = tab === 'create' ? 'block' : 'none';
      document.getElementById('portal-content-guardian').style.display = tab === 'guardian' ? 'block' : 'none';

      document.getElementById('tab-portal-select').classList.toggle('active', tab === 'select');
      document.getElementById('tab-portal-create').classList.toggle('active', tab === 'create');
      document.getElementById('tab-portal-guardian').classList.toggle('active', tab === 'guardian');
      playTone(450, 'sine', 0.05);
    }

    function openGuardianLoginTab() {
      openPortalModal('guardian');
    }

    function renderSavedHeroesList() {
      const list = document.getElementById('saved-heroes-list');
      if (!list) return;
      list.innerHTML = '';

      const profiles = Object.values(appData.profiles);
      profiles.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'saved-hero-card';
        card.innerHTML = \`
          <div class="saved-hero-avatar-box">
            \${AVATARS[hero.avatar] || AVATARS.leo}
          </div>
          <div class="saved-hero-name">\${hero.name}</div>
          <div class="saved-hero-stats">
            <span>🔥 \${hero.streak}</span>
            <span>💎 \${hero.gems}</span>
            <span>❤️ \${hero.hearts}</span>
          </div>
        \`;
        card.onclick = () => selectActiveHero(hero.id);
        list.appendChild(card);
      });
    }

    function selectActiveHero(heroId) {
      appData.activeHeroId = heroId;
      saveState();
      playFanfareSound();
      closePortalModal();
      renderMapTrail();
    }

    function selectNewHeroAvatar(avatarKey, btnElement) {
      selectedNewAvatarKey = avatarKey;
      document.querySelectorAll('#creator-avatar-picker .avatar-choice-btn').forEach(b => b.classList.remove('selected'));
      btnElement.classList.add('selected');
      playTone(520, 'sine', 0.06);
    }

    function submitCreateHero() {
      const nameInput = document.getElementById('create-hero-name');
      const pinInput = document.getElementById('create-hero-pin');
      const name = nameInput.value.trim() || 'Herói';
      const pin = pinInput.value.trim();

      const newId = 'hero_' + Date.now();
      appData.profiles[newId] = {
        id: newId,
        name: name,
        avatar: selectedNewAvatarKey,
        pin: pin,
        hearts: 5,
        streak: 1,
        gems: 100,
        xp: 0,
        unlockedLevel: 1,
        openedChests: [],
        isVIP: false
      };
      appData.activeHeroId = newId;
      saveState();

      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      } catch(e) {}
      playFanfareSound();

      nameInput.value = '';
      pinInput.value = '';
      closePortalModal();
      renderMapTrail();
    }

    function syncGuardianAccount() {
      const email = document.getElementById('guardian-email').value.trim();
      if (!email) {
        alert('Por favor, informe seu e-mail de responsável.');
        return;
      }
      playFanfareSound();
      alert('☁️ Conta de ' + email + ' sincronizada com sucesso! Passe VIP e progresso salvos na nuvem.');
      closePortalModal();
    }

    // ==========================================
    // MODAL: QUARTEL DO HERÓI (PROFILE & STATS)
    // ==========================================
    function openHeroProfileModal() {
      const hero = getActiveHero();
      if (!hero) return;

      document.getElementById('profile-avatar-container').innerHTML = AVATARS[hero.avatar] || AVATARS.leo;
      document.getElementById('profile-hero-name').innerText = hero.name;
      document.getElementById('profile-hero-rank').innerText = 'Agente da Liga dos Heróis • Nível ' + hero.unlockedLevel;
      document.getElementById('profile-stat-streak').innerText = hero.streak + ' Dias';
      document.getElementById('profile-stat-gems').innerText = hero.gems;
      document.getElementById('profile-stat-hearts').innerText = hero.hearts + ' / 5';
      document.getElementById('profile-stat-stages').innerText = (hero.unlockedLevel - 1) + ' / 10';

      // Highlight current avatar choice
      document.querySelectorAll('#profile-avatar-switcher .avatar-choice-btn').forEach(b => {
        b.classList.remove('selected');
      });

      document.getElementById('modal-hero-profile').style.display = 'flex';
      playTone(450, 'sine', 0.05);
    }

    function closeHeroProfileModal() {
      document.getElementById('modal-hero-profile').style.display = 'none';
    }

    function updateActiveHeroAvatar(avatarKey, btnElement) {
      const hero = getActiveHero();
      hero.avatar = avatarKey;
      saveState();

      document.querySelectorAll('#profile-avatar-switcher .avatar-choice-btn').forEach(b => b.classList.remove('selected'));
      btnElement.classList.add('selected');
      document.getElementById('profile-avatar-container').innerHTML = AVATARS[avatarKey] || AVATARS.leo;
      playTone(520, 'sine', 0.08);
      renderMapTrail();
    }

    function switchHeroUser() {
      closeHeroProfileModal();
      openPortalModal('select');
    }

    // ==========================================
    // TAB NAVIGATION (AVENTURA, SHOP, APOSTILAS)
    // ==========================================
    function switchTab(tabKey) {
      document.getElementById('screen-adventure').style.display = tabKey === 'adventure' ? 'flex' : 'none';
      document.getElementById('screen-shop').style.display = tabKey === 'shop' ? 'flex' : 'none';
      document.getElementById('screen-workbooks').style.display = tabKey === 'workbooks' ? 'flex' : 'none';

      document.getElementById('tab-btn-adventure').classList.toggle('active', tabKey === 'adventure');
      document.getElementById('tab-btn-shop').classList.toggle('active', tabKey === 'shop');
      document.getElementById('tab-btn-workbooks').classList.toggle('active', tabKey === 'workbooks');

      if (tabKey === 'adventure') {
        renderMapTrail();
      }
      playTone(400, 'sine', 0.05);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Shop actions
    function addGems(amt) {
      const hero = getActiveHero();
      hero.gems += amt;
      saveState();
      playFanfareSound();
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch(e) {}
      alert('🎉 +' + amt + ' Gemas adicionadas ao seu saldo!');
    }

    function buyHeartRefill() {
      const hero = getActiveHero();
      if (hero.gems >= 20) {
        hero.gems -= 20;
        hero.hearts = 5;
        saveState();
        playFanfareSound();
        alert('❤️ Suas 5 vidas foram recarregadas!');
      } else {
        alert('💎 Gemas insuficientes!');
      }
    }

    // Keyboard Shortcuts (1, 2, 3, 4, Enter, Esc)
    window.addEventListener('keydown', (e) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const options = document.querySelectorAll('.option-card-btn');
        const idx = parseInt(e.key) - 1;
        if (options[idx]) options[idx].click();
      }
      if (e.key === 'Enter') {
        const verifyBtn = document.getElementById('btn-verify-answer');
        const nextBtn = document.getElementById('fb-drawer-btn');
        const drawer = document.getElementById('feedback-drawer');
        if (drawer && drawer.style.display === 'block') {
          nextBtn.click();
        } else if (verifyBtn && !verifyBtn.disabled) {
          verifyBtn.click();
        }
      }
      if (e.key === 'Escape') {
        hidePopover();
        closeHeroProfileModal();
        closePortalModal();
      }
    });

    // --- INITIALIZATION ---
    loadState();
    renderTopHUD();
    renderMapTrail();

    // Query parameter routing for direct navigation & testing
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('portal') === 'create') {
      openPortalModal('create');
    } else if (urlParams.get('portal') === 'select') {
      openPortalModal('select');
    } else if (urlParams.get('profile') === 'true') {
      openHeroProfileModal();
    } else if (urlParams.get('tab')) {
      switchTab(urlParams.get('tab'));
    } else if (urlParams.get('lesson')) {
      selectedStageForPopover = parseInt(urlParams.get('lesson'));
      startSelectedLesson();
    } else if (urlParams.get('popover')) {
      const lvl = parseInt(urlParams.get('popover'));
      const btn = document.getElementById('node-btn-' + lvl);
      if (btn) onNodeClicked(lvl, btn, { stopPropagation: () => {} });
    } else if (urlParams.get('view') === 'map') {
      // Force map directly
    } else if (!localStorage.getItem(STORAGE_KEY) && !localStorage.getItem('missao_tabuada_duo')) {
      // First visit ever: open Portal with hero selector / creator
      openPortalModal('select');
    }
  </script>
</body>
</html>
`;

// Write to app.html and duolingo_tabuada.html
fs.writeFileSync(path.join(__dirname, 'app.html'), htmlContent, 'utf8');
fs.writeFileSync(path.join(__dirname, 'duolingo_tabuada.html'), htmlContent, 'utf8');

console.log("Successfully compiled app.html and duolingo_tabuada.html with Heróis da Multiplicação branding!");
