const btnInvia = document.querySelector('button.invia');
const btnRiprova = document.querySelector('button.riprova');
const h1 = document.querySelector('h1');
const p = document.querySelector('p');
const ulNumbers = document.querySelector('.numbers');
const ulInputNumbers = document.querySelector('.input-numbers');

const timeToStart = 3; // Variabile che salva i secondi da cui far partire il gioco
const startMessage = 'Memorizza i numeri';
const middleMessage = 'Inserisci i numeri che ti ricordi';
const middleMessageSubtitle = 'L\'ordine non e\' importante.';

initializeDOM();
startGame();
// Funzioni DOM
function initializeDOM() {
  h1.innerText = timeToStart;
  p.innerText = startMessage;
  updateUlNumbers(generateRandomArray(1, 50, 5));
}
function startGame() {
  timer(timeToStart);
  setTimeout(middlePhase, timeToStart * 1000);
}
function middlePhase() {
  ulNumbers.classList.add('d-none');
  ulInputNumbers.classList.remove('d-none');
  btnInvia.innerText = 'Invia';
  btnInvia.classList.remove('d-none');
  h1.innerText = middleMessage;
  p.innerText = middleMessageSubtitle;
}
function timer(sec) {
  let s = sec;
  h1.innerText = sec;

  const myTimer = setInterval(() => {
    h1.innerText = --s;

    if (s == 0) {
      clearInterval(myTimer);
    }
  }, 1000);
}
function updateUlNumbers(arr) {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement('li');
    li.innerText = arr[i];
    ulNumbers.append(li);
  }
}
// Funzioni numeriche
function generateRandomArray(min, max, len) {
  const arr = [];
  while (arr.length < len) {
    const num = generateRandomNumber(min, max);
    if (!arr.includes(num)) {
      arr.push(num);
    }
  }
  return arr;
}
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}