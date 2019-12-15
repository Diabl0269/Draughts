class Board {
    constructor(state) {

        if (state.length == 8 && state.every(col => { console.log(col); return col.length === Board.prototype.SIZE })) {
            this.boardState = state;
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
}
Object.defineProperty(Board.prototype, 'SIZE', {
    value: 8,
    writable: false,
    configurable: false,
    enumerable: true
});
//const initialState = new Array(new Array(), new Array(), new Array(), new Array(),
//   new Array(), new Array(), new Array(), new Array());
const initialState = new Array();

//top left is white empty tile, blacks on top
for (let i = 0; i < Board.prototype.SIZE; i++) {
    initialState.push(new Array());
    var tile;
    for (let j = 0; j < Board.prototype.SIZE; j++) {
        var tileIndex = i + j;
        if (i < 3 && (tileIndex % 2 != 0))
            tile = 'b';
        else if (i > 4 && (tileIndex % 2 != 0))
            tile = 'w';
        else
            tile = 'e';
        initialState[i].push(tile);
    }
}

// [{arr : new Array(8),
//             function name(params) {

//             }}]

//test
// let arr = new Array(8);
// for (let i = 0; i < Board.prototype.SIZE; i++) {
//      arr[i] = new Array(Board.prototype.SIZE);
// }
// var b = new Board(arr);
var c = new Board(initialState);
