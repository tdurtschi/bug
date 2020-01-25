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
		const collisions: Entity[] = [];
		otherEntities.forEach((obj) => {
			if (obj !== entity &&
				obj.pos.x < entity.pos.x + entity.size.x &&
				obj.pos.x + obj.size.x > entity.pos.x &&
				obj.pos.y < entity.pos.y + entity.size.y &&
				obj.size.y + obj.pos.y > entity.pos.y)
			{
				collisions.push(obj);
			}
		});
		return collisions;
	};
}