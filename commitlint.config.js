const OFF = 0;
const WARNING = 1;
const ERROR = 2;

const typeList = [
  "feat",
  "fix",
  "docs",
  "style",
  "refactor",
  "test",
  "chore",
  "asset",
];

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [ERROR, "always", 72],
    "type-enum": [ERROR, "always", typeList],
    "type-case": [ERROR, "always", "lower-case"],
    "subject-case": [OFF],
  },
  plugins: [
    {
      rules: {
        "header-prefix-type-custom-rule": ({ header }) => {
          const regex = new RegExp(`^(${typeList.join("|")}): .+$`);
          const isValid = regex.test(header);
          return [
            isValid,
            '커밋 메시지는 "{type}: ~~" 형식을 따라야 합니다.\n가능한 타입: ' +
              typeList.join(", "),
            isValid ? OFF : ERROR,
          ];
        },
      },
    },
  ],
};
