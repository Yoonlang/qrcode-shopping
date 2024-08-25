"use client";

import { RecoilRoot } from "recoil";

import CommonProvider from "@/components/common/CommonProvider";
import MessageSnackBar from "@/components/common/MessageSnackBar";
import MainPage from "@/components/pages/MainPage";
import "@/dayjsConfig";

const Home = ({ params: { locale } }) => {
  return (
    <CommonProvider locale={locale}>
      <RecoilRoot>
        <MessageSnackBar />
        <MainPage />
      </RecoilRoot>
    </CommonProvider>
  );
};

export default Home;
