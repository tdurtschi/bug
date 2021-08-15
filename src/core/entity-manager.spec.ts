import Entity from "./entities/entity";
import Bug from "./entities/bug/bug";
import EntityManager from "./entity-manager";
import Wall from "./entities/wall/wall";
import { Tree } from "./entities/plant/tree";

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

	it("Sorts entities by z-index when it receives an event", () => {
		const plant = new Tree(0);
		const bug = new Bug(1, { climbingOn: { plant: plant, branch: plant.graph } });
		const entities = [
			bug,
			plant,
		]

		const entityManager = new EntityManager(entities);
		bug.zIndexChanged.next()

		const newList = entityManager.getEntities();
		expect(newList[0]).toBe(entities[1])
		expect(newList[1]).toBe(entities[0])
	})
})