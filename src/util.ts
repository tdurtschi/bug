import Victor from "victor"

export const vectorEquals = (a: Victor, b: Victor, debug: boolean = true) => {
	const result = a.x === b.x && a.y === b.y
	if (!result && debug)
	{
		console.log("Testing for vector equality but failed.")
		console.log(a)
		console.log(b)
	}
	return result
}

export const randInt = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min) + min + 0.49)

export const randBool = () => randInt(0, 1) === 1

export const range = (mean: number, variance: number) =>
	Math.floor(Math.random() * variance) + mean - (variance / 2);

export const rangeDecimal = (mean: number, variance: number, places: number) => {
	const multiplier = Math.pow(10, places)

	return range(mean * multiplier, variance * multiplier) / multiplier
}

export const multi = (times: number, functionArg: (i: number) => any) => () => {
	for (let i = 0; i < times - 1; i++)
	{
		functionArg(i)
	}
	return functionArg(times - 1)
}