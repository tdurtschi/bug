import { GameEngine } from "./game-engine";
import EntityManager from "./entity-manager";
import Bug from "../entities/bug/bug";
import { IGameUI } from "../app/canvas-ui";

describe("Game Engine", () => {
	beforeEach(() => jasmine.clock().install())
	afterEach(() => jasmine.clock().uninstall())

	let fakeUI: IGameUI
	beforeEach(() => {
		fakeUI = {
			render: jasmine.createSpy("render"),
			togglePause: jasmine.createSpy("pause"),
			updateUIEntities: jasmine.createSpy("updateUI"),
			start: jasmine.createSpy("start")
		}
	})

	it("Creates as an unstarted game", () => {
		const spyBug = Object.assign(new Bug(), { update: jasmine.createSpy("BUG-update") });

		new GameEngine({ gameUI: fakeUI, entityManager: new EntityManager([spyBug]) })

		jasmine.clock().tick(1000)
		expect(spyBug.update).not.toHaveBeenCalled()
	})

	it("Updates entities after game is started", () => {
		const spyBug = Object.assign(new Bug(), { update: jasmine.createSpy("BUG-update") });

		const game = new GameEngine({ gameUI: fakeUI, entityManager: new EntityManager([spyBug]) })
		game.start()

		jasmine.clock().tick(1000)
		expect(spyBug.update).toHaveBeenCalled()
	})

	it("Starts the UI after game is started", () => {
		const game = new GameEngine({ gameUI: fakeUI, entityManager: new EntityManager([]) })
		game.start()

		expect(fakeUI.start).toHaveBeenCalled()
	})

	it("Doesn't update entities when paused.", () => {
		const spyBug = Object.assign(new Bug(), { update: jasmine.createSpy("BUG-update") });

		const game = new GameEngine({ gameUI: fakeUI, entityManager: new EntityManager([spyBug]) })
		game.start()
		game.togglePause()

		jasmine.clock().tick(1000)
		expect(spyBug.update).not.toHaveBeenCalled()
	})

	it("Pauses the UI when paused", () => {
		const game = new GameEngine({ gameUI: fakeUI, entityManager: new EntityManager([]) })
		game.togglePause()

		expect(fakeUI.togglePause).toHaveBeenCalled()
	})

	it("Passes new entity to entity manager", () => {
		const game = new GameEngine({ gameUI: fakeUI, entityManager: new EntityManager([]) })
		const bug = new Bug()
		game.addEntity(bug)

		expect(game.entityManager.getEntities().length).toBeGreaterThan(0);
	})
})