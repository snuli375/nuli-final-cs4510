import Behavior from "./Behavior";
import BehaviorObserver from "./BehaviorObserver";
import { Status } from "./Status";

class BehaviorTree<S> {
  protected behaviors: Behavior<S>[] = [];
  public state: S;

  constructor(state: S) {
    this.state = state;
  }

  tick = (): boolean => {
    console.log('tick')
    this.behaviors.push(null);
    console.log(this.behaviors)
    while (this.behaviors.length) {
      console.log(this.behaviors)
      debugger;
      const current = this.behaviors.shift();
      if (current === null) {
        this.behaviors = this.behaviors.filter(b => b != null)
        console.log(this.behaviors)
        return true;
      }
      current.tick(this.state);
      if (current.getStatus() === "RUNNING") {
        debugger;
        // this.behaviors.push(current);
        console.log('push')
        console.log(this.behaviors)
      } else if (current.getStatus() === "SUCCESS" && !current.isParent()) {
        console.log(`else if ${current.getStatus()}`)
        current.getObserver() && current.getObserver().update(this.state);
        console.log(this.behaviors)
        this.behaviors = this.behaviors.filter(b => b != null)
        console.log(this.behaviors)
        return true;
      } else {
        console.log(`else ${current.constructor.name} ${current.getStatus()}`)
        console.log(this.behaviors)
        current.getObserver() && current.getObserver().update(this.state);
      }
    }
    console.log(this.behaviors)
    return false;
  };

  hasActions = (): boolean => {
    return !!this.behaviors.length;
  };

  start = (bx: Behavior<S>, obv: BehaviorObserver<S> | null = null): void => {
    console.log(`start ${bx.constructor.name}`)
    if (obv !== null) {
      bx.setObserver(obv);
    } // else, it's the root node
    this.behaviors.unshift(bx);
  };

  end = (bx: Behavior<S>, s: Status): void => {
    // debugger;
    bx.setStatus(s);
    console.log(`end ${bx.getStatus()} ${bx.isParent()}`)
    console.log(bx.getStatus())
    if (bx.getObserver()) {
      bx.getObserver().update(this.state);
    }
  };
}

export default BehaviorTree;
