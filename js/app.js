/*
 * Create a list that holds all of your cards
 */
let cards=['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb'];
//duplicacy removed

	cards = cards.concat(cards);
//making the deck
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
//initialing (making) Game
initGame();
let starRating=3;
let stars = document.getElementsByClassName("fa fa-star");
let allCards=document.querySelectorAll('.card');
let openCards=[];
let cardMatch=0;
let timerStarted = false;
let shouldTimerTick;
let t = document.getElementById("timer");

//when user click first card function is called
function playGame(){
	allCards.forEach(function(card)//looping all cards in deck
	{
		card.addEventListener('click',function(e)//click function
		{	
			if (!timerStarted)
			{
	      		timerStarted = true;
	      		timer();
	    	}
			// console.log(card);
			if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match'))
			{

				openCards.push(card);
				card.classList.add('open','show');
				if(openCards.length==2)//if more than 2 cards are open or not
				{
					if(openCards[0].dataset.card == openCards[1].dataset.card)//match condition
					{
						match(openCards);//match function is called
						openCards=[];
						cardMatch++;
						moves+=1;
						//console.log("Moves: "+moves+" matches: "+cardMatch);
						//condition for all matches 

						if(cardMatch==8)  //all matches are found condition
						{
							timerStarted=false;
							shouldTimerTick=false;
							displayModal(moves);		//modal function is called
							
							// console.log("You won with "+moves+" Moves");
						}
					}
					else 		//not match 
					{
						setTimeout(function()
						{
							notMatch(openCards,card);	//notMatch function is called
							openCards=[];
						},500);
						moves+=1;
						performance(moves);
					}
					//moves+=1;
					 // console.log("Moves: "+moves);
					moveCounter.innerText=moves;
				}
			}
			else{
				// openCards=[];
			}
		});
	});
};
playGame();


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

//modal function on win
function displayModal(moves){
	// console.log(moves);
	if(moves >= 20 ){
		starRating=1;
	}else if(moves >12 && moves < 20){
		starRating=2;
	}else{
		starRating=3;
	}
	const time = document.querySelector("#timer").innerText;
	// console.log("Rating: "+starRating);
	// console.log("stars"+stars);
	  $(".modal-body").html(
    `You completed the game in ${time} time . <br></br> You used ${moves} moves. <br></br> You get ${starRating} star.`
  );					//what content should be display is writen here
	 $("#myModal").modal("show");			//popup shows up

};

//for performance star rating
function performance(moves){
	  if (moves >= 12 && moves < 20) {
    stars[2].style.display = "none";
  } else if (moves >= 20) {
    stars[1].style.display = "none";
    stars[2].style.display="none";
  }
};

//timer activation function
function timer() {
  	let time;
	seconds = 0,
	minutes = 0;
  	shouldTimerTick = true;
  	time = setInterval(function () {
    if (shouldTimerTick)
    {
      (function add() 
      {
        seconds++;
        if (seconds >= 60) 
        {
          seconds = 0;
          minutes++;
        }

        t.textContent =				//timers content display
          (minutes ?
            minutes > 9 ? minutes + " Mins " : "0" + minutes + " Mins " :
            "00 Mins") +
          " : " +
          (seconds > 9 ? seconds + " Secs " : "0" + seconds + " Secs ");
      })();
    } else {
      clearInterval(time);				//stoping the timer
    }
  }, 1000);
}

//reset function for restarting game
function reset(){
	$(".deck").html("");
	moves=0;
	moveCounter.innerText=moves;
	//debugger;
	initGame();
	allCards=document.querySelectorAll('.card');
	seconds=0;
	minutes=0;
	shouldTimerTick=false;
	timerStarted=false;
	t.textContent = "00 Mins:00 Secs";
	rating=3;
	cardMatch=0;
	openCards=[];
	playGame();

	stars[0].style.display = "block";
	stars[1].style.display = "block";
  	stars[2].style.display = "block";
  	$("#myModal").css("display", "none");			//hiding the modal again 
};

//reseting and starting the game
$(document).ready(function() {
	$('.restart').click(function(){
	//	debugger;
	reset();
	});
});
