module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  ignorePatterns: ['lava-obsidian'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 'latest',
    sourceType: 'module',
    babelOptions: {
      plugins: ['@babel/plugin-syntax-import-assertions'],
    },
  },
  plugins: ['prettier', 'eslint-plugin-import'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'no-plusplus': 'off',
    'no-continue': 'off',
    'no-eval': 'off',
    'no-restricted-syntax': 'warn',
  },
  // settings: {
  //   "import/extensions": [
  //     ".js",
  //     ".jsx"
  //   ],
  // },
};
