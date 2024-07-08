import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";

import Icons from "@/components/Icons";
import i18nConfig from "@/i18nConfig";

const StyledLanguageSelector = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
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

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <StyledLanguageSelector>
      <Button
        sx={{
          justifyContent: "space-between",
          color: "var(--color-language-selector-primary)",
          textTransform: "none",
          padding: "6px 12px",
          "&:hover": {
            backgroundColor: "var(--color-language-selector-primary)",
          },
        }}
        onClick={() => changeLang("en")}
      >
        English
        {i18n.language === "en" && Icons["select"]}
      </Button>
      <Button
        sx={{
          justifyContent: "space-between",
          color: "var(--color-language-selector-primary)",
          padding: "6px 12px",
          "&:hover": {
            backgroundColor: "var(--color-language-selector-primary)",
          },
        }}
        onClick={() => changeLang("zh")}
      >
        中文
        {i18n.language === "zh" && Icons["select"]}
      </Button>
      <Button
        sx={{
          justifyContent: "space-between",
          color: "var(--color-language-selector-primary)",
          padding: "6px 12px",
          "&:hover": {
            backgroundColor: "var(--color-language-selector-primary)",
          },
        }}
        onClick={() => changeLang("ko")}
      >
        한국어
        {i18n.language === "ko" && Icons["select"]}
      </Button>
    </StyledLanguageSelector>
  );
};

export default LanguageSelector;
