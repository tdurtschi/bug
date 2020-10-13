import "jasmine"
import Victor from "victor"
import { expectEquals } from "../../testutil"
import Bug from "./bug"
import { fromJson, toJson } from "./bugSerializer"

describe("BugSerializer", () => {
    describe("Serialization & Deserialization", () => {
        it("A basic bug.", () => {
            const TEST_ID = 18
            const bug = new Bug(TEST_ID, {
                speed: 19,
                pos: new Victor(20, 21),
                size: new Victor(22, 23),
                direction: new Victor(24, 25)
            })

            const clonedBug = fromJson(toJson(bug))

            expect(bug.id).toEqual(clonedBug.id)
            expectEquals(bug.pos, clonedBug.pos)
            expectEquals(bug.size, clonedBug.size)
            expectEquals(bug.direction, clonedBug.direction)
        })
    })
})