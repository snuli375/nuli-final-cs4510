import Composite from './Composite'
import Behavior from '../Behavior'
import { Status } from '../Status'
import BehaviorTree from '../BehaviorTree'
import BehaviorObserver from '../BehaviorObserver';

/**
 * Selector nodes contain one or more children. 
 * Upon execution, it executes every child until one of them succeeds, otherwise it fails.
 */
class Selector<S> extends Composite<S> {
    protected index: number = 0;
    
     onInitialize = (obj: S): void => {
         this.index = 0;
         const bo: BehaviorObserver<S> = new BehaviorObserver(this);
         this.bt.start(this.children[this.index], bo);
     }
    
    onChildComplete = (): void => {
        const current: Behavior<S> = this.children[this.index];
        const s: Status = current.getStatus();
        if (s === 'SUCCESS') {
            return;
        } else if (s === 'FAILURE') {
            if (this.index === this.children.length - 1) { // end of children
                this.bt.end(this, 'FAILURE')
            } else { // more children
                const bo: BehaviorObserver<S> = new BehaviorObserver(this);
                this.index++;
                this.bt.start(this.children[this.index], bo)
            }
        }
    }

    notify = (): void => {
        this.onChildComplete()
    }
    
    update = (obj: S): Status => {
        return 'RUNNING';
    }
}

export default Selector