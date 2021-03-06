//Broken profile URL

var badPath = 'profile/tuesday_morning_lala';
var badList = 'list/Podcast-list-for-than-6-5ec4059e94955800243f5a1dkjjkk';
var badMovie = 'movies/6349010';

describe('Bad URL Test 1', function(){
	it('Broken Profile URL', function(){

		//cy.startUp();
		cy.visit('/' + badPath);
		cy.get('h1[class="text-semibold align-center"]').should('contain', 'Sorry');
		
	})
})

describe('Bad URL Test 2', function(){
	it('Bad List URL', function(){

		//cy.startUp();
		cy.reload();
		cy.visit('/' + badList);
		cy.get('h1[class="error"]').should('contain', 'An Error has occurred loading list details');
	
	})
})

describe('Bad URL Test 3', function(){
	it('Bad Movie URL', function(){

		//cy.startUp();
		cy.reload();
		cy.visit('/' + badMovie);
		cy.get('h1[class="error"]').should('contain', 'An Error has occurred retrieving item details');
	
	})
})
