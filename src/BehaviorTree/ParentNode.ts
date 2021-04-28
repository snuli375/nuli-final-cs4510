import Behavior from './Behavior'
import BehaviorTree from './BehaviorTree'
import { Status } from './Status';

abstract class ParentNode<S, G> extends Behavior<S, G> {
    protected bt: BehaviorTree<S, G>;

    constructor(name: String, bt: BehaviorTree<S, G>) {
        super(name);
        this.bt = bt;
    }

    update = (s: S, gs: G): Status =>  {
        return 'RUNNING'
    }

    abstract onChildComplete(s: S, gs: G): void;

    notify = (s: S, gs: G): void => {
        this.onChildComplete(s, gs);
    }

}

export default ParentNode