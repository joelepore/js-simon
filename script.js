const btn = document.querySelector('button');
const h1 = document.querySelector('h1');
const p = document.querySelector('p');
const ulNumbers = document.querySelector('.numbers');
const ulInputNumbers = document.querySelector('.input-numbers');

const timeToStart = 10; // Variabile che salva i secondi da cui far partire il gioco
const startMessage = 'Memorizza i numeri';

initializeDOM();
// Funzioni DOM
function initializeDOM() {
  h1.innerText = timeToStart;
  p.innerText = startMessage;
  updateUlNumbers(generateRandomArray(1, 50, 5));
}
function updateUlNumbers(arr) {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement('li');
    li.innerText = arr[i];
    ulNumbers.append(li);
  }
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