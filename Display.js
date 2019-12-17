var display = document.getElementById('board');

function printBoardState(state) {
    for (let row = 0; row < 8; row++) {
        let r = display.insertRow();
        for (let col = 0; col < 8; col++) {
            let tile = r.insertCell();
            tile.id = `${row} ${col}`;
            tile.className = 'tileDisplay';
            tile.style.backgroundColor = ((row + col) % 2 == 0) ? 'white' : 'black';
            if (state[row][col] instanceof Piece) {
                let piece = document.createElement('div');
                piece.className ='piece';
                piece.style.backgroundColor = state[row][col].getColor();                              
                tile.appendChild(piece);
            }
        }
    }
}
var arr = Array.from(display.childNodes);
console.log(arr);


printBoardState(new Board().state);