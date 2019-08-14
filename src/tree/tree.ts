import Entity, {EntityState} from "../core/entity"
import Victor from "victor"

export interface TreeState extends EntityState{
	graph: ITreeStruct
}

export default class Tree implements Entity{
	id: number
	type: string = "TREE"
	state: TreeStateInternal
	
	constructor(id?: number, initialState?: Partial<TreeState>){
		this.id = id ? id : 0
		
		this.state = Object.assign(
			{
				pos: new Victor(1,0),
				size: new Victor(0, 0),
				direction: new Victor(1,0),
				graph: new TreeStruct()
			}, initialState)
	}
	
	public update = (input: any) => {
		this.updateGraph(this.state.graph)
	}

	public updateGraph = (root: TreeStruct): void => {
		const diff = (root.maxSize - root.node.y) / 100
		root.node.addScalarY(Math.sin(root.node.direction()) * diff)
		root.node.addScalarX(Math.cos(root.node.direction()) * diff)
		
		if(root.left == null && root.right == null && root.node.magnitude() > 50){
			root.left = new TreeStruct()
			root.left.node.rotateDeg(root.node.direction() + 60)
			root.right = new TreeStruct()
			root.right.node.rotateDeg(root.node.direction() - 60)
			console.log("branching!")
		}
		
		if(root.left != null){
			this.updateGraph(root.left)
		}
		if(root.right != null){
			this.updateGraph(root.right)
		}
	}
}
	
interface TreeStateInternal extends TreeState{
	graph: TreeStruct
}

export interface ITreeStruct{
	left: TreeStruct | null
	right: TreeStruct | null
	node: Victor
}

export class TreeStruct implements ITreeStruct{
	left: TreeStruct | null = null
	right: TreeStruct | null = null
	node = new Victor(0,1)
	maxSize: number = 100
}