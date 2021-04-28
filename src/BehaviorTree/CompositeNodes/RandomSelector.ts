import Composite from './Composite'
import BehaviorObserver from '../BehaviorObserver';

/**
 * 
 */
class RandomSelector<S, G> extends Composite<S, G> {
    private index: number = 0;
    
     onInitialize = (obj: S, gs: G): void => {
         this.index = Math.floor(Math.random() * this.children.length);
         const bo: BehaviorObserver<S, G> = new BehaviorObserver(this);
         this.bt.start(this.children[this.index], bo);
     }
    
    onChildComplete = (s: S, gs: G): void => {
        this.bt.end(this, this.children[this.index].getStatus(), gs)
     }
    
}

export default RandomSelector