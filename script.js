const track = document.getElementById("ledTrack");

// Duplicamos el contenido para scroll infinito real
track.innerHTML += track.innerHTML;

const speed = 120; // px/seg
let startTime = performance.now();
let contentWidth = 0;

function init() {
  contentWidth = track.scrollWidth / 2;
}

function loop(now) {
  const elapsed = (now - startTime) / 1000;
  const x = -(elapsed * speed) % contentWidth;

  track.style.transform = `translate3d(${x}px, 0, 0)`;
  requestAnimationFrame(loop);
}

init();
requestAnimationFrame(loop);
