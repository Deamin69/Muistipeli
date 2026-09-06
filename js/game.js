import { createBoard } from './board.js';

//ajastin
let timerInterval = null;
let seconds = 0;
let moves = 0;
let matchedPairs = 0;
let totalPairs = 0;

function startTimer() {
    clearInterval(timerInterval);
    seconds = 0;

    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = seconds;
    }
    // laskurin käynnistys
    timerInterval = setInterval(() => {
        seconds++;
        if (timerElement) {
            timerElement.textContent = seconds;
        }
    }, 1000);
}

export function stopTimer() {
    clearInterval(timerInterval);
}

// Siirtojen nollaus
export function resetMoves() {
    moves = 0;
    matchedPairs = 0;
    const movesElement = document.getElementById('moves');
    if (movesElement) movesElement.textContent = moves;
}

export function registerMove() {
    moves++;
    const movesElement = document.getElementById('moves');
    if (movesElement) movesElement.textContent = moves;
}

// Parin löytyminen ja voitto tarkistus
export function registerPairFound() {
    matchedPairs++;
    if (matchedPairs === totalPairs) {
        onGameWon();
    }
}

// Voitto ja konfetit
function onGameWon() {
    stopTimer();

    if (typeof confetti === 'function') {
        confetti({
            particleCount: 120, spread: 70, origin: { y: 0.6 }
        });
    }

    const finalTime = document.getElementById('final-time');
    const finalMoves = document.getElementById('final-moves');
    const winModal = document.getElementById('win-modal');

    if (finalTime) finalTime.textContent = seconds;
    if (finalMoves) finalMoves.textContent = moves;
    if (winModal) winModal.classList.remove('hidden');
}

function startNewGame(count) {
    totalPairs = count / 2;
    resetMoves();

    const winModal = document.getElementById('win-modal');
    if (winModal) winModal.classList.add('hidden');

    createBoard(count);
    startTimer();
}

document.addEventListener('DOMContentLoaded', () => {
    const restartBtn = document.getElementById('restart-btn');
    const cardSelect = document.getElementById('card-select');
    const restartModalBtn = document.getElementById('restart-modal-btn');

    // Nappia painamalla aloitetaan peli
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            const selectedCount = parseInt(cardSelect.value, 10);
            startNewGame(selectedCount);
        });
    }

    if (restartModalBtn) {
        restartModalBtn.addEventListener('click', () => {
            const selectedCount = parseInt(cardSelect.value, 10);
            startNewGame(selectedCount);
        });
    }

    const initialCount = parseInt(cardSelect.value, 10);
    startNewGame(initialCount);
});