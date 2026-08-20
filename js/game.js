import { createBoard } from './board.js';

//ajastin
let timerInterval = null;
let seconds = 0;

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

document.addEventListener('DOMContentLoaded', () => {
    const restartBtn = document.getElementById('restart-btn');
    const cardSelect = document.getElementById('card-select');

    // Nappia painamalla luodaan valikon arvo ja lauta luodaan
    restartBtn.addEventListener('click', () => {
        const selectedCount = parseInt(cardSelect.value, 10);
        createBoard(selectedCount);
        startTimer();
    });

    // Aloitetaan peli ja ajastin sivun latautuessa
    createBoard(16);
    startTimer();
});

export function stopTimer() {
    clearInterval(timerInterval);
}