import React from "react"
import { render } from "@testing-library/react"
import App from "./App"
import { gameStub } from "../../../spec/fixtures/game-stub"

describe("App", () => {
  it("Starts the game upon rendering.", () => {
    const game = gameStub()

    render(
      <App
        game={game}
        width={0}
        height={0}
      />
    )

    expect(game.start).toHaveBeenCalled()
  })
})
