// Entry point for development SPA
import * as React from "react"
import * as ReactDOM from "react-dom"
import Victor from "victor"

import "./global.scss"
import App from "./components/App"
import { GameEngine } from "../core/game-engine"
import EntityManager from "../core/entity-manager"
import CanvasUI from "../core/canvas-ui/canvas-ui"
import BugFactory from "../core/entities/bug/bugFactory"
import { generateId } from "../core/util/id-generator"
import PlantFactory from "../core/entities/plant/plantFactory"

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

const targetDivId = "root"

if (!document.getElementById(targetDivId)) {
  createDivInBodyWithId(targetDivId)
}

ReactDOM.render(
  React.createElement(App, appProps),
  document.getElementById(targetDivId)
)

window.Victor = Victor
window.DEBUG = false

function createDivInBodyWithId(id: string) {
  const div = document.createElement("div");
  div.id = id;
  document.body.appendChild(div);
}