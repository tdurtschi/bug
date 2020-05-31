import "jasmine"
import Bug from "./bug"
import { vectorEquals } from "../../util"
import Victor from "victor"
import { expectEquals } from "../../testutil"
describe("Bug", () => {
	describe("Default bug", () => {
		it("Is in paused mode.", () => {
			const bug = new Bug()
			const oldPos = bug.pos.clone()
			bug.update()
			expectEquals(oldPos, bug.pos)
		})
	})

	it("can be created with an existing state", () => {
		const initialState = {
			pos: new Victor(10, 10)
		}

		const bug = new Bug(0, initialState)

		expect(bug.pos).toEqual(initialState.pos)
	})

	it("can be updated a bunch of times", () => {
		let bug = new Bug()
		bug = bug.update().update().update()
		expect(bug).toBeTruthy
		expect(typeof (bug.update) === "function").toBe(true)
	})

	describe("Inputs", () => {
		it("fails gracefully when given bad input", () => {
			const bug = new Bug()
			expect(bug.update(undefined)).toBeTruthy()
		})
	})

	// TODO does this mmake sense anymore?
	// describe("Spontaneous activity", () => {
	// 	it("reacts (turns around) when it receives a spontaneous urge", () => {
	// 		const direction = new Victor(1, 0)
	// 		const bug = new Bug(0, {
	// 			direction: direction.clone(),
	// 			spontaneous: () => true
	// 		});

	// 		bug.update();

	// 		const bugChangedDirection = !vectorEquals(bug.direction, direction, false)
	// 		expect(bugChangedDirection).toBeTruthy();
	// 	})
	// })
})