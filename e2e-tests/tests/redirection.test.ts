import { expect } from "chai";
import { chromium, Browser, BrowserContext } from "playwright";

describe("redirect test", () => {
  const baseUrl = "http://localhost:3000";

  let browser: Browser;
  let context: BrowserContext;

  beforeEach(async () => {
    browser = await chromium.launch({
      headless: false,
      slowMo: 150,
      devtools: false,
    });
    context = await browser.newContext();
  });

  afterEach(async () => {
    await browser.close();
  });

  it("should properly open new tab with FOO url on button click", async () => {
    context.route("**/*", (route) => {
      console.log(route.request().url());
      route.continue();
    });

    const page = await context.newPage();
    await page.goto(baseUrl);

    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      page.click("#myButton"),
    ]);

    // const url = await newPage.evaluate("location.href");
    // const url2 = newPage.url();

    newPage.waitForTimeout(4000);
  });
});
