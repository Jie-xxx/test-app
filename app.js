let currentIndex = 0;

function loadWord() {
  const w = words[currentIndex];
  document.getElementById("word").innerText = w.word;
  document.getElementById("meaning").innerText = w.meaning;
  document.getElementById("sentence").innerText = w.sentence;
  document.getElementById("sentenceZh").innerText = w.sentencecn;

  document.getElementById("meaning").classList.add("hidden");
  document.getElementById("sentenceZh").classList.add("hidden");
}

function nextWord() {
  currentIndex = Math.floor(Math.random() * words.length);
  loadWord();
}

function toggleMeaning() {
  document.getElementById("meaning").classList.toggle("hidden");
}

function toggleSentence() {
  document.getElementById("sentenceZh").classList.toggle("hidden");
}

loadWord();


function speak(type) {
  const w = words[currentIndex];
  const text = type === "word" ? w.word : w.sentence;

  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.9;

  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}


if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}


let startX = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (Math.abs(diff) > 50) {
    nextWord(); // 左或右滑都換下一題
  }
});



let pressTimer;

const wordEl = document.getElementById("word");

wordEl.addEventListener("touchstart", () => {
  pressTimer = setTimeout(() => {
    speakWord(); // 你之前的發音函式
  }, 500); // 長按 0.5 秒
});

wordEl.addEventListener("touchend", () => {
  clearTimeout(pressTimer);
});


