import Behavior from '../BehaviorTree';
import { Status } from '../BehaviorTree/Status';
import CatStats from './Cat/CatStats'
import Cat from './Cat'
import GameState from '../GameState';


const bt = new Behavior.BehaviorTree<CatStats>(new CatStats(2, 2, 2));

class Hiss extends Behavior.Action<CatStats, GameState> {
    update = (c: CatStats): Status => {
        console.log('the cat hisses at you')
        return 'SUCCESS';
    }
}

class RaiseHackles extends Behavior.Action<CatStats, GameState> {
    update = (c: CatStats, gs: GameState): Status => {
        if (gs.lastAction !== 'Do nothing') {
            console.log('the cat raises its hackles')
            return 'SUCCESS';
        }
        else {
            return 'FAILURE'
        }
    }
}

class Win extends Behavior.Action<CatStats, GameState> {
    update = (c: CatStats): Status => {
        if (c.happiness > 6) {
            console.log('you win!')
            return 'SUCCESS'
        }
        return 'FAILURE';
    }
}

class Lose extends Behavior.Action<CatStats, GameState> {
    update = (c: CatStats): Status => {
        if (c.annoyance > 6) {
            console.log('you lost!')
            return 'SUCCESS'
        }
        return 'FAILURE';
    }
}

class DontHiss extends Behavior.Action<CatStats, GameState> {
    update = (c: CatStats): Status => {
        console.log('the cat just stares at you')
        return 'SUCCESS';
    }
}

class Purr extends Behavior.Action<CatStats, GameState> {
    update = (c: CatStats, gs: GameState): Status => {
        if (c.happiness > 4) {
            console.log('the cat purrs')
            return 'SUCCESS';
        } else {
            return 'FAILURE'
        }
    }
}

class Demand extends Behavior.Action<CatStats, GameState> {
    update = (c: CatStats, gs: GameState): Status => {
        if (c.hunger > 4) {
            console.log('the cat meows planitively at you. it seems like it wants something')
            return 'SUCCESS';
        } else {
            return 'FAILURE'
        }
    }
}

const maybeHiss = new Behavior.RandomSelector('maybe hiss', bt, [
    new DontHiss(),
    new DontHiss(),
    new DontHiss(),
    new DontHiss(),
    new Hiss()]);

const pokeHissSequence = new Behavior.Sequence('hiss sequence', bt, [new Hiss(),
new RaiseHackles(),
    new Lose()]);


const bx = new Behavior.RepeatUntilResult('repeat until game ends', bt,
    new Behavior.Selector<CatStats, GameState>('check win/lose conditions', bt,
        [new Win(),
            new Lose(),
            new Behavior.IfElse<CatStats, GameState>('hiss if annoyed', bt, [
                pokeHissSequence,
                new Behavior.Selector('purr or don\'t', bt, [
                    new Purr(),
                    maybeHiss
                ])],
                (c: CatStats, gs: GameState) => { return gs.lastAction === 'Poke'; }),
                maybeHiss
                ]), 'FAILURE')

const droop = new Cat('droop', "he's got droopy eyebrows and a big ole frown", bx, bt);

export default { droop }