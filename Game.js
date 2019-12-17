class Game{
    constructor(){
        this.whitesAlive = [];
        this.blacksAlive = [];
        this.borad = new Board(this);
    }
    move(moveFrom,moveTo){
        if(isLegal){
            this.borad(moveTo) = this.borad(moveFrom);
            this.borad(moveFrom) = 'e';

        }
    }
}