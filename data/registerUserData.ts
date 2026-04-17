export const user1 = {
    validUser1: {
 temp_Username : 'testowyUser1',
 temp_EmailAdress : `user_${Date.now()}_${Math.random()}@test.com`,
 temp_Password : 'testP4ss1',
 birthDate : ['1', 'January', '2001'],
 temp_Title : 'Mr.',
 temp_Firstname : 'Jan',
 temp_Lastname : 'Niezbedny',
 temp_Company : 'Automations & stuff',
 temp_Address : 'Fake st, 1010, New York NY',
 temp_Address2 : 'The quick brown fox jumps over the lazy dog',
 temp_State : 'NY',
 temp_City : 'New York',
 temp_Country : 'United States',
 temp_Zipcode : '10001',
 temp_Mobile : '(646) 633-3930'
 },
 invalidUser1: {
    temp_EmailAdress : `user_${Date.now()}_${Math.random()}` //The “@” and “.com” are missing
 }
};
