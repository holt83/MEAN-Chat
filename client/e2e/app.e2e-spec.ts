import { AppPage } from './app.po';

describe('public App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('MEAN Chat');
  });

  it('It should display login screen with two input fields', () => {
    page.navigateTo();
    expect(page.getInputFields().count()).toEqual(2);
  });

  it('It should navigate to the Rooms listing after login in', () => {
    page.navigateTo();
    let usernameField = page.getUsernameField();
    usernameField.clear();
    let passwordField = page.getPasswordField();
    passwordField.clear();

    usernameField.sendKeys('testman');
    passwordField.sendKeys('1234');

    let loginButton = page.getLoginButton();
    loginButton.click();

    // Verify that we're on the rooms listing at there's a create button present.
    expect(page.getCreateRoomButton().getText()).toEqual('Create');
  });
});
