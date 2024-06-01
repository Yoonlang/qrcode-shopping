import QrCode from "@/components/QrCode";
import { MessageSnackBar } from "@/components/SnackBar";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const QrScannerPage = ({
  scannedItems,
  setScannedItems,
  fetchedItems,
  snackBarOpen,
  setSnackBarOpen,
  snackBarStatus,
  setSnackBarStatus,
  snackBarStatusMessage,
}: {
  scannedItems: Object;
  setScannedItems: Dispatch<SetStateAction<{}>>;
  fetchedItems: any[] | null;
  snackBarOpen: boolean;
  setSnackBarOpen: Dispatch<SetStateAction<Object>>;
  snackBarStatus: string;
  setSnackBarStatus: Dispatch<SetStateAction<string>>;
  snackBarStatusMessage: object;
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (Object.keys(scannedItems).length > 0) {
      setSnackBarStatus(t(snackBarStatusMessage["scanned"]));
      setSnackBarOpen(true);
    }
  }, [scannedItems]);

  return (
    <StyledContainer>
      <MessageSnackBar
        key={`${Object.keys(scannedItems).length} ${snackBarStatus}`}
        isOpen={snackBarOpen}
        setIsOpen={setSnackBarOpen}
        message={snackBarStatus}
      />
      <QrCode setScannedItems={setScannedItems} fetchedItems={fetchedItems} />
    </StyledContainer>
  );
};

export default QrScannerPage;
