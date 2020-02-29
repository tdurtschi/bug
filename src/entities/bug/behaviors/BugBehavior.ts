import Bug from "../bug";
import Entity from "../../entity";
export abstract class BugBehavior {
	constructor(protected bug: Bug) {
	}
	public abstract do(inputs: Entity[]): void;
}
