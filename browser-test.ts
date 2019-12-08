import puppeteer, { Browser } from "puppeteer";

const TIMEOUT = 20000

let browser: Browser;

beforeEach(async () => {
  browser = await puppeteer.launch({

  });
})

afterEach(async () => {
  await browser.close();
})

it("Loads the page with no errors", async (done) => {
  const page = await browser.newPage()
  page.on('pageerror', (e: any) => fail(`Encountered exception: ${e}`))

  await page.goto('http://localhost:9000')
  console.log("Waiting 3 seconds for errors...")
  await new Promise((resolve) => setTimeout(resolve, 3000))
  console.log("All done!")

  done()
}, TIMEOUT)