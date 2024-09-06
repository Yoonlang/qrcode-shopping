"use client";

import { createInstance, i18n } from "i18next";
import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

import { Language } from "@/const";
import { initTranslations } from "@/i18n";

const TranslationsProvider = ({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Language;
}) => {
  const [i18n, setI18n] = useState<i18n | null>(null);

  useEffect(() => {
    const initI18n = async () => {
      const i18nInstance = createInstance();
      await initTranslations(locale, ["common"], i18nInstance);
      setI18n(i18nInstance);
    };

    void initI18n();
  }, [locale]);

  if (!i18n) return <></>;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationsProvider;
