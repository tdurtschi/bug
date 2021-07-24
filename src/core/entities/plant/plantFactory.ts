import Plant, { PlantState } from "./plant"
import { PlantagoBushStruct } from "./plantagoBushStruct"
import Victor from "victor"
import { randInt } from "../../util/stats"

export default class PlantFactory {
  private plantPosCursor: Victor

  constructor(private generateId: () => number, private width: number) {
    this.plantPosCursor = this.randomX()
  }

  build(initialState?: Partial<PlantState>): Plant {
    const newState = Object.assign(
      {
        graph: new PlantagoBushStruct(),
        pos: this.getNextPos(),
      },
      initialState
    )
    return new Plant(this.generateId(), newState)
  }

  private getNextPos() {
    this.plantPosCursor.x =
      (this.plantPosCursor.x + randInt(this.width / 2, this.width / 3)) %
      this.width
    return this.plantPosCursor.clone()
  }

  private randomX() {
    return new Victor(Math.floor(Math.random() * this.width - 40), 0)
  }
}
