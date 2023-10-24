const { test, expect } = require('@playwright/test')

let context
let page

//hooks for tracing
test.beforeAll(async ({ browser }) => {
    context = await browser.newContext()
    await context.tracing.start({screenshots: true, snapshots: true})
    page = await context.newPage()
})

test.afterAll(async() => {
    await context.tracing.stop({path: '.\\test-results\\fundamentals_trace.zip'})
})

test('Login and Logout Test', async () => {
    
    //Login
    await page.goto('https://www.saucedemo.com')
    //using any object property
    await page.click('id=user-name')
    await page.locator('data-test=username').fill('standard_user')
    //using CSS selector 
    await page.locator('#password').click()
    //using Xpath
    await page.locator('//input[@id="password"]').fill('secret_sauce')
    //using text
    await page.locator('input:has-text("LOGIN")').click()

    //Logout
    await page.getByRole('button', { name: 'Open Menu' }).click()
    await page.getByRole('link', { name: 'Logout' }).click()

})
