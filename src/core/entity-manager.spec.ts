import Entity from "../entities/entity";
import Bug from "../entities/bug/bug";
import EntityManager from "./entity-manager";
import Wall from "../entities/wall/wall";

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