"use client";

import { RecoilRoot } from "recoil";

import initTranslations from "@/app/i18n";
import MessageSnackBar from "@/components/common/MessageSnackBar";
import TranslationsProvider from "@/components/common/TranslationsProvider";
import MainPage from "@/components/pages/MainPage";
import "@/dayjsConfig";
import GlobalStyle from "@/globalStyles";
import { OverlayProvider } from "@/hooks/useOverlay";

const i18nNamespaces = ["common"];

const Home = async ({ params: { locale } }) => {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <OverlayProvider>
        <RecoilRoot>
          <GlobalStyle />
          <MessageSnackBar />
          <MainPage />
        </RecoilRoot>
      </OverlayProvider>
    </TranslationsProvider>
  );
};

export default Home;
