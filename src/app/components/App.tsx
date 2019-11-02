import * as React from 'react';
import { Game } from '../game-engine';
import Bug from '../../bug/bug';
import Victor from "victor"

interface Props {
	startGame: () => Game
}

interface State {
	game: Game
}

let id = 5

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
				<button id="add-bug" onClick={() => this.state.game.addEntity(new Bug(id++, { pos: new Victor(100, 0) }))}>
					Click Me
				</button>
			</div >);
	}
}

export default App