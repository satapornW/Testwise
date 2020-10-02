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


// Make a new login
var firstName = makeid(4);
var lastName = makeid(6);

var email = lastName + '@yahoo.com';
var password = '11111111';
var bio = "Here is my bio, from the machine";

describe('new user', function(){

	it('create new user', function(){

		//Create new user

		cy.startUp();
		cy.wait(500);
		cy.mainScreenByPass();
		cy.contains('Sign Up').click();
		cy.wait(500)
		cy.register(firstName, lastName, email, password);
		cy.onboard();
		
		//Find Logout button and click
		cy.logOut();

	})

	it('Follow, like, and comment', function(){

		cy.scrollTo(0, 500);
		cy.simpleLogIn(json.users.main.name, json.users.main.password);

		// navigateToOtherProfile(firstName, lastName);

		cy.navigateToOtherProfile(firstName, lastName);

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
		cy.logOutImage();

	})

	it('Verify notifications', function(){

		cy.scrollTo(0, 500);
		cy.simpleLogIn(email, password);
		cy.wait(1000);

		//Naviate to inbix
		cy.get('img[src="/assets/images/inbox_icon_header@2x.png"]').click({force: true});

		//Verify 3 notifications
		cy.get('a[class="notification-text"]').should('contain','is now following you');
		cy.get('a[class="notification-text pointer"]').eq(1).should('contain', 'liked your recommendation');
		cy.get('a[class="notification-text pointer"]').eq(0).should('contain', 'commented on your recommendation');

	})

	//log back in witht he new user and perform create list

	//log in to automation and check inbox for a list being created by someone you follow

})