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
            return false;
        else if (this.board.isOccupied(toLocation))
            return false;
        else if ((toLocation.col == Number(this.location.col) + 1 || toLocation.col == Number(this.location.col) - 1)
            && toLocation.row == Number(this.location.row) + Number(this.movingDirection))
            return true;

        console.log(Math.abs(Number(toLocation.col) - Number(this.location.col)));
        console.log(Math.abs(Number(toLocation.col) - Number(this.location.col)));


        if (Math.abs(Number(toLocation.col) - Number(this.location.col)) == 2 && Math.abs(Number(toLocation.col) - Number(this.location.col))) {
            let colAdvance = toLocation.col > this.location.col ? 1 : -1;
            let rowAdvance = toLocation.row > this.location.row ? 1 : -1;
            let jumpedTile = new Location(Number(this.location.row) + rowAdvance, Number(this.location.col) + colAdvance);
            return this.board.isOccupied(jumpedTile) && this.isEnemy(jumpedTile);
        }
    }



    isMovingWithPieceAvailable(piece) {
        return piece.isLegalMove(new Location(Number(piece.location.row) + Number(this.movingDirection), piece.location.col + 1)) ||
            piece.isLegalMove(new Location(Number(piece.location.row) + Number(this.movingDirection), piece.location.col - 1));
    }

    isEnemy(toLocation) {
        return this.board.tileStatus(toLocation).color !== this.color;
    }

    //this method will be used for the display
    getColor() {
        return this.color ? 'white' : 'grey';
    }
}