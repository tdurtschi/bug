import Bug from "../bug"

export const turnAround = (bug: Bug) => {
	const subtractVector = bug.direction.clone().norm().multiplyScalar(bug.size.x + 1)
	bug.pos.subtract(subtractVector)
	bug.direction.multiplyScalar(-1)
}
