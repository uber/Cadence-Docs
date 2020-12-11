context('Slack short link', () => {
  beforeEach(() => {
    cy.visit('http://t.uber.com/cadence-slack');
  });

  it('should render the page with at least an email input.', () => {
    cy.get('input[name="email"]')
      .should('be.visible');
  });

  it('should redirect to the join URL', () => {
    cy.location().should(({ host, pathname }) => {
      expect(host).to.equal('uber-cadence.slack.com');
      expect(pathname).to.include('/join/shared_invite');
    });
  });
});
