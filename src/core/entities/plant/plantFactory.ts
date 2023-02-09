import Plant, { PlantState } from "./plant"
import Victor from "victor"
import { randInt } from "../../util/stats"
import { Plantago } from "./plantago/plantago"
import { Jade } from "./jade/jade"

export default class PlantFactory {
  private plantPosCursor: Victor

  constructor(private generateId: () => number, private width: number) {
    this.plantPosCursor = this.randomX()
  }

  build(initialState?: Partial<PlantState>): Plant {
    const newState = Object.assign(
      {
        pos: this.getNextPos(),
      },
      initialState
    )
    console.log("Created plant with: ", newState);
    return new Jade(this.generateId(), newState)
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
