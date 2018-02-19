module.exports = {
  use: [
    ['@neutrinojs/airbnb', {
      eslint: {
        rules: {
          // since many of the props come from firebase, we are fairly loose
          // with the format (preferring not to explode on bogus data)
          'react/forbid-prop-types': 'off',
          // this rule prohibits a nice line-length saver..
          'function-paren-newline': 'off',
        }
      }
    }],
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'Triager'
        }
      }
    ],
    '@neutrinojs/mocha'
  ]
};
