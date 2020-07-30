
var checkMessage = "Please enter valid lastname. (Only '_' and '-' special characters is allowed at the end of lastname)";

function checkSpecial(name){

	cy.get('input[name="lastName"]').type(name);

	cy.get('div[class="lw-label error mb-10px ng-star-inserted"]')
		.should('contain', checkMessage);

	cy.get('input[name="lastName"]').clear();
}

describe('login modal and action', function(){

	it('Set up', () => {

		cy.startUp();
        
    })

	it('Register components existis', () => {

		cy.contains('Sign Up').click();
		cy.contains('h1', 'Sign Up for Likewise for Personalized Picks!');
		cy.get('button[class="lw-btn facebook rounded mat-flat-button ng-trigger ng-trigger-loading"]').
			should('contain', 'Continue with Facebook');
		cy.get('button[class="lw-btn google rounded mat-flat-button ng-trigger ng-trigger-loading"]').
			should('contain', 'Continue with Google');
		cy.contains('Continue with email');
	})

	it('Pick email Option', function(){

		cy.contains('Continue with email').click();

	})

	it('Check last name speical characters', function(){

		checkSpecial("Test*");
		checkSpecial("Test.");
		checkSpecial("Test,");
		checkSpecial("Test@");
		checkSpecial("Test]");
		checkSpecial("Test!=)");

	})


})