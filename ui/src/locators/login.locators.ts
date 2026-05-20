/**
 * Login Page Locators
 * Centralized locator management for login page elements
 */
export class LoginLocators {
  // Input fields
  static readonly USERNAME_INPUT = 'input[placeholder="Username"]';
  static readonly PASSWORD_INPUT = 'input[placeholder="Password"]';
  static readonly EMAIL_INPUT = 'input[type="email"]';

  // Buttons
  static readonly LOGIN_BUTTON = 'button:has-text("Login")';
  static readonly FORGOT_PASSWORD_LINK = 'a:has-text("Forgot Password")';
  static readonly SIGNUP_LINK = 'a:has-text("Sign Up")';

  // Messages/Alerts
  static readonly ERROR_MESSAGE = '.error-message';
  static readonly SUCCESS_MESSAGE = '.success-message';

  // Other elements
  static readonly LOGIN_FORM = 'form[id="login-form"]';
  static readonly REMEMBER_ME_CHECKBOX = 'input[type="checkbox"]';
}
