import Entity, { EntityState } from "../core/entity";
import Victor from "victor"

class Wall implements Entity{
	public id = 0
	public type = "WALL"
	public state: EntityState

	constructor(id?: number, initialState?: Partial<EntityState>){
		this.id = id ? id : 0

		this.state = Object.assign(
			{
				pos: new Victor(0,0),
				size: new Victor(10, 50)
			}, initialState)
	}

	public update(){

	}
}

export default Wall