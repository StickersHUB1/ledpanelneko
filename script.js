const track = document.getElementById("ledTrack");

/* duplicado para scroll infinito real */
track.innerHTML += track.innerHTML;

const speed = 120;
let startTime = performance.now();
let contentWidth = 0;

function init() {
  contentWidth = track.scrollWidth / 2;
}

function loop(now) {
  const elapsed = (now - startTime) / 1000;
  const x = -(elapsed * speed) % contentWidth;
  track.style.transform = `translate3d(${x}px,0,0)`;
  requestAnimationFrame(loop);
}

init();
requestAnimationFrame(loop);

/* ===== MINI BOT BLINK ===== */

const bots = document.querySelectorAll(".minibot");

function randomBlink(bot) {
  const delay = 1200 + Math.random() * 4000;

  setTimeout(() => {
    bot.classList.add("blink");
    setTimeout(() => {
      bot.classList.remove("blink");
      randomBlink(bot);
    }, 120 + Math.random() * 120);
  }, delay);
}

bots.forEach(randomBlink);
