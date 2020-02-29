import { BugBehavior } from "./BugBehavior";
import Bug from "../bug";
import Entity from "../../entity";
import { walk } from "./walk";
import Plant from "../../plant/plant";
import { turnAround } from "./turnAround";
import Victor = require("victor");
import { Climb } from "./climb";

export class GroundWalk extends BugBehavior {
	constructor(bug: Bug) {
		super(bug);
	}

	public do(inputs: Entity[]): void {
		if (inputs.find(input => input instanceof Plant))
		{
			const plant = (inputs.find(input => input instanceof Plant) as Plant)

			beginClimbing(this.bug, plant)
		}
		else if (inputs && inputs.find(i => i.type === "WALL"))
		{
			turnAround(this.bug)
		} else
		{

			walk(this.bug)
		}
	}
}

const beginClimbing = (bug: Bug, tree: Plant) => {
	bug.direction = tree.graph.node.clone().norm()
	bug.pos = new Victor(tree.pos.x, 0).add(bug.direction.clone().multiplyScalar(bug.size.x))
	bug.climbingOn = {
		tree,
		branch: tree.graph
	}

	bug.zIndexChanged.next()

	bug.finishBehavior()
	bug.queueBehavior(new Climb(bug))
}
