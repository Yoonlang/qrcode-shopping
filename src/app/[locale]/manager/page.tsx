"use client";

import { OverlayProvider } from "@toss/use-overlay";

import ManagerPage from "@/components/pages/ManagerPage";
import GlobalStyle from "@/styles/global";

const Manager = () => {
  return (
    <OverlayProvider>
      <GlobalStyle />
      <ManagerPage />
    </OverlayProvider>
  );
};

export default Manager;
