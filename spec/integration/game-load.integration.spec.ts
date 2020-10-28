import EntityManager from "../../src/core/entity-manager"
import { GameEngine, GameEngineOptions } from "../../src/core/game-engine"
import Bug from "../../src/entities/bug/bug"
import Wall from "../../src/entities/wall/wall"
import fakeUI from "../fixtures/fakeUI"

describe("Game Saving & Loading", () => {
    const newGame = (options?: Partial<GameEngineOptions>) =>
        new GameEngine({
            gameUI: fakeUI(),
            entityManager: new EntityManager([]),
            width: 0,
            height: 0,
            ...options
        })

    it("Can export and load a game with some entities", () => {
        const testBug = new Bug(0)
        const wall = new Wall(1)
        // TODO add more entities

        const game = newGame()
        game.addEntity(testBug)
        game.addEntity(wall)

        const gameState = game.exportCurrentState()
        const otherGame = newGame()
        otherGame.loadFromState(gameState)

        expect(otherGame.entityManager.getEntities().filter(e => e instanceof Bug).length).toEqual(1)
        // TODO: This should be 1 but it's 3 because the game auto builds with 2 walls. It probably shouldnt be responsible for that.
        expect(otherGame.entityManager.getEntities().filter(e => e instanceof Wall).length).toEqual(3)
    })

    it("Removes old entities when it loads", () => {
        const testBug = new Bug(0)

        const game = newGame()
        game.addEntity(testBug)

        const gameState = game.exportCurrentState()
        const otherGame = newGame()
        const entityIdsToRemove = otherGame.entityManager.getEntities().map(e => e.id)
        otherGame.loadFromState(gameState)

        entityIdsToRemove.forEach(id => {
            expect(otherGame.entityManager.getEntities().find(e => e.id === id)).toBeUndefined()
        })
    })
})