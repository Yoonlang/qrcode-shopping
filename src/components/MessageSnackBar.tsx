import styled from "@emotion/styled";
import { Snackbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";

import { snackBarStatusMessage } from "@/components/const";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";

interface StyledSnackBarProps {
  isScanned: boolean;
  scannedFontSize: number;
}

const getFontSize = (lang: string) => {
  if (lang === "zh") {
    return 80;
  }
  if (lang === "en" || lang === "ko") {
    return 50;
  }
  if (lang === "ja") {
    return 50;
  }
  return 0;
};

const StyledSnackBar = styled(Snackbar, {
  shouldForwardProp: (prop) => !["isScanned", "scannedFontSize"].includes(prop),
})<StyledSnackBarProps>`
  display: flex;
  justify-content: center;
  z-index: 1201;

  .MuiSnackbarContent-root {
    ${(props) =>
      props.isScanned
        ? `
        width: 250px;
        height: 250px;
        font-size: ${props.scannedFontSize}px;
        text-align: center;
        `
        : `
        width: 320px;
        min-height: 80px;
        font-size: 24px;
        `}
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;

    display: flex;
    justify-content: center;
  }
`;

const MessageSnackBar = () => {
  const [{ message, isMessageSnackBarOpen }, setMessageSnackBarState] =
    useRecoilState(messageSnackBarState);
  const { t, i18n } = useTranslation();

  return (
    <StyledSnackBar
      isScanned={message === t(snackBarStatusMessage["scanned"])}
      scannedFontSize={getFontSize(i18n.language)}
      open={isMessageSnackBarOpen}
      autoHideDuration={800}
      onClose={() => {
        setMessageSnackBarState({
          message: "",
          isMessageSnackBarOpen: false,
        });
      }}
      message={message}
    />
  );
};

export default MessageSnackBar;
