import BugUI from "./renderers/bug/bug-ui";
import Plant from "../entities/plant/plant";
import Entity from "../entities/entity"
import Bug from "../entities/bug/bug"
import { UIEntity } from "../core/game-engine";
import EntityManager from "../core/entity-manager";
import { fixY } from "./canvas-helpers";
import bugRenderer from "./renderers/bug/bug-renderer";
import plantRenderer from "./renderers/tree/plant-renderer";

export interface GameUIOptions {
	target: string
	entityManager: EntityManager
}

export interface IGameUI {
	render: () => void
	togglePause: () => void
	updateUIEntities: () => void
	start: () => void
}

class CanvasUI implements IGameUI {
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	entityManager: EntityManager
	isPaused: boolean = false
	uiEntities: UIEntity[]
	frame: number = 0

	constructor(private options: GameUIOptions) {
	}

	public start = (): void => {
		this.canvas = (document.getElementById(this.options.target) as HTMLCanvasElement)
		this.ctx = this.canvas.getContext("2d")
		this.entityManager = this.options.entityManager

		this.beginLoop = this.beginLoop.bind(this)

		const entities = this.entityManager.getEntities()
		this.uiEntities = entities.map((entity) => {
			if (entity.type === "BUG")
			{
				return new BugUI(entity.id, (entity as Bug));
			}
			else return null;
		}).filter((entity) => entity !== null);

		this.beginLoop(0)
	}

	public render = (): void => {
		this.updateUIEntities()

		this.clear()
		this.entityManager.getEntities().forEach(entity => {
			this.renderEntity(entity)
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

	renderEntity(entity: Entity) {
		const ctx = this.ctx
		if (entity.type === "BUG")
		{
			bugRenderer(this.findUIEntity(entity), ctx)
		}
		else if (entity.type === "WALL")
		{
			const { pos, size } = entity
			ctx.save()
			ctx.translate(pos.x, fixY(ctx, pos.y))
			ctx.translate(0, -size.y)
			ctx.fillRect(0, 0, size.x, size.y)
			ctx.restore()
		}
		else if (entity instanceof Plant)
		{
			plantRenderer((entity as Plant), ctx)
		}
	}

	findUIEntity(entity: Entity) {
		let uiEntity = this.uiEntities.find(ui => ui.id == entity.id) as BugUI
		if (!uiEntity)
		{
			if (entity.type === "BUG")
			{
				uiEntity = new BugUI(entity.id, (entity as Bug))
				this.uiEntities.push(uiEntity)
			}
		}
		return uiEntity
	}
}

export default CanvasUI