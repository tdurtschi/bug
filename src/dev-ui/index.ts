// Entry point for development SPA
import * as React from "react"
import * as ReactDOM from "react-dom"
import Victor from "victor"

import "./global.scss"
import App from "./components/App"
import { Game } from "../../index"

console.info("Starting Bug app...")

const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth

const game = Game("#bug-ui", HEIGHT, WIDTH);

const appProps = {
  game: game.game,
  height: HEIGHT,
  width: WIDTH,
  bugFactory: game.bugFactory,
  plantFactory: game.plantFactory,
}

const TARGET_DIV_ID = "root"

if (!document.getElementById(TARGET_DIV_ID)) {
  createDivInBodyWithId(TARGET_DIV_ID)
}

ReactDOM.render(
  React.createElement(App, appProps),
  document.getElementById(TARGET_DIV_ID)
)

window.Victor = Victor
window.DEBUG = false

function createDivInBodyWithId(id: string) {
  const div = document.createElement("div");
  div.id = id;
  document.body.appendChild(div);
}