import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Victor from "victor";

import App from "./app/components/App";
import { GameEngine, Game } from './app/game-engine';
import Bug from './bug/bug';
import Wall from './wall/wall';
import Tree from './tree/tree';
import EntityManager from './app/entity-manager';
import BugUIState from './bug/bug-ui/bug-ui-state';

const entities = [
	new Bug(0, { pos: new Victor(50, 0) }),
	new Wall(1, { pos: new Victor(-5, 0), size: new Victor(10, 400) }),
	new Wall(2, { pos: new Victor(395, 0), size: new Victor(10, 400) }),
	new Tree(3, { pos: new Victor(150, 0) })
]

const uiEntities = [new BugUIState(0)]

const entityManager = new EntityManager(entities, uiEntities)

const startUIEngine = (): Game => new GameEngine({
	target: "bug-ui",
	entities: entityManager.entities,
	uiEntities: entityManager.uiEntities
})

ReactDOM.render(React.createElement(App, { startUIEngine }), document.getElementById('root'));

(window as any).Victor = Victor
