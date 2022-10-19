const containerCard = document.querySelector(".container-card");
const numberCardsSelected = [];
let cardInnerHtml = "";
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
  const numberCard = prompt("Choose the number of cards between 4 and 14");
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
  <div class="card" onclick="flipCard(this)">
    <div class="front-card"><img src="./assets/Images/${gif}" alt="gif"></div>
    <div class="back-card"><img src="./assets/Images/back.png" alt="gif"></div>
  </div>
   `;
  });
  containerCard.innerHTML = cardInnerHtml;
}

function flipCard(selected) {
  selected.classList.add("flip")
  console.log(selected);
}
numberOfCards();
