import IfElse from './CompositeNodes/IfElse.ts'
import RandomSelector from './CompositeNodes/RandomSelector.ts'
import Selector from './CompositeNodes/Selector.ts'
import Sequence from './CompositeNodes/Sequence.ts'
import AlwaysSucceed from './Decorators/AlwaysSucceed.ts'
import Inverter from './Decorators/Inverter.ts'
import Repeater from './Decorators/Repeater.ts'
import RepeatOnResult from './Decorators/RepeatOnResult.ts'
import RepeatUntilResult from './Decorators/RepeatUntilResult.ts'
import BehaviorTree from './BehaviorTree.ts'
import Action from './Behavior.ts'

const bx = {
    IfElse,
    RandomSelector,
    Selector,
    Sequence,
    AlwaysSucceed,
    Inverter,
    Repeater,
    RepeatOnResult,
    RepeatUntilResult,
    BehaviorTree,
    Action
}

export default bx