import Decorator from "./Decorator";
import { Status } from "../Status"
import Behavior from "../Behavior";
import BehaviorObserver from '../BehaviorObserver';
import BehaviorTree from '../BehaviorTree'

/**
 * repeat until status doesn't match passed result
 */
class RepeatOnResult<S, G> extends Decorator<S, G> {
    protected result: Status;
    
    constructor(name: String, bt: BehaviorTree<S, G>, child: Behavior<S, G>, result: Status) {
        super(name, bt, child);
        this.result = result;
    }

    onInitialize = (obj: S, gs: G): void => {
        const bo: BehaviorObserver<S, G> = new BehaviorObserver(this);
        this.bt.start(this.child, bo);
    }

    onChildComplete = (s: S, gs: G): void => {
        const status: Status = this.child.getStatus()
        if (status === this.result) {
            const bo: BehaviorObserver<S, G> = new BehaviorObserver(this);
            this.bt.start(this.child, bo);
        } else {
             this.bt.end(this, 'SUCCESS', gs)
        }
    }
}
     
export default RepeatOnResult