import Behavior from './Behavior'
import BehaviorObserver from './BehaviorObserver';
import { Status } from './Status'

class BehaviorTree<S> {
    protected behaviors: Behavior<S>[] = [];
    protected state: S;

    constructor(state: S) {
        this.state = state;
    }
    
    tick = (): boolean => {
        console.log('tick')
        console.log(this.behaviors)
        while (this.behaviors.length) {
            console.log(this.behaviors.length)
            const current = this.behaviors.shift();
            current.tick(this.state);
            if (current.getStatus() ==='RUNNING') {
                this.behaviors.push(current)
            } else {
                current.getObserver() && current.getObserver().update();
                this.behaviors.pop()
            }
            return true;
        }
        return false;
    }
    
    start = (bx: Behavior<S>, obv: BehaviorObserver<S> | null = null): void => {
        console.log('start')
        if (obv !== null) {
            bx.setObserver(obv);
        }
        this.behaviors.unshift(bx)
        this.tick()
    }
    
    end = (bx: Behavior<S>, s: Status): void => {
        console.log('end')
        if (s !== 'RUNNING') {
             bx.setStatus(s)
        }
        if (bx.getObserver()) {
            bx.getObserver().update();
        }
     }
}

export default BehaviorTree