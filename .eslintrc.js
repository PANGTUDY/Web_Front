module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential"],
  plugins: ["prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: [
          "default",
          "Login",
          "Grant",
          "Starter",
          "Success",
          "Register",
          "Setting",
          "Components",
          "delete",
          "practice",
          "Calendar",
        ],
      },
    ],
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        singleQuote: false,
        semi: true,
        userTabs: false,
        tabWidth: 2,
        trailingComma: "all",
        bracketSpacing: true,
        arrowParens: "avoid",
        endOfLine: "auto",
      },
    ],
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
