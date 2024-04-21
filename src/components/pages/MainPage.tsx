import GlobalStyle from "@/styles/global";
import { useCallback, useState } from "react";
import QrScannerPage from "./QrScannerPage";
import ToBuyListPage from "./ToBuyListPage";
import UserInfoSubmissionPage from "./UserInfoSubmissionPage";

const MainPage = () => {
  const [pageIdx, setPageIdx] = useState(2);
  const [scannedItems, setScannedItems] = useState({});

  const toNextPage = useCallback(() => {
    setPageIdx((pageIdx + 1) % 3);
  }, [pageIdx]);

  return (
    <>
      <GlobalStyle />
      {pageIdx === 0 ? (
        <QrScannerPage
          toNextPage={toNextPage}
          setScannedItems={setScannedItems}
        />
      ) : pageIdx === 1 ? (
        <ToBuyListPage toNextPage={toNextPage} scannedItems={scannedItems} />
      ) : (
        <UserInfoSubmissionPage toNextPage={toNextPage} />
      )}
    </>
  );
};

export default MainPage;
