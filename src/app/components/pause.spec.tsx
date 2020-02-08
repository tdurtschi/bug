import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'
import BugFactory from '../../entities/bug/bugFactory'
import TreeFactory from '../../entities/tree/treeFactory'
import { gameStub } from '../../../spec/game-stub'

describe("Pause button", () => {
	const game = gameStub();

	it("Calls the togglePause method on the UI.", () => {
		const rendered = render(<App
			game={game}
			width={0}
			height={0}
			bugFactory={new BugFactory(() => 0, () => false)}
			treeFactory={new TreeFactory(() => 0, () => false)} />)
		const button = rendered.container.querySelector("#pause-button")
		fireEvent.click(button)

		expect(game.togglePause).toHaveBeenCalled()
	})
})