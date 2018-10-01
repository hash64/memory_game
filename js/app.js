/*
 * Create a list that holds all of your cards
 */
let cards=['fa-diamond','fa-diamond',
			'fa-paper-plane-o','fa-paper-plane-o',
			'fa-anchor','fa-anchor',
			'fa-bolt','fa-bolt',
			'fa-cube','fa-cube',
			'fa-leaf','fa-leaf',
			'fa-bicycle','fa-bicycle',
			'fa-bomb','fa-bomb'];

function makeCard(card){
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let moveCounter=document.querySelector('.moves');

function initGame()
{
	let deck=document.querySelector('.deck');
	//let moveCounter=document.querySelector('.moves');
	let cardHTML =shuffle(cards).map(function(card){
		return makeCard(card);
	});
	moves=0;
	moveCounter.innerText=moves;
	// console.log(moves);
	// console.log(cardHTML);
	// console.log(moves);
	deck.innerHTML=cardHTML.join('');
	
};

initGame();
let allCards=document.querySelectorAll('.card');
let openCards=[];
// let moves=0;



allCards.forEach(function(card)
{
	card.addEventListener('click',function(e)
	{// console.log(card);
		if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match'))
		{
			openCards.push(card);
			card.classList.add('open','show');
			if(openCards.length==2)
			{
				if(openCards[0].dataset.card == openCards[1].dataset.card)
				{
					match(openCards);
					openCards=[];
				}
				else
				{
					setTimeout(function()
					{
						notMatch(openCards,card);
						openCards=[];
					},500);
				}
				moves+=1;
				// console.log(moves);
				moveCounter.innerText=moves;
			}
		}
		else{

		}
	});
});

//for match
function match(openCards)
{
	openCards[0].classList.add('match');
	openCards[0].classList.add('open');
	openCards[0].classList.add('show');
	openCards[1].classList.add('match');
	openCards[1].classList.add('open');
	openCards[1].classList.add('show');
};

//for no match
function notMatch(openCards,card)
{
	openCards.forEach(function(card)
	{
		openCards[0].classList.remove('open','show');
		openCards[1].classList.remove('open','show');
		// console.log(card);
	});
};