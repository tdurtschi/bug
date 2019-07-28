import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import App from '../../src/app/components/App'

describe("Pause button", () => {
	it("Calls the togglePause method on the UI.", () => {
		const pauseSpy = jasmine.createSpy()
		const rendered = render(<App startUIEngine={() => ({togglePause: pauseSpy})}/>)
		const button = rendered.container.querySelector("#pause-button")
		fireEvent.click(button)
		
		expect(pauseSpy).toHaveBeenCalled()
	})
})