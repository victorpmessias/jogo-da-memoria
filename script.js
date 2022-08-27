const cards = document.querySelectorAll('.memory-card');
const buttons = document.querySelectorAll('.button');
const buttonReset = document.getElementById("button-reset")


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let timeForFlip = 1500;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.character === secondCard.dataset.character;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, timeForFlip);

}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
}

shuffle();

cards.forEach(card => card.addEventListener('click', flipCard));




function reset() {
    lockBoard = true;
    cards.forEach(card => card.classList.remove('flip'));
    setTimeout(() => {
        resetBoard()
        shuffle();
        cards.forEach(card => card.addEventListener('click', flipCard));
        lockBoard = false;
    }, 970);
}

function changeDifficult() {
    if (this.dataset.active === "true") {
        return;
    } else {
        resetButtons();
        reset();
        this.dataset.active = "true"
        this.classList.add("activeButton");
        switch (this.dataset.value) {
            case "easy":
                timeForFlip = 1500;
                break;
            case "medium":
                timeForFlip = 800;
                break;
            case "hard":
                timeForFlip = 350;
                break;
        }
    }
};

function resetButtons() {
    buttons.forEach(button => { 
        button.dataset.active = "false"; 
        button.classList.remove("activeButton");
});
}

buttonReset.addEventListener('click', reset)



buttons.forEach(button => button.addEventListener('click', changeDifficult));
