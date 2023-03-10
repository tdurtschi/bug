import Bug, { BugState } from "./bug";
import Victor = require("victor");
import { randBool } from "../../util/stats";

export default class BugFactory {
  constructor(private generateId: () => number, private width: number) {}

  build(initialState?: Partial<BugState> | { size?: Victor | number }): Bug {

    const newState = Object.assign(
      {
        direction: randBool() ? new Victor(1, 0) : new Victor(-1, 0),
        pos: this.randomX(),
      },
      initialState,
      {
        size:
          initialState && initialState.size instanceof Victor
            ? initialState.size
            : new Victor(128, 60).multiplyScalar(initialState?.size as number / 10),
      }
    );

    if(!initialState?.size) {
      delete newState.size;
    }

    return new Bug(this.generateId(), newState);
  }

  private randomX() {
    return new Victor(Math.floor(Math.random() * this.width - 40), 0);
  }
}
