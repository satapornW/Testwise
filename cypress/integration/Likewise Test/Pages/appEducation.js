//App education pop up on homescreen. 


describe('app education happy', function(){

	it('Test pop up', function(){

		cy.startUp();
		cy.scrollTo(0, 800);
		//<p _ngcontent-webwise-c39="" class="header">Did you know Likewise has an App?</p>
		cy.get('p[class="header"]').should('contain', 'Did you know Likewise has an App?');
		//<button _ngcontent-webwise-c35="" class="textme-button" id="sendText">Text me a link</button>
		cy.get('button[class="mat-ripple"]').click();
		//<div _ngcontent-webwise-c35="" class="error" style="margin-top: 1rem; margin-bottom: 1rem;">Invalid Phone Number</div>
		cy.wait(500);
		cy.get('label[class="validation-error"]').should('contain', 'Invalid Phone Number');
		//<input _ngcontent-webwise-c35="" class="textme-input ng-pristine ng-valid ng-star-inserted ng-touched wrongNumber" type="text" style="">
		cy.get('input[class="ng-pristine ng-valid ng-star-inserted ng-touched"]').focus().type('1234567890');
		cy.wait(500);
		cy.get('button[class="mat-ripple"]').click();

		//<p _ngcontent-webwise-c35="" class="success"> Success! A text with our link is headed your way. </p>
		cy.get('p[class="success ng-star-inserted"]').should('contain', 'Success! A text with our link is headed your way.');
		cy.wait(500);
		//<button _ngcontent-webwise-c39="" class="no-thanks">Close</button>
		cy.get('button[class="no-thanks"]').should('contain', 'Close').click();
	})

})