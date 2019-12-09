import Bug, { BugState } from "./bug";


export default class BugFactory {
	constructor(
		private generateId: () => number,
		private spontaneous: () => boolean
	) { }

	build(initialState?: Partial<BugState>): Bug {
		const newState = Object.assign({ spontaneous: this.spontaneous }, initialState);
		return new Bug(this.generateId(), newState);
	}
}