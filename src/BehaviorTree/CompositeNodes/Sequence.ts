import Composite from './Composite'
import Behavior from '../Behavior'
import { Status } from '../Status'
import BehaviorTree from '../BehaviorTree'
import BehaviorObserver from '../BehaviorObserver';

/**
 * Sequence nodes contain one or more children. 
 * Upon execution, it executes every child and fails when one of the children fails.
 */
class Sequence<S> extends Composite<S> {
    protected index: number = 0;
    
     onInitialize = (obj: S): void => {
         this.index = 0;
         const bo: BehaviorObserver<S> = new BehaviorObserver(this);
         this.bt.start(this.children[this.index], bo);
     }
    
    onChildComplete = (s: S): void => {
        const current: Behavior<S> = this.children[this.index];
        const status: Status = current.getStatus();
        if (status === 'FAILURE') {
            this.bt.end(this, 'FAILURE');
        } else if (status === 'SUCCESS') {
            if (this.index === this.children.length - 1) { // end of children
                this.bt.end(this, 'SUCCESS')
            } else { // more children
                const bo: BehaviorObserver<S> = new BehaviorObserver(this);
                this.index++;
                this.bt.start(this.children[this.index], bo)
            }
        }
    }
}

export default Sequence