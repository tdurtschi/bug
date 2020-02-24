import { ITreeStruct } from "./ITreeStruct";
import Victor = require("victor");
import { PlantagoStruct } from "./plantagoStruct";
import { randInt, randBool, normalRange } from "../../util";

export class PlantagoBushStruct implements ITreeStruct {
	left: ITreeStruct | null;
	right: ITreeStruct | null;
	node: Victor;

	constructor(
		public depth: number = 1,
		public parent: ITreeStruct | null = null,
		private maxDepth: number = 4,
		private flip: boolean = false,
		private angle: number = 0,
		private nodeLength: number = 40
	) {
		if (depth == 1)
		{
			this.flip = randBool()
			this.maxDepth = randInt(5, 10)
			this.angle = normalRange(-15, 15)
			this.nodeLength = normalRange(30, 60)
		}

		this.node = new Victor(0, 1).multiplyScalar(this.nodeLength)
		this.node.rotateByDeg((this.flip ? -80 : -100) + this.angle)

		if (depth < maxDepth)
		{
			this.left = this.flip ? this.branch() : this.leaf()
			this.right = this.flip ? this.leaf() : this.branch()
		} else
		{
			this.left = this.leaf()
		}
	}

	private branch = () => new PlantagoBushStruct(this.depth + 1, this, this.maxDepth, !this.flip, this.angle, this.nodeLength)
	private leaf = () => new PlantagoStruct(this.depth + 1, this, this.maxDepth, (this.flip ? -30 : -160) + randInt(-15, 15) + this.angle)

	update = () => {
	};
}