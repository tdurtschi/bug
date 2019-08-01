import * as React from 'react';
import { Game } from '../game-engine';

interface Props{
	startUIEngine: () => Game
}

interface State{
	bugUi: Game
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