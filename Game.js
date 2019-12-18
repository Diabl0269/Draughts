class Game {
    constructor() {
        this.whitesAlive = [];
        this.blacksAlive = [];
        this.gameRecord = [];
        this.board = new Board(this);
        this.turn = ture;
    }
    move(moveFrom, moveTo) {
        if (turn == this.board.tileStatus(moveFrom).color)
            if (this.board.tileStatus(moveFrom).isLegalMove(moveTo)) {
                this.board.state[moveTo.row][moveTo.col] = this.board.tileStatus(moveFrom);
                this.board.state[moveFrom.row][moveFrom.col] = 'e';
                this.board.tileStatus(moveTo).location = moveTo;
                turn = !turn;
            }
        else alert("Other's side turn");
    }
    isCapturingWithPieceAvailable(piece) {
        return ((this.board.isOccupied(new Location(piece.location.row + 1, piece.location.col + 1)) && !this.board.isOccupied(new Location(piece.location.row + 2, piece.location.col + 2))) ||
            (this.board.isOccupied(new Location(piece.location.row - 1, piece.location.col + 1)) && !this.board.isOccupied(new Location(piece.location.row - 2, piece.location.col + 2))) ||
            (this.board.isOccupied(new Location(piece.location.row - 1, piece.location.col - 1)) && !this.board.isOccupied(new Location(piece.location.row - 2, piece.location.col - 2))) ||
            (this.board.isOccupied(new Location(piece.location.row + 1, piece.location.col - 1)) && !this.board.isOccupied(new Location(piece.location.row + 2, piece.location.col - 2))))
    }
    isCaptureingWithAnyPieceAvailable() {
        let aliveList = turn ? this.whitesAlive : this.blacksAlive;
        for (let piece of aliveList) {
            if (this.isCapturingWithPieceAvailable(piece))
                return true;
        }
    }
}

