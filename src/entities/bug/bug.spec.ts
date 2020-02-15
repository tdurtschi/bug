import "jasmine"
import Bug from "./bug"
import Wall from "../wall/wall"
import { vectorEquals, multi } from "../../util"
import Victor from "victor"
import { BugMode } from "./bugConstants"
import Tree from "../tree/tree"
import TreeBuilder from "../tree/treeBuilder"

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

	describe("Walking mode", () => {
		it("Travels at a given speed", () => {
			const bug = new Bug(0, {
				mode: BugMode.WALKING,
				direction: new Victor(1, 0),
				speed: 17
			})
			expect(bug.update().pos.x).toEqual(17)
		})

		describe("directions", () => {
			it("travels in +x direction when 'direction' is (1,0)", () => {
				const bug = new Bug(0, {
					mode: BugMode.WALKING,
					direction: new Victor(1, 0)
				})

				expect(bug.update().pos.x).toEqual(1)
			})
			it("travels in -x direction when 'direction' is (-1,0)", () => {
				const bug = new Bug(0, {
					mode: BugMode.WALKING,
					direction: new Victor(-1, 0)
				})

				expect(bug.update().pos.x).toEqual(-1)
			})
		})
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

	describe("Climbing mode", () => {
		it("Climbs up on a branch", () => {
			const tree = new Tree(1, {
				pos: new Victor(0, 0),
				graph: new TreeBuilder().node(0, 100).build()
			})

			const bug = new Bug(0, {
				mode: BugMode.WALKING,
				speed: 1,
				pos: new Victor(0, 30),
				climbingOn: { tree, branch: tree.graph },
				direction: new Victor(0, 1)
			})

			bug.update()

			expect(bug.pos.y).toEqual(31)
		})

		it("Will pick the left or right branch to climb up if its at the end of a branch", multi(10,
			() => {
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
					mode: BugMode.WALKING,
					speed: 1,
					pos: new Victor(0, 30),
					climbingOn: {
						tree: new Tree(1, { pos: new Victor(0, 0), graph: tree }),
						branch: tree
					},
					direction: new Victor(0, 1)
				})

				bug.update()

				const onLeftBranch = bug.climbingOn.branch === tree.left
				const onRightBranch = bug.climbingOn.branch === tree.right
				expect(onLeftBranch || onRightBranch).toBeTruthy()
				expect(vectorEquals(bug.direction, (onLeftBranch ? tree.left : tree.right)
					.node.clone().norm())).toBeTruthy()
			}))

		it("Turns around if the next branch doesn't exist", () => {
			const tree = new TreeBuilder().node(0, 30).build()

			const bug = new Bug(0, {
				speed: 1,
				mode: BugMode.WALKING,
				pos: new Victor(0, 30),
				climbingOn: {
					tree: new Tree(1, { pos: new Victor(0, 0), graph: tree }),
					branch: tree
				},
				direction: new Victor(0, 1)
			})

			bug.update()
			expect(bug.direction.y).toEqual(-1)
		})

		it("Moves to the parent branch when climbing down", () => {
			const tree = new TreeBuilder()
				.node(0, 30)
				.left(new TreeBuilder()
					.node(-30, 30)
					.build())
				.build()

			const climbingBranch = tree.left
			const direction = climbingBranch.node.clone().norm().multiplyScalar(-1)

			const bug = new Bug(0, {
				mode: BugMode.WALKING,
				speed: 1,
				pos: new Victor(0, 30),
				climbingOn: {
					tree: new Tree(1, { pos: new Victor(0, 0), graph: tree }),
					branch: tree.left
				},
				direction: direction
			})

			bug.update()

			expect(bug.climbingOn.branch).toBe(tree)
			expect(vectorEquals(bug.direction, new Victor(0, -1))).toBeTruthy()
		})

		it("Returns to the ground if no parent branch", () => {
			const tree = new TreeBuilder()
				.node(0, 30)
				.build()

			const climbingBranch = tree
			const direction = climbingBranch.node.clone().norm().multiplyScalar(-1)

			const bug = new Bug(0, {
				mode: BugMode.WALKING,
				speed: 1,
				pos: new Victor(0, 0),
				climbingOn: {
					tree: new Tree(1, { pos: new Victor(0, 0), graph: tree }),
					branch: tree
				},
				direction: direction
			})

			bug.update()

			expect(bug.climbingOn).toBeUndefined()
			expect(bug.direction.y).toEqual(0)
		})
	})

	describe("inputs", () => {
		it("will turn around when there is an obstruction ahead", () => {
			const input = [new Wall()]
			const bug = new Bug(0, {
				mode: BugMode.WALKING,
				direction: new Victor(1, 0)
			})

			expect(vectorEquals(bug.update(input).direction, new Victor(-1, 0))).toBeTruthy()
		})

		it("Turns around along its x-axis", () => {
			const input = [new Wall()]
			const bug = new Bug(0, {
				pos: new Victor(10, 0),
				size: new Victor(10, 0),
				mode: BugMode.WALKING,
				direction: new Victor(1, 0)
			})
			const bugPos = bug.update(input).pos

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
			const direction = bug.direction
			expect(bug.climbingOn.tree).toEqual(input[0])
			expect(vectorEquals(direction, new Victor(0, 1))).toBeTruthy()

			expect(vectorEquals(bug.pos, new Victor(20, 30))).toBeTruthy()
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

			expect(bug.mode == BugMode.STOPPED
				|| !vectorEquals(bug.direction, direction, false)).toBeTruthy();
		})
	})
})