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
    
    onChildComplete = (): void => {
        this.bt.end(this.children[this.index], this.children[this.index].getStatus())
     }

    notify = (): void => {
        this.onChildComplete()
    }
    
}

export default RandomSelector