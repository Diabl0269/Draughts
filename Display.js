var display = document.getElementById('board');
var currentPiece;

function printBoard(game) {
    for (let row = 0; row < 8; row++) {
        let r = display.insertRow();
        for (let col = 0; col < 8; col++) {
            let tile = r.insertCell();
            tile.id = `${row} ${col}`;
            tile.className = 'tileDisplay';
            tile.style.backgroundColor = ((row + col) % 2 == 0) ? 'white' : 'black';
            tile.addEventListener('click', () => {
                if (currentPiece == null) {
                    currentPiece = tile.firstChild;
                    if (!tile.firstChild)
                        currentPiece = null;
                }
                else {           
                    game.move(new Location(Number(currentPiece.parentNode.id.split(' ')[0]), Number(currentPiece.parentNode.id.split(' ')[1])),
                        new Location(Number(tile.id.split(' ')[0]), Number(tile.id.split(' ')[1])));
                    printBoardState(game.board.state);
                    currentPiece = null;
                }

            });
        }
    }
    printBoardState(game.board.state);
}

function printBoardState(state) {
    //delete all current pieces
    let tiles = Array.from(document.getElementsByTagName('td'));
    for (let tile of tiles) {
        if (tile.firstChild) {
            tile.innerHTML = '';
        }
    }

    //print new board state
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (state[row][col] instanceof Piece) {
                let tile = document.getElementById(`${row} ${col}`);
                let piece = document.createElement('div');
                piece.className = 'piece';
                piece.style.backgroundColor = state[row][col].getColor();
                if(state[row][col] instanceof King){
                    piece.innerHTML = 'K';
                    piece.classList.add('king');
                }
                tile.appendChild(piece);
            }
        }
    }
}

function deletePiece(row, col) {
    let piece = document.getElementById(`${row} ${col}`).firstChild;
    piece.parentNode.removeChild(piece);
}

let g = new Game();
g.board.state[0][1] = new King(g.board, new Location(0,1), false);
printBoard(g);