import Behavior from './Behavior'
import BehaviorObserver from './BehaviorObserver';
import { Status } from './Status'

class BehaviorTree<S> {
    protected behaviors: Behavior<S>[] = [];
    public state: S;

    constructor(state: S) {
        this.state = state;
    }
    
    tick = (): boolean => {
        while (this.behaviors.length) {
            const current = this.behaviors.shift();
            current.tick(this.state);
            if (current.getStatus() == 'RUNNING') {
                this.behaviors.push(current)
            } else if (current.getStatus() == 'SUCCESS') {
                return true;
            } else {
                current.getObserver() && current.getObserver().update();
                this.behaviors.pop()
            }
        }
        return false;
    }
    
    start = (bx: Behavior<S>, obv: BehaviorObserver<S> | null = null): void => {
        if (obv !== null) {
            bx.setObserver(obv);
        }
        this.behaviors.unshift(bx)
        this.tick()
    }
    
    end = (bx: Behavior<S>, s: Status): void => {
        if (s !== 'RUNNING') {
             bx.setStatus(s)
        }
        // const index = this.behaviors.find(bx);
        // this.behaviors.splice(index, 1);
        if (bx.getObserver()) {
            bx.getObserver().update();
        }
     }
}

export default BehaviorTree