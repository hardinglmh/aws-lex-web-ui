// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

var config = require('../../../src/config/config.test.json');

module.exports = {
  'stand-alone app e2e tests': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#lex-app', 5000)
      .waitForElementVisible('#lex-web', 5000)
      .assert.title(config.ui.pageTitle)
      .assert.elementPresent('.toolbar')
      .assert.elementCount('img', 1)
      .assert.containsText('.toolbar__title', config.ui.toolbarTitle)
      .assert.elementPresent('.message-list')
      .waitForElementVisible('.message-text', 5000)
      .assert.containsText('.message-text', config.lex.initialText)
      .assert.elementPresent('.status-bar')
      .assert.elementPresent('.status-text')
      .assert.elementPresent('.voice-controls')
      .assert.elementPresent('.input-container')
      .getLog('browser', function(logEntriesArray) {
        console.log('Log length: ' + logEntriesArray.length);
        logEntriesArray.forEach(function(log) {
         console.log('[' + log.level + '] ' + log.timestamp + ' : ' + log.message);
       });
      })
      .end();
  },
  'iframe sample app e2e tests': function test(browser) {
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer + '/static/iframe/index.html')
      .waitForElementVisible('.lex-chat', 5000)
      .waitForElementPresent('.lex-chat script', 5000)
      .waitForElementPresent('.lex-chat iframe', 5000)
      .getLog('browser', function(logEntriesArray) {
        console.log('Log length: ' + logEntriesArray.length);
        logEntriesArray.forEach(function(log) {
         console.log('[' + log.level + '] ' + log.timestamp + ' : ' + log.message);
       });
      })
      .end();
  },
};
