import { Pause } from "./pause"
import Bug from "../bug"

describe("Bug pause", () => {
	it("finishes after a specified number of updates", () => {
		const bug = new Bug();
		bug.finishBehavior = jasmine.createSpy("finishBehavior");
		const pause = new Pause(bug, 3);
		pause.do()
		pause.do()
		expect(bug.finishBehavior).not.toHaveBeenCalled()
		pause.do()
		expect(bug.finishBehavior).toHaveBeenCalled()
	})
})