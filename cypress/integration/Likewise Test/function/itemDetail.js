//item's details logged out state


// set up global variables for icons and similar function across the board.

var json = require('../variable.json');

var rec = 'img[class="rec item-page-icon"]';
var save = "save item-page-icon";
var overFlow = "for-item-details desktop ng-star-inserted";
var shareButton = "mat-menu-item ng-star-inserted";
var close = "mat-icon notranslate material-icons mat-icon-no-color";
var FB = "lw-btn facebook mat-flat-button ng-trigger ng-trigger-loading"
var Google = "lw-btn google mat-flat-button ng-trigger ng-trigger-loading"
var Email = "lw-btn email mat-flat-button"
var LoginWordModal = "lw-link primary small"

// shorten urls 
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


describe('Items details', function() {

    it('Rec/Save/share pop-up modal', function() {

    // loop through each path in itemPath
    // Only do one for each category, to cut down the time. 
    for (var i = 0; i < itemPath.length; i = i + 2){
        cy.visit('/' + itemPath[i]);
        cy.get(rec).first().click();
        // cy.wait(500);
        cy.get('button[class="lw-btn facebook mat-flat-button ng-trigger ng-trigger-loading"]').should('contain', "Continue with Facebook");
        cy.get('button[class="lw-btn google mat-flat-button ng-trigger ng-trigger-loading"]').should('contain', "Continue with Google");
        cy.get('button[class="lw-btn email mat-flat-button"]').should('contain', "Continue with email");
        cy.get('button[class="close mat-icon-button"]').click();
        cy.wait(500);

        //save modal check 
        cy.get('img[class="save item-page-icon"]').first().click();
        cy.get('button[class="lw-btn facebook mat-flat-button ng-trigger ng-trigger-loading"]').should('contain', "Continue with Facebook");
        cy.get('button[class="lw-btn google mat-flat-button ng-trigger ng-trigger-loading"]').should('contain', "Continue with Google");
        cy.get('button[class="lw-btn email mat-flat-button"]').should('contain', "Continue with email");
        cy.get('button[class="close mat-icon-button"]').click();
        cy.wait(500);

        //share modal check
        cy.get('img[class="for-item-details desktop ng-star-inserted"]').first().click({force: true});
        cy.wait(1000);
        cy.get('button[role="menuitem"]').click();
        cy.get('div[id="share-links-wrapper"]').should('contain', 'Facebook');
        cy.get('div[id="share-links-wrapper"]').should('contain', 'Twitter');
        cy.get('div[id="share-links-wrapper"]').should('contain', 'LinkedIn');
        cy.get('div[id="share-links-wrapper"]').should('contain', 'Pinterest');
        cy.get('div[id="share-links-wrapper"]').should('contain', 'Email');
        cy.get('div[id="share-links-wrapper"]').should('contain', 'Copy Link');
    }

    //Interact with various components in item's detail page
    })

    it('westword', function() {
        cy.visit('/' + itemPath[0]);
        cy.wait(2000);
        cy.get('p[class="description-item"]').should('contain', "A dark odyssey about the dawn of artificial consciousness and the evolution of sin. Set at the intersection of the near future and the reimagined past, it explores a world in which every human appetite, no matter how noble or depraved, can be indulged.");
        cy.get('div[class="info-row"]').eq(0).should('contain', "BRC List");
        cy.get('div[class="info-row"]').eq(1).should('contain', "Binge Renew Cancel");
        cy.get('.similar-item-card > div > a').should('have.length', 4);
    })

    it('Lost', function() {
        cy.visit('/' + itemPath[1]);
        cy.wait(2000);
        cy.get('p[class="description-item"]').should('contain', "Stripped of everything, the survivors of a horrific plane crash  must work together to stay alive. But the island holds many secrets. ");
        cy.get('.similar-item-card > div > a').should('have.length', 4);
    })

    it('The Cather in the Rye', function() {
        cy.visit('/' + itemPath[2]);
        cy.wait(2000);
        cy.get('button[class="expand-text ng-star-inserted"]').should('contain', 'Read more');
        cy.get('div[class="info-row"]').should('contain', "The Best Books You Had to Read for School");
        cy.get('.similar-item-card > div > a').should('have.length', 4);

    })

    it('AlphaOops', function() {
        cy.visit('/' + itemPath[3]);
        cy.wait(2000);
        cy.get('button[class="expand-text ng-star-inserted"]').should('contain', 'Read more');
        cy.get('button[class="expand-text ng-star-inserted"]').click();
        cy.get('p[class="description-item"]').should('contain', "H gets top billing — but a stubborn B has something scary to say — as the inside-out alphabet gives a howl-arious Halloween performance.  Ack! It’s time for the show, and A isn’t ready. But then again, Halloween can only start with one letter, no matter how the A-B-Cs normally go! The misbehaving alphabet is back, and there’s no telling who will take the stage next. Z for zombie? P for pirate? Will X think of something good in time? Neon-bright, comically detailed illustrations show a cacophony of costumed letters, each with a mind and personality all its own. Along the bottom, tiny pumpkins arrange the players in proper order, making this alphabet story letter-perfect for Halloween. ");
        cy.get('.similar-item-card > div > a').should('have.length', 4);

    })

    it('Podcast', function() {
        cy.visit('/' + itemPath[4]);
        cy.wait(2000);
        //cy.get('p[class="description-item"]').should('contain', "H Cover art photo provided by Conor Rees on Unsplash: https://unsplash.com/@conorrees ");
        cy.get('.similar-item-card > div > a').should('have.length', 2);

    })

    it('Research Podcast', function(){
        cy.visit('/' + itemPath[5]);
        cy.wait(2000);
        cy.get('button[class="expand-text ng-star-inserted"]').should('contain', 'Read more');
        cy.get('button[class="expand-text ng-star-inserted"]').click();
        cy.get('p[class="description-item"]').should('contain', "After a seven-year hiatus, the RVC podcast returns with Dominic Barfield taking the reins and talking to the researchers at all stages in their careers about the work that they are doing at the UK’s oldest veterinary school. Continuing from the back catalogue from Dr Mattias Kleinz (episode 1 to 20) and Dr Mark Cleasby (episode 20-50) Dom with the help of Brian Cox will get you back up to speed with how the Royal Veterinary College, the University of London's veterinary school, is pushing the frontiers in veterinary medicine and basic science. We will provide you with an insight to the current research being undertaken and those dedicated researchers in the pursuit of answering those questions to benefit animal health and welfare, today, tomorrow and beyond. We hope that you enjoy. ");
        cy.get('.similar-item-card > div > a').should('have.length', 4);

    })

    it('Daawat Indian Grill & Bar', function(){

        cy.startUp();
        cy.simpleLogIn(json.users.support1.name, json.users.support1.password);
        cy.wait(2000);

        cy.visit('/' + itemPath[6]);
        //Check for address
        cy.wait(2000);
        cy.get('div[class="location-container ng-star-inserted"]').should('contain', '820 Pike ST,  Seattle');
        
        //Check for Recommended by as requried by product specs
        cy.get('img[title="Android Chromes"]').first().click({force: true});
        cy.wait(2000);
        cy.get('h1[class="user-name ng-star-inserted"]').should('contain', ' Android Chromes ');
        //cy.get('button[class="follow-button disabled ng-star-inserted"]').should('contain', 'Following');
        cy.logOut();

    })

    it('TLatte as a place', function(){

        cy.startUp();
        cy.simpleLogIn(json.users.support1.name, json.users.support1.password);
        cy.wait(2000);

        cy.visit('/' + 'places/ChIJWXi75H1skFQRRqxryQxa42U');
        //Check for address
        cy.wait(2000);
        cy.get('div[class="location-container ng-star-inserted"]').should('contain', '4983, 37 103rd Avenue Northeast B, Bellevue');
        
        //Check for Recommended by as requried by product specs
        cy.get('img[title="Manu Kanwar"]').first().click({force: true});
        cy.get('h1[class="user-name ng-star-inserted"]').should('contain', ' Manu Kanwar ');
        cy.go('back');

        
        cy.get('img[title="Solvan9 "]').first().click({force: true});
        cy.get('h1[class="user-name ng-star-inserted"]').should('contain', ' Solvan9 ');
        cy.go('back');

        // cy.get('img[title="Android Chromes"]');
        cy.get('img[title="Android Chromes"]').first().click({force: true});
        cy.get('h1[class="user-name ng-star-inserted"]').should('contain', ' Android Chromes ');

        cy.logOut();

    })

})




