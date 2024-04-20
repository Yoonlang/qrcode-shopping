import { AppBar, Badge } from "@mui/material";
import Icons from "@/components/Icons";
import styled from "styled-components";
import { PRIMARY, PRIMARY_DARK } from "@/consts/colors";

const StyledAppBar = styled(AppBar)`
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 100%;
  height: 56px;
`;

const AppBarTitleText = styled.div`
  color: #000;
  font-size: 19px;
  font-weight: 700;
`;

const titleText = {
  main: "QR code",
  cart: "Cart",
  info: "Info",
};

const TitleAppBar = ({ id }) => {
  return (
    <StyledAppBar>
      <AppBarTitleText>{titleText[id]}</AppBarTitleText>
    </StyledAppBar>
  );
};

const StyledBottomAppBar = styled(AppBar)`
  background-color: ${PRIMARY_DARK};
  top: calc(100% - 65px);

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 65px;
    background: none;
    border: none;
    padding: 0;
    gap: 15px;
    cursor: pointer;
  }
`;

const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    color: #000;
    background-color: ${PRIMARY};
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
  }
`;

const BottomAppBarTitleText = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

const BottomAppBar = ({
  icon,
  toNextPage,
  text,
  badgeNum,
}: {
  icon: string;
  toNextPage: () => void;
  text: string;
  badgeNum: number | null;
}) => {
  return (
    <StyledBottomAppBar>
      <button onClick={toNextPage}>
        <StyledBadge badgeContent={badgeNum === null ? null : badgeNum}>
          {Icons[icon]}
        </StyledBadge>
        <BottomAppBarTitleText>{text}</BottomAppBarTitleText>
      </button>
    </StyledBottomAppBar>
  );
};

export { TitleAppBar, BottomAppBar };
