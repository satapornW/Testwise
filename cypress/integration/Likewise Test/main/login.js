//login
var json = require('../variable.json');
//Valid login
var email = json.users.main.name;
var password = json.users.main.password;

describe('login modal and action', function(){

	it('Set up', () => {

		cy.startUp();
        
    })

	it('Login components existis', () => {

		cy.contains('Log in').click();
		cy.contains('h1', 'Welcome Back');
		cy.get('button[class="lw-btn facebook rounded mat-flat-button ng-trigger ng-trigger-loading"]').
			should('contain', 'Continue with Facebook');
		cy.get('button[class="lw-btn google rounded mat-flat-button ng-trigger ng-trigger-loading"]').
			should('contain', 'Continue with Google');
	})

	it('Invalid password', function(){
		cy.get('input[name="email"]').type('accdc@yahoo.com');
	    cy.get('input[name="password"]').type('11110000');
	    cy.get('button[class="lw-btn align-center secondary rounded mat-flat-button ng-trigger ng-trigger-loading primary"]').click();
	    
	    cy.get('div[class="lw-label error mb-10px ng-star-inserted"]')
	    	.should('contain',' The username and password you entered did not match our records. Please double-check and try again.');
	    
	    cy.get('input[name="email"]').clear();
	    cy.get('input[name="password"]').clear();
		
	})

	it('Invalid login', function(){

		cy.get('input[name="email"]').type('apolsnn@losksooaj.ccoomm');
	    cy.get('input[name="password"]').type('11110000');
	    cy.get('button[class="lw-btn align-center secondary rounded mat-flat-button ng-trigger ng-trigger-loading primary"]').click();
	    
	    cy.get('div[class="lw-label error mb-10px ng-star-inserted"]')
	    	.should('contain',' The username and password you entered did not match our records. Please double-check and try again.');
	    
	    cy.get('input[name="email"]').clear();
	    cy.get('input[name="password"]').clear();
	})

	it('Valid Login', function(){

	    cy.get('input[name="email"]').type(email);
	    cy.get('input[name="password"]').type(password);
	    cy.get('button[class="lw-btn align-center secondary rounded mat-flat-button ng-trigger ng-trigger-loading primary"]').click();

	    //Validate that I actually login
	    cy.wait(2000);
	    cy.get('button[class="create-new-button"]').should('contain', 'Create New');
	})
})