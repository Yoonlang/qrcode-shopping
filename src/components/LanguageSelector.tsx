import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Icons from "./Icons";

const StyledLanguageSelector = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLang = (lang) => {
    localStorage.setItem("i18nextLng", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <StyledLanguageSelector>
      <Button
        sx={{
          justifyContent: "space-between",
          color: "#000",
          textTransform: "none",
          padding: "6px 12px",
          "&:hover": {
            backgroundColor: "#00000010",
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
          color: "#000",
          border: "#3c3c4336",
          padding: "6px 12px",
          "&:hover": {
            backgroundColor: "#00000010",
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
          color: "#000",
          border: "#3c3c4336",
          padding: "6px 12px",
          "&:hover": {
            backgroundColor: "#00000010",
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
