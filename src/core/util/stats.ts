export const randInt = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min) + min + 0.49);

export const randChance = (numerator: number, denominator: number) => {
	return Math.random() < numerator / denominator
}

export const randFromWeighted = (list: number[]) => {
	const total = list.reduce((a, b) => a + b, 0)
	let result = Math.floor(Math.random() * total) + 1
	for (let i = 0; i < list.length; i++) {
		if (list[i] >= result) {
			return i
		} else {
			result -= list[i]
		}
	}
	return list.length - 1
}

export const randBool = () => randInt(0, 1) === 1

export const range = (mean: number, variance: number) =>
	Math.floor(Math.random() * variance) + mean - (variance / 2);

export const rangeDecimal = (mean: number, variance: number, places: number) => {
	const multiplier = Math.pow(10, places)

	return range(mean * multiplier, variance * multiplier) / multiplier
}

export const multi = (times: number, functionArg: (i: number) => any) => () => {
	for (let i = 0; i < times - 1; i++) {
		functionArg(i)
	}
	return functionArg(times - 1)
}

export const randFromNormalDist = (): number => {
	let u = 0, v = 0;
	while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
	while (v === 0) v = Math.random();
	let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
	num = num / 10.0 + 0.5; // Translate to 0 -> 1
	if (num > 1 || num < 0) return randFromNormalDist(); // resample between 0 and 1
	return num;
}

export const normalRange = (min: number, max: number) => {
	const range = max - min;
	const num = (range * randFromNormalDist()) + min;
	window.DEBUG && console.log(num)
	return Math.floor(num);
}