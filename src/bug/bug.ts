import Entity from "./entity"
import Victor from "victor"

interface BugState{
	pos: Victor
	direction: Victor
	speed: number
	behaviorQueue: any
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
				direction: new Victor(1,0),
				speed: 1,
				behaviorQueue: []
			}, initialState)
	}

	public update(inputs?: Entity[]): Bug {
		const {
			pos, 
			direction, 
			speed} = this.state

		if(inputs && inputs.find(i => i.type === "WALL"))
		{
			this.state.direction = direction.multiplyScalar(-1)
		}
		
		this.state.pos = pos.clone().add(direction.clone().multiplyScalar(speed))

		return this
	}
}

export default Bug