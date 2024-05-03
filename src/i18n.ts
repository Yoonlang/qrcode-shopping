import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import ko from "./locales/ko/common.json";
import en from "./locales/en/common.json";
import zh from "./locales/zh/common.json";

const resources = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
  zh: {
    translation: zh,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ["localStorage", "navigator"], // localStorage 우선
    },
    supportedLngs: ["zh", "en", "ko"],
    resources,
    nonExplicitSupportedLngs: true, // en-US도 en으로 처리
    fallbackLng: "zh",
    interpolation: {
      escapeValue: false,
    },
  });
