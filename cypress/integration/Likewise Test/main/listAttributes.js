//List Attributes
/*
- Check how many list a user have
- Check how followers of that list
*/
var json = require('../variable.json');

describe('setup', function(){
	it('setup', function(){

		cy.startUp()
		cy.simpleLogIn(json.users.static.name, json.users.static.password);
		
		cy.get('img[class="user-avatar ng-star-inserted"]').first().click();
    	cy.contains('View Profile').click();

	})

	it('Followers second list', function(){

		cy.get('span[class="count ng-star-inserted"]').eq(1).click();

	    cy.wait(2000);
	   	
	    cy.get('p[class="list-field"]').eq(1).click({force: true});
	    cy.contains('@tuesday_morning_');
		cy.get('button[class="close mat-icon-button"]').first().click();

	})

	it('Followers last list', function(){

		cy.get('p[class="list-field"]').last().click({force: true});
	    cy.contains('@dsdk_sdkj');
		cy.contains('@android_chrome_2457');
		cy.contains('@some_varity'); //Missed spelled variety
		cy.contains('@tuesday_morning_');
		cy.contains('@ank_kfjj');
		cy.get('button[class="close mat-icon-button"]').first().click();

	})

})