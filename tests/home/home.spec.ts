import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/homePage';

test.describe('HomePage tests', () => {
    let homePage: HomePage;
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
    });
test('Home page - UI verification ', async ({ page }) => {

    //Act
    await homePage.gotoHomePage(); 

    //Act
    homePage.acceptCookiesButtonClick();
    
    //Assert
    await expect(page).toHaveTitle('Automation Exercise'); 

    //Assert
    await expect(page).toHaveURL('https://automationexercise.com/');

    //Assert - Logo
    await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();

    //Assert
    await expect(homePage.navigationBar).toBeVisible(); 

    //Assert - Business buttons (Home, Products, Cart, Signup/login, Contact Us)
    await homePage.verifyNavigationButtonsVisibile();
    
    //Assert - Slider Carousel visible
    await expect(homePage.sliderCarousel).toBeVisible();
    
    //Assert - Both filter and category visible
    await expect(page.getByText('Category Women Dress Tops')).toBeVisible();
    //getByText('Women Dress Tops Saree Men') //only category 
    await expect(page.getByText('Brands (6)Polo (5)H&M (5)')).toBeVisible();    
    //Assert - Products
    await expect(page.getByText('Features Items  Added! Your')).toBeVisible();
       
    //Assert - Newsletter
    await expect(page.locator('div').filter({ hasText: 'Subscription Get the most' }).nth(3)).toBeVisible();  
    
    //Assert - Footer
    await expect(page.locator('div').filter({ hasText: 'Copyright © 2021 All rights' }).nth(2)).toBeVisible();

    });
});