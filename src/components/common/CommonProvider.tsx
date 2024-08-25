import TranslationsProvider from "@/components/common/TranslationsProvider";
import "@/dayjsConfig";
import GlobalStyle from "@/globalStyles";
import { OverlayProvider } from "@/hooks/useOverlay";

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
