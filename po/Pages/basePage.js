class BasePage {
  constructor() {
    this.baseUrl = "https://the-internet.herokuapp.com";
  }

  open(path = "") {
    return browser.url(`${this.baseUrl}/${path}`);
  }
}

export default BasePage;
