import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const MessageDialog = ({
  dialogOpen,
  onDialogClose,
  messageList,
}: {
  dialogOpen: boolean;
  onDialogClose: () => void;
  messageList: string[];
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={dialogOpen} onClose={onDialogClose}>
      <DialogContent>
        {messageList.map((message, idx) => (
          <DialogContentText key={idx}>{t(message)}</DialogContentText>
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
