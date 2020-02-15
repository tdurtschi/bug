import Victor = require("victor");
export interface ITreeStruct {
	parent: ITreeStruct | null;
	left: ITreeStruct | null;
	right: ITreeStruct | null;
	node: Victor;
	depth: number;
	update: () => void;
}
