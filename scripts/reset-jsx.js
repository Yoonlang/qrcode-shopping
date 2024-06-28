const fs = require("fs");
const path = require("path");

const tsconfigPath = path.join(__dirname, "..", "tsconfig.json");
const tsconfig = require(tsconfigPath);

tsconfig.compilerOptions.jsx = "preserve";

fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));