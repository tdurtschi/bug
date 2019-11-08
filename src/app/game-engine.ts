import EntityUpdater from "./entity-updater";
import { IGameUI } from "./game-ui"
import EntityManager, { IEntityManager } from "./entity-manager";
import Entity from "../core/entity";

export interface GameEngineOptions {
	gameUI: IGameUI
	entityManager: EntityManager
}

export interface UIEntity {
	id: number
	update: () => any
}

export interface Game {
	togglePause: () => void
	addEntity: (entity: Entity) => void
}

export class GameEngine implements Game {
	gameUI: IGameUI
	entityManager: IEntityManager
	entityUpdater: EntityUpdater
	isPaused: boolean = false
	frame: number = 0

	constructor(args: GameEngineOptions) {
		this.gameUI = args.gameUI
		this.entityManager = args.entityManager

		this.entityUpdater = new EntityUpdater()
		this.update = this.update.bind(this)
		setInterval(this.update, 17)
	}

	update() {
		this.frame = this.frame + 1
		if (!this.isPaused)
		{
			this.updateAllEntities(this.frame)
		}
	}

	updateAllEntities(frame: number) {
		this.entityUpdater.update(this.entityManager.getEntities(), frame)
		if (frame % 15 == 0)
		{
			this.gameUI.updateUIEntities()
		}
	}

	public addEntity(entity: Entity) {
		this.entityManager.addEntity(entity)
	}

	public togglePause() {
		this.isPaused = !this.isPaused
		this.gameUI.togglePause()

		if (this.isPaused)
		{
			console.log(this.entityManager.getEntities())
		}
	}
}

