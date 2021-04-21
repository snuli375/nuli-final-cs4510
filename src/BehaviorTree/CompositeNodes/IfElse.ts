import Composite from './Composite'
import Behavior from '../Behavior'
import { Status } from '../Status'
import BehaviorTree from '../BehaviorTree'
import BehaviorObserver from '../BehaviorObserver';

/**
 * 
 */
class IfElse<S> extends Composite<S> {
    protected predicate: (s: S) => boolean;

        constructor(name: String, bt: BehaviorTree<S>, children: [Behavior<S>, Behavior<S>], predicate: (s: S) => boolean) {
        super(name, bt, children);
        this.predicate = predicate;
    }
    
    onInitialize = (obj: S): void => {
        const bo: BehaviorObserver<S> = new BehaviorObserver(this);
        this.bt.start(this.children[this.predicate(obj) ? 0 : 1], bo);
     }
    
    onChildComplete = (): void => {
        const current: Behavior<S> = this.children[this.predicate ? 0 : 1];
        this.bt.end(this, current.getStatus())
    }

    notify = (): void => {
        this.onChildComplete()
    }
    
    update = (obj: S): Status => {
        const current: Behavior<S> = this.children[this.predicate ? 0 : 1];
        return current.getStatus();
    }
}

export default IfElse