import Entity, { EntityState } from "../entity"
import Victor from "victor"
import Plant from "../plant/plant"
import { ITreeStruct } from "../plant/ITreeStruct"
import { Subject } from "rxjs"
import { TurnAround } from "./behaviors/turnAround"
import { Pause } from "./behaviors/pause"
import { BugBehavior } from "./behaviors/BugBehavior"
import { GroundWalk } from "./behaviors/GroundWalk"
import { randBool, randInt, normalRange, randChance, randFromWeighted } from "../../util"
import { Climb } from "./behaviors/climb"

export interface BugState extends EntityState {
	direction: Victor
	speed: number
	spontaneous: () => boolean
	climbingOn?: IClimbingOn
}

export interface IClimbingOn {
	plant: Plant
	branch: ITreeStruct
}

class Bug implements Entity, BugState {
	direction: Victor
	speed: number
	spontaneous: () => boolean
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
			{
				//Position: the front of the bug at foot level
				pos: new Victor(0, 0),
				size: new Victor(30, 20),
				direction: new Victor(1, 0),
				speed: 1,
				behaviorQueue: [],
				spontaneous: () => false
			}, initialState)

		this.queueBehavior(new Pause(this, randInt(25, 40)));
	}

	public update(inputs: Entity[] = []): Bug {
		if (this.spontaneous()) {
			this.queueBehavior(new TurnAround(this))
		}

		if (this.behaviorQueue && this.behaviorQueue.length > 0) {
			this.behaviorQueue[0].do(inputs)
		} else {
			const next = this.getNextBehavior()
			next.do(inputs)
			this.queueBehavior(next)
		}

		return this
	}

	public getNextBehavior(): BugBehavior {
		const currentBehavior = this.behaviorQueue[0]
		if (!currentBehavior) {

			return this.climbingOn ? new Climb(this)
				: randBool() ? new Pause(this, randInt(20, 40))
					: new GroundWalk(this, normalRange(60, 140))
		}

		if (currentBehavior instanceof Climb) {
			const action = randFromWeighted([294, 5, 1])
			if (action == 0) {
				return undefined
			} else if (action == 1) {
				return new Pause(this, randInt(20, 50))
			} else {
				return new TurnAround(this)
			}
		}
	}

	public queueBehavior = (behavior: BugBehavior) => {
		this.behaviorQueue.push(behavior);
	}

	public finishBehavior() {
		this.behaviorQueue.shift()
	}
}

export default Bug