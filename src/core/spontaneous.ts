export default class Spontaneous {
	signal: boolean = false
	requestsToWait: number = 0
	constructor(intervalMs: () => number, requestsToWait: () => number) {
		const triggerOnce = () => {
			setTimeout(
				() => {
					this.signal = true
					this.requestsToWait = requestsToWait()
					triggerOnce()
				}, intervalMs());
		}

		triggerOnce();
	}

	public get = () => {
		if (this.signal && this.requestsToWait === 0)
		{
			this.signal = false;
			return true;
		}

		if (this.requestsToWait > 0)
		{
			this.requestsToWait--
		}

		return false;
	}
}