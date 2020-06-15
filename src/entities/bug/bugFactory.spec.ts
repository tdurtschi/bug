import BugFactory from "./bugFactory"
import Bug from "./bug"
import Victor = require("victor")
import { expectEquals } from "../../testutil"

describe("BugFactory", () => {
  it("Creates a bug", () => {
    const bug: Bug = new BugFactory(() => 0, 0).build()
    expect(bug)
  })

  it("Passes initial state", () => {
    const bug: Bug = new BugFactory(() => 0, 0).build({
      pos: new Victor(100, 100),
    })
    expectEquals(bug.pos, new Victor(100, 100))
  })

  it("Applies the correct ID", () => {
    const idGenerator = () => 1337
    const bug: Bug = new BugFactory(idGenerator, 0).build()
    expect(bug.id).toEqual(1337)
  })

  it("Defaults position to a pseudo-random X coord at Y=0", () => {
    const bugFactory = new BugFactory(() => 0, 100)
    const bug: Bug = bugFactory.build()
    expect(bug.pos.y).toEqual(0)
    expect(bug.pos.x).not.toEqual(bugFactory.build().pos.x)
  })
})
