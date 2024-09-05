"use client";

import { NextPage } from "next";

import CommonProvider from "@/components/common/CommonProvider";
import NotoSans from "@/components/fonts/NotoSans";
import ManagerPage from "@/components/pages/ManagerPage";
import { Language } from "@/const";

interface ManagerProps {
  params: {
    locale: Language;
  };
}

const Manager: NextPage<ManagerProps> = ({ params: { locale } }) => {
  return (
    <CommonProvider locale={locale}>
      <NotoSans />
      <ManagerPage />
    </CommonProvider>
  );
};

export default Manager;
