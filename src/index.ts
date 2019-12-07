import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Victor from "victor";

import App from "./app/components/App";
import { GameEngine, Game } from './core/game-engine';
import Wall from './entities/wall/wall';
import EntityManager from './core/entity-manager';
import CanvasUI from './app/canvas-ui';
import "./app/app.scss";

const startGame = (): Game => new GameEngine({
	gameUI: new CanvasUI({
		target: "bug-ui",
		entityManager
	}),
	entityManager
})

const appProps = {
	startGame,
	height: window.innerHeight,
	width: window.innerWidth
}

const entities = [
	new Wall(1, { pos: new Victor(-10, 0), size: new Victor(10, appProps.height) }),
	new Wall(2, { pos: new Victor(appProps.width, 0), size: new Victor(10, appProps.height) }),
]

const entityManager = new EntityManager(entities)

ReactDOM.render(React.createElement(App, appProps), document.getElementById('root'));

(window as any).Victor = Victor
