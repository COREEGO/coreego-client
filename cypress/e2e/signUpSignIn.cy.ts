//TEST END-TO-END

//LOGIN / REGISTER TEST

describe('display register page', () => {
  it('show register page', ()=>{
    cy.visit('/register')
  })
})

describe('attempt to sign up', () => {
  it('fill out sign up form', () => {
    cy.intercept('POST', 'http://127.0.0.1:8000/api/register').as('registerRequest')

    cy.visit('/register')

    cy.get('input[name="pseudo"]').type('yoann8570')
    cy.get('input[name="email"]').type('examplfezee@example.com')
    cy.get('input[name="password"]').type('P@sword85')
    cy.get('input[name="password_confirmation"]').type('P@sword85')
    cy.get('input[name="accept_conditions"]').check();
    cy.get('button[type="submit"]').click()

    cy.wait('@registerRequest').then((interception : any) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  })
})

describe('display login page', () => {
  it('see login page', () => {
    cy.visit('/login')
  })
})

describe('attempt to sign in fail', () => {
  it('fill out login form', () => {

    cy.intercept('POST', 'http://127.0.0.1:8000/api/login').as('loginRequest')

    cy.visit('/login')

    cy.get('input[name="email"]').type('examplfezee@example.com')
    cy.get('input[name="password"]').type('P@sword85')

    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest').then((interception : any) => {
      expect(interception.response.statusCode).to.equal(401)
      expect(interception.response.body.message).to.equal("Veuillez valider votre compte")
    })
  })
})
