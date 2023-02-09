import { GameEngine } from "./game-engine";
import EntityManager, { IEntityManager } from "./entity-manager";
import Bug from "./entities/bug/bug";
import { IGameUI } from "./canvas-ui/canvas-ui";
import newFakeUI from "../../spec/fixtures/fakeUI";
import Plant from "./entities/plant/plant";

describe("Game Engine", () => {
	beforeEach(() => jasmine.clock().install())
	afterEach(() => jasmine.clock().uninstall())

	const getGameEngine = ({ gameUI, entityManager }: { gameUI: IGameUI, entityManager: EntityManager }) =>
		new GameEngine({ gameUI, entityManager, width: 0, height: 0 })

	let fakeUI: IGameUI
	beforeEach(() => {
		fakeUI = newFakeUI()
	})

	it("Creates as an unstarted game", () => {
		const spyBug = Object.assign(new Bug(), { update: jasmine.createSpy("BUG-update") });

		getGameEngine({ gameUI: fakeUI, entityManager: new EntityManager([spyBug]) })

		jasmine.clock().tick(1000)
		expect(spyBug.update).not.toHaveBeenCalled()
	})

	it("Updates entities after game is started", () => {
		const spyBug = Object.assign(new Bug(), { update: jasmine.createSpy("BUG-update") });

		const game = getGameEngine({ gameUI: fakeUI, entityManager: new EntityManager([spyBug]) })
		game.start()

		jasmine.clock().tick(1000)
		expect(spyBug.update).toHaveBeenCalled()
	})

	it("Starts the UI after game is started", () => {
		const game = getGameEngine({ gameUI: fakeUI, entityManager: new EntityManager([]) })
		game.start()

		expect(fakeUI.start).toHaveBeenCalled()
	})

	it("Doesn't update entities when paused.", () => {
		const spyBug = Object.assign(new Bug(), { update: jasmine.createSpy("BUG-update") });

		const game = getGameEngine({ gameUI: fakeUI, entityManager: new EntityManager([spyBug]) })
		game.start()
		game.togglePause()

		jasmine.clock().tick(1000)
		expect(spyBug.update).not.toHaveBeenCalled()
	})

	it("Pauses the UI when paused", () => {
		const game = getGameEngine({ gameUI: fakeUI, entityManager: new EntityManager([]) })
		game.togglePause()

		expect(fakeUI.togglePause).toHaveBeenCalled()
	})

	it("Can add a bug to the game", () => {
		const game = getGameEngine({ gameUI: fakeUI, entityManager: new EntityManager([]) })
		game.addBug({id: 80})

		expect(game.getEntities().length).toBeGreaterThan(0);
		expect(game.getEntities().filter(e => e instanceof Bug)[0].id).toEqual(80);
	})

	it("Can add a plant to the game", () => {
		const game = getGameEngine({ gameUI: fakeUI, entityManager: new EntityManager([]) })
		game.addPlant({id: 100})

		expect(game.getEntities().length).toBeGreaterThan(0);
		expect(game.getEntities().filter(e => e instanceof Plant)[0].id).toEqual(100);
	})
})