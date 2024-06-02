import { META } from "@/consts/metadata";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";
import { Metadata } from "next";
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

const { title, description, url, ogImage, siteName, type } = META;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: siteName,
    images: [
      {
        url: ogImage,
        alt: "opengraph image",
        width: 200,
        height: 100,
      },
    ],
    type: type,
  },
  twitter: {
    images: [
      {
        url: ogImage,
        alt: "opengraph image",
        width: 200,
        height: 100,
      },
    ],
  },
};

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