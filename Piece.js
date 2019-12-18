//color: true - white, false - black
class Piece {
    constructor(board, location, color) {
        this.board = board;
        this.location = location;
        this.color = color;
        this.movingDirection = color ? -1 : 1;
    }
    isLegalMove(toLocation) {     
        if (!((toLocation.row == (Number(this.location.row) + Number(this.movingDirection)) &&
            (toLocation.col == Number(this.location.col) + 1 || toLocation.col == Number(this.location.col) - 1))
            || ((toLocation.row == (Number(this.location.row)) + Number(this.movingDirection) * 2) &&
            (toLocation.col == Number(this.location.col) + 2 || toLocation.col == Number(this.location.col) - 2))))
            return alert('Invalid moving location');
        else if (this.board.isOccupied(toLocation))
            return alert('Board is occupied');
        else if ((toLocation.col == Number(this.location.col) + 1 || toLocation.col == Number(this.location.col) - 1)
            && toLocation.row == Number(this.location.row) + Number(this.movingDirection))
            return true;
        else if ((toLocation.col == Number(this.location.col) + 2 || toLocation.col == Number(this.location.col) - 2)
            && (toLocation.row == Number(this.location.row) + Number(this.movingDirection) * 2)) {
            let colAdvance = toLocation.col > this.location.col ? 1 : -1;
            let jumpedTile = new Location(Number(this.location.row) + Number(this.movingDirection), Number(this.location.col) + Number(colAdvance));
            if (this.board.isOccupied(jumpedTile) && this.isEnemy(jumpedTile)) {
                this.board.pieceCaptured(jumpedTile);
                return true;
            }
            else alert("Can't capture an ally piece");
        }
    }

    isEnemy(toLocation) {
        return this.board.tileStatus(toLocation).color !== this.color;
    }

    //this method will be used for the display
    getColor() {
        return this.color ? 'white' : 'grey';
    }
}