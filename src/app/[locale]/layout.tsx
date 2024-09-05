import { dir } from "i18next";
import { Metadata } from "next";
import { ReactNode } from "react";

import { META } from "@/components/const";
import { Language } from "@/const";
import { i18nConfig } from "@/i18n";

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

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

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: {
    locale: Language;
  };
}) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body>{children}</body>
    </html>
  );
}
