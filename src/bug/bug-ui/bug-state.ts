const weevil1 = require("./weevil1.png")
const weevil2 = require("./weevil2.png")

export default class BugUIState{
	id: number
	framePointer: number
	static images: HTMLImageElement[] = BugUIState.getBugImages()

	constructor(id: number){
		this.id = id
		this.framePointer = 0
	}
	
	public getImage(){
		return BugUIState.images[this.framePointer]
	}

	public update(){
		this.framePointer = (this.framePointer + 1) % 2
	}

	private static getBugImages(){
		const images = [
			new Image(),
			new Image(),
		]
		images[0].src = weevil1
		images[1].src = weevil2

		return images
	}
}