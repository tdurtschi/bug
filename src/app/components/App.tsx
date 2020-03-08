import * as React from 'react'
import { Game } from '../../core/game-engine'
import Victor from "victor"
import BugFactory from '../../entities/bug/bugFactory'
import PlantFactory from '../../entities/plant/plantFactory'
import { randBool, randInt } from '../../util'
import { Debugger } from './Debugger'

interface Props {
	game: Game,
	height: number,
	width: number,
	bugFactory: BugFactory,
	treeFactory: PlantFactory,
}

interface State {
}

class App extends React.Component<Props, State> {
	componentDidMount() {
		this.props.game.start()
		document.addEventListener("keydown", this.handleKeyDown)
	}

	render() {
		return (
			<div>
				<div id="bug-background"></div>
				<div id="ground"></div>
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
					<button id="add-tree" onClick={() => this.addPlant()}>
						Add Plant
					</button>
				</div>
				<Debugger game={this.props.game} />
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
				this.addPlant()
				break
		}
	}

	private pause = () => {
		this.props.game.togglePause();
		this.forceUpdate();
	}

	private plantPosCursor: Victor
	private addPlant = (): void => {
		const { game, treeFactory } = this.props

		if (!this.plantPosCursor) this.plantPosCursor = new Victor(this.randomX(), 0)
		this.plantPosCursor.x = (this.plantPosCursor.x + randInt(this.props.width / 2, this.props.width / 3)) % this.props.width

		game.addEntity(treeFactory.build({ pos: this.plantPosCursor.clone() }))
	}

	private addBug = () => {
		const { game, bugFactory } = this.props

		const scaleFactor = randInt(5, 10)
		const pos = new Victor(this.randomX(), 0)
		const direction = randBool() ? new Victor(1, 0) : new Victor(-1, 0)
		const size = new Victor(3, 2).multiplyScalar(scaleFactor)
		const speed = scaleFactor / 10

		const bug = bugFactory.build({ pos, direction, size, speed })
		this.setState({ bug })
		game.addEntity(bug)
	}

	private randomX = () => {
		return Math.floor(Math.random() * (this.props.width - 40));
	}
}

export default App