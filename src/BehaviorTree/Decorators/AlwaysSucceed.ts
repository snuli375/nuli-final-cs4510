import Decorator from "./Decorator";
import { Status } from "../Status"
import Behavior from "../Behavior";
import BehaviorObserver from "../BehaviorObserver";

/**
 * always return success
 */
class Inverter<S> extends Decorator<S> {

    onInitialize = (obj: S): void => {
        const bo = new BehaviorObserver(this)
        this.bt.start(this.child, bo)
    }

    onChildComplete = (): void => {
        this.bt.end(this, 'SUCCESS')
    }
}
     
export default Inverter