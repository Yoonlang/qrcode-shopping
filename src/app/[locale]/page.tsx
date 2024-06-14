"use client";

import { RecoilRoot } from "recoil";

import initTranslations from "@/app/i18n";
import MessageSnackBar from "@/components/MessageSnackBar";
import TranslationsProvider from "@/components/TranslationsProvider";
import MainPage from "@/components/pages/MainPage";
import GlobalStyle from "@/styles/global";

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
