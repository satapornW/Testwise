//Create list from item view.

var json = require('../variable.json');

var d = new Date();
d.setHours(d.getHours() - 8);
var date = d.toISOString().slice(0, 20);

var counter = 0;

var itemPath = [ "shows/63247",
                "shows/4607",
                "books/odRaAAAAYAAJ",
                "books/kvTe_FqpDUwC",
                "podcasts/1309389551",
                "podcasts/213732650",
                "restaurants/ChIJTaq-E7VqkFQRbVu5G0WF9NY",
                "restaurants/ChIJtaXJ_byjhVQRrcOxvIsrr88",
                "places/ChIJc8TRNYxskFQR9PcffBOC2gc",
                "places/ChIJy_k6ql5skFQRPQT8GLYPHj8"
            ]


describe('Creat new list from two path', function(){

	it('Create new list from item details', function(){


		cy.startUp();
        cy.simpleLogIn(json.users.main.name, json.users.main.password);

        cy.visit('/' + itemPath[0]);
        cy.get('img[class="for-item-details desktop ng-star-inserted"]').first().click({force: true});
        cy.wait(1000);

        cy.contains('Add to list').click();
        cy.contains('Create a new list').click({force: true});

        cy.wait(1500);
        cy.get('textarea[name="title"]').focus().type(date + 'list from item');
        cy.wait(1000);
        cy.get('button[class="create-list-button ng-star-inserted"]').click();

        cy.wait(1000);
        cy.logOut();

	})

	it('Create new list from list details', function() {

		cy.startUp();
        cy.simpleLogIn(json.users.main.name, json.users.main.password);

    	cy.visit('/' + 'list/Book-Wednesday--5d2f94654b78991184d5b0f6');
	    cy.wait(2000);

	    //Need to call this twice for some weird reason
		cy.get('img[class="for-item-details desktop ng-star-inserted"]').first().click({force: true});
		cy.get('img[class="for-item-details desktop ng-star-inserted"]').first().click({force: true});

	    cy.wait(500);
	    cy.contains('Add to list').click();

	    cy.contains('Create a new list').click({force: true});

        cy.wait(1500);
        cy.get('textarea[name="title"]').focus().type(date + 'list from list');
        cy.wait(1000);
        cy.get('button[class="create-list-button ng-star-inserted"]').click();

        cy.wait(1000);
        cy.logOut();

	})

})