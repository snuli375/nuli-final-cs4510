import Decorator from "./Decorator";
import { Status } from "../Status"
import Behavior from "../Behavior";
import BehaviorObserver from '../BehaviorObserver';
import BehaviorTree from '../BehaviorTree'

/**
 * repeat until status matches result
 */
class RepeatUntilResult<S> extends Decorator<S> {
    protected result: Status;
    
    constructor(name: String, bt: BehaviorTree<S>, child: Behavior<S>, result: Status) {
        super(name, bt, child);
        this.result = result;
    }

    onInitialize = (obj: S): void => {
        console.log('onInitialize RepeatOnResult')
        // debugger;
        const bo: BehaviorObserver<S> = new BehaviorObserver(this);
        this.bt.start(this.child, bo);
    }

    onChildComplete = (s: S): void => {
        console.log('onchildcomplete RepeatUntilResult' + this.child.getStatus())
        const status: Status = this.child.getStatus()
        if (status !== this.result) {
            const bo: BehaviorObserver<S> = new BehaviorObserver(this);
            this.bt.start(this.child, bo);
        } else {
             this.bt.end(this, 'SUCCESS')
        }
    }
}
     
export default RepeatUntilResult