import { test, expect, Page, Browser, chromium, firefox, webkit } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { AuthPage } from '../../pages/authPage';
import { SingUpPage } from '../../pages/singUpPage';
import { user1 } from '../../data/registerUserData';


test('Test Case 1: Register User - happy path', async ({ page }) => {
    //open specific browser:
    //1. Launch browser & 2. Navigate to url 'http://automationexercise.com'
    //await page.goto('https://automationexercise.com/');
    const homePage = new HomePage(page);
    //Act
    await homePage.gotoHomePage(); 
    const authPage = new AuthPage(page);
    const singUpPage = new SingUpPage(page);
 
    //Assert
    await expect(page).toHaveURL('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    //Act
    homePage.acceptCookiesButtonClick();
        
    //Assert
    await expect(page).toHaveTitle('Automation Exercise'); 
  
    //Assert
    await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();

    //Assert
    await expect(homePage.navigationBar).toBeVisible(); 

    //Assert - Business buttons (Home, Products, Cart, Signup/login, Contact Us)
    await expect(homePage.navHomeButton).toBeVisible();
    await expect(homePage.navProductsButton).toBeVisible();
    await expect(homePage.navCartButton).toBeVisible();
    await expect(homePage.navSignuploginButton).toBeVisible();
    await expect(homePage.navContactUsButton).toBeVisible();
        
    //4. Click on 'Signup / Login' button
    //Act 
    //await (homePage.navSignuploginButtonClick());
    await homePage.goToAuthPage();

    //5. Verify 'New User Signup!' is visible
    //Assert
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toHaveText('New User Signup!');
    await expect(authPage.signUpUsernameInput).toBeVisible();
    await expect(authPage.signUpEmailInput).toBeVisible();
    await expect(authPage.signUpButton).toBeVisible();

    //6. Enter name and email address 
    //Act - fill singup form with unique user data
    await (authPage.fillSignUp(user1.validUser1.temp_Username, user1.validUser1.temp_EmailAdress));

    //7. Click 'Signup' button
    //Act   
    await authPage.clickSignUp();

    //8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    //Assert
    await expect(singUpPage.newAccountInputFields).toBeVisible();
    await expect(singUpPage.accountNameInput).toHaveAttribute('value', user1.validUser1.temp_Username);
    await expect(singUpPage.emailAdressInput).toHaveAttribute('value', user1.validUser1.temp_EmailAdress); 
    
    //9. Fill details: Title, Name, Email, Password, Date of birth
    //Act
    await singUpPage.selectTitle(user1.validUser1.temp_Title);
    await expect(singUpPage.titleRadiobox.getByText(user1.validUser1.temp_Title)).toBeChecked;
    await singUpPage.fillPasswordInput(user1.validUser1.temp_Password);
    
    //await singUpPage.selectBirthsDate('1','January','2001');
    await singUpPage.selectBirthsDate(user1.validUser1.birthDate[0], 
        user1.validUser1.birthDate[1], 
        user1.validUser1.birthDate[2]); //0 - day, 1 - month, 2 - year


    //10. Select checkbox 'Sign up for our newsletter!' & 11. Select checkbox 'Receive special offers from our partners!'
    //Act
    await singUpPage.checkNewsletter();
    await singUpPage.checkSpecials();
    
    
    //12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    //Act
    await singUpPage.fillFirstNameInput(user1.validUser1.temp_Firstname);
    await singUpPage.fillLastNameInput(user1.validUser1.temp_Lastname);
    await singUpPage.fillCompany(user1.validUser1.temp_Company);
    await singUpPage.fillAdressInput(user1.validUser1.temp_Address);
    await singUpPage.fillAdress2Input(user1.validUser1.temp_Address2);
    await singUpPage.selectCountry(user1.validUser1.temp_Country);
    await singUpPage.fillStateInput(user1.validUser1.temp_State);
    await singUpPage.fillCityInput(user1.validUser1.temp_City);
    await singUpPage.fillZipcode(user1.validUser1.temp_Zipcode);
    await singUpPage.fillMobileInput(user1.validUser1.temp_Mobile);

    //13. Click 'Create Account button
    //Act
    await singUpPage.clickCreateAccount();

    //14. Verify that 'ACCOUNT CREATED!' is visible
    //assert
    await expect(page).toHaveURL("https://automationexercise.com/account_created");
    await expect(page.getByText('Account Created! Congratulations! Your new account has been successfully')).toBeVisible();

    //15. Click 'Continue' button
    //Act
    await page.getByRole('link', { name: 'Continue' }).click();

    //16. Verify that 'Logged in as username' is visible
    //Assert
    await expect(page).toHaveURL('https://automationexercise.com/');
    await expect(page.getByText('Logged in as ' + user1.validUser1.temp_Username)).toBeVisible();
    //17. Click 'Delete Account' button
    //Act
    await page.getByRole('link', { name: ' Delete Account' }).click();
    
    //18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    //Assert
    await expect(page.getByText('Account Deleted! Your account')).toBeVisible();
    //Act
    await page.getByRole('link', { name: 'Continue' }).click();
 
})


test('Alternative Case 1: Register User - invalid email', async ({ page }) => {

    const homePage = new HomePage(page);
    //Act
    await homePage.gotoHomePage(); 
    const authPage = new AuthPage(page);

    //Assert
    await expect(page).toHaveURL('https://automationexercise.com/');

    //Act
    homePage.acceptCookiesButtonClick();
    //Assert
    await expect(homePage.navSignuploginButton).toBeVisible();
    //Act
    await homePage.goToAuthPage();

    //Assert
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toHaveText('New User Signup!');
    await expect(authPage.signUpUsernameInput).toBeVisible();
    await expect(authPage.signUpEmailInput).toBeVisible();
    await expect(authPage.signUpButton).toBeVisible();

    //Act - Enter name and invalid mail address
    await (authPage.fillSignUp(user1.validUser1.temp_Username, user1.invalidUser1.temp_EmailAdress)); //invalid

    //Act - Click 'Signup' button  
    await authPage.clickSignUp(); 
    //const input = page.locator('[data-qa="signup-email"]'); //input email
    const input = authPage.signUpEmailInput;
    const isValid = await input.evaluate(el => (el as HTMLInputElement).checkValidity());
    //Assert
    await expect(isValid).toBe(false);

    
/*  
Note:
  Validation messages differ across browsers (Chromium, Firefox, WebKit),
  so exact text matching is unreliable: (e.g.)
	    // '"@", "Please enter an email address.", "Enter an email address"' - chromium
            // 'Please enter an email address.' - firefox 
            // 'Enter an email address' - webkit
        Recommended approach:
	- Verify input validity state instead of message content
            const isValid = await input.evaluate(el => (el as HTMLInputElement).checkValidity());
            expect(isValid).toBe(false); 
  	Alternative (less reliable):
	- Length of message:
            const input = authPage.signUpEmailInput;
            const message = await input.evaluate(el => (el as HTMLInputElement).validationMessage ); 
            expect(message.length).toBeGreaterThan(0); 
        Not recommended:
	- Browser-specific message matching (fragile and should be avoided)
*/



 
})

test('Alternative Case 2: Register User - empty email', async ({ page }) => {

    const homePage = new HomePage(page);
    //Act
    await homePage.gotoHomePage(); 
    const authPage = new AuthPage(page);

    //Assert
    await expect(page).toHaveURL('https://automationexercise.com/');

    //Act
    homePage.acceptCookiesButtonClick();
    //Assert
    await expect(homePage.navSignuploginButton).toBeVisible();
    //Act
    await homePage.goToAuthPage();

    //Assert
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toHaveText('New User Signup!');
    await expect(authPage.signUpUsernameInput).toBeVisible();
    await expect(authPage.signUpEmailInput).toBeVisible();
    await expect(authPage.signUpButton).toBeVisible();

    //Act - Leave empty email
    await (authPage.signUpUsernameInput).click();

    //Act - Click on 'Signup / Login' button
    await (homePage.navSignuploginButtonClick());

    //Assert
    const input = authPage.signUpUsernameInput;
    const isValid = await input.evaluate(el => (el as HTMLInputElement).checkValidity());
    //Assert
    await expect(isValid).toBe(false);

});

test('Alternative Case 3: Register User - existing email', async ({ page }) => {

    const homePage = new HomePage(page);
    //Act
    await homePage.gotoHomePage(); 
    const authPage = new AuthPage(page);

    //Assert
    await expect(page).toHaveURL('https://automationexercise.com/');

    //Act
    homePage.acceptCookiesButtonClick();
    //Assert
    await expect(homePage.navSignuploginButton).toBeVisible();
    //Act
    await homePage.goToAuthPage();

    //Assert
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toHaveText('New User Signup!');
    await expect(authPage.signUpUsernameInput).toBeVisible();
    await expect(authPage.signUpEmailInput).toBeVisible();
    await expect(authPage.signUpButton).toBeVisible();

    //Act - Use existing email - recommended to use postman api 11    
    const existingEmail = 'xtest1111@example.com';
    await(authPage.fillSignUp(user1.validUser1.temp_Username, existingEmail));

    //Act - Click on 'Signup / Login' button
    await (homePage.navSignuploginButtonClick());

    //Assert
    const input = authPage.signUpEmailInput;
    const isValid = await input.evaluate(el => (el as HTMLInputElement).checkValidity());
    //Assert
    await expect(isValid).toBe(false);

});
