const screens = document.querySelectorAll(".screen");
let currentScreen = 0;

/* TEXT CONTENT */
const texts = [
  "Hi love… I made something just for you ❤️",
  "In a world full of noise, you are my favorite sound.",
  "Every ordinary day becomes special because of you.",
  "I just wanted you to know how much you mean to me."
];

/* MEDIA FILES */
const photos = [
  "media/photos/1.jpg",
  "media/photos/2.jpg",
  "media/photos/3.jpeg",
  "media/photos/4.jpg"
];

const videos = [
  "media/videos/1.mp4",
  "media/videos/2.mp4"
];

/* CORRECT CONTAINERS */
const photoBg = document.getElementById("photoBg");
const heartBg = document.getElementById("heartBg");

/* TYPING EFFECT */
function typeText(id, text, speed = 50, cb) {
  let i = 0;
  const el = document.getElementById(id);
  el.innerHTML = "";

  const t = setInterval(() => {
    el.innerHTML = text.slice(0, i++) + '<span class="cursor"></span>';
    if (i > text.length) {
      clearInterval(t);
      cb && cb();
    }
  }, speed);
}

/* SHOW BUTTON */
function showButton(i) {
  const btn = screens[i].querySelector("button");
  if (btn) btn.style.display = "inline-block";
}

/* NEXT SCREEN */
function nextScreen() {
  screens[currentScreen].classList.remove("active");
  currentScreen++;
  screens[currentScreen].classList.add("active");

  if (currentScreen === 1) typeText("text2", texts[1], 50, () => showButton(1));
  if (currentScreen === 2) typeText("text3", texts[2], 50, () => showButton(2));
  if (currentScreen === 3) typeText("text4", texts[3], 50, () => showButton(3));
}

/* YES */
function yesAnswer() {
  sparkleBurst();
  screens[currentScreen].classList.remove("active");
  screens[++currentScreen].classList.add("active");
}

/* START */
typeText("text1", texts[0], 50, () => showButton(0));

/* NO BUTTON DODGE */
const noBtn = document.getElementById("noBtn");
noBtn.addEventListener("mouseover", () => {
  noBtn.style.transform = `translate(${Math.random()*200-100}px,${Math.random()*100-50}px)`;
});

/* FLOATING PHOTOS */
function floatPhoto() {
  const wrap = document.createElement("div");
  wrap.className = "memory";
  wrap.style.left = Math.random() * 80 + "vw";
  wrap.style.animationDuration = 12 + Math.random() * 6 + "s";

  const img = document.createElement("img");
  img.src = photos[Math.floor(Math.random() * photos.length)];

  wrap.appendChild(img);
  photoBg.appendChild(wrap);

  setTimeout(() => wrap.remove(), 18000);
}

/* FLOATING VIDEOS */
function floatVideo() {
  const wrap = document.createElement("div");
  wrap.className = "memory";
  wrap.style.left = Math.random() * 70 + "vw";
  wrap.style.animationDuration = 14 + Math.random() * 6 + "s";

  const vid = document.createElement("video");
  vid.src = videos[Math.floor(Math.random() * videos.length)];
  vid.muted = true;
  vid.autoplay = true;
  vid.loop = true;
  vid.playsInline = true;

  wrap.appendChild(vid);
  photoBg.appendChild(wrap);

  setTimeout(() => wrap.remove(), 20000);
}

setInterval(floatPhoto, 3000);
setInterval(floatVideo, 7000);

/* HEARTS */
function createHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.innerHTML = "💓";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 16 + Math.random() * 20 + "px";
  h.style.animationDuration = 4 + Math.random() * 3 + "s";
  heartBg.appendChild(h);

  setTimeout(() => h.remove(), 7000);
}
setInterval(createHeart, 500);

/* MUSIC */
const music = document.getElementById("bgMusic");
music.volume = 0;
function fadeInMusic() {
  if (!music.paused) return;
  music.play();
  let v = 0;
  const f = setInterval(() => {
    if (v < 0.5) music.volume = v += 0.01;
    else clearInterval(f);
  }, 100);
}

/* SPARKLES */
function sparkleBurst() {
  for (let i = 0; i < 20; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.innerHTML = "✨";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = Math.random() * 100 + "vh";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1000);
  }
}

/* BUTTON HANDLER */
function handleNext(btn) {
  btn.disabled = true;
  nextScreen();
  fadeInMusic();
  setTimeout(() => btn.disabled = false, 1200);
}
