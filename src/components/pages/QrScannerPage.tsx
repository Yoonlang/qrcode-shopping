import QrCode from "@/components/QrScanner/QrCode";
import { MessageSnackBar } from "@/components/SnackBar";
import { Button, Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const QrScannerPage = ({
  scannedItemList,
  setScannedItemList,
  fetchedItemList,
  snackBarOpen,
  setSnackBarOpen,
  snackBarStatus,
  setSnackBarStatus,
  snackBarStatusMessage,
}: {
  scannedItemList: Object;
  setScannedItemList: Dispatch<SetStateAction<{}>>;
  fetchedItemList: any[] | null;
  snackBarOpen: boolean;
  setSnackBarOpen: Dispatch<SetStateAction<Object>>;
  snackBarStatus: string;
  setSnackBarStatus: Dispatch<SetStateAction<string>>;
  snackBarStatusMessage: object;
}) => {
  const [openDialog, setOpenDialog] = useState(true);
  const { t } = useTranslation();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (Object.keys(scannedItemList).length > 0) {
      setSnackBarStatus(t(snackBarStatusMessage["scanned"]));
      setSnackBarOpen(true);
      localStorage.setItem("scannedItems", JSON.stringify(scannedItemList));
    }
  }, [scannedItemList]);

  return (
    <StyledContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <DialogContentText>1. {t("Dialog1")}</DialogContentText>
          <DialogContentText>2. {t("Dialog2")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            {t("Confirm")}
          </Button>
        </DialogActions>
      </Dialog>
      {!openDialog && (
        <>
          <MessageSnackBar
            key={`${Object.keys(scannedItemList).length} ${snackBarStatus}`}
            isOpen={snackBarOpen}
            setIsOpen={setSnackBarOpen}
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
