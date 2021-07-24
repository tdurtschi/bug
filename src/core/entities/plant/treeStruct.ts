import Victor = require("victor")
import { ITreeStruct } from "./ITreeStruct"

export class TreeStruct implements ITreeStruct {
	parent: ITreeStruct | null = null
	left: ITreeStruct | null = null
	right: ITreeStruct | null = null
	node = new Victor(0, 1)
	depth: number = 0
	maxDepth: number;
	maxSize: number
	branchFactor: number
	branchAngle: number
	growthFactor: number

	constructor(depth: number = 1, parent?: ITreeStruct, maxDepth = 6) {
		this.depth = depth
		this.maxDepth = maxDepth
		this.maxSize = range2(80, 5)
		this.branchFactor = range2(10, 10)
		this.branchAngle = range2(60, 25)
		this.growthFactor = rangeDecimal2(1.2, 0.2, 1)
		this.parent = parent
	}

	update = () => {
		const diff = (this.maxSize - this.node.y * (Math.pow(this.depth, this.growthFactor))) / 100
		if (this.maxSize - this.node.y < (this.maxSize / 100)) { return }

		this.node.addScalarY(Math.sin(this.node.direction()) * diff)
		this.node.addScalarX(Math.cos(this.node.direction()) * diff)

		if (this.left == null && this.right == null && this.node.magnitude() > this.branchFactor && this.depth < 6)
		{
			this.left = new TreeStruct(this.depth + 1, this)
			this.left.node.rotateDeg(this.node.direction() + this.branchAngle)
			this.right = new TreeStruct(this.depth + 1, this)
			this.right.node.rotateDeg(this.node.direction() - this.branchAngle)
		}

		this.updateLeft()
		this.updateRight()
	}

	updateLeft = () => this.left && this.left.update()
	updateRight = () => this.right && this.right.update()
}

const range2 = (mean: number, variance: number) => Math.floor(Math.random() * variance) + mean - (variance / 2);
const rangeDecimal2 = (mean: number, variance: number, places: number) => {
	const multiplier = Math.pow(10, places)

	return range2(mean * multiplier, variance * multiplier) / multiplier
}