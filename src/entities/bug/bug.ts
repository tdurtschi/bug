import Entity, { EntityState } from "../entity"
import Victor from "victor"
import Plant from "../plant/plant"
import { ITreeStruct } from "../plant/ITreeStruct"
import { Subject } from "rxjs"
import { TurnAround } from "./behaviors/turnAround"
import { Pause } from "./behaviors/pause"
import { BugBehavior } from "./behaviors/BugBehavior"
import { GroundWalk } from "./behaviors/GroundWalk"
import { randBool, randInt, normalRange } from "../../util"

export interface BugState extends EntityState {
	direction: Victor
	speed: number
	spontaneous: () => boolean
	climbingOn?: IClimbingOn
}

export interface IClimbingOn {
	tree: Plant
	branch: ITreeStruct
}

class Bug implements Entity, BugState {
	direction: Victor
	speed: number
	spontaneous: () => boolean
	climbingOn?: IClimbingOn
	pos: Victor
	size: Victor
	public type: string = "BUG"
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
		if (this.spontaneous())
		{
			this.queueBehavior(new TurnAround(this))
		}

		if (this.behaviorQueue && this.behaviorQueue.length > 0)
		{
			this.behaviorQueue[0].do(inputs)
		} else
		{
			const next = this.getNextBehavior()
			next.do(inputs)
			this.queueBehavior(next)
		}

		return this
	}

	private getNextBehavior(): BugBehavior {
		return randBool() ? new Pause(this, randInt(20, 40)) : new GroundWalk(this, normalRange(60, 140))
	}

	public queueBehavior = (behavior: BugBehavior) => {
		this.behaviorQueue.unshift(behavior);
	}

	public finishBehavior() {
		this.behaviorQueue.shift()
	}
}

export default Bug