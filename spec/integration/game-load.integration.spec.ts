import EntityManager from "../../src/core/entity-manager"
import { GameEngine, GameEngineOptions } from "../../src/core/game-engine"
import Bug from "../../src/core/entities/bug/bug"
import fakeUI from "../fixtures/fakeUI"

describe("Game Saving & Loading", () => {
    const newGame = (options?: Partial<GameEngineOptions>) =>
        new GameEngine({ gameUI: fakeUI(), entityManager: new EntityManager([]), width: 0, height: 0, ...options })

    it("Can export and load a game with some entities", () => {
        const testBug = new Bug(0)
        // TODO add more entities

        const game = newGame()
        game.addEntity(testBug)

        const gameState = game.exportCurrentState()
        const otherGame = newGame({ initialState: gameState })

        expect(otherGame.entityManager.getEntities().filter(e => e.id == testBug.id).length).toEqual(1)
    })
})