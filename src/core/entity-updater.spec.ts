import Bug from "./entities/bug/bug"
import EntityUpdater from "./entity-updater"
import Victor from "victor"
import Entity from "./entities/entity";
import { entityManagerStub } from "../../spec/entity-manager-stub";
import { Tree } from "./entities/plant/tree";

const intersectionsForEntity = (entity: Entity): any[] => (entity.update as jasmine.Spy).calls.mostRecent().args[0]

describe("Entity Updater", () => {
	it("Updates all the Entities", () => {
		const entities: Entity[] = [new Bug(), new Bug()]
		entities[0].update = jasmine.createSpy("update1")
		entities[1].update = jasmine.createSpy("update2")
		const entityUpdater = new EntityUpdater(entityManagerStub(entities))
		entityUpdater.update()

		expect(entities[0].update).toHaveBeenCalled()
		expect(entities[1].update).toHaveBeenCalled()
	})

	it("Updates bugs every 4 frames", () => {
		const entities: Entity[] = [new Bug()]
		entities[0].update = jasmine.createSpy("update")
		const entityUpdater = new EntityUpdater(entityManagerStub(entities))

		new Array(4).fill(0).forEach(_ => entityUpdater.update())
		expect(entities[0].update).toHaveBeenCalledTimes(1)

		new Array(4).fill(0).forEach(_ => entityUpdater.update())
		expect(entities[0].update).toHaveBeenCalledTimes(2)
	})

	describe("Collision Detection", () => {
		//TODO The X-pos coord points at the head of a bug regardless of its direction. Need to add a case with 2 bugs going opposite directions
		it("Will tell a bug that it's intersecting another bug", () => {
			const entities = [
				new Bug(0, { pos: new Victor(1, 1) }),
				new Bug(1, { pos: new Victor(0, 0) }),
				new Bug(2, { pos: new Victor(100000, 100000) })
			]
			entities.forEach(e => e.update = jasmine.createSpy());

			new EntityUpdater(entityManagerStub(entities)).update()

			expect(intersectionsForEntity(entities[0])).toContain(entities[1])
			expect(intersectionsForEntity(entities[1])).toContain(entities[0])
			expect(intersectionsForEntity(entities[2]).length).toBe(0)
		})

		it("Two bugs that are facing each other at the same x-coord are intersecting", () => {
			const entities = [
				new Bug(0, { pos: new Victor(0, 0), direction: new Victor(1, 0) }),
				new Bug(1, { pos: new Victor(0, 0), direction: new Victor(-1, 0) }),
			]
			entities.forEach(e => e.update = jasmine.createSpy());

			new EntityUpdater(entityManagerStub(entities)).update()

			expect(intersectionsForEntity(entities[0])).toContain(entities[1])
			expect(intersectionsForEntity(entities[1])).toContain(entities[0])
		})

		it("Two bugs that are facing each other but separated are not intersecting", () => {
			const entities = [
				new Bug(0, { pos: new Victor(0, 0), direction: new Victor(1, 0) }),
				new Bug(2, { pos: new Victor(1, 0), direction: new Victor(-1, 0) })
			]
			entities.forEach(e => e.update = jasmine.createSpy());

			new EntityUpdater(entityManagerStub(entities)).update()

			expect(intersectionsForEntity(entities[0]).length).toBe(0)
			expect(intersectionsForEntity(entities[1]).length).toBe(0)
		})


		it("Will tell a bug that it's intersecting a tree", () => {
			const entities = [
				new Bug(0, { pos: new Victor(10, 1), direction: new Victor(-1, 0) }), // Moving left
				new Bug(0, { pos: new Victor(10, 1), direction: new Victor(1, 0) }), // Moving right
				new Tree(1, { pos: new Victor(10, 1) })
			]
			entities.forEach(e => e.update = jasmine.createSpy());

			new EntityUpdater(entityManagerStub(entities)).update()
			expect(intersectionsForEntity(entities[0])).toContain(entities[2])
			expect(intersectionsForEntity(entities[1])).toContain(entities[2])
		})
	})
})