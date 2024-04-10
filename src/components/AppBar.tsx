import { AppBarTitleText, BottomAppBarTitleText } from "@/styles/texts";
import { AppBar, Badge, Box, Toolbar } from "@mui/material";
import Icons from "./Icons";
import styled from "@emotion/styled";
import { black, primary, primary_dark, white } from "@/constants/colors";

////AppBar : 상단바
const StyledAppBar = styled(AppBar)`
  align-items: center;
  background-color: ${white};
`;

function TitleAppBar() {
  return (
    <StyledAppBar>
      <Toolbar>
        <AppBarTitleText>QR Scan</AppBarTitleText>
      </Toolbar>
    </StyledAppBar>
  );
}

////BottomAppBar : 하단 바
const StyledBottomAppBar = styled(AppBar)`
  align-items: center;
  background-color: ${primary_dark};
  top: auto;
  bottom: 0px;
`;

const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    color: ${black};
    background-color: ${primary};
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
  }
`;

function BottomAppBar({
  badgeNum = 0,
  icon,
}: {
  badgeNum?: number;
  icon: string;
}) {
  return (
    <StyledBottomAppBar>
      <Toolbar>
        <StyledBadge badgeContent={badgeNum}>{Icons[icon]}</StyledBadge>
        <Box width={15} />
        <BottomAppBarTitleText>장바구니</BottomAppBarTitleText>
      </Toolbar>
    </StyledBottomAppBar>
  );
}

export { TitleAppBar, BottomAppBar };
