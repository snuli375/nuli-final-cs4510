import Behavior from '../Behavior'
import ParentNode from '../ParentNode'
import { Status } from "../Status";
import BehaviorTree from '../BehaviorTree'

abstract class Composite<S> extends ParentNode<S> {
    protected children: Behavior<S>[];

    constructor(name: String, bt: BehaviorTree<S>, children: Behavior<S>[]) {
        super(name, bt);
        this.children = children;
    }
}

export default Composite