//Create new recs, mega phone button state

function makeid(length) {
   var result           = '';
   var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

var firstName = makeid(4);
var lastName = makeid(6);

var email = lastName + '@yahoo.com';
var password = '11111111';
var bio = "Here is my bio, from the machine";

describe('Create new create state behavior', function(){

	it('search for the same item after rec-ing and unsave', function() {

		//Create new -> rec and item -> search for the same item -> validate megaphone state
		cy.startUp();
		cy.wait(500);
		cy.scrollTo(0, 500);
		cy.get('button[class="no-thanks"]').click();
		cy.contains('Sign Up').click();
		cy.wait(500)
		cy.register(firstName, lastName, email, password);

		//Create new
		cy.get('button[class="mat-menu-trigger create-new-button"]').click();
		cy.contains('Recommendation').click();
		cy.get('button[class="category-tile ng-star-inserted"]').eq(0).click();
		//cy.get('create-search[class="ng-star-inserted"]').eq(0).click();
		
		//cy.get('input[name="search"]').first().focus().type('house', { force: true });
		cy.get('form.ng-pristine > .ng-pristine').type('house').type('{enter}');
		cy.wait(1000);
		
		cy.get('img[class="rec-icon ng-star-inserted"]').first().click(); //Have to do it twice for some weird reason 
    	cy.get('img[class="rec-icon ng-star-inserted"]').first().click();

    	//POST!!!!
    	cy.get('button[class="active"]').contains("Post").focus().click('center',{force: true});

    	//Validate that the icon is active
    	cy.wait(1000);
    	cy.get('button[class="mat-menu-trigger create-new-button"]').click();
		cy.contains('Recommendation').click();
		cy.get('button[class="category-tile ng-star-inserted"]').eq(0).click();
		cy.get('input[name="search"]').first().focus().type('house', { force: true });
		cy.get('form.ng-pristine > .ng-pristine').type('house').type('{enter}');

		//look for the filled icon
		cy.get('img[src="/assets/images/icons/recommend_fill_icon@2x.png"]');

    	//Validate that you can unrec from create new modal

    	cy.get('img[src="/assets/images/icons/recommend_fill_icon@2x.png"]').click({ force: true });
    	cy.wait(500);

    	cy.get('button[class="mat-focus-indicator close mat-icon-button mat-button-base"]').click();

    	//Navigate to profile
    	var pathToProfile = 'profile/' + firstName + '_' + lastName;
        cy.visit('/' + pathToProfile);
    	//check that it is empty.
    	cy.get('span[class="count ng-star-inserted"]').should('contain','');
	})
})