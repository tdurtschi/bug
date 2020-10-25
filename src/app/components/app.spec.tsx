import React from "react"
import { fireEvent, render } from "@testing-library/react"
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

  describe("save button", () => {
    it("saves to the repository", () => {
      const game = gameStub()
      const gameStateRepository = {
        save: jasmine.createSpy("save"),
        load: jasmine.createSpy("load")
      }

      const app = render(
        <App
          game={game}
          gameStateRepository={gameStateRepository}
          width={0}
          height={0}
          bugFactory={new BugFactory(() => 0, 0)}
          treeFactory={new PlantFactory(() => 0, 0)}
        />
      )

      const button = app.container.querySelector("#save")
      fireEvent.click(button)

      expect(game.exportCurrentState).toHaveBeenCalledBefore(gameStateRepository.save)
      expect(gameStateRepository.save).toHaveBeenCalled()
    })
  })

  describe("load button", () => {
    it("loads from the repository", () => {
      const game = gameStub()
      const gameStateRepository = {
        save: jasmine.createSpy("save"),
        load: jasmine.createSpy("load")
      }

      const app = render(
        <App
          game={game}
          gameStateRepository={gameStateRepository}
          width={0}
          height={0}
          bugFactory={new BugFactory(() => 0, 0)}
          treeFactory={new PlantFactory(() => 0, 0)}
        />
      )

      const button = app.container.querySelector("#load")
      fireEvent.click(button)

      expect(gameStateRepository.load).toHaveBeenCalledBefore(game.loadFromState)
      expect(game.loadFromState).toHaveBeenCalled()
    })
  })
})
