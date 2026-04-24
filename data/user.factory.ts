import { User } from './user.type';

export function createUniqueEmailUser(): User {
    const random = Date.now() + Math.floor(Math.random() * 1000);

    return {
        name: 'Test User',
        email: `user_${random}@test.com`,
        password: 'Test123!'
    };
}
