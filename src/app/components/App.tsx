import * as React from 'react';
import { Game } from '../game-engine';

interface Props {
	startGame: () => Game
}

interface State {
	game: Game
}

class App extends React.Component<Props, State> {
	componentDidMount() {
		this.state = { game: this.props.startGame() }
	}

	render() {
		return (
			<div>
				<canvas id="bug-ui" height={400} width={400}></canvas>
				<button id="pause-button" onClick={() => this.state.game.togglePause()}>
					PAUSE
			</button>
			</div>);
	}
}

export default App