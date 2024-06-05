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
        <DialogContent>
          <DialogContentText>
            <p>1. 选好你想要的面料 识别彩色卡上的二维码后 会自动放入购物车</p>
            <p>
              2. 选好您想要的产品后 请按购物车按钮 输入发货信息 最后点击提交
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            确认
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
