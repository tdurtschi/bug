import Wall from "../../../entities/wall/wall"
import { fixY } from "../../canvas-helpers"

export const wallRenderer = (entity: Wall, ctx: CanvasRenderingContext2D) => {
	const { pos, size } = entity
	ctx.save()
	ctx.translate(pos.x, fixY(ctx, pos.y))
	ctx.translate(0, -size.y)
	ctx.fillRect(0, 0, size.x, size.y)
	ctx.restore()
}