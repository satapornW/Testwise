//homepage

describe('homepage', function(){
	it('set up', ()=>{

		cy.startUp()

	})

	it('Verify Discovery', () => {

        cy.viewport(1400, 720);

        // make sure the header is not visible
        cy.get('.header-wrapper').should('not.exist');
        // scroll to show the header
        cy.window().scrollTo(0, 500);
        // now the header should be visible
        cy.get('.header-wrapper').should('exist').should('be.visible');

        //We don't have this currently 
        // cy.get('.home-list-container').within(() => {
        //     cy.get('.trending-headline').contains('Popular Lists on Likewise');
        //     cy.get('.home-trending-lists > div').should('have.length', 3);
        //     //cy.wait(200);
        //     cy.get('button.more').click();
        //     cy.get('button.more').should('not.exist');
        //     cy.get('.home-trending-lists > div').should('have.length', 6);
        // });
        
        cy.get('.chitchat-container').within(() => {
            cy.get('.chitchat-header').contains('What Likewisers are saying');
            cy.get('.chitchat-cards').should('have.length', 3);
        })
        // popular on section
        cy.get('.popular-on-section.trending-section').within(() => {
            cy.get('.home-section-header').contains('Popular on Likewise');
            for (let iter = 1; iter < 4; iter++) {
                cy.get('app-trending-now-item').should('have.length', iter * 5);
                cy.get('.more').should('exist');
                cy.get('.more').click();
            }
            cy.get('.more').should('not.exist');
        });
    })
})