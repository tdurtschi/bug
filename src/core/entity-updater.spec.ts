import Bug from "../entities/bug/bug"
import EntityUpdater from "./entity-updater"
import Victor from "victor"
import Entity from "../entities/entity";
import { BugMode } from "../entities/bug/bugConstants";
import Tree from "../entities/tree/tree";
import { entityManagerStub } from "../../spec/entity-manager-stub";

describe("Entity Updater", () => {
	it("Updates all the Entities", () => {
		const entities: Entity[] = [new Bug(0, { mode: BugMode.WALKING }), new Bug(0, { mode: BugMode.WALKING })]
		const entityUpdater = new EntityUpdater(entityManagerStub(entities))
		entityUpdater.update()

		expect(entities[0].pos.x).toEqual(1)
		expect(entities[1].pos.x).toEqual(1)
	})

	it("Updates bugs every 4 frames", () => {
		const entities: Entity[] = [new Bug(0, { mode: BugMode.WALKING })]
		const entityUpdater = new EntityUpdater(entityManagerStub(entities))

		new Array(4).fill(0).forEach(_ => entityUpdater.update())
		expect(entities[0].pos.x).toEqual(1)

		new Array(4).fill(0).forEach(_ => entityUpdater.update())
		expect(entities[0].pos.x).toEqual(2)
	})

	describe("Collision Detection", () => {
		//TODO The X-pos coord points at the head of a bug regardless of its direction. Need to add a case with 2 bugs going opposite directions
		it("Will tell a bug that it's intersecting another bug", () => {
			const entities = [
				new Bug(0, { pos: new Victor(1, 1) }),
				new Bug(1, { pos: new Victor(0, 0) }),
				new Bug(2, { pos: new Victor(100000, 100000) })
			]
			entities[0].update = jasmine.createSpy()
			entities[1].update = jasmine.createSpy()
			entities[2].update = jasmine.createSpy()

			new EntityUpdater(entityManagerStub(entities)).update()

			expect((entities[0].update as jasmine.Spy).calls.mostRecent().args[0][0]).toEqual(entities[1])
			expect((entities[1].update as jasmine.Spy).calls.mostRecent().args[0][0]).toEqual(entities[0])
			expect((entities[2].update as jasmine.Spy).calls.mostRecent().args[0].length).toEqual(0)
		})


		it("Will tell a bug that it's intersecting a tree", () => {
			const entities = [
				new Bug(0, { pos: new Victor(1, 1), direction: new Victor(-1, 0) }), // Moving left
				new Bug(0, { pos: new Victor(11, 1), direction: new Victor(1, 0) }), // Moving right
				new Tree(1, { pos: new Victor(10, 1) })
			]
			entities[0].update = jasmine.createSpy()
			entities[1].update = jasmine.createSpy()

			new EntityUpdater(entityManagerStub(entities)).update()
			expect((entities[0].update as jasmine.Spy).calls.mostRecent().args[0]).toContain(entities[1])
			expect((entities[1].update as jasmine.Spy).calls.mostRecent().args[0]).toContain(entities[2])
		})
	})
})