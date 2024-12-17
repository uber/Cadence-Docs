context('Slack short link', () => {
  beforeEach(() => {
    cy.visit('http://t.uber.com/cadence-slack');
  });

  it('should redirect to the join URL', () => {
    cy.location().should(({ host, pathname }) => {
      expect(host).to.equal('uber-cadence.slack.com');
      expect(pathname).to.include('/join/shared_invite');
    });
  });
});
