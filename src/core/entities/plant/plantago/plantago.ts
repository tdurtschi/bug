import { ITreeStruct } from "../ITreeStruct";
import Plant from "../plant";
import { PlantagoBushStruct } from "./plantagoBushStruct";

export class Plantago extends Plant {
	protected generateGraph(): ITreeStruct {
		return new PlantagoBushStruct();
	}
}