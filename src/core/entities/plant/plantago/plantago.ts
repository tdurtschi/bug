import { ITreeStruct } from "../ITreeStruct";
import Plant from "../plant";
import { PlantagoBushStruct } from "./plantagoBushStruct";

export class Plantago extends Plant {
	private struct: PlantagoBushStruct;

	public update(): void {
		this.struct.update()
	}

	protected generateGraph(): ITreeStruct {
		this.struct = new PlantagoBushStruct();
		return this.struct;
	}
}