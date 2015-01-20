var counter = 0; //for deciding whether x or o and color and player
var gameArr = []; // for tracking which boxes have been used
var btnReset = document.getElementById("reset");
var player1 = document.getElementById("p1");
var player2 = document.getElementById("p2");
var boxes = document.getElementsByClassName("game");
var arrP1 = [];
var arrP2 = [];
var comp = "0";
var playComp = false;

function selectBox(index){
		boxtoclick = boxes[index];
		boxtoclick.click();

	}

function readBoard(){
	var stateArr = [];

	for(var i = 0; i < 9; i++){
		stateArr.push(boxes[i].innerHTML);
	}

	return stateArr.join("");

}



var pColor = function(player, color){ //set color of player to play
	player.style.backgroundColor = color;
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
			//or: alert("player 2's turn to play");
			event.target.innerHTML = "X";
			// or event.target.setAttribute("class", "turnYellow text-center game");
			event.target.style.backgroundColor = "yellow";
			if(playComp && comp == "O"){
				selectBox(detBox(readBoard(),"O")[1]);
			}
			
		} else if(gameArr.length % 2 === 0){
			arrP2.push(gameArr[gameArr.length - 1]);
			pColor(player1,"yellow");
			//or: alert("player 1's turn to play");
			pColor(player2,"white");
			event.target.innerHTML = "O";
			// or event.target.setAttribute("class", "turnOrange text-center game");
			event.target.style.backgroundColor = "orange";
			if(playComp && comp == "X"){
				selectBox(detBox(readBoard(),"X")[1]);
			}
		}

//checks for a winner or a draw.
		if(gameArr.length > 4){
			if(winner(arrP1)){
				alert("Player 1 wins!");
				gameOver();
			} else if(winner(arrP2)){
				alert("Player 2 wins!");
				gameOver();
			}else if(gameArr.length == 9){
			btnReset.setAttribute("class", "text-center player btn btn-primary");
			alert("The game was a hard-fought tie! Click reset to play again");
			gameOver();
			}
		}
	}
};

btnReset.addEventListener("click", function(event){location.reload();}); //clicking reset reloads page

for (var i = 0; i < boxes.length; i++) {
	boxes[i].addEventListener("click", boxClick);
}
function gameOver(){
	pColor(player1,"white");
	pColor(player2,"white");
	playComp = false;
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].removeEventListener("click", boxClick);
	}
}



var begin = function(){
	playComp = confirm("Will you like to play against the computer?");
	if(playComp){
	var humanFirst = confirm("Do you want to go first?");
	if(humanFirst){
		comp = "O";
		alert ("After you...");
	} else {
		comp = "X";
		selectBox(detBox(readBoard(),"X")[1]);
	}
	}
};

begin();






function detBox(str, mytoken){
	var score;
	var xwin = str.search(/xxx......|...xxx...|......xxx|x..x..x..|.x..x..x.|..x..x..x|..x.x.x..|x...x...x/i);
	var owin = str.search(/ooo......|...ooo...|......ooo|o..o..o..|.o..o..o.|..o..o..o|..o.o.o..|o...o...o/i);
	var opponent;

	if(xwin >= 0)
	{
	if(mytoken === "X")
	{
		score = 1;
		return [score, undefined]; 
	} else if (mytoken === "O")
	{
		score = -1;
		return[score, undefined];
	}
	}
	if(owin >= 0)
	{
		if (mytoken ==="O")
		{
			score = 1;
			return [score, undefined];
		}else if(mytoken === "X")
		{
			score = -1;
			return [score, undefined];
		}
	}  else if (str.indexOf(" ") < 0)
	{
		score = 0;
		return [score,undefined];
	}
	if(mytoken === "X"){ opponent = "O";}
	else {opponent = "X";}
	var worst_opp = 1;
	var pmove;
	
		for(var i = 0; i< str.length; i++)
		{
			if(str.charAt(i) === " ")
			{
				var newstr = str.substring(0, i) + mytoken + str.substring(i+1,9);
				var newscore = detBox(newstr, opponent);
				if (newscore[0] < worst_opp)
				{
					worst_opp = newscore[0];
					pmove = i;
				}
			}
		}
	return [-worst_opp, pmove];
}



