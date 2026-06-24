import { Locator, Page } from '@playwright/test';

export class InbuildLocators {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getByRole(role: string, name?: string): Promise<Locator> {
    return this.page.getByRole(role as any, { name });
  }

  async getByText(text: string): Promise<Locator> {
    return this.page.getByText(text);
  }

  async getByLabel(label: string): Promise<Locator> {
    return this.page.getByLabel(label);
  }

  async getByPlaceholder(placeholder: string): Promise<Locator> {
    return this.page.getByPlaceholder(placeholder);
  }

  async getByAltText(altText: string): Promise<Locator> {
    return this.page.getByAltText(altText);
  }

  async getByTitle(title: string): Promise<Locator> {
    return this.page.getByTitle(title);
  }

  async getByTestId(testId: string): Promise<Locator> {
    return this.page.getByTestId(testId);
  }
}
