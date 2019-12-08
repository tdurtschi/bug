import BugUIState from "../entities/bug/bug-ui/bug-ui-state";
import Tree, { ITreeStruct } from "../entities/tree/tree";
import Entity from "../entities/entity"
import Bug from "../entities/bug/bug"
import { UIEntity } from "../core/game-engine";
import EntityManager from "../core/entity-manager";

export interface GameUIOptions {
	target: string
	entityManager: EntityManager
}

export interface IGameUI {
	render: () => void
	togglePause: () => void
	updateUIEntities: () => void
}

class CanvasUI implements IGameUI {
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	entityManager: EntityManager
	isPaused: boolean = false
	uiEntities: UIEntity[]
	frame: number = 0

	constructor(args: GameUIOptions) {
		this.canvas = (document.getElementById(args.target) as HTMLCanvasElement)
		this.ctx = this.canvas.getContext("2d")
		this.entityManager = args.entityManager

		this.beginLoop = this.beginLoop.bind(this)

		const entities = this.entityManager.getEntities()
		this.uiEntities = entities.map((entity) => {
			if (entity.type === "BUG")
			{
				return new BugUIState(entity.id, (entity as Bug));
			}
			else return null;
		}).filter((entity) => entity !== null);

		this.beginLoop(0)
	}

	public render = (): void => {
		this.updateUIEntities()

		this.clear()
		this.entityManager.getEntities().forEach(entity => {
			const renderFn = this.getRendererFor(entity)
			renderFn()
		})
	}

	public togglePause = (): void => {
		this.isPaused = !this.isPaused;
	}

	public updateUIEntities = (): void => {
		this.frame++
		this.uiEntities.forEach(entity => {
			entity.update(this.frame)
		})
	}

	beginLoop(timeMs: number) {
		if (!this.isPaused)
		{
			this.render()
		}

		window.requestAnimationFrame(this.beginLoop)
	}

	clear() {
		var ctx = this.ctx
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		ctx.rect(0, 0, this.canvas.width, this.canvas.height)
		ctx.beginPath()
	}

	fixY(y: number) {
		return this.canvas.height - y
	}

	getRendererFor(entity: Entity) {
		const ctx = this.ctx
		if (entity.type === "BUG") return () => {
			const uiBug = this.findUIEntity(entity) // TODO Needs Error handling
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
			ctx.strokeStyle = "green";
			ctx.translate(pos.x, this.fixY(pos.y))
			this.renderTree(tree, ctx)
			ctx.restore()
		}
		else return (): void => null
	}

	renderTree(root: ITreeStruct, ctx: CanvasRenderingContext2D) {
		const x = Math.floor(root.node.x),
			y = Math.floor(root.node.y)
		ctx.moveTo(0, 0)
		ctx.lineTo(x, -y)
		ctx.stroke()

		ctx.save()
		ctx.translate(x, -y)
		if (root.left)
		{
			this.renderTree(root.left, ctx)
		}
		if (root.right)
		{
			this.renderTree(root.right, ctx)
		}
		ctx.restore()
	}

	findUIEntity(entity: Entity) {
		let uiEntity = this.uiEntities.find(ui => ui.id == entity.id) as BugUIState
		if (!uiEntity)
		{
			if (entity.type === "BUG")
			{
				uiEntity = new BugUIState(entity.id, (entity as Bug))
				this.uiEntities.push(uiEntity)
			}
		}
		return uiEntity
	}
}

export default CanvasUI