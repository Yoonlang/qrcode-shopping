import { BottomAppBar, TitleAppBar } from "@/components/AppBar";
import Camera from "@/components/Camera";
import { MessageSnackBar } from "@/components/SnackBar";
import { MainPageLayout } from "@/styles/layouts";

const MainPage = ({ toNextPage }: { toNextPage: Function }) => {
  return (
    <MainPageLayout>
      <MessageSnackBar message="Scan QR Code" />
      <TitleAppBar />
      <Camera />
      <BottomAppBar icon="cart" badgeNum={5} />
    </MainPageLayout>
  );
};

export default MainPage;
