module.exports = {
  extends: ['airbnb/base', 'plugin:react/recommended', 'eslint-config-prettier',  'plugin:cypress/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'eslint-plugin-prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          ".js",
          ".jsx"
        ]
      }
    }
  },
  rules: {
    'prettier/prettier': ['error'],
    'import/prefer-default-export': 0,
  },
};
