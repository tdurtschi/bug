import { GameEngine } from "./game-engine";
import EntityManager from "./entity-manager";
import Bug from "../entities/bug/bug";

describe("Game Engine", () => {
	beforeEach(() => jasmine.clock().install())
	afterEach(() => jasmine.clock().uninstall())

	it("Doesn't update entities when paused.", () => {
		const spyBug = Object.assign(new Bug(), { update: jasmine.createSpy("BUG-update") });
		const fakeUI = {
			render: () => { },
			togglePause: () => { },
			updateUIEntities: () => { }
		}
		const game = new GameEngine({ gameUI: fakeUI, entityManager: new EntityManager([spyBug]) })
		game.togglePause()

		jasmine.clock().tick(1000)
		expect(spyBug.update).not.toHaveBeenCalled()
	})

	it("Pauses the UI when paused", () => {
		const fakeUI = {
			render: () => { },
			togglePause: jasmine.createSpy("UI-togglePause"),
			updateUIEntities: () => { }
		}

		const game = new GameEngine({ gameUI: fakeUI, entityManager: new EntityManager([]) })
		game.togglePause()

		expect(fakeUI.togglePause).toHaveBeenCalled()
	})

	it("Passes new entity to entity manager", () => {
		const fakeUI = {
			render: () => { },
			togglePause: () => { },
			updateUIEntities: () => { }
		}
		const game = new GameEngine({ gameUI: fakeUI, entityManager: new EntityManager([]) })
		const bug = new Bug()
		game.addEntity(bug)

		expect(game.entityManager.getEntities().length).toBeGreaterThan(0);
	})
})