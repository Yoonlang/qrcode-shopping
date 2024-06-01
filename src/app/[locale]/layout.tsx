import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";
import { Noto_Sans, Noto_Sans_SC } from "next/font/google";

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const NotoSans = Noto_Sans({
  subsets: ["latin"],
});

const NotoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
});

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={locale === "zh" ? NotoSansSc.className : NotoSans.className}
      >
        {children}
      </body>
    </html>
  );
}
