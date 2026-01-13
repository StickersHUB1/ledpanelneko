const track = document.querySelector(".led-track");

let x = window.innerWidth;
let speed = 120; // px/seg
let last = performance.now();

function loop(now) {
  const dt = (now - last) / 1000;
  last = now;

  x -= speed * dt;

  if (x < -track.offsetWidth) {
    x = window.innerWidth;
  }

  track.style.transform = `translate3d(${x}px,0,0)`;
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

window.exportLED = async function (seconds = 10) {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: { frameRate: 60 },
    audio: false
  });

  const recorder = new MediaRecorder(stream, {
    mimeType: "video/webm; codecs=vp9"
  });

  const chunks = [];

  recorder.ondataavailable = e => {
    if (e.data.size) chunks.push(e.data);
  };

  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "infinite-arcade-led.webm";
    a.click();

    stream.getTracks().forEach(t => t.stop());
    URL.revokeObjectURL(url);
  };

  recorder.start();
  setTimeout(() => recorder.stop(), seconds * 1000);
};
