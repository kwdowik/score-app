describe('Teams Feed', () => {
  it('renders teams feed', () => {
    cy.visit('/');

    cy.findByRole('img', { name: /success-emoji/i }).click();
    cy.findAllByRole('listitem').should('have.length', 6);
  });
  it('renders teams feed after retry', () => {
    cy.visit('/');

    cy.findByRole('img', { name: /failure-emoji/i }).click();
    cy.findByText(/404/i).should('be.visible');

    cy.findByRole('img', { name: /retry-emoji/i }).click();
    cy.findAllByRole('listitem').should('have.length', 6);
  });
});
