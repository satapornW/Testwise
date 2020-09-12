//Create new user and rec some items

function makeid(length) {
   var result           = '';
   var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
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
		cy.startUp();
		cy.wait(500)
		cy.mainScreenByPass();
		cy.contains('Sign Up').click();
		cy.wait(500)
		cy.register(firstName, lastName, email, password);
		cy.onboard();

		//Find Logout button and click
		cy.logOut();

	})
})


describe('Follow & Recommned & Save', function() {

	it('Recommend items', function(){
		
		cy.scrollTo(0, 500);
		cy.simpleLogIn(email, password);

		//Rec 3 items (Show, books, podcast)
		searchRec('TV & Movies', 'boat');
	    cy.wait(1000);

	    searchRec('Books', 'peace');
	    cy.wait(1000);

	    searchRec('Podcasts', 'npr')

	    //Make sure all the recs are accounted for. 
	    cy.wait(3000);
	    cy.get('div[class="avatar-coin ng-star-inserted"]').first().click();
	    cy.contains('View Profile').click();
	    cy.get('span[class="count ng-star-inserted"]').should('contain', 18);


	})

	it('Follow another user', function() {
		//Follow a profile

		//Follow a user
		cy.visit('https://testwise.azurewebsites.net/profile/fire_fixx');
		cy.get('button[class="follow-button active ng-star-inserted"]').first().click();

		//Check to see that user is actually follow
		cy.get('div[class="avatar-coin ng-star-inserted"]').first().click();
    	cy.contains('View Profile').click({force: true});
		cy.get('button[class="following"]').click({force: true});

		// cy.contains('close').click();

		cy.contains('Likewise');
		cy.contains('fire_fixx');
		cy.get('mat-icon[class="mat-icon notranslate material-icons mat-icon-no-color"]').click();

		cy.logOut();

	  })

	it('Saves an item and verify', function() {

		cy.scrollTo(0,500);
		cy.simpleLogIn(email, password);

		saveItemSearch('TV & Movies', 'fish');
		cy.get('img[mattooltip="Saved"]').click({force: true});
		cy.get('div[class="trending-text"]').should('contain', 'Fish');

		cy.wait(2000);

		cy.visit('/' + '/list/Such-a-way-to-go-5e75338d3a99e800333b0ad6');
		cy.wait(2000);
		cy.get('button[id="follow-button"]').click();
		cy.wait(1000);
		cy.get('button[id="follow-button"]').should('contain', 'Saved');

		//Go to my saves and check for this
		cy.get('a[class="lw-link"]').click();
		cy.contains('Lists').click();
		cy.get('h3[class="title"]').should('contain', 'Such a way to go');

		cy.logOut();

	})

	it('Save a list and verify', function(){

		cy.scrollTo(0,500);
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



