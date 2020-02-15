import Tree, { TreeState } from "./tree";
import { TreeBranchStruct } from "./treeBranchStruct";
import { randBool, randFromNormalDist } from "../../util";
import { TreeStruct } from "./treeStruct";
import { PlantagoStruct } from "./plantagoStruct";

export default class TreeFactory {
	constructor(
		private generateId: () => number,
		private spontaneous: () => boolean
	) { }

	build(initialState?: Partial<TreeState>): Tree {
		const newState = Object.assign({
			spontaneous: this.spontaneous,
			graph: new PlantagoStruct(),
		}, initialState);
		return new Tree(this.generateId(), newState);
	}
}