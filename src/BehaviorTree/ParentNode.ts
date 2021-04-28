import Behavior from './Behavior'
import BehaviorTree from './BehaviorTree'
import { Status } from './Status' 

abstract class ParentNode<S> extends Behavior<S> {
    protected bt: BehaviorTree<S>;

    constructor(name: String, bt: BehaviorTree<S>) {
        super(name);
        this.bt = bt;
    }

    update = (obj: S): Status => {
        return 'RUNNING';
    }

    abstract onChildComplete(s: S): void;

    notify = (s: S): void => {
        this.onChildComplete(s);
    }

}

export default ParentNode