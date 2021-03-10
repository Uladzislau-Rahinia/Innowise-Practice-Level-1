module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'plugin:jest/recommended', 'plugin:react-hooks/recommended'],
  plugins: ['react', 'prettier'],
  rules: {
    'linebreak-style': 0,
    'react/jsx-filename-extension':
            [1, { extensions: ['.js', '.jsx'] }],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
