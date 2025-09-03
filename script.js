const gameArea = document.getElementById("gameArea");
let score = 0;
let time = 30;
let timer;
let running = false;

let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
let recorde = localStorage.getItem("recorde") || 0;

document.getElementById("recorde").textContent = recorde;

function iniciarJogo() {
  if (running) return;
  running = true;
  score = 0;
  time = 30;
  document.getElementById("score").textContent = score;
  document.getElementById("time").textContent = time;

  timer = setInterval(() => {
    time--;
    document.getElementById("time").textContent = time;
    if (time <= 0) fimDeJogo();
  }, 1000);

  gerarQuadrado();
}

function gerarQuadrado() {
  if (!running) return;

  gameArea.innerHTML = "";

  const square = document.createElement("div");
  square.classList.add("square");

  const maxX = gameArea.clientWidth - 50;
  const maxY = gameArea.clientHeight - 50;
  square.style.left = Math.floor(Math.random() * maxX) + "px";
  square.style.top = Math.floor(Math.random() * maxY) + "px";

  square.onclick = () => {
    score++;
    document.getElementById("score").textContent = score;
    gerarQuadrado();
  };

  gameArea.appendChild(square);
}

function fimDeJogo() {
  running = false;
  clearInterval(timer);
  gameArea.innerHTML = "";
  alert("⏰ Tempo esgotado! Você fez " + score + " pontos.");

  salvarResultado(score, "30s");

  if (score > recorde) {
    recorde = score;
    localStorage.setItem("recorde", recorde);
    document.getElementById("recorde").textContent = recorde;
    alert("🎉 Novo recorde: " + recorde + " pontos!");
  }
}

function salvarResultado(pontos, tempo) {
  ranking.unshift({ pontos, tempo });
  ranking = ranking.slice(0, 5);
  localStorage.setItem("ranking", JSON.stringify(ranking));
  mostrarRanking();
}

function mostrarRanking() {
  const lista = document.getElementById("ranking");
  lista.innerHTML = "";
  ranking.forEach((jogo, i) => {
    const item = document.createElement("li");
    item.textContent = `Jogo ${i + 1}: ${jogo.tempo} - ${jogo.pontos} pontos`;
    lista.appendChild(item);
  });
}

mostrarRanking();
