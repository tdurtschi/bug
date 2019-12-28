// Builds trees (used for testing)
import { ITreeStruct } from "./tree"
import Victor = require("victor")

export default class TreeBuilder {
	private static defaultNode: ITreeStruct = {
		depth: 0,
		update: () => null,
		left: null,
		right: null,
		node: new Victor(0, 0)
	}

	private leftBranch: ITreeStruct | undefined
	private rightBranch: ITreeStruct | undefined
	private nodeVector: Victor

	public left = (left: Partial<ITreeStruct>) => {
		this.leftBranch = Object.assign({}, TreeBuilder.defaultNode, left)
		return this
	}

	public right = (right: Partial<ITreeStruct>) => {
		this.rightBranch = Object.assign({}, TreeBuilder.defaultNode, right)
		return this
	}

	public node = (x: number, y: number) => {
		this.nodeVector = new Victor(x, y)
		return this
	}

	public build = (): ITreeStruct => {
		const tree: ITreeStruct = {
			...TreeBuilder.defaultNode,
			node: this.nodeVector || new Victor(0, 0),
			left: this.leftBranch,
			right: this.rightBranch
		}

		return tree
	}
}

