import styled from "@emotion/styled";
import { Snackbar } from "@mui/material";
import { useRecoilState } from "recoil";

import { snackBarStatusMessage } from "@/components/const";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";
import { useTranslation } from "react-i18next";

interface StyledSnackBarProps {
  isScanned: boolean;
}

const StyledSnackBar = styled(Snackbar, {
  shouldForwardProp: (prop) => !["isScanned"].includes(prop),
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
        `
        : `
        width: 320px;
        min-height: 80px;
        `}
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;

    display: flex;
    justify-content: center;
    font-size: 24px;
  }
`;

const MessageSnackBar = () => {
  const [{ message, isMessageSnackBarOpen }, setMessageSnackBarState] =
    useRecoilState(messageSnackBarState);
  const { t } = useTranslation();

  return (
    <StyledSnackBar
      isScanned={message === t(snackBarStatusMessage["scanned"])}
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
