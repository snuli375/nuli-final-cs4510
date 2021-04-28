import Composite from './Composite'
import Behavior from '../Behavior'
import { Status } from '../Status'
import BehaviorTree from '../BehaviorTree'
import BehaviorObserver from '../BehaviorObserver';

/**
 * Selector nodes contain one or more children. 
 * Upon execution, it executes every child until one of them succeeds, otherwise it fails.
 */
class Selector<S, G> extends Composite<S, G> {
    protected index: number = 0;
    
    onInitialize = (obj: S, gs: G): void => {
         this.index = 0;
         const bo: BehaviorObserver<S, G> = new BehaviorObserver(this);
         this.bt.start(this.children[this.index], bo);
     }
    
    onChildComplete = (s: S, gs: G): void => {
        const current: Behavior<S, G> = this.children[this.index];
        const status: Status = current.getStatus();
        if (status === 'SUCCESS') {
            this.bt.end(this, 'SUCCESS', gs)
        } else if (status === 'FAILURE') {
            if (this.index >= this.children.length - 1) { // end of children
                this.bt.end(this, 'FAILURE', gs)
            } else { // more children
                const bo: BehaviorObserver<S, G> = new BehaviorObserver(this);
                this.index++;
                if (this.index < this.children.length) {
                    this.bt.start(this.children[this.index], bo)
                }
            }
        }
    }
}

export default Selector