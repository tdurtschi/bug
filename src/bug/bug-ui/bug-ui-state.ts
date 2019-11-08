import { UIEntity } from "../../app/game-engine";

const weevil1 = require("./weevil1.png")
const weevil2 = require("./weevil2.png")

export default class BugUIState implements UIEntity {
	id: number
	imageIdx: number
	static images: HTMLImageElement[] = BugUIState.getBugImages()
	randomOffset: number

	constructor(id: number) {
		this.id = id
		this.imageIdx = 0
		this.randomOffset = Math.floor(Math.random() * 15);
	}

	public getImage() {
		return BugUIState.images[this.imageIdx]
	}

	public update(frame: number) {
		if ((frame + this.randomOffset) % 15 == 0)
		{
			this.imageIdx = (this.imageIdx + 1) % 2
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