import Behavior from '../BehaviorTree';
import { Status } from '../BehaviorTree/Status';
import CatStats from './Cat/CatStats'
import Cat from './Cat'


const bt = new Behavior.BehaviorTree<CatStats>(new CatStats(2, 2, 2));

class Hiss extends Behavior.Action<CatStats> {
    update = (c: CatStats): Status => {
        return 'SUCCESS';
    }
}

class Win extends Behavior.Action<CatStats> {
    update = (c: CatStats): Status => {
        if (c.happiness > 6) {
            return 'SUCCESS'
        }
        return 'FAILURE';
    }
}

class Lose extends Behavior.Action<CatStats> {
    update = (c: CatStats): Status => {
        if (c.annoyance > 6) {
            return 'SUCCESS'
        }
        return 'FAILURE';
    }
}

class DontHiss extends Behavior.Action<CatStats> {
    update = (c: CatStats): Status => {
        return 'SUCCESS';
    }
}

class Purr extends Behavior.Action<CatStats> {
    update = (c: CatStats): Status => {
        c.happiness++;
        return 'SUCCESS';
    }
}

const bx = new Behavior.RepeatUntilResult('repeat until game ends', bt,
    new Behavior.Selector<CatStats>('check win/lose conditions', bt,
        [new Win(),
            new Lose(),
            new Behavior.IfElse<CatStats>('hiss if annoyed', bt, [
                new Hiss(),
                new DontHiss()],
                (c: CatStats) => { return c.annoyance > 4; }),]), 'FAILURE')

const droop = new Cat('droop', "he's got droopy eyebrows and a big ole frown", bx, bt);

export default { droop }