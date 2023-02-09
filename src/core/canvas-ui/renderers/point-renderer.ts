import Point from "../../entities/point"
import { circle, fixY } from "../canvas-helpers"

export const pointRenderer = (entity: Point, ctx: CanvasRenderingContext2D) => {
	const { pos, size } = entity
	ctx.save()
	ctx.translate(pos.x, fixY(ctx.canvas.height, pos.y))
    circle(ctx, entity.size.magnitude())
	ctx.restore()
}