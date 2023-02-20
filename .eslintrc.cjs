module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-no-undef": [0],
    "react/no-unknown-property": [0],
    "react/no-children-prop": [0],
    "react/prop-types": [0],
    "react/display-name": [0],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
