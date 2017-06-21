describe('my awesome website', function() {
    it('should do some chai assertions', function() {
        browser.url('/');
        var outerHTML = browser.getHTML('body');
        console.log(outerHTML);
        browser.getTitle().should.be.equal('WebdriverIO - WebDriver bindings for Node.js');
    });
});