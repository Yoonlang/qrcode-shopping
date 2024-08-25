import { i18n } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";

import { Language } from "@/const";
import { i18nConfig } from "@/i18n";

export default async function initTranslations(
  locale: Language,
  namespaces: string[],
  i18nInstance: i18n
) {
  i18nInstance.use(initReactI18next);
  i18nInstance.use(
    resourcesToBackend(
      (language: Language, namespace: string) =>
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
