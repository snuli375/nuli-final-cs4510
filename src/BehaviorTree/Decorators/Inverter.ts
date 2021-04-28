import Decorator from "./Decorator";
import { Status } from "../Status"
import Behavior from "../Behavior";
import BehaviorObserver from "../BehaviorObserver";

/**
 * return failure if success, success if failure
 */
class Inverter<S, G> extends Decorator<S, G> {

    onInitialize = (obj: S, gs: G): void => {
        const bo = new BehaviorObserver<S, G>(this)
        this.bt.start(this.child, bo)
    }

    onChildComplete = (s: S, gs: G): void => {
        const status:Status = this.child.getStatus()
        this.bt.end(this, status === 'SUCCESS' ? 'FAILURE' : status === 'FAILURE' ? 'SUCCESS' : status, gs)
    }
}
     
export default Inverter