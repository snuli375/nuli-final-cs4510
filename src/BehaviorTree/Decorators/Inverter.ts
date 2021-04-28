import Decorator from "./Decorator";
import { Status } from "../Status"
import Behavior from "../Behavior";
import BehaviorObserver from "../BehaviorObserver";

/**
 * return failure if success, success if failure
 */
class Inverter<S> extends Decorator<S> {

    onInitialize = (obj: S): void => {
        const bo = new BehaviorObserver<S>(this)
        this.bt.start(this.child, bo)
    }

    onChildComplete = (s: S): void => {
        const status:Status = this.child.getStatus()
        this.bt.end(this, status === 'SUCCESS' ? 'FAILURE' : status === 'FAILURE' ? 'SUCCESS' : status)
    }
}
     
export default Inverter