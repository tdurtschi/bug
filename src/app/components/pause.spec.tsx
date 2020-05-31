import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'
import BugFactory from '../../entities/bug/bugFactory'
import PlantFactory from '../../entities/plant/plantFactory'
import { gameStub } from '../../../spec/game-stub'

describe("Pause button", () => {
	const game = gameStub();

	it("Calls the togglePause method on the UI.", () => {
		const rendered = render(<App
			game={game}
			width={0}
			height={0}
			bugFactory={new BugFactory(() => 0, () => false, 0)}
			treeFactory={new PlantFactory(() => 0, () => false, 0)} />)
		const button = rendered.container.querySelector("#pause-button")
		fireEvent.click(button)

		expect(game.togglePause).toHaveBeenCalled()
	})
})