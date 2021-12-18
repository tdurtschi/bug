import EntityUpdater from "./entity-updater";
import { IGameUI } from "./canvas-ui/canvas-ui"
import EntityManager, { IEntityManager } from "./entity-manager";
import Entity from "./entities/entity";
import Wall from "./entities/wall/wall";
import { generateId } from "./util/id-generator";
import Victor from "victor";
import Bug from "./entities/bug/bug";
import * as bugSerializer from "./entities/bug/bugSerializer"

export interface GameEngineOptions {
	gameUI: IGameUI
	entityManager: EntityManager
	height: number
	width: number
	initialState?: string
}

export interface Game {
	togglePause: () => void
	isPaused: boolean
	addEntity: (entity: Entity) => void
	getEntities: () => Entity[]
	start: () => void
	entityManager: IEntityManager
	width: number
	height: number
	exportCurrentState: () => string
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
		this.createInitialGameState(args.initialState);
	}

	public start() {
		setInterval(this.update, 17)
		this.gameUI.start()
	}

	public addEntity(entity: Entity) {
		this.entityManager.addEntity(entity)
	}


	public getEntities() {
		return this.entityManager.getEntities()
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

	createInitialGameState(initialState?: string) {
		if (initialState !== undefined) {
			const entities = rehydrateEntitiesFromString(initialState)
			entities.forEach((entity) => {
				console.log(entity)
				this.entityManager.addEntity(entity)
			})
		} else {
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

	exportCurrentState() {
		const entities = this.entityManager.getEntities()

		const entityData = entities
			.filter(entity => entity instanceof Bug)
			.map(bug => bugSerializer.toJson(bug as Bug))

		return JSON.stringify(entityData)
	};
}

function rehydrateEntitiesFromString(state: string): Entity[] {
	const entityData: any[] = JSON.parse(state)

	const entities = entityData
		.map((entity: any) => bugSerializer.fromJson(entity as string))

	return entities
}