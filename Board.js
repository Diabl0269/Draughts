const Location = require('./Location');
const Piece = require('./Piece.js');

class Board {
    constructor(state, whitesAlive, blacksAlive) {
        if (!state) {
            this.whitesAlive = [];
            this.blacksAlive = [];
            this.state = initialState;
            initializeState(this);
        }
        else if (state.length == 8 && state.every(col => { return col.length === Board.prototype.SIZE })) {
            this.boardState = state;
            this.whitesAlive = whitesAlive;
            this.blacksAlive = blacksAlive;
        }
        else throw "state array length (and its inside objects) needs to equal board's size";
    }
    get boardState() { return this.boardState; } //board state is a 2d array of length 8*8
    set boardState(newState) {
        if (newState.length == 8 && newState.every(col => {
            return col.length === Board.prototype.SIZE
        }))
            this.state = newState
    }
    isOccupied(location) {
        return this.tileStatus(location) != 'e';
    }
    tileStatus(location) {
        return this.state[location.row][location.col];
    }
    successfulMovment(moveFrom, moveTo) {
        this.tileStatus(moveTo) = this.tileStatus(moveFrom);
        this.tileStatus(moveFrom) = 'e';
    }
    pieceCaptured(location) {
        let pieceToRemove = this.tileStatus(location); 
        let aliveList = pieceToRemove.color ? this.whitesAlive:this.blacksAlive;
        let index = aliveList.indexOf(pieceToRemove);
        aliveList.splice(index,1);
        this.tileStatus(location) = 'e';
    }
}

Object.defineProperty(Board.prototype, 'SIZE', {
    value: 8,
    writable: false,
    configurable: false,
    enumerable: true
});

const initialState = new Array();
//top left is white empty tile, blacks on top
function initializeState(board) {
    for (let row = 0; row < Board.prototype.SIZE; row++) {
        initialState.push(new Array());
        var tile;
        for (let col = 0; col < Board.prototype.SIZE; col++) {
            var tileIndex = row + col;
            if (row < 3 && (tileIndex % 2 != 0)) {
                tile = new Piece.constructor(board, new Location(row, col), false);
                board.blacksAlive.push(tile);
            }
            else if (row > 4 && (tileIndex % 2 != 0)) {
                tile = new Piece.constructor(board, new Location(row, col), true);
                board.whitesAlive.push(tile);
            }
            else
                tile = 'e';
            initialState[row].push(tile);
        }
    }
}

//module.exports = Board;

//test
var b = new Board();
//var p = new (Piece.exports.Piece)();//.constructor(b, new Location(0,0), true);
//console.log(p);
