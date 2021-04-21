class CatStats {
    public hunger?: number;
    public happiness?: number;
    public annoyance?: number;

    constructor(hunger: number, happiness: number, annoyance: number) {
        this.hunger = hunger;
        this.happiness = happiness;
        this.annoyance = annoyance;
    }
}

export default CatStats;