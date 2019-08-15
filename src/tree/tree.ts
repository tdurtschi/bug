import Entity, { EntityState } from "../core/entity"
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
	maxSize: number = 100

	constructor(depth: number = 1) {
		this.depth = depth
	}

	update = () => {
		const diff = (this.maxSize - this.node.y * (Math.pow(this.depth, 1.2))) / 100
		this.node.addScalarY(Math.sin(this.node.direction()) * diff)
		this.node.addScalarX(Math.cos(this.node.direction()) * diff)

		if (this.left == null && this.right == null && this.node.magnitude() > 35 && this.depth < 4)
		{
			this.left = new TreeStruct(this.depth + 1)
			this.left.node.rotateDeg(this.node.direction() + 60)
			this.right = new TreeStruct(this.depth + 1)
			this.right.node.rotateDeg(this.node.direction() - 60)
		}

		this.updateLeft()
		this.updateRight()
	}

	updateLeft = () => this.left && this.left.update()
	updateRight = () => this.right && this.right.update()
}