import Entity from "../entities/entity";
import { IEntityManager } from "./entity-manager";

export default class EntityUpdater {
	frame: number = 0

	constructor(private entityManager: IEntityManager) { }

	update() {
		this.updateAllEntities()
		this.frame = this.frame + 1
	}

	public updateAllEntities() {
		const entities = this.entityManager.getEntities();
		entities.forEach(entity => {
			if (this.frame % 4 == 0 && entity.type == "BUG")
			{
				entity.update(this.getCollisions(entity, entities))
			}
			if (this.frame % 2 == 0 && entity.type == "TREE")
			{
				entity.update(this.getCollisions(entity, entities))
			}
		})
	}

	private getCollisions = (entity: Entity, otherEntities: Entity[]): Entity[] => {
		const state = entity.state;
		const collisions: Entity[] = [];
		otherEntities.forEach(function (obj) {
			const otherState = obj.state;
			if (otherState !== state &&
				otherState.pos.x < state.pos.x + state.size.x &&
				otherState.pos.x + otherState.size.x > state.pos.x &&
				otherState.pos.y < state.pos.y + state.size.y &&
				otherState.size.y + otherState.pos.y > state.pos.y)
			{
				collisions.push(obj);
			}
		});
		return collisions;
	};
}