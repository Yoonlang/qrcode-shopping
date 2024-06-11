"use client";

import MainPage from "@/components/pages/MainPage";
import GlobalStyle from "@/styles/global";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import { RecoilRoot } from "recoil";
import MessageSnackBar from "@/components/MessageSnackBar";

const i18nNamespaces = ["common"];

const Home = async ({ params: { locale } }) => {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <RecoilRoot>
        <GlobalStyle />
        <MessageSnackBar />
        <MainPage />
      </RecoilRoot>
    </TranslationsProvider>
  );
};

export default Home;
