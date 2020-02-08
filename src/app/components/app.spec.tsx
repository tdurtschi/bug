import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import BugFactory from '../../entities/bug/bugFactory'
import TreeFactory from '../../entities/tree/treeFactory'
import { gameStub } from '../../../spec/game-stub'

describe("App", () => {
	it("Starts the game upon rendering.", () => {
		const game = gameStub();

		render(<App
			game={game}
			width={0}
			height={0}
			bugFactory={new BugFactory(() => 0, () => false)}
			treeFactory={new TreeFactory(() => 0, () => false)} />)

		expect(game.start).toHaveBeenCalled()
	})
})