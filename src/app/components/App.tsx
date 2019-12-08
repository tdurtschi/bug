import * as React from 'react'
import { Game } from '../../core/game-engine'
import Victor from "victor"
import Tree from '../../entities/tree/tree'
import BugFactory from '../../entities/bug/bugFactory'

interface Props {
	game: Game,
	height: number,
	width: number,
	bugFactory: BugFactory
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
		const treeX = Math.floor(Math.random() * (this.props.width - 40))
		const treeY = 0

		this.props.game.addEntity(new Tree(id++, { pos: new Victor(treeX, treeY) }))
	}

	private addBug() {
		const bugX = Math.floor(Math.random() * (this.props.width - 40))
		const bugY = 0

		const direction = Math.random() < 0.5 ? new Victor(1, 0) : new Victor(-1, 0)

		this.props.game.addEntity(this.props.bugFactory.build({ pos: new Victor(bugX, bugY), direction }))
	}
}

export default App