import Victor from "victor"

export const vectorEquals = (a: Victor, b: Victor, debug: boolean = true) => {
	const result = a.x === b.x && a.y === b.y
	if (!result && debug) {
		console.log("Testing for vector equality but failed.")
		console.log(a)
		console.log(b)
	}
	return result
}

export const expectEquals = (a: Victor, b: Victor): void => {
	expect(vectorEquals(a, b)).toBeTruthy(`(${a}) != (${b})`)
}