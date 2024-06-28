import { Button, CircularProgress } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { snackBarStatusMessage } from "@/components/const";
import MessageDialog from "@/components/MessageDialog";
import QrCode from "@/components/QrScanner/QrCode";
import useScannedItemList from "@/hooks/useScannedItemList";
import { fetchedItemListCounter } from "@/recoil/atoms/fetchedItemListState";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const RetryButton = ({ resetErrorBoundary }) => {
  const setCounter = useSetRecoilState(fetchedItemListCounter);

  const updateFetchedItemList = () => {
    setCounter((old) => old + 1);
  };

  return (
    <Button
      color="error"
      variant="contained"
      onClick={() => {
        updateFetchedItemList();
        resetErrorBoundary();
      }}
    >
      retry
    </Button>
  );
};

const fallbackRender = ({ resetErrorBoundary }) => {
  return <RetryButton resetErrorBoundary={resetErrorBoundary} />;
};

const QrScannerPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const { t } = useTranslation();
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);
  const { scannedItemList } = useScannedItemList();

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
        <ErrorBoundary fallbackRender={fallbackRender}>
          <Suspense fallback={<CircularProgress />}>
            <QrCode />
          </Suspense>
        </ErrorBoundary>
      )}
    </StyledContainer>
  );
};

export default QrScannerPage;
