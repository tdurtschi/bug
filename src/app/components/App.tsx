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

interface State {
	bug?: any
}

class App extends React.Component<Props, State> {
	componentDidMount() {
		this.props.game.start()
		this.setState({})
		document.addEventListener("keydown", this.handleKeyDown)
		setInterval(() => this.forceUpdate(), 500)
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
				<pre>
					{window.DEBUG &&
						<p className="debug">
							{JSON.stringify(this.state, null, 4)}
						</p>}
				</pre>
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
			case "d":
				window.DEBUG = !window.DEBUG
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

		const bug = bugFactory.build({ pos, direction, size, mode })
		this.setState({ bug })
		game.addEntity(bug)
	}

	private randomX = () => {
		return Math.floor(Math.random() * (this.props.width - 40));
	}
}

export default App