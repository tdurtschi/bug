import Entity, { EntityState } from "../entity"
import Victor from "victor"
import { BugMode } from "./bugConstants"
import { randBool } from "../../util"

export interface BugState extends EntityState {
	direction: Victor
	speed: number
	behaviorQueue: any
	mode: BugMode
	spontaneous: () => boolean
}

class Bug implements Entity {
	public type: string = "BUG"
	id: number
	state: BugState

	constructor(id?: number, initialState?: Partial<BugState>) {
		this.id = id ? id : 0

		this.state = Object.assign(
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

	public update(inputs?: Entity[]): Bug {
		if (this.state.spontaneous())
		{
			randBool() ? this.turnAround() : this.changeMode()
		}

		if (this.state.mode == BugMode.WALKING)
		{
			this.walk(inputs)
		}

		return this
	}

	private changeMode() {
		if (this.state.mode == BugMode.WALKING)
		{
			this.state.mode = BugMode.STOPPED
		} else
		{
			this.state.mode = BugMode.WALKING
		}
	}

	private walk(inputs?: Entity[]) {
		const {
			pos,
			direction,
			speed
		} = this.state

		if (inputs && inputs.find(i => i.type === "WALL"))
		{
			this.turnAround()
		} else
		{
			this.state.pos.addScalarX(direction.x * speed)
			this.state.pos.addScalarY(direction.y * speed)
		}
	}

	private turnAround() {
		console.log("Innitial position:", this.state.pos)
		const subtractVector = this.state.direction.clone().norm().multiplyScalar(this.state.size.x)
		console.log(subtractVector)
		console.log("^^^^^^^^^^^")
		this.state.pos.subtract(subtractVector)
		this.state.direction.multiplyScalar(-1)
	}
}

export default Bug