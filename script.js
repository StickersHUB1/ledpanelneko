const track = document.getElementById("ledTrack");
const led = document.querySelector(".led");

/* ===== SCROLL INFINITO REAL ===== */
/* duplicamos contenido para loop perfecto */
track.innerHTML += track.innerHTML;

let start = performance.now();
let width = 0;

/* velocidad LED (px/s) */
const SPEED = 90;

/* recalcular ancho real */
function init(){
  width = track.scrollWidth / 2;
}
init();

window.addEventListener("resize", init);

/* ===== LOOP ===== */
function loop(now){
  const elapsed = (now - start) / 1000;
  const x = -(elapsed * SPEED) % width;
  track.style.transform = `translate3d(${x}px,0,0)`;
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

/* ===== ESTADOS (opcional, ya preparado) ===== */
/*
  Puedes cambiar el estado del panel desde fuera:
  led.dataset.phase = "alive" | "dead"
*/
