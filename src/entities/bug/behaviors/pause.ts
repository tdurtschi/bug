import Bug from "../bug";
import { BugBehavior } from "./BugBehavior";

export class Pause extends BugBehavior {
	constructor(
		bug: Bug,
		private countdown: number,
	) {
		super(bug);
	}

	public do() {
		this.countdown--

		if (this.countdown == 0)
		{
			this.bug.finishBehavior()
		}
	};
}