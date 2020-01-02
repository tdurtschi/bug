import Tree, { TreeStruct } from "./tree";
import TreeBuilder from "./treeBuilder";
import { vectorEquals } from "../../util";
import Victor = require("victor");

describe("Tree", () => {
	it("Starts as a single node", () => {
		const graph = new Tree().state.graph
		expect(graph.left).toBeNull()
		expect(graph.right).toBeNull()
		expect(graph.node.x).toEqual(0)
		expect(graph.node.y).toEqual(1)
	})

	it("The root node grows upward", () => {
		const tree = new Tree(),
			{ graph } = tree.state

		const oldMag = graph.node.magnitude()
		tree.update([])
		expect(graph.node.magnitude()).toBeGreaterThan(oldMag)
	})

	it("Gets the absolute position of a node", () => {
		const tree = new Tree(0, {
			graph: new TreeBuilder()
				.node(100, 10)
				.left(new TreeBuilder()
					.node(-50, 50)
					.right({})
					.build()
				)
				.right({})
				.build(),
			pos: new Victor(1, 1)
		})

		const subject = tree.state.graph.left.right
		const absolutePos = tree.getAbsolutePos(subject)
		expect(absolutePos).toBeDefined()
		expect(vectorEquals(absolutePos, new Victor(51, 61))).toBeTruthy()
	})

	it("Has a maximum height", () => {
		const tree = new Tree(),
			{ graph } = tree.state

		updateALot(tree, 100)

		expect(graph.node.magnitude()).toBeLessThan(100)
	})

	it("Has a maximum depth", () => {
		const tree = new Tree(),
			{ graph } = tree.state

		updateALot(tree, 1000)

		const maxDepth = (tree: TreeStruct): number => {
			let values = [tree.depth]
			if (tree.left)
				values.push(maxDepth(tree.left))

			if (tree.right)
				values.push(maxDepth(tree.right))

			return Math.max(...values)
		}

		expect(maxDepth(graph)).toBeLessThan(7)
	})

	describe("Child nodes", () => {
		it("Has a reference to the parent node", () => {
			const tree = new Tree(), { graph } = tree.state

			updateALot(tree, 100)
			expect(graph.left).toBeTruthy()
			expect(graph.left.parent).toBe(graph)
		})

		it("Get a larger depth than the parent", () => {
			const tree = new Tree(), { graph } = tree.state

			updateALot(tree, 100)
			expect(graph.depth).toEqual(1)
			expect(graph.left.depth).toEqual(2)
			expect(graph.right.depth).toEqual(2)
		})

		it("Grows if it exists.", () => {
			const tree = new Tree(), { graph } = tree.state

			graph.left = new TreeStruct()
			graph.right = new TreeStruct()
			const leftMag = graph.left.node.magnitude()
			const rightMag = graph.left.node.magnitude()
			tree.update([])

			expect(graph.left.node.magnitude()).toBeGreaterThan(leftMag)
			expect(graph.right.node.magnitude()).toBeGreaterThan(rightMag)
		})
	})

	const updateALot = (tree: Tree, numTimes: number = 100) => {
		for (let i = 0; i < numTimes; i++) { tree.update([]) }
	}
})
