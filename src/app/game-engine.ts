import Entity from "../core/entity"
import BugUIState from "../bug/bug-ui/bug-ui-state";
import EntityUpdater from "./entity-updater";
import GameUI from "./game-ui"

export interface BugUIOption {
	target: string,
	entities: Entity[]
}

export interface UIEntity {
	id: number
	update: () => any
}

export interface Game {
	togglePause: () => void
}

export class GameEngine implements Game {
	gameUI: GameUI
	entities: Entity[]
	uiEntities: UIEntity[]
	x: number
	images: Array<HTMLImageElement>
	entityUpdater: EntityUpdater
	isPaused: boolean = false
	frame: number = 0

	constructor(args: BugUIOption) {
		this.gameUI = new GameUI(args)
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
		if (!this.isPaused)
		{
			this.updateUIEntities(this.frame)
		}
	}

	beginLoop(timeMs: number) {
		if (!this.isPaused)
		{
			this.gameUI.render(this.entities, this.uiEntities)
		}

		this.reQueue()
	}

	updateUIEntities(frame: number) {
		this.entityUpdater.update(this.entities, frame)

		this.uiEntities.forEach(entity => {
			if (frame % 15 == 0)
			{
				entity.update()
			}
		})
	}

	getFrame = (timeMs: number): number => Math.floor((timeMs / (16 + 2 / 3)))

	reQueue() {
		window.requestAnimationFrame(this.beginLoop)
	}

	public togglePause() {
		this.isPaused = !this.isPaused
		if (this.isPaused)
		{
			console.log(this.entities)
		}
	}
}

