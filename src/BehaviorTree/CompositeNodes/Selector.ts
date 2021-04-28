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
         console.log('selector oninit')
         this.index = 0;
         const bo: BehaviorObserver<S> = new BehaviorObserver(this);
         this.bt.start(this.children[this.index], bo);
     }
    
    onChildComplete = (s: S): void => {
        const current: Behavior<S> = this.children[this.index];
        const status: Status = current.getStatus();
        console.log(`onChildComplete ${current.constructor.name} ${status}`)
        if (status === 'SUCCESS') {
            this.bt.end(this, 'SUCCESS')
        } else if (status === 'FAILURE') {
            if (this.index >= this.children.length - 1) { // end of children
                this.bt.end(this, 'FAILURE')
            } else { // more children
                const bo: BehaviorObserver<S> = new BehaviorObserver(this);
                this.index++;
                if (this.index < this.children.length) {
                    this.bt.start(this.children[this.index], bo)
                }
            }
        }
    }
}

export default Selector