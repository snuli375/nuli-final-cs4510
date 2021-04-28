import Behavior from "./Behavior";


class BehaviorObserver<S> {
    private subject: Behavior<S>;

    constructor (subject: Behavior<S>) {
        this.subject = subject;
    }

    public update(s: S): void {
        this.subject.notify(s)
    }
}

export default BehaviorObserver;
