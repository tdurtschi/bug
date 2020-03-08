import Plant from "../entities/plant/plant";
import Entity from "../entities/entity"
import Bug from "../entities/bug/bug"
import { IEntityManager } from "../core/entity-manager";
import bugRenderer from "./renderers/bug/bug-renderer";
import plantRenderer from "./renderers/tree/plant-renderer";
import Wall from "../entities/wall/wall";
import { wallRenderer } from "./renderers/wall/wall-renderer";

export interface IGameUI {
	render: () => void
	togglePause: () => void
	start: () => void
}

class CanvasUI implements IGameUI {
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	isPaused: boolean = false
	frame: number = 0

	constructor(
		private target: string,
		private entityManager: IEntityManager) {
	}

	public start = (): void => {
		this.createCanvas();

		this.ctx = this.canvas.getContext("2d")

		this.beginLoop = this.beginLoop.bind(this)

		this.beginLoop(0)
	}

	public render = (): void => {
		this.clearCanvas()
		this.entityManager.getEntities().forEach(entity => {
			this.renderEntity(entity)
		})
	}

	public togglePause = (): void => {
		this.isPaused = !this.isPaused;
	}

	beginLoop(timeMs: number) {
		if (!this.isPaused)
		{
			this.render()
		}

		window.requestAnimationFrame(this.beginLoop)
	}

	createCanvas() {
		const container = document.getElementById(this.target) as HTMLDivElement

		this.canvas = document.createElement("canvas");
		this.canvas.height = container.clientHeight
		this.canvas.width = container.clientWidth
		container.appendChild(this.canvas)
	}

	clearCanvas() {
		var ctx = this.ctx
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		ctx.rect(0, 0, this.canvas.width, this.canvas.height)
		ctx.beginPath()
	}

	renderEntity(entity: Entity) {
		if (entity instanceof Bug)
		{
			bugRenderer(entity as Bug, this.ctx)
		}
		else if (entity instanceof Wall)
		{
			wallRenderer((entity as Wall), this.ctx)
		}
		else if (entity instanceof Plant)
		{
			plantRenderer((entity as Plant), this.ctx)
		}
	}
}

export default CanvasUI