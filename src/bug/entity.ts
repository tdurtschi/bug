export default interface Entity{
	id: number
	type: string
	update: () => any
	state: any
}