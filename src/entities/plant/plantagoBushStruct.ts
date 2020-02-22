import { ITreeStruct } from "./ITreeStruct";
import Victor = require("victor");
import { PlantagoStruct } from "./plantagoStruct";
import { randInt } from "../../util";

export class PlantagoBushStruct implements ITreeStruct {
	parent: ITreeStruct;
	left: ITreeStruct | null;
	right: ITreeStruct | null;
	node: Victor;
	depth: number;
	maxDepth: number;
	flip: boolean;

	constructor(depth: number = 1, parent?: ITreeStruct, maxDepth: number = 35) {
		this.flip = depth % 2 === 0
		this.node = new Victor(0, 8)
		this.depth = depth
		this.parent = parent
		this.maxDepth = maxDepth
		this.node.rotateByDeg(this.flip ? -80 : -100)

		if (depth < maxDepth)
		{
			this.left = this.getNextBranch(this.flip)
			this.right = this.getNextBranch(!this.flip)
		}
	}

	getNextBranch = (bool: boolean): ITreeStruct =>
		bool
			? new PlantagoBushStruct(this.depth + 1, this, this.maxDepth)
			: new PlantagoStruct(this.depth + 1, this, this.maxDepth, (this.flip ? -30 : -160) + randInt(-15, 15))


	update = () => {
	};
}