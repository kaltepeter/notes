import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import graphqlPlugin from "@graphql-eslint/eslint-plugin";

export default [
  {
    ignores: [
      "node_modules/**",
      ".cache/**",
      "public/**",
      "**/*.d.ts",
      "graphql.config.js",
    ],
  },
  js.configs.recommended,
  ...tsPlugin.configs["flat/recommended"],
  {
    files: ["**/*.ts", "**/*.tsx"],
    processor: graphqlPlugin.processor,
  },
  {
    files: ["**/*.graphql"],
    languageOptions: {
      parser: graphqlPlugin.parser,
    },
    plugins: {
      "@graphql-eslint": graphqlPlugin,
    },
    rules: {
      "@graphql-eslint/no-anonymous-operations": "error",
      "@graphql-eslint/naming-convention": [
        "error",
        {
          OperationDefinition: {
            style: "PascalCase",
            forbiddenPrefixes: ["Query", "Mutation", "Subscription", "Get"],
            forbiddenSuffixes: ["Query", "Mutation", "Subscription"],
          },
        },
      ],
    },
  },
];
