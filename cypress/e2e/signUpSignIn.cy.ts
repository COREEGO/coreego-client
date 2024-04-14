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

    cy.get('input[name="password"]').type('password123')

    cy.get('input[name="password_confirmation"]').type('password123')

    // Submit the registration form
    cy.get('button[type="submit"]').click()

    cy.wait('@registerRequest').then((interception : any) => {
      // Assert that the response status code is 401
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
    // Intercept the login request
    cy.intercept('POST', 'http://127.0.0.1:8000/api/login').as('loginRequest')

    cy.visit('/login')

    // Fill out the login form
    cy.get('input[name="email"]').type('examplfezee@example.com')
    cy.get('input[name="password"]').type('password123')

    // Submit the login form
    cy.get('button[type="submit"]').click()

    // Assertions to verify the login request response
    cy.wait('@loginRequest').then((interception : any) => {
      // Assert that the response status code is 401
      expect(interception.response.statusCode).to.equal(401)
    })
  })
})
