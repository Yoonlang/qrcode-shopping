"use client";

import { NextPage } from "next";
import { RecoilRoot } from "recoil";

import CommonProvider from "@/components/common/CommonProvider";
import MessageSnackBar from "@/components/common/MessageSnackBar";
import MainPage from "@/components/pages/MainPage";
import { Language } from "@/const";

interface HomeProps {
  params: {
    locale: Language;
  };
}

const Home: NextPage<HomeProps> = ({ params: { locale } }) => {
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
