"use client";
import { BottomAppBar, TitleAppBar } from "@/components/AppBar";
import CartPage from "@/pages/cart_page";
import InfoPage from "@/pages/info_page";
import MainPage from "@/pages/main_page";
import GlobalStyle from "@/styles/global";
import { useState } from "react";

const pageIds = ["main", "cart", "info"];
const icons = ["cart", "person", "check"];
const bottomText = {
  main: "장바구니",
  cart: "정보 입력",
  info: "입력 완료",
};

const Home = () => {
  const [pageIdx, setPageIdx] = useState(0);
  const [scannedItems, setScannedItems] = useState({});

  const toNextPage = () => {
    setPageIdx((pageIdx + 1) % 3);
  };

  return (
    <>
      <TitleAppBar id={pageIds[pageIdx]} />
      <GlobalStyle />
      {pageIdx === 0 ? (
        <MainPage setScannedItems={setScannedItems} />
      ) : pageIdx === 1 ? (
        <CartPage scannedItems={scannedItems} />
      ) : (
        <InfoPage />
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

export default Home;
