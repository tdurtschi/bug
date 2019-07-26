import Bug from "../src/bug/bug"
import EntityUpdater from "../src/app/entity-updater"
import Victor from "victor"

describe("Entity Updater", () => {
	it("Updates all the Entities", () => {
		const entities = [new Bug(), new Bug()]
		const entityUpdater = new EntityUpdater()
		entityUpdater.update(entities, 0)

		expect(entities[0].state.pos.x).toEqual(1)
		expect(entities[1].state.pos.x).toEqual(1)
	})

	it("Updates bugs every 4 frames", () => {
		const entities = [new Bug()]
		const entityUpdater = new EntityUpdater()

		new Array(0, 1, 2, 3).forEach(frame => entityUpdater.update(entities, frame))
		expect(entities[0].state.pos.x).toEqual(1)

		new Array(4, 5, 6, 7).forEach(frame => entityUpdater.update(entities, frame))
		expect(entities[0].state.pos.x).toEqual(2)
	})

	describe("Collision Detection", () => {
		it("Will tell a bug that it's intersecting another bug", () => {
			const entities = [
				new Bug(0, { pos: new Victor(1, 1) }),
				new Bug(1, { pos: new Victor(0, 0) }),
				new Bug(2, { pos: new Victor(100000, 100000) })
			]
			entities[0].update = jasmine.createSpy()
			entities[1].update = jasmine.createSpy()
			entities[2].update = jasmine.createSpy()

			new EntityUpdater().update(entities, 0)

			expect((entities[0].update as jasmine.Spy).calls.mostRecent().args[0][0]).toEqual(entities[1])
			expect((entities[1].update as jasmine.Spy).calls.mostRecent().args[0][0]).toEqual(entities[0])
			expect((entities[2].update as jasmine.Spy).calls.mostRecent().args[0].length).toEqual(0)
		})
	})
})