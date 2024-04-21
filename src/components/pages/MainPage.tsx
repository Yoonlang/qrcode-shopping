import GlobalStyle from "@/styles/global";
import { useState } from "react";
import QrScannerPage from "./QrScannerPage";
import ToBuyListPage from "./ToBuyListPage";
import UserInfoSubmissionPage from "./UserInfoSubmissionPage";
import { BottomAppBar, TitleAppBar } from "../AppBar";

const pageIds = ["main", "cart", "info"];
const icons = ["cart", "person", "check"];
const bottomText = {
  main: "장바구니",
  cart: "정보 입력",
  info: "입력 완료",
};

const MainPage = () => {
  const [pageIdx, setPageIdx] = useState(0);
  const [scannedItems, setScannedItems] = useState({});

  const toNextPage = () => {
    setPageIdx((pageIdx + 1) % 3);
  };

  return (
    <>
      <GlobalStyle />
      <TitleAppBar
        id={pageIds[pageIdx]}
        hasBack={pageIdx === 0 ? false : true}
      />
      {pageIdx === 0 ? (
        <QrScannerPage setScannedItems={setScannedItems} />
      ) : pageIdx === 1 ? (
        <ToBuyListPage scannedItems={scannedItems} />
      ) : (
        <UserInfoSubmissionPage />
      )}
      <BottomAppBar
        icon={icons[pageIdx]}
        toNextPage={toNextPage}
        text={bottomText[pageIds[pageIdx]]}
        badgeNum={pageIdx === 0 ? Object.keys(scannedItems).length : null}
      />
    </>
  );
};

export default MainPage;
