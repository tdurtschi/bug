// Entry point for development SPA
import * as React from "react"
import * as ReactDOM from "react-dom"
import Victor from "victor"

import "./app/app.scss"
import App from "./app/components/App"
import { GameEngine } from "./core/game-engine"
import EntityManager from "./core/entity-manager"
import CanvasUI from "./canvas-ui/canvas-ui"
import BugFactory from "./entities/bug/bugFactory"
import { generateId } from "./core/id-generator"
import PlantFactory from "./entities/plant/plantFactory"
import { createDivInBodyWithId } from "./dom-util"
import gameStateRepository, { LocalStorageAdapter } from "./persistence/gameStateRepository"

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
  gameStateRepository: new gameStateRepository(new LocalStorageAdapter())
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
