"use client";

import { createInstance } from "i18next";
import { I18nextProvider } from "react-i18next";

import { initTranslations } from "@/i18n";

export default async function TranslationsProvider({ children, locale }) {
  const i18n = createInstance();
  await initTranslations(locale, ["common"], i18n);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
