import BugUI from "./bug-ui";
import { fixY, circle, horizLine } from "../../canvas-helpers";
import Victor = require("victor");
import Bug from "../../../entities/bug/bug";

const bugUIs: BugUI[] = [];
const GROUND_Y_OFFSET = 0.08;
const CLIMBING_Y_OFFSET = 0.1;

const createNewBug = (bug: Bug) => {
  const bugUI = new BugUI(bug.id, bug);
  bugUIs[bug.id] = bugUI;
  return bugUI;
};

const getUIBug = (bug: Bug) => {
  return bugUIs[bug.id] || createNewBug(bug);
};

export default (bug: Bug, ctx: CanvasRenderingContext2D) => {
  const uiBug = getUIBug(bug);
  uiBug.update();
  const climbingYOffset = bug.climbingOn ? Math.ceil(bug.size.y * CLIMBING_Y_OFFSET) : 0;
  const groundYOffset = bug.climbingOn ? 0 : Math.ceil(bug.size.y * GROUND_Y_OFFSET);
  const XOffset = bug.size.x * -0.2;
  const { direction, size } = bug;

  const pos = new Victor(bug.pos.x, fixY(ctx.canvas.height, bug.pos.y));

  ctx.save();
  ctx.translate(pos.x, pos.y);
  window.DEBUG && circle(ctx, 5);

  if (direction.x > 0) {
    ctx.rotate(-direction.angle());
    ctx.scale(-1, 1);
  } else {
    const newDir = direction.clone().multiplyScalarX(-1);

    ctx.rotate(newDir.angle());
  }

  if(shouldFlipY(bug)){
    ctx.scale(1, -1);
  }
  
  window.DEBUG && horizLine(ctx, size.x);
  ctx.drawImage(
    uiBug.getImage(),
    XOffset,
    -size.y + climbingYOffset + groundYOffset,
    size.x,
    size.y
  );

  ctx.restore();
};

function shouldFlipY(bug: Bug) {
  if (bug.climbingOn && (bug.climbingOn.branch as any).flipY) {
    return true;
  }
  return false;
}

