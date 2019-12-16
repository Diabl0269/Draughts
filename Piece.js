const Board = require('./Board');
const Location = require('./Location');

//color: true - white, false - black
class Piece {
    constructor(board, location, color) {
        this.board = board;
        this.location = location;
        this.color = color;
        this.movingDirection = color ? -1 : 1;
    }
    move(toLocation) {
        if (toLocation.row != this.location.row + this.movingDirection &&
            toLocation.row != this.location.row + this.movingDirection * 2)
            alert('Invalid moving location');
        else if (this.board.isOccupied(toLocation))
            alert('Board is occupied');
        else if ((toLocation.col == this.location.col + 1 || toLocation.col == this.location - 1)
                && toLocation.row == this.location.row + this.movingDirection)
                return successfulMovement(this.location,toLocation);
        else if((toLocation.col == this.location.col + 2 || toLocation.col == this.location - 2)
                && (toLocation.row == this.location.row + this.movingDirection*2)){
                    let colAdvance = toLocation.col > this.location.col ? 1:-1;
                    let jumpedTile = new Location(this.location.row + this.movingDirection, colAdvance);
                    if (this.board.isOccupied(jumpedTile) && this.isEnemy(jumpedTile)){                       
                        this.board.pieceCaptured(jumpedTile);
                        return successfulMovement(this.location,toLocation);
                    }
                }
    }
    isEnemy(toLocation){
        return this.board.tileStatus(toLocation).color === this. color;
    }
}

module.exports={
   Piece: Piece
}