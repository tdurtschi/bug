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
    node: Victor;
    update = () => {};

    constructor(public depth: number = 0) {
        this.node = new Victor(9, 92);
        this.left = new JadeSegment(
            1,
            this,
            new Victor(40, 8),
            undefined,
            undefined
        );
        this.right = new JadeSegment(
            1,
            this,
            new Victor(1, 54),
            new JadeSegment(
                2,
                this,
                new Victor(2, 66),
                new JadeSegment(
                    2,
                    this,
                    new Victor(-3, 33),
                    undefined,
                    undefined
                ),
                new JadeSegment(
                    2,
                    this,
                    new Victor(66, 29),
                    undefined,
                    undefined
                )
            ),
            undefined
        );
    }
}

class JadeSegment implements ITreeStruct{
    
    update = () => {};

    constructor(
        public depth: number,
        public parent: ITreeStruct,
        public node: Victor,
        public left: JadeSegment | undefined,
        public right: JadeSegment | undefined) {
    }
}