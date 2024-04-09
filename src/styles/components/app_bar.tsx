import { primary_dark, white } from "@/constants/colors";
import { AppBar, styled } from "@mui/material";

const StyledAppBar = styled(AppBar)`
  align-items: center;
  background-color: ${white};
`;

const StyledBottomAppBar = styled(AppBar)`
  align-items: center;
  background-color: ${primary_dark};
  top: auto;
  bottom: 0px;
`;

export { StyledAppBar, StyledBottomAppBar };
