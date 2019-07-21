import "jasmine"
import Bug from "../src/bug/bug"
import Wall from "../src/bug/wall"
import {vectorEquals} from "../src/util"
import Victor from "victor"

describe("Bug", () => {
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
		expect(typeof(bug.update) === "function").toBe(true)
	})

	it("travels at a given speed", () => {
		const bug = new Bug(0, {
			direction: new Victor(1, 0),
			speed: 17
		})
		expect(bug.update().state.pos.x).toEqual(17)
	})

	describe("directions", () => {
		it("travels in +x direction when 'direction' is (1,0)", () => {
			const bug = new Bug(0, {direction: new Victor(1, 0)})
			
			expect(bug.update().state.pos.x).toEqual(1)
		})
		it("travels in -x direction when 'direction' is (-1,0)", () => {
			const bug = new Bug(0, {direction: new Victor(-1, 0)})
			
			expect(bug.update().state.pos.x).toEqual(-1)
		})

		xit("can rotate at 90 degrees", () => {
			const bug = new Bug(0, {behaviorQueue:[{type:"TURN", params:"LEFT"}]})

			expect(bug.update().state.direction).toEqual(new Victor(0, 1))
		})

		xit("can rotate at -90 degrees", () => {
			const bug = new Bug(0, {behaviorQueue:[{type:"TURN", params:"RIGHT"}]})

			expect(vectorEquals(bug.update().state.direction, new Victor(0, -1))).toBeTruthy()
		})
	})

	describe("inputs", () => {
		it("will turn around when there is an obstruction ahead", () => {
			const input = [new Wall()]
			const bug = new Bug(0, {direction: new Victor(1, 0)})
			
			expect(vectorEquals(bug.update(input).state.direction, new Victor(-1, 0))).toBeTruthy()
		})

		it("fails gracefully when given bad input", () => {
			const bug = new Bug()
			expect(bug.update(undefined)).toBeTruthy()
		})
	})
})