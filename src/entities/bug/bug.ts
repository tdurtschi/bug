import Entity, { EntityState } from "../entity"
import Victor from "victor"
import { BugMode } from "./bugConstants"
import { randBool } from "../../util"
import Plant from "../plant/plant"
import { ITreeStruct } from "../plant/ITreeStruct"

export interface BugState extends EntityState {
	direction: Victor
	speed: number
	behaviorQueue: any
	mode: BugMode
	spontaneous: () => boolean
	climbingOn?: IClimbingOn
}

export interface IClimbingOn {
	tree: Plant
	branch: ITreeStruct
}

class Bug implements Entity, BugState {
	direction: Victor
	speed: number
	behaviorQueue: any
	mode: BugMode
	spontaneous: () => boolean
	climbingOn?: IClimbingOn
	pos: Victor
	size: Victor
	public type: string = "BUG"
	id: number
	state: BugState
	updateSpeed: number = 4

	constructor(id?: number, initialState?: Partial<BugState>) {
		this.id = id ? id : 0

		Object.assign(
			this,
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
		if (this.isClimbing())
		{
			this.climb()
		} else if (inputs.find(input => input.type === "TREE"))
		{
			const tree = (inputs.find(input => input.type === "TREE") as Plant)

			this.beginClimbing(tree)
		} else if (this.spontaneous())
		{
			randBool() ? this.turnAround() : this.changeMode()
		} else if (this.mode == BugMode.WALKING)
		{
			this.walk(inputs)
		}

		return this
	}

	private changeMode() {
		if (this.mode == BugMode.WALKING)
		{
			this.mode = BugMode.STOPPED
		} else
		{
			this.mode = BugMode.WALKING
		}
	}

	private walk(inputs?: Entity[]) {
		const {
			direction,
			speed,
			pos
		} = this

		if (inputs && inputs.find(i => i.type === "WALL"))
		{
			this.turnAround()
		} else
		{
			pos.addScalarX(direction.x * speed)
			pos.addScalarY(direction.y * speed)
		}
	}

	private turnAround() {
		const subtractVector = this.direction.clone().norm().multiplyScalar(this.size.x + 1)
		this.pos.subtract(subtractVector)
		this.direction.multiplyScalar(-1)
	}

	private climb() {
		const currentBranch = this.climbingOn.branch
		const branchPosition = this.climbingOn.tree.getAbsolutePos(currentBranch)
		const branchOffset = this.pos.clone().subtract(branchPosition)

		const diffBetweenBranchAndDirection = Math.abs(currentBranch.node.direction() - this.direction.direction())
		const isGoingDown = diffBetweenBranchAndDirection > 3
		if (isGoingDown)
		{
			const directionDelta = Math.abs(branchOffset.direction() - currentBranch.node.direction())
			if (directionDelta > 0.3)
			{
				if (currentBranch.parent)
				{
					this.climbingOn.branch = currentBranch.parent
					this.pos = this.climbingOn.tree.getAbsolutePos(this.climbingOn.branch)
						.add(this.climbingOn.branch.node)
					this.direction = this.climbingOn.branch.node.clone().norm().multiplyScalar(-1)
				} else
				{
					this.endClimbing()
				}
			}
		} else if (branchOffset.magnitude() >= currentBranch.node.magnitude())
		{
			const nextBranch = randBool() && currentBranch.left
				? currentBranch.left
				: currentBranch.right
					? currentBranch.right
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


	private beginClimbing(tree: Plant) {
		this.direction = tree.graph.node.clone().norm()
		this.pos = new Victor(tree.pos.x, 0).add(this.direction.clone().multiplyScalar(this.size.x))
		this.climbingOn = {
			tree,
			branch: tree.graph
		}
	}

	private endClimbing() {
		this.direction = new Victor(randBool() ? 1 : -1, 0)
		const newX = this.climbingOn.tree.pos.x + (this.direction.x > 0 ? (this.size.x + 1) : -(this.size.x + 1))
		this.pos = new Victor(newX, this.climbingOn.tree.pos.y)
		this.climbingOn = undefined
	}

	private climbBranch(branch: ITreeStruct, direction: Direction = Direction.UP) {
		let offset: Victor;
		if (direction === Direction.UP)
		{
			offset = new Victor(this.size.x / 3, 0)
				.rotate(branch.node.direction())
		} else
		{
			offset = branch.node
		}

		this.climbingOn.branch = branch
		this.pos = this.climbingOn.tree
			.getAbsolutePos(branch)
			.add(offset)
		this.direction = branch.node.clone()
			.norm()
			.multiplyScalar(direction === Direction.UP ? 1 : -1)
	}

	private isClimbing = () => this.climbingOn && this.mode === BugMode.WALKING
}

enum Direction { UP, DOWN }

export default Bug