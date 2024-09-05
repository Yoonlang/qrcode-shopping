import { Noto_Sans_SC } from "next/font/google";
import { useEffect } from "react";

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
});

export default function NotoSansSc() {
  useEffect(() => {
    document.body.classList.add(notoSansSc.className);

    return () => {
      document.body.classList.remove(notoSansSc.className);
    };
  }, []);

  return <></>;
}
