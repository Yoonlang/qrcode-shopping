import QrCode from "@/components/QrCode";
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
  const [openDialog, setOpenDialog] = useState(true);
  const { t } = useTranslation();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (Object.keys(scannedItems).length > 0) {
      setSnackBarStatus(t(snackBarStatusMessage["scanned"]));
      setSnackBarOpen(true);
    }
  }, [scannedItems]);

  return (
    <StyledContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {!openDialog && (
        <>
          <MessageSnackBar
            key={`${Object.keys(scannedItems).length} ${snackBarStatus}`}
            isOpen={snackBarOpen}
            setIsOpen={setSnackBarOpen}
            message={snackBarStatus}
          />
          <QrCode
            setScannedItems={setScannedItems}
            fetchedItems={fetchedItems}
          />
        </>
      )}
    </StyledContainer>
  );
};

export default QrScannerPage;
