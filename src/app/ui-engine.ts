import Entity from "../entity"
import Bug from "../bug/bug"
import BugUIState from "../bug/bug-ui/bug-ui-state";
import EntityUpdater from "./entity-updater";

export interface BugUIOption {
	target: string,
	entities: Entity[]
}

export interface UIEntity {
	id: number
	update: () => any
}

export interface UI{
	togglePause: () => void
}

export class BugUI implements UI{
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	entities: Entity[]
	uiEntities: UIEntity[]
	x: number
	images: Array<HTMLImageElement>
	entityUpdater: EntityUpdater
	isPaused: boolean = false
	frame: number = 0

	constructor(args: BugUIOption) {
		this.canvas = (document.getElementById(args.target) as HTMLCanvasElement)
		this.ctx = this.canvas.getContext("2d")
		this.entities = args.entities
		this.uiEntities = [new BugUIState(0)]
		this.entityUpdater = new EntityUpdater()
		this.beginLoop = this.beginLoop.bind(this)
		this.update = this.update.bind(this)
		this.beginLoop(0)
		setInterval(this.update, 17)
	}

	update() {
		this.frame = this.frame + 1
		if(!this.isPaused){
			this.updateUIEntities(this.frame)
		}
	}

	beginLoop(timeMs: number) {
		if(!this.isPaused){
			//this.updateUIEntities(timeMs)
			this.render(this.entities)
		}
		
		this.reQueue()
	}

	updateUIEntities(frame: number) {
		//const frame = this.getFrame(timeMs)
		this.entityUpdater.update(this.entities, frame)

		this.uiEntities.forEach(entity => {
			if (frame % 15 == 0) {
				entity.update()
			}
		})
	}

	getFrame = (timeMs: number): number => Math.floor((timeMs / (16 + 2 / 3)))

	reQueue() {
		window.requestAnimationFrame(this.beginLoop)
	}

	clear() {
		var ctx = this.ctx
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		ctx.rect(0, 0, this.canvas.width, this.canvas.height)
		ctx.stroke()
	}

	public render = (entities: Entity[]): void => {
		this.clear()
		entities.forEach(entity => {
			const renderFn = this.getRendererFor(entity)
			renderFn()
		})
	}

	fixY(y: number) {
		return this.canvas.height - y
	}

	getRendererFor(entity: Entity) {
		const ctx = this.ctx
		if (entity.type === "BUG") return () => {
			const uiBug = this.uiEntities.find(ui => ui.id == entity.id) as BugUIState
			const image = uiBug.getImage()
			
			const bug = (entity as Bug)
			const { pos, direction, size } = bug.state
			
			ctx.save()
			ctx.translate(pos.x, this.fixY(pos.y))
			ctx.translate(0, -size.y)
			if (direction.x > 0) {
				ctx.translate(size.x, 0)
				ctx.scale(-1, 1)
			}
			ctx.drawImage(image, 0, 0, size.x, size.y)
			ctx.restore()
		}
		else if (entity.type === "WALL") return () => {
			const {pos, size} = entity.state
			ctx.save()
			ctx.translate(pos.x, this.fixY(pos.y))
			ctx.translate(0, -size.y)
			ctx.fillRect(0, 0, size.x, size.y)
			ctx.restore()
		}
		else return (): void => null
	}

	public togglePause() {
		this.isPaused = !this.isPaused
		if(this.isPaused){
			console.log(this.entities)
		}
	}
}

