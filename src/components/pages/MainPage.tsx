import { Suspense } from "react";

import { BottomAppBar, TitleAppBar } from "@/components/AppBar";
import QrScannerPage from "@/components/pages/QrScannerPage";
import ToBuyListPage from "@/components/pages/ToBuyListPage";
import UserInfoSubmissionPage from "@/components/pages/UserInfoSubmissionPage";
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
        <Suspense fallback={<></>}>
          <ToBuyListPage />
        </Suspense>
      )}
      {isPageName("info") && <UserInfoSubmissionPage />}
      <BottomAppBar />
    </main>
  );
};

export default MainPage;
