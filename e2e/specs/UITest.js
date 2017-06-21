describe('my awesome website', function() {
    it('should do some chai assertions', function() {
        browser.url('/');
        browser.getHTML('body').should.contain('Congratulations, you now have a useless React application');
        browser.getTitle().should.be.equal('React Webpack Application');
    });
});