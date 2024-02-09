module.exports = {
  env: {
    es2021: true,
    node: true,
    commonjs: true,
  },
  extends: "standard",
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
    camelcase: "off",
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never", asyncArrow: "always" },
    ],
  },
};
