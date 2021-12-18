import { Game } from "../../src/core/game-engine";
import { entityManagerStub } from "../entity-manager-stub";

export const gameStub = (): Game => ({
	isPaused: false,
	togglePause: jasmine.createSpy("togglePause"),
	addEntity: (): any => null,
	getEntities: () => [],
	start: jasmine.createSpy("start"),
	entityManager: entityManagerStub([]),
	height: 0,
	width: 0,
	exportCurrentState: jasmine.createSpy("exportCurrentState")
})