import Plant from "./plant"
import PlantFactory from "./plantFactory"
import Victor from "victor"
import { vectorEquals } from "../../util"

describe("TreeFactory", () => {
  it("Creates a tree", () => {
    const tree: Plant = new PlantFactory(() => 0, 0).build()
    expect(tree)
  })

  it("Passes initial state", () => {
    const tree: Plant = new PlantFactory(() => 0, 0).build({
      pos: new Victor(100, 100),
    })
    expect(vectorEquals(tree.pos, new Victor(100, 100))).toBeTruthy()
  })

  it("Applies the correct ID", () => {
    const idGenerator = () => 1337
    const tree: Plant = new PlantFactory(idGenerator, 0).build()
    expect(tree.id).toEqual(1337)
  })

  it("Defaults position to a pseudo-random X coord at Y=0", () => {
    const plantFactory = new PlantFactory(() => 0, 100)
    const tree: Plant = plantFactory.build()
    expect(tree.pos.y).toEqual(0)
    expect(tree.pos.x).not.toEqual(plantFactory.build().pos.x)
  })
})
