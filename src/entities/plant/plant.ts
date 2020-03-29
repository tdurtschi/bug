import Entity, { EntityState } from "../entity"
import Victor from "victor"
import { TreeStruct } from "./treeStruct"
import { ITreeStruct } from "./ITreeStruct"

export interface PlantState extends EntityState {
	graph: ITreeStruct
}

interface PlantStateInternal extends PlantState {
	graph: TreeStruct
}

export default class Plant implements Entity, PlantState {
	isAlive = false
	graph: TreeStruct
	pos: Victor
	size: Victor
	id: number
	state: PlantStateInternal
	updateSpeed: number = 4

	constructor(id?: number, initialState?: Partial<PlantState>) {
		this.id = id ? id : 0

		Object.assign(
			this,
			{
				pos: new Victor(1, 0),
				size: new Victor(1, 1),
				direction: new Victor(1, 0),
				graph: new TreeStruct()
			}, initialState)
	}

	public getAbsolutePos = (node: ITreeStruct, accumulator?: Victor, rootNode?: ITreeStruct): Victor => {
		if (!accumulator && !rootNode)
		{
			const result = this.getAbsolutePos(node, this.pos.clone(), this.graph)
			if (result) return result
			throw new Error("Couldn't find branch in tree while calculating position")
		} else if (rootNode === node)
		{
			return accumulator
		} else
		{
			const checkLeft = rootNode.left && this.getAbsolutePos(node, accumulator.clone().add(rootNode.node), rootNode.left)
			if (checkLeft) return checkLeft

			const checkRight = rootNode.right && this.getAbsolutePos(node, accumulator.clone().add(rootNode.node), rootNode.right)
			if (checkRight) return checkRight
		}
	}

	public update = (input: any) => {
		this.graph.update()
	}
}

