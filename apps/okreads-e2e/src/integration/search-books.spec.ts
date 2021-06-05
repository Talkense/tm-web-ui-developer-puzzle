describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  it('Then: I should see search results as I am typing', async () => {
    let zero = 0;

    const js = ['j', 'a', 'v', 'a', 's', 'c', 'r', 'i', 'p', 't'];

    const idTyping = setInterval(async() => { 
      cy.get('input[type="search"]').type(js[zero++]);
        if (zero === 5) { // typed enough
          clearInterval(idTyping);
          cy.get('[data-testing="book-item"]').children().should('have.length.greaterThan', 1); // means we're getting results
        }
    }, 700);

  });

  it('Then: I should see search results change once as I am typing', async () => {
    let zero = 0;


    const python = ['p', 'y', 't', 'h', 'o', 'n'];


  setTimeout(async() => { 
    cy.get('input[type="search"]').type(python[zero++]);
    cy.get('.book--title').first().should((el) => {

      const idTypingFast = setInterval(() => {
      cy.get('input[type="search"]').type(python[zero++]);

      if (zero === 4) { // we've typed enough
        clearInterval(idTypingFast);
        cy.get('.book--title').first().should((el2) => {
          expect(el2.text()).to.equal(el.text())
        }) // 'After typing, nothing would have changed!'
          
      }

      }, 300);
      

    });

    
  }, 25 * 1000);


  });


  it('Then: I should see search results change continously as I am typing', async () => {
    let zero = 0;

    cy.get('input[type="search"]').clear();

    const ts = ['t', 'y', 'p', 'e', 's', 'c', 'r', 'i', 'p', 't'];




  setTimeout(async() => { 
    cy.get('input[type="search"]').type(ts[zero++]);
    cy.get('.book--title').first().should((el) => {
    const idTypingOkay = setInterval(() => { 
      cy.get('input[type="search"]').type(ts[zero++]);
      if (zero === 5) { // we've typed enough
        clearInterval(idTypingOkay);
        cy.get('.book--title').first().should((el2) => {
          expect(el.text()).not.to.equal(el2.text(), 'After typing, books would have changed!');
        })

      }

  }, 700);
    });

    
  }, 30 * 1000);

  });
  
});
