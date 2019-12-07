import Entity from "../entities/entity";

export interface IEntityManager {
	getEntities: () => Entity[]
	addEntity: (entity: Entity) => void
}

export default class EntityManager implements IEntityManager {
	private entities: Entity[]
	constructor(entities: Entity[]) {
		this.entities = entities
	}

	public getEntities = () => this.entities;
	public addEntity = (entity: Entity) => {
		this.entities.push(entity)
	}
}