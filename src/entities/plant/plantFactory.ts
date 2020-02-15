import Plant, { PlantState } from "./plant";
import { PlantagoStruct } from "./plantagoStruct";

export default class PlantFactory {
	constructor(
		private generateId: () => number,
		private spontaneous: () => boolean
	) { }

	build(initialState?: Partial<PlantState>): Plant {
		const newState = Object.assign({
			spontaneous: this.spontaneous,
			graph: new PlantagoStruct(),
		}, initialState);
		return new Plant(this.generateId(), newState);
	}
}