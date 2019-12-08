import Bug, { BugState } from "./bug";


export default class BugFactory {
	constructor(
		private idGenerator: () => number,
		private spontaneous: () => boolean
	) { }

	build(initialState?: Partial<BugState>): Bug {
		const newState = Object.assign({ spontaneous: this.spontaneous }, initialState);
		return new Bug(this.idGenerator(), newState);
	}
}