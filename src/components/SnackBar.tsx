import styled from "styled-components";
import { Snackbar } from "@mui/material";
import { useState } from "react";

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

const MessageSnackBar = ({ message }: { message: string }) => {
  const [isOpen, setIsOpen] = useState(true);

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
