"use client";

import { useState } from "react";
import MainPage from "../../public/pages/main_page";
import CartPage from "../../public/pages/cart_page";
import InfoPage from "../../public/pages/info_page";

export default function Home() {
  const [pageIdx, setPageIdx] = useState(0);

  return (
    <div>
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
