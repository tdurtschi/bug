import { BugBehavior } from "./BugBehavior";
import Bug from "../bug";
import Entity from "../../entity";
import { walk } from "./walk";
import Plant from "../../plant/plant";
import { TurnAround } from "./turnAround";
import Victor = require("victor");
import { Climb } from "./climb";
import Wall from "../../wall/wall";

export class GroundWalk extends BugBehavior {
	constructor(
		bug: Bug,
		private countdown: number = 1,
	) {
		super(bug);
	}

	public do(inputs: Entity[]): void {
		if (inputs.find(input => input instanceof Plant))
		{
			const plant = (inputs.find(input => input instanceof Plant) as Plant)

			beginClimbing(this.bug, plant)
		}
		else if (inputs && inputs.find(i => i instanceof Wall))
		{
			new TurnAround(this.bug).do()
		} else
		{
			walk(this.bug)
		}

		this.countDown()
	}

	private countDown() {
		this.countdown--

		if (this.countdown == 0)
		{
			this.bug.finishBehavior()
		}
	};
}


const beginClimbing = (bug: Bug, tree: Plant) => {
	bug.direction = tree.graph.node.clone().norm()
	bug.pos = new Victor(tree.pos.x, 0).add(bug.direction.clone().multiplyScalar(bug.size.x))
	bug.climbingOn = {
		plant: tree,
		branch: tree.graph
	}

	bug.zIndexChanged.next()

	bug.finishBehavior()
	bug.queueBehavior(new Climb(bug))
}
