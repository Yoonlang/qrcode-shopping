import styled from "styled-components";
import { Snackbar } from "@mui/material";
import { useRecoilState } from "recoil";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";

const StyledSnackBar = styled(Snackbar)`
  display: flex;
  justify-content: center;

  .MuiSnackbarContent-root {
    width: 320px;
    position: fixed;
    top: 94px;
    left: 50%;
    transform: translateX(-50%) !important;

    display: flex;
    justify-content: center;
  }
`;

const MessageSnackBar = () => {
  const [{ message, isOpen }, setMessageSnackBarState] =
    useRecoilState(messageSnackBarState);

  return (
    <StyledSnackBar
      open={isOpen}
      autoHideDuration={3000}
      onClose={() => {
        setMessageSnackBarState({
          message: "",
          isOpen: false,
        });
      }}
      message={message}
    />
  );
};

export default MessageSnackBar;
