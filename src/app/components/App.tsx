import * as React from 'react'
import { Game } from '../../core/game-engine'
import Victor from "victor"
import BugFactory from '../../entities/bug/bugFactory'
import TreeFactory from '../../entities/tree/treeFactory'
import { randBool } from '../../util'
import { BugMode } from '../../entities/bug/bugConstants'

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
		document.addEventListener("keydown", this.handleKeyDown)
	}

	render() {
		return (
			<div>
				<div id="bug-background"></div>
				<canvas id="bug-ui" height={this.props.height} width={this.props.width}></canvas>
				<div id="bug-controls">
					<button
						id="pause-button"
						className={this.props.game.isPaused ? "paused" : ""}
						onClick={this.pause}
					>
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

	private handleKeyDown = (e: KeyboardEvent) => {
		switch (e.key)
		{
			case "p":
				this.pause()
				break
			case "b":
				this.addBug()
				break
			case "t":
				this.addTree()
				break
		}
	}

	private pause = () => {
		this.props.game.togglePause();
		this.forceUpdate();
	}

	private addTree = (): void => {
		const { game, treeFactory } = this.props

		const pos = new Victor(this.randomX(), 0)

		game.addEntity(treeFactory.build({ pos }))
	}

	private addBug = () => {
		const { game, bugFactory } = this.props

		const pos = new Victor(this.randomX(), 0)
		const direction = randBool() ? new Victor(1, 0) : new Victor(-1, 0)
		const size = new Victor(30, 20)
		const mode = BugMode.WALKING

		game.addEntity(bugFactory.build({ pos, direction, size, mode }))
	}

	private randomX = () => {
		return Math.floor(Math.random() * (this.props.width - 40));
	}
}

export default App