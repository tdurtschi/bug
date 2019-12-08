import Spontaneous from "./spontaneous";

describe('Spontaneous', () => {
	it("Returns false", () => {
		expect(new Spontaneous(0, () => 0).get()).toBeFalsy();
	})

	it("Returns true once whenever an interval is reached", () => {
		const clock = jasmine.clock()
		clock.install()

		const subject = new Spontaneous(1, () => 0)

		clock.tick(1)

		expect(subject.get()).toBeTruthy()
		expect(subject.get()).toBeFalsy()
		expect(subject.get()).toBeFalsy()

		clock.tick(2)

		expect(subject.get()).toBeTruthy()
		expect(subject.get()).toBeFalsy()
		expect(subject.get()).toBeFalsy()

		jasmine.clock().uninstall()
	})

	it("waits for a certain number of requests before returning true", () => {
		let requestsToWait = 1
		const clock = jasmine.clock()
		clock.install()

		const subject = new Spontaneous(1, () => requestsToWait)

		clock.tick(1)

		expect(subject.get()).toBeFalsy()
		expect(subject.get()).toBeTruthy()
		expect(subject.get()).toBeFalsy()

		requestsToWait = 2

		clock.tick(2)

		expect(subject.get()).toBeFalsy()
		expect(subject.get()).toBeFalsy()
		expect(subject.get()).toBeTruthy()
		expect(subject.get()).toBeFalsy()

		jasmine.clock().uninstall()
	})
});