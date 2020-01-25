import Victor from "victor"

export default interface Entity extends EntityState {
	id: number
	type: string
	update: (input: any) => any
}

export interface EntityState {
	pos: Victor
	size: Victor
}