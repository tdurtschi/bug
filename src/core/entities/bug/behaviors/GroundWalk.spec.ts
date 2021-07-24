import Bug from "../bug"
import Victor = require("victor")
import { GroundWalk } from "./GroundWalk"
import Wall from "../../wall/wall"
import { expectEquals } from "../../../util/vectors"
import Plant from "../../plant/plant"
import { DummyBugInstinct } from "./BugInstinct"

describe("Ground Walking", () => {
	it("will turn around when there is an obstruction ahead", () => {
		const input = [new Wall()]

		const bug = new Bug(0, {
			size: new Victor(2, 1),
			pos: new Victor(0, 0),
			direction: new Victor(1, 0)
		})

		new GroundWalk(bug).do(input)
		expectEquals(bug.direction, new Victor(-1, 0))
	})

	it("Turns around along its x-axis", () => {
		const input = [new Wall(1, {
			pos: new Victor(0, 0),
			size: new Victor(10, 50)
		})]
		const bug = new Bug(0, {
			pos: new Victor(0, 0),
			size: new Victor(10, 0),
			direction: new Victor(1, 0)
		})

		new GroundWalk(bug).do(input)

		expectEquals(bug.pos, new Victor(-11, 0))
	})

	it("will change to climbing mode when it reaches a tree if toggle is true", () => {
		const input = [new Plant(1, { pos: new Victor(20, 0) })]
		const bug = new Bug(0, {
			pos: new Victor(10, 0),
			size: new Victor(30, 20),
			direction: new Victor(-1, 0),
		})

		bug.bugInstinct = new DummyBugInstinct({ WillClimb: true });

		new GroundWalk(bug).do(input)

		const direction = bug.direction
		expect(bug.climbingOn.plant).toEqual(input[0])

		expectEquals(direction, new Victor(0, 1))
		expectEquals(bug.pos, new Victor(20, 30))
	})

	it("will stay on the ground when it reaches a tree if toggle is false", () => {
		const input = [new Plant(1, { pos: new Victor(20, 0) })]
		const bug = new Bug(0, {
			pos: new Victor(10, 0),
			size: new Victor(30, 20),
			direction: new Victor(-1, 0),
		})

		bug.bugInstinct = new DummyBugInstinct({ WillClimb: false });

		new GroundWalk(bug).do(input)

		const direction = bug.direction
		expect(bug.climbingOn).not.toBeDefined()

		expectEquals(direction, new Victor(-1, 0))
		expectEquals(bug.pos, new Victor(9, 0))
	})

	it("Emits an event when it starts climbing a tree", (done: DoneFn) => {
		const input = [new Plant(1, { pos: new Victor(20, 0) })]
		const bug = new Bug(0, {
			pos: new Victor(10, 0),
			size: new Victor(30, 20),
			direction: new Victor(-1, 0)
		})

		bug.bugInstinct = new DummyBugInstinct({ WillClimb: true })

		bug.zIndexChanged.subscribe(done)

		new GroundWalk(bug).do(input)
	})

	it("finishes after a specified number of updates", () => {
		const bug = new Bug();
		bug.finishBehavior = jasmine.createSpy("finishBehavior");
		const groundWalk = new GroundWalk(bug, 3);
		groundWalk.do([])
		groundWalk.do([])
		expect(bug.finishBehavior).not.toHaveBeenCalled()
		groundWalk.do([])
		expect(bug.finishBehavior).toHaveBeenCalled()
	})
})

describe("Walking mode", () => {
	it("Travels at a given speed", () => {
		const bug = new Bug(0, {
			direction: new Victor(1, 0),
			speed: 17
		})
		new GroundWalk(bug).do([])
		expect(bug.pos.x).toEqual(17)
	})

	describe("directions", () => {
		it("travels in +x direction when 'direction' is (1,0)", () => {
			const bug = new Bug(0, {
				direction: new Victor(1, 0)
			})

			new GroundWalk(bug).do([])
			expect(bug.pos.x).toEqual(1)
		})
		it("travels in -x direction when 'direction' is (-1,0)", () => {
			const bug = new Bug(0, {
				direction: new Victor(-1, 0)
			})

			new GroundWalk(bug).do([])
			expect(bug.pos.x).toEqual(-1)
		})
	})
})
