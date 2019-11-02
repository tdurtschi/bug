import "jasmine"
import Bug from "../src/bug/bug"
import Wall from "../src/wall/wall"
import {vectorEquals} from "../src/util"
import Victor from "victor"
import {BugMode} from "../src/bug/bugConstants"

describe("Bug", () => {
	describe("Default bug", () => {
		it("Is in walking mode.", () => {
			const bug = new Bug()
			expect(bug.state.mode).toEqual(BugMode.WALKING)
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
		expect(typeof(bug.update) === "function").toBe(true)
	})

	describe("Walking mode", () => {
		it("Travels at a given speed", () => {
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
			const bug = new Bug(0, {direction: new Victor(1, 0)})
			
			expect(vectorEquals(bug.update(input).state.direction, new Victor(-1, 0))).toBeTruthy()
		})

		it("fails gracefully when given bad input", () => {
			const bug = new Bug()
			expect(bug.update(undefined)).toBeTruthy()
		})
	})

	describe("Spontaneous activity", () => {
		it("reacts (changes mode) when it receives a spontaneous urge", () => {
			const direction = new Victor(1,0)
			const bug = new Bug(0, {
				direction,
				spontaneous: () => true
			});

			bug.update();

			expect(bug.state.mode != BugMode.WALKING
					|| bug.state.direction != direction).toBeTruthy();
		})
	})
})