import { playSound } from './sound.js';

export function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.card = card;
    return cardElement;
}

export function flipCard(cardElement, callback) {
    if (cardElement.classList.contains('flipped')) return;
    cardElement.classList.add('flipped');
    cardElement.textContent = cardElement.dataset.card;

    playSound('flip');
    callback(cardElement);

}