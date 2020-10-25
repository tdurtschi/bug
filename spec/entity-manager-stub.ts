import { IEntityManager } from "../src/core/entity-manager";
import Entity from "../src/entities/entity";

export const entityManagerStub: (entities: Entity[]) => IEntityManager =
	entities => ({
		getEntities: () => entities,
		addEntity: () => { },
		clearAll: () => { }
	})
