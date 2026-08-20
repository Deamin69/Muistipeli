import { createCardElement, flipCard } from './card.js';

const allCards = [
    '🍎', '🍐', '🍒', '🍉', '🍇', '🍓', '🍌', '🍍', '🥝', '🥥', '🍑', '🍈', '🍋', '🍊', '🍏', '🍅'
];
const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Ongelma 4
function shuffle(array) {
    for (let i = array.lenght - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export function createBoard(cardCount) {
    // Tyhjätään vanhat kortit ja lisätään muuttujat
    gameBoard.innerHTML = '';
    resetBoard();

    const selectedCards = allCards.slice(0, cardCount / 2);
    const cards = [...selectedCards, ...selectedCards];
    shuffle(cards);

    cards.forEach(card => {
        const cardElement = createCardElement(card);

        cardElement.addEventListener('click', () => {
            // Ongelma 1&2
            if (lockBoard) return;
            if (cardElement === firstCard) return;
            if (cardElement.classList.contains('flipped')) return;

            flipCard(cardElement, handleCardFlip);
        });
        gameBoard.appendChild(cardElement);
    });
}

function handleCardFlip(cardElement) {
    if (!firstCard) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;
    lockBoard = true; // Laudan lukitus kun kaksi korttia on avattu
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
    }
    else {
        unflipCards();
    }
}

function disableCards() {
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}