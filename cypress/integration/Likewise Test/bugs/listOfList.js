//List of list profile rendering DR-10123

describe('test server error code', function(){

	it('list of list page, Likewise icon', function(){

		cy.visit('/' + 'indoor-entertainment-guide/books/ISG/back-to-school');

		cy.get('img[src="https://content-stage.likewiseapp.net/uploads/0a1b9a55-d635-4bd6-8555-0f2ebdd113a6/Likewise_official_icon.png"]')
		.should('be.visible')
		.and(($img) => {
 	 	// "naturalWidth" and "naturalHeight" are set when the image loads
  		expect($img[0].naturalWidth).to.be.greaterThan(0)})
	})
})