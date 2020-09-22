// Entry point for NPM package
import { GameEngine } from "./src/core/game-engine"
import CanvasUI from "./src/canvas-ui/canvas-ui"
import EntityManager from "./src/core/entity-manager"
import { range } from "./src/util"
import BugFactory from "./src/entities/bug/bugFactory"
import { generateId } from "./src/core/id-generator"
import PlantFactory from "./src/entities/plant/plantFactory"
import Victor from "victor"

export { GameEngine };
