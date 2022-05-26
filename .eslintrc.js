module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential'],
  plugins:["prettier"],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        singleQuote: false,
        semi: false,
        userTabs: false,
        trailingComma: 'all',
        brackietSpacing: false,
        arrowParens: 'avoid',
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
