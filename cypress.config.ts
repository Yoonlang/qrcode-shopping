import path, { dirname } from "path";
import { fileURLToPath } from "url";

import webpack from "@cypress/webpack-preprocessor";
import { defineConfig } from "cypress";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const options = webpack({
        webpackOptions: {
          resolve: {
            extensions: [".ts", ".tsx"],
            alias: {
              cypress: path.resolve(__dirname, "cypress"),
              src: path.resolve(__dirname, "src"),
            },
          },
          module: {
            rules: [
              {
                test: /\.tsx?$/,
                use: [
                  {
                    loader: "ts-loader",
                    options: { transpileOnly: true },
                  },
                ],
                exclude: /node_modules/,
              },
            ],
          },
        },
      });
      on("file:preprocessor", options);
      return config;
    },
    baseUrl: "https://localhost:3000",
  },
});
