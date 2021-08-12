import Victor from "victor"
import { Indexable } from "../../dev-ui/Indexable";

export default interface Entity extends EntityState {
	id: number
	update: (input: any) => any
	updateSpeed: number
}

export interface EntityState extends Indexable{
	pos: Victor
	size: Victor
}