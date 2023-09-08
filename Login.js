const puppeteer = require("puppeteer-extra");
const fs = require("fs/promises");



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function Login(page, user, password) {
    await page.goto("https://thepremierstore.com/account/login")
    await delay(10000)
    await page.click('.needsclick.klaviyo-close-form.kl-private-reset-css-Xuajs1');
    await page.type("#CustomerEmail", user);
    await delay(5000)
    await page.type("#CustomerPassword", password);
    // await Promise.all([page.click("#body path"),  page.waitForNavigation()]);
    
    await delay(5000)
    await Promise.all([page.click("#customer_login button"),  page.waitForNavigation()]);
    await delay(5000);
    await page.close();

}


module.exports = Login;

// api: 81d3eeebe2dcdb6e0f94a8341afdc69a
