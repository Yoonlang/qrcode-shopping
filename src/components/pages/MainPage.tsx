import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";

import { BottomAppBar, TitleAppBar } from "@/components/AppBar";
import RetryButton from "@/components/RetryButton";
import SplashScreen from "@/components/SplashScreen";
import { snackBarStatusMessage } from "@/components/const";
import QrScannerPage from "@/components/pages/QrScannerPage";
import ToBuyListPage from "@/components/pages/ToBuyListPage";
import UserInfoSubmissionPage from "@/components/pages/UserInfoSubmissionPage";
import usePageRouter from "@/hooks/usePageRouter";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

const MainPage = () => {
  const { t } = useTranslation();
  const { isPageName } = usePageRouter();
  const [isSplashScreenOpen, setIsSplashScreenOpen] = useState(false);
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);

  useEffect(() => {
    if (!sessionStorage.getItem("splash")) {
      setIsSplashScreenOpen(true);
      setTimeout(() => {
        setIsSplashScreenOpen(false);
        sessionStorage.setItem("splash", "true");
        setMessageSnackBarState({
          message: t(snackBarStatusMessage["default"]),
          isMessageSnackBarOpen: true,
        });
      }, 2000);
    }
  }, []);

  return (
    <main>
      {isSplashScreenOpen && <SplashScreen />}
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
