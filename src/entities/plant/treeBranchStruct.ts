import { ITreeStruct } from "./ITreeStruct";
import Victor = require("victor");

export class TreeBranchStruct implements ITreeStruct {
	parent: ITreeStruct;
	left: ITreeStruct;
	right: ITreeStruct;
	node = new Victor(0, 1);
	depth: number;
	maxDepth: number;

	constructor(depth: number = 1, parent?: ITreeStruct, maxDepth: number = 5) {
		this.depth = depth
		this.parent = parent
		this.maxDepth = maxDepth
	}

	update = () => {
		if (this.node.magnitude() < 100)
		{
			const diff = 10
			const dir = this.node.direction();

			this.node.addScalarY(Math.sin(dir) * diff)
			this.node.addScalarX(Math.cos(dir) * diff)
		} else if (!this.left && this.depth < this.maxDepth)
		{
			this.left = new TreeBranchStruct(this.depth + 1, this, this.maxDepth)
			const angle = this.node.verticalAngleDeg()
			const newDirection = (Math.floor(angle));
			this.left.node.rotateDeg(newDirection)
		}

		this.left && this.left.update()
		this.right && this.right.update()
	};

}

const UP_DIRECTION = -90