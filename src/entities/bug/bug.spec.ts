import "jasmine"
import Bug from "./bug"
import Wall from "../wall/wall"
import { vectorEquals } from "../../util"
import Victor from "victor"
import { BugMode } from "./bugConstants"
import Tree, { ITreeStruct } from "../tree/tree"
import TreeBuilder from "../tree/treeBuilder"

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

	describe("Climbing mode", () => {
		it("Climbs up on a branch", () => {
			const tree = new Tree(1, { pos: new Victor(0, 0) })
			const bug = new Bug(0, {
				mode: BugMode.CLIMBING,
				speed: 1,
				pos: new Victor(0, 30),
				climbingOn: { tree, branch: tree.state.graph },
				direction: new Victor(0, 1)
			})

			bug.update()

			expect(bug.state.pos.y).toEqual(31)
		})

		it("Will pick the left branch to climb up if its at the end of a branch", () => {
			const tree = new TreeBuilder()
				.node(0, 30)
				.left(new TreeBuilder()
					.node(-30, 30)
					.build())
				.right(new TreeBuilder()
					.node(30, 30)
					.build())
				.build()

			const bug = new Bug(0, {
				mode: BugMode.CLIMBING,
				speed: 1,
				pos: new Victor(0, 30),
				climbingOn: {
					tree: new Tree(1, { pos: new Victor(0, 0), graph: tree }),
					branch: tree
				},
				direction: new Victor(0, 1)
			})

			bug.update()

			expect(bug.state.climbingOn.branch).toEqual(tree.left)
			expect(vectorEquals(bug.state.direction, tree.left.node.clone().norm())).toBeTruthy()
		})

		it("Stops if the next branch doesn't exist", () => {
			const tree = new TreeBuilder().node(0, 30).build()

			const bug = new Bug(0, {
				mode: BugMode.CLIMBING,
				speed: 1,
				pos: new Victor(0, 30),
				climbingOn: {
					tree: new Tree(1, { pos: new Victor(0, 0), graph: tree }),
					branch: tree
				},
				direction: new Victor(0, 1)
			})

			bug.update()

			expect(bug.state.climbingOn.branch).toEqual(tree)
			expect(bug.state.mode).toEqual(BugMode.STOPPED)
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

		it("Turns around along its x-axis", () => {
			const input = [new Wall()]
			const bug = new Bug(0, {
				pos: new Victor(10, 0),
				size: new Victor(10, 0),
				mode: BugMode.WALKING,
				direction: new Victor(1, 0)
			})
			const bugPos = bug.update(input).state.pos
			console.log("bug pos:", bugPos)
			expect(vectorEquals(bugPos, new Victor(0, 0))).toBeTruthy()
		})

		it("will change to climbing mode when it reaches a tree", () => {
			const input = [new Tree(1, { pos: new Victor(20, 0) })]
			const bug = new Bug(0, {
				pos: new Victor(10, 0),
				size: new Victor(30, 20),
				mode: BugMode.WALKING,
				direction: new Victor(-1, 0)
			})

			bug.update(input)
			const mode = bug.state.mode
			const direction = bug.state.direction
			expect(mode).toEqual(BugMode.CLIMBING)
			expect(vectorEquals(direction, new Victor(0, 1))).toBeTruthy()
			console.log(bug.state.pos)
			expect(vectorEquals(bug.state.pos, new Victor(20, 30))).toBeTruthy()
		})

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

			expect(bug.state.mode == BugMode.STOPPED
				|| !vectorEquals(bug.state.direction, direction)).toBeTruthy();
		})
	})
})