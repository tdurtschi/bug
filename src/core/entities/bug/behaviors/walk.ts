import Bug from "../bug"

export const walk = (bug: Bug) => {
	const {
		direction,
		speed,
		pos
	} = bug

	pos.addScalarX(direction.x * speed)
	pos.addScalarY(direction.y * speed)
}