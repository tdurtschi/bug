import { ITreeStruct } from "../ITreeStruct";
import Plant from "../plant";
import { TreeStruct } from "./treeStruct";

export class Tree extends Plant {
	private struct: TreeStruct;

	public update(): void {
		this.struct.update();
	}
	protected generateGraph(): ITreeStruct {
		this.struct = new TreeStruct();
		return this.struct;
	}
}