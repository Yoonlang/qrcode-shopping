import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface StyledMessageDialogProps {
  customStyle?: string;
}

const StyledMessageDialog = styled(Dialog).withConfig({
  shouldForwardProp: (prop) => !["customStyle"].includes(prop),
})<StyledMessageDialogProps>`
  p {
    ${(props) => props.customStyle};
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
      customStyle={customStyle}
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
