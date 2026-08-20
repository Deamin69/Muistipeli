import { createBoard } from './board.js';

let currentCardCount = 10;

document.addEventListener('DOMContentLoaded', () => {
    const cardCount = parseInt(prompt("Syötä korttien määrä (parillinen luku):"), 10);
    if (cardCount % 2 !== 0 || isNaN(cardCount)) {
        alert("Korttien määrän täytyy olla parillinen luku.");
        return;
    }

    currentCardCount = cardCount;
    createBoard(cardCount);

    //Tsekataan aloita alusta nappi
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            createBoard(currentCardCount);
        });
    }
});