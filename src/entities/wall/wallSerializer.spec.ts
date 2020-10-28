import Victor from "victor"
import { expectEquals } from "../../testutil"
import Wall from "./wall"
import wallSerializer from "./wallSerializer"

describe("WallSerializer", () => {
    it("Serialization & Deserialization", () => {
        const TEST_ID = 18
        const wall = new Wall(TEST_ID, {
            pos: new Victor(20, 21),
            size: new Victor(22, 23)
        })

        const clonedWall = wallSerializer.fromSnapshot(wallSerializer.getSnapshot(wall))

        expect(wall.id).toEqual(clonedWall.id)
        expectEquals(wall.pos, clonedWall.pos)
        expectEquals(wall.size, clonedWall.size)
    })
})