module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'public'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react-compiler'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-explicit-any': 'error',
    'react-compiler/react-compiler': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'no-multi-spaces': 'error',
  },
};
