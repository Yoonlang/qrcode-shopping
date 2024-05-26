import QrCode from "@/components/QrCode";
import { MessageSnackBar } from "@/components/SnackBar";
import { Dispatch, SetStateAction, useEffect } from "react";

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
  useEffect(() => {
    if (Object.keys(scannedItems).length > 0) {
      setSnackBarStatus(snackBarStatusMessage["scanned"]);
      setSnackBarOpen(true);
    }
  }, [scannedItems]);

  return (
    <div>
      <MessageSnackBar
        key={`${Object.keys(scannedItems).length} ${snackBarStatus}`}
        isOpen={snackBarOpen}
        setIsOpen={setSnackBarOpen}
        message={snackBarStatus}
      />
      <QrCode setScannedItems={setScannedItems} fetchedItems={fetchedItems} />
    </div>
  );
};

export default QrScannerPage;
