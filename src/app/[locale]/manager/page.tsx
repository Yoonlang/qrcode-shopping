"use client";

import initTranslations from "@/app/i18n";
import CommonProvider from "@/components/common/CommonProvider";
import ManagerPage from "@/components/pages/ManagerPage";

const i18nNamespaces = ["common"];

const Manager = async ({ params: { locale } }) => {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <CommonProvider
      TranslationsProviderProps={{
        namespaces: i18nNamespaces,
        locale: locale,
        resources: resources,
      }}
    >
      <ManagerPage />
    </CommonProvider>
  );
};

export default Manager;
