import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { snackBarStatusMessage } from "@/components/const";
import MessageDialog from "@/components/MessageDialog";
import QrCode from "@/components/QrScanner/QrCode";
import { fetchedItemListState } from "@/recoil/atoms/fetchedItemListState";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";
import { scannedItemListState } from "@/recoil/atoms/scannedItemListState";

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const QrScannerPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const { t } = useTranslation();
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);
  const [scannedItemList, setScannedItemList] =
    useRecoilState(scannedItemListState);
  const fetchedItemList = useRecoilValue(fetchedItemListState);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (Object.keys(scannedItemList).length > 0) {
      setMessageSnackBarState({
        message: t(snackBarStatusMessage["scanned"]),
        isMessageSnackBarOpen: true,
      });
    } else {
      setMessageSnackBarState({
        message: t(snackBarStatusMessage["default"]),
        isMessageSnackBarOpen: true,
      });
    }
  }, [scannedItemList]);

  return (
    <StyledContainer>
      <MessageDialog
        isDialogOpen={isDialogOpen}
        onDialogClose={handleDialogClose}
        messageList={[t("Dialog1"), t("Dialog2")]}
      />
      {!isDialogOpen && (
        <QrCode
          setScannedItemList={setScannedItemList}
          fetchedItemList={fetchedItemList}
        />
      )}
    </StyledContainer>
  );
};

export default QrScannerPage;
