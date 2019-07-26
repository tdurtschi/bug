import * as React from 'react';
import { BugUI } from '../ui-engine';
import Bug from '../../bug/bug';
import Wall from '../../wall/wall';
import Victor from "victor"

class App extends React.Component {
	componentDidMount() {
		new BugUI({
			target: "bug-ui",
			entities: [
				new Bug(),
				new Wall(0, {pos: new Victor(80, 0)})
			]
		})
	}

	render() {
		return (<>
			<canvas id={"bug-ui"} height={400} width={400}></canvas>
		</>);
	}
}

export default App