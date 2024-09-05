import { Noto_Sans } from "next/font/google";
import { useEffect } from "react";

const notoSans = Noto_Sans({
  subsets: ["latin"],
});

export default function NotoSans() {
  useEffect(() => {
    document.body.classList.add(notoSans.className);

    return () => {
      document.body.classList.remove(notoSans.className);
    };
  }, []);

  return <></>;
}
