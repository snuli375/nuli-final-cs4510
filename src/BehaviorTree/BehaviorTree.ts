import Behavior from "./Behavior";
import BehaviorObserver from "./BehaviorObserver";
import { Status } from "./Status";

class BehaviorTree<S, G> {
  protected behaviors: Behavior<S, G>[] = [];
  public state: S;

  constructor(state: S) {
    this.state = state;
  }

  tick = (gameState: G): boolean => {
    this.behaviors.push(null);
    while (this.behaviors.length) {      
      const current = this.behaviors.shift();
      if (current === null) {
        this.behaviors = this.behaviors.filter(b => b != null)
        return true;
      }
      current.tick(this.state, gameState);
      if (current.getStatus() === "RUNNING") {
        
      } else if (current.getStatus() === "SUCCESS" && !current.isParent()) {
        current.getObserver() && current.getObserver().update(this.state, gameState);
        this.behaviors = this.behaviors.filter(b => b != null)
        return true;
      } else {
        current.getObserver() && current.getObserver().update(this.state, gameState);
      }
    }
    return false;
  };

  hasActions = (): boolean => {
    return !!this.behaviors.length;
  };

  start = (bx: Behavior<S, G>, obv: BehaviorObserver<S, G> | null = null): void => {
    if (obv !== null) {
      bx.setObserver(obv);
    } // else, it's the root node
    this.behaviors.unshift(bx);
  };

  end = (bx: Behavior<S, G>, s: Status, gs: G): void => {
    bx.setStatus(s);
    if (bx.getObserver()) {
      bx.getObserver().update(this.state, gs);
    }
  };
}

export default BehaviorTree;
