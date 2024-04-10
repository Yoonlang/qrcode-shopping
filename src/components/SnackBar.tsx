import { StyledSnackBar } from "@/styles/components/snack_bar";

function MessageSnackBar({ message }: { message: string }) {
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

export { MessageSnackBar };
