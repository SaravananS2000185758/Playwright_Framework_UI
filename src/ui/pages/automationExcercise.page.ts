import { Page } from '@playwright/test';
import { Actions } from '../actions/actions';
import { Assertions } from '../assertions/assertions';
import { CommonMethods } from '../commonMethods/commonMethods';
import { getLogger } from '../utils/logger';
import { AutomationExcerciseLocators } from '../locators/automationExcercise.locator';
import { InbuildLocators } from '../locators/inbuildLocators';

const logger = getLogger('AutomationExcercisePage');

export class AutomationExcercisePage {
  public page: Page;
  private actions: Actions;
  private assertions: Assertions;
  private commonMethods: CommonMethods;
  public inbuildLocators: InbuildLocators;

  constructor(page: Page) {
    this.page = page;
    this.actions = new Actions(page);
    this.assertions = new Assertions(page);
    this.commonMethods = new CommonMethods(page);
    this.inbuildLocators = new InbuildLocators(page);
  }

  async validateAutomationExcerciseHomePage(data: { username: string; password: string }): Promise<void> {

    await this.actions.waitForPageLoad(3000, 'networkidle', 'Waiting for page to load');
    await this.actions.click(AutomationExcerciseLocators.signuplink,'Clicking on Sign Up link');
    await this.actions.fill(AutomationExcerciseLocators.emailAddress,data.username,'Enter the username');
    await this.actions.fill(AutomationExcerciseLocators.password,data.password,'Enter the password');
    await this.actions.click(AutomationExcerciseLocators.loginButton,'Clicking on Login In button');
    await this.actions.waitForElementVisible(AutomationExcerciseLocators.productsLabel,3000,'Waiting for products label to be visible');
    await this.actions.click(AutomationExcerciseLocators.addToCartButton(1),'Clicking on Add to Cart button for product with ID 1');
    await this.actions.waitForElementVisible(AutomationExcerciseLocators.cartAdded,3000,'Waiting for cart added message to be visible');
    await this.actions.click(AutomationExcerciseLocators.continueShoppingButton,'Clicking on Continue Shopping button');
    await this.actions.click(AutomationExcerciseLocators.addToCartButton(2),'Clicking on Add to Cart button for product with ID 1');
    await this.actions.waitForElementVisible(AutomationExcerciseLocators.cartAdded,3000,'Waiting for cart added message to be visible');
    await this.actions.click(AutomationExcerciseLocators.continueShoppingButton,'Clicking on Continue Shopping button');
    await this.actions.isInvisible(AutomationExcerciseLocators.continueShoppingButton,'Verifying that cart added message is invisible');
    await this.actions.click(AutomationExcerciseLocators.cartButton,'Clicking on Cart button to view the cart');
    await this.actions.waitForElementVisible(AutomationExcerciseLocators.proceedToCheckoutButton,3000,'Waiting for Proceed to Checkout button to be visible');
    if(await this.actions.getCount(AutomationExcerciseLocators.itemList,'Getting the count of items in the cart') > 0){
      logger.info('Items are present in the cart');
    } else if(await this.actions.getCount(AutomationExcerciseLocators.itemList, 'Getting the count of items in the cart') == 0){  
      logger.error('No items are present in the cart');
    }
    for(let i = 1; i <= await this.actions.getCount(AutomationExcerciseLocators.itemList, 'Getting the count of items in the cart'); i++){
      await this.actions.click(AutomationExcerciseLocators.cartItemsDeleteButton(i),'Clicking on Delete button for item at index '+i);
      await this.actions.waitForElementVisible(AutomationExcerciseLocators.itemList,3000,'Waiting for item list to be visible after deletion');
    }
    if(await this.actions.isVisible(AutomationExcerciseLocators.cartEmptyMessage,'Verifying if cart empty message is visible')){
      logger.info('Cart is empty after deleting all items');
    }
  }
}