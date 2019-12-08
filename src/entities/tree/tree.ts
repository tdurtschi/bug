import Entity, { EntityState } from "../entity"
import Victor from "victor"

export interface TreeState extends EntityState {
	graph: ITreeStruct
}

export default class Tree implements Entity {
	id: number
	type: string = "TREE"
	state: TreeStateInternal

	constructor(id?: number, initialState?: Partial<TreeState>) {
		this.id = id ? id : 0

		this.state = Object.assign(
			{
				pos: new Victor(1, 0),
				size: new Victor(0, 0),
				direction: new Victor(1, 0),
				graph: new TreeStruct()
			}, initialState)
	}

	public update = (input: any) => {
		this.state.graph.update()
	}
}

interface TreeStateInternal extends TreeState {
	graph: TreeStruct
}

export interface ITreeStruct {
	left: TreeStruct | null
	right: TreeStruct | null
	node: Victor
	depth: number
	update: () => void
}

export class TreeStruct implements ITreeStruct {
	left: TreeStruct | null = null
	right: TreeStruct | null = null
	node = new Victor(0, 1)
	depth: number = 0
	maxSize: number
	branchFactor: number
	branchAngle: number
	growthFactor: number

	constructor(depth: number = 1) {
		this.depth = depth
		this.maxSize = range2(80, 5);
		this.branchFactor = range2(10, 10);
		this.branchAngle = range2(60, 25);
		this.growthFactor = rangeDecimal2(1.2, 0.2, 1);
	}

	update = () => {
		const diff = (this.maxSize - this.node.y * (Math.pow(this.depth, this.growthFactor))) / 100
		if (this.maxSize - this.node.y < (this.maxSize / 100)) { return }

		this.node.addScalarY(Math.sin(this.node.direction()) * diff)
		this.node.addScalarX(Math.cos(this.node.direction()) * diff)

		if (this.left == null && this.right == null && this.node.magnitude() > this.branchFactor && this.depth < 6)
		{
			this.left = new TreeStruct(this.depth + 1)
			this.left.node.rotateDeg(this.node.direction() + this.branchAngle)
			this.right = new TreeStruct(this.depth + 1)
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

const range = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

const rangeDecimal = (min: number, max: number, places: number) => {
	const multiplier = Math.pow(10, places)

	return range(min * multiplier, max * multiplier) / multiplier
}