import EntityUpdater from "./entity-updater";
import { IGameUI } from "../canvas-ui/canvas-ui"
import EntityManager, { IEntityManager } from "./entity-manager";
import Entity from "../entities/entity";
import Wall from "../entities/wall/wall";
import { generateId } from "./id-generator";
import Victor from "victor";

export interface GameEngineOptions {
	gameUI: IGameUI
	entityManager: EntityManager
	height: number
	width: number
}

export interface Game {
	togglePause: () => void
	isPaused: boolean
	addEntity: (entity: Entity) => void
	start: () => void
	entityManager: IEntityManager
	width: number
	height: number
}

export class GameEngine implements Game {
	public isPaused: boolean = false
	public entityManager: IEntityManager
	public height: number
	public width: number
	gameUI: IGameUI
	entityUpdater: EntityUpdater
	frame: number = 0

	constructor(args: GameEngineOptions) {
		this.gameUI = args.gameUI
		this.entityManager = args.entityManager
		this.height = args.height
		this.width = args.width

		this.entityUpdater = new EntityUpdater(args.entityManager)
		this.createInitialGameState();
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

		if (this.isPaused && window.DEBUG) {
			console.log(this.entityManager.getEntities())
		}
	}

	update = () => {
		if (!this.isPaused) {
			this.entityUpdater.update()
		}
	}

	createInitialGameState() {
		this.entityManager.addEntity(
			new Wall(generateId(), {
				pos: new Victor(-10, 0),
				size: new Victor(10, this.height),
			}))
		this.entityManager.addEntity(
			new Wall(generateId(), {
				pos: new Victor(this.width, 0),
				size: new Victor(10, this.height),
			})
		)
	}
}

