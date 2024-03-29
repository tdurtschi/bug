import { UIEntity } from "../../ui-entity";
import Bug from "../../../entities/bug/bug";
import { randInt } from "../../../util/stats";
import { Pause } from "../../../entities/bug/behaviors/pause";

const FRAMES_BETWEEN_STEPS = 25;

export default class BugUI implements UIEntity {
	imageIdx: number
	static images: HTMLImageElement[] = BugUI.getBugImages()
	randomOffset: number
	frame = 0

	constructor(
		public id: number,
		public bug: Bug) {
		this.imageIdx = 0
		this.randomOffset = randInt(0, 15);
	}

	public getImage() {
		return BugUI.images[this.imageIdx]
	}

	public update() {
		if (this.bug.behaviorQueue[0] && !(this.bug.behaviorQueue[0] instanceof Pause))
		{
			if ((this.frame++ + this.randomOffset) % FRAMES_BETWEEN_STEPS == 0)
			{
				this.imageIdx = (this.imageIdx + 1) % 2
			}
		}
	}

	private static getBugImages() {
		const weevil1 = require("./weevil1.png")
		const weevil2 = require("./weevil2.png")

		const images = [
			new Image(),
			new Image(),
		]
		images[0].src = weevil1
		images[1].src = weevil2

		return images
	}
}