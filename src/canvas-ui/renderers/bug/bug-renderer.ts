import BugUI from "./bug-ui"
import { fixY, circle } from "../../canvas-helpers"
import Victor = require("victor")
import Bug from "../../../entities/bug/bug";

const bugUIs: BugUI[] = [];

const createNewBug = (bug: Bug) => {
	const bugUI = new BugUI(bug.id, bug)
	bugUIs[bug.id] = bugUI
	return bugUI
}

const getUIBug = (bug: Bug) => {
	return bugUIs[bug.id] || createNewBug(bug)
}

export default (bug: Bug, ctx: CanvasRenderingContext2D) => {
	const uiBug = getUIBug(bug)
	uiBug.update()
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
	} else
	{
		const newDir = direction.clone().multiplyScalarX(-1)

		ctx.rotate(newDir.angle())
	}

	ctx.drawImage(
		uiBug.getImage(),
		0, -size.y + climbingYOffset,
		size.x, size.y
	)

	ctx.restore()
}