import Entity from "../src/core/entity";
import Bug from "../src/bug/bug";
import EntityManager from "../src/app/entity-manager";
import Wall from "../src/wall/wall";

describe("Entity Manager", () => {
	it("Accepts an initial state", () => {
		const dummyEntities: Entity[] = [new Bug()]

		const entityManager = new EntityManager(dummyEntities);

		expect(entityManager.getEntities()).toEqual(dummyEntities);
	})

	it("Can add an entity", () => {
		const entityManager = new EntityManager([]);
		const entity = new Wall();

		entityManager.addEntity(entity);

		expect(entityManager.getEntities()).toContain(entity);
	})
})