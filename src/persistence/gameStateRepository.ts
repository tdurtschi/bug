export interface IGameState {
    state: string
    id: number | undefined
}

export interface IStorageAdapter {
    save: (key: number, value: string) => void
    load: (key: number) => string | undefined
}

export class LocalStorageAdapter implements IStorageAdapter {
    STORAGE_KEY = "bug-game"
    storage = window.localStorage

    public save(key: number, value: string) {
        this.storage.setItem(`bug-${key}`, value)
    }

    public load(key: number) {
        return this.storage.getItem(`bug-${key}`)
    }
}

export interface IGameStateRepository {
    save: (gameState: IGameState) => void
    load: (id: number) => IGameState
}

export default class gameStateRepository {
    constructor(
        private storageAdapter: IStorageAdapter
    ) { }

    public save(gameState: IGameState) {
        this.storageAdapter.save(gameState.id, gameState.state)
    }

    public load(id: number): IGameState {
        const state = this.storageAdapter.load(id)
        return { id, state };
    }

    // public clearAll() {
    //     this.storage.removeItem(this.STORAGE_KEY)
    // }
}