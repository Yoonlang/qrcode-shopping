import styled from "@emotion/styled";
import { Snackbar } from "@mui/material";

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
  return (
    //추후 로직 추가시 수정될 부분은 주석처리
    <StyledSnackBar
      open={true}
      // autoHideDuration={6000}
      // onClose={handleClose}
      message={message}
      // action={action}
    />
  );
};

export { MessageSnackBar };
