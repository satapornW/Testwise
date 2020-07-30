//follow list skip onboaring
//Lands on a list, sign up, and skip on boarding

var json = require('../variable.json');

function makeid(length) {
   var result           = '';
   var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

// Make a new login
var firstName = makeid(4);
var lastName = makeid(6);

var email = lastName + '@yahoo.com';
var password = '11111111';
var bio = "Here is my bio, from the machine";

describe('Register on a list', function(){

	it('Follow list -> Register skip onboarding', function(){

		//Create new user
		cy.viewport('macbook-15');
		cy.visit('/' +'list/Read-list-5e9600ffdcc31700327a1cc4');

		cy.contains('Save List').click();

		cy.register(firstName, lastName, email, password);

	})

	it('Verify Following List', function(){

		cy.get('button[id="follow-button"]').should('contain', 'Saved');
		cy.get('a[class="lw-link"]').click();
		cy.wait(1000);
		cy.contains('Lists').click();
		cy.get('h3[class="title"]').should('contain', 'Read list');

	})

})