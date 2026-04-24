//User for filling register inputs

export const user1 = {
    validUser1: {
 username : 'testowyUser1',
 uniqueEmailAdress : `user_${Date.now()}_${Math.random()}@test.com`,
 password : 'testP4ss1',
 birthDate : ['1', 'January', '2001'],
 Title : 'Mr.',
 firstname : 'Jan',
 lastname : 'Niezbedny',
 company : 'Automations & stuff',
 address : 'Fake st, 1010, New York NY',
 address2 : 'The quick brown fox jumps over the lazy dog',
 state : 'NY',
 city : 'New York',
 country : 'United States',
 zipcode : '10001',
 mobile : '(646) 633-3930'
 },
 invalidUser1: {
    temp_EmailAdress : `user_${Date.now()}_${Math.random()}` //The “@” and “.com” are missing
 }
};
