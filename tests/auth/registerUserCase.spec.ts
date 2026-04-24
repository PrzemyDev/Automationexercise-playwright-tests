import { test, expect, Page, Browser, chromium, firefox, webkit } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { AuthPage } from '../../pages/authPage';
import { SignUpPage } from '../../pages/signUpPage';
import { user1 } from '../../data/user.data';

test.describe('Case 1 tests', () => {
    let homePage: HomePage;
    let authPage: AuthPage;
    let signUpPage: SignUpPage;
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        authPage = new AuthPage(page);
        signUpPage = new SignUpPage(page);
    });
    

test('Test Case 1: Register User - happy path', async ({ page }) => {
    //open specific browser:
    //1. Launch browser & 2. Navigate to url 'http://automationexercise.com'
    //await page.goto('https://automationexercise.com/');
   
    //Act
    await homePage.gotoHomePage(); 
 
    //Assert
    await expect(page).toHaveURL('https://automationexercise.com/');

    // 3. Verify that home page is visible successfully
    //Act
    await homePage.acceptCookies();
        
    //Assert
    await expect(page).toHaveTitle('Automation Exercise'); 
  
    //Assert
    await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();

    //Assert
    await expect(homePage.navigationBar).toBeVisible(); 
    await homePage.verifyNavigationButtonsVisibile();
        
    //4. Click on 'Signup / Login' button
    //Act 
    await homePage.navToAuthPage();

    //5. Verify 'New User Signup!' is visible
    //Assert
    await authPage.assertSignUpInputsVisible();

    //6. Enter name and email address 
    //Act - fill signup form with unique user data
    await (authPage.fillSignUp(user1.validUser1.username, user1.validUser1.uniqueEmailAdress));

    //7. Click 'Signup' button
    //Act   
    await authPage.clickSignUp();

    //8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    //Assert
    await expect(signUpPage.newAccountInputFields).toBeVisible();
    await expect(signUpPage.accountNameInput).toHaveAttribute('value', user1.validUser1.username);
    await expect(signUpPage.emailAdressInput).toHaveAttribute('value', user1.validUser1.uniqueEmailAdress); 
    
    //9. Fill details: Title, Name, Email, Password, Date of birth
    //Act
    await signUpPage.selectTitle(user1.validUser1.Title);
    await expect(signUpPage.titleRadiobox.getByText(user1.validUser1.Title)).toBeChecked;
    await signUpPage.fillPasswordInput(user1.validUser1.password);
    
    //await signUpPage.selectBirthsDate('1','January','2001');
    await signUpPage.selectBirthsDate(user1.validUser1.birthDate[0], 
        user1.validUser1.birthDate[1], 
        user1.validUser1.birthDate[2]); //0 - day, 1 - month, 2 - year


    //10. Select checkbox 'Sign up for our newsletter!' & 11. Select checkbox 'Receive special offers from our partners!'
    //Act
    await signUpPage.checkNewsletter();
    await signUpPage.checkSpecials();
    
    
    //12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number 
    //Act
    await signUpPage.fillFirstNameInput(user1.validUser1.firstname);
    await signUpPage.fillLastNameInput(user1.validUser1.lastname);
    await signUpPage.fillCompany(user1.validUser1.company);
    await signUpPage.fillAdressInput(user1.validUser1.address);
    await signUpPage.fillAdress2Input(user1.validUser1.address2);
    await signUpPage.selectCountry(user1.validUser1.country);
    await signUpPage.fillStateInput(user1.validUser1.state);
    await signUpPage.fillCityInput(user1.validUser1.city);
    await signUpPage.fillZipcode(user1.validUser1.zipcode);
    await signUpPage.fillMobileInput(user1.validUser1.mobile);

    //13. Click 'Create Account button
    //Act
    await signUpPage.clickCreateAccount();

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
    //await expect(page.getByText('Logged in as ' + user1.validUser1.username)).toBeVisible();
    await homePage.loggedUsernameDisplayed(user1.validUser1.username);
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
    //Act
    await homePage.gotoHomePage();
    //Assert
    await expect(page).toHaveURL('https://automationexercise.com/');

    //Act
    homePage.acceptCookies();

    //Assert
    await expect(homePage.navSignuploginButton).toBeVisible();
    
    //Act
    await homePage.navToAuthPage();

    //Assert
    await authPage.assertSignUpInputsVisible();

    //Act - Enter name and invalid mail address
    await (authPage.fillSignUp(user1.validUser1.username, user1.invalidUser1.temp_EmailAdress)); //invalid

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
    //Act
    await homePage.gotoHomePage(); 

    //Assert
    await expect(page).toHaveURL('https://automationexercise.com/');

    //Act
    homePage.acceptCookies();

    //Assert
    await expect(homePage.navSignuploginButton).toBeVisible();
    //Act
    await homePage.navToAuthPage();

    //Assert
    await authPage.assertSignUpInputsVisible();

    //Act - Leave empty email
    await (authPage.signUpUsernameInput).click();

    //Act - Click on 'Signup / Login' button
    await (homePage.navToAuthPage());

    //Assert
    const input = authPage.signUpUsernameInput;
    const isValid = await input.evaluate(el => (el as HTMLInputElement).checkValidity());
    //Assert
    await expect(isValid).toBe(false);

});

test('Alternative Case 3: Register User - existing email', async ({ page }) => {
    //Act
    await homePage.gotoHomePage(); 

    //Assert
    await expect(page).toHaveURL('https://automationexercise.com/');

    //Act
    homePage.acceptCookies();
    //Assert
    await expect(homePage.navSignuploginButton).toBeVisible();
    //Act
    await homePage.navToAuthPage();

    //Assert
    await authPage.assertSignUpInputsVisible();

    //Act - Use existing email - recommended to use postman api 11    
    const existingEmail = 'xtest1111@example.com';
    await(authPage.fillSignUp(user1.validUser1.username, existingEmail));

    //Act - Click on 'Signup / Login' button
    await (homePage.navToAuthPage());

    //Assert
    const input = authPage.signUpEmailInput;
    const isValid = await input.evaluate(el => (el as HTMLInputElement).checkValidity());
    //Assert
    await expect(isValid).toBe(false);

    });
});
