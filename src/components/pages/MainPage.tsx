import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import QrScannerPage from "@/components/pages/QrScannerPage";
import SubmissionCompletePage from "@/components/pages/SubmissionCompletePage";
import ToBuyListPage from "@/components/pages/ToBuyListPage";
import UserSubmissionPage from "@/components/pages/UserSubmissionPage";
import WeChatFriendGuidePage from "@/components/pages/WeChatFriendGuidePage";
import { BottomAppBar, TitleAppBar } from "@/components/user/AppBar";
import RetryButton from "@/components/user/RetryButton";
import SplashScreen from "@/components/user/SplashScreen";
import usePageRouter from "@/hooks/user/usePageRouter";

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
      {isPageName("info") && <UserSubmissionPage />}
      {isPageName("wechat") && <WeChatFriendGuidePage />}
      {isPageName("complete") && <SubmissionCompletePage />}
      <BottomAppBar />
    </main>
  );
};

export default MainPage;
