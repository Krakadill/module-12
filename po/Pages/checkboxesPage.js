import BasePage from "./basePage";

class CheckboxesPage extends BasePage {
  get firstCheckbox() {
    return $('input[type="checkbox"]:nth-child(1)');
  }
  get secondCheckbox() {
    return $('input[type="checkbox"]:nth-child(3)');
  }

  open() {
    return super.open("checkboxes");
  }
}

export default new CheckboxesPage();
