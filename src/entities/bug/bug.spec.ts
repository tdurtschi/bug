import "jasmine"
import Bug from "./bug"
import Wall from "../wall/wall"
import { vectorEquals } from "../../util"
import Victor from "victor"
import { BugMode } from "./bugConstants"

describe("Bug", () => {
	describe("Default bug", () => {
		it("Is in stopped mode.", () => {
			const bug = new Bug()
			expect(bug.state.mode).toEqual(BugMode.STOPPED)
		})
	})

	it("can be created with an existing state", () => {
		const initialState = {
			pos: new Victor(10, 10)
		}

		const bug = new Bug(0, initialState)

		expect(bug.state.pos).toEqual(initialState.pos)
	})

	it("can be updated a bunch of times", () => {
		let bug = new Bug()
		bug = bug.update().update().update()
		expect(bug.state).toBeTruthy
		expect(typeof (bug.update) === "function").toBe(true)
	})

	describe("Walking mode", () => {
		it("Travels at a given speed", () => {
			const bug = new Bug(0, {
				mode: BugMode.WALKING,
				direction: new Victor(1, 0),
				speed: 17
			})
			expect(bug.update().state.pos.x).toEqual(17)
		})

		describe("directions", () => {
			it("travels in +x direction when 'direction' is (1,0)", () => {
				const bug = new Bug(0, {
					mode: BugMode.WALKING,
					direction: new Victor(1, 0)
				})

				expect(bug.update().state.pos.x).toEqual(1)
			})
			it("travels in -x direction when 'direction' is (-1,0)", () => {
				const bug = new Bug(0, {
					mode: BugMode.WALKING,
					direction: new Victor(-1, 0)
				})

				expect(bug.update().state.pos.x).toEqual(-1)
			})
		})
	})

	describe("Stopped mode", () => {
		it("Doesn't change its coordinates", () => {
			const bug = new Bug(0, {
				mode: BugMode.STOPPED
			})
			expect(bug.update().state.pos.x).toEqual(0)
			expect(bug.update().state.pos.y).toEqual(0)
		})
	})

	describe("inputs", () => {
		it("will turn around when there is an obstruction ahead", () => {
			const input = [new Wall()]
			const bug = new Bug(0, {
				mode: BugMode.WALKING,
				direction: new Victor(1, 0)
			})

			expect(vectorEquals(bug.update(input).state.direction, new Victor(-1, 0))).toBeTruthy()
		})

		// it("Turns around along its x-axis", () => {
		// 	const input = [new Wall()]
		// 	const bug = new Bug(0, {
		// 		pos: new Victor(10, 0),
		// 		size: new Victor(10, 1),
		// 		mode: BugMode.WALKING,
		// 		direction: new Victor(1, 0)
		// 	})

		// 	expect(vectorEquals(bug.update(input).state.pos, new Victor(0, 0))).toBeTruthy()
		// })

		it("fails gracefully when given bad input", () => {
			const bug = new Bug()
			expect(bug.update(undefined)).toBeTruthy()
		})
	})

	describe("Spontaneous activity", () => {
		it("reacts (changes mode) when it receives a spontaneous urge", () => {
			const direction = new Victor(1, 0)
			const bug = new Bug(0, {
				mode: BugMode.WALKING,
				direction: direction.clone(),
				spontaneous: () => true
			});

			bug.update();

			expect(bug.state.mode != BugMode.STOPPED
				|| !vectorEquals(bug.state.direction, direction)).toBeTruthy();
		})
	})
})