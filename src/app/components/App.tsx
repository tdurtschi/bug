import * as React from 'react';
import { UI } from '../ui-engine';

interface Props{
	startUIEngine: () => UI
}

interface State{
	bugUi: UI
}

class App extends React.Component<Props, State> {
	componentDidMount() {
		this.state = {bugUi: this.props.startUIEngine()}
	}

	render() {
		return (
		<div>
			<canvas id="bug-ui" height={400} width={400}></canvas>
			<button id="pause-button" onClick={() => this.state.bugUi.togglePause()}>
				PAUSE
			</button>
		</div>);
	}
}

export default App