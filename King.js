class King extends Piece {
    legalLocations() {
        return [new Location(this.location.row + 1, this.location.col + 1), new Location(this.location.row + 1, this.location.col - 1),
        new Location(this.location.row - 1, this.location.col + 1), new Location(this.location.row - 1, this.location.col - 1),
        new Location(this.location.row + 2, this.location.col + 2), new Location(this.location.row + 2, this.location.col - 2),
        new Location(this.location.row - 2, this.location.col + 2), new Location(this.location.row - 2, this.location.col - 2)];
    }
    isLegalMove(toLocation) {

        if (!this.legalLocations().some(location => location.row == toLocation.row && location.col == toLocation.col))
            return false;  
        else if (this.board.isOccupied(toLocation))
            return false;
            else if(Math.abs(Number(toLocation.row) - Number(this.location.row)) == 1){
                return true;
            }
        else {
            let colAdvance = toLocation.col > this.location.col ? 1 : -1;
            let rowAdvance = toLocation.row > this.location.row ? 1 : -1;
            let jumpedTile = new Location(Number(this.location.row) + rowAdvance, Number(this.location.col) + colAdvance);
                return this.board.isOccupied(jumpedTile) && this.isEnemy(jumpedTile);
        }
    }
}