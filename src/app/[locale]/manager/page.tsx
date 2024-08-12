"use client";

import { OverlayProvider } from "@toss/use-overlay";

import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/common/TranslationsProvider";
import ManagerPage from "@/components/pages/ManagerPage";
import GlobalStyle from "@/globalStyles";

const i18nNamespaces = ["common"];

const Manager = async ({ params: { locale } }) => {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <OverlayProvider>
        <GlobalStyle />
        <ManagerPage />
      </OverlayProvider>
    </TranslationsProvider>
  );
};

export default Manager;
