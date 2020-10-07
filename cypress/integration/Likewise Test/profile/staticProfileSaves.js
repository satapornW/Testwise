//Static profile save ana save filter

var json = require('../variable.json');

describe('Save and filter', function(){

	it('items and filter', () => {

		cy.startUp();
		cy.mainScreenByPass();
		cy.simpleLogIn(json.users.static.name, json.users.static.password);

		cy.wait(500);
		cy.get('a[class="lw-link"]').click();

		//Check default view
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

		cy.get('button[class="filter-type ng-star-inserted"]').eq(2).click();
		cy.wait(100);
		cy.get('a[href="/podcasts/1462324602"]').should('contain','Nice Try!')
			.and('contain', 'Podcasts');
		cy.get('a[href="/podcasts/1057255460"]').should('contain', 'NPR Politics Podcast')
			.and('contain', 'Podcasts');
		cy.get('a[href="/podcasts/1468332063"]').should('contain','Noble Blood')
			.and('contain', 'Podcasts');

		//Resturants filter
		cy.get('button[class="filter-type ng-star-inserted"]').eq(3).click();
		cy.wait(100);
		cy.get('a[href="/restaurants/ChIJy7wT-IUUkFQR_p6A7eS0SZU"]').should('contain','Piatti')
			.and('contain', 'Restaurants');
		cy.get('a[href="/restaurants/ChIJCwxeupgakFQRZwTMB92HduE"]').should('contain', 'T & T Seafood Restaurant')
			.and('contain', 'Restaurants');
		cy.get('a[href="/restaurants/ChIJxzDRRiREFIgRiwkVPd6j6-c"]').should('contain','Blooeys Bar & Grill')
			.and('contain', 'Restaurants');

		//Places filter that is empty
		cy.get('button[class="filter-type ng-star-inserted"]').eq(4).click();
		cy.wait(100);
		cy.get('div[class="empty-save-item ng-star-inserted"]').should('contain','Start saving')
			.and('contain', 'All saves are under the same tab.')
			.and('contain', 'Save by tapping the bookmark icon!');

		cy.logOutImage();

	})


	it('lists and filter', () => {

		cy.startUp();
		cy.mainScreenByPass();
		cy.simpleLogIn(json.users.static.name, json.users.static.password);
		cy.wait(1000);
		
		cy.get('a[class="lw-link"]').click();
		cy.wait(500);
		cy.contains('Lists').click();

		//Check default view
		cy.get('a[href="/list/Everything-coming-to-Netflix-5d2434ddb51b052258d08c53"]')
			.should('contain', 'Everything coming to Netflix').and('contain','12 TV & Movies');

		cy.get('a[href="/list/New-movie-list-5e869943e1a0c80024758ccf"]')
			.should('contain', 'New movie list').and('contain', '1 TV & Movies');

		cy.get('a[href="/list/Book-galaxy-s8-ask-5c3501c2b4e3f52c181fd9f4"]')
			.should('contain', 'Book galaxy s8 ask').and('contain', '3 Books');

		cy.get('a[href="/list/Southern-Food-Good-for-the-soul--5e87831b284784003207c82e"]')
			.should('contain', 'Southern Food: Good for the soul. ').and('contain', '4 Restaurants');

		//Movies and TV list
		cy.get('button[class="filter-type ng-star-inserted"]').eq(1).click();

		cy.get('a[href="/list/Everything-coming-to-Netflix-5d2434ddb51b052258d08c53"]')
			.should('contain', 'Everything coming to Netflix').and('contain','12 TV & Movies');

		cy.get('a[href="/list/New-movie-list-5e869943e1a0c80024758ccf"]')
			.should('contain', 'New movie list').and('contain', '1 TV & Movies');

		cy.get('a[href="/list/Another-for-my-follower-5e7a9be3464d6700248df539"]')
			.should('contain', 'Another for my follower').and('contain', '5 TV & Movies');

		cy.get('a[href="/list/MIs-suggestions-listtttttt-5c1eafa08a3db92f0c835e5a"]')
			.should('contain', 'MI’s suggestions listtttttt').and('contain', '7 TV & Movies');

		//Books
		cy.get('button[class="filter-type ng-star-inserted"]').eq(1).click();

		cy.get('a[href="/list/Book--5d2f94654b78991184d5b0f6"]').should('contain', 'Book ❤️😄🙂')
			.and('contain', '12 Books');

		cy.get('a[href="/list/Book-list----something--5e7e62537ce12b00524b7990"]')
			.should('contain', 'Book list ❤️😄🙂 😃😞🤷‍♀️ 🎬 something 🚚🚜🚇✈️').and('contain', '8 Books');

		cy.get('a[href="/list/Lets-hope-this-does-not-freeze-5e4b25c73577c00033dd2cd1"]')
			.should('contain', 'Let’s hope this does not freeze.').and('contain', '6 Books');

		//Podcasts
		cy.get('button[class="filter-type ng-star-inserted"]').eq(2).click();
		cy.wait(100);

		cy.get('a[href="/list/Jokes-5e18a0942f482a0024c5e220"]').should('contain', 'Jokes')
			.and('contain', '10 Podcasts');

		//Restaurants
		cy.get('button[class="filter-type ng-star-inserted"]').eq(3).click();
		cy.wait(100);

		cy.get('a[href="/list/aaw-5d7c0d49a361cd001d0cb371"]').should('contain','aaw').and('contain', '10 Restaurants');
		cy.get('a[href="/list/Southern-Food-Good-for-the-soul--5e87831b284784003207c82e"]')
			.should('contain','Southern Food: Good for the soul. ').and('contain', '4 Restaurants');
		cy.get('a[href="/list/Eat-Eat-5e175242ede737001e0e0557"]').should('contain','Eat Eat')
			.and('contain', '1 Restaurants');

		//Places
		cy.get('button[class="filter-type ng-star-inserted"]').eq(4).click();
		cy.wait(100);
		cy.get('div[class="empty-save-list ng-star-inserted"]').should('contain','Start saving')
			.and('contain', 'All saves are under the same tab.');

		cy.logOutImage();

	})

})
