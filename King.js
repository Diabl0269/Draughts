class King extends Piece {
    legalLocations() {
        return [new Location(this.location.row + 1, this.location.col + 1), new Location(this.location.row + 1, this.location.col - 1),
        new Location(this.location.row - 1, this.location.col + 1), new Location(this.location.row - 1, this.location.col - 1),
        new Location(this.location.row + 2, this.location.col + 2), new Location(this.location.row + 2, this.location.col - 2),
        new Location(this.location.row - 2, this.location.col + 2), new Location(this.location.row - 2, this.location.col - 2)];
    }
    isLegalMove(toLocation) {
        console.log();
        
        if (!this.legalLocations().some(location => location.row == toLocation.row && location.col == toLocation.col))
            return alert('Invalid moving location');
        else if (this.board.isOccupied(toLocation))
            return alert('Board is occupied');
        else if (Math.abs(toLocation.row - Number(this.location.row)) == 1)
        // else if (toLocation.row == Number(this.location.row) + 1) {
            return true;
        
        //the last case is capturing
        let colAdvance = toLocation.col > this.location.col ? 1 : -1;
        let rowAdvance = toLocation.row > this.location.row ? 1 : -1;
        let jumpedTile = new Location(this.location.row + rowAdvance, this.location.col + colAdvance);
        console.log(jumpedTile);

        if (this.board.isOccupied(jumpedTile) && this.isEnemy(jumpedTile)) {
            this.board.pieceCaptured(jumpedTile);
            return true;
        }
        alert('something is wrong');
        
    }
}