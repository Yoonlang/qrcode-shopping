"use client";

import CartPage from "@/pages/cart_page";
import InfoPage from "@/pages/info_page";
import MainPage from "@/pages/main_page";
import GlobalStyle from "@/styles/global";
import { useState } from "react";

export default function Home() {
  const [pageIdx, setPageIdx] = useState(0);

  return (
    <div>
      <GlobalStyle />
      {
        [
          <MainPage
            key={0}
            toNextPage={() => {
              setPageIdx(1);
            }}
          />,
          <CartPage
            key={1}
            toNextPage={() => {
              setPageIdx(2);
            }}
          />,
          <InfoPage
            key={2}
            toNextPage={() => {
              setPageIdx(0);
            }}
          />,
        ][pageIdx]
      }
    </div>
  );
}
