import { Game } from "../../src/core/game-engine";

export const gameStub = (): Game => ({
	isPaused: false,
	togglePause: jasmine.createSpy("togglePause"),
	addBug: (): any => null,
	addPlant: (): any => null,
	getEntities: () => [],
	start: jasmine.createSpy("start"),
	height: 0,
	width: 0,
	exportCurrentState: jasmine.createSpy("exportCurrentState")
})