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
    // 합성어로 이루어지지 않은 컴포넌트들 에러나지 않게 처리
    "vue/multi-word-component-names": 0,
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
