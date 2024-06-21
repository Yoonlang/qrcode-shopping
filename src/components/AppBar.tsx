import { AppBar, Badge, IconButton, Popover } from "@mui/material";
import { FormikProps } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import {
  PRIMARY,
  PRIMARY_DARK,
  bottomText,
  iconList,
  pageIdList,
  snackBarStatusMessage,
} from "@/components/const";
import Icons from "@/components/Icons";
import Info from "@/components/Info";
import LanguageSelector from "@/components/LanguageSelector";
import usePageRouter from "@/hooks/usePageRouter";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";
import { pageIdxState } from "@/recoil/atoms/pageIdxState";
import { scannedItemState } from "@/recoil/atoms/scannedItemState";

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

const TitleAppBar = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const pageIdx = useRecoilValue(pageIdxState);
  const { goToPreviousPage } = usePageRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledTitleAppBar>
      <div className="left">
        {pageIdx !== 0 && (
          <StyledIconButton onClick={goToPreviousPage} edge="start">
            {Icons["back"]}
          </StyledIconButton>
        )}
      </div>
      <AppBarTitleText>{t(titleText[pageIdList[pageIdx]])}</AppBarTitleText>
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

const BottomAppBar = ({ formik }: { formik: FormikProps<any> }) => {
  const { t } = useTranslation();
  const [pageIdx, setPageIdx] = useRecoilState(pageIdxState);
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);
  const scannedItemList = useRecoilValue(scannedItemState);

  const handleBottomAppBarClick = () => {
    if (pageIdx === 0) {
      if (Object.keys(scannedItemList).length === 0) {
        setMessageSnackBarState({
          message: t(snackBarStatusMessage["empty"]),
          isMessageSnackBarOpen: true,
        });
      } else {
        setPageIdx((pageIdx + 1) % 3);
      }
    } else if (pageIdx === 1) {
      if (Object.keys(scannedItemList).length === 0) {
        setMessageSnackBarState({
          message: t(snackBarStatusMessage["multipleScan"]),
          isMessageSnackBarOpen: true,
        });
      } else {
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
        setPageIdx((pageIdx + 1) % 3);
        // console.log(selectedInfos);
        // } else {
        //   setSnackBarStatus(snackBarStatusMessage["option"]);
        //   setSnackBarOpen(true);
        // }
      }
    } else {
      if (formik.isValid) {
        formik.handleSubmit();
        localStorage.removeItem("scannedItems");
        localStorage.removeItem("selectedInfos");
        localStorage.removeItem("form");
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
            pageIdx === 0 ? Object.keys(scannedItemList).length : null
          }
        >
          {Icons[iconList[pageIdx]]}
        </StyledBadge>
        <BottomAppBarTitleText>
          {t(bottomText[pageIdList[pageIdx]])}
        </BottomAppBarTitleText>
      </button>
    </StyledBottomAppBar>
  );
};

export { BottomAppBar, TitleAppBar };
