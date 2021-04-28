import ParentNode from "../ParentNode";
import Behavior from "../Behavior";
import BehaviorTree from '../BehaviorTree'

abstract class Decorator<S> extends ParentNode<S> {
    protected child: Behavior<S>;

     constructor(name: String, bt: BehaviorTree<S>, child: Behavior<S>) {
        super(name, bt);
         this.child = child;
     }
    
     isParent = (): boolean => {return true}

}

export default Decorator