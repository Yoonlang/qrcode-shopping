import QrCode from "@/components/QrCode";
import { MessageSnackBar } from "@/components/SnackBar";
import { Dispatch, SetStateAction } from "react";

const QrScannerPage = ({
  setScannedItems,
  fetchedItems,
}: {
  setScannedItems: Dispatch<SetStateAction<{}>>;
  fetchedItems: any[] | null;
}) => {
  return (
    <div>
      <MessageSnackBar message="Scan QR Code" />
      <QrCode setScannedItems={setScannedItems} fetchedItems={fetchedItems} />
    </div>
  );
};

export default QrScannerPage;
