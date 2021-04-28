import Decorator from "./Decorator";
import { Status } from "../Status"
import Behavior from "../Behavior";
import BehaviorObserver from "../BehaviorObserver";

/**
 * always return success
 */
class Inverter<S, G> extends Decorator<S, G> {

    onInitialize = (obj: S, gs: G): void => {
        const bo = new BehaviorObserver(this)
        this.bt.start(this.child, bo)
    }

    onChildComplete = (s: S, gs: G): void => {
        this.bt.end(this, 'SUCCESS', gs)
    }
}
     
export default Inverter