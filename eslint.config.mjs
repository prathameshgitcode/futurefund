import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "__tests__/**",
  ]),
  {
    rules: {
      // This pattern (setState in useEffect to sync from external state like
      // localStorage) is intentional throughout the app.
      "react-hooks/set-state-in-effect": "off",
      // Unused vars are warnings not errors — suppress for unused imports
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
]);

export default eslintConfig;
