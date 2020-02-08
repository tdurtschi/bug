import { entityManagerStub } from "./entity-manager-stub";

export const gameStub = () => ({
	isPaused: false,
	togglePause: jasmine.createSpy("togglePause"),
	addEntity: (): any => null,
	start: jasmine.createSpy("start"),
	entityManager: entityManagerStub([])
})