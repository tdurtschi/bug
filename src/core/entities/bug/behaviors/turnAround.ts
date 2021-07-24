import Bug from "../bug"
import { BugBehavior } from "./BugBehavior"

// export const turnAround = (bug: Bug) => {
// 	const subtractVector = bug.direction.clone().norm().multiplyScalar(bug.size.x + 1)
// 	bug.pos.subtract(subtractVector)
// 	bug.direction.multiplyScalar(-1)
// }

export class TurnAround extends BugBehavior {
	constructor(
		bug: Bug,
	) {
		super(bug);
	}

	public do() {
		const bug = this.bug

		const subtractVector = bug.direction.clone().norm().multiplyScalar(bug.size.x + 1)
		bug.pos.subtract(subtractVector)
		bug.direction.multiplyScalar(-1)

		bug.finishBehavior()
	};
}