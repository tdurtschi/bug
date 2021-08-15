import TreeBuilder from "./treeBuilder";
import { vectorEquals } from "../../util/vectors";
import Victor = require("victor");
import { Tree } from "./tree";

describe("Plant", () => {
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

		const subject = tree.graph.left.right
		const absolutePos = tree.getAbsolutePos(subject)
		expect(absolutePos).toBeDefined()
		expect(vectorEquals(absolutePos, new Victor(51, 61))).toBeTruthy()
	})
})
