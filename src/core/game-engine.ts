import EntityUpdater from "./entity-updater";
import { IGameUI } from "./canvas-ui/canvas-ui"
import EntityManager, { IEntityManager } from "./entity-manager";
import Entity from "./entities/entity";
import Wall from "./entities/wall/wall";
import { generateId } from "./util/id-generator";
import Victor from "victor";
import Bug, { BugState } from "./entities/bug/bug";
import * as bugSerializer from "./entities/bug/bugSerializer"
import { PlantState } from "./entities/plant/plant";
import PlantFactory from "./entities/plant/plantFactory";
import BugFactory from "./entities/bug/bugFactory";

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
	addPlant: (initialState?: Partial<PlantState>) => void
	addBug: (initialState?: Partial<BugState> | {size?: number}) => void
	getEntities: () => Entity[]
	start: () => void
	width: number
	height: number
	exportCurrentState: () => string
	setSpeed: (speed: number) => void
}

export class GameEngine implements Game {
	public isPaused: boolean = false
	public height: number
	public width: number
	entityManager: IEntityManager
	gameUI: IGameUI
	entityUpdater: EntityUpdater
	frame: number = 0
	private plantFactory: PlantFactory;
	private bugFactory: BugFactory;
	private updateHandle: NodeJS.Timer;

	constructor(args: GameEngineOptions) {
		this.gameUI = args.gameUI
		this.entityManager = args.entityManager // wtf? The game should manage its own entities maybe?
		this.height = args.height
		this.width = args.width
		this.plantFactory = new PlantFactory(generateId, this.width);
		this.bugFactory = new BugFactory(generateId, this.width);

		this.entityUpdater = new EntityUpdater(args.entityManager)
		this.createInitialGameState(args.initialState);
	}

	public start() {
		this.updateHandle = setInterval(this.update, calculateUpdatePeriodMs(100));
		this.gameUI.start()
	}

	public addBug(initialState?: Partial<BugState & Entity> & {size?: number}){
		this.entityManager.addEntity(this.bugFactory.build(initialState));
	}

	public addPlant(initialState?: Partial<PlantState & Entity>) {
		this.entityManager.addEntity(this.plantFactory.build(initialState));
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
	
	public setSpeed(speed: number){
		clearInterval(this.updateHandle);
		this.updateHandle = setInterval(this.update, calculateUpdatePeriodMs(speed));
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

function calculateUpdatePeriodMs(gameSpeed: number) {
	// if speed = 100, update 60fps
	// if speed = 0, update 0fps
	const framesPerSecond = gameSpeed * 6 / 10;
	// if(framesPerSecond == 0) return 0;

	const updatePeriod = Math.ceil(1000 / framesPerSecond);
	return updatePeriod;
}