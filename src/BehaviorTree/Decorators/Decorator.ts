import ParentNode from "../ParentNode";
import Behavior from "../Behavior";
import BehaviorTree from '../BehaviorTree'

abstract class Decorator<S, G> extends ParentNode<S, G> {
    protected child: Behavior<S, G>;

     constructor(name: String, bt: BehaviorTree<S, G>, child: Behavior<S, G>) {
        super(name, bt);
         this.child = child;
     }
    
     isParent = (): boolean => {return true}

}

export default Decorator