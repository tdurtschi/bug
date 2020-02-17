import Victor = require("victor")
import { vectorEquals } from "./util"

export const expectEquals = (a: Victor, b: Victor): void => {
	expect(vectorEquals(a, b)).toBeTruthy(`(${a}) != (${b})`)
}