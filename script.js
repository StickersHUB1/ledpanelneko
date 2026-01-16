const track = document.getElementById("ledTrack");

/* Scroll infinito */
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

/* VIDA ARTIFICIAL */
const bots = document.querySelectorAll(".minibot");

function life(bot){
  const delay = 1200 + Math.random()*4200;
  setTimeout(()=>{
    bot.classList.add("blink");
    setTimeout(()=>{
      bot.classList.remove("blink");
      life(bot);
    },100+Math.random()*120);
  },delay);
}

bots.forEach(life);
