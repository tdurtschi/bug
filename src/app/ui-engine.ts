import Entity from "../entity"
import Bug from "../bug/bug"
import BugUIState from "../bug/bug-ui/bug-ui-state";
import EntityUpdater from "./entity-updater";

export interface BugUIOption {
	target: string
}

export interface UIEntity {
	id: number
	update: () => any
}

export class BugUI{
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	entities: Entity[]
	uiEntities: UIEntity[]
	x: number
	images: Array<HTMLImageElement>
	entityUpdater: EntityUpdater

	constructor(args: BugUIOption){
		this.canvas = (document.getElementById(args.target) as HTMLCanvasElement)
		this.ctx = this.canvas.getContext("2d")
		this.entities = [new Bug(0)]
		this.uiEntities = [new BugUIState(0)]
		this.entityUpdater = new EntityUpdater()
		this.beginLoop(0)
	}

	beginLoop(timeMs: number) {
		this.updateUIEntities(timeMs)
		this.render(this.entities)
		this.reQueue()
	}

	updateUIEntities(timeMs: number) { 
		const frame = this.getFrame(timeMs)
		this.entityUpdater.update(this.entities, frame)

		this.uiEntities.forEach(entity => {
			if(frame % 15 == 0){
				entity.update()
			}
		})
	}

	getFrame = (timeMs: number): number => Math.floor((timeMs / (16 + 2/3)))

	reQueue() {
		window.requestAnimationFrame((time) => this.beginLoop(time))
	}

	clear() {
		var ctx = this.ctx
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		ctx.rect(0,0, this.canvas.width, this.canvas.height)
		ctx.stroke()
	}

	public render = (entities: Entity[]): void => {
		this.clear()
		entities.forEach(entity => {
			const renderFn = this.getRendererFor(entity)
			renderFn()
		})
	}

	fixY(y: number){
		return this.canvas.height - y
	}

	getRendererFor(entity: Entity) {
		if(entity.type === "BUG") return () => {
				const bug = (entity as Bug)
				const uiBug = this.uiEntities.find(ui => ui.id == entity.id) as BugUIState
				const {pos, direction} = bug.state
				const {sizeX, sizeY} = {sizeX: 35, sizeY: 20}
				const image = uiBug.getImage()
				const ctx = this.ctx
				ctx.save()
				ctx.translate(pos.x,this.fixY(pos.y))
				ctx.translate(0, -sizeY)
				if(direction.x > 0) {
					ctx.scale(-1,1)
				}
				ctx.drawImage(image, 0, 0, sizeX, sizeY)
				ctx.restore()
		}
		else return (): void => null
	}
}

