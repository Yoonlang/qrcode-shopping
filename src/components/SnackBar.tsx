import styled from "@emotion/styled";
import { Snackbar } from "@mui/material";

const StyledSnackBar = styled(Snackbar)`
  display: flex;
  justify-content: center;

  .MuiSnackbarContent-root {
    width: 320px;

    position: fixed;
    top: 94px;

    display: flex;
    justify-content: center;
  }
`;

function MessageSnackBar({ message }: { message: string }) {
  return (
    <StyledSnackBar
      open={true}
      // autoHideDuration={6000}
      // onClose={handleClose}
      message={message}
      // action={action}
    />
  );
}

export { MessageSnackBar };
