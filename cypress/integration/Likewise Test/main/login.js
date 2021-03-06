//login
var json = require('../variable.json');
//Valid login
var email = json.users.main.name;
var password = json.users.main.password;

describe('login modal and action', function(){

	it('Login components existis', () => {
		
		cy.startUp();
		cy.viewport('macbook-15');
		cy.mainScreenByPass();
		cy.contains('Log In').click();
		cy.contains('h1', 'Welcome Back');
		cy.contains(' Continue with Facebook ');
		cy.contains(' Continue with Google ');
        cy.contains(' Continue with Apple ');
        
		// cy.get('button[class="lw-btn facebook rounded mat-flat-button ng-trigger ng-trigger-loading"]').
		// 	should('contain', 'Continue with Facebook');
		// cy.get('button[class="lw-btn google rounded mat-flat-button ng-trigger ng-trigger-loading"]').
		// 	should('contain', 'Continue with Google');
		// cy.get('button[class="lw-btn apple rounded mat-flat-button ng-trigger ng-trigger-loading"]').
		// 	should('contain', 'Continue with Apple');

	})

	it('Invalid password', function(){

		cy.get('input[name="email"]').type('accdc@yahoo.com');
	    cy.get('input[name="password"]').type('11110000').type('{enter}');
	    
	    cy.get('div[class="lw-label error mb-10px ng-star-inserted"]')
	    	.should('contain',' The username and password you entered did not match our records. Please double-check and try again.');
	    
	    cy.get('input[name="email"]').clear();
	    cy.get('input[name="password"]').clear();
		
	})

	it('Invalid login', function(){

		cy.get('input[name="email"]').type('apolsnn@losksooaj.ccoomm');
	    cy.get('input[name="password"]').type('11110000').type('{enter}');
	    
	    cy.get('div[class="lw-label error mb-10px ng-star-inserted"]')
	    	.should('contain',' The username and password you entered did not match our records. Please double-check and try again.');
	    
	    cy.get('input[name="email"]').clear();
	    cy.get('input[name="password"]').clear();
	})

	it('Valid Login', function(){

		cy.viewport('macbook-15');
	    cy.get('input[name="email"]').type(email);
	    cy.get('input[name="password"]').type(password).type('{enter}');

	    //Validate that I actually login
	    cy.wait(1000);
	    cy.viewport('macbook-15');
	    cy.get('button[class="mat-menu-trigger create-new-button"]').should('contain', 'Create New');
	    cy.logOutImage();

	})
})

describe('Switch sign-up to login', function(){
	
	it('init register modal and Validate', function(){

		cy.startUp();
		cy.mainScreenByPass();
		cy.contains('Sign Up').click();

		cy.get('h1[class="title signup"]').should('contain',' Sign Up for Likewise for Personalized Picks! ');


		cy.get('button[class="lw-link secondary"]').should('contain', 'Sign In').click();

	})

	it('Invalid password', function(){
		cy.get('input[name="email"]').type('accdc@yahoo.com');
	    cy.get('input[name="password"]').type('11110000').type('{enter}');
	    
	    cy.get('div[class="lw-label error mb-10px ng-star-inserted"]')
	    	.should('contain',' The username and password you entered did not match our records. Please double-check and try again.');
	    
	    cy.get('input[name="email"]').clear();
	    cy.get('input[name="password"]').clear();
		
	})

	it('Invalid login', function(){

		cy.get('input[name="email"]').type('apolsnn@losksooaj.ccoomm');
	    cy.get('input[name="password"]').type('11110000').type('{enter}');
	    
	    cy.get('div[class="lw-label error mb-10px ng-star-inserted"]')
	    	.should('contain',' The username and password you entered did not match our records. Please double-check and try again.');
	    
	    cy.get('input[name="email"]').clear();
	    cy.get('input[name="password"]').clear();
	})

	it('Valid Login', function(){

	    cy.get('input[name="email"]').type(email);
	    cy.get('input[name="password"]').type(password).type('{enter}');

	    //Validate that I actually login
	    cy.wait(2000);
	    cy.get('button[class="mat-menu-trigger create-new-button"]').should('contain', 'Create New');
	    cy.logOutImage();
	})

})
