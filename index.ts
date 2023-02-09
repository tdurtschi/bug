// Entry point for NPM package
import { GameEngine } from "./src/core/game-engine"
import CanvasUI from "./src/core/canvas-ui/canvas-ui"
import EntityManager from "./src/core/entity-manager"

const entityManager = new EntityManager()

export const Game = (target: string, height?: number, width?: number) => {
    height = height || document.querySelector(target).clientHeight
    width = width || document.querySelector(target).clientWidth
    
    return {
        game: new GameEngine({
            gameUI: new CanvasUI(target, entityManager),
            entityManager,
            height,
            width,
        })
    }
}
