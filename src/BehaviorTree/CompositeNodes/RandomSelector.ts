import Composite from './Composite'
import BehaviorObserver from '../BehaviorObserver';

/**
 * 
 */
class RandomSelector<S> extends Composite<S> {
    private index: number = 0;
    
     onInitialize = (obj: S): void => {
         this.index = Math.floor(Math.random() * this.children.length);
         const bo: BehaviorObserver<S> = new BehaviorObserver(this);
         this.bt.start(this.children[this.index], bo);
     }
    
    onChildComplete = (s: S): void => {
        this.bt.end(this, this.children[this.index].getStatus())
     }
    
}

export default RandomSelector