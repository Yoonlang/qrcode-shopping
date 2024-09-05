import { Noto_Sans_JP } from "next/font/google";
import { ReactNode } from "react";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
});

export default function NotoSansJp({ children }: { children: ReactNode }) {
  return <body className={notoSansJp.className}>{children}</body>;
}
