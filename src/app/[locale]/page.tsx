"use client";

import { NextPage } from "next";
import dynamic from "next/dynamic";
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

const getFontComponent = (locale: Language) => {
  switch (locale) {
    case "zh":
      return dynamic(() => import("@/components/fonts/NotoSansSc"));
    case "ja":
      return dynamic(() => import("@/components/fonts/NotoSansJp"));
    default:
      return dynamic(() => import("@/components/fonts/NotoSans"));
  }
};

const Home: NextPage<HomeProps> = ({ params: { locale } }) => {
  const Font = getFontComponent(locale);

  return (
    <CommonProvider locale={locale}>
      <Font />
      <RecoilRoot>
        <MessageSnackBar />
        <MainPage />
      </RecoilRoot>
    </CommonProvider>
  );
};

export default Home;
