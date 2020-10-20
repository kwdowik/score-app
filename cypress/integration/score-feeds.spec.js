describe('Score Feed', () => {
  it('renders scores feed', () => {
    cy.visit('http://localhost:3001');

    cy.findByRole('img', { name: /success-emoji/i }).click();
    cy.findAllByRole('listitem').should('have.length', 3);
  });
  it('renders scores feed after retry', () => {
    cy.visit('http://localhost:3001');

    cy.findByRole('img', { name: /failure-emoji/i }).click();
    cy.findByText(/Error/i).should('be.visible');

    cy.findByRole('img', { name: /retry-emoji/i }).click();
    cy.findAllByRole('listitem').should('have.length', 3);
  });
});
