// Create ask

//Make a global name/date for the ask title. 
var json = require('../variable.json');

var d = new Date();
d.setHours(d.getHours() - 8);
var date = d.toISOString().slice(0, 20);

function navigateToOtherProfile(name){

    cy.contains('People').click();
    cy.get('input[name="search"]').type(name).type('{enter}');
    cy.wait(1500);
    cy.get('a[href*="/profile/auto_mation_3397"]').click();

    cy.get('span[class="count ng-star-inserted"]').eq(2).click();
    cy.get('p[class="ask-text text-regular"]').first().should('contain', date).click();
}

function addToAsk(item){

    cy.get('button[class="add-rec-button ng-star-inserted"]').click();
    cy.get('div[class="container"]').first().type(item).type('{enter}');
    cy.wait(1000);
    cy.get('img[src="/assets/images/icons/pink_plus@2x.png"]').first().click();
    cy.get('img[src="/assets/images/icons/pink_plus@2x.png"]').first().click();
    cy.get('[name="tip"]').focus().type('This is a tip for ' + item);
    cy.get('button[class="active"]').click();
    cy.wait(1000);
}


describe('Create Ask', function() {
    it('Create ask', function() {

        cy.startUp();
        cy.wait(500);
        cy.mainScreenByPass();
        cy.simpleLogIn(json.users.main2.email, json.users.main2.password);

        //use this to create name for list and strings 

        //Create a new ask attempt
        cy.get('button[class="mat-menu-trigger create-new-button"]').click()
        cy.contains('Get ideas from your community').click()
        cy.get('[alt="book image"]').click()

        cy.get('[name="askDescription"]').focus().type(date)
        cy.get('button[class="create-ask-button"]').click()

        //Validate Ask detail components
        cy.get('button[class="add-rec-button ng-star-inserted"]');
        cy.get('[name="comment-input"]');
        cy.get('[alt="Apple Store Icon Image"]');
        cy.get('[alt="Google Play Store Icon Image"]');

        cy.contains('h1', date);

        cy.wait(1000);
        cy.logOutImage();
    })

    //Add recs to ask
    it('Add recommendation to ask', function(){
        
        cy.wait(500);
        cy.scrollTo(0, 500);
        cy.simpleLogIn(json.users.support1.name, json.users.support1.password);

        //navigate to ask
        navigateToOtherProfile('auto mation');

        //Make a suggestion
        addToAsk('home');
        addToAsk('iron man');

        cy.wait(1000);
        cy.logOutImage();

    })

    //Agree to ask
    it('Agree to ask suggestions', function(){

        cy.wait(500);
        cy.scrollTo(0, 500);
        cy.simpleLogIn(json.users.support2.name, json.users.support2.password);

        navigateToOtherProfile('auto mation');

        cy.get('button[class="add-rec-plus ng-star-inserted"]').eq(0).click();
        cy.wait(1000);
        cy.get('button[class="add-rec-plus ng-star-inserted"]').eq(1).click();

        //Validate ask agree

        cy.get('p[class="rec-by ng-star-inserted"]').eq(0).should('contain', 'twenty and 1 others');
        cy.get('p[class="rec-by ng-star-inserted"]').eq(1).should('contain', 'twenty and 1 others');

        cy.wait(1000);
        cy.logOutImage();
        
    })


    //Edit ask 
    it('Test edit ask', function(){

        cy.wait(500);
        cy.scrollTo(0, 500);
        cy.simpleLogIn(json.users.main2.email, json.users.main2.password);

        var editText = 'Edit ask test'
        var validate = date + editText;

        cy.get('div[class="avatar-coin ng-star-inserted"]').first().click();
        cy.contains('View Profile').click();

        cy.get('span[class="count ng-star-inserted"]').eq(2).click();
        cy.get('p[class="ask-text text-regular"]').first().should('contain', date).click();

        cy.get('img[alt="Menu icon"]').first().click({ force: true });
        cy.wait(500);
        cy.contains('Edit Request').click();

        cy.wait(500);
        cy.get('[name="askDescription"]').focus().type(editText);
        cy.get('button[class="create-ask-button"]').click();

        cy.wait(1000);
        cy.get('h1').should('contain',validate);

        cy.logOutImage();

    })

    //Delete the ask
    it('end ask', function(){

        
        cy.wait(500);
        cy.scrollTo(0, 500);
        cy.simpleLogIn(json.users.main2.email, json.users.main2.password);

        cy.get('div[class="avatar-coin ng-star-inserted"]').first().click();
        cy.contains('View Profile').click();

        cy.get('span[class="count ng-star-inserted"]').eq(2).click();
        cy.get('p[class="ask-text text-regular"]').first().should('contain', date).click();

        cy.get('img[alt="Menu icon"]').click({ force: true });
        cy.wait(500);
        cy.contains('End Request').click();

        cy.wait(500);
        cy.contains('OK').click();
        cy.get('button[class="add-rec-button ask-closed ng-star-inserted"]').should('contain', "Request Ended");

        cy.logOutImage();

    })
})
