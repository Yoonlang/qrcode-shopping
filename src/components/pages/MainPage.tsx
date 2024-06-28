import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { BottomAppBar, TitleAppBar } from "@/components/AppBar";
import QrScannerPage from "@/components/pages/QrScannerPage";
import ToBuyListPage from "@/components/pages/ToBuyListPage";
import UserInfoSubmissionPage from "@/components/pages/UserInfoSubmissionPage";
import RetryButton from "@/components/RetryButton";
import SplashScreen from "@/components/SplashScreen";
import usePageRouter from "@/hooks/usePageRouter";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

const MainPage = () => {
  const { isPageName } = usePageRouter();

  return (
    <main>
      <SplashScreen />
      <TitleAppBar />
      {isPageName("qrcode") && <QrScannerPage />}
      {isPageName("cart") && (
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <RetryButton resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <Suspense fallback={<></>}>
            <ToBuyListPage />
          </Suspense>
        </ErrorBoundary>
      )}
      {isPageName("info") && <UserInfoSubmissionPage />}
      <BottomAppBar />
    </main>
  );
};

export default MainPage;
