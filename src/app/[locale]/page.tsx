"use client";

import MainPage from "@/components/pages/MainPage";
import TranslationsProvider from "@/components/TranslationsProvider";
import GlobalStyle from "@/styles/global";

import initTranslations from "../i18n";

const i18nNamespaces = ["common"];

const Home = async ({ params: { locale } }) => {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <GlobalStyle />
      <MainPage />
    </TranslationsProvider>
  );
};

export default Home;
