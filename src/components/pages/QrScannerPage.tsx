import QrCode from "@/components/QrCode";
import { MessageSnackBar } from "@/components/SnackBar";
import { Dispatch, SetStateAction } from "react";

const QrScannerPage = ({
  scannedItems,
  setScannedItems,
  fetchedItems,
  snackBarStatus,
}: {
  scannedItems: Object;
  setScannedItems: Dispatch<SetStateAction<{}>>;
  fetchedItems: any[] | null;
  snackBarStatus: string;
}) => {
  return (
    <div>
      <MessageSnackBar
        key={`${Object.keys(scannedItems).length} ${snackBarStatus}`}
        message={snackBarStatus}
      />
      <QrCode setScannedItems={setScannedItems} fetchedItems={fetchedItems} />
    </div>
  );
};

export default QrScannerPage;
