import { expect } from 'chai';
import { chromium, Browser, BrowserContext } from 'playwright';

describe('redirect test', () => {
    const baseUrl = 'http://localhost:3000';

    let browser: Browser;
    let context: BrowserContext;

    beforeEach(async () => {
        browser = await chromium.launch({
            headless: false,
            slowMo: 50
        });
        context = await browser.newContext();
    });

    afterEach(async () => {
        await browser.close();
    })

    it('should properly open new tab with FOO url on button click', async () => {
        const page = await context.newPage();
        await page.goto(baseUrl);
        
        // click on button first goes to /foo then gets instantly redirected to /bar
        // question is how to validate if /foo is executed with proper url and parameters before redirect happens
        const [newPage] = await Promise.all([context.waitForEvent('page'), page.click('#myButton')]);

        const url = await newPage.evaluate('location.href');
        const url2 = newPage.url();

        expect(url).to.include('/foo');
        expect(url2).to.include('/foo');
    });
});