import Behavior from '../BehaviorTree';
import { status, Status } from '../BehaviorTree/Status';
import CatStats from './Cat/CatStats'
import Cat from './Cat'


const bt = new Behavior.BehaviorTree<CatStats>(new CatStats(2, 2, 2));

class Hiss extends Behavior.Action<CatStats> {
    update = (obj: CatStats): Status => {
        console.log('hiss')
        return 'SUCCESS';
    }
}

class Win extends Behavior.Action<CatStats> {
    update = (obj: CatStats): Status => {
        console.log('you win!')
        return 'FAILURE';
    }
}

class Lose extends Behavior.Action<CatStats> {
    update = (obj: CatStats): Status => {
        obj.happiness++;
        console.log('You lost!')
        return 'FAILURE';
    }
}

class DontHiss extends Behavior.Action<CatStats> {
    update = (obj: CatStats): Status => {
        return 'SUCCESS';
    }
}

class Purr extends Behavior.Action<CatStats> {
    update = (obj: CatStats): Status => {
        obj.happiness++;
        console.log('purr')
        return 'SUCCESS';
    }
}

const bx = //new Behavior.RepeatOnResult('until win', bt,
    new Behavior.IfElse<CatStats>('end if won', bt, [new Win(),
        new Behavior.IfElse<CatStats>('end if lose', bt, [new Lose(),
        new Behavior.IfElse<CatStats>('hiss if annoyed', bt, [
            new Hiss(),
            new DontHiss()],
            (c: CatStats) => { return c.annoyance > 4; }),
        ],(c: CatStats) => { return c.annoyance > 4})
    ], (c: CatStats) => {  return c.happiness > 5; },
        //'FAILURE')
)

const droop = new Cat('droop', "he's got droopy eyebrows and a big ole frown", bx, bt);
// const fred = new CatStats('fred')
// const whiskers = new CatStats('whiskers')


export default { droop }