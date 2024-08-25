import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import Icons from "@/components/common/Icons";
import { i18nConfig } from "@/i18n";

const StyledLanguageSelectorBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const StyledLanguageSelectButton = styled(Button)`
  justify-content: space-between;
  color: var(--color-language-selector-primary);
  text-transform: none;
  padding: 6px 12px;

  &:hover {
    backgroundcolor: var(--color-language-selector-secondary);
  }
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const changeLang = (newLocale) => {
    const days = 60;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (currentLocale === i18nConfig.defaultLocale) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <StyledLanguageSelectorBox>
      <StyledLanguageSelectButton onClick={() => changeLang("en")}>
        English
        {i18n.language === "en" && Icons["select"]}
      </StyledLanguageSelectButton>
      <StyledLanguageSelectButton onClick={() => changeLang("zh")}>
        中文
        {i18n.language === "zh" && Icons["select"]}
      </StyledLanguageSelectButton>
      <StyledLanguageSelectButton onClick={() => changeLang("ko")}>
        한국어
        {i18n.language === "ko" && Icons["select"]}
      </StyledLanguageSelectButton>
      <StyledLanguageSelectButton onClick={() => changeLang("ja")}>
        日本語
        {i18n.language === "ja" && Icons["select"]}
      </StyledLanguageSelectButton>
    </StyledLanguageSelectorBox>
  );
};

export default LanguageSelector;
