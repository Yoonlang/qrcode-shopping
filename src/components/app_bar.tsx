import { AppBarTitleText, BottomAppBarTitleText } from "@/styles/texts";
import { Box, Toolbar } from "@mui/material";
import Icons from "./icons";
import { StyledAppBar, StyledBottomAppBar } from "@/styles/components/app_bar";
import { StyledBadge } from "@/styles/components/badge";

export function TitleAppBar() {
  return (
    <StyledAppBar>
      <Toolbar>
        <AppBarTitleText>QR Scan</AppBarTitleText>
      </Toolbar>
    </StyledAppBar>
  );
}

export function BottomAppBar({
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
