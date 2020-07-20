

var json = require('../variable.json');

describe('System Test', function () {
    beforeEach(function () {

        cy.viewport('macbook-15')
        cy.visit('https://testwise.azurewebsites.net')

        cy.server();
        cy.route('GET', 'api/web/discovery/trending/lists/homepage*', 'fixture:discovery.homepage.json');
        cy.route('GET', 'api/asks/with/most/suggestions*', 'fixture:asks.most.suggested.json');
        cy.route('GET', 'api/web/discovery/trending/items/homepage', 'fixture:discovery.trending.items.json');
        cy.route('GET', 'api/users/596d0492f76d813dd0c934a0*', 'fixture:user.profile.json');
        cy.route('GET', 'api/users/allitems/596d0492f76d813dd0c934a0*', 'fixture:user.items.json');
        cy.route('GET', 'api/web/trending/lists', 'fixture:user.trending.lists.json');
        cy.route('GET', 'api/users/all/experts', 'fixture:user.allexperts.json');
        cy.route('GET', 'api/users/basic/profile/Rashid.A?lite=1', 'fixture:user.profile.lite.json');
        cy.route('POST', 'api/places/reverse/geocode', 'fixture:user.geocode.json');
        cy.route('GET', 'api/web/profile/recent/activity/596d0492f76d813dd0c934a0?listsBefore=&itemsBefore=&closedAsksBefore=&max=10', 'fixture:user.recent.activity.page1.json');
        cy.route('GET', 'api/feed/recommended/596d0492f76d813dd0c934a0*').as('getRecommended');
        cy.route('GET', 'api/feed/recommended/596d0492f76d813dd0c934a0?feedBefore=null', 'fixture:user.recommended.page1.json').as('getRecommendedP1');
        cy.route('GET', 'api/feed/recommended/596d0492f76d813dd0c934a0?feedBefore=2020-02-11T08:02:49.221Z', 'fixture:user.recommended.page2.json').as('getRecommendedP2');
        cy.route('GET', 'api/feed/recommended/596d0492f76d813dd0c934a0?feedBefore=2020-02-11T06:27:45.477Z', 'fixture:user.recommended.page3.json').as('getRecommendedP3');
        
        // run these tests as if in a desktop
        // browser with a 720p monitor
        // Moved this before the cy.server()/route() calls
        // cy.viewport(1400, 720)
        // cy.visit('https://testwise.azurewebsites.net')
    })
    it('Verify Discovery', () => {

        cy.viewport('macbook-15')
        // make sure the header is not visible
        cy.get('.header-wrapper').should('not.exist');
        // scroll to show the header
        cy.window().scrollTo(0, 500);
        // now the header should be visible

        cy.get('button[class="no-thanks"]').click();

        cy.get('.header-wrapper').should('exist').should('be.visible');
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
    // it('Login - Facebook', function () {
    //  cy.window().then((win) => {
    //      // Replace window.open(url, target)-function with our own arrow function
    //      cy.stub(win, 'open', url => {
    //          // change window location to be same as the popup url
    //          win.location.href = Cypress.config().baseUrl + url;
    //      }).as("popup") // alias it with popup, so we can wait refer it with @popup
    //  });
    //  cy.get(".auth-btns .login-btn").click();
    //  cy.get(".lw-btn.facebook").click();
    //  // cy.get(".lw-form input[name='email']").type('rashid@broadpointgroup.com');
    //  // cy.get(".lw-form input[name='password']").type('password');
    //  // cy.get(".lw-form button.lw-btn").click();
    // })
    
    it('Verify Profile Content', function () {
        cy.get(".auth-btns .login-btn").click();
        cy.get(".lw-form input[name='email']").type(json.users.static.name);
        cy.get(".lw-form input[name='password']").type(json.users.static.password);
        cy.get(".lw-form button.lw-btn").click();
        cy.get("app-avatar > div > button").click();
        cy.get(".lw-menu.user .mat-menu-item").first().click();
        let expectedRecsCount = 66;
        let expectedListsCount = 7;
        let expectedAsksCount = 3;
        // verifying the tab labels
        cy.wait(3000)
        cy.get("#mat-tab-label-0-1 .count").should('contain.text', expectedRecsCount);
        cy.get("#mat-tab-label-0-2 .count").should('contain.text', expectedListsCount);
        cy.get("#mat-tab-label-0-3 .count").should('contain.text', expectedAsksCount);
        let profileTitle = cy.get('.profile-title');
        // verifying the profile handle and name
        profileTitle.get('.user-name').contains('test late');
        profileTitle.get('.user-handle').contains('@test_late');
        // following count
        cy.get('.following .network-count').should('contain', 25);
        // followers count
        cy.get('.followers .network-count').should('contain', 1);
        // switch to recs tab
        
        cy.get("#mat-tab-label-0-1").click({ force: true });
        cy.window().scrollTo('bottom');
        
        // cy.wait('@getRecommendedP1').its('status').should('eq', 200)
        // cy.get('.posts-wrapper > div:nth-child(2) > div').should('have.length', 10);
        // cy.window().scrollTo('bottom');
        // cy.wait('@getRecommendedP2').its('status').should('eq', 200)
        // cy.get('.posts-wrapper > div:nth-child(2) > div').should('have.length', 20);

        // cy.window().scrollTo('bottom');
        // cy.wait('@getRecommendedP3').then(xhr => {
        //     assert.equal(xhr.status, 200);
        //     assert.isNull(xhr.responseBody.nextFeedBefore);
        // });
        // cy.get('.posts-wrapper > div:nth-child(2) > div').should('have.length', 30);
        
    })
    
})