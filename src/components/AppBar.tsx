import { AppBarTitleText, BottomAppBarTitleText } from "@/styles/texts";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Icons from "./Icons";
import styled from "@emotion/styled";
import { BLACK, PRIMARY, PRIMARY_DARK, WHITE } from "@/constants/colors";

////AppBar : 상단바
const StyledAppBar = styled(AppBar)`
  background-color: ${WHITE};
  position: sticky;
`;

const TitleAppBar = ({ back, title }: { back: boolean; title: string }) => {
  return (
    <StyledAppBar>
      <Toolbar>
        {back && <IconButton edge="start">{Icons["back"]}</IconButton>}
        <AppBarTitleText>{title}</AppBarTitleText>
      </Toolbar>
    </StyledAppBar>
  );
};

////BottomAppBar : 하단 바
const StyledBottomAppBar = styled(AppBar)`
  align-items: center;
  background-color: ${PRIMARY_DARK};
  top: auto;
  bottom: 0px;
`;

const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    color: ${BLACK};
    background-color: ${PRIMARY};
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
  }
`;

const BottomAppBar = ({
  badgeNum = 0,
  icon,
}: {
  badgeNum?: number;
  icon: string;
}) => {
  return (
    <StyledBottomAppBar>
      <Toolbar>
        <StyledBadge badgeContent={badgeNum}>{Icons[icon]}</StyledBadge>
        <Box width={15} />
        <BottomAppBarTitleText>장바구니</BottomAppBarTitleText>
      </Toolbar>
    </StyledBottomAppBar>
  );
};

export { TitleAppBar, BottomAppBar };
