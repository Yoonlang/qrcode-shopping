import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsconfigPath = path.join(__dirname, "..", "tsconfig.json");

const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));

tsconfig.compilerOptions.jsx = "react-jsx";

fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
