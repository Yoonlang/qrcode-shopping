import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledMessageDialog = styled(Dialog)<{ customstyle?: string }>`
  p {
    ${(props) => props.customstyle};
  }
`;

const MessageDialog = ({
  isDialogOpen,
  onDialogClose,
  messageList,
  customStyle = "",
}: {
  isDialogOpen: boolean;
  onDialogClose: () => void;
  messageList: string[];
  customStyle?: string;
}) => {
  const { t } = useTranslation();

  return (
    <StyledMessageDialog
      open={isDialogOpen}
      onClose={onDialogClose}
      customstyle={customStyle}
    >
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
    </StyledMessageDialog>
  );
};

export default MessageDialog;
