import { Snackbar } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

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

const MessageSnackBar = ({
  isOpen,
  setIsOpen,
  message,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
}) => {
  return (
    <StyledSnackBar
      open={isOpen}
      autoHideDuration={3000}
      onClose={() => {
        setIsOpen(false);
      }}
      message={message}
    />
  );
};

export { MessageSnackBar };
