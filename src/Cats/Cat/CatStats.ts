class CatStats {
    public hunger?: number;
    public happiness?: number;
    public annoyance?: number;
    public gameOver: boolean;

    constructor(hunger: number, happiness: number, annoyance: number) {
        this.hunger = hunger;
        this.happiness = happiness;
        this.annoyance = annoyance;
    }

    setGameOver = (b: boolean) => {
        this.gameOver = b;
    }
}

export default CatStats;