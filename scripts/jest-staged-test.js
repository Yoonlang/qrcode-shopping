import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const testExtList = ["js", "ts", "jsx", "tsx"];

const stagedFileList = execSync("git diff --cached --name-only", {
  encoding: "utf-8",
})
  .split("\n")
  .filter((file) => {
    const ext = path.extname(file);
    return testExtList.includes(ext);
  });

const testFileList = stagedFileList
  .map((file) => {
    const ext = path.extname(file);
    const testFile = `${file.slice(0, -ext.length)}.test${ext}`;
    return fs.existsSync(testFile) ? testFile : null;
  })
  .filter(Boolean);

if (testFileList.length > 0) {
  execSync(`jest ${testFileList.join(" ")}`, { stdio: "inherit" });
}
