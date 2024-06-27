import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";

import { getProductList } from "@/api";
import { BottomAppBar, TitleAppBar } from "@/components/AppBar";
import SplashScreen from "@/components/SplashScreen";
import { snackBarStatusMessage } from "@/components/const";
import QrScannerPage from "@/components/pages/QrScannerPage";
import ToBuyListPage from "@/components/pages/ToBuyListPage";
import UserInfoSubmissionPage from "@/components/pages/UserInfoSubmissionPage";
import usePageRouter from "@/hooks/usePageRouter";
import { fetchedItemListState } from "@/recoil/atoms/fetchedItemListState";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

const MainPage = () => {
  const { t } = useTranslation();
  const { isPageName } = usePageRouter();
  const setFetchedItemList = useSetRecoilState(fetchedItemListState);
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

  useEffect(() => {
    getProductList(
      (data) => {
        setFetchedItemList(data);
      },
      (e) => {
        console.log(e);
      }
    );
  }, []);

  return (
    <main>
      {isSplashScreenOpen && <SplashScreen />}
      <TitleAppBar />
      {isPageName("qrcode") && <QrScannerPage />}
      {isPageName("cart") && <ToBuyListPage />}
      {isPageName("info") && <UserInfoSubmissionPage />}
      <BottomAppBar />
    </main>
  );
};

export default MainPage;
