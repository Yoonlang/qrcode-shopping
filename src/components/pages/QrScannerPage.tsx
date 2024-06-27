import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { snackBarStatusMessage } from "@/components/const";
import MessageDialog from "@/components/MessageDialog";
import QrCode from "@/components/QrScanner/QrCode";
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
  const scannedItemList = useRecoilValue(scannedItemListState);

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
        <Suspense fallback={<></>}>
          <QrCode />
        </Suspense>
      )}
    </StyledContainer>
  );
};

export default QrScannerPage;
