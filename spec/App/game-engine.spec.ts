import { GameEngine } from "../../src/app/game-engine";
import EntityManager from "../../src/app/entity-manager";
import Bug from "../../src/bug/bug";

describe("Game Engine", () => {
	beforeEach(() => jasmine.clock().install())
	afterEach(() => jasmine.clock().uninstall())

	it("Doesn't update entities when paused.", () => {
		const spyBug = Object.assign(new Bug(), { update: jasmine.createSpy("BUG-update") });
		const fakeUI = {
			render: () => { },
			togglePause: () => { }
		}
		const game = new GameEngine({ gameUI: fakeUI, entityManager: new EntityManager([spyBug], []) })
		game.togglePause()

		jasmine.clock().tick(1000)
		expect(spyBug.update).not.toHaveBeenCalled()
	})

	it("Pauses the UI when paused", () => {
		const fakeUI = {
			render: () => { },
			togglePause: jasmine.createSpy("UI-togglePause")
		}

		const game = new GameEngine({ gameUI: fakeUI, entityManager: new EntityManager([], []) })
		game.togglePause()

		expect(fakeUI.togglePause).toHaveBeenCalled()
	})
})