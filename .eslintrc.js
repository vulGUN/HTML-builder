module.exports = {
  env: {
    commonjs: true,
    es2022: true,
    node: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
