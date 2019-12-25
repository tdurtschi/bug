import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import BugFactory from '../../entities/bug/bugFactory'
import TreeFactory from '../../entities/tree/treeFactory'

describe("App", () => {
	it("Starts the game upon rendering.", () => {
		const pauseSpy = jasmine.createSpy()
		const startSpy = jasmine.createSpy("start")
		const stubGame = {
			isPaused: false,
			togglePause: pauseSpy,
			addEntity: (): any => null,
			start: startSpy
		}

		render(<App
			game={stubGame}
			width={0}
			height={0}
			bugFactory={new BugFactory(() => 0, () => false)}
			treeFactory={new TreeFactory(() => 0, () => false)} />)

		expect(startSpy).toHaveBeenCalled()
	})
})