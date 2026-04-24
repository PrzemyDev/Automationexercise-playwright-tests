import { Page } from '@playwright/test';

export class HomePage {
    private page: Page;

    /**
     * homePage - interactions with home page
     */
    constructor(page: Page) {
        this.page = page;

    }
     get acceptCookiesButton(){
        return this.page.
        getByRole('button', { name: 'Consent' });
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
    

    async loggedUsernameDisplayed(username: string){
        const regex = new RegExp(`^Logged in as ${username}.*`);
        return this.page.getByText(regex);
    }

    async gotoHomePage(){
        await this.page.goto('https://automationexercise.com/');
    }


    //nav = menu navigation buttons
    async verifyNavigationButtonsVisibile(){
        await this.navHomeButton.isVisible();
        await this.navProductsButton.isVisible();
        await this.navCartButton.isVisible();
        await this.navSignuploginButton.isVisible();
        await this.navContactUsButton.isVisible();
    }

    async navToHomePage(){
        await this.navHomeButton.click();
    }
    // Navigation to, (only required/used for now):
        // Products
        // Cart
        // Contact Us
    
    async navToAuthPage(){
        await this.navSignuploginButton.click();
    }

    async acceptCookies(){
        try {
            await this.acceptCookiesButton.waitFor({ state: 'visible', timeout: 3000 });
            await this.acceptCookiesButton.click();
    } catch {
    // cookies banner did not appear — continue
    }}

    
}
