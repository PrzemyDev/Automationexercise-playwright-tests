import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { AuthPage } from '../../pages/authPage';
import { createUniqueEmailUser } from '../../data/user.factory'
import { createUserViaApi } from '../../api/playwright API/user.api';

test.describe('Case 2 tests', () => {
    let user: ReturnType<typeof createUniqueEmailUser>;   //defining variable as global 
    let homePage: HomePage;
    let authPage: AuthPage;

    test.beforeEach(async ({ request, page }) => {
        //Request api to create user with unique email, for each of browsers
        user = createUniqueEmailUser(); //sets global variable
        await createUserViaApi(request, user);
        homePage = new HomePage(page);
        authPage = new AuthPage(page);

    });

test('Test Case 2: Login User with correct email and password - happy path', async ({ page }) => {

    //1. Launch browser & 2. Navigate to url 'http://automationexercise.com'
    //Act
    await homePage.gotoHomePage(); 
    
    //Assert 
    await expect(page).toHaveURL('https://automationexercise.com/');

    //Act
    await homePage.acceptCookiesButtonClick();

    //3. Verify that home page is visible successfully
     //Assert - Business buttons (Home, Products, Cart, Signup/login, Contact Us)
    await homePage.verifyNavigationButtonsVisibile();
    
    
    //4. Click on 'Signup / Login' button
    //Act 
    await homePage.navToAuthPage();

    //5. Verify 'Login to your account' is visible
    //Assert
    await authPage.assertLoginInputsVisible();
 
    //6. Enter correct email address and password
    //Act
    //await authPage.fillLoginInputs(user1.validUser1.uniqueEmailAdress, user1.validUser1.password);
    await authPage.fillLoginInputs(user.email, user.password);
    
    // 7. Click 'login' button
    //Act
    await authPage.clickLogin();
  
    // 8. Verify that 'Logged in as username' is visible
    //Assert
    //await expect(homePage.loggedUsernameDisplayed).toBeVisible();
    await homePage.loggedUsernameDisplayed(user.name);

    // 9. Click 'Delete Account' button
    //Act   -- Click delete account (visible only if logged in)
    await page.getByRole('link', { name: ' Delete Account' }).click();

    // 10. Verify that 'ACCOUNT DELETED!' is visible  
    //Assert
    await expect(page).toHaveURL('https://automationexercise.com/delete_account');
    await expect(page.getByText('Account Deleted! Your account')).toBeVisible();
    
    });
});