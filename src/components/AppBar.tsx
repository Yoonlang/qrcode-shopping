import { AppBar, Badge, IconButton, Popover } from "@mui/material";
import { useFormikContext } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import {
  PRIMARY,
  PRIMARY_DARK,
  snackBarStatusMessage,
} from "@/components/const";
import Icons from "@/components/Icons";
import Info from "@/components/Info";
import LanguageSelector from "@/components/LanguageSelector";
import usePageRouter, { PageName } from "@/hooks/usePageRouter";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";
import { scannedItemListState } from "@/recoil/atoms/scannedItemListState";

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

type PageObject = {
  [key in PageName]: string;
};

const bottomText: PageObject = {
  qrcode: "My Products",
  cart: "Information",
  info: "Submission",
};

const titleText: PageObject = {
  qrcode: "QR code",
  cart: "Cart",
  info: "Info",
};

const bottomAppBarIconList: PageObject = {
  qrcode: "cart",
  cart: "person",
  info: "check",
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
        {!isPageName("qrcode") && (
          <StyledIconButton onClick={goToPreviousPage} edge="start">
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

const BottomAppBar = () => {
  const { t } = useTranslation();
  const { pageName, isPageName, goToNextPage } = usePageRouter();
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);
  const scannedItemList = useRecoilValue(scannedItemListState);
  const { isValid, handleSubmit } = useFormikContext();

  const handleBottomAppBarClick = () => {
    if (isPageName("qrcode")) {
      if (Object.keys(scannedItemList).length === 0) {
        setMessageSnackBarState({
          message: t(snackBarStatusMessage["empty"]),
          isMessageSnackBarOpen: true,
        });
      } else {
        goToNextPage();
      }
    } else if (isPageName("cart")) {
      if (Object.keys(scannedItemList).length === 0) {
        setMessageSnackBarState({
          message: t(snackBarStatusMessage["multipleScan"]),
          isMessageSnackBarOpen: true,
        });
      } else {
        goToNextPage();
        // let isAllSelected = true;
        // for (const key of Object.keys(scannedItems)) {
        //   if (
        //     !selectedInfos[key] ||
        //     Object.keys(selectedInfos[key]).length <= 0
        //   ) {
        //     isAllSelected = false;
        //     break;
        //   }
        // }

        // if (isAllSelected) {
        // console.log(selectedInfos);
        // } else {
        //   setSnackBarStatus(snackBarStatusMessage["option"]);
        //   setSnackBarOpen(true);
        // }
      }
    } else {
      if (isValid) {
        handleSubmit();
      } else {
        setMessageSnackBarState({
          message: t(snackBarStatusMessage["invalid"]),
          isMessageSnackBarOpen: true,
        });
      }
    }
  };

  return (
    <StyledBottomAppBar>
      <button onClick={handleBottomAppBarClick}>
        <StyledBadge
          badgeContent={
            isPageName("qrcode") ? Object.keys(scannedItemList).length : null
          }
        >
          {Icons[bottomAppBarIconList[pageName]]}
        </StyledBadge>
        <BottomAppBarTitleText>{t(bottomText[pageName])}</BottomAppBarTitleText>
      </button>
    </StyledBottomAppBar>
  );
};

export { BottomAppBar, TitleAppBar };
