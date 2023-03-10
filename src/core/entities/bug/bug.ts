import Entity, { EntityState } from "../entity"
import Victor from "victor"
import Plant from "../plant/plant"
import { ITreeStruct } from "../plant/ITreeStruct"
import { Subject } from "rxjs"
import { Pause } from "./behaviors/pause"
import { BugBehavior } from "./behaviors/BugBehavior"
import { GroundWalk } from "./behaviors/GroundWalk"
import { randInt, normalRange, randFromWeighted } from "../../util/stats"
import { Climb } from "./behaviors/climb"
import BugInstinct, { IBugInstinct } from "./behaviors/BugInstinct"

export interface BugState extends EntityState {
  direction: Victor
  speed: number
  climbingOn?: IClimbingOn
}

export interface IClimbingOn {
  plant: Plant
  branch: ITreeStruct
}

export const defaultState = () =>  ({
  //Position: the front of the bug at foot level
  pos: new Victor(0, 0),
  size: new Victor(51.2, 24),
  direction: new Victor(1, 0),
  speed: 1
})

class Bug implements Entity, BugState {
  bugInstinct: IBugInstinct = new BugInstinct()
  direction: Victor
  speed: number
  climbingOn?: IClimbingOn
  pos: Victor
  size: Victor
  id: number
  state: BugState
  updateSpeed: number = 4
  zIndexChanged: Subject<void> = new Subject<void>()
  behaviorQueue: BugBehavior[] = []

  constructor(id?: number, initialState?: Partial<BugState>) {
    this.id = id ? id : 0

    Object.assign(
      this,
      defaultState(),
      initialState
    )
  }

  public update(inputs: Entity[] = []): Bug {
    if (this.behaviorQueue && this.behaviorQueue.length > 0) {
      this.behaviorQueue[0].do(inputs)
    }

    if (this.behaviorQueue && this.behaviorQueue.length === 0) {
      const next = this.getNextBehavior()
      this.queueBehavior(next)
    }

    return this
  }

  getNextBehavior(): BugBehavior {
    if (this.climbingOn) {
      return new Climb(this)
    } else {
      return randFromWeighted([1, 3])
        ? new Pause(this, randInt(20, 40))
        : new GroundWalk(this, normalRange(60, 140))
    }
  }

  public queueBehavior = (behavior: BugBehavior) => {
    if (behavior === undefined) {
      throw new Error("Behavior Undefined")
    }

    this.behaviorQueue.push(behavior)
  }

  public finishBehavior() {
    this.behaviorQueue.shift()
  }
}

export default Bug
