import Tree from "./tree";
import TreeFactory from "./treeFactory";
import Victor from "victor";
import { vectorEquals } from "../../util";

describe("TreeFactory", () => {
	it("Creates a tree", () => {
		const tree: Tree = new TreeFactory(() => 0, () => false).build()
		expect(tree)
	})

	it("Passes initial state", () => {
		const tree: Tree = new TreeFactory(() => 0, () => false).build({ pos: new Victor(100, 100) })
		expect(vectorEquals(tree.state.pos, new Victor(100, 100))).toBeTruthy();
	})

	it("Applies the correct ID", () => {
		const idGenerator = () => 1337
		const tree: Tree = new TreeFactory(idGenerator, () => false).build()
		expect(tree.id).toEqual(1337)
	})

	it("Gives trees spontaneous factor", () => {
		const spontaneous = () => true;
		const tree: Tree = new TreeFactory(() => 0, spontaneous).build()
		expect((tree.state as any).spontaneous).toEqual(spontaneous)
	})
});