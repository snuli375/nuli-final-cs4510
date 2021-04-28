import Behavior from "./Behavior";


class BehaviorObserver<S, G> {
    private subject: Behavior<S, G>;

    constructor (subject: Behavior<S, G>) {
        this.subject = subject;
    }

    public update(s: S, gs: G): void {
        this.subject.notify(s, gs)
    }
}

export default BehaviorObserver;
