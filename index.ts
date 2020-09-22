// Entry point for NPM package
import { GameEngine } from "./src/core/game-engine"
import CanvasUI from "./src/canvas-ui/canvas-ui"
import EntityManager from "./src/core/entity-manager"
import BugFactory from "./src/entities/bug/bugFactory"
import { generateId } from "./src/core/id-generator"
import PlantFactory from "./src/entities/plant/plantFactory"

const entityManager = new EntityManager([])

export const Game = (target: string, height?: number, width?: number) => {
    height = height || document.querySelector(target).clientHeight
    width = width || document.querySelector(target).clientWidth
    return {
        game: new GameEngine({
            gameUI: new CanvasUI(target, entityManager),
            entityManager,
            height,
            width,
        }),
        bugFactory: new BugFactory(generateId, width),
        plantFactory: new PlantFactory(generateId, width),
    }
}
