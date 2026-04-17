import { Page } from '@playwright/test';

export class AuthPage {
    private page: Page;

    /**
     *authPage - interactions with login & register page
     */
    constructor(page: Page) {
        this.page = page;
        
    }

    get signUpUsernameInput(){
        return this.page.getByRole('textbox', { name: 'Name' });
    }

    get signUpEmailInput(){
        return this.page.
        locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    }

    get signUpButton(){
        return this.page.
        getByRole('button', { name: 'Signup' });
    }
    
    
    async fillSignUp(username: string, email: string){
        //await this.signUpUsernameInput.click();
        await this.signUpUsernameInput.fill(username);
        await this.signUpEmailInput.fill(email);
    }
    
    async clickSignUp(){
        await this.signUpButton.click();
    }

}