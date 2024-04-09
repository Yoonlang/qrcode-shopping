import { Snackbar, styled } from "@mui/material";

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

export { StyledSnackBar };
