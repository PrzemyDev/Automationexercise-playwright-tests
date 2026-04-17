import { Page } from '@playwright/test';

export class SingUpPage {
    private page: Page;

    /*
    *singUpPage - interactions with register page step 2
    */
    constructor(page: Page) {
        this.page = page;
    }

    get newAccountInputFields(){
        return this.page.
        getByText('Enter Account Information Title Mr. Mrs. Name * Email * Password * Date of');
    }

    get titleRadiobox(){
        return this.page.getByText('Title Mr. Mrs.');
    }
    
    get accountNameInput(){
        //Username - not first name (from 1 step of sing up)
        return this.page.
        getByRole('textbox', { name: 'Name *', exact: true });
    }
    
    get emailAdressInput(){
        return this.page
        .getByRole('textbox', { name: 'Email *' });
    }

    get passwordInput(){
        return this.page.
        getByRole('textbox', { name: 'Password *' });
    }

    //Birthday consisting of 3x select options:( Day | Month | Year )
    get birthDateDay(){
        return this.page
        .locator('#days');
    }

     get birthDateMonth(){
        return this.page
        .locator('#months'); 
    }

     get birthDateyear(){
        return this.page
        .locator('#years');
    }

    get firstNameInput(){
        return this.page
        .getByRole('textbox', { name: 'First name *' });
    }

    get lastNameInput(){
        return this.page
        .getByRole('textbox', { name: 'Last name *' });
    }

    get newsletterChckbox(){
        return this.page
        .getByRole('checkbox', { name: 'Sign up for our newsletter!' });
    }

    get specialsChckbox(){
    return this.page
        .getByRole('checkbox', { name: 'Receive special offers from' });
    }

    get companyInput(){
        return this.page
        .getByRole('textbox', { name: 'Company', exact: true });
    }

    get adressInput(){
        return this.page
        .getByRole('textbox', { name: 'Address * (Street address, P.' });
    }

     get address2Input(){
        return this.page.
        getByRole('textbox', { name: 'Address 2' });
    }
    
    get countrySelect(){
        return this.page
        .getByLabel('Country *');
    }

    get stateInput(){
        return this.page
        .getByRole('textbox', { name: 'State *' });
    }

    get cityInput(){
        return this.page.
        getByRole('textbox', { name: 'City * Zipcode *' });
    }

    get zipcodeInput(){
        return this.page
        .locator('#zipcode');
    }

    get mobileInput(){
        return this.page
        .getByRole('textbox', { name: 'Mobile Number *' });
    }

    get btnCreateAccount(){
        return this.page
        .getByRole('button', { name: 'Create Account' });
    }

 
    async selectTitle(title:string){
        await this.titleRadiobox.getByLabel(title).check();
    }
    //     async selectTitle(title: 'Mr.' | 'Mrs.') {
    //         await this.page.getByLabel(title).check();
    // }

    async fillPasswordInput(userPsdw:string){
        await this.passwordInput.fill(userPsdw);
    }

    async selectBirthsDate(bDay: string, bMonth: string, bYear:string){
        await this.birthDateDay.selectOption(bDay);
        await this.birthDateMonth.selectOption(bMonth);
        await this.birthDateyear.selectOption(bYear);
    }

    async fillFirstNameInput(firstName: string ){
        await this.firstNameInput.fill(firstName);
    }

    async fillLastNameInput(lastName: string ){
        await this.lastNameInput.fill(lastName);
    }
    async fillCompany(company:string){
        await this.companyInput.fill(company);
    }

    async checkNewsletter(){
        await this.newsletterChckbox.check();
    }

    async checkSpecials(){
        await this.specialsChckbox.check();
    }

    async fillAdressInput(address: string){
        await this.adressInput.fill(address);
    }

    async fillAdress2Input(adress2: string){
        await this.address2Input.fill(adress2);
    }
    

    async selectCountry(country: string){
        await this.countrySelect.selectOption(country);
    }

    async fillStateInput(state: string){
        await this.stateInput.fill(state);
    }
    
    async fillCityInput(city:string) {
        await this.cityInput.fill(city);
    }

    async fillZipcode(zipcode: string){
        await this.zipcodeInput.fill(zipcode);
    }
    
    async fillMobileInput(mobile: string){
        await this.mobileInput.fill(mobile);
    }

    async clickCreateAccount(){
        await this.btnCreateAccount.click();
    }
}