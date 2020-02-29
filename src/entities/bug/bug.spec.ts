import "jasmine"
import Bug from "./bug"
import Wall from "../wall/wall"
import { vectorEquals, multi } from "../../util"
import Victor from "victor"
import { BugMode } from "./bugConstants"
import Plant from "../plant/plant"
import TreeBuilder from "../plant/treeBuilder"
import { expectEquals } from "../../testutil"
import { GroundWalk } from "./behaviors/GroundWalk"
import { Climb } from "./behaviors/climb"

describe("Bug", () => {
	describe("Default bug", () => {
		it("Is in stopped mode.", () => {
			const bug = new Bug()
			expect(bug.mode).toEqual(BugMode.STOPPED)
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


	describe("Stopped mode", () => {
		it("Doesn't change its coordinates", () => {
			const bug = new Bug(0, {
				mode: BugMode.STOPPED
			})
			expect(bug.update().pos.x).toEqual(0)
			expect(bug.update().pos.y).toEqual(0)
		})
	})

	describe("Inputs", () => {
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

			expect(bug.mode == BugMode.STOPPED
				|| !vectorEquals(bug.direction, direction, false)).toBeTruthy();
		})
	})
})