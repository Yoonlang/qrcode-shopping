import { StyledSnackBar } from "@/styles/components/snack_bar";

export default function MessageSnackBar({ message }: { message: string }) {
  return (
    <StyledSnackBar
      open={true}
      // autoHideDuration={6000}
      // onClose={handleClose}
      message={message}
      // action={action}
    />
  );
}
