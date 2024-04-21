import { BottomAppBar, TitleAppBar } from "@/components/AppBar";
import QrCode from "@/components/QrCode";
import { MessageSnackBar } from "@/components/SnackBar";
import { Dispatch, SetStateAction } from "react";

const QrScannerPage = ({
  toNextPage,
  setScannedItems,
}: {
  toNextPage: Function;
  setScannedItems: Dispatch<SetStateAction<{}>>;
}) => {
  return (
    <div>
      <MessageSnackBar message="Scan QR Code" />
      <TitleAppBar hasBack={false} title="QR Scan" />
      <QrCode setScannedItems={setScannedItems} />
      <BottomAppBar icon="cart" badgeNum={1} toNextPage={toNextPage} />
    </div>
  );
};

export default QrScannerPage;
