import { Language } from "@/const";

const i18nConfig: {
  locales: Language[];
  defaultLocale: Language;
} = {
  locales: ["zh", "en", "ko", "ja"],
  defaultLocale: "zh",
};

export default i18nConfig;
