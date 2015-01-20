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
			//or: alert("player 2's turn to play");
			event.target.innerHTML = "X";
			// or event.target.setAttribute("class", "turnYellow text-center game");
			event.target.style.backgroundColor = "yellow";
			if(playComp && comp === "O"){
				compMove();
			}
			
		} else if(gameArr.length % 2 === 0){
			arrP2.push(gameArr[gameArr.length - 1]);
			pColor(player1,"yellow");
			//or: alert("player 1's turn to play");
			pColor(player2,"white");
			event.target.innerHTML = "O";
			// or event.target.setAttribute("class", "turnOrange text-center game");
			event.target.style.backgroundColor = "orange";
			if(playComp && comp === "X"){
				compMove();
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



var selectBox = function(element){
	element.click();
};
var compMove = function(){
	var middle = boxes[4];
	var corners = [boxes[0], boxes[2], boxes[6], boxes[8]];
	var sides = [boxes[1], boxes[3], boxes[5], boxes[7]];
	var stateArr = [];
	for(var i = 0; i < 9; i++){
		stateArr.push(boxes[i].innerHTML);
	}
	var rpick = function (array, n){ //function to randomly pick from array using last index as n
		var choices = array;
		var thebox = Math.round(Math.random()*n);
		return choices[thebox];
	};
	var checkWinBlk =function(xo,goal){
		var tok;
		if (goal == "win"){
			tok = xo;
		} else if(xo == "X"){
			tok = "O";
		} else {
			tok = "X";
		}
		 var result =[];
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
		for( var i = 0; i < 8; i++){
			if(winCombo[i].join("") === (tok +tok+" ")){
				result.push(winCombo[i][2]);
			} else if(winCombo[i].join("") === (tok +" "+tok)){
				result.push(winCombo[i][1]);
			} else if(winCombo[i].join("") === (" "+tok +tok)){
				result.push(winCombo[i][0]);
			} 
		}
		return result;

	};
	
	var cornersIH =[stateArr[0],stateArr[2],stateArr[6],stateArr[8]];
	var sidesIH = [stateArr[1],stateArr[3],stateArr[5],stateArr[7]];
	var middleIH = stateArr[4];

	//computer playing first
	if(gameArr.length === 0){
		if(Math.random() > 0.7){
			selectBox(rpick(sides,3));
		} else {
			var thebox = Math.round(Math.random()*3);
			selectBox(rpick(corners,3));
		}
	}
	if(gameArr.length === 1){
		if(cornersIH.indexOf("X") < 0){
			if(middleIH == " ") {
			selectBox(middle);
			} else{
			 selectBox(rpick(corners,3));
			} 
		}else {
			selectBox(middle);
	}
	if(gameArr.length === 2){
		if(middleIH == "O" || sidesIH.indexOf("O") >= 0){
			if(cornersIH.indexOf("X") >= 0){
				var ind = cornersIH.indexOf("X");
				ind === 0? selectBox(corners[3]): ind === 1? selectBox(corners[2]): ind === 2? selectBox(corners[1]): selectBox(corners[0]);
			} else {
				if(sidesIH.indexOf("X") === 0){
					selectBox(boxes[6]);
					//rpick([corners[6], corners[8]],1)
				} else if(sidesIH.indexOf("X") == 1){
					selectBox(boxes[2]);
					//rpick([corners[1], corners[3]],1)
				} else if(sidesIH.indexOf("X") == 2){
					selectBox(boxes[0]);
					//rpick([corners[0], corners[2]],1)
				} else {
					selectBox(boxes[0]);
				} 
			}
		} else{
			var inde = cornersIH.indexOf(" ");
			selectBox(corners[inde]);
		}
	}
	if(gameArr.length === 3){
		var win = checkWinBlk("O",win);
		var blk = checkWinBlk("X",blk);
		
		if(win.length > 0){
			selectBox(win[0]);
		} else if(blk > 0){
			selectBox(blk[0]);
		} else {
			alert("Bulls!");
		}
	}
}
};

var begin = function(){
	playComp = confirm("Will you like to play against the computer?");
	if(playComp){
	var humanFirst = confirm("Do you want to go first?");
	if(humanFirst){
		comp = "O";
		alert ("After you...");
	} else {
		comp = "X";
		compMove();
	}
	}
};

begin();


/*
comPlay(player1);


function detBox(str, p, c){
	var n = str.search(/xxx......|...xxx...|......xxx|x..x..x..|.x..x..x.|..x..x..x|..x.x.x..|x...x...x/i);
	var score = 100;
	var index = 0;
	if(n===0){
		score = -100;
	} else if (str.indexOf(" ") < 0){
		score = 0;
	} else {
		n = str.search(/ooo......|...ooo...|......ooo|o..o..o..|.o..o..o.|..o..o..o|..o.o.o..|o...o...o/i);
		n === 0? score = 100:undefined;
	}
	for(var i = 0; i < 9; i++){
	 if(str.charAt(i) == " "){
		str = str.split("");
		str[i] = c;
		detBox(str.join(""), o, x);
		index = i;
		if(score < 0){
			alert(i);
			return i;
		}
	 }
	}
	str = str.replace(" ",c);
	detBox(str, c, p);
}
function comPlay(player){
	var p;
	var c;
	if(player == "player1"){
		p = "X";
		c = "O";
	} else {
		p = "O";
		c = "X";
	}
	var stateArr = [];
	for(var i = 0; i < 9; i++){
		stateArr.push(boxes[i].innerHTML);
	}
	var state = stateArr.join("");
	
	boxClick(boxes(detBox(state,p,c)));
}

function detBox(str, p, c){
	var n = str.search(/xxx......|...xxx...|......xxx|x..x..x..|.x..x..x.|..x..x..x|..x.x.x..|x...x...x/i);
	var score = 100;
	var index = 0;
	if(n===0){
		score = 100;
		return [score,-1];
	} else if (str.indexOf(" ") < 0){
		score = 0;
		return [score, -1]
	} else {
		n = str.search(/ooo......|...ooo...|......ooo|o..o..o..|.o..o..o.|..o..o..o|..o.o.o..|o...o...o/i);
		if(n === 0){ score = -100; return [score, -1];} //change to if stmt
		//return score;

	}
	console.log(str);
	for(var i = 0; i < 9; i++){
	 if(str.charAt(i) == " "){
		str = str.split("");
		str[i] = "o";
		str =str.join("");
		var y = detBox(str, "o", "x");
		index = i;
		if(y[0] < score){
			return [score,i];
		}
	 }
	}
	str = str.replace(" ",c);
	detBox(str, c, p);
}

detBox("ooxox  xo");
*/

