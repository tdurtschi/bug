import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Victor from "victor";

import App from "./app/components/App";
import { GameEngine, Game } from './core/game-engine';
import Wall from './entities/wall/wall';
import EntityManager from './core/entity-manager';
import CanvasUI from './app/canvas-ui';
import "./app/app.scss";
import BugFactory from './entities/bug/bugFactory';
import { idGenerator } from './core/id-generator';
import Spontaneous from './core/spontaneous';
import { range } from './util';

const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth

const entities = [
	new Wall(1, { pos: new Victor(-10, 0), size: new Victor(10, HEIGHT) }),
	new Wall(2, { pos: new Victor(WIDTH, 0), size: new Victor(10, HEIGHT) }),
]

const entityManager = new EntityManager(entities)

const game = new GameEngine({
	gameUI: new CanvasUI({
		target: "bug-ui",
		entityManager
	}),
	entityManager
})

const bugFactory = new BugFactory(idGenerator, new Spontaneous(() => range(5, 5) * 1000, () => range(10, 4)).get);

const appProps = {
	game,
	height: HEIGHT,
	width: WIDTH,
	bugFactory
}

ReactDOM.render(React.createElement(App, appProps), document.getElementById('root'));

(window as any).Victor = Victor
