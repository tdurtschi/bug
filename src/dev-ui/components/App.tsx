import * as React from 'react'
import { Game } from '../../core/game-engine'
import Victor from "victor"
import BugFactory from '../../core/entities/bug/bugFactory'
import PlantFactory from '../../core/entities/plant/plantFactory'
import { randInt } from '../../core/util/stats'
import { Debugger } from './Debugger'
import { BugForm } from './BugForm'
import { BugState } from '../../core/entities/bug/bug'
import { useEffect, useState } from 'react'

interface Props {
	game: Game,
	height: number,
	width: number,
	bugFactory: BugFactory,
	plantFactory: PlantFactory,
}

enum CurrentForm {
	NONE,
	BUG,
	PLANT
}

const App = (props: Props) => {
	const [currentForm, setCurrentForm] = useState(CurrentForm.NONE);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		props.game.start()
		document.addEventListener("keydown", handleKeyDown)
	}, []);

	const handleKeyDown = (e: KeyboardEvent) => {
		switch (e.key) {
			case "p":
				pause()
				break
			case "b":
				addBug()
				break
			case "t":
				addPlant()
				break
		}
	}

	const pause = () => {
		props.game.togglePause();
		setIsPaused(!isPaused);
	}

	const addPlant = (): void => {
		const { game, plantFactory: plantFactory } = props

		game.addEntity(plantFactory.build())
	}

	const addBug = (initialState?: Partial<BugState>) => {
		const { game, bugFactory } = props

		const scaleFactor = randInt(5, 10)
		const size = new Victor(3, 2).multiplyScalar(scaleFactor)
		const speed = scaleFactor / 10

		const bug = bugFactory.build(initialState ?? { size, speed })
		game.addEntity(bug)
	}

	return (
		<div>
			<div id="bug-background"></div>
			<div id="ground"></div>
			<div id="bug-ui" style={{ height: props.height, width: props.width }}></div>
			<div id="bug-controls">
				<ul id="bug-tabs">
					<li id="add-bug" onClick={() => setCurrentForm(CurrentForm.BUG)}>
						Add Bug
					</li>
					<li id="add-tree" onClick={() => addPlant()}>
						Add Plant
					</li>
					<li
						id="pause-button"
						className={props.game.isPaused ? "paused" : ""}
						onClick={pause}
					>
						PAUSE
					</li>
				</ul>
				{currentForm == CurrentForm.BUG && <BugForm addBug={addBug} />}
			</div>
			<Debugger game={props.game} />
		</div >);
}

export default App