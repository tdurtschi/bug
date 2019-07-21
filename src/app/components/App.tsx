import * as React from 'react';
import { BugUI } from '../../bug/bug-ui/ui-engine';

class App extends React.Component {
	componentDidMount() {
		new BugUI({target: "bug-ui"})
	}

	render() {
		return (<>
			<canvas id={"bug-ui"} height={400} width={400}></canvas>
		</>);
	}
}

export default App