const Piece = require('./Piece.js');
const Board = require('./Board');
const Location = require('./Location');

class King extends Piece {
    legalLocations() {
        return [new Location(this.location.row + 1, this.location.col + 1), new Location(this.location.row + 1, this.location.col - 1),
        new Location(this.location.row - 1, this.location.col + 1), new Location(this.location.row - 1, this.location.col - 1),
        new Location(this.location.row + 2, this.location.col + 2), new Location(this.location.row + 2, this.location.col - 2),
        new Location(this.location.row - 2, this.location.col + 2), new Location(this.location.row - 2, this.location.col - 2)];
    }
    move(toLocation) {
        if (!this.legalLocations.includes(toLocation))
            alert('Invalid moving location');
        else if (this.board.isOccupied(toLocation))
            alert('Board is occupied');
        else if ((toLocation.col == this.location.col + 1 || toLocation.col == this.location - 1)
            && toLocation.row == this.location.row + this.movingDirection)
            return successfulMovement(this.location, toLocation);
        else if ((toLocation.col == this.location.col + 2 || toLocation.col == this.location - 2)
            && (toLocation.row == this.location.row + this.movingDirection * 2)) {
            let colAdvance = toLocation.col > this.location.col ? 1 : -1;
            let jumpedTile = new Location(this.location.row + this.movingDirection, colAdvance);
            if (this.board.isOccupied(jumpedTile) && this.isEnemy(jumpedTile)) {
                this.board.pieceCaptured(jumpedTile);
                return successfulMovement(this.location, toLocation);
            }
        }
    }
}
// King.legalLocations = [new Location(this.location.row + 1, this.location.col + 1), new Location(this.location.row + 1, this.location.col - 1),
// new Location(this.location.row - 1, this.location.col + 1), new Location(this.location.row - 1, this.location.col - 1),
// new Location(this.location.row + 2, this.location.col + 2), new Location(this.location.row + 2, this.location.col - 2),
// new Location(this.location.row - 2, this.location.col + 2), new Location(this.location.row - 2, this.location.col - 2)];

// console.log(King.legalLocations.splice(4));

let k = new King(new Board(), new Location(0, 0), true);
console.log(k.location);
