import Decorator from "./Decorator";
import { Status } from "../Status"
import Behavior from "../Behavior";
import BehaviorObserver from '../BehaviorObserver';
import BehaviorTree from '../BehaviorTree'

/**
 * repeat action certain number of times
 */
class Repeater<S> extends Decorator<S> {
    protected max: number;
    protected count: number = 0;
    
    constructor(name: String, bt: BehaviorTree<S>, child: Behavior<S>, max: number) {
        super(name, bt, child);
        this.max = max;
    }

    onInitialize = (obj: S): void => {
        this.count = 0;
        const bo: BehaviorObserver<S> = new BehaviorObserver(this);
         this.bt.start(this.child, bo);
    }

    onChildComplete = (s: S): void => {
        this.count++;
        const status:Status = this.child.getStatus()
        if (this.count >= this.max) {
            this.bt.end(this, 'SUCCESS')
        } else {
            const bo: BehaviorObserver<S> = new BehaviorObserver(this);
            this.bt.start(this.child, bo);
        }
    }
}
     
export default Repeater