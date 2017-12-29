import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getInputFields() {
    return element.all(by.css('app-root app-user-login input'));
  }

  getUsernameField() {
    return element(by.css('app-user-login .username'));
  }

  getPasswordField() {
    return element(by.css('app-user-login input[type=password]'));
  }

  getLoginButton() {
    return element(by.css('app-user-login button'));
  }

  getCreateRoomButton() {
    return element(by.css('app-rooms .create-room'));
  }
}
