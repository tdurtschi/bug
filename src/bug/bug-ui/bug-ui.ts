import Entity from "../entity"
import Bug from "../bug"
import BugUIState from "./bug-state";

export interface BugUIOption {
	target: string;
}

export class BugUI{
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	entities: Entity[]
	uiEntities: [{id: number, update: () => any}]
	x: number
	images: Array<HTMLImageElement>

	constructor(args: BugUIOption){
		this.canvas = (document.getElementById(args.target) as HTMLCanvasElement)
		this.ctx = this.canvas.getContext("2d")
		this.entities = [new Bug(0)]
		this.uiEntities = [new BugUIState(0)]
		this.beginLoop()
		this.x = 240
	}

	beginLoop() {
		this.entities.forEach(entity => entity.update())
		this.uiEntities.forEach(entity => entity.update())
		this.render(this.entities)
		this.reQueue()
	}

	reQueue() {
		window.requestAnimationFrame(() => this.beginLoop())
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
				const {pos, direction} = bug.state;
				const {sizeX, sizeY} = {sizeX: 40, sizeY: 40};
				const image = uiBug.getImage()
				const ctx = this.ctx
				ctx.save();
				ctx.translate( pos.x+sizeX/2,this.fixY(pos.y)-sizeY/2 );
				if(direction.x > 0) {
					ctx.scale(-1,1);
				}
				ctx.rotate(direction.angle());
				ctx.drawImage(image, -sizeX/2, -sizeY/2);
				ctx.restore();
		}
		else return (): void => null
	}
}

