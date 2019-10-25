import { UIEntity } from "./game-engine";
import Entity from "../core/entity";

export interface IEntityManager {
	getEntities: () => Entity[]
	getUIEntities: () => UIEntity[]
	addEntity: (entity: Entity) => void
}

export default class EntityManager implements IEntityManager {
	private entities: Entity[]
	private uiEntities: UIEntity[]
	constructor(entities: Entity[], uiEntities: UIEntity[]) {
		this.entities = entities
		this.uiEntities = uiEntities
	}

	public getEntities = () => this.entities
	public getUIEntities = () => this.uiEntities;
	public addEntity = (entity: Entity) => this.entities.push(entity);
}