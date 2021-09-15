import { ITreeStruct } from "../ITreeStruct";
import Victor = require("victor");
import { normalRange } from "../../../util/stats";

export class PlantagoStruct implements ITreeStruct {
	parent: ITreeStruct;
	left: null;
	right: null;
	node: Victor;
	depth: number;
	maxDepth: number;

	constructor(depth: number = 1, parent?: ITreeStruct, maxDepth: number = 5, rotation?: number) {
		this.depth = depth
		this.parent = parent
		this.maxDepth = maxDepth
		this.node = new Victor(0, 160)
		this.node.rotateByDeg(rotation || normalRange(-30, -150))
	}

	update = () => {
	};
}