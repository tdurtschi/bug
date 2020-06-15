import React from "react"
import { render } from "@testing-library/react"
import App from "./App"
import BugFactory from "../../entities/bug/bugFactory"
import PlantFactory from "../../entities/plant/plantFactory"
import { gameStub } from "../../../spec/game-stub"

describe("App", () => {
  it("Starts the game upon rendering.", () => {
    const game = gameStub()

    render(
      <App
        game={game}
        width={0}
        height={0}
        bugFactory={new BugFactory(() => 0, 0)}
        treeFactory={new PlantFactory(() => 0, 0)}
      />
    )

    expect(game.start).toHaveBeenCalled()
  })
})
