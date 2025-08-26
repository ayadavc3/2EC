import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const importOrder = {
  "groups": [
    "builtin",     // Node.js built-in modules
    "external",    // npm packages
    "internal",    // Your own modules
    "parent",      // ../something
    "sibling",     // ./something
    "index"        // ./
  ],
  "pathGroups": [
    {
      "pattern": "react",
      "group": "external",
      "position": "before"
    },
    {
      "pattern": "@/**",
      "group": "internal"
    }
  ],
  "pathGroupsExcludedImportTypes": ["react"],
  "newlines-between": "always",
  "alphabetize": {
    "order": "asc"
  }
};

const eslintConfig = [
  ...compat.config({
    extends: [
      "plugin:import/recommended",
      "plugin:import/typescript",      
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
    ],
    rules: {
      "import/order": ["error", importOrder],
      // ESLint rules start here
      semi: ["error"],
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
    },
    settings: {
      "import/resolver": {
        "node": true,
        "typescript": true,
      },
    },
  }),
];

export default eslintConfig;
