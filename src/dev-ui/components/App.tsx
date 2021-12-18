import * as React from 'react'
import { Game } from '../../core/game-engine'
import Victor from "victor"
import { randInt } from '../../core/util/stats'
import { Debugger } from './Debugger'
import { BugForm } from './forms/BugForm'
import Bug, { BugState } from '../../core/entities/bug/bug'
import { useEffect, useState } from 'react'
import { PlantForm } from './forms/PlantForm'
import { PlantState } from '../../core/entities/plant/plant'
import { fixY } from '../../core/canvas-ui/canvas-helpers'
import { isPointInsideEntity } from '../../core/entity-updater'
import Entity from '../../core/entities/entity'

interface Props {
	game: Game,
	height: number,
	width: number
}

enum CurrentForm {
	NONE,
	BUG,
	PLANT
}

const App = (props: Props) => {
	const [currentForm, setCurrentForm] = useState(CurrentForm.NONE);
	const [isPaused, setIsPaused] = useState(false);
	const bugUiRef = React.createRef();

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

	const addPlant = (initialState?: Partial<PlantState>): void => {
		const { game } = props

		game.addPlant(initialState)
	}

	const addBug = (initialState?: Partial<BugState>) => {
		const { game } = props

		const scaleFactor = randInt(5, 10)
		const size = new Victor(3, 2).multiplyScalar(scaleFactor)
		const speed = scaleFactor / 10

		game.addBug(initialState ?? { size, speed })
	}

	const targetEntity = (clientX: number, clientY: number) => {
		const { game } = props

		const canvasElement = (bugUiRef.current as HTMLDivElement);
		const localX = clientX - canvasElement.offsetLeft
		const localY = fixY(canvasElement.clientHeight, clientY - canvasElement.offsetTop)
		
		const clickedEntities: Entity[] = [];
		game.getEntities().forEach((e) => {
			if(e instanceof Bug) {
				if (isPointInsideEntity(e, localX, localY)){
					console.log("you clicked on: ", e);
					clickedEntities.push(e);
				}
			}
		});
		return clickedEntities.length > 0 ? clickedEntities[0] : undefined;
	}

	return (
		<div>
			<div id="bug-background"></div>
			<div id="ground"></div>
			<div ref={bugUiRef as React.RefObject<HTMLDivElement>} id="bug-ui" 
				style={{ height: props.height, width: props.width }}
				onClick={(event) => {
					targetEntity(event.clientX, event.clientY)
				}}
			></div>
			<div id="bug-controls">
				<ul id="bug-tabs">
					<li id="add-bug" onClick={() => setCurrentForm(CurrentForm.BUG)}>
						Add Bug
					</li>
					<li id="add-plant" onClick={() => setCurrentForm(CurrentForm.PLANT)}>
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
				{currentForm == CurrentForm.PLANT && <PlantForm addPlant={addPlant} />}
			</div>
			<Debugger game={props.game} />
		</div >);
}

export default App