module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true,
      jsx: true,
    },
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'vue/max-attributes-per-line': 0,
    'no-angle-bracket-type-assertion': 0,
    'no-var-requires': 0,
    'no-return-await': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-angle-bracket-type-assertion': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'import/no-webpack-loader-syntax': 0,
    // 设置默认eslint规则
    'one-var': 0,
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': 0,
    'no-console': 0,
    'space-before-function-paren': 0,
    'no-useless-escape': 0,
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'new-cap': 0,
    camelcase: 0,
    'no-new': 0,
    semi: 'off',
    indent: 'off',
    'prefer-const': 0,
    'lines-between-class-members': 0,
    'no-unused-expressions': 0,
    'no-unused-vars': 0,
    'object-curly-spacing': ['error', 'always'],
    'vue/singleline-html-element-content-newline': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
      },
    ],
    'eslint@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/member-ordering': [
      2,
      {
        default: [
          'constructor',
          'private-field',
          'protected-field',
          'public-field',
          'field',
          'private-method',
          'protected-method',
          'public-method',
          'method',
        ],
      },
    ],
  },
}
