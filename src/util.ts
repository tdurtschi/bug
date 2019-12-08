import Victor from "victor"

export const vectorEquals = (a: Victor, b: Victor) => a.x === b.x && a.y === b.y

export const randInt = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min) + min + 0.49)

export const randBool = () => randInt(0, 1) === 1

export const range = (mean: number, variance: number) =>
	Math.floor(Math.random() * variance) + mean - (variance / 2);

export const rangeDecimal = (mean: number, variance: number, places: number) => {
	const multiplier = Math.pow(10, places)

	return range(mean * multiplier, variance * multiplier) / multiplier
}

