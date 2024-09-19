import { Noto_Sans_JP } from "next/font/google";
import { useEffect } from "react";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
});

export default function NotoSansJp() {
  useEffect(() => {
    document.body.classList.add(notoSansJp.className);

    return () => {
      document.body.classList.remove(notoSansJp.className);
    };
  }, []);

  return <></>;
}
