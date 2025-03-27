import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "chai";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import checkboxesPage from "../po/Pages/checkboxesPage";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//checkbox test
Given("I am on the checkboxes page", async () => {
  await checkboxesPage.open();
});

When("I check the first checkbox", async () => {
  await checkboxesPage.firstCheckbox.click();
});

Then("the first checkbox should be checked", async () => {
  expect(await checkboxesPage.firstCheckbox.isSelected()).to.be.true;
});

// element tests
Given("I open the add element page", async () => {
  await browser.url("https://the-internet.herokuapp.com/add_remove_elements/");
});

When('I click "Add Element"', async () => {
  await $("button=Add Element").click();
});

Then("a new element should appear", async () => {
  const elements = await $$(".added-manually");
  expect(elements.length).to.equal(1);
});

// login
Given("I am on the login page", async () => {
  await browser.url("https://the-internet.herokuapp.com/login");
});

When("I login with {string} and {string}", async (username, password) => {
  await $("#username").setValue(username);
  await $("#password").setValue(password);
  await $('button[type="submit"]').click();
});

Then("I should log in succesfully", async () => {
  const headerText = await $(".subheader").getText();
  expect(headerText).to.include("Welcome to the Secure Area");
});

// notification test
Given("I am on the notification messages page", async () => {
  await browser.url(
    "https://the-internet.herokuapp.com/notification_message_rendered"
  );
});

When('I click the "Click here" link', async () => {
  await $("a=Click here").click();
});

Then("I should see a notification message", async () => {
  const notification = await $("#flash");
  expect(await notification.isDisplayed()).to.be.true;
});

// dropdown test
Given("I am on the Dropdown page", async () => {
  await browser.url("https://the-internet.herokuapp.com/dropdown");
});

When("I select {string} from the dropdown", async (option) => {
  await $("#dropdown").selectByVisibleText(option);
});

Then(/^I should see "?([^"]+)"? is selected$/, async (option) => {
  const selectedValue = await $("#dropdown").getValue();
  const expectedValue = option === "Option 1" ? "1" : "2";
  expect(selectedValue).to.equal(expectedValue);
});

// file upload test
Given("I am on the File Upload page", async () => {
  await browser.url("https://the-internet.herokuapp.com/upload");
});

When("I upload the file {string}", async (filePath) => {
  // Skip file upload test if running on Firefox
  if (browser.capabilities.browserName === "firefox") {
    console.warn(
      "Skipping file upload test on Firefox since uploadFile command is not supported."
    );
    return;
  }
  const absoluteFilePath = resolve(__dirname, filePath);
  const remoteFilePath = await browser.uploadFile(absoluteFilePath);
  await $("#file-upload").setValue(remoteFilePath);
  await $("#file-submit").click();
});

Then("I should see a confirmation message {string}", async (message) => {
  if (browser.capabilities.browserName === "firefox") {
    console.warn("Skipping confirmation check on Firefox for file upload.");
    return;
  }
  const headerText = await $("h3").getText();
  expect(headerText).to.equal(message);
});

// dynamic loading test
Given("I am on the Dynamic Loading page", async () => {
  // Using the "Example 1" dynamic loading page
  await browser.url("https://the-internet.herokuapp.com/dynamic_loading/1");
});

When("I click the start button", async () => {
  await $("#start button").click();
});

Then("I should see the text {string}", async (expectedText) => {
  const finishElement = await $("#finish");
  await finishElement.waitForDisplayed({ timeout: 10000 });
  const actualText = await finishElement.getText();
  expect(actualText).to.equal(expectedText);
});

// key press test
Given("I am on the Key Presses page", async () => {
  await browser.url("https://the-internet.herokuapp.com/key_presses");
});

When("I press the key {string}", async (key) => {
  // Sends the key to the browser context
  await browser.keys(key);
});

Then("I should see the message {string}", async (expectedMessage) => {
  const result = await $("#result");
  // Wait until the result element has non-empty text
  await result.waitForDisplayed({ timeout: 5000 });
  const actualMessage = await result.getText();
  expect(actualMessage).to.equal(expectedMessage);
});
