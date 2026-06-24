export class AutomationExcerciseLocators {
  static readonly signuplink = 'a[href="/login"]';
  static readonly emailAddress = 'input[data-qa="login-email"]';
  static readonly password= 'input[data-qa="login-password"]';
  static readonly loginButton = 'button[data-qa="login-button"]';
  //static readonly loginButton = (value: string) =>`button[data-qa="${value}"]`;
  static readonly productsLabel = 'a[href="/products"]:has-text("Products")';
  static readonly addToCartButton = (index: number) => `(//div[@class="productinfo text-center"]/a[@data-product-id=\'1\'])[${index}]`;
  static readonly cartAdded = '//p[text()="Your product has been added to cart."]';
  static readonly continueShoppingButton = '//button[text()="Continue Shopping"]';
  static readonly cartButton = 'ul[class="nav navbar-nav"]>li>a[href="/view_cart"]';  
  static readonly proceedToCheckoutButton = 'a:has-text("Proceed To Checkout")';
  static readonly itemList = '#cart_info_table tbody tr';
  static readonly cartItemsDeleteButton = (index: number) => `#cart_info_table tbody tr:nth-child(${index}) td[class='cart_delete'] a`;
  static readonly cartEmptyMessage = "b:has-text('Cart is empty!')";
}
