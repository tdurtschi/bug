import Tree, { TreeStruct } from "../src/tree/tree";

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

		for (let i = 0; i < 100; i++) { tree.update([]) }

		expect(graph.node.magnitude()).toBeLessThan(100)
	})

	describe("Child nodes", () => {
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
})
