import * as React from 'react'
import { Game } from '../../core/game-engine'
import Victor from "victor"
import BugFactory from '../../entities/bug/bugFactory'
import TreeFactory from '../../entities/tree/treeFactory'

interface Props {
	game: Game,
	height: number,
	width: number,
	bugFactory: BugFactory,
	treeFactory: TreeFactory
}

let id = 5

class App extends React.Component<Props> {
	componentDidMount() {
		this.props.game.start()
	}

	render() {
		return (
			<div>
				<div id="bug-background"></div>
				<canvas id="bug-ui" height={this.props.height} width={this.props.width}></canvas>
				<div id="bug-controls">
					<button id="pause-button" onClick={() => this.props.game.togglePause()}>
						PAUSE
					</button>
					<button id="add-bug" onClick={() => this.addBug()}>
						Add Bug
					</button>
					<button id="add-tree" onClick={() => this.addTree()}>
						Add Tree
					</button>
				</div>
			</div >);
	}

	private addTree(): void {
		const { game, treeFactory } = this.props

		const pos = new Victor(this.randomX(), 0)

		game.addEntity(treeFactory.build({ pos }))
	}

	private addBug() {
		const { game, bugFactory } = this.props

		const pos = new Victor(this.randomX(), 0)
		const direction = Math.random() < 0.5 ? new Victor(1, 0) : new Victor(-1, 0)

		game.addEntity(bugFactory.build({ pos, direction }))
	}

	private randomX() {
		return Math.floor(Math.random() * (this.props.width - 40));
	}
}

export default App