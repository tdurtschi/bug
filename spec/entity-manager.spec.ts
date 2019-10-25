import Entity from "../src/core/entity";
import Bug from "../src/bug/bug";
import { UIEntity } from "../src/app/game-engine";
import EntityManager from "../src/app/entity-manager";
import Wall from "../src/wall/wall";

describe("Entity Manager", () => {
	it("Accepts an initial state", () => {
		const dummyEntities: Entity[] = [new Bug()]
		const dummyUIEntities: UIEntity[] = [{ id: 0, update: () => 0 }]

		const entityManager = new EntityManager(dummyEntities, dummyUIEntities);

		expect(entityManager.getEntities()).toEqual(dummyEntities);
		expect(entityManager.getUIEntities()).toEqual(dummyUIEntities);
	})

	it("Can add an entity", () => {
		const entityManager = new EntityManager([], []);
		const entity = new Wall();

		entityManager.addEntity(entity);

		expect(entityManager.getEntities()).toContain(entity);
	})
})