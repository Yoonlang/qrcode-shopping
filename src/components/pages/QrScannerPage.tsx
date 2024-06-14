import { Button, Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import QrCode from "@/components/QrScanner/QrCode";
import { MessageSnackBar } from "@/components/SnackBar";

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const QrScannerPage = ({
  scannedItemList,
  setScannedItemList,
  fetchedItemList,
  isSnackBarOpen,
  setIsSnackBarOpen,
  snackBarStatus,
  setSnackBarStatus,
  snackBarStatusMessage,
}: {
  scannedItemList: Object;
  setScannedItemList: Dispatch<SetStateAction<{}>>;
  fetchedItemList: any[] | null;
  isSnackBarOpen: boolean;
  setIsSnackBarOpen: Dispatch<SetStateAction<Object>>;
  snackBarStatus: string;
  setSnackBarStatus: Dispatch<SetStateAction<string>>;
  snackBarStatusMessage: object;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const { t } = useTranslation();

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (Object.keys(scannedItemList).length > 0) {
      setSnackBarStatus(t(snackBarStatusMessage["scanned"]));
      setIsSnackBarOpen(true);
      localStorage.setItem("scannedItems", JSON.stringify(scannedItemList));
    }
  }, [scannedItemList]);

  return (
    <StyledContainer>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogContent>
          <DialogContentText>1. {t("Dialog1")}</DialogContentText>
          <DialogContentText>2. {t("Dialog2")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            {t("Confirm")}
          </Button>
        </DialogActions>
      </Dialog>
      {!isDialogOpen && (
        <>
          <MessageSnackBar
            key={`${Object.keys(scannedItemList).length} ${snackBarStatus}`}
            isOpen={isSnackBarOpen}
            setIsOpen={setIsSnackBarOpen}
            message={snackBarStatus}
          />
          <QrCode
            setScannedItemList={setScannedItemList}
            fetchedItemList={fetchedItemList}
          />
        </>
      )}
    </StyledContainer>
  );
};

export default QrScannerPage;
