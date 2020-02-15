import { fixY } from "../../canvas-helpers"
import Plant from "../../../entities/plant/plant"
import { ITreeStruct } from "../../../entities/plant/ITreeStruct"
import { PlantagoStruct } from "../../../entities/plant/plantagoStruct"
const leafReference = require("./Leaf.png")
const leaf = new Image();
leaf.src = leafReference

export default (tree: Plant, ctx: CanvasRenderingContext2D) => {
	const { pos } = tree
	ctx.save()
	ctx.strokeStyle = "green";
	ctx.translate(pos.x, fixY(ctx, pos.y))
	renderTree(tree.graph, ctx)
	ctx.restore()
}

const renderTree = (root: ITreeStruct, ctx: CanvasRenderingContext2D) => {
	if (root instanceof PlantagoStruct)
	{
		renderPlantago(root, ctx)
	} else
	{
		const x = Math.floor(root.node.x),
			y = Math.floor(root.node.y)
		ctx.moveTo(0, 0)
		ctx.lineTo(x, -y)
		ctx.stroke()
		ctx.drawImage(leaf, 0, 0, 42, 182)

		ctx.save()
		ctx.translate(x, -y)
		if (root.left)
		{
			renderTree(root.left, ctx)
		}
		if (root.right)
		{
			renderTree(root.right, ctx)
		}
		ctx.restore()
	}
}

const renderPlantago = (root: ITreeStruct, ctx: CanvasRenderingContext2D) => {
	if (window.DEBUG)
	{
		ctx.moveTo(0, 0)
		ctx.lineTo(root.node.x, -root.node.y)
		ctx.stroke()
	}
	ctx.rotate(-root.node.angle() + Math.PI / 2)
	ctx.drawImage(leaf, -24, -173, 42, 178)
}