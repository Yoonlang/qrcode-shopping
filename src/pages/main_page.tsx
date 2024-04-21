import QrCode from "@/components/QrCode";
import { MessageSnackBar } from "@/components/SnackBar";
import { Dispatch, SetStateAction } from "react";

const MainPage = ({
  setScannedItems,
}: {
  setScannedItems: Dispatch<SetStateAction<{}>>;
}) => {
  return (
    <div>
      <MessageSnackBar message="Scan QR Code" />
      <QrCode setScannedItems={setScannedItems} />
    </div>
  );
};

export default MainPage;
