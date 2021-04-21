import Decorator from "./Decorator";
import { Status } from "../Status"
import Behavior from "../Behavior";
import BehaviorObserver from '../BehaviorObserver';
import BehaviorTree from '../BehaviorTree'

/**
 * repeat until status doesn't match passed result
 */
class RepeatOnResult<S> extends Decorator<S> {
    protected result: Status;
    
    constructor(name: String, bt: BehaviorTree<S>, child: Behavior<S>, result: Status) {
        super(name, bt, child);
        this.result = result;
    }

    onInitialize = (obj: S): void => {

    }

    update = (obj: S): Status => {
        const bo: BehaviorObserver<S> = new BehaviorObserver(this);
        this.bt.start(this.child, bo);
        console.log('add')
        return 'RUNNING'
    }

    onChildComplete = (): void => {
        console.log('repeatonresult onChildComplete')
        const s:Status = this.child.getStatus()
        if (s === this.result) {
            const bo: BehaviorObserver<S> = new BehaviorObserver(this);
            this.bt.start(this.child, bo);
        } else {
             this.bt.end(this, 'SUCCESS')
        }
    }
}
     
export default RepeatOnResult