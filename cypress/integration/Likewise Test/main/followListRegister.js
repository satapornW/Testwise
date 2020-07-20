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

	it('Follow list -> Register', function(){

		//Create new user
		cy.viewport('macbook-15');
		cy.visit('/' +'list/Read-list-5e9600ffdcc31700327a1cc4');

		cy.contains('Save List').click();

		cy.get('button[class="lw-btn email rounded mat-flat-button"]').click();

		cy.get('input[name="firstName"]').focus().type(firstName);
		cy.wait(400);
		cy.get('input[name="lastName"]').focus().type(lastName);
		cy.wait(400);
		cy.get('input[name="email"]').focus().type(email);
		cy.wait(400);
		cy.get('input[name="password"]').focus().type(password);
		cy.wait(400);
		cy.get('input[name="confirmPassword"]').focus().type(password);

		cy.get('button[id="signUpBtn"]').click({force:true});

		// Onboard
		cy.get('button[class="stepper-next mat-ripple"]').first().click();

		cy.get('input[name="locationInput"]').click();
		cy.get('textarea[name="bio"]').type(bio);
		cy.get('button[class="stepper-next complete-from-profile mat-ripple ng-star-inserted"]').click();
		cy.get('button[class="category-tile ng-star-inserted"]').first().click();

		//Pick 15 for movies
		for (var i = 0; i < 15; i++){
			cy.get('button[class="item-tile ng-star-inserted"]').eq(i).click();
		}

		//Connfirm and submit
		cy.contains('Save and continue').click({force: true});
		cy.wait(5000);

	})

	it('Verify Following List', function(){

		cy.get('a[class="lw-link"]').click();
		cy.wait(1000);
		cy.contains('Lists').click();
		cy.get('h3[class="title"]').should('contain', 'Read list');

	})

})