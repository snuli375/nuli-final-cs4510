import Composite from './Composite'
import Behavior from '../Behavior'
import { Status } from '../Status'
import BehaviorTree from '../BehaviorTree'
import BehaviorObserver from '../BehaviorObserver';

/**
 * Sequence nodes contain one or more children. 
 * Upon execution, it executes every child and fails when one of the children fails.
 */
class Sequence<S, G> extends Composite<S, G> {
    protected index: number = 0;
    
     onInitialize = (obj: S, gs: G): void => {
         this.index = 0;
         const bo: BehaviorObserver<S, G> = new BehaviorObserver(this);
         this.bt.start(this.children[this.index], bo);
     }
    
    onChildComplete = (s: S, gs: G): void => {
        const current: Behavior<S, G> = this.children[this.index];
        const status: Status = current.getStatus();
        if (status === 'FAILURE') {
            this.bt.end(this, 'FAILURE', gs);
        } else if (status === 'SUCCESS') {
            if (this.index === this.children.length - 1) { // end of children
                this.bt.end(this, 'SUCCESS', gs)
            } else { // more children
                const bo: BehaviorObserver<S, G> = new BehaviorObserver(this);
                this.index++;
                this.bt.start(this.children[this.index], bo)
            }
        }
    }
}

export default Sequence