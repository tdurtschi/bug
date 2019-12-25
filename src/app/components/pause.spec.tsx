import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'
import BugFactory from '../../entities/bug/bugFactory'
import TreeFactory from '../../entities/tree/treeFactory'

describe("Pause button", () => {
	const pauseSpy = jasmine.createSpy()
	const stubGame = {
		isPaused: false,
		togglePause: pauseSpy,
		addEntity: (): any => null,
		start: (): any => null
	}
	it("Calls the togglePause method on the UI.", () => {
		const rendered = render(<App
			game={stubGame}
			width={0}
			height={0}
			bugFactory={new BugFactory(() => 0, () => false)}
			treeFactory={new TreeFactory(() => 0, () => false)} />)
		const button = rendered.container.querySelector("#pause-button")
		fireEvent.click(button)

		expect(pauseSpy).toHaveBeenCalled()
	})
})