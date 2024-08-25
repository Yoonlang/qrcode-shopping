"use client";

import { RecoilRoot } from "recoil";

import initTranslations from "@/app/i18n";
import CommonProvider from "@/components/common/CommonProvider";
import MessageSnackBar from "@/components/common/MessageSnackBar";
import MainPage from "@/components/pages/MainPage";
import "@/dayjsConfig";

const i18nNamespaces = ["common"];

const Home = async ({ params: { locale } }) => {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <CommonProvider
      TranslationsProviderProps={{
        namespaces: i18nNamespaces,
        locale: locale,
        resources: resources,
      }}
    >
      <RecoilRoot>
        <MessageSnackBar />
        <MainPage />
      </RecoilRoot>
    </CommonProvider>
  );
};

export default Home;
