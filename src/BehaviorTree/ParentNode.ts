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

    abstract onChildComplete(): void;

    notify = (): void => {
        this.onChildComplete();
    }

}

export default ParentNode