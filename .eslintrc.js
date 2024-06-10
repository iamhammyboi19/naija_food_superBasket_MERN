module.exports = {
  env: {
    es2021: true,
    node: true,
    commonjs: true,
  },
  extends: ["standard", "plugin:react/recommended", "plugin:react/jsx-runtime"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    quotes: "off",
    "comma-dangle": ["error", "only-multiline"],
    semi: ["error", "always"],
    "multiline-ternary": ["error", "never"],
    camelcase: "off",
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never", asyncArrow: "always" },
    ],
  },
};
