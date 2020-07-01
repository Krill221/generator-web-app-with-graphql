// Scenario: Authorised # features/LogIn
import puppeteer from 'puppeteer'
import { Given, When, Then, After } from 'cucumber';
import { assertThat, is } from 'hamjest';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

Given('I open browser', async function () {
    this.browser = await puppeteer.launch({
        //headless: false,
        //slowMo: 100
      });
    this.page = await this.browser.newPage();
    await this.page.goto('http://localhost:3000');
});

Given('I on Public page', async function () {
    const haederName = await this.page.$eval('#header', el => el.textContent);
    assertThat(haederName, is('Public Layout'));
});

Then('I on SignIn page', async function () {
    const haederName = await this.page.$eval('#signinheader', el => el.textContent);
    assertThat(haederName, is('Sign In'));
});

Then('I on Main page', async function () {
    const haederName = await this.page.$eval('#header', el => el.textContent);
    assertThat(haederName, is('Main Layout'));
});

When('I goto Public page', async function () {
    await this.page.goto('http://localhost:3000');
});

//Scenario: Login validation good # features/Authorisation.feature:8
When('I type {string} into login field', async function (usename) {
    await this.page.click('input#username');
    await this.page.type('input#username', usename);
    this.usename = usename;
});

When('I type {string} into password field', async function (password) {
    await this.page.click('input#password');
    await this.page.type('input#password', password);
    this.password = password;
});

When('I press SignIn', async function () {
    await this.page.click('#signin');
});

When('I press SignOut', async function () {
    await this.page.click('#signout');
});

When('I wait for navigation', async function () {
    await this.page.waitForNavigation();
});

// 1) Scenario: Login validation failed # features/Authorisation.feature:37
Then('I see {string} message', async function (message) {
    await this.page.waitFor(1000);
    const haederName = await this.page.$eval('#error', el => el.textContent);
    assertThat(haederName, is(message));
});

///--------------
After(async function () {
    await this.browser.close();
});