import Entity, { EntityState } from "../entity"
import Victor from "victor"
import {BugMode} from "./bugConstants"

interface BugState extends EntityState{
	direction: Victor
	speed: number
	behaviorQueue: any
	mode: BugMode
}

class Bug implements Entity{
	public type: string = "BUG"
	id: number
	state: BugState

	constructor(id?: number, initialState?: Partial<BugState>){
		this.id = id ? id : 0

		this.state = Object.assign(
			{
				pos: new Victor(0,0),
				size: new Victor(30, 20),
				direction: new Victor(1,0),
				speed: 1,
				behaviorQueue: [],
				mode: BugMode.WALKING
			}, initialState)
	}

	public update(inputs?: Entity[]): Bug {
		if(this.state.mode == BugMode.WALKING){
			this.walk(inputs)
		}

		return this
	}

	private walk(inputs?: Entity[]){
		const {
			pos, 
			direction, 
			speed
		} = this.state

		if(inputs && inputs.find(i => i.type === "WALL"))
		{
			this.state.direction = direction.multiplyScalar(-1)
		}
		
		this.state.pos = pos.clone().add(direction.clone().multiplyScalar(speed))
	}
}

export default Bug