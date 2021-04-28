import Behavior from '../Behavior'
import ParentNode from '../ParentNode'
import BehaviorTree from '../BehaviorTree'

abstract class Composite<S, G> extends ParentNode<S, G> {
    protected children: Behavior<S, G>[];

    constructor(name: String, bt: BehaviorTree<S, G>, children: Behavior<S, G>[]) {
        super(name, bt);
        this.children = children;
    }

    notify = (s: S, gs: G): void => {
        this.onChildComplete(s, gs)
    }

    isParent = (): boolean => {return true}

}

export default Composite