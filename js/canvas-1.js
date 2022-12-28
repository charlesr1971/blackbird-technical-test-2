
const player1 = 'O';
const player2 = 'X';

let thePlayer = player1;

let tictactoeCanvas = [
  [' ',' ',' '],
  [' ',' ',' '],
  [' ',' ',' ']
];

let wdth;
let hght;

function setup() {
  createCanvas(600, 600);
  wdth = width / 3;
  hght = height / 3;
}

function draw() {
  background(0);
  strokeWeight(4);
  stroke(255, 204, 0);
  strokeWeight(4);
  line(wdth,0,wdth,height);
  line(wdth * 2,0,wdth * 2,height);
  line(0, hght, width, hght);
  line(0, hght * 2, width, hght * 2);
  for (var a = 0; a < 3; a++) {
	for (var b = 0; b < 3; b++) {
	  let x = wdth * b + wdth / 2;
	  let y = hght * a + hght / 2;
	  // console.log('draw() : x: ',x,' y: ',y);
	  let shape = tictactoeCanvas[b][a];
	  let radius = wdth / 4;
	  textSize(28);
	  if (shape === player1) {
		noFill();
		stroke(255, 255, 255);
		strokeWeight(4);
		ellipse(x, y, radius * 2);
	  }
	  else if (shape === player2) {
		stroke(255, 0, 0);
		strokeWeight(4);
		line(x - radius, y - radius, x + radius, y + radius);
		line(x + radius, y - radius, x - radius, y + radius);
	  }
	}
  }
  let outcome = resultCheck(); // lets check the results
  if (outcome != null) { // if the outcome is not null, lets create a response
	noLoop(); // call library
	let paragraph = createP(''); // call DOM library
	paragraph.style('font-size', '28px');
	if (outcome == 'match') {
	  paragraph.html('No one wins! Booooooo!');
	}
	else{
	  paragraph.html(`${outcome} is the winner! Hooooooray!`);
	}
  }
}

function resultCheck() {
  let victor = null;
  for (var a = 0; a < 3; a++) {
	if (matches(tictactoeCanvas[a][0], tictactoeCanvas[a][1], tictactoeCanvas[a][2])) {
	  victor = tictactoeCanvas[a][0];
	}
  }
  for (var a = 0; a < 3; a++) {
	if (matches(tictactoeCanvas[0][a], tictactoeCanvas[1][a], tictactoeCanvas[2][a])) {
	  victor = tictactoeCanvas[0][a];
	}
  }
  if (matches(tictactoeCanvas[0][0], tictactoeCanvas[1][1], tictactoeCanvas[2][2])) {
	victor = tictactoeCanvas[0][0];
  }
  if (matches(tictactoeCanvas[2][0], tictactoeCanvas[1][1], tictactoeCanvas[0][2])) {
	victor = tictactoeCanvas[2][0];
  }
  let emptySquares = 0;
  for (var a = 0; a < 3; a++) {
	for (var b = 0; b < 3; b++) {
	  if (tictactoeCanvas[a][b] === ' ') {
		emptySquares++;
	  }
	}
  }
  if (victor === null && emptySquares === 0) {
	return 'match';
  }
  else {
	return victor;
  }
}

function mousePressed() {
  let x = floor(mouseX / wdth); 
  let y = floor(mouseY / hght);
  if (thePlayer === player1) {
	if (tictactoeCanvas[x][y] === ' ') {
	  tictactoeCanvas[x][y] = player1;
	  thePlayer = player2;
	}
  }
  else if (thePlayer === player2) {
	if (tictactoeCanvas[x][y] === ' ') {
	  tictactoeCanvas[x][y] = player2;
	  thePlayer = player1;
	}
  }
}

function matches(x, y, z) {
  return x === y && y === z && x !== ' ';
}