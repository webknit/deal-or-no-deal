/* - BASE HTML TEMPLATE
------------------------------------------------- 
	Description: JS Scripts
	Author:Shane Prendergast
	Author URL:http://www.webknit.co.uk
	Template URL:http://base.webknit.co.uk/
*/

// JS EXAMPLE

var DOND = DOND || {};

DOND.Gameplay = function() {	

	var initialNumbers = $('.initial-numbers');
	var gameInstructions = $('.game-instructions');
	var chosenNumBox = $('.chosen-num-box');
	var amountsLeftP = $('.amounts-left');
	var takeMoneyBtn = $('.take-money');
	var continueGameBtn = $('.continue-game');
	var playAgainBtn = $('.play-again');
	var openBoxesBtn = $('.open-boxes');
	var swapOpenBoxesBtn = $('.swap-open-boxes');

	var initialChosenNum;
	var chosenBoxAmount;

	var boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
	var money = [0.01, 0.10, 0.50, 1, 5, 10, 50, 100, 250, 500, 750, 1000, 3000, 5000, 10000, 15000, 20000, 35000, 50000, 75000, 100000, 250000];
	var moneyRandom = shuffleArray(money);
	var amountsLeft;
	
	var potMoney = 0;
	var amountOffer = 0;

	var boxesPicked = 0;

	function init() {

		addInitialNumbers();
		takeMoneyBtn.click(takeTheMoney);
		continueGameBtn.click(continueGame);
		playAgainBtn.click(restartGame);
		openBoxesBtn.click(openBox);

	}

	function restartGame() {

		location.reload();

	}

	function shuffleArray(o) {

		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;

	};

	function takeTheMoney() {

		gameInstructions.empty().append("<p>Congratulations you've won £" + amountOffer + "</p>");

		if (amountOffer > chosenBoxAmount) {

			chosenNumBox.empty().append("<p>Your box contained " + chosenBoxAmount + ". You beat the banker</p>");

		}

		else {

			chosenNumBox.empty().append("<p>Your box contained " + chosenBoxAmount + ". The banker beat you!</p>");

		}

		takeMoneyBtn.hide();
		continueGameBtn.hide();
		playAgainBtn.show();

	}

	function continueGame() {

		gameInstructions.empty().append("<p>Good choice or not? Lets find out</p>");

		initialNumbers.show();
		takeMoneyBtn.hide();
		continueGameBtn.hide();

	}

	function askQuestion () {

		initialNumbers.hide();
		takeMoneyBtn.show();
		continueGameBtn.show();

	}

	function askFinalQuestion () {

		initialNumbers.hide();
		takeMoneyBtn.show();
		continueGameBtn.hide();
		openBoxesBtn.show();

	}

	function openBox () {

		initialNumbers.hide();
		takeMoneyBtn.hide();
		continueGameBtn.hide();
		swapOpenBoxesBtn.hide();
		openBoxesBtn.hide();

		gameInstructions.empty().append("<p>You've gone all the way and won £" + chosenBoxAmount + "</p>");

		var lastAmount = $('.game-active li').data("prize");

		if (chosenBoxAmount > lastAmount) {

			chosenNumBox.empty().append("<p>Your box contained " + chosenBoxAmount + ". You beat the banker</p>");

		}

		else {

			chosenNumBox.empty().append("<p>Your box contained " + chosenBoxAmount + ". The banker beat you!</p>");

		}

	}

	function gameActive() {

		initialNumbers.addClass('game-active');

		$(document).unbind('click').on('click', '.game-active li', function(){

			var moneyRemove = $(this).data("prize");
			var initialChosenNum = $(this).data("initialchosennum");

			console.log("Value to be removed " + moneyRemove);

			gameInstructions.empty().append("<p>Your chose box number " + initialChosenNum + " which contained £" + moneyRemove +"</p>");

			// Remove from array
			// Get the index of the money
			var remove = moneyRandom.indexOf(moneyRemove);

			// If it's higher than -1 then spice it
			if (remove > -1) {

			    moneyRandom.splice(remove, 1);

			}

			// Remove from boxes list
			$(this).remove();

			// Calculate the pot
			potMoney = potMoney - moneyRemove;

			// Increase amount of boxes picked
			boxesPicked = boxesPicked + 1;

			// Output remaining money values
			// First clear previous ones
			amountsLeftP.empty();

			// Sort the array into numerical order
			moneyRandomSorted = moneyRandom.sort(function(a, b){return a-b}); 

			// Loop and output remaining values from array
			for (i = 0; i < moneyRandomSorted.length; i++) {

			    amountsLeftP.show().append("<li>" + moneyRandomSorted[i] + "</li>");

			} 

			// If you've picked 5 boxes
			if (boxesPicked == 5) {

				askQuestion();

				amountOffer = potMoney * 1 / 100;
				amountOffer = Math.round(amountOffer);

				gameInstructions.empty().append("<p>Your offer after 5 boxes is £" + amountOffer + ". Deal or no deal?</p>");

			}

			if (boxesPicked == 8) {

				askQuestion();

				amountOffer = potMoney * 3 / 100;
				amountOffer = Math.round(amountOffer);

				gameInstructions.empty().append("<p>Your offer after 8 boxes is £" + amountOffer + ". Deal or no deal?</p>");

			}

			if (boxesPicked == 11) {

				askQuestion();

				amountOffer = potMoney * 5 / 100;
				amountOffer = Math.round(amountOffer);

				gameInstructions.empty().append("<p>Your offer after 11 boxes is £" + amountOffer + ". Deal or no deal?</p>");

			}

			if (boxesPicked == 14) {

				askQuestion();

				amountOffer = potMoney * 8 / 100;
				amountOffer = Math.round(amountOffer);

				gameInstructions.empty().append("<p>Your offer after 14 boxes is £" + amountOffer + ". Deal or no deal?</p>");

			}

			if (boxesPicked == 17) {

				askQuestion();

				amountOffer = potMoney * 15 / 100;
				amountOffer = Math.round(amountOffer);

				gameInstructions.empty().append("<p>Your offer after 17 boxes is £" + amountOffer + ". Deal or no deal?</p>");

			}

			if (boxesPicked == 20) {

				askFinalQuestion();

				amountOffer = potMoney * 40 / 100;
				amountOffer = Math.round(amountOffer);

				gameInstructions.empty().append("<p>Your offer after 20 boxes is £" + amountOffer + ". Deal or no deal?</p>");

			}

		});

	}

	function addInitialNumbers() {

		for (var i=0; i<money.length; i++){

			potMoney += +money[i];

		}

		for (i = 0; i < boxes.length; i++) {

		    initialNumbers.append( "<li data-initialChosenNum=" + boxes[i] + " data-prize=" + moneyRandom[i] + ">Box number " + boxes[i] + "</li>" );

		}

		$(document).unbind('click').on('click', '.initial-numbers li', function(){
		
			initialChosenNum = $(this).data("initialchosennum");
			chosenBoxAmount = $(this).data("prize");

			$(this).remove();

			chosenNumBox.empty().append("<p>Your box is number " + initialChosenNum + "</p>").show();
			gameInstructions.empty().append("<p>You've got your box now lets play the game. Pick 5 boxes</p>");

			// Sort the array into numerical order
			moneyRandomSorted = moneyRandom.sort(function(a, b){return a-b}); 

			// Loop and output remaining values from array
			for (i = 0; i < moneyRandomSorted.length; i++) {

			    amountsLeftP.show().append("<li>" + moneyRandomSorted[i] + "</li>");

			} 

			gameActive()

		});

	}

	init();

};

// ON DOC READY
$(function()
{	
	new DOND.Gameplay();
	
});

