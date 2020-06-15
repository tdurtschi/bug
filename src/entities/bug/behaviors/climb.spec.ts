import Plant from "../../plant/plant"
import Victor = require("victor")
import TreeBuilder from "../../plant/treeBuilder"
import Bug from "../bug"
import { Climb } from "./climb"
import { multi, vectorEquals } from "../../../util"
import { expectEquals } from "../../../testutil"
import { TurnAround } from "./turnAround"

describe("Climbing mode", () => {
  it("Climbs up on a branch", () => {
    const tree = new Plant(1, {
      pos: new Victor(0, 0),
      graph: new TreeBuilder().node(0, 100).build(),
    })

    const bug = new Bug(0, {
      speed: 1,
      pos: new Victor(0, 30),
      climbingOn: { plant: tree, branch: tree.graph },
      direction: new Victor(0, 1),
    })

    new Climb(bug).do()
    expect(bug.pos.y).toEqual(31)
  })

  it(
    "Will pick the left or right branch to climb up if its at the end of a branch",
    multi(10, () => {
      const tree = new TreeBuilder()
        .node(0, 30)
        .left(new TreeBuilder().node(-30, 30).build())
        .right(new TreeBuilder().node(30, 30).build())
        .build()

      const bug = new Bug(0, {
        speed: 1,
        pos: new Victor(0, 30),
        climbingOn: {
          plant: new Plant(1, { pos: new Victor(0, 0), graph: tree }),
          branch: tree,
        },
        direction: new Victor(0, 1),
      })

      new Climb(bug).do()

      const onLeftBranch = bug.climbingOn.branch === tree.left
      const onRightBranch = bug.climbingOn.branch === tree.right
      expect(onLeftBranch || onRightBranch).toBeTruthy()
      expect(
        vectorEquals(
          bug.direction,
          (onLeftBranch ? tree.left : tree.right).node.clone().norm()
        )
      ).toBeTruthy()
    })
  )

  it("Turns around if the next branch doesn't exist", () => {
    const tree = new TreeBuilder().node(0, 30).build()

    const bug = new Bug(0, {
      speed: 1,
      pos: new Victor(0, 30),
      climbingOn: {
        plant: new Plant(1, { pos: new Victor(0, 0), graph: tree }),
        branch: tree,
      },
      direction: new Victor(0, 1),
    })
    const climb = new Climb(bug)
    bug.queueBehavior(climb)
    bug.update()

    expect(bug.behaviorQueue[0] instanceof TurnAround).toBeTruthy()
  })

  it("Moves to the parent branch when climbing down", () => {
    const tree = new TreeBuilder()
      .node(0, 30)
      .left(new TreeBuilder().node(-30, 30).build())
      .build()

    const climbingBranch = tree.left
    const direction = climbingBranch.node.clone().norm().multiplyScalar(-1)

    const bug = new Bug(0, {
      speed: 1,
      pos: new Victor(0, 30),
      climbingOn: {
        plant: new Plant(1, { pos: new Victor(0, 0), graph: tree }),
        branch: tree.left,
      },
      direction: direction,
    })

    new Climb(bug).do()

    expect(bug.climbingOn.branch).toBe(tree)
    expectEquals(bug.direction, new Victor(0, -1))
  })

  it(
    "Returns to the ground if no parent branch",
    multi(5, () => {
      const tree = new TreeBuilder().node(0, 30).build()

      const climbingBranch = tree
      const direction = climbingBranch.node.clone().norm().multiplyScalar(-1)

      const bug = new Bug(0, {
        speed: 1,
        pos: new Victor(0, 0),
        size: new Victor(30, 20),
        climbingOn: {
          plant: new Plant(1, { pos: new Victor(0, 0), graph: tree }),
          branch: tree,
        },
        direction: direction,
      })
      bug.finishBehavior = jasmine.createSpy()

      new Climb(bug).do()

      expect(bug.climbingOn).toBeUndefined()
      expect(bug.direction.y).toEqual(0)
      expect(Math.abs(bug.pos.x)).toBeGreaterThan(bug.size.x)
      expect(bug.finishBehavior).toHaveBeenCalled()
    })
  )

  it("Emits an event when it returns to the ground", (done: DoneFn) => {
    const tree = new TreeBuilder().node(0, 30).build()

    const climbingBranch = tree
    const direction = climbingBranch.node.clone().norm().multiplyScalar(-1)

    const bug = new Bug(0, {
      speed: 1,
      pos: new Victor(0, 0),
      size: new Victor(30, 20),
      climbingOn: {
        plant: new Plant(1, { pos: new Victor(0, 0), graph: tree }),
        branch: tree,
      },
      direction: direction,
    })

    bug.zIndexChanged.subscribe(done)
    new Climb(bug).do()
  })
})
