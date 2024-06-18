import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const MessageDialog = ({
  isDialogOpen,
  onDialogClose,
  messageList,
}: {
  isDialogOpen: boolean;
  onDialogClose: () => void;
  messageList: string[];
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isDialogOpen} onClose={onDialogClose}>
      <DialogContent>
        {messageList.map((message, idx) => (
          <DialogContentText key={idx}>{message}</DialogContentText>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose} color="primary" autoFocus>
          {t("Confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageDialog;
