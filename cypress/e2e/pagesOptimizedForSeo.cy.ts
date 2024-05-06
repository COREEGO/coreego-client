function balises(){
  cy.get('h1')
    .should('exist')
    .should('be.visible').and('not.be.empty')

    cy.get('img').each(($img : any) => {
      cy.wrap<HTMLImageElement>($img).should('have.attr', 'alt').and('not.be.empty')
    })
    cy.get('title')
    .should('exist').and('not.be.empty')

    cy.get('meta[name="description"]')
    .should('exist')
    .should('have.attr', 'content')
    .and('not.be.empty')
}

describe('Check if the pages are optimized for SEO', () => {
  it('Home page should get optimized', () => {
    cy.visit('/')
    balises()
  })
  it('Forum feed page should get optimized', () => {
    cy.visit('/forum')
    balises()
  })
  it('Marketplace feed page should get optimized', () => {
    cy.visit('/marketplace')
    balises()
  })
  it('Marketplace feed page should get optimized', () => {
    cy.visit('/explorer')
    balises()
  })
})
