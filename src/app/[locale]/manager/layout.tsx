import { Noto_Sans } from "next/font/google";

const NotoSans = Noto_Sans({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang={"ko"}>
      <body className={NotoSans.className}>{children}</body>
    </html>
  );
}
