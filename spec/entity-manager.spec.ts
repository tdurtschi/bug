import Entity from "../src/core/entity";
import Bug from "../src/bug/bug";
import { UIEntity } from "../src/app/game-engine";
import EntityManager from "../src/app/entity-manager";

describe("Entity Manager", () => {
	it("Accepts an initial state", () => {
		const dummyEntities: Entity[] = [new Bug()]
		const dummyUIEntities: UIEntity[] = [{ id: 0, update: () => 0 }]

		const entityManager = new EntityManager(dummyEntities, dummyUIEntities);

		expect(entityManager.getEntities()).toEqual(dummyEntities);
		expect(entityManager.getUIEntities()).toEqual(dummyUIEntities);
	})
})