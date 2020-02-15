import BugUI from "./bug-ui"
import { fixY, circle } from "../../canvas-helpers"
import Victor = require("victor")

export default (uiBug: BugUI, ctx: CanvasRenderingContext2D) => {
	const bug = uiBug.bug
	const image = uiBug.getImage()
	const climbingYOffset = bug.climbingOn ? 3 : 0
	const { direction, size } = bug

	const pos = new Victor(bug.pos.x, fixY(ctx, bug.pos.y))

	ctx.save()
	ctx.translate(pos.x, pos.y)
	window.DEBUG && circle(ctx, 5)
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