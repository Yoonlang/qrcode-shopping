import styled from "@emotion/styled";
import { AppBar, Badge, IconButton, Popover } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import Icons from "@/components/common/Icons";
import Info from "@/components/user/Info";
import LanguageSelector from "@/components/user/LanguageSelector";
import usePageRouter, { PageName } from "@/hooks/user/usePageRouter";
import useScannedItemList from "@/hooks/user/useScannedItemList";
import { pageActionState } from "@/recoil/user/atoms/pageActionState";

const StyledTitleAppBar = styled(AppBar)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-white);
  width: 100%;
  height: 56px;

  .left,
  .right {
    width: 100px;
  }
`;

const AppBarTitleText = styled.div`
  color: var(--color-black);
  font-size: 19px;
  font-weight: 700;
`;

type PageObject = {
  [key in PageName]: string;
};

const bottomText: PageObject = {
  qrcode: "My Products",
  cart: "Information",
  info: "Input Complete",
  wechat: "Submission",
  complete: "Go to Main Page",
};

const titleText: PageObject = {
  qrcode: "QR code",
  cart: "Cart",
  info: "Info",
  wechat: "添加微信好友",
  complete: "Result",
};

const bottomAppBarIconList: PageObject = {
  qrcode: "cart",
  cart: "person",
  info: "check",
  wechat: "",
  complete: "",
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

const TitleAppBar = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { pageName, isPageName, goToPreviousPage } = usePageRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledTitleAppBar>
      <div className="left">
        {!isPageName("qrcode") &&
          !isPageName("complete") &&
          !isPageName("wechat") && (
            <StyledIconButton onClick={() => goToPreviousPage()} edge="start">
              {Icons["back"]}
            </StyledIconButton>
          )}
      </div>
      <AppBarTitleText>{t(titleText[pageName])}</AppBarTitleText>
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
  background-color: var(--color-app-bar-primary);
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
    color: var(--color-black);
    background-color: var(--color-badge-primary);
    box-shadow: 0 2px 2px 0 var(--color-badge-secondary);
  }
`;

const BottomAppBarTitleText = styled.div`
  color: var(--color-white);
  font-size: 18px;
  font-weight: 700;
`;

const BottomAppBar = () => {
  const { t } = useTranslation();
  const { pageName, isPageName } = usePageRouter();
  const { scannedItemList } = useScannedItemList();
  const pageAction = useRecoilValue(pageActionState);

  const handleBottomAppBarClick = () => {
    pageAction();
  };

  return (
    <StyledBottomAppBar>
      <button onClick={handleBottomAppBarClick}>
        {!isPageName("complete") && !isPageName("wechat") && (
          <StyledBadge
            badgeContent={
              isPageName("qrcode") ? Object.keys(scannedItemList).length : null
            }
          >
            {Icons[bottomAppBarIconList[pageName]]}
          </StyledBadge>
        )}
        <BottomAppBarTitleText>{t(bottomText[pageName])}</BottomAppBarTitleText>
      </button>
    </StyledBottomAppBar>
  );
};

export { BottomAppBar, TitleAppBar };
