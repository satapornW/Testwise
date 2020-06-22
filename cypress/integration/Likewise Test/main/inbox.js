//Like, comment, follow notification
//Create a new user for this purpose 

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

function navigateToOtherProfile(sirName, familyName){

    cy.contains('People').click();
    cy.get('input[name="search"]').type(sirName + " " + familyName).type('{enter}');
    cy.wait(1500);
    cy.get('a[href*="/profile/'+ sirName + "_" +familyName +'"]').click();

}


// Make a new login
var firstName = makeid(4);
var lastName = makeid(6);

var email = lastName + '@yahoo.com';
var password = '11111111';
var bio = "Here is my bio, from the machine";

describe('new user', function(){


	it('create new user', function(){

		//Create new user

		cy.visit('/');
		cy.contains('Sign Up').click();
		cy.get('button[class="lw-btn email mat-flat-button"]').click();

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

		//Find Logout button and click
		cy.logOut();

	})

	it('Follow, like, and comment', function(){

		cy.startUp();
		cy.simpleLogIn(json.users.main.name, json.users.main.password);

		// navigateToOtherProfile(firstName, lastName);

		navigateToOtherProfile(firstName, lastName);

		cy.wait(1500);

		//Click the follow
		cy.get('button[class="follow-button active ng-star-inserted"]').first().click();

		cy.wait(1000);

		//Click the heart button
		cy.get('img[class="heart"]').first().click();

		//Try to make a comment
		cy.get('textarea[name="comment-input"]').first().focus().type("comment");
		cy.wait(500);
		cy.get('button[class="submit-comment ng-star-inserted"]').first().click();

		cy.wait(1000);
		cy.logOut();

	})

	it('Verify notifications', function(){

		cy.startUp();
		cy.simpleLogIn(email, password);
		cy.wait(1000);

		//Naviate to inbix
		cy.get('div[class="lw-link mat-badge mat-badge-overlap mat-badge-above mat-badge-after mat-badge-medium"]').click();

		//Verify 3 notifications
		cy.get('a[class="notification-text"]').should('contain','is now following you');
		cy.get('a[class="notification-text pointer"]').eq(1).should('contain', 'liked your recommendation');
		cy.get('a[class="notification-text pointer"]').eq(0).should('contain', 'commented on your recommendation');

	})

})