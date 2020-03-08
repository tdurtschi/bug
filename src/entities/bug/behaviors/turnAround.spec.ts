import Bug from "../bug";
import { TurnAround } from "./turnAround";

describe("TurnAround", () => {
	it("Finishes after 1 update", () => {
		const bug = new Bug()
		bug.finishBehavior = jasmine.createSpy()

		new TurnAround(bug).do()

		expect(bug.finishBehavior).toHaveBeenCalled()
	})
});