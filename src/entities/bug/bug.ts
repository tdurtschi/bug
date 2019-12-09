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
				pos: new Victor(0, 0), // What part of the bug does this coordinate refer to?
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
			this.changeMode()
		}

		if (this.state.mode == BugMode.WALKING)
		{
			this.walk(inputs)
		}

		return this
	}

	private changeMode() {
		if (randBool())
		{
			if (this.state.mode == BugMode.WALKING)
			{
				this.state.mode = BugMode.STOPPED
			} else
			{
				this.state.mode = BugMode.WALKING
			}
		} else
		{
			this.state.direction.multiplyScalar(-1)
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
			direction.multiplyScalar(-1)
		}

		this.state.pos.addScalarX(direction.x * speed)
		this.state.pos.addScalarY(direction.y * speed)
	}
}

export default Bug