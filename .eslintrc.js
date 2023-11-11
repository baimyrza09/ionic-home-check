module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended', '@vue/typescript'],
  rules: {
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 0,
    '@intlify/vue-i18n/no-v-html': 'off',
    'linebreak-style': 'error',
    'vue/attributes-order': [
      'error',
      {
        order: [
          'CONDITIONALS',
          'DEFINITION',
          'TWO_WAY_BINDING',
          'LIST_RENDERING',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
};
