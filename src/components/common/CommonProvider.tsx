import { ReactNode } from "react";

import { Language } from "@/const";
import GlobalStyle from "@/globalStyles";
import { OverlayProvider } from "@/hooks/useOverlay";
import { TranslationsProvider } from "@/i18n";

const CommonProvider = ({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Language;
}) => {
  return (
    <TranslationsProvider locale={locale}>
      <OverlayProvider>
        <GlobalStyle />
        {children}
      </OverlayProvider>
    </TranslationsProvider>
  );
};

export default CommonProvider;
