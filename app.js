var counter = 0; //for deciding whether x or o and color and player
var gameArr = []; // for tracking which boxes have been used
var btnReset = document.getElementById("reset");
var player1 = document.getElementById("p1");
var player2 = document.getElementById("p2");
var boxes = document.getElementsByClassName("game");
var arrP1 = [];
var arrP2 = [];

var pColor = function(player, color){ //set color of player to play
	player.style.backgroundColor = color;
};
var draw = function(){ //announces the draw game
	alert("The game was a hard-fought tie! Click reset to play again");
};
var containedIn = function(subArr, arr){ //checks if winning array is in player array
	for (var i = 0; i < subArr.length; i++) {
		if(arr.indexOf(subArr[i]) < 0){
			return false;
		}
	}
	return true;
};
var winner = function(arr){
	var winCombo = [
	[boxes[0], boxes[3], boxes[6]],
	[boxes[1], boxes[4], boxes[7]],
	[boxes[2], boxes[5], boxes[8]],
	[boxes[0], boxes[1], boxes[2]],
	[boxes[3], boxes[4], boxes[5]],
	[boxes[6], boxes[7], boxes[8]],
	[boxes[0], boxes[4], boxes[8]],
	[boxes[2], boxes[4], boxes[6]],
	];

//checks the player 1 & 2 array against the winning combo if they have more than 3 entries and returns winner
	if(arr.length > 2){
		for (var i = 0; i < winCombo.length; i++) { 
			if(containedIn(winCombo[i], arr)){
				btnReset.setAttribute("class", "text-center player btn btn-primary");
				console.log(winCombo[i]);
				console.log(arrP1);
				return true;
			}
		}
	}
	return false;
};

var boxClick =function(event){
	if (gameArr.indexOf(event.target) < 0){ //checks to see if the box was already picked before
		gameArr.push(event.target);
		if(gameArr.length % 2 === 1){
			arrP1.push(gameArr[gameArr.length - 1]);
			pColor(player1,"white");
			pColor(player2,"orange");
			event.target.innerHTML = "X";
			event.target.style.backgroundColor = "yellow";
			
		} else if(gameArr.length % 2 === 0){
			arrP2.push(gameArr[gameArr.length - 1]);
			pColor(player1,"yellow");
			pColor(player2,"white");
			event.target.innerHTML = "O";
			event.target.style.backgroundColor = "orange";
		}

//checks for a winner or a draw.
		if(gameArr.length > 4){
			if(winner(arrP1)){
				alert("Player 1 wins!");
				gameOver();
			} else if(winner(arrP2)){
				alert("Player 2 wins!");
				gameOver();
			}

		}
		if(gameArr.length == 9){
			btnReset.setAttribute("class", "text-center player btn btn-primary");
			draw();
			gameOver();
		}
	}
};

btnReset.addEventListener("click", function(event){location.reload();}); //clicking reset reloads page

for (var i = 0; i < boxes.length; i++) {
	boxes[i].addEventListener("click", boxClick);
}
function gameOver(){
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener("click", boxClick);
	}
	pColor(player1,"white");
	pColor(player2,"white");
}


