// Starfield — p5.js
// Daniel Shiffman'ın Coding Challenge #1'inden uyarlanmıştır:
// https://youtu.be/17WoOqgXsRM

const MAX_SPEED = 60;
const CRUISE_SPEED = 8;
const KEY_STEP = 4;
const HUD_TIMEOUT = 4000; // ms; bu süre etkileşim olmazsa yardım kaybolur

let stars = [];
let depth; // en uzak z mesafesi (ekranın büyük kenarı)
let speed = 0;
let targetSpeed = CRUISE_SPEED;
let paused = false;
let colored = true;
let pointerControl = false;
let showHelp = true;
let lastInteraction = 0;
let hud, hudSpeed;

function setup() {
  // Retina ekranlarda netlik, ama 4K'da gereksiz yük olmasın.
  pixelDensity(min(displayDensity(), 2));
  createCanvas(windowWidth, windowHeight);
  strokeCap(ROUND);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targetSpeed = 1;
  }

  hud = document.getElementById("hud");
  hudSpeed = document.getElementById("speed");
  initStars();
  lastInteraction = millis();
}

function starCount() {
  return constrain(floor((width * height) / 1100), 400, 1600);
}

function initStars() {
  depth = max(width, height);
  stars = Array.from({ length: starCount() }, () => new Star());
}

function draw() {
  if (pointerControl) {
    targetSpeed = map(constrain(mouseX, 0, width), 0, width, 0, MAX_SPEED);
  }
  // Hız değişimini yumuşat.
  speed = lerp(speed, paused ? 0 : targetSpeed, 0.08);
  if (abs(speed) < 0.01) speed = 0;

  background(0);
  translate(width / 2, height / 2);
  for (const s of stars) {
    s.update(speed);
    s.show(speed, colored);
  }

  updateHud();
}

function updateHud() {
  if (frameCount % 6 === 0) {
    const pct = round((speed / MAX_SPEED) * 100);
    hudSpeed.textContent = paused ? "duraklatıldı" : `hız %${pct}`;
  }
  const idle = millis() - lastInteraction > HUD_TIMEOUT;
  hud.classList.toggle("hidden", !showHelp || idle);
}

function markInteraction() {
  lastInteraction = millis();
}

function mouseMoved() {
  pointerControl = true;
  markInteraction();
}

function touchStarted() {
  pointerControl = true;
  markInteraction();
  return false; // sayfanın kaymasını / yakınlaşmasını engelle
}

function touchMoved() {
  pointerControl = true;
  markInteraction();
  return false;
}

function keyPressed() {
  markInteraction();
  if (keyCode === UP_ARROW) {
    pointerControl = false;
    targetSpeed = min(targetSpeed + KEY_STEP, MAX_SPEED);
  } else if (keyCode === DOWN_ARROW) {
    pointerControl = false;
    targetSpeed = max(targetSpeed - KEY_STEP, 0);
  } else if (key === " ") {
    paused = !paused;
  } else if (key === "w" || key === "W") {
    pointerControl = false;
    targetSpeed = targetSpeed < MAX_SPEED ? MAX_SPEED : CRUISE_SPEED;
  } else if (key === "c" || key === "C") {
    colored = !colored;
  } else if (key === "f" || key === "F") {
    fullscreen(!fullscreen());
  } else if (key === "h" || key === "H") {
    showHelp = !showHelp;
  } else {
    return;
  }
  return false; // tarayıcının varsayılan davranışını (kaydırma vb.) engelle
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initStars();
}
