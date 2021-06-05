describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });


  
  it('Then: I should be able to mark a book as finished', async () => {
    

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('.mat-checkbox.mat-accent.mat-checkbox-label-before')
        .first().contains('Completed')
      .click();

    cy.get('.mat-checkbox.mat-accent.mat-checkbox-label-before')
        .first().contains('2021'); // should contain that you completed it sometime this year.

  });


  it('Then: I should be able to see "Finished" on button text', async () => {
    

    cy.get('form > input[type="search"]')
    .type('javascript')
    .submit();


     cy.get('button[ng-reflect-disabled="false"] > span.mat-button-wrapper')
    .contains('Want to Read')
    .click();

      
      
    cy.get('[data-testing="toggle-reading-list"]')
    .click();
    
      

    // get unchecked checkbox
      cy.get('.reading-list-item.ng-star-inserted > .mat-checkbox.mat-accent.mat-checkbox-label-before')
      .last()
      .click()

      cy.get('button[ng-reflect-disabled="true"] .mat-button-wrapper').last()
      .contains('Finished');


  });


});
