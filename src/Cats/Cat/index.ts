import Behavior from '../../BehaviorTree/Behavior'
import BehaviorTree from '../../BehaviorTree/BehaviorTree'
import GameState from '../../GameState';
import CatStats from './CatStats'

class Cat {
    public name: String;
    public description: String;
    public catStats: CatStats;

    public bt: BehaviorTree<CatStats, GameState>;
    protected bx: Behavior<CatStats, GameState>;

    constructor(name: String, desc: String, bx: Behavior<CatStats, GameState>,
        bt: BehaviorTree<CatStats, GameState>) {
        this.name = name;
        this.description = desc;
        this.bx = bx;
        this.bt = bt;
    }

    getStats = (): CatStats => {
        return this.bt.state;
    }

    tick = (gs: GameState): String => {
        if (this.bt.hasActions()) {
            this.bt.tick(gs)
        } else {
            this.bt.start(this.bx)
            this.bt.tick(gs)
        }
        return 'hi'
    }

    handleAction = (s: String, gs: GameState) => {
        switch (s) {
            case 'Poke':
                this.getStats().annoyance++;
                break;
            case 'Pet':
                this.getStats().happiness++;
                break;
            case 'Feed':
                this.getStats().hunger--;
                break;
            case 'Do nothing':
                this.getStats().annoyance--;
                break;
            default:
                console.log('invalid action');
                break;
        }
        if (this.getStats().gameOver) {
            return;
        }
        this.tick(gs);
    }
        
    
    
}

export default Cat