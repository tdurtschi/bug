import { UIEntity } from "../../../core/game-engine";
import Bug from "../../../entities/bug/bug";
import { BugMode } from "../../../entities/bug/bugConstants";

const weevil1 = require("./weevil1.png")
const weevil2 = require("./weevil2.png")

export default class BugUI implements UIEntity {
	imageIdx: number
	static images: HTMLImageElement[] = BugUI.getBugImages()
	randomOffset: number

	constructor(
		public id: number,
		private bug: Bug) {
		this.imageIdx = 0
		this.randomOffset = Math.floor(Math.random() * 15);
	}

	public getImage() {
		return BugUI.images[this.imageIdx]
	}

	public update(frame: number) {
		if (this.bug.mode == BugMode.WALKING)
		{
			if ((frame + this.randomOffset) % 15 == 0)
			{
				this.imageIdx = (this.imageIdx + 1) % 2
			}
		}
	}

	private static getBugImages() {
		const images = [
			new Image(),
			new Image(),
		]
		images[0].src = weevil1
		images[1].src = weevil2

		return images
	}
}