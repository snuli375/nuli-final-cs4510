import Composite from './Composite'
import Behavior from '../Behavior'
import { Status } from '../Status'
import BehaviorTree from '../BehaviorTree'
import BehaviorObserver from '../BehaviorObserver';

/**
 * 
 */
class IfElse<S, G> extends Composite<S, G> {
    protected predicate: (s: S, g: G) => boolean;
    protected child: Behavior<S, G> = null;

        constructor(name: String, bt: BehaviorTree<S, G>, children: [Behavior<S, G>, Behavior<S, G>], predicate: (s: S, g: G) => boolean) {
        super(name, bt, children);
        this.predicate = predicate;
    }
    
    onInitialize = (obj: S, gs: G): void => {
        const bo: BehaviorObserver<S, G> = new BehaviorObserver(this);
        this.child = this.children[this.predicate(obj, gs) ? 0 : 1]
        this.bt.start(this.child, bo);
     }
    
    onChildComplete = (s: S, gs: G): void => {
        this.bt.end(this, this.child.getStatus(), gs)
    }
}

export default IfElse