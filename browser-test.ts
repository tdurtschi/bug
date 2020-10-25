import puppeteer, { Browser, Page } from "puppeteer";

const TIMEOUT = 20000

let browser: Browser;
let page: Page;

beforeEach(async () => {
  page = await browser.newPage()
  page.on('pageerror', (e: any) => fail(`Encountered exception: ${e}`))

  await page.goto('http://localhost:9000')
})

afterEach(async () => {
  await page.close()
})

beforeAll(async () => {
  browser = await puppeteer.launch({

  });
})

afterAll(async () => {
  await browser.close();
})

it("Loads the page with no errors", async (done) => {
  console.log("Waiting 3 seconds for errors...")
  await delay(3000)
  console.log("All done!")

  done()
}, TIMEOUT)

it("saves a game and can load after a browser reload", async (done) => {
  await page.$eval('#save', (el: HTMLButtonElement) => el.click())
  await page.reload()
  await page.$eval('#load', (el: HTMLButtonElement) => el.click())
  await delay(100)
  done()
}, TIMEOUT)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))