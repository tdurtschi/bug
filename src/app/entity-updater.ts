import Entity from "../entity";

export default class EntityUpdater{
	public update(entities: Entity[], frame: number){
		entities.forEach(entity => {
			if(frame % 4 == 0){
				entity.update()
			}
		})
	}
}