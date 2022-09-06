const osElementos = document.querySelectorAll("[data-quadrado]");
const quadro = document.querySelector("[data-quadro]");
const vitoriaText = document.querySelector(
  "[data-vitoria-text]"
);
const vitoria = document.querySelector("[data-vitoria]");
const reiniciarBotao = document.querySelector("[data-vitoria-button]");

let turnoBolinha;

const combinacoesVitoria = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const iniciarJogo = () => {
  turnoBolinha = false;

  for (const quadrado of osElementos) {
    quadrado.classList.remove("bolinha");
    quadrado.classList.remove("x");
    quadrado.removeEventListener("click", handleClick);
    quadrado.addEventListener("click", handleClick, { once: true });
  }

  setarSimboloHover();
  vitoria.classList.remove("show-vitoria");
};

const fimDeJogo = (jogoEmpatado) => {
  if (jogoEmpatado) {
    vitoriaText.innerText = "O Jogo resultou em um Empate!";
  } else {
    vitoriaText.innerText = turnoBolinha
      ? "O Jogador O Venceu!"
      : "O Jogador X Venceu!";
  }

  vitoria.classList.add("show-vitoria");
};

const checarVitoria = (currentPlayer) => {
  return combinacoesVitoria.some((combination) => {
    return combination.every((index) => {
      return osElementos[index].classList.contains(currentPlayer);
    });
  });
};

const checarEmpate = () => {
  return [...osElementos].every((quadrado) => {
    return quadrado.classList.contains("x") || quadrado.classList.contains("bolinha");
  });
};

const colocarSimbolo = (quadrado, classToAdd) => {
  quadrado.classList.add(classToAdd);
};

const setarSimboloHover = () => {
  quadro.classList.remove("bolinha");
  quadro.classList.remove("x");

  if (turnoBolinha) {
    quadro.classList.add("bolinha");
  } else {
    quadro.classList.add("x");
  }
};

const mudarTurno = () => {
  turnoBolinha = !turnoBolinha;

  setarSimboloHover();
};

const handleClick = (e) => {
  const quadrado = e.target;
  const classToAdd = turnoBolinha ? "bolinha" : "x";

  colocarSimbolo(quadrado, classToAdd);

  const nGanhou = checarVitoria(classToAdd);

  const jogoEmpatado = checarEmpate();

  if (nGanhou) {
    fimDeJogo(false);
  } else if (jogoEmpatado) {
    fimDeJogo(true);
  } else {

    mudarTurno();
  }
};

iniciarJogo();

reiniciarBotao.addEventListener("click", iniciarJogo);
