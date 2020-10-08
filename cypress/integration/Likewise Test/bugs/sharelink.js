//check for share link in ask and list

var json = require('../variable.json');

describe('validate share link', function(){

	it('validate share on ask details', function(){

		cy.startUp();
		cy.mainScreenByPass();
		cy.simpleLogIn(json.users.static.name, json.users.static.password);

		cy.wait(1000);

		cy.visit("https://testwise.azurewebsites.net/list/To-watch-5ea0cb18d32021014cf41c3c");

		//FB, twitter, linkedin
		cy.get('a[href="https://www.facebook.com/sharer.php?u=https://testwise.azurewebsites.net/list/To-watch-5ea0cb18d32021014cf41c3c"]');
		cy.get('a[href="https://twitter.com/intent/tweet?url=https://testwise.azurewebsites.net/list/To-watch-5ea0cb18d32021014cf41c3c"]');
		cy.get('a[href="https://www.linkedin.com/shareArticle?mini=true&url=https://testwise.azurewebsites.net/list/To-watch-5ea0cb18d32021014cf41c3c"]');
	
	})

	it('validate share on ask details', function(){

		cy.visit("https://testwise.azurewebsites.net/ask/What-to-listen-when-its-raining-outside-Edit-ask-5ea0cadc0c224a0162a697b6");
		cy.wait(1000);

		cy.get('a[href="https://www.facebook.com/sharer.php?u=https://testwise.azurewebsites.net/ask/5ea0cadc0c224a0162a697b6"]');
		cy.get('a[href="https://twitter.com/intent/tweet?url=https://testwise.azurewebsites.net/ask/5ea0cadc0c224a0162a697b6"]');
		cy.get('a[href="https://www.linkedin.com/shareArticle?mini=true&url=https://testwise.azurewebsites.net/ask/5ea0cadc0c224a0162a697b6"]');

	})
})
