import Entity, { EntityState } from "../entity"
import Victor from "victor"
import { BugMode } from "./bugConstants"
import { randBool } from "../../util"
import Tree, { ITreeStruct } from "../tree/tree"

export interface BugState extends EntityState {
	direction: Victor
	speed: number
	behaviorQueue: any
	mode: BugMode
	spontaneous: () => boolean
	climbingOn?: IClimbingOn
}

export interface IClimbingOn {
	tree: Tree
	branch: ITreeStruct
}

class Bug implements Entity {
	public type: string = "BUG"
	id: number
	state: BugState

	constructor(id?: number, initialState?: Partial<BugState>) {
		this.id = id ? id : 0

		this.state = Object.assign(
			{
				//Position: the front of the bug at foot level
				pos: new Victor(0, 0),
				size: new Victor(30, 20),
				direction: new Victor(1, 0),
				speed: 1,
				behaviorQueue: [],
				mode: BugMode.STOPPED,
				spontaneous: () => false
			}, initialState)
	}

	public update(inputs: Entity[] = []): Bug {
		if (this.state.climbingOn && this.state.mode === BugMode.WALKING)
		{
			this.climb()
		} else if (inputs.find(input => input.type === "TREE"))
		{
			const tree = (inputs.find(input => input.type === "TREE") as Tree)

			this.beginClimbing(tree)
		} else if (this.state.spontaneous())
		{
			randBool() ? this.turnAround() : this.changeMode()
		} else if (this.state.mode == BugMode.WALKING)
		{
			this.walk(inputs)
		}

		return this
	}

	private changeMode() {
		if (this.state.mode == BugMode.WALKING)
		{
			this.state.mode = BugMode.STOPPED
		} else
		{
			this.state.mode = BugMode.WALKING
		}
	}

	private walk(inputs?: Entity[]) {
		const {
			direction,
			speed
		} = this.state

		if (inputs && inputs.find(i => i.type === "WALL"))
		{
			this.turnAround()
		} else
		{
			this.state.pos.addScalarX(direction.x * speed)
			this.state.pos.addScalarY(direction.y * speed)
		}
	}

	private turnAround() {
		const subtractVector = this.state.direction.clone().norm().multiplyScalar(this.state.size.x)
		this.state.pos.subtract(subtractVector)
		this.state.direction.multiplyScalar(-1)
	}

	private beginClimbing(tree: Tree) {
		this.state.pos = new Victor(tree.state.pos.x, this.state.size.x)
		this.state.direction = new Victor(0, 1)
		this.state.climbingOn = {
			tree,
			branch: tree.state.graph
		}
	}

	private climb() {
		const branchPosition = this.state.climbingOn.tree.getAbsolutePos(this.state.climbingOn.branch)
		const branchOffset = this.state.pos.clone().subtract(branchPosition)

		const diffBetweenBranchAndDirection = Math.abs(this.state.climbingOn.branch.node.direction() - this.state.direction.direction())
		const isGoingDown = diffBetweenBranchAndDirection > 3
		if (isGoingDown)
		{
			const directionDelta = Math.abs(branchOffset.direction() - this.state.climbingOn.branch.node.direction())
			if (directionDelta > 0.3)
			{
				if (this.state.climbingOn.branch.parent)
				{
					this.state.climbingOn.branch = this.state.climbingOn.branch.parent
					this.state.pos = this.state.climbingOn.tree.getAbsolutePos(this.state.climbingOn.branch)
						.add(this.state.climbingOn.branch.node)
					this.state.direction = this.state.climbingOn.branch.node.clone().norm().multiplyScalar(-1)
				} else
				{
					this.state.climbingOn = undefined
					this.state.direction = new Victor(randBool() ? 1 : -1, 0)
				}
			}
		} else if (branchOffset.magnitude() >= this.state.climbingOn.branch.node.magnitude())
		{
			const nextBranch = randBool() && this.state.climbingOn.branch.left
				? this.state.climbingOn.branch.left
				: this.state.climbingOn.branch.right
					? this.state.climbingOn.branch.right
					: undefined

			if (nextBranch)
			{
				this.climbBranch(nextBranch)
			} else
			{
				this.turnAround()
			}
		}

		this.walk()
	}

	private climbBranch(branch: ITreeStruct) {
		this.state.climbingOn.branch = branch
		this.state.pos = this.state.climbingOn.tree.getAbsolutePos(branch)
			.add(
				new Victor(this.state.size.x / 3, 0).
					rotate(branch.node.direction())
			)
		this.state.direction = branch.node.clone().norm()
	}
}

export default Bug