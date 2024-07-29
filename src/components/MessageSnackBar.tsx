import { Snackbar } from "@mui/material";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";

const StyledSnackBar = styled(Snackbar)`
  display: flex;
  justify-content: center;
  z-index: 1;

  .MuiSnackbarContent-root {
    width: 320px;
    min-height: 80px;
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

  return (
    <StyledSnackBar
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
