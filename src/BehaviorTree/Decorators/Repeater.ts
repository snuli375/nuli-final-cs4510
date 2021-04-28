import Decorator from "./Decorator";
import { Status } from "../Status"
import Behavior from "../Behavior";
import BehaviorObserver from '../BehaviorObserver';
import BehaviorTree from '../BehaviorTree'

/**
 * repeat action certain number of times
 */
class Repeater<S, G> extends Decorator<S, G> {
    protected max: number;
    protected count: number = 0;
    
    constructor(name: String, bt: BehaviorTree<S, G>, child: Behavior<S, G>, max: number) {
        super(name, bt, child);
        this.max = max;
    }

    onInitialize = (obj: S, gs: G): void => {
        this.count = 0;
        const bo: BehaviorObserver<S, G> = new BehaviorObserver(this);
         this.bt.start(this.child, bo);
    }

    onChildComplete = (s: S, gs: G): void => {
        this.count++;
        const status:Status = this.child.getStatus()
        if (this.count >= this.max) {
            this.bt.end(this, 'SUCCESS', gs)
        } else {
            const bo: BehaviorObserver<S, G> = new BehaviorObserver(this);
            this.bt.start(this.child, bo);
        }
    }
}
     
export default Repeater