// Builds trees (used for testing)
import Victor = require("victor")
import { ITreeStruct } from "../ITreeStruct"

export default class TreeBuilder {
	private static defaultNode: ITreeStruct = {
		depth: 0,
		parent: null,
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

		if (tree.left) tree.left.parent = tree
		if (tree.right) tree.right.parent = tree

		return tree
	}
}

