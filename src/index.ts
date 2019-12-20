import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Victor from "victor";

import App from "./app/components/App";
import { GameEngine } from './core/game-engine';
import Wall from './entities/wall/wall';
import EntityManager from './core/entity-manager';
import CanvasUI from './canvas-ui/canvas-ui';
import "./app/app.scss";
import BugFactory from './entities/bug/bugFactory';
import { generateId } from './core/id-generator';
import Spontaneous from './core/spontaneous';
import { range } from './util';
import TreeFactory from './entities/tree/treeFactory';

const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth

const entities = [
	new Wall(generateId(), { pos: new Victor(-10, 0), size: new Victor(10, HEIGHT) }),
	new Wall(generateId(), { pos: new Victor(WIDTH, 0), size: new Victor(10, HEIGHT) }),
]

const entityManager = new EntityManager(entities)

const game = new GameEngine({
	gameUI: new CanvasUI({
		target: "bug-ui",
		entityManager
	}),
	entityManager
})

const spontaneous = new Spontaneous(() => range(5, 5) * 1000, () => range(10, 4)).get

const bugFactory = new BugFactory(generateId, spontaneous)
const treeFactory = new TreeFactory(generateId, spontaneous)

const appProps = {
	game,
	height: HEIGHT,
	width: WIDTH,
	bugFactory,
	treeFactory
}

ReactDOM.render(React.createElement(App, appProps), document.getElementById('root'));

(window as any).Victor = Victor
