const cards = [];
const cardValues = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8'];

// функция перемешивает массив
function shuffle(array) {
    let m = array.length, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];

        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function createCard(value) {
    const card = document.createElement('div');

    card.classList.add('card', 'close');
    card.innerHTML = value;

    return card;
}

function createCouplesGame() {
    const gameField = document.getElementById('game-field');
    const jumbledCardValues = shuffle(cardValues);


    let firstCard = null;
    let secondCard = null;
    let clickable = true;
    let disappearanceRateMs = 400;

    for (let i = 0; i < jumbledCardValues.length; i++) {
        const currentCard = createCard(jumbledCardValues[i]);
        gameField.append(currentCard);
    }

    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => card.addEventListener('click', () => {
        if (clickable == true && !card.classList.contains('success')) {
            card.classList.remove('close');

            if (firstCard == null) {
                firstCard = index;
            } else {
                if (index != firstCard) {
                    secondCard = index;
                    clickable = false;
                }
            }

            if (firstCard != secondCard) {
                if (cards[firstCard].textContent === cards[secondCard].textContent) {
                    setTimeout(() => {
                        cards[firstCard].classList.add('success');
                        cards[secondCard].classList.add('success');

                        firstCard = null;
                        secondCard = null;
                        clickable = true;
                    }, disappearanceRateMs);
                } else {
                    setTimeout(() => {
                        cards[firstCard].classList.add('close');
                        cards[secondCard].classList.add('close');

                        firstCard = null;
                        secondCard = null;
                        clickable = true;
                    }, 300);
                }
            }
        }
    }));
}

document.addEventListener('DOMContentLoaded', () => {
    createCouplesGame()

});
