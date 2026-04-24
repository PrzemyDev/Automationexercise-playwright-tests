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
        return this.page.
        getByRole('textbox', { name: 'Name' });
    }

    get signUpEmailInput(){
        return this.page.
        locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    }

    get signUpButton(){
        return this.page.
        getByRole('button', { name: 'Signup' });
    }

    get loginUsernameInput(){
        return this.page.
        locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    }
    
    get loginPasswordInput(){
        return this.page.
        getByRole('textbox', { name: 'Password' });
    }

    get loginButton(){
        return this.page.
        getByRole('button', { name: 'Login' });
    }

    
    async fillSignUp(username: string, email: string){
        //await this.signUpUsernameInput.click();
        await this.signUpUsernameInput.fill(username);
        await this.signUpEmailInput.fill(email);
    }
    
    async clickSignUp(){
        await this.signUpButton.click();
    }


    async assertLoginInputsVisible(){
        await this.loginUsernameInput.isVisible()
        await this.loginPasswordInput.isVisible();
        await this.loginButton.isVisible();
    }


    async fillLoginInputs(username:string, password:string){
        await this.fillLoginName(username);
        await this.fillLoginPassword(password);
    }

    async fillLoginName(username:string){
        await this.loginUsernameInput.fill(username);
    }

    async fillLoginPassword(password:string){
        await this.loginPasswordInput.fill(password);
    }

    async clickLogin(){
        await this.loginButton.click();
    }

    async assertSignUpInputsVisible(){
        await this.signUpUsernameInput.isVisible()
        await this.signUpEmailInput.isVisible();
        await this.signUpButton.isVisible();
    }
    
}