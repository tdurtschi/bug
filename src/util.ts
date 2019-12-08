import Victor from "victor"

export const vectorEquals = (a: Victor, b: Victor) => a.x === b.x && a.y === b.y

export const range = (mean: number, variance: number) =>
	Math.floor(Math.random() * variance) + mean - (variance / 2);

export const rangeDecimal = (mean: number, variance: number, places: number) => {
	const multiplier = Math.pow(10, places)

	return range(mean * multiplier, variance * multiplier) / multiplier
}

