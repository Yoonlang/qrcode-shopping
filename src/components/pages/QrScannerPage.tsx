import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";

import MessageDialog from "@/components/common/MessageDialog";
import { snackBarStatusMessage } from "@/components/const";
import QrCode from "@/components/user/qrScanner/QrCode";
import RetryButton from "@/components/user/RetryButton";
import usePageRouter from "@/hooks/user/usePageRouter";
import useScannedItemList from "@/hooks/user/useScannedItemList";
import useSelectedInfoList from "@/hooks/user/useSelectedInfoList";
import { messageSnackBarState } from "@/recoil/user/atoms/messageSnackBarState";
import { pageActionState } from "@/recoil/user/atoms/pageActionState";

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const QrScannerPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const { t } = useTranslation();
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);
  const { scannedItemList } = useScannedItemList();
  const { goToNextPage } = usePageRouter();
  const setPageAction = useSetRecoilState(pageActionState);
  const { selectedInfoList } = useSelectedInfoList();

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const action = () => {
      if (Object.keys(scannedItemList).length === 0) {
        setMessageSnackBarState({
          message: t(snackBarStatusMessage["empty"]),
          isMessageSnackBarOpen: true,
        });
      } else {
        goToNextPage();
      }
    };

    setPageAction(() => action);
  }, [scannedItemList]);

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
  }, [scannedItemList, setMessageSnackBarState, t]);

  return (
    <StyledContainer>
      <MessageDialog
        isDialogOpen={isDialogOpen}
        onDialogClose={handleDialogClose}
        messageList={[t("Dialog1"), t("Dialog2")]}
      />
      {!isDialogOpen && (
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <RetryButton resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <Suspense fallback={<CircularProgress />}>
            <QrCode />
          </Suspense>
        </ErrorBoundary>
      )}
    </StyledContainer>
  );
};

export default QrScannerPage;
