/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
	for (let y = 0; y < HEIGHT; y++) {
		board.push(Array.from({ length: WIDTH }));
	}
	// TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
	// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.querySelector("#board");
	// TODO: add comment for this code
	/* This is creating the top row of the board. */
	var top = document.createElement("tr");
	top.setAttribute("id", "column-top");
	top.addEventListener("click", handleClick);

	for (var x = 0; x < WIDTH; x++) {
		var headCell = document.createElement("td");
		headCell.setAttribute("id", x);
		top.append(headCell);
	}
	htmlBoard.append(top);

	// TODO: add comment for this code
	/* This is creating the board. */
	for (var y = 0; y < HEIGHT; y++) {
		const row = document.createElement("tr");
		for (var x = 0; x < WIDTH; x++) {
			const cell = document.createElement("td");
			cell.setAttribute("id", `${y}-${x}`);
			row.append(cell);
		}
		htmlBoard.append(row);
	}
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

/* This is finding the spot for the column. */
function findSpotForCol(x) {
	for (let y = HEIGHT - 1; y > -1; y--) {
		if (!board[y][x]) {
			return y;
		}
	}
	return null;
	// TODO: write the real version of this, rather than always returning 0
}

/** placeInTable: update DOM to place piece into HTML table of board */

/* This is creating the pieces that will be placed on the board. */
function placeInTable(y, x) {
	const playerPiece = document.createElement("div");
	playerPiece.classList.add("piece");
	if (currPlayer === 1) {
		playerPiece.classList.add("p1");
	} else {
		playerPiece.classList.add("p2");
	}
	const position = document.getElementById(`${y}-${x}`);
	position.append(playerPiece);
	// TODO: make a div and insert into correct table cell
}

/** endGame: announce game end */

/* This is saying that if the game is over, then the game will reload. */
function endGame(message) {
	alert(message);
	// TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
	// get x from ID of clicked cell
	/* This is saying that if currPlayer is equal to 1, then the player's turn is equal to 2. If
  currPlayer is not equal to 1, then the player's turn is equal to 1. */
	const x = +evt.target.id;
	if (currPlayer === 1) {
		player.textContent = `Player ${2}'s turn!`;
		player.style.color = `rgb(0, 0, 255)`;
	} else {
		player.textContent = `Player ${1}'s turn!`;
		player.style.color = `rgb(255, 0, 0)`;
	}

	// get next spot in column (if none, ignore click)
	const y = findSpotForCol(x);
	// if (y === null) {
	// 	return;
	// }

	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	/* This is placing the pieces on the board. */
	board[y][x] = currPlayer;
	placeInTable(y, x);

	// check for win
	/* This is checking to see if there is a win. */
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} wins!`);
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so call, call endGame
	/* This is checking to see if the board is full. */
	if (board.every((cell) => cell.every((row) => row))) {
		return endGame("The game is tied");
	}

	// switch players
	// TODO: switch currPlayer 1 <-> 2
	/* This is a ternary operator. It is saying that if currPlayer is equal to 1, then currPlayer is equal
  to 2. If currPlayer is not equal to 1, then currPlayer is equal to 1. */
	currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
	function _win(cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(
			([y, x]) =>
				y >= 0 &&
				y < HEIGHT &&
				x >= 0 &&
				x < WIDTH &&
				board[y][x] === currPlayer,
		);
	}

	// TODO: read and understand this code. Add comments to help you.

	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			const horiz = [
				[y, x],
				[y, x + 1],
				[y, x + 2],
				[y, x + 3],
			];
			const vert = [
				[y, x],
				[y + 1, x],
				[y + 2, x],
				[y + 3, x],
			];
			const diagDR = [
				[y, x],
				[y + 1, x + 1],
				[y + 2, x + 2],
				[y + 3, x + 3],
			];
			const diagDL = [
				[y, x],
				[y + 1, x - 1],
				[y + 2, x - 2],
				[y + 3, x - 3],
			];

			/* This is checking to see if there is a win. */
			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();
