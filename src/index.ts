import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Victor from "victor";

import App from "./app/components/App";
import { GameEngine, Game } from './app/game-engine';
import Wall from './wall/wall';
import EntityManager from './app/entity-manager';
import GameUI from './app/game-ui';

const entities = [
	new Wall(1, { pos: new Victor(-10, 0), size: new Victor(10, 400) }),
	new Wall(2, { pos: new Victor(400, 0), size: new Victor(10, 400) }),
]

const entityManager = new EntityManager(entities)

const startGame = (): Game => new GameEngine({
	gameUI: new GameUI({
		target: "bug-ui",
		entityManager
	}),
	entityManager
})

ReactDOM.render(React.createElement(App, { startGame }), document.getElementById('root'));

(window as any).Victor = Victor
