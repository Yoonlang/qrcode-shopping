import QrCode from "@/components/QrScanner/QrCode";
import { messageSnackBarState } from "@/recoil/atoms/messageSnackBarState";
import { Button, Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const QrScannerPage = ({
  scannedItemList,
  setScannedItemList,
  fetchedItemList,
  snackBarStatusMessage,
}: {
  scannedItemList: Object;
  setScannedItemList: Dispatch<SetStateAction<{}>>;
  fetchedItemList: any[] | null;
  snackBarStatusMessage: object;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const { t } = useTranslation();
  const setMessageSnackBarState = useSetRecoilState(messageSnackBarState);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (Object.keys(scannedItemList).length > 0) {
      setMessageSnackBarState({
        message: t(snackBarStatusMessage["scanned"]),
        isOpen: true,
      });
      localStorage.setItem("scannedItems", JSON.stringify(scannedItemList));
    } else {
      setMessageSnackBarState({
        message: t(snackBarStatusMessage["default"]),
        isOpen: true,
      });
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
        <QrCode
          setScannedItemList={setScannedItemList}
          fetchedItemList={fetchedItemList}
        />
      )}
    </StyledContainer>
  );
};

export default QrScannerPage;
