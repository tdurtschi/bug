import Victor from "victor";
import { ITreeStruct } from "../ITreeStruct";
import Plant from "../plant";

export class Jade extends Plant {
	protected generateGraph(): ITreeStruct {
		return new JadeStem();
	}

    public update() {
        
    }
}

export class JadeStem implements ITreeStruct {
    parent: ITreeStruct | null;
    left: ITreeStruct | null;
    right: ITreeStruct | null;
    node: import("victor");
    update = () => {};

    constructor(public depth: number = 0) {
        this.node = new Victor(0, 30);
    }
}