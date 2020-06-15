import * as React from "react"
import * as ReactDOM from "react-dom"
import Victor from "victor"

import App from "./app/components/App"
import { GameEngine } from "./core/game-engine"
import EntityManager from "./core/entity-manager"
import CanvasUI from "./canvas-ui/canvas-ui"
import "./app/app.scss"
import BugFactory from "./entities/bug/bugFactory"
import { generateId } from "./core/id-generator"
import { range } from "./util"
import PlantFactory from "./entities/plant/plantFactory"

const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth

console.info("Starting Bug app...")

const entityManager = new EntityManager([])

const game = new GameEngine({
  gameUI: new CanvasUI("#bug-ui", entityManager),
  entityManager,
  height: HEIGHT,
  width: WIDTH,
})

const bugFactory = new BugFactory(generateId, WIDTH)
const treeFactory = new PlantFactory(generateId, WIDTH)

const appProps = {
  game,
  height: HEIGHT,
  width: WIDTH,
  bugFactory,
  treeFactory,
  entityManager, // TODO - Reduce # of components holding ref to this.
}

ReactDOM.render(
  React.createElement(App, appProps),
  document.getElementById("root")
)

window.Victor = Victor
window.DEBUG = false
