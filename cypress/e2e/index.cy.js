describe('Simple Message UI', () => {
    beforeEach(() => {
        const testMessage = 'Hello from Cypress!';

        cy.intercept('GET', 'http://localhost:3000/messages', {
            statusCode: 200,
            body: [{ id: 1, content: testMessage }],
        }).as('getMessages');

        cy.intercept('POST', 'http://localhost:3000/submit', {
            statusCode: 200,
        }).as('postMessage');
        cy.visit('http://localhost:8080');
    });

    it('should display the form and previous messages section', () => {
        cy.contains('h1', 'Say something');
        cy.get('form#messageForm').should('exist');
        cy.get('input#messageInput').should('exist');
        cy.get('button[type="submit"]').should('exist');
        cy.contains('h2', 'Previous messages');
        cy.get('ul#messagesList').should('exist');
    });

    it('should allow submitting a message and update the list', () => {
        const testMessage = 'Hello from Cypress!';

        cy.get('input#messageInput').type(testMessage);
        cy.get('form#messageForm').submit();

        cy.wait('@postMessage');
        cy.wait('@getMessages');

        cy.get('#messagesList').should('contain', 'Foo');
    });

    it('should not submit empty messages', () => {
        cy.get('input#messageInput').clear();
        cy.get('form#messageForm').submit();

        cy.intercept('POST', 'http://localhost:3000/submit').as('postMessage');
        cy.wait(500);
        cy.get('@postMessage.all').should('have.length', 0);
    });
});
