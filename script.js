const btnInvia = document.querySelector('button.invia');
const btnRiprova = document.querySelector('button.riprova');
const h1 = document.querySelector('h1');
const p = document.querySelector('p');
const ulNumbers = document.querySelector('.numbers');
const ulInputNumbers = document.querySelector('.input-numbers');
const inputNumbers = Array.from(document.querySelectorAll('input'));

const timeToStart = 3; // Variabile che salva i secondi da cui far partire il gioco
const startMessage = 'Memorizza i numeri';
const middleMessage = 'Inserisci i numeri che ti ricordi';
const middleMessageSubtitle = 'L\'ordine non e\' importante.';
const lastPhaseMessage = {
  one: `Puoi fare di piu'!`,
  two: `Puoi fare di piu'!`,
  three: `Ci sei quasi!`,
  four: `Per un soffio!`,
  five: `Hai vinto!`,
}

let randomNumbers = [];

initializeDOM();
startGame();

// Events
btnInvia.addEventListener('click', () => {
  finalPhase();
});
btnRiprova.addEventListener('click', () => {
  initializeDOM();
  startGame();
  resetInputs();
  btnRiprova.classList.add('d-none');
})
// Funzioni DOM
function initializeDOM() {
  h1.innerText = timeToStart;
  p.innerText = startMessage;
  ulNumbers.innerHTML = '';
  ulInputNumbers.classList.add('d-none');
  ulNumbers.classList.remove('d-none');
}
function startGame() {
  randomNumbers = generateRandomArray(1, 50, 5)
  updateUlNumbers(randomNumbers);
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
function finalPhase() {
  const numbers = inputNumbers.map(input => input.valueAsNumber)
  const guessedNumbers = checkNumbersArrays(numbers, randomNumbers);
  const subtitle = `Hai indovinato ${guessedNumbers.length} numeri`

  switch (guessedNumbers.length) {
    case 0:
      h1.innerText = lastPhaseMessage.one;
      break;
    case 1:
      h1.innerText = lastPhaseMessage.one;
      break;
    case 2:
      h1.innerText = lastPhaseMessage.two;
      break;
    case 3:
      h1.innerText = lastPhaseMessage.three;
      break;
    case 4:
      h1.innerText = lastPhaseMessage.four;
      break;
    case 5:
      h1.innerText = lastPhaseMessage.five;
      break;
  }
  p.innerText = subtitle;

  colorGuessedNumbers(guessedNumbers, Array.from(document.querySelectorAll('.numbers li')));

  ulNumbers.classList.remove('d-none');
  ulInputNumbers.classList.add('d-none');

  btnInvia.classList.add('d-none');
  btnRiprova.innerText = 'Riprova';
  btnRiprova.classList.remove('d-none');
}
function colorGuessedNumbers(guessedNumbers, numbers) {
  numbers.forEach(number => {
    if (guessedNumbers.includes(parseInt(number.innerText))) {
      number.style.color = '#00FF73';
    } else {
      number.style.color = 'red';
    }
  });
}
function resetInputs() {
  inputNumbers.forEach(input => input.value = '');
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
// Funzioni logiche 
function checkNumbersArrays(arr1, arr2) {
  const guessedNumbers = [];

  for (let i = 0; i < arr1.length; i++) {
    const num = arr1[i];
    if (arr2.includes(num)) {
      guessedNumbers.push(num);
    }
  }
  return guessedNumbers;
}
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