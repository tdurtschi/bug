// Wow, this is a strange file indeed!
// Although react-testing-library is "language agnostic", there
// is some setup to get the window environment working. The window
// object comes from jsdom-global, and the runScripts parameter
// allows jsdom to set up some window functions like Date, Promise,
// etc, which are used by the testing library.

require('jsdom-global')("", {
	runScripts: "outside-only"
})