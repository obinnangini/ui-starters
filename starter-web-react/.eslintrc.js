const config = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'no-console' : 'warn',
    'arrow-parens': 'off',
    'linebreak-stye': 'off',
    'object-curly-spacing': 'off',
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
  },
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js'
      }
    },
  },
};

module.exports = config;
