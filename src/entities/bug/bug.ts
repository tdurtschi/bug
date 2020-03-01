import Entity, { EntityState } from "../entity"
import Victor from "victor"
import { BugMode } from "./bugConstants"
import { randBool } from "../../util"
import Plant from "../plant/plant"
import { ITreeStruct } from "../plant/ITreeStruct"
import { Subject } from "rxjs"
import { turnAround } from "./behaviors/turnAround"
import { Pause } from "./behaviors/pause"
import { BugBehavior } from "./behaviors/BugBehavior"
import { GroundWalk } from "./behaviors/GroundWalk"

export interface BugState extends EntityState {
	direction: Victor
	speed: number
	mode: BugMode
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
	mode: BugMode
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
				mode: BugMode.STOPPED,
				spontaneous: () => false
			}, initialState)
	}

	public update(inputs: Entity[] = []): Bug {
		if (this.behaviorQueue && this.behaviorQueue.length > 0)
		{
			this.behaviorQueue[0].do(inputs)
		} else if (this.spontaneous())
		{
			randBool() ? turnAround(this) : this.changeMode()
		} else if (this.mode == BugMode.WALKING)
		{
			this.queueBehavior(new GroundWalk(this))
		} else
		{
			this.queueBehavior(new Pause(this, 100))
		}

		return this
	}

	public queueBehavior = (behavior: BugBehavior) => {
		this.behaviorQueue.push(behavior);
	}

	public finishBehavior() {
		this.behaviorQueue.shift()
	}

	private changeMode() {
		if (this.mode == BugMode.WALKING)
		{
			this.mode = BugMode.STOPPED
		} else
		{
			this.mode = BugMode.WALKING
		}
	}
}

export default Bug