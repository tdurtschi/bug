import Victor from "victor"

export default interface Entity{
	id: number
	type: string
	update: (input: any) => any
	state: EntityState
}

export interface EntityState{
	pos: Victor
	size: Victor
}