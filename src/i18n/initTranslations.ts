import { i18n } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";

import { Language } from "@/const";
import { i18nConfig } from "@/i18n";
import enCommon from "@/locales/en/common.json";
import jaCommon from "@/locales/ja/common.json";
import koCommon from "@/locales/ko/common.json";
import zhCommon from "@/locales/zh/common.json";

const resourceList = {
  en: { common: enCommon },
  ja: { common: jaCommon },
  ko: { common: koCommon },
  zh: { common: zhCommon },
};

const initTranslations = async (
  locale: Language,
  namespaces: string[],
  i18nInstance: i18n
) => {
  i18nInstance.use(initReactI18next);
  await i18nInstance.init({
    resources: resourceList,
    lng: locale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
  });
};

export default initTranslations;
