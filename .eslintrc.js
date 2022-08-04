module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        indent: ['error', 2],
        'no-multi-spaces': ['error'],
        'react-native/no-unused-styles': 'error',
        'react-native/sort-styles': 'error',
        'react-native/no-color-literals': 'error',
        'react-native/no-single-element-style-arrays': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
      },
    },
  ],
};
