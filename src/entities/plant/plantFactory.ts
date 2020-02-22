import Plant, { PlantState } from "./plant";
import { PlantagoStruct } from "./plantagoStruct";
import { PlantagoBushStruct } from "./plantagoBushStruct";

export default class PlantFactory {
	constructor(
		private generateId: () => number,
		private spontaneous: () => boolean
	) { }

	build(initialState?: Partial<PlantState>): Plant {
		const newState = Object.assign({
			spontaneous: this.spontaneous,
			graph: new PlantagoBushStruct(),
		}, initialState);
		return new Plant(this.generateId(), newState);
	}
}