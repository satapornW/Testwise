//Rec carry over register and sign in
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


describe('rec->register', function() {

	it('rec -> new register -> complete rec w/ tip', function(){

		cy.startUp();
		cy.visit('/' + 'shows/93514');

		//rec item
		cy.get('img[class="rec item-page-icon"]').first().click();
		cy.register(firstName, lastName, email, password);
		cy.wait(1000);

		cy.get('button[class="post-rec-cta"]').click({force: true});

		//validate rec
		cy.wait(3000);
		cy.get('div[class="avatar-coin ng-star-inserted"]').click();
        cy.contains('View Profile').click();

        cy.get('span[class="count ng-star-inserted"]').should('contain', '1');

        cy.logOut();

	})

	it('rec -> login -> validate rec', function(){

		cy.visit('/' + 'shows/71711');

		cy.get('img[class="rec item-page-icon"]').first().click();
		cy.get('button[class="lw-link secondary"]').click();

		cy.get('input[name="email"]').type(email);
		cy.get('input[name="password"]').type(password);
	    cy.get('button[class="lw-btn align-center secondary rounded mat-flat-button ng-trigger ng-trigger-loading primary"]').click();

	    cy.get('button[class="post-rec-cta"]').click({force: true});
		
		cy.wait(3000);
		cy.get('div[class="avatar-coin ng-star-inserted"]').first().click();
        cy.contains('View Profile').click();

        cy.get('span[class="count ng-star-inserted"]').should('contain', '2');

		cy.wait(1000);
		cy.logOut();


	})

})