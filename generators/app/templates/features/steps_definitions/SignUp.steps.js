// Scenario: Authorised # features/LogIn
import puppeteer from 'puppeteer'
import { Given, When, Then, After } from 'cucumber';
import { assertThat, is } from 'hamjest';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

When('I press SignUp link', async function () {
    this.page.$eval('a#signup', el => el.click());
});

When('I press SignIn link', async function () {
    this.page.$eval('a#signin', el => el.click());
});

Then('I on SignUp page', async function () {
    const haederName = await this.page.$eval('#signupheader', el => el.textContent);
    assertThat(haederName, is('Sign Up'));
});

When('I type {string} into username field', async function (usename) {
    await this.page.click('input#username');
    await this.page.type('input#username', usename);
    this.usename = usename;
});

When('I type {string} into email field', async function (email) {
    await this.page.click('input#email');
    await this.page.type('input#email', email);
    this.email = email;
});

When('I type {string} into confirmPassword field', async function (confirmPassword) {
    await this.page.click('input#confirmPassword');
    await this.page.type('input#confirmPassword', confirmPassword);
    this.confirmPassword = confirmPassword;
});

When('I press SignUp button', async function () {
    await this.page.click('#signup');
});