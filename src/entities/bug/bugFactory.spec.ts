import BugFactory from "./bugFactory";
import Bug from "./bug";
import { BugMode } from "./bugConstants";

describe("BugFactory", () => {
	it("Creates a bug", () => {
		const bug: Bug = new BugFactory(() => 0, () => false).build()
		expect(bug)
	})

	it("Passes initial state", () => {
		const bug: Bug = new BugFactory(() => 0, () => false).build({ mode: BugMode.STOPPED })
		expect(bug.mode).toEqual(BugMode.STOPPED)
	})

	it("Applies the correct ID", () => {
		const idGenerator = () => 1337
		const bug: Bug = new BugFactory(idGenerator, () => false).build()
		expect(bug.id).toEqual(1337)
	})

	it("Gives bugs spontaneous factor", () => {
		const spontaneous = () => true;
		const bug: Bug = new BugFactory(() => 0, spontaneous).build()
		expect(bug.spontaneous).toEqual(spontaneous)
	})
});