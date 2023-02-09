import Entity, { EntityState } from "./entity";
import Victor from "victor"

class Point implements Entity, EntityState {
	pos: Victor;
	size: Victor;
	public state: EntityState
	updateSpeed: 0

	constructor(public id: number, initialState: EntityState) {
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

export default Point;