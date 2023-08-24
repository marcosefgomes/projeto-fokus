const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const buttons = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const buttonPlayPause = document.querySelector("#start-pause span");
const iconPlayPause = document.querySelector("#start-pause img");
const screenTime = document.querySelector("#timer");
const musicFocusInput = document.querySelector("#alternar-musica");
const music = new Audio("./sons/luna-rise-part-one.mp3");
const soundPlay = new Audio("./sons/play.wav");
const soundPause = new Audio("./sons/pause.mp3");
const soundEnd = new Audio("./sons/beep.mp3");
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
music.loop = true;
music.volume = 0.5;

musicFocusInput.addEventListener("change", () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(context) {
  showTime();
  buttons.forEach(function (context) {
    context.classList.remove("active");
  });
  html.setAttribute("data-contexto", context);
  banner.setAttribute("src", `/imagens/${context}.png`);
  switch (context) {
    case "foco":
      title.innerHTML = `
      Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>
      `;
      break;

    case "descanso-curto":
      title.innerHTML = `
      Que tal dar uma respirada?<br>
      <strong class="app__title-strong">Faça uma pausa curta!</strong>
      `;
      break;

    case "descanso-longo":
      title.innerHTML = `
      Hora de voltar à superfície.<br>
      <strong class="app__title-strong">Faça uma pausa longa.</strong>
      `;
      break;

    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    soundEnd.play();
    alert("Tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  showTime();
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    soundPause.play();
    zerar();
    return;
  }
  soundPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  buttonPlayPause.textContent = "Pausar";
  iconPlayPause.setAttribute("src", "./imagens/pause.png");
}

function zerar() {
  clearInterval(intervaloId);
  buttonPlayPause.textContent = "Começar";
  iconPlayPause.setAttribute("src", "./imagens/play_arrow.png");
  intervaloId = null;
}

function showTime() {
  const time = new Date(tempoDecorridoEmSegundos * 1000);
  const formatedTime = time.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  screenTime.innerHTML = `${formatedTime}`;
}

showTime();
