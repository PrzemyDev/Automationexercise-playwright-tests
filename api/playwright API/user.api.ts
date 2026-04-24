import { APIRequestContext, expect } from '@playwright/test';
import { User } from '../../data/user.type';

export async function createUserViaApi(request: APIRequestContext, user: User) {
    const response = await request.post(
        'https://automationexercise.com/api/createAccount',
        {
            form: {
            name: user.name,
            email: user.email,
            password: user.password,
            title: 'Mr',
            birth_date: '15',
            birth_month: '05',
            birth_year: '1990',
            firstname: 'Test',
            lastname: 'User',
            company: 'Test Company',
            address1: '123 Test St',
            address2: '',
            country: 'United States',
            zipcode: '12345',
            state: 'CA',
            city: 'Test City',
            mobile_number: '123456789'
        }
    }
);

//Assertions:
expect(response.status()).toBe(200);

const body = await response.json();

expect(body.responseCode).toBe(201);
expect(body.message).toBe('User created!');

return user;
}