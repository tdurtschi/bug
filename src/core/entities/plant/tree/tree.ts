import { ITreeStruct } from "../ITreeStruct";
import Plant from "../plant";
import { TreeStruct } from "./treeStruct";

export class Tree extends Plant {
	protected generateGraph(): ITreeStruct {
		return new TreeStruct();
	}
}