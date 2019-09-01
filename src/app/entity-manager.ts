import { UIEntity } from "./game-engine";
import Entity from "../core/entity";

export interface IEntityManager {
	getEntities: () => Entity[]
	getUIEntities: () => UIEntity[]
}

export default class EntityManager implements IEntityManager {
	entities: Entity[] // TODO Make private
	uiEntities: UIEntity[] // TODO make private
	constructor(entities: Entity[], uiEntities: UIEntity[]) {
		this.entities = entities
		this.uiEntities = uiEntities
	}

	public getEntities = () => this.entities
	public getUIEntities = () => this.uiEntities;
}