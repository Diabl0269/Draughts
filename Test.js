const Piece = require('./Piece');
const Location = require('./Location');
const Board = require('./Board');
var p = Piece.constructor(Board.constructor(), Location.constructor(0,0), true);
console.log(p.color);