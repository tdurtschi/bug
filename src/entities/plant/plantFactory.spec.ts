import Plant from "./plant";
import PlantFactory from "./plantFactory";
import Victor from "victor";
import { vectorEquals } from "../../util";

describe("TreeFactory", () => {
	it("Creates a tree", () => {
		const tree: Plant = new PlantFactory(() => 0, () => false).build()
		expect(tree)
	})

	it("Passes initial state", () => {
		const tree: Plant = new PlantFactory(() => 0, () => false).build({ pos: new Victor(100, 100) })
		expect(vectorEquals(tree.pos, new Victor(100, 100))).toBeTruthy();
	})

	it("Applies the correct ID", () => {
		const idGenerator = () => 1337
		const tree: Plant = new PlantFactory(idGenerator, () => false).build()
		expect(tree.id).toEqual(1337)
	})

	it("Gives trees spontaneous factor", () => {
		const spontaneous = () => true;
		const tree: Plant = new PlantFactory(() => 0, spontaneous).build()
		expect((tree as any).spontaneous).toEqual(spontaneous)
	})
});