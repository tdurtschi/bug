import { BugBehavior } from "./BugBehavior";
import { walk } from "./walk";
import Bug from "../bug";
import { ITreeStruct } from "../../plant/ITreeStruct";
import { randBool, randFromWeighted, randInt } from "../../../util/stats";
import Victor = require("victor");
import { TurnAround } from "./turnAround";
import { PlantagoBushStruct } from "../../plant/plantago/plantagoBushStruct";
import { Pause } from "./pause";

export class Climb extends BugBehavior {
  public do(): void {
    const bug = this.bug;
    if (!bug.climbingOn) {
      bug.finishBehavior();
      return;
    }

    const currentBranch = bug.climbingOn.branch;
    const branchPosition = bug.climbingOn.plant.getAbsolutePos(currentBranch);
    const branchOffset = bug.pos.clone().subtract(branchPosition);

    const angleBetweenBranchAndDirection = Math.abs(
      currentBranch.node.direction() - bug.direction.direction()
    );
    const isGoingDown = angleBetweenBranchAndDirection > 3;
    if (isGoingDown) {
      const directionDelta = Math.abs(
        branchOffset.direction() - currentBranch.node.direction()
      );
      if (directionDelta > 0.3) {
        if (currentBranch.parent) {
          bug.climbingOn.branch = currentBranch.parent;
          bug.pos = bug.climbingOn.plant
            .getAbsolutePos(bug.climbingOn.branch)
            .add(bug.climbingOn.branch.node);
          bug.direction = bug.climbingOn.branch.node
            .clone()
            .norm()
            .multiplyScalar(-1);
        } else {
          endClimbing(bug);
        }
      }
    } else if (branchOffset.magnitude() >= currentBranch.node.magnitude()) {
      const nextBranch = getNextBranch(currentBranch);

      if (nextBranch) {
        climbBranch(bug, nextBranch);
      } else {
        bug.queueBehavior(new Pause(bug, randInt(50, 300)));
        bug.queueBehavior(new TurnAround(bug));
        bug.queueBehavior(new Climb(bug));
        bug.finishBehavior();
      }
    }

    walk(bug);

    if (bug.bugInstinct.IsTiredOfClimbing) {
      console.log("Bug got tired of climbin");
      bug.finishBehavior();
    }
  }
}

const getNextBranch = (currentBranch: ITreeStruct) => {
  return randBool() && currentBranch.left
    ? currentBranch.left
    : currentBranch.right;
};

const endClimbing = (bug: Bug) => {
  bug.direction = new Victor(randBool() ? 1 : -1, 0);
  const sizeOffset = bug.direction.x > 0 ? bug.size.x + 1 : -(bug.size.x + 1);
  const newX = bug.climbingOn.plant.pos.x + sizeOffset;
  bug.pos = new Victor(newX, bug.climbingOn.plant.pos.y);
  bug.climbingOn = undefined;

  bug.zIndexChanged.next();
  bug.finishBehavior();
};

const climbBranch = (
  bug: Bug,
  branch: ITreeStruct,
  direction: Direction = Direction.UP
) => {
  let offset: Victor;
  if (direction === Direction.UP) {
    if(!branch.parent) {
      // Add offset for climbing first branch
      offset = new Victor(bug.size.x / 3, 0).rotate(branch.node.direction());
    } else {
      // Add offset for taking a sharp turn onto a branch
      offset = new Victor(Math.sin(Math.abs(branch.node.direction() - branch.parent.node.direction()) / 2) * bug.size.x, 0).rotate(branch.node.direction());
    }
  } else {
    offset = branch.node;
  }

  bug.climbingOn.branch = branch;
  bug.pos = bug.climbingOn.plant.getAbsolutePos(branch).add(offset);
  bug.direction = branch.node
    .clone()
    .norm()
    .multiplyScalar(direction === Direction.UP ? 1 : -1);
};

enum Direction {
  UP,
  DOWN,
}
