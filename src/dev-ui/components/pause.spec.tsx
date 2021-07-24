import React from "react"
import { render, fireEvent } from "@testing-library/react"
import App from "./App"
import BugFactory from "../../core/entities/bug/bugFactory"
import PlantFactory from "../../core/entities/plant/plantFactory"
import { gameStub } from "../../../spec/fixtures/game-stub"

describe("Pause button", () => {
  const game = gameStub()

  it("Calls the togglePause method on the UI.", () => {
    const rendered = render(
      <App
        game={game}
        width={0}
        height={0}
        bugFactory={new BugFactory(() => 0, 0)}
        plantFactory={new PlantFactory(() => 0, 0)}
      />
    )
    const button = rendered.container.querySelector("#pause-button")
    fireEvent.click(button)

    expect(game.togglePause).toHaveBeenCalled()
  })
})
