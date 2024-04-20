"use client";
import CartPage from "@/pages/cart_page";
import InfoPage from "@/pages/info_page";
import MainPage from "@/pages/main_page";
import GlobalStyle from "@/styles/global";
import { useCallback, useState } from "react";

const Home = () => {
  const [pageIdx, setPageIdx] = useState(0);

  const toNextPage = useCallback(() => {
    setPageIdx((pageIdx + 1) % 3);
  }, [pageIdx]);

  return (
    <>
      <GlobalStyle />
      {pageIdx === 0 ? (
        <MainPage toNextPage={toNextPage} />
      ) : pageIdx === 1 ? (
        <CartPage toNextPage={toNextPage} />
      ) : (
        <InfoPage toNextPage={toNextPage} />
      )}
    </>
  );
};

export default Home;
