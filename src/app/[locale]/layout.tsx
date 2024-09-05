import { dir } from "i18next";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

import { META } from "@/components/const";
import { Language } from "@/const";
import { i18nConfig } from "@/i18n";

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const NotoSans = dynamic(() => import("@/components/fonts/NotoSans"));
const NotoSansSc = dynamic(() => import("@/components/fonts/NotoSansSc"));
const NotoSansJp = dynamic(() => import("@/components/fonts/NotoSansJp"));

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

const getFontComponent = (locale: Language) => {
  switch (locale) {
    case "zh":
      return NotoSansSc;
    case "ja":
      return NotoSansJp;
    default:
      return NotoSans;
  }
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: {
    locale: Language;
  };
}) {
  const FontContainer = getFontComponent(locale);

  return (
    <html lang={locale} dir={dir(locale)}>
      <FontContainer>{children}</FontContainer>
    </html>
  );
}
