import Entity, { EntityState } from "../entity";
import Victor from "victor"

class Wall implements Entity, EntityState {
	isAlive = false;
	pos: Victor;
	size: Victor;
	public id = 0
	public state: EntityState
	updateSpeed: 0

	constructor(id?: number, initialState?: Partial<EntityState>) {
		this.id = id ? id : 0

		Object.assign(
			this,
			{
				pos: new Victor(0, 0),
				size: new Victor(10, 50)
			}, initialState)
	}

	public update() {

	}
}

export default Wall