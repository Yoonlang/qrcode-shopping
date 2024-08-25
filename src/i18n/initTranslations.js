import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";

import { i18nConfig } from "@/i18n";

export default async function initTranslations(
  locale,
  namespaces,
  i18nInstance
) {
  i18nInstance.use(initReactI18next);
  i18nInstance.use(
    resourcesToBackend((language, namespace) =>
      import(`@/locales/${language}/${namespace}.json`)
    )
  );

  await i18nInstance.init({
    lng: locale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
  });
}
