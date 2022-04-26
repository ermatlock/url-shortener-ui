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

  it("When a user fills out the form, the information is reflected in the input fields", () =>{
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 200,
      fixture: 'shortenedData.json'
    }).as("matchedUrl")
    cy.visit("http://localhost:3000/")
    .get("input:first").type("Cool!").should("have.value", "Cool!")
    .get("input:last").type("https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch").should("have.value", "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch")
  })

  it("When a user fills out and submits the form, the new shortened URL is rendered", () =>{
    // cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
    //   statusCode: 200,
    //   fixture: 'shortenedData.json'
    // }).as("matchedUrl")
    cy.visit("http://localhost:3000/")
    .get("input:first").type("Cool!").should("have.value", "Cool!")
    .get("input:last").type("https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch").should("have.value", "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch")
    .get("button").click()
    // cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
    //   statusCode: 200,
    //   fixture: 'updatedData.json'
    // }).as("matchedUrl")
    cy.visit("http://localhost:3000/")
    .get("#2").contains("Cool!")
    .get("#2 > a").contains("http://localhost:3001/useshorturl/2")
    .get("#2 > p").contains("https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch")
  })
  
  
})