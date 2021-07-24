import Entity from "./entities/entity";
import { IEntityManager } from "./entity-manager";
import Bug from "./entities/bug/bug";
import Victor = require("victor");

export default class EntityUpdater {
	frame: number = 0

	constructor(private entityManager: IEntityManager) { }

	update() {
		this.updateAllEntities()
		this.frame = this.frame + 1
	}

	public updateAllEntities() {
		const entities = this.entityManager.getEntities();
		entities.forEach((entity: Entity) => {
			if (entity.updateSpeed !== 0 && this.frame % entity.updateSpeed == 0) {
				entity.update(this.getCollisions(entity, entities))
			}
		})
	}

	private getCollisions = (entity: Entity, otherEntities: Entity[]): Entity[] => {
		const collisions: Entity[] = [];
		otherEntities.forEach((obj) => {
			if (this.isIntersecting(entity, obj)) {
				collisions.push(obj);
			}
		});
		return collisions;
	};

	private isIntersecting = (obj1: Entity, obj2: Entity): boolean => {
		let newPos: Victor;
		let newPos2: Victor;
		let newSize: Victor;
		let newSize2: Victor;
		if (obj1 instanceof Bug) {
			newSize = new Victor(2, 2)
		}
		if (obj2 instanceof Bug) {
			newSize2 = new Victor(2, 2)
		}

		if (obj1 instanceof Bug && (obj1 as Bug).direction.x > 0) {
			newPos = obj1.pos.clone().subtractScalarX(1)
		}
		if (obj2 instanceof Bug && (obj2 as Bug).direction.x > 0) {
			newPos2 = obj2.pos.clone().subtractScalarX(1)
		}

		const pos1 = newPos || obj1.pos;
		const size1 = newSize || obj1.size;
		const pos2 = newPos2 || obj2.pos;
		const size2 = newSize2 || obj2.size;
		if (obj2 !== obj1 &&
			pos2.x < pos1.x + size1.x &&
			pos2.x + size2.x > pos1.x &&
			pos2.y < pos1.y + size1.y &&
			size2.y + pos2.y > pos1.y) {
			return true;
		}
		return false;
	}
}