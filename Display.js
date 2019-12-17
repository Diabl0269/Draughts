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
            tile.addEventListener('onclick', () => {
                if (tile.firstChild instanceof (Piece)) {
                    if (currentPiece == null)
                        currentPiece = tile.firstChild;
                    else throw 'tile is occupied';
                }
                else if (currentPiece != null) {
                    game.move(new Location(currentPiece.parentNode.id.splice(1), currentPiece.parentNode.id.splice(0, 2)),
                        new Location(this.id.splice(1), this.id.splice(0, 2)));
                }
            });
        }
    }
    printBoardState(game.board.state);
}

function printBoardState(state) {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (state[row][col] instanceof Piece) {
                let tile = document.getElementById(`${row} ${col}`);
                let piece = document.createElement('div');
                piece.className = 'piece';
                piece.style.backgroundColor = state[row][col].getColor();
                tile.appendChild(piece);
            }
        }
    }
}

function deletePiece(row, col) {
    let piece = document.getElementById(`${row} ${col}`).firstChild;
    piece.parentNode.removeChild(piece);
}


printBoard(new Game());
deletePiece(0, 1);