import { Status } from './Status'
import BehaviorObserver from './BehaviorObserver'

abstract class Behavior<S> {
    protected name: String;
    protected status: Status;
    protected observer: BehaviorObserver<S>;

    constructor(name: String) {
        this.name = name;
        this.status = null;
        this.observer = null;
    }

    /**
     * called once, immediately before the first call to the behavior’s update method
     */
    onInitialize = (obj: S): void => {}

    /**
     * called  exactly  once  each  time  the  behavior  tree  is updated, until it signals it has terminated thanks to its return status.
     */
    abstract update(obj: S): Status;

    tick = (obj: S): Status => {
        this.status === null && this.onInitialize(obj)
        this.status = this.update(obj);
        this.status !== 'RUNNING' && this.onTerminate(this.status, obj)
        return this.status
    }

    getStatus = (): Status => this.status

    reset = (): void => {this.status = null;}

    setObserver = (obv: BehaviorObserver<S>): void => {this.observer = obv;}

    getObserver = (): BehaviorObserver<S> => this.observer

    notify = (): void => { }
    
    setStatus = (status: Status): void => {this.status = status;}

    /**
     *  method  is  called  once,  immediately  after  the  previous update signals it’s no longer running
     */
    onTerminate = (status: Status, obj: S): void => {}
}

export default Behavior;