import Behavior from "./Behavior";


class BehaviorObserver<S> {
    private subject: Behavior<S>;

    constructor (subject: Behavior<S>) {
        this.subject = subject;
    }

    public update(): void {
        this.subject.notify()
    }
}

export default BehaviorObserver;
