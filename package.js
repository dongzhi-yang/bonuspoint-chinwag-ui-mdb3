Package.describe({
  name: 'bonuspoint:chinwag-ui-mdb3',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.use('angular-templates');
  api.use('bonuspoint:product');
  api.use('bonuspoint:core');
  api.use('fourseven:scss');
  api.use('bonuspoint:mdb3');
  api.addAssets(['_chinwag.scss',
  '_topic-selector.scss',
  ],'client');
  api.addFiles(['chat-window.html',
  'chat-window.js',
  'chat.html',
  'chat.js',
  'chinwag.html',
  'chinwag.js',
  'input-panel.html',
  'input-panel.js',
  'message-list.html',
  'message-list.js',
  'message.html',
  'message.js',
  'topic-selector.html',
  'topic-selector.js',
  'user-status.html',
  'user-status.js'
  ],'client');
});
Npm.depends({
    "ng-embed": "2.1.1"
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('bonuspoint:chinwag-ui-mdb3');
  api.mainModule('chinwag-ui-mdb3-tests.js');
});
