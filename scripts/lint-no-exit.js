import { execSync } from "child_process";

try {
  execSync("npx eslint src --cache", { stdio: "inherit" });
} catch (error) {
  console.log(
    "전체 lint 검사에서 문제가 발견되었습니다. 이후 스테이징 된 코드를 검사합니다."
  );
}

process.exit(0);
