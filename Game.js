class Game {
    constructor() {
        this.whitesAlive = [];
        this.blacksAlive = [];
        this.gameRecord = [];
        this.board = new Board(this);
        this.turn = true;
        this.pieceThatHasToMove = null;
        this.whitesMustCapture = false;
        this.blackMustCapture = false;
    }

    move(moveFrom, moveTo) {
        if (this.turn == this.board.tileStatus(moveFrom).color) {
            if (this.pieceThatHasToMove) {

                let colAdvance = moveTo.col > moveFrom.col ? 1 : -1;
                let rowAdvance = moveTo.row > moveFrom.row ? 1 : -1;
                let jumpedTile = new Location(Number(moveFrom.row) + rowAdvance, Number(moveFrom.col) + colAdvance);


                if (this.board.tileStatus(moveFrom) != this.pieceThatHasToMove || Math.abs(Number(moveFrom.row) - Number(moveTo.row)) != 2 ||
                    Math.abs(Number(moveFrom.col) - Number(moveTo.col)) != 2 || !this.board.isOccupied(jumpedTile) || !this.board.tileStatus(moveFrom).isEnemy(jumpedTile))
                    return alert('You must continue capturing with the last moved piece');
                else return this.successfulMovment(moveFrom, moveTo);
            }
            if ((this.turn && this.whitesMustCapture) || (!this.turn && this.blackMustCapture)) {
                let aliveList = this.turn ? this.whitesAlive : this.blacksAlive;
                let capturingPieces = aliveList.filter(piece => this.isCapturingWithPieceAvailable(piece));
                if (!capturingPieces.includes(this.board.tileStatus(moveFrom)) || (Math.abs(Number(moveFrom.row) - Number(moveTo.row))) != 2)
                    return alert('You must capture a piece');
            }

            if (this.board.tileStatus(moveFrom).isLegalMove(moveTo)) {
                this.successfulMovment(moveFrom, moveTo);
            }
            else alert("You can't do this");

        }
        else alert("Other's color turn");
    }

    canAnybodyMove() {
        let whitesThatCanMove = this.whitesAlive.filter((piece) => {
            let bottomRight = new Location(piece.location.row + 1, piece.location.col + 1);
            let topRight = new Location(piece.location.row - 1, piece.location.col + 1);
            let topLeft = new Location(piece.location.row - 1, piece.location.col - 1);
            let bottomLeft = new Location(piece.location.row + 1, piece.location.col - 1);
            if (piece instanceof King) {
                return piece.isLegalMove(bottomRight) || piece.isLegalMove(topRight) || piece.isLegalMove(topLeft) || piece.isLegalMove(bottomRight);
            }
            else
                return piece.isLegalMove(topRight) || piece.isLegalMove(topLeft);
        });
        let blacksThatCanMove = this.blacksAlive.filter((piece) => {
            let bottomRight = new Location(piece.location.row + 1, piece.location.col + 1);
            let topRight = new Location(piece.location.row - 1, piece.location.col + 1);
            let topLeft = new Location(piece.location.row - 1, piece.location.col - 1);
            let bottomLeft = new Location(piece.location.row + 1, piece.location.col - 1);
            if (piece instanceof King) {
                return piece.isLegalMove(bottomRight) || piece.isLegalMove(topRight) || piece.isLegalMove(topLeft) || piece.isLegalMove(bottomRight);
            }
            else
                return piece.isLegalMove(bottomRight) || piece.isLegalMove(bottomLeft);
        })
        this.canAnybodyCapture();
        if (whitesThatCanMove.length == 0 && !this.whitesMustCapture)
            alert('BLACKS WIN!!!');
        if (blacksThatCanMove.length == 0 && !this.blackMustCapture)
            alert('WHITES WIN!!!');
    }

    changePeiceIfGotToKingsRow(piece) {
        if ((piece.location.row == 0 && piece.color) || (piece.location.row == 7 && !piece.color)) {
            let aliveList = piece.color ? this.whitesAlive : this.blacksAlive;
            let index = aliveList.indexOf(piece);
            aliveList[index] = new King(this.board, piece.location, piece.color);
            this.board.state[piece.location.row][piece.location.col] = aliveList[index];
            if (piece == this.pieceThatHasToMove)
                this.pieceThatHasToMove = this.board.tileStatus(piece.location);
        }
    }

    successfulMovment(moveFrom, moveTo) {
        this.board.state[moveTo.row][moveTo.col] = this.board.tileStatus(moveFrom);
        this.board.state[moveFrom.row][moveFrom.col] = 'e';
        this.board.tileStatus(moveTo).location = moveTo;
        let piece = this.board.tileStatus(moveTo);

        if (this.capturing(piece, moveFrom) && this.isCapturingWithPieceAvailable(new King(this.board, piece.location, piece.color))) {
            this.canAnybodyCapture();
            this.pieceThatHasToMove = piece;
            return this.changePeiceIfGotToKingsRow(piece);
        }
        this.changePeiceIfGotToKingsRow(piece);
        this.canAnybodyMove();
        this.pieceThatHasToMove = null;
        this.turn = !this.turn;
    }

    canAnybodyCapture() {
        this.whitesMustCapture = this.whitesAlive.some(piece => this.isCapturingWithPieceAvailable(piece));
        this.blackMustCapture = this.blacksAlive.some(piece => this.isCapturingWithPieceAvailable(piece));
    }

    capturing(piece, fromLocation) {
        let colAdvance = piece.location.col > fromLocation.col ? 1 : -1;
        let rowAdvance = piece.location.row > fromLocation.row ? 1 : -1;
        let jumpedTile = new Location(Number(fromLocation.row) + rowAdvance, Number(fromLocation.col) + colAdvance);
        if ((piece.location.col == Number(fromLocation.col) + 2 || piece.location.col == Number(fromLocation.col) - 2) &&
            (piece.board.isOccupied(jumpedTile) && piece.isEnemy(jumpedTile))) {
            piece.board.pieceCaptured(jumpedTile);
            return true;
        }
        return false;
    }

    isCapturingWithPieceAvailable(piece) {
        let bottomRight = new Location(piece.location.row + 1, piece.location.col + 1);
        let topRight = new Location(piece.location.row - 1, piece.location.col + 1);
        let topLeft = new Location(piece.location.row - 1, piece.location.col - 1);
        let bottomLeft = new Location(piece.location.row + 1, piece.location.col - 1);
        let bottomCheck = (this.board.isOccupied(bottomLeft) && piece.isEnemy(bottomLeft) && !this.board.isOccupied(new Location(piece.location.row + 2, piece.location.col - 2))) ||
            (this.board.isOccupied(bottomRight) && piece.isEnemy(bottomRight) && !this.board.isOccupied(new Location(piece.location.row + 2, piece.location.col + 2)));
        let topCheck = (this.board.isOccupied(topRight) && piece.isEnemy(topRight) && !this.board.isOccupied(new Location(piece.location.row - 2, piece.location.col + 2))) ||
            (this.board.isOccupied(topLeft) && piece.isEnemy(topLeft) && !this.board.isOccupied(new Location(piece.location.row - 2, piece.location.col - 2)));
        if (piece instanceof King)
            return topCheck || bottomCheck;
        return piece.color ? topCheck : bottomCheck;
    }
    isCaptureingWithAnyPieceAvailable(aliveList) {
        for (let piece of aliveList) {
            if (this.isCapturingWithPieceAvailable(piece)) {
                return true;
            }
        }
    }
}

