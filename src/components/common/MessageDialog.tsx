import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { OverlayControl } from "@/const";

interface StyledMessageDialogProps {
  customStyle?: string;
}

const StyledMessageDialog = styled(Dialog, {
  shouldForwardProp: (prop) => !["customStyle"].includes(prop),
})<StyledMessageDialogProps>`
  p {
    ${(props) => props.customStyle};
  }
`;

const MessageDialog = ({
  overlayControl,
  messageList,
  onDialogClose = () => {},
  customStyle = "",
}: {
  overlayControl: OverlayControl;
  messageList: string[];
  onDialogClose?: () => void | Promise<void>;
  customStyle?: string;
}) => {
  const { t } = useTranslation();

  return (
    <StyledMessageDialog
      open={overlayControl.isOpen}
      onClose={async () => {
        await onDialogClose();
        overlayControl.exit();
      }}
      customStyle={customStyle}
    >
      <DialogContent>
        {messageList.map((message, idx) => (
          <DialogContentText key={idx}>{message}</DialogContentText>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async () => {
            await onDialogClose();
            overlayControl.exit();
          }}
          color="primary"
          autoFocus
        >
          {t("Confirm")}
        </Button>
      </DialogActions>
    </StyledMessageDialog>
  );
};

export default MessageDialog;
