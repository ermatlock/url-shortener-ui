// ### Iteration 3

// Write Cypress tests for the following user flows (don't forget to stub your network requests):

// * When a user visits the page, they can view the page title and the existing shortened URLs
// * When a user visits the page, they can view the Form with the proper inputs
// * When a user fills out the form, the information is reflected in the input fields

describe("url shortener", () => {
  
  it("When a user visits the page, they can view the page title and the existing shortened URLs", () =>{
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 200,
      fixture: 'shortenedData.json'
    }).as("matchedUrl")
    cy.visit("http://localhost:3000/")
    .get('header > h1').contains("URL Shortener")
    .get("#1").contains("Awesome photo")
    .get("#1 > a").contains("http://localhost:3001/useshorturl/1")
    .get("#1 > p").contains("https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80")

  })

  it("When a user visits the page, they can view the Form with the proper inputs", () =>{
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 200,
      fixture: 'shortenedData.json'
    }).as("matchedUrl")
    cy.visit("http://localhost:3000/")
    .get("input:first").should("have.attr", "placeholder", "Title...")
    .get("input:last").should("have.attr", "placeholder", "URL to Shorten...")
    .get("button").contains("Shorten Please!")
  })
  
})