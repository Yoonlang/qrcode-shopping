# AI Agent 명심 룰 (GitOps & CI/CD Workflow)

이 문서는 AI 코드 어시스턴트(Antigravity 등)가 qrcode-shopping 및 qrcode-node 프로젝트를 수정할 때 **절대적으로 지켜야 하는 핵심 수칙**입니다.

## 1. 절대 다이렉트 푸시 금지 (No Direct Push)
- 어떠한 급한 핫픽스나 기능 배포라도, **절대로 `main` 브랜치나 `dev` 브랜치에 직접(Direct) commit 명령을 내리고 push하지 마십시오.**
- 직접 푸시는 치명적인 서비스 마비나 Vercel 프로덕션 빌드 사고로 이어질 수 있습니다.

## 2. 무조건 Feature 브랜치 & Pull Request 사용
- 모든 수정 사항은 반드시 본래 존재하던 `dev` 브랜치 위에서 파생된 별도의 `feat/이슈번호` 또는 `fix/이슈번호` 브랜치에서 작업합니다.
- 작업이 끝나면 `git push origin feat/...` 를 통해 리모트에 올린 뒤, **반드시 GitHub CLI(`gh pr create`)를 사용해 Pull Request를 생성**합니다.
- PR 생성 후, Vercel Preview 주소나 로컬 환경에서 사용자(매니저)가 테스트하고 **승인(Merge)할 때까지 대기**합니다.

## 3. GitHub Issue 트래킹
- 새로운 작업을 시작할 때는 가급적 `gh issue create`를 통해 작업 목표를 명확히 하고, 해당 이슈 번호를 트래킹하여 브랜치명(`feat/338` 등)을 맞춥니다.
