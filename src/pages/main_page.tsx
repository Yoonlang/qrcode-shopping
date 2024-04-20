import { BottomAppBar, TitleAppBar } from "@/components/AppBar";
// import Camera from "@/components/Camera";
import { MessageSnackBar } from "@/components/SnackBar";

const MainPage = ({ toNextPage }: { toNextPage: Function }) => {
  return (
    <div>
      {/* <MessageSnackBar message="Scan QR Code" /> */}
      <TitleAppBar />
      {/* <Camera /> */}
      <BottomAppBar icon="cart" badgeNum={1} toNextPage={toNextPage} />
    </div>
  );
};

export default MainPage;
