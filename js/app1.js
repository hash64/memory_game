//making array of cards
let cards=['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb'];
cards=cards.concat(cards);			//concatinating to remove duplicacy


//function to create a html preview of cards
function makeCards(card){
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
};
//shuffle function for array
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
