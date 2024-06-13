"use strict";

/* FUNCTIONS */

// GENERAL FUNCTIONS
const displayDice = function (number) {
    const pattern = /dice-\d.png/;
    dice.src = dice.src.replace(pattern, `dice-${number}.png`);
};

const displayWinner = function () {
    const winner = document.querySelector(`.player--${activePlayer}`);
    const playerScore = document.querySelector(`#score--${activePlayer}`);
    winner.classList.add("player--winner");
    playerScore.textContent = "WIN 🏆";
    dice.classList.add("hidden");
    btnRoll.classList.add("hidden");
    btnHold.classList.add("hidden");
};

const generateDiceRoll = function () {
    return Math.trunc(Math.random() * 6) + 1;
};

const switchPlayer = function () {
    const nowActive = activePlayer === 0 ? 1 : 0;
    const active = document.querySelector(`.player--${activePlayer}`);
    const otherPlayer = document.querySelector(`.player--${nowActive}`);

    active.classList.remove("player--active");
    otherPlayer.classList.add("player--active");

    return nowActive;
};

// ACTIVE PLAYER FUNCTIONS
const clearCurrScore = function () {
    currScore = 0;
    displayCurrScore(activePlayer);
};

const displayCurrScore = function () {
    const currScoreText = document.querySelector(`#current--${activePlayer}`);
    currScoreText.textContent = currScore;
};

const displayTotalScore = function () {
    const totalScoreText = document.querySelector(`#score--${activePlayer}`);
    totalScoreText.textContent = totalScore[activePlayer];
};

/* DOM ELEMENTS & GLOBAL VARIABLES */

const dice = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");

let totalScore = [0, 0];
let currScore = 0;
let activePlayer = 0;

/* EVENTS */

btnRoll.addEventListener("click", () => {
    if (dice.classList.contains("hidden")) dice.classList.remove("hidden");

    const diceRoll = generateDiceRoll();
    displayDice(diceRoll);

    if (diceRoll !== 1) {
        currScore += diceRoll;
        displayCurrScore();
    } else {
        clearCurrScore();
        activePlayer = switchPlayer();
    }
});

btnHold.addEventListener("click", () => {
    totalScore[activePlayer] += currScore;
    clearCurrScore();
    displayCurrScore();
    displayTotalScore();

    if (totalScore[activePlayer] >= 100) displayWinner();
    else {
        activePlayer = switchPlayer();
    }
});

btnNewGame.addEventListener("click", () => {
    totalScore = [0, 0];
    currScore = 0;
    activePlayer = 0;

    dice.classList.add("hidden");
    btnRoll.classList.remove("hidden");
    btnHold.classList.remove("hidden");

    for (let i = 0; i < totalScore.length; i++) {
        const player = document.querySelector(`.player--${i}`);
        player.classList.remove("player--active");
        player.classList.remove("player--winner");
        document.querySelector(`#score--${i}`).textContent = 0;
        document.querySelector(`#current--${i}`).textContent = 0;
    }

    document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
});
