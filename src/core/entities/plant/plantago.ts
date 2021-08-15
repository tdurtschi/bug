import { ITreeStruct } from "./ITreeStruct";
import Plant from "./plant";
import { PlantagoBushStruct } from "./plantagoBushStruct";

export class Plantago extends Plant {
	public struct(): ITreeStruct {
		return new PlantagoBushStruct();
	}
}