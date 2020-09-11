//save carry over action
//DR-9887

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

describe('save carry over', function(){

	it('save ->registration -> validate', function(){

		// cy.startUp();
		cy.viewport('macbook-15');
		cy.visit('/' + 'shows/93514');

		cy.get('img[class="save item-page-icon"]').first().click();

		cy.register(firstName, lastName, email, password);

		cy.get('img[mattooltip="Saved"]').click({force: true});
		cy.wait(1000);
		cy.get('div[class="trending-text"]').should('contain', 'The Mind, Explained');

		cy.logOut();

	})

	it('save -> login -> validate save', function(){

		// cy.startUp();
		// cy.wait(2000);
		cy.visit('/' + 'shows/71711');

		cy.get('img[class="save item-page-icon"]').first().click();
		cy.get('button[class="lw-link secondary"]').click();

		cy.get('input[name="email"]').type(email);
		cy.get('input[name="password"]').type(password).type('{enter}');
	    //cy.get('button[class="lw-btn align-center secondary rounded mat-flat-button ng-trigger ng-trigger-loading primary"]').click();

	    cy.wait(2000);
		cy.get('img[mattooltip="Saved"]').click({force: true});
		cy.wait(1000);
		cy.get('div[class="trending-text"]').should('contain', 'Ask the Doctor');

		cy.wait(2000);
		cy.logOut();

	})

})