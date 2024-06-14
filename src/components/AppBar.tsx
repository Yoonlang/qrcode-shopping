import { AppBar, Badge, IconButton, Popover } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { PRIMARY, PRIMARY_DARK } from "@/components/const";
import Icons from "@/components/Icons";
import Info from "@/components/Info";
import LanguageSelector from "@/components/LanguageSelector";

const StyledTitleAppBar = styled(AppBar)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  width: 100%;
  height: 56px;

  .left,
  .right {
    width: 100px;
  }
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

const StyledIconButton = styled(IconButton)`
  margin: 0;
`;

interface StyledSelectionIconButtonProps {
  selected: boolean;
}

const StyledSelectionIconButton = styled(
  StyledIconButton
)<StyledSelectionIconButtonProps>`
  img {
    opacity: ${(props) => (props.selected ? "1" : "0.5")};
  }
`;

const TitleAppBar = ({ id, hasBack, handleClickBack }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledTitleAppBar>
      <div className="left">
        {hasBack && (
          <StyledIconButton onClick={handleClickBack} edge="start">
            {Icons["back"]}
          </StyledIconButton>
        )}
      </div>
      <AppBarTitleText>{t(titleText[id])}</AppBarTitleText>
      <div className="right">
        <StyledSelectionIconButton
          onClick={handleClick}
          data-anchor="info"
          edge="start"
          selected={anchorEl?.getAttribute("data-anchor") === "info"}
        >
          {Icons["info"]}
        </StyledSelectionIconButton>
        <StyledSelectionIconButton
          onClick={handleClick}
          data-anchor="globe"
          edge="start"
          selected={anchorEl?.getAttribute("data-anchor") === "globe"}
        >
          {Icons["globe"]}
        </StyledSelectionIconButton>
      </div>
      <Popover
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {anchorEl &&
          (anchorEl.getAttribute("data-anchor") === "info" ? (
            <Info />
          ) : (
            <LanguageSelector />
          ))}
      </Popover>
    </StyledTitleAppBar>
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
  handleClick,
  text,
  badgeNum,
}: {
  icon: string;
  handleClick: () => void;
  text: string;
  badgeNum: number | null;
}) => {
  return (
    <StyledBottomAppBar>
      <button onClick={handleClick}>
        <StyledBadge badgeContent={badgeNum === null ? null : badgeNum}>
          {Icons[icon]}
        </StyledBadge>
        <BottomAppBarTitleText>{text}</BottomAppBarTitleText>
      </button>
    </StyledBottomAppBar>
  );
};

export { BottomAppBar, TitleAppBar };
