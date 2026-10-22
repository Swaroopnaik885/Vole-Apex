const canvas = document.querySelector("#frame");
const context = canvas.getContext("2d");

const frames = { currentIndex: 0, maxIndex: 160 };
let imagesLoaded = 0;
const images = [];

const firstImage = new Image();
firstImage.src = `Frames/frame_0000.webp`;
firstImage.onload = () => {
  images[0] = firstImage;
  loadImage(0);
};

function preloadImages() {
  for (let i = 0; i <= frames.maxIndex; i++) {
    const imageUrl = `Frames/frame_${i.toString().padStart(4, "0")}.webp`;
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === frames.maxIndex + 1) {
        loadImage(frames.currentIndex);
        document.body.style.overflow = "visible";
      }
    };
    images.push(img);
  }
}

function loadImage(index) {
  const img = images[index];
  if (!img || !img.complete) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  const newWidth = img.width * scale;
  const newHeight = img.height * scale;
  const offsetX = (canvas.width - newWidth) / 2;
  const offsetY = (canvas.height - newHeight) / 2;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
  frames.currentIndex = index;
}

const path = document.querySelector("#curve");
const handle = document.querySelector("#handle");
const sliderContainer = document.querySelector("#sliderContainer");
const pathLength = path.getTotalLength();

let isDragging = false;
let isAutoPlaying = false;
let hasCrossedHalf = false;

function moveHandle(progress) {
  if (!isFinite(progress)) progress = 0;
  progress = Math.max(0, Math.min(1, progress));
  const point = path.getPointAtLength(progress * pathLength);
  handle.setAttribute("cx", point.x);
  handle.setAttribute("cy", point.y);
}

function updateFromProgress(progress) {
  const index = Math.floor(progress * frames.maxIndex);
  loadImage(index);
  if (progress <= 0.3) {
    sliderContainer.style.opacity = 1 - (progress / 0.3);
  }
  if (progress >= 0.3 && !hasCrossedHalf) {
    hasCrossedHalf = true;
    sliderContainer.style.opacity = 0;
    startAutoPlay();
  }
}

handle.addEventListener("mousedown", () => { if (isAutoPlaying) return; isDragging = true; });
window.addEventListener("mouseup", () => { isDragging = false; });
window.addEventListener("mousemove", (e) => {
  if (!isDragging || isAutoPlaying) return;
  const rect = path.getBoundingClientRect();
  if (rect.width === 0) return;
  let progress = (rect.right - e.clientX) / rect.width;
  progress = Math.max(0, Math.min(1, progress));
  moveHandle(progress);
  updateFromProgress(progress);
});

handle.addEventListener("touchstart", () => { if (isAutoPlaying) return; isDragging = true; });
window.addEventListener("touchend", () => { isDragging = false; });
window.addEventListener("touchmove", (e) => {
  if (!isDragging || isAutoPlaying) return;
  const touch = e.touches[0];
  const rect = path.getBoundingClientRect();
  if (rect.width === 0) return;
  let progress = (rect.right - touch.clientX) / rect.width;
  progress = Math.max(0, Math.min(1, progress));
  moveHandle(progress);
  updateFromProgress(progress);
});

function startAutoPlay() {
  isAutoPlaying = true;
  let index = frames.currentIndex;
  function play() {
    if (index > frames.maxIndex) return;
    loadImage(index);
    index++;
    setTimeout(play, 0.5);
  }
  play();
}

const parent = document.querySelector(".canvas-wrapper");
let isReversing = false;
window.addEventListener("scroll", () => {
  const rect = document.querySelector("#hero").getBoundingClientRect();
  if (rect.top >= 0 && !isReversing && frames.currentIndex > 0) {
    startReverse();
  }
});

function startReverse() {
  isReversing = true;
  isAutoPlaying = false;
  let index = frames.currentIndex;
  function reversePlay() {
    if (index < 0) {
      isReversing = false;
      hasCrossedHalf = false;
      sliderContainer.style.opacity = 1;
      moveHandle(1);
      return;
    }
    loadImage(index);
    index--;
    setTimeout(reversePlay, 0.5);
  }
  reversePlay();
}

moveHandle(1);
preloadImages();