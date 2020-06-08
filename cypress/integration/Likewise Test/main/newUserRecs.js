//Create new user and rec some items

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function searchRec(cateogry, title){
	cy.contains(cateogry).click();
    cy.get('input[name="search"]').type(title).type('{enter}');
    cy.get('img[class="rec item-page-icon"]').eq(2).click({force: true});
    cy.get('button[class="post-rec-cta"]').click();
}

function saveItemSearch(cateogry, title){

	cy.contains(cateogry).click();
    cy.get('input[name="search"]').type(title).type('{enter}');
    cy.get('img[class="save item-page-icon"]').eq(2).click({force: true});

}

//Make a new login
var firstName = makeid(4);
var lastName = makeid(6);

var email = lastName + '@yahoo.com';
var password = '11111111';
var bio = "Here is my bio, from the machine";

describe('new user', function(){


	it('create new user', function(){

		//Create new user

		cy.visit('https://testwise.azurewebsites.net');
		cy.contains('Sign Up').click();
		cy.get('button[class="lw-btn email mat-flat-button"]').click();

		cy.get('input[name="firstName"]').focus().type(firstName);
		cy.get('input[name="lastName"]').focus().type(lastName);
		cy.get('input[name="email"]').focus().type(email);
		cy.get('input[name="password"]').focus().type(password);
		cy.get('input[name="confirmPassword"]').focus().type(password);

		cy.get('button[id="signUpBtn"]').click();

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

		//Connfirm and sumbit
		cy.contains('Save and continue').click({force: true});
		cy.wait(5000);

		//Find Logout button and click
		cy.logOut();

	})
})


describe('Follow & Recommned & Save', function() {

	it('Recommend items', function(){

		cy.simpleLogIn(email, password);

		//Rec 3 items (Show, books, podcast)
		searchRec('TV & Movies', 'boat');
	    cy.wait(1000);

	    searchRec('Books', 'peace');
	    cy.wait(1000);

	    searchRec('Podcasts', 'npr')

	    //Make sure all the recs are accounted for. 
	    cy.wait(3000);
	    cy.get('button[class="ng-star-inserted"]').click();
	    cy.contains('View Profile').click();
	    cy.get('span[class="count ng-star-inserted"]').should('contain', 18);


	})

	it('Follow another user', function() {
		//Follow a profile

		//Follow a user
		cy.visit('https://testwise.azurewebsites.net/profile/fire_fix');
		cy.get('button[class="follow-button active ng-star-inserted"]').first().click();

		//Check to see that user is actually follow
		var ownProfileURL = 'https://testwise.azurewebsites.net/profile/' + firstName + '_' + lastName;
		cy.visit(ownProfileURL);
		cy.get('button[class="following"]').click();

		// cy.contains('close').click();

		cy.contains('Likewise');
		cy.contains('fire_fix');
		cy.get('mat-icon[class="mat-icon notranslate material-icons mat-icon-no-color"]').click();

	  })

	it('Saves an item and verify', function() {

		saveItemSearch('TV & Movies', 'fish');
		cy.get('img[mattooltip="Saved"]').click({force: true});
		cy.get('div[class="trending-text"]').should('contain', 'Fish');

		cy.wait(2000);
		cy.logOut();

	})

	it('Save a list and verify', function(){

		cy.simpleLogIn(email, password);
		cy.viewport(1440, 900);
		//Save list
		cy.visit('/' + '/list/Such-a-way-to-go-5e75338d3a99e800333b0ad6');
		cy.wait(2000);
		cy.get('button[id="follow-button"]').click();
		cy.wait(1000);
		cy.get('button[id="follow-button"]').should('contain', 'Saved');

		//Go to my saves and check for this
		cy.get('a[class="lw-link"]').click();
		cy.contains('Lists').click();
		cy.get('h3[class="title"]').should('contain', 'Such a way to go');



	})

})



