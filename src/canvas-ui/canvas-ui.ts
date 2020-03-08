import BugUI from "./renderers/bug/bug-ui";
import Plant from "../entities/plant/plant";
import Entity from "../entities/entity"
import Bug from "../entities/bug/bug"
import { UIEntity } from "./ui-entity";
import EntityManager from "../core/entity-manager";
import bugRenderer from "./renderers/bug/bug-renderer";
import plantRenderer from "./renderers/tree/plant-renderer";
import Wall from "../entities/wall/wall";
import { wallRenderer } from "./renderers/wall/wall-renderer";

export interface GameUIOptions {
	target: string
	entityManager: EntityManager
}

export interface IGameUI {
	render: () => void
	togglePause: () => void
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