//More list by section
//https://testwise.azurewebsites.net/list/World-History-5e95f81c093123002b7b83bd
//Psy 8, Tearjerkers 11, Coming of Age 10

var json = require('../variable.json');

//Email Login + Create a list 
describe('More list by count check', function() {
	it('login and navigate to main list', function() {

		cy.startUp();
		cy.simpleLogIn(json.users.static.name, json.users.static.password);

		cy.wait(3000);

		cy.visit('/' + 'list/World-History-5e95f81c093123002b7b83bd');

		cy.wait(2000);

  })

    it('verify List count number for Also by user', function() {

        //First list
        cy.get('a[href="/list/Psychology-5e95f78532155e001d64005d"]').should('contain', '8 Books')
        cy.get('a[href="/list/Tearjerkers-5e95f521c4c0d2002beb0272"]').should('contain', '11 Books')
        cy.get('a[href="/list/Coming-of-Age-5e95f484586a7b001d977bce"]').should('contain', '10 Books')

    })

})