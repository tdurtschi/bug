import Entity from "../entity";

export default class EntityUpdater {
	public update(entities: Entity[], frame: number) {
		entities.forEach(entity => {
			if (frame % 4 == 0) {
				entity.update(this.getCollisions(entity, entities))
			}
		})
	}

	private getCollisions = (entity: Entity, otherEntities: Entity[]): Entity[]  => {
		const state = entity.state;
		const collisions: Entity[] = [];
		otherEntities.forEach(function (obj) {
			const otherState = obj.state;
			if (otherState !== state &&
				otherState.pos.x < state.pos.x + state.size.x &&
				otherState.pos.x + otherState.size.x > state.pos.x &&
				otherState.pos.y < state.pos.y + state.size.y &&
				otherState.size.y + otherState.pos.y > state.pos.y) {
				collisions.push(obj);
			}
		});
		return collisions;
	};
}