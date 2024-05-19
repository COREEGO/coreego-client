describe('display forum page', () => {
  it('show forum page', ()=>{
    cy.visit('/forum')
  })
})

describe('test category filter', () => {
  it('should verify the categories list is initially displayed and has items', () => {
    cy.visit('/forum');

    cy.get('[data-testid="button-list"]').click();

    cy.get('[data-testid="list"]').should('be.visible');

    cy.get('[data-testid="list-item"]').should('have.length.greaterThan', 0);
  });
});

describe('test search filter', () => {
    it('should verify the search dialog opens on button click, and search query is fonctinal', () => {

      cy.visit('/forum');

      cy.get('[data-testid="button-search"]').click();
      cy.get('[data-testid="dialog-search"]').should('be.visible');
      cy.get('[data-testid="input-search"]').should('be.visible');


      const searchText = 'Votre recherche ici';

      cy.get('[data-testid="input-search"]').type(searchText + '{enter}');

      cy.get('[data-testid="button-search"]').should('have.text', searchText);
    });
})
