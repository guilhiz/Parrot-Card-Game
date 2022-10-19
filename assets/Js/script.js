const containerCard = document.querySelector(".container-card");
let numberCardsSelected = []
const cardListGif = [
  "bobrossparrot.gif",
  "explodyparrot.gif",
  "fiestaparrot.gif",
  "metalparrot.gif",
  "revertitparrot.gif",
  "tripletsparrot.gif",
  "unicornparrot.gif",
];

function numberOfCards() {
  const numberCard = prompt("Choose the number of cards between 4 and 14")
  const dividingCardNumbers = numberCard / 2
  
  if (numberCard > 14 || numberCard < 4 || numberCard%2 != 0) {
    return numberOfCards()
  } else {
    for (let i = 0; i < dividingCardNumbers; i++) {
    numberCardsSelected.push(cardListGif[i])
    numberCardsSelected.push(cardListGif[i])
    }
  }
}


// cardListGif.sort(comparador)
function comparador() { 
	return Math.random() - 0.5; 
}
numberOfCards()

