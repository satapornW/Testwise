//Profanity check in comments
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

	//check for profanity in comments
	it('comment w/ profanity', function(){

		cy.scrollTo(0, 500);
		cy.simpleLogIn(json.users.main.name, json.users.main.password);

		// navigateToOtherProfile(firstName, lastName);

		cy.navigateToOtherProfile(firstName, lastName);

		cy.wait(1000);

		//Try to make a comment
		cy.get('textarea[name="comment-input"]').first().focus().type("comment muffdiver");
		cy.wait(500);
		cy.get('button[class="submit-comment ng-star-inserted"]').first().click();
		cy.wait(1000);

		//
		cy.get('p[class="comment-text"]').should('contain', 'comment *********');
		
		cy.logOutImage();
	})

	//Check for profanity in bio
	it('check for profanity in bio', function(){

		cy.startUp();
		cy.mainScreenByPass();

		cy.scrollTo(0, 500);
		cy.simpleLogIn(email, password);
		cy.wait(1000);

		cy.get('div[class="avatar-coin ng-star-inserted"]').first().click();
		
		// cy.get('img[class="user-avatar ng-star-inserted"]').eq(0).click();
        cy.contains('View Profile').click();

        cy.wait(700);

        //Use this click method if the object closes before you can interact with it. 
        cy.get('img[class="ng-star-inserted"]').eq(1).click({force: true});
        cy.contains('Edit Profile').click();


        cy.get('textarea[name="bio"]').type(" More muffdiver");
        cy.get('button[class="mat-ripple stepper-next save-edit ng-star-inserted"]').click();

        cy.wait(300);
        cy.get('div[class="lw-label error mb-10px ng-star-inserted"]')
        	.should('contain', ' Note that bio is checked for profanity. ');

        //Close bio modal and log out. 

        cy.get('button[class="close"]').click();
        cy.logOut();
	})

	//Check for profanity in ask
	it('check for profanity in ask create', function(){

		cy.startUp();
		cy.mainScreenByPass();

		cy.simpleLogIn(email, password);

        //use this to create name for list and strings 

        //Create a new ask attempt
        cy.get('button[class="mat-menu-trigger create-new-button"]').click();
        cy.contains('Get ideas from your community').click();
        cy.get('[alt="book image"]').click();

        cy.get('[name="askDescription"]').focus().type("Poon test for profanity check polesmoker");
        cy.get('button[class="create-ask-button"]').click();

        //Validate Ask detail components
        cy.get('button[class="add-rec-button ng-star-inserted"]');
        cy.get('[name="comment-input"]');
        cy.get('[alt="Apple Store Icon Image"]');
        cy.get('[alt="Google Play Store Icon Image"]');

        //expected profanity filter output
        cy.contains('h1', "**** test for profanity check **********");

        cy.wait(1000);
        cy.logOut();
	})

	// //Check for profanity in list
	it('check for profanity in list create', function(){

		cy.startUp();
        cy.wait(500);
        cy.mainScreenByPass();
        cy.simpleLogIn(email, password);

        //use this to create name for list and strings
        //date will be our list name to so it can increment and is unique

        cy.get('button[class="mat-menu-trigger create-new-button"]').click()
        cy.contains('Showcase your favorite things').click();
        cy.get('[alt="book image"]').click();

        cy.get('[name="title"]').focus().type("Poon test profanity filter polesmoker");
        cy.wait(300);
        cy.get('textarea[name="description"]').focus().type("polesmoker test profanity filter poon");
        cy.get('button[class="create-list-button ng-star-inserted"]').click();

        //Validate profanity filter 
        cy.get('h1[class="list-title"]').should('contain', ' **** test profanity filter ********** ');
        cy.get('div[class="list-description ng-star-inserted"]')
        	.should('contain', '********** test profanity filter ****');
	})
})