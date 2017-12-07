const config = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'no-console' : 'warn',
    'arrow-parens': 'off',
    'object-curly-spacing': 'off',
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
