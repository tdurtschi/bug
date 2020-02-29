import { BugBehavior } from "./BugBehavior";
import Entity from "../../entity";
import { walk } from "./walk";
import { turnAround } from "./turnAround";
import Bug from "../bug";
import { ITreeStruct } from "../../plant/ITreeStruct";
import { randBool } from "../../../util";
import Victor = require("victor");
import Plant from "../../plant/plant";

export class Climb extends BugBehavior {

	public do(): void {
		const bug = this.bug
		const currentBranch = bug.climbingOn.branch
		const branchPosition = bug.climbingOn.tree.getAbsolutePos(currentBranch)
		const branchOffset = bug.pos.clone().subtract(branchPosition)

		const diffBetweenBranchAndDirection = Math.abs(currentBranch.node.direction() - bug.direction.direction())
		const isGoingDown = diffBetweenBranchAndDirection > 3
		if (isGoingDown)
		{
			const directionDelta = Math.abs(branchOffset.direction() - currentBranch.node.direction())
			if (directionDelta > 0.3)
			{
				if (currentBranch.parent)
				{
					bug.climbingOn.branch = currentBranch.parent
					bug.pos = bug.climbingOn.tree.getAbsolutePos(bug.climbingOn.branch)
						.add(bug.climbingOn.branch.node)
					bug.direction = bug.climbingOn.branch.node.clone().norm().multiplyScalar(-1)
				} else
				{
					endClimbing(bug)
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
				climbBranch(bug, nextBranch)
			} else
			{
				turnAround(bug)
			}
		}

		walk(bug)
	}
}

export const beginClimbing = (bug: Bug, tree: Plant) => {
	bug.direction = tree.graph.node.clone().norm()
	bug.pos = new Victor(tree.pos.x, 0).add(bug.direction.clone().multiplyScalar(bug.size.x))
	bug.climbingOn = {
		tree,
		branch: tree.graph
	}

	bug.zIndexChanged.next()
}

const endClimbing = (bug: Bug) => {
	bug.direction = new Victor(randBool() ? 1 : -1, 0)
	const sizeOffset = bug.direction.x > 0
		? (bug.size.x + 1)
		: -(bug.size.x + 1)
	const newX = bug.climbingOn.tree.pos.x + sizeOffset
	bug.pos = new Victor(newX, bug.climbingOn.tree.pos.y)
	bug.climbingOn = undefined

	bug.zIndexChanged.next()
}

const climbBranch = (bug: Bug, branch: ITreeStruct, direction: Direction = Direction.UP) => {
	let offset: Victor;
	if (direction === Direction.UP)
	{
		offset = new Victor(bug.size.x / 3, 0)
			.rotate(branch.node.direction())
	} else
	{
		offset = branch.node
	}

	bug.climbingOn.branch = branch
	bug.pos = bug.climbingOn.tree
		.getAbsolutePos(branch)
		.add(offset)
	bug.direction = branch.node.clone()
		.norm()
		.multiplyScalar(direction === Direction.UP ? 1 : -1)
}

enum Direction { UP, DOWN }