module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'max-len': ['error', { code: 100, ignoreStrings: true, ignoreTemplateLiterals: true }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}; 