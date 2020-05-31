import Plant from "../entities/plant/plant";
import Entity from "../entities/entity"
import Bug from "../entities/bug/bug"
import { IEntityManager } from "../core/entity-manager";
import bugRenderer from "./renderers/bug/bug-renderer";
import plantRenderer from "./renderers/tree/plant-renderer";
import Wall from "../entities/wall/wall";
import { wallRenderer } from "./renderers/wall/wall-renderer";
import { clearCanvas } from "./canvas-helpers";

export interface IGameUI {
	togglePause: () => void
	start: () => void
}

class CanvasUI implements IGameUI {
	ctx: CanvasRenderingContext2D
	isPaused: boolean = false
	frame: number = 0

	constructor(
		private target: string,
		private entityManager: IEntityManager) {
	}

	public start = (): void => {
		const canvas = this.createCanvas();
		this.ctx = canvas.getContext("2d")

		this.beginLoop = this.beginLoop.bind(this)

		this.beginLoop(0)
	}

	public render = (): void => {
		clearCanvas(this.ctx)
		this.entityManager.getEntities().forEach(entity => {
			this.renderEntity(entity, this.ctx)
		})
	}

	public togglePause = (): void => {
		this.isPaused = !this.isPaused;
	}

	beginLoop(timeMs: number) {
		if (!this.isPaused) {
			this.render()
		}

		window.requestAnimationFrame(this.beginLoop)
	}

	createCanvas() {
		const container = document.querySelector(this.target) as HTMLDivElement

		const canvas = document.createElement("canvas");
		canvas.height = container.clientHeight
		canvas.width = container.clientWidth
		container.appendChild(canvas)

		return canvas
	}

	renderEntity(entity: Entity, ctx: CanvasRenderingContext2D) {
		if (entity instanceof Bug) {
			bugRenderer(entity as Bug, ctx)
		}
		else if (entity instanceof Wall) {
			wallRenderer((entity as Wall), ctx)
		}
		else if (entity instanceof Plant) {
			plantRenderer((entity as Plant), ctx)
		}
	}
}

export default CanvasUI