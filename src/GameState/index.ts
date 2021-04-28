import Cat from "../Cats/Cat";

class GameState {
    public cat: Cat;
    public lastAction: String;
 
    constructor(cat: Cat) {
        this.cat = cat;
    }

    handleAction(s: String) {
        this.lastAction = s;
        this.cat.handleAction(s, this)
    }
    

}

export default GameState