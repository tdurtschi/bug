import Bug, { BugState } from "./bug";
import Victor = require("victor");
import { randInt } from "../../util";


export default class BugFactory {
	constructor(
		private generateId: () => number,
		private spontaneous: () => boolean
	) { }

	build(initialState?: Partial<BugState>): Bug {
		const newState = Object.assign({
			spontaneous: this.spontaneous,
			direction: new Victor(randInt(-5, 5), randInt(-5, 5)).norm()
		}, initialState);
		return new Bug(this.generateId(), newState);
	}
}