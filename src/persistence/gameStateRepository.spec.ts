import GameStateRepository, { IGameState, IStorageAdapter } from "./gameStateRepository"

describe("gameStateRepository", () => {
    const storageAdapterSpy = (): IStorageAdapter => ({
        save: jasmine.createSpy("save"),
        load: jasmine.createSpy("load")
    })

    it("saves a game with a given key", () => {
        const storageSpy = storageAdapterSpy();
        const gameState: IGameState = {
            id: 1234,
            state: "{}"
        }

        const repository = new GameStateRepository(storageSpy)
        repository.save(gameState);

        expect(storageSpy.save).toHaveBeenCalledWith(1234, "{}")
    })

    it("loads a game with a given key", () => {
        const gameState: IGameState = {
            id: 1234,
            state: "{}"
        };

        const storageSpy = storageAdapterSpy();
        (storageSpy.load as jasmine.Spy).and.returnValue(gameState.state)

        const repository = new GameStateRepository(storageSpy)
        const loadedGame = repository.load(1234)

        expect(loadedGame.id).toEqual(1234)
        expect(loadedGame.state).toEqual(gameState.state)
    })
})