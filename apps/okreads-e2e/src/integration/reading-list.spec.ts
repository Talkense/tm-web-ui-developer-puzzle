describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  xit('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });


  it('Then: I should be able to remove from reading list', () => {
    
    

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
    cy.wait(3000);
    const readingListBeforeClick = cy.get('.reading-list-content').find('[data-testing="remove-container"]').then((
      els
    ) => {
        const toggle = cy.get('#0a').click();  // 'Reading List decreases by 1 after removing a book'
        cy.get('.reading-list-content').find('[data-testing="remove-container"]').should('have.length', els.length - 1)
    });
    
    
  });


  it('Then: I should be able to undo removing from reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );

    
    cy.get('.reading-list-content').find('[data-testing="remove-container"]').then((els) => {

      cy.get('[id="0a"]').click();

      cy.get('.mat-focus-indicator.mat-button.mat-button-base').contains('Undo').click(); // undo action
      
      cy.get('.reading-list-content').find('[data-testing="remove-container"]')
        .should('have.length', els.length);

    });

    
    
  });


});
