import EntityUpdater from "./entity-updater";
import { IGameUI } from "../canvas-ui/canvas-ui"
import EntityManager, { IEntityManager } from "./entity-manager";
import Entity from "../entities/entity";
import Wall from "../entities/wall/wall";
import { generateId } from "./id-generator";
import Victor from "victor";
import Bug from "../entities/bug/bug";
import * as bugSerializer from "../entities/bug/bugSerializer"
import { IGameState } from "../persistence/gameStateRepository";

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
	exportCurrentState: () => IGameState
	loadFromState: (state: IGameState) => void
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
		this.entityManager = args.entityManager // wtf? The game should manage its own entities maybe?
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

	loadFromState(gameState: IGameState) {
		this.entityManager.clearAll()
		const entities = rehydrateEntitiesFromString(gameState.state)
		entities.forEach((entity) => {
			this.entityManager.addEntity(entity)
		})
	}

	exportCurrentState() {
		const entities = this.entityManager.getEntities()

		const entityData = entities
			.filter(entity => entity instanceof Bug)
			.map(bug => bugSerializer.toJson(bug as Bug))

		return {
			id: 0,
			state: JSON.stringify(entityData)
		}
	}

	private createInitialGameState() {
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

function rehydrateEntitiesFromString(state: string): Entity[] {
	const entityData: any[] = JSON.parse(state)

	const entities = entityData
		.map((entity: any) => bugSerializer.fromJson(entity as string))

	return entities
}