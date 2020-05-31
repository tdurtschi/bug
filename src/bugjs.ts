import { GameEngine } from "./core/game-engine";
import CanvasUI from "./canvas-ui/canvas-ui";
import EntityManager from "./core/entity-manager";
import Spontaneous from "./core/spontaneous";
import { range } from "./util";
import BugFactory from "./entities/bug/bugFactory";
import { generateId } from "./core/id-generator";
import PlantFactory from "./entities/plant/plantFactory";
import Victor from "victor";

const entityManager = new EntityManager([]);

const spontaneous = new Spontaneous(
    () => range(8000, 4000),
    () => range(10, 4)
).get;
console.log(generateId);

window.Game = (target: string, height?: number, width?: number) => {
    height = height || document.querySelector(target).clientHeight;
    width = width || document.querySelector(target).clientWidth;
    return {
        game: new GameEngine({
            gameUI: new CanvasUI(target, entityManager),
            entityManager,
            height,
            width
        }),
        bugFactory: new BugFactory(generateId, spontaneous, width),
        plantFactory: new PlantFactory(generateId, spontaneous, width)
    }
};
window.
    window
window.DEBUG = false
window.Victor = Victor