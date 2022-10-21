const containerCard = document.querySelector(".container-card");
const numberCardsSelected = [];
let cardInnerHtml = "";
let firstCard, secondCard;
let cardBlockFlip = false;
let qtdCardsClicked = 0;
let qtdCardClickedEqual = 0;
const cardListGif = [
  "bobrossparrot.gif",
  "unicornparrot.gif",
  "explodyparrot.gif",
  "revertitparrot.gif",
  "fiestaparrot.gif",
  "tripletsparrot.gif",
  "metalparrot.gif",
];

function numberOfCards() {
  let numberCard = prompt("Choose the number of cards between 4 and 14");
  const dividingCardNumbers = numberCard / 2;
  //Return the prompt if the number of cards is higher than 14, fewer than 4, or an odd number
  if (numberCard > 14 || numberCard < 4 || numberCard % 2 != 0) {
    return numberOfCards();
  }
  //Add 2 identical cards to the selected cards array
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
  shuffle(numberCardsSelected).forEach((gif) => {
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
  if (cardBlockFlip == true) return false;
  const backCard = selected.querySelector(".back-card");
  selected.classList.add("flip");
  backCard.classList.add("hidden");
  if (firstCard == undefined) {
    firstCard = selected;
    return false;
  }
  if (selected !== firstCard) {
    secondCard = selected;
    checkcards();
  }
}

function checkcards() {
  let check = firstCard.dataset.set === secondCard.dataset.set;
  if (check == false) {
    qtdCardsClicked++;

    removeFlip();
  } else {
    firstCard.classList.add("disabled")
    secondCard.classList.add("disabled")
    firstCard.onclick = ""
    secondCard.onclick = ""
    qtdCardsClicked++;
    //testar se ! tá retornando false
    // if (!firstCard.classList.contains("disabled") || !secondCard.classList.contains("disabled")) {
      qtdCardClickedEqual++;
      
      console.log(qtdCardClickedEqual)
    // }
    
   if (qtdCardClickedEqual == numberCardsSelected.length/2) {
    setTimeout(() => {
      alert(`Você ganhou em ${qtdCardsClicked} jogadas!`)
    }, 1000)
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
