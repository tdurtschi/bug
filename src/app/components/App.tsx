import * as React from 'react'
import { Game } from '../../core/game-engine'
import Victor from "victor"
import BugFactory from '../../entities/bug/bugFactory'
import PlantFactory from '../../entities/plant/plantFactory'
import { randInt } from '../../util'
import { Debugger } from './Debugger'
import { IGameStateRepository } from '../../persistence/gameStateRepository'

interface Props {
	game: Game,
	height: number,
	width: number,
	bugFactory: BugFactory,
	treeFactory: PlantFactory,
	gameStateRepository?: IGameStateRepository
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
				<div id="bug-ui" style={{ height: this.props.height, width: this.props.width }}></div>
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
					<button id="save" onClick={() => this.save()}>
						Save
					</button>
					<button id="load" onClick={() => this.load()}>
						Load
					</button>
				</div>
				<Debugger game={this.props.game} />
			</div >);
	}

	private load(): void {
		if (this.props.gameStateRepository) {
			const gameState = this.props.gameStateRepository.load(0)
			this.props.game.loadFromState(gameState)
		} else {
			throw new Error("GameStateRepository not provided.")
		}
	}

	private save(): void {
		if (this.props.gameStateRepository) {
			const gameState = this.props.game.exportCurrentState()
			this.props.gameStateRepository.save(gameState)
		} else {
			throw new Error("GameStateRepository not provided.")
		}
	}

	private handleKeyDown = (e: KeyboardEvent) => {
		switch (e.key) {
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

	private addPlant = (): void => {
		const { game, treeFactory } = this.props

		game.addEntity(treeFactory.build())
	}

	private addBug = () => {
		const { game, bugFactory } = this.props

		const scaleFactor = randInt(5, 10)
		const size = new Victor(3, 2).multiplyScalar(scaleFactor)
		const speed = scaleFactor / 10

		const bug = bugFactory.build({ size, speed })
		this.setState({ bug })
		game.addEntity(bug)
	}
}

export default App