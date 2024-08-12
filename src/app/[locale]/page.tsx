"use client";

import { OverlayProvider } from "@toss/use-overlay";
import { FormikProvider } from "formik";
import { RecoilRoot } from "recoil";

import initTranslations from "@/app/i18n";
import MessageSnackBar from "@/components/common/MessageSnackBar";
import TranslationsProvider from "@/components/common/TranslationsProvider";
import MainPage from "@/components/pages/MainPage";
import "@/dayjsConfig";
import GlobalStyle from "@/globalStyles";
import useInitialFormikValues from "@/hooks/user/useInitialFormikValues";

const i18nNamespaces = ["common"];

const FormikContainer = () => {
  const formik = useInitialFormikValues();

  return (
    <FormikProvider value={formik}>
      <MainPage />
    </FormikProvider>
  );
};

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
          <FormikContainer />
        </RecoilRoot>
      </OverlayProvider>
    </TranslationsProvider>
  );
};

export default Home;
