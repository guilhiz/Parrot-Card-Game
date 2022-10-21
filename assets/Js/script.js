const containerCard = document.querySelector(".container-card");
const numberCardsSelected = [];
let cardInnerHtml = "";
let firstCard, secondCard;
let cardBlockFlip = false;
let numberOfRounds = 0;
let flippedCardsAlike = 0;
const cardListGif = [
  "devilparrot.gif",
  "unicornparrot.gif",
  "negativeparrot.gif",
  "brazilparrot.gif",
  "drinkingparrot.gif",
  "detectiveparrot.gif",
  "fiestaparrot.gif",
  "tripletsparrot.gif",
  "metalparrot.gif",
];

function numberOfCards() {
  const numberCard = prompt("Choose the number of cards between 4 and 18");
  const dividingCardNumbers = numberCard / 2;
  //Return the prompt if the number of cards is higher than 18, fewer than 4, or an odd number.
  if (numberCard > 18 || numberCard < 4 || numberCard % 2 != 0) {
    return numberOfCards();
  }
  //Add 2 identical cards to the selected cards array.
  else {
    for (let i = 0; i < dividingCardNumbers; i++) {
      numberCardsSelected.push(cardListGif[i]);
      numberCardsSelected.push(cardListGif[i]);
    }
    gameInit();
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function gameInit() {
  //scramble the gifs.
  shuffle(numberCardsSelected).forEach((gif) => {
    //I save the gif's name in the data-set so that I can subsequently compare them.
    cardInnerHtml += `
  <div class="card" data-set="${gif}" onclick="flipCard(this)">
    <div class="front-card hidden"><img src="./assets/Images/${gif}" alt="gif"></div>
    <div class="back-card"><img src="./assets/Images/back.png" alt="gif"></div>
  </div>
   `;
  });
  containerCard.innerHTML = cardInnerHtml;
}

function flipCard(selected) {
  //If cardBlockFlip is true, it returns false so that you don't click too quickly.
  if (cardBlockFlip == true) return false;
  const backCard = selected.querySelector(".back-card");
  selected.classList.add("flip");
  backCard.classList.add("hidden");
  //returns after saving the first click in the firstCard.
  if (firstCard == undefined) {
    firstCard = selected;
    return false;
  }
  //Save the secondCard and compare it to the first.
  if (selected !== firstCard) {
    secondCard = selected;
    checkCards();
  }
}

function checkCards() {
  let check = firstCard.dataset.set == secondCard.dataset.set;
  if (check == false) {
    //raises the number of rounds by one and resets the cards to their original place.
    numberOfRounds++;
    removeFlip();
  } else {
    //Remove the onclick method and add the disabled class.
    firstCard.classList.add("disabled");
    secondCard.classList.add("disabled");
    firstCard.onclick = "";
    secondCard.onclick = "";
    numberOfRounds++;
    //raises the number of similar cards flipped by one and then checks to see if the game is over.
    flippedCardsAlike++;
    if (flippedCardsAlike == numberCardsSelected.length / 2) {
      setTimeout(() => {
        alert(`Você ganhou em ${numberOfRounds} jogadas!`);
      }, 1000);
    }
    reset();
  }
}

function removeFlip() {
  cardBlockFlip = true;
  const firstBackCard = firstCard.querySelector(".back-card");
  const secondBackCard = secondCard.querySelector(".back-card");
  setTimeout(() => {
    firstCard.classList.remove("flip");
    firstBackCard.classList.remove("hidden");
    secondCard.classList.remove("flip");
    secondBackCard.classList.remove("hidden");

    reset();
  }, 1000);
}

function reset() {
  cardBlockFlip = false;
  firstCard = null;
  secondCard = null;
}
numberOfCards();
