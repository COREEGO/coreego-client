describe('display forum page', () => {
  it('show register page', ()=>{
    cy.visit('/forum')
  })
})

describe('test category filter', () => {
  // Test to verify the initial list is not empty
  it('should verify the categories list is initially displayed and has items', () => {
    // Visit the forum page
    cy.visit('/forum');

    // Click the button to open the list (assuming a button exists)
    cy.get('[data-testid="button-list"]').click();

    // Assert that the list is visible
    cy.get('[data-testid="list"]').should('be.visible');

    // Assert that the list has at least one item
    cy.get('[data-testid="list-item"]').should('have.length.greaterThan', 0);
  });
});

describe('test search filter', () => {
    // Test to verify the search filter opens and input is available
    it('should verify the search dialog opens on button click, and search query is fonctinal', () => {
      // Visit the forum page
      cy.visit('/forum');

      // Click the button to open the search filter (assuming a button exists)
      cy.get('[data-testid="button-search"]').click();

      // Assert that the search dialog is visible
      cy.get('[data-testid="dialog-search"]').should('be.visible');

      // Assert that the search input field is visible
      cy.get('[data-testid="input-search"]').should('be.visible');

      // Type into the search input field and press Enter
      const searchText = 'Votre recherche ici';
      cy.get('[data-testid="input-search"]').type(searchText + '{enter}');

      // Assert that the search button has the search text
      cy.get('[data-testid="button-search"]').should('have.text', searchText);
    });
})