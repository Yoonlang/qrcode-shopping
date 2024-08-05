import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { BottomAppBar, TitleAppBar } from "@/components/AppBar";
import QrScannerPage from "@/components/pages/QrScannerPage";
import SubmissionCompletePage from "@/components/pages/SubmissionCompletePage";
import ToBuyListPage from "@/components/pages/ToBuyListPage";
import UserInfoSubmissionPage from "@/components/pages/UserInfoSubmissionPage";
import WeChatFriendGuidePage from "@/components/pages/WeChatFriendGuidePage";
import RetryButton from "@/components/RetryButton";
import SplashScreen from "@/components/SplashScreen";
import usePageRouter from "@/hooks/usePageRouter";

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
      {isPageName("wechat") && <WeChatFriendGuidePage />}
      {isPageName("complete") && <SubmissionCompletePage />}
      <BottomAppBar />
    </main>
  );
};

export default MainPage;
