import BugUI from "./bug-ui"
import { fixY } from "../../canvas-helpers"

export default (uiBug: BugUI, ctx: CanvasRenderingContext2D) => {
	const bug = uiBug.bug
	const image = uiBug.getImage()

	const { pos, direction, size } = bug.state

	ctx.save()
	ctx.translate(pos.x, fixY(ctx, pos.y))
	ctx.translate(0, -size.y)
	if (direction.x > 0)
	{
		ctx.translate(size.x, 0)
		ctx.scale(-1, 1)
	}
	ctx.drawImage(image, 0, 0, size.x, size.y)
	ctx.restore()
}