import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

import { OverlayControl } from "@/const";

const Confirm = ({
  overlayControl,
  content,
  onClose = () => {},
  onConfirm = () => {},
  confirmText,
  cancelText,
}: {
  overlayControl: OverlayControl;
  content: string;
  onClose?: () => void | Promise<void>;
  onConfirm?: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
}) => {
  return (
    <Dialog
      open={overlayControl.isOpen}
      onClose={async () => {
        await onClose();
        overlayControl.exit();
      }}
    >
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button
          onClick={async () => {
            await onConfirm();
            overlayControl.exit();
          }}
        >
          {confirmText ?? "예"}
        </Button>
        <Button
          onClick={async () => {
            await onClose();
            overlayControl.exit();
          }}
        >
          {cancelText ?? "취소"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
