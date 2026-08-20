import { createBoard } from './board.js';

document.addEventListener('DOMContentLoaded', () => {
    const restartBtn = document.getElementById('restart-btn');
    const cardSelect = document.getElementById('card-select');

    // Nappia painamalla luodaan valikon arvo ja lauta luodaan
    restartBtn.addEventListener('click', () => {
        const selectedCount = parseInt(cardSelect.value, 10);
        createBoard(selectedCount);
    });

    // peli luodaan automaattisesti oletusarvolla (16 korttia)
    createBoard(16);
});