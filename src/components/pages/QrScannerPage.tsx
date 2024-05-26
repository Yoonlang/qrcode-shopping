import QrCode from "@/components/QrCode";
import { MessageSnackBar } from "@/components/SnackBar";
import { Dispatch, SetStateAction } from "react";

const QrScannerPage = ({
  scannedItems,
  setScannedItems,
  fetchedItems,
  snackBarOpen,
  setSnackBarOpen,
  snackBarStatus,
}: {
  scannedItems: Object;
  setScannedItems: Dispatch<SetStateAction<{}>>;
  fetchedItems: any[] | null;
  snackBarOpen: boolean;
  setSnackBarOpen: Dispatch<SetStateAction<Object>>;
  snackBarStatus: string;
}) => {
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
