import Plant from "../entities/plant/plant";
import Entity from "../entities/entity"
import Bug from "../entities/bug/bug"
import { IEntityManager } from "../entity-manager";
import bugRenderer from "./renderers/bug/bug-renderer";
import plantRenderer from "./renderers/tree/plant-renderer";
import Wall from "../entities/wall/wall";
import { wallRenderer } from "./renderers/wall/wall-renderer";
import { clearCanvas, fixY } from "./canvas-helpers";
import { generateId } from "../util/id-generator";
import Victor from "victor";
import Point from "../entities/point";
import { pointRenderer } from "./renderers/point-renderer";

export interface IGameUI {
	togglePause: () => void
	start: () => void
}

class CanvasUI implements IGameUI {
	ctx: CanvasRenderingContext2D
	isPaused: boolean = false
	frame: number = 0
	lastClickX: number | undefined;
	lastClickY: number | undefined;

	constructor(
		private target: string,
		private entityManager: IEntityManager) {
	}

	public start = (): void => {
		const canvas = this.createCanvas();
		canvas.addEventListener("click", (e) => this.onCanvasClick(e));
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
		} else if (entity instanceof Point) {
			pointRenderer((entity as Point), ctx)
		}
	}

	onCanvasClick(e: any) {
		const {x, y} = {x: e.x - 200, y: e.y};
		const newY = fixY(this.ctx.canvas.height, y);
		if(this.lastClickX) {
			console.log("Diff from last click:")
			console.log({x: x - this.lastClickX, y: newY - this.lastClickY})
		}
		console.log({x, y: newY});
		this.entityManager.addEntity(new Point(generateId(), {pos: new Victor(x + 200, newY), size: new Victor(3, 3)}));
		this.lastClickX = x;
		this.lastClickY = newY;
	}
}

export default CanvasUI