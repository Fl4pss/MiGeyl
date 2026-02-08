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
  "media/photos/4.jpg",
  "media/photos/5.jpeg",
  "media/photos/6.jpeg",
  "media/photos/7.jpg",
  "media/photos/8.jpg",
  "media/photos/9.jpg"
];

const videos = [
  "media/videos/1.mp4",
  "media/videos/2.mp4",
  "media/videos/3.mp4"
];

/* CONTAINERS */
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

function showButton(i) {
  const btn = screens[i].querySelector("button");
  if (btn) btn.style.display = "inline-block";
}

function nextScreen() {
  screens[currentScreen].classList.remove("active");
  currentScreen++;
  screens[currentScreen].classList.add("active");

  if (currentScreen === 1) typeText("text2", texts[1], 50, () => showButton(1));
  if (currentScreen === 2) typeText("text3", texts[2], 50, () => showButton(2));
  if (currentScreen === 3) typeText("text4", texts[3], 50, () => showButton(3));
}

function yesAnswer() {
  sparkleBurst();
  screens[currentScreen].classList.remove("active");
  currentScreen++;
  screens[currentScreen].classList.add("active");

  if (screens[currentScreen].querySelector("#memoryCard")) {
    setTimeout(generateMemoryCard, 400);
  }
}

typeText("text1", texts[0], 50, () => showButton(0));

/* NO BUTTON DODGE */
const noBtn = document.getElementById("noBtn");
noBtn.addEventListener("mouseover", () => {
  noBtn.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 100 - 50}px)`;
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
setInterval(floatPhoto, 3000);

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

/* MEMORY CARD GENERATOR (UPDATED — 2 PHOTOS ONLY) */
function generateMemoryCard() {
  const canvas = document.getElementById("memoryCard");
  const ctx = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = 1000;

  ctx.clearRect(0, 0, 800, 1000);

  /* Background */
  const gradient = ctx.createLinearGradient(0, 0, 0, 1000);
  gradient.addColorStop(0, "#ffdde1");
  gradient.addColorStop(1, "#fcb1c3");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 1000);

  /* Abstract blobs */
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = "#ff5e78";
  ctx.beginPath();
  ctx.arc(150, 200, 180, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(650, 850, 220, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Shuffle and pick 2 UNIQUE photos
  const shuffled = photos.sort(() => 0.5 - Math.random());
  const selectedPhotos = shuffled.slice(0, 2);

  const positions = [
    { x: 150, y: 320, rotate: -0.08 },
    { x: 380, y: 380, rotate: 0.06 }
  ];

  let imagesLoaded = 0;

  selectedPhotos.forEach((src, index) => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      drawPhoto(img, positions[index]);
      imagesLoaded++;
      if (imagesLoaded === 2) drawText();
    };

    img.onerror = () => {
      console.error("Image failed to load:", src);
      imagesLoaded++;
      if (imagesLoaded === 2) drawText();
    };
  });

  function drawPhoto(img, pos) {
    ctx.save();
    ctx.translate(pos.x + 170, pos.y + 170);
    ctx.rotate(pos.rotate);
  
    ctx.shadowColor = "rgba(0,0,0,0.25)";
    ctx.shadowBlur = 20;
  
    ctx.fillStyle = "white";
    ctx.fillRect(-190, -190, 380, 420);
  
    ctx.shadowBlur = 0;
  
    // --- FIXED IMAGE RATIO ---
    const frameSize = 340;
  
    const imgRatio = img.width / img.height;
    const frameRatio = 1; // square frame
  
    let sx, sy, sWidth, sHeight;
  
    if (imgRatio > frameRatio) {
      // image wider than frame
      sHeight = img.height;
      sWidth = img.height * frameRatio;
      sx = (img.width - sWidth) / 2;
      sy = 0;
    } else {
      // image taller than frame
      sWidth = img.width;
      sHeight = img.width / frameRatio;
      sx = 0;
      sy = (img.height - sHeight) / 2;
    }
  
    ctx.drawImage(
      img,
      sx, sy, sWidth, sHeight,
      -170, -170, frameSize, frameSize
    );
  
    ctx.restore();
  }
  

  function drawText() {
    ctx.textAlign = "center";
  
    ctx.fillStyle = "#ff4f70";
    ctx.font = "bold 70px Playfair Display";
    ctx.fillText("Happy Valentine’s Day 💖", 400, 120);
  
    ctx.font = "28px Inter";
    ctx.fillStyle = "#555";
    ctx.fillText("February 14, 2026", 400, 170);
  
    ctx.font = "28px Inter";
    ctx.fillStyle = "#333";
  
    const poem =
      "In your smile, I found my home.\n" +
      "In your arms, my safest place.\n" +
      "With every heartbeat, I choose you,\n" +
      "Today, tomorrow, always. ❤️";
  
    wrapText(ctx, poem, 400, 830, 600, 40);
  
    ctx.font = "50px Arial";
    ctx.fillText("💘", 120, 950);
    ctx.fillText("💞", 680, 950);
  }
  
}


/* WRAP TEXT */
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = text.split("\n");
  lines.forEach(line => {
    ctx.fillText(line, x, y);
    y += lineHeight;
  });
}

/* FIXED DOWNLOAD BUTTON */
document.getElementById("downloadCardBtn").addEventListener("click", function () {
  const canvas = document.getElementById("memoryCard");

  if (!canvas) return;

  try {
    const imageURL = canvas.toDataURL("image/png");

    // Detect iPhone / iPad
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      // Open in new tab so user can long press → Save Image
      const newTab = window.open();
      newTab.document.write('<img src="' + imageURL + '" style="width:100%">');
    } else {
      // Normal download for Android & desktop
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "Valentine_Collage_2026.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

  } catch (err) {
    console.error("Download failed:", err);
  }
});

  
