import Tree, { TreeState } from "./tree";

export default class TreeFactory {
	constructor(
		private generateId: () => number,
		private spontaneous: () => boolean
	) { }

	build(initialState?: Partial<TreeState>): Tree {
		const newState = Object.assign({ spontaneous: this.spontaneous }, initialState);
		return new Tree(this.generateId(), newState);
	}
}