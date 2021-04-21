import Behavior from '../../BehaviorTree/Behavior'
import BehaviorTree from '../../BehaviorTree/BehaviorTree'
import CatStats from './CatStats'

class Cat {
    public name: String;
    public description: String;
    public commands: String[] = [];

    public bt: BehaviorTree<CatStats>;
    protected bx: Behavior<CatStats>;

    constructor(name: String, desc: String, bx: Behavior<CatStats>, bt: BehaviorTree<CatStats>) {
        this.name = name;
        this.description = desc;
        this.bx = bx;
        this.bt = bt;
        
    }

    getStats = (): CatStats => {
        return this.bt.state;
    }

    tick = (): String => {
        this.bt.start(this.bx)
        const b = this.bt.tick()
        return b ? 'true' : 'false';
    }
    
    
}

export default Cat