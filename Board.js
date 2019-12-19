class Board {
    constructor(game, state) {
        if (!state) {
            this.game = game;
            this.state = initialState;
            initializeState(this);
        }
        else if (state.length == 8 && state.every(col => { return col.length === Board.prototype.SIZE })) {
            this.state = state;
            this.game.whitesAlive = whitesAlive;
            this.game.blacksAlive = blacksAlive;
        }
        else throw "state array length (and its inside objects) needs to equal board's size";
    }
    get boardState() { return this.boardState; }
    set boardState(newState) {
        if (newState.length == 8 && newState.every(col => {
            return col.length === Board.prototype.SIZE
        }))
            this.state = newState;
        else throw 'board length is incorrect';
    }

    isOccupied(location) {
        return this.tileStatus(location) != 'e';
    }

    tileStatus(location) {
        if (location.row >= 0 && location.row < this.SIZE && location.col >= 0 && location.col < this.SIZE)
            return this.state[location.row][location.col];
        else return false;
    }

    successfulMovment(moveFrom, moveTo) {
        this.tileStatus(moveTo) = this.tileStatus(moveFrom);
        this.tileStatus(moveFrom) = 'e';
    }

    pieceCaptured(location) {
        let pieceToRemove = this.tileStatus(location);
        let aliveList = pieceToRemove.color ? this.game.whitesAlive : this.game.blacksAlive;
        let index = aliveList.indexOf(pieceToRemove);
        aliveList.splice(index, 1);
        this.state[location.row][location.col] = 'e';
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
                tile = new Piece(board, new Location(row, col), false);
                board.game.blacksAlive.push(tile);
            }
            else if (row > 4 && (tileIndex % 2 != 0)) {
                tile = new Piece(board, new Location(row, col), true);
                board.game.whitesAlive.push(tile);
            }
            else
                tile = 'e';
            initialState[row].push(tile);
        }
    }
}

