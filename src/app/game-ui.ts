import BugUIState from "../bug/bug-ui/bug-ui-state";
import Tree, { ITreeStruct } from "../tree/tree";
import Entity from "../core/entity"
import Bug from "../bug/bug"
import { UIEntity, BugUIOption } from "./game-engine";

class GameUI {
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	x: number
	images: Array<HTMLImageElement>
	frame: number = 0

	constructor(args: BugUIOption) {
		console.log("I'm not null!")
		this.canvas = (document.getElementById(args.target) as HTMLCanvasElement)
		this.ctx = this.canvas.getContext("2d")
	}

	public render = (entities: Entity[], uiEntities: UIEntity[]): void => {
		this.clear()
		entities.forEach(entity => {
			const renderFn = this.getRendererFor(entity, uiEntities)
			renderFn()
		})
	}

	clear() {
		var ctx = this.ctx
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		ctx.rect(0, 0, this.canvas.width, this.canvas.height)
		ctx.stroke()
	}

	fixY(y: number) {
		return this.canvas.height - y
	}

	getRendererFor(entity: Entity, uiEntities: UIEntity[]) {
		const ctx = this.ctx
		if (entity.type === "BUG") return () => {
			const uiBug = uiEntities.find(ui => ui.id == entity.id) as BugUIState
			const image = uiBug.getImage()

			const bug = (entity as Bug)
			const { pos, direction, size } = bug.state

			ctx.save()
			ctx.translate(pos.x, this.fixY(pos.y))
			ctx.translate(0, -size.y)
			if (direction.x > 0)
			{
				ctx.translate(size.x, 0)
				ctx.scale(-1, 1)
			}
			ctx.drawImage(image, 0, 0, size.x, size.y)
			ctx.restore()
		}
		else if (entity.type === "WALL") return () => {
			const { pos, size } = entity.state
			ctx.save()
			ctx.translate(pos.x, this.fixY(pos.y))
			ctx.translate(0, -size.y)
			ctx.fillRect(0, 0, size.x, size.y)
			ctx.restore()
		}
		else if (entity.type === "TREE") return () => {
			const { pos, size } = entity.state
			const tree = (entity as Tree).state.graph
			ctx.save()
			ctx.translate(pos.x, this.fixY(pos.y))
			this.renderTree(tree, ctx)
			ctx.restore()
		}
		else return (): void => null
	}

	renderTree(root: ITreeStruct, ctx: CanvasRenderingContext2D) {
		ctx.moveTo(0, 0)
		ctx.lineTo(Math.floor(root.node.x), Math.floor(-root.node.y))
		ctx.stroke()

		ctx.translate(root.node.x, -root.node.y)
		if (root.left)
		{
			this.renderTree(root.left, ctx)
		}
		if (root.right)
		{
			this.renderTree(root.right, ctx)
		}
		ctx.translate(-root.node.x, root.node.y)
	}
}

export default GameUI