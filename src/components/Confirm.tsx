import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

const Confirm = ({
  isConfirmOpen,
  onClose,
  onConfirm,
  content,
  confirmText,
  cancelText,
}: {
  isConfirmOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  content: string;
  confirmText?: string;
  cancelText?: string;
}) => {
  return (
    <Dialog open={isConfirmOpen} onClose={onClose}>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onConfirm}>{confirmText ?? "예"}</Button>
        <Button onClick={onClose}>{cancelText ?? "취소"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
