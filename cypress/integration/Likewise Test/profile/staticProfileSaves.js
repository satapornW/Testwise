//Static profile save ana save filter

var json = require('../variable.json');

describe('Save and filter', function(){

	it('items and filter', () => {

		cy.startUp();

		cy.simpleLogIn(json.users.static.name, json.users.static.password);

		cy.wait(500);
		cy.get('a[class="lw-link"]').click();

		//Check for the fist item and last item
		cy.get('a[href="/restaurants/ChIJy7wT-IUUkFQR_p6A7eS0SZU"]').should('contain','Piatti');
		cy.window().scrollTo('bottom');
		cy.get('a[href="/shows/1400"]').should('contain', 'Seinfeld');

		//TV & Movie filter
		cy.get('button[class="filter-type ng-star-inserted"]').eq(1).click();
		cy.wait(100);
		cy.get('a[href="/movies/653601"]').should('contain','Horse Girl')
			.and('contain', 'Movies');
		cy.get('a[href="/shows/2316"]').should('contain', 'The Office')
			.and('contain', 'Shows');

		//Books filter
		/*Note this .eq(1) should be 2 but when you interact with the show filter the
		class changed position so this one is now the book filter is the second pos
		*/
		cy.get('button[class="filter-type ng-star-inserted"]').eq(1).click();
		cy.wait(100);
		cy.get('a[href="/books/TSKUDwAAQBAJ"]').should('contain','The Freeze Vol. 1')
			.and('contain', 'Books');
		cy.get('a[href="/books/qE2FPaaAa6wC"]').should('contain', 'The Paris Wife')
			.and('contain', 'Books');
		cy.get('a[href="/books/OsUPDgAAQBAJ"]').should('contain','Little Fires Everywhere')
			.and('contain', 'Books');

		//Podcats filter

		

		//Resturants filter

		//Places filter


		cy.logOut();

	})

	it('lists and filter', () => {

		cy.simpleLogIn(json.users.static.name, json.users.main.password);

		cy.logOut();

	})
})
