import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import BugFactory from '../../entities/bug/bugFactory'

describe("App", () => {
	it("Starts the game upon rendering.", () => {
		const pauseSpy = jasmine.createSpy()
		const startSpy = jasmine.createSpy("start")
		render(<App
			game={{ togglePause: pauseSpy, addEntity: () => null, start: startSpy }}
			width={0}
			height={0}
			bugFactory={new BugFactory(() => 0, () => false)} />)

		expect(startSpy).toHaveBeenCalled()
	})
})