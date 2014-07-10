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

	// Box rlated variables
	var gameBoxes = $('.initial-numbers');
	var boxAmounts = $('.amounts-left');
	var chosenNumBox = $('.chosen-num-box');

	// Instructions
	var gameInstructions = $('.game-instructions');

	
	// Buttons
	var takeMoneyBtn = $('.take-money');
	var continueGameBtn = $('.continue-game');
	var playAgainBtn = $('.play-again');
	var openBoxesBtn = $('.open-boxes');
	var swapOpenBoxesBtn = $('.swap-open-boxes');

	// Amounts
	var initialChosenNum;
	var chosenBoxAmount;

	// Arrays
	var boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
	var money = [0.01, 0.10, 0.50, 1, 5, 10, 50, 100, 250, 500, 750, 1000, 3000, 5000, 10000, 15000, 20000, 35000, 50000, 75000, 100000, 250000];
	var moneyRandom = shuffleArray(money);
	var amountsLeft;
	
	// Moneys and offer amounts
	var potMoney = 0;
	var amountOffer = 0;

	// Number of boxes picked
	var boxesPicked = 0;

	// Call the initial functions
	function init() {

		addInitialNumbers();
		takeMoneyBtn.click(takeTheMoney);
		continueGameBtn.click(continueGame);
		playAgainBtn.click(restartGame);
		openBoxesBtn.click(openBox);

	}

	// Restarts the game
	function restartGame() {

		location.reload();

	}

	// Array shuffler
	function shuffleArray(o) {

		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;

	};

	function outPutRandomArray() {

		// Sort the array into numerical order
		moneyRandomSorted = moneyRandom.sort(function(a, b){return a-b});

		// Loop and output remaining values from array
		// If one of the lower boxes we want them to be blue
		for (i = 0; i < moneyRandomSorted.length; i++) {

			if (moneyRandomSorted[i] < 751) {

				boxAmounts.show().append("<li class='blue'>" + moneyRandomSorted[i] + "</li>");

			}

			else {

				boxAmounts.show().append("<li>" + moneyRandomSorted[i] + "</li>");

			} 

		} 

	}

	// Exit the game and take the money
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
		openBoxesBtn.hide();

	}

	// Continue player when offered an amount
	function continueGame() {

		gameInstructions.empty().append("<p>Good choice or not? Lets find out</p>");

		gameBoxes.show();
		takeMoneyBtn.hide();
		continueGameBtn.hide();

	}

	// Ask the user deal or no deal
	function askQuestion () {

		gameBoxes.hide();
		takeMoneyBtn.show();
		continueGameBtn.show();

	}

	// Ask the final question
	// Could add additional functionality here to swap the boxes
	function askFinalQuestion () {

		gameBoxes.hide();
		takeMoneyBtn.show();
		continueGameBtn.hide();
		openBoxesBtn.show();

	}

	// Go all the way and open your box
	function openBox () {

		// Hide all buttons, the game has ended
		gameBoxes.hide();
		takeMoneyBtn.hide();
		continueGameBtn.hide();
		swapOpenBoxesBtn.hide();
		openBoxesBtn.hide();


		gameInstructions.empty().append("<p>You've gone all the way and won £" + chosenBoxAmount + "</p>");

		// Get the last remaining amount in the prize pool
		var lastAmount = $('.game-active li').data("prize");

		// Conditional statement to user say if won or not
		if (chosenBoxAmount > lastAmount) {

			chosenNumBox.empty().append("<p>Your box contained " + chosenBoxAmount + ". You beat the banker</p>");

		}

		else {

			chosenNumBox.empty().append("<p>Your box contained " + chosenBoxAmount + ". The banker beat you!</p>");

		}

	}

	// Let's play the game
	function gameActive() {

		// Add class to the 
		gameBoxes.addClass('game-active');

		// We need to unbind the click as added this game state after
		$(document).unbind('click').on('click', '.game-active li', function(){

			// The data from the box they picked
			var moneyRemove = $(this).data("prize");
			var initialChosenNum = $(this).data("initialchosennum");

			// Update the box selections
			gameInstructions.empty().append("<p>Your chose box number " + initialChosenNum + " which contained £" + moneyRemove +"</p>");

			// Remove from array
			// Get the index of the money
			var remove = moneyRandom.indexOf(moneyRemove);

			// If it's higher than -1 then splice it
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
			boxAmounts.empty(); 

			// Output the new array
			outPutRandomArray();

			// The following add the deal or no deal questions on each stage
			if (boxesPicked == 5) {

				askQuestion();

				amountOffer = potMoney * 2 / 100;
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

				amountOffer = potMoney * 7 / 100;
				amountOffer = Math.round(amountOffer);

				gameInstructions.empty().append("<p>Your offer after 11 boxes is £" + amountOffer + ". Deal or no deal?</p>");

			}

			if (boxesPicked == 15) {

				askQuestion();

				amountOffer = potMoney * 10 / 100;
				amountOffer = Math.round(amountOffer);

				gameInstructions.empty().append("<p>Your offer after 14 boxes is £" + amountOffer + ". Deal or no deal?</p>");

			}

			if (boxesPicked == 18) {

				askQuestion();

				amountOffer = potMoney * 18 / 100;
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

		// Count up the total amoutn of money available at stick it in a variable
		for (var i=0; i<money.length; i++){

			potMoney += +money[i];

		}

		// Output the initial box numbers so user can pick one
		for (i = 0; i < boxes.length; i++) {

		    gameBoxes.append( "<li data-initialChosenNum=" + boxes[i] + " data-prize=" + moneyRandom[i] + ">Box number " + boxes[i] + "</li>" );

		}

		// When a user selects a box we can start the game
		$(document).unbind('click').on('click', '.initial-numbers li', function(){
		
			// Store the initial chosen box data
			initialChosenNum = $(this).data("initialchosennum");
			chosenBoxAmount = $(this).data("prize");

			// Remove it from the list of boxes
			$(this).remove();

			// Let them know what they have picked
			chosenNumBox.empty().show().append("<p>You picked box number " + initialChosenNum + "</p>");
			gameInstructions.empty().append("<p>You've got your box now lets play the game. Pick 5 boxes</p>");

			// Output the array!
			outPutRandomArray();

			// Start the game
			gameActive();

		});

	}

	init();

};

// ON DOC READY
$(function()
{	
	new DOND.Gameplay();
	
});

