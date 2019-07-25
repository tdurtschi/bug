import Bug from "../src/bug/bug"
import EntityUpdater from "../src/app/entity-updater"

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
})