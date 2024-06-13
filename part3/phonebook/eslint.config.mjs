import globals from "globals";
import stylisticJs from '@stylistic/eslint-plugin-js'
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"], 
    languageOptions: {
      sourceType: "commonjs"
    }
  },
  {
    languageOptions: { 
      globals: globals.browser 
    }
  },
  {
    plugins: {
      '@stylistic/js': stylisticJs
    }
  },
  {
    ignores: ["dist/*"]
  }
];