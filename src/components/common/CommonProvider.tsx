import GlobalStyle from "@/globalStyles";
import { OverlayProvider } from "@/hooks/useOverlay";
import { TranslationsProvider } from "@/i18n";

const CommonProvider = ({ children, TranslationsProviderProps }) => {
  return (
    <TranslationsProvider {...TranslationsProviderProps}>
      <OverlayProvider>
        <GlobalStyle />
        {children}
      </OverlayProvider>
    </TranslationsProvider>
  );
};

export default CommonProvider;
