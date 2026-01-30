const track = document.getElementById("ledTrack");
const led = document.querySelector(".led");

/* === SCROLL INFINITO === */
track.innerHTML += track.innerHTML;
let start = performance.now();
let width = 0;
const speed = 120;

function init(){
  width = track.scrollWidth / 2;
}
init();

/* === SISTEMA === */

const SYSTEM = {
  KC: 0.6,
  entropy: 0.0007,
  age: 0,
  phase: "alive",
  last: performance.now()
};

const bots = [...document.querySelectorAll(".minibot")].map(el=>({
  el,
  E: Math.random(),
  V: 0.7 + Math.random()*0.6,
  coherence: 1
}));

function sigmoid(x,k=12){
  return 1/(1+Math.exp(-k*(x-.5)));
}

function computeKC(){
  const raw = bots.reduce((s,b)=>s+(b.E*b.V),0)/bots.length;
  SYSTEM.KC = sigmoid(Math.max(0,raw));
}

function applyEntropy(dt){
  SYSTEM.KC -= SYSTEM.entropy * dt;
  SYSTEM.KC -= (SYSTEM.age/6000)*dt*0.0004;
  SYSTEM.KC = Math.max(0,SYSTEM.KC);
}

function decayBots(){
  if(SYSTEM.KC > .2) return;

  bots.forEach(b=>{
    b.coherence -= 0.002;
    if(Math.random()>b.coherence){
      b.el.style.animation = "none";
    }else{
      b.el.style.animation = "";
    }
  });
}

function applyPhase(){
  if(SYSTEM.KC < .2) SYSTEM.phase = "decaying";
  if(SYSTEM.KC <= 0){
    SYSTEM.phase = "dead";
    led.dataset.phase = "dead";
    setTimeout(rebirth,6000);
  }
}

function rebirth(){
  SYSTEM.phase = "alive";
  SYSTEM.age = 0;
  SYSTEM.KC = .35;
  led.dataset.phase = "alive";

  bots.forEach(b=>{
    b.E = Math.random()*.5;
    b.coherence = 1;
    b.el.style.animation = "";
  });
}

function loop(now){
  const dt = (now - SYSTEM.last)/1000;
  SYSTEM.last = now;
  SYSTEM.age += dt;

  applyEntropy(dt);
  computeKC();
  decayBots();
  applyPhase();

  document.documentElement.style.setProperty("--karma",SYSTEM.KC.toFixed(3));
  document.documentElement.style.setProperty("--hue",180-(SYSTEM.KC*120));

  const x = -(((now-start)/1000)*speed)%width;
  track.style.transform = `translate3d(${x}px,0,0)`;

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
