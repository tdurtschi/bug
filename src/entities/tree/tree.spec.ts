import Tree, { TreeStruct } from "./tree";

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
