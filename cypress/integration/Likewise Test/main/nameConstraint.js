
var checkMessage = "Please enter valid lastname. (Only '_' and '-' special characters is allowed at the end of lastname)";

function checkSpecial(name){

	cy.get('input[name="lastName"]').type(name);

	cy.get('div[class="lw-label error mb-10px ng-star-inserted"]')
		.should('contain', checkMessage);

	cy.get('input[name="lastName"]').clear();
}

describe('login modal and action', function(){

	it('Pick email Option', function(){
		cy.startUp();
		cy.mainScreenByPass();
		cy.contains('Sign Up').click();
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