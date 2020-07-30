// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

var json = require('../integration/Likewise Test/variable.json');

Cypress.Commands.add('register', (firstName, lastName, email, password) =>{

    
    cy.contains('Continue with email').click();

    cy.get('input[name="firstName"]').focus().type(firstName);
    cy.wait(700);
    cy.get('input[name="lastName"]').focus().type(lastName);
    cy.wait(700);
    cy.get('input[name="email"]').focus().type(email);
    cy.wait(700);
    cy.get('input[name="password"]').focus().type(password);
    cy.wait(700);
    cy.get('input[name="confirmPassword"]').focus().type(password);

    cy.get('button[class="lw-btn secondary rounded mat-flat-button primary"]').focus().click({force:true});
    cy.wait(1000);

})

Cypress.Commands.add('onboard', () => {
 
    cy.get('button[class="lw-btn secondary rounded mat-flat-button"]').click();
    cy.wait(1000);
    
    //Next
    cy.get('button[class="stepper-next mat-ripple"]').first().click();

    cy.get('input[name="locationInput"]').click();
    cy.get('textarea[name="bio"]').type("Here is my bio, from the machine");
    cy.get('button[class="stepper-next complete-from-profile mat-ripple ng-star-inserted"]').click();
    cy.get('button[class="category-tile ng-star-inserted"]').first().click();

    //Pick 15 for movies
    for (var i = 0; i < 15; i++){
        cy.get('button[class="item-tile ng-star-inserted"]').eq(i).click();
    }

    //Connfirm and submit
    cy.contains('Save and continue').click({force: true});
    cy.wait(5000);
})

Cypress.Commands.add('simpleLogIn', (email, password) => {

    cy.viewport('macbook-15');

	cy.contains('Log in').click();
	cy.contains('h1', 'Welcome Back');
	cy.get('input[name="email"]').type(email);
	cy.get('input[name="password"]').type(password);
    cy.get('button[class="lw-btn align-center secondary rounded mat-flat-button ng-trigger ng-trigger-loading primary"]').click();

    //Validate that I actually login
    cy.wait(1000);
    cy.get('button[class="create-new-button"]').should('contain', 'Create New');
})

Cypress.Commands.add('logOut', () => {

	cy.get('button[class="ng-star-inserted"]').click();
    cy.contains('Log Out').click();
    cy.wait(2000)

    //Validate logged out state
    cy.get('button[class="sign-up-btn mat-ripple ng-star-inserted"]').should('contain', 'Sign Up');
    cy.get('button[class="login-btn mat-ripple ng-star-inserted"]').should('contain', 'Log in');
})

Cypress.Commands.add('startUp', ()=> {

    cy.viewport('macbook-15');
    // cy.visit('https://testwise.azurewebsites.net')
    cy.visit('/');

    cy.server();
    cy.route('GET', 'api/web/discovery/trending/lists/homepage*', 'fixture:discovery.homepage.json');
    cy.route('GET', 'api/asks/with/most/suggestions*', 'fixture:asks.most.suggested.json');
    cy.route('GET', 'api/web/discovery/trending/items/homepage', 'fixture:discovery.trending.items.json');
    cy.route('GET', 'api/users/596d0492f76d813dd0c934a0*', 'fixture:user.profile.json');
    cy.route('GET', 'api/users/allitems/596d0492f76d813dd0c934a0*', 'fixture:user.items.json');
    cy.route('GET', 'api/web/trending/lists', 'fixture:user.trending.lists.json');
    cy.route('GET', 'api/users/all/experts', 'fixture:user.allexperts.json');
    cy.route('GET', 'api/users/basic/profile/Rashid.A?lite=1', 'fixture:user.profile.lite.json');
    cy.route('POST', 'api/places/reverse/geocode', 'fixture:user.geocode.json');
    cy.route('GET', 'api/web/profile/recent/activity/596d0492f76d813dd0c934a0?listsBefore=&itemsBefore=&closedAsksBefore=&max=10', 'fixture:user.recent.activity.page1.json');
    cy.route('GET', 'api/feed/recommended/596d0492f76d813dd0c934a0*').as('getRecommended');
    cy.route('GET', 'api/feed/recommended/596d0492f76d813dd0c934a0?feedBefore=null', 'fixture:user.recommended.page1.json').as('getRecommendedP1');
    cy.route('GET', 'api/feed/recommended/596d0492f76d813dd0c934a0?feedBefore=2020-02-11T08:02:49.221Z', 'fixture:user.recommended.page2.json').as('getRecommendedP2');
    cy.route('GET', 'api/feed/recommended/596d0492f76d813dd0c934a0?feedBefore=2020-02-11T06:27:45.477Z', 'fixture:user.recommended.page3.json').as('getRecommendedP3');

})