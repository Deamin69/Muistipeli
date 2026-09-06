import { createCardElement, flipCard } from './card.js';
import { registerMove, registerPairFound } from './game.js';

const allCards = [
    '🍎', '🍐', '🍒', '🍉', '🍇', '🍓', '🍌', '🍍', '🥝', '🥥', '🍑', '🍈', '🍋', '🍊', '🍏', '🍅'
];
const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Ongelma 4
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
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

    registerMove();

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
// täsmäävä korttipari
function disableCards() {
    registerPairFound();

    const allCardsCount = gameBoard.children.length;
    const flippedCardsCount = document.querySelectorAll('.flipped').length;

    if (flippedCardsCount === allCardsCount && allCardsCount > 0) {
        stopTimer();
    }
}

function unflipCards() {
    const card1 = firstCard;
    const card2 = secondCard;

    setTimeout(() => {
        if (card1) {
            card1.classList.remove('flipped');
            card1.textContent = '';
        }

        if (card2) {
            card2.classList.remove('flipped');
            card2.textContent = '';
        }
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}