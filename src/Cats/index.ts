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

class DontHiss extends Behavior.Action<CatStats> {
    update = (obj: CatStats): Status => {
        obj.annoyance += 1
        console.log('dont hiss')
        return 'SUCCESS';
    }
}

const bx = new Behavior.RepeatOnResult('until win', bt,
    new Behavior.IfElse<CatStats>('hiss if annoyed', bt, [new Hiss(), new DontHiss()], (obj: CatStats) => { console.log(obj); return obj.annoyance > 4; }, 'SUCCESS')
)

const droop = new Cat('droop', "he's got droopy eyebrows and a big ole frown", bx, bt);
// const fred = new CatStats('fred')
// const whiskers = new CatStats('whiskers')


export default { droop }