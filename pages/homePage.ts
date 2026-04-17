import { Page } from '@playwright/test';

export class HomePage {
    private page: Page;

    /**
     * homePage - interactions with home page
     */
    constructor(page: Page) {
        this.page = page;

    }
    
    //Navigation bar (Home, Products, Cart, Signup/login, Contact Us)
    get navigationBar(){
        return this.page.
        getByText('Home  Products Cart Signup');
    }
    
    get navHomeButton(){
        return this.page.
        getByRole('link', { name: ' Products' });
    }
    
    get navProductsButton(){
        return this.page.
        getByRole('link', { name: ' Products' });
    }
    
    get navCartButton(){
        return this.page.
        getByRole('link', { name: ' Cart' });
    }

    get navSignuploginButton(){
        return this.page.
        getByRole('link', { name: ' Signup / Login' });
    }
    get navContactUsButton(){
        return this.page.
        getByRole('link', { name: ' Contact us' });
    }

    get sliderCarousel(){
        return this.page.
        locator('div').filter({ hasText: 'AutomationExercise Full-' }).nth(4);
    }
    
    
    async gotoHomePage(){
        await this.page.goto('https://automationexercise.com/');
    }


    async acceptCookies(){
        await this.page.getByRole('button', { name: 'Consent' }).click();    
    }


    async navHomeButtonClick(){
        await this.navHomeButton.click();
    }
    // Navigation only required (for now):
        // Products
        // Cart
    async navSignuploginButtonClick(){
        await this.navSignuploginButton.click();
    }
        // Contact Us
    
    async goToAuthPage(){
        await (this.navSignuploginButtonClick());
    }
}
