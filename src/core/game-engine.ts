import EntityUpdater from "./entity-updater";
import { IGameUI } from "../canvas-ui/canvas-ui"
import EntityManager, { IEntityManager } from "./entity-manager";
import Entity from "../entities/entity";

export interface GameEngineOptions {
	gameUI: IGameUI
	entityManager: EntityManager
}

export interface UIEntity {
	id: number
	update: (frame: number) => any
}

export interface Game {
	togglePause: () => void
	isPaused: boolean
	addEntity: (entity: Entity) => void
	start: () => void
	entityManager: IEntityManager
}

export class GameEngine implements Game {
	public isPaused: boolean = false
	public entityManager: IEntityManager
	gameUI: IGameUI
	entityUpdater: EntityUpdater
	frame: number = 0

	constructor(args: GameEngineOptions) {
		this.gameUI = args.gameUI
		this.entityManager = args.entityManager

		this.entityUpdater = new EntityUpdater(args.entityManager)
	}

	public start() {
		setInterval(this.update, 17)
		this.gameUI.start()
	}

	public addEntity(entity: Entity) {
		this.entityManager.addEntity(entity)
	}

	public togglePause() {
		this.isPaused = !this.isPaused
		this.gameUI.togglePause()

		if (this.isPaused && window.DEBUG)
		{
			console.log(this.entityManager.getEntities())
		}
	}

	update = () => {
		if (!this.isPaused)
		{
			this.entityUpdater.update()
		}
	}
}

