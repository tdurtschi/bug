import { TreeStruct } from "./treeStruct";
import { ITreeStruct } from "./ITreeStruct";

describe('TreeStruct', () => {
	it("Starts as a single node", () => {
		const tree = new TreeStruct()
		expect(tree.left).toBeNull()
		expect(tree.right).toBeNull()
		expect(tree.node.x).toEqual(0)
		expect(tree.node.y).toEqual(1)
	})

	it("The root node grows upward", () => {
		const tree = new TreeStruct()

		const oldMag = tree.node.magnitude()
		tree.update()
		expect(tree.node.magnitude()).toBeGreaterThan(oldMag)
	})

	it("Has a maximum height", () => {
		const tree = new TreeStruct()

		updateALot(tree, 100)

		expect(tree.node.magnitude()).toBeLessThan(100)
	})

	it("Has a maximum depth", () => {
		const tree = new TreeStruct()

		updateALot(tree, 1000)

		const maxDepth = (tree: ITreeStruct): number => {
			let values = [tree.depth]
			if (tree.left)
				values.push(maxDepth(tree.left))

			if (tree.right)
				values.push(maxDepth(tree.right))

			return Math.max(...values)
		}

		expect(maxDepth(tree)).toBeLessThan(7)
	})

	describe("Child nodes", () => {
		it("Has a reference to the parent node", () => {
			const tree = new TreeStruct()

			updateALot(tree, 100)
			expect(tree.left).toBeTruthy()
			expect(tree.left.parent).toBe(tree)
		})

		it("Get a larger depth than the parent", () => {
			const tree = new TreeStruct()

			updateALot(tree, 100)
			expect(tree.depth).toEqual(1)
			expect(tree.left.depth).toEqual(2)
			expect(tree.right.depth).toEqual(2)
		})

		it("Grows if it exists.", () => {
			const tree = new TreeStruct()

			tree.left = new TreeStruct()
			tree.right = new TreeStruct()
			const leftMag = tree.left.node.magnitude()
			const rightMag = tree.left.node.magnitude()
			tree.update()

			expect(tree.left.node.magnitude()).toBeGreaterThan(leftMag)
			expect(tree.right.node.magnitude()).toBeGreaterThan(rightMag)
		})
	})

	const updateALot = (tree: TreeStruct, numTimes: number = 100) => {
		for (let i = 0; i < numTimes; i++) { tree.update() }
	}
});