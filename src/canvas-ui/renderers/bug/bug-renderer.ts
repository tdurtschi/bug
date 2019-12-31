import BugUI from "./bug-ui"
import { fixY } from "../../canvas-helpers"
import Victor = require("victor")
import { BugMode } from "../../../entities/bug/bugConstants"

export default (uiBug: BugUI, ctx: CanvasRenderingContext2D) => {
	const bug = uiBug.bug
	const image = uiBug.getImage()
	const climbingYOffset = bug.state.mode === BugMode.CLIMBING ? 2.5 : 0
	const { direction, size } = bug.state

	const pos = new Victor(bug.state.pos.x, fixY(ctx, bug.state.pos.y))

	ctx.save()
	ctx.translate(pos.x, pos.y)

	if (direction.x > 0)
	{
		ctx.rotate(-direction.angle())
		ctx.scale(-1, 1)
		ctx.drawImage(image, 0, -size.y + climbingYOffset, size.x, size.y)
	} else
	{
		const newDir = direction.clone().multiplyScalarX(-1)

		ctx.rotate(newDir.angle())
		ctx.drawImage(image, 0, -size.y + climbingYOffset, size.x, size.y)
	}

	ctx.restore()
}

// Draws a circle at 0,0. Useful for debugging bug rendering
const circle = (ctx: CanvasRenderingContext2D, size: number) => {
	ctx.beginPath();
	ctx.arc(0, 0, size, 0, 2 * Math.PI, false);
	ctx.fillStyle = "rgb(0, 0, 255)";
	ctx.fill();
}