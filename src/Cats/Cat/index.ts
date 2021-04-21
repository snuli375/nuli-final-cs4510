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
        this.bt.start(bx)
    }

    tick = (): String => {
        const b = this.bt.tick()
        return b ? 'true' : 'false';
    }
}

export default Cat