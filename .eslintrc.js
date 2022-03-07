module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },
  ],
  plugins: ['@typescript-eslint', 'max-params-no-constructor', 'sonarjs'],
  parser: '@typescript-eslint/parser',
  /*parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },*/
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    indent: 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'comma-dangle': [
      'error',
      {
        // eslint-disable-next-line sonarjs/no-duplicate-string
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'only-multiline',
      },
    ],
    'prettier/prettier': [
      'warn',
      {
        trailingComma: 'es5',
      },
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    'no-use-before-define': 'off',
    curly: ['error', 'multi-line'],
    '@typescript-eslint/no-parameter-properties': 'off',
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'max-lines': ['error', 350],
    'max-lines-per-function': ['error', { max: 70, skipBlankLines: true }],
    'max-depth': ['error', 4],
    'max-nested-callbacks': ['error', 3],
    'array-callback-return': 'warn',
    eqeqeq: 'error',
    'no-shadow': 'warn',
    'max-params-no-constructor/max-params-no-constructor': ['error', 3],
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    '@typescript-eslint/no-empty-function': 'off',
  },
};
