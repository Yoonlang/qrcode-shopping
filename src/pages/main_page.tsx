import { BottomAppBar, TitleAppBar } from "@/components/app_bar";
import { Camera } from "@/components/camera";
import MessageSnackBar from "@/components/snack_bar";
import { MainPageLayout } from "@/styles/layouts";

export default function MainPage({ toNextPage }: { toNextPage: Function }) {
  return (
    <MainPageLayout>
      <MessageSnackBar message="Scan QR Code" />
      <TitleAppBar />
      <Camera />
      <BottomAppBar icon="cart" badgeNum={5} />
    </MainPageLayout>
  );
}
