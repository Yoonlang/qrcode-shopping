import GlobalStyle from "@/globalStyles";
import { OverlayProvider } from "@/hooks/useOverlay";
import { TranslationsProvider } from "@/i18n";

const CommonProvider = ({ children, locale }) => {
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
