import path, { dirname } from "path";
import { fileURLToPath } from "url";

import webpack from "@cypress/webpack-preprocessor";
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const options = webpack({
        webpackOptions: {
          resolve: {
            extensions: [".ts", ".tsx"],
            alias: {
              cypress: path.resolve(
                dirname(fileURLToPath(import.meta.url)),
                "cypress"
              ),
            },
          },
        },
      });
      on("file:preprocessor", options);
      return config;
    },
    baseUrl: "https://localhost:3000",
  },
});
