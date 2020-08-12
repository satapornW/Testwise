//Check invite components

//Register and check for auto follow

//Log in and check for followers

var json = require('../variable.json');

function makeid(length) {
   var result           = '';
   var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

//Make a new login
var firstName = makeid(4);
var lastName = makeid(6);

var email = lastName + '@yahoo.com';
var password = '11111111';

describe('Invite to auto follow', function(){

	it('Open invite link & Register', function(){

		//Open link to automation profile 
		//invitedby/5e5eadc598473a001f7aeaa7

		cy.visit('/' + 'invitedby/5e5eadc598473a001f7aeaa7');

		cy.wait(500);

		cy.get('img[class="apple-button"]');
		cy.get('img[class="google-button"]');

		cy.get('button[class="sign-up-btn"]').click();

		cy.register(firstName,lastName,email,password);

		cy.wait(1000)

	})

	it('validate auto follow', function(){

		cy.get('p[class="user-handle"]').should('contain',json.users.main.userHandle);

		cy.wait(500);

		cy.scrollTo(0,300);

		// cy.get('button[class="follow-button ng-star-inserted disabled"]').should('contain', 'Following');

		cy.wait(500);

		cy.get('button[class="followers"]').click();
		cy.wait(500);
		//cy.scrollTo('bottom', {duration: 10000, easing: 'swing',})
		// cy.scrollTo('bottom');
		cy.get('cdk-virtual-scroll-viewport[class="network-viewport cdk-virtual-scroll-viewport cdk-virtual-scroll-orientation-vertical"]').scrollTo('bottom');
		// cy.window().scrollTo('bottom')

		var checkFollowers = "@" + firstName + "_" + lastName;
		cy.contains(checkFollowers);

		cy.get('mat-icon[class="mat-icon notranslate material-icons mat-icon-no-color"]').click();


		//cy.get('p[class="handle"]').last().should('contain', checkFollowers);

		cy.get('img[class="likewise-logo"]').click();
	})

	it('Validate following', function(){


		/*Since the implementation of user coin,
		we may need a better way to implement a better
		way to click on the profile. 
		*/
		cy.get('span[class="initials"]').first().click();
        cy.contains('View Profile').first().click();

        cy.wait(1000);
        cy.scrollTo(0,300);

        cy.get('button[class="following"]').click();
        cy.contains(json.users.main.userHandle)

        cy.get('mat-icon[class="mat-icon notranslate material-icons mat-icon-no-color"]').click();

        cy.logOut();

	})

})