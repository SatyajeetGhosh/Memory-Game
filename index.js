const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false; //This variable is declared to take care of corner cases
let firstCard, secondCard;

function flipCard(){
    if(lockBoard) return;

    //Corner Case 2: If we double click on the same card the match is gonna evaluate to true and its gonna disble the card by removing its event listener
    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard){
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    //second click
    secondCard = this;

    checkForMatch();
}

//In order to access that we defined in HTMl we use the dataset object 
//Syntax = element.dataset.name
//
function checkForMatch(){
    // Checking if both cards match
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework

    //We're using ternary operator here
    //syntax = condition:statemnts to be executed if condition is true:statements to be executed if condition is false
    isMatch ? disableCards() : unflipCards();
}

function disableCards(){
    // If its a match we disable flipping of cards
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards(){
    //We're locking the board and unlocking it after the 2 cards have unflipped
    //Corner Case 1: This is done to prevent the user to flip a 2nd set of cards before the 1st set has unflipped or otherwise it crashes our logic
    lockBoard = true; 

    //If not a match we flip the cards back
    //setTimeout() method calls a function after a number of milliseconds
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard(){
    //The following lines of code is the syntax for ES6 destructuring assignment
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//Shuffling the cards using a flexbox property called order
//Math.random() function is used to generate a random number from 0 to 1 excluding 1
//We want a number from 1 to 11 so we multiply the result of above by 12
//Math.floor() is used because we need an integer
//(function functionName(){...})(); = This syntax makes the shuffle function an immediately invoked function expression i.e this function will be executed write after its definition
(function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
})();

cards.forEach(cards => cards.addEventListener('click', flipCard))