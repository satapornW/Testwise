/*
I was unable to perform this action with items in a list.
Therefore edit list title/description and delete is done 
on a an empty list. 
*/

//Import json file to get the user login info

var json = require('../variable.json');

var d = new Date();
d.setHours(d.getHours() - 8);
var date = d.toISOString().slice(0, 20);

var counter = 0;

var editListTitle = 'edit this ask';

function addItemToList(searchWord){

    cy.get('[alt="Add items plus icon"]').click();
    cy.wait(500);
    cy.get('div[class="container"]').first().type(searchWord).type('{enter}');
    cy.wait(2000);


    cy.get('img[class="rec-icon ng-star-inserted"]').first().click(); //Have to do it twice for some weird reason 
    cy.get('img[class="rec-icon ng-star-inserted"]').first().click();
    cy.wait(1000);
    cy.get('button[class="active"]').click({force: true});

    counter++;
}

//Email Login + Create a list 
describe('Create a list', function() {
    
    it('Create a list', function() {

        cy.startUp();
        cy.wait(500);
        cy.viewport('macbook-15');
        cy.mainScreenByPass();
        cy.simpleLogIn(json.users.main2.email, json.users.main2.password);

        //use this to create name for list and strings
        //date will be our list name to so it can increment and is unique

        cy.get('button[class="mat-menu-trigger create-new-button"]').click();
        cy.contains('Showcase your favorite things').click();
        cy.get('[alt="book image"]').click();

        cy.get('[name="title"]').focus().type(date);
        cy.get('button[class="create-list-button ng-star-inserted"]').click();

        cy.wait(2000);
    })

    it('change list type of list private vs public', function(){

        cy.get('div[class="avatar-coin ng-star-inserted"]').first().click();
        cy.contains('View Profile').click();

        cy.get('span[class="count ng-star-inserted"]').eq(1).click();
        cy.contains(date).click({force: true});

        //This overflow menu flashes
        cy.get('img[alt="Menu icon"]').eq(0).click({ force: true });
        cy.wait(500);

        cy.contains('Make Private').click({force: true});
        //Above is not working with other code test

        //Check for the change.
        cy.get('img[class="lock-icon ng-star-inserted"]');

        cy.get('div[class="avatar-coin ng-star-inserted"]').click();
        cy.contains('View Profile').click();
        cy.get('span[class="count ng-star-inserted"]').eq(1).click();

        cy.get('p[class="list-field"]').should('contain', 'Private');
        cy.get('div[class="list-data-container').first().should('contain', counter);

    })

    it('edit list title and description', function(){

        var listDescription = 'This list is dope';

        cy.contains(date).click({force: true});

        //This overflow menu flashes
        cy.get('img[alt="Menu icon"]').eq(0).click({force: true});
        cy.wait(500);
        
        cy.contains('Edit').click({force: true});
        //Above is not working with other code test

        //cy.get('textarea[name="title"]').focus().type(editListTitle);
        cy.get('textarea[name="title"]').click();
        cy.get('textarea[name="title"]').type(editListTitle);

        cy.get('textarea[name="description"]').focus().type(listDescription);

        cy.get('button[class="create-list-button ng-star-inserted"]').click();

        cy.get('h1[class="list-title"]').should('contain', date + editListTitle);
        cy.get('div[class="list-description ng-star-inserted"]').should('contain', listDescription);

    })

    it('After list mod add item', function(){


        addItemToList("one");
        cy.wait(500);
        cy.get('a[href="/books/xHdiAgAAQBAJ"]').should('contain','One Plus One');
        
        addItemToList("four");
        cy.wait(500);
        cy.get('a[href="/books/H4K-DQAAQBAJ"]').should('contain','The Four Tendencies');

        cy.wait(1000);

    })

    it('verify list count', function() {

        cy.get('div[class="avatar-coin ng-star-inserted"]').click();
        cy.contains('View Profile').click();

        cy.wait(500);

        cy.get('span[class="count ng-star-inserted"]').eq(1).click();

        cy.reload();

        cy.get('span[class="count ng-star-inserted"]').eq(1).click();

        cy.get('div[class="list-data-container').first().should('contain', counter);

    })
})

