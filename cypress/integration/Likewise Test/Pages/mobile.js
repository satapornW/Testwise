//Check for components

describe('Check mobile page', function(){

	it('Universal Mobile', () => {

		cy.visit('/' + "mobile");

		cy.get('img[class="apple-button"]');
		cy.get('img[class="google-button"]');

		//cy.get('input[class="textme-input ng-pristine ng-valid ng-star-inserted ng-touched wrongNumber"]').focus().type("405111");

		// cy.get('button[class="textme-button"]').click();
		// cy.get('div[class="error"]').should('contain', 'Invalid Phone Number');

	})

	it('iOS mobile', ()=> {

		cy.visit('/' + "ios-mobile");

		cy.get('p[class="better-header"]').should('contain','Get Better Recommendations');
		cy.get('p[class="description"]').should('contain', 'Likewise hand-picks shows, movies, books, podcasts, restaurants, and more just for you so you’re never without something great to do. The more active you are on Likewise, the better your recommendations will be!');

		cy.get('img[class="apple-button"]');

	})

})