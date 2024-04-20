"use client";
import CartPage from "@/pages/cart_page";
import InfoPage from "@/pages/info_page";
import MainPage from "@/pages/main_page";
import GlobalStyle from "@/styles/global";
import { useCallback, useState } from "react";

const Home = () => {
  const [pageIdx, setPageIdx] = useState(2);
  const [scannedItems, setScannedItems] = useState({});

  const toNextPage = useCallback(() => {
    setPageIdx((pageIdx + 1) % 3);
  }, [pageIdx]);

  return (
    <>
      <GlobalStyle />
      {pageIdx === 0 ? (
        <MainPage toNextPage={toNextPage} setScannedItems={setScannedItems} />
      ) : pageIdx === 1 ? (
        <CartPage toNextPage={toNextPage} scannedItems={scannedItems} />
      ) : (
        <InfoPage toNextPage={toNextPage} />
      )}
    </>
  );
};

export default Home;
