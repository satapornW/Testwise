//Import json file to get the user login info

var json = require('../variable.json');

var d = new Date();
d.setHours(d.getHours() - 8);
var date = d.toISOString().slice(0, 20);

var counter = 0;

var editListTitle = 'edit this ask';

//Normal way from list's detail view
function addItemToList(searchWord){

    cy.get('[alt="Add items plus icon"]').click();
    cy.wait(500);
    cy.get('div[class="container"]').first().type(searchWord).type('{enter}');
    cy.wait(2000);


    cy.get('img[class="rec-icon ng-star-inserted"]').first().click(); //Have to do it twice for some weird reason 
    cy.get('img[class="rec-icon ng-star-inserted"]').first().click();
    cy.get('button[class="active"]').contains("Add to list").focus().click('center',{force: true});

    counter++;
}

//From Item details
function addToListFromItem(itemPath, listName){
    cy.visit('/' + itemPath);
    cy.wait(2000);
    cy.get('img[class="for-item-details desktop ng-star-inserted"]').first().click({force: true});

    cy.wait(500);
    cy.contains('Add to list').last().click();
    
    //Dynamic string for adding to applicable list name
    var modListName = listName + ' list thumbnail';
    cy.get('img[alt="'+ modListName + '"]').click();

    counter++;
}

//From List to list
function addFromListToList(listPath, listName){
    cy.visit('/' + listPath);
    cy.wait(2000);
    cy.get('img[class="list-item-card ng-star-inserted"]').first().click({force: true}); //Have to do it twice for some weird reason 
    cy.get('img[class="list-item-card ng-star-inserted"]').first().click({force: true});

    cy.wait(500);
    cy.contains('Add to list').first().click({force: true});
    
    //Dynamic string for adding to applicable list name
    var modListName = listName + ' list thumbnail';
    cy.get('img[alt="'+ modListName + '"]').click();

    counter++;
}


//Email Login + Create a list 
describe('Create a list', function() {
  it('Create a list', function() {

    cy.startUp();
    cy.simpleLogIn(json.users.main.name, json.users.main.password);

    //use this to create name for list and strings
    //date will be our list name to so it can increment and is unique

    cy.get('button[class="create-new-button"]').click();
    cy.contains('Showcase your favorite things').click();
    cy.get('[alt="book image"]').click();

    cy.get('[name="title"]').focus().type(date);
    cy.get('button[class="create-list-button ng-star-inserted"]').click();

    //Add item via main function
    addItemToList("one");
    addItemToList("two");

    //Add item from item detail
    addToListFromItem('books/U5M-rgEACAAJ', date);
    addToListFromItem('books/FTrGc7m9udMC', date);

    // //Add item from list to another
    addFromListToList('list/Book-Wednesday--5d2f94654b78991184d5b0f6', date);
    addFromListToList('list/Jay-Zs-Recommended-Books-5ba18251be7f550d1c3efff5', date);

    cy.wait(2000);

  })

    it('verify list count', function() {

        cy.get('img[class="user-avatar ng-star-inserted"]').click();
        cy.contains('View Profile').click();

        cy.get('span[class="count ng-star-inserted"]').eq(1).click();

        cy.get('div[class="list-data-container').first().should('contain', counter);

        cy.get('img[class="likewise-logo"]').click();

    })

})

