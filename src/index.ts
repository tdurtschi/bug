import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Victor from "victor";

import App from "./app/components/App";
import { BugUI, UI } from './app/ui-engine';
import Bug from './bug/bug';
import Wall from './wall/wall';

const startUIEngine = (): UI => new BugUI({
	target: "bug-ui",
	entities: [
		new Bug(0, {pos: new Victor(0, 20)}),
		new Wall(1, {pos: new Victor(80, 0)})
	]
})

ReactDOM.render(React.createElement(App, {startUIEngine}), document.getElementById('root'));

