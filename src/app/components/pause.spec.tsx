import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'
import BugFactory from '../../entities/bug/bugFactory'

describe("Pause button", () => {
	it("Calls the togglePause method on the UI.", () => {
		const pauseSpy = jasmine.createSpy()
		const rendered = render(<App
			game={{ togglePause: pauseSpy, addEntity: () => null, start: () => null }}
			width={0}
			height={0}
			bugFactory={new BugFactory(() => 0, () => false)} />)
		const button = rendered.container.querySelector("#pause-button")
		fireEvent.click(button)

		expect(pauseSpy).toHaveBeenCalled()
	})
})